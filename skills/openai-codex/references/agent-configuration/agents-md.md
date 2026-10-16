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

## Code Review Rules

For Codex code review in GitHub, add a `## Code Review Rules` section to the `AGENTS.md` closest to the code the rules govern. Put repository-wide checks at the root and service-specific checks in a nested file.

```md
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

Keep rules concise, explain the behavior to flag and any safe path or exception, and reserve formatting and lint checks for CI.

## Customize fallback filenames

```toml
# ~/.codex/config.toml
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
project_doc_max_bytes = 65536
```

Restart Codex or run a new command so the updated configuration loads. Codex then checks each directory in this order: `AGENTS.override.md`, `AGENTS.md`, `TEAM_GUIDE.md`, `.agents.md`. Filenames not on the list are ignored for instruction discovery. Use a different profile with `CODEX_HOME`:

```bash
CODEX_HOME=$(pwd)/.codex codex exec "List active instruction sources"
```

## Verify your setup

- Run `codex --ask-for-approval never "Summarize the current instructions."` from a repository root. Codex should echo guidance from global and project files in precedence order.
- Use `codex --cd subdir --ask-for-approval never "Show which instruction files are active."` to confirm nested overrides replace broader rules.
- To audit which instruction files Codex loaded, opt into a plaintext TUI log with `codex -c log_dir=./.codex-log` and check `./.codex-log/codex-tui.log`, or inspect the most recent `session-*.jsonl` file if you enabled session logging.
- If instructions look stale, restart Codex in the target directory. The chain is rebuilt on every run (and at the start of each TUI session), so there is no cache to clear manually.

## Troubleshoot discovery issues

- **Nothing loads:** verify you are in the intended repository and that running `/status` in an interactive session reports the workspace root you expect. Codex ignores empty files.
- **Wrong guidance appears:** look for an `AGENTS.override.md` higher in the directory tree or under your Codex home; rename or remove it.
- **Codex ignores fallback names:** confirm the names are in `project_doc_fallback_filenames` without typos, then restart Codex.
- **Instructions truncated:** raise `project_doc_max_bytes` or split large files across nested directories.
- **Profile confusion:** run `echo $CODEX_HOME` before launching Codex; a non-default value points at a different home directory.

## Notes

- The official guide writes `codex status`; the CLI reference has no top-level `status` subcommand (only `codex login status`), so this page uses the interactive `/status` slash command.
- If Codex cannot find a project root, it only checks the current directory.
- Codex stops searching once it reaches your current directory, so place overrides as close to specialized work as possible. Use `~/.codex/AGENTS.override.md` for a temporary global override without deleting the base file.
- Raise the limit or split instructions across nested directories when you hit the `project_doc_max_bytes` cap. See https://agents.md for the AGENTS.md convention.

## Related

- [Rules](./rules.md)
- [Subagents](./subagents.md)
- [Prompting](./prompting.md)
