# Roadmap coordination across chats

Use this route when the user has agreed to coordinated steps. Planning a possible roadmap does not start execution or authorize creating chats. Keep the user's existing coordination agreements and publication boundaries.

To create the roadmap, use [roadmap-authoring.md](roadmap-authoring.md). For a new project initialization, begin with [discovery.md](discovery.md). Execution consumes the resulting context, requirement and domain references instead of reconstructing scope from isolated tickets.

## Two coordination levels

The roadmap coordinator owns sequence, dependencies, accepted decisions, and live delivery status. Each task chat owns one bounded step, including any tightly coupled repositories. A task may use native subagents internally when applicable instructions authorize that delegation.

Create a user-owned task chat only when the user explicitly asks for one or applicable user instructions expressly require new chats for the agreed roadmap. Otherwise use the current chat and native subagents where useful. Do not treat a request for an internal subagent as a request for a sidebar chat.

## Prepare a step

Read the authoritative roadmap, actual prerequisites, applicable rules, and last completion reports. Identify the smallest coherent observable outcome, its acceptance criteria, relevant repositories and base revisions, and existing local changes. Reuse the authorized checkout and preserve its work. Freeze unsettled producer/consumer contracts before splitting dependent implementation.

Use [step-handoff.md](../templates/step-handoff.md). A clean handoff contains:

- One goal, clear scope, and concrete completion criteria.
- The initialization entrypoint, requirement references, relevant wireframe/design nodes, and the current domain/data/API contracts.
- Relevant decisions and exact source pointers, with material uncertainty.
- Repositories, branches/worktrees, expected bases, local work, and checkout ownership.
- Dependencies and any required merge or rollout order.
- Exact verification and publication authorization, including its source and limits.
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

Start the next agreed dependent task only after its prerequisite merge gates pass, any separately required rollout gates pass, and execution/new-chat authority still applies. Re-read current checkout status before transferring write ownership. A prior task must not continue editing after ownership has transferred.

A pending merge does not block an explicitly independent, authorized step with separate checkout ownership and no shared contract or rollout prerequisite. Preserve the agreed roadmap policy: Salta's existing sequential merge-gated slices remain sequential unless the user changes that agreement. Parallelize useful work inside the current slice without creating extra user-owned chats merely to increase concurrency.

When work completes before merge, report `awaiting merge`. A later merge needs a new user message, an authorized notification, or another real trigger; do not promise automatic detection without one. Prefer event-driven completion reports over repeated snapshots. A user-requested watch is followed within that active task using supported bounded waits, not a scheduled automation.

## Resume safely

Read the state, the last accepted report, and the currently owning task. Refresh only facts that can have changed and matter to the next action: local work, PR revisions and state, deployments, or blockers. Use compact thread snapshots for progress. Never create a duplicate task because its previous chat ended or because an unchanged status is old.
