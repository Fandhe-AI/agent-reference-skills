---
source: https://ai.google.dev/gemini-api/docs/latest-model
---

# What's new in Gemini 4 Argon

Gemini 4 Argon (`gemini-4-argon`) is our efficient Gemini 4 frontier reasoning model. It delivers Gemini 4 intelligence with faster responses and lower token spend per turn compared to Gemini 4 Carbon across complex coding, agentic, math, and science tasks. It supports a unified 1M-token context window, long decode up to 1M tokens, and tunable thinking levels (`low`, `medium`, `high`).

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
print("Status:", interaction.status)
print("Usage:", interaction.usage)
```

Managed Agents with the Antigravity agent (Python):

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Audit https://web.dev for performance, Core Web Vitals, and SEO.",
    environment="remote",
    agent_config={
        "type": "antigravity",
        "model": "gemini-4-argon",
    },
)

print(interaction.output_text)
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

- Source: https://aistudio.google.com/docs/whats-new-gemini-4-argon (fetched 2026-11-14)
- GA: changelog October 13, 2026 - "Gemini 4 Argon (`gemini-4-argon`) generally available (GA)", described there as our most capable model built for complex coding, agentic, math, and science tasks. The current what's-new page instead calls Argon the efficient Gemini 4 frontier model and positions Carbon (GA 2026-11-10) as the strongest reasoning model.
- What's new: unified 1M input-output limit (input, thinking, and output share one window of 1,048,576 tokens); long decode (a single response can go past 64K tokens, up to 1M minus input); agentic video understanding is generally available; Antigravity agent in Gemini Managed Agents supports Gemini 4 Argon.
- If `background: true` is set without `max_output_tokens`, the server stops after 64K tokens. Each continuation hop adds a `model_output` step to `interaction.steps`; join text across all `model_output` steps.
- Migration checklist (source): update model ID; raise `max_output_tokens` to at least 32,768; choose thinking level and test all three; explicit context caching (`cachedContents` / `caches.create`) is not supported, implicit caching is on by default for prompts of at least 4,096 tokens and discounts cached input tokens by 95% on cache hits; remove `temperature`, `top_p`, `top_k` (ignored if provided); use background execution for outputs over 64K; raise client timeouts (hard prompts can take several minutes; set at least 15 minutes otherwise); use `previous_interaction_id` for server-side conversation state.
- Cached input pricing: $0.10 per 1M tokens ($0.20 starting December 1, 2026). Not available on the Free tier or the Google AI Pro plan.
- Client-side continuation (finer control over retries, backoff, and error handling, or unstored interactions) is available in both the Interactions API and the GenerateContent API per the current page (see the long decode guide); the earlier "coming soon" note for the Interactions API no longer applies.
- Choosing between models (source): Carbon (`gemini-4-carbon`) spends more thinking tokens per turn and suits root-cause debugging, architectural design, dense multimodal synthesis, scientific proofs, and security auditing; Argon suits interactive coding, day-to-day feature work, and fast production loops. Both share the 1M unified context window, built-in tools, and per-token pricing. Gemini 4 Hydrogen (GA 2026-11-12, $1.50 / $7.50 per 1M tokens, adds `xhigh`) is the faster, cheaper member; see the Hydrogen page.
- Antigravity: Argon is selected via `agent_config.model`; the default model of the Antigravity agent is now `gemini-4-hydrogen` (changelog 2026-11-12). The `gemini-3.8-flash` what's-new page is saved as a separate page.
- Pricing section (source): through November 30, 2026 input $2.00 / output (including thinking tokens) $10.00 per 1M tokens ($4.00 / $20.00 starting December 1, 2026). Not available on the Free tier. Grounding with Google Search remains billed per query.
- API surface: Interactions API (examples use `client.interactions.create`).
- Distance: Core text-generation call shape resembles Responses API in openai-api-core and Messages API in anthropic-api-core but is a different API. Managed Agents with Antigravity are distinct from anthropic-managed-agents, anthropic-agent-sdk, openai-agents and hermes-agent.

## Related

- [Models](./models-catalog.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
- [What's new in Gemini 4 Carbon](./whats-new-gemini-4-carbon.md)
- [What's new in Gemini 4 Hydrogen](./whats-new-gemini-4-hydrogen.md)
- [What's new in Gemini 3.8 Flash](./whats-new-gemini-3-8.md)
- [What's new in Gemini 3.7 Flash](./whats-new-gemini-3-7.md)
