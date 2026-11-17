# UI Prototypes

Use this route to compare layout, information hierarchy or interaction choices. Inspect the relevant page, design references, representative content and component library so the comparison addresses the actual product.

## Explore meaningful differences

Match the number and fidelity of variants to the question. One focused proposal can be sufficient; when comparing alternatives, make their structural or interaction trade-offs visible rather than changing only color or copy. Preserve fixed requirements and label any deliberate deviation from an accepted design.

Compare alternatives under the same viewport, content, language and relevant state. Include the surrounding application context when it changes the decision: a dashboard card should be judged with the actual density and navigation around it. Reuse project components, tokens and supported APIs. Use the relevant Vue component, Inertia, Craft or design-slicing skill when the implementation calls for it, and follow installed modern web guidance before writing HTML, CSS or client-side JavaScript.

## Choose the simplest presentation

Use an in-chat interactive view for quick exploration, Figma for a requested editable design, or a standalone artifact for a portable comparison. Modify an application page or add a local preview route only when that is the authorized prototype surface and its surrounding behavior is preserved. Follow the existing routing convention rather than introducing a new top-level structure.

If a switcher helps compare variants, keep it local to the prototype. A framework-supported URL parameter can make variants shareable, but is optional. Use labeled keyboard-accessible controls; do not intercept navigation keys inside form controls. Prototype controls and variants must stay outside the production deliverable.

Use representative static data or authorized read-only sources. Stub mutations visibly; do not submit real forms, uploads or destructive actions to make a visual demo convincing. Preserve auth and data-fetching ownership in an application preview.

## Capture the design decision

Surface a preview or artifact and explain the differences relevant to the user's choice. Record a chosen variant or combination and its rationale only when supported by feedback. State visual inspection conditions and remaining unavailable states; a screenshot or successful build does not verify all interactions or responsive behavior.

Deliver the exploration without automatically replacing the production UI, creating branches or publishing an issue. If production implementation is authorized, carry the accepted design into the normal workflow described in [SKILL.md](SKILL.md), with the required production quality and verification.
