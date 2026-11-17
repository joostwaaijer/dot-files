---
name: github-submit-review
description: Create draft or ready-for-review GitHub pull requests using repository contribution rules. Apply Robuust metadata to ready-for-review Robuust PRs. Use when asked to publish changes as a PR; not for read-only review or commit-only requests.
---

# GitHub Submit for Review

Carry the requested submission through to a verified GitHub PR. Use authenticated `gh` when available. Creating or editing this skill does not authorize publishing a repository. A request to submit changes using this workflow authorizes the necessary scoped commit and push and PR creation. The fixed Codex trigger comment below is part of authorized ready-for-review PR creation or an authorized draft-to-ready transition. Review requests, labels and auto-merge depend on the requested PR state below. Honor explicit limits from the current request; do not ask again for actions already authorized.

For feedback on an existing PR, use [`github-address-feedback`](../github-address-feedback/SKILL.md).

For a new PR implementing earlier review feedback, carry its source links and authors' GitHub logins into the submission and apply the [feedback-author attribution and reviewer rules](../github-address-feedback/SKILL.md#new-prs-from-feedback).

## Select the submission route and basis

Use the actual request and task history to select the route before mutations:

| Route | Work to complete |
| --- | --- |
| New submission | Prepare the scoped changes and create one PR in the requested state. Check for an existing PR belonging to this submission before creating one. |
| Resume | Verify which steps of this same authorized submission succeeded, then complete only missing or invalidated steps on its existing PR. |
| Draft to ready | Use the user-selected draft and its current published content. Verify preparation and the test decision, then transition that PR and apply ready-for-review steps. Unchanged content needs no new commit, push or release preparation. This route alone does not authorize publishing additional code. |

Do not infer that an arbitrary open PR belongs to this submission. Ask only when materially different repositories, PRs, bases or content scopes remain plausible. A request to inspect or prepare a submission does not itself authorize publication; preserve explicit limits and still-valid authorization for this objective.

Confirm the selected repository, checkout, branch and local HEAD, relevant staged/unstaged/untracked changes, GitHub host and authenticated account, destination repository, head repository/branch and intended base. For fork contributions, distinguish the push destination from the repository receiving the PR. Resolve the base and relevant existing remote head to full commit IDs and record the intended commit range and diff, including all unpublished commits that would reach the PR.

Distinguish submission changes from unrelated local work, including mixed changes within one file and commits already on the branch. Stage only the intended changes, not whole files merely because their paths are in scope. If the branch includes unrelated commits, establish a clean publication basis within existing Git authority before pushing; do not silently include them or rewrite history to remove them.

Ground the PR description and changelog in the accepted scope, source issues/decisions and actual diff. Do not invent product decisions or expand implementation to make a submission easier. Record the final prepared commit IDs after scoped release edits and commits. Before outward actions, refresh affected content and remote state; reassess only invalidated preparation or evidence if the basis changed.

## Route dependency contributions

- For an evidenced dependency defect, follow the shared [upstream-dependency-fixes](../upstream-dependency-fixes/SKILL.md) workflow, including the consuming project's temporary fork pin and return condition.
- For PRs to externally maintained repositories, read and follow upstream's applicable `AGENTS.md`, `CONTRIBUTING`, PR template, and CI/contribution guidelines. Use those rules for the contribution base, commit/PR formatting, release/changelog handling, reviewers, labels, and merge settings instead of the Robuust-specific defaults below. Do not create a dated upstream release, request Robuust teams, add `testable`, or enable auto-merge merely because this skill normally does so for Robuust PRs.
- Preserve the requested PR state and shared authorization, Git safety, and test-execution boundaries. Prepare and verify the scoped diff, publish only when authorized, and read back the upstream PR's actual state and required metadata. Apply the Robuust workflow separately to a consuming-project PR when requested.

## Confirm test work before submission

