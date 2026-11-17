# Inertia Interaction Patterns

Use the section matching the requested interaction. These are shared defaults; retain established project contracts and verify APIs against installed versions.

## Search and filters

- For an explicit search submission, prefer a GET `<Form>` with named controls, the existing route, and its own processing state for action availability.
- Keep URL query parameters as the submitted filter contract. Add local draft values only when the interaction needs them; preserve unrelated query parameters and reset pagination where the existing search contract requires it.
- Do not add manual serialization, a separate loading ref, or a router wrapper when the form already handles the required submission. Live/debounced search may justify a handler; follow that interaction's existing history and state-preservation behavior.
- Trace the agreed URL/query round trip, including clearing filters, unrelated parameters, pagination, reload and browser back/forward. Keep an unsubmitted editable draft distinct from applied filters only when the interaction needs that distinction. Choose push/replace, state/scroll preservation and remembered state from the source-backed interaction and supported APIs, not as universal defaults.
- Identify all server props affected by filter changes, including related counts, options and pagination where applicable. Use partial reloads only when their prop selection keeps those consumers current; do not add them merely as a default optimization. Preserve established behavior and report unresolved history/reset choices before changing them.

## Editable drawers

- When a reused drawer switches between records or its fields need programmatic updates, prefer `useForm` as the editable draft. Initialize the relevant fields and defaults at the record/open boundary; clear previous-record errors there as required.
- Reset to the intended baseline on cancel/reopen according to the requested UX. Do not overwrite unsaved edits whenever page props change, or force a remount merely to refresh defaults.
- A simple drawer with named inputs can use `<Form>`. When the drawer does not forward the form's scoped state, prefer `<Form>` outside the drawer only when the installed component and rendered DOM keep the fields and submit actions associated with that form. Check scoped-state access and teleportation together; Vue nesting alone does not prove HTML form ownership. Otherwise use supported component/form association APIs or `useForm` for the actual contract. Do not bridge missing slot state through event-synchronized refs.
- Keep the drawer open on validation failure; close on confirmed success when that is the intended flow. Reopening and switching records must not show another record's errors or stale draft.
- If the UI permits closing, reopening or switching records while a submission is pending, trace its submitted identity, active draft and success/error/reset callbacks. Check whether a late result for record A can affect a now-active record B. Inspect existing behavior and the installed owner's lifecycle/cancellation APIs first; adjust the boundary only for a concrete exposure and the agreed UX. Do not add request tokens, identity mirrors, cancellation machinery or keyed remounts by default. A request finishing or being canceled does not itself establish successful persistence.

## Delete confirmations

- Prefer a form-owned delete submission with the existing route and HTTP method. Disable the destructive submit action using the same owner's processing state and close after success, preserving visible failure feedback.
- `Modal :as="Form"` is suitable only when the installed modal forwards the required props, events, and scoped slot state. Otherwise compose an explicit form or use `useForm`; do not introduce duplicate pending/error state to make the shorthand work.

## Validation and failure outcomes

- For pages with multiple forms, trace how a submission's errors reach its owner, especially when field names overlap. Use the installed helper's native error scoping or the established error-bag contract where needed; do not add bags universally or copy page errors into another store.
- Clear errors and reset defaults at the agreed form/record boundary, retaining the submitted values and visible validation feedback when the flow requires them. Do not clear another form's errors or treat a stale error from a previous record as the current response.
- Keep ordinary Laravel/Inertia validation on its redirect/session-error path. Distinguish validation failure, other HTTP/authorization or network failures, cancellation and confirmed success through the installed API and existing project handling. A finish callback is not a success signal. Close/reset only for the intended successful submission; retain meaningful failure feedback without introducing a second pending/error state machine. Preserve a deliberately separate API response contract where present.

## Robuust component composition

Resolve `Modal` and `Drawer` separately through [vue-components-mcp](../../vue-components-mcp/SKILL.md). An `as` prop controls rendering; it does not establish that the component forwards another component's scoped slots.

The Drawer implementation inspected in `@robuust-digital/vue-components` 3.2.0 does not forward Inertia Form's scoped errors/processing state. Form wrapping Drawer is a candidate for that contract only when the rendered fields and actions retain their form association, including through teleportation. Recheck installed source or MCP documentation before applying this observation to another version; do not assume Modal and Drawer are interchangeable.

Inspect scoped-slot forwarding and the actual rendered form ownership together when a dialog teleports content: named fields and submit actions must belong to the intended form, with no nested forms. Confirm any explicit HTML form association is supported by the real controls/components rather than adding an unverified attribute. Bind the real component's loading/error props to the form owner, keeping its event names and slot contracts exact. Preserve component structure, labels, keyboard/focus behavior and associations outside the intended change; do not restructure a working composition just to match an example.

## Framework references

The conventions above choose among supported APIs. Use the installed version's documentation for their exact signatures and behavior. For v3, see [forms](https://inertiajs.com/docs/v3/the-basics/forms) and [validation](https://inertiajs.com/docs/v3/the-basics/validation).
