---
name: vue-vitest-coverage
description: Write or fix Vue component specs and coverage when the user explicitly requests Vitest or frontend unit-test work.
compatibility: Designed for Open AI Codex (or similar products)
metadata:
  author: rutgerbakker
  version: "1.0"
---

# Vue Vitest Coverage

Use this skill when the user explicitly wants Vue component specs or Vitest coverage.

Keep specs focused on the requested component behavior and coverage goal. Inspect existing feature-test responsibilities before duplicating backend/domain scenarios.

Apply the shared [Testing and Verification](../../agents/templates/org/AGENTS.md#testing-and-verification) rules. Test authoring and execution require explicit user authorization covering that work. Project coverage requirements take precedence over focused defaults; explicit user limits still govern which work may be performed.

## Trigger Conditions

Activate this skill when one or more of these are present:

- The user asks for Vitest, spec tests, unit tests, or component tests.
- The user asks to get frontend coverage green.
- The user requests frontend test work together with `design-slice-inertia`.
- The user asks to fix failing Vue specs or coverage.

Apply only to test work explicitly requested for the active objective. That authorization persists across follow-up corrections unless the user withdraws it or replaces the objective. Discovering a coverage failure during production work alone is not permission to run or change tests.

Loading, reviewing or editing this skill, or pairing it with a design workflow, does not itself authorize application tests. Honor explicit authoring/execution deferrals and reuse valid authorization without asking again. For an analysis-only request, report findings without editing or executing tests.

## Test scope and expected behavior

For test-only work, keep application code intact. If investigation shows a production defect or a production change is necessary, report the cause, affected contract and proposed correction rather than fixing application code or changing the test to bless the defect. Implement production changes only within actual implementation authorization, and continue independent authorized test work where useful.

Derive assertions from exact issue/specification, design, accepted-decision or supported component-contract references; current code alone does not settle ambiguous intent. Ask the user before encoding a material unresolved choice and offer a user-chosen, authorized decision issue. Use the standalone [project decision procedure](../../agents/references/project-decisions.md) for source reconciliation and escalation; continue independent authorized work.

## Objective

- Meet the user's requested coverage goal and applicable repository metrics/thresholds. Use the focused default of 100% statements only when no different goal or configured gate applies; a target-file percentage does not establish a project-wide result.
- Cover every named local method, meaningful callback, and computed/data transformation owned by the target component through observable behavior.
- Use the smallest meaningful scenario set through rendered behavior, without a fixed scenario quota.
- Keep assertions compact but sufficient to detect a wrong observable outcome. Exercising statements or counting a call alone is not proof of correct state, event payload or submitted record. Avoid inventories unrelated to the behavior under test.
- Avoid duplicating Laravel/Inertia feature-test responsibilities.

## Test Depth

Prefer these scenario types:

- The component renders.
- One key item, section, row, or child component is present.
- One meaningful prop value or piece of local data is rendered.
- A key conditional state appears or disappears.
- A user interaction produces the intended visible state, emitted event/payload or relevant boundary call with the correct arguments.
- A formatter/helper/computed owned by the component is exercised through visible output.

Avoid these by default:

- Asserting every visible field in the fixture.
- Asserting every item in an action menu, tab list, table row, card, or mock-data array.
- Deep `toEqual` checks for full props/config objects when one representative value or call count proves the behavior.
- Exhaustive permutations of backend data.
- Re-testing authorization, routing, validation, resources, or database-backed formatting already covered by Laravel/Inertia feature tests.
- Brittle assertions on exact whitespace, punctuation-only formatting, generated class order, or implementation details that are invisible to users.
- Snapshot tests unless the repository already relies on them for the same purpose.

These are defaults, not assertion quotas. Compare a complete list/object when its exact contents are the contract. Existing backend coverage does not exempt component-owned permission visibility, route arguments or validation/error presentation; test those UI effects without recreating backend security or domain rules.

## Establish configuration and failure type

- Inspect existing CI/package scripts, Vitest configuration, environment/setup and relevant installed Vue, Test Utils, Vitest and coverage-provider versions. Use matching documentation/source for concrete API or instrumentation questions; do not upgrade dependencies to make examples fit.
- Establish coverage metrics (statements, lines, functions, branches), thresholds, included/excluded sources and whether gates apply per file, glob or project aggregate. Read the complete result and command exit state, not only one percentage or a passing target spec.
- For a reported failure, inspect the actual error/log first and distinguish assertions, configured coverage, config/dependency/environment problems and runner/cleanup failures. Do not edit specs, snapshots or app code for an infrastructure-only failure. Retry only within existing authority after assessing its cause; a successful retry needs no token change or commit.

## Workflow

1. Inspect the target component, source-backed behavior, existing sibling specs and configuration above.
2. Identify local executable statements: template conditionals, methods, helpers, computed values, event handlers, watchers, and emits.
3. Pick the smallest set of scenarios that proves the requested behavior, exercises those statements, and meets the applicable metrics/scope without artificial cases or missing contract assertions.
4. Mount with repository-standard helpers, plugins, stubs, and Inertia mocks.
5. Prefer asserting rendered output and emitted behavior over direct access to internals.
6. Within execution authorization, run the most targeted existing Vitest command with coverage for diagnosis. For final verification, use the scope required by actual coverage gates, including the full suite when aggregate requirements need it. If explicit user limits exclude that scope, retain them and report the unverified gate rather than weakening configuration or claiming compliance.
7. Address genuine test failures or meaningful coverage gaps within authorized scope, then rerun affected checks. Broaden only for applicable project requirements, new changes/failures or a concrete unresolved concern; stop once the behavior and required checks are satisfied.
8. Remove redundant inventory-style assertions while retaining the assertions that prove the behavior. Review the final diff for accidental application changes, weakened tests or altered coverage gates.

## Coverage Guardrails

- Keep test edits tied to the requested component/behavior. Broader execution can establish configured aggregate coverage without authorizing unrelated test/application changes.
- Branch, line or function coverage below 100% is acceptable only when it satisfies applicable user and repository requirements. Do not treat an unrequested metric as required, or silently waive one that CI requires.
- Do not leave named component-owned methods or meaningful callbacks unexercised; cover them through observable behavior.
- Inspect coverage attribution against the installed provider/compiler before treating generated render functions or inline handlers as application behavior. Avoid artificial tests for instrumentation artifacts, but do not ignore a configured function/branch gate because statements/lines passed.
- If a required gap appears coverable only through unrealistic setup, report the exact gap and tradeoff. Do not silently lower thresholds, change measured scope, add ignore comments/exclusions, skip tests or weaken assertions to hide it. A user-deferred check or documented gap is not a passing gate.
- Do not add production-only code, exported internals, or test-only hooks just to make coverage easier.
- Do not add dependencies without explicit approval.
- Do not add assertions only because a value appears in the fixture. Rendering the component already covers many template interpolation statements.
- For arrays such as menu items, tabs, or cards, prefer a count plus one representative assertion. Only assert every item when the user's requested behavior depends on the exact full list.

## Spec Style

- Follow existing spec naming and folder conventions.
- Keep fixtures small and local to the spec.
- Use descriptive scenario names in English.
- Prefer the smallest representative fixture set that expresses the meaningful states, rather than large factories or a fixed object count.
- Stub expensive child components only when they distract from the target component.
- Mock route helpers, Wayfinder functions, or Inertia globals only at the narrow boundary needed by the component.
- Keep assertions durable: text that matters, role/label when available, emitted events, and visible state.
- Keep each scenario compact. Replace prop checklists with the assertions that prove the important behavior, retaining all meaningful payload, state and boundary checks rather than enforcing an assertion count.

## Faithful boundaries and async isolation

- Resolve relevant real component props/events, `v-model`, scoped slots and form association before stubbing them. A stub must not invent forwarding, reset/success behavior or slots absent from the installed component. Mock only the boundary needed by the test; do not reproduce a framework lifecycle in a mock and call it proof of the real integration.
- When the behavior under test is the composition boundary itself, use the relevant real components or an existing focused integration helper where needed. Do not replace all children by default, or test the internals of unrelated children. A faithful unit stub still limits what can be claimed about teleportation, browser focus or real form submission.
- Await the actual Vue updates and promises involved in the assertion. Use installed-version-supported helpers and targeted timer advancement for real debounce/time behavior; avoid sleeps, arbitrary repeated flushes or increased timeouts to conceal a race.
- Follow existing setup/teardown to unmount wrappers and remove test-owned DOM/teleport nodes, and restore changed mocks/spies, timers/system time and global Test Utils/plugin configuration. Restore prior state rather than imposing new suite-wide defaults; do not remove resources owned by another test or a shared fixture. Report persistent order/timing dependence instead of masking it with retries.

## Pairing With Design Slices

When paired with `design-slice-inertia`:

- Keep the slice implementation focused first.
- Add specs only for the component/page requested by the user. Use [`design-slice-inertia`](../design-slice-inertia/SKILL.md) for the UI implementation contract.
- Do not use specs as a reason to broaden UI behavior beyond the agreed slice scope.
- Prefer a smoke-level spec plus the smallest meaningful interaction/data scenarios that prove the agreed behavior and satisfy the configured coverage requirements; smoke coverage alone is not acceptance evidence.

Use [`vue-components-mcp`](../vue-components-mcp/SKILL.md) for unresolved shared-component APIs in stubs, and [`laravel-seeding-patterns`](../laravel-seeding-patterns/SKILL.md) only when explicitly requested backend test fixtures need relational seed data. When the user defers checks, follow [`deferred-validation-development`](../../references/robuust-agents/skills/deferred-validation-development/SKILL.md).

## Output Requirements

When changing tests, report:

- target component/spec file and relevant assessed revision/content
- the important scenarios covered
- actual metrics and measured scope compared with applicable thresholds; distinguish target-file results from aggregate compliance
- command(s), result/exit state and relevant environment/provider limitations
- unresolved failures or unexecuted gates, classifying assertion/coverage/configuration/infrastructure gaps accurately

Keep the explanation concise. A completed test run does not establish real-browser behavior outside its environment, and passing test totals do not erase a runner/cleanup failure. This workflow does not authorize commits, pushes or publication.

## Task

$ARGUMENTS
