---
name: code-review
description: Review a branch, PR, or working diff against repository standards and the originating requirements, reporting evidence-backed findings separately for each.
---

Two-axis review of the requested diff:

- **Standards** — does the code conform to this repo's documented coding standards?
- **Spec** — does the code faithfully implement the originating issue / spec?

Use **parallel sub-agents** for independent axes when available and permitted; otherwise review both locally. Validate findings against the current code before reporting them. Reviews are read-only unless edits or external comments were explicitly requested; tests require explicit authorization.

Use existing issue-tracker guidance when present. Otherwise use the supplied issue/PR or the repository's configured remote and available tools. Missing optional setup documentation is not a reason to stop or scaffold configuration.

## Process

### 1. Pin the fixed point

Use the user's explicit comparison. For a PR, verify its current head and base; for uncommitted work, include the requested staged, unstaged, and relevant untracked files. Infer a branch comparison from an identified PR when available. Ask only if materially different comparisons remain plausible.

For a branch review use `git diff <base>...HEAD` and `git log <base>..HEAD --oneline`. For changes since an exact commit use the requested commit comparison. For uncommitted work use the corresponding working-tree and index diffs; a `...HEAD` comparison excludes those changes.

Resolve the refs and capture the exact scope before delegation. Report an empty diff as no changes to review; investigate an invalid ref before dispatching agents.

### 2. Identify the spec source

Look for the originating spec, in this order:

1. Issue references in the commit messages (`#123`, `Closes #45`, GitLab `!67`, etc.) — fetch via the workflow in `docs/agents/issue-tracker.md`.
2. A path the user passed as an argument.
3. A spec file under `docs/`, `specs/`, or `.scratch/` matching the branch name or feature.
4. If no spec is available, report that limit and continue the standards/correctness review. Ask for the spec only when a material finding depends on a missing requirement; do not invent requirements.

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

Give each subagent the scope and read-only/test restrictions above. **Standards sub-agent prompt** — include:

- The full diff command and commit list.
- The standards sources and the compact smell baseline with its guards from step 3. Include the absolute path to REVIEW-REFERENCE.md when a heuristic needs clarification.
- The brief: "Report supported material findings per file/hunk: (a) documented-standard violations, citing the rule; and (b) smell heuristics with concrete impact, citing the code. Distinguish hard violations from judgment calls. Repository standards override the heuristic baseline. Skip anything tooling enforces. Be concise while preserving the evidence needed to assess each finding."

**Spec sub-agent prompt** — include:

- The diff command and commit list.
- The path or fetched contents of the spec.
- The brief: "Report: (a) missing or partial requirements; (b) unrequested behavior; (c) incorrect implementations of requirements. Cite the spec and code for each supported material finding. Be concise without omitting findings to meet a word quota."

If the spec is missing, skip the Spec sub-agent and note this in the final report.

### Personal code style supplement

Alongside these axes, apply [joost-code-style-review](/Users/joostwaaijer/.codex/skills/joost-code-style-review/SKILL.md) to code reviews in this personal environment. Give the reviewer its absolute path, the pinned diff, applicable profile branch, and the existing read-only/test restrictions. Give the personal supplement its own candidate pass and brief rather than only tagging leftovers from the general bug scan. It may reuse the correctness investigation; an existing reviewer can perform the distinct pass, or an independent reviewer can handle it when worthwhile. A separate agent is optional. If the profile is unavailable, report that limit and continue the existing review.

Keep personal-style suggestions separate from Standards and Spec findings, non-blocking unless an independent current requirement establishes otherwise. Deduplicate against material findings. Preserve an explicitly requested output schema; omit preference-only suggestions when it cannot represent them.

### 5. Aggregate

Check each candidate against its cited requirement, actual code path, and impact. Drop unsupported claims and avoid prescribing abstractions solely because a smell heuristic matches. Present actionable findings by severity within separate `Standards` and `Spec` sections; distinguish judgment calls and validation limits.

End with a one-line summary: total findings per axis, and the worst issue _within each axis_ (if any). Don't pick a single winner across axes — that's the reranking the separation exists to prevent. When the output format permits personal-style suggestions, report their count separately; they do not change either axis's result.

Keep the axes separate so passing one never masks a failure in the other. Examples are in [REVIEW-REFERENCE.md](REVIEW-REFERENCE.md#why-two-axes).
