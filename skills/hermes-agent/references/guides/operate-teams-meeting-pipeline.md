# Operate the Teams Meeting Pipeline

Runbook, go-live checklist, and operator worksheet for the Microsoft Teams meeting pipeline (after enabling it from the Teams Meetings user guide).

## Signature / Usage

```bash
hermes teams-pipeline validate
hermes teams-pipeline token-health
hermes teams-pipeline token-health --force-refresh
hermes teams-pipeline subscriptions
hermes teams-pipeline maintain-subscriptions
hermes teams-pipeline maintain-subscriptions --dry-run
hermes teams-pipeline list
hermes teams-pipeline list --status failed
hermes teams-pipeline show <job-id>
hermes teams-pipeline run <job-id>          # replay a stored job
hermes teams-pipeline fetch --meeting-id <meeting-id>
hermes teams-pipeline fetch --join-web-url "<join-url>" --organizer-user-id <entra-user-id>
```

Schedule subscription renewal with Hermes cron (script-only job):

```bash
cat > ~/.hermes/scripts/maintain-teams-subscriptions.sh <<'EOF'
#!/usr/bin/env bash
exec hermes teams-pipeline maintain-subscriptions
EOF
chmod +x ~/.hermes/scripts/maintain-teams-subscriptions.sh

hermes cron create "0 */12 * * *" \
  --name "teams-pipeline-maintain-subscriptions" \
  --no-agent \
  --script maintain-teams-subscriptions.sh \
  --deliver local
```

Or a systemd timer (`hermes-teams-pipeline-maintain.service` oneshot running `/usr/local/bin/hermes teams-pipeline maintain-subscriptions` with `EnvironmentFile=/etc/hermes/env`; `.timer` with `OnBootSec=5min`, `OnUnitActiveSec=12h`, `Persistent=true`), or plain crontab:

```cron
0 */12 * * * /usr/local/bin/hermes teams-pipeline maintain-subscriptions >> /var/log/hermes/teams-pipeline-maintain.log 2>&1
```

## Options / Props

| Delivery mode | Use when | Tradeoff |
|---------------|----------|----------|
| `incoming_webhook` | Simple posting into Teams | Simplest, less control |
| `graph` | Channel or chat posting through Graph | More control, more auth and target config |

## Notes

- Microsoft Graph subscriptions expire in at most 72 hours; `maintain-subscriptions` MUST run on a schedule (every 12 hours gives 6x headroom) or notifications silently stop. Make sure the cron environment has the `MSGRAPH_*` credentials.
- `--organizer-user-id` resolves through the organizer-scoped `/users/{id}/onlineMeetings` path, required for Teams `/meet/` short URLs; webhook-driven jobs derive the organizer from the notification `@odata.id`.
- First setup order: `validate`, `token-health --force-refresh`, `subscriptions`; then confirm a real meeting event via `list` / `show`.
- Triage: no jobs created (check `msgraph_webhook` enabled, URL points to `/msgraph/webhook`, `MSGRAPH_WEBHOOK_CLIENT_STATE` matches, subscriptions not expired); retries or failures before summarization (transcript / recording permissions, `ffmpeg` for recording fallback, token health); not delivered to Teams (`platforms.teams.enabled: true`, `delivery_mode`, `incoming_webhook_url`, `chat_id` or `team_id` + `channel_id`); duplicate replays (manual `run`, existing sink record).
- Go-live checklist: Graph credentials, `msgraph_webhook` reachable, client state set, transcript subscription (recording subscription if STT fallback), `ffmpeg`, Teams delivery target verified, Notion / Linear sinks only if needed, `validate` OK, `token-health --force-refresh` OK, renewal scheduled, end-to-end job stored, summary delivered.
- The source also includes blank operator and change-review worksheets (notification URL, tenant ID, client ID, client state, subscriptions, delivery mode, chat/team/channel, Notion database ID, Linear team ID, store path override, owner).

## Related

- [microsoft-graph-app-registration](./microsoft-graph-app-registration.md)
- [cron-script-only](./cron-script-only.md)
