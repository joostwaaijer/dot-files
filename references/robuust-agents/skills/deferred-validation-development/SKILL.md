---
name: deferred-validation-development
description: Defer validation during implementation when the user explicitly requests an iteration phase without checks.
compatibility: Designed for Open AI Codex (or similar products)
metadata:
  author: rutgerbakker
  version: "1.0"
---

# Deferred Validation Development

## When to Apply

Apply only when the user asks to defer validation. Iteration or a small change alone does not activate this workflow.

## Default Behavior

- Implement the requested change directly.
- Defer tests, linting, formatting, static analysis, builds, and browser verification unless the user names a permitted check.
- Prefer minimal inspection and targeted edits over full verification loops.
- Inspect the relevant code and diff to implement correctly; finish the requested edits without stopping after the first pass solely because checks are deferred.

## When to Validate

- Resume non-test checks when the user requests them or says the code is ready for verification. A request to fix a build or lint failure authorizes that relevant non-test check.
- Writing, modifying, fixing, or running tests requires explicit authorization for the active objective, which persists across follow-up corrections unless the user withdraws it or replaces the objective. Deferral pauses checks without revoking that authorization; resume previously authorized tests when the user lifts the relevant deferral. Generic validation, readiness, or CI wording does not grant new test authorization.
- If a concrete risk makes an edit unsafe without a deferred check, explain the risk and required check, then ask only for that blocked step while continuing independent work. Do not override the user's deferral based on a hypothetical concern.

## Reporting

If validation is deferred, say so briefly and name the checks you would run later.

If you do validate, keep it minimal and directly relevant to the changed files or behavior.

For UI slicing, pair with [`design-slice-inertia`](../../../../skills/design-slice-inertia/SKILL.md). Use [`vue-vitest-coverage`](../../../../skills/vue-vitest-coverage/SKILL.md) only once Vue test work is explicitly requested.
