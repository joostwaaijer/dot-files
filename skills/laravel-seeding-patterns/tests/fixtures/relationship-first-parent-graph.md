# Relationship-first parent graph

Project: `haarhuis-portaal`
Pattern: parent model owns the seeded graph.

Expected fit:
- Start at `Project::factory(...)`.
- Attach child collections with `->has(...)`.
- Reuse existing belongs-to records with `->for(...)` inside the graph.
- Keep custom values in `->state([...])`.
