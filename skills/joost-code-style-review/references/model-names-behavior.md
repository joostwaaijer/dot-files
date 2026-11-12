# Inspect model interfaces, names, and existing behavior

Use this pass for the corresponding changed surfaces. It operationalizes BE03/BE07/BE09/BE11, WR02/WR03/WR07, and the existing requirements/correctness review; it does not create a new architecture, severity system, or finding quota.

## Redundant layers: follow the effective behavior

For a changed wrapper, computed value, proxy prop, adapter or helper, identify what it contributes on the path from input to observable behavior. A responsibility can be a real invariant, policy, lifecycle, supported public interface, nontrivial derivation or useful readable concept. Forwarding a value or renaming an operation can also be useful, but its existence and number of textual references do not establish that benefit.

Follow each claimed consumer into the installed API and actual handler. A template binding that is ignored by the event-driven submission path is not a second route consumer merely because it appears next to the submit call. An undeclared prop alone does not prove irrelevance: check attribute fallthrough, native behavior, emits and explicit forwarding before deciding. Apply the same reasoning to backend pass-through methods and repeated argument plumbing; inspect framework discovery and serialization consumers as well as direct references.

Consider the connected change, rather than preserving each layer because another current layer refers to it. If a redundant binding disappears, reevaluate whether the remaining computed/helper still earns its place. Explain the smallest coherent replacement at the real consumer, preserving route arguments, validation, events and lifecycle options. A concrete reduction in unnecessary concepts is an optional review benefit even when the existing code runs. A one-use value can still deserve a name for clarity or complex/reactive derivation; this is not a caller-count threshold.

Retain the separate interfaces that do carry behavior. A writable computed bridging a parent form, editable draft/reset state, a caller-specific permission argument, a serialized scalar needed by a real consumer, or a shared reactive label is not redundant merely because a nearby wrapper is. Give a specific responsibility or independently required consumer when retaining a disputed layer; two removable layers should not justify each other. Use FE04/FE06 or BE09/WR07 for the relevant optional suggestion, without inventing a runtime defect.

## Controller dependencies and repeated response setup

Inspect newly repeated dependency resolution and response construction as well as model helpers. When several changed actions resolve the same stable controller/service dependency, consider making that dependency explicit once and reusing it. Constructor injection can be an optional preference even when siblings use a service locator; do not label the existing native container call a functional error. Dynamic factories or request-dependent resolution may justify local lookup.

When actions render the same component with repeated prop setup, compare their real inputs and lazy/deferred behavior. A small controller-local render helper may remove genuine repeated setup. Keep request/quotation differences explicit and retain existing constructor work, authorization and deferred execution. Do not extract unrelated responses merely because they both call render(), or introduce a general rendering framework.

## Model simplification: trace the producer and the consumer

When a change adds an accessor, query scope, projected attribute, cast, or proxy field, inspect how the value is produced and who actually reads it, including Resources, serialization configuration and framework-discovered accessors where relevant. Follow the changed caller to the underlying query or property rather than judging the method in isolation.

Ask what the extra interface adds. A method that only renames, negates, or casts a temporary query projection for one endpoint can add a second representation and a hidden selected-column prerequisite. Compare it with using the established projection directly or expressing the selection through the existing relationship/query API. Filtering by the relation can sometimes remove both a temporary flag and a subsequent PHP filter. Explain the concrete reduction in concepts or coupling, not an assumed performance gain.

Report a justified smaller representation as an optional style/design suggestion even when the current caller works. Do not require a crash before noticing a redundant accessor. Conversely, one caller or a short method is not a reason by itself to delete it: a stable domain meaning, encapsulated invariant, useful readable boundary, framework contract, serialization consumer, or meaningful reuse may justify the interface. Keep behavior on its existing owner when it earns that role. Do not move domain logic to controllers mechanically or infer a model-wide failure when the actual caller satisfies the projection contract.

Use the existing rule IDs for the relevant finding: BE11/WR03 for duplicate representations, BE09/WR07 for extra indirection, and BE07 for domain-query placement.

## Naming: propose a concrete improvement without inventing a defect

