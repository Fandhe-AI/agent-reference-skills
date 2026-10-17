---
source: https://ai.google.dev/gemini-api/docs/caching
---

# Context caching (implicit)

Implicit caching is enabled by default for Gemini 2.5 and newer models; cost savings are passed on automatically when a request hits a cache.

## Signature / Usage

The guide has no code sample; the cache-hit counter is read from the response object (`usage.total_cached_tokens`, Python and JavaScript). Minimum input token counts from the guide:

```text
| Model | Min token limit |
|---|---|
| Gemini 4 Argon | 4,096 |
| Gemini 3.8 Flash | 4,096 |
| Gemini 3.6 Flash | 4,096 |
| Gemini 3.1 Pro Preview | 4,096 |
| Gemini 2.5 Flash | 2,048 |
| Gemini 2.5 Pro | 2,048 |
```

`usage` shape as returned in an `interaction.completed` event (from the streaming guide):

```json
{"total_tokens":346,"total_input_tokens":11,"input_tokens_by_modality":[{"modality":"text","tokens":11}],"total_cached_tokens":0,"total_output_tokens":90,"total_tool_use_tokens":0,"total_thought_tokens":245}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| usage.total_cached_tokens | integer | Number of input tokens that were cache hits |

## Notes

- Availability: Interactions API supports implicit caching only. Explicit caching (manually creating and managing cache objects) is not supported in the Interactions API, or for Gemini 4 Argon and onward; use the generateContent API (explicit-caching page in the generate-content category) on supported Gemini 3 and 2.5 models.
- Implicit caching works in both stateful (`previous_interaction_id`) and stateless conversation modes; no configuration is needed.
- To raise hit chances: put large, common content at the beginning of the prompt, and send requests with a similar prefix in a short amount of time.
- Distinct from prompt caching in the OpenAI and Anthropic APIs (`openai-api-core`, `anthropic-api-core`).

## Related

- [Optimization and inference](./optimization.md)
- [Long decode](./long-decode.md)
