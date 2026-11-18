# Adaptive routing and readiness

Choose the engineering questions before assigning agents. This adapts L-GEVITY's separation between method, orchestration, and runtime to the user's installed skills and authorization model. Apply the action-to-profile mapping in [agent-profiles.md](agent-profiles.md) after selecting the capability; it owns profile selection and context loading.

Respect explicit user choices about delegation and review. Scaling the analysis does not cancel a requested execution mode.

A requested project `init` is a broad discovery task: use [discovery.md](discovery.md) before selecting implementation work. A request to author a roadmap uses [roadmap-authoring.md](roadmap-authoring.md). Existing research can satisfy those inputs; do not repeat it solely to fill a template.

## Scale the method

| Analysis | When | Result |
| --- | --- | --- |
| Local | A bounded change preserves ownership and public contracts. | Existing conventions and the necessary checks; no architecture ceremony. |
| Focused | The request asks one question about feasibility, design, complexity, review, or a bottleneck. | Answer that question with evidence. |
| Adaptive | The work changes responsibilities, contracts, persisted data, or several dependent components. | Only the questions below that can change the implementation decision. |
| Full | The user explicitly requests a broad assessment. | Assess all relevant questions and explain material exclusions. This does not authorize implementation. |

For adaptive work, consider these questions in dependency order:

1. **Grounding:** What user outcome, source requirement, and complete-when condition are authoritative? Recover missing meaning without rewriting it to fit a preferred design.
2. **Value and scope:** What is the smallest useful outcome? Does added functionality justify its complexity?
3. **Readiness:** Which prerequisites, decisions, permissions, and acceptance conditions exist? Resolve cheap lookups now; preserve genuine product or policy gaps.
4. **Architecture and ownership:** Where do authoritative behavior and data belong? Reuse supported APIs and existing contracts before adding layers.
5. **Locality and complexity:** Can the change stay within its owner? Does a proposed abstraction reduce evidenced complexity rather than duplicate state or validation?
6. **Enforcement and verification:** Which existing check can detect the relevant failure earliest? A proposed test strategy does not authorize test work.
7. **Delivery and measurement:** What is needed for publication, merge, rollout, and acceptance? Optimize only against an actual baseline or known bottleneck.

`READY` means the bounded work can start. `PARTLY_READY` means independent work can proceed while a named prerequisite remains unresolved. `NOT_READY` blocks dependent work. None means implemented or verified. Apply [decisions.md](decisions.md): an unresolved choice about the outcome or contract needs user input or project-manager escalation, while implementation mechanics preserving the established outcome can follow supported code/API conventions.

## Compose capabilities from available skills

Discover relevant skills from the current catalog; do not assume L-GEVITY's entire library is installed. Load only the selected skill bodies, and pass their actual paths to specialists.

| Capability | Suitable existing guidance when available | Output |
| --- | --- | --- |
| Functional requirements | Project sources, specifications and discovery guidance | Source-backed journeys and acceptance criteria; unresolved choices and preserved behavior. |
| Domain and data semantics | Domain modeling, current glossary/model and producer/consumer evidence | Canonical terms, rules, relationships and data/API semantics. |
| Architecture and slicing | Codebase design, framework and roadmap guidance | Technical ownership, dependencies and the smallest coherent sequence from accepted requirements/contracts. |
| Exploration | Code search, diagnostics, primary documentation | Verified paths, APIs, constraints, and unresolved facts. |
| Engineering | Matching stack and component skills | A bounded artifact within the assigned write set. |
| Research and drafting | Research, source connectors, document or presentation skills | Evidence report or cited draft. |
| Verification | Relevant review skill and permitted checks | Independent findings and criterion-level evidence. |
| Functionality and frontend preservation | Regression-reviewer or an independent reviewer explicitly assigned preservation, with the exact baseline, agreed scope and affected consumers | Concrete unintended differences or a separate preservation conclusion with verification limits. |
| Delivery | Repository-specific PR workflow | Reviewable local work or an authorized publication result. |

A capability is a responsibility for this task. One profile may support several capabilities, and multiple independent owners may use the same profile. Keep an agent's reused context suitable for its role and retain reviewer independence under agent-profiles.md. Add specialized security, accessibility, infrastructure, or scientific review only when requested, required by the project, or justified by a concrete risk.

## Plan the schedule

Use [parallelism.md](parallelism.md) for readiness, write ownership, scheduling, and independent review. A cross-repository feature may belong in one task chat so its producer/consumer contract has one owner. Splitting by repository alone can create incompatible interfaces.

Parallel packages inside a step follow the scheduling rules above. Starting separate roadmap steps together requires an explicit user instruction and independent ownership, contracts, merge and rollout paths. For automatic progression to another task chat, apply the [current step's merge rule](roadmap.md#receive-reports-and-advance).

Report the chosen route, work packages, owners, dependencies, and verification limits concisely when they materially affect the work. Do not force a fixed report format or every gate onto a routine task.
