# Messaging Gateway

A single background process that connects to all configured platforms (25+), handles sessions, runs cron jobs, delivers voice messages, and includes circuit breakers that automatically pause adapters during sustained platform outages.

## Signature / Usage

```bash
hermes gateway                         # Run in foreground
hermes gateway setup                   # Interactive configuration
hermes gateway install                 # Install as user service (Linux/macOS)
sudo hermes gateway install --system   # Install as boot-time service (Linux)
hermes gateway start/stop/status       # Manage running service
```

## Supported Platforms

Per the v0.22.2 Platform Comparison table: Telegram, Discord, Slack, Google Chat, WhatsApp, WhatsApp Cloud API, Signal, SMS, Email, Home Assistant (plugin), Mattermost, Matrix, DingTalk, Feishu/Lark, WeCom, WeCom Callback, Weixin, BlueBubbles, Photon (iMessage), QQ, Yuanbao, Microsoft Teams, LINE, ntfy, Raft, IRC, Buzz, SimpleX; plus API Server (OpenAI-compatible), Webhooks, and your browser. Hermes Relay (experimental) is a connector system that fronts Discord, Telegram, Slack, and WhatsApp through an external connector that owns the credentials; its capabilities are negotiated per connector at handshake.

Home Assistant moved to a catalog plugin in v0.22.0 (toolset `hermes-homeassistant` with `ha_list_entities`, `ha_get_state`, `ha_call_service`, `ha_list_services` comes from the `homeassistant` plugin). One multiplexed gateway per machine serving all profiles is the default in v0.22.0; `hermes update` folds per-profile gateways into it when nothing conflicts (the "one profile per workspace / one gateway per profile" guidance below describes the earlier model; a bot token still cannot be opened by two gateways).

### Messaging status in Desktop and the dashboard

Status belongs to the selected profile on the selected machine. Credentials saved by `hermes gateway setup` can enable a credential-based platform without a `platforms` entry; an explicit `platforms.<name>.enabled: false` still disables it (and wins over credentials left in `.env`). **Saved** means credentials are stored, not that the gateway is running or the platform connected.

### Intentional Silence Tokens

If the agent's final response is exactly one supported token (`[SILENT]`, `SILENT`, `NO_REPLY`, `NO REPLY`, or the Chinese renderings `[静默]` / `静默` / `[沉默]` / `沉默`; whitespace and case normalized), the gateway sends nothing. The silence turn stays in the transcript; failed turns still surface as errors. On a message from a person a bare token is replaced by a short notice.

### Gateway diagnostics

- `kill -USR2 <gateway pid>` (Linux/macOS) appends all thread stacks to `~/.hermes/logs/gateway_faulthandler.log`.
- An event-loop watchdog (`gateway.loop_watchdog_probe_interval_s` default 30, `gateway.loop_watchdog_max_strikes` default 3; `gateway.loop_watchdog: false` disables) dumps stacks, marks `gateway_state.json` degraded, and exits with code 75 so the supervisor restarts it. `hermes gateway status` reports degraded and stale-heartbeat states.
- Linux/systemd only: `gateway.systemd_watchdog_seconds: 120` makes the generated unit `Type=notify` with `WatchdogSec` (regenerate with `hermes gateway install --force`).

## Slack Setup (Socket Mode)

Slack runs over Socket Mode, so the host only needs **outbound** connectivity — no public URL, no inbound port, no request URL.

**Two tokens are required, and only one of them can come from a manifest.**

| Token | Env var | Where it comes from |
|-------|---------|---------------------|
| Bot token (`xoxb-`) | `SLACK_BOT_TOKEN` | OAuth & Permissions, after *Install to Workspace* |
| App-level token (`xapp-`) | `SLACK_APP_TOKEN` | Basic Information → App-Level Tokens → *Generate*, scope `connections:write`. **Cannot be created by a manifest — always a manual step.** |

In the app manifest, `socket_mode_enabled` and `event_subscriptions` belong **under `settings:`**. Placing them at the top level is rejected as an invalid schema.

