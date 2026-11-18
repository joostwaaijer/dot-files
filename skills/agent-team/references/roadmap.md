# Roadmap coordination across chats

Use this route when the user has agreed to coordinated steps. Planning a possible roadmap does not start execution or authorize creating chats. Keep the user's existing coordination agreements and publication boundaries.

To create the roadmap, use [roadmap-authoring.md](roadmap-authoring.md). For a new project initialization, begin with [discovery.md](discovery.md). Execution consumes the resulting context, requirement and domain references instead of reconstructing scope from isolated tickets.

## Two coordination levels

The roadmap coordinator owns sequence, dependencies, accepted decisions, and live delivery status. Each task chat owns one bounded step, including any tightly coupled repositories. A task may use native subagents internally when applicable instructions authorize that delegation.

Create a user-owned task chat only when the user explicitly asks for one or applicable user instructions expressly require new chats for the agreed roadmap. Otherwise use the current chat and native subagents where useful. Do not treat a request for an internal subagent as a request for a sidebar chat.

## Prepare a step

Read the authoritative roadmap, actual prerequisites, applicable rules, and the latest accepted report for each relevant step. Identify the smallest coherent observable outcome, its acceptance criteria, relevant repositories and base revisions, and existing local changes. Reuse the authorized checkout and preserve its work. Freeze unsettled producer/consumer contracts before splitting dependent implementation.

Use [step-handoff.md](../templates/step-handoff.md). A clean handoff contains:

- One goal, clear scope, and concrete completion criteria.
- The initialization entrypoint, requirement references, relevant wireframe/design nodes, and the current domain/data/API contracts.
- Relevant decisions and exact source pointers, with material uncertainty.
- Repositories, branches/worktrees, expected bases, local work, and checkout ownership.
- Dependencies and any required merge or rollout order.
- Current decisions for the actions in scope, including the dated source and limits of verification and publication authority.
- Coordinator chat ID and host, reporting rules, and the user's standing messaging authorization where it actually exists.

Keep conversation transcripts and stale implementation history out of the handoff. Attach enough evidence to work correctly without inheriting the whole coordinator conversation.

Discover `create_thread` and related app tools before use. Follow their current schema. Creation is asynchronous: observe the initial result with the supported thread tools, but do not create a recurring polling schedule. Emit the required created-thread directive after a successful creation.

## Keep delivery dimensions separate

Record only facts supported by current artifacts or a report with an identifiable source:

| Dimension | Examples | Evidence |
| --- | --- | --- |
| Readiness | ready, partly ready, blocked | Source requirements, settled contracts, prerequisites. |
| Implementation | not started, active, locally complete | Current diff and completion report. |
| Review | pending, changes required, passed, incomplete | Independent findings and scope reviewed. |
| Publication | local only, committed, PR open | Actual commit and PR links per repository. |
| Merge | not required, pending, merged, closed without merge | Live state and merge revision for every required PR. |
| Deployment | not in scope, pending, successful, failed | Deployment result for the matching revision and environment. |
| Acceptance | verified, partial, unverified | Exact cases and environments checked. |

Do not infer a successful deployment from a merge, or full acceptance from one language/site or a build. A ready-for-review local result is useful even when publication is not authorized.

## Receive reports and advance

Task chats send one completion report or material blocker when directly authorized to message this coordinator. Include that authorization in the task handoff, so it is not requested again. A report includes behavior, evidence and gaps, local work, PR links, live merge state, and the next authorized boundary. Task chats do not independently assign the next roadmap step.

On a completion or merge report, inspect the concrete result and verify **every required PR** for that step against the provider's current state. CI success, auto-merge enabled, a worker's claim, or one merged PR in a pair is insufficient. A closed-unmerged PR remains unresolved unless explicitly replaced or cancelled.

Automatically start the next agreed task in a clean chat only once every PR required for the current step has merged, even when the next step is technically independent. Its prerequisites and any required rollouts must also have passed, and execution/new-chat authority must still apply. When the current step requires no PR, record that fact. Re-read current checkout status before transferring write ownership. A prior task must not continue editing after ownership has transferred.

Run separate steps concurrently only on an explicit user instruction to start those independent steps together. Carry the instruction into their handoffs and verify separate checkout ownership and independent contracts, merge paths and rollout paths. Within one step, independent packages can run in parallel under [parallelism.md](parallelism.md).

When work completes before merge, record `awaiting merge`, the pending PRs, who will recheck them and what will prompt that check. Identify the existing authorized notification or active user-requested watch. If neither exists, record that the coordinator needs a new user message. Follow a requested watch within its active task using supported bounded waits. On the trigger, check every required PR against the provider again.

## Resume safely

Keep one pointer per active step to its latest accepted report, including when that report lives in a different run directory or task chat. Update the pointer when the coordinator accepts a report. Retain earlier reports and their evidence. Follow [recovery.md](recovery.md) to recover an older state and reconcile action authority. Refresh only facts relevant to the next action, such as current ownership, local work, PR revisions and state, deployments or blockers. Use compact thread snapshots for progress. Never create a duplicate task because its previous chat ended or because an unchanged status is old.
