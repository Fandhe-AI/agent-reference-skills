---
source: https://ai.google.dev/gemini-api/docs/priority-inference
---

# Priority inference

The Gemini Priority API (Preview) is a premium inference tier for business-critical workloads needing lower latency and the highest reliability. Priority traffic is prioritized above standard and Flex traffic.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Triage this critical customer support ticket immediately.",
    service_tier='priority'
)
print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Triage this critical customer support ticket immediately.",
    service_tier: "priority"
});
console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Triage this critical customer support ticket immediately.",
    "service_tier": "priority"
  }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `service_tier` | string | `priority` selects the Priority tier; the default tier is standard if omitted |

Tier comparison (from the page):

| Feature | Priority | Standard | Flex | Batch |
|---|---|---|---|---|
| Pricing | 75-100% more than Standard | Full price | 50% discount | 50% discount |
| Latency | Seconds | Seconds to minutes | Minutes (1--15 min target) | Up to 24 hours |
| Reliability | High (Non-sheddable) | High / Medium-high | Best-effort (Sheddable) | High (for throughput) |
| Interface | Synchronous | Synchronous | Synchronous | Asynchronous |

Supported models: Gemini 3.8 Flash, Gemini 3.6 Flash, Gemini 3.5 Flash-Lite, Gemini 3.1 Flash-Lite, Gemini 3.1 Pro Preview, Gemini 3 Flash Preview, Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.5 Flash-Lite.

## Notes

- Availability: Interactions API endpoints (`/v1beta/interactions` in the REST example). Preview.
- Priority holds its own rate limits, counted toward overall interactive traffic limits. Default: 0.3x the standard rate limit for Model / Tier.
- Graceful downgrade: requests exceeding Priority limits are downgraded to Standard processing instead of failing with 503 or 429, and billed at the standard rate. Monitor the `x-gemini-service-tier` response header to detect frequent downgrades to `standard`.
- Clients must implement retry logic / exponential backoff for standard errors such as `DEADLINE_EXCEEDED`.
- Priced at 75-100% more than the standard API, billed per token.
- Docs fetched 2026-10-16.

## Related

- [flex-inference](./flex-inference.md)
- [pricing](./pricing.md)
- [rate-limits](./rate-limits.md)
- [api-errors](./api-errors.md)
