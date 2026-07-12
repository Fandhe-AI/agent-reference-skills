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

25+ platforms: Telegram, Discord, Slack, WhatsApp, Signal, SMS (Twilio), Email, Home Assistant, Mattermost, Matrix, DingTalk, Feishu/Lark, WeCom (Enterprise WeChat), Weixin, QQ, Yuanbao, Microsoft Teams, Google Chat, LINE, SimpleX Chat, BlueBubbles (iMessage), ntfy, Open WebUI, API Server (OpenAI-compatible), Webhooks.

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
| `/background <prompt>` | Run an independent background task |
| `/reload-mcp` | Refresh MCP servers |
| `/update` | Upgrade to the latest version |
| `/help` | Display the command list |
| `/<skill-name>` | Execute an installed skill |

## Session Management

Sessions persist conversation context across messages until reset.

**Reset policies:**

| Mode | Default | Behavior |
|------|---------|----------|
| `daily` | 4:00 AM | Resets once per day |
| `idle` | 1440 minutes | Resets after inactivity threshold |
| `both` | — | Whichever policy triggers first |

**Platform-specific overrides** in `~/.hermes/gateway.json`:

```json
{
  "reset_by_platform": {
    "telegram": { "mode": "idle", "idle_minutes": 240 },
    "discord": { "mode": "idle", "idle_minutes": 60 }
  }
}
```

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

## Related

- [Security](../security/security.md)
- [Voice Mode](../features/voice-mode.md)
- [Configuration](../configuration/configuration.md)
- [CLI Commands](../cli/commands.md)
