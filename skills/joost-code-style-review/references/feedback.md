# What received feedback actually changed

Read this when a candidate depends on a historical suggestion or apparently conflicting preference. The initial 26 purposefully selected cases are followed by the targeted November 12 Haarhuis supplement, RF27–RF36. They trace exact revisions and replies, not adoption rates for every received comment. All source accounts are attribution only. Historical test-related discussion never grants current test authorization.

The most useful distinctions are implementation before merge, implementation in a follow-up, scoped adoption, reasoned rejection, explicit deferral, and later reversal. A resolved thread, promise, merge state, or approval does not settle that distinction.

## Decisions that change review behavior

- **Preserve the lifecycle, then simplify.** RF18 initially rejects database notifications because queued delivery did not prove mail success; the later approach changes delivery to synchronous mail followed by database history. Reuse is conditional on the actual contract, not an unconditional native-API mandate.
- **Revisit an invalid premise.** RF06 first moves MapKit to a page, then restores the base include in a follow-up after a Turbo explanation. Neither asset placement is a universal preference.
- **Keep justified differences.** RF11 retains request middleware, RF15 retains shared middleware because PATCH handlers differ, and RF19 retains Unicode character length rather than byte length. A simpler-looking alternative can change semantics.
- **Respect the current slice.** RF09 explicitly defers unrelated reactive-route cleanup. RF03 records a signed-URL promise without code proof at the observed PR head.
- **Trace adoption accurately.** RF23 and RF24 are implemented in later PRs, not their originating PRs. RF25 removes redundant void tags while retaining useful documentation.

## Case ledger

### RF01 — Proposed Sentry simplification remained unresolved

**Outcome:** `not_adopted_in_observed_pr`. **Confidence:** limited_to_observed_pr.

The ReportsToSentry trait is byte-identical at the commented and PR-head revisions. Joost account reply 2521836414 cites Sentry context docs; reviewer 2521978208 clarifies that the concern is the surrounding construction, not Sentry context itself.

**Review implication:** Counterevidence to treating every simplicity request as accepted personal style.

**Limit:** No explicit final rejection of the construction is recorded. The unchanged trait does not prove nothing else in the PR changed.

