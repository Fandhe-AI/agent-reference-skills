---
source: https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash
---

# Gemini 4 / 3.x model cards

Aggregated model cards for the text/multimodal Gemini 4 Argon and Gemini 3.x family (model code, data types, token limits, capabilities, consumption options, status, latest update). One section per source page.

## Signature / Usage

Representative snippet from the Gemini 3.1 Flash-Lite card (generateContent, Python):

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.1-flash-lite",
    contents="How does AI work?",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_level="high")
    ),
)

print(response.text)
```

## Options / Props

All cards: Inputs Text, Image, Video, Audio, and PDF; Output Text.

| Model code | Input / output token limit | Status (Versions row) | Latest update | Model card |
| --- | --- | --- | --- | --- |
| `gemini-4-argon` | Context window (unified input and output) 1,048,576; max output 65,536 (default synchronous) / up to 1,048,576 with long decode | Stable | October 2026 | deepmind.google/models/model-cards/gemini-4-argon/ |
| `gemini-3.8-flash` | 1,048,576 / 65,536 | Stable | September 2026 | deepmind.google/models/model-cards/gemini-3-8-flash/ |
| `gemini-3.7-flash` | 1,048,576 / 65,536 | Deprecated (automatically routed to `gemini-3.8-flash`) | August 2026 | deepmind.google/models/model-cards/gemini-3-7-flash/ |
| `gemini-3.6-flash` | 1,048,576 / 65,536 | Stable | July 2026 | deepmind.google/models/model-cards/gemini-3-6-flash/ |
| `gemini-3.5-flash` | 1,048,576 / 65,536 | Deprecated (automatically routed to `gemini-3.6-flash`) | May 2026 | deepmind.google/models/model-cards/gemini-3-5-flash/ |
| `gemini-3.5-flash-lite` | 1,048,576 / 65,536 | Stable | July 2026 | deepmind.google/models/model-cards/gemini-3-5-flash-lite/ |
| `gemini-3.1-pro-preview` (and `gemini-3.1-pro-preview-customtools`) | 1,048,576 / 65,536 | Preview | February 2026 | deepmind.google/models/model-cards/gemini-3-1-pro/ |
| `gemini-3.1-flash-lite` | 1,048,576 / 65,536 | Stable | May 2026 | deepmind.google/models/model-cards/gemini-3-1-flash-lite/ |
| `gemini-3.1-flash-lite-preview` | 1,048,576 / 65,536 | Shut down | March 2026 | deepmind.google/models/model-cards/gemini-3-1-flash-lite/ |
| `gemini-3-flash-preview` | 1,048,576 / 65,536 | Preview | December 2025 | deepmind.google/models/model-cards/gemini-3-flash/ |
| `gemini-3-pro-preview` | 1,048,576 / 65,536 | Shut down | November 2025 | deepmind.google/models/model-cards/gemini-3-pro/ |

Capabilities (as listed on each card; "Supported (Preview)" kept as written):

| Model code | Thinking | Caching | Computer use | File search | Maps grounding | Live API / Image gen / Audio gen |
| --- | --- | --- | --- | --- | --- | --- |
| `gemini-4-argon` | Supported (low, medium, high) | Supported (Implicit only); explicit not supported | Supported (Preview) | Supported | Supported | Not supported |
| `gemini-3.8-flash` | Supported (low, medium, high); `minimal` not supported and returns an error | Supported | Supported (Preview) | Supported | Supported | Not supported |
| `gemini-3.7-flash` | Supported (low, medium, high); `minimal` returns an error | Supported | Supported (Preview) | Supported | Supported | Not supported |
| `gemini-3.6-flash` | Supported | Supported | Supported (Preview) | Supported | Supported | Not supported |
| `gemini-3.5-flash` | Supported | Supported | Supported (Preview) | Supported | Supported | Not supported |
| `gemini-3.5-flash-lite` | Supported | Supported | Supported (Preview) | Supported | Supported | Not supported |
| `gemini-3.1-pro-preview` | Supported | Supported | not listed | Supported (AI Studio only) | Supported | Not supported |
| `gemini-3.1-flash-lite` | Supported | Supported | Not supported | Supported | Supported | Not supported |
| `gemini-3-flash-preview` | Supported | Supported | Supported | Supported | Supported | Not supported |
| `gemini-3-pro-preview` | Supported | Supported | Not supported | Supported | Not supported | Not supported |

All cards also list Code execution, Function calling, Search grounding, Structured outputs, URL context as Supported. `gemini-4-argon` additionally lists Agentic video understanding: Supported (defaults to `static`). Consumption options: Batch API, Flex inference, Priority inference are Supported on every card except `gemini-3-pro-preview` (Batch API Supported; Flex and Priority Not supported).

## Notes

- Source pages (one per section): https://ai.google.dev/gemini-api/docs/models/gemini-4-argon, https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash, https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash, https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash, https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash, https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite, https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview, https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite, https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite-preview, https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview, https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview
- `gemini-3.1-pro-preview-customtools`: separate endpoint better at prioritizing custom tools (for example `view_file` or `search_code`) when mixing bash and custom tools; quality may fluctuate in use cases that do not benefit from such tools.
- `gemini-3.1-flash-lite-preview`: source warning says it "has been shut down on May 25, 2026"; migrate to `gemini-3.1-flash-lite`. `gemini-3-pro-preview`: "shut down March 9, 2026"; migrate to `gemini-3.1-pro-preview`.
- Gemini 3.1 Flash-Lite developer-guide use cases (card): translation, transcription, lightweight agentic tasks and data extraction with structured JSON, document processing and summarization, model routing, thinking.
- Gemini 3.7 Flash and 3.5 Flash are deprecated and automatically routed; Gemini 3.8 Flash card describes it as "our most intelligent Flash model, engineered for long-horizon software engineering, autonomous agents, and complex enterprise workflows".
- Docs fetched 2026-10-16. The Gemini 4 Argon card and the models catalog page are not fully consistent about which page is the "latest model" guide; the cards link `/docs/latest-model`, which documents Gemini 4 Argon.
- API surface: Interactions API and generateContent (the Flash-Lite card's code uses generateContent; Argon explicitly does not support explicit caching, which is a generateContent feature).

## Related

- [Models](./models-catalog.md)
- [What's new in Gemini 4 Argon](./whats-new-gemini-4-argon.md)
- [Gemini 2.5 / 2.0 model cards](./gemini-2-models.md)
