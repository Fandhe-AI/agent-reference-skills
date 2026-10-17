---
source: https://ai.google.dev/gemini-api/docs/gemini-3
---

# Gemini 3 developer guide

Overview of the Gemini 3 model family: model IDs, context windows, `thinking_level`, temperature, thought signatures, structured outputs with tools, image generation, and migration from Gemini 2.5.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.1-pro-preview",
    input="How does AI work?",
    generation_config={"thinking_level": "low"},
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    model: "gemini-3.1-pro-preview",
    input: "How does AI work?",
    generation_config: {
      thinking_level: "low",
    },
  });

console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.1-pro-preview",
    "input": "How does AI work?",
    "generation_config": {
      "thinking_level": "low"
    }
  }'
```

## Options / Props

| Model ID | Context Window (In / Out) | Knowledge Cutoff | Pricing (Input / Output) |
| --- | --- | --- | --- |
| `gemini-3.1-flash-lite` | 1M / 64k | Jan 2025 | $0.25 (text, image, video), $0.50 (audio) / $1.50 |
| `gemini-3.1-flash-image-preview` | 128k / 32k | Jan 2025 | $0.25 (Text Input) / $0.067 (Image Output) |
| `gemini-3.1-pro-preview` | 1M / 64k | Jan 2025 | $2 / $12 (<200k tokens) $4 / $18 (>200k tokens) |
| `gemini-3-flash-preview` | 1M / 64k | Jan 2025 | $0.50 / $3 |
| `gemini-3-pro-image-preview` | 65k / 32k | Jan 2025 | $2 (Text Input) / $0.134 (Image Output) |

| Thinking Level | Gemini 3.1 Pro | Gemini 3.1 Flash-Lite | Gemini 3 Flash |
| --- | --- | --- | --- |
| `minimal` | Not supported | Supported (Default) | Supported |
| `low` | Supported | Supported | Supported |
| `medium` | Supported | Supported | Supported |
| `high` | Supported (Default, Dynamic) | Supported (Dynamic) | Supported (Default, Dynamic) |

## Notes

- `gemini-3.1-flash-image-preview` and `gemini-3-pro-image-preview` were shut down June 25, 2026 (use `gemini-nano-banana-2.1` / `gemini-3-pro-image`) per the deprecations page.
- Deprecated page: the source states "This page is deprecated and will be removed" and points to the latest-model guide for current guidance (see `whats-new-gemini-4-argon.md`). Prices and "All Gemini 3 models are currently in preview" reflect this older page; use the model cards for current status.
- `thinking_level` controls the maximum depth of reasoning; treated as relative allowances, not strict token guarantees. Default is `high` when unspecified (per this page). You cannot use both `thinking_level` and legacy `thinking_budget` in the same request (400 error).
- Temperature: keep the default `1.0` for Gemini 3 models; lower values may cause looping or degraded performance.
- Thought signatures: stateful mode (Interactions API with `previous_interaction_id`) manages history and signatures server-side; stateless mode requires including thought blocks with signatures in subsequent requests.
- Structured outputs can be combined with built-in tools (Google Search, URL Context, Code Execution, Function Calling). Image generation example uses `response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "4K"}` with `gemini-3-pro-image-preview` and `{"type": "google_search"}`.
- Migration from Gemini 2.5: try `thinking_level: "high"` with simplified prompts instead of chain-of-thought prompting; remove explicit low temperature; test `media_resolution_high` for dense PDFs; token usage may increase for PDFs and decrease for video; image segmentation is not supported (use Gemini 2.5 Flash with thinking off); Computer Use is supported without a separate model; combining built-in tools with function calling and Maps grounding are supported for Gemini 3.
- OpenAI compatibility layer: OpenAI's `reasoning_effort` is mapped to Gemini `thinking_level`.
- FAQ: free tier exists for `gemini-3-flash-preview` but not `gemini-3.1-pro-preview` in the Gemini API; Batch API and Context Caching supported; `gemini-3.1-pro-preview-customtools` is suggested if `gemini-3.1-pro-preview` ignores custom tools in favor of bash commands.
- Docs fetched 2026-10-16. API surface: Interactions API (this tree; the generateContent variant lives in the generate-content category).
- Distance: structured outputs / thinking concepts resemble openai-api-core (Responses API) and anthropic-api-core (Messages API) but use Gemini-specific parameters.

## Related

- [Models](./models-catalog.md)
- [What's new in Gemini 3.5 Flash](./whats-new-gemini-3-5.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
