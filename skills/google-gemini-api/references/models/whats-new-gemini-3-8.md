---
source: https://aistudio.google.com/docs/whats-new-gemini-3.8
---

# What's new in Gemini 3.8 Flash

Gemini 3.8 Flash (`gemini-3.8-flash`) is our most intelligent Flash model, engineered for long-horizon software engineering, autonomous agents, and complex enterprise workflows. It supports a 1M token context window, 64k max output tokens, tunable thinking levels (`low`, `medium`, `high`), and the same suite of built-in tools.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Write a three.js script that renders a realistic 3D black hole."
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: "gemini-3.8-flash",
  input: "Write a three.js script that renders a realistic 3D black hole.",
});

console.log(interaction.output_text);
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Write a three.js script that renders a realistic 3D black hole."
  }'
```

Thinking level (Python):

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Analyze this payment processing pipeline for race conditions during retry attempts and rewrite the transaction locks safely.",
    generation_config={
        "thinking_level": "medium"  # Balanced reasoning effort for complex tasks
    }
)

print(interaction.output_text)
```

Thinking level (JavaScript):

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: "gemini-3.8-flash",
  input: "Analyze this payment processing pipeline for race conditions during retry attempts and rewrite the transaction locks safely.",
  generation_config: {
    thinking_level: "medium"
  }
});

console.log(interaction.output_text);
```

Thinking level (REST):

```bash
curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Analyze this payment processing pipeline for race conditions during retry attempts and rewrite the transaction locks safely.",
    "generation_config": {
      "thinking_level": "medium"
    }
  }'
```

Antigravity agent (Managed Agents; built with Gemini 3.8 Flash by default per this page, Python):

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

| Model | Model ID | Default thinking level | Pricing |
| --- | --- | --- | --- |
| Gemini 3.8 Flash | `gemini-3.8-flash` | `medium` | Available through the end of year at an introductory price of $0.75/1M input tokens and $3.75/1M output tokens |

| Thinking level | When to use |
| --- | --- |
| Low | Reduces time-to-answer for latency-critical tasks like incident response pipelines, real-time chat, writing drafts, and fast data analysis. |
| Medium (default) | Best quality for most tasks. Recommended for complex code and agentic use cases, providing higher first-pass accuracy. |
| High | Maximizes the model's reasoning and tool orchestration capabilities. Best for deep reasoning, mathematics, and difficult multi-step tasks. |

`minimal` is not supported for Gemini 3.8 Flash and returns an error.

## Notes

- Source: https://aistudio.google.com/docs/whats-new-gemini-3.8 (fetched 2026-11-14)
- GA: changelog September 2, 2026 - "Gemini 3.8 Flash generally available (GA)": released `gemini-3.8-flash`, our most intelligent Flash model.
- Pricing (source): introductory rate of $0.75/1M input tokens and $3.75/1M output tokens through December 31, 2026; standard pricing of $1.50/1M input tokens and $7.50/1M output tokens takes effect January 1, 2027. Introductory pricing also applies to Gemini 3.6 Flash across Google AI Studio and Gemini Enterprise Agent Platform through December 31, 2026.
- What's new (source): long-horizon software engineering (multi-file refactoring, deterministic tool execution); autonomous agents (multi-step planning and tool orchestration); complex enterprise workflows; default model for Managed Agents (the Antigravity agent, and the Antigravity SDK by default). Note: the 2026-11-12 changelog entry says `gemini-4-hydrogen` is now the default for the Antigravity agent, so this page's statement is superseded.
- Gemini 3.8 Flash can use more tokens on longer running and complex tasks by design (smaller reasoning steps, iterative tool calls, verification); lower the reasoning effort for everyday tasks. Gemini 3.6 Flash remains supported.
- Migration checklist (source): update model ID to `gemini-3.8-flash`; replace `thinking_budget` with the string enum `thinking_level` (`minimal` unsupported); remove `temperature`, `top_p`, `top_k`, `candidate_count`, and prefilled model turns (see What's new in Gemini 3.6 API changes); standardize multi-turn on server-side `previous_interaction_id`; audit function calling (multimodal assets inside the response payload, inline instructions formatted with `\n\n`, `Malformed_Function_Call` workarounds for pre-tool text, and `call_id` and `name` on every `FunctionResponse` only when using generateContent); see thought signatures for SDK updates.
- Deprecation routing (changelog): `gemini-3.7-flash` routes to `gemini-3.8-flash` (2026-10-08); `gemini-2.5-pro` routes to `gemini-3.8-flash` from December 1, 2026 (2026-11-02).
- The source page also shows Java and Go examples; only Python, JavaScript, and REST are reproduced here.
- Distance: Managed Agents with Antigravity are distinct from anthropic-managed-agents, anthropic-agent-sdk, openai-agents and hermes-agent.

## Related

- [What's new in Gemini 4 Hydrogen](./whats-new-gemini-4-hydrogen.md)
- [What's new in Gemini 3.7 Flash](./whats-new-gemini-3-7.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
- [Models](./models-catalog.md)
