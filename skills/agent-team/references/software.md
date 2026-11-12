# Software development

Use this route for implementing or investigating code, designing changes, or reviewing an existing diff. Preserve whether the request is implementation, planning, investigation, or review-only; a team does not expand that scope.

## Establish ownership

Before repository edits, confirm the repository, selected branch/worktree, applicable instructions, and existing local changes. Preserve user-authored work. Reuse an authorized suitable checkout; use separate worktrees only when concurrent work actually requires them and the workflow permits it.

Before implementing substantial custom interaction or infrastructure, inspect relevant existing components, installed packages, prior research, and explicitly selected reference implementations. Check supported APIs and behavior differences against the task's contracts before choosing reuse or custom code. Keep this proportional; routine changes do not need a package audit.

Map the affected contracts and their owning layer before dividing implementation. Delegate independent components with disjoint write ownership. Sequence producer/consumer changes when their interface is unsettled. Keep shared manifests, lockfiles, migrations, public contracts, and integration edits under one owner.

## Schedule ready work

Use [parallelism.md](parallelism.md) to start independent exploration or implementation packages together and refill capacity when a package finishes. Start a consumer only after its required contract and inputs are accepted; it need not wait for unrelated packages. Give specialists accepted findings and exact paths so they inspect their affected inputs instead of repeating full-project exploration. Keep small indivisible changes direct.

An independent reviewer may inspect a completed package while unrelated implementation continues, using that package's current snapshot and criteria. Serialize any resulting edits with the package owner. Retain final review of the integrated diff for interactions, shared contracts and evidence invalidated by integration; reuse still-applicable review evidence rather than restarting every review from scratch.

## Useful specialist briefs

| Role | Task | Expected evidence |
| --- | --- | --- |
| Explorer | Trace the affected behavior and existing conventions without editing. | Exact files/symbols, owning layer, supported APIs, edge cases and unresolved choices. |
| Implementer | Complete one bounded behavior within assigned files and agreed contracts. | Changed behavior, files, checks performed, integration requirements and remaining gaps. |
| Reviewer | Independently inspect the combined current artifact against requirements and repository standards. | Concrete correctness or regression findings, locations, impact, and material verification limits. |

Use existing relevant project skills when they apply. Avoid imposing a new architecture or specialist workflow on a routine change. For a review-only request, use independent review angles where useful and consolidate duplicate findings; do not add an implementation stage.

For code review, include [joost-code-style-review](/Users/joostwaaijer/.codex/skills/joost-code-style-review/SKILL.md) as an additional lens alongside the existing requirements, correctness, and repository-standards review. Pass its absolute path and relevant profile branch in a distinct personal-supplement brief; do not only rerank the general bug candidates as personal style. Reuse the existing code investigation. An existing reviewer may do the pass separately, or an independent reviewer may handle it when worthwhile; no extra agent is required for every change. Keep preference-only suggestions separate and non-blocking; preserve explicit output schemas and existing verification/publication boundaries. This does not require an extra reviewer or apply a coding profile to non-code deliverables.

## Verification and integration

Carry the exact verification authorization in every handoff. If test work is not authorized, use permitted inspection, linting, formatting, static analysis, or builds as relevant, and report the material test gap. Ask for test authorization only when a required next step depends on it. A build or syntax check is not runtime acceptance.

Within the authorized verification scope, choose integration checks from concrete risks and exercise representative flows through the actual configured boundary when acceptance depends on it. Such risks can include request limits, cancellation and lifecycle timing, identity across refreshed results, private-file delivery, or narrow layouts. Package tests and coverage percentages alone do not establish those behaviors.

Review the actual combined working diff, including overlapping assumptions, contract compatibility, and preservation of existing changes. Have one owner resolve integration conflicts; do not overwrite another worker's changes. Broaden checks only for an applicable project requirement or a concrete remaining risk.

Before publication, complete the authorized local work and checks so the artifact is concrete and reviewable. Follow existing commit, push, PR, merge, and deployment boundaries. When reporting PR status, verify its live state; a merge is not deployment.
