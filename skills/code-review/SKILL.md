---
name: code-review
description: Review a branch, PR, or working diff against repository standards and the originating requirements, reporting evidence-backed findings separately for each.
---

Two-axis review of the requested diff:

- **Standards** — does the code conform to this repo's documented coding standards?
- **Spec** — does the code faithfully implement the originating requirements and respect established behavioral contracts? Distinguish requirements coverage from demonstrated correctness or regression findings.

Use **parallel sub-agents** for independent review scopes when available and permitted; otherwise review locally and disclose any missing independence. An assigned specialist reviews only its package and does not start another team when further delegation is prohibited. Validate findings against the pinned artifact before reporting them. Reviews are read-only unless edits or external comments were explicitly requested; writing, modifying, or running tests requires explicit user authorization.

Use existing issue-tracker guidance when present. Otherwise use the supplied issue/PR or the repository's configured remote and available tools. Missing optional setup documentation is not a reason to stop or scaffold configuration.

## Process

### 1. Pin the fixed point

Use the user's explicit comparison. For a PR, verify its current head and base; for uncommitted work, include the requested staged, unstaged, and relevant untracked files. Infer a branch comparison from an identified PR when available. Ask only if materially different comparisons remain plausible.

Resolve the comparison to full commit IDs before reviewing or delegating. For a branch review use `git diff <base-sha>...<head-sha>` and `git log <base-sha>..<head-sha> --oneline`; record the merge-base used by the diff. For changes since an exact commit use the requested commit comparison with resolved IDs. Keep these IDs fixed rather than rerunning against moving branch names or `HEAD`.

For uncommitted work, capture the requested working-tree/index diff, base HEAD, relevant paths and content digests, including in-scope untracked files. Give specialists the captured evidence and require affected content to match before inspecting it. A committed comparison excludes local changes. Do not stage, stash, commit, or alter the checkout to freeze a review; use read-only records or an already-authorized output location.

Report an empty captured scope as no changes to review; investigate an invalid ref before dispatching agents. Before reporting, check whether the relevant PR revisions or local content changed. Reassess only invalidated findings and affected paths against a refreshed snapshot, or clearly report the older reviewed snapshot and remaining gap; do not present stale evidence as a review of the latest artifact.

### 2. Identify the spec source

Start with the user's requested outcome, supplied source links/paths, and accepted decisions. Inspect relevant issues and discussions, specifications, wireframes/designs and their states; preserve exact source references and distinguish desired behavior from current implementation.

Use commit/PR issue references (`#123`, `Closes #45`, GitLab `!67`, etc.) and matching documents under established project locations as discovery leads when context is missing. They do not override explicit current user decisions or establish authority merely by matching a branch name. Use `docs/agents/issue-tracker.md` only when the project actually provides it; otherwise follow its existing tracker guidance and available tools.

Ground each requirements finding in exact inspected sources. Ask the user before judging behavior that depends on a material unresolved choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent review without treating proposals as selected.

If requirements are missing or incomplete, report which coverage cannot be assessed and continue Standards and concrete correctness/regression review. Do not invent requirements, infer intended product behavior from existing code alone, or equate missing evidence with a defect.

### 3. Identify the standards sources

Anything in the repo that documents how code should be written, such as `CODING_STANDARDS.md` or `CONTRIBUTING.md`.

On top of whatever the repo documents, the Standards axis always carries the **smell baseline** below — a fixed set of Fowler code smells (_Refactoring_, ch.3) that applies even when a repo documents nothing. Two rules bind it:

- **The repo overrides.** A documented repo standard always wins; where it endorses something the baseline would flag, suppress the smell.
- **Always a judgement call.** Each smell is a labelled heuristic ("possible Feature Envy"), never a hard violation — and, like any standard here, skip anything tooling already enforces.

Use these heuristics where relevant to the changed code:

- Mysterious Name, Duplicated Code, Feature Envy, Data Clumps.
- Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change.
- Speculative Generality, Message Chains, Middle Man, Refused Bequest.

