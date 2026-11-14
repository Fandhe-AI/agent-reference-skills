---
source: https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen
---

# What's new in Gemini 4 Hydrogen

Gemini 4 Hydrogen (`gemini-4-hydrogen`) brings cutting-edge intelligence to everyone, with speed and efficiency for everyday coding and agentic workflows. It is available on both the free and paid tiers in Google AI Studio and the Gemini API (across both GenerateContent and the Interactions API), and adds a fourth thinking level, `xhigh`, alongside `low`, `medium`, and the default `high`.

## Signature / Usage

Quickstart (default `thinking_level` is `high`; 64K synchronous output token limit):

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-4-hydrogen",
    input="Build an interactive single-file HTML token bucket rate-limiter simulator with live sliders for burst size and request traffic."
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: "gemini-4-hydrogen",
  input: "Build an interactive single-file HTML token bucket rate-limiter simulator with live sliders for burst size and request traffic.",
});

console.log(interaction.output_text);
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "model": "gemini-4-hydrogen",
    "input": "Build an interactive single-file HTML token bucket rate-limiter simulator with live sliders for burst size and request traffic."
  }'
```

Thinking level `xhigh` (Python):

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

Thinking level `xhigh` (JavaScript):

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: "gemini-4-hydrogen",
  input: "Audit this payment retry queue for race conditions and rewrite the lock acquisition logic.",
  generation_config: {
    thinking_level: "xhigh",
  },
});

console.log(interaction.output_text);
```

Long decode via background execution (Python):

```python
import time
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-4-hydrogen",
    input="Generate a complete multi-module migration specification and test suite for this service.",
    background=True,
    generation_config={
        "max_output_tokens": 262144,
        "thinking_level": "high",
    },
)

while interaction.status in ("in_progress", "queued"):
    time.sleep(5)
    interaction = client.interactions.get(id=interaction.id)

# Join text across all 64K continuation hops.
text = "".join(
    content.text
    for step in interaction.steps
    if step.type == "model_output"
    for content in step.content
    if content.type == "text"
)
print(text)
print("Status:", interaction.status)
print("Usage:", interaction.usage)
```

The Antigravity agent now uses `gemini-4-hydrogen` by default (Python):

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input=(
        "Audit https://web.dev for performance, Core Web Vitals, and SEO. "
        "Query Google's PageSpeed Insights API for both Mobile and Desktop strategies. "
        "Check search indexing with Google Search for site:web.dev. "
        "Format the output as a side-by-side scorecard table with prioritized fixes."
    ),
    environment="remote",
)

