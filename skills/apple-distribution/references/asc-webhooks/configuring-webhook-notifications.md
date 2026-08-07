# Configuring and Parsing Webhook Notifications

Manage the configuration, testing, and processing of App Store Connect API notifications sent from Apple's servers to your webhook endpoint.

## Signature / Usage

```json
// POST https://api.appstoreconnect.apple.com/v1/webhooks
{
  "data": {
    "type": "webhooks",
    "attributes": {
      "enabled": true,
      "eventTypes": ["APP_STORE_VERSION_APP_VERSION_STATE_UPDATED"],
      "name": "APP_STORE_VERSION_STATE_APP_NAME",
      "secret": "my_secret_string",
      "url": "https://example.com"
    },
    "relationships": {
      "app": { "data": { "type": "apps", "id": "string" } }
    }
  }
}
```

## Options / Props

| Attribute | Description |
|-----------|-------------|
| `enabled` | Whether the webhook is active |
| `eventTypes` | Array of `WebhookEventType` values the webhook subscribes to |
| `name` | Human-readable webhook name |
| `secret` | Shared secret used to generate the `x-apple-signature` HMAC header |
| `url` | Your server's webhook endpoint URL |

## Notes

- A notification webhook is an endpoint you create on your server that receives `HTTP POST` requests from App Store Connect describing important events; an app can have many webhooks.
- Use `POST /v1/webhooks` to register the endpoint URL for the first time; use `PATCH /v1/webhooks/{id}` to update `enabled`, `name`, `url`, `secret`, or `eventTypes` afterward.
- Authentication uses HMAC: share a `secret` string when registering the webhook, then verify each request by computing an `HMAC-SHA256` hash of the payload body with that secret and comparing it to the value in the `x-apple-signature` header (format `hmacsha256=<hex digest>`).
- Use `GET /v1/apps/{id}/webhooks` to list configured webhooks for an app, then `GET /v1/webhooks/{id}` to read details for a specific webhook.
- Use `POST /v1/webhookPings` to verify your listener is reachable before relying on live events.
- Use `GET /v1/webhooks/{id}/deliveries` to review past delivery attempts and their `deliveryState` (`SUCCEEDED`, `FAILED`, `PENDING`).
- When parsing an incoming notification, branch on `data.type` (e.g. `appStoreVersionAppVersionStateUpdated`) since each event type has its own attribute schema; see Understanding Webhook Events for the full catalog.

## Related

- [Webhooks](./webhooks.md)
- [Understanding Webhook Events](./webhook-events.md)
- [Webhook Deliveries](./webhook-deliveries.md)
- [Testing a Webhook](./webhook-pings.md)
