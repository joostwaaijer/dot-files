# Attached relations with pivot data

Project: `nzo-elearning`
Pattern: many-to-many seed data is part of the main seeded shape.

Expected fit:
- Prefer `->hasAttached(...)` when pivot attributes matter.
- Keep attached relations inside the factory chain.
- Combine with named factory states when the scenario needs passed and failed variants.
