---
source: https://ai.google.dev/gemini-api/docs/background-execution
---

# Background execution

Set `background: true` on `interactions.create` to run long tasks asynchronously on the server; the API returns an interaction ID to poll, stream, or reconnect to.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Write a guide on space exploration.",
    background=True,
)
print(f"Created background interaction ID: {interaction.id}")
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: "Write a guide on space exploration.",
    background: true,
});
console.log(`Created background interaction ID: ${interaction.id}`);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Api-Revision: 2026-05-20" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Write a guide on space exploration.",
    "background": true
  }'
```

Polling:

```python
import time
from google import genai

client = genai.Client()

interaction = client.interactions.get(id="YOUR_INTERACTION_ID")

while interaction.status in ("in_progress", "queued"):
    time.sleep(5)
    interaction = client.interactions.get(id=interaction.id)

if interaction.status == "completed":
    print(interaction.output_text)
else:
    print(f"Finished with status: {interaction.status}")
```

Resuming a dropped stream with `last_event_id`:

```bash
curl -N -X GET "https://generativelanguage.googleapis.com/v1beta/interactions/YOUR_INTERACTION_ID?stream=true&last_event_id=YOUR_LAST_EVENT_ID" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Api-Revision: 2026-05-20"
```

```python
stream = client.interactions.get(
    id=interaction_id,
    stream=True,
    last_event_id=last_event_id
)
```

Chaining a managed agent turn after interaction1 completes (needs both `previous_interaction_id` and `environment`):

```python
interaction2 = client.interactions.create(
    agent=agent_model,
    input="List all files in the project/ directory.",
    previous_interaction_id=interaction1.id,
    environment=interaction1.environment_id,
    background=True
)
```

Cancel and delete:

```python
client.interactions.cancel(id="YOUR_INTERACTION_ID")
client.interactions.delete(id="YOUR_INTERACTION_ID")
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions/YOUR_INTERACTION_ID/cancel" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Api-Revision: 2026-05-20"

curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/interactions/YOUR_INTERACTION_ID" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Api-Revision: 2026-05-20"
```

## Options / Props

Execution states:

| Status | Description |
|--------|-------------|
| in_progress | Server is actively executing (such as running code or researching) |
| requires_action | Paused, waiting for client input (such as confirming a tool execution or answering a question) |
| completed | Finished successfully; output available |
| failed | Error during execution (such as tool failure or rate limits) |
| cancelled | A client request stopped the execution |

Parameters and endpoints:

| Name | Type | Description |
|------|------|-------------|
| background | boolean | `true` runs asynchronously; supported for standard Gemini models (such as `gemini-4-argon`, `gemini-3.8-flash`) and Managed Agents (such as `antigravity-preview-09-2026`) |
| store | boolean | `true` (default): this page says 7 days; the Interactions overview states 55 days (paid tier, configurable to 7/14/28/55 in AI Studio) and 1 day (free tier). This page also lists `false` (stored for 24 hours, TTL), but the long-decode and Deep Research pages state that background execution requires `store=true` (`false` returns 400 "store=true is required for background interactions") |
| last_event_id | string | With `stream=true` on get; resumes from the last received event (each delta carries a unique `event_id`) |
| POST /interactions/{id}/cancel | endpoint | Stops the running task; status becomes `cancelled` (clean-up may delay the status update) |
| DELETE /interactions/{id} | endpoint | Removes the interaction; later GET returns `404 Not Found` |

## Notes

- The official chaining example passes `environment="remote"`, which provisions a fresh sandbox; this page uses `interaction1.environment_id` so turn 2 sees the files from turn 1 (see the managed agents quickstart).

- Official pages conflict: this page describes `store=False` (24h TTL) with `background=True`, while long-decode and Deep Research state background execution requires `store=True` and returns 400 otherwise; use `store=True` for background runs.
- Official pages conflict on store=true retention: this page says 7 days, the Interactions overview says 55 days (paid, configurable) / 1 day (free).
- Availability: Interactions API (REST examples use `v1beta` with `Api-Revision: 2026-05-20`). The `Api-Revision` header shown in these examples is ignored since June 8, 2026 (legacy schema removed).
- The polling loop also waits while `queued` (an Interaction status in the API reference); the original example checks only `in_progress`.
- Use for agent executions, Deep Research (`deep-research-preview-04-2026`, `deep-research-max-preview-04-2026`), long reasoning, and long decode on Gemini 4.
- With `background=False` (default), streaming and non-streaming responses are capped at `65,536` output tokens; Gemini 4 with `max_output_tokens > 65536` and `background=False` returns `400`.
- Chaining to an interaction that is `in_progress` returns `400 Bad Request`; wait for `completed`.
- Typical HTTP requests close after about 60 seconds, hence background execution.
- Distinct from Message Batches (`anthropic-api-core`) and the Batch API (see platform-ops category); this is per-interaction async execution, not a batch job.

## Related

- [Streaming interactions](./streaming.md)
- [Long decode](./long-decode.md)
- [Thinking](./thinking.md)
