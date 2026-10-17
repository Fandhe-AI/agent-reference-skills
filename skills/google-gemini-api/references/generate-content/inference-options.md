---
source: https://ai.google.dev/gemini-api/docs/generate-content/flex-inference, https://ai.google.dev/gemini-api/docs/generate-content/priority-inference, https://ai.google.dev/gemini-api/docs/generate-content/webhooks, https://ai.google.dev/gemini-api/docs/generate-content/long-decode, https://ai.google.dev/gemini-api/docs/generate-content/safety-settings, https://ai.google.dev/gemini-api/docs/generate-content/api-errors
---

# Flex / priority / webhooks / long decode / safety / errors (generateContent)

Inference tiers and operational options for `generateContent`, aggregated one section per source under https://ai.google.dev/gemini-api/docs/generate-content/: `flex-inference` (primary), `priority-inference`, `webhooks`, `long-decode`, `safety-settings`, `api-errors`.

## Signature / Usage

### Flex inference

The Flex tier offers a 50% cost reduction compared to standard rates in exchange for variable latency and best-effort availability. Set `service_tier` to `flex`; omitting it uses the standard tier.

```python
from google import genai

client = genai.Client()

try:
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents="Analyze this dataset for trends...",
        config={"service_tier": "flex"},
    )
    print(response.text)
except Exception as e:
    print(f"Flex request failed: {e}")
```

```javascript
const response = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents: "Analyze this dataset for trends...",
  config: { serviceTier: "flex" },
});
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=$GEMINI_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "contents": [{
    "parts":[{"text": "Summarize the latest research on quantum computing."}]
  }],
  "service_tier": "flex"
}'
```

| Feature | Flex | Priority | Standard | Batch |
| --- | --- | --- | --- | --- |
| Pricing | 50% discount | 75-100% more than Standard | Full price | 50% discount |
| Latency | Minutes (1-15 min target) | Low (Seconds) | Seconds to minutes | Up to 24 hours |
| Reliability | Best-effort (Sheddable) | High (Non-sheddable) | High / Medium-high | High (for throughput) |
| Interface | Synchronous | Synchronous | Synchronous | Asynchronous |

Notes:

- Flex counts toward general rate limits (no extended limits like Batch). Capacity can be preempted; errors are `503 Service Unavailable` and `429 Too Many Requests`. No server-side fallback to Standard: implement client-side retries with exponential backoff and raise client timeouts to 10 minutes or more (SDKs expect timeout values in milliseconds).

### Priority inference

A premium tier for business-critical workloads with lower latency and the highest reliability. Available to Tier 2 and Tier 3 users across the GenerateContent API and Interactions API endpoints. Set `service_tier` to `priority`.

```python
try:
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents="Triage this critical customer support ticket immediately.",
        config={"service_tier": "priority"},
    )

    # Validate for graceful downgrade
    if response.sdk_http_response.headers.get("x-gemini-service-tier") == "standard":
        print("Warning: Priority limit exceeded, processed at Standard tier.")

    print(response.text)

except Exception as e:
    # Standard error handling (e.g., DEADLINE_EXCEEDED)
    print(f"Error during API call: {e}")
```

Notes:

- Priority has its own rate limits: default 0.3x standard rate limit for Model / Tier. Over-limit requests are gracefully downgraded to Standard (billed at the standard rate); monitor the `x-gemini-service-tier` response header. Priced 75-100% more than standard, per token.
- Supported models: Gemini 4 Argon, 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Flash-Lite, 3.1 Pro Preview, 3 Flash Preview, 3 Pro Image Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash Image, 2.5 Flash-Lite.

### Webhooks

Push notifications when asynchronous or long-running operations complete (Batch jobs, Interactions, video generation), replacing `GET /operations` polling. Static webhooks are project-level (WebhookService API); dynamic webhooks are per-request (`webhook_config`).

