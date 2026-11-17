# Architecture Scan

Use when the user asks to assess architecture or find useful improvement candidates in a codebase or subsystem. Apply the source-backed design criteria in [SKILL.md](SKILL.md). The result may recommend retaining the existing design; a scan need not produce refactors.

## Bound and inspect the area

Start with the user's named scope, pain point and preservation constraints. Read the relevant requirements, accepted decisions, glossary/model and architecture documentation at their existing locations. Establish the inspected repository, revision and relevant local changes. Identify actual producers, callers and supported framework/library capabilities before judging a boundary.

If no direction was named, use recent commit history and recurring changes to identify promising areas, then inspect their actual callers. Frequent edits suggest investigation; they do not prove poor design. Explain the inspected scope and material exclusions rather than claiming an exhaustive audit from a small sample.

Look for evidenced friction such as repeated caller knowledge, error-prone ordering, unclear policy ownership, tightly coupled changes spread across modules, or a boundary that exposes most of its implementation. Read relevant existing tests and check configuration where they clarify intended guarantees. A short wrapper, multiple entry points or missing test coverage alone is not a design defect.

Use native delegation only when it is authorized and useful; otherwise scan locally. The full agent-team workflow, a separate agent and a new chat are not prerequisites.

## Compare candidates with the baseline

Trace each candidate to exact files, symbols and representative callers. Explain the current coordination burden with a concrete example, including less-common consumers where they affect the contract. Apply the deletion test: would removing a boundary reduce complexity or move its policy and responsibilities to callers?

Compare retaining the current design and the smallest useful correction before proposing consolidation, a new interface or an adapter. Account for framework-owned behavior that can already solve the problem. Favor improvements that reduce actual caller knowledge and make changes more local, with ownership and compatibility intact.

Respect accepted architecture decisions. Surface a conflicting option only when new evidence makes revisiting the decision worthwhile; name the conflict and its practical consequence. Preserve canonical fields, API contracts, authorization and lifecycle ownership, and existing functionality/frontend structure outside intentional changes. A diagram, naming preference or hypothetical second implementation does not justify a new boundary.

## Return prioritized proposals

Lead with the strongest supported opportunities. For each useful candidate, include:

- The source locations and concrete friction or failure opportunity.
- A proportionate description of the smallest useful change and what caller knowledge it removes, retains or moves.
- Expected benefits, compatibility and migration costs, risks, and evidence strength. Separate measured facts from proposed improvements.
- Relevant verification goals, existing coverage and material gaps, keeping desired checks separate from authorization.

Use concise prose or a comparison table by default. Add a small diagram when relationships are easier to understand visually; create an HTML report only when requested or materially useful within the output scope. There is no required report format, vocabulary ban or candidate count. Mark weak leads as investigations rather than presenting speculative designs as ready implementation proposals.

Recommend what to tackle first, including doing nothing when the benefit does not justify the cost. For a selected candidate needing alternative interfaces, use [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md); for substantive domain uncertainty use the domain-modeling skill. Ask only about material unresolved choices. Do not require an interview or a new approval round for work already authorized.

A scan alone does not authorize application or documentation edits, test work, tracker writes, commits or publication. Keep proposals reviewable and continue only the independently authorized work. Do not treat a report as evidence of runtime preservation or silently update the glossary/ADRs.

Adapted from Matt Pocock's `improve-codebase-architecture`; see [provenance](../upstream-sources.json) and [MIT license](../upstream-licenses/mattpocock.txt).
