# Moderation

Free OpenAI moderation models detect harmful content in text and images before it reaches users or gets generated.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

response = client.moderations.create(
    model="omni-moderation-latest",
    input="text or image content to classify",
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model` | string | `omni-moderation-latest` processes both text and image input (not audio) |
| `input` | string / array | Content to classify; image files up to 20 MB |

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `flagged` | boolean | Whether the input was flagged as potentially harmful |
| `categories` | object | Per-category boolean violation flags (13 categories: harassment, hate, self-harm, sexual, violence, etc.) |
| `category_scores` | object | Confidence value 0–1 per category |
| `category_applied_input_types` | object | Which input type (text/image/both) each category score applies to |

## Notes

- Several categories (harassment, hate speech, illicit content, among others) are text-only; image-only submissions return 0 for those categories.
- When streaming responses, moderation scores for generated content arrive only after the full output completes.
- For tool-calling requests, moderation covers arguments and outputs, not tool names or schemas.
- Four main workflows: moderate generated content inline, classify standalone inputs, interpret result fields, and check which categories apply.

## Related

- [Safety best practices](./safety-best-practices.md)
