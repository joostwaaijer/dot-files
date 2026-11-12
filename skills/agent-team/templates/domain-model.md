# Domain and data model

Status: current implementation | proposed design | adopted design, qualified per section
Scope, source basis and inspected code/schema revision:
Canonical glossary reference:

## Domain concepts and ownership

| Concept/identity | Meaning reference | Owning context/tenant | Allowed actors/actions | Source and decision status |
| --- | --- | --- | --- | --- |

## Relationships and rules

| Relationship or invariant | Cardinality/optionality or condition | Owning validation/behavior | Lifecycle/history implications | Source or open decision |
| --- | --- | --- | --- | --- |

## Logical data and consumer contracts

| Entity/resource | Canonical field | Meaning/type/nullability | Constraint or derived source | Producer/consumer | Confirmed or proposed |
| --- | --- | --- | --- | --- | --- |

Include concrete schema proposals when backend planning needs them. Distinguish stored fields from computed values and existing implementation from intended design. Link any physical schema detail instead of maintaining conflicting copies.

## Journey-to-model coverage

| Requirement/journey | Data, relationship and rule needed | Model/API coverage | Gap or unresolved decision |
| --- | --- | --- | --- |

## Lifecycle, integration and rollout

- Relevant state transitions and history:
- Specified imports/exports, external identifiers and integration ownership:
- Specified deletion/retention/access-revocation behavior and unresolved policy:
- Required schema preparation, backfill and producer/consumer rollout dependencies:
- Supporting ERD/context diagram reference and model revision, when useful:

## Open decisions and implementation impact

| Decision | Evidence/options | Affected contracts and roadmap steps | Owner and next action |
| --- | --- | --- | --- |

This document does not itself implement schema, execute migrations or authorize application work.
