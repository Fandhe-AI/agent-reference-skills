# Webhook Endpoints

HTTPS endpoints registered to receive real-time Stripe event notifications as JSON POST requests.

## Signature / Usage

```bash
# Create via API (v1)
curl https://api.stripe.com/v1/webhook_endpoints \
  -u "sk_test_..." \
  -d "enabled_events[]=charge.succeeded" \
  -d "enabled_events[]=charge.failed" \
  --data-urlencode "url=https://example.com/my/webhook/endpoint"
```

## Options / Props

### WebhookEndpoint object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (prefix `we_`) |
| `url` | string | The HTTPS URL of the webhook endpoint |
| `enabled_events` | array | List of event types this endpoint listens for; `["*"]` enables all non-explicit events |
| `status` | string | `enabled` or `disabled` |
| `secret` | string | Signing secret (`whsec_...`) — returned only on create |
| `api_version` | string | Stripe API version for events sent to this endpoint |
| `connect` | boolean | `true` = Connect webhook for all connected accounts; `false` = account-level only |
| `description` | string | Optional human-readable description |
| `metadata` | object | Arbitrary key-value metadata |
| `livemode` | boolean | `true` in live mode, `false` in test mode |
| `created` | timestamp | Unix timestamp of creation |

### Create parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `url` | yes | string | The destination HTTPS URL |
| `enabled_events` | yes | array of enums | Event types to deliver; use `["*"]` for all |
| `api_version` | no | string | Stripe API version for event payloads |
| `connect` | no | boolean | Receive events from connected accounts |
| `description` | no | string | Endpoint description |
| `metadata` | no | object | Key-value metadata |

## Notes

- The `secret` field (`whsec_...`) is only returned at creation time — store it immediately.
- Each account can have up to 16 event destinations total (webhook endpoints included).
- Stripe retries failed deliveries for up to 3 days with exponential backoff in production; 3 times within hours in sandbox.
- Respond with a `2xx` status quickly; offload heavy processing to an async queue.
- The endpoint must accept `POST` requests and be publicly accessible over HTTPS (TLS v1.2+).
- Redirect responses (`3xx`) are not followed — configure the final destination URL directly.
- Use `stripe listen --forward-to localhost:4242/webhook` (Stripe CLI) for local testing.

## Related

- [Signature Verification](./signature-verification.md)
- [Event Types](./event-types.md)
