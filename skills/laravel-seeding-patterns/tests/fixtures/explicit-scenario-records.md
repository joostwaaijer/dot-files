# Explicit scenario records

Project: `bellezi-erp`

Pattern:
- Use dedicated seeders for named scenarios.
- Pass stable IDs, users, or seeded records into those seeders when the app depends on recognizable QA or demo data.

Expected fit:
- `callWith()` passes the scenario inputs explicitly.
- Factory chains remain readable inside the scenario seeder.
- Stable identifiers or names are acceptable when they are intentional seeded fixtures.
