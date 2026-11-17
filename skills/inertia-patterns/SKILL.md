---
name: inertia-patterns
description: Implement or review Laravel + Inertia + Vue forms, validation, submission state, and page props. Use for search, edit drawers, and delete confirmations.
---

# Inertia Patterns

Give each interaction one owner for submission, validation errors, and processing state. Apply these shared conventions alongside the project's version-specific Inertia guidance; explicit user instructions and applicable repository rules take precedence.

For review-only requests, inspect and report findings without editing code or publishing comments. Implement corrections only within an authorized implementation scope; reading this skill does not widen it.

## Resolve the relevant contract

- Read the affected page/component, relevant controller response, and applicable project rules. Reuse established session evidence; do not re-audit the project or past PRs for each form.
- Ground live versus submitted search, URL/history behavior, closing after success and reset/cancel choices in exact project sources. Ask the user before dependent work on a material unresolved interaction/contract choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized work.
- Determine installed Inertia client and Laravel adapter versions from package metadata/lockfiles or Laravel Boost. Before choosing or changing Inertia behavior, read and apply the project's available `inertia-vue-development` skill or equivalent version-specific implementation guidance. Do not replace or edit Boost-generated guidance with these conventions.
- Consult relevant Boost documentation before implementation decisions about Inertia behavior, even when the API seems familiar. Reuse results already verified for the same behavior and installed version in this session; styling or copy-only changes do not require a new lookup. Prefer the `inertiajs/inertia-laravel` package filter and inspect the returned package, version, and content before using it: successful retrieval alone does not establish relevance. The `@inertiajs/vue3` filter has returned unrelated Filament and older-major documentation.
- Match documentation to the installed major and verify newer APIs against the installed version. For a v3 project, require relevant v3 results; do not impose v3 on older projects. If Boost is unavailable or returns mismatched results, use the matching official Inertia documentation or installed package source and report any material unresolved gap.

## Choose one form owner

- Prefer `<Form>` for straightforward submissions driven by named fields. Prefer `useForm` when editable values need programmatic ownership, such as switching the record in a reused drawer. Neither API is mandatory for every form.
- Read errors and processing directly from the chosen owner. Do not mirror them into local refs or synchronize them between `<Form>`, `useForm`, and page errors without a concrete integration need.
- Use the owner's submission and reset/default APIs for the required lifecycle. Keep handlers for actual behavior such as closing after success; remove handlers that only duplicate framework bookkeeping. A direct router visit remains appropriate when the interaction is navigation or has requirements the form APIs do not cover.
- For normal Laravel/Inertia validation, keep the redirect/session-error flow and display the owner's errors. Do not introduce JSON `422` parsing or a second error store for that flow. Preserve a deliberately separate API contract where one exists.
- Keep dialog visibility and selected-record identity local when needed. Those are UI state; they do not justify a second submission state machine.

For search, editable drawers, delete confirmations, or form-specific failure handling, read the relevant section of [interaction patterns](references/interaction-patterns.md). For `@robuust-digital/vue-components`, use [vue-components-mcp](../vue-components-mcp/SKILL.md) to resolve the actual component contract before composing it with Inertia.

## Page and layout state

- Render server-owned page props directly, retaining their canonical names. Derive a computed value only for a real transformation.
- For shared values used in persistent layouts, read reactive Inertia page data instead of copying it into layout refs on mount. An editable draft is a valid local copy; give it an explicit initialization/reset boundary instead of synchronizing all page props.

## Focused review before delivery or PR

Inspect the changed flow, not the entire application:

- Can one submission be traced to one owner of its errors and processing state? Check local loading/error refs, form-helper combinations, and lifecycle callbacks for duplication.
- Do submit/reset handlers, watchers, or keyed remounts implement a required behavior? Prefer the owner's lifecycle APIs where they suffice; keep a key when it represents genuine component identity.
- Does the selected component composition expose the form state to its fields and actions? Check slot forwarding, the rendered form boundary, and submit-button association.
- Are page/layout props still reactive, and are validation failure, success, and record-switch behavior consistent with the requested flow?
- Where a drawer can close or switch records during a submission, can a late result reset, close or attach errors to a different record? Assess the actual request/lifecycle behavior before adding cancellation or identity guards.
- Do search visits preserve the agreed query/history behavior and refresh all props that depend on the changed filters? Are errors and failure feedback associated with the intended form when several forms share field names?

For implementation, resolve findings within the agreed scope with the smallest change; for review-only work, report them with evidence and practical impact. These are reasoning checks, not blanket bans on refs, handlers, watchers, or keys. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for affected contracts and structure, retaining canonical backend fields and accessible form association outside the intended change.

Use relevant existing linting, type/static checks, builds and direct non-mutating inspection under applicable verification rules and deferrals. Inspect combined scripts before execution so non-test checks do not run tests implicitly. Writing, modifying, deleting or running tests, including automated browser scenarios, requires explicit user authorization for the objective. Direct page inspection/navigation does not authorize form submissions, uploads, deletion, fixture creation or other data/external writes; perform those only within existing action-specific authority. Reuse applicable authorization without asking again. Report what was actually inspected, checks performed and unobserved cases; static/build success does not establish correct lifecycle behavior. This skill does not authorize publication.

For a supplied design reference, pair with [design-slice-inertia](../design-slice-inertia/SKILL.md). Keep custom conventions in this shared skill or the project's durable custom-rule source so Boost updates do not overwrite them.
