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

Inline moderation: pass a top-level `moderation` object in the generation request to get scores for the model input and generated output without a separate moderation request. The model still generates normally; review the results before showing output or acting downstream. Results are in `response.moderation.input` / `response.moderation.output`; check `type == "error"` before reading `flagged`.

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input=[
        {
            "role": "user",
            "content": (
                "A user asks for instructions to make a harmful weapon. "
                "Draft a brief refusal and offer a safer alternative."
            ),
        }
    ],
    moderation={"model": "omni-moderation-latest"},
)

input_moderation = response.moderation.input
output_moderation = response.moderation.output
if input_moderation.type == "error":
    raise RuntimeError(input_moderation.message)
if output_moderation.type == "error":
    raise RuntimeError(output_moderation.message)

print(input_moderation.flagged)
print(output_moderation.flagged)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model` | string | `omni-moderation-latest` processes both text and image input (not audio) |
| `input` | string / array | Content to classify; image files up to 20 MB |
| `moderation` (Responses / Chat Completions request parameter) | object | Top-level object `{ model: "omni-moderation-latest" }` that requests moderation scores alongside a generated response; results returned in `response.moderation.input` and `response.moderation.output` |

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `flagged` | boolean | Whether the input was flagged as potentially harmful |
| `categories` | object | Per-category boolean violation flags (13 categories: harassment, hate, self-harm, sexual, violence, etc.) |
| `category_scores` | object | Confidence value 0–1 per category |
| `category_applied_input_types` | object | Which input type (text/image/both) each category score applies to |

## Notes

- Child safety: do not send known or suspected CSAM to the Moderation API. It is not designed for CSAM detection or handling and is not a substitute for dedicated child-safety safeguards; see OpenAI's CSAM guidance (`/api/docs/guides/csam-guidance`).

- Several categories (harassment, hate speech, illicit content, among others) are text-only; image-only submissions return 0 for those categories.
- When streaming responses, moderation scores for generated content arrive only after the full output completes.
- For tool-calling requests, moderation covers arguments and outputs, not tool names or schemas.
- Four main workflows: moderate generated content inline, classify standalone inputs, interpret result fields, and check which categories apply.

## Related

- [Safety best practices](./safety-best-practices.md)
