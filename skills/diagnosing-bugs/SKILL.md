---
name: diagnosing-bugs
description: Investigate a reported bug or performance regression using the actual failure, current code, and a focused reproduction where available.
---

# Diagnosing Bugs

Establish the failing behavior, identify its cause, and verify the requested fix against the original symptom. For diagnosis-only requests, report the evidence and smallest fitting fix without editing production code.

## Evidence

Start from the supplied error, log, screenshot, record, or last-known-good version. Inspect the code path and relevant configuration; read domain documentation or ADRs when they affect the diagnosis. Capture the exact symptom and distinguish it from nearby failures.

State observed and expected behavior separately, grounding the expectation in the user report and exact project sources; an error message or current behavior alone does not settle intent. Ask the user before work depending on a material unresolved outcome and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for reconciliation and escalation; continue independent investigation and keep proposed fixes labeled as proposals.

Bind evidence to the revision/build, environment and observation time where known, relevant runtime/dependency versions, triggering input and user/permission context. Distinguish the deployed code that produced a trace from the selected checkout, its branch/local changes and configuration. Inspect relevant version metadata and source rather than installing or upgrading packages to align them. State mismatches and missing provenance instead of silently treating current code as the source of an older failure. Retain only the context needed for diagnosis and redact credentials and sensitive data in displayed commands or artifacts.

Prefer a repeatable signal that exercises the reported behavior. Use existing logs or captured requests as read-only evidence; replay a request, execute a CLI command or use an isolated browser interaction only within the task's existing action and test authorization. Writing, modifying, deleting or running tests, including reproduction scripts, automated functional browser scenarios, fuzz loops and regression harnesses, requires explicit test authorization; calling them diagnostic checks does not grant it. Replays, submissions and other data writes or outward actions need their applicable authorization as well. Protect active browser workflows and keep credentials out of displayed commands and artifacts.

A local reproduction is useful evidence, not a prerequisite for reading code or analyzing a production trace. If reproduction is unavailable, continue with the available evidence, state the resulting uncertainty, and request only the missing access or artifact that would change the diagnosis. Do not label a hypothesis as confirmed without support.

## Investigation

State the strongest hypothesis and a prediction that would distinguish it from plausible alternatives. Add alternatives where the evidence is ambiguous; do not invent a fixed quota. Use targeted inspection, temporary instrumentation, version comparison, or bisection where it can discriminate between causes within the authorized scope.

Record which observation supports or contradicts the prediction and revise the hypothesis when evidence disagrees. Distinguish the observed failure, a plausible explanation and a supported causal account; do not accumulate unrelated fixes merely to make the symptom disappear.

Prefer read-only inspection and version comparisons for diagnosis-only work. Temporary instrumentation, bisection or environment changes are permitted only within authority to change the affected code, checkout or runtime; diagnosis alone does not grant that authority. Preserve existing local work and shared services; a reproduction request does not itself authorize resets, cleanups, revision/checkout switches or shared-service interruptions. Record the starting state and investigation-owned changes so cleanup can remove only those changes. If a necessary discriminating action lacks authority, identify the exact action while continuing independent work.

For performance work, establish the baseline and measure the same affected path using existing evidence or authorized measurements. Keep relevant inputs, environment, metric and measurement method comparable; record material differences in cache state, workload, configuration or versions, and observed variability. Separate a measured improvement from an expected benefit or an incomparable local result. Preserve existing behavior, results, and fixtures. For intermittent failures, use observed frequency and timing evidence; stress or repeated runs need a justified, bounded scope and the appropriate authorization. If measurement is unavailable, report the limitation instead of claiming an improvement.

## Fix and completion

When implementation is requested, fix the cause at the layer that owns it using the smallest justified change, citing the causal evidence and affected contract. Inspect the installed dependency source when ownership is uncertain; a dependency appearing in a stack trace alone does not establish a dependency defect. For an evidenced dependency defect, follow the applicable repository/user upstream policy and the available [upstream-dependency-fixes](../upstream-dependency-fixes/SKILL.md) workflow within existing authority rather than silently adding an application workaround. Follow the user's test policy; write or run a regression test only when explicitly requested. If test work alone was requested, report any needed production fix as a proposal and obtain authorization before changing application code.

Verify against the original symptom and triggering conditions using permitted checks, tying results to the changed artifact and actual environment. Use the standalone [preservation comparison](../../agents/references/behavior-preservation.md) for affected before/after consumers and unintended effects. A successful build alone establishes neither resolution of the original failure nor runtime preservation.

When useful independent work is available and delegation is permitted, use an available [researcher](/Users/joostwaaijer/.codex/agents/researcher.toml) for evidence and competing hypotheses, [implementer](/Users/joostwaaijer/.codex/agents/implementer.toml) for the authorized fix, and [regression-reviewer](/Users/joostwaaijer/.codex/agents/regression-reviewer.toml) for independent preservation review. Apply the selected profile through a supported native field or include its instructions in the task brief; a name/path alone does not load it. Respect assigned scope and any prohibition on further delegation. Keep small tasks direct; a complete agent-team workflow is not required. A reviewer must not have authored its target; disclose any missing independence when inspecting locally.

Remove only instrumentation and temporary artifacts created for this investigation, preserving user-authored or concurrent changes; do not restore whole files over work you do not own. Report the cause and its evidential confidence, change, original-symptom and preservation evidence, and any remaining verification limit. Stop repeating checks after the relevant signal is resolved unless new evidence warrants another pass.

Recommend architectural follow-up only when the investigation demonstrates a separate problem; do not start a new refactor as an automatic post-mortem step.
