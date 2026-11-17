---
name: design-slice-inertia
description: Implement a design reference as Laravel, Inertia, and Vue UI. Use for screen or component slicing from Figma, screenshots, or wireframes.
compatibility: Designed for Open AI Codex (or similar products)
metadata:
  author: rutgerbakker
  version: "2.1"
---

# Design Slice - Laravel Inertia Vue

Deliver the requested UI with the project's components, data contracts, and styling. Explicit user instructions and applicable repository rules take precedence over this workflow.

## Scope and completion

- Preserve the agreed scope across the conversation, including corrections and deferred work. Add backend/domain behavior only when requested; a create screen does not imply edit/delete flows.
- Use the supplied design as evidence for hierarchy, typography, colors, spacing, and key dimensions. Implement only the requested subset of its behavior.
- Identify exact issue/interaction, design frame/version and accepted-decision references. Visual evidence alone does not establish domain rules or permissions. Ask the user before dependent work on a material unresolved choice and offer a user-chosen, authorized decision issue; use the standalone [project decision procedure](../../agents/references/project-decisions.md) for reconciliation and escalation. Continue independent authorized work.
- Resolve the design-to-token mapping and key dimensions before implementing the affected UI. Retrieve unknown dimensions from Figma when it is the design source; do not start tokenized component styling with an unresolved token mapping.
- For substantial slices, briefly state the target UI, data contract, styling approach, and relevant checks before editing. Resolve routine implementation choices from available evidence when they preserve the agreed result; a separate preflight, plan, and approval round is unnecessary.
- Complete the implementation and authorized checks. Fix material differences in the requested visual anchors before finishing, or report the specific constraint and remaining gap.

## Context and related skills

- Inspect the target page/component, its closest existing counterpart, theme, and relevant backend resource. Determine installed Laravel/Inertia/Vue versions from project metadata or Laravel Boost; follow that version rather than imposing a newer major.
- Before implementation decisions about Laravel/Inertia behavior, consult relevant Laravel Boost documentation. For Inertia behavior, read and apply the project's available `inertia-vue-development` skill or equivalent version-specific implementation guidance. Reuse relevant documentation and skill guidance already verified in this session; styling or copy-only changes do not require a new lookup.
- For Inertia forms, validation, submission state, or page/layout props, use [inertia-patterns](../inertia-patterns/SKILL.md) for ownership choices, version-checked documentation, and review of the changed flow.
- For a Figma URL or node, use the installed Figma design-to-code skill (currently `figma:figma-design-to-code`) for design retrieval and assets. Follow its tool prerequisites. For a supplied screenshot or wireframe, inspect it directly; Figma access is unnecessary.
- For `@robuust-digital/vue-components`, use [`vue-components-mcp`](../vue-components-mcp/SKILL.md) to resolve the components and tokens being used.
- Editing a Figma file uses the installed Figma write skill (`figma:figma-use`); library creation and Code Connect mapping use their dedicated skills when those deliverables are requested. Refer to the current skill catalog rather than duplicating Figma tool sequences here.
- If a dependency is unavailable, use local code, installed package metadata, or supplied design evidence where sufficient. State material uncertainty and continue independent work; ask for missing evidence only when it blocks a correct result.

## Data and interactions

- For existing UI, establish the relevant baseline, source-backed intentional changes, and preserved routes, props, events, slots, form/submission behavior, validation/redirects and component structure before editing. Limit restructuring to what the agreed slice needs. Preserve existing labels, keyboard operation, focus behavior and form-control associations outside the agreed changes; use the established component capabilities rather than replacing them for appearance alone.
- Render required backend-provided Inertia fields directly. Keep finalized backend attribute names canonical; use local computed state only for a real transformation or interaction.
- Keep display defaults and null handling at the layer that owns them. Avoid page-level mirrors, alias-only viewmodels, or fallback chains for fields the backend contract guarantees.
- If the resource contract is missing or contradicts the design, identify the mismatch instead of inventing frontend defaults.
- For mock or exploratory slices, keep temporary data simple and static copy inline where readable. Add placeholders or empty states only when the design or requested scenario needs them.
- Reuse existing routes for standalone pages where possible; add an entrypoint only when needed. Embedded drawers, modals, and sections do not need a new route unless their behavior requires one.

