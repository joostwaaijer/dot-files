# Design It Twice

When the user wants alternative interfaces for a concrete design problem, compare meaningfully different approaches. This adapts "Design It Twice" (Ousterhout) to the current sources, callers and authorization. Retaining the existing design is a valid outcome; exploring alternatives does not authorize implementation or test work.

Uses the vocabulary in [SKILL.md](SKILL.md) — **module**, **interface**, **seam**, **adapter**, **leverage**.

## Process

### 1. Frame the problem space

Before comparing alternatives, inspect the actual callers and describe the problem proportionally:

- The current interface and concrete caller complexity, with exact file/symbol and source references.
- The requirements, accepted decisions, intended changes and preserved contracts/behavior; distinguish proposals and unresolved choices.
- The relevant dependency ownership and existing supported APIs; use [DEEPENING.md](DEEPENING.md) where that analysis affects the design.
- The baseline for comparison: the existing solution and the smallest useful change. Use an actual caller example when helpful; any illustrative sketch is not a selected solution.

Explain the grounded problem, then continue when the needed constraints are established; do not insert a generic planning approval round. If a required product/domain/contract choice is unclear, follow SKILL.md and ask for user input before dependent design work proceeds. Independent source investigation may continue while that decision is pending.

### 2. Develop comparable alternatives

When delegation is available and permitted, use subagents only for useful independent alternatives, bounded by actual slots and task limits. Otherwise compare locally. An assigned specialist must not start another team when further delegation is prohibited. Do not manufacture variants to meet a quota or create an agent solely to describe the existing design.

Give every designer the same source-backed outcome, constraints, relevant artifact revision, existing interface and actual callers, dependency/API evidence, domain vocabulary, preserved behavior and authorization. Use the project's existing glossary location rather than requiring a file named CONTEXT.md. Fresh minimal context can support independent proposals; do not seed a preferred answer or omit accepted decisions from a technical brief.

Different emphases can explore caller simplicity, low migration cost, or an evidenced responsibility/variation boundary. All alternatives must satisfy the same required contracts and account for relevant less-common callers and error cases. Do not impose entry-point quotas, ports and adapters, or a particular construction style as the desired answer.

Use the available planner profile for technical alternatives and domain-modeler for substantive domain questions as linked in [SKILL.md](SKILL.md). Select a named profile through the exposed native delegation field when supported; otherwise include its `developer_instructions` explicitly with the task brief. A name/path alone does not load it. If a profile is unavailable, apply the same method locally and report the limitation; do not require the full agent-team workflow or launch extra agent processes as a workaround.

Each sub-agent outputs:

1. Proposed interface and ownership, including required invariants, ordering, error behavior and configuration.
2. A concrete before/after caller example and the knowledge or coordination it removes, retains or moves.
3. Responsibilities hidden internally, dependencies reused or changed, and evidence for any new boundary.
4. Source-backed intentional contract changes, preserved functionality/frontend structure where affected, and migration/compatibility/rollout implications.
5. Trade-offs, risks, uncertainties and meaningful verification goals within the actual authorization. Do not report proposed benefits or checks as measured results.

### 3. Present and compare

Use the same criteria for each alternative and the existing/smallest-change baselines: **depth** as actual caller benefit, **locality** and ownership, contract compatibility, migration cost, failure behavior and verification limits. Choose a concise comparison format appropriate to the task; fewer methods or more abstraction are not winning scores by themselves.

Recommend the option best supported by the evidence, including retaining the current design when appropriate, and explain the practical trade-off. Propose a hybrid only when its combined contract is coherent and its benefit is demonstrated. Keep recommendations distinct from accepted decisions; a strong preference does not settle an unresolved requirement.

When independent assessment is needed, give a reviewer the original sources, constraints and alternatives; it must not have authored its target. Use regression-reviewer for actual implemented changes whose functionality/frontend preservation needs assessment against a baseline. Do not claim that reviewing a design sketch establishes runtime preservation. Reuse applicable review evidence and return actionable gaps without silently implementing or changing tests.
