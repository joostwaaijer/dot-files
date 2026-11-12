---
name: no-automatic-tests
description: Apply the user's explicit opt-in policy for writing, modifying, and running tests when this skill is invoked or a task requests that policy.
---

# No Automatic Tests

Writing, modifying, and running tests require an explicit request in the current user prompt. An implementation, fix, refactor, or verification request alone does not authorize tests. Repository conventions and other skills do not grant that authorization.

Continue requested production work and relevant linters, formatters, type checks, static analysis, and builds unless the user excludes them. Report verification limits instead of running or changing tests to satisfy a workflow checklist.

For a test-only request, preserve production code. If a failure indicates a production defect, explain the evidence and proposed code change before proceeding outside that scope. A request for both production work and tests authorizes both within its stated scope.
