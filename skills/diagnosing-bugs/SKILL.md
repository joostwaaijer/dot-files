---
name: diagnosing-bugs
description: Investigate a reported bug or performance regression using the actual failure, current code, and a focused reproduction where available.
---

# Diagnosing Bugs

Establish the failing behavior, identify its cause, and verify the requested fix against the original symptom. For diagnosis-only requests, report the evidence and smallest fitting fix without editing production code.

## Evidence

Start from the supplied error, log, screenshot, record, or last-known-good version. Inspect the code path and relevant configuration; read domain documentation or ADRs when they affect the diagnosis. Capture the exact symptom and distinguish it from nearby failures.

Prefer a repeatable signal that exercises the reported behavior. Use an existing log, request, CLI command, or isolated browser interaction when it provides the needed evidence. Creating or running tests, fuzz loops, or regression harnesses requires explicit test authorization; this skill does not grant it. Protect active browser workflows and keep credentials out of displayed commands and artifacts.

A local reproduction is useful evidence, not a prerequisite for reading code or analyzing a production trace. If reproduction is unavailable, continue with the available evidence, state the resulting uncertainty, and request only the missing access or artifact that would change the diagnosis. Do not label a hypothesis as confirmed without support.

## Investigation

State the strongest hypothesis and a prediction that would distinguish it from plausible alternatives. Add alternatives where the evidence is ambiguous; do not invent a fixed quota. Use targeted inspection, temporary instrumentation, version comparison, or bisection where it can discriminate between causes within the authorized scope.

For performance work, establish the baseline and measure the affected path. Preserve existing behavior, results, and fixtures. For intermittent failures, use observed frequency and timing evidence; stress or repeated runs need a justified, bounded scope and the appropriate authorization.

## Fix and completion

When implementation is requested, fix the cause at the layer that owns it using the smallest justified change. Follow the user's test policy; write or run a regression test only when explicitly requested. If test work alone was requested, report any needed production fix before changing application code.

Verify against the original symptom using permitted checks. Remove instrumentation and temporary artifacts created for this investigation. Report the cause, change, evidence of the result, and any remaining verification limit. Stop repeating checks after the relevant signal is resolved unless new evidence warrants another pass.

Recommend architectural follow-up only when the investigation demonstrates a separate problem; do not start a new refactor as an automatic post-mortem step.
