# Webhooks

Create and manage per-app webhook configurations that App Store Connect uses to send event notifications to your server.

## Signature / Usage

```
GET    /v1/apps/{id}/webhooks
GET    /v1/webhooks/{id}
POST   /v1/webhooks
PATCH  /v1/webhooks/{id}
DELETE /v1/webhooks/{id}
```

## Options / Props

### CRUD

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/apps/{id}/webhooks` | Read webhook configuration details for a specific app |
| GET | `/v1/webhooks/{id}` | Read configuration details for a specific webhook |
| POST | `/v1/webhooks` | Add a new webhook configuration |
| PATCH | `/v1/webhooks/{id}` | Update details for a specific webhook |
| DELETE | `/v1/webhooks/{id}` | Remove a specific webhook configuration |

### `Webhook` Attributes

| Attribute | Description |
|-----------|-------------|
| `enabled` | Whether the webhook is active |
| `eventTypes` | `WebhookEventType` values the webhook subscribes to |
| `name` | Webhook name |
| `url` | Webhook endpoint URL |
| `secret` | Shared HMAC secret (write-only) |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `fields[webhooks]` | `enabled`, `eventTypes`, `name`, `url`, `app`, `deliveries` |
| `include` | `app` |
| `limit` | Max resources per page (max: 200) |

## Notes

- `POST /v1/webhooks` requires a `relationships.app` linkage to the target app resource ID; the response is `201 Created` with a `WebhookResponse`.
- `PATCH /v1/webhooks/{id}` accepts a `WebhookUpdateRequest` and can change `enabled`, `name`, `url`, `secret`, and `eventTypes`.
- `DELETE /v1/webhooks/{id}` returns `204 No Content` on success.
- `POST`/`PATCH` can return `409 Conflict` or `422 Unprocessable Entity` in addition to standard `400`/`401`/`403`/`429`.
- Obtain a webhook's resource ID from the `GET /v1/apps/{id}/webhooks` response before calling `GET`, `PATCH`, or `DELETE /v1/webhooks/{id}`.

## Related

- [Configuring and Parsing Webhook Notifications](./configuring-webhook-notifications.md)
- [Understanding Webhook Events](./webhook-events.md)
- [Webhook Deliveries](./webhook-deliveries.md)
- [Testing a Webhook](./webhook-pings.md)
- [Apps](../asc-api-core/apps.md)
