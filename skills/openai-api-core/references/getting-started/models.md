# Models

Overview of the OpenAI API model catalog and guidance for choosing a model. All latest OpenAI models support text and image input, text output, multilingual capabilities, and vision, and are available via the Responses API and the official client SDKs.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()
response = client.responses.create(
    model="gpt-5.6-sol",
    input="Write a one-sentence bedtime story about a unicorn.",
)
```

## Recommended models

| Name | Description |
| --- | --- |
| GPT-5.6 Sol | Flagship model for complex reasoning and coding. Start here if unsure. |
| GPT-5.6 Terra | Balances intelligence and cost. |
| GPT-5.6 Luna | Optimized for cost-sensitive, high-volume workloads. |

## Notes

- The full model catalog (100+ models spanning GPT, o-series reasoning, embeddings, moderation, audio/realtime, image, and Sora video generation) is listed at `models/all` — see [All models](./models-all.md).
- For context window / max output / supported-endpoint comparisons, see [Compare models](./models-compare.md).
- Deprecated models are tracked separately on the deprecations page (out of scope here).

## Related

- [All models](./models-all.md)
- [Compare models](./models-compare.md)
- [Key concepts](./concepts.md)
