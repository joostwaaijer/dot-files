---
name: resolving-merge-conflicts
description: Resolve conflicts in an in-progress Git merge or rebase while preserving the intended changes.
---

# Resolving Merge Conflicts

## Record the operation and local work

Confirm the repository/worktree, active merge or rebase, involved commit IDs and current conflict paths using Git's actual operation state. For a rebase, identify the onto/replayed state and stopped commit. Record staged, unstaged and relevant untracked changes as found, distinguishing automatically merged content, existing manual resolutions and unrelated local work. Do not assume a clean starting tree or that every staged change belongs to this task. Preserve the selected checkout and earlier work; do not recreate conflict markers over manual resolutions or abort/reset/clean/restart the operation without authorization.

## Establish both intents

Read relevant history, PRs, issues, specifications, designs/wireframes and accepted decisions. Compare the common-base and both side versions where present, using the unmerged index stages rather than only marker text. A missing stage can be part of an add/delete conflict. Map `ours`/`theirs` to actual revisions: during rebase, `ours` is the onto/replayed state and `theirs` is the change being replayed. Never choose a side globally based on its label or concatenate both sides mechanically.

Resolve only the requested conflicts and necessary integration work. Preserve both intents where compatible, including deliberate removal; use the stated goal and established contract where they conflict. Ask the user before dependent resolution of a material unresolved behavior/contract choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized resolutions without inventing behavior.

## Match the resolution to the artifact

- For text/code conflicts, preserve the coherent behavior of both changes, including imports, signatures and affected callers.
- For rename/delete, add/add, binary or file-mode conflicts, establish the intended resulting paths/content and references; removing text markers alone cannot resolve them. Treat a deletion as an intentional resolution only when supported by the agreed intent.
- For lockfiles and generated/configuration artifacts, follow the owning tool's existing version and workflow. Regenerate only what is needed within actual authority, without unrequested dependency upgrades or broad generated churn. Preserve migration history and project-specific generation/application boundaries; resolving a file does not authorize running migrations or applying configuration.

## Check integration behavior

Inspect the resulting diff and relevant automatically merged paths/callers, not just former conflict blocks. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for affected contracts, retaining both intended changes and unrelated behavior. Correct resolution-induced issues within scope; no markers or unmerged entries does not establish semantic correctness.

Run relevant permitted formatting, lint or static checks. Writing, modifying, deleting or running tests requires explicit user authorization for the objective; inspect combined commands so non-test checks do not run tests implicitly. Reuse applicable authorization and deferrals without asking again. Report actual checks and runtime gaps rather than treating syntax/build success as proof of preservation.

## Stage and continue within authority

Stage only files resolved for this operation. Inspect complete file contents and staged changes, including mixed unrelated edits, before staging; never stage unrelated work or discard it to simplify resolution. If it cannot be separated within scope, report the specific boundary. Preserve earlier operation-owned staged content, including Git's automatic merge results, rather than unstaging everything.

Before any authorized completion step, inspect the complete staged result and remaining unmerged entries. Commit, finish the merge, or continue a rebase only when the user's request authorizes that history-changing step; continuing a rebase can create commits. Otherwise leave resolutions ready for review and state the exact remaining step. Do not skip commits, change the rebase plan or abort as a workaround without authorization. Never push without explicit authorization; finishing locally does not grant it. Keep Git mutations sequential and follow applicable repository rules.

After each authorized continuation or interruption, reread Git's actual state before acting again. A rebase may stop at another conflict; apply the same scoped process under existing authorization without repeated approval, unless a new material choice or action boundary requires input. Do not repeat a successful commit/continuation or claim the operation finished based only on the preceding command.

## Report the actual result

Distinguish resolved paths, remaining conflicts, staged/review-ready resolutions, and an actually completed merge/rebase. Include material resolution choices, performed checks/limits, resulting revision when applicable and the exact pending operation or authorization. Read back state before claiming completion; an index free of conflicts can still belong to an unfinished operation.
