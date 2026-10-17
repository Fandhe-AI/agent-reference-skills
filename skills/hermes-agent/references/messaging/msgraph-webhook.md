# Microsoft Graph Webhook Listener

The `msgraph_webhook` gateway platform is an inbound event listener for Microsoft Graph change notifications (meeting transcripts, calendar, chat). It is not a chat bot; its primary consumer is the Teams meeting summary pipeline.

## Signature / Usage

```yaml
platforms:
  msgraph_webhook:
    enabled: true
    extra:
      host: 127.0.0.1
      port: 8646
      client_state: "replace-with-a-strong-secret"
      accepted_resources:
        - "communications/onlineMeetings"
```

```bash
MSGRAPH_WEBHOOK_ENABLED=true
MSGRAPH_WEBHOOK_PORT=8646
MSGRAPH_WEBHOOK_CLIENT_STATE=<generate-with-openssl-rand-hex-32>
MSGRAPH_WEBHOOK_ACCEPTED_RESOURCES=communications/onlineMeetings
```

Endpoints: `POST /msgraph/webhook`, `GET /msgraph/webhook?validationToken=...`, `GET /health`. Notification URL is your public HTTPS origin + `/msgraph/webhook`.

## Options / Props

All under `platforms.msgraph_webhook.extra`:

| Name | Default | Description |
|------|---------|-------------|
| `host` | unset (dual-stack) | Bind address; config-only (no env override). Non-loopback binds require `allowed_source_cidrs` |
| `port` | `8646` | Bind port |
| `webhook_path` | `/msgraph/webhook` | Path Graph POSTs to |
| `health_path` | `/health` | Readiness endpoint |
| `client_state` | — | Shared secret echoed by Graph; compared with `hmac.compare_digest`; listener refuses to start if unset |
| `accepted_resources` | `[]` (accept all) | Resource allowlist; trailing `*` is a prefix match |
| `max_seen_receipts` | `5000` | Notification ID dedupe cache size |
| `allowed_source_cidrs` | `[]` | Required for non-loopback binds (env `MSGRAPH_WEBHOOK_ALLOWED_SOURCE_CIDRS`) |

Status codes: 202 accepted / deduped, 200 validation handshake (echoes token), 403 clientState mismatch for whole batch or source IP not allowed, 400 malformed JSON / missing `value` / unknown resource / bare GET.

## Notes

- Needs Microsoft Graph application credentials and a public HTTPS URL (Graph does not call private endpoints); terminate TLS at a reverse proxy since the listener speaks plain HTTP.
- Binding `0.0.0.0`, `::` or a LAN IP without `allowed_source_cidrs` is refused at startup; review Microsoft's published IP ranges quarterly.
- Distinct from the `teams` platform (a chat bot users type to).

## Related

- [Microsoft Teams](./teams.md)
- [Teams Meetings](./teams-meetings.md)
- [Webhooks](./webhooks.md)
