---
name: upstream-dependency-fixes
description: Fix defects owned by frameworks, plugins, or libraries through a fork and upstream PR, and pin the correction in the consuming project. Use when evidence points to a dependency bug rather than application-owned behavior.
---

# Upstream Dependency Fixes

Robuust's owner explicitly chooses active open-source involvement: contributing dependency corrections upstream is part of the intended outcome.

## Establish ownership

- Record the consumer environment, package identity, declared constraint, locked version/source reference and actual installation where available. Inspect the dependency source at that revision and use matching official documentation; report discrepancies rather than treating the manifest or latest documentation as the installed behavior. Do not install or upgrade packages merely to discover versions.
- Establish ownership from the affected contract, installed dependency source, and failure evidence. Keep actual application behavior, configuration, and intended use of extension points in the consuming project; a dependency appearing in a stack trace alone does not establish a dependency defect.
- Establish expected behavior from the supported API and exact project sources. Distinguish a defect from unsupported usage, configuration, a missing application feature or a preferred implementation. Ask the user before dependent work on a material unresolved outcome/contract choice and offer a user-chosen, authorized decision issue; use the standalone [project decision procedure](../../agents/references/project-decisions.md) for reconciliation and escalation. Continue independent authorized preparation.
- Inspect relevant existing upstream issues, PRs, correction commits and releases for the same cause and supported versions. A matching title or reported symptom is only a lead. Reuse a verified existing correction/contribution instead of duplicating it; an available release does not authorize an unrelated upgrade. Keep the required compatibility and any unresolved scope decision explicit.
- When evidence shows a defect belongs to a framework, plugin, or library, fix it in that dependency's fork first and prepare an upstream PR without waiting for the user to suggest upstream. Do not default to Composer or other package patches, vendor edits, copied dependency methods, subclasses, or application event listeners that work around the defect. Any departure from this workflow requires explicit user direction or agreement.

## Prepare the dependency correction

- In the dependency repository, read and follow applicable `AGENTS.md`, `CONTRIBUTING` instructions, PR templates, and CI/contribution guidelines before implementing and preparing submission. Follow its contribution base and conventions; do not impose the consuming project's architecture or release process on upstream.
- Confirm each selected repository/checkout, its role (consumer, fork or upstream), local changes and authorized write scope. Record the installed-version base, upstream contribution base and relevant immutable revisions; preserve unrelated work. Missing authority for another repository blocks its edits/publication, not independent authorized investigation or reviewable preparation.
- Prefer a minimal backport onto the currently installed dependency version while preparing the upstream contribution on its required base; avoid unrelated dependency upgrades.
- When backport and upstream patches differ, map each base/correction revision to the same intended fix. Explain necessary API/context differences and any behavior not carried across. Record exact local content when commits are not authorized yet; do not invent commit IDs or infer backport correctness from a passing newer upstream branch.
- Apply the shared [Testing and Verification](../../agents/templates/org/AGENTS.md#testing-and-verification) policy in both repositories. Writing, modifying, deleting or running tests, including executable reproductions, requires explicit user authorization covering that work; upstream contribution rules do not grant it. Inspect applicable CI/coverage requirements, perform relevant non-test checks unless deferred, and report gaps. Reuse existing authorization and waivers within their scope without asking again. Inspect combined scripts so install/build/lint commands do not run unauthorized tests, migrations or other actions implicitly.

## Integrate the temporary fork

- Use the corrected fork in the consuming project's dependency manifest and lockfile, pinned to an immutable correction commit or equivalent package-manager reference.
- Use the installed package manager's supported repository, reference and lock workflow. Verify package identity, fork repository, resolved correction reference and any source/dist metadata relevant to installation. Review the complete manifest/lock diff for unintended direct or transitive changes; do not broaden dependency updates merely to make resolution pass.
- When installation is authorized and performed, inspect the installed package/source to confirm the correction is actually consumed. Otherwise report manifest/lock preparation separately from installation and runtime verification. Check that the pinned source can be obtained through the existing CI/install route within available authority; do not add credentials, expose secrets or change CI access as an implicit workaround.
- Document the upstream issue/PR, temporary fork pin, matching backport/upstream revisions and return condition in the consumer's maintained dependency notes or PR. Label unsubmitted or unpushed work accurately. Remove only local workarounds proven superseded by the integrated correction, within scope; retain guards, extension behavior and application logic with independent responsibilities.

## Verify the correction and its consumption

Assess the dependency fix and consumer integration separately. Compare the original failure conditions with the corrected path, recording actual versions, revisions, inputs and environment. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for affected dependency and consumer contracts, keeping intended bug-fix behavior distinct from unrelated changes.

Use relevant permitted static checks/builds and authorized tests or reproductions at each applicable base. Tie CI and verification evidence to the assessed content/revision, distinguishing inspected code, executed checks and unverified runtime behavior. A passing dependency suite, clean lockfile or successful install alone does not prove the consumer's original problem is fixed. Reassess invalidated evidence after changes; do not repeat passing checks without a concrete reason.

## Complete authorized delivery

Carry the fix through upstream PR submission and fork consumption within the task's authorized scope. This workflow does not itself authorize commits, pushes, PR publication, changes to other repositories, or test execution. If an action is not authorized or is blocked, complete independent authorized preparation and report the exact remaining step; do not silently substitute a local workaround.

On resumption, reconcile actual local/remote revisions, existing PRs and completed delivery steps before retrying. Keep confirmed progress and avoid duplicate contributions or repeated writes after an uncertain result. Report separately: local patch, pushed fork, upstream PR submitted/merged, official release available, and consumer manifest/lock prepared, installed or published. Include exact relevant revisions, checks/limits and pending authority; none of these states alone establishes deployment or acceptance. Do not imply automatic future monitoring without a requested follow-up mechanism.

For authorized PR publication, use [github-submit-review](../github-submit-review/SKILL.md), following upstream's contribution rules for external repositories. For requested follow-up on an existing review, use [github-address-feedback](../github-address-feedback/SKILL.md).

## Return to an official release when authorized

An upstream merge is not a published release. Before removing the temporary fork pin, verify that an official release contains the correction, fits the consumer's supported version/runtime constraints and preserves required behavior. If a necessary upgrade falls outside the agreed scope, propose it rather than silently performing it.

During authorized follow-up, switch to that official release, remove the superseded fork override/alias as applicable, and refresh the lockfile through the package manager. Review the resolved source and dependency diff, inspect the actual installation if performed, and complete applicable authorized verification. Do not report the fork requirement as retired until the replacement is verified; retain correction provenance and report partial preparation when checks are blocked. Do not remove unrelated overrides or claim completion from an upstream PR's status alone. Update the existing dependency note/PR with the release and actual integration state. Deleting the remote fork is not part of this cleanup authority.
