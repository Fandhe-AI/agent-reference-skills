# Teams Meetings

The Teams meeting pipeline ingests Microsoft Graph meeting events, fetches transcripts first (falling back to recording download plus STT), stores durable job state and writes structured summaries to Notion, Linear and Microsoft Teams.

## Signature / Usage

```bash
# ~/.hermes/.env
MSGRAPH_TENANT_ID=<tenant-id>
MSGRAPH_CLIENT_ID=<client-id>
MSGRAPH_CLIENT_SECRET=<client-secret>
MSGRAPH_WEBHOOK_ENABLED=true
MSGRAPH_WEBHOOK_PORT=8646
MSGRAPH_WEBHOOK_CLIENT_STATE=<random-shared-secret>
MSGRAPH_WEBHOOK_ACCEPTED_RESOURCES=communications/onlineMeetings
```

```bash
hermes plugins enable teams_pipeline
hermes teams-pipeline subscribe \
  --resource communications/onlineMeetings/getAllTranscripts \
  --notification-url https://ops.example.com/msgraph/webhook \
  --client-state "$MSGRAPH_WEBHOOK_CLIENT_STATE"
hermes teams-pipeline validate
```

## Options / Props

`platforms.teams.extra.meeting_pipeline`:

| Key | Example | Description |
|-----|---------|-------------|
| `transcript_min_chars` | `80` | Minimum usable transcript length |
| `transcript_required` | `false` | Require a transcript |
| `transcription_fallback` | `true` | Fall back to recording + STT |
| `ffmpeg_extract_audio` | `true` | Extract audio with ffmpeg |
| `notion.enabled` / `linear.enabled` | `false` | Summary sinks |

Teams delivery (`platforms.teams.extra`): `delivery_mode` (`graph` with `chat_id`, or `team_id` + `channel_id`, or `team_id` + `home_channel`; or `incoming_webhook` with `incoming_webhook_url`).

CLI subcommands: `hermes teams-pipeline validate | list | subscribe | subscriptions | maintain-subscriptions | token-health`.

## Notes

- Graph subscriptions expire after 72 hours and are not auto-renewed: schedule `hermes teams-pipeline maintain-subscriptions` (Hermes cron, systemd timer or crontab) before going live.
- The `teams-pipeline` subcommand is registered by the `teams_pipeline` plugin (`hermes plugins enable teams_pipeline` or `plugins.enabled: [teams_pipeline]`).
- Needs a public HTTPS URL for Graph, Graph application credentials, and `ffmpeg` for recording fallback. Non-loopback listener binds require `allowed_source_cidrs`.
- Bind host is config-only (`extra.host`); there is no `MSGRAPH_WEBHOOK_HOST` env var.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/teams-meetings (pinned to v0.22.2)

## Related

- [Microsoft Teams](./teams.md)
- [Microsoft Graph Webhook Listener](./msgraph-webhook.md)