## Styling

- Prefer existing shared components and resolve their APIs before custom implementation.
- Resolve styling in this order: component props/variants, shared theme tokens, standard utility classes, then a minimal local CSS override where the visual gap justifies it.
- Map design colors and component variables to semantic project tokens. Use arbitrary values only when no equivalent token or utility exists and the difference matters.
- Put reusable token overrides in project theme/vendor stylesheets under the established root selector, not in component-scoped styles. Keep one-off presentation local where appropriate.
- Before changing shared tokens or theme styles, inspect their affected consumers and confirm that a theme-wide effect is part of the agreed scope. A design for one screen alone does not establish that scope. Use a supported component variant or minimal local override for slice-only differences, following the styling order above, and include other affected consumers in the relevant preservation check when a shared change is intended.
- Match header contrast, title emphasis, control dimensions, spacing, and CTA grouping. Prefer a maintainable approximation over brittle CSS when exact parity is constrained, and disclose the visible difference.
- If an approximation would materially change the agreed visual result and the sources do not resolve the trade-off, ask for user input before applying it. Distinguish source-backed token mapping from a proposed design change.
- Reuse design-system empty and feedback components where appropriate. Add only helper UI and unfinished-control states supported by the requested design and behavior.
- Add dependencies only with explicit approval already present in the session or obtained for the specific dependency.

## Verification and delivery

- Use the smallest relevant lint, type check, or build, alongside the required visual comparison and any relevant direct interaction check. A request to slice or verify UI alone does not authorize writing, modifying, or running tests.
- Direct inspection covers observing rendered UI and non-mutating navigation needed to expose a requested state, within the task's existing authority. Automated functional/regression browser scenarios are test work even when called interaction checks and need explicit test authorization. Form submissions, uploads, deletion, fixture creation and other data writes or outward actions must also stay within their existing action-specific authorization; visual verification alone does not grant it. Reuse standing authorization rather than asking again, and report an unavailable case instead of performing an unauthorized action.
- When Vue test work is explicitly authorized for the active objective, including by an earlier request, pair with [`vue-vitest-coverage`](../vue-vitest-coverage/SKILL.md). Keep its scope tied to the requested components.
- If the user defers validation, use [`deferred-validation-development`](../../references/robuust-agents/skills/deferred-validation-development/SKILL.md). Otherwise stop checking once relevant checks pass, unless a change or concrete failure warrants another check.
- Before calling the slice complete, compare the rendered UI against the supplied reference/frame, using the Figma screenshot when applicable. Establish comparable viewport, UI state, representative content and language, with the relevant fonts/assets loaded. Check the agreed visual anchors above, requested responsive variants and source-backed states such as loading, empty or validation feedback where applicable; do not invent missing variants or mutate data to reach them without authorization. Record material differences in comparison conditions or unavailable states. If visual inspection is blocked or explicitly deferred, report visual verification as incomplete and name the blocker or deferral; do not infer a visual pass from a successful build.
- Compare the changed UI against the baseline and agreed slice, including consumers of changed backend props or shared theme styles. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for the common method, evidence and independence rules. Keep intended UI changes intact; use an available regression-reviewer only when independent review is warranted and delegation is permitted, otherwise compare locally and disclose missing independence. This grants no test/publication authority and requires no full agent-team workflow.
- In the final response, summarize the UI delivered, meaningful prop/state/event contracts, any route decision that mattered, checks performed, and remaining gaps. Scale detail to the change; create a separate UI contract document or PR only when requested or required by the repository.
