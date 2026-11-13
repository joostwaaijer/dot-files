# Skill mechanics

Use alongside [SKILL.md](SKILL.md) when writing skills.

## Discovery and invocation

Keep the required `name` and `description` frontmatter. The description should identify the concrete capability and when it applies; remove catchalls and repeated trigger synonyms.

Preserve the skill's current invocation policy unless the user asks to change it. For Codex, `agents/openai.yaml` controls implicit invocation through `policy.allow_implicit_invocation`; the default is true. An existing false value keeps the skill available for explicit use without loading it automatically. Other harnesses may use fields such as `disable-model-invocation`; preserve existing compatibility metadata and verify the target harness before changing it.

Automatic discovery does not authorize side effects. Express task-specific publication, deletion, or other consequential boundaries in the workflow; do not disable discovery merely because a workflow can mutate data.

## References and routing

Keep purpose, essential constraints, and reference-selection conditions in the entrypoint. Put substantial conditional procedures in linked supporting files and read only the branch needed for the task. A short, self-contained skill does not need a router.

Shared reference material can be a plain linked file. Separate skills are useful when they have distinct invocation needs; a workflow router should recommend the smallest applicable path, not force every task through every stage. Check that referenced files and skills actually exist in the target environment.

Validate frontmatter, links, and metadata after editing. These static checks do not prove behavior; report that limit and run behavioral evaluations only when authorized.
