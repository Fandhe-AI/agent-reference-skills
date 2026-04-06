# Messaging Gateway

A single background process that connects to all configured platforms, handles sessions, runs cron jobs, and delivers voice messages.

## Signature / Usage

```bash
hermes gateway                         # Run in foreground
hermes gateway setup                   # Interactive configuration
hermes gateway install                 # Install as user service (Linux/macOS)
sudo hermes gateway install --system   # Install as boot-time service (Linux)
hermes gateway start/stop/status       # Manage running service
```

## Supported Platforms

Telegram, Discord, Slack, WhatsApp, Signal, SMS (Twilio), Email, Home Assistant, Mattermost, Matrix, DingTalk, Feishu/Lark, WeCom (Enterprise WeChat), Open WebUI.

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
| WhatsApp | — | ✅ | ✅ | — | — | ✅ | ✅ |
| Signal | — | ✅ | ✅ | — | — | ✅ | ✅ |
| Email | — | ✅ | ✅ | ✅ | — | — | — |
| SMS | — | — | — | — | — | — | — |
| Home Assistant | — | — | — | — | — | — | — |
| DingTalk | — | — | — | — | — | ✅ | ✅ |

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

## Related

- [Security](../security/security.md)
- [Voice Mode](../features/voice-mode.md)
- [Configuration](../configuration/configuration.md)
- [CLI Commands](../cli/commands.md)
