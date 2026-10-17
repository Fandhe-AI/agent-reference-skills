# Cron Troubleshooting

Diagnose Hermes cron issues in four categories: timing, delivery, permissions, and skill loading.

## Signature / Usage

```bash
hermes cron list                    # states, next_run times
hermes cron run <job_id>            # schedule for next tick (testing)
hermes cron tick                    # manually trigger a tick
hermes cron edit <job_id>           # fix configuration
hermes logs
hermes skills list
```

Disable response wrapping:

```yaml
cron:
  wrap_response: false
```

Skill ordering:

```bash
/cron add "0 9 * * *" "..." --skill context-skill --skill target-skill
```

## Options / Props

Schedule expressions:

| Expression | Evaluates to |
|------------|--------------|
| `0 9 * * *` | 9:00 AM every day |
| `0 9 * * 1` | 9:00 AM every Monday |
| `every 2h` | Every 2 hours from now |
| `30m` | 30 minutes from now (one-shot) |
| `2025-06-01T09:00:00` | June 1, 2025 at 9:00 AM UTC |

Delivery target requirements:

| Target | Requires |
|--------|----------|
| `telegram` | `TELEGRAM_BOT_TOKEN` in `~/.hermes/.env` |
| `discord` | `DISCORD_BOT_TOKEN` |
| `slack` | `SLACK_BOT_TOKEN` |
| `whatsapp` / `signal` / `matrix` | Gateway configured |
| `email` | SMTP configured in `config.yaml` |
| `sms` | SMS provider configured |
| `local` | Write access to `~/.hermes/cron/output/` |
| `origin` | Chat where the job was created |

## Notes

- Jobs fire from the gateway's ticker (every 60 s); a plain CLI chat session does not fire cron jobs. Desktop's primary backend ticks every local profile's cron store.
- State `[completed]` may mean the repeat count is exhausted; one-shot schedules (`30m`, `1d`, ISO timestamps) disappear after firing.
- Jobs use the local timezone.
- Delivery targets are case-sensitive; misconfigured targets silently drop output (job still runs). Bot needs permissions: Telegram admin in group/channel, Discord send permission, Slack `chat:write`.
- Empty output or a response containing `[SILENT]` suppresses delivery; use prompts like "respond with only [SILENT] if nothing changed".
- Relay-fronted platforms (Hermes Cloud / Team Gateway): the running gateway is the only sender. `hermes cron run <id>` forwards to the gateway via the api_server (`POST /api/jobs/{id}/run`), which needs `api_server` enabled with an `API_SERVER_KEY` (16+ characters).
- Cron runs with `cronjob`, `messaging`, and `clarify` toolsets disabled; skills relying on them will not work.
- Skill names are case-sensitive and must match the folder name; skills must be installed on the scheduler machine.
- Script paths must exist (`~/.hermes/scripts/...`).
- Inactivity timeout default 600 s (`HERMES_CRON_TIMEOUT`, `0` for unlimited).
- File-based locking: duplicate gateway processes cause delayed or skipped jobs. Jobs live in `~/.hermes/cron/jobs.json` (`chmod 600`, user-owned).
- Logs: `~/.hermes/logs/agent.log`, `~/.hermes/logs/errors.log`.
- Jobs due in the same tick run sequentially; stagger schedules. Filter large script output at the script level.
- Source: https://hermes-agent.nousresearch.com/docs/guides/cron-troubleshooting (pinned to v0.22.2)

## Related

- [automate-with-cron](./automate-with-cron.md)
- [cron-script-only](./cron-script-only.md)
