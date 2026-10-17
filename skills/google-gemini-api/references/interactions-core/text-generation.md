---
source: https://ai.google.dev/gemini-api/docs/text-generation
---

# Text generation

Generate text output from text, image, video, and audio inputs with `interactions.create` (Interactions API).

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="How does AI work?"
)
print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "How does AI work?",
  });
  console.log(interaction.output_text);
}

await main();
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "How does AI work?"
  }'
```

System instruction and generation config:

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    system_instruction="You are a cat. Your name is Neko.",
    input="Hello there",
    generation_config={
        "max_output_tokens": 500
    }
)
```

Multi-turn (server-side state) with `previous_interaction_id`:

```python
interaction1 = client.interactions.create(
    model="gemini-3.8-flash",
    input="I have 2 dogs in my house.",
)

interaction2 = client.interactions.create(
    model="gemini-3.8-flash",
    input="How many paws are in my house?",
    previous_interaction_id=interaction1.id,
)
print(interaction2.output_text)
```

Stateless multi-turn (`store=False`, resend steps):

```python
history = [
    {
        "type": "user_input",
        "content": [{"type": "text", "text": "I have 2 dogs in my house."}]
    }
]

interaction1 = client.interactions.create(
    model="gemini-3.8-flash",
    store=False,
    input=history
)

for step in interaction1.steps:
    history.append(step.model_dump())

history.append({
    "type": "user_input",
    "content": [{"type": "text", "text": "How many paws are in my house?"}]
})

interaction2 = client.interactions.create(
    model="gemini-3.8-flash",
    store=False,
    input=history
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| model | string | Model ID, e.g. `gemini-3.8-flash` |
| input | string or array | Prompt text, or an array of content blocks (e.g. `{"type": "text", ...}`, `{"type": "image", "uri": ..., "mime_type": ...}`) or steps in stateless mode |
| system_instruction | string | Guides model behavior |
| generation_config | object | Overrides generation parameters, e.g. `max_output_tokens`, `thinking_level` |
| previous_interaction_id | string | Chains a turn to a prior interaction; the server manages history |
| store | boolean | `false` opts out of server-side storage (stateless mode) |
| stream | boolean | Streams the response as server-sent events |

## Notes

- Availability: Interactions API (REST examples use `v1beta`).
- `interaction.output_text` returns the last text blocks; consecutive `TextContent` blocks are joined. It does not include earlier text blocks separated by non-text content (thoughts, images, audio, tool calls). For interleaved multimodal responses, iterate over `steps`.
- Gemini models often have thinking enabled by default; control it with `generation_config.thinking_level`.
- Gemini 4 and Gemini 3.6+ models ignore custom values for `temperature`, `top_p`, and `top_k` and return deprecation warning headers. Remove these sampling parameters from requests.
- In stateless mode, if the model uses thinking or tools, you must preserve and resend all model-generated steps (such as `thought` and `function_call` steps) exactly as received, as they contain signatures required to continue the conversation.
- Migration (May 2026 breaking changes): responses return a `steps` array instead of the legacy `outputs` array; stateless history is now the collected `steps` plus a new `user_input` step. SDK Python and JavaScript >= 2.0.0 use the new schema. For REST, `Api-Revision: 2026-05-20` was the opt-in header until the new schema became the default on May 26, 2026; the legacy schema was removed on June 8, 2026 and the `Api-Revision` header is now ignored, so REST examples without the header already use the `steps` schema (see migration category).
- Distinct from OpenAI Responses API (`openai-api-core`) and Anthropic Messages API (`anthropic-api-core`); this is the Gemini `interactions.create` call.

## Related

- [Streaming interactions](./streaming.md)
- [Structured outputs](./structured-output.md)
- [Thinking](./thinking.md)
- [Prompt design strategies](./prompting-strategies.md)
