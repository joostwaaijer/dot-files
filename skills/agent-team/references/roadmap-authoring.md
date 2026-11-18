# Authoring a roadmap from project research

Derive the roadmap from the project/context entrypoint, canonical requirements and source coverage, current implementation, and relevant domain/data contracts. If these inputs are materially missing, use [discovery.md](discovery.md) to establish them. Reuse trustworthy existing research instead of repeating it.

## Find coherent increments

Group work by observable user or operational outcome, not solely by screen, technical layer, repository or permanent agent role. Prefer small end-to-end slices. A contract/model decision or shared foundation may need a preceding step when real consumers depend on it; avoid building speculative infrastructure before a concrete outcome needs it.

Distinguish work that is already implemented with evidence, partly implemented, planned, explicitly deferred or outside scope. Map every in-scope requirement to one owning delivery step and any supporting prerequisites. Preserve tracker IDs; do not duplicate the same feature as separate wireframe, Figma and issue tasks.

Where uncertainty could invalidate later work, first inspect the relevant source context. If it leaves a product, design, model or contract choice unresolved, follow [decisions.md](decisions.md): ask the user for input or their choice to raise a decision issue with the project manager, and block the dependent steps. For a technical feasibility unknown within an established outcome, plan the smallest useful investigation with an observable question and stopping condition. A prototype or investigation does not settle an unsupported product choice or authorize application implementation.

## Describe each step

Use [roadmap.md](../templates/roadmap.md) or the project's existing equivalent. Each independently assignable step needs:

- A stable step ID, concrete outcome and requirement/source references.
- Scope, exclusions and observable acceptance criteria, retaining their authoritative owner.
- Affected repositories/owners and relevant wireframe/design/model/API references.
- Prerequisite steps and contracts, with any required merge or producer rollout order.
- Required verification evidence, with authorization recorded separately from the desired check.
- Current readiness and concrete blockers or unresolved decisions.
- A completion/handoff expectation and any exceptional delivery constraint.

Estimates, milestone dates and priority scores are optional. Use existing priorities and actual capacity/deadline inputs; label rough estimates and avoid fabricated precision. Do not invent arbitrary numbers of steps or mandatory phases simply to fill a roadmap template.

## Order by dependency and risk

Model the dependency graph and remove cycles or identify the decision needed to resolve them. Contract producers precede consumers. Identify independent steps by their outcomes, contracts, write ownership, merge and rollout paths. Only an explicit user instruction to start such steps together permits concurrent task chats. For automatic progression, apply the current step's merge rule in [roadmap coordination](roadmap.md#receive-reports-and-advance). Share one task owner across tightly coupled repositories when that keeps the contract coherent.

Readiness is evaluated per step, not as a single global approval:

- `READY`: enough source-backed scope and acceptance, settled required decisions, and satisfied prerequisites for the planned next action. Record execution authority separately and check it before acting.
- `PARTLY_READY`: bounded independent work is possible while named dependent work is blocked.
- `NOT_READY`: a missing source, unresolved product/model decision or dependency prevents the planned next action. A separate authorization gap can still prevent executing technically ready work.

A blocked later step need not stop a ready independent first slice. A proposed roadmap is a planning artifact; its sequence does not itself authorize implementation, publication or new chats. If the user has already authorized execution, act within that authority without demanding an additional generic roadmap approval.

## Check traceability and hand off

Review source capability → requirement → model/contract → roadmap step → acceptance evidence in both directions. Flag uncovered flows, role/state variants, unsupported added work, duplicate slices, implicit prerequisites and inconsistent field names. Record any deliberately excluded capability and its rationale/source; do not silently drop it.

Name the first useful ready step, blocked decisions, and the current planning/verification limits. To begin agreed execution, follow [roadmap coordination](roadmap.md) and the clean [step handoff](../templates/step-handoff.md). A step reads the initialization/model entrypoints and relevant sources before edits, so planning context survives a clean chat.

Creating or synchronizing Trello/GitHub issues is a separate outward action. Prepare concrete proposed issue content and mappings when requested; publish or alter tracker records only with the applicable user authority. Keep the roadmap as an execution view of canonical requirements rather than a second tracker with independently drifting issue status.
