---
source: https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.7
---

# What's new in Gemini 3.7 Flash

Gemini 3.7 Flash (`gemini-3.7-flash`) is a previous-generation Flash model in the Gemini 3 series, now deprecated and automatically routed to Gemini 3.8 Flash. The guide is preserved for reference.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.7-flash",
    input="Write a responsive navigation component in React with smooth animations and dark mode toggle."
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: "gemini-3.7-flash",
  input: "Write a responsive navigation component in React with smooth animations and dark mode toggle.",
});

console.log(interaction.output_text);
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "model": "gemini-3.7-flash",
    "input": "Write a responsive navigation component in React with smooth animations and dark mode toggle."
  }'
```

## Options / Props

| Model | Model ID | Default thinking level | Description |
| --- | --- | --- | --- |
| Gemini 3.7 Flash (Deprecated) | `gemini-3.7-flash` | `medium` | Previous-generation Flash model built for coding, agentic workflows, and multi-step execution. Replaced by Gemini 3.8 Flash. |

Thinking levels: `low` (latency-critical tasks), `medium` (default; best quality for most tasks), `high` (maximizes thinking and tool use; higher token consumption and cost).

```python
interaction = client.interactions.create(
    model="gemini-3.7-flash",
    input="Analyze this payment processing pipeline for race conditions during retry attempts and rewrite the transaction locks safely.",
    generation_config={
        "thinking_level": "medium"  # Balanced reasoning effort for complex tasks
    }
)
```

## Notes

- Deprecated: "API requests to `gemini-3.7-flash` are automatically routed to `gemini-3.8-flash`." Not available to select in Google AI Studio. Update the model string to `gemini-3.8-flash`.
- Supports a 1M token context window, 64k max output tokens, tunable thinking levels, and the same suite of built-in tools as 3.6 Flash.
- What's new: higher quality on real-world software engineering and agentic benchmarks; higher-fidelity desktop/web code from design mocks.
- Introduced support for powering the Antigravity agent in Gemini Managed Agents and the Google Antigravity SDK.
- The source links `whats-new-gemini-3.8`, which is not among the saved pages; current agent samples are on the Antigravity agent guide.
- Docs fetched 2026-10-16. API surface: Interactions API.

## Related

- [What's new in Gemini 4 Argon](./whats-new-gemini-4-argon.md)
- [What's new in Gemini 3.6 Flash and 3.5 Flash-Lite](./whats-new-gemini-3-6.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
