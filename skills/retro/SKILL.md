---
name: retro
description: Review a coding session to identify evidence-backed improvements to the agent's instructions, checks, tools, and information access.
---

# Retro

Use when the user requests a retrospective. Explain what would improve future work, grounded in what actually happened. A retrospective does not itself authorize changes, tests, publication, messages, schedules, or memory updates. If the request also authorizes specific improvements, complete those within that scope.

## Establish the evidence

Default to the current session unless the user names another. Read the relevant conversation, tool results, diffs, review findings and instruction versions. Use connected chat tools or scoped local history when necessary; avoid searching unrelated conversations. A summary is a lead, not proof of an earlier failure. State gaps when the primary evidence is unavailable.

Separate a demonstrated agent mistake from legitimate discovery, changed requirements, a user preference, or an external failure. Trace an avoidable mistake to the information or decision available at the time. Do not treat later knowledge as something the agent should already have known.

## Find the smallest useful improvement

Inspect only categories supported by the session:

- **Navigation and source access:** Was an owning file, contract, accepted decision or log hard to find or unavailable? Prefer a focused pointer or the missing source over copied documentation or broader access.
- **Checks:** Inspect existing lint, formatting, type, build and CI configuration before proposing another check. Distinguish a missing check from an existing one that was skipped, unwired, broken or outside authorized verification. Recommend deterministic checks for mechanical mistakes when their cost is justified; a missing hook alone does not establish the cause of this session's problem.
- **Instructions and standards:** Did a rule conflict, hide an exception, invite the wrong task, or fail to change a useful decision? Use [writing-for-agents](../writing-for-agents/SKILL.md) when assessing or changing instructions. Keep durable user constraints intact; both implementation and review must follow applicable standards. Do not turn an isolated mistake into a universal prohibition.
- **Tools and context:** Did repeated lookups, oversized output, missing diagnostics or a poor handoff materially hinder the work? Compare the smallest supported alternative with the actual cost or failure; do not claim savings that were not measured.

Reuse the existing owning instructions, check setup and documentation. Identify whether a proposed change belongs in the project, personal `~/.codex` files, or a separately maintained plugin. Avoid duplicating policy across those layers or editing generated/cache copies.

## Return actionable findings

Lead with the highest-impact supported findings. For each, give the observed problem and source, its practical effect, the smallest proposed correction and owning location, and material uncertainty or verification needed. Distinguish a prevention opportunity from a proven root cause. Retaining the environment unchanged is a valid result.

Separate recommendations from changes actually made. Carry forward settled decisions and authorization; ask only about a missing choice that materially affects the requested change. Writing, modifying or running tests, including session replays or behavioral skill evaluations, requires explicit user authorization. Continue permitted inspection and static checks. Do not create a report file unless requested or already in scope.

Adapted from Matt Pocock's `retro`; see [provenance](../upstream-sources.json) and [MIT license](../upstream-licenses/mattpocock.txt).