```python
webhook = client.webhooks.create(
    name="MyBatchWebhook",
    subscribed_events=["batch.succeeded", "batch.failed"],
    uri="https://my-api.com/gemini-callback",
)

# Store webhook.new_signing_secret securely
webhook_secret = webhook.new_signing_secret
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

Dynamic webhook on a batch job:

```python
file_batch_job = client.batches.create(
    model="gemini-3.8-flash",
    src="files/uploaded_file_id",
    config={
        "display_name": "My Setup",
        "webhook_config": {
            "uris": ["https://my-api.com/gemini-webhook-dynamic"],
            "user_metadata":{"job_group": "nightly-eval", "priority": "high"}
        }
    }
)
```

Envelope (thin payload) and events:

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

| Event type | Trigger | Payload item (`data`) |
| --- | --- | --- |
| `batch.succeeded` | Processing finished successfully | `id`, `output_file_uri` |
| `batch.cancelled` | User cancelled request | `id` |
| `batch.expired` | Batch not processed in 24h timeframe | `id` |
| `batch.failed` | Batch job failed (system or validation error) | `id`, `error_code`, `error_message` |
| `interaction.requires_action` | Function call, user needs to do something | `id` |
| `interaction.completed` | LRO in interactions API succeeded | `id` |
| `interaction.failed` | LRO in interactions API failed | `id`, `error_code`, `error_message` |
| `interaction.cancelled` | LRO in interactions API cancelled | `id` |
| `video.generated` | Video generation LRO completed | `id`, `output_file_uri`, `file_name` |

Notes:

- The signing secret is returned only once at creation (rotate if lost). Gemini follows the Standard Webhooks specification; verify with the signed headers (Python `standardwebhooks`). Dynamic webhooks use asymmetric JWKS (JWT) signatures instead of symmetric secrets.
- Respond with 2xx within a few seconds; failed deliveries are retried for 24 hours with exponential backoff. Validate the `webhook-timestamp` header (reject older than 5 minutes) and deduplicate by `webhook-id` (at-least-once delivery).
- Not Stripe webhooks or Inngest events (stripe, inngest skills); not OpenAI / Anthropic webhooks (openai-api-core, anthropic-api-core skills).

### Long decode

Lets Gemini 4 Argon generate past the single-request output limit, up to the unified 1M-token context window (1,048,576 tokens shared across input, thinking, and output). Set `max_output_tokens` greater than 65,536.

```python
response = client.models.generate_content(
    model="gemini-4-argon",
    contents="Write a complete, rigorous proof of the prime number theorem.",
    config=types.GenerateContentConfig(
        max_output_tokens=262_144,  # Total thinking and output for all hops
        thinking_config=types.ThinkingConfig(thinking_level="high"),
        automatic_continuation=True,  # Default. Shown for clarity.
    ),
)

print(response.text)
print("Finish reason:", response.candidates[0].finish_reason)
print("Prompt size:", response.usage_metadata.initial_prompt_token_count)
print("Billed tokens:", response.usage_metadata.total_token_count)
```

Notes:

- Source recommends the Interactions API for new projects (servers run long decode with background execution).
- A hop returns up to 65,536 output tokens (streaming / SDK) or 32,768 (non-streaming REST); when tokens remain, the response ends with `finish_reason: CONTINUATION` and a `continuation_token` that you send back with the same request. `max_output_tokens` is the total across all hops; using it all ends with `finish_reason: MAX_TOKENS`. Non-streaming REST `max_output_tokens` above 32,768 without a `continuation_token` returns `400`. Each request has a 20 minute time limit; no server storage.
- Minimum SDK versions for automatic continuation, as stated by the source: Python `google-genai` 2.30.1, JavaScript `@google/genai` 2.29.1, Go 1.74.0, Java 1.77.0, .NET 1.26.0, Kotlin 1.6.0.

### Safety settings

Adjustable filters across four categories (Harassment, Hate speech, Sexually explicit, Dangerous); built-in protections against core harms (e.g. child safety) are always blocked.

```python
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Some potentially unsafe prompt",
    config=types.GenerateContentConfig(
      safety_settings=[
        types.SafetySetting(
            category=types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=types.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        ),
      ]
    )
)

