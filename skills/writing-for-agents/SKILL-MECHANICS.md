# Skill mechanics

Use alongside [SKILL.md](SKILL.md) when writing skills.

## Discovery and invocation

Keep the required `name` and `description` frontmatter. The description should identify the concrete capability and when it applies; remove catchalls and repeated trigger synonyms.

Preserve the skill's current invocation policy unless the user asks to change it. For Codex, `agents/openai.yaml` controls implicit invocation through `policy.allow_implicit_invocation`; the default is true. An existing false value keeps the skill available for explicit use without loading it automatically. Other harnesses may use fields such as `disable-model-invocation`; preserve existing compatibility metadata and verify the target harness before changing it.

Automatic discovery does not authorize side effects. Express task-specific publication, deletion, or other consequential boundaries in the workflow; do not disable discovery merely because a workflow can mutate data.

Check the actual target harness and owning configuration before changing invocation or metadata. Do not transplant fields, tool arguments or defaults from another runtime. Preserve unrelated UI, dependency, compatibility and policy fields during focused edits; a metadata generator may replace more than the requested field. Follow its real update contract rather than silently regenerating away existing settings.

## References and routing

Keep purpose, essential constraints, and reference-selection conditions in the entrypoint. Put substantial conditional procedures in linked supporting files and read only the branch needed for the task. A short, self-contained skill does not need a router.

Shared reference material can be a plain linked file. Separate skills are useful when they have distinct invocation needs; a workflow router should recommend the smallest applicable path, not force every task through every stage. Check that referenced files and skills actually exist in the target environment.

## Validation and tool limits

Validate frontmatter, metadata, local links/anchors and the final diff against the actual managed source and target environment. Check both the modified entrypoint and affected callers/references; avoid expanding a small edit into an unrelated repository audit.

For personal skills, use [bin/validate-skills](../../bin/validate-skills) with the relevant directories:

```sh
~/.codex/bin/validate-skills ~/.codex/skills/research ~/.codex/skills/writing-for-agents
```

The command uses `uv` and pinned PyYAML in an isolated script environment; initial dependency setup may require network access. It reuses the installed skill-creator frontmatter validator and checks optional UI/invocation metadata, local inline Markdown links and ATX heading fragments, and applicable adaptation records in `skills/upstream-sources.json`. It is read-only, requires at least one explicit directory, and returns nonzero on errors. Keep the managed `.system` validator unchanged.

Reference-style links, full Markdown rendering, non-Markdown fragments and the complete runtime metadata schema are outside this command's coverage. Inspect those manually when relevant, and compare the diff for preserved policies.

When a validator rejects a field such as an existing `compatibility` key, inspect its schema/allowlist and the target harness contract before deciding the artifact is wrong. Do not discard metadata or modify the validator merely to obtain a pass, and do not assume every failure is a tool defect. Use a suitable validator when available; otherwise perform focused YAML/type/required-field, reference and metadata-preservation checks. Retain unverified compatibility as a stated limitation rather than claiming target support or a successful standard validation.

Report which validator/checks ran, what passed, and any unsupported schema or skipped check. Static checks establish structure and preservation evidence, not runtime invocation or behavioral quality. Run behavioral evaluations only when authorized, following the entrypoint's evaluation limits; do not create test scripts or delegate an evaluation merely because instructions changed.
