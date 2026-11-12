# Sources and adaptation scope

This personal skill is an independent Codex implementation informed by L-GEVITY and the user's existing Salta orchestration. The installed scope is this skill, its references and templates, and a declarative plan checker.

## Reviewed upstream snapshot

Repository: https://github.com/l-gevity/l-gevity-skills
Reviewed commit: `c037a1b2ef44bb6d24299f6c560661ad33d970f7`
License: MIT; retained in [upstream-license.txt](upstream-license.txt).

Primary references at that snapshot:

- [README](https://github.com/l-gevity/l-gevity-skills/blob/c037a1b2ef44bb6d24299f6c560661ad33d970f7/README.md): adaptive process selection, capabilities instead of a standing role roster, evidence and delivery distinctions.
- [Alchemy router](https://github.com/l-gevity/l-gevity-skills/blob/c037a1b2ef44bb6d24299f6c560661ad33d970f7/.agents/skills/alchemy/SKILL.md): separate engineering questions from the choice of executor.
- [Orchestration](https://github.com/l-gevity/l-gevity-skills/blob/c037a1b2ef44bb6d24299f6c560661ad33d970f7/.agents/skills/alchemy-orchestrate/SKILL.md): owned work packages, contract ordering, independent review and bounded rework.
- [Contracts](https://github.com/l-gevity/l-gevity-skills/blob/c037a1b2ef44bb6d24299f6c560661ad33d970f7/.agents/skills/alchemy-orchestrate/references/contracts.md) and [governance](https://github.com/l-gevity/l-gevity-skills/blob/c037a1b2ef44bb6d24299f6c560661ad33d970f7/.agents/skills/alchemy-orchestrate/references/governance.md): handoff freshness, evidence references, decision ownership and recovery.
- [Implementation readiness](https://github.com/l-gevity/l-gevity-skills/blob/c037a1b2ef44bb6d24299f6c560661ad33d970f7/.agents/skills/implementation-readiness/SKILL.md): small coherent increments and readiness distinct from implementation and verification.

## Adaptation decisions

- Retain native Codex tool and chat contracts, current model/permissions, and the user's existing test and publication authorization boundaries.
- Select relevant skills from the actual catalog. Upstream's complete skill library, installer, custom agents, runtime adapters and checkers are not installed by this package.
- Permit reviewable uncommitted work and content-anchored evidence. A clean committed HEAD is not a prerequisite for honest local completion.
- Preserve user-authored work during recovery. Resetting or discarding work is not a default recovery operation.
- Make clean roadmap chats, completion reporting, all-required-PR merge gates, rollout dependencies and checkout ownership explicit.
- Keep meaning in its owning artifacts and state in operational records. State templates and authorization fields are records, not independent sources of truth or permission.
- Limit `check_plan.py` to declared plan structure. It cannot certify actual edits, acceptance evidence, PR state, sandbox isolation, or cost limits.

## Salta evidence

The actual coordinator chat `01a1814a-3381-7fc2-8e8e-492c61d92742` and the step-29 task `01a1a712-6679-7c70-9c33-f2bdacf050b6` were inspected on 2026-11-05. They demonstrate bounded clean task chats, exact repository/base context, scoped verification authorization, completion/blocker reports, two-repository merge/rollout dependencies, and separate local/hosted/production evidence. Current branches and delivery state must always be refreshed.

## Codex reference

[Official subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents): native delegation and inherited parent permissions. Client capabilities and tool schemas remain authoritative at execution time.

## Project initialization extension

The user requested full project-scope research before roadmap execution, using Balsamiq wireframes, Figma designs, Trello/GitHub Issues, existing code and domain models. The discovery, source-adapter, domain-planning and roadmap-authoring references implement that request. These references describe how to use available source tools; their presence does not certify any particular account connection or source coverage.

The Addsoft modeling chat `01a186b6-33fe-72e1-9374-7fd548ca76a8`, its original task preview, and the current `docs/CONTEXT.md`, `docs/DATABASE_MODEL.md` and `docs/DATABASE_ERD.md` were inspected on 2026-11-05. They establish documentation-first modeling from a selected Balsamiq version and the use of textual domain/schema contracts as later frontend/backend context. [addsoft.md](addsoft.md) retains this as a scoped example.

## Parallel execution update

On the user's request for more concurrent work, the configured personal ceiling and skill default were raised to six subagents excluding the coordinator. [parallelism.md](parallelism.md) replaces global wave barriers with dependency-driven scheduling, targeted early review and bounded slot reuse. The [official configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) documents the configuration key; current runtime limits remain authoritative and no speed benchmark is claimed.

