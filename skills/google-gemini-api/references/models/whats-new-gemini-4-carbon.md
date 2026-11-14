---
source: https://aistudio.google.com/docs/whats-new-gemini-4-carbon
---

# What's new in Gemini 4 Carbon

Gemini 4 Carbon (`gemini-4-carbon`) is our strongest reasoning model, built for sustained agentic workflows across complex software engineering, multimodal knowledge work, scientific reasoning, and cybersecurity defense. On hard problems, Carbon spends more thinking tokens to explore hypotheses, verify its work, and check edge cases before responding.

## Signature / Usage

Quickstart with the default `thinking_level` (`medium`) and a 64K output token limit:

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-4-carbon",
    input="Write a three.js script that renders a realistic 3D black hole with gravitational lensing."
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: "gemini-4-carbon",
  input: "Write a three.js script that renders a realistic 3D black hole with gravitational lensing.",
});

console.log(interaction.output_text);
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "model": "gemini-4-carbon",
    "input": "Write a three.js script that renders a realistic 3D black hole with gravitational lensing."
  }'
```

Thinking level (Python):

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-4-carbon",
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
  model: "gemini-4-carbon",
  input: "Analyze this payment processing pipeline for race conditions during retry attempts and rewrite the transaction locks safely.",
  generation_config: {
    thinking_level: "medium", // Balanced reasoning effort for complex tasks
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
    model="gemini-4-carbon",
    input="Write a complete, rigorous proof of the prime number theorem.",
    background=True,
    generation_config={
        "max_output_tokens": 262144,
        "thinking_level": "high",
    },
)

while interaction.status in ("in_progress", "queued"):
    time.sleep(5)
    interaction = client.interactions.get(id=interaction.id)

# Each hop adds a model_output step, so join the text of all of them.
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

Managed Agents with the Antigravity agent (Python):

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input=(
        "Audit https://web.dev for performance, Core Web Vitals, and SEO. "
        "Query Google's PageSpeed Insights API for both Mobile and Desktop strategies. "
        "Check search indexing with Google Search for site:web.dev. "
        "Format the output as a side-by-side scorecard table with prioritized fixes."
    ),
    environment="remote",
    agent_config={
        "type": "antigravity",
        "model": "gemini-4-carbon",
    },
)

print(interaction.output_text)
```

## Options / Props

| Model | Model ID | Default thinking level | Pricing |
| --- | --- | --- | --- |
| Gemini 4 Carbon | `gemini-4-carbon` | `medium` | Available through Nov 30, 2026 at an introductory price of $2/1M input tokens and $10/1M output tokens ($4/1M input and $20/1M output thereafter) |

| Thinking level | Token use | When to use |
| --- | --- | --- |
| `low` | Fewest tokens, lowest latency | Simpler tasks and cost-sensitive work. Also works for analysis and writing tasks that need light thinking. Quality can drop on hard tasks. |
| `medium` (default) | Balanced | Recommended for most tasks, including complex code and agentic use cases. |
| `high` | Most tokens, slowest first token | Complex reasoning, hard math and science, and the most difficult code or agent tasks. Pairs well with long decode for long outputs. |

Output token limit guidance (`max_output_tokens`, combined thinking and output):

| Case | Recommendation |
| --- | --- |
| Standard tasks | Keep the default of 65,536 or don't set any value |
| Existing apps with a limit lower than 32K | Raise to at least 32,768; Carbon can spend more of the limit on thinking than earlier models, so lower the thinking level to use fewer tokens |
| Complex reasoning and coding | `background: true` and 131,072 or 262,144, up to 1,048,576 minus your input tokens |

Carbon vs Argon (source): both share the same 1M unified context window, built-in tools, and per-token pricing. Carbon spends more thinking tokens per turn (deeper reasoning, higher per-turn token use and latency); Argon is the efficient model for interactive coding, day-to-day feature work, and fast production loops.

## Notes

- Source: https://aistudio.google.com/docs/whats-new-gemini-4-carbon (fetched 2026-11-14)
- GA: changelog November 10, 2026 - "Gemini 4 Carbon (`gemini-4-carbon`) generally available (GA)", our most capable reasoning model built for sustained agentic coding, multimodal knowledge work, scientific reasoning, and cybersecurity defense, at introductory pricing of $2.00 per 1M input tokens and $10.00 per 1M output tokens through November 30, 2026.
- Pricing (source): input $2.00 per 1M tokens ($4.00 starting December 1, 2026); cached input (implicit caching, 95% discount) $0.10 per 1M tokens ($0.20 starting December 1, 2026); output including thinking tokens $10.00 per 1M tokens ($20.00 starting December 1, 2026). Not available on the Free tier (the page says paid tier of the Gemini API and Google AI Studio). Grounding with Google Search is still billed per query; every token processed is billed, including internal tool system instructions and function declarations when using grounding.
- What's new (source): extended verification and agentic coding (deeper build-and-verify loops across complex repositories, frontend UI design, and 3D scenes); higher precision on multimodal knowledge work (dense PDFs, spreadsheets, slides, workspace data; strict output schema adherence); scientific and cybersecurity reasoning; unified 1,048,576-token window with long decode; supported in Managed Agents (Antigravity agent, set `agent_config.model` to `gemini-4-carbon`).
- If `background: true` is set without `max_output_tokens`, the server stops after 64K tokens. Each continuation hop adds a `model_output` step to `interaction.steps`; join text across all of them. Client-side continuation exists in the Interactions API and the GenerateContent API (see the long decode guide).
- Migrate from Gemini 4 Argon (source): no request schema changes. Change the model string; account for longer thinking (keep `thinking_level` at `medium` unless a workload needs `high`, and make sure `max_output_tokens` and HTTP timeouts allow longer reasoning passes); keep `gemini-4-argon` where speed matters.
- Migrate from Gemini 3 and earlier (source): update model ID; raise `max_output_tokens` to at least 32,768; choose and test thinking level; explicit context caching (`cachedContents` / `caches.create`) is not supported, implicit caching is on by default for prompts of at least 4,096 tokens and discounts cached input tokens by 95% on cache hits; remove `temperature`, `top_p`, `top_k` (ignored if provided); use background execution for outputs over 64K; use HTTP client timeouts of at least 15 minutes (or background execution); use `previous_interaction_id` for server-side conversation state.
- API surface: Interactions API (examples use `client.interactions.create`).
- Distance: Managed Agents with Antigravity are distinct from anthropic-managed-agents, anthropic-agent-sdk, openai-agents and hermes-agent. The Gemini "Agent Skills" (`gemini-api-dev` coding-agent skill) are not Claude Code Agent Skills.

## Related

- [What's new in Gemini 4 Argon](./whats-new-gemini-4-argon.md)
- [What's new in Gemini 4 Hydrogen](./whats-new-gemini-4-hydrogen.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
- [Models](./models-catalog.md)
