---
name: prototype
description: Build an exploratory prototype to answer a concrete question about logic, state, data shape, or UI alternatives before production implementation.
---

# Prototype

Build the smallest concrete artifact that helps the user resolve a design question. The deliverable is the exploration and what it establishes. A prototype request does not by itself authorize production implementation, commits, pushes, tracker updates, hosting or messages.

## Choose the question and artifact

Identify the question, relevant source requirements, accepted decisions and what the user needs to observe. Inspect the owning implementation and contracts when the question concerns an existing project. Resolve routine mechanics independently; ask only when ambiguity materially changes the question or deliverable. Use [domain-modeling](../domain-modeling/SKILL.md) for substantive domain choices and [codebase-design](../codebase-design/SKILL.md) for interface design, without requiring either workflow for a small sketch.

- For logic, state transitions or data shape, read [LOGIC.md](LOGIC.md).
- For layout, information hierarchy or interaction alternatives, read [UI.md](UI.md).

Use the available visualization skill for an in-chat interactive exploration when that fits the request. Prefer a standalone artifact when it must be exported or shared. Use the relevant Figma skills when the requested deliverable belongs in Figma, and existing frontend skills for an application-based prototype. Follow tool prerequisites from the current catalog rather than introducing another rendering toolchain. A fixed file format, route or number of variants is not required.

## Bound the experiment

For repository changes, confirm the authorized checkout, branch and local work before editing. Keep the artifact clearly identified as a prototype in the established prototype/scratch location or appropriate local context. Avoid changing production behavior merely to host an exploration. Reuse existing components and supported APIs; add no dependency without applicable user authorization. Keep scaffolding proportional to the question.

Use in-memory state and representative static data by default. Label simulated behavior, assumed rules and limitations so they cannot be mistaken for accepted requirements or backend guarantees. Live mutations, persistence and external services need their own task authority; a persistence question alone does not authorize changing a real database. Preserve existing access controls, routes and contracts in application-based work.

Make the prototype easy to open or run with the existing tools. Render the state or differences relevant to the decision in domain language. Avoid production abstractions and polish that do not help answer the question, while keeping controls usable and errors understandable enough for the exploration.

## Verify, learn and hand off

Use relevant formatting, static checks, builds and permitted visual inspection. A prototype request does not authorize writing, modifying or running tests, including automated interaction scenarios. Do not use a prototype as an executable bug reproduction without applicable test authorization. If test work is explicitly requested, keep it tied to the question and existing setup.

Report the artifact or preview, how to use it, the question it addresses, assumptions and observations, user feedback and accepted decisions where available, and what remains unverified. A runnable mock is not proof of real integration, accessibility conformance, performance or production readiness. If feedback has not arrived, leave the conclusion open rather than choosing on the user's behalf.

Capture accepted decisions in the existing authorized document or issue when that is in scope; otherwise include them in the handoff. Reuse the artifact as evidence without requiring a prototype branch or publication. Remove only run-owned temporary artifacts when appropriate, preserving work the user still needs to inspect. A chosen direction proceeds through the normal production workflow and its verification boundaries; do not promote exploratory code automatically. If production work is already authorized in the same objective, continue the settled portion without another generic approval round.

Adapted from Matt Pocock's `prototype`; see [provenance](../upstream-sources.json) and [MIT license](../upstream-licenses/mattpocock.txt).
