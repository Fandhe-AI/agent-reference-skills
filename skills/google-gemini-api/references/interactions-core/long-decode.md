---
source: https://ai.google.dev/gemini-api/docs/long-decode
---

# Long decode

Long decode lets Gemini 4 Argon generate past 64K tokens, up to the unified 1M-token context window (1,048,576 tokens shared across input, thinking, and output), by running the interaction with background execution.

## Signature / Usage

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

```javascript
let interaction = await client.interactions.create({
  model: "gemini-4-argon",
  input: "Write a complete, rigorous proof of the prime number theorem.",
  background: true,
  generation_config: {
    max_output_tokens: 262144,
    thinking_level: "high",
  },
});
```

```bash
# 1. Create the background interaction. It returns an ID right away.
ID=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-4-argon",
    "input": "Write a complete, rigorous proof of the prime number theorem.",
    "background": true,
    "generation_config": {"max_output_tokens": 262144, "thinking_level": "high"}
  }' | jq -r '.id')

# 2. Poll until the status is no longer in_progress or queued.
#    The REST response has no output_text field, so join the text of every model_output step.
while true; do
  RESP=$(curl -s "https://generativelanguage.googleapis.com/v1beta/interactions/$ID" \
    -H "x-goog-api-key: $GEMINI_API_KEY")
  STATUS=$(echo "$RESP" | jq -r '.status')
  if [[ "$STATUS" != "in_progress" && "$STATUS" != "queued" ]]; then
    echo "$RESP" | jq -r '[.steps[]? | select(.type == "model_output") | .content[]? | select(.type == "text") | .text] | join("")'
    echo "$RESP" | jq '{status, usage}'
    break
  fi
  sleep 5
done
```

## Options / Props

Output limits:

| How you create the interaction | Output limit |
|--------------------------------|--------------|
| `background: false` (streaming or non-streaming) | 65,536 tokens. Values greater than 65,536 return a 400 error. Long decode coming soon. |
| `background: true`, `max_output_tokens` not set | 65,536 tokens |
| `background: true`, `max_output_tokens` greater than 65,536 | Your `max_output_tokens`, up to 1,048,576 minus your input |

Recommended `max_output_tokens`:

| Your workload | Recommended `max_output_tokens` |
|---------------|--------------------------------|
| Existing apps with a limit lower than 32K | Raise to 32,768. Background execution isn't needed. |
| Long coding and agentic tasks | Start at 65,536 (the default). Background execution isn't needed. |
| Complex reasoning, hard math, science, and proofs | Set `background: true` and start at 262,144, up to 1,048,576 minus your input tokens. |

Terminal statuses:

| Status | Meaning | What to do |
|--------|---------|------------|
| completed | The model finished. | Join the `model_output` steps in `steps` and read `usage`. To continue, pass `id` as `previous_interaction_id`. |
| requires_action | The model asked for a tool call. | Run the tool, then send the result with this interaction's `id`. |
| incomplete | The model used all of `max_output_tokens`. Text can be empty if still thinking. | Resend with a higher `max_output_tokens`. |
| failed | The server couldn't finish, or ran longer than 24 hours. | Retry; if it fails again, share the interaction `id` with support. |
| cancelled | You cancelled the interaction. | Read `usage` to see the billed tokens. |

Background execution vs client-side continuation:

| | Background execution (Interactions API) | Client-side continuation (GenerateContent API) |
|---|---|---|
| Who starts each hop | Our servers | The Google GenAI SDK, or your own code |
| Tokens per request | Your `max_output_tokens`, in one interaction | 64K per stream, 32K per non-streaming request |
| Run time | Up to 24 hours | 20 minutes |
| Storage | Requires `store: true` | Nothing stored on the server |

## Notes

- Availability: Interactions API (background execution); client-side continuation is generateContent only (see generate-content category).
- Server generates in 64K hops; each hop adds a `model_output` step under the same interaction ID.
- `interaction.usage` reports totals across all hops. `total_input_tokens` is the sum of every hop's input, not context size; do not use it for context compaction. Estimate context as prompt size plus `total_output_tokens` plus `total_thought_tokens`.
- Billing: you pay for every token in every hop, including thinking-only hops. Implicit caching discounts repeated input in each hop by 95% (cached input $0.10 per 1M tokens instead of $2.00 during the introductory period). Cancelled and failed interactions are billed for completed work.
- Streaming: add `stream: true` and `thinking_summaries: "auto"`; save the interaction ID from `interaction.created` and every `event_id` (also on `interaction.status_update`); reconnect with `last_event_id`; read to the end before checking status; set HTTP read timeouts to 15 to 20 minutes; after the first 64K tokens output arrives in about 5,000-token chunks.
- Troubleshooting: 400 "max_output_tokens greater than 65536 is not yet supported with background=false." means set `background: true`; 400 "store=true is required for background interactions" means background needs `store: true`; `incomplete` with empty text means raise `max_output_tokens` or lower `thinking_level`.
- Limitations: no long decode without background execution; the model doesn't follow token-length or word-count targets.

## Related

- [Background execution](./background-execution.md)
- [Thinking](./thinking.md)
- [Streaming interactions](./streaming.md)