Inspect newly introduced or materially changed action, scope, relation, attribute, component, and variable names against their actual behavior, caller vocabulary, namespace and nearby conventions. Consider whether a name identifies an operation, returned result, filtering predicate, query decoration, boolean state, collection or single domain object. A decorator that selects a flag is not automatically a filtering predicate, and a negated flag is not the same state as its positive counterpart.

A useful candidate includes the current name, a specific proposed name, and a short explanation of the domain or role it exposes, the mismatch it resolves, or the qualifier the surrounding context already supplies. After identifying a domain-name issue, inspect the remaining newly changed members of that same feature group. Name each supported ambiguity in a shared proposal where the remedy is shared. Distinguish new canonical fields from established wire keys, and include the schema and direct consumers in an intentional canonical rename. Clarity and a consistent domain term are practical benefits; the code need not be functionally broken. Consider route/action alignment and projected-attribute meaning where they are actually introduced. Keep these proposals in Personal code style unless an independent contract or documented standard establishes a stronger requirement.

Do not merely ask for better names, mechanically shorten everything, reproduce an old review's spelling, or force a casing/prefix policy. Suppress equally clear synonym swaps that have no evidenced preference or contextual benefit. Preserve established database/API/form keys and deliberate computed-field semantics; renaming a local symbol is different from silently changing a wire contract. Use WR02, and BE03/WR03 or FE05 when contract keys are involved.

## Existing behavior: compare the callers, not just the new helper

When inline logic becomes a shared helper/scope, or a framework API replaces an existing path, compare the old and new expression at the existing callers. A reasonable new feature policy does not by itself authorize changing an existing consumer. Trace only contracts touched by the change: for example query membership and boundary comparisons, missing-value/default behavior, response fields, ordering, permissions, lifecycle or side effects.

Establish a concrete allowed input/state that distinguishes before from after. For a predicate extraction, compare its operators, grouping and parameter interpretation with the expressions it replaces. For mapping or model changes, inspect what existing consumers receive, including omitted/loaded fields. Do not assume that an extraction or native API call is behavior-preserving merely because the new code is concise or technically valid.

At a changed resource/transport/component boundary, use the values the producer can actually emit: a newly added blank row, a missing source relation, or a valid fractional quantity. Check the serializer and native input constraints as well as the backend rule. A derived flag must describe the rows that survive shaping, rather than an earlier unfiltered collection. These mismatches belong in correctness/Spec when demonstrated; they are not personal rules to add guards, filter every falsey value or standardize every input step. See [RF34](feedback.md#rf34--producer-values-must-survive-the-real-consumer).

If a changed existing contract contradicts the current task or an established invariant, report the supported correctness/Spec finding once in that existing review axis. If intent is genuinely unknown, state the observed behavior difference and ask the narrow contract question in observations; do not turn it into a proven bug or silently dismiss it. Keep a feature's intended new semantics distinct from the semantics of pre-existing callers. There is no universal requirement for inclusive date boundaries, a specific null fallback, or the old implementation at all costs: an authorized behavior change can be correct.

## Reporting and limits

Keep the smallest code location and remedy that explains the issue. Separate optional naming/simplicity suggestions from behavioral failures, and consolidate a flag, accessor and scope when they form one design change. Where the output format allows it, briefly state which applicable surface was traced and why a plausible candidate was retained or suppressed. Do not emit coverage filler for untouched surfaces or violate a fixed output schema.

Calibration evidence from the first retrospective evaluation:

- [Model accessor request](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287950162): an extra accessor over a one-endpoint projection was not noticed by either original review arm. This supports tracing real consumers, not deleting all accessors.
- [Route/action naming request](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287979758): a concrete operation-oriented name was requested. It illustrates a non-blocking naming proposal, not an endpoint malfunction.
- [Boundary question](https://github.com/robuust/haarhuis-portaal/pull/302#discussion_r3287946402): the extraction changed existing comparisons. Check old callers separately from judging the new interval policy; the question alone does not prove a universal boundary rule.

The profile is based on attributed account activity, not independently verified handwriting. These calibration examples refine the inspection method; they are not expected answers for the next PR.
