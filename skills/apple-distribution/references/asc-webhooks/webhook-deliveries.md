# Webhook Deliveries

Review past webhook delivery attempts and resend a previously delivered notification.

## Signature / Usage

```
GET  /v1/webhooks/{id}/deliveries
GET  /v1/webhooks/{id}/relationships/deliveries
POST /v1/webhookDeliveries
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/webhooks/{id}/deliveries` | Get a list of deliveries for a specific webhook configuration |
| GET | `/v1/webhooks/{id}/relationships/deliveries` | List delivery resource IDs for a webhook |
| POST | `/v1/webhookDeliveries` | Resend a webhook notification from a specified delivery template |

### Query Parameters — `GET /v1/webhooks/{id}/deliveries`

| Parameter | Description |
|-----------|-------------|
| `fields[webhookDeliveries]` | `createdDate`, `deliveryState`, `errorMessage`, `redelivery`, `sentDate`, `request`, `response`, `event` |
| `fields[webhookEvents]` | `eventType`, `payload`, `ping`, `createdDate` |
| `filter[createdDateGreaterThanOrEqualTo]` | Filter deliveries created on or after a date |
| `filter[createdDateLessThan]` | Filter deliveries created before a date |
| `filter[deliveryState]` | `SUCCEEDED`, `FAILED`, `PENDING` |
| `include` | `event` |
| `limit` | Max resources per page (max: 200) |

### `WebhookDelivery` Attributes

| Attribute | Description |
|-----------|-------------|
| `createdDate` | Timestamp the delivery record was created |
| `deliveryState` | `SUCCEEDED`, `FAILED`, or `PENDING` |
| `errorMessage` | Error detail when delivery failed |
| `redelivery` | Whether this delivery is a resend of a prior notification |
| `sentDate` | Timestamp the request was sent |
| `request.url` | Destination URL of the delivery attempt |
| `response.httpStatusCode` | HTTP status returned by your server |
| `response.body` | Response body returned by your server |

## Notes

- `POST /v1/webhookDeliveries` requires a `template` attribute containing the original delivery `id` to resend; find delivery IDs via `GET /v1/webhooks/{id}/deliveries`.
- Redelivery requests can return `409 Conflict` or `422 Unprocessable Entity` in addition to standard `400`/`401`/`403`/`429`.
- Each delivery includes a relationship to the originating `webhookEvents` resource (`eventType`, `payload`, `ping`).

## Related

- [Webhooks](./webhooks.md)
- [Understanding Webhook Events](./webhook-events.md)
- [Testing a Webhook](./webhook-pings.md)
- [Configuring and Parsing Webhook Notifications](./configuring-webhook-notifications.md)
