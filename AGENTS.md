# Language

- User communication may be Dutch or English.
- Write code, code comments, commit messages, branch names, and pull request titles and descriptions in English.
- Lead with the result. Use concise paragraphs and plain, precise language; use lists or tables when they make the information easier to compare. Scale detail to the task and explain material validation limits.

# Scope and Decisions

- Before changes with material behavior or design choices, establish the intended observable result, affected contracts, and unresolved choices from the request, prior decisions, and relevant code. Ask only when a missing answer materially changes correctness, scope, or authorization; continue independent authorized work while waiting. Resolve routine choices without a mandatory planning or approval round.
- Before repository edits, confirm the selected repository, branch or worktree, and existing local changes. Preserve user-authored work and use the checkout authorized for the task.
- Carry settled decisions across follow-ups. Revisit them only when new evidence or changed requirements warrant it, and explain the practical effect on the existing solution. Treat necessary discovery and changed requirements as legitimate iteration.

# Chat Coordination

- When coordinating an agreed roadmap across chats, start each independently scoped follow-up task in a new chat with clean context. Hand over only its goal, scope, relevant decisions, repository and branch context, dependencies, verification authorization, and the coordinating chat's ID.
- For these coordinated tasks, the user authorizes each task chat to send its completion report or a material blocker directly to the coordinating chat. Include this standing authorization and the coordinating chat's ID in the task handoff so reporting back does not require another permission request.
- Report completed behavior, verification and limitations, local work status, relevant PR links, and live merge status. Send one report per meaningful outcome or blocker; do not repeat unchanged updates. Let the coordinating chat assign the next task.
- Prefer completion reports over recurring status checks. Do not schedule periodic polling unless the user explicitly requests it. If a task finishes before its PR merges, a later merge still needs a separate notification or trigger; do not promise automatic detection without one.
- After a completion or merge report, verify that every PR required for the current step has merged before automatically starting the next agreed task in a new chat. Keep existing test, commit, push, publication, and merge authorization boundaries; coordinating follow-up work does not widen them.

# Implementation Choices

- Before adding abstractions, transport handling, local state, or dependencies, inspect the relevant existing implementation and supported framework or library APIs. Prefer the smallest solution that fits the established contracts, and explain any necessary departure from existing patterns.
- Keep authoritative data and behavior in their owning layer. Avoid duplicate state, parallel validation, or renamed copies of existing contract fields without an evidenced need.
- Complete the agreed behavior and required checks. Propose optional refinements only when their practical benefit justifies the extra work; avoid unrelated cleanup and repeated redesign without new evidence.

# Verification

- Establish the authorized verification scope from the request and session before implementation. Writing, modifying, or running tests requires an explicit user request; an implementation or verification request alone does not grant it. Existing test authorization persists for follow-up corrections within the same objective.
- When test work is authorized, use the project's existing test setup and target the changed behavior, failure mode, or contract. Expand checks only for applicable project requirements or a concrete unresolved risk. For test-only work, keep application code intact and report when a production change appears necessary.
- Continue relevant linting, formatting, static analysis, builds, and direct inspection unless deferred. Report material test gaps early when test work is not authorized; ask only when a required next step depends on that authorization, and continue independent authorized work.
- Repeat passing checks only after relevant changes, failures, or a concrete remaining concern. Report what was actually verified and any material limits; distinguish syntax or build success from confirmed user-facing behavior.

# Temporary Test Containers

- For authorized test runs that create temporary Docker resources, read and apply the [Temporary Test Containers](agents/templates/org/AGENTS.md#temporary-test-containers) section. Use that section for cleanup of run-owned containers, volumes, and networks; preserve this file's existing authorization rules.
