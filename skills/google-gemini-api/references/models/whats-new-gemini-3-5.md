---
source: https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.5
---

# What's new in Gemini 3.5 Flash

Gemini 3.5 Flash (`gemini-3.5-flash`) is a deprecated earlier-generation Flash model; requests are automatically routed to Gemini 3.6 Flash. The guide is preserved for historical reference and documents the baseline Gemini 3.x API changes and parameter recommendations.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.5-flash",
    input="Prove that the square root of 2 is irrational.",
    generation_config={"thinking_level": "high"},
)
print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

async function main() {
  const interaction = await client.interactions.create({
    model: "gemini-3.5-flash",
    input: "Prove that the square root of 2 is irrational.",
    generation_config: { thinking_level: "high" },
  });
  console.log(interaction.output_text);
}

main();
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.5-flash",
    "input": "Prove that the square root of 2 is irrational.",
    "generation_config": {"thinking_level": "high"}
  }'
```

Function result matching (Python):

```python
# ✅ Include matching call_id and name in the function_result
final_interaction = client.interactions.create(
    model="gemini-3.5-flash",
    previous_interaction_id=interaction.id,
    tools=[my_tool],
    input=[{
        "type": "function_result",
        "name": fc_step.name,
        "call_id": fc_step.id,
        "result": [{"type": "text", "text": json.dumps(result)}],
    }],
)
```

## Options / Props

| Effort level | When to use |
| --- | --- |
| `minimal` | Optimized for response speed. Chat-like use cases, quick factual answers, simpler tool calls. |
| `low` | Code and agentic tasks that require lower latency and fewer steps. |
| `medium` (default) | Best quality for most tasks. Recommended for complex code and agentic use cases. |
| `high` | Maximizes thinking and tool use. Hard reasoning, hard math, hardest code or agent tasks. |

| Thinking Level | Gemini 3.5 Flash | Gemini 3.1 Pro | Gemini 3.1 Flash-Lite | Gemini 3 Flash |
| --- | --- | --- | --- | --- |
| `minimal` | Supported | Not supported | Supported (Default) | Supported |
| `low` | Supported | Supported | Supported | Supported |
| `medium` | Supported (Default) | Supported | Supported | Supported |
| `high` | Supported (Dynamic) | Supported (Default, Dynamic) | Supported (Dynamic) | Supported (Default, Dynamic) |

| Function response requirement | Details |
| --- | --- |
| Include `id` | Every `FunctionResponse` must include the `id` from the corresponding `FunctionCall` |
| Match `name` | The `name` in the response must match the `name` in the call |
| Match counts | Return exactly one `FunctionResponse` for each `FunctionCall` received |

## Notes

- The source JS sample uses camelCase `generationConfig: { thinkingLevel }`; the Interactions API in @google/genai takes snake_case `generation_config.thinking_level`, used here.
- Deprecated: requests to `gemini-3.5-flash` are automatically routed to `gemini-3.6-flash`; no longer selectable in Google AI Studio. Active alternatives named in the source: Gemini 3.8 Flash, Gemini 3.6 Flash (direct replacement), Gemini 3.5 Flash-Lite / Gemini 3.1 Flash-Lite.
- Supported 1M token context window, 65k max output tokens, thinking, Computer Use (Preview). Knowledge cutoff January 2025 (FAQ).
- Default thinking effort changed from `high` (Gemini 3 Flash Preview) to `medium`. Using both `thinking_level` and legacy `thinking_budget` in one request returns a 400 error.
- Thought preservation: Interactions API preserves thoughts automatically; in generateContent (beginning with Gemini 3.5 Flash) pass the full unmodified history including thought signatures in `contents`.
- Gemini 3.x best practices: do not change `temperature`, `top_p`, `top_k` (remove them); use `thinking_level` instead of `thinking_budget`; the Interactions API already errors on mismatched function responses; include multimodal content inside the function response; append inline instructions to the function response text separated by two newlines; reduce tool-call overuse with lower thinking levels or a system instruction such as "You have a limited action budget of <n> tool calls. Use them efficiently."
- Prompting: be concise and direct; steer verbosity explicitly; place questions after large context ("Based on the preceding information...").
- Limitation: image segmentation is not supported in Gemini 3.x (use Gemini 2.5 Flash with thinking off).
- FAQ: Batch API supported; Context Caching supported; tools supported: Google Search, Grounding with Google Maps, File Search, Code Execution, URL Context, function calling including combined tool use, and Computer Use.
- Docs fetched 2026-10-16. API surface: Interactions API (GenerateContent also supported per source).

## Related

- [What's new in Gemini 3.6 Flash and 3.5 Flash-Lite](./whats-new-gemini-3-6.md)
- [Gemini 3 developer guide](./gemini-3-developer-guide.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
