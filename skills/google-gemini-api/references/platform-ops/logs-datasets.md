---
source: https://ai.google.dev/gemini-api/docs/logs-datasets
---

# Logs and datasets

View Gemini API usage logs in the Google AI Studio dashboard, configure project and request-level storage, set retention, and save logs to exportable datasets.

## Signature / Usage

```python
from google import genai

client = genai.Client()

# generateContent API: not stored by default
response = client.models.generate_content(
    model='gemini-3.8-flash',
    contents='Explain quantum entanglement in simple terms.',
    config={'store': False} # Set to True to enable logging of this request
)

# Interactions API: stored by default
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain quantum entanglement in simple terms.",
    store=True # Set to False to disable logging of this request
)
```

```javascript
const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: 'Explain quantum entanglement in simple terms.',
    store: true // Set to false to disable logging of this request
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `store` | boolean | Interactions API default `true`; `generateContent` default `false` (enable per request via `config.store` or at project level in AI Studio) |
| Retention window | setting | Default 55 days; configurable to 7, 14, 28, or 55 days max. Logs saved to a dataset do not expire |

Logging limitations (not supported): Imagen and Veo models, Gemini embedding models, Gemini Robotics model, inputs containing videos, GIFs or PDFs, Public Preview Agents in the Gemini API.

## Notes

- Supported calls: `GenerateContent`, `BatchGenerateContent`, `StreamGenerateContent`, and Interactions API calls excluding Managed Agents, including calls through OpenAI compatibility endpoints. Log storage is only available for projects on the paid tier.
- Logging can be toggled independently for `generateContent` and Interactions in the AI Studio Logs and Datasets Settings panel. Turning Interactions logging off prevents automatic storing and retrieving of conversation history unless overridden per request.
- A project needs at least one active API key for its logs to display. Interactions logs include a link to the `previous_interaction_id`.
- Datasets: create from the Logs page by filtering and selecting logs; export as CSV, JSONL, or Google Sheets; optionally share with Google as demonstration examples.
- For the Java and Go generateContent examples the page notes requests are not stored by default (no `store` option shown).
- Docs fetched 2026-10-16.

## Related

- [zero-data-retention](./zero-data-retention.md)
- [batch-api](./batch-api.md)
