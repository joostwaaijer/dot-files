# Deepening

Assess whether changing a module cluster reduces evidenced caller complexity while preserving clear ownership. Use the vocabulary and source-backed design scope in [SKILL.md](SKILL.md). Retain the existing design when consolidation or another boundary would not improve the actual callers.

These are design options, not authorization to refactor or change tests. Apply only where the requested scope and observed complexity justify them. Test creation, changes, deletion, and execution follow the global opt-in policy.

## Dependency categories

Classify relevant dependencies to expose ownership, failure modes and verification needs. These categories inform options; they do not determine an architecture or a mandatory test double. Inspect existing clients, framework APIs, runtime setup and checks before adding a port, adapter or dependency.

### 1. In-process

Pure computation or in-memory state with no I/O can be a candidate for consolidation when it removes repeated caller knowledge. Preserve distinct responsibilities and valid mutations; no adapter is needed merely to combine logic.

### 2. Local-substitutable

An existing local stand-in may support some checks for a database, filesystem or other dependency. Its existence does not justify deepening or establish compatibility. Inspect which used semantics, constraints and failure cases it covers, and which require the actual runtime. Do not add a new tool or expose internal setup to callers merely because a stand-in is available.

### 3. Remote but owned

For owned services across a network boundary, inspect the existing producer/consumer contract, client and deployment ownership. Keep transport details out of callers when they do not own them, but add a port or adapter only when actual variation, policy or compatibility needs justify its cost. Supported framework clients and an established application boundary may already suffice. Consolidating code must not silently merge separately owned service responsibilities.

An in-memory adapter can exercise application logic against an assumed contract when justified. It does not establish network, protocol or deployed-service behavior; preserve the relevant integration verification goal separately.

### 4. Third-party external

For a third-party service, inspect its supported SDK/API and the application's existing integration. An application-owned boundary can be useful for policy, error mapping, compatibility or required variation, including with one implementation. A mock may exercise expected interactions but does not prove the provider's real behavior. Do not prescribe a custom port and mock for every external dependency.

## Seam discipline

- **Purpose before adapter counts.** State which caller knowledge, policy or variation a seam owns, what native alternative exists, and whether the benefit exceeds migration and maintenance cost. A test adapter must serve a real verification goal rather than supply an artificial second implementation.
- **Internal seams vs external seams.** A deep module can have internal seams (private to its implementation, used by its own tests) as well as the external seam at its interface. Don't expose internal seams through the interface just because tests use them.

## Preserve verification goals

- Writing, modifying, deleting or running tests requires explicit user authorization. Read existing checks as evidence when relevant without treating design work as permission to change them.
- For authorized test work, identify what existing checks protect before replacing or removing them. Module behavior, adapter integration and end-to-end outcomes can need distinct coverage even when some setup overlaps. Remove only demonstrably redundant coverage within the authorized scope.
- Prefer observable behavior through the relevant contract for new checks. Retain justified integration and internal verification boundaries instead of forcing every check through one enlarged module.
- A refactor can legitimately change setup, wiring or fixtures while preserving behavioral assertions. Inspect why a test changes; the change alone does not establish that it crossed the wrong boundary. Required expectations remain intact unless the user authorized a behavior change.
- State which guarantees stand-ins or mocks cover and which runtime/contract cases remain unverified. Proposed checks, passing static analysis and mock results are not proof of full behavior preservation. Do not add duplicate checks merely to claim more coverage.
