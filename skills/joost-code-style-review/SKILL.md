---
name: joost-code-style-review
description: Supplement code reviews with Joost Waaijer's evidence-based coding preferences, alongside the existing correctness, repository standards, and requirements review.
---

# Joost code style review

Review the requested code change through Joost's technical coding identity. This is an additional lens: keep the existing Standards, Spec, correctness, and any explicitly requested specialist review. It does not authorize edits, tests, external comments, commits, or publication.

## Select the relevant evidence

Read [identity.md](references/identity.md) for the shared principles and their limits. Use the [topic index](references/topic-index.md) to select rule IDs and sections for the actual changed surfaces. Read each selected rule completely, including scope, exceptions, sources, chronology and counterevidence; the index is navigation, not a replacement for that evidence. Follow connected rules where the candidate needs them without reading entire branches by default or applying a fixed rule quota.

For a disputed preference or a candidate based on received feedback, read the relevant case and its outcome/limits in [feedback.md](references/feedback.md). Use [research-method.md](references/research-method.md) for attribution, study coverage, chronology or an authorized profile refresh. Look up exact source IDs in [evidence-index.json](references/evidence-index.json) only when needed. A normal review does not refresh the corpus or change the profile.

The evidence base is the 2026-11-11 annual study plus a targeted Haarhuis refresh on 2026-11-12; [research-method.md](references/research-method.md) records their different coverage and attribution limits. Inspect current repository rules, installed APIs, contracts, and newer explicit user decisions before applying historical guidance. There is no established universal personal policy for unfamiliar stacks.

## Establish the review basis

Reuse the existing review's pinned diff and scope when provided. For a standalone invocation, establish the requested repository/checkout and comparison first: full base/head commit IDs and the relevant merge-base for a branch/PR comparison, or base HEAD plus the requested staged, unstaged and relevant untracked content for a local review. Record the local diff/content basis sufficiently to detect later changes. Ask only when materially different comparisons remain plausible; no separate full review or team workflow is required.

Inspect the current rules and source context relevant to that snapshot. Preserve local work; do not stage, stash, commit, reset or switch the checkout merely to freeze a review. Before reporting, check whether the relevant revisions or local content changed. Reassess affected conclusions or explicitly report the older snapshot and resulting gap rather than certifying a moving target.

## Check current APIs separately from historical preferences

The profile explains the preference and its evidence; historical examples are not current implementation instructions. Verify the proposed alternative against the installed framework/component APIs and actual producers, consumers and lifecycle. A familiar method or old composition example alone does not establish support or fit.

Load only the applicable current contract guidance: [inertia-patterns](../inertia-patterns/SKILL.md) for Inertia form/state ownership; [vue-components-mcp](../vue-components-mcp/SKILL.md) for actual component props/events/slots, forwarding and rendered form association; [be-craft](../be-craft/SKILL.md), [fe-craft](../fe-craft/SKILL.md) or [hotwired-patterns-craft](../hotwired-patterns-craft/SKILL.md) for affected Craft/Twig/server/DOM contracts. Follow the project's version-specific Laravel guidance for other Laravel APIs. Reuse verified session evidence; if guidance is unavailable, inspect matching official documentation or installed definitions and report material uncertainty. Reading these workflows for API evidence does not authorize their implementation, testing or publication actions.

Keep the historical rules and examples, including version-bound observations, attributed to their original context. If an example no longer fits the installed API, assess whether the underlying preference has another supported application; otherwise suppress the candidate or state the unassessed contract gap. Do not infer that the preference changed solely because an API evolved.

## Apply the lens

Use the pinned diff and scope established above. When assigned the personal supplement, complete that pass explicitly rather than repeating a general bug scan and decorating its leftovers with profile IDs. Existing correctness, Standards and Spec checks retain their own outputs; correctness also constrains every style proposal.

Current user decisions, the actual specification, correctness obligations and documented repository requirements govern. Distinguish those binding sources from an observed sibling pattern. Existing code can defeat a hard Standards accusation without vetoing a concrete, non-blocking personal suggestion. Explain the local benefit and any intentional departure; do not turn it into unrelated repository-wide cleanup. Formatting already enforced by tooling needs no personal-style finding.

Ground proposed domain names, ownership boundaries or behavior changes in exact project sources; current code alone does not settle ambiguous intent. Ask the user before dependent acceptance/implementation on a material unresolved choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for reconciliation and escalation; continue independent review. Supported non-blocking style suggestions preserving agreed outcomes need no mandatory user decision or new specification.

Read the applicable [calibration examples](references/calibration-examples.md), selected through the topic index, to see the intended review decisions and their counterexamples. They are development examples, not universal spelling or architecture requirements.

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

Tie the conclusion to the reviewed snapshot and actually assessed topics. Distinguish assessed with no suggestions, partially assessed because evidence is missing, and not applicable to this change. Unread unrelated branches need no coverage inventory; a selected topic blocked by missing component/API or source evidence remains a limitation, not a pass. Report material limits compactly only through fields/sections the requested schema permits. If optional suggestions were omitted because the schema cannot represent them, do not imply that a free-form personal-style pass found none. No suggestion count establishes full coverage or runtime preservation.

For delegation, pass this skill's absolute path, the pinned diff/content basis, applicable standards/specification, the selected topics/rule sections, source gaps and existing verification restrictions. The supplemental lens may be handled by an existing reviewer or a separate independent reviewer when worthwhile; it does not require an extra agent for every change. An independent reviewer must not have authored the target; label local self-inspection accurately. Respect any restriction on delegation or further delegation; an assigned reviewer does not start another team when that is prohibited.

When this is a requested pre-PR check, tie the conclusion to the reviewed revision and account for meaningful subsequent changes before claiming the findings were processed. Preserve the requested review schema and existing edit, test and publication permissions; this skill does not perform those actions by itself.
