---
name: agent-team
description: "Initialize project scope from wireframes, designs, issues and code; derive domain models and roadmaps, then orchestrate requested teams and agreed execution across task chats."
---

# Agent Team

Research the project before planning its work, coordinate the requested outcome, and require evidence for completion. This skill connects project initialization, domain modeling and roadmap creation to in-chat subagents and the user's roadmap workflow across clean task chats. It does not widen edit, test, publication, merge, deployment, or messaging authorization.

If you are a delegated specialist, complete your assigned package and return its handoff. Do not start another team or assign the next roadmap step.

## Choose the execution level

| Route | Use | Load |
| --- | --- | --- |
| Init | Research the full declared project scope from available sources and produce reusable context and a draft roadmap | [discovery.md](references/discovery.md), which routes source collection, domain planning and roadmap authoring. |
| Refresh | Update an existing initialization after source or scope changes | The existing project context and the refresh procedure in discovery.md; inspect affected sources and dependents. |
| Roadmap authoring | Create or revise a roadmap from existing project research | [roadmap-authoring.md](references/roadmap-authoring.md); recover material missing research before declaring readiness. |
| Direct | One indivisible local task or a focused question | The relevant domain reference below; avoid manufactured delegation. |
| Team | Independent work packages or independent review within the current task | [routing.md](references/routing.md), [contracts.md](references/contracts.md), and the relevant domain reference. |
| Roadmap execution | Start or coordinate agreed steps, often across repositories | [roadmap.md](references/roadmap.md), then Team guidance only inside a step that benefits from it. |
| Resume or audit | Continue an existing run, inspect a handoff, or assess a completion claim | Its current state and [recovery.md](references/recovery.md); preserve review-only scope. |

For code, read [software.md](references/software.md). For research or drafting, read [research-writing.md](references/research-writing.md). Read only the relevant routes. [salta.md](references/salta.md) is a project-specific application, not a default for unrelated projects. [sources.md](references/sources.md) records the upstream basis and adaptation limits.

Interpret `$agent-team init <project and sources>`, `refresh`, `roadmap`, `start <step>`, and `resume` as natural-language skill requests, not installed CLI commands. `init` includes discovery and roadmap authoring; it does not itself start product implementation or publish issues. If the same request also authorizes execution, continue into ready work within that scope without inserting an extra planning approval round.

Use the request and settled decisions to establish the observable outcome, owning artifacts, acceptance criteria, dependencies, and permissions. Resolve routine choices directly. Ask only when a missing answer materially changes correctness, scope, or authority, while continuing independent authorized work.

## Select capabilities and work packages

Select engineering questions and relevant installed skills using routing.md; then choose who performs them. A skill, gate, or repository does not automatically require a separate agent. Keep contract decisions ahead of their consumers and concurrent write sets disjoint. One owner integrates shared files and the final result.

For substantive independent work, actively delegate ready packages rather than doing all discovery, implementation or review sequentially. Use [parallelism.md](references/parallelism.md) to maintain a bounded pool, refill free slots, and overlap work whose own prerequisites are satisfied. Keep short indivisible work direct.

For non-trivial multi-wave or cross-repository Team work, make the plan concrete using [plan.example.json](assets/plan.example.json). Run `python3 <skill-directory>/scripts/check_plan.py <plan.json>` before delegation. It statically checks declared dependencies, ownership, contracts, permissions, and review order; `VALID_PLAN` does not prove implementation, authorization, or runtime enforcement. Smaller runs may use the same fields in a concise brief.

Delegate through native subagent tools with the [work-package template](templates/work-package.md). Use fresh context for independent review and self-contained subtasks. Include exact artifacts, decisions, ownership, authorization sources, and output expectations even when history is inherited. Wait for dependencies and inspect actual artifacts on receipt.

If native delegation is unavailable, report the limitation and proceed directly where possible. Do not implicitly substitute an SDK, extra Codex processes, or user-owned chats.

## Keep evidence and state usable

Use [contracts.md](references/contracts.md) for handoffs, criterion-level evidence, and freshness. A summary is a claim to inspect. Keep requirement meaning in its existing issue, specification, or code contract; run state holds references and scheduling facts.

Persist state when a run spans waves, repositories, chats, or interruptions. Use an established authorized location; for personal coordination, `<CODEX_HOME>/agent-team/runs/<run-id>/` is a suitable operational location outside product repositories. Do not add competing roadmap documents or change repository ignore rules just to use this skill. The [state example](assets/state.example.json) shows the record shape.

Track readiness, implementation, review, publication, merge, deployment, and acceptance separately. Local completion can be valid before a commit or PR exists. A merged PR does not prove deployment or end-to-end acceptance.

## Review, recover, and stop

Obtain independent review of non-trivial Team deliverables. Review stable completed packages while unrelated work continues; retain final review of their integrated interactions. The reviewer did not author the result, inspects the criteria and primary artifacts, and reports `PASS`, `CHANGES_REQUIRED`, or `INCOMPLETE`, with concrete findings, evidence, and material limits. It does not silently edit. Direct work does not require another agent solely to satisfy a role diagram.

Default bounds are six concurrent subagents excluding the coordinator, or the runtime's lower limit, delegation depth one, one recovery retry per failed package, and two correction cycles after the initial review. Six is a ceiling, not a target to fill. These are workflow defaults and may be adjusted explicitly for a task. Preserve useful work before recovery; follow recovery.md rather than resetting or discarding work automatically.

Inherit current model and reasoning settings unless the user or applicable instructions request overrides. Keep current global configuration intact. Use actual runtime controls for supplied budgets, record observed usage only, and disclose when a strict cost or time cap cannot be enforced. Reviewer read-only instructions and write ownership are behavioral constraints; subagents inherit the parent permissions.

At an exhausted task budget, stop launching affected work, safely interrupt outstanding agents, preserve partial artifacts, and report the remaining gaps.

Writing, changing, or running tests requires explicit user authorization. Carry valid standing authorization within its original scope and source; a plan or skill cannot grant it. Continue permitted inspection, formatting, linting, static analysis, and builds. Do not weaken criteria, invent evidence, accept risk on the user's behalf, or treat missing checks as passing.

Finish authorized work rather than stopping at a status announcement. At a real dependency or authorization boundary, finish useful independent work and report the concrete remaining action. Use the [completion report](templates/completion-report.md) for meaningful outcomes; roadmap messaging and next-step rules live in roadmap.md.
