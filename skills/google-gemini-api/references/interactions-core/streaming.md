---
source: https://ai.google.dev/gemini-api/docs/streaming
---

# Streaming interactions

Set `stream: true` on `interactions.create` to receive the response incrementally as server-sent events (SSE) in a step-based event model.

## Signature / Usage

```python
from google import genai

client = genai.Client()

stream = client.interactions.create(
    model="gemini-3.8-flash",
    input="Count from 1 to 25.",
    stream=True,
)
for event in stream:
    if event.event_type == "step.delta":
        if event.delta.type == "text":
            print(event.delta.text, end="", flush=True)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const stream = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: "Count from 1 to 25.",
    stream: true,
});
for await (const event of stream) {
    if (event.event_type === "step.delta") {
        if (event.delta.type === "text") {
            process.stdout.write(event.delta.text);
        }
    }
}
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  --no-buffer \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Count from 1 to 25.",
    "stream": true
  }'
```

Raw SSE flow (abridged):

```text
event: interaction.created
data: {"interaction":{"id":"v1_...","status":"in_progress","object":"interaction","model":"gemini-3.8-flash"},"event_type":"interaction.created"}

event: step.start
data: {"index":1,"step":{"type":"model_output"},"event_type":"step.start"}

event: step.delta
data: {"index":1,"delta":{"text":"1, 2, 3, 4, 5, 6, ","type":"text"},"event_type":"step.delta"}

event: step.stop
data: {"index":1,"event_type":"step.stop"}

event: interaction.completed
data: {"interaction":{"id":"v1_...","status":"completed", ...},"event_type":"interaction.completed"}

event: done
data: [DONE]
```

Streaming with thinking summaries:

```python
stream = client.interactions.create(
    model="gemini-3.8-flash",
    input="What is the greatest common divisor of 1071 and 462?",
    generation_config={
        "thinking_summaries": "auto"
    },
    stream=True,
)
for event in stream:
    if event.event_type == "step.start":
        print(f"\n--- Step: {event.step.type} ---")
    elif event.event_type == "step.delta":
        if event.delta.type == "thought_summary":
            if event.delta.content.type == "text":
                print(event.delta.content.text, end="", flush=True)
        elif event.delta.type == "text":
            print(event.delta.text, end="", flush=True)
```

Streaming an agent (background + stream):

```python
stream = client.interactions.create(
    agent="deep-research-preview-04-2026",
    input="Research the latest advances in quantum computing.",
    stream=True,
    background=True,
    agent_config={
        "type": "deep-research",
        "thinking_summaries": "auto"
    }
)
```

Streaming image generation (interleaved text and images):

```python
stream = client.interactions.create(
    model="gemini-3.1-flash-image",
    tools=[{"type": "google_search", "search_types": ["web_search", "image_search"]}],
    input="Search for the history of the Colosseum and write a short illustrated story about a gladiator named Marcus. Interleave text and generated images.",
    response_format=[
        {"type": "text"},
        {"type": "image"}
    ],
    stream=True,
)
```

Streaming function calling: accumulate `arguments_delta` until the interaction completes with status `requires_action`, then send a `function_result` with `previous_interaction_id`:

```python
calls = {}
for event in stream:
    if event.event_type == "interaction.created":
        first_interaction_id = event.interaction.id
    elif event.event_type == "step.start":
        step = event.step
        if step.type == "function_call":
            calls[event.index] = {"id": step.id, "name": step.name, "args": ""}
    elif event.event_type == "step.delta":
        if event.delta.type == "arguments_delta":
            calls[event.index]["args"] += event.delta.arguments

# run() is your own function executor
stream2 = client.interactions.create(
    model="gemini-3.8-flash",
    previous_interaction_id=first_interaction_id,
    input=[
        {
            "type": "function_result",
            "name": c["name"],
            "call_id": c["id"],
            "result": run(c["name"], json.loads(c["args"])),
        }
        for c in calls.values()
    ],
    stream=True,
)
```

## Options / Props

Event types:

| Event | Description |
|-------|-------------|
| `interaction.created` | Interaction created; includes ID, model, status |
| `interaction.status_update` | Interaction-level status transition; may appear between steps |
| `step.start` | Start of a step; carries step `type` and `index` |
| `step.delta` | Incremental data for the current step; `delta.type` determines shape |
| `step.stop` | End of a step; with the Antigravity Agent may include `usage` (running total) and `step_usage` |
| `interaction.completed` | Final interaction object with `usage`; does not include `steps` |
| `error` | Error object with `message` and `code` |

Step types and expected delta types:

| Step type | Expected delta types | Description |
|-----------|----------------------|-------------|
| `model_output` | `text`, `image`, `audio` | Model's final response content |
| `thought` | `thought_signature`, `thought_summary` | Chain-of-thought reasoning; summary present only when `thinking_summaries` is enabled |
| `function_call` | `arguments_delta` | Request for the client to execute a function; sets status to `requires_action` |
| Server-side tools | Varies by tool | e.g. `google_search_call`, `google_search_result`, `code_execution_call`, `code_execution_result` |

## Notes

- Availability: Interactions API (REST examples use `v1beta`; add `?alt=sse` in the text-generation guide's REST example).
- With `stream: false`, the API returns a single `interaction` object whose `steps` array holds each assembled `step.start` -> `step.delta`(s) -> `step.stop` cycle.
- `arguments_delta` is a partial JSON string and must be accumulated across deltas. For function calls, `step.start` delivers name, id, and empty arguments `{}`.
- `thought_signature` is the last delta before `step.stop` in a `thought` step.
- The original sample tracks a single call; the example keys calls by step `index` so that multiple function calls in one turn each get a `function_result`.
- New event and delta types may be added over time: log and skip unknown events instead of throwing.
- Migration (May 2026 breaking changes): legacy events are replaced — `interaction.start` -> `interaction.created`, `content.start` -> `step.start`, `content.delta` -> `step.delta`, `content.stop` -> `step.stop`, `interaction.complete` -> `interaction.completed`, and `interaction.status_update` is replaced by `interaction.in_progress` / `interaction.requires_action` etc. in the breaking-changes guide (this guide's current examples still show `interaction.status_update`).
- Distinct from OpenAI Responses streaming events (`openai-api-core`) and Anthropic Messages streaming (`anthropic-api-core`).

## Related

- [Text generation](./text-generation.md)
- [Background execution](./background-execution.md)
- [Thinking](./thinking.md)
