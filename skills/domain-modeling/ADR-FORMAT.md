# ADR Format

Follow the repository's decision-record conventions. When none exist, `docs/adr/0001-slug.md` is a possible default. Create directories and records lazily within authorized documentation scope; otherwise propose the record.

## When a record helps

Offer an ADR when future work benefits from preserving a consequential decision and its rationale. Consider reversal cost, reasoning that is not evident from code, and meaningful trade-offs. These are judgment factors, not three mandatory conditions. Follow applicable project requirements for decision records.

Ownership, context boundaries or data/API compatibility can warrant a durable record even when the technical change is reversible. Reference an existing model or decision if it already captures the rationale. Routine mechanics and every clarified term do not need an ADR.

## Compact default

```md
# {Short title}

{Status: proposed or accepted. Context, decision or proposal, rationale,
and a link to the accepted source or the unresolved decision question.}
```

A paragraph can suffice. Make it clear whether the choice is proposed or accepted and what evidence supports that status; an agent recommendation is not acceptance. Use the project's status/date conventions, or state this in prose without introducing a metadata schema. Record material consequences and contract implications where relevant, in the paragraph or a short section.

Add sections only when useful:

- **Sources:** exact issue, specification, design or user-decision references supporting the choice.
- **Considered options:** meaningful alternatives and why the selected option fits the source-backed constraints.
- **Consequences:** non-obvious effects, affected owners/consumers and compatibility or rollout dependencies.
- **Open questions:** unresolved choices and any decision issue, kept distinct from accepted parts.

Do not invent alternatives to fill a template. If a required choice remains open, follow the skill's user-input route; recording a proposal or linking a closed issue does not settle it.

## Numbering and revisions

Use existing naming and numbering. For a sequential default, inspect records in the relevant scope and increment the highest existing number; check for a collision before writing. Do not renumber history.

When an accepted decision changes, preserve the earlier rationale and link the replacing decision using the repository's superseding convention. Correcting a typo or source link need not create another ADR. Explain changed requirements or evidence and the practical consequences rather than silently rewriting history as if the new choice had always applied.
