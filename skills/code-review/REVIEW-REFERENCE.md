# Review reference

Use this reference when a named smell needs clarification or an example of the two review axes would help. The scope, repository overrides, evidence requirements, and authorization rules in [SKILL.md](SKILL.md) govern its use.

## Smell definitions

These are inspection heuristics, not automatic refactoring recipes. Establish concrete impact in the changed code and its consumers, then consider the smallest adjustment that preserves the contract. Repository rules override the baseline. Keep a justified existing design when the proposed change adds complexity or loses behavior; a matching shape alone is not a finding or authorization to edit.

- **Mysterious Name** — a name hides meaning needed by its consumers. Consider a precise name when it removes demonstrated ambiguity. Retain canonical domain, framework and public-contract names unless a justified compatible change is in scope.
- **Duplicated Code** — repeated logic may represent one shared rule. Consider extraction when the occurrences have the same meaning and change together, and the abstraction simplifies real callers. Similar syntax can represent independent rules that should remain local.
- **Feature Envy** — behavior may be misplaced when it primarily implements another owner's rules. Inspect responsibility before suggesting a move; access counts alone do not decide ownership. Adapters, serializers and orchestration can legitimately read other objects.
- **Data Clumps** — recurring fields may form one coherent concept. Consider grouping when that concept owns useful invariants or reduces evidenced caller complexity. Preserve canonical transport/API fields and avoid a wrapper that only repackages them.
- **Primitive Obsession** — repeated handling of a scalar may conceal a domain rule. Consider a domain type when its behavior or invariants justify the interface and conversion cost. Keep native scalars when they already express the required contract simply.
- **Repeated Switches** — duplicated selection rules may drift. Consider a shared mapping or polymorphism only when actual variation and consumers justify it. A small explicit conditional or framework-required dispatch may be clearer and should be retained.
- **Shotgun Surgery** — repeated scattered changes can signal poor locality. Consider bringing one responsibility together when that reduces future changes without duplicating ownership. A coherent producer/consumer feature can legitimately touch multiple layers and files.
- **Divergent Change** — unrelated responsibilities may force one module to evolve for independent reasons. Consider separating them when the boundary makes actual changes simpler. Do not split cohesive orchestration merely because it calls several collaborators.
- **Speculative Generality** — an abstraction may serve no evidenced need. Trace its current consumers and operational constraints before suggesting removal or inlining. Retain justified compatibility, authorization, adaptation or variation boundaries; a missing spec mention alone does not prove redundancy.
- **Message Chains** — navigation can expose another module's internal structure. Consider an owning operation when it hides a real responsibility and simplifies callers. Retain supported fluent APIs and query builders; chain length alone does not show inappropriate coupling.
- **Middle Man** — delegation may add no useful contract. Inspect the wrapper's effective responsibility before suggesting direct access. Retain a boundary that owns policy, permissions, adaptation or lifecycle even when its implementation is short.
- **Refused Bequest** — inherited behavior may conflict with the subtype's actual contract. Consider composition or a narrower interface only when that conflict and the migration benefit are demonstrated. Unused inherited members or supported framework extension points alone do not establish a defect.


## Why two axes

A change can pass one axis and fail the other:

- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail.**
- Code that does exactly what the issue asked but breaks the project's conventions → **Spec pass, Standards fail.**

Reporting them separately stops one axis from masking the other.

Within Spec, distinguish source-backed requirements findings from concrete correctness/regression findings grounded in established contracts. If requirements are unavailable but a changed API response demonstrably breaks an existing consumer, report that contract failure while marking requirements coverage not assessed. Do not invent the missing product specification or describe it as passed.

Personal code-style suggestions remain a separate, non-blocking supplement unless a current requirement independently establishes the same issue. Preserve an explicitly requested output schema; the default sections and summaries are used only when that format permits them.
