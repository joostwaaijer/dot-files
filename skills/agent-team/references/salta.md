# Salta application of the roadmap workflow

This is a scoped recipe derived from the user's actual Salta coordination. It is not a universal project policy or a snapshot of current branches, PR state, or deployments. Read the live project instructions and authoritative artifacts before acting.

## Existing context

- Coordinator chat: `01a1814a-3381-7fc2-8e8e-492c61d92742`, host `local`.
- Craft checkout: `/Users/joostwaaijer/Documents/workspace/salta`.
- Laravel/Inertia checkout: `/Users/joostwaaijer/Documents/workspace/salta-inertia`.
- Roadmap source: `docs/migration-matrix.md` in Laravel/Inertia; supporting native behavior and contracts live in Craft code and templates.

The inspected step-29 handoff assigns one clean task chat a coherent product-detail increment spanning both repositories. It names the native contract, producer/consumer ownership, source paths, base revisions, scope, checks, and coordinator reporting. Reuse that structure; do not reuse its historical branch or revision values.

## Carry the load-bearing decisions

Craft owns domain/content/Commerce behavior, selection and native output. Laravel/Inertia exposes contracts and a thin integration layer; Vue renders the agreed minimal shell. Inspect the existing owner before adding transport logic, state, fallback behavior, or a parallel engine.

During the backend roadmap, keep new frontend work minimal and unstyled unless the user changes scope. Keep existing Craft translations authoritative, including the required storefront languages where applicable. Do not broaden an increment to neighboring product families, caches, routing, or infrastructure without a concrete requirement.

Read the actual current rules through their required mechanisms. Current repository instructions and direct user decisions govern; this recipe does not replace them.

## Authorization is scoped

The existing Salta roadmap carries standing user authorization for relevant Laravel/PHP test additions, updates, and execution at the end of a slice before PR publication. Carry its actual source and limits into applicable handoffs. It does not grant Craft/Vue test work, publication, commits, pushes, merges, deployment, migrations, content changes, or runtime activation.

Preserve any later direct authorization when it arrives. A task that is authorized for publication should use its actual repository PR workflow rather than request the same permission again.

## Coordinate completion

Use a new clean chat per agreed slice under the user's standing roadmap instruction. Include the coordinator ID and the standing authorization to send one completion report or material blocker. The task reports actual behavior, checks and gaps, local state, PRs and live merge status, then lets the coordinator assign the next slice.

Verify every required Craft/Laravel PR before the next dependent task. When rollout depends on a Craft code/schema/permission change, record and verify the producer rollout before the consumer uses it if that gate is required. Keep deployment and acceptance separate from merge. One successful hosted case does not establish all four storefronts, browser behavior, or production acceptance.

The checked coordinator history also shows useful blocker handling: continue host checks while Docker is unavailable, avoid interrupting shared infrastructure without the required authority, and replace a pending deployment observation with later confirmed evidence. Those are recovery patterns, not permanent environment facts.
