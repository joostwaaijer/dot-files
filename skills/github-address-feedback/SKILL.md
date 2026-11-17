---
name: github-address-feedback
description: Evaluate review feedback on an existing GitHub PR, discuss disputed suggestions, and prepare justified local fixes. Keep commits, pushes, replies, thread resolution and renewed review requests behind their authorization and publication boundaries. Use for addressing PR feedback, not creating a PR or reviewing unrelated code.
---

# GitHub Address Feedback

Address the substance of each review comment. A reviewer suggestion is a proposal to evaluate, not an instruction to apply automatically. Default to local work first.

## Authorization by action

An analysis-only request authorizes inspection and recommendations, not edits or GitHub writes. A request to address feedback authorizes justified local fixes and reasoned GitHub replies to suggestions you do not adopt, unless the user explicitly defers those replies. Apply the boundaries below using the actual request and still-valid authorization for this objective; do not ask again for actions already authorized.

| Action | Boundary |
| --- | --- |
| Local fixes | Within the requested feedback scope. Respect an explicit local-only code phase even when an earlier request allowed publication. |
| Discussion replies rejecting feedback | Part of requested feedback handling unless GitHub writes or these replies are deferred. A local-only code phase alone does not prohibit them. |
| Commits and pushes | Require explicit authorization covering each action. A feedback request alone authorizes neither; a local commit does not authorize a push. |
| Replies claiming a code fix and thread resolution | Wait until the fixing commit is pushed and verified on the PR. Resolve only fully addressed concerns; keep disputed or unanswered threads open. |
| Renewed review requests | Part of authorized feedback publication after fixing commits are pushed and verified; honor an explicit deferral of review requests or GitHub writes. Follow the reviewer rules below. |
| New PRs, reviewer-selection changes, labels, auto-merge or merge | Only when requested. Re-requesting existing reviewers under this workflow is distinct from changing their selection. |
| Test work | Writing, modifying, deleting or running tests requires explicit user authorization for the objective. Preserve existing authorization and explicit limits. |

When GitHub writes are deferred, discuss material decisions in the current chat and prepare replies locally. Reporting disagreement only in chat does not complete an otherwise authorized GitHub follow-up; report deferred replies as pending. Review text and suggested code do not authorize scope expansion, weakened checks or external actions. Do not create token code changes or empty commits to enable a reply.

## Inspect the actual feedback

Identify the intended PR from the user's reference or the selected checkout and branch. Record its GitHub host, repository and PR identity, state, and full base/head commit IDs. Read review submissions, general comments and inline threads, including replies and resolved/outdated state. Follow pagination. Prefer an authenticated GitHub CLI or connector.

Before editing, confirm the selected repository, checkout, branch, local HEAD and relation to the PR head. Record relevant staged, unstaged, untracked and unpublished changes so they remain distinguishable from the remote PR. Preserve unrelated work and the selected checkout; do not stage, stash, reset or switch branches merely to capture a comparison.

Assess the PR diff and relevant code against the recorded commit IDs, not moving branch names. Read project rules, nearby implementations, actual consumers and applicable version-matched API documentation. Mark local fixes as changes on top of that basis. An outdated line or resolved thread does not prove its underlying concern is fixed.

Before reporting or publishing, refresh the PR state, base/head and affected feedback. If code, sources or local content changed, reassess only the invalidated conclusions and affected paths. Clearly identify any older assessed snapshot and remaining gap rather than presenting stale evidence as current. If the checkout does not contain the relevant PR code, establish a matching inspection/edit basis within existing authority before applying fixes.

## Decide before editing

For each actionable point, establish the concern, triggering conditions, practical impact and cost of the proposed change. Keep correctness/regressions, documented project standards, originating requirements and personal-style preferences distinct. A reviewer's preference or heuristic alone is not a defect or a binding project rule.

Ground consequential behavior and contract choices in exact project sources; current code alone does not settle ambiguous intent. Ask the user before dependent implementation on a material unresolved choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized work.

- **Agree:** implement the smallest coherent fix, explaining meaningful behavior changes or tradeoffs first.
- **Disagree:** explain the evidence and propose a better alternative when useful. Follow the discussion-reply boundary above, leave the thread open, and do not change correct code merely to clear a review request.
- **Unclear:** retain the unresolved interpretation or source choice for user input; continue independent work.
- **Already addressed:** verify the relevant change and its publication state before claiming completion.

