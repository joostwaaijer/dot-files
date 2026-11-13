---
name: codebase-design
description: Assess module interfaces, complexity, and test boundaries during architecture design or refactoring discussions.
---

# Codebase Design

Design **deep modules**: substantial behavior behind a small interface. Use this reference when module design is the task; it does not mandate architectural changes during routine edits. Preserve established application contracts and introduce abstractions only for concrete needs.

## Evaluate the interface

Preserve the project's domain vocabulary and concrete code names. Use these distinctions when they help:

- A **module** has an implementation and an effective **interface**: everything callers must know, including invariants, ordering, errors, configuration, and performance. This extends beyond a type signature or TypeScript `interface`.
- **Depth** means useful capability behind a small interface. Assess **leverage** for callers and **locality** of change, bugs, and verification; implementation line counts do not measure depth.
- A **seam** is where behavior can be varied without editing that location. An **adapter** supplies behavior at a seam; implementation size does not determine whether something is an adapter. Internal seams can remain private even when tests use them. Distinguish test seams from domain bounded contexts.

Reduce methods, parameters, and caller-visible complexity where the existing contract permits. For detailed terminology, diagrams, or examples, read [CONCEPTS.md](CONCEPTS.md).

## Apply the design criteria

- Assess depth at the interface. Internal composition is compatible with one effective external surface.
- Apply the deletion test: if removing a module makes complexity vanish, it may be a pass-through; if complexity reappears across callers, it is hiding useful behavior.
- Keep tests at the public behavioral interface. A need to bypass it can indicate a misplaced boundary; internal refactors should preserve observable expectations.
- Introduce a port only when variation justifies it. One adapter is a hypothetical seam; two justified adapters can establish a real one. Avoid indirection for imagined future uses.
- Accept dependencies instead of constructing them internally; prefer calculations that return results, with side effects kept explicit. Keep the interface small enough to use and verify without unnecessary setup.

These are design criteria within the requested scope, not permission to change application code or tests. Test creation, changes, deletion, and execution require the user's explicit authorization.

## Choose deeper guidance

- For consolidating a module cluster, dependency categories, adapter strategy, and test boundaries: [DEEPENING.md](DEEPENING.md).
- When the user wants alternative interfaces for a chosen candidate: [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md), including its scope and delegation conditions.
