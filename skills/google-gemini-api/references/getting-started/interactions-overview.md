---
source: https://ai.google.dev/gemini-api/docs/interactions-overview
---

# Interactions API

The Interactions API is the recommended way to build with Gemini models and agents. Its core resource is the `Interaction`, a session record holding a chronological sequence of execution steps.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Tell me a short story about a time-traveling lighthouse."
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI();

const interaction = await client.interactions.create({
  model: "gemini-3.8-flash",
  input: "Tell me a short story about a time-traveling lighthouse.",
});

console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Tell me a short story about a time-traveling lighthouse."
  }'
```

Server-side state with `previous_interaction_id`:

```python
# 1. First turn
turn1 = client.interactions.create(
    model="gemini-3.8-flash",
    input="Hi, my name is Phil."
)

# 2. Second turn (chained using previous_interaction_id)
turn2 = client.interactions.create(
    model="gemini-3.8-flash",
    input="What is my name?",
    previous_interaction_id=turn1.id
)

print(turn2.output_text)
```

```bash
# Replace PREVIOUS_INTERACTION_ID with the id returned from the first turn
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "What is my name?",
    "previous_interaction_id": "PREVIOUS_INTERACTION_ID"
  }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| model / agent | string | Standard Gemini model or specialized agent (for example Deep Research, custom managed agents) |
| input | string or list | Request input |
| previous_interaction_id | string | Continue a conversation using the stored history of a completed interaction |
| store | boolean | Default `true`. `store=false` opts into stateless behavior; incompatible with background execution and prevents `previous_interaction_id` for subsequent turns |
| background | boolean | `background=true` for long-running tasks |
| tools | list | Interaction-scoped; re-specify on each interaction |
| system_instruction | string | Interaction-scoped |
| generation_config | object | Interaction-scoped (including `thinking_level`, `temperature`, etc.) |

Supported models and agents (verbatim from the page):

| Model Name | Type | Model ID |
|---|---|---|
| Gemini 4 Argon | Model | `gemini-4-argon` |
| Gemini 3.8 Flash | Model | `gemini-3.8-flash` |
| Gemini 3.6 Flash | Model | `gemini-3.6-flash` |
| Gemini 3.1 Pro Preview | Model | `gemini-3.1-pro-preview` |
| Gemini 3.5 Flash-Lite | Model | `gemini-3.5-flash-lite` |
| Gemini 3.1 Flash-Lite | Model | `gemini-3.1-flash-lite` |
| Gemini 3 Flash Preview | Model | `gemini-3-flash-preview` |
| Gemini 2.5 Pro | Model | `gemini-2.5-pro` |
| Gemini 2.5 Flash | Model | `gemini-2.5-flash` |
| Gemini 2.5 Flash-lite | Model | `gemini-2.5-flash-lite` |
| Gemini 3 Pro Image | Model | `gemini-3-pro-image` |
| Gemini 3.1 Flash Image | Model | `gemini-3.1-flash-image` |
| Gemini 3.1 Flash TTS Preview | Model | `gemini-3.1-flash-tts-preview` |
| Gemma 4 31B IT | Model | `gemma-4-31b-it` |
| Gemma 4 26B MoE IT | Model | `gemma-4-26b-a4b-it` |
| Lyria 3.5 | Model | `lyria-3.5` |
| Lyria 3 Clip Preview | Model | `lyria-3-clip-preview` |
| Lyria 3 Pro Preview | Model | `lyria-3-pro-preview` |
| Deep Research Preview | Agent | `deep-research-preview-04-2026` |
| Deep Research Preview | Agent | `deep-research-max-preview-04-2026` |
| Antigravity Preview | Agent | `antigravity-preview-09-2026` |

## Notes

- "As of June 2026, it is Generally Available and recommended for all new projects." The original `generateContent` API is considered legacy but remains fully supported. Going forward, all new models, multimodal capabilities, tools, and agentic features launch on the Interactions API.
- An `Interaction` contains execution steps: model thoughts, server-side or client-side tool calls and results (`function_call`, `function_result`), and the final `model_output`. The stored resource (via `interactions.get`) also includes `user_input` steps; the `interactions.create` response only returns model-generated steps.
- `previous_interaction_id` preserves only conversation history (inputs and outputs). `tools`, `system_instruction`, and `generation_config` are interaction-scoped and must be re-specified. Stateless mode (sending full history each request) is also supported.
- Retention: paid tier 55 days; free tier 1 day. Paid-tier projects can configure the retention window in AI Studio (7, 14, 28, or 55 days). Delete with the `interactions.delete` method or in AI Studio Logs.
- Best practices: implicit caching works in stateful and stateless modes; `previous_interaction_id` makes it easier to reuse. You can mix Agent and Model interactions in one conversation, linked via `previous_interaction_id`.
- SDK minimums: Python `google-genai` from `2.3.0`; JavaScript `@google/genai` from `2.3.0`; Go `google.golang.org/genai`; Java `com.google.genai:google-genai`.
- Limitations: Remote MCP is not supported for Gemini 3 ("coming soon"). When mixing models, subsequent models must accept the output modalities of previous ones as input. Not yet available in the Interactions API but supported by `generateContent`: Batch API, Automatic function calling (Python), Explicit caching (implicit caching is available via `previous_interaction_id`).
- Feature guides listed: Text generation, Image generation, Image understanding, Audio understanding, Video understanding, Document processing, Function calling, Structured output, Deep Research agent, Flex inference, Priority inference.
- Docs fetched 2026-10-16. Examples use `v1beta`; the API is GA per the page.
- API availability: Interactions API.
- Distinct from OpenAI Responses API (openai-api-core skill) and Anthropic Messages API (anthropic-api-core skill).

## Related

- [get-started](./get-started.md)
- [overview](./overview.md)
- [libraries](./libraries.md)
