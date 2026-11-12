# Patterns in Joost's own PR reviews

This branch adds review-scope and cross-cutting guidance from comments on other authors' PRs. It corroborates the stack rules rather than supplying independent recurrence when the same source ID appears twice. All 1,699 bodies were screened across 648 PRs in 52 repositories; 213 inline anchor contexts were inspected and 143 source records were selected for 12 nuanced rules. Selected hunk excerpts and available parent/direct replies were inspected; not every complete hunk, reply, or resulting implementation was adjudicated. These counts are not theme prevalence or verified adoption rates.

Apply a direct request, optional suggestion, question, explicit preference, project convention, and later correction with their different evidential weight. Current code still decides technical validity. Historical testing/fixture comments grant no permission to write, modify, or run tests.

## WR01 — Make a PR a complete, reviewable slice of one purpose

Complete the agreed behavior or coherent sub-issue enough to judge its consumers and data. Remove unrelated edits and empty future scaffolding. Split independent features rather than fragmenting one feature merely to reduce file count. For intentional staging, define the boundary and link the next PR/stack.

**Scope:** Cross-stack PR scope and handoffs. **Confidence:** high.

**Interpretation:** Repeated reviewability preference, also shared engineering practice.

**Limits:**

- No universal file/line-count limit.
- Complete means the agreed slice, not every later phase.
- Replies reporting a fix are not independently verified adoption.

**Counterexamples and corrections:**