print(response.text)
```

| Threshold (Google AI Studio) | Threshold (API) | Description |
| --- | --- | --- |
| Off | `OFF` | Turn off the safety filter |
| Block none | `BLOCK_NONE` | Always show regardless of probability of unsafe content |
| Block few | `BLOCK_ONLY_HIGH` | Block when high probability of unsafe content |
| Block some | `BLOCK_MEDIUM_AND_ABOVE` | Block when medium or high probability |
| Block most | `BLOCK_LOW_AND_ABOVE` | Block when low, medium or high probability |
| N/A | `HARM_BLOCK_THRESHOLD_UNSPECIFIED` | Block using default threshold |

Notes:

- Blocking is by probability (`HIGH`, `MEDIUM`, `LOW`, `NEGLIGIBLE`), not severity. If the threshold is not set, the default block threshold is Off for Gemini 2.5 and later models.
- Feedback: `promptFeedback.blockReason` when the prompt was blocked; `Candidate.finishReason` of `SAFETY` with `Candidate.safetyRatings` when a response was blocked (blocked content is not returned). Less restrictive settings may be subject to review per the Terms of Service.

### API errors

HTTP error codes returned by the `GenerateContent` API with gRPC status details.

```json
{
  "error": {
    "code": 400,
    "message": "API key not valid. Please pass a valid API key.",
    "status": "INVALID_ARGUMENT",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "API_KEY_INVALID",
        "domain": "googleapis.com",
        "metadata": {
          "service": "generativelanguage.googleapis.com"
        }
      }
    ]
  }
}
```

| HTTP | Status | Meaning (from source) |
| --- | --- | --- |
| 400 | INVALID_ARGUMENT | Request body malformed; also newer API version features on an older endpoint |
| 400 | FAILED_PRECONDITION | Free tier not available in your country; enable billing |
| 402 | RESOURCE_EXHAUSTED | Prepay credit balance depleted; add credits, do not retry |
| 403 | PERMISSION_DENIED | API key lacks permissions (or tuned model without proper authentication) |
| 404 | NOT_FOUND | Requested resource (e.g. referenced media file) not found |
| 429 | RESOURCE_EXHAUSTED | Exceeded a rate limit (RPM, TPM, RPD, spend); wait and retry |
| 499 | CANCELLED | Cancelled, typically client closed the connection |
| 500 | INTERNAL | Unexpected error on Google's side (e.g. input context too long) |
| 503 | UNAVAILABLE | Service temporarily overloaded or down |
| 504 | DEADLINE_EXCEEDED | Unable to finish within the deadline; set a larger client timeout |

## Notes

- Sources: <https://ai.google.dev/gemini-api/docs/generate-content/flex-inference> (Flex inference), <https://ai.google.dev/gemini-api/docs/generate-content/priority-inference> (Priority inference), <https://ai.google.dev/gemini-api/docs/generate-content/webhooks> (Webhooks), <https://ai.google.dev/gemini-api/docs/generate-content/long-decode> (Long decode), <https://ai.google.dev/gemini-api/docs/generate-content/safety-settings> (Safety settings), <https://ai.google.dev/gemini-api/docs/generate-content/api-errors> (API errors).
- API surface: generateContent tree. `service_tier` (Flex / Priority) is a v1beta request field; Priority applies to both GenerateContent and Interactions endpoints. Webhooks and long decode are described in the Interactions-side pages as well (platform-ops and interactions-core categories).
- Distinct from Anthropic Message Batches (anthropic-api-core skill) and OpenAI Batch / webhooks (openai-api-core skill).

## Related

- [Thinking (generateContent)](./thinking.md)
- [Understand and count tokens (generateContent)](./tokens.md)
- Flex inference (platform-ops)
- Priority inference (platform-ops)