- Before preparing the release or committing, pushing, or changing the PR, apply the shared [Testing and Verification](../../agents/templates/org/AGENTS.md#testing-and-verification) rules, including coverage verification. Writing, modifying, deleting or running tests requires explicit user authorization covering that work for this objective. Publishing or invoking this skill alone does not authorize test work.
- Inspect the actual CI, test scripts and configuration to establish applicable coverage metrics, scope and thresholds without executing tests. Check whether needed tests were added/updated and successfully run against the relevant current content. Record the checked revision or content basis and results; unverified applicable coverage is incomplete test execution, and a pass from an older head is not automatically evidence for changed content. Inspect combined lint/build scripts so non-test checks do not run tests implicitly.
- If required work is incomplete and neither authorized nor covered by an explicit user waiver for this objective, always ask before release preparation or publication proceeds. Use the user's language, for example: "Mag ik de ontbrekende tests toevoegen en de relevante tests uitvoeren voordat ik deze wijzigingen publiceer?" Adapt the question to the actual gap. If meaningful tests do not apply, explain that and ask whether to proceed without tests unless the user has already decided this.
- Skip the question when required test work is complete or a still-applicable explicit waiver covers the gap. Reuse existing explicit authorization and complete the authorized work before submission without asking again. Record the user's decision, scope and remaining gaps in task context so resumption does not repeat the question. Do not transfer authorization or waivers to a different objective; ask only for a new uncovered gap. Do not rerun passing tests unless relevant changes or a concrete remaining concern invalidate the evidence.
- Wait for a required decision without crossing the release/publication boundary. Continue independent authorized inspection, non-test checks and PR-body drafting while waiting. If approved, finish the relevant test work; if declined, honor that decision and accurately complete applicable test-related PR template fields. Preserve the evidence and limits of any waiver rather than claiming tests or coverage passed.

## Respect the requested PR state

- When the user requests a draft, create it with `--draft`. Do not add reviewers or labels, or enable auto-merge, unless the user explicitly requests those actions. Skip the reviewer-selection, Codex trigger comment and auto-merge workflow for drafts; leave existing user-managed metadata alone.
- For ready-for-review submissions, apply the reviewer, label and auto-merge rules below. A later explicit request to mark a draft ready activates those steps and the one-time Codex trigger comment.
- Preserve an explicitly requested `Unreleased` changelog entry instead of creating a dated release.

## Prepare the release

- Inspect the intended changes against the recorded target/base and publication scope, including relevant uncommitted work. Preserve unrelated changes and stage only the submission's intended changes, including partial-file scope where necessary.
- Inspect whether the repository has a meaningful changelog before preparing a release. If none exists, do not create, initialize, or update one unless the user explicitly asks to start or update the changelog. A file containing only an initial placeholder, such as `## 1.0.0 (Unreleased)` and `* Initial release`, counts as no existing changelog; leave it unchanged. Judge the content, not the filename or presence of `Unreleased`: actual release history or meaningful unreleased entries count as an existing changelog.
- When a meaningful changelog exists or the user explicitly requests starting or updating one, inspect the repository's release/version conventions. Unless the user explicitly requested `Unreleased`, create a **new release section dated today in the user's timezone**, using the existing heading/date format and appropriate next version. Do not hardcode the skill creation date. Follow repository evidence for version selection; ask only when a material choice cannot be resolved.
- When creating a dated release, move entries belonging to this submission from `Unreleased` into the new release, keeping unrelated unreleased work separate. Keep releases newest first and entries concise, user-facing, and grouped by related behavior. Update release comparison links if the changelog uses them. Do not create a GitHub Release, tag, or unrelated package version bump just because a changelog release is requested.
- Before editing on resumption or draft-to-ready, check the existing local/published diff and task history for release preparation already completed for this submission. Reuse its section, version, date and moved entries when still applicable; do not generate another release or redate it merely because execution resumed on another day. A matching date or heading alone does not establish ownership by this submission. Preserve manual edits and unrelated entries. An unchanged draft-to-ready transition does not itself start a new release. For a genuinely new submission, retain the dated-release or explicit `Unreleased` rules above; resolve only material version/scope ambiguities from user input.
- Follow applicable repository checks and inspect the final diff. Test execution requires explicit authorization for the active objective; submitting for review or adding `testable` does not authorize tests. Continue relevant linting, formatting, static analysis, and builds unless deferred.

## Select reviewers from the changes

For ready-for-review submissions only, read the complete intended PR diff against its recorded base, including already committed changes, not just newly edited files or file extensions. Classify the substantive submission; its generated changelog notes do not add a reviewer category.

| Change category | Request review from |
| --- | --- |
| Interface or design changes to HTML/template markup, Tailwind or other classes, CSS/SCSS, or comparable presentation elements | `@robuust/front-end` |
| JavaScript/TypeScript or PHP logic, template logic, application behavior, or other technical changes beyond pure styling or content, including configuration, dependencies, migrations, build tooling, and tests | `@robuust/back-end` |

A Vue component with only markup/classes/style changes needs front-end review; a JavaScript behavior change needs back-end review even when it runs in the browser. A submission changing both presentation and logic needs both teams.

For text-only content or documentation changes, or when you cannot confidently choose between `@robuust/back-end` and `@robuust/front-end`, request both teams instead of leaving the reviewer list empty.

| Categories present | Auto-merge |
| --- | --- |
| Front-end only | Enable |
| Back-end only | Enable |
| Both, including unclear reviewer selection | Leave disabled; disable it if already enabled during this submission |

Request teams as GitHub reviewers, not merely mentions in the PR body or a comment. For `gh`, team identifiers are `robuust/front-end` and `robuust/back-end` without `@`.

## Publish the PR

- Before committing or pushing, check whether the branch already has a closed or merged PR. If so, create a fresh branch; never add commits to that branch. Follow repository naming, otherwise use `feature/<short-kebab-description>`. Keep stage, commit, and push operations sequential.
- Find the repository's actual PR template and follow the shared [PR formatting instructions](../../git-instructions/pr-instructions.md). When the changelog is skipped under the rule above, mark changelog-related fields or checklist items `N/A` with the reason; do not claim a changelog update was completed.
- Follow the shared [commit formatting instructions](../../git-instructions/commit-instructions.md) for every commit. Do not add agent co-authors or squash commits.
- Create a new PR only on the new-submission route, against the intended base in the requested state. Resume the verified existing PR or transition the selected draft on the other routes. For drafts, omit reviewers and labels unless explicitly requested. For ready-for-review PRs, add the required team review requests and the `testable` label. Use a safely written body file with `--body-file` for shell commands. If recovering from an interrupted attempt, first check whether this submission already created its PR; continue that PR instead of duplicating it.
- Immediately after successful creation of a ready-for-review PR or successfully marking an existing draft ready, complete [Request Codex review once](#request-codex-review-once), before enabling auto-merge. Preserve the existing PR when marking a draft ready. Skip this step while the PR remains a draft and for ordinary updates to an already ready-for-review PR.
- For ready-for-review PRs, apply the auto-merge rule after reviewers and the label are in place. Use an allowed non-squash method consistent with repository policy, preferring merge commits when there is no other convention. Never bypass required reviews/checks or fall back to an immediate/manual merge when auto-merge cannot be enabled.
- If permissions, missing teams/labels, or repository settings prevent a step, keep completed work, report the exact remaining blocker, and do not substitute reviewers, create organization/repository settings, or repeatedly retry unchanged failures.
- Attach every created PR to the current chat with the app's PR attachment tool when available.

### Resume publication without duplicate actions

Retain the submission identity, prepared revisions, test decision, release section when applicable, PR URL and verified completed actions in task context. After interruption or an uncertain tool outcome, read the current Git and GitHub state before retrying: inspect the commit/index, remote head, matching PR and transition, reviewer requests, labels and auto-merge as relevant. An attempted action is not proof of completion; reuse verified success and execute only missing steps.

Keep staging, commit and push sequential. Inspect the exact staged diff before committing and the complete outgoing commit range before pushing; exclude unrelated changes already in the index or branch without discarding user work. Verify that the push reached the prepared head before proceeding. Recheck the actual PR diff and head before review/auto-merge actions; refresh invalidated scope classification or evidence if content changed. Do not create duplicate commits/PRs, repeat notifications or remove/re-add reviewers to manufacture a request. Preserve pending requests and user-managed metadata; make only the changes required by the selected route and existing reviewer/auto-merge rules. Use the separate Codex-trigger procedure below without broadening its eligibility or posting it again.

If a lookup is incomplete or the outcome remains uncertain, do not blindly repeat the mutation. Keep completed work and report the specific unresolved action; do not keep retrying an unchanged permission or configuration failure. If the PR has already merged or closed, establish that live state before attempting further actions, rather than treating it as an open submission or creating a replacement automatically.

### Request Codex review once

- For a PR newly created ready for review or transitioned from draft to ready by this submission, post one standalone PR conversation comment whose entire body is exactly `@codex review`, using the authenticated GitHub account. This fixed trigger is part of the authorized PR publication or draft-to-ready transition; do not ask for separate permission. Keep human reviewer requests, labels and auto-merge rules unchanged.
- Retain the PR URL and the successful creation or draft-to-ready transition in the task context. On resumption, verify that the PR belongs to this interrupted submission and that the relevant action succeeded before completing a missing trigger. Confirm the PR is currently ready for review. Do not infer eligibility merely from an existing PR being open or ready for review.
- Before posting, identify the authenticated account (`gh api user --jq .login`) and read **all pages** of the PR's conversation comments (`gh api --paginate repos/OWNER/REPO/issues/NUMBER/comments`), using the PR's GitHub host for both API calls. If a comment with exactly that body already exists, regardless of author, reuse it without posting or editing another comment. If the lookup fails or is incomplete, report the blocker without posting.
- Only after confirming absence, post with `gh pr comment "$pr_url" --body '@codex review'`, where `pr_url` is the verified PR URL. Do not put the trigger in the PR body, a review or an inline thread, and do not use comment-editing flags. If posting fails or its outcome is uncertain, reread all comments before any retry; do not blindly repeat the write. An existing matching comment also prevents duplicates if the PR is returned to draft and marked ready again.
- Read back and verify the comment URL and exact body. For a newly posted comment, also verify that its author is the authenticated account; a reused comment may have a different author. If the outcome remains uncertain or permissions prevent completion, keep the created PR and report the specific incomplete step. A verified trigger comment confirms the request was posted; it does not prove that Codex completed a review.

## Verify and report

Read back the live PR and verify its URL, repository/head identity, full base/head commit IDs and requested draft or ready-for-review state. Compare the published head and actual PR diff with the prepared commits/content; branch names alone are insufficient. If the base/head or diff changed, identify affected preparation and verification gaps rather than certifying the older artifact. For drafts, verify no Codex trigger comment was posted by this submission and no reviewers, labels or auto-merge were added by this submission unless explicitly requested. For ready-for-review PRs, verify requested teams, the `testable` label and auto-merge setting/method. For newly created ready-for-review PRs and draft-to-ready transitions, also verify the Codex trigger comment as described above. When the changelog is in scope, verify the requested entry is included in the pushed diff. When skipped, verify this submission did not create or modify a changelog and any changelog-related template fields are marked `N/A` with the reason. For teams that have already reviewed, account for submitted reviews as well as pending requests.

Report the PR link, published revision, requested state and changelog concisely (or `N/A` with the reason when skipped), with any incomplete steps or verification limits. Include reviewer teams and auto-merge status when the ready-for-review workflow applies, and link the Codex trigger comment when the creation or draft-to-ready step applies. Distinguish publication, requested review versus completed review/approval, CI pending/passed/failed or uninspected, auto-merge enabled versus actual merge, and deployment. Tie any CI or review claim to the relevant revision and scope; do not carry invalidated evidence forward or treat a user waiver as a passing check. Submission does not require waiting for CI or merge unless the user requested that follow-up; report the actual current state. An open PR blocked on required checks or reviews is awaiting those requirements; it is not proof of a failed submission, merge, or deployment.
