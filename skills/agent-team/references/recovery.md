# Recovery and resumption

Recovery preserves useful work and the task's existing authority. A retry is not permission to reset a checkout, discard changes, restart shared services, or broaden scope. Block a failed package and its dependents while unaffected authorized work continues; avoid making one local failure a global scheduling barrier.

| Situation | Action |
| --- | --- |
| A worker fails or stalls | Inspect its status and partial artifacts, stop conflicting work, and resume or retry once within the same scope. Record what was retained. At the retry limit, report the blocker. |
| Context is lost | Reconstruct from the plan, accepted handoffs, current artifact and evidence records. Refresh changed facts; do not restart completed work from recollection. |
| Two workers touch the same surface | Assign one owner, preserve both contributions, add a dependency, and integrate sequentially. Review the combined result. |
| A contract or base changed | Identify affected packages; revalidate their assumptions and artifacts against the new contract before using the result. |
| Review requests changes | Return actionable evidence-backed findings to the owner. Allow two correction cycles after the initial review by default; at the bound, return the best current artifact with open objections. |
| Evidence is stale | Repeat only the checks whose relevant content, inputs, environment, or outcome can have changed. Preserve still-applicable evidence. |
| A required action lacks authority | Finish independent work, prepare the concrete reviewable result, then identify the exact action and missing authorization. Do not ask again for authority already granted. |
| Infrastructure blocks verification | Continue permitted checks that can run independently. Report affected acceptance cases. Request approval for a shared-service interruption only when actually necessary and not already authorized. |
| A task reports local completion before merge | Keep its delivery dimensions separate. Await a real merge trigger; do not launch its dependent step on an assumption. |

When escalating, name the affected package or step, what remains usable, the evidence, the missing dependency or decision, and the next owner. Update state once for the meaningful change. Do not add recurring polling, self-spawn continuations, or unrelated cleanup.
