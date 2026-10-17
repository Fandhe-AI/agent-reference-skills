# Import from Other Agents

Import an existing Claude Code (`~/.claude`) or OpenAI Codex CLI (`~/.codex`) setup into Hermes.

```bash
hermes import-agent                    # auto-detect ~/.claude or ~/.codex
hermes import-agent claude-code        # import from ~/.claude
hermes import-agent codex              # import from ~/.codex
hermes import-agent claude-code --dry-run          # preview only
hermes import-agent codex --source /path/to/.codex # custom location
hermes import-agent claude-code --overwrite --yes  # replace conflicts, skip prompts

# Pull in later changes from previously imported sources
hermes import-agent --sync
hermes import-agent --sync --dry-run
```

## Notes

- Preview-first: the plan is always printed before anything is written; non-interactive sessions stop at the preview unless `--yes` is passed.
- Claude Code: `CLAUDE.md` becomes memory entries in `~/.hermes/memories/MEMORY.md`; `permissions.allow` / `deny` `Bash(...)` rules become `command_allowlist` / `approvals.deny`; `mcpServers` become `mcp_servers`; skills go to `~/.hermes/skills/claude-code-imports/<name>/`. `commands/*.md` are skipped.
- Codex CLI: `AGENTS.md` and `memories/*.md` become memory entries; `[mcp_servers.*]` becomes `mcp_servers`; skills go to `~/.hermes/skills/codex-imports/<name>/`.
- API keys and credential files are never imported; secret-looking MCP env vars / headers are stripped and listed in the report. Configure providers with `hermes setup` or `~/.hermes/.env`.
- Existing MCP servers / skills are reported as conflicts and skipped unless `--overwrite`. The sync manifest is `~/.hermes/import-sync.json` (per profile). Coming from OpenClaw: use `hermes claw migrate`.
