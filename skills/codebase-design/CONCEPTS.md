# Design concepts and examples

Use this reference when terminology or testability examples help resolve a concrete design question. Apply the evidence, scope and authorization boundaries in [SKILL.md](SKILL.md).

## Glossary

Use these terms to make distinctions when helpful. Preserve the project's domain vocabulary and concrete code names; a Vue component, service, API, or boundary may already be the precise term.

**Module** — anything with an interface and an implementation: a function, class, package, or tier-spanning slice.

**Interface** — everything a caller must know to use the module correctly: the type signature, but also invariants, ordering constraints, error modes, required configuration, and performance characteristics. Keep terms such as API or component contract when they are precise in the project; clarify which aspects matter instead of imposing a vocabulary change.

**Implementation** — the code and internal composition that provide a module's behavior. An adapter describes a role at a boundary, not how much implementation it contains. Use the term that clarifies the responsibility being discussed.

**Depth** — useful capability relative to what callers must understand and coordinate. A module is deep when it hides relevant complexity behind a usable contract. This is a qualitative assessment of actual callers, not a ratio of line counts or a target for implementation size.

**Seam** _(Michael Feathers)_ — a place where behavior can be varied without editing that place. It can be internal or coincide with an external interface. Its placement and the behavior supplied there are separate design decisions.

**Adapter** — a concrete thing that satisfies an interface at a seam. Describes *role* (what slot it fills), not substance (what's inside).

**Leverage** — useful capability callers gain for the knowledge and coordination the interface requires. Demonstrate it through concrete usage, rather than assuming that more callers or tests make an abstraction valuable.

**Locality** — related knowledge and changes stay with their owner instead of being repeated across consumers. A shared implementation can improve locality, but should not merge distinct responsibilities or hide compatibility and rollout work.

## Deep vs shallow

Compare the effective responsibility and the caller's work:

| Situation | Design question |
| --- | --- |
| A stable contract hides repeated coordination, invariants or error handling. | Does it make the actual callers simpler while retaining the right owner? |
| A layer forwards calls but callers still repeat the same knowledge. | Can removing or changing it reduce complexity without losing a useful boundary? |
| A short adapter owns policy, compatibility or lifecycle. | What would callers have to know or enforce if it disappeared? |

A small implementation may still provide a valuable boundary. A larger implementation or fewer entry points alone does not establish greater depth.

When designing an interface, ask:

- Which facts and ordering constraints must callers currently understand?
- Which proposed change removes that knowledge or repeated coordination?
- Which responsibilities remain with their authoritative owner?
- What benefit would justify migration rather than retaining the current design?

## Principles

- **Assess the caller's effective interface.** A module can have internal parts and seams without exposing their configuration or state to every caller. Several justified entry points or consumer-facing views can share a clear responsibility.
- **Use the deletion test with the whole contract.** Include authorization, compatibility, failure handling and lifecycle. Short forwarding code is not by itself evidence that a boundary is unnecessary.
- **Choose verification boundaries for the behavior being checked.** Public behavior is a useful default for a module's contract; integration and internal checks may protect distinct responsibilities. Inspect why a test crosses a boundary before recommending a design change.
- **Justify seams by their purpose.** Variation, policy isolation or a stable ownership boundary can establish value. Neither one nor several adapters prove that value; do not invent variants to make a count look convincing.

## Designing for testability

Consider these options against the actual contract; they do not authorize test work:

- **Dependency construction.** Supplying an existing payment client can isolate an order operation when substitution or policy requires it. Framework-managed construction, a factory or locally owned creation may already provide the right lifecycle. Compare the caller and setup cost before adding injection parameters or wrappers.
- **Calculations and effects.** Returning a calculated discount can make pure computation easier to check. Applying that discount may legitimately mutate an aggregate or persist a change; preserve that responsibility and make its effects observable. Do not turn a valid command into a calculation solely for the example's shape.
- **Surface area.** Remove unnecessary setup and caller knowledge where it helps. Required behavior, error cases and integration contracts determine verification needs; fewer methods do not automatically mean fewer necessary checks.

## Relationships

- A **Module** exposes an effective **Interface**, potentially through several entry points or views for different callers.
- **Depth** is assessed through that interface's useful capability and caller complexity.
- A **Seam** can sit at an external interface or inside an implementation; it is not automatically a domain bounded context.
- An **Adapter** sits at a **Seam** and satisfies the **Interface**.
- Useful depth can improve **Leverage** for callers and **Locality** for maintainers; show the practical effect rather than assuming it.

## Rejected framings

- Implementation size, entry-point counts and adapter counts as proof of design quality.
- Restricting the effective interface to type declarations while ignoring ordering, errors, configuration or ownership obligations.
- Treating all thin layers, local construction, side effects or changed tests as design defects without inspecting their purpose.
