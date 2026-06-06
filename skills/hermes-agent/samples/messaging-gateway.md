# Messaging Gateway

Run Hermes as a persistent bot on Telegram, Discord, Slack, and other platforms via the gateway service.

```bash
# Interactive platform configuration
hermes gateway setup

# Run in foreground (for testing)
hermes gateway

# Install as a background service
hermes gateway install          # Linux (systemd user) / macOS (launchd)
sudo hermes gateway install --system  # Linux boot-time service

# Service management
hermes gateway start
hermes gateway stop
hermes gateway status

# Stream logs
journalctl --user -u hermes-gateway -f   # Linux
tail -f ~/.hermes/logs/gateway.log        # macOS
```

```bash
# ~/.hermes/.env — example for Telegram
TELEGRAM_BOT_TOKEN=123456789:ABC...
TELEGRAM_ALLOWED_USERS=123456789,987654321
```

```yaml
# ~/.hermes/gateway.json — per-platform session reset
{
  "reset_by_platform": {
    "telegram": { "mode": "idle", "idle_minutes": 240 },
    "discord": { "mode": "idle", "idle_minutes": 60 }
  }
}
```

## Notes

- Allowlisting users via `TELEGRAM_ALLOWED_USERS` (or `DISCORD_ALLOWED_USERS`) is required; `GATEWAY_ALLOW_ALL_USERS=true` is not recommended for bots with terminal access.
- Unknown users who DM the bot receive a one-time pairing code; approve with `hermes pairing approve telegram <code>`.
- In-chat slash commands (`/new`, `/model`, `/compress`, `/background <prompt>`, etc.) work across all supported platforms.
- On macOS `hermes gateway install` writes a launchd plist to `~/Library/LaunchAgents/`.
