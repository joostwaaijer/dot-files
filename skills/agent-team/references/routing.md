# Adaptive routing and readiness

Choose the engineering questions before assigning agents. This adapts L-GEVITY's separation between method, orchestration, and runtime to the user's installed skills and authorization model.

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

`READY` means the bounded work can start. `PARTLY_READY` means independent work can proceed while a named prerequisite remains unresolved. `NOT_READY` blocks dependent work. None means implemented or verified. Do not turn every uncertain architecture choice into a user approval gate.

## Compose capabilities from available skills

Discover relevant skills from the current catalog; do not assume L-GEVITY's entire library is installed. Load only the selected skill bodies, and pass their actual paths to specialists.

| Capability | Suitable existing guidance when available | Output |
| --- | --- | --- |
| Requirements and slicing | Domain modeling, project specifications, readiness guidance | Outcome, acceptance references, dependencies, smallest coherent step. |
| Architecture | Codebase design and framework guidance | Ownership decisions and producer/consumer contracts. |
| Exploration | Code search, diagnostics, primary documentation | Verified paths, APIs, constraints, and unresolved facts. |
| Engineering | Matching stack and component skills | A bounded artifact within the assigned write set. |
| Research and drafting | Research, source connectors, document or presentation skills | Evidence report or cited draft. |
| Verification | Relevant review skill and permitted checks | Independent findings and criterion-level evidence. |
| Delivery | Repository-specific PR workflow | Reviewable local work or an authorized publication result. |

A capability is a responsibility for this task, not a permanent persona. One agent may cover several capabilities. Add specialized security, accessibility, infrastructure, or scientific review only when requested, required by the project, or justified by a concrete risk.

## Plan the schedule

- Use [parallelism.md](parallelism.md) to schedule a dependency-driven ready queue within the effective runtime limit. Start useful independent packages together, then refill freed slots as accepted results satisfy their dependents. A static wave diagram is an overview, not a barrier that makes ready work wait for unrelated packages.
- Put shared decisions and contract-producing work before consumers. Parallelize only work with no unresolved dependency and no overlapping writes.
- A cross-repository feature may belong in one task chat so its producer/consumer contract has one owner. Splitting by repository alone can create incompatible interfaces.
- Review a completed package independently while unrelated implementation continues when the review's own inputs are current and complete. Retain final integrated review for interactions and shared contracts; several independent review lenses may run together. Consolidate duplicate findings and resolve disagreements on evidence.
- Parallel roadmap steps additionally need independent merge and rollout paths. An unmerged prerequisite prevents dependent execution even when file sets do not overlap.

Pass accepted findings and exact source pointers forward. Specialists inspect their affected inputs and assumptions instead of repeating the coordinator's whole-project exploration. Keep tiny or indivisible tasks direct rather than creating agents solely to occupy slots.

Report the chosen route, work packages, owners, dependencies, and verification limits concisely when they materially affect the work. Do not force a fixed report format or every gate onto a routine task.