- Both callback-variable spellings are fine; unrelated cosmetic expansion needlessly lengthens the PR. [I-3620149077](https://github.com/robuust/kuipers-logistics-portal/pull/1609#discussion_r3620149077)
- Scope splitting may improve readability, but explicitly not in this PR. [I-3664970360](https://github.com/robuust/zusters-van-denekamp/pull/1364#discussion_r3664970360)
- Rename remaining variables in the CRUD PR. [I-4129944901](https://github.com/robuust/huisartsenzorg-twente/pull/192#discussion_r4129944901)
- A legitimate storage/fixtures/read-view phase explicitly defers participant input, question management and invitations; structured prose is not handwriting evidence. [W-IC_kwDOS7XaKs8AAAABew9wQA](https://github.com/robuust/huisartsenzorg-twente/pull/272#issuecomment-6359576640)

**Supporting review statements:**

- Unfinished service/job/command boilerplate hides the design; finished models plus migrations are suggested as a coherent first slice. (question or discussion) [I-2542043015](https://github.com/CasSchuurman1/housescan/pull/128#discussion_r2542043015)
- A loop that only contains a TODO dispatch is not implemented. (direct request) [I-2546163439](https://github.com/CasSchuurman1/housescan/pull/131#discussion_r2546163439)
- Removing profiles and updating structure are two independent purposes to split. (direct request) [W-PRR_kwDOQ9f0587prXCJ](https://github.com/robuust/albo/pull/276#pullrequestreview-3920457865)

**Related stack rules:** FE09. These can share the same historical review sources.

**Chronology:** Nov 2025 Housescan; Mar 2026 Albo; Jul Kuipers/Zusters; Sep-Oct HZT. The Jul explanation resolves small-PR versus complete-feature tension.

## WR02 — Choose concise names that expose the relevant domain and role

Use names that identify the domain object and operation. Use plural deliberately and avoid colliding with ambient template context. Remove qualifiers already supplied by the namespace or relationship; longer names are not automatically clearer.

**Scope:** PHP controllers/models/scopes; Vue components/state; Craft/Twig variables/fields. **Confidence:** high.

**Interpretation:** Repeated readability preference; exact spelling and some collisions are contextual conventions.

**Limits:**

- No universal casing, prefix or maximal-name policy.
- Craft entry is ambient context; the review wording reserved word is not independent proof of a Twig language restriction.
- Treat aesthetic alternatives as suggestions unless ambiguity matters.

**Counterexamples and corrections:**

- Over-detailed shouldSkipByBuildInfo can become more generic. [I-2514158396](https://github.com/CasSchuurman1/housescan/pull/107#discussion_r2514158396)
- A reusable CMS field should be Heading, with specific layout labels. [I-2727640818](https://github.com/robuust/albo/pull/113#discussion_r2727640818)
- canManageDocuments suggestion is challenged because the Documents component already supplies context. [I-2730535076](https://github.com/robuust/equiception-crm/pull/2215#discussion_r2730535076)
- Both short and expanded callback names are fine; avoid cosmetic churn. [I-3620149077](https://github.com/robuust/kuipers-logistics-portal/pull/1609#discussion_r3620149077)

**Supporting review statements:**

- form-submissions/WebsiteFormsController does not say what is stored. (question or discussion) [I-2533736564](https://github.com/robuust/bellezi-erp/pull/2303#discussion_r2533736564)
- A long listener name still hides TaskCreated. (optional suggestion) [I-2580184317](https://github.com/robuust/bellezi-erp/pull/2344#discussion_r2580184317)
- Array of scores should have a plural variable name. (direct request) [I-2580480453](https://github.com/CasSchuurman1/housescan/pull/145#discussion_r2580480453)

**Related stack rules:** BE03, FE05, FE07. These can share the same historical review sources.

**Chronology:** Event/domain names Nov-Dec; Craft context Jan-Apr; plural task scope Jul; booking Aug; model-aligned drawer Sep; redundant qualifiers Oct.

## WR03 — Keep canonical domain data and relationships authoritative

Keep established model/column/relation keys in Resources, Inertia props and mocks. Avoid a second name or stored derived value that can disagree with its owner. Preserve relationship structure, while allowing deliberately different presentation values. Change the actual schema when the domain changes.

**Scope:** Laravel Resources/API/Inertia; Database modeling; Craft handles; Frontend mock shapes. **Confidence:** high.

**Interpretation:** Clear recurring expressed preference, partly contract stability/correctness.

**Limits:**

- Do not rename public API fields without an intentional contract change.
- Computed or semantically distinct values are permitted.
- Existing BE/FE copies of these review IDs are not independent recurrence.

**Counterexamples and corrections:**

- Translated enum label is semantically different from stored English value and may have its own method. [I-2541792228](https://github.com/CasSchuurman1/housescan/pull/128#discussion_r2541792228)
- Computed space_name on the bookable owner can be useful. [I-2994501839](https://github.com/robuust/zusters-van-denekamp/pull/1077#discussion_r2994501839)
- Clarifies mocks follow agreed shape while real sorting/filtering can wait for backend integration. The long report format is not independent personal-style evidence. [I-4479512743](https://github.com/robuust/addsoft-storec-archive/pull/20#discussion_r4479512743)

**Supporting review statements:**

- Stored renovation percentage and enum can contradict each other. (correctness or contract request) [I-2541802814](https://github.com/CasSchuurman1/housescan/pull/128#discussion_r2541802814)
- Use the field handle rather than mutable title format. (direct request) [I-2740856846](https://github.com/robuust/albo/pull/145#discussion_r2740856846)
- Do not map client_id to customer_id for frontend taste; adapt consumers or deliberately rename schema/relationship. (direct request) [I-3568375319](https://github.com/robuust/kuipers-logistics-portal/pull/1595#discussion_r3568375319)

**Related stack rules:** BE03, BE11, FE05. These can share the same historical review sources.

**Chronology:** Nov contradictory modeling; Jan Craft handle; strongest directive Jul 13; Aug source-of-truth/schema; Oct relation key; Nov pagination.

## WR04 — Prefer supported native APIs over custom equivalents

Inspect the installed framework/library API before adding manual parsing, deletion, conversion, transport or form bookkeeping. Use the native path if it preserves required behavior; verify actual relationship types and edge cases before prescribing a helper.

**Scope:** Laravel/Eloquent/Carbon/Spatie; Inertia/Vue/components; Craft/Twig/Stimulus. **Confidence:** high.

**Interpretation:** Repeated idiomatic-framework preference; much is convention or correctness rather than unique syntax.

**Limits:**

- Historical suggestions are not proof an API exists or preserves behavior.
- No blanket ban on adapters, transforms, helpers or dependencies.

**Counterexamples and corrections:**

- Initial never-serialize-models claim is corrected in the thread. [I-3258732535](https://github.com/robuust/haarhuis-portaal/pull/272#discussion_r3258732535)
- Acknowledges Queueable serializes models; remaining concern is loaded-relation control. [I-3258784959](https://github.com/robuust/haarhuis-portaal/pull/272#discussion_r3258784959)
- Confirms Queueable already handles it and accepts existing usage for now. [I-3259032370](https://github.com/robuust/haarhuis-portaal/pull/272#discussion_r3259032370)
- One-of-many suggestion is contested because full collection remains needed for contact_ids. [I-3426782415](https://github.com/robuust/clubee-v2/pull/2826#discussion_r3426782415)
- sync suggestion is contested because LoadClass is HasMany. [I-4068807592](https://github.com/robuust/kuipers-logistics-portal/pull/1806#discussion_r4068807592)
- Replies explain why selected-user-object to IDs mapping remains required by Combobox; minimal transforms are legitimate. [I-4294494101](https://github.com/robuust/kuipers-logistics-portal/pull/1881#discussion_r4294494101)

**Supporting review statements:**

- singleFile already replaces media, so clearing first is redundant. (direct request) [I-2522500175](https://github.com/robuust/blent/pull/113#discussion_r2522500175)
- DateTimeHelper appears to duplicate Carbon. (question or discussion) [I-2966249663](https://github.com/robuust/zusters-van-denekamp/pull/1058#discussion_r2966249663)
- Checkbox v-model can remove custom array toggling if the design/component supports it. (question or discussion) [I-3078507003](https://github.com/robuust/haarhuis-portaal/pull/151#discussion_r3078507003)

**Related stack rules:** BE01, BE05, BE08, BE12, FE01. These can share the same historical review sources.

**Chronology:** Native APIs requested throughout the year; corrected technical recommendations prevent freezing historical advice into unconditional rules.

## WR05 — Keep behavior with its owning layer or component

Keep domain checks, normalization and data selection with established backend owners. Resources expose the intentionally loaded graph. Drawers/forms own their submission, and shared auth data should not be duplicated through unrelated parents.

**Scope:** Laravel request/model/query/resource boundaries; Inertia/Vue drawer ownership; Craft partial contracts. **Confidence:** high.

**Interpretation:** Repeated responsibility-boundary preference, conditional on real consumers.

**Limits:**

- No universal move-all-logic-to-models/resources/controllers rule.
- UI permission reuse does not replace server authorization.
- Loaded relation and nullable relation are different contracts.

**Counterexamples and corrections:**

- Single-context model method may belong at its caller. [I-3324513599](https://github.com/robuust/zusters-van-denekamp/pull/1235#discussion_r3324513599)
- Invoice-specific Guest helper is not automatically model logic. [I-3735454431](https://github.com/robuust/zusters-van-denekamp/pull/1419#discussion_r3735454431)
- Request preparation is optional; explicitly calls current model-scope validation correct. [I-3577510526](https://github.com/robuust/kuipers-logistics-portal/pull/1600#discussion_r3577510526)
- Partial-local header/footer reads are explicitly a discussion, not a requested change. [I-4440150119](https://github.com/robuust/q-line/pull/3848#discussion_r4440150119)

**Supporting review statements:**

- Questions business checks split between backend actions and invoice Vue page; model attributes are possible owners. (question or discussion) [I-2965616041](https://github.com/robuust/zusters-van-denekamp/pull/1057#discussion_r2965616041)
- Relation-reading accessor can cause N+1; suggests conditional Resource representation. (correctness or contract request) [I-3272641515](https://github.com/robuust/zusters-van-denekamp/pull/1201#discussion_r3272641515)
- Drawer should own save behavior so the drawer is reusable. (direct request) [I-3543444240](https://github.com/robuust/kuipers-logistics-portal/pull/1585#discussion_r3543444240)

**Related stack rules:** BE02, BE06, BE07, FE02, FE04, FE07. These can share the same historical review sources.

**Chronology:** Mar business ownership; May-Jun loaded graph; Jul drawer-save boundary; Aug narrow helper; Oct modal ownership; Nov local partial reads.

## WR06 — Remove defensive noise only after proving the contract

Question duplicate casts, fallbacks, type guards, checks and secondary state when required data or native behavior already guarantees the value. Establish that guarantee before removing protection. Preserve real optional states, external-input normalization and meaningful errors.

**Scope:** Validated Laravel internals; Required Vue props/state; Craft templates with known entry types. **Confidence:** high.

**Interpretation:** Very recurrent conditional readability preference, not dogmatic minimalism.

**Limits:**

- A reviewer asking whether an invariant exists does not prove it.
- No ban on nullsafe operators, validation, casts or fallbacks.
- Use current code to establish the real boundary.

**Counterexamples and corrections:**

- Legacy records really lack created_at according to the reply. [I-2585355666](https://github.com/robuust/loogisch-portaal/pull/2897#discussion_r2585355666)
- Normal forms send arrays, but author identifies direct scalar query strings; invariant is disputed. [I-2831721031](https://github.com/robuust/albo/pull/224#discussion_r2831721031)
- Nullable variants need guarding before .id dereference, qualifying the earlier simplification. [I-2832308266](https://github.com/robuust/bellezi/pull/3459#discussion_r2832308266)
- Fallback suggested for mixed entry types; subsequent design agreement keeps images product-only. Shows openness, not final fallback requirement. [I-2930233359](https://github.com/robuust/albo/pull/328#discussion_r2930233359)
- company_name check is required; account-ID check may be redundant. [I-3310618594](https://github.com/robuust/zusters-van-denekamp/pull/1219#discussion_r3310618594)
- Assumed Asset invariant is challenged: reply says this is a separate URL field. [I-3505228778](https://github.com/robuust/steggink/pull/227#discussion_r3505228778)
- Create route can really have no report, so nullable guard has a reason. [I-3620202935](https://github.com/robuust/kuipers-logistics-portal/pull/1609#discussion_r3620202935)
- Deleted courses remain with participants for six months; asks for empty-state check. [I-4129962539](https://github.com/robuust/huisartsenzorg-twente/pull/192#discussion_r4129962539)
- Stripping a bare homepage origin yields empty path; explicitly requests / fallback. [I-4397892744](https://github.com/robuust/robuust/pull/816#discussion_r4397892744)

**Supporting review statements:**

- Known articleType field makes is-defined scaffolding redundant in this entry-type-specific template. (direct request) [I-2754415327](https://github.com/robuust/albo/pull/160#discussion_r2754415327)
- Fallback removal is explicitly conditional on no other entry types using the template. (optional suggestion) [I-3098873853](https://github.com/robuust/albo/pull/513#discussion_r3098873853)
- Required validation makes constructor defaults duplicative in this call path. (direct request) [I-3258815709](https://github.com/robuust/haarhuis-portaal/pull/272#discussion_r3258815709)

**Related stack rules:** BE04, FE02, FE03. These can share the same historical review sources.

**Chronology:** Nov-Dec casts/null questions; Feb-Apr known entry types; May validated defaults; Jun-Jul defensive noise; Sep-Oct real deletion/homepage fallbacks.

## WR07 — Extract for concrete reuse or meaningful responsibility

Keep trivial one-use logic close to its caller. Avoid wrappers/filters/traits/components that only rename behavior or add exceptions to fake reuse. Extract repeated implementation or coherent responsibility when callers become clearer; prefer a private/local helper before a broad abstraction when enough.

**Scope:** PHP helpers/scopes/traits/actions; Vue composables/components; Twig partials/blocks/Craft fields. **Confidence:** high.

**Interpretation:** Selective abstraction is supported in both directions.

**Limits:**

- Not a numeric minimum-caller rule.
- Meaningful responsibility/readability can justify one-caller extraction.
- Do not delete settled architecture solely for being small.

**Counterexamples and corrections:**

- Base scraping job should share common logic rather than copying into site jobs. [W-PRR_kwDOP3XaFM7Ng7_f](https://github.com/CasSchuurman1/housescan/pull/107#pullrequestreview-3447963615)
- One-boolean model objection is answered by its options relation and acknowledged. [I-2517732234](https://github.com/robuust/blent/pull/111#discussion_r2517732234)
- Existing cross-project file-sync trait is concrete reuse. [I-2549822769](https://github.com/robuust/bellezi-erp/pull/2319#discussion_r2549822769)
- Repeated flash markup justifies partial. [I-3064488296](https://github.com/robuust/albo/pull/473#discussion_r3064488296)
- Address parameters support real cross-model/workspace reuse. [I-3115533635](https://github.com/robuust/haarhuis-portaal/pull/176#discussion_r3115533635)
- Separate jobs entry type justified once structure diverges. [I-3117803574](https://github.com/robuust/albo/pull/534#discussion_r3117803574)
- Complex getForMonth merits readable method extraction. [I-3309113693](https://github.com/robuust/loogisch-portaal/pull/3293#discussion_r3309113693)
- Inline JS template deserves component. [I-3702655669](https://github.com/robuust/zusters-van-denekamp/pull/1391#discussion_r3702655669)
- Repeated reload logic across files justifies composable. [I-3801741604](https://github.com/robuust/bellezi-erp/pull/2740#discussion_r3801741604)
- Repeated pagination options justify considering library defaults. [I-3819963870](https://github.com/robuust/inventflow-portaal/pull/578#discussion_r3819963870)
- Extracting drawer responsibility makes a large page clearer. [I-4193131055](https://github.com/robuust/egberts-rubber-measurements/pull/190#discussion_r4193131055)
- Repeated HTTP configuration justifies macro. [I-4258650309](https://github.com/robuust/egberts-rubber-measurements/pull/207#discussion_r4258650309)
- Private loading/progress helper improves readability without a second caller. [I-4325396031](https://github.com/robuust/egberts-rubber-measurements/pull/256#discussion_r4325396031)
- Identical CMS field settings justify reusing field. [I-4424352595](https://github.com/robuust/hoek/pull/121#discussion_r4424352595)

**Supporting review statements:**

- Questions single-expression totalMaxScore wrapper. (question or discussion) [I-2581002592](https://github.com/CasSchuurman1/housescan/pull/145#discussion_r2581002592)
- Trait shares nothing if every enum overwrites displayValue. (question or discussion) [I-3395617528](https://github.com/robuust/inventflow-portaal/pull/322#discussion_r3395617528)
- One-drawer form wrapper is unnecessary; reply reports restoring markup to drawer. (question or discussion) [I-3543448692](https://github.com/robuust/kuipers-logistics-portal/pull/1585#discussion_r3543448692)

**Related stack rules:** BE09, FE04, FE06. These can share the same historical review sources.

**Chronology:** Nov base-job reuse; Dec one-liner objection; Feb-May shared Twig; Aug local helper/library settings; Sep-Nov scope/wrapper limits; Oct helper/macro examples.

## WR08 — Optimize readable flow rather than minimal line count

Use precise types, readable control flow, fluent domain operations and separation of data/methods. Name repeated or complex expressions at narrow scope. Inline trivial one-use callbacks when useful, and split tangled branches/methods when their purpose cannot be followed.

**Scope:** PHP types/control flow; Vue scripts/handlers; Twig expressions. **Confidence:** high.

**Interpretation:** Repeated reader-oriented preference; exact expression choices can be subjective.

**Limits:**

- Shorter is not the objective by itself.
- Inline-versus-method taste alone should not be blocking.
- Exact section headings are not shown to be unique identity.

**Counterexamples and corrections:**

- Separate heating cases/methods are clearer than compression. [I-2564810708](https://github.com/CasSchuurman1/housescan/pull/136#discussion_r2564810708)
- Long intertwined method warrants extraction. [I-3309113693](https://github.com/robuust/loogisch-portaal/pull/3293#discussion_r3309113693)
- Fluent original date expression reads better than +7 days configuration. [I-3774745770](https://github.com/robuust/zusters-van-denekamp/pull/1450#discussion_r3774745770)
- Apparent method proliferation has union-query reuse need according to reply. [I-4072528204](https://github.com/robuust/inventflow-portaal/pull/727#discussion_r4072528204)

**Supporting review statements:**

- Will regex meaning still be clear a year later? Explain/examples if not. (optional suggestion) [I-2514477401](https://github.com/CasSchuurman1/housescan/pull/107#discussion_r2514477401)
- mixed hides array-or-null contract; asks strict useful type. (direct request) [I-2609833330](https://github.com/CasSchuurman1/housescan/pull/151#discussion_r2609833330)
- Parse date once and reuse const. (optional suggestion) [I-3049537942](https://github.com/robuust/haarhuis-portaal/pull/131#discussion_r3049537942)

**Related stack rules:** FE06, FE08, BE09. These can share the same historical review sources.

**Chronology:** Nov future-reader regex clarity; Dec precise types; Apr-May repeated values; Jun/Aug grouping; Aug fluent dates; Oct explicit inline taste.

## WR09 — Prefer positive explicit opt-in feature controls where compatible

For new feature flags and type allowlists, prefer positive names that read directly and enable behavior explicitly. Omit redundant false defaults when native behavior supplies them. Preserve configuration precedence where absent differs from false.

**Scope:** Robuust Vue feature props; Laravel polymorphic type inclusion. **Confidence:** medium-high.

**Interpretation:** Explicit repeated preference, strongest for feature props and future type additions.

**Limits:**

- Do not mechanically invert existing public props/defaults.
- Absent, false and true can be semantically distinct.
- Exact prop spelling alone is taste, not a defect.

**Counterexamples and corrections:**

- Required validation, rather than a universal false rule, removes defaults here. [I-3258815709](https://github.com/robuust/haarhuis-portaal/pull/272#discussion_r3258815709)
- Configurable Boolean props may require undefined when omitted so project defaults can supply true; technical context, not prose identity. [W-IC_kwDONIdnBs8AAAABPzc-Lg](https://github.com/robuust/vue-components/pull/717#issuecomment-5355552302)

**Supporting review statements:**

- Dislikes seriesValid default true. (explicit personal preference) [I-3457985114](https://github.com/robuust/loogisch-portaal/pull/3333#discussion_r3457985114)
- showPrices makes pricing opt-in and avoids repeated !hidePrices; acknowledges intentional caller changes. (explicit personal preference) [I-3774711417](https://github.com/robuust/zusters-van-denekamp/pull/1450#discussion_r3774711417)
- Explicit allowed booking classes keep future types opt-in. (direct request) [I-3783325496](https://github.com/robuust/zusters-van-denekamp/pull/1459#discussion_r3783325496)

**Related stack rules:** FE03, FE04. These can share the same historical review sources.

**Chronology:** May-Jun/Aug default-true objections; Aug positive prop/type-list rationale; Aug configurable-library absence semantics.

## WR10 — Document useful purpose/contracts without repeating obvious types

Explain purpose, non-obvious decisions and useful contracts. Document reusable macro options for implementers. Keep present docblocks accurate/complete, while avoiding mechanical docs for obvious callbacks or types already visible in signatures.

**Scope:** PHP docblocks; JS/Vue methods; Twig macro README contracts. **Confidence:** high for usefulness; medium for exact coverage.

**Interpretation:** Nuanced explicit preference with substantial team-convention confounding.

**Limits:**

- Neither all-functions-have-docblocks nor no-comments is supported.
- No universal inferred ban on param/return tags.
- Do not reproduce project author banners as identity.

**Counterexamples and corrections:**

- On drawer save only repeats the method and is called pointless. [I-3015307036](https://github.com/robuust/zusters-van-denekamp/pull/1097#discussion_r3015307036)
- Accepts exception while noting colleagues requested docs for even simpler methods. [I-3179716717](https://github.com/robuust/inventflow-portaal/pull/211#discussion_r3179716717)
- @param Blueprint on already typed migration closure is excessive. [I-4183307230](https://github.com/robuust/bellezi-erp/pull/2806#discussion_r4183307230)
- Do not overdo docblocks in that migration PR. [W-PRR_kwDOKqgZB88AAAABQqxM9w](https://github.com/robuust/bellezi-erp/pull/2806#pullrequestreview-5413555447)
- Robuust/author banner is described as normal project convention, not explanatory personal style. [I-3511216531](https://github.com/robuust/steggink/pull/231#discussion_r3511216531)

**Supporting review statements:**

- Job-skip docblock should explain when it skips. (optional suggestion) [I-2514157154](https://github.com/CasSchuurman1/housescan/pull/107#discussion_r2514157154)
- Non-obvious regexes may need examples for future readers. (optional suggestion) [I-2514477401](https://github.com/CasSchuurman1/housescan/pull/107#discussion_r2514477401)
- Store a task is enough; external submission wording is irrelevant detail. (direct request) [I-2534076201](https://github.com/robuust/bellezi-erp/pull/2306#discussion_r2534076201)

**Related stack rules:** FE08. These can share the same historical review sources.

**Chronology:** Nov useful skip/regex docs; Dec accurate purpose; Mar trivial callback objection; Apr completeness; May macro docs/team caveat; Jun unclear methods; Oct redundant closure docs.

## WR11 — Use meaningful fixtures/tests rather than incidental duplication

Provide usable fixtures for implemented states and meaningful variants. Prefer explicit factory relationship setup and existing factory APIs. Avoid identical behavior checks across every fixture, contrived states without a real scenario, and tests of temporary placeholder UI. Preserve coverage of real application branches.

**Scope:** Craft fixtures/demo; Laravel factories/seeders; Existing PHP/Vue test reviews. **Confidence:** high contextual; medium as personal style.

**Interpretation:** Proportionality preference plus project conventions and correctness; this grants no test execution authorization.

**Limits:**

- Unnecessary tests does not mean no tests.
- Factory defaults here are team choices, not prohibition of otherwise supported Laravel syntax.
- No tests were written, modified or run in this research.

**Counterexamples and corrections:**

- Enum should be covered rather than ignored. [I-2630074202](https://github.com/robuust/loogisch-portaal/pull/2944#discussion_r2630074202)
- Real site-mode branch is coverable; challenges ignore marker. [I-3497537997](https://github.com/robuust/clubee-v2/pull/2850#discussion_r3497537997)
- Asks whether nonparallel test run counts toward coverage. [I-3869976379](https://github.com/robuust/inventflow-portaal/pull/608#discussion_r3869976379)
- Global stubs are a question; accepts colleague preference to keep them local. [I-3451771187](https://github.com/robuust/inventflow-portaal/pull/364#discussion_r3451771187)
- Production catalog options come from migrations; demo associations remain seed content. [I-3860600592](https://github.com/robuust/inventflow-portaal/pull/593#discussion_r3860600592)
- Often writes tests later while generated code still receives feedback; not an anti-test or universal timing rule. [I-3110634294](https://github.com/robuust/betonlook/pull/1202#discussion_r3110634294)

**Supporting review statements:**

- One or two entries cover behavior unchanged by article type; every fixture slows Buildkite without new coverage. (direct request) [I-2754637547](https://github.com/robuust/albo/pull/160#discussion_r2754637547)
- New banner field lacks jobs-site fixture for frontend/demo. (correctness or contract request) [I-3173297001](https://github.com/robuust/albo/pull/590#discussion_r3173297001)
- Requests explicit relationship factory setup as normally done; reply eventually adopts project choice. (team or project convention) [I-3536967933](https://github.com/robuust/kuipers-logistics-portal/pull/1577#discussion_r3536967933)

**Related stack rules:** BE08, FE05. These can share the same historical review sources.

**Chronology:** Nov factories/production-data boundary; Jan-Feb fixtures and nonduplicative Craft checks; Apr timing comment; Jun-Sep coverage/factories; Nov placeholder test.

## WR12 — Keep request normalization and shared validation together

Within current Laravel project rules, use the request boundary for shared API/UI validation and normalization, source/type-specific getters and explicit persistence allowlists. Prefer FormRequest when it removes repetition, while distinguishing ordinary filters from write-domain/security requirements.

**Scope:** Laravel requests/controllers/filters; Shared API/Inertia write contracts. **Confidence:** high contextual; medium as unique taste.

**Interpretation:** Current direction strongly affected by Laravel and jointly written Boost rules; earlier reviews are less uniform.

**Limits:**

- Current repository rules and threat/data contract take precedence.
- Style preference cannot justify dropping required validation.
- Inspect whether request preparation or a query move preserves semantics.

**Counterexamples and corrections:**

- Dec 2025 thinks one-rule FormRequest overkill, but accepts colleague choice. [I-2613580413](https://github.com/robuust/bellezi-erp/pull/2359#discussion_r2613580413)
- prepareForValidation optional; current model-scope rule called correct. [I-3577510526](https://github.com/robuust/kuipers-logistics-portal/pull/1600#discussion_r3577510526)
- Aug questions validation on every index; not permission to remove security/domain validation. [I-3801710575](https://github.com/robuust/bellezi-erp/pull/2740#discussion_r3801710575)
- Native FormData/component types may still need narrow transport mapping. [I-4294494101](https://github.com/robuust/kuipers-logistics-portal/pull/1881#discussion_r4294494101)

**Supporting review statements:**

- only intentionally allowlists persisted fields so new form inputs cannot silently enter create. (explicit personal preference) [I-3543395559](https://github.com/robuust/kuipers-logistics-portal/pull/1585#discussion_r3543395559)
- Availability validation belongs in FormRequest rather than controller. (direct request) [I-3774167074](https://github.com/robuust/zusters-van-denekamp/pull/1450#discussion_r3774167074)
- Quotes jointly written source/type getter rule; exact wording is not personal prose. (team or project convention) [I-3828304286](https://github.com/robuust/inventflow-portaal/pull/582#discussion_r3828304286)

**Related stack rules:** BE05, BE06, FE01. These can share the same historical review sources.

**Chronology:** Dec single-rule skepticism; Jul validation-owner options; Aug index skepticism and shared rules; Sep consistency; Oct shared API validation; Nov repetition justifies request centralization.

## Evidence that was not promoted


- Unique Tailwind/CSS ordering, casing, arrow/function formatting or author banners: tooling/project/team conventions confound these; FE09 identifies late adopted convention.
- No docs/comments, no abstraction, no guards or no tests: substantial contrary contextual evidence.
- Never serialize models to jobs, always sync relations, or always drop nullsafe operators: technical corrections/objections exist in this corpus.
- Every question is mandatory or every review claim a validated bug: tentative, optional and retracted statements remain distinct.
- Template writing format of modern structured reports: unverified composition and provenance flags preclude handwriting inference.
