# Migrate from OpenClaw

`hermes claw migrate` imports an OpenClaw (or legacy Clawdbot / Moldbot) setup into Hermes: persona, memory, skills, model config, agent behavior, MCP servers, TTS, messaging platforms.

## Signature / Usage

```bash
hermes claw migrate                      # preview, then confirm
hermes claw migrate --dry-run            # preview only
hermes claw migrate --preset full --migrate-secrets --yes
hermes claw cleanup                      # rename leftover OpenClaw dirs to .pre-migration/
```

Reads `~/.openclaw/` by default; legacy `~/.clawdbot/` and `~/.moltbot/` (and `clawdbot.json` / `moltbot.json`) are detected automatically.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--dry-run` | flag | Preview only |
| `--preset <name>` | string | `full` (all compatible settings) or `user-data` (excludes infrastructure config); neither imports secrets by default |
| `--overwrite` | flag | Overwrite existing Hermes files on conflicts (default: refuse when the plan has conflicts) |
| `--migrate-secrets` | flag | Include API keys; required even with `--preset full` |
| `--no-backup` | flag | Skip the pre-migration zip of `~/.hermes/` (default `~/.hermes/backups/pre-migration-*.zip`, restorable with `hermes import`) |
| `--source <path>` | path | Custom OpenClaw directory |
| `--workspace-target <path>` | path | Where to place `AGENTS.md` |
| `--skill-conflict <mode>` | string | `skip` (default), `overwrite`, `rename` (`-imported` copy) |
| `--yes` | flag | Skip the confirmation prompt |

Key mappings (OpenClaw to Hermes):

| What | OpenClaw | Hermes |
|------|----------|--------|
| Persona | `workspace/SOUL.md` | `~/.hermes/SOUL.md` |
| Memory | `workspace/MEMORY.md`, `workspace/memory/*.md` | `~/.hermes/memories/MEMORY.md` (`§` delimiter, merged and deduped) |
| User profile | `workspace/USER.md` | `~/.hermes/memories/USER.md` |
| Skills (4 sources) | `workspace/skills/`, `~/.openclaw/skills/`, `~/.agents/skills/`, `workspace/.agents/skills/` | `~/.hermes/skills/openclaw-imports/` |
| Default model | `agents.defaults.model` | `config.yaml` `model` |
| Custom providers | `models.providers.*` | `custom_providers` (auto-migrated to `providers:`) |
| Max turns | `agents.defaults.timeoutSeconds` | `agent.max_turns` (`/10`, cap 200) |
| Reasoning effort | `agents.defaults.thinkingDefault` | `agent.reasoning_effort` |
| Compression | `agents.defaults.compaction.mode` / `.model` | `compression.enabled` / `compression.summary_model` |
| Exec timeout | `tools.exec.timeoutSec` | `terminal.timeout` |
| MCP servers | `mcp.servers.*` | `mcp_servers.*` (command / args / env / cwd / url / tools.include / tools.exclude) |
| Approval mode | `approvals.exec.mode` | `approvals.mode` (auto to off, always to manual, smart to smart) |
| Telegram | `channels.telegram.botToken` | `TELEGRAM_BOT_TOKEN` (plus `TELEGRAM_ALLOWED_USERS`) |
| Discord / Slack / Signal / Matrix / Mattermost | `channels.<platform>.*` | `DISCORD_BOT_TOKEN`, `SLACK_BOT_TOKEN`, `SLACK_APP_TOKEN`, `SIGNAL_ACCOUNT`, `MATRIX_ACCESS_TOKEN`, `MATTERMOST_BOT_TOKEN`, etc. |

Supported secret targets: `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `DEEPSEEK_API_KEY`, `GEMINI_API_KEY`, `ZAI_API_KEY`, `MINIMAX_API_KEY`, `ELEVENLABS_API_KEY`, `TELEGRAM_BOT_TOKEN`, `VOICE_TOOLS_OPENAI_KEY`.

Secret formats the migration resolves:

```json
"channels": { "telegram": { "botToken": "123456:ABC-DEF..." } }
"channels": { "telegram": { "botToken": "${TELEGRAM_BOT_TOKEN}" } }
"channels": { "telegram": { "botToken": { "source": "env", "id": "TELEGRAM_BOT_TOKEN" } } }
```

## Notes

- Always shows a full preview before applying. For Claude Code or OpenAI Codex CLI, use `hermes import-agent` instead.
- API key sources in priority order: config values, `~/.openclaw/.env`, `openclaw.json` `env` sub-object, `~/.openclaw/agents/main/agent/auth-profiles.json`. Keys outside the allowlist are never copied. SecretRefs with `source: "file"` or `"exec"` cannot be resolved; add them with `hermes config set`.
- Session idle/daily reset timers are not imported (Hermes conversations persist until `/new` or `/reset`).
- TTS settings are read from `messages.tts.providers.{provider}.*`, then `talk.providers.{provider}.*`, then legacy flat keys; assets copied to `~/.hermes/tts/`.
- Archived for manual review under `~/.hermes/migration/openclaw/<timestamp>/archive/`: `IDENTITY.md` (merge into `SOUL.md`), `TOOLS.md`, `HEARTBEAT.md` (use cron), `BOOTSTRAP.md`, cron jobs (`hermes cron create`), plugins, hooks (`hermes webhook`), memory backend (`hermes honcho`), skills registry, UI identity (`/skin`), logging, multi-agent list (use profiles), channel bindings.
- After migration: review the report, start a new session, `hermes status`, restart the gateway (`systemctl --user restart hermes-gateway`), re-pair WhatsApp (`hermes whatsapp`, QR pairing), then `hermes claw cleanup`.
- "OpenClaw directory not found": checks `~/.openclaw/`, `~/.clawdbot/`, `~/.moltbot/`; else use `--source`.
- If TTS voice not migrated: `hermes config set tts.elevenlabs.voice_id YOUR_VOICE_ID`.
- `hermes setup --portal` collapses a multi-provider setup into one OAuth.

## Related

- [use-soul-with-hermes](./use-soul-with-hermes.md)
- [run-hermes-with-nous-portal](./run-hermes-with-nous-portal.md)
