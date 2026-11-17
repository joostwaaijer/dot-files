# Agent profiles and task context

Select the profile for each work package or substantive direct action before execution. This table owns profile selection; scheduling and independent-review rules remain in [parallelism.md](parallelism.md). Profiles specialize how work is done, without widening its authority or requiring another agent for every tool call.

Every profile follows [decisions.md](decisions.md). Researcher gathers source evidence; functional-analyst derives requirements; domain-modeler clarifies semantics and contracts; planner sequences accepted work and handles technical architecture; implementer executes agreed changes; delivery-specialist handles authorized publication and rollout; reviewer and regression-reviewer assess their assigned criteria independently. The coordinator asks the user to resolve an unclear choice or choose a decision issue for the project manager. Neither a profile's expertise nor its personal preferences settle a missing project decision.

## Select by the action's outcome

| Action | Profile | Context to supply |
| --- | --- | --- |
| Source discovery, code/API tracing, diagnosis, or acceptance-evidence collection | [researcher](/Users/joostwaaijer/.codex/agents/researcher.toml) | Exact question, project/source boundaries, relevant paths and revisions, and evidence needed for the next decision. |
| Source reconciliation into functional requirements, journey/state coverage, acceptance criteria, or unresolved product choices | [functional-analyst](/Users/joostwaaijer/.codex/agents/functional-analyst.toml) | Exact wireframe/design/issue references, accepted decisions, source findings, existing requirements, and intended versus preserved behavior. |
| Domain terminology, relationships, ownership, invariants, lifecycle, or logical data/API semantics | [domain-modeler](/Users/joostwaaijer/.codex/agents/domain-modeler.toml) | Existing model/glossary/schema, accepted functional requirements, current producers/consumers, and unresolved semantics. |
| Technical architecture, roadmap authoring, dependency scheduling, readiness, or recovery replanning | [planner](/Users/joostwaaijer/.codex/agents/planner.toml) | Accepted requirements and model/contracts, technical evidence, settled decisions, dependencies, and permissions. |
| Product implementation, fixes, final document/artifact production, or permitted verification execution | [implementer](/Users/joostwaaijer/.codex/agents/implementer.toml) | Accepted outcome and contracts, source material, owned checkout/artifact, exact write set, relevant skills, and verification authorization. |
| Delivery-state/CI lookup, release preparation, or authorized tracker/commit/push/PR/merge/deployment and outward delivery messages | [delivery-specialist](/Users/joostwaaijer/.codex/agents/delivery-specialist.toml) | Accepted artifact snapshot, review findings, exact-head CI, repository/PR rules, dependency/environment context, and authorization per outward action. |
| Independent correctness, requirements, standards, personal-style, source-support, or integrated acceptance review | [reviewer](/Users/joostwaaijer/.codex/agents/reviewer.toml) | Original criteria and stable artifact snapshot, current source/contract references, relevant review skills, and verification limits. |
| Unintended functionality or frontend-structure changes, including backend effects on existing frontend consumers | [regression-reviewer](/Users/joostwaaijer/.codex/agents/regression-reviewer.toml) | Exact baseline and current artifact, source-backed intentional changes, preserved behavior/structure, affected producer/consumer paths, and verification limits. |

Select by the requested result, not just the tool or file type. An evidence note belongs to researcher, a requirements register to functional-analyst, a domain model to domain-modeler, and a roadmap to planner. Producing another requested final report or document belongs to implementer; independently assessing it belongs to reviewer. Researcher gathers acceptance evidence; the assigned reviewer evaluates whether it supports the criteria. Use implementer for explicitly authorized test execution, never to infer test authorization from a request to verify.

For the plan format, select `analyze`, `decide`, `implement`, `write`, or `review` from the package's actual actions and write ownership, then select the profile from its outcome above. Several profiles can analyze or write, and a read-only delivery-status check can use delivery-specialist. Pure delivery actions can use a bounded action brief tied to the accepted software artifact; do not invent file writes to fit a checker package. A profile does not alter the plan's action/permission rules. A package's profile, author, and owner are different facts: several independent owners may share one profile; a reviewer must still be a different agent from the author.

## Preserve functionality and frontend structure

