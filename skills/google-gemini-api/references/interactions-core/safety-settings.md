---
source: https://ai.google.dev/gemini-api/docs/safety-settings
---

# Safety settings

Pass `safety_settings` when creating an interaction to adjust filter thresholds per harm category.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Some potentially unsafe prompt.",
    safety_settings=[
        {
            "type": "hate_speech",
            "threshold": "block_low_and_above",
        }
    ],
)

print(interaction.output_text)
```

```javascript
const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: "Some potentially unsafe prompt.",
  safety_settings: [
    {
      type: "hate_speech",
      threshold: "block_low_and_above",
    },
  ],
});
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -H "Api-Revision: 2026-05-20" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Some potentially unsafe prompt.",
    "safety_settings": [
      {"type": "hate_speech", "threshold": "block_low_and_above"}
    ]
  }'
```

Blocked response:

```json
{
  "error": {
    "code": "safety",
    "message": "Request blocked due to safety violations (harmful content). Please modify your input and retry."
  }
}
```

## Options / Props

Categories (`type`):

| Category | Value (API) | Description |
|----------|-------------|-------------|
| Harassment | `harassment` | Abusive, threatening, or content intended to bully, torment, or ridicule |
| Hate speech | `hate_speech` | Content that promotes violence or incites hatred against individuals or groups based on certain attributes |
| Sexually explicit | `sexually_explicit` | Content that contains sexually explicit material |
| Dangerous | `dangerous_content` | Content that promotes, facilitates, or enables dangerous activities |
| Jailbreak | `jailbreak` | Prompts designed to bypass safety filters |

Thresholds (`threshold`):

| Threshold (Google AI Studio) | Threshold (API) | Description |
|------------------------------|-----------------|-------------|
| Off | `off` | Turn off the safety filter |
| Block few | `block_only_high` | Block when high probability of unsafe content |
| Block some | `block_medium_and_above` | Block when medium or high probability of unsafe content |
| Block most | `block_low_and_above` | Block when low, medium or high probability of unsafe content |

## Notes

- Availability: Interactions API.
- One setting per category; unset categories use the default threshold, which is Off for Gemini 2.5 and later models.
- When a filter blocks input or output, the interaction fails with HTTP `400` and blocked content is not returned. Error `code` values: `safety` (input or response blocked by a safety filter); `jailbreak`, `prohibited_content`, or `blocklist` (input blocked; message starts with `Input blocked:`).
- Background interactions (`background=true`): `status` becomes `failed` and the same `code` and `message` appear in its `errors` list. When streaming, the error arrives as an `error` event.
- Built-in protections against core harms (such as content that endangers child safety) are always blocked and cannot be adjusted.
- Blocking is based on probability (high, medium, low, negligible), not severity of harm.
- Less restrictive settings may be subject to review under the Terms of Service.

## Related

- [Safety and factuality guidance](./safety-guidance.md)
- [Prompt design strategies](./prompting-strategies.md)
