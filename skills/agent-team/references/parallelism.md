# Dependency-driven parallel work

Use available subagents to reduce the critical path of substantive work. The default ceiling is six subagents excluding the coordinator, always bounded by the actual runtime and any explicit task budget. Launch only packages with useful independent work. Reviewer slots count toward the same limit.

When the user sets a total-spawn cap for the session, track it separately from concurrency. Count each newly created subagent once, including replacements; reusing an existing agent does not consume another spawn. Carry the cap, cumulative count, and existing agent identities forward across task phases and context recovery. The [state example](../assets/state.example.json) includes optional `agent_usage` fields for this purpose; these are coordination records, not runtime enforcement.

## Schedule a pool rather than global waves

1. Establish outcome, acceptance, shared contracts, write ownership and authorization. Keep this preflight proportional; a short self-contained brief is sufficient for ordinary independent research.
2. Identify ready packages: all required inputs and accepted prerequisite handoffs exist, the assigned owner has authority, and no active writer owns an overlapping surface.
3. Launch ready independent packages together, up to available slots. While they run, the coordinator handles integration decisions or other critical-path work rather than repeating their investigation.
4. On a completed handoff, inspect its evidence and current artifact, release or reuse its slot, and start packages that it actually unblocks. Do not wait for unrelated packages merely because the plan checker displayed them in the same preview wave.
5. Start independent review of stable completed packages while unrelated implementation continues. Final integration review checks the combined interactions and contracts, reusing still-applicable findings and checks.

Use supported subagent messages/waits for outcome-driven coordination. A runtime may cap active agents, open agent threads, or both. Do not assume a finished-but-open thread frees capacity: reuse an idle specialist for suitable follow-up work or close/release completed threads only through supported tools. A final reviewer must still be independent of the artifact's author. If no close/release tool is available, queue work and reuse appropriate owners within the exposed runtime limit.

## Typical parallel boundaries

| Work | Can overlap | Prerequisite that remains |
| --- | --- | --- |
| Project init | Balsamiq flows, Figma states, backlog, repository architecture, existing domain/docs research | Reconcile contradictions before accepting shared requirements or contracts. |
| Implementation | Independent backend, frontend or component packages with agreed interfaces and disjoint write sets | Consumers wait for unsettled producer decisions; shared files have one owner. |
| Research and writing | Source investigations plus drafting of sections whose evidence is accepted | Final claims wait for their own sources; one owner edits the final document. |
| Review | Distinct evidence-backed lenses or completed package reviews | Each reviewer waits for its own targets; integrated acceptance waits for relevant results. |

These are examples of work boundaries, not a standing roster or an instruction to create an agent for every source/tool/layer.

## Reduce coordination overhead

- Prefer fresh minimal context for self-contained specialists when supported. Give exact source paths, decisions and authority; do not copy the full coordinator history by default.
- Return concise findings, evidence pointers, changed scope and blockers. Read each relevant skill/reference once per task context, not before every package.
- Reuse accepted research and content-anchored checks. Recheck only changed assumptions, relevant content or concrete remaining risks.
- Parallelize tool reads and independently owned edits when supported. Serialize mutations of shared state/services, conflicting shared-document or schema/lockfile edits, and resource-heavy checks that contend for the same service.
- Preserve model and reasoning choices unless the user or applicable instructions authorize an override. Higher concurrency does not imply a model downgrade or reduced review quality.

## Configuration and honest limits

`agents.max_concurrent_threads_per_session` in the personal Codex configuration sets the configured subagent-thread ceiling, excluding the primary chat. Existing sessions or managed runtime limits may expose fewer slots; always honor the actual current tool limit. Do not promise that editing the file resizes a running session or guarantees a speedup.

The skill's ceiling and plan declarations are workflow bounds, not a sandbox, a spend cap, or proof that six workers ran. Record actual concurrency/usage only when observed. Do not run a synthetic benchmark or behavioral test solely to claim faster execution without the required test authorization.

Project-specific sequential roadmap agreements, all-required-PR merge gates, protected write ownership, and existing test/publication authority remain in force. Increase parallel work within those boundaries; change the boundaries only when the user actually requests it.
