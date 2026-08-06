# Custom Instructions with AGENTS.md

Codex reads `AGENTS.md` files before doing any work, layering global guidance with project-specific overrides so every task starts with consistent expectations.

## Signature / Usage

```md
# ~/.codex/AGENTS.md

## Working agreements

- Always run `npm test` after modifying JavaScript files.
- Prefer `pnpm` when installing dependencies.
- Ask for confirmation before adding new production dependencies.
```

```bash
codex --ask-for-approval never "Summarize the current instructions."
```

## How Codex discovers guidance

Codex builds an instruction chain once per run (once per TUI session), in this precedence order:

1. **Global scope**: in the Codex home directory (`~/.codex`, or `$CODEX_HOME`), Codex reads `AGENTS.override.md` if present, otherwise `AGENTS.md`. Only the first non-empty file at this level is used.
2. **Project scope**: starting at the project root (typically the Git root), Codex walks down to the current working directory. In each directory it checks `AGENTS.override.md`, then `AGENTS.md`, then any names in `project_doc_fallback_filenames`, including at most one file per directory.
3. **Merge order**: files are concatenated from the root downward, joined by blank lines. Files closer to the current directory override earlier guidance because they appear later in the combined prompt.

Codex skips empty files and stops adding files once the combined size reaches `project_doc_max_bytes` (32 KiB by default).

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `project_doc_max_bytes` | number (config.toml) | Byte limit for the combined instruction chain (default 32 KiB). |
| `project_doc_fallback_filenames` | string[] (config.toml) | Alternate filenames (e.g. `TEAM_GUIDE.md`) treated as instructions files when `AGENTS.md` is absent. |
| `CODEX_HOME` | env var | Overrides the Codex home directory (default `~/.codex`), enabling alternative profiles. |
| `AGENTS.override.md` | file | Takes precedence over `AGENTS.md` in the same directory; useful for temporary overrides. |

## Notes

- Add a `## Code Review Rules` section to the `AGENTS.md` closest to the governed code to customize [Codex code review in GitHub](https://learn.chatgpt.com/docs/third-party/github); keep rules concise with a stated safe path/exception and leave formatting/lint checks to CI.
- Set `CODEX_HOME` to point Codex at a different home directory (e.g. a project-specific automation profile).
- Verify the active chain with `codex --ask-for-approval never "Summarize the current instructions."`, or audit loaded files via `codex -c log_dir=./.codex-log` and `./.codex-log/codex-tui.log`.
- If instructions look stale, restart Codex in the target directory; there is no manual cache since the chain rebuilds every run.

## Related

- [Rules](./rules.md)
- [Subagents](./subagents.md)
- [Prompting](./prompting.md)
