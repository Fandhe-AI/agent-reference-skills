---
source: https://ai.google.dev/gemini-api/docs/logs-datasets
---

# Logs and datasets

View Gemini API usage logs in the Google AI Studio dashboard, configure project and request-level storage, set retention, and save logs to exportable datasets.

## Signature / Usage

```python
from google import genai

client = genai.Client()

# Generate Content API: stored by default for projects created on or after October 26, 2026
response = client.models.generate_content(
    model='gemini-4-hydrogen',
    contents='Explain quantum entanglement in simple terms.',
    config={'store': True} # Set to False to disable logging of this request
)

# Interactions API: stored by default
interaction = client.interactions.create(
    model="gemini-4-hydrogen",
    input="Explain quantum entanglement in simple terms.",
    store=True # Set to False to disable logging of this request
)
```

```javascript
const interaction = await client.interactions.create({
    model: 'gemini-4-hydrogen',
    input: 'Explain quantum entanglement in simple terms.',
    store: true // Set to false to disable logging of this request
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `store` | boolean | Interactions API default `true`. Generate Content API (`generateContent`, `streamGenerateContent`, `batchGenerateContent`) default `true` for projects created on or after October 26, 2026; projects created before that date default to `false` unless logging was enabled in AI Studio. The request-level `store` property takes precedence over the project-level setting |
| Retention window | setting | Default 55 days; configurable to 7, 14, 28, or 55 days max. Logs saved to a dataset do not expire |

Minimum SDK versions to set `store` on Generate Content API requests: `google-genai` 2.33.0 (Python), `@google/genai` 2.31.0 (JavaScript), `google-genai` 1.79.0 (Java), `google.golang.org/genai` 1.76.0 (Go).

Logging limitations (not supported): Imagen and Veo models, Gemini embedding models, Gemini Robotics model, inputs containing videos, GIFs or PDFs, Public Preview Agents in the Gemini API.

## Notes

- Supported calls: `GenerateContent`, `BatchGenerateContent`, `StreamGenerateContent`, and Interactions API calls excluding Managed Agents, including calls through OpenAI compatibility endpoints. Log storage is only available for projects on the paid tier.
- Logging can be toggled independently for `generateContent` and Interactions in the AI Studio Logs and Datasets Settings panel. Turning Interactions logging off prevents automatic storing and retrieving of conversation history unless overridden per request.
- A project needs at least one active API key for its logs to display. Interactions logs include a link to the `previous_interaction_id`.
- Datasets: create from the Logs page by filtering and selecting logs; export as CSV, JSONL, or Google Sheets; optionally share with Google as demonstration examples.
- Generate Content API storage on by default (release notes 2026-10-26): new projects on the paid tier store `generateContent`, `streamGenerateContent`, and `batchGenerateContent` requests by default (`store=true`), matching the Interactions API. Existing projects keep their current setting (off unless previously enabled in AI Studio). To opt out, set `store=false` on individual requests or turn off Generate Content API logging in the Settings panel of the Logs and Datasets dashboard.
- For projects created before October 26, 2026, first enable Generate Content API logging in the Settings panel to see project logs for the Generate Content API.
- The source page now shows the `store` option in the Java (`GenerateContentConfig.builder().store(true)`) and Go (`Store: genai.Ptr(true)`) generateContent examples as well.
- Source: https://aistudio.google.com/docs/logs-datasets (fetched 2026-11-14).

## Related

- [zero-data-retention](./zero-data-retention.md)
- [batch-api](./batch-api.md)