print(interaction.output_text)
```

## Options / Props

| Model | Model ID | Thinking levels | Paid tier price |
| --- | --- | --- | --- |
| Gemini 4 Hydrogen | `gemini-4-hydrogen` | `low`, `medium`, `high` (default), `xhigh` | $1.50 / 1M input, $7.50 / 1M output |

| Thinking level | Token use | When to use |
| --- | --- | --- |
| `low` | Fewest tokens, lowest latency | Cost- and latency-sensitive workloads, such as fast chat and high-throughput processing. Still capable on agentic tasks. |
| `medium` | Lower token use, faster responses | Interactive coding, live UI prototyping, responsive chat, and latency-sensitive tool calls. |
| `high` (default) | Balanced intelligence and speed | Recommended default for most tasks, including complex coding, agentic execution, tool calling, and multimodal knowledge work. |
| `xhigh` | Most tokens, deepest reasoning | Reserve for hard, multi-step coding and agentic problems where `high` falls short, when you can trade higher latency and token use. |

Output token limit guidance (`max_output_tokens` caps combined thinking and output tokens):

| Case | Recommendation |
| --- | --- |
| Standard tasks | Keep the 65,536 default or omit `max_output_tokens` |
| Existing apps with a low cap | Remove hardcoded low caps (such as 8,192) or raise to 65,536; lower the thinking level to use fewer tokens |
| Long outputs and multi-step tasks | `background: true` and 131,072 or 262,144, up to 1,048,576 minus your input tokens |

Model selection (source): Hydrogen is fast and efficient for everyday coding, interactive web apps, tool-using agents, multimodal document workflows, and parallel subagent execution (recommended upgrade from Gemini 3.8 Flash and earlier Gemini 3 and 2.5 models); Carbon is the strongest frontier model for hard architecture, debugging, science, and security audits; Argon handles most advanced long-horizon tasks with lower token use than Carbon; `gemini-3.5-flash-lite` is the fastest, lowest-cost model for high-volume classification, routing, and sub-second latency. Carbon and Hydrogen can be paired in one workflow (Carbon plans or resolves hard roadblocks, Hydrogen executes code edits, subagents, and tests).

## Notes

- Source: https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen (fetched 2026-11-14)
- GA: changelog November 12, 2026 - "Gemini 4 Hydrogen (`gemini-4-hydrogen`) generally available (GA)"; available on the free tier and at paid-tier pricing of $1.50 per 1M input tokens and $7.50 per 1M output tokens; introduces a fourth `xhigh` thinking level alongside `low`, `medium`, and default `high`; now the default model for the Antigravity agent in Gemini Managed Agents.
- Pricing (source): flat standard pricing on the paid tier across the full 1M context window. Free tier: free of charge (rate-limited; see rate limits). Input $1.50 per 1M tokens; cached input (implicit caching, 95% discount) $0.075 per 1M tokens; output including thinking tokens $7.50 per 1M tokens. Grounding with Google Search remains billed per query; every token processed is billed, including internal tool system instructions and function declarations when using grounding.
- What's new (source): fast agentic execution (cuts fabricated claims by more than 5x compared to Gemini 3.8 Flash by flagging missing context instead of guessing; batches read and search tool calls in parallel; better adapts when tool calls fail); four thinking levels; built for multi-model orchestration with Carbon and Argon; stronger multimodal reasoning including agentic video understanding; unified 1,048,576-token window with long decode via background execution or client-side continuation; default model for the Antigravity agent (configurable via `agent_config`).
- `xhigh` increases latency and token use and can cause overthinking on simpler prompts. Run evaluations at all four levels with a high `max_output_tokens`, then pick the lowest level that meets the quality bar.
- If `background` is `true` without `max_output_tokens`, the server stops after 65,536 tokens (the Carbon and Argon pages say 64K).
- Migrate from Gemini 3.8 Flash and earlier (source): update model ID (`gemini-3.8-flash` to `gemini-4-hydrogen`); one unified 1,048,576-token window across input, thinking, and output (3.8 Flash separates 1M input and 64K output), keeping the 65,536 single-request default and cap for streaming and non-streaming; Hydrogen defaults to `high` rather than `medium`, adds `xhigh`, and rejects `minimal` with an error; no explicit context caching (`cachedContents` / `caches.create`), implicit caching on by default for prompts of at least 4,096 tokens with a 95% discount on cache hits; remove `temperature`, `top_p`, `top_k` (in-range custom values are ignored; out-of-range values return a `400` validation error); declare tools natively with function calling or constrain JSON with structured outputs (prompting for raw-text JSON tool calls with zero declared tools can return `MALFORMED_FUNCTION_CALL`); use `previous_interaction_id`, and in client-managed `generateContent` histories return prior model turns and thought signatures unchanged (do not copy a thought signature across parallel `functionCall` parts); use background execution or client-side continuation past 64K.
- Migrate from or pair with Carbon and Argon (source): no request schema changes; Hydrogen defaults to `high` and supports `xhigh`, whereas Carbon and Argon default to `medium` and cap at `high`; Hydrogen supports up to 65,536 tokens per non-streaming hop across REST and SDK calls versus 32,768 per non-streaming REST hop on Carbon and Argon; route planning turns to `gemini-4-carbon` and execution turns to `gemini-4-hydrogen` in one multi-turn session via `previous_interaction_id` (or preserved thought steps in stateless mode).
- API surface: Interactions API (examples) and GenerateContent.
- Distance: Managed Agents with Antigravity are distinct from anthropic-managed-agents, anthropic-agent-sdk, openai-agents and hermes-agent.

## Related

- [What's new in Gemini 4 Carbon](./whats-new-gemini-4-carbon.md)
- [What's new in Gemini 4 Argon](./whats-new-gemini-4-argon.md)
- [What's new in Gemini 3.8 Flash](./whats-new-gemini-3-8.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