Include a targeted regression-reviewer pass when software work promises unchanged behavior, changes existing frontend structures or contracts, or changes backend behavior whose existing frontend consumers could be affected. Pin the baseline, intentional changes and preserved surfaces before review; a backend-only filename set does not establish that the frontend is unaffected.

This is a preservation check within the agreed scope, not a visual-design or UX approval stage. Use the standalone [preservation comparison](../../../agents/references/behavior-preservation.md) for the comparison and evidence method. An independent pass must not be performed by the artifact's author; it can cover its assigned criteria without forcing another worker for every lens. Retain other required correctness, requirements, standards and personal-style scopes. Test work still needs explicit user authorization.

## Apply profiles across skill routes

- **Init / refresh:** researcher collects affected source facts; functional-analyst reconciles functional scope and acceptance; domain-modeler handles substantive model questions; planner derives or adjusts the roadmap from those accepted inputs. Reviewer assesses material coverage claims. Skip satisfied or irrelevant stages.
- **Roadmap authoring:** planner owns the plan; use researcher for missing facts, functional-analyst for unclear requirements, domain-modeler for semantic prerequisites, and reviewer for required independent review.
- **Team / roadmap execution:** assign each ready package from the table. Agreed requirements and domain/API semantics precede dependent implementation. Route general and preservation review by their criteria; route publication and rollout to delivery-specialist within existing authority.
- **Resume / audit:** researcher refreshes source facts and delivery-specialist refreshes delivery state. Route changed requirements to functional-analyst, changed model semantics to domain-modeler, replanning to planner, corrections to implementer, and review to the relevant independent reviewer. An audit-only request stays read-only.
- **Direct:** the coordinator applies the selected profile's instructions locally for the bounded action. Do not create agents merely to cover every profile.

The coordinator retains scheduling, user decisions, handoff acceptance, reporting, and next-chat authority; delivery-specialist does not launch the next step. Apply the selected specialist locally to the coordinator's substantive action when delegation is unnecessary. Routine tool reads and progress updates stay within the current action; they need no profile switch or separate worker. A task chat's coordinating agent applies the same routing inside its step rather than receiving one profile for its entire lifetime.

## Load the actual profile

Profiles are personal standalone TOML definitions in `/Users/joostwaaijer/.codex/agents/`. Their `developer_instructions` are the authoritative role-specific context and personalization. Global and repository `AGENTS.md`, current task decisions, and relevant installed skills supply shared and project-specific guidance. Leave model and reasoning settings inherited unless an applicable instruction requests an override.

Inspect the currently exposed native delegation schema before spawning. When it supports selecting a custom agent by name or type, select the exact profile name through that supported field. Supply the task brief separately; the task name alone does not load a profile. A client may need a new session to discover newly installed definitions; do not restart the user's session automatically.

When native delegation cannot select a stored profile, read its TOML and include its `developer_instructions` explicitly in the specialist's task instructions, followed by the task brief. Pass its path as provenance as well. Label this `inline` application rather than claiming native profile loading. A path or role label alone is insufficient. Do not invent tool arguments or launch extra Codex processes, SDK agents, or user-owned chats as a workaround.

For direct work, read and apply the selected profile locally and label its application `direct`. If delegation itself is unavailable, retain direct execution where possible and disclose any missing independent review.

## Bound each agent's context

Use fresh minimal task context for self-contained work and independent review, using the runtime's supported control such as `fork_turns: "none"` when present. Include applicable instructions and standing authorization even without inherited conversation history. Give a reviewer original requirements and source artifacts without seeding its conclusions with the author's proposed answer.

Use [work-package.md](../templates/work-package.md) to identify the profile name/path, application mode (`native`, `inline`, or `direct`), relevant skills and context references, exact outcome, current artifact basis, and authorization. Record these with the owner in persistent run state when state is needed. Native profile application and correct routing are not validated by `check_plan.py`; inspect the actual assignment.

Reuse an agent only while its profile, role, scope and context remain suitable. A changed role or unrelated project normally needs fresh context; an author cannot become its own independent reviewer. Reuse relevant accepted evidence without handing every role all source transcripts, skills, or personal review branches.

These profiles provide durable instructions and task-specific context, not separate automatic memory stores. Keep project knowledge in its canonical documents and pass relevant references. Preserve the user's existing memory controls; creating profiles does not authorize memory updates or a new persona-specific knowledge base.
