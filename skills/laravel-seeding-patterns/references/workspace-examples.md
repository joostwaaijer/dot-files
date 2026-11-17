# Workspace Seeding Examples

Use these examples to match the host project's existing seeding style before introducing a new one.

These are excerpts with project-specific models, states and prerequisites, not standalone scripts or universal business scenarios. Inspect the target project's actual relationship APIs, seeder inheritance and dependency contracts before adapting them. Existing project extensions may explain behavior that stock Laravel does not provide; preserve that distinction rather than adding an extension just to reproduce an example.

## Relationship-first parent graph

Project: `haarhuis-portaal`\
Source: `<ROBUUST_WORKSPACE_ROOT>/haarhuis-portaal/database/seeders/DatabaseSeeder.php`

Pattern:

```php
Project::factory([
    'type' => ProjectType::Calculation,
    'name' => 'Nieuwbouw woning te Geesteren',
])->has(
    Calculation::factory()
        ->count(3)
        ->has(
            CalculationItem::factory()
                ->count($count)
                ->seedFromLibraryForCalculation($count),
            'items'
        ),
    'calculations'
)->has(
    WorkOrder::factory()
        ->count(1)
        ->state([
            'name' => 'Uitzetten bouwplaats',
            'status' => WorkOrderStatus::ToSchedule,
        ])
        ->for($adminUser, 'creator'),
    'workOrders'
)->create();
```

Use this when the seeded object graph is naturally owned by one parent model and can be expressed in one readable factory chain.

## Parameterized sub-seeders

Project: `zusters-van-denekamp`\
Sources:
- `<ROBUUST_WORKSPACE_ROOT>/zusters-van-denekamp/database/seeders/DatabaseSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/zusters-van-denekamp/database/seeders/SpaceSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/zusters-van-denekamp/database/seeders/ProductSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/zusters-van-denekamp/database/seeders/BookingSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/zusters-van-denekamp/vendor/laravel/framework/src/Illuminate/Database/Seeder.php` for the installed framework comparison.

### Returning seed data is a project extension

Verified by source inspection on 2026-11-16 at project HEAD `deb18683f409c16129f45a30896e8b0b9ca8fc78`, with no local changes to the seeders above. The project declares Laravel `^12.0`, locks `v12.69.2` and currently has `v12.68.0` installed. The API comparison used that installed source. These versions identify the inspected snapshot, not a version requirement for this skill; recheck the target environment before applying the pattern.

Stock `Illuminate\Database\Seeder::call()` returns the calling seeder; stock `callWith()` passes parameters but does not return the child's seeded data. In this project, `DatabaseSeeder` explicitly overrides both methods to return the child `run()` result:

```php
public function call($class, $silent = false, array $parameters = [])
{
    return $this->resolve($class)
        ->run(...$parameters);
}

public function callWith($class, array $parameters = [])
{
    return $this->call($class, false, $parameters);
}
```

`SpaceSeeder::run(): array` returns named groups including `bedrooms` and `rooms`. `ProductSeeder::run(Collection $rooms): array` consumes the rooms and returns named products including `other`. `BookingSeeder::run(...)` then consumes those exact collections/models as explicit parameters. The return-aware behavior belongs to the caller's overrides; a child returning an array is insufficient by itself.

This override resolves one class and calls `run()` directly. Do not assume it preserves stock support for class arrays, console/timing output, called-seeder tracking or the child's `__invoke()` path for container method injection and event wrappers. Inspect enclosing event scopes separately. This is evidence of an existing orchestration contract, not a drop-in framework replacement or a recommendation to add a base seeder to every project. For stock seeders, use `callWith()` to pass dependencies already produced or selected by their owner without expecting a return value.

### Passing the returned dependencies onward

Excerpt; `$users` is created in an earlier stage of the same orchestration. The parameter names must match the receiving `run()` contract.

