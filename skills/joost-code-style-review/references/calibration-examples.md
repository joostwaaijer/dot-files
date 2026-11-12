# Concrete review calibration

These examples teach review actions from exposed development PRs. Use the corresponding decision on current code, not the historical project's exact names. A meaningful readability/ownership adjustment can be optional; it need not be a bug. Documented requirements still govern. Read the applicable examples and their guards.

## Two references, one effective submission consumer

Haarhuis PR338 has both a Drawer `:action="drawerAction"` binding and `form.value.submit(drawerAction.value, options)`. The computed selects the create or update route. Counting those two references suggests reuse, but the pinned Drawer prevents native submission and emits `drawer:save`; its action binding does not drive the route used by that handler.

Review the connected simplification: remove the redundant action binding, remove the now-unnecessary computed route, and choose create/update at the submit call. Preserve the exact create/update IDs, `preserveScroll` and success-driven close. The supported request is one local transformation, not three bugs. It removes route plumbing without claiming duplicate requests or broken submission. [Binding request](https://github.com/robuust/haarhuis-portaal/pull/338#discussion_r3349157495); [computed request](https://github.com/robuust/haarhuis-portaal/pull/338#discussion_r3349158636); [local route choice](https://github.com/robuust/haarhuis-portaal/pull/338#discussion_r3349161352). Rules: FE04/FE06.

Retain the separate writable `form` computed: it bridges the supplied editable form model and update event. Keep real draft/reset state and the installed Inertia submission API. If a route value is genuinely needed by an independently functioning link or another supported consumer, or naming a complex decision clarifies the code, keeping a computed can be justified. A local computed for a repeated capture/locale-dependent label is a different decision. Inspect effective consumers rather than banning computed properties.

## Pass-through argument with a real caller policy

Inventflow PR350 passes a permission boolean into an asset resource. Removing it in favor of `auth()->user()` may look simpler, but the same resource serves an anonymous signed preview whose caller explicitly supplies false. The argument carries caller policy and controls `preview_url`; it is not just another copy of authenticated state. Retain it unless an equally explicit supported path preserves both callers. The [conditional suggestion](https://github.com/robuust/inventflow-portaal/pull/350#discussion_r3428126971) was qualified by the existing preview explanation and [acknowledged](https://github.com/robuust/inventflow-portaal/pull/350#discussion_r3428190243). The complete thread is a retain example, not a mandatory refactor. Rules: BE02/BE09; current contract governs.

## Reused controller dependency and response setup

In Kuipers PR1672, add/edit/changeType repeat this prop setup:

```php
return Inertia::render('Quotations/Form', [
    'quotation' => QuotationPreviewResource::make($quotation),
    'clients' => Inertia::defer(fn () => app(ClientsController::class)->search($request)),
    'countries' => Inertia::once(fn () => Countries::getList(app()->getLocale())),
]);
```

Two supported optional review actions: inject/reuse the stable ClientsController dependency through the existing constructor, and consider one small render method taking the current quotation and request. State both when supported; an unrelated Vue arithmetic extraction does not address this response setup. The constructor already shares quotationServices, so preserve that work. Keep clients deferred and preserve caller-specific data.

The review explicitly asks for [constructor reuse](https://github.com/robuust/kuipers-logistics-portal/pull/1672#discussion_r3758564774) and [a shared render function](https://github.com/robuust/kuipers-logistics-portal/pull/1672#discussion_r3758571714). This snapshot also has a documented Consistency First instruction: follow an existing pattern rather than introducing a second way. Acknowledge that requirement when discussing the requested constructor approach: frame it as a concrete optional personal proposal to agree an exception or consistent adjustment, not a Standards violation or permission to silently override the rule. If the current review scope does not allow discussing that decision, retain the pattern and record the specific conflict. Mere sibling resemblance without a governing instruction is weaker evidence. This is not a rule to inject every dynamic container lookup or extract every render call. Rules: BE09/WR07.

## One-endpoint projection and accessor

Haarhuis PR302 adds a scope selecting has_schedule_items_between and an available accessor negating that temporary flag. The only application read is the endpoint's filter immediately after selecting the flag.

```php
return !(bool) $this->attributes['has_schedule_items_between'];
// endpoint after the projection-producing scope:
->get()->filter(fn (User $user): bool => !$user->available);
```

Review action: close the whole accessor/projection/scope group, not just its accessor. One coherent option removes available, selects a direct is_scheduled flag, and filters that positive flag with the correct polarity. If the decorating scope remains useful, consider a concrete name such as withSchedulingStatusInPeriod to describe that selected scheduling state; do not silently retain an unclear part of the same proposal. Alternatively, remove the one-use wrapper and select the required users with the relation/query API when the endpoint contract is preserved. Explain the role and reduced coupling, rather than mechanically naming a decorating scope like a filter. A concrete smaller path is useful even though the current caller satisfies the projection prerequisite.

[Accessor request](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287950162); [scope-name request](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287956868); [positive flag request](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287961375).

Do not invent a crash on ordinary User serialization: available is not appended and the actual caller selects the prerequisite. Do not delete a one-caller method merely for having one caller. Rules: BE11/BE09/WR03.

## Related new fields: complete the group

Inventflow PR495 introduces enabled and remarks on a ServiceReport that already has pump_disassembly_enabled and internal_remarks. Their current consumers use the two new fields only for malfunctions.

One coordinated optional suggestion can address both: use malfunctions_enabled and malfunction_remarks, or equally explicit domain names, throughout the new schema/model/request/UI contract. Mention both affected fields; do not stop after enabled. Their existing generic keys are internally consistent, so this is clarity rather than a broken-persistence finding. Do not rename only fillable keys, add a frontend alias, or preserve one field while implying the whole group was addressed.

[Enabled request](https://github.com/robuust/inventflow-portaal/pull/495#discussion_r3674615606); [remarks request](https://github.com/robuust/inventflow-portaal/pull/495#discussion_r3674617562). Existing settled public keys need an intentional contract decision; this example concerns newly introduced fields. Rules: WR02/BE03.

## Operation names and predicate names

Haarhuis PR302 maps planning/availability to unavailableUsers. A concrete optional action-oriented proposal is checkAvailability, explaining the route/action vocabulary. A timeframe scope can use the established local domain term period. Neither the old wording nor a different clear name is a runtime defect. [Action request](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287979758); [scope request](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287942917).

Also distinguish a scope adding a selected flag from one filtering records. Do not mechanically name every decorating scope like a boolean filter. Propose concrete names in the current domain, not a blanket shortening/casing policy. Rule: WR02.

## Extracted predicate: check existing consumers

The same Haarhuis change replaces existing planning queries:

```php
// Before: starts_at <= periodEnd AND ends_at >= periodStart
// Extracted helper: starts_at < periodEnd AND ends_at > periodStart
```

An item ending exactly at periodStart was included before and is excluded after. Inspect the old planning callers and their inclusive visible-day resource as well as the new availability feature. Raise this concrete existing-consumer change and preserve it or ask whether it is intended. Merely noting that touching appointments can be non-overlapping does not evaluate that extraction.

[Historical boundary question](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287946402). It supports a contract question when intent is missing, not a universal inclusive-interval rule or a claim of runtime reproduction.

## Retain controls: similarity alone is insufficient

- Inventflow's localized_name accessor is appended to serialized models and consumed by Vue; the original translatable name is hidden. Role already uses that pattern. The pinned translation package normally emits locale maps. Retain the scalar contract unless an actual compatible simplification is established; a native localized property read alone does not replace its serialized alias.
- Haarhuis's Alert user.id key is unique in its list. A suggested descriptive prefix does not prove a collision. Do not invent a Vue-key defect.
- Its Combobox root-attrs by id question was answered as identity-based deduplication; do not convert a clarification into a required removal.
- The standalone availability endpoint returns JSON. A supported useHttp call is not invalid merely because declarative Inertia Form is useful elsewhere.

Keep real draft/confirm/cancel state and genuinely optional data. Negative controls remain valid when pursuing more personal-style recall; never trade them for a higher match count.

## Native APIs at the actual boundary

For newly added form state, compare manual processing/error/reset fields with the installed form object's API. In [RF28](feedback.md#rf28--native-form-bookkeeping-with-an-independent-lifecycle), replacing manual order flags with `useForm` is useful, but reusing the schedule editor's form would mix independent operations. A form reset is equivalent only for the selected fields whose defaults match the intended values; the [#580 reset diff](https://github.com/robuust/haarhuis-portaal/commit/7f75012e4b05e3e54ef789d5e37ff7bb0acd3c12) is code-only corroboration, with no motivating PR feedback found. Do not prescribe a full reset that changes a saved mode.

For option loading, [RF29](feedback.md#rf29--native-options-with-permission-and-component-contracts) supports a page-owned identity-only options prop when its size and write permission fit. Its reviewer also asks whether explicit Combobox name mappings are needed. The locked 3.5.2 API already supplies those defaults, so retaining the concise component is correct. A stubbed component does not establish a missing default; inspect the real API. Remote JSON search remains appropriate elsewhere in the same drawer.

Conversely, a native helper can still be used incorrectly. The [#584 diff](https://github.com/robuust/haarhuis-portaal/commit/5b314be42162879dd6e4aec306e3ffd7e179a37f) fixes a `useHttp({ query })` field/method collision by passing search parameters through the supported URL query API, retaining `useHttp`. Fresh blank rows require omitting their undefined IDs for that serializer, while selected IDs remain excluded. This is a correctness example without preference feedback, not a ban on `useHttp`, a universal URL-only transport rule or permission to discard meaningful zero/false values.

## Shared responsibility and conditional guarantees

Use [RF27](feedback.md#rf27--shared-interaction-component-versus-a-pass-through-wrapper) as a pair: propose the header extraction that removes real repeated interaction markup; consider removing the modal wrapper that adds no separate responsibility. Preserve the shared component's slots, page-owned expansion/confirmation state and real submit behavior. Neither action establishes an always-extract or never-wrap rule.

For backend guards, [RF30](feedback.md#rf30--binding-and-request-validation-own-different-constraints) separates route membership from field validation, while [RF33](feedback.md#rf33--retain-a-fresh-locked-row-check-before-relationship-writes) retains a check whose truth depends on a later locked read. In [RF31](feedback.md#rf31--conditional-resource-shaping-and-proven-inner-nullability), the installed `whenLoaded` helper and schema justify removing inner nullsafe access; the same feature keeps an optional unit fallback outside that guarantee. Close the whole relevant group without turning a valid local simplification into a guard-removal policy.

These November 12 examples are exposed development material from received feedback and attributed code. They refine inspection decisions; they are not held-out tests, unaided authorship evidence or a measured improvement in review accuracy.
