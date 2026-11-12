# Addsoft example: wireframes to model to implementation context

The user's Storec archive modeling chat (`01a186b6-33fe-72e1-9374-7fd548ca76a8`) and current model documentation were inspected on 2026-11-05 as an example of initialization. This is a project-specific pattern, not a portable set of business rules.

The original task requested a documented database model from Balsamiq, to serve later frontend slicing and backend development. It explicitly kept application implementation for later. The selected source was the V2 Storec / archive-only board; older boards and graveyard content were outside that model's scope.

Existing files in `/Users/joostwaaijer/Documents/workspace/addsoft-storec-archive`:

- `docs/CONTEXT.md`: domain terminology, including organization, branch and individual user as distinct concepts.
- `docs/DATABASE_MODEL.md`: sources/scope, screen-to-model mapping, existing foundation, relationships, proposed schema, constraints, frontend contracts, unresolved decisions and suggested construction order.
- `docs/DATABASE_ERD.md` and supporting diagram files: relationship overview tied to the textual model.

The reusable sequence is source/version selection → user journeys and data needs → settled terminology and business decisions → proposed model/contracts → dependency-aware implementation steps. Plain model text is primary context for agents; diagram source and rendered views support it.

For future work in this project, read these actual files and the current implementation/rules before planning changes. Their existence does not prove the proposed schema has been implemented or that every proposal is an accepted requirement. For other projects, reuse the method and source distinctions, not the Storec entities or access policies.