```yaml
settings:
  event_subscriptions:
    bot_events: [app_mention, message.channels, message.groups, message.im, message.mpim, assistant_thread_started]
  socket_mode_enabled: true
```

### Slack troubleshooting

| Symptom (in gateway logs) | Cause | Fix |
|---------------------------|-------|-----|
| `apps.connections.open` → `invalid_auth` | App-level token is wrong, or lacks the `connections:write` scope | Regenerate the `xapp-` token with `connections:write` |
| `chat.postMessage` → `not_in_channel` | The bot is not a member of `SLACK_HOME_CHANNEL` | `/invite @<bot>` in that channel |

Test each token independently to tell them apart — a valid bot token with a broken app token looks like a total auth failure:

```bash
curl -s -X POST https://slack.com/api/auth.test \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN"            # bot token   → {"ok":true,...}
curl -s -X POST https://slack.com/api/apps.connections.open \
  -H "Authorization: Bearer $SLACK_APP_TOKEN"            # app token   → {"ok":true,"url":"wss://..."}
```

A healthy gateway is **quiet**: it prints its startup banner and then logs nothing. Verify by absence of errors plus an established socket, not by a "connected" line.

```bash
journalctl --user -u hermes-gateway-<profile> --no-pager -n 100 | grep -c invalid_auth   # → 0
ss -tnp | grep "pid=$(systemctl --user show hermes-gateway-<profile> -p MainPID --value)" # → ESTAB ... :443
```

## One Profile Per Workspace

A messaging bot token cannot be shared across profiles: if two gateways open the same token, the second one fails. Serving N Slack workspaces therefore means N profiles, each with its own `.env`, its own gateway, and its own systemd unit (`hermes-gateway-<profile>.service`; the default profile uses `hermes-gateway.service`).

```bash
hermes profile create <name> --clone      # inherits config.yaml / SOUL.md / skills from the active profile
# then write SLACK_BOT_TOKEN / SLACK_APP_TOKEN into ~/.hermes/profiles/<name>/.env
hermes --profile <name> gateway install --start-now --start-on-login
```

On a headless host (VM, container, LXC), enable linger or the user unit dies at logout:

```bash
sudo loginctl enable-linger "$USER"
```

## Platform Feature Comparison

| Platform | Voice | Images | Files | Threads | Reactions | Typing | Streaming |
|----------|-------|--------|-------|---------|-----------|--------|-----------|
| Telegram | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Slack | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Feishu/Lark | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mattermost | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| Matrix | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| WeCom | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| Weixin | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| Yuanbao | — | ✅ | ✅ | — | — | ✅ | ✅ |
| WhatsApp | — | ✅ | ✅ | — | — | ✅ | ✅ |
| Signal | — | ✅ | ✅ | — | — | ✅ | ✅ |
| Microsoft Teams | — | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| Google Chat | — | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| LINE | — | ✅ | ✅ | — | — | ✅ | ✅ |
| SimpleX Chat | — | ✅ | ✅ | — | — | — | — |
| BlueBubbles (iMessage) | — | ✅ | ✅ | — | — | — | — |
| QQ | — | ✅ | ✅ | — | — | — | — |
| Email | — | ✅ | ✅ | ✅ | — | — | — |
| SMS | — | — | — | — | — | — | — |
| Home Assistant | — | — | — | — | — | — | — |
| DingTalk | — | — | — | — | — | ✅ | ✅ |
| ntfy | — | — | — | — | — | — | — |

## Chat Commands

