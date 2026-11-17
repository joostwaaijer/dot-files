---
name: writing-for-agents
description: Write or revise agent instructions, skills, AGENTS.md, and linked workflow references.
---

# Writing for Agents

Write instructions that change useful decisions without constraining unrelated work. Preserve the user's task, explicit preferences, and authorization boundaries.

For skill frontmatter, invocation policy, and routing, read [SKILL-MECHANICS.md](SKILL-MECHANICS.md).

## Scope and evidence

Before editing, establish the actual managed source and ownership: personal file, shared symlink target, generated output or plugin-managed resource. Use the owning filesystem/provider and verify current paths, repository/branch and local changes where applicable. Edit within the authorized ownership scope, preserving unrelated work. Do not silently turn a personal change into a shared one or patch only a generated/cache copy that its source will overwrite; follow the existing generation/synchronization contract rather than remembered paths.

Inspect the instructions being changed and their actual consumers. Separate durable user constraints and operational invariants from defaults, optional advice, and outdated workarounds. Preserve non-obvious reasons that a future agent cannot cheaply recover from code or configuration.

Ground consequential rules in explicit user decisions, applicable project agreements, confirmed failures and verified tool/framework contracts. Use relevant issue/design/specification context for project choices. Distinguish accepted outcomes from observed implementation and proposed policy; an isolated example or a preferred pattern does not establish a universal rule. Keep unresolved material policy/workflow choices open for user input rather than silently selecting a solution.

Distinguish rewording from changing an obligation, exception, default, trigger, output contract or authority. For meaningful changes, briefly identify the before/after effect and its basis; no line-by-line inventory is needed. Removing an obligation or broadening permission is a policy change, not wording cleanup. Make such changes only within actual authorization, preserving settled limits. An approved policy change needs no second generic approval round.

State the desired outcome and the evidence of completion. Prescribe a fixed sequence only where order affects correctness, safety, or a fragile tool contract. Routine choices can remain with the agent; a typo fix should not inherit a project-wide exploration workflow.

Use existing authorization and settled context. Questions should resolve material uncertainty, not repeat earlier approvals. Make any required stopping condition specific to the action that needs it. If independent authorized work remains, allow it to continue while that decision is pending.

## Context pointers

A pointer names a resource and says when to read it. Skill descriptions and links in `AGENTS.md` are pointers: keep them short and discriminating. Identify the actual task or decision they support instead of listing every related keyword.

Keep common purpose and essential constraints in the entrypoint. Move substantial conditional procedures into supporting references, with a clear condition for reading each. Keep a rule's applicability, relevant exception and rationale available together; do not make a default actionable while hiding its limiting case in an optional branch. An index guides selection but does not replace reading the complete applicable rule. A short workflow can remain one file. Check that links resolve; a reference with no discoverable pointer is easy to miss.

## Organization and pruning

Group a rule with its relevant exception and rationale. Keep each requirement in one authoritative place where practical; update callers when a changed rule would otherwise remain duplicated.

Remove generic encouragement, redundant examples, arbitrary question or agent quotas, and steps that do not change the outcome. Retain examples and counterexamples that materially change a decision, including useful calibration/retain cases; move them with a discoverable pointer rather than discarding them to shorten the entrypoint. Read cheap, current facts from the environment rather than caching versions, commands, or directory maps in always-loaded guidance.

Use plain, concrete language. Prefer a positive instruction when it is equally precise; retain explicit prohibitions for genuine boundaries such as test authorization or publishing. Do not replace a clear sentence with invented shorthand or forbid established project terminology.

Separate model-specific advice from durable workflow rules. A model upgrade is reason to inspect assumptions, not to erase user preferences or weaken operational safeguards.

## Review

Review the final diff for lost requirements, conflicting instructions, scope expansion, unnecessary pauses, and premature completion. Check descriptions, frontmatter, invocation metadata, and local references. Preserve policy fields unless the user requested changing them.

Static validation establishes structure, not behavior. Report that limit. Use realistic behavioral evaluations only when the user authorizes them; do not run tests merely because instructions were edited.

For an authorized evaluation, use a realistic task and relevant raw artifacts, including applicable exceptions or preservation cases. Do not provide the desired answer or author conclusions unless the task requires them. Freeze the artifact and assessment criteria before judging results; disclose exposed development examples and limits on generalization. Wording/regex checks can verify text structure or preservation, not better agent decisions. Scale evaluation to the change; small edits need no mandatory new evaluation. Independent assessment requires an evaluator who did not author the target; label self-inspection accurately and honor delegation/further-delegation restrictions.
