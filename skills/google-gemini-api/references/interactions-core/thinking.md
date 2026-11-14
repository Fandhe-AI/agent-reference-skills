---
source: https://ai.google.dev/gemini-api/docs/thinking
---

# Gemini thinking (incl. thought signatures)

Gemini models reason internally before responding. The Interactions API surfaces this as `thought` steps in the `steps` array; `thinking_level` controls effort and `thinking_summaries` enables summaries.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="What is the sum of the first 50 prime numbers?",
    generation_config={
        "thinking_summaries": "auto"
    }
)

for step in interaction.steps:
    if step.type == "thought":
        print("Thought summary:")
        if step.summary:
            for content_block in step.summary:
                if content_block.type == "text":
                    print(content_block.text)
        print()
    elif step.type == "model_output":
        for content_block in step.content:
            if content_block.type == "text":
                print("Answer:")
                print(content_block.text)
                print()
```

Control thinking effort:

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Provide a list of 3 famous physicists and their key contributions",
    generation_config={
        "thinking_level": "low"
    }
)
print(interaction.output_text)
```

```javascript
const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: "Provide a list of 3 famous physicists and their key contributions",
    generation_config: {
        thinking_level: "low"
    }
});
console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Provide a list of 3 famous physicists and their key contributions",
    "generation_config": {
      "thinking_level": "low"
    }
  }'
```

Token usage:

```python
print("Thoughts tokens:", interaction.usage.total_thought_tokens)
print("Output tokens:", interaction.usage.total_output_tokens)
```

## Options / Props

Thought step fields:

| Field | Required | Description |
|-------|----------|-------------|
| signature | Yes | Encrypted representation of the model's internal reasoning state; always present, even with minimal reasoning |
| summary | No | Array of content (text and/or images) summarizing the reasoning; may be empty depending on `thinking_summaries`, how much reasoning occurred, or content type |

Streaming delta types in a `thought` step:

| Delta type | Contains | When sent |
|------------|----------|-----------|
| thought_summary | Text or image summary content | One or more deltas with incremental summary |
| thought_signature | The signature | Last delta before `step.stop` |

Default thinking and supported `thinking_level` values:

| Model | Default Thinking | Levels Supported |
|-------|------------------|------------------|
| gemini-4-carbon | On (medium) | low, medium, high |
| gemini-4-argon | On (medium) | low, medium, high |
| gemini-4-hydrogen | On (high) | low, medium, high, xhigh |
| gemini-3.8-flash | On (medium) | low, medium, high |
| gemini-3.6-flash | On (medium) | minimal, low, medium, high |
| gemini-3.5-flash-lite | On (minimal) | minimal, low, medium, high |
| gemini-3.1-pro-preview | On (high) | low, medium, high |
| gemini-3.1-flash-lite-image | On (minimal) | minimal, high |
| gemini-3-flash-preview | On (high) | minimal, low, medium, high |
| gemini-3-pro-preview | On (high) | low, high |
| gemini-2.5-pro | On | low, medium, high |
| gemini-2.5-flash | On | low, medium, high |
| gemini-2.5-flash-lite | Off | low, medium, high |
| gemini-robotics-er-2-preview | On (high) | minimal, low, medium, high |

### Understanding thinking levels

The `thinking_level` is your main control over quality, latency, and token use in Gemini 4 Hydrogen. The model defaults to `high` and introduces `xhigh`:

| Thinking level | Token use | When to use |
| :--- | :--- | :--- |
| `low` | Fewest tokens, lowest latency | Cost- and latency-sensitive workloads, such as fast chat and high-throughput processing. Still capable on agentic tasks. |
| `medium` | Lower token use, faster responses | Interactive coding, live UI prototyping, responsive chat, and latency-sensitive tool calls. (Default on `gemini-4-carbon`, `gemini-4-argon`, `gemini-3.8-flash`, and `gemini-3.6-flash`.) |
| `high` (default on `gemini-4-hydrogen`) | Balanced intelligence and speed | Recommended default on `gemini-4-hydrogen` for most tasks, including complex coding, agentic execution, tool calling, and multimodal knowledge work. Maximum reasoning depth on `gemini-4-carbon`, `gemini-4-argon`, and Gemini 3 models. |
| `xhigh` | Most tokens, deepest reasoning | Reserve for hard, multi-step coding and agentic problems where `high` falls short, when you can trade higher latency and token use (supported on `gemini-4-hydrogen`). |
| `minimal` | Near-off thinking, lowest latency | Matches a near-off setting for most queries on `gemini-3.6-flash`, `gemini-3.5-flash-lite` (default), `gemini-3.1-flash-lite`, `gemini-3-flash-preview`, and `gemini-robotics-er-2-preview`. Not supported on Gemini 4 models or `gemini-3.8-flash`. |

Start with `high` for most complex tasks, and reserve `xhigh` for hard, multi-step problems where `high` falls short. Using `xhigh` increases latency and token use and can cause overthinking or exhaust `max_output_tokens` on simpler prompts such as text or JSON extraction. Run your evaluations at all four levels with a high `max_output_tokens` so the limit doesn't cut answers short, then pick the lowest `thinking_level` that meets your quality bar.

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-4-hydrogen",
    input="Audit this payment retry queue for race conditions and rewrite the lock acquisition logic.",
    generation_config={
        "thinking_level": "xhigh"
    }
)

print(interaction.output_text)
```

## Notes

- Availability: Interactions API. The generateContent API has no dedicated thought blocks (signatures are metadata attached to any part); see the generate-content category for that API.
- In the Interactions API, signatures appear only on `thought` steps or built-in tool steps (such as `google_search_call` / `google_search_result`). They never appear on user inputs, model outputs, or standard function calls.
- Thought signatures: in stateful mode (`store: true` and `previous_interaction_id`), the server manages thoughts and signatures automatically. In stateless mode you MUST resend all `thought` blocks exactly as received, must not remove or modify them, should still resend the previous model's thought blocks when switching models, and must also resend signatures on built-in tool call/result blocks.
- Pricing is output tokens plus thinking tokens (`total_thought_tokens`); you are billed for the full thought tokens even though only summaries are returned.
- `max_output_tokens` includes thought tokens. Hitting the limit while reasoning stops generation with status `"incomplete"` and truncated or empty output (thinking tokens still billed). To cut cost or latency, lower `thinking_level` instead of setting a small `max_output_tokens`.
- Gemini 4 (`gemini-4-carbon`, `gemini-4-argon`, `gemini-4-hydrogen`): input, thinking, and output share one 1,048,576-token context window; with `background=False` the cap is `65,536` output tokens (larger values return `400`; per the source, a single foreground hop generates up to 65,536 tokens for streaming calls and `gemini-4-hydrogen` non-streaming calls, and up to 32,768 tokens for non-streaming calls on `gemini-4-carbon` and `gemini-4-argon`); set `background=True` with `max_output_tokens` > `65,536` for long decode.
- Always handle thought steps whose `summary` is empty or absent.
- Best practices: review thought summaries to improve prompts; use minimal or low thinking for simple retrieval or classification, default for moderate tasks, maximum for advanced coding, math, or multi-step planning.
- Migration (May 2026 breaking changes): thought content is returned in `steps` (type `thought`) rather than the legacy flat `outputs` array.

- Source: https://aistudio.google.com/docs/thinking (fetched 2026-11-14)

## Related

- [Text generation](./text-generation.md)
- [Streaming interactions](./streaming.md)
- [Long decode](./long-decode.md)
- [Background execution](./background-execution.md)
