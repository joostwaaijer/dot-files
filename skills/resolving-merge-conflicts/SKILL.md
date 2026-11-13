---
name: resolving-merge-conflicts
description: Resolve conflicts in an in-progress Git merge or rebase while preserving the intended changes.
---

Inspect the current merge or rebase, conflicting files, and unrelated local changes. Read the relevant history, PRs, or issues to understand each side's intent.

Resolve conflicts within the requested scope. Preserve both intents where compatible; when they conflict, use the stated goal and established contract. Ask only when the intended behavior cannot be established. Do not invent behavior or abort the operation without authorization.

Run relevant permitted formatting, lint, or static checks. Tests require an explicit request under the global test policy. Correct issues caused by the resolution within scope and review the final diff.

Stage only files resolved for this operation. Commit, finish the merge, or continue a rebase only when the user's request authorizes that history-changing step; continuing a rebase can create commits. Otherwise leave the resolutions ready for review and report the exact remaining step. Never stage unrelated work or push without explicit authorization.
