# Evidence and maintenance

## Snapshot and scope

Baseline profile date: **2026-11-11**, with the targeted **2026-11-12** supplement recorded below. The annual study window remains **2025-11-11 through 2026-11-11, Europe/Amsterdam**, inclusive local dates, from 2025-11-10T23:00:00Z to before 2026-11-11T23:00:00Z. Initial collection occurred during its last date; later events on that date are not included in those annual counts. Git metadata is primarily filtered by author date. Reviews use submittedAt and comments use createdAt, not a later edit timestamp.

Identity was matched against the authenticated GitHub account `joostwaaijer`, full author name Joost Waaijer, confirmed email, and exact account-linked noreply addresses. These establish attribution, not proof of unaided authorship. Do not promote an unconfirmed email alias merely because the name matches.

## Coverage tiers

| Tier | Observed coverage | What it supports |
| --- | --- | --- |
| Local inventory | 122 immediate Git checkouts, 116 GitHub checkouts, 115 unique GitHub remotes; 3,152 author-matching nonmerge observations and 1,415 merges; author contributions in 56 repositories | Locate and stratify reachable history; not a current server-completeness claim |
| Remote commit index | 4,046 distinct indexed commit SHAs across 54 repositories, all 13 monthly partitions paginated | Accessible GitHub default-branch author search; a different universe from local `--all` refs |
| PR target union | 3,893 PRs across 116 repositories, authored/reviewed/commented cohorts selected by updated timestamp | Find old as well as new PRs with possible in-window events; membership alone is not event or preference evidence |
| Inline comments | 10,495 created-in-window comments collected; all 116 indexed repositories covered (108 repository-wide, 8 external repositories limited to every indexed PR) | Joost-on-others: 1,379 inline texts; received on own PRs: 1,020 nonbot-account and 304 bot comments |
| Formal reviews and discussions | 3,893/3,893 target PRs, 9,912 formal submissions and 1,251 discussions fetched, matching their API totals; 9,878 and 1,243 respectively in window | Joost-on-others: 146 nonempty formal bodies and 174 discussion texts; empty approvals carry no style instruction |
| Quantitative patch pass | 2,440 source-touching repo/commit observations, 2,417 unique SHAs; 2,385 read, 32 omitted by explicit size caps; 11,332 eligible patch files and 10,741 after-commit snapshots | Candidate frequencies and counterexamples, not semantic rules or proof of a personal preference |
| Backend close reading | 58 core code anchors across 11 repositories, plus 58 review anchors; 109 selected commit captures | Purposeful qualitative evidence for 12 scoped backend rules; captured diff is not automatically a deeply reviewed anchor |
| Frontend close reading | 31 code commits/anchors across 11 repositories and all 13 calendar months, plus 98 selected review records | Purposeful qualitative evidence for 10 frontend rules including limitations; not a random prevalence sample |

The own-review text study screened all 1,699 available bodies (1,379 inline, 146 nonempty formal reviews, 174 discussions) on others' PRs: 648 PRs across 52 repositories. It inspected 213 selected inline anchor contexts and promoted 143 source records to 12 rule interpretations. Full-body screening is not semantic validation of every hunk/reply or an exhaustive multi-label theme coding. The received-feedback outcome study traces 26 selected feedback points across 21 originating PRs in 11 repositories and every calendar month; other received records have no inferred adoption outcome.

Do not add local and remote commit counts as unique contributions: they overlap and have different selection rules. The quantitative pass additionally removes 23 identical-SHA observations across distinct remotes. Snapshot counts include unchanged lines and repeated touches. Tests/generated/dependency/template material are separated where possible, and their presence does not establish production coding intent.

