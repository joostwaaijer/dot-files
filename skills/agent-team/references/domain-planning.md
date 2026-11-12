# Domain and data modeling before delivery

Assess domain/data semantics during initialization. Read the existing model first and use the available `domain-modeling` skill for substantive terminology and modeling work. Respect its glossary/decision conventions and the repository's existing documentation paths.

## Build from actual behavior and requirements

Trace actor journeys, wireframe/design data needs, issues and current code into:

- Canonical terms and their distinctions; reference the owning glossary.
- Actors, roles, organization/tenant boundaries and access ownership.
- Entities, identities, value objects, relationships, cardinality and optionality.
- Invariants, permitted actions, validation ownership and derived values.
- Relevant lifecycle/state transitions, historical records and deletion/retention decisions where specified.
- Producer/consumer boundaries, external integrations, import/export contracts and ownership.

Use concrete scenarios to expose ambiguous terms and relationships. Resolve what the code or accepted sources can answer; ask for a material product/policy choice when different answers change correctness or scope. Do not invent a retention period, permission matrix, collaboration rule, billing engine or tenant boundary because a screen needs data.

## Separate the model's levels

| Level | Owns | Qualification |
| --- | --- | --- |
| Domain glossary/model | Meaning, ownership, rules and relationships. | Confirmed decisions versus proposals remain explicit. |
| Logical data/API model | Fields, identities, constraints, relationships and consumer contracts. | Derived from the domain and actual source requirements. |
| Physical schema and rollout | Concrete tables/types/indexes, migrations, backfill and deployment sequencing. | Include only when needed for this planning scope; implementation is a later authorized action. |

Use [domain-model.md](../templates/domain-model.md) when a new model document is needed. A small content project may need only a lightweight model assessment; explain why an elaborate schema is unnecessary rather than fabricating one. When backend data is central, derive a concrete proposed logical schema and API/frontend field contract sufficient for subsequent slices. Anchor naming to existing canonical backend attributes/columns where they already exist.

For an existing Addsoft-style database model, check its source version, confirmed decisions, proposed schema, unresolved choices and current implementation before extending it. See [addsoft.md](addsoft.md) for the inspected example. Reuse the authoritative file instead of generating another model with different names.

## Text first, diagrams as supporting artifacts

The textual model is the agent entrypoint: definitions, fields, relationships, constraints, behavior, evidence and open decisions. An ERD or context diagram can support it when relationship complexity warrants one. Keep any diagram tied to the same model revision; do not make a rendered image the only specification. Follow the appropriate diagram tool/skill if generation is actually requested or needed.

Document proposed design as proposed. A detailed ERD is not evidence that tables exist, that business rules are approved, or that migrations ran. Likewise, a current schema documents implemented storage, not necessarily intended future behavior.

## Feed the roadmap and later tasks

Every data-bearing UI flow should map to the owning concept, API/data contract, access rule and model coverage or an explicit gap. A frontend mock uses the agreed contract shape without claiming backend behavior exists. Backend implementation owns business rules; consumers do not recreate them.

Put material unresolved model decisions ahead of the steps that depend on them. Name any required schema preparation, migrations, data conversion and rollout dependencies in the roadmap without executing them during initialization. Carry relevant model and glossary references into task and specialist handoffs.

Revisit the model when evidence or requirements change. Preserve adopted decisions and explain the effect on affected contracts and steps instead of redesigning it on every task.
