---
source: https://ai.google.dev/gemini-api/docs/latest-model
---

# What's new in Gemini 4 Argon

Gemini 4 Argon (`gemini-4-argon`) is described as the latest, most capable model: unified 1M-token context window, long decode up to 1M tokens, and tunable thinking levels (`low`, `medium`, `high`).

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-4-argon",
    input="Write a three.js script that renders a realistic 3D black hole with gravitational lensing."
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: "gemini-4-argon",
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
    "model": "gemini-4-argon",
    "input": "Write a three.js script that renders a realistic 3D black hole with gravitational lensing."
  }'
```

Long decode via background execution (Python):

```python
import time
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-4-argon",
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
```

Managed Agents with the Antigravity agent (Python):

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Audit https://web.dev for performance, Core Web Vitals, and SEO.",
    environment="remote",
    agent_config={
        "type": "antigravity",
        "model": "gemini-4-argon",
    },
)
```

## Options / Props

| Model | Model ID | Default thinking level | Pricing |
| --- | --- | --- | --- |
| Gemini 4 Argon | `gemini-4-argon` | `medium` | Through Nov 30, 2026: $2/1M input and $10/1M output tokens ($4/1M input and $20/1M output thereafter) |

| Thinking level | Token use | When to use |
| --- | --- | --- |
| `low` | Fewest tokens, lowest latency | Simpler tasks and cost-sensitive work; light thinking analysis and writing. Quality can drop on hard tasks. |
| `medium` (default) | Balanced | Recommended for most tasks, including complex code and agentic use cases. |
| `high` | Most tokens, slowest first token | Complex reasoning, hard math and science, hardest code or agent tasks. Pairs well with long decode. |

Output token limit guidance (`max_output_tokens`, total thinking + output):

| Case | Recommendation |
| --- | --- |
| Standard tasks | Keep the default of 65,536 or set no value |
| Existing apps with a limit lower than 32K | Raise to at least 32,768 |
| Complex reasoning and coding | `background: true` and 131,072 or 262,144, up to 1,048,576 minus input tokens |

## Notes

- What's new: unified 1M input-output limit (input, thinking, and output share one window of 1,048,576 tokens); long decode (a single response can go past 64K tokens, up to 1M minus input); agentic video understanding is generally available; Antigravity agent in Gemini Managed Agents supports Gemini 4 Argon.
- If `background: true` is set without `max_output_tokens`, the server stops after 64K tokens. Each continuation hop adds a `model_output` step to `interaction.steps`; join text across all `model_output` steps.
- Migration checklist (source): update model ID; raise `max_output_tokens` to at least 32,768; choose thinking level and test all three; explicit context caching (`cachedContents` / `caches.create`) is not supported, implicit caching is on by default for prompts of at least 4,096 tokens and discounts cached input tokens by 95% on cache hits; remove `temperature`, `top_p`, `top_k` (ignored if provided); use background execution for outputs over 64K; raise client timeouts (hard prompts can take several minutes; set at least 15 minutes otherwise); use `previous_interaction_id` for server-side conversation state.
- Cached input pricing: $0.10 per 1M tokens ($0.20 starting December 1, 2026). Not available on the Free tier or the Google AI Pro plan.
- Client-side continuation exists in the generateContent API (long-decode page) and is "coming soon" to the Interactions API per the source.
- Docs fetched 2026-10-16. Other pages in the same docs tree link `/docs/latest-model` as the Gemini 3.8 Flash guide and link `whats-new-gemini-3.8`, which has no saved page; this page's content describes Gemini 4 Argon only.
- API surface: Interactions API (examples use `client.interactions.create`).
- Distance: Core text-generation call shape resembles Responses API in openai-api-core and Messages API in anthropic-api-core but is a different API. Managed Agents with Antigravity are distinct from anthropic-managed-agents, anthropic-agent-sdk, openai-agents and hermes-agent.

## Related

- [Models](./models-catalog.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
- [What's new in Gemini 3.7 Flash](./whats-new-gemini-3-7.md)
