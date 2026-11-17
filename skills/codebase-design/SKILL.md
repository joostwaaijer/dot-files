---
name: codebase-design
description: Assess module interfaces, complexity, and test boundaries during architecture design, refactoring discussions, or a scoped architecture scan.
---

# Codebase Design

Reduce complexity for actual callers while keeping responsibilities and authoritative behavior with clear owners. **Deep modules** are one useful design lens, not a requirement to consolidate or add abstractions. Use this reference when module design is the task; it does not mandate architectural changes during routine edits. Retaining the existing design is a valid outcome when a change has no demonstrated benefit.

## Ground the design question

For project-specific recommendations, inspect the affected implementation, actual callers, existing framework/library APIs, and the relevant issues, specifications, wireframes/designs and accepted decisions. Identify the concrete problem: knowledge repeated across callers, unclear ownership, error-prone ordering, or another evidenced source of complexity. State the intended outcome, baseline, and behavior and contracts that must remain intact.

Explain choices from exact source references; current code alone does not settle ambiguous intent. Ask the user before dependent design work on a material unresolved product/domain/contract choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for reconciliation and escalation; continue independent analysis. Routine mechanics preserving the agreed outcome can follow supported APIs and project conventions.

## Evaluate the interface

Preserve the project's domain vocabulary and concrete code names. Use these distinctions when they help:

- A **module** has an implementation and an effective **interface**: everything callers must know, including invariants, ordering, errors, configuration, and performance. This extends beyond a type signature or TypeScript `interface`.
- **Depth** means useful capability behind a small interface. Assess **leverage** for callers and **locality** of change, bugs, and verification; implementation line counts do not measure depth.
- A **seam** is where behavior can be varied without editing that location. An **adapter** supplies behavior at a seam; implementation size does not determine whether something is an adapter. Internal seams can remain private even when tests use them. Distinguish test seams from domain bounded contexts.

Assess what callers must understand and coordinate, rather than optimizing method or parameter counts. Preserve the established contract unless its change is explicitly in scope. For detailed terminology and examples, read [CONCEPTS.md](CONCEPTS.md).

## Apply the design criteria

- Assess depth through useful capability, caller knowledge and locality of change. Internal composition and several justified entry points can support a clear effective interface; implementation size is not the goal.
- Apply the deletion test as a counterfactual: which responsibilities disappear, and which move to callers? Preserve boundaries that own policy, authorization, compatibility or lifecycle even when their code is short.
- Prefer behavior-level checks for the contract under discussion while retaining distinct integration and other verification goals. A changed test is a prompt to inspect the reason, not automatic evidence of a misplaced boundary.
- Introduce a port or adapter when actual variation, policy isolation, compatibility or ownership justifies the boundary and its cost. Adapter counts do not establish that need; do not manufacture a test adapter to justify an abstraction or add a port merely because a dependency is remote.
- Consider injected dependencies when callers need meaningful substitution or explicit policy. Respect existing framework construction, factories and lifecycle ownership. Returning calculation results can simplify callers, while mutations and external effects may be the operation's responsibility; keep those effects explicit rather than rewriting them by default.

These are design criteria within the requested scope, not permission to change application code or tests. Test creation, changes, deletion, and execution require the user's explicit authorization.

## Make the result reviewable

Scale the output to the question. For a concrete proposal, identify affected files and callers, source-backed constraints, the existing design and smallest useful change, and where caller complexity would actually decrease. Explain ownership and contract effects, migration cost, risks, preserved functionality/frontend structure where relevant, and verification evidence or gaps. Distinguish proposed benefits from measured results; a sketch does not establish implemented behavior. Recommend a design with reasons without treating an unresolved choice as approved.

For delegated work, use an available [planner](/Users/joostwaaijer/.codex/agents/planner.toml) for technical alternatives, [domain-modeler](/Users/joostwaaijer/.codex/agents/domain-modeler.toml) for substantive domain semantics, and [reviewer](/Users/joostwaaijer/.codex/agents/reviewer.toml) for independent design assessment when needed. Use [regression-reviewer](/Users/joostwaaijer/.codex/agents/regression-reviewer.toml) to assess implemented changes against their baseline and preservation constraints when applicable. Honor assigned scope, independence and any prohibition on further delegation; the full agent-team workflow is not a prerequisite. Profile loading for alternative exploration is described in DESIGN-IT-TWICE.md.

## Choose deeper guidance

- To scan a codebase or subsystem for evidenced architectural friction and prioritize improvement candidates: [ARCHITECTURE-SCAN.md](ARCHITECTURE-SCAN.md). This is an analysis route, not an automatic refactoring workflow.
- For consolidating a module cluster, dependency categories, adapter strategy, and test boundaries: [DEEPENING.md](DEEPENING.md).
- When the user wants alternative interfaces for a chosen candidate: [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md), including its scope and delegation conditions.
