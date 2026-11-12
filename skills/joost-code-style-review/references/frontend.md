# Frontend and template preferences

Follow installed APIs and current repository conventions. A current preference is not authorization for a framework migration.

## FE01 — Prefer the supported framework/component path over custom transport or duplicated form bookkeeping.

**Scope:** Laravel + Inertia 3 + Vue; RVC polymorphic Drawer/Modal/ButtonBase; Stimulus supported values/classes. **Confidence:** high.

**Review:** default review principle; inspect installed APIs and actual endpoint contract first.

**Examples:** Drawer :as="Form" with named native inputs; Form slots provide errors/processing; ButtonBase :as="Link" for link navigation.

**Targeted reinforcement (2026-11-12):** Check whether the form API already owns newly added processing/error/reset bookkeeping. A separate `useForm` can still be the smaller correct choice for an operation with its own payload and lifecycle ([RF28](feedback.md#rf28--native-form-bookkeeping-with-an-independent-lifecycle)). When the page can own an appropriately sized, authorized option set, consider an Inertia prop and supported local options before adding search transport; preserve remote search when cardinality or endpoint behavior calls for it ([RF29](feedback.md#rf29--native-options-with-permission-and-component-contracts)). Inspect the installed defaults before adding explicit mappings to silence a review question.

**Exception:** Plain fetch is appropriate for a non-Inertia Craft JSON action. Earlier useForm/drawer-save conventions were valid before later declarative Form integration. Do not ban useForm, native forms, fetch, custom state, or library extensions when their contract requires them.

**Sources:** [FE:R3032165356](https://github.com/robuust/albo/pull/444#discussion_r3032165356); [FE:R3503607666](https://github.com/robuust/kuipers-logistics-portal/pull/1530#discussion_r3503607666); [FE:C06](https://github.com/robuust/haarhuis-portaal/blob/688ca4260ba93122f9a76563068fb82644849c1d/resources/js/composables/useInertia.js#L10); [FE:C11](https://github.com/robuust/inventflow-portaal/blob/fd58202755adedd0ec6ca74a6ac698488905f9bc/resources/js/components/DrawerClient.vue#L4)

**Counterevidence:** [FE:C25](https://github.com/robuust/inventflow-portaal/blob/3935a4374526287ebbfcd9ad6d08c2994408e0da/resources/js/pages/Reports/ServiceReport/General.vue#L550); [FE:R4493330830](https://github.com/robuust/salta-inertia/pull/97#discussion_r4493330830); [FE:R3549458729](https://github.com/robuust/kuipers-logistics-portal/pull/1585#discussion_r3549458729)

**Chronology:** Own custom Inertia helpers removed March; Drawer Form June; reviewed on others July-August; direct slot state September; native Craft exception November.

**Attribution limits:** Inertia version and RVC slot pass-through support changed during year; Framework API preference is shared with team, not unique syntax.

## FE02 — Keep server/prop/model state authoritative; derive values directly rather than keeping a second reactive copy.

**Scope:** Vue controlled components; Inertia filters and drawer models. **Confidence:** high.

**Review:** review duplicate state only when no separate editable lifecycle requires it.

**Examples:** writable computed getter from prop + emit setter; defineModel for drawer editor; server props drive filters without another reactive filters object.

**Exception:** An editable form, upload preview, open/show action, or distinct modal lifecycle still needs state. Old Options API code and initial local forms exist; do not force an unrelated migration.

**Sources:** [FE:R3568403030](https://github.com/robuust/kuipers-logistics-portal/pull/1595#discussion_r3568403030); [FE:R3704426157](https://github.com/robuust/huisartsenzorg-twente/pull/88#discussion_r3704426157); [FE:C05](https://github.com/robuust/vue-components/blob/3e8c8ef323a2a1d1b09f3c497166b391182b7fa9/src/components/Pagination.vue#L123); [FE:C12](https://github.com/robuust/inventflow-portaal/blob/95d71802a9ecc7b5156d732ae97140268780698b/resources/js/layouts/ReportFormLayout.vue#L176)

**Counterevidence:** [FE:C01](https://github.com/robuust/heerdink-planning/blob/822e5d7ea46f41909f6de2fbc44f13dd9ce5babc/resources/js/components/UserForm.vue#L215); [FE:C25](https://github.com/robuust/inventflow-portaal/blob/3935a4374526287ebbfcd9ad6d08c2994408e0da/resources/js/pages/Reports/ServiceReport/General.vue#L550); [FE:R3570365818](https://github.com/robuust/kuipers-logistics-portal/pull/1594#discussion_r3570365818)

**Chronology:** March Pagination fixes copied prop ref; August reviews propose defineModel and code groups show/form; October reviews repeat grouped drawer action state.

**Attribution limits:** Vue computed/defineModel are framework APIs; Predictable drawer object shape is project convention, not permission to mutate all props.

## FE03 — Establish a predictable data shape, then remove redundant guards and fallbacks; retain real optional cases.

**Scope:** Craft Twig known entry types and fields; Vue backend props and edit models. **Confidence:** high.

**Review:** only flag a guard when the owning contract proves it redundant.

**Examples:** required relation accessed directly; empty object model with direct id check; one field check rather than repeated is defined and object checks.

**Exception:** A menuImage/null fallback was proposed for mixed entry types, then superseded by an agreed product-only image design; this shows a considered alternative rather than an adopted fallback. Soft-deleted courses require a length check; external selected material is checked and 404s when invalid; library optional options need guards. Never encode a blanket optional-chaining/fallback ban.

**Sources:** [FE:R2754415327](https://github.com/robuust/albo/pull/160#discussion_r2754415327); [FE:R2781439562](https://github.com/robuust/albo/pull/193#discussion_r2781439562); [FE:C03](https://github.com/robuust/bellezi/blob/35e1bde3f1a0ffd8ab5b406d48e705464bec2120/templates/_pages/wizard/materials.twig#L15); [FE:C04](https://github.com/robuust/albo/blob/3868b9c501e760e4c2e8b5633c76b42d6a557265/templates/_pages/doors/_product.twig#L145)

**Counterevidence:** [FE:C03](https://github.com/robuust/bellezi/blob/35e1bde3f1a0ffd8ab5b406d48e705464bec2120/templates/_pages/wizard/materials.twig#L15); [FE:C24](https://github.com/robuust/vue-components/blob/6892b6c9c8310a1b04c08a4b3f561ecab4c116e0/src/components/Combobox.vue#L298); [FE:R2930233359](https://github.com/robuust/albo/pull/328#discussion_r2930233359)

**Chronology:** Explicit removals Feb/Apr/May/Jul and reviews into Oct; meaningful fallback request Mar and soft-delete guard Sep.

**Attribution limits:** Some required fields/singles depend on project config; Prefer backend shape only where already authoritative.

## FE04 — Keep behavior with its owning component and extract shared code when there is real reuse or a meaningful responsibility.

**Scope:** Vue component/drawer boundaries; Twig blocks and partials; Composables. **Confidence:** high.

**Review:** trace wrapper props and events to the installed component API and effective owner. Consider removing connected pass-through layers together when they add no responsibility; retain justified extraction. See [effective-consumer inspection](model-names-behavior.md#redundant-layers-follow-the-effective-behavior).

Use the paired [RF27](feedback.md#rf27--shared-interaction-component-versus-a-pass-through-wrapper) example: a shared category header owns repeated interaction markup, while a one-use modal wrapper merely forwards the existing modal and page form. Neither a caller-count threshold nor a ban on wrappers follows. Preserve real confirmation state, slots and events when proposing the connected simplification.

**Examples:** drawer owns its save behavior; shared invoice details or consumer/pro product blocks; local computed for one phone link; shared Craft form helper for actual shared submission behavior.

**Exception:** Reusable permission composable, a modal with its own responsibility, repeated flashes partial, and project-wide component defaults are welcomed. This is selective abstraction, not anti-component or anti-composable.

**Sources:** [FE:R2840558068](https://github.com/robuust/albo/pull/237#discussion_r2840558068); [FE:R3064488296](https://github.com/robuust/albo/pull/473#discussion_r3064488296); [FE:C07](https://github.com/robuust/betonlook/blob/912ec648e93a09ef0f8daea529d11592394e8f63/templates/_pdf/index.twig#L50); [FE:C18](https://github.com/robuust/salta-inertia/blob/883357244fe05b2d55be9c8dd6723292747df5b3/resources/js/pages/ServiceContact.vue#L282)

**Counterevidence:** [FE:C23](https://github.com/robuust/albo/blob/762b33b109ecaef0bee0ac7e917c3c6991f5b620/templates/_pages/doors/_product-blocks.twig#L138); [FE:R3570536352](https://github.com/robuust/kuipers-logistics-portal/pull/1598#discussion_r3570536352); [FE:R3803387741](https://github.com/robuust/inventflow-portaal/pull/568#discussion_r3803387741)

**Chronology:** Jan repeated PDF details; Apr flashes suggestion; Jul form wrapper objections and ownership; May/Nov real shared blocks/helper.

**Attribution limits:** Review comments are contextual; one-off components can still be justified by responsibility; Not a numeric minimum-caller rule.

## FE05 — Use domain-specific names and canonical backend/CMS field names; keep component identity aligned with the model.

**Scope:** Twig loop/include variables; Vue drawer names; Form names and API fields. **Confidence:** high.

**Review:** flag ambiguous names or contract renaming that causes confusion; do not normalize all keys to one case.

A derived page boolean can describe a different role from its submitted request flag. In #578, `hasPrefilledMaterials` clarifies the page prop while `materials_prefilled` remains the wire key. This supports a concrete semantic name, not mandatory `has` prefixes or renamed copies of established fields. [Feedback and adopted change](https://github.com/robuust/haarhuis-portaal/pull/578#discussion_r4548928306).

**Examples:** inspirationEntry/inspirationEntries, employee, videoSlider; stable message[address]/message[zipcode] keys instead of translated labels; drawer/model names agree.

**Exception:** Existing backend snake_case and Craft camelCase coexist. A simple one-use URL expression may be clearer inline. Domain naming does not require renamed copies of contract fields.

**Sources:** [FE:R2740856846](https://github.com/robuust/albo/pull/145#discussion_r2740856846); [FE:R2759454981](https://github.com/robuust/albo/pull/167#discussion_r2759454981); [FE:C22](https://github.com/robuust/q-line/blob/83cb50321597db8a4764e8f11196fa721526e543/templates/_partials/_product-quote.twig#L72); [FE:C27](https://github.com/robuust/salta-inertia/blob/66d2035cb46f8d6bfcc72e961b005fb6ba467868/resources/js/composables/useCraftForm.js#L9)

**Counterevidence:** [FE:C01](https://github.com/robuust/heerdink-planning/blob/822e5d7ea46f41909f6de2fbc44f13dd9ce5babc/resources/js/components/UserForm.vue#L215); [FE:R2864524196](https://github.com/robuust/albo/pull/253#discussion_r2864524196)

**Chronology:** Stable form keys Jan; domain include names Feb/Apr; drawer names Sep; mock pagination structure Jul/Nov.

**Attribution limits:** CMS reserved/context names and Laravel resource naming are stack conventions; No evidence for universal camelCase vs snake_case renaming.

## FE06 — Keep trivial one-use expressions inline; name repeated or complex/reactive expressions at the narrowest useful scope.

**Scope:** Vue templates and script setup; Twig partial expressions. **Confidence:** high.

**Review:** readability preference with contextual judgment, not a strict line-count rule. Count independently required consumers, not just textual references: a redundant binding does not justify a computed value. Reevaluate the connected simplification while retaining meaningful names and complex/shared derivations.

**Examples:** one inline router.get callback instead of one-line wrapper; one title const reused for heading and layout; computed phone href for complex normalization; isLearnType reused throughout a partial.

**Exception:** Complex normalization merits computed; reusable derived values merit computed. cancelReport inline is explicitly called personal preference, so do not raise cosmetic extraction/inline differences as functional bugs.

**Sources:** [FE:R2863446623](https://github.com/robuust/albo/pull/252#discussion_r2863446623); [FE:R2864524196](https://github.com/robuust/albo/pull/253#discussion_r2864524196); [FE:C09](https://github.com/robuust/haarhuis-portaal/blob/7b33084bdfadf8e050a0dc20f5ceb7d285e65a2d/resources/js/pages/App/WorkOrders/Registrations/Form.vue#L382); [FE:C18](https://github.com/robuust/salta-inertia/blob/883357244fe05b2d55be9c8dd6723292747df5b3/resources/js/pages/ServiceContact.vue#L282)

**Counterevidence:** [FE:R4492419587](https://github.com/robuust/salta-inertia/pull/96#discussion_r4492419587); [FE:R3173192244](https://github.com/robuust/inventflow-portaal/pull/211#discussion_r3173192244)

**Chronology:** One-use Twig expressions Feb; repeated bool/title May; one-use callbacks Sep-Nov; complex computed Nov.

**Attribution limits:** Author explicitly labels one such choice personal preference; Simple does not mean shortest expression at all costs.

## FE07 — Give Twig partials explicit context and domain names where they are intended to be independent.

**Scope:** Craft Twig reusable partials. **Confidence:** high within Craft; medium as a universal include rule.

**Review:** review accidental entry shadowing or undeclared context; use only for deliberate narrow contracts.

**Examples:** include employee partial with { employee } only; videoSlider rather than overwriting entry; include tab.template with tab.context only.

**Exception:** Existing inherited layout blocks and PDF detail partials intentionally use surrounding context. Own code uses Twig use for shared blocks. Do not blindly append only without inventorying required values.

**Sources:** [FE:R2781401917](https://github.com/robuust/albo/pull/193#discussion_r2781401917); [FE:R2781408385](https://github.com/robuust/albo/pull/193#discussion_r2781408385); [FE:C23](https://github.com/robuust/albo/blob/762b33b109ecaef0bee0ac7e917c3c6991f5b620/templates/_pages/doors/_product-blocks.twig#L138)

**Counterevidence:** [FE:C07](https://github.com/robuust/betonlook/blob/912ec648e93a09ef0f8daea529d11592394e8f63/templates/_pdf/index.twig#L50); [FE:C23](https://github.com/robuust/albo/blob/762b33b109ecaef0bee0ac7e917c3c6991f5b620/templates/_pages/doors/_product-blocks.twig#L138)

**Chronology:** Repeated explicit review instructions Feb and Apr; own explicit-context tab include retained in May shared extraction.

**Attribution limits:** Most direct review evidence is Albo; Twig only is language-supported context isolation, not distinctive formatting.

## FE08 — Use short purpose-oriented function documentation; avoid redundant void return tags and repeating available TypeScript types.

**Scope:** JavaScript/Vue JSDoc; typed Vue component methods. **Confidence:** high for avoiding redundant tags; medium for exact docblock coverage.

**Review:** follow project documentation rules; do not require every callback/debounced function to have JSDoc.

**Examples:** purpose sentence above save/calculation methods; param/return docs where they add actual contract information; typed searchLocalOptions(value: string | null): void with short purpose comment.

**Exception:** Joost also asks others for docblocks and acknowledges colleagues request docs for simple methods. The code keeps useful method docs, section labels and actionable TODOs. Reject both all-functions-must-have-JSDoc and no-comments rules.

**Sources:** [FE:R3689359449](https://github.com/robuust/vue-components/pull/703#discussion_r3689359449); [FE:R4079914946](https://github.com/robuust/huisartsenzorg-twente/pull/176#discussion_r4079914946); [FE:C08](https://github.com/robuust/haarhuis-portaal/blob/a2f60292478d622257a24b4ac7605cdcb934d15b/resources/js/components/DrawerLibraryItem.vue#L437); [FE:C21](https://github.com/robuust/betonlook/blob/e1aa9103060844b3e352d0c92025c6c16fbe7318/src/js/controllers/password_controller.js#L25)

**Counterevidence:** [FE:C25](https://github.com/robuust/inventflow-portaal/blob/3935a4374526287ebbfcd9ad6d08c2994408e0da/resources/js/pages/Reports/ServiceReport/General.vue#L550); [FE:R2622533381](https://github.com/robuust/vue-components/pull/449#discussion_r2622533381); [FE:R3173187388](https://github.com/robuust/inventflow-portaal/pull/211#discussion_r3173187388)

**Chronology:** Docblock request Dec; April3 purpose+void tags added then void tags removed 18min later; May acknowledges team convention; July typed-param duplication disputed and colleague agrees; Sep debounced function exception.

**Attribution limits:** Project author banners and // Props/Methods/Data are team/template structure; Git author/account attribution does not prove personal composition.

## FE09 — In current Robuust Vue script-setup code, follow template-first organization and agreed arrow-function convention.

**Scope:** current Robuust Vue SFCs with script setup, especially Salta Inertia. **Confidence:** high as observed current convention; low as year-long personal identity.

**Review:** consistency preference only; no broad rewrites of old components.

**Examples:** template before script setup; const close = () => { ... };.

**Exception:** Older Options API components are retained. Before agreeing the Nov change, declaration style existed across Salta. In a July review, Joost accepts both short and expanded callback-variable names and objects to unrelated cosmetic PR expansion. That source does not compare function declarations with arrow functions.

**Sources:** [FE:R4440459847](https://github.com/robuust/salta-inertia/pull/42#discussion_r4440459847); [FE:R4441941410](https://github.com/robuust/salta-inertia/pull/42#discussion_r4441941410); [FE:C19](https://github.com/robuust/salta-inertia/blob/3651af1a95187f154d8853d335f49eeeaf5b4816/resources/js/layouts/StorefrontLayout.vue#L1); [FE:C20](https://github.com/robuust/salta-inertia/blob/2c213ad531824f4efb68c7908641db3c77cefd18/resources/js/components/SearchForm.vue#L132)

**Counterevidence:** [FE:C01](https://github.com/robuust/heerdink-planning/blob/822e5d7ea46f41909f6de2fbc44f13dd9ce5babc/resources/js/components/UserForm.vue#L215); [FE:R4440551889](https://github.com/robuust/salta-inertia/pull/42#discussion_r4440551889); [FE:R3620149077](https://github.com/robuust/kuipers-logistics-portal/pull/1609#discussion_r3620149077)

**Chronology:** Options API Nov2025; arrows common in typed library July2026; explicit script reorder Oct26; arrow convention agreed after team feedback Nov2.

**Attribution limits:** Arrow feedback came from Rutger/Bob; it is adopted team convention; Projects import shared ESLint presets for formatting; not evidence of unique personal style.

## FE10 — Do not invent a personal Tailwind/CSS formatting or accessibility policy from this sample.

**Scope:** Tailwind/CSS/Twig/Vue review. **Confidence:** high confidence in limitation.

**Review:** defer to repository design, semantics, and lint rules.

**Examples:** remove empty class attribute when inactive; use supported Stimulus classes rather than custom replacement.

**Exception:** Tailwind3/4 utility code, old custom CSS conventions, and inline PDF styles coexist for different projects. No comparable explicit repeated personal utility-order/breakpoint policy was established. An isolated request to remove empty alt should not become an accessibility rule.

**Sources:** [FE:R3028247006](https://github.com/robuust/albo/pull/443#discussion_r3028247006); [FE:R3028253445](https://github.com/robuust/albo/pull/443#discussion_r3028253445)

**Counterevidence:** [FE:C01](https://github.com/robuust/heerdink-planning/blob/822e5d7ea46f41909f6de2fbc44f13dd9ce5babc/resources/js/components/UserForm.vue#L215); [FE:C07](https://github.com/robuust/betonlook/blob/912ec648e93a09ef0f8daea529d11592394e8f63/templates/_pdf/index.twig#L50); [FE:C19](https://github.com/robuust/salta-inertia/blob/3651af1a95187f154d8853d335f49eeeaf5b4816/resources/js/layouts/StorefrontLayout.vue#L1)

**Chronology:** Project-era/framework differences throughout year.

**Attribution limits:** Large amount of frontend design work belongs to other authors; Automatic sorting/ESLint/Stylelint and imported templates obscure personal intent.
