---
name: domain-modeling
description: Clarify domain terms, relationships, ownership and rules, assess their data/API implications, and record agreed models or decisions when documentation is in scope.
---

# Domain Modeling

Use this skill for substantive terminology and modeling work. Merely reading a glossary to follow the project's vocabulary does not require a modeling workflow. Scale the work to the question; a small clarification does not need a complete model, diagram or ADR.

Use existing documentation paths and formats. Reading or discussing a model does not authorize file edits. Within agreed documentation scope, capture settled terms and decisions as they are resolved without asking for permission again; otherwise propose the update. Database columns and finalized model attributes remain canonical application keys.

## Ground choices in project context

Read the relevant glossary/model, issues and discussions, specifications, wireframes/design states, accepted decisions, and current code and consumers. Use the sources present; no source type is mandatory. For consequential choices, identify the exact source locations and explain what they establish. Distinguish current implementation, accepted intended behavior, proposals and unresolved questions. Reuse settled decisions unless changed requirements or new evidence warrant revisiting them.

Code and schema establish implemented behavior; they do not settle an ambiguous product rule. A conflict with the glossary or user description may indicate stale documentation, an implementation defect or changed requirements. Report the discrepancy before proposing a correction. Resolve routine mechanics from project conventions and supported APIs when they preserve agreed meaning and contracts.

Ask the user before settling or implementing a material unresolved model/contract choice and offer direct input or a user-chosen, authorized decision issue for the project manager. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized work. Modeling does not authorize tracker writes or separate messages.

## Model the relevant semantics

Clarify only the aspects needed for the task:

- Terms, identities, relationships, cardinality and optionality.
- Ownership and access boundaries, invariants, permitted actions and validation ownership.
- Lifecycle transitions, derived values and field meaning; history, deletion or retention when the requirements address them.
- Producers, consumers and integration boundaries.

Separate domain meaning and rules from the logical data/API contract and physical storage. A relationship does not by itself prescribe a table, transport, service or frontend structure. Do not invent permissions, tenant boundaries, retention periods or business rules because a screen or schema needs a value.

Discuss concrete scenarios to expose ambiguity and contradictions. Label invented scenarios as exploratory questions, not accepted requirements or proof of behavior. A plausible edge case alone does not authorize adding functionality. Writing, modifying, deleting or running tests, including executable reproduction scenarios, requires explicit user authorization.

## Clarify terms and context boundaries

Check overloaded terms against the owning context and actual usage. Propose precise distinctions with evidence; do not automatically merge concepts or declare synonyms forbidden. A term may have different meanings in different contexts. Ask when unresolved terminology materially changes the model or contract, rather than interrupting for every wording difference.

Inspect existing documentation and ownership boundaries to determine the relevant context. Read `CONTEXT-MAP.md` if present, but verify its applicability; a root glossary or missing map does not prove a single context. Do not introduce bounded contexts merely to match folders or a documentation layout.

A clarified domain term does not authorize renaming canonical columns, model attributes or API keys. Record any necessary terminology mapping in the existing model/contract documentation; propose contract changes with their compatibility implications instead of adding alias fields by default.

## Keep documentation light

Reuse the authoritative glossary, model and decision records rather than creating competing documents. Keep a glossary focused on agreed domain definitions; put relationships, rules and contracts in the existing model/specification and implementation decisions in the appropriate decision record. Unresolved ideas stay clearly marked as proposals or open questions outside the settled glossary.

When writing a glossary without an existing format, use [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md). Create files lazily within authorized documentation scope. A root `CONTEXT.md` is a possible default for a confirmed single context, not a required layout.

Offer ADRs sparingly when preserving the rationale has durable value, following [ADR-FORMAT.md](./ADR-FORMAT.md). Reference existing decisions instead of duplicating them. A short paragraph or focused update often suffices; diagrams and new model documents are optional and need a concrete benefit.

## Trace changes and return the result

For changed semantics, trace the relevant producers and consumers. Identify intended effects and contracts to preserve: canonical fields and types, validation, access rules, responses, redirects, and frontend props/events/slots or structure where affected. Name compatibility, migration, backfill or rollout dependencies when needed. Modeling alone does not authorize product code, schema or data changes, migration execution, or publication. A diagram or proposed schema does not establish approval or implementation.

Lead with confirmed decisions and their source-backed rationale. Include proposals, material open questions, affected contracts and consumers, and any compatibility or rollout implications relevant to the task. State documentation changes and verification limits when applicable. Keep the result concise; do not force empty sections or a new roadmap.

When working through `agent-team`, give the domain modeler or coordinator the settled model references and unresolved dependencies for downstream planning. Standalone modeling does not require the full team workflow or delegation.
