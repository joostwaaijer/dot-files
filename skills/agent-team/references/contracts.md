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
| `repositories` | Give each repository a unique `id` and its checkout `root`. For a writer, include the inspected `branch` or `worktree`, `base` Git commit ID and `local_changes` (clean, or relevant existing changes to preserve). Resolve any abbreviated base unambiguously in the checkout. |
| `authorization` | Match each restricted action to a grant for the named package and repository as described below. Each `reference` points to the user's actual authority. |
| `contracts_existing` | Existing contract identifiers and their authoritative references in the brief. |
| `independent_review` | Boolean, default true; every writing package then needs a dependent review package with a different owner. Disable only when the task's review requirements permit it, and report the review gap. |
| `packages` | Unique `id`, `owner`, `kind`, `repository`, `writes`, `depends_on`, `produces`, `consumes`, `actions`, `criteria`, `skills`, and optional `reviews`. |
| `kind` | `decide`, `analyze`, `implement`, `write`, or `review`. Only `implement` and `write` declare writes. |
| `writes` | Repository-relative exact files or directory prefixes ending `/`. `.` owns the whole repository. No globs, parent traversal, or absolute paths. Document sections are not isolated files: serialize shared-document editing. |
| `criteria` | Unique criterion references allocated to one package; existing requirement/criterion IDs remain canonical. A reviewer references the reviewed criteria through `reviews`, not duplicated criterion entries. |
| `produces`, `consumes` | A consumer transitively depends on each new contract's producer; pre-existing contracts are declared separately. |
| `reviews` | Existing packages owned by other agents. The reviewer waits transitively for every target. Use optional `review_snapshots` to bind individual targets to immutable input. |
| `actions` | Request each action with the scope below. Read-only packages (`decide`, `analyze`, `review`) may declare `read`, explicitly authorized `run_tests` and a scoped `message_chat` to report their outcome. Pure delivery can use the existing bounded action brief under [agent-profiles.md](agent-profiles.md). |

### Scope each action

Use a single `authorization.read` source reference when the user's instruction covers all reads in the plan. For narrower read authority and for every other requested action, place grants in `authorization.<action>` with `package`, `repository` and `reference`. A reviewer's `read` request covers its own repository and every review target's repository. With scoped read authority, each distinct repository needs a grant naming that reviewer.

Include the qualifying field below in both the grant and the package action. The checker matches the values literally. Split multiple test families or destinations into individual requests and grants.

| Action | Entry in the package's `actions` |
| --- | --- |
| `read`, `edit`, `commit` | The action name as a string. A writer needs `edit` for its declared paths. |
| `write_tests`, `run_tests` | An object such as `{"action":"run_tests","test_family":"public-view API suite"}`. Test edits also require an `edit` grant. |
| `push`, `publish_pr`, `merge`, `deploy`, `message_chat`, `external_message` | An object such as `{"action":"push","destination":"origin/feature/example"}`. Identify the authorized remote and ref, PR/base, environment, chat or recipient as applicable. |

The example grants the backend worker one named suite and the reviewer one chat destination. Inspect the original source for any narrower conditions before acting. To reuse an older plan, copy it for the new run and replace each used plan-wide restricted reference with matching scoped grants derived from the original instruction. Fill in the qualifiers the old plan omitted. An unused historical reference grants nothing. If the source leaves a requested action unresolved, leave that action out or obtain the missing authority before scheduling it.

### Keep review input stable

By default a review uses each target's live files. For every writer whose declared paths intersect that target in its repository, order the writer before the target or after the review. This applies even when the writer has already finished between the target and the review. For example, if A and B change the same file and A precedes B, use A → review of A → B for a live review of A.

To schedule B independently of that review, record `review_snapshots.A` on the reviewer. Use `{"revision":"<full Git commit ID>"}` for an existing committed result, or `{"base":"<full Git commit ID>","artifact":"<saved patch or bundle path>","sha256":"<64 hex digits>"}` for local changes. Preserve all relevant files, including untracked content. The target identifies the repository. At handoff, verify that the snapshot contains the target's output and matches its digest when supplied. The reviewer reads the preserved input. If the output does not exist yet, plan a live review with ordering, or bind the completed output and recheck the plan before releasing the overlapping writer.

Record a shared edit surface under one repository ID. The checker compares declared paths case-insensitively. The coordinator verifies checkout identity, symlinks, actual changes, snapshot contents, and any additional inputs read during review. The printed waves preview scheduling. [parallelism.md](parallelism.md) governs execution.

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
