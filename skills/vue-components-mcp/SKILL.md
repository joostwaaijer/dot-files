---
name: vue-components-mcp
description: Resolve @robuust-digital/vue-components APIs and CSS variables when implementing or styling UI that uses the library.
compatibility: Designed for Open AI Codex (or similar products)
metadata:
  author: rutgerbakker
  version: "1.0"
---

# Vue Components MCP

Use the `robuust-vue-components` MCP for component imports, props, events, slots, and `--rvc-*` custom properties.

For lookup- or review-only requests, return the established contract and gaps without editing product/library code. Implementation uses the task's existing authorization; this skill does not expand it.

## Targeted lookup

- For a known component, call `get_component` directly. Use `library_overview` for unfamiliar library conventions or missing catalog version/provenance, and `list_components` only when choosing a component. A version check does not require inventorying the whole library.
- For a known styling token, use `get_css_variable`; use `list_css_variables` when discovering the right token. Use `search_docs` for unresolved behavior or examples.
- Reuse results already obtained for the same library version and component contract in the session while the relevant catalog/source content remains applicable. Resolve new APIs or tokens before using them; refresh only evidence invalidated by changed versions or source content.
- Keep import paths, event names, and token names exact (`modal:close` is not `close`). Match guidance to the installed package version.
- If MCP is unavailable, omits a detail, contradicts the implementation or describes another version, inspect installed package exports, types, source, and existing usage. Missing metadata does not prove an API is unsupported. Report unresolved gaps and avoid guessing APIs; continue work whose contract is established.

## Match the catalog to the project

Establish declared, locked and installed package versions where available, and compare them with the catalog's package version and generation/source context. Report discrepancies; the MCP catalog may describe its own repository rather than the project's installation. Use matching installed or release-tagged evidence for unresolved version differences. Do not upgrade/install the package or invent version-selection tool arguments to make a lookup fit.

Use `reload_catalog` only when there is evidence that the MCP's backing docs/source changed and its catalog is stale, then repeat the affected lookup. Reloading rebuilds that catalog; it does not select an older project release or change the installed package. Do not reload for every component or treat a new generation timestamp as runtime verification.

## Resolve the actual composition

- Inspect only the contract used by the changed flow: defaults, `v-model` props/events, payloads, attribute/event forwarding, scoped-slot values and lifecycle where relevant. Examples and metadata are evidence to check, not proof that a composition works. For polymorphic or teleported components, trace the rendered element, field/button association and nested-form risks as well as slot forwarding. An `as` prop alone does not establish those behaviors; resolve each component separately.
- Ground component/variant and interaction choices in exact project sources; available APIs do not determine intended product behavior. Ask the user before dependent work on a material unresolved choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized work. Routine supported API choices preserving the agreed outcome need no new approval round.
- Distinguish incomplete documentation from a project composition error or an evidenced library defect. Resolve API uncertainty from the actual installed contract before proposing a fix. For a defect owned by the library, use [upstream-dependency-fixes](../upstream-dependency-fixes/SKILL.md), preserving its fork/upstream and authorization boundaries. Do not automatically add a page wrapper, monkeypatch, duplicate state, shared-library change or dependency upgrade to conceal an unresolved gap.

## Resolve styling at its actual scope

Read the token's exact definition, bundle and dependent custom properties, then the relevant project theme/selector context. A default referencing another variable is not a fixed final value. Prefer supported props/variants and existing semantic theme tokens before the minimal justified local override; do not invent token names or infer project styling rules from catalog defaults.

Before changing shared tokens or theme selectors, inspect affected consumers and establish that the broader effect is in scope. Preserve slice-local styling when only one component should change, and check where teleported content actually receives theme values. Preserve unrelated component structure, events/slots, labels, keyboard/focus behavior and form associations rather than replacing a working contract for appearance alone.

## Verification limits

For authorized implementation, use relevant existing type/static checks, linting/builds and direct non-mutating inspection of the affected rendered composition. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for the common before/after method and evidence limits; a small lookup does not require a full frontend audit. Inspect combined scripts so non-test checks do not run tests implicitly. Metadata, types, examples or stubs alone do not establish runtime form association, event/slot behavior or visual correctness; report resolved contracts and unobserved cases.

Writing, modifying, deleting or running tests, including automated browser scenarios, requires explicit user authorization for the objective. Direct page inspection/navigation does not authorize submissions, uploads, deletion, fixture creation or other data/external writes; use existing action-specific authority and deferrals without asking again. Dependency/library changes and publication remain within their own authorized scope.

## Related workflows and delivery

- When composing components with Inertia forms, use [inertia-patterns](../inertia-patterns/SKILL.md) for submission/error ownership and form composition. Resolve slot forwarding for each component separately before using `:as="Form"`.
- For design-reference implementation, pair with [`design-slice-inertia`](../design-slice-inertia/SKILL.md).
- For explicitly requested Vue test work, use [`vue-vitest-coverage`](../vue-vitest-coverage/SKILL.md) and preserve the real component contract in fixtures and stubs.
- Explain component or token choices when they affect the outcome. Include unusual API details or material gaps; routine changes do not need an inventory of every import, prop, and event.