```php
$clients = $this->call(ClientSeeder::class);
$spaces = $this->call(SpaceSeeder::class);
$products = $this->callWith(ProductSeeder::class, [
    'rooms' => $spaces['rooms'],
]);

$this->callWith(BookingSeeder::class, [
    'clients' => $clients['company'],
    'rooms' => $spaces['rooms'],
    'other' => $products['other'],
    'users' => $users,
]);
```

```php
Booking::factory()
    ->count(11)
    ->state(fn () => [
        'client_id' => $clients->random()->id,
    ])
    ->has(
        BookingLine::factory(['sequence' => 6])
            ->for(
                BookingLineProduct::factory()
                    ->withReservation($rooms->random()->space)
                    ->for($other),
                'bookable'
            ),
        'lines'
    )
    ->create();
```

Use this when the project already seeds domain data in stages and later seeders need concrete seeded collections or records from earlier steps.

## Attached relations with pivot data

Project: `nzo-elearning`\
Sources:
- `<ROBUUST_WORKSPACE_ROOT>/nzo-elearning/database/seeders/DatabaseSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/nzo-elearning/database/seeders/DriversSeeder.php`

Pattern:

```php
$dairyCompanies->push(DairyCompany::factory()
    ->withMainUser($user)
    ->hasAttached(
        Driver::factory()->count(1),
        ['driver_no' => fake()->unique()->randomNumber(6)]
    )
    ->has(User::factory()->count(3)->withRole('Dairy Company'))
    ->create());
```

```php
$driver = Driver::factory()
    ->hasAttached(
        $dairyCompany,
        ['driver_no' => fake()->unique()->randomNumber(6)]
    )
    ->has(Meeting::factory()->withAgenda()->for($dairyCompany))
    ->withFailedDriverTest($oldCourse)
    ->withPassedDriverTest($course)
    ->create();
```

Use this when the important part of the seed is a pivot-backed relationship, not just a plain child record.

## Domain seeder plus post-create enrichment

Project: `kuipers-logistics-portal`\
Sources:
- `<ROBUUST_WORKSPACE_ROOT>/kuipers-logistics-portal/database/seeders/DatabaseSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/kuipers-logistics-portal/database/seeders/ScopeShipmentsSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/kuipers-logistics-portal/database/seeders/TranspasSeeder.php`

Pattern:

```php
$this->call([
    ScopeShipmentsSeeder::class,
]);

Client::factory()
    ->count(5)
    ->has(User::factory()->withShipmentRequest()->withRole('Client admin'))
    ->withAddress(2)
    ->withDocuments()
    ->create()
    ->each(function ($client) use ($relations) {
        $client->debtors()->create([
            'transpas_relation_id' => $relations->random(),
        ]);
    });
```

Use this when the main domain records can be seeded cleanly with factories, but a small follow-up step is still needed to connect them to already-seeded external or imported data.

Keep the post-create step narrow. If the relation can be expressed with `->for(...)`, `->has(...)`, or `->hasAttached(...)`, prefer that instead.

## Explicit scenario records

Project: `bellezi-erp`\
Sources:
- `<ROBUUST_WORKSPACE_ROOT>/bellezi-erp/database/seeders/DatabaseSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/bellezi-erp/database/seeders/OrderSeeder.php`
- `<ROBUUST_WORKSPACE_ROOT>/bellezi-erp/database/seeders/TaskSeeder.php`

Pattern:

```php
$this->callWith(OrderSeeder::class, [
    'id' => $orderId,
    'user' => $salesUser->id,
]);

$this->callWith(TaskSeeder::class, [
    'customWorkOrder' => $scenarioOrder,
    'user' => $salesUser,
]);
```

```php
$salesOrder = SalesOrder::factory()->create([
    'order_number' => $orderNumber,
    'customer_name' => $customerName,
    'sales_person_id' => $user,
]);

StockMutation::factory()
    ->has($lines, 'lines')
    ->for($salesOrder, 'internalSource')
    ->create([
        'description' => "Voorraad toewijzing #{$orderNumber}",
    ]);
```

Use this when the app depends on recognizable seeded scenarios with fixed identifiers, explicit statuses, or named records that support manual QA and demos.
