---
source: https://ai.google.dev/gemini-api/docs/generate-content/thinking
---

# Thinking (generateContent)

Gemini models use an internal "thinking process" that improves reasoning and multi-step planning. Control it with `thinkingLevel` (Gemini 4 / Gemini 3) or `thinkingBudget` (Gemini 2.5), and read thought summaries with `includeThoughts`.

## Signature / Usage

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Provide a list of 3 famous physicists and their key contributions",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_level="low")
    ),
)

print(response.text)
```

```javascript
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: "Provide a list of 3 famous physicists and their key contributions",
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.LOW,
      },
    },
  });

  console.log(response.text);
}

main();
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [
    {
      "parts": [
        {
          "text": "Provide a list of 3 famous physicists and their key contributions"
        }
      ]
    }
  ],
  "generationConfig": {
    "thinkingConfig": {
          "thinkingLevel": "low"
    }
  }
}'
```

Thought summaries:

```python
response = client.models.generate_content(
  model="gemini-3.8-flash",
  contents="What is the sum of the first 50 prime numbers?",
  config=types.GenerateContentConfig(
    thinking_config=types.ThinkingConfig(
      include_thoughts=True
    )
  )
)

for part in response.candidates[0].content.parts:
  if not part.text:
    continue
  if part.thought:
    print("Thought summary:")
    print(part.text)
    print()
  else:
    print("Answer:")
    print(part.text)
    print()
```

Thinking budget (Gemini 2.5):

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Provide a list of 3 famous physicists and their key contributions",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=1024)
        # Turn off thinking:
        # thinking_config=types.ThinkingConfig(thinking_budget=0)
        # Turn on dynamic thinking:
        # thinking_config=types.ThinkingConfig(thinking_budget=-1)
    ),
)
```

Thinking token usage:

```python
print("Thoughts tokens:", response.usage_metadata.thoughts_token_count)
print("Output tokens:", response.usage_metadata.candidates_token_count)
```

## Options / Props

`thinkingLevel` by model (from the source table):

| Thinking Level | Gemini 3.8 Flash | Gemini 3.6 Flash | Gemini 4 Argon | Gemini 3.5 & 3.1 Flash-Lite | Gemini 3.1 Flash-Lite Image | Gemini 3 Flash | Gemini Robotics ER 2 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `minimal` | Not supported (error) | Supported | Not supported (error) | Supported (Default) | Supported (Default) | Supported | Supported |
| `low` | Supported | Supported | Supported | Supported | Not Supported | Supported | Supported |
| `medium` | Supported (Default) | Supported (Default) | Supported (Default) | Supported | Not supported | Supported | Supported |
| `high` | Supported (Dynamic) | Supported (Dynamic) | Supported (Dynamic) | Supported (Dynamic) | Supported (Dynamic) | Supported (Default, Dynamic) | Supported (Default, Dynamic) |

`thinkingBudget` by model:

| Model | Default setting (Thinking budget is not set) | Range | Disable thinking | Turn on dynamic thinking |
| --- | --- | --- | --- | --- |
| 2.5 Pro | Dynamic thinking | `128` to `32768` | N/A: Cannot disable thinking | `thinkingBudget = -1` (Default) |
| 2.5 Flash | Dynamic thinking | `0` to `24576` | `thinkingBudget = 0` | `thinkingBudget = -1` (Default) |
| 2.5 Flash Preview | Dynamic thinking | `0` to `24576` | `thinkingBudget = 0` | `thinkingBudget = -1` (Default) |
| 2.5 Flash Lite | Model does not think | `512` to `24576` | `thinkingBudget = 0` | `thinkingBudget = -1` |
| 2.5 Flash Lite Preview | Model does not think | `512` to `24576` | `thinkingBudget = 0` | `thinkingBudget = -1` |
| Robotics-ER 1.6 Preview | Dynamic thinking | `0` to `24576` | `thinkingBudget = 0` | `thinkingBudget = -1` (Default) |
| 2.5 Flash Live Native Audio Preview (09-2025) | Dynamic thinking | `0` to `24576` | `thinkingBudget = 0` | `thinkingBudget = -1` (Default) |

## Notes

- API surface: generateContent (REST `generationConfig.thinkingConfig`).
- `minimal` "does not guarantee that thinking is off". You cannot disable thinking for Gemini 4 Argon; Gemini 3 Flash and Flash-Lite also do not support full thinking-off. Gemini 2.5 models do not support `thinkingLevel`; use `thinkingBudget`.
- `thinkingLevel` is "required for Gemini 4 and recommended for Gemini 3 models". Gemini 4 (`gemini-4-argon`) supports `low`, `medium` (default), `high`.
- Deprecated (Gemini 4 models): `thinkingBudget` / `thinking_budget`. If passed alone it maps to the nearest `thinkingLevel` with a warning; sending `thinkingBudget` and `thinkingLevel` together returns a `400` error.
- Thought summaries: set `includeThoughts` to `true`, iterate `parts` and check the `thought` boolean. Levels and budgets apply to raw thoughts, not summaries. Pricing is based on the full thought tokens (`thoughtsTokenCount`), not only the summary; summaries are available in free and paid tiers; thought signatures sent back increase billed input tokens.
- `max_output_tokens` includes thought tokens and is a hard cutoff; hitting it while reasoning stops with `finish_reason: MAX_TOKENS` and may return truncated or empty output (thinking tokens still billed). Lower `thinking_level` instead of setting a small `max_output_tokens`.
- Gemini 4 (`gemini-4-argon`) limits per the source: shared 1M context window (`1,048,576` tokens); a streaming request (`streamGenerateContent`) returns up to `65,536` tokens and a non-streaming request (`generateContent`) up to `32,768` tokens; set `max_output_tokens` above the cap for long decode (SDK `automatic_continuation=True` by default, or loop with the returned `continuation_token` when `finish_reason: "CONTINUATION"`). See the inference-options page (long decode section).
- Thought signatures: the Google GenAI SDK returns them automatically; manage manually only when modifying history or using REST. Do not concatenate parts with signatures or merge a signed part with an unsigned one.
- Thinking is supported on all 4, 3, and 2.5 series models and works with all tools.
- Distinct from Claude extended thinking (anthropic-api-core skill) and OpenAI reasoning effort (openai-api-core skill).

## Related

- [Thought signatures (generateContent)](./thought-signatures.md)
- [Text generation (generateContent)](./text-generation.md)
- [Understand and count tokens (generateContent)](./tokens.md)
