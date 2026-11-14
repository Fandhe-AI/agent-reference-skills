# Import from Other Agents

`hermes import-agent` imports an existing OpenClaw, Claude Code (`~/.claude`), OpenAI Codex CLI (`~/.codex`), Cursor (`~/.cursor`), Grok Bot or OpenBot setup into Hermes. It is preview-first: a per-item plan is shown before anything is written, and `--dry-run` never touches disk. The command comes from the official `agent-importers` plugin (NousResearch/hermes-official-plugins).

## Signature / Usage

Install the plugin once per profile:

```bash
hermes plugins install agent-importers
```

```bash
hermes import-agent                    # auto-detect ~/.openclaw, ~/.claude, ~/.codex or ~/.cursor
hermes import-agent openclaw           # import from ~/.openclaw (see the OpenClaw guide)
hermes import-agent claude-code        # import from ~/.claude
hermes import-agent codex              # import from ~/.codex
hermes import-agent cursor             # import from ~/.cursor
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

Cursor mapping:

| Cursor | Hermes |
|---|---|
| `AGENTS.md` (global instructions) | Memory entries in `~/.hermes/memories/MEMORY.md` |
| `rules/*.md`, `rules/*.mdc` (User Rules) | Memory entries in `~/.hermes/memories/MEMORY.md` |
| `mcp.json` -> `mcpServers` | `mcp_servers` in `config.yaml` |
| `skills/**/<name>/` (dirs with `SKILL.md`, category folders allowed) | `~/.hermes/skills/cursor-imports/<name>/` |

Grok Bot mapping (`hermes migrate grok-bot` / `hermes import-agent grok-bot --source <file>`):

| Grok Bot | Hermes |
|---|---|
| Routine on a schedule | Cron job `<Bot>: <routine>` with the same schedule, time zone and skills, created **paused** |
| Routine on an event (Slack, GitHub, email, webhook, ...) | Its instruction and trigger saved to `grok-bot-import/<bot>-event-routines.md` to rebuild |
| Skills | `skills/grok-bot-imports/<name>/` |
| What the Bot remembers / facts about you | `memories/MEMORY.md` / `memories/USER.md` |
| The Bot's role | `SOUL.md` while it still holds Hermes' default, else memory entries |
| Apps with a remote MCP URL | `mcp_servers` in `config.yaml` |

## Notes

- Entry points: on a fresh install `hermes setup` checks for `~/.openclaw` (or legacy `~/.clawdbot` / `~/.moltbot`), `~/.claude`, `~/.codex`, `~/.cursor`, the Grok Bot desktop app (or a `grok-bot-export*` file in `~/Downloads`) and OpenBot, offers the import, and installs `agent-importers` if you say yes (OpenClaw is passed `--migrate-secrets`). Already set up: `hermes migrate`, or `hermes migrate <agent>` (`openclaw`, `claude-code`, `codex`, `cursor`, `grok-bot`, `openbot`).
- OpenClaw has its own guide (Migrate from OpenClaw) with `--preset`, `--migrate-secrets`, `--workspace-target`, `--skill-conflict`, a pre-migration backup and `hermes claw cleanup`; `hermes claw migrate` still runs the same import. OpenClaw is the one exception to "API keys are never imported": allowlisted API keys and bot tokens come over only with `--migrate-secrets`.
- Cursor: `.mdc` frontmatter (`description`, `globs`, `alwaysApply`) is stripped, only the rule body is imported; two same-named skills in different folders are reported as a conflict; `~/.cursor/cli-config.json` is never read.
- Grok Bot: no export button, so each Bot exports itself (run `hermes migrate grok-bot` with no export to get a message to paste into a Bot's chat; it writes `grok-bot-export.json`). Routines arrive paused: `hermes cron resume <id>` or `--activate-routines`; `hermes cron edit <id> --deliver telegram` redirects output. An export carrying credential-looking keys is refused.
- OpenBot: `hermes migrate openbot` reads the desktop app's `openbot.db` (read-only) and each agent's workspace under `~/OpenBot/Agents`; routines become paused cron jobs, the description becomes `SOUL.md` (or memory entries), memories go to `memories/MEMORY.md`, workspace skills to `skills/openbot-imports/`, MCP servers to `config.yaml` with secret-looking env vars stripped. `--bot <name>` picks agents; chats and provider accounts stay in OpenBot.

- Claude's `Bash(npm run test:*)` prefix rules become `npm run test*` globs. Non-`Bash` rules (`Read(...)`, `WebFetch`, ...) are reported as unmapped.
- API keys and credential files (`~/.claude/.credentials.json`, `~/.codex/auth.json`) are never read; secret-looking MCP env vars/headers (`*_TOKEN`, `*_API_KEY`, `Authorization`) are stripped and listed in the report. Configure providers with `hermes setup` or `~/.hermes/.env`.
- Non-interactive sessions stop at the preview unless `--yes` is passed. Memory and allowlist/denylist merges deduplicate; existing MCP servers or skills are conflicts skipped unless `--overwrite`; malformed files become per-item errors.
- Sync: each import records its source digest in `~/.hermes/import-sync.json` (per profile). Unchanged sources are skipped; skills imported by `import-agent` are refreshed in place, while skills you modified are never clobbered. Credential-file changes never trigger a sync. `hermes profile create <name> --clone --sync-imports` carries the manifest over.
- Sync manifest covers Claude Code, Codex CLI and Cursor imports only.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/import-from-other-agents (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): `hermes import-agent` and `hermes claw` moved out of Hermes core into the official `agent-importers` plugin; commands, flags and `import-sync.json` are unchanged. Profiles with a registered sync source get the plugin installed automatically by `hermes update` (or on first start, honouring `security.allow_lazy_installs`; removing it with `hermes plugins remove agent-importers` keeps it removed). Others install it when needed: `hermes setup` offers it, and running `hermes import-agent` / `hermes claw` without it prints the install command.

## Related

- [profiles.md](./profiles.md)
