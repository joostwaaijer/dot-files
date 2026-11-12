# Backend preferences

Apply only to the matching current contract. High confidence describes the evidence for a preference, not bug severity. Source IDs resolve in evidence-index.json.

## BE01 — Let native model and value-object serialization do ordinary work

When a model, Resource, Collection, enum or value object already emits the required shape, remove redundant resolve(), toArray(), all() and per-field mapping at the controller boundary. Put casts/enum representation in the owning type; keep actual response transformations explicit.

**Scope:** Laravel/Inertia and API serialization paths where the existing model/resource output is an intentional approved contract. **Confidence:** high.

**Exceptions and limits:**

- Do not spread every model into every public API: field exposure and selected-column contracts still require review.
- Do not remove serialization calls needed for a true nested transformed array; ExpensesResource::lineItems still resolves a nested resource collection.
- This is repeated preference expressed in reviews, but native Laravel capabilities and team habits explain part of its frequency.
- Do not infer a universal enum shape: QuotationStatus emits key/value/label, HZT EventStatus emits value/label, earlier Heerdink has a separate off_type_label accessor.

**Sources:** [BE:R-3362592357](https://github.com/robuust/inventflow-portaal/pull/301#discussion_r3362592357); [BE:R-3395642409](https://github.com/robuust/inventflow-portaal/pull/322#discussion_r3395642409); [BE:C-f131cf87ca1d](https://github.com/robuust/haarhuis-portaal/commit/f131cf87ca1dafb64b95a4e5fa9be90b417c541c); [BE:C-ab828601e729](https://github.com/robuust/haarhuis-portaal/commit/ab828601e7296ae006c0c114b09a9e5359b69f0b)

**Counterevidence:** [BE:C-05e1c1fac361](https://github.com/robuust/haarhuis-portaal/commit/05e1c1fac361e09b785c7670fd223df6fd45e8db); [BE:C-0152c83a8019](https://github.com/robuust/huisartsenzorg-twente/commit/0152c83a8019a749f678501a7eeed2e6bfa21135)

**Chronology:** Own code April 3/17 and June 12; own review June 5/11 and July; further code July/August and September/October. Strong pre-Salta evidence.

## BE02 — Keep resource relationships conditional on the loaded graph

Review Resources for accidental relation reads. Use whenLoaded() and deferred closures for relation-derived values, and feed the loaded relation into a nested Resource. Let the query owner decide what to eager-load.

**Scope:** Reusable Laravel Resources, especially those used with partial column selections or different eager-loaded graphs. **Confidence:** high.

**Exceptions and limits:**

- Exact helper names differ by resource/library version; inspect the actual resource API instead of prescribing whenRelationLoaded unconditionally.
- A fixed endpoint may intentionally guarantee and access course/location directly; HZT API EventResource does so.
- A relation-backed computation may live on the model if it is domain resolution, provided the loaded-data contract is explicit; this is a contested boundary, not a blanket ban.

**Sources:** [BE:R-3362594606](https://github.com/robuust/inventflow-portaal/pull/301#discussion_r3362594606); [BE:R-3536949192](https://github.com/robuust/kuipers-logistics-portal/pull/1577#discussion_r3536949192); [BE:C-cdc6372d6fef](https://github.com/robuust/haarhuis-portaal/commit/cdc6372d6fef2c0c008407d140297129ff63223c); [BE:C-fe887a38cf47](https://github.com/robuust/inventflow-portaal/commit/fe887a38cf47e66a080436d6bf56febae708a5fe)

**Counterevidence:** [BE:C-4602aefecde2](https://github.com/robuust/huisartsenzorg-twente/commit/4602aefecde2b9dae5c47e1ca862e6364e66f1b4); [BE:R-3536957059](https://github.com/robuust/kuipers-logistics-portal/pull/1577#discussion_r3536957059)

**Chronology:** Haarhuis April correction; own reviews June/July/September; Inventflow July resource simplification and September loaded graph resolver.

## BE03 — Preserve canonical attribute and relationship names across layers

Keep backend column/model field names in serialized data. Adapt the frontend to that contract, or deliberately rename the actual model/schema contract. Avoid a second name solely for display or frontend taste; keep relation structure when the relationship is what the data represents.

**Scope:** Existing Laravel API/Inertia data contracts and relation-shaped response data. **Confidence:** high.

**Exceptions and limits:**

- Computed or semantically different fields may deserve their own name; this is not a no-alias rule for all presentation data.
- Do not retrospectively rename public API fields without an intentional contract change.
- The strongest written directive is July 13 on Kuipers; the May 21 Haarhuis change independently demonstrates the same choice.

**Sources:** [BE:R-3568375319](https://github.com/robuust/kuipers-logistics-portal/pull/1595#discussion_r3568375319); [BE:R-3585940552](https://github.com/robuust/kuipers-logistics-portal/pull/1608#discussion_r3585940552); [BE:C-9e2e1e15d274](https://github.com/robuust/haarhuis-portaal/commit/9e2e1e15d27462a393a59853a19389b7127be9ad); [BE:C-58459d6b68a3](https://github.com/robuust/inventflow-portaal/commit/58459d6b68a3962cb05067edb0fbce36d1d78b20)

**Counterevidence:** [BE:C-05e1c1fac361](https://github.com/robuust/haarhuis-portaal/commit/05e1c1fac361e09b785c7670fd223df6fd45e8db); [BE:R-3932618460](https://github.com/robuust/inventflow-portaal/pull/656#discussion_r3932618460)

**Chronology:** May 21 own implementation; July 13/15/21 explicit review guidance and July 20 removal of duplicate started_at.

## BE04 — Remove defensive duplication only after establishing the contract

Question casts, nullsafe operators, rescue fallbacks, type checks and duplicate scope filters when the validated input, return type, relationship or framework call already guarantees the value. Prefer a visible contract failure over silently substituting an unrelated success/default value. Keep checks at genuinely uncertain boundaries.

**Scope:** Internal, validated or otherwise evidenced invariants. Requires inspecting callers/validation before recommending removal. **Confidence:** high.

**Exceptions and limits:**

- Never turn this into a ban on nullsafe, casts, validation or fallbacks. Albo validates untrusted coordinate JSON/ranges; RRS validates email-list input and casts normalized external values; optional relations have real fallbacks.
- The June non-null enum change is observed intent, not independent proof that every invalid enum request produces correct HTTP validation behavior.
- Historical commits can contain incorrect removals; a review still has to prove the invariant in the current code.

**Sources:** [BE:R-3505872620](https://github.com/robuust/albo/pull/857#discussion_r3505872620); [BE:R-3569183659](https://github.com/robuust/kuipers-logistics-portal/pull/1595#discussion_r3569183659); [BE:C-1b5eeda98755](https://github.com/robuust/rrs-cit/commit/1b5eeda987559917f7e9e46acc31060b6bdd21fd); [BE:C-a186d98171ed](https://github.com/robuust/rrs-cit/commit/a186d98171edb74a934150be1401042221b5d997)

**Counterevidence:** [BE:C-fc7d7195e5b9](https://github.com/robuust/albo/commit/fc7d7195e5b9ee88b8b50cae3123ed5e8007de2d); [BE:C-eba12e6b553c](https://github.com/robuust/rrs-cit/commit/eba12e6b553c3406e3a6449cef883c623fb15aba); [BE:C-c2e39deccbdf](https://github.com/robuust/vastgoedmonitor/commit/c2e39deccbdff94867b1ec45eb723015c544672d)

**Chronology:** February/March RRS; April/June Haarhuis; July Heerdink/Inventflow; October upload cleanup. Own July review confirms the contract-first limitation.

## BE05 — Use framework validation and request accessors before manual parsing

Prefer existing FormRequest rules and typed request accessors over handwritten equivalents: enum(), exclude_if/prohibitedUnless, nested after rules and scoped Rule::exists. Keep custom validation only for the domain check that the ordinary rules cannot express.

For parent-owned route models, check supported scoped binding before retaining a controller membership guard. Keep expressible field/type/mode invariants in the FormRequest and preserve their distinct outcomes: a missing or foreign bound model can be a 404 before field validation, while an invalid mode is a field-level 422 ([RF30](feedback.md#rf30--binding-and-request-validation-own-different-constraints)). Binding does not replace authorization or a state check that must occur under a fresh write lock.

**Scope:** Laravel requests; match installed version and existing request semantics. Transport normalization belongs at the request boundary. **Confidence:** high.

**Exceptions and limits:**

- No blanket deletion of after callbacks: the quotation request retains catalogue-specific validation while replacing an expressible line-membership check with Rule::exists.
- A CSV/import support class may legitimately use Validator::make and report row-specific failures.
- Array rules versus pipe strings vary with age, framework and needed rule objects; no universal syntax preference is established.

**Sources:** [BE:R-3513091790](https://github.com/robuust/inventflow-portaal/pull/397#discussion_r3513091790); [BE:R-3620214346](https://github.com/robuust/kuipers-logistics-portal/pull/1609#discussion_r3620214346); [BE:C-5abf9f732788](https://github.com/robuust/heerdink-planning/commit/5abf9f732788be32a2b6166cf2402822876a4fa5); [BE:C-08e45a00abb8](https://github.com/robuust/heerdink-planning/commit/08e45a00abb8f594318b9f185d2a4c56a701ba77)

**Counterevidence:** [BE:C-eba12e6b553c](https://github.com/robuust/rrs-cit/commit/eba12e6b553c3406e3a6449cef883c623fb15aba); [BE:C-558818b7746b](https://github.com/robuust/heerdink-planning/commit/558818b7746b5b81646014661e0376115052e165); [BE:C-ec7e8a34c350](https://github.com/robuust/inventflow-portaal/commit/ec7e8a34c350bcce1de3a7978da46ab65c975a69)

**Chronology:** November 2025 exclusion rule; January enum rule; July typed request accessor; September declarative nested validation; November transport-specific validationData.

## BE06 — Shape validated input near the request and keep controllers focused

Use FormRequests to validate and normalize incoming data into the shape persistence needs. Prefer safe()->only() allowlists for updates. Keep controllers on orchestration/persistence/response, with real domain behavior on its owner rather than repeated parsing and mapping.

Before accepting a new controller `abort`/`throw` branch as necessary, identify whether it checks route membership, user input, authorization or concurrent domain state. Move only the part whose existing binding/request API actually owns the same contract; RF30 is a scoped adoption, not a directive to move every guard into validation.

**Scope:** Laravel form flows; request hooks for input shaping, not a generic mandate to move all persistence/domain logic into requests. **Confidence:** high.

**Exceptions and limits:**

- safe()->only() is strongly expressed in reviews; historical controllers also use except() and existing code should not be mechanically rewritten.
- The November preference to use Request classes for filter preprocessing is a current directional preference, not evidence every older filter should be migrated.
- There is no universal requirement for Action classes; simple controllers remain common.

**Sources:** [BE:R-3457545612](https://github.com/robuust/inventflow-portaal/pull/365#discussion_r3457545612); [BE:R-3457576550](https://github.com/robuust/inventflow-portaal/pull/365#discussion_r3457576550); [BE:C-8b7ffed490ac](https://github.com/robuust/haarhuis-portaal/commit/8b7ffed490aca1497cd6c4f0569fa8e57d32f352); [BE:C-a7d08a7acfbe](https://github.com/robuust/haarhuis-portaal/commit/a7d08a7acfbe2ad060caa14f62a1de06355667fe)

**Counterevidence:** [BE:C-c2e39deccbdf](https://github.com/robuust/vastgoedmonitor/commit/c2e39deccbdff94867b1ec45eb723015c544672d); [BE:C-0301a1efb1b1](https://github.com/robuust/inventflow-portaal/commit/0301a1efb1b123fb3ab797ea15d5b5c2d85a09ca)

**Chronology:** May own refactor; June/July own request allowlist/hook review guidance; September shape input for relation sync; November explicit Request-vs-Filter discussion.

## BE07 — Keep domain selection in models and query scopes, with explicit boundaries

Put reusable or complex domain filtering on the model/scope/relationship that owns it; prefer existing relations, hasManyThrough/ofMany-style APIs and preload the graph. Keep HTTP response formatting in Resources. Avoid a scope for every trivial predicate and avoid dynamic or artificial relations that hide real domain differences.

**Scope:** Eloquent domain/query design; scope extraction needs meaningful complexity or reuse, and authentication-scoped behavior can belong in middleware. **Confidence:** high.

**Exceptions and limits:**

- Placement is contextual and contested: received September feedback proposed moving catalogue resolution out of the model; Joost retained model domain resolution and changed it to loaded relation reads.
- Do not move auth-dependent global scopes into every model: HZT explicitly moves trainer scoping from Event::booted to request middleware.
- Some long explanatory responses may have agent assistance; pre-October short reviews and implementation are the stronger identity evidence.

**Sources:** [BE:R-3362561232](https://github.com/robuust/inventflow-portaal/pull/301#discussion_r3362561232); [BE:R-3536933269](https://github.com/robuust/kuipers-logistics-portal/pull/1577#discussion_r3536933269); [BE:C-0814985b0526](https://github.com/robuust/heerdink-planning/commit/0814985b052680c19e62b356402515c8913eb4cf); [BE:C-2cb73af5720e](https://github.com/robuust/haarhuis-portaal/commit/2cb73af5720e20eaf6e1108a305c17d7f788f90b)

**Counterevidence:** [BE:R-4104155069](https://github.com/robuust/kuipers-logistics-portal/pull/1817#discussion_r4104155069); [BE:C-4602aefecde2](https://github.com/robuust/huisartsenzorg-twente/commit/4602aefecde2b9dae5c47e1ca862e6364e66f1b4); [BE:C-0f4cbbb6a962](https://github.com/robuust/albo/commit/0f4cbbb6a962a7193f97012cc564b796ad5bcead)

**Chronology:** November activeContract relation; May model-owned user scopes; June/July own reviews; September scope limitation; October middleware/attribute refactors.

## BE08 — Use the ORM relationship API to persist the domain graph

Prefer associate(), relation save()/saveMany(), sync() and proper model bindings over manually moving relational identifiers or duplicating relation persistence logic. Structure the incoming payload so the relation API can perform the update clearly.

For a validated set operation such as employee ordering, consider whether one scoped update replaces repeated writes without changing per-model events, casts or side effects. The [RF32](feedback.md#rf32--set-based-order-update-with-the-same-scope) implementation uses a scoped CASE update built from validated integers; it does not justify bypassing models for writes that depend on their lifecycle.

**Scope:** Laravel relation persistence. Choose association/sync only where their update/delete semantics match the domain. **Confidence:** high.

**Exceptions and limits:**

- Do not replace every explicit persistence loop with sync(): uploads, snapshots and per-line domain rules may require explicit orchestration.
- Foreign-key assignment remains in legitimate existing factories/imports.
- Some APIs were explicitly requested by teammates too; this is a shared idiom with direct personal endorsement.

**Sources:** [BE:R-3557907423](https://github.com/robuust/kuipers-logistics-portal/pull/1593#discussion_r3557907423); [BE:R-3536985819](https://github.com/robuust/kuipers-logistics-portal/pull/1577#discussion_r3536985819); [BE:C-68912398cc69](https://github.com/robuust/haarhuis-portaal/commit/68912398cc69c2f1ead3aae5d361c2401f5c51bc); [BE:C-8b7ffed490ac](https://github.com/robuust/haarhuis-portaal/commit/8b7ffed490aca1497cd6c4f0569fa8e57d32f352)

**Counterevidence:** [BE:C-2fc529eb5cdc](https://github.com/robuust/clubee-v2/commit/2fc529eb5cdc9243f8ac1c2f4cd86c007c1f9763); [BE:C-ec7e8a34c350](https://github.com/robuust/inventflow-portaal/commit/ec7e8a34c350bcce1de3a7978da46ab65c975a69)

**Chronology:** April/May relation associate/saveMany; July explicit association refactor and written review; August reuse Spatie media() relation; September sync reviews.

## BE09 — Extract only useful reuse, keeping the abstraction close

Start with a readable local function or existing owning class. Share code when there are real consumers or a real domain boundary; remove pass-through traits, helper classes and fragmented methods that add navigation without simplifying work. Reuse built-in framework/package APIs instead of parallel wrappers.

A nested Resource can earn its boundary by owning conditional row serialization across form contexts. Compare that responsibility with inline mapping, preserving planned versus saved amounts and real missing-source fallbacks ([RF31](feedback.md#rf31--conditional-resource-shaping-and-proven-inner-nullability)). Do not remove necessary nested transformations merely because native serialization is preferred.

**Scope:** Backend abstractions, services, query helpers, validators and extension points. Evaluate complexity saved and current consumers, not a fixed line-count rule. **Confidence:** high.

**Exceptions and limits:**

- Not anti-abstraction: MessageBird owns provider logic; email list validation is shared across requests; HZT extracts identical confirmation hooks into a trait.
- Do not deduplicate distinct domain flows merely because their current code looks similar.
- The private-method-first review was on a teammate PR; it expresses preference but does not prove a matching local adoption commit by Joost.

**Sources:** [BE:R-3395617528](https://github.com/robuust/inventflow-portaal/pull/322#discussion_r3395617528); [BE:R-3457563836](https://github.com/robuust/inventflow-portaal/pull/365#discussion_r3457563836); [BE:C-c2e39deccbdf](https://github.com/robuust/vastgoedmonitor/commit/c2e39deccbdff94867b1ec45eb723015c544672d); [BE:C-c94c696c7296](https://github.com/robuust/vastgoedmonitor/commit/c94c696c72969fabf177582db67b1e16776fe621)

**Counterevidence:** [BE:C-c2e39deccbdf](https://github.com/robuust/vastgoedmonitor/commit/c2e39deccbdff94867b1ec45eb723015c544672d); [BE:C-eba12e6b553c](https://github.com/robuust/rrs-cit/commit/eba12e6b553c3406e3a6449cef883c623fb15aba); [BE:C-a4b4e3e43f47](https://github.com/robuust/huisartsenzorg-twente/commit/a4b4e3e43f47df98396295d43e40fae883e65fa5)

**Chronology:** November provider service; April removal of injectable production seams; June/July reviews against redundant traits/classes; August private method first; September objection to fragmented query methods; October targeted extraction for true duplication/readability.

## BE10 — Make multi-record writes atomic, without reflexive locks or transaction output

Review related writes as one transaction and keep response construction outside it. Resolve/validate input before entering where practical, avoid returning an unused model from a transaction callback, and justify pessimistic locking with an actual concurrency invariant.

**Scope:** Laravel multi-record writes and relationship reconciliation. Locking recommendations require current concurrency evidence. **Confidence:** medium.

**Exceptions and limits:**

- Atomic writes are normal correctness/framework practice, not uniquely personal taste.
- The early Heerdink manual transaction style is not a template to copy; callback transactions appear later.
- No universal no-lock rule: Joost later asks for a locking alternative on an already-hydrated model; quotation lock removal does not justify removing another workflow lock.
- Preparation is sometimes intentionally inside the callback, e.g. the November HasBillables kept-ID computation.
- The validated() movement is an input-materialization change; no claim is made that FormRequest lifecycle validation previously ran inside the callback.
- A route-bound model may become stale before a transaction starts. When a concurrent writer can delete or move it, trace the parent lock and a fresh matching row read before relationship writes; a transaction alone does not refresh the hydrated object ([RF33](feedback.md#rf33--retain-a-fresh-locked-row-check-before-relationship-writes)). This is a correctness boundary, not a stylistic demand for more locks.

**Sources:** [BE:R-3620089710](https://github.com/robuust/kuipers-logistics-portal/pull/1609#discussion_r3620089710); [BE:R-4062497836](https://github.com/robuust/kuipers-logistics-portal/pull/1806#discussion_r4062497836); [BE:C-dc6ca5df8b0c](https://github.com/robuust/heerdink-planning/commit/dc6ca5df8b0c5454110c6ebbf30deb4fd3d51f9e); [BE:C-4f0dadececd6](https://github.com/robuust/heerdink-planning/commit/4f0dadececd63a9bdb5fe6db6ef9605584f3f0bf)

**Counterevidence:** [BE:C-848e113da548](https://github.com/robuust/heerdink-planning/commit/848e113da54812a2e162bbb3fa6d5e4d4a78b930); [BE:R-4062497836](https://github.com/robuust/kuipers-logistics-portal/pull/1806#discussion_r4062497836)

**Chronology:** November 2025 transaction scope expansion; April callback transactions; May move validation/unused return out; September lock removal.

## BE11 — Avoid storing or aliasing values already represented by the domain

Question additional persisted counters/timestamps and proxy attributes when existing timestamps, relations, casts or computed accessors already express the same meaning. Preserve separate storage when it represents a real event, snapshot or query contract.

**Scope:** Laravel schema/model design, derived values and API aliases. **Confidence:** medium.

**Exceptions and limits:**

- Do not read removal of participants_count as a complete implemented live-count behavior in that specific commit; it removes placeholder storage.
- There are deliberate stored/denormalized dates for sorting/indexing and domain defaults in both database and model.
- Written discussion explicitly accepts tradeoffs where derived date would complicate ordering/API shape; there is no universal anti-denormalization rule.

**Sources:** [BE:R-3536957059](https://github.com/robuust/kuipers-logistics-portal/pull/1577#discussion_r3536957059); [BE:R-3585940552](https://github.com/robuust/kuipers-logistics-portal/pull/1608#discussion_r3585940552); [BE:C-58459d6b68a3](https://github.com/robuust/inventflow-portaal/commit/58459d6b68a3962cb05067edb0fbce36d1d78b20); [BE:C-1fb6cbd70b8b](https://github.com/robuust/huisartsenzorg-twente/commit/1fb6cbd70b8b25a3e4060fc497ee344dd9533f20)

**Counterevidence:** [BE:C-0a73b491eaed](https://github.com/robuust/vastgoedmonitor/commit/0a73b491eaed1ab201ddbd76d53920a725c0ffe3); [BE:R-4133176296](https://github.com/robuust/huisartsenzorg-twente/pull/199#discussion_r4133176296); [BE:R-4133359715](https://github.com/robuust/huisartsenzorg-twente/pull/199#discussion_r4133359715)

**Chronology:** May API alias removal; July duplicate timestamp removal; September counter removal and denormalized-date discussion; October model date accessor.

## BE12 — Respect the existing framework or domain owner before adding a parallel path

Reuse the native package/service/relationship behavior and preserve its contract. Keep business behavior, signed metadata or domain selection with the layer that owns it; avoid shadow defaults and duplicated workflows in adapters.

**Scope:** Craft/Commerce integrations and Laravel package boundaries. Strongly supported as a current cross-layer principle; exact transport choices remain project-specific. **Confidence:** medium.

**Exceptions and limits:**

- Recent Salta migration work is agent-associated in session context even where commit trailers are absent; do not call it independently human-authored style or extrapolate it to every project.
- Native API reuse is a review preference, not permission to change existing transport or public behavior.
- The earlier Commerce fix and September removal of a forced recalculation mode corroborate owner-respecting behavior outside only the November migration.

**Sources:** [BE:R-4493166337](https://github.com/robuust/salta/pull/5188#discussion_r4493166337); [BE:R-4440234601](https://github.com/robuust/salta/pull/5146#discussion_r4440234601); [BE:C-47e370d1cdf2](https://github.com/joostwaaijer/commerce/commit/47e370d1cdf207489941c6331a0817ef348f60d3); [BE:C-6ff366aff4bd](https://github.com/robuust/salta/commit/6ff366aff4bdc623b1cd17d59532003bfa51a66f)

**Counterevidence:** [BE:C-fc7d7195e5b9](https://github.com/robuust/albo/commit/fc7d7195e5b9ee88b8b50cae3123ed5e8007de2d); [BE:C-c2e39deccbdf](https://github.com/robuust/vastgoedmonitor/commit/c2e39deccbdff94867b1ec45eb723015c544672d)

**Chronology:** January Commerce class constant; August Spatie relation reuse; September Craft Commerce correction; October/November native Craft migration/review rationale.
