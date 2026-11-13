---
name: writing-for-agents
description: Write or revise agent instructions, skills, AGENTS.md, and linked workflow references.
---

# Writing for Agents

Write instructions that change useful decisions without constraining unrelated work. Preserve the user's task, explicit preferences, and authorization boundaries.

For skill frontmatter, invocation policy, and routing, read [SKILL-MECHANICS.md](SKILL-MECHANICS.md).

## Scope and evidence

Inspect the instructions being changed and their actual consumers. Separate durable user constraints and operational invariants from defaults, optional advice, and outdated workarounds. Preserve non-obvious reasons that a future agent cannot cheaply recover from code or configuration.

State the desired outcome and the evidence of completion. Prescribe a fixed sequence only where order affects correctness, safety, or a fragile tool contract. Routine choices can remain with the agent; a typo fix should not inherit a project-wide exploration workflow.

Use existing authorization and settled context. Questions should resolve material uncertainty, not repeat earlier approvals. Make any required stopping condition specific to the action that needs it. If independent authorized work remains, allow it to continue while that decision is pending.

## Context pointers

A pointer names a resource and says when to read it. Skill descriptions and links in `AGENTS.md` are pointers: keep them short and discriminating. Identify the actual task or decision they support instead of listing every related keyword.

Keep common purpose and essential constraints in the entrypoint. Move substantial conditional procedures into supporting references, with a clear condition for reading each. A short workflow can remain one file. Check that links resolve; a reference with no discoverable pointer is easy to miss.

## Organization and pruning

Group a rule with its relevant exception and rationale. Keep each requirement in one authoritative place where practical; update callers when a changed rule would otherwise remain duplicated.

Remove generic encouragement, repeated examples, arbitrary question or agent quotas, and steps that do not change the outcome. Read cheap, current facts from the environment rather than caching versions, commands, or directory maps in always-loaded guidance.

Use plain, concrete language. Prefer a positive instruction when it is equally precise; retain explicit prohibitions for genuine boundaries such as test authorization or publishing. Do not replace a clear sentence with invented shorthand or forbid established project terminology.

Separate model-specific advice from durable workflow rules. A model upgrade is reason to inspect assumptions, not to erase user preferences or weaken operational safeguards.

## Review

Review the final diff for lost requirements, conflicting instructions, scope expansion, unnecessary pauses, and premature completion. Check descriptions, frontmatter, invocation metadata, and local references. Preserve policy fields unless the user requested changing them.

Static validation establishes structure, not behavior. Report that limit. Use realistic behavioral evaluations only when the user authorizes them; do not run tests merely because instructions were edited.
