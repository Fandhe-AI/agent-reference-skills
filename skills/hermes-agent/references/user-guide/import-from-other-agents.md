# Import from Other Agents

`hermes import-agent` imports an existing Claude Code (`~/.claude`) or OpenAI Codex CLI (`~/.codex`) setup into Hermes. It is preview-first: a per-item plan is shown before anything is written, and `--dry-run` never touches disk.

## Signature / Usage

```bash
hermes import-agent                    # auto-detect ~/.claude or ~/.codex
hermes import-agent claude-code        # import from ~/.claude
hermes import-agent codex              # import from ~/.codex
hermes import-agent claude-code --dry-run          # preview only
hermes import-agent codex --source /path/to/.codex # custom location
hermes import-agent claude-code --overwrite --yes  # replace conflicts, skip prompts
hermes import-agent --sync            # re-import every changed source
hermes import-agent --sync --dry-run  # preview what a sync would do
```

## Options / Props

Claude Code mapping:

| Claude Code | Hermes |
|---|---|
| `CLAUDE.md` (global instructions) | Memory entries in `~/.hermes/memories/MEMORY.md` |
| `settings.json` -> `permissions.allow` (`Bash(...)` rules) | `command_allowlist` in `config.yaml` |
| `settings.json` -> `permissions.deny` (`Bash(...)` rules) | `approvals.deny` in `config.yaml` |
| `mcpServers` (from `~/.claude.json` and `settings.json`) | `mcp_servers` in `config.yaml` |
| `skills/<name>/` (dirs with `SKILL.md`) | `~/.hermes/skills/claude-code-imports/<name>/` |
| `commands/*.md` (slash commands) | Skipped with a note; convert them into skills |

Codex CLI mapping:

| Codex CLI | Hermes |
|---|---|
| `AGENTS.md` (global instructions) | Memory entries in `~/.hermes/memories/MEMORY.md` |
| `config.toml` -> `[mcp_servers.*]` | `mcp_servers` in `config.yaml` |
| `memories/*.md` | Memory entries in `~/.hermes/memories/MEMORY.md` |
| `skills/<name>/` (dirs with `SKILL.md`) | `~/.hermes/skills/codex-imports/<name>/` |

## Notes

- Claude's `Bash(npm run test:*)` prefix rules become `npm run test*` globs. Non-`Bash` rules (`Read(...)`, `WebFetch`, ...) are reported as unmapped.
- API keys and credential files (`~/.claude/.credentials.json`, `~/.codex/auth.json`) are never read; secret-looking MCP env vars/headers (`*_TOKEN`, `*_API_KEY`, `Authorization`) are stripped and listed in the report. Configure providers with `hermes setup` or `~/.hermes/.env`.
- Non-interactive sessions stop at the preview unless `--yes` is passed. Memory and allowlist/denylist merges deduplicate; existing MCP servers or skills are conflicts skipped unless `--overwrite`; malformed files become per-item errors.
- Sync: each import records its source digest in `~/.hermes/import-sync.json` (per profile). Unchanged sources are skipped; skills imported by `import-agent` are refreshed in place, while skills you modified are never clobbered. Credential-file changes never trigger a sync. `hermes profile create <name> --clone --sync-imports` carries the manifest over.
- Coming from OpenClaw: use `hermes claw migrate`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/import-from-other-agents (pinned to v0.22.2)

## Related

- [profiles.md](./profiles.md)