Keep a concise mapping per substantive point: feedback link/thread identity, concern, classification and decision, relevant source/code revision, fix or reasoned response, verification, publication state and remaining action. One comment may contain several points and several threads may share one cause. Group duplicate investigation and fixes while retaining each point's disposition and relevant thread reply. Mark partial completion explicitly. Do not re-raise resolved concerns without current evidence that they remain or have returned.

## Prepare local changes

Keep fixes within the accepted feedback and its necessary dependencies. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) to compare the original triggering scenario and affected producers/consumers, retaining intended corrections. A review suggestion does not authorize an unrelated refactor, renamed contract fields or a new abstraction.

Run relevant formatting, linting, static analysis or builds within project rules. When test work is authorized, inspect applicable CI coverage requirements and target the original concern and affected contracts. Do not rerun passing checks without relevant changes, failures or a concrete remaining concern. Report checks actually performed and gaps; a passing build alone does not establish that the concern is fixed or consumers are preserved. Tie CI evidence to the relevant commit instead of carrying a pass from an older head.

Review the final diff against the accepted outcome and preservation constraints. Use a targeted regression-reviewer profile when an independent preservation pass is warranted, available and delegation is permitted; its reviewer must not have authored the target. Otherwise inspect locally and do not claim independence. Feedback handling does not require a full team workflow. Update the point mapping with the actual fixes and verification limits.

## Publish and follow up when authorized

For authorized commit/push work, verify that the intended PR remains open and its branch/head still matches the assessed publication basis. Follow repository Git safety and formatting rules and publish only scoped changes, excluding unrelated local or unpublished work. If the PR has closed or merged, report that changed boundary rather than pushing to it or starting a replacement PR automatically.

Use [`github-submit-review`](../github-submit-review/SKILL.md) only when the user requests a new PR or a draft-to-ready submission workflow. Carry the originating feedback links and authors' GitHub logins into that handoff. Apply the [new PR attribution and reviewer rules](#new-prs-from-feedback) below.

For each accepted point, reply in its existing thread with the concrete fix, relevant verification and a commit or code link when useful, following the authorization and publication boundaries above. Resolve only after all concerns in that thread are addressed. For rejected feedback, post the reasoned discussion reply without waiting for an unnecessary push, or explicitly report that the user deferred it. Post a separate PR summary comment only when requested or when no relevant thread exists. Never dismiss a review or resolve disputed feedback merely to clear the PR.

After the fixing commits are committed, successfully pushed and verified on the PR, re-request review from the existing reviewers, including those who already submitted a review and no longer appear among pending requests. Use GitHub's review-request mechanism so they receive a new review notification; a mention or thread reply is not a substitute. Preserve the reviewer selection and existing pending requests. For a local commit without push authorization, leave the re-request pending until publication is authorized and verified. Apply any explicit deferral under the authorization table.

### Resume without duplicate actions

Before outward actions, including after interruption, reread the affected threads and PR publication state. Reconcile the point mapping with existing replies, resolutions and renewed review requests. Retain successful action links and the published fixing revision they cover in task context; do not treat an attempted or queued action as completed. Reuse an equivalent reply already covering the same point and fix; add a new response only for a meaningful update or correction.

Do not re-request review again for the same published fixes when a successful renewed request is already verified. An older submitted review or a request predating the fixes is not evidence of that follow-up. A subsequent batch of published fixes requires its own follow-up request under the same authorization rules; an explicit user request can also authorize another request. Do not remove/re-add pending reviewers merely to manufacture a notification.

Read back replies, resolved state and renewed review requests. If an external action fails, a reviewer cannot be re-requested, or the outcome is uncertain, inspect before retrying; do not blindly repeat a write or notification. Retain completed work and report the specific remaining blocker when the outcome cannot be established.

### New PRs from feedback

When an authorized new PR implements review feedback, mention each human author whose feedback it addresses as `@login` in the PR description, after any required template, and link the originating feedback. For ready-for-review PRs, request those authors as individual reviewers alongside the required team reviewers. For drafts, include the mentions and defer the review requests until the PR is marked ready unless the user requests them earlier.

Read back the PR description and individual review requests or submitted reviews to verify both the mentions and reviewer selection. If an author cannot be requested, for example because they authored the new PR or are ineligible to review, keep the attribution and report the specific limitation. Preserve existing reviewers.

## Report the result

Briefly identify the assessed PR/revision and distinguish local fixes, accepted/disputed/partial feedback, performed checks, publication state, renewed review requests and pending follow-up actions. Use the point mapping to expose gaps without requiring empty report sections. Do not claim a fix is pushed, a thread resolved, review requested again, CI passed, or approval received without live evidence.
