# Parameterized sub-seeders

Project: `zusters-van-denekamp`
Pattern: `DatabaseSeeder` orchestrates staged seeders and passes seeded records onward.

Expected fit:
- Seed upstream domain data first.
- Pass collections or records into later seeders with explicit parameters.
- Keep downstream seeders focused on one domain slice.
- Let the receiving seeder continue using factory graphs internally.
