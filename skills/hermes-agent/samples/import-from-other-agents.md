# Import from Other Agents

Import an existing OpenClaw (`~/.openclaw`), Claude Code (`~/.claude`), OpenAI Codex CLI (`~/.codex`) or Cursor (`~/.cursor`) setup into Hermes.

```bash
# Once per profile: the command comes from the official agent-importers plugin
hermes plugins install agent-importers

hermes import-agent                    # auto-detect ~/.openclaw, ~/.claude, ~/.codex or ~/.cursor
hermes import-agent claude-code        # import from ~/.claude
hermes import-agent codex              # import from ~/.codex
hermes import-agent cursor             # import from ~/.cursor
hermes import-agent claude-code --dry-run          # preview only
hermes import-agent codex --source /path/to/.codex # custom location
hermes import-agent claude-code --overwrite --yes  # replace conflicts, skip prompts

# Pull in later changes from previously imported sources
hermes import-agent --sync
hermes import-agent --sync --dry-run
```

## Notes

- Preview-first: the plan is always printed before anything is written; non-interactive sessions stop at the preview unless `--yes` is passed.
- Plugin (v0.23): `hermes import-agent` and `hermes claw` moved out of core into the official `agent-importers` plugin; without it both print the install line. `hermes migrate` (bare) detects another agent's setup and offers to import it, and `hermes migrate <agent>` (`openclaw`, `claude-code`, `codex`, `cursor`, `grok-bot`, `openbot`) installs the plugin when missing and runs the import. On a fresh install, `hermes setup` offers the same step.
- Claude Code: `CLAUDE.md` becomes memory entries in `~/.hermes/memories/MEMORY.md`; `permissions.allow` / `deny` `Bash(...)` rules become `command_allowlist` / `approvals.deny`; `mcpServers` become `mcp_servers`; skills go to `~/.hermes/skills/claude-code-imports/<name>/`. `commands/*.md` are skipped.
- Codex CLI: `AGENTS.md` and `memories/*.md` become memory entries; `[mcp_servers.*]` becomes `mcp_servers`; skills go to `~/.hermes/skills/codex-imports/<name>/`.
- Cursor: `AGENTS.md` and `rules/*.md` / `rules/*.mdc` become memory entries (`.mdc` frontmatter is stripped); `mcp.json` `mcpServers` becomes `mcp_servers`; skills go to `~/.hermes/skills/cursor-imports/<name>/`.
- API keys and credential files are never imported (OpenClaw's allowlisted keys come over only with `--migrate-secrets`); secret-looking MCP env vars / headers are stripped and listed in the report. Configure providers with `hermes setup` or `~/.hermes/.env`.
- Existing MCP servers / skills are reported as conflicts and skipped unless `--overwrite`. The sync manifest is `~/.hermes/import-sync.json` (per profile) and covers Claude Code, Codex CLI and Cursor imports.
- Migrate from v0.22: coming from OpenClaw, `hermes claw migrate` still works and is the same as `hermes import-agent openclaw` (see the OpenClaw migration reference).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/import-from-other-agents (pinned to v0.23.1)
