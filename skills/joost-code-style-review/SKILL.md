---
name: joost-code-style-review
description: Supplement code reviews with Joost Waaijer's evidence-based coding preferences, alongside the existing correctness, repository standards, and requirements review.
---

# Joost code style review

Review the requested code change through Joost's technical coding identity. This is an additional lens: keep the existing Standards, Spec, correctness, and any explicitly requested specialist review. It does not authorize edits, tests, external comments, commits, or publication.

## Select the relevant evidence

Read [identity.md](references/identity.md) for the shared principles and their limits. Then load only the relevant branch:

- Laravel/PHP, resources, requests, persistence, or domain ownership: [backend.md](references/backend.md).
- Vue/Inertia, component state, Twig, or code documentation: [frontend.md](references/frontend.md).
- PR boundaries, review reasoning, or cross-cutting preferences expressed in Joost's reviews: [review-practice.md](references/review-practice.md).
- A disputed preference or a suggestion based on received feedback: [feedback.md](references/feedback.md).
- Source attribution, research coverage, chronology, or refreshing this profile: [research-method.md](references/research-method.md). Look up exact source IDs in [evidence-index.json](references/evidence-index.json) only when needed.

The evidence base is the 2026-11-11 annual study plus a targeted Haarhuis refresh on 2026-11-12; [research-method.md](references/research-method.md) records their different coverage and attribution limits. Inspect current repository rules, installed APIs, contracts, and newer explicit user decisions before applying historical guidance. There is no established universal personal policy for unfamiliar stacks.

## Apply the lens

Use the same pinned diff and scope as the existing review. When assigned the personal supplement, complete that pass explicitly rather than repeating a general bug scan and decorating its leftovers with profile IDs. Existing correctness, Standards and Spec checks retain their own outputs; correctness also constrains every style proposal.

Current user decisions, the actual specification, correctness obligations and documented repository requirements govern. Distinguish those binding sources from an observed sibling pattern. Existing code can defeat a hard Standards accusation without vetoing a concrete, non-blocking personal suggestion. Explain the local benefit and any intentional departure; do not turn it into unrelated repository-wide cleanup. Formatting already enforced by tooling needs no personal-style finding.

Read the applicable [calibration examples](references/calibration-examples.md) to see the intended review decisions and their counterexamples. They are development examples, not universal spelling or architecture requirements.

For Laravel/Inertia changes, inspect new controller guards, form bookkeeping, option loading and wrapper components against the actual native API before retaining the extra code. A simpler alternative must preserve ownership, permissions, independent form lifecycles and optional data. A component stub or a familiar method name does not establish that fit. The [native-boundary examples](references/calibration-examples.md#native-apis-at-the-actual-boundary) pair useful simplifications with reasons to retain code.

Use [model-names-behavior.md](references/model-names-behavior.md) for applicable changed surfaces: model/component interfaces, derived or proxy values, wrapper methods, controller dependencies and repeated response setup, names, or extracted/replaced behavior. Trace the effective consumers through their actual API and event path; textual references alone do not establish useful reuse. Consider a connected simplification when one removable layer only supports another. Compare existing callers before and after. Keep a small internal record of each relevant changed concept group: concrete adjustment or evidence-based retain reason. Close the whole group after finding one issue; a grouped suggestion can cover several related fields or call sites. Do not stop at the first representative name. Unchanged surfaces need no inventory, and this record is not a mandatory output or finding quota.

For each candidate, establish:

1. Which profile rule applies to this stack and context, and whether its exception applies.
2. What the current change actually does, with a diff location and the contract or ownership it affects.
3. A concrete benefit from the smallest suggested change, such as removing duplicated authoritative state, preserving a canonical field, or using an already-supported API.

A specific readability or model-simplicity benefit can justify a non-blocking personal-style suggestion without a runtime defect. Suppress arbitrary synonym swaps, formatting-only taste, historical syntax migrations, unproven invariants, imagined future reuse, and unrelated cleanup. Do not remove null guards, casts, locks, explicit serialization, local state, or abstractions without proving why they are redundant in the current contract. A review question in the source is evidence of interest, not a universal mandate; an empty approval proves no preference.

## Report without weakening the existing review

Keep the existing review's required output schema. Where free-form output permits it, add a separate **Personal code style** section containing only supported actionable suggestions. Each suggestion names the rule ID, changed file/line, practical effect, and smallest adjustment; include the historical source link when it materially supports the recommendation. State uncertainty when relevant.

A preference alone is non-blocking and has no bug severity. If the same location already has a correctness, Spec, or documented-Standards finding, report it once there and mention the profile only as secondary support. Do not inflate its priority. In a bugs-only or fixed-schema review that cannot represent optional suggestions, omit preference-only findings rather than changing the schema or inventing a defect. Report zero style suggestions briefly when the format allows it; never manufacture one to fill a quota.

For delegation, pass this skill's absolute path, the pinned diff, applicable standards/specification, the relevant profile branch, and existing verification restrictions. The supplemental lens may be handled by an existing reviewer or a separate independent reviewer when worthwhile; it does not require an extra agent for every change.

When this is a requested pre-PR check, tie the conclusion to the reviewed revision and account for meaningful subsequent changes before claiming the findings were processed. Preserve the requested review schema and existing edit, test and publication permissions; this skill does not perform those actions by itself.
