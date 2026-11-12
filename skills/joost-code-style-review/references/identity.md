# Technical coding identity

This is a scoped reviewer profile derived from attributed commits, Joost's own review comments, and observed responses to received feedback. It describes coding choices, not personality or unaided authorship. Rule IDs in the stack references provide direct source links and counterexamples.

## Repeated cross-source principles

- **Use the supported path.** Inspect existing framework/component APIs before adding transport, parsing, serialization, or state bookkeeping (BE01, BE05, BE08, BE12, FE01). An API must actually fit the installed version and endpoint contract.
- **Keep one authoritative representation.** Preserve canonical model/resource/form field names; derive dependent state rather than maintaining renamed or reactive copies (BE03, BE11, FE02, FE05). Separate draft state, snapshots, and computed presentation values can be legitimate.
- **Put behavior with its owner.** Requests own input shaping, domain types and scopes own domain selection, resources own response shaping, and components own their interaction (BE02, BE06, BE07, BE12, FE04, FE07). Historical examples show contextual boundaries, not one mandatory class architecture.
- **Simplify against proven contracts.** Remove genuinely redundant conversions and checks, while retaining validation at uncertain boundaries and support for optional data (BE04, FE03). Simplicity does not justify losing a real fallback or failure mode.
- **Extract for a concrete reason.** Favor readable local code until real reuse or responsibility justifies extraction; welcome shared helpers and components when they remove real duplication (BE09, FE04, FE06). Neither mandatory deduplication nor a ban on helpers is supported.
- **Review a coherent behavior change.** PR size is about a reviewable outcome and dependencies, not file count. Explain the contract/impact, keep unrelated cleanup separate, and distinguish a question or small preference from a necessary fix (see review-practice.md).

For changed model interfaces, names and refactored consumers, [model-names-behavior.md](model-names-behavior.md) turns these principles into a focused inspection pass. An evidenced readability/simplicity preference can be reported separately without a runtime defect; an extraction still needs a before/after check at existing callers.

[Concrete calibration examples](calibration-examples.md) show the intended optional actions and retain decisions. Existing sibling practice is evidence, while a documented applicable requirement is binding. Complete a supported new-field or repeated-setup group rather than reporting only its first member.

## Contextual conventions

Native Laravel resources, model casts, loaded relationships, request accessors, and ORM persistence recur in the backend. Declarative Inertia Form/component integration becomes more visible as supported APIs change during 2026. Explicit Twig include context is repeatedly requested in Craft work. Template-first SFCs and arrow functions are an adopted late-2026 team convention where the repository agrees, not timeless personal syntax. Documentation should add useful purpose or contract information; both missing docs and redundant docs appear in review discussion.

These practices overlap with team and framework conventions. Repeated personal endorsement plus matching corrective diffs is stronger intent evidence than raw feature frequency. Do not claim the practices are unique to Joost.

## Limits that affect decisions

Never infer a blanket ban on nullable access, casts, guards, locks, transactions, comments, local state, useForm/fetch, abstractions, or denormalization. The research contains positive counterexamples for them. Do not infer a global Tailwind ordering, accessibility, PHP strict-types, or unfamiliar-stack policy from sparse samples. Follow current project rules for these.

Chronology matters: a valid older API is not a defect because a newer API was adopted elsewhere. A promise to change code is not an implemented change; a merged/resolved PR is not proof that a suggestion was adopted. The feedback reference records exact outcomes and reversals. Refresh a rule only from explicit newer instructions or evidence, preserving its sources and exceptions.
