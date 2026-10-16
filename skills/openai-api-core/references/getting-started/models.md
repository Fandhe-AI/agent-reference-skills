# Models

Overview of the OpenAI API model catalog and guidance for choosing a model. All latest OpenAI models support text and image input, text output, multilingual capabilities, and vision, and are available via the Responses API and the official client SDKs.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()
response = client.responses.create(
    model="gpt-6-astra",
    input="Write a one-sentence bedtime story about a unicorn.",
)
```

## Notes

### Recommended models

| Name | Description |
| --- | --- |
| GPT-6 Astra | Flagship model for complex reasoning and coding. Start here if unsure. |
| GPT-6.1 Sol | Balances intelligence and cost (near-Astra performance for complex work at a lower cost). |
| GPT-6 Luna | Optimized for cost-sensitive, high-volume workloads. |

### Details

- The full model catalog (100+ models spanning GPT, o-series reasoning, embeddings, moderation, audio/realtime, image, and more) is listed at `models/all` — see [All models](./models-all.md). Sora 2 video generation models and the Videos API were shut down on 2026-09-24 and are no longer in the catalog.
- GPT-6 migration points (from the "Using GPT-6" guide, `/api/docs/guides/latest-model`):
  - GPT-6 Astra and GPT-6.1 Sol do not support `reasoning.effort: none` (HTTP 400); GPT-6.1 Sol also does not support `minimal` and defaults to `medium`. GPT-6 Sol and GPT-6 Luna support `none`.
  - When reasoning effort is not `none`, remove `temperature`, `top_p`, and `top_logprobs`; for Responses, also remove `message.output_text.logprobs` from `include` (for Chat Completions, remove `logprobs`).
  - Tool calling on GPT-6 Astra and GPT-6.1 Sol requires the Responses API; Chat Completions is accepted only for requests without tools.
  - When migrating from GPT-5.5 or earlier, replace `prompt_cache_retention` with `prompt_cache_options.ttl` set to `"30m"`.
- Source for the GPT-6 notes: https://developers.openai.com/api/docs/guides/latest-model (retrieved 2026-10-17).
- For context window / max output / supported-endpoint comparisons, see [Compare models](./models-compare.md).
- Deprecated models are tracked separately on the deprecations page (out of scope here).

## Related

- [All models](./models-all.md)
- [Compare models](./models-compare.md)
- [Key concepts](./concepts.md)
