# Domain seeder plus post-create enrichment

Project: `kuipers-logistics-portal`

Pattern:
- Use a dedicated domain seeder from `DatabaseSeeder`.
- Allow a narrow post-create step only when the relation depends on already-seeded external or imported data.

Expected fit:
- `call()` or `callWith()` remains the orchestration layer.
- Most of the seeded graph still lives in factory chains.
- Post-create enrichment stays small and intentional.
