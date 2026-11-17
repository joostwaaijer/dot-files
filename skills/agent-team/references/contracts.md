# Work packages, handoffs, and evidence

Keep the contract small enough to use. Complex software Team work uses the checked plan below; smaller software runs and research or writing work use task briefs. Operational state links authoritative artifacts instead of duplicating specifications or full command logs.

## Task briefs

Use [work-package.md](../templates/work-package.md) with the applicable fields: outcome and acceptance references, owner, selected profile and application mode under [agent-profiles.md](agent-profiles.md), exact inputs and source locations, decisions, dependencies, write ownership, allowed actions with their authorization source, verification limits, review arrangements, and return expectations. Record retry/correction limits from [recovery.md](recovery.md) and any actual task budget.

For research or writing, identify the source collection, document, or output workspace directly. Repository, branch, and base fields apply only when a repository is involved. Inspect dependencies and ownership directly; do not invent repositories or run the software plan checker solely to satisfy a format. [parallelism.md](parallelism.md) still governs scheduling and independent review.

## Plan format: agent-team-plan/1

[plan.example.json](../assets/plan.example.json) illustrates the static checker input required before delegation for non-trivial multi-wave or cross-repository software Team work.

| Field | Meaning |
| --- | --- |
| `schema`, `objective` | Supported format and concrete outcome. |
| `limits` | Positive `max_parallel` and `delegation_depth` fixed at 1 under [parallelism.md](parallelism.md); nonnegative `max_retries` and `max_rework_cycles` under [recovery.md](recovery.md). Record task-specific limits; runtime limits may be lower. |
| `repositories` | Unique `id` plus actual root, branch/worktree, base revision and local-change context when relevant. The checker compares repository IDs, not aliases or physical paths; the coordinator must confirm distinct IDs are truly distinct write surfaces. |
| `authorization` | A map of allowed action names to actual user authorization references. A declaration records authority; it does not create it. |
| `contracts_existing` | Existing contract identifiers and their authoritative references in the brief. |
| `independent_review` | Boolean, default true; every writing package then needs a dependent review package with a different owner. Disable only when the task's review requirements permit it, and report the review gap. |
| `packages` | Unique `id`, `owner`, `kind`, `repository`, `writes`, `depends_on`, `produces`, `consumes`, `actions`, `criteria`, `skills`, and optional `reviews`. |
| `kind` | `decide`, `analyze`, `implement`, `write`, or `review`. Only `implement` and `write` declare writes. |
| `writes` | Repository-relative exact files or directory prefixes ending `/`. `.` owns the whole repository. No globs, parent traversal, or absolute paths. Document sections are not isolated files: serialize shared-document editing. |
| `criteria` | Unique criterion references allocated to one package; existing requirement/criterion IDs remain canonical. A reviewer references the reviewed criteria through `reviews`, not duplicated criterion entries. |
| `produces`, `consumes` | A consumer transitively depends on each new contract's producer; pre-existing contracts are declared separately. |
| `reviews` | Existing packages owned by other agents; the reviewer waits transitively for all of them. |
| `actions` | Subset of declared authorization: `read`, `edit`, `write_tests`, `run_tests`, `commit`, `push`, `publish_pr`, `merge`, `deploy`, `message_chat`, `external_message`. Test writes require both edit and write_tests authority. |

Record a shared edit surface under one repository ID. The checker conservatively compares paths case-insensitively. It does not inspect symlinks, actual diffs, Git state, tools, or external services, and does not enforce maximum concurrency at runtime. Its topological waves are a static scheduling preview; use [parallelism.md](parallelism.md) for execution.

## Handoff receipt

Use [completion-report.md](../templates/completion-report.md), or the equivalent package return, with:

- Package and owner; `DONE`, `PARTIAL`, `BLOCKED`, or `FAILED`.
- Outcome and criterion-level evidence; remaining objections or gaps.
- Exact files/sections changed and the base/current artifact revision.
- Checks actually performed, their outcomes, and relevant output locations.
- Contract decisions, dependencies, and the next owner.

Before accepting, inspect the actual artifact and changed scope, not only its summary. Check that its base, required contracts, and relevant inputs remain current. Reject out-of-scope changes and unexplained authority expansion. Revalidate stale material against the current artifact; do not silently integrate it.

## Bind evidence to the actual artifact

For committed work, record the revision and repository. For uncommitted work, record the base HEAD and a working-tree snapshot: relevant paths plus content digests or a saved patch digest. For remote documents, retain the available version/updated-at identifier and exact source location. For research, retain the inspected source URL and relevant date/version.

An evidence entry identifies the criterion, kind of check, performer, command or inspection reference, result, time, and artifact snapshot. `Not run`, blocked, failed, and unavailable remain distinct from passed. A file path or worker assertion alone does not establish runtime behavior.

Reuse passing evidence when the relevant content, inputs, and environment remain unchanged. A commit that preserves the checked content does not by itself require rerunning every check. Record why the evidence still applies; recheck when a relevant change or unresolved risk invalidates it.

## Completion and disagreement

A required criterion is `verified`, `failed`, `unverified`, or explicitly `deferred` by the user. A test outside authorization stays unverified; lack of permission does not create a waiver. Optional follow-up work need not block an otherwise complete bounded result.

Review findings include practical impact and a location or reproduction where permitted. Resolve disagreements on the owning requirement and evidence, not by vote or agent seniority. The coordinator may reject unsupported suggestions with reasons; ask the user only for a material unresolved requirement, scope, authority, or risk-acceptance decision.

The plan checker returns `VALID_PLAN` or `INVALID_PLAN` for structure only. It does not validate profile selection, context, or actual native/inline application; inspect assignments under agent-profiles.md. Readiness, review, implementation completion, merge, deployment, and acceptance remain separately evidenced decisions; there is no automatic end-to-end gate in this package.
