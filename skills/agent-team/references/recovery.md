# Recovery and resumption

Recovery preserves useful work and the task's existing authority. A retry is not permission to reset a checkout, discard changes, restart shared services, or broaden scope. Block a failed package and its dependents while unaffected authorized work continues; avoid making one local failure a global scheduling barrier.

## Recovery bounds

Defaults are one recovery retry per failed package and two correction cycles after the initial review, unless the task explicitly sets different bounds. They limit repeated unsuccessful attempts with the same approach; they are not automatic stopping points for the whole assignment.

At a bound, inspect the remaining failure and evidence before repeating work. When new evidence or a materially different feasible approach supports progress, continue within the original scope and authority. Record the changed approach and why it can resolve the failure, preserve the cumulative attempt history, and apply a finite recovery bound to that approach. Renaming a package, replacing its worker, or repeating a rejected fix does not reset the bound.

If no supported alternative remains, report the affected package's blocker or partial result and continue unaffected work. A required user decision, missing authority, unresolved external dependency, or exhausted explicit task budget remains a stopping condition for the affected work; an alternative cannot bypass it. Open review findings stay open until resolved or explicitly deferred by the user.

| Situation | Action |
| --- | --- |
| A worker fails or stalls | Inspect its status and partial artifacts, stop conflicting work, and resume or retry within the recovery bound. Record what was retained. At the bound, assess a supported alternative before reporting a blocker. |
| Context is lost | Reconstruct from the plan, accepted handoffs, current artifact and evidence records. Refresh changed facts; do not restart completed work from recollection. |
| Two workers touch the same surface | Assign one owner, preserve both contributions, add a dependency, and integrate sequentially. Review the combined result. |
| A contract or base changed | Identify affected packages; revalidate their assumptions and artifacts against the new contract before using the result. |
| Review requests changes | Return actionable evidence-backed findings to the owner within the correction bound. At the bound, assess a supported alternative; if none remains, return the best current artifact with open objections and material verification gaps. |
| Evidence is stale | Repeat only the checks whose relevant content, inputs, environment, or outcome can have changed. Preserve still-applicable evidence. |
| A required action lacks authority | Finish independent work, prepare the concrete reviewable result, then identify the exact action and missing authorization. Do not ask again for authority already granted. |
| Infrastructure blocks verification | Continue permitted checks that can run independently. Report affected acceptance cases. Request approval for a shared-service interruption only when actually necessary and not already authorized. |
| A task reports local completion before merge | Keep its delivery dimensions separate. Await a real merge trigger; do not launch its dependent step on an assumption. |

When escalating, name the affected package or step, what remains usable, the evidence, the missing dependency or decision, and the next owner. Update state once for the meaningful change. Do not add recurring polling, self-spawn continuations, or unrelated cleanup.
