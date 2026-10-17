# Team Telegram Assistant

Tutorial: set up a Hermes-powered Telegram bot that multiple team members can use, with per-user sessions and authorization.

## Signature / Usage

1. Create the bot with @BotFather (`/newbot`; username must end in `bot`), copy the token.
2. Configure the gateway: `hermes gateway setup` (interactive) or edit `~/.hermes/.env`:

```bash
TELEGRAM_BOT_TOKEN=7123456789:AAH1bGciOiJSUzI1NiIsInR5cCI6Ikp...
TELEGRAM_ALLOWED_USERS=123456789
```

3. Start and install as a service:

```bash
hermes gateway                       # foreground test
hermes gateway install               # user service (systemd / launchd)
sudo hermes gateway install --system # Linux boot-time system service
hermes gateway status
```

4. Team access, either a static allowlist or DM pairing:

```bash
TELEGRAM_ALLOWED_USERS=123456789,987654321,555555555

hermes pairing approve telegram XKGH5N7P
hermes pairing list
hermes pairing revoke telegram 987654321
hermes pairing clear-pending
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TELEGRAM_BOT_TOKEN` | env | Bot token from BotFather |
| `TELEGRAM_ALLOWED_USERS` | env | Comma-separated numeric Telegram user IDs |
| `TELEGRAM_HOME_CHANNEL` | env | Chat ID that receives cron results and proactive messages |
| `TELEGRAM_HOME_CHANNEL_NAME` | env | Display name of the home channel |
| `display.tool_progress` | config.yaml | `off` / `new` / `all` / `verbose` |
| `TERMINAL_ENV` | env | Terminal backend, e.g. `docker` |
| `TERMINAL_DOCKER_IMAGE` | env | Docker image, e.g. `nousresearch/hermes-sandbox:desktop` |

Log and data locations:

| What | Location |
|------|----------|
| Gateway logs | `journalctl --user -u hermes-gateway` (Linux) or `~/.hermes/logs/gateway.log` (macOS) |
| Cron job output | `~/.hermes/cron/output/{job_id}/{timestamp}.md` |
| Cron job definitions | `~/.hermes/cron/jobs.json` |
| Pairing data | `~/.hermes/pairing/` |
| Session history | `~/.hermes/sessions/` |

## Notes

- Run on a server or VPS, not a laptop; the bot must stay up.
- Use numeric user IDs (via @userinfobot), not @usernames.
- Never set `GATEWAY_ALLOW_ALL_USERS=true` on a bot with terminal access.
- Pairing: codes expire after 1 hour; rate limit 1 request per user per 10 minutes, max 3 pending codes per platform; 5 failed approvals cause a 1-hour lockout; data stored `chmod 0600`. Approvals apply without a gateway restart.
- Keep the bot token secret; `/revoke` in BotFather rotates it.
- `/sethome` in a chat sets the home channel; without one, scheduled tasks have nowhere to deliver.
- On macOS the launchd plist captures PATH at install time; re-run `hermes gateway install` after installing new tools.
- On Linux, `sudo loginctl enable-linger $USER` keeps the user service running after SSH logout.
- Use the Docker terminal backend on shared bots so commands run in a container. Config form: `terminal.backend: docker`, `container_cpu: 1`, `container_memory: 5120`, `container_persistent: true`.
- `/update` from Telegram pulls the latest version and restarts; or `hermes update`.
- Cron prompts run in fresh sessions; include all context.
- Source: https://hermes-agent.nousresearch.com/docs/guides/team-telegram-assistant (pinned to v0.22.2)

## Related

- [use-soul-with-hermes](./use-soul-with-hermes.md)
- [daily-briefing-bot](./daily-briefing-bot.md)
- [automate-with-cron](./automate-with-cron.md)
