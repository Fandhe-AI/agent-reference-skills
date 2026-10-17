---
source: https://ai.google.dev/gemini-api/docs/flex-inference
---

# Flex inference

The Gemini Flex API (Preview) is an inference tier with a 50% cost reduction versus standard rates, in exchange for variable latency and best-effort availability. For latency-tolerant workloads that need synchronous processing.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Analyze this dataset for trends...",
    service_tier='flex'
)
print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: 'Analyze this dataset for trends...',
    service_tier: 'flex'
});
console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
      "model": "gemini-3.8-flash",
      "input": "Analyze this dataset for trends...",
      "service_tier": "flex"
  }'
```

Per-request timeout (SDK values are in milliseconds):

```python
client = genai.Client(http_options={"timeout": 900000})
```

```javascript
const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: "why is the sky blue?",
    service_tier: "flex",
}, {timeout: 900000});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `service_tier` | string | `flex` selects the Flex tier; the standard tier is used if omitted |

Tier comparison (from the page):

| Feature | Flex | Priority | Standard | Batch |
|---|---|---|---|---|
| Pricing | 50% discount | 75-100% more than Standard | Full price | 50% discount |
| Latency | Minutes (1--15 min target) | Low (Seconds) | Seconds to minutes | Up to 24 hours |
| Reliability | Best-effort (Sheddable) | High (Non-sheddable) | High / Medium-high | High (for throughput) |
| Interface | Synchronous | Synchronous | Synchronous | Asynchronous |

Supported models: Gemini 3.8 Flash, Gemini 3.6 Flash, Gemini 3.5 Flash-Lite, Gemini 3.1 Flash-Lite, Gemini 3.1 Pro Preview, Gemini 3 Flash Preview, Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.5 Flash-Lite.

## Notes

- Availability: Interactions API (`client.interactions.create`, REST `/v1beta/interactions`). Preview.
- Flex traffic counts toward general rate limits; it does not offer extended limits like the Batch API.
- Sheddable: Flex requests may be preempted or evicted during standard-traffic spikes. Errors: `503 Service Unavailable` (at capacity), `429 Too Many Requests` (rate limits or resource exhaustion).
- No server-side fallback to Standard (prevents unexpected charges). Implement client-side retries with exponential backoff; the page's retry example falls back to a standard-tier call after retries are exhausted.
- Increase client-side timeouts to 10 minutes or more (the page uses 600s+ / 900000 ms) because Flex requests may queue.
- Priced at 50% of the standard API, billed per token.
- Docs fetched 2026-10-16.

## Related

- [priority-inference](./priority-inference.md)
- [batch-api](./batch-api.md)
- [pricing](./pricing.md)
- [rate-limits](./rate-limits.md)
