---
name: hotwired-patterns-craft
description: Use when choosing or implementing Turbo Frames, Turbo Streams, and Stimulus contracts in Craft/Twig projects.
---

# Hotwired for Craft/Twig

Load project-local rules through the [`craft_twig_rules` MCP](../../mcp/craft-twig-rules/README.md): call `find-rules` for known target paths, or `list-rules` for repository-wide work or unknown targets, before acting on them. Reuse unchanged results for already-inspected paths; look up new paths as scope grows. Apply returned rules within their scope, subject to explicit user instructions. Do not read `.ai/rules` directly.

If the MCP is unavailable, report the missing rule access and defer work that requires rules not yet retrieved. Reuse still-current retrieved rules and continue independent authorized work; unavailability does not waive rule lookup or permit direct rule-file access. For Craft documentation questions, the existing [search CLI](../../mcp/craft-twig-rules/bin/search-craft-docs.mjs) is a fallback only when its documentation track matches the project version.

## Evidence and versions

Inspect the affected endpoints, templates, component callers, controller registrations and asset entrypoints. Ground behavior and contract choices in exact project sources. Ask the user before dependent work on a material unresolved choice and offer a user-chosen, authorized decision issue; use the standalone [project decision procedure](../../agents/references/project-decisions.md) for reconciliation and escalation. Continue independent authorized work.

Before version-dependent advice or changes, establish relevant Turbo, Stimulus, Craft, Twig and integration/plugin versions from manifests, lockfiles and installed metadata where available. Distinguish declared, locked and installed versions for the target environment; report discrepancies affecting the task without installing or upgrading packages just to discover versions. Search matching official documentation only for concrete API questions. Use the Craft documentation MCP/CLI only for its supported subject and version track; use official Turbo/Stimulus or other relevant documentation directly otherwise. Check introduction/deprecation notes or installed/release-tagged source when current documentation may describe features newer than the installed release, and state remaining limits. Repository evidence is sufficient for existing usage; documentation does not establish product requirements or project conventions.

## Choose the update owner

Choose the smallest contract that owns the update: full navigation, a Turbo Frame, a Turbo Stream, or client-only Stimulus. Explain the choice from the agreed outcome and existing implementation; target count alone does not determine it.

| Mechanism | Relevant concern |
| --- | --- |
| Full navigation or Turbo Drive | Page-level navigation and the agreed URL/history behavior. Preserve an existing ordinary navigation when it suffices. |
| Turbo Frame | Scoped navigation or replacement within an established frame boundary; the HTML response supplies the corresponding frame. |
| Turbo Stream | Explicit DOM actions on one or more targets. Multiple targets are a use case, not a requirement, and Streams do not require introducing Frames. |
| Stimulus | Browser-only behavior or interactions that cannot be expressed through a server-rendered Turbo response, without duplicating server-owned state or rules. |

Use the installed versions' supported native APIs and the project's existing integration. Do not add transports, fetch wrappers, client-state layers or new frame/component boundaries merely to match a preferred pattern. These options do not authorize changing established endpoint or DOM contracts.

## Request, response and DOM contracts

- Inspect both the requesting element and the endpoint response: route, method, payload/field names, request format negotiation, response content type, status, redirects, validation and authentication/error behavior. Preserve native Craft form handling, CSRF and canonical backend fields. Do not silently replace an existing HTML, JSON or redirect contract with a different response format.
- Keep frame and stream target IDs deterministic and keep server responses aligned with their requesting DOM contract. IDs must be unique in the rendered scope, including repeated components. For frame navigation, verify the expected matching frame in the response; for Streams, verify the intended action and existing targets. Select status/redirect handling from the applicable version and endpoint contract rather than copying another framework's controller example.
- Trace affected callers and compare the before/after DOM boundaries, selectors, controller/action/target hooks and component inputs. Preserve unrelated structure, behavior and accessible names. Account for the difference between replacing an element and updating its contents where that affects controllers, listeners or local state; do not introduce or remove frame wrappers without an agreed need.
- Preserve the agreed URL/query/history, back/forward, scroll/focus, keyboard, validation-error and submission-state behavior outside the intended change. Inspect existing ordinary-navigation or non-Turbo paths when they are part of the contract; do not invent a new fallback or interaction state without source context.
- Keep persistent state changes in Craft/Yii services or controllers, not in client-side coordination code. Keep authorization and business validation in their owning server layer. Do not automatically retry a mutation whose outcome is uncertain or introduce a second submit handler alongside existing submission ownership.

## Lifecycle and cache restoration

Follow existing asset/bootstrap and controller ownership. Inspect relevant first-load, partial replacement, morphing or reconnection paths where the project uses them. Stimulus controllers may connect repeatedly; initialize behavior without accumulating duplicate listeners, timers or widget instances, and clean up resources owned by the controller when its lifecycle requires it. Do not reinitialize the entire application for a local DOM update.

Where Turbo snapshots/previews or history restoration affect the change, inspect which state is restored and which behavior must reconnect. Use supported lifecycle/cache hooks only for an evidenced need. Do not blindly reset forms, discard intended input/focus, disable caching globally or add persistence to conceal a lifecycle defect. Keep Turbo's browser snapshot lifecycle distinct from Craft/shared HTTP caches; preserve server cache variation/invalidation and keep visitor-specific or session/form state out of shared public caches.

## Verification and completion

Use relevant existing linting, static/template checks, asset builds and direct non-mutating inspection. Choose flow-specific checks from initial navigation, frame/stream response and DOM result, reconnection and back/forward/cache restoration where relevant. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for baseline, affected consumers and evidence limits; pay attention to duplicate initialization/submission and focus/error behavior. Inspect combined scripts so build/lint commands do not run tests implicitly; do not expand a focused flow into a full frontend audit.

Writing, modifying, deleting or running tests, including automated browser scenarios, requires explicit user authorization. Direct page inspection/navigation does not authorize form submissions, data changes or external actions; perform those only within existing authority for the objective. Reuse applicable authorization and deferrals without asking again. Report intended changes, contracts preserved by inspection, checks actually performed and unobserved runtime cases; static/build success is not proof of a working Turbo flow or deployed behavior.

Use [`be-craft`](../be-craft/SKILL.md) for server endpoints and [`fe-craft`](../fe-craft/SKILL.md) for Twig composition. Pair with [`gtm-patterns-craft`](../../references/robuust-agents/skills/gtm-patterns-craft/SKILL.md) when navigation affects tracking, or [`seo-patterns-craft`](../../references/robuust-agents/skills/seo-patterns-craft/SKILL.md) when it affects URLs or metadata.
