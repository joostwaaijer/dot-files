---
name: fe-craft
description: Use for Craft CMS Twig templates, component contracts, asset integration, translations, and accessibility.
---

# Craft/Twig frontend

Load project-local rules through the [`craft_twig_rules` MCP](../../mcp/craft-twig-rules/README.md): call `find-rules` for known target paths, or `list-rules` for repository-wide work or unknown targets, before acting on them. Reuse unchanged results for already-inspected paths; look up new paths as scope grows. Apply returned rules within their scope, subject to explicit user instructions. Do not read `.ai/rules` directly.

If the MCP is unavailable, report the missing rule access and defer work that requires rules not yet retrieved. Reuse still-current retrieved rules and continue independent authorized work. Tool unavailability does not waive the lookup requirement or permit direct rule-file access. For documentation questions, the existing [search CLI](../../mcp/craft-twig-rules/bin/search-craft-docs.mjs) is a fallback only when its documentation track matches the project version.

## Versions and documentation

Before version-dependent advice or changes, establish the relevant Craft, Twig, plugin and frontend package versions from manifests, lockfiles and installed metadata where available. Distinguish declared constraints, locked versions and the target environment's installation; report discrepancies affecting the task. Do not install or upgrade packages just to discover versions.

For a concrete API question, search the matching official Craft, Twig, Yii or plugin documentation with a targeted query. Use `search-craft-docs` through the MCP, or its CLI, only when its supported documentation track covers the question and project version. Use `search-tailwind-docs` only for a separate Tailwind question covered by that tool's track. Otherwise inspect the matching official documentation directly through available search/browsing tools. When documentation spans a major release, check introduction/deprecation notes or installed source for minor-version compatibility, including prereleases where relevant. If matching documentation is unavailable, use installed source or release-tagged API definitions and state the limitation. A tool's version restriction does not restrict this skill.

Call both documentation tools only when the task genuinely spans both surfaces, and call neither when repository evidence is sufficient. Documentation establishes API support, not project conventions or product requirements.

## Source-backed scope

Ground behavior, content states, interaction and component-contract choices in exact project sources; do not invent empty, error or responsive states absent from the agreed outcome. Ask the user before dependent work on a material unresolved choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized work.

## Templates and rendering contracts

- Match the project’s template composition and asset pipeline instead of imposing a new structure. Inspect relevant component definitions and callers, including consumers of shared CSS or assets, before changing their contract. Identify intended changes and preserve unrelated HTML structure, selectors, routes, form field names and inputs/outputs. Keep canonical backend attributes and field names rather than introducing renamed copies.
- Keep component inputs and rendered states explicit; required CMS content is a contract, not fallback-copy territory. Use existing, agreed handling for genuinely optional content; surface a missing required input instead of masking it with invented text.
- Use translation APIs consistently with existing template and module code. Preserve site/language context, translation categories, keys and interpolation contracts outside the intended change.
- Preserve semantic HTML, keyboard access, focus states, and accessible names.
- Use Turbo and Stimulus only according to the project’s established endpoint and DOM contracts. Preserve target IDs, controller/action hooks and response behavior unless the agreed scope changes them; do not introduce a new transport or client-state layer by default.
- Keep business rules, authorization and persistent state in their owning server layer. Consume existing data/component contracts without duplicating validation or permissions in Twig. For affected forms, preserve native request handling, CSRF, validation, submission state and redirects unless a change is explicitly in scope.
- Check escaping for the actual output context and inspect the provenance and sanitization of values rendered with `raw`; do not add or remove escaping blindly. Keep visitor-specific, session or form state out of shared public caches and preserve existing cache variation and invalidation contracts. Query changes need evidence from actual rendering consumers; preserve filters, ordering and site scope and use the installed version's supported APIs with `be-craft` when server/query ownership is involved.

## Verification and completion

Use relevant existing linting, template checks, static analysis or asset builds and direct inspection for the changed templates and consumers. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for affected behavior/structure; a focused change does not require a full frontend audit. For design comparison, use corresponding viewport, UI state, content, locale, fonts and assets. Inspect affected semantics, keyboard/focus behavior and shared callers where relevant, and report anything not observed.

Writing, modifying, deleting or running tests, including automated browser scenarios, requires explicit user authorization. Direct non-mutating page inspection and navigation do not authorize form submission, data changes or external actions; perform those only within the task's existing authority. Reuse authorization already granted for the objective. Report what changed, what was actually verified and material gaps; static/build success does not establish correct rendered or deployed behavior.

Use related skills only for the affected concern: [`be-craft`](../be-craft/SKILL.md) for server behavior, [`hotwired-patterns-craft`](../hotwired-patterns-craft/SKILL.md) for Turbo/Stimulus contracts, [`tailwind-patterns-twig`](../../references/robuust-agents/skills/tailwind-patterns-twig/SKILL.md) for styling, [`seo-patterns-craft`](../../references/robuust-agents/skills/seo-patterns-craft/SKILL.md) for metadata/indexing, and [`gtm-patterns-craft`](../../references/robuust-agents/skills/gtm-patterns-craft/SKILL.md) for analytics. Use [`infer-craft-conventions`](../../references/robuust-agents/skills/infer-craft-conventions/SKILL.md) for requested convention discovery or recording.
