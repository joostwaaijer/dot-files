# Glossary Format

Use the repository's existing glossary paths and format first. This is a lightweight default when glossary writing is within scope; it does not authorize creating or editing files.

## Structure

```md
# {Context Name}

{One or two sentences describing the context and its scope.}

## Language

**Order**:
{One or two sentences defining the agreed meaning in this context.}

**Invoice**:
A request for payment sent to a customer after delivery.
```

Use examples only when their definitions match accepted project sources. Add an `_Avoid_` line only for wording that is agreed to be misleading in this context; do not assume other domain words are interchangeable or globally forbidden.

## Definitions

- Keep definitions short and focused on domain meaning. Include a distinction or boundary when necessary to distinguish concepts.
- Include concepts relevant to the project's domain, even if other domains also use them. General programming concepts belong elsewhere unless they have a specific domain meaning here.
- Preserve context-specific meanings and accepted terminology. Ground changes in source context; label unsettled alternatives outside the agreed glossary.
- Group terms under subheadings when that improves readability. A flat list is sufficient for a small glossary.
- Keep schemas, API field mappings, workflows and implementation decisions in the owning model, specification or decision record. A glossary term does not rename canonical backend fields.

## Contexts and documentation paths

Inspect existing models, glossaries, ownership and current usage before selecting a location. `CONTEXT.md` and `CONTEXT-MAP.md` are conventions, not evidence of domain boundaries. A missing map or a single root file does not establish a single context; folders do not automatically define separate contexts.

For a confirmed single context without existing conventions, a root `CONTEXT.md` can suffice. When multiple contexts are established and a map is useful, keep it short and link their authoritative documentation. For example:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — agreed ordering terminology
- [Billing](./src/billing/CONTEXT.md) — agreed billing terminology

## Relationships

{Source-backed ownership and dependencies between these contexts.}
```

Paths are illustrative. Describe actual relationships without inferring events, shared types or transport choices from this layout. Ask only when an unresolved boundary materially affects the work. Create or extend documentation lazily within the authorized scope rather than generating a new context hierarchy.
