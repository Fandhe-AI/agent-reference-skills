---
source: https://ai.google.dev/gemini-api/docs/webhooks
---

# Webhooks

Webhooks let the Gemini API push HTTP POST notifications to your server when asynchronous or Long-Running Operations (Batch jobs, Interactions, video generation) complete, replacing polling.

## Signature / Usage

Static webhook (project-level, created with the SDK or REST):

```python
from google import genai

client = genai.Client()

webhook = client.webhooks.create(
    name="MyBatchWebhook",
    subscribed_events=["batch.succeeded", "batch.failed"],
    uri="https://my-api.com/gemini-callback",
)

# Store webhook.new_signing_secret securely
webhook_secret = webhook.new_signing_secret
print(f"Created webhook: {webhook.name}, {webhook.id}")
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI();

const webhook = await client.webhooks.create({
  name: "MyBatchWebhook",
  subscribed_events: ["batch.succeeded", "batch.failed"],
  uri: "https://my-api.com/gemini-callback",
});
```

```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1/webhooks" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
    "name": "MyBatchWebhook",
    "uri": "https://my-api.com/gemini-callback",
    "subscribed_events": ["batch.succeeded", "batch.failed"]
  }'
```

Dynamic webhook (request-level override; `background=True` is required):

```python
# This will only work for SDK newer than 2.0.0
response = client.interactions.create(
    model='gemini-3.8-flash',
    input='Tell me a short joke about programming.',
    background=True, # Required when webhook_config is specified
    webhook_config={
        'uris': ["https://my-api.com/gemini-webhook-dynamic"],
        'user_metadata': {"job_group": "nightly-eval", "priority": "high"}
    }
)
```

Verify a static webhook (Flask, Standard Webhooks):

```python
# pip install flask standardwebhooks
import os
from flask import Flask, request, jsonify
from standardwebhooks.webhooks import Webhook, WebhookVerificationError

app = Flask(__name__)

SIGNING_SECRET = os.environ.get('WEBHOOK_SIGNING_SECRET')

@app.route('/gemini-callback', methods=['POST'])
def gemini_callback():
    payload = request.get_data(as_text=True)
    headers = request.headers

    try:
        wh = Webhook(SIGNING_SECRET)
        event = wh.verify(payload, headers)
    except WebhookVerificationError as e:
        return jsonify({"error": "Signature invalid"}), 400

    if event.get("type") == "batch.succeeded":
        print(f"Batch completed! ID: {event['data']['id']}")

    return jsonify({"status": "received"}), 200
```

Other management operations (Python SDK):

```python
webhook = client.webhooks.get(id="<your_webhook_id>")
webhooks = client.webhooks.list()
updated_webhook = client.webhooks.update(
    id="<your_webhook_id>",
    subscribed_events=["batch.succeeded", "batch.failed", "batch.cancelled"],
)
client.webhooks.delete(id="<your_webhook_id>")
response = client.webhooks.rotate_signing_secret(
    id="<your_webhook_id>",
    revocation_behavior="REVOKE_PREVIOUS_SECRETS_AFTER_H24",
)
```

```bash
# REST paths (base https://generativelanguage.googleapis.com/v1)
# GET    /webhooks/<your_webhook_id>
# GET    /webhooks
# PATCH  /webhooks/<your_webhook_id>
# DELETE /webhooks/<your_webhook_id>
# POST   /webhooks/<your_webhook_id>/rotate_secret
```

Webhook envelope (thin payload):

```json
{
  "type": "batch.succeeded",
  "version": "v1",
  "timestamp": "2026-01-22T12:00:00Z",
  "data": {
    "id": "batch_123456",
    "output_file_uri": "gs://my-bucket/results.jsonl"
  }
}
```

## Options / Props

Two configuration modes:

| Mode | Description |
|------|-------------|
| Static webhooks | Project-level endpoints configured with the Gemini WebhookService API; symmetric signing secret; good for global integrations |
| Dynamic webhooks | Request-level `webhook_config` (`uris`, `user_metadata`) on a specific job call; asymmetric public-key JWKS (JWT in the `Webhook-Signature` header) |

Event catalog:

| Event type | Trigger | Payload item (`data`) |
|---|---|---|
| `batch.succeeded` | Processing finished successfully. | `id`, `output_file_uri` |
| `batch.cancelled` | User cancelled request | `id` |
| `batch.expired` | Batch has not been processed (finished) in 24h timeframe | `id` |
| `batch.failed` | Batch job failed (system or validation error). | `id`, `error_code`, `error_message` |
| `interaction.requires_action` | Function call, user needs to do something | `id` |
| `interaction.completed` | LRO in interactions API succeeded | `id` |
| `interaction.failed` | LRO in interactions API failed (system or validation error). | `id`, `error_code`, `error_message` |
| `interaction.cancelled` | LRO in interactions API cancelled | `id` |
| `video.generated` | Video generation LRO completed. | `id`, `output_file_uri`, `file_name` |

## Notes

- The Batch API page defines `JOB_STATE_EXPIRED` as pending or running for more than 48 hours, while this page describes `batch.expired` with a 24h timeframe; the source pages disagree.
- Availability: static webhooks use the `/v1/webhooks` REST path; dynamic webhooks are shown on `/v1beta/interactions`.
- The signing secret is returned only once at creation (`new_signing_secret`) and at rotation; store it securely. Rotation can revoke previous secrets immediately or after a 24-hour grace period.
- Respond with a 2xx within a few seconds; failed deliveries are retried for 24 hours with exponential backoff. Security headers follow the Standard Webhooks spec (`webhook-id`, `webhook-timestamp`, `webhook-signature`).
- Best practices: reject payloads older than 5 minutes using `webhook-timestamp` (replay protection); respond 2xx immediately and process asynchronously; deduplicate with `webhook-id` (at-least-once delivery).
- JavaScript note from the page: do not use `express.json()`; signature verification needs the raw text body.
- Dynamic signature verification uses Google's JWKS (`https://generativelanguage.googleapis.com/.well-known/jwks.json` in the page's examples).
- Distinct from other skills: these are Gemini API job-completion callbacks, not Stripe webhooks (stripe), Inngest event delivery (inngest), OpenAI webhooks (openai-api-core), or Anthropic Message Batches (anthropic-api-core).
- Docs fetched 2026-10-16.

## Related

- [batch-api](./batch-api.md)
- [api-errors](./api-errors.md)
