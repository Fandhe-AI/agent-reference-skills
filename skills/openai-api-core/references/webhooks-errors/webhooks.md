# Webhooks

Use webhooks to receive real-time HTTP POST notifications about events in the OpenAI API, such as when a batch or a background response completes.

## Signature / Usage

```javascript
// Verify and unwrap an incoming webhook request (Node/Express)
const client = new OpenAI({ webhookSecret: process.env.OPENAI_WEBHOOK_SECRET });

// Don't use express.json() — signature verification needs the raw text body
app.use(express.text({ type: "application/json" }));

app.post("/webhook", async (req, res) => {
  const event = await client.webhooks.unwrap(req.body, req.headers);
  res.status(200).send();
});
```

```python
# Verify and unwrap an incoming webhook request (Python/Flask)
import os
from flask import request
from openai import OpenAI

client = OpenAI()
webhook_secret = os.environ["OPENAI_WEBHOOK_SECRET"]

event = client.webhooks.unwrap(
    request.data,
    request.headers,
    secret=webhook_secret,
)
```

## Options / Props

| Header | Description |
|--------|-------------|
| `webhook-id` | Unique identifier for the webhook delivery attempt; use for idempotency checks (duplicate events can occur) |
| `webhook-timestamp` | Unix timestamp of when the event was created |
| `webhook-signature` | Cryptographic signature for verifying authenticity, format `v1,<signature>` |
| `user-agent` | Identifies the request source, e.g. `OpenAI/1.0` |
| `content-type` | `application/json` |

## Notes

- Endpoints must respond with a `2xx` status within seconds; on failure OpenAI retries delivery for up to 72 hours with exponential backoff.
- Signature verification follows the Standard Webhooks specification. Prefer the SDK's `webhooks.unwrap()` helper over manual HMAC verification.
- Because delivery is at-least-once, deduplicate on `webhook-id` before processing.
- Local development requires a publicly reachable URL (e.g. ngrok, GitHub Codespaces) to receive webhook POSTs.
- The full enumerated list of webhook event types (e.g. `response.completed`, `batch.completed`) is published in the API reference, not in the guide body; example event handling shown here covers `response.completed`.
- This is a webhook mechanism specific to the OpenAI API (developers.openai.com), distinct from webhook features in Stripe, Inngest, or Supabase — do not mix signature-verification code across those SDKs.

## Related

- [Webhooks and server-side controls](./realtime-server-controls.md)
- [Error codes](./error-codes.md)