The 50 indexed remote commit objects absent from matching local checkouts were retrieved separately with exact commit metadata and raw patches: 48 nonmerges and 2 merges across four repositories. Of those nonmerges, 30 explicitly credit Claude, 13 are CMS/content/media-only, and 5 contain source or tooling without an AI disclosure. Those 5 were fully read; selected hunks from 14 commits were inspected overall. All 1,083 file entries were classified; generated/content bulk and four binary assets were not semantically read as personal coding style. The recovered text patches have no unresolved substantive text gap. This closes the known indexed-object gap, not every possible historical contribution.

Examples from the remote supplement reinforce scope rather than create new universal rules: [the OOPSpam database-specific migration](https://github.com/cloudgrayau/oopspam/blob/840d26be6270eb166324181b8a8abdade0390b0e/src/migrations/m260625_104310_submissions_ipaddress_binary.php) retains justified guards; [Commerce currency validation](https://github.com/craftcms/commerce/blob/b86feabb9f28d977077dec92be5ff7c3efd5572c/src/controllers/CartController.php) uses the authoritative store service and an explicit input check; [the GraphQL ESLint addon](https://github.com/robuust/eslint-config/blob/99b3da2312b12570a4a3368f3076d4ea1d21e0de/graphql.js) is shared tooling, not proof of unique personal formatting. RS source IDs in the evidence index identify these and the explicitly AI-credited site counterexamples.

## Evidence hierarchy

1. A specific current user decision or current repository contract governs the current review.
2. Repeated explicit review requests, with independent matching corrective code and counterexamples, provide strong historical preference evidence.
3. A received suggestion becomes an adopted practice only when an exact later diff establishes it. Adoption in a follow-up PR and later reversal remain distinct outcomes.
4. Code presence alone, a tentative question, search membership, a resolved thread, or an empty approval supplies weaker or no preference evidence.
5. Lexical frequency is descriptive. The measured code includes many guard, nullable-access, cast, and documentation additions; it contradicts blanket bans rather than establishing a preferred count.

Confidence labels describe support for a scoped historical interpretation, never a probability that current code is defective or a severity level.

## Known limitations

The read-only API collection is non-atomic and limited to currently accessible, non-deleted data. Local refs were not fetched; one checkout was shallow. GitHub's default-branch search does not enumerate every private, deleted, unreachable, or non-default-branch historical contribution. Seven PR **commit** connections were API-capped at 250, while their reviews and discussions were fully paginated; selected outcomes use exact revisions rather than treating those partial commit lists as complete.

The quantitative pass omitted 2 whole large commit patches and 30 patches that exceeded its byte cap, plus individual generated, large, or unsupported files. It used lexical candidates, not language parsers. The close readings are purposeful and may favor corrective changes. Not every line of every commit was manually reviewed.

128 local nonmerge observations carry explicit AI provenance, and automation-like comment templates were separately flagged. Absence of a marker is not evidence of manual composition; a User account can publish generated feedback. Recent Salta work is especially unsuitable as sole proof of unaided personal style. Team lint presets, scaffolding, framework version changes, and collaborators also influence the observed code.

No product code, Git refs, or remote discussion was changed for the initial research, and no application tests were run. The initial skill was statically validated. A later read-only retrospective evaluation is recorded below; neither static checks nor one evaluation establish general reviewer accuracy.

## Updating the profile

For a later refresh, preserve existing rule IDs and add dated sources plus counterevidence. Inspect representative code and complete relevant review discussions before changing scope or confidence. Record whether feedback was adopted before merge, adopted later, rejected, deferred, or reversed. Downgrade or retire a rule when stronger newer evidence conflicts; never silently convert project convention into universal identity. A new stack needs new evidence rather than automatic extrapolation.

A reply-linked fixing SHA may precede a rebase or stack restack. Absence from the final PR commit list is not proof of non-adoption: compare the actual diff and final file, recording a verified successor separately from the reply's original SHA. Conversely, a merged PR, resolved thread or accepted general review does not establish that every nit was changed. Do not count repeated review comments on the same unresolved point as independent evidence.

## Targeted Haarhuis refresh on 2026-11-12

The user requested source research from the completed agent-team PRs. This supplement screens 16 code PRs: #567–574, #576–581, #583 and #584. Stack-registration artifacts #575/#582 are excluded. Current REST lists were paginated for 58 inline comments, 81 formal review records (nine nonempty bodies), 13 discussion comments, 42 PR-commit records and 129 changed-file records. Review-thread connections were also paginated. These are snapshot record counts, not distinct preferences, unique contributions or a replacement for the annual corpus totals.

Backend and frontend passes inspected relevant comments, replies, exact before/after revisions, final retained code and selected locked framework/component implementations. RF27–RF36 record scoped adopted, retained and unimplemented outcomes. Sources from teammate User accounts remain received advice; Joost-account replies/code are agent-associated attribution, not unaided handwriting or new evidence of Joost reviewing others. This batch reinforces existing rules without raising their confidence or inventing a new universal style rule. Code-only reset and `useHttp` repairs are explicitly distinguished from feedback-led adoption.

The API snapshot is not complete historical bot coverage. Three linked original Qodo discussion comments (#578: 6821305040; #577: 6821226830; #581: 6821114775) returned 404 during this refresh. Surviving replies can establish recorded reasoning and exact code can establish retention, but neither reconstructs unavailable original wording or author metadata. In particular, a durable material claim, valid zero rate and workload-dependent index recommendation must be assessed against their actual contract, not promoted into universal personal rules.

The new examples are exposed development material. Static skill/link/index validation and an independent documentary review do not demonstrate higher reviewer accuracy. No application tests, new browser fixtures or skill behavioral evaluations were run for this research; separately authorized application implementation/reviews in the same session are not evaluation evidence for this profile refresh. Collection is a November 12 snapshot, not a claim to include every later event that day or a complete annual recrawl.

## Retrospective calibration on 2026-11-11

The first evaluation used the pre-feedback revision of [Haarhuis PR302](https://github.com/robuust/haarhuis-portaal/pull/302), with fresh reviewers for standard review and standard review plus the original profile. Both recovered the same one of nine historical points (documented JSDoc). Six reference points were not covered; two clarification/taste points were not required findings. The profile added one optional request-date accessor suggestion. Independent adjudication identified missed one-endpoint model simplification, concrete naming proposals and changed existing query boundaries. These are not six missed bugs, and related model comments are not independent correctness failures.

The revision adds the focused model/name/behavior inspection reference, allowing concrete optional readability benefits without requiring a runtime defect. This is a process correction from observed misses, not a universal rule to rename or flatten all models. The second target must be selected and adjudicated without supplying its review comments as expected answers. The annual corpus still includes older comments; absence of an exact profile citation does not make a later retrospective example a clean hold-out. No application tests or runtime reproduction are implied by these evaluations.

## Development-set revision

The third development iteration uses concrete cases from the already-used Haarhuis302, Kuipers1672 and Inventflow495 PRs, including paired retain controls. Expected comments are development labels, not independent test truth. The revised procedure separates binding instructions from sibling precedent, includes repeated controller dependency/response setup, and completes related-field naming groups. Calibration examples are disclosed to the candidate reviewer and cannot be counted as held-out evidence. Assessment packets and reference rubrics are isolated by PR until the candidate and review outputs are frozen. The annual-corpus limitation still applies.

The completed third iteration covered eight exposed positive groups and four retain controls. On its two other historical PRs, both old and candidate versions missed the sole unconditional request group: Haarhuis338's connected action/computed-route simplification. Inventflow350's complete permission discussion instead established a retain control. Each version offered two supported extras and over-retained the computed route; no increased request overlap or general transfer was demonstrated.

The fourth iteration therefore treats those two assessment PRs as exposed development examples. It inspects effective consumers and connected removals instead of treating all textual references as useful reuse. A separate steward selects other theme-positive PRs and isolates their expected comments until the candidate and outputs are frozen. Theme selection and annual-corpus exposure limit inference; these examples cannot establish general accuracy or causal improvement.
