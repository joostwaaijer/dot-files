---
name: laravel-seeding-patterns
description: Create or update Laravel seeders and relational factory graphs, including seeded fixtures when test work is explicitly requested.
compatibility: Designed for Open AI Codex (or similar products)
metadata:
  author: joostwaaijer
  version: "1.0"
---

# Laravel Seeding Patterns

Use this skill when working on Laravel seeders, seeded fixtures, or factories that are used to build relational app-state data.

## Goal

Keep seed data concise, additive, and structurally aligned with the project's existing `DatabaseSeeder` style.

## Scope

- In scope: `database/seeders`, factories used for seed graphs, relationship seeding structure, seeded reference data.
- In scope: test seed data and fixtures that mirror seeded app-state flows, only when the user has explicitly requested that test work for the active objective, including in an earlier request.
- Out of scope: isolated test factories that intentionally flatten or shortcut relationships for one-off assertions, broad domain modeling changes unrelated to seed flow.

## Workspace References

- For a seeding shape not already clear from the target project, read the matching example in [references/workspace-examples.md](references/workspace-examples.md). These illustrate patterns, not a requirement to inspect other repositories.
- Prefer copying the closest existing project pattern before inventing a new seeding style.

## Establish the seed contract

- Inspect the affected seeders, factory definitions/states/callbacks, model relationships, schema constraints and relevant consumers. Derive meaningful scenarios, statuses, ownership/tenant boundaries and lifecycle combinations from actual issues, specifications, designs and accepted decisions. Keep canonical backend fields and relationships. Random demo variety must still satisfy those contracts; it does not define new product rules.
- Ask the user before dependent work on a material unresolved scenario/domain choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized preparation.
- Establish the relevant Laravel and package versions from manifests, lockfiles and installed metadata. Distinguish declared, locked and installed versions for the target environment and report discrepancies affecting the task. Use applicable project/Boost guidance and matching official documentation or installed source for concrete API questions; do not impose another major or install/upgrade dependencies to discover versions.
- Inspect the actual seeder imports, inheritance and overrides before assuming framework behavior. Stock `Seeder::call()` returns the calling seeder and stock `callWith()` does not return child seed data. Returning arrays/models from those calls requires an existing verified extension. For that pattern, read the [parameterized sub-seeder contract](references/workspace-examples.md#parameterized-sub-seeders); do not introduce an override just to copy an example.
- Identify whether the requested seed adds demo rows, builds a recognizable scenario, or maintains reference data. Establish required existing dependencies and what repeat execution should do before choosing persistence behavior. A request to review seeders is read-only unless fixes are also authorized.

## Core Pattern

- Prefer a single factory graph over post-create mutation.
- Start from the parent model factory when it owns the seeded graph and attach related records with chained `->has(..., 'relationName')` calls.
- Use the actual Eloquent relationship method name string, for example `'calculations'` or `'workOrders'`.
- For existing belongs-to relations, use factory relationship APIs like `->for($model, 'relationName')`.
- Avoid post-create loops when the same result can be expressed in the factory graph.
- Avoid manual foreign-key assignment in seeding when a relationship method or factory relationship API can express the same intent.

These preferences apply when the supported graph APIs preserve the actual relationships, ordering and readable shape. Retain staged seeders or narrow post-create work when dependencies, lifecycle behavior or imported data justify them. Explicit foreign keys, loops or callbacks are not defects by themselves. Do not replace them mechanically, build an unreadable chain, or add an abstraction merely to satisfy the preferred shape.

## Seeder Style

- Match the local seeder's structure before introducing helpers or abstractions.
- Keep seeded examples explicit and readable. Prefer a few clearly named seeded records over generic loops when the records represent meaningful demo/reference data.
- If a project already seeds a known shared record such as an admin user, obtain that exact record once and reuse it through `->for(...)`. Prefer passing it from the owning stage, or select it by the project's established stable identity and relevant role/tenant scope. An arbitrary `User::first()` does not establish that contract. Follow existing missing-dependency handling or fail clearly; do not silently substitute another record or create an account.
- Keep seeders additive unless the repository explicitly uses a reset/rebuild pattern.
- Do not delete existing records as part of normal seed data setup unless the user explicitly asks for destructive behavior.
- Editing a seeder does not authorize running it against a database. Establish the target environment and permission before executing a seed command.

## Repeat execution

Additive does not mean idempotent. Repeating an append-only demo graph can intentionally add rows; maintaining fixed reference/scenario data may require finding the same records. Follow the project's established contract for stable keys, uniqueness, update scope and dependencies. Do not add `firstOrCreate`, upserts or resets universally, overwrite user-maintained fields, or deduplicate/delete existing rows merely to make a second run pass.

Keep named scenarios and their required relationships predictable. Use existing states and explicit values for meaning-bearing data, with bounded randomness where valid variation is intended. Do not invent fixed database IDs or impose a global Faker seed when the scenario does not require one. Preserve existing recognizable identifiers and seeding order where they are part of the agreed contract.

## Preferred Shapes

Parent with related data:

```php
Project::factory([
    'name' => 'Example project',
])->has(
    Calculation::factory()->count(3),
    'calculations'
)->has(
    WorkOrder::factory()
        ->count(1)
        ->state([
            'name' => 'Site preparation',
        ])
        ->for($adminUser, 'creator'),
    'workOrders'
)->create();
```

Existing related model reused across seeded graph:

Here `$adminUser` is the required record passed from the owning seed stage or selected using its established identity and scope, as described above.

```php
WorkOrder::factory()
    ->for($adminUser, 'creator')
    ->create();
```

## Decision Rules

- If the relationship is owned by the parent being seeded, prefer `->has(...)`.
- If the relationship is an inverse belongs-to to an already existing model, prefer `->for(...)`.
- If the relation is many-to-many with pivot data, prefer `->hasAttached(...)`.
- If you need custom seeded values, prefer `->state([...])` inside the graph rather than creating first and patching after.
- If a project already splits seed flow across dedicated seeders, keep that orchestration in `DatabaseSeeder` and pass seeded dependencies through `callWith(...)` or equivalent explicit parameters.
- Only introduce a private seeder helper when it clearly reduces duplication without hiding the seeded shape.

`callWith()` can pass explicit dependencies without returning results. Consume its return value only when the actual caller implements that additional contract; a child `run()` return type alone does not change stock orchestration.

## Anti-patterns

- Creating parent records first and then iterating over them just to attach predictable related seed data.
- Setting raw `*_id` values in arrays when `->for(...)` or `->has(...)` would express the relation directly.
- Mixing multiple different seeding styles in the same `DatabaseSeeder` without a clear reason.
- Hiding important seeded records behind overly abstract helper layers.

Apply these checks to the actual supported graph and local contract, including the justified exceptions above; do not rewrite a working seed solely because it contains a loop or foreign-key field.

## Execution and verification

- Before an authorized run, verify the actual target connection/database and selected checkout/runtime using project configuration and permitted inspection, without exposing credentials. Confirm the seed class, affected data and append/update/reset behavior are within existing authority. An environment label alone is not proof of the target. Repository reset conventions do not authorize destructive commands; deletion, truncation, `migrate:fresh` or similar rebuilds still require explicit destructive scope. Do not use force flags to bypass a missing decision.
- Inspect relevant factory callbacks, model events/observers, queued jobs and file/integration work reachable from this graph. Keep necessary invariant-building behavior; do not mute model events by default. Ensure secondary writes, mail or other external actions remain within actual authorization or existing isolated project setup. A database transaction does not establish that external effects were rolled back. If a required action is outside scope, retain useful preparation and report the blocked step.
- Use relevant existing formatting, PHP linting and static inspection without running seeds or tests implicitly through combined scripts. Writing, modifying, deleting or running tests, including test fixtures and behavioral evaluations, requires explicit user authorization for the active objective. Reuse applicable authorization and deferrals without asking again. A seed-run request alone is not test authorization, and a test request does not authorize writes to an ordinary development or production database.
- After an authorized run, read back the relevant scenario identities, relationships, counts and scoped states as needed. Verify repeat-run behavior only when repeated writes are authorized; do not rerun the seeder merely to prove a claim. Report changed seed structure, runtime/connection context without secrets, checks actually performed and gaps. Syntax success or a zero command exit does not prove the intended scenario or idempotence. Leave unrelated seeders, application behavior and data intact.

## Coordination

- Explicit user instructions and applicable repository `AGENTS.md` rules take precedence over this skill.
- If the repository already has explicit seeding rules, follow those over this skill.
- If the existing seeder style conflicts with this skill, prefer the local seeder style and update only what is needed for consistency.
- For Vue component fixtures, use [`vue-vitest-coverage`](../vue-vitest-coverage/SKILL.md) when Vue test work is requested; do not build a database seed graph for an isolated component spec.

## Task

$ARGUMENTS
