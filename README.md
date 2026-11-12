# dot-files

Personal Codex configuration. This repository's root maps directly to
`~/.codex`; the working checkout lives in that directory on the current Mac.

## Included files

- `config.toml`: current settings, MCP configuration, and local project settings.
- `AGENTS.md`: global agent instructions.
- `skills/`: user-installed skills and links to shared skills.
- `rules/` and `bin/`: local rules and helper scripts.
- `automations/*/automation.toml`: automation definitions.
- `git-instructions`: link to the shared Git instructions.

Shared skills and Git instructions remain symbolic links to
`/Users/joostwaaijer/Documents/workspace/robuust-agents`. Clone that repository
at the same location, or update those links when restoring on another machine.
The configuration also contains machine-specific absolute paths and references
to separately installed applications, plugins, and MCP servers.

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