**Sources:** [feedback](https://github.com/robuust/rrs-cit/pull/1931#discussion_r2518802416); [final 6101b8a6413f](https://github.com/robuust/rrs-cit/blob/6101b8a6413fa80dc9b31a3efec2b2b44f4d8b9d/app/Traits/ReportsToSentry.php).

### RF02 — Transaction includes user persistence

**Outcome:** `adopted`. **Confidence:** high.

The changed commit moves DB::beginTransaction() before user creation and before fill/save in update; the PR head retains it. Reply 2533362281 explicitly confirms the change.

**Review implication:** Consistency and atomicity, rather than an aesthetic preference.

**Limit:** Do not infer a general preference for manual begin/commit over DB::transaction().

**Sources:** [feedback](https://github.com/robuust/heerdink-planning/pull/1823#discussion_r2533354384); [changed 4f0dadececd6](https://github.com/robuust/heerdink-planning/blob/4f0dadececd63a9bdb5fe6db6ef9605584f3f0bf/app/Http/Controllers/Admin/UsersController.php); [final 1d841f8f2bcf](https://github.com/robuust/heerdink-planning/blob/1d841f8f2bcf97dc43ae0d99642658118b86bfdb/app/Http/Controllers/Admin/UsersController.php).

### RF03 — Signed-URL intent discussed; promised change not shown

**Outcome:** `discussed_change_unverified`. **Confidence:** limited_to_observed_pr.

The reply first argues expiry is unnecessary, then says Copilot added the minutes and promises an update. The original and PR head are the same SHA and still call URL::signedRoute(..., now()->addMinutes(30)). A later reviewer suggests Spatie signed URLs.

**Review implication:** Useful for checking intent and package APIs; insufficient adoption evidence for either suggested API.

**Limit:** The explicit Copilot reference also prevents treating this original code as confirmed personal handwriting.

**Sources:** [feedback](https://github.com/robuust/zusters-van-denekamp/pull/885#discussion_r2609568779); [final aa253e9dabc5](https://github.com/robuust/zusters-van-denekamp/blob/aa253e9dabc58b5391bd49959f0dc84f66249bad/app/Models/Site.php).

### RF04 — Extract repeated address markup into a parameterized partial

**Outcome:** `adopted`. **Confidence:** high.

Commit 912ec648e93a09ef0f8daea529d11592394e8f63 replaces the packing-slip table with a details partial receiving address: shipping; its stat also shows the shared invoice caller. The PR head uses the subsequently renamed address-info partial.

**Review implication:** Strong concrete evidence for small reuse where actual duplicated markup exists.

**Limit:** This supports a partial with one varying argument; it does not justify generic component infrastructure.

**Sources:** [feedback](https://github.com/robuust/betonlook/pull/894#discussion_r2690177815); [changed 912ec648e93a](https://github.com/robuust/betonlook/blob/912ec648e93a09ef0f8daea529d11592394e8f63/templates/_pdf/packing-slip.twig); [final 940faafb3e98](https://github.com/robuust/betonlook/blob/940faafb3e982bf4fc0fc6c15460573a4d84cd18/templates/_pdf/packing-slip.twig).

### RF05 — Name the partial for its content

**Outcome:** `adopted`. **Confidence:** high.

The thread proposes address-info, receives reviewer agreement and an explicit Done. The exact diff renames templates/_pdf/_partials/details.twig to address-info.twig.

**Review implication:** Strong local naming evidence: describe the content rather than inherit a vague block name.

**Limit:** The choice is domain-specific, not a mandatory suffix or global filename grammar.

**Sources:** [feedback](https://github.com/robuust/betonlook/pull/894#discussion_r2690212782); [changed 940faafb3e98](https://github.com/robuust/betonlook/blob/940faafb3e982bf4fc0fc6c15460573a4d84cd18/templates/_pdf/_partials/address-info.twig).

### RF06 — MapKit include moved, then restored after Turbo correction

**Outcome:** `adopted_then_reversed_followup`. **Confidence:** high.

Commit 583dc1c378603ac468fc61da670928bbcafaf5a0 moves the script from the base to locations. After the Turbo/browser-cache explanation and reply 2788333953, follow-up PR #197 commit d42417667bde412468bcc9a08a3631cdc2330ccf restores the base include and removes the page block.

**Review implication:** Strong counterevidence to an unconditional page-only asset rule; implementation changes when framework behavior changes the premise.

**Limit:** The explanation is review text, not a browser trace collected by this study. Both concrete placements are proved by exact code.

**Sources:** [feedback](https://github.com/robuust/albo/pull/196#discussion_r2787808119); [changed 583dc1c37860](https://github.com/robuust/albo/blob/583dc1c378603ac468fc61da670928bbcafaf5a0/templates/_base/index.twig); [later d42417667bde](https://github.com/robuust/albo/blob/d42417667bde412468bcc9a08a3631cdc2330ccf/templates/_base/index.twig); [robuust/albo#197](https://github.com/robuust/albo/pull/197).

### RF07 — Keep model predicate named for the state transition

**Outcome:** `adopted`. **Confidence:** high.

The reviewed shouldSendStatusChangedNotification() name becomes wasStatusChangedToScheduled() in commit f2b02bcd8bddfa2bbc400a218f1381a2250880b0 and remains at head. Reply 2903767922 confirms the revert.

**Review implication:** Strong semantic naming example: describe the fact the model checks rather than the notification decision.

**Limit:** The underlying predicate still contains notification bookkeeping. This proves the naming decision, not a complete architectural relocation.

**Sources:** [feedback](https://github.com/robuust/vastgoedmonitor/pull/517#discussion_r2903743978); [changed f2b02bcd8bdd](https://github.com/robuust/vastgoedmonitor/blob/f2b02bcd8bddfa2bbc400a218f1381a2250880b0/app/Models/Subproject.php); [final 6beb875d2186](https://github.com/robuust/vastgoedmonitor/blob/6beb875d2186c04fa577d2f950662f4e0a459879/app/Models/Subproject.php).

### RF08 — Avoid an unused route-import alias; keep useful aliases

**Outcome:** `adopted_scoped`. **Confidence:** high.

UpdatePasswordForm changes update as updateUserPassword to update in commit 051171ae4d55425c1e6cb6d9a2d0545aeb0784cd. UpdateProfileInformationForm retains aliases where routes from multiple modules are imported. Replies explicitly agree on this distinction.

**Review implication:** High relevance: minimal local naming, with aliases when they disambiguate route imports.

**Limit:** This is not a ban on aliases or a rule to rename all route functions.

**Sources:** [feedback](https://github.com/robuust/haarhuis-portaal/pull/111#discussion_r3021410735); [changed 051171ae4d55](https://github.com/robuust/haarhuis-portaal/blob/051171ae4d55425c1e6cb6d9a2d0545aeb0784cd/resources/js/components/UpdatePasswordForm.vue); [final cae254515e1b](https://github.com/robuust/haarhuis-portaal/blob/cae254515e1b884853a65169c4172e0c2e263695/resources/js/components/UpdatePasswordForm.vue).

### RF09 — Reactive-route cleanup kept outside the Wayfinder slice

**Outcome:** `deferred_explicitly`. **Confidence:** high.

The composable is byte-identical at review and head. Reply 3021798254 agrees with the underlying point but explicitly separates it from Wayfinder; reviewer 3021814501 accepts that scope boundary.

**Review implication:** Strong evidence for a scoped change rather than accepting every cleanup request immediately.

**Limit:** No subsequent removal of the composable was researched; deferral is not permanent rejection.

**Sources:** [feedback](https://github.com/robuust/haarhuis-portaal/pull/111#discussion_r3021727480); [final cae254515e1b](https://github.com/robuust/haarhuis-portaal/blob/cae254515e1b884853a65169c4172e0c2e263695/resources/js/composables/useReactiveRoute.js).

### RF10 — Let model-local scopes own user filtering

**Outcome:** `adopted`. **Confidence:** high.

UserScope drops lists of model classes and conditional branches, delegating to $builder->forUser($this->user). Registration gains scopeForUser in changed commit 2cb73af5720e20eaf6e1108a305c17d7f788f90b; the PR head retains the design.

**Review implication:** Strong example of keeping variability in the owning model and reusing Eloquent scope conventions.

**Limit:** Do not create a new abstraction solely because another project used this scope arrangement.

**Sources:** [feedback](https://github.com/robuust/haarhuis-portaal/pull/247#discussion_r3218611140); [changed 2cb73af5720e](https://github.com/robuust/haarhuis-portaal/blob/2cb73af5720e20eaf6e1108a305c17d7f788f90b/app/Models/Scopes/UserScope.php); [final 6f768c66b5b1](https://github.com/robuust/haarhuis-portaal/blob/6f768c66b5b18ee014a9592140873ee06c0853bd/app/Models/Scopes/UserScope.php).

### RF11 — Retain ApplyUserScope for middleware

**Outcome:** `rejected_with_reason`. **Confidence:** high.

Reply 3218730268 explains that UserScope would imply the middleware itself is a scope. ApplyUserScope.php is byte-identical at original and head.

**Review implication:** High relevance: meaningful responsibility beats a reviewer-requested shorter class name.

**Limit:** The result supports this distinction, not a blanket imperative-prefix convention.

**Sources:** [feedback](https://github.com/robuust/haarhuis-portaal/pull/247#discussion_r3218591312); [final 6f768c66b5b1](https://github.com/robuust/haarhuis-portaal/blob/6f768c66b5b18ee014a9592140873ee06c0853bd/app/Http/Middleware/ApplyUserScope.php).

### RF12 — Assert rendered PDF HTML rather than only view data

**Outcome:** `adopted`. **Confidence:** high.

After reply 3341527903 says Done, the final test calls getHtml() and asserts strings in $pdf->html, replacing checks dominated by loaded relationships and viewData.

**Review implication:** Quality of observable assertions; auxiliary evidence rather than a personal formatting rule.

**Limit:** Only historic test source was inspected. No tests were authored, changed or run by this research.

**Sources:** [feedback](https://github.com/robuust/haarhuis-portaal/pull/332#discussion_r3341456399); [final b34429af412e](https://github.com/robuust/haarhuis-portaal/blob/b34429af412e6f6d9a4baef2075751c4179316cc/tests/Feature/PlanningControllerTest.php).

### RF13 — Use an explicit allowlist when creating a model

**Outcome:** `adopted`. **Confidence:** high.

Commit c9353a6dd2441cdc278f9ef3fb9c5f27634942b6 replaces $input->except(user_id) with only([...]) listing the six intended Client fields; the head retains this. The changed commit isolates the feedback from later Azure-container work.

**Review implication:** High relevance: explicit data contracts rather than silently passing newly added validated fields.

**Limit:** This is a write-input safety decision, not a universal prohibition of except() for every collection operation.

**Sources:** [feedback](https://github.com/robuust/inventflow-portaal/pull/336#discussion_r3420301620); [changed c9353a6dd244](https://github.com/robuust/inventflow-portaal/blob/c9353a6dd2441cdc278f9ef3fb9c5f27634942b6/app/Http/Controllers/ClientsController.php); [final 6dd34025f925](https://github.com/robuust/inventflow-portaal/blob/6dd34025f9256361a84b3dccca97476317c5259f/app/Http/Controllers/ClientsController.php).

### RF14 — Keep relationship keys out of fillable with a documented exception

**Outcome:** `adopted_project_rule`. **Confidence:** high.

The exact .ai/rules/models.md diff adds relationship methods and keeps FK/morph columns out of $fillable, while explicitly allowing Location parent_id and intentional bulk query updates. The thread asks the reviewer to assess a Codex proposal and receives agreement.

**Review implication:** Strong evidence for an agreed Inventflow convention; weak evidence of independent personal handwriting.

**Limit:** Preserve the exception. Do not turn this project rule into an unconditional cross-project Laravel rule.

**Sources:** [feedback](https://github.com/robuust/inventflow-portaal/pull/524#discussion_r3734595004); [changed ecfce35c5360](https://github.com/robuust/inventflow-portaal/blob/ecfce35c53606a125337e73745f158561e3b8ec7/.ai/rules/models.md); [final 7d80ba38b964](https://github.com/robuust/inventflow-portaal/blob/7d80ba38b964e04ed44d1e51baf8c6fdc02f4168/.ai/rules/models.md).

### RF15 — Keep shared middleware because PATCH handlers differ

**Outcome:** `rejected_with_reason`. **Confidence:** high.

Reply 3782679851 explains that PATCH endpoints use different controllers. Original and head retain grouped service-report.step middleware around GET and PATCH routes, and the actual EnsureServiceReportStepIsAccessible class is unchanged.

**Review implication:** High relevance as a boundary check: inspect all callers and methods before relocating shared behavior.

**Limit:** The collector originally guessed a filename without Is; exact-revision ls-tree found the correct file. No absence claim is based on that typo.

**Sources:** [feedback](https://github.com/robuust/inventflow-portaal/pull/560#discussion_r3782658396); [final 52afea49dc4e](https://github.com/robuust/inventflow-portaal/blob/52afea49dc4e63dbfaeb48aaf28809835c794da8/routes/portal.php).

### RF16 — Preserve lazy consumption in a streamed CSV

**Outcome:** `adopted`. **Confidence:** high.

Commit f1f393ddec701b08ec62f81066f1b3806f1a010e replaces get() with lazy() before the same streamDownload/addRows pipeline; reply 4181552491 confirms the reason.

**Review implication:** Performance and data-flow correctness, not a general taste for lazy queries everywhere.

**Limit:** No benchmark, memory profile or stream execution was performed by this study.

**Sources:** [feedback](https://github.com/robuust/huisartsenzorg-twente/pull/219#discussion_r4181476330); [changed f1f393ddec70](https://github.com/robuust/huisartsenzorg-twente/blob/f1f393ddec701b08ec62f81066f1b3806f1a010e/app/Actions/BuildEventDeclarationCsv.php).

### RF17 — Schedule due reminders rather than long-delayed queue jobs

**Outcome:** `adopted`. **Confidence:** high.

Changed commit 6e8fd3cf325e031f761afd5f9e8cc2a86a776e77 removes delayed notification scheduling from confirmation, adds the due-reminder command and a daily 09:00 schedule with overlap protection. Final code retains the scheduler while RF18 changes delivery.

**Review implication:** Shows willingness to simplify lifecycle ownership when deployment/runtime behavior warrants it.

**Limit:** The account reply nuances the review premise: delayed jobs could keep a worker active rather than simply never scale. Installed-listener claims and reported historical tests were not rerun here.

**Sources:** [feedback](https://github.com/robuust/huisartsenzorg-twente/pull/264#discussion_r4347792839); [changed 6e8fd3cf325e](https://github.com/robuust/huisartsenzorg-twente/blob/6e8fd3cf325e031f761afd5f9e8cc2a86a776e77/app/Http/Controllers/EventRegistrationConfirmationsController.php); [final a0ce7ca00eb1](https://github.com/robuust/huisartsenzorg-twente/blob/a0ce7ca00eb16725f927cb42e57bb175b9e1f430/app/Http/Controllers/EventRegistrationConfirmationsController.php).

### RF18 — Adopt database notifications after changing delivery to synchronous mail then database

**Outcome:** `initially_rejected_then_adopted_revised_approach`. **Confidence:** high.

Reply 4348001119 initially defends reminder_mail_sent because separately queued channels do not prove mail success. Reply 4348282844 explicitly changes course. Commit a0ce7ca00eb16725f927cb42e57bb175b9e1f430 removes ShouldQueue/Queueable, returns [mail, database], records event_id, and queries native notification history.

**Review implication:** Strong evidence for evaluating a simpler native API against the actual lifecycle contract, then adopting it when the contract can be preserved.

**Limit:** The diff establishes code changes. Actual email delivery, channel execution and historical claimed test totals are not fresh verification; retain the overview marker and registration reset constraints.

**Sources:** [feedback](https://github.com/robuust/huisartsenzorg-twente/pull/264#discussion_r4347913809); [changed a0ce7ca00eb1](https://github.com/robuust/huisartsenzorg-twente/blob/a0ce7ca00eb16725f927cb42e57bb175b9e1f430/app/Console/Commands/SendEventRegistrationReminders.php).

### RF19 — Retain Unicode character length over byte length

**Outcome:** `rejected_with_reason`. **Confidence:** high.

Reply 4440234601 explicitly retains mb_strlen(..., UTF-8) to preserve the native more-than-one-character threshold. The original and head search files are byte-identical; the only PR follow-up commit changes the changelog (RF26).

**Review implication:** Important counterweight to simplifying syntax: behavior parity outranks a shorter call.

**Limit:** This study did not execute PHP, Twig or browser Unicode examples; the implementation and explicit decision are the proof.

**Sources:** [feedback](https://github.com/robuust/salta/pull/5146#discussion_r4440164131); [final 564c7f2686e1](https://github.com/robuust/salta/blob/564c7f2686e1f247ff4f9b136fdf3a7a5f06dca9/modules/searchkeywords/gql/Search.php).

### RF20 — Use the native Inertia Form processing prop

**Outcome:** `adopted`. **Confidence:** high.

Commit fcde3925c8a201cc45384fcfd1b834916dfa96fb adds disable-while-processing and removes the slot processing state and repeated fieldset disabled bindings. Reply 4410440805 directly links the commit.

**Review implication:** High relevance: use the existing form capability instead of duplicating processing bindings.

**Limit:** Original code already had disabled fieldsets. This proves a simpler implementation, not that the old form had no processing protection. Browser behavior in the reply is self-reported and was not rerun.

**Sources:** [feedback](https://github.com/robuust/salta-inertia/pull/26#discussion_r4410083341); [changed fcde3925c8a2](https://github.com/robuust/salta-inertia/blob/fcde3925c8a201cc45384fcfd1b834916dfa96fb/resources/js/pages/SportsPlayProducts.vue).

### RF21 — Use Request::enum rather than manual enum conversion

**Outcome:** `adopted`. **Confidence:** high.

After the reviewer requests $request->enum(), commit f80356a80ba77cbfbeb4ae62773952051bae68c6 replaces string checks/fromKey/manual abort with that API and uses status?->value; the head retains it.

**Review implication:** High relevance to native API reuse and removing redundant transformation code.

**Limit:** The diff also changes the filter representation and invalid-input handling. It must not be advertised as automatically behavior-equivalent in every endpoint.

**Sources:** [feedback](https://github.com/robuust/inventflow-portaal/pull/397#discussion_r3512951486); [changed f80356a80ba7](https://github.com/robuust/inventflow-portaal/blob/f80356a80ba77cbfbeb4ae62773952051bae68c6/app/Http/Controllers/Reports/OverviewController.php); [final 304d4eca2c36](https://github.com/robuust/inventflow-portaal/blob/304d4eca2c363210f4f09e1ca8590f660299c402/app/Http/Controllers/Reports/OverviewController.php).

### RF22 — Remove redundant string casts from enum display labels

**Outcome:** `adopted`. **Confidence:** high.

Commit 0e3727867d602777f4b75b26181eb55216232c3d removes (string) from translation-return expressions in ElectricalConnection and SafetyParty; both retain : string return types and remain uncast at head.

**Review implication:** High local relevance: avoid redundant conversions when the established translation contract supplies the value.

**Limit:** Not a universal ban on casts at external/untyped boundaries.

**Sources:** [feedback](https://github.com/robuust/inventflow-portaal/pull/470#discussion_r3638264227); [changed 0e3727867d60](https://github.com/robuust/inventflow-portaal/blob/0e3727867d602777f4b75b26181eb55216232c3d/app/Enums/ElectricalConnection.php); [final a21f99dda0fc](https://github.com/robuust/inventflow-portaal/blob/a21f99dda0fcbc1d7a1fed3657b9fc402e70f137/app/Enums/ElectricalConnection.php).

### RF23 — Use native resource collections in a later PR

**Outcome:** `adopted_in_followup`. **Confidence:** high.

The original #173 head still manually maps UserResource resolution. Later commit a76c9fc21a40615f054c0246974e7acb0db6d169 in #174 replaces it with ->toResourceCollection(UserResource::class) and converts roles too.

**Review implication:** High relevance to framework conventions, with an explicitly proved follow-up timeline.

**Limit:** Do not claim this was adopted before #173 merged. The later commit is absent from #173 commit metadata and belongs to #174.

**Sources:** [feedback](https://github.com/robuust/huisartsenzorg-twente/pull/173#discussion_r4070735994); [changed a76c9fc21a40](https://github.com/robuust/huisartsenzorg-twente/blob/a76c9fc21a40615f054c0246974e7acb0db6d169/app/Http/Controllers/UsersController.php); [final fbd17ef05a09](https://github.com/robuust/huisartsenzorg-twente/blob/fbd17ef05a097025488a328c8cee55d105d3513e/app/Http/Controllers/UsersController.php); [robuust/huisartsenzorg-twente#174](https://github.com/robuust/huisartsenzorg-twente/pull/174).

### RF24 — Remove duplicate enum projection from API resources in a follow-up

**Outcome:** `adopted_in_followup`. **Confidence:** high.

Original #242 head retains explicit status/type ->toArray() entries. Later commit 4602aefecde2b9dae5c47e1ca862e6364e66f1b4 in #243 removes both while preserving ...parent::toArray($request); it is also carried by #248.

**Review implication:** High relevance to removing duplicate serialization where the parent contract already owns it.

**Limit:** Do not apply the UI enum-display shape to every API. No runtime JSON response was captured, and the change was after #242 merged.

**Sources:** [feedback](https://github.com/robuust/huisartsenzorg-twente/pull/242#discussion_r4324986202); [changed 4602aefecde2](https://github.com/robuust/huisartsenzorg-twente/blob/4602aefecde2b9dae5c47e1ca862e6364e66f1b4/app/Http/Resources/Api/V1/EventResource.php); [final e01e79df8fd7](https://github.com/robuust/huisartsenzorg-twente/blob/e01e79df8fd7c3252e4622b4a6d43892258e5124/app/Http/Resources/Api/V1/EventResource.php); [robuust/huisartsenzorg-twente#243](https://github.com/robuust/huisartsenzorg-twente/pull/243); [robuust/huisartsenzorg-twente#248](https://github.com/robuust/huisartsenzorg-twente/pull/248).

### RF25 — Keep useful JSDoc while omitting meaningless void return tags

**Outcome:** `adopted_scoped`. **Confidence:** high.

Commit a2f60292478d622257a24b4ac7605cdcb934d15b removes @returns {void} from Library remove() and similar handlers. The same commit changes AGENTS.md to explicitly keep consistent frontend method documentation but omit meaningless void return tags; PHP normalization stays scoped separately.

**Review implication:** Strong concrete readability preference with an agreed repository rule and implementation.

**Limit:** This is not evidence to remove all docblocks, return types or explanatory comments. Reviewers were positive about human readability in review 4054772969.

**Sources:** [feedback](https://github.com/robuust/haarhuis-portaal/pull/119#discussion_r3031941748); [changed a2f60292478d](https://github.com/robuust/haarhuis-portaal/blob/a2f60292478d622257a24b4ac7605cdcb934d15b/resources/js/pages/Library.vue).

### RF26 — Remove the extra changelog blank line

**Outcome:** `adopted`. **Confidence:** high.

Reply 4440234267 links commit 564c7f2686e1f247ff4f9b136fdf3a7a5f06dca9. The diff removes exactly the blank line between adjacent unreleased list entries, leaving release heading spacing intact.

**Review implication:** Small, concrete formatting convention; separate from the rejected Unicode suggestion in the same PR.

**Limit:** One local example does not justify a universal no-blank-lines rule.

**Sources:** [feedback](https://github.com/robuust/salta/pull/5146#discussion_r4440154339); [changed 564c7f2686e1](https://github.com/robuust/salta/blob/564c7f2686e1f247ff4f9b136fdf3a7a5f06dca9/CHANGELOG.md).

## Haarhuis supplement — 2026-11-12

These cases come from received teammate or bot feedback on Joost-account PRs created through the agent workflow. Adoption is verified in code; unaided authorship and a new independent personal preference are not established. They reinforce the existing rules and their limits. Review replies report tests/browser work, but this research did not rerun it. Reply-linked commits can precede a restack; final code and matching successor diffs establish retention. Source IDs `RF:RF27` through `RF:RF36` resolve in the evidence index.

### RF27 — Shared interaction component versus a pass-through wrapper

**Outcome:** `adopted_scoped_before_merge` in both examples. **Confidence:** high for the recorded changes.

Rutger's #568 request produces `ExpenseCategoryHeader` at `5ae65e99`: four real consumers share the heading, toggle, chevron and totals, while expansion stays page-owned and the action has its own slot. Gijs's #572 request instead removes `ModalDeleteExpenseItem` in `07d1def6`; the page uses the existing Modal and owns the delete form/confirmation. The two changes support FE04's responsibility test, not opposite universal rules.

**Limit:** A single consumer can justify a real component boundary. Preserve meaningful state, slots and events; four consumers is not a required threshold.

**Sources:** [header request](https://github.com/robuust/haarhuis-portaal/pull/568#discussion_r4548005336); [header code](https://github.com/robuust/haarhuis-portaal/blob/5ae65e99a0627dae05845ac6f5849a9251e9ac13/resources/js/components/ExpenseCategoryHeader.vue); [wrapper request](https://github.com/robuust/haarhuis-portaal/pull/572#discussion_r4547899788); [wrapper removal](https://github.com/robuust/haarhuis-portaal/commit/07d1def684a00fe19dff8bfc43afe716aca8eb37).

### RF28 — Native form bookkeeping with an independent lifecycle

**Outcome:** `adopted_scoped_before_merge`. **Confidence:** high for the recorded change.

Gijs asks whether the order action can use the existing form or Form component. The final `00538f50` replaces manual `savingOrder`/`orderError` state and `router.patch` with a dedicated `orderForm = useForm(...)`. It keeps the schedule editor's `action.form` independent and retains optimistic rollback. This reinforces FE01 without mandating a specific Form spelling or collapsing two distinct lifecycles.

**Limit:** A native method must preserve the actual defaults, payload, errors and lifecycle. A separate form is justified state, not automatically duplication.

**Sources:** [request](https://github.com/robuust/haarhuis-portaal/pull/574#discussion_r4548033422); [reply](https://github.com/robuust/haarhuis-portaal/pull/574#discussion_r4548350318); [final code](https://github.com/robuust/haarhuis-portaal/blob/00538f5072f2372821de2aa66b3724c5a976801c/resources/js/pages/Planning.vue).

### RF29 — Native options with permission and component contracts

**Outcome:** `adopted_before_merge_then_permission_corrected`; optional mapping question requires no change. **Confidence:** high for those observed outcomes.

Gijs's #577 request replaces an employee search helper with a minimal `employees` page prop and local Combobox options in `4673381b`. Final `53f8a1dd` corrects its gate to the expense-writing `manage projects` permission, preserving server-owned rates and saved deleted-employee selection. This is a native-data-path example, not a reason to preload every searchable catalogue.

Rutger later asks whether `{ id, name }` needs explicit display mappings. The locked RVC 3.5.2 defaults already use `name`, and the final component retains those defaults. Source inspection supports retaining the concise component; a stub or the question alone does not prove missing behavior.

**Limit:** Preserve cardinality, authorization and response exposure. A remote JSON search remains valid elsewhere in the same drawer. Package source was inspected; no new browser check was performed for this research.

**Sources:** [prop request](https://github.com/robuust/haarhuis-portaal/pull/577#discussion_r4548793372); [permission correction and limits](https://github.com/robuust/haarhuis-portaal/pull/577#issuecomment-6821434726); [mapping question](https://github.com/robuust/haarhuis-portaal/pull/577#discussion_r4550073259); [final drawer](https://github.com/robuust/haarhuis-portaal/blob/53f8a1dd3f05a191cf162af680523d9fb774db25/resources/js/components/DrawerManualHourExpenseLine.vue).

### RF30 — Binding and request validation own different constraints

**Outcome:** `adopted_before_merge`. **Confidence:** high for the recorded change.

Sanderth questions controller guards for parent ownership and saved line type/mode. `d4f31f2d` adds the real `Project::expenseItems()` relationship and scoped PATCH binding, then moves expressible type/free-mode invariants into `ManualExpenseLineRequest`. The controller retains persistence. Missing, foreign and deleted items keep the not-found contract before validation; incompatible fields receive validation errors.

**Limit:** Binding is not authorization, and request-time validation cannot replace a later concurrent-state check. Use each owning layer for the invariant it actually establishes.

**Sources:** [ownership request](https://github.com/robuust/haarhuis-portaal/pull/580#discussion_r4549202666); [mode request](https://github.com/robuust/haarhuis-portaal/pull/580#discussion_r4549203682); [scoped-binding suggestion](https://github.com/robuust/haarhuis-portaal/pull/580#discussion_r4549277240); [change](https://github.com/robuust/haarhuis-portaal/commit/d4f31f2d57fbc24265c471bfc7d6c36c0b509506).

### RF31 — Conditional Resource shaping and proven inner nullability

**Outcome:** `adopted_scoped_before_merge`. **Confidence:** high for the recorded changes.

Gijs's #578 feedback leads to `RegistrationFormItemResource`, replacing inline row mapping with conditional Resource collections. The same `84b797fe` change removes nullsafe access inside `whenLoaded` callbacks where the locked helper skips null relations and the library-unit schema is non-nullable. Final `1d9fa9b1` retains the relevant Resource code, including a nullable snapshot-unit fallback outside that guarantee.

**Limit:** The nested Resource has a real shaping responsibility. Neither native serialization nor guard removal justifies dropping planned/saved amount differences, necessary nested transformations or missing-source behavior. The same review's `throw_if` suggestion is a contextual helper choice, not a ban on explicit control flow.

**Sources:** [nested Resource request](https://github.com/robuust/haarhuis-portaal/pull/578#discussion_r4548910569); [inner guard request](https://github.com/robuust/haarhuis-portaal/pull/578#discussion_r4548895786); [helper request](https://github.com/robuust/haarhuis-portaal/pull/578#discussion_r4548884656); [change](https://github.com/robuust/haarhuis-portaal/commit/84b797fec05f1b2c464697dc361db06bafce80a4); [retained Resource](https://github.com/robuust/haarhuis-portaal/blob/1d9fa9b1ac7a29c10cec420bdfb1c181c37c6c13/app/Http/Resources/RegistrationFormItemResource.php).

### RF32 — Set-based order update with the same scope

**Outcome:** `adopted_before_merge`. **Confidence:** high for the recorded change.

Gijs's mass-update question in #574 is followed by `031e47e8`: one scoped CASE update replaces repeated employee updates. Full-set, integer/distinct validation, eligible-role scope and submitted-ID restriction remain. Final `00538f50` retains the implementation.

**Limit:** This is a supported set-operation example, not a measured performance result or permission to bypass per-model lifecycle behavior in other writes. Check observers, casts, side effects and atomicity before proposing the same simplification.

**Sources:** [request](https://github.com/robuust/haarhuis-portaal/pull/574#discussion_r4548017859); [reply](https://github.com/robuust/haarhuis-portaal/pull/574#discussion_r4548350022); [change](https://github.com/robuust/haarhuis-portaal/commit/031e47e895713ee8fcc56af83b561078242a8162); [retained controller](https://github.com/robuust/haarhuis-portaal/blob/00538f5072f2372821de2aa66b3724c5a976801c/app/Http/Controllers/PlanningController.php).

### RF33 — Retain a fresh locked row check before relationship writes

**Outcome:** `adopted_before_merge`; correctness evidence constraining simplification. **Confidence:** high for the recorded change.

Rutger identifies a route-bound assignment that can be deleted or moved before a planning transaction saves and syncs its users. `4f1d4dec` locks the relevant parents in a deterministic order and reloads the still-matching assignment under lock before relation writes. Final `138ddd16` retains that controller. A transaction around an already-hydrated object would not establish the same invariant.

**Limit:** This is a concrete concurrency failure mode, not a preference for locking every mutation. The study inspected source and the existing regression, without running contention tests.

**Sources:** [request](https://github.com/robuust/haarhuis-portaal/pull/576#discussion_r4548743679); [change](https://github.com/robuust/haarhuis-portaal/commit/4f1d4dece7a494b8e0298cb6d2a4d2a75752724f); [retained controller](https://github.com/robuust/haarhuis-portaal/blob/138ddd16a8628bed5b6ef2f551252739cf5ac2b6/app/Http/Controllers/PlanningController.php).

### RF34 — Producer values must survive the real consumer

**Outcome:** `correctness_fixes_adopted_before_merge`. **Confidence:** high for the recorded changes.

Rutger's #578 feedback identifies valid planned material quantity 1.25 rejected by the receiving input's 0.5 step, and a prefill flag set even when missing library sources remove every selectable row. Final `1d9fa9b1` accepts material hundredths and computes the flag from usable source rows. It also retains readable missing-source display rather than removing the real unit guard. Duplicate re-review comments are the same findings, not independent corroboration.

**Limit:** These are boundary-contract corrections, not personal policies for every numeric step or nullable relation. A flag name cannot repair a mismatch between raw rows and the rows the user actually receives.

**Sources:** [fractional-value finding](https://github.com/robuust/haarhuis-portaal/pull/578#discussion_r4549229632); [filtered-row finding](https://github.com/robuust/haarhuis-portaal/pull/578#discussion_r4549229654); [final form](https://github.com/robuust/haarhuis-portaal/blob/1d9fa9b1ac7a29c10cec420bdfb1c181c37c6c13/resources/js/pages/App/WorkOrders/Registrations/Form.vue); [retained display fallback](https://github.com/robuust/haarhuis-portaal/blob/1d9fa9b1ac7a29c10cec420bdfb1c181c37c6c13/resources/js/pages/App/WorkOrders/Show.vue).

### RF35 — Explicit product policy defeats an inferred bug

**Outcome:** `rejected_by_explicit_product_policy_test_added`. **Confidence:** high for the retained outcome.

Qodo proposes suppressing missing-hours reminders when full-day leave overlaps work. The author records the owner's explicit opposite choice: keep reminding while a work order remains planned. The production Resource is byte-identical from `8e1a4ac3` to `4b6c0d54`; only a regression is added to preserve planned overlapping days and exclude a leave-only day. This is requirement precedence, not personal coding style or a published adoption-then-reversal.

**Limit:** Do not generalize this product's leave policy to other applications or infer that every bot finding is invalid.

**Sources:** [bot finding](https://github.com/robuust/haarhuis-portaal/pull/583#discussion_r4550395265); [recorded decision](https://github.com/robuust/haarhuis-portaal/pull/583#discussion_r4550474461); [test-only change](https://github.com/robuust/haarhuis-portaal/commit/4b6c0d5462cd553c4bfb8b0583685764083fda5f).

### RF36 — A readability nit is not an adopted rule

**Outcome:** `not_adopted_in_observed_pr`; no explicit rejection found. **Confidence:** limited to the observed head.

Rutger asks for parentheses around the subcontractor branch of a mixed boolean expression in #579, explicitly noting that precedence is already correct. Final `900be733` retains the unparenthesized expression. A merged PR and later approval do not prove this individual suggestion was implemented.

**Limit:** Grouping may still be a useful optional readability proposal in the right context. This record supports neither a universal parentheses preference nor a functional bug claim.

**Sources:** [suggestion](https://github.com/robuust/haarhuis-portaal/pull/579#discussion_r4550097655); [observed final expression](https://github.com/robuust/haarhuis-portaal/blob/900be73332b7b43d650a54180da53ff9966fc636/resources/js/pages/Projects/Expenses.vue#L580).