| Command | Description |
|---------|-------------|
| `/new` or `/reset` | Start a fresh conversation |
| `/model [provider:model]` | Display or switch the active model |
| `/provider` | List providers with authentication status |
| `/personality [name]` | Set conversation personality |
| `/retry` | Retry the last message |
| `/undo` | Remove the last exchange |
| `/status` | Show session information |
| `/stop` | Interrupt a running agent |
| `/approve` / `/deny` | Handle dangerous command prompts |
| `/sethome` | Set the primary notification channel |
| `/compress` | Compress conversation context |
| `/title [name]` | Set a session title |
| `/resume [name]` | Restore a previous session |
| `/usage` | Display token consumption |
| `/insights [days]` | Show usage analytics |
| `/reasoning [level\|show\|hide]` | Configure reasoning display |
| `/voice [on\|off\|tts\|join\|leave\|status]` | Control voice features |
| `/rollback [number]` | Restore filesystem checkpoints |
| `/bg <prompt>` (also `/background`) | Run an independent background task |
| `/btw <question>` | Ask a side question without interrupting the conversation |
| `/whoami` | Show your slash command access on this scope (admin / user / unrestricted) |
| `/sessions [all] [search <query>]` | List previous sessions (`all` is admin-only) |
| `/platform list\|pause <name>\|resume <name>` | Inspect and steer individual adapters without restarting the gateway |
| `/reload-mcp` | Refresh MCP servers |
| `/update` | Upgrade to the latest version |
| `/help` | Display the command list |
| `/<skill-name>` | Execute an installed skill |

## Session Management

Sessions persist conversation context across messages until you reset explicitly.

**Session continuity (retired in v0.22.0: idle/daily reset policies):** gateway conversations no longer reset after inactivity or at a daily boundary (the earlier `daily` 4:00 AM / `idle` 1440-minute defaults and `reset_by_platform` overrides are gone). Use `/new` or `/reset` for a new conversation; context compression stays automatic. Core ignores legacy `session_reset` settings, reset-policy overrides, and reset-timer environment variables; gateway startup and `hermes doctor` warn if `session_reset.mode` is still `idle`, `daily`, or `both`. To keep time-based resets, install the catalog plugin: `hermes plugins install hermes-session-reset-policy`.

- `/sessions` lists previous sessions for the current chat; `/sessions search <query>` filters by title or id.
- A `/model` switch persists across gateway restarts (credentials are re-resolved, never written); `/new` clears it; `/model <name> --global` writes through to `config.yaml`; `/model <name> --once` applies for one turn.
- Delivery reliability: final responses are recorded in a durable delivery ledger (`state.db`) and redelivered after a crash (at-least-once; mid-send replies get a "Recovered reply" prefix; 3 attempts, 24-hour freshness, delivered rows pruned after 7 days). Disable with `gateway.delivery_ledger: false`.

**Per-channel overrides** (`platforms.<name>.channel_overrides.<channel-or-thread-id>` with optional `model`, `provider`, `system_prompt`): lookup is exact id then parent channel; model priority is session `/model` override, then `channel_overrides`, then global config.

**Admins vs regular users** (per platform and per scope via `extra`): `allow_admin_from` admins run every slash command; `user_allowed_commands` lists what non-admins may run (floor: `/help`, `/whoami`); `group_allow_admin_from` / `group_user_allowed_commands` for group scope. If `allow_admin_from` is unset the split is disabled for that scope.

## Security

### Authorization

By default the gateway denies unauthorized users unless they are explicitly allowlisted or paired via DM.

```bash
# Environment variable allowlisting
TELEGRAM_ALLOWED_USERS=123456789,987654321
DISCORD_ALLOWED_USERS=123456789012345678
GATEWAY_ALLOWED_USERS=123456789,987654321
GATEWAY_ALLOW_ALL_USERS=true  # Not recommended for terminal-access bots
```

### DM Pairing

Unknown users who send a direct message receive a one-time pairing code. Codes expire after one hour and are cryptographically randomized.

```bash
hermes pairing list                          # View pending/approved users
hermes pairing approve telegram XKGH5N7P    # Approve by code
hermes pairing revoke telegram 123456789    # Revoke by user ID
```

## Background Sessions

Run independent tasks asynchronously without blocking the main chat. Each `/background` invocation spawns a separate agent instance with isolated session storage, inheriting the current model and provider configuration.

