# Craft/Twig Rules MCP

A dependency-free MCP for path-scoped project rules and targeted documentation lookups in Craft/Twig projects. It has no Craft, Yii, or Laravel bootstrap or runtime dependency.

This physical copy is maintained in the personal dot-files repository. It was copied from `robuust/robuust-agents` at commit `600373745502ddb7f3897be7e33afa89b11d7620`; that checkout is not needed to run it. Node.js 20 or newer is required, with no npm installation step.

## MCP tools

Run `node bin/mcp.mjs` as a stdio MCP server. Its tools require an explicit `projectRoot`:

- `find-rules` returns rules whose glob matches a target path.
- `list-rules` reads `.ai/rules/index.md`.
- `record-rule` writes one approved rule and maintains the glob index. It rejects duplicate glob/title and glob/note pairs.
- `update-rule` updates one approved rule identified by its current glob and title. It can change the glob, title, note, or any combination of them.
- `remove-rule` removes one approved rule identified by its glob and title, deleting its Markdown file when no rules remain in it.
- `search-craft-docs` searches the current Craft CMS 5 documentation and returns small, topic-specific excerpts. It verifies the project's Craft major through `composer.json` and `composer.lock` when available.
- `search-tailwind-docs` searches relevant pages in the current official Tailwind CSS v4 documentation source and returns excerpts with public documentation URLs and commit-pinned source URLs. It verifies the project's Tailwind major through `package.json` and the installed package when available.

Rules are deliberately project-local and versioned with the project. The index is the discovery surface; rule files contain short imperative rules only.

## Rule lifecycle

- For a known target path, call `find-rules` before inspecting, changing, executing, or advising about it. Executable paths such as `bin/seed` count as target paths.
- For a repository-wide action or when target paths are not yet known, call `list-rules` first and apply every `**` rule.
- Re-check newly introduced paths with `find-rules` before acting on them.
- Call `record-rule`, `update-rule`, or `remove-rule` only after explicit user approval.
- Changes under `.ai/rules` are read dynamically and do not require an MCP server restart.
- MCP code or initialization-instruction changes require a fresh Codex session.

MCP instructions guide model behavior; they are not a hard security boundary for command execution.

## Convention inference

Use the reference-only [`infer-craft-conventions`](../../references/robuust-agents/skills/infer-craft-conventions/SKILL.md) guidance. It is evidence-first and confirm-before-record: every proposal needs at least three consistent examples and no meaningful rival. It classifies every inspected dimension as `pattern`, `conflict`, `default`, `no signal`, `tooling-owned`, or `already-recorded`.

## Craft documentation

Call `search-craft-docs` with `projectRoot` and a concrete query only for Craft CMS, Yii, or Craft/Twig API questions. The tool uses the [Craft documentation index](https://craft-llms.netlify.app/llms.txt) internally, searches `llms-full.txt` without returning the complete document, and reports the project's declared and locked Craft versions plus the documentation commit.

The CLI uses the same search implementation: `node bin/search-craft-docs.mjs [--project-root /path/to/project] <query>`. It defaults to the current working directory.

## Tailwind documentation

Call `search-tailwind-docs` with `projectRoot` and a concrete query before judging Tailwind v4 syntax or recommendations. The tool reads only the official [`tailwindlabs/tailwindcss.com`](https://github.com/tailwindlabs/tailwindcss.com) documentation source, pins every result to the fetched commit, and reports the declared and installed Tailwind versions. It rejects projects whose Tailwind major cannot be verified as v4.

The public Tailwind documentation follows the current v4 release rather than publishing per-minor snapshots. Treat the returned project version and documentation commit as part of the evidence when evaluating features introduced in a later v4 minor.

## Documentation routing

- Use `search-craft-docs` only for a concrete Craft CMS, Yii, or Craft/Twig API question.
- Use `search-tailwind-docs` only for a concrete Tailwind CSS v4 syntax or recommendation question.
- Call both only when the task genuinely spans both framework surfaces.
- Call neither for repository-only evidence such as duplication, naming, ownership, or existing usage.

## Local Codex activation

The personal [Codex configuration](../../config.toml) registers `craft_twig_rules` against this repository's `bin/mcp.mjs`. When restoring without that configuration, register the local stdio MCP once per machine:

```sh
codex mcp add craft_twig_rules -- node "$HOME/.codex/mcp/craft-twig-rules/bin/mcp.mjs"
```

Use `codex mcp get craft_twig_rules` to verify the registration, then start a new Codex session. MCP tools are discovered when a session starts.
