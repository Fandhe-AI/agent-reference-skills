# Testing a Webhook

Send a test ping event to your server to verify your webhook endpoint is reachable and correctly configured.

## Signature / Usage

```json
// POST https://api.appstoreconnect.apple.com/v1/webhookPings
{
  "data": {
    "type": "webhookPings",
    "relationships": {
      "webhook": { "data": { "type": "webhooks", "id": "string" } }
    }
  }
}
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/webhookPings` | Send an event to your server to verify your server-side webhook configuration |

## Notes

- The `id` for `type: "webhooks"` in the request is the resource ID returned by `POST /v1/webhooks` or `GET /v1/apps/{id}/webhooks`.
- Success returns `201 Created` with a `WebhookPingResponse`; failure can return `400`/`401`/`403`/`409`/`422`/`429`.
- Ping deliveries appear alongside regular event deliveries in the webhook's delivery history (`ping` attribute on the related `webhookEvents` resource).

## Related

- [Webhooks](./webhooks.md)
- [Webhook Deliveries](./webhook-deliveries.md)
- [Configuring and Parsing Webhook Notifications](./configuring-webhook-notifications.md)