```
/background <prompt>
```

Results are delivered to the originating channel prefixed with "✅ Background task complete" or "❌ Background task failed".

**Notification frequency** in `~/.hermes/config.yaml`:

```yaml
display:
  background_process_notifications: all  # all | result | error | off
```

## Busy input, clarify, and tool progress

- Messaging a busy agent redirects its active turn by default (a foreground terminal command is moved to the background, not killed); `/stop` is a hard stop. Set `display.busy_input_mode: queue | steer | interrupt`; related keys `display.busy_ack_enabled`, `display.busy_text_debounce_seconds` (0.35), `display.busy_text_hard_cap_seconds` (1.0). `queue` gives each follow-up its own turn in arrival order; `steer` injects via `/steer` after the next tool call and falls back to queue if the agent has not started.
- `clarify` supports multi-select: reply with numbers separated by commas or spaces (e.g. `1, 3`), option text, or a free-form answer.
- `display.tool_progress: off | new | all | verbose | log`; `log` sends no chat bubbles and appends each tool call to `~/.hermes/logs/tool_calls.log` (5 MB x 3 backups, secrets redacted). `tool_progress_grouping: accumulate | separate`.
- `platforms.<name>.enabled: false` is authoritative over credentials in `.env`; `gateway.trust_env: false` ignores an inherited HTTP(S) proxy.

## Service Management

### Linux (systemd)

```bash
hermes gateway install                      # Install as user service
hermes gateway install --system             # Install as boot-time system service
journalctl --user -u hermes-gateway -f      # Stream logs
sudo loginctl enable-linger $USER           # Persist service after logout
```

### macOS (launchd)

```bash
hermes gateway install                      # Install as launchd agent
tail -f ~/.hermes/logs/gateway.log          # Stream logs
```

The plist is written to `~/Library/LaunchAgents/ai.hermes.gateway.plist` and includes `PATH`, `VIRTUAL_ENV`, and `HERMES_HOME` variables.

### Windows (Task Scheduler)

```powershell
hermes gateway install   # Register the Hermes_Gateway Scheduled Task (runs at logon)
hermes gateway start     # Start the gateway hidden, without a console window
hermes gateway stop      # Drain and stop the service
hermes gateway status    # Check status, including registration drift
```

The task runs `wscript.exe` on a generated `.vbs` launcher under `%USERPROFILE%\.hermes\gateway-service\` that starts `python.exe -m hermes_cli.main gateway run` hidden and exits immediately. `RestartOnFailure` covers only the launcher, not a gateway that crashes later; a gateway killed from outside stays down until `hermes gateway start` or `schtasks /Run /TN <task>`. `hermes gateway start` and `hermes update` re-register a task that predates the current template.

## Platform-Specific Toolsets

| Platform | Toolset | Capabilities |
|----------|---------|--------------|
| CLI | `hermes-cli` | Full access |
| Telegram | `hermes-telegram` | Full tools including terminal |
| Discord | `hermes-discord` | Full tools including terminal |
| Slack | `hermes-slack` | Full tools including terminal |
| All other messaging platforms | Various | Full tools including terminal |
| Home Assistant | `hermes-homeassistant` | Full tools + device control |
| API Server | `hermes` | Full tools including terminal |

## Notes

- `GATEWAY_ALLOW_ALL_USERS=true` is not recommended for bots with terminal access.
- Pairing codes expire after one hour; approve them promptly.
- Background tasks inherit the model/provider of the session that spawned them but run in fully isolated storage.
- On macOS, `hermes gateway install` writes a launchd plist; on Linux without `--system` it installs a systemd user unit.
- Circuit breakers automatically pause platform adapters during sustained outages and resume when the platform recovers.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging (pinned to v0.22.2)

## Related

- [Security](../security/security.md)
- [Voice Mode](../features/voice-mode.md)
- [Configuration](../configuration/configuration.md)
- [CLI Commands](../cli/commands.md)