For an uncertain definition or illustrative adjustment, consult [REVIEW-REFERENCE.md](REVIEW-REFERENCE.md#smell-definitions). A matching name alone never establishes a finding or justifies a refactor.

### 4. Review each axis

Use the available [reviewer](/Users/joostwaaijer/.codex/agents/reviewer.toml) profile for Standards, source-backed Spec, correctness, and personal-style review. Use [regression-reviewer](/Users/joostwaaijer/.codex/agents/regression-reviewer.toml) for the targeted preservation pass below. Select the named profile through the exposed native delegation field when supported. Otherwise include its `developer_instructions` explicitly in the task brief; a profile name/path alone does not load it. If a profile is unavailable, retain the same scoped review method and report the limitation. This does not require loading the full agent-team workflow.

Use fresh minimal context for independent review, supplying the original requirements, pinned artifact, applicable rules, selected profile, assigned axes and authorization. Do not seed conclusions with the author's proposed answer. A reviewer must not have authored its target; local self-inspection is useful but must not be called independent review. Avoid duplicate investigations, and respect the parent's delegation and ownership limits.

Give each subagent the pinned snapshot, requested output schema, and read-only/test restrictions above. **Standards sub-agent prompt** — include:

- The immutable comparison or captured local diff, content basis, and commit list.
- The standards sources and the compact smell baseline with its guards from step 3. Include the absolute path to REVIEW-REFERENCE.md when a heuristic needs clarification.
- The brief: "Report supported material findings per file/hunk: (a) documented-standard violations, citing the rule; and (b) smell heuristics with concrete impact, citing the code. Distinguish hard violations from judgment calls. Repository standards override the heuristic baseline. Skip anything tooling enforces. Be concise while preserving the evidence needed to assess each finding."

**Spec sub-agent prompt** — include:

- The same pinned comparison and commit list.
- The inspected requirements, wireframe/design/issue references, accepted decisions, and explicit source gaps.
- The brief: "Report: (a) missing or partial requirements; (b) unrequested behavior; (c) incorrect implementations of requirements. Cite the source and code for each supported material finding. Separate unresolved source choices from demonstrated defects. Be concise without omitting findings to meet a word quota."

If no requirements can be assessed, omit the requirements-coverage package, mark that coverage not assessed, and retain the correctness and preservation work below.

### Correctness and preservation

Inspect changed execution paths and their affected producers/consumers for concrete failures, including when requirements are absent. Ground a finding in a demonstrable language/framework/API contract, existing consumer expectation, or accepted preservation constraint. Inspect the applicable installed APIs before judging their behavior. Focus on failures reached by the change; do not expand into an unrelated whole-project audit or infer an intended new feature.

Include a targeted preservation pass for promised unchanged behavior, existing frontend structure/contract changes or backend changes reaching existing frontend consumers. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for the baseline, affected-contract method and evidence limits. When delegation is permitted, assign the regression-reviewer profile or reuse a suitable independent package; otherwise compare locally and disclose missing independence. This grants no test/publication authority and requires no full agent-team workflow.

Coordinate preservation review with any existing applicable review package instead of duplicating it or spawning a worker for every lens. Keep other required correctness, requirements, Standards and personal-style scopes covered. Report concrete correctness/regression findings under Spec with their basis labeled as an established contract or preservation constraint; do not present them as proof of complete requirements coverage. Deduplicate a regression found in both passes.

### Personal code style supplement

Alongside these axes, apply [joost-code-style-review](/Users/joostwaaijer/.codex/skills/joost-code-style-review/SKILL.md) to code reviews in this personal environment. Give the reviewer its absolute path, the pinned diff, applicable profile branch, and the existing read-only/test restrictions. Give the personal supplement its own candidate pass and brief rather than only tagging leftovers from the general bug scan. It may reuse the correctness investigation; an existing reviewer can perform the distinct pass, or an independent reviewer can handle it when worthwhile. A separate agent is optional. If the profile is unavailable, report that limit and continue the existing review.

Keep personal-style suggestions separate from Standards and Spec findings, non-blocking unless an independent current requirement establishes otherwise. Deduplicate against material findings. Preserve an explicitly requested output schema; omit preference-only suggestions when it cannot represent them.

### 5. Aggregate

The user's explicit output schema governs the whole report. Do not add unsupported fields, mandatory sections, or a summary that violates it. Preserve Standards, Spec and personal-style classification internally and through fields the schema actually supports. In a bugs-only format, omit preference-only and heuristic-only suggestions rather than converting them into defects.

Check each candidate against its cited source or established contract, pinned code path, triggering conditions and practical impact. Drop unsupported claims and avoid prescribing abstractions solely because a smell heuristic matches. When free-form output is permitted, present separate `Standards` and `Spec` sections, actionable findings by severity within each, and a separate personal-style section when applicable. Label documented-standard violations versus smell heuristics, and requirements findings versus correctness/regressions based on established contracts. A heuristic or personal preference alone does not establish a blocking defect.

State the reviewed snapshot, what each axis covered, and material limits. Distinguish assessed coverage with no findings, partially assessed coverage, and not-assessed requirements. Missing sources, unresolved decisions, unavailable checks and tests not run remain explicit gaps; zero findings or a passing build does not prove complete acceptance or runtime preservation.

When the format allows it, end with a one-line summary: finding totals per axis, its material coverage limits, and the worst supported issue within each axis, if any. Do not pick a single winner across axes. Report personal-style suggestions separately; they do not change either axis's result. Do not label unassessed coverage as passed.

Keep the axes separate so passing one never masks a failure in the other. Examples are in [REVIEW-REFERENCE.md](REVIEW-REFERENCE.md#why-two-axes).
