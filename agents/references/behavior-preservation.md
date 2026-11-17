# Functionality and frontend preservation

Use this reference when a change promises unchanged behavior, changes existing frontend structure/contracts, or changes a backend producer whose existing frontend consumers could be affected. Apply it only to affected surfaces. It is a standalone comparison procedure, not a requirement to load agent-team, create a plan or delegate.

## Pin the comparison

Identify the exact baseline and current artifact, source-backed intentional changes and preserved behavior/structure. For local work, include the requested staged, unstaged and relevant untracked content. Missing baseline or ambiguous intent is a coverage/decision gap; use [project-decisions.md](project-decisions.md) when sources leave a material choice open. Preserve the bug fix or structural change the user actually requested.

## Trace affected contracts

Compare the before/after execution paths and actual producers/consumers, including frontend consumers reached by backend changes. Backend-only filenames do not establish preservation. Inspect relevant canonical fields/types, optionality, validation, permissions, status codes, redirects, routes/query parameters and lifecycle/side effects. Where queries change, include filters, ordering, site/tenant scope and query-versus-loaded-collection semantics.

Where frontend structure is affected, compare relevant template/DOM hierarchy, component boundaries, props/events/slots, selectors/hooks, form association, navigation, state ownership, labels and keyboard/focus behavior. Retain source-authorized changes; a difference alone is not a regression. Keep stack-specific API questions and flow-specific checks with the owning skill rather than expanding this into a full visual-design or frontend audit.

## Review and report within authority

Use permitted inspection and relevant non-test checks. Writing, modifying, deleting or running tests, including automated browser scenarios and executable reproductions, requires explicit user authorization; apply the [Testing and Verification](../templates/org/AGENTS.md#testing-and-verification) rules. Direct non-mutating observation does not authorize submissions or other data/external writes. A preservation review does not authorize edits or publication.

When independent review is required or warranted and delegation is permitted, use an available regression-reviewer profile or an existing independent review package covering these criteria. The reviewer must not have authored the target. Otherwise compare locally and disclose missing independence; do not create a full team merely to satisfy this reference. Reuse current applicable evidence and deduplicate overlapping review findings.

Report concrete unintended effects with baseline/current locations, the intended change and supporting source, affected consumer and observable impact. Distinguish inspected preservation from unobserved runtime cases; a build, mock or empty finding list does not prove full runtime preservation. Reassess only evidence invalidated by relevant changes and retain unresolved gaps instead of treating them as passes.
