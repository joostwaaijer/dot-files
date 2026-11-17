# Project initialization and scope research

`init` investigates the full **declared project scope** and turns available evidence into reusable project context, a domain/data model where relevant, and a sequenced roadmap. It is useful both before a new build and when a project already has code or partial delivery.

Research, documentation and planning are the default scope. Do not treat initialization as permission to implement application code, run tests, mutate data/schema, publish issues, or start task chats. Preserve any execution authority explicitly included in the same request; do not add a mandatory approval round when it already exists.

## Establish the research boundary

Identify the intended outcome, product/version, relevant repositories, existing documentation, supplied Balsamiq/Figma links, Trello boards or GitHub repositories, and known domain-model sources. Use already available project context and connected sources before asking for information the agent can discover.

Ask early for a genuinely missing project identity, inaccessible required source, or conflicting product decision that changes the research scope. Continue independent research while waiting. Do not require every project to have every source type. Record an absent source as absent; it is not evidence that the corresponding functionality does not exist.

Read applicable instructions and inspect the selected checkout, branch and existing local work before writing project documentation. Follow existing documentation conventions. Keep the research bounded to the project; do not search unrelated boards, repositories or private accounts to compensate for an ambiguous project name.

## Inventory and inspect sources

Read [source-adapters.md](source-adapters.md) for the sources actually in use. Inventory relevant pages/screens, flows, issue lists and domain documents before deep inspection. Record stable links/IDs, version or update marker when available, inspection date, intended scope, and access/coverage limits in the project's source register.

When the source work is substantial and independent, explicitly delegate it through native subagents in parallel using [parallelism.md](parallelism.md). Useful boundaries are wireframes/designs, issues/backlog, code/architecture, and domain models/documentation; combine or split them by actual workload and shared inputs rather than forcing one agent per source type. Give each a source boundary, concrete evidence questions and exact return references. One owner integrates the context and roadmap.

Accept source findings as they arrive and release work whose own prerequisites are satisfied, such as analyzing a documented contract or drafting a fully evidenced capability. Keep pending sources and cross-source reconciliation visible; an early partial result does not establish complete project scope. Reuse accepted findings and inspect affected assumptions rather than repeating source research across specialists. Keep source reads within the authorized project. Read authoritative artifacts rather than treating search results, thumbnails, a ticket title, or another agent's summary as sufficient evidence.

## Build a project-wide coverage map

Inspect the following where relevant, marking each area inspected, partial, unavailable, or not applicable with its reason:

| Area | Questions to resolve |
| --- | --- |
| Product and actors | Who uses the product, to do what, under which scope, roles and permissions? |
| User journeys | Which routes/screens, transitions, input/output and role variants exist? Include specified loading, empty, error and success states. |
| Domain and data | What concepts, ownership, relationships, invariants and lifecycles support the journeys? What model already exists? |
| Existing implementation | What architecture, schema, APIs, packages and conventions currently exist? Which desired capabilities are already implemented or only proposed? |
| Integrations and operations | What external services, imports/exports, background work, storage, configuration and deployment dependencies are specified or evidenced? |
| Cross-cutting constraints | Which project requirements apply to languages, responsiveness, accessibility, security/privacy, performance and retention? Identify gaps without inventing policy. |
| Backlog and delivery | What is requested, in progress, completed, cancelled, duplicated or conflicting? What do issue states actually establish? |
| Verification and acceptance | What would demonstrate each outcome, what evidence already exists, and what checks are authorized or currently unavailable? |

Review the repository's relevant entrypoints, models/schema/migrations, contracts, configuration structure, CI/build definitions, and existing tests as read-only evidence. Target the owning paths; do not read every file merely to claim comprehensiveness. Inspect configuration without dumping credentials. A code-path observation is not an executed runtime check.

## Reconcile evidence into requirements

Use [requirements.md](../templates/requirements.md) as a shape, not a requirement to duplicate a good existing issue/specification register. Preserve stable IDs and source references; assign local requirement IDs only where none exist.

Map each meaningful journey/capability to its screens/designs, issue/card, business rule, model/API owner and observable completion criteria. Label statements as confirmed requirements, observed current behavior, proposed design, inference, conflict or open question. Separate desired functionality from current implementation. Placeholder data, an ERD proposal, or a visual control does not by itself establish business policy or authorize a feature.

Choose authority by the concern and explicit decisions, not a fixed ranking of tools or the newest timestamp. Wireframes may describe interaction, Figma may describe visual states, an issue may amend behavior, and a domain model may define data semantics. Apply [decisions.md](decisions.md) to trace each required choice to its evidence and ask for user input when the sources do not clearly resolve it; offer the project-manager issue route rather than filling a gap with an assumed solution.

## Establish the model and roadmap

Read [domain-planning.md](domain-planning.md) before planning implementation that depends on domain/data semantics. Reuse and assess the existing model before proposing extensions. Read [roadmap-authoring.md](roadmap-authoring.md) to derive coherent slices, dependencies and acceptance obligations from the research.

Keep project meaning in existing canonical artifacts. Where the project lacks suitable documentation, these are useful defaults:

- `docs/PROJECT.md`: outcome, scope, current/target baseline, source register, coverage and material decisions; see [project-context.md](../templates/project-context.md).
- `docs/REQUIREMENTS.md`: traceable requirements and gaps, when the tracker/specification does not already own them.
- `docs/DOMAIN_MODEL.md`: domain/data contracts as needed; retain an existing glossary, database model or schema document in its established location.
- `docs/ROADMAP.md`: the execution sequence and links to the owning sources and contracts.

These are optional locations, not a mandatory parallel documentation system. Reuse files such as Addsoft's `docs/CONTEXT.md` and `docs/DATABASE_MODEL.md`; do not rename them or create competing copies. If project writes are not authorized, return concrete drafts in the chat's permitted outputs and identify their intended owners.

## Close initialization honestly

Check both directions: every in-scope source capability is implemented already, assigned to a roadmap step, explicitly deferred/excluded, or linked to an unresolved decision; every proposed step has a source-backed outcome. Inspect cross-source gaps and model/API coverage, not only happy-path screen lists. For a complex discovery, an independent reviewer can inspect this coverage in fresh context within the same scope.

Report inspected sources and coverage limits, project/context locations, confirmed versus proposed model decisions, the roadmap's sequence and dependencies, ready first work and blocked work, and the next concrete action. Initialization can produce a useful draft with gaps; unavailable required evidence prevents claiming complete scope coverage. Readiness is not implementation or acceptance.

## Refresh after change

`refresh` reads the existing context and compares the relevant source versions, issues, model and implementation against its last known basis. Update only changed findings and their dependent requirements, model decisions and roadmap steps. Preserve IDs, accepted decisions and completed-work evidence; flag evidence invalidated by a real change.

Identify affected active tasks and checkout owners before changing their assumptions. Report the changed contract or scope to an existing coordinator only when messaging is authorized. Do not automatically restart tasks, reopen tickets, rebuild the roadmap from scratch, or create a periodic refresh schedule.
