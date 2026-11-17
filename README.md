# dot-files

Personal Codex configuration. This repository's root maps directly to
`~/.codex`; the working checkout lives in that directory on the current Mac.

## Included files

- `config.toml`: current settings, MCP configuration, and local project settings.
- `AGENTS.md`: global agent instructions.
- `skills/`: user-installed skills maintained as physical local copies.
- `agents/`: personal profiles and the supporting instruction references/template.
- `references/robuust-agents/`: reference-only snapshots of related guidance;
  these are not installed skills.
- `rules/` and `bin/`: local rules and helper scripts.
- `automations/*/automation.toml`: automation definitions.
- `git-instructions/`: physical local copies of the Git formatting instructions.
- `mcp/craft-twig-rules/`: local Craft/Twig rules MCP, documentation CLI and
  original tests. It requires Node.js 20 or newer and no npm dependencies.

The former shared-skill and Git-instruction symlinks were replaced with physical
copies of their current contents, including local customizations. Their source
was `/Users/joostwaaijer/Documents/workspace/robuust-agents`; edit and version
the copies in this repository from now on. Supporting policy references are
local too. Conditional guidance for intentionally uninstalled skills stays in
`references/robuust-agents/`, preserving those exclusions.
The Craft rules MCP and its fallback CLI are maintained in this repository too;
skill links and the `craft_twig_rules` configuration use this local copy. The
configuration still contains machine-specific absolute paths and references
to other separately installed applications, plugins, and MCP servers.

The local copies of `code-review`, `codebase-design`, `diagnosing-bugs`,
`domain-modeling`, `research`, `resolving-merge-conflicts`, and
`writing-for-agents` were installed from
[mattpocock/skills](https://github.com/mattpocock/skills) and customized for
personal use. They are now maintained directly in `skills/`; their former
`~/.agents/skills/` paths are no longer used. Original installation metadata
is retained in `skills/upstream-sources.json`.

The existing shared-skills automation calls `bin/sync-robuust-skills`. The script
now skips synchronization while `git-instructions/` is a physical local directory,
before pulling upstream, updating desktop Git settings or creating symlinks.
It leaves local copies and the existing Codex configuration intact. Review and
apply any future upstream updates manually. Do not use the shared repository's
`scripts/sync-local.sh` for this personal setup: it links shared skills and
overwrites the local `AGENTS.md`.

## Excluded files

The root allowlist in `.gitignore` excludes authentication files, credentials,
chat history, memories, databases, logs, caches, attachments, generated media,
worktrees, runner installations, execution records, and backups. Bundled system
skills and downloaded plugin files are also excluded. All existing local files
are retained on disk.

This is a configuration backup, not a complete backup of Codex's application
state. Sign in and install the required applications and plugins separately
when restoring. Keep credentials in the environment or the operating system's
credential store, and review diffs for secrets before pushing, even though the
repository is private.

## Manage changes

```sh
git -C ~/.codex status --short
git -C ~/.codex diff
git -C ~/.codex add <paths>
git -C ~/.codex commit -m "chore(codex): update configuration"
git -C ~/.codex push
```

To manage an additional file or directory, add an explicit exception to
`.gitignore` after reviewing its contents.
