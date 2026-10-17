---
source: https://ai.google.dev/gemini-api/docs/deep-research
---

# Gemini Deep Research agent

Autonomous research agent that plans, executes, and synthesizes multi-step research tasks into detailed, cited reports. Supports collaborative planning, MCP servers, visualizations, and document input. Tasks take minutes and must run with `background=true`.

## Signature / Usage

Start a research task in the background and poll for results:

```python
import time
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    input="Research the history of Google TPUs.",
    agent="deep-research-preview-04-2026",
    background=True,
)

print(f"Research started: {interaction.id}")

while True:
    interaction = client.interactions.get(interaction.id)
    if interaction.status == "completed":
        print(interaction.steps[-1].content[0].text)
        break
    elif interaction.status in ("failed", "cancelled", "incomplete"):
        print(f"Stopped ({interaction.status}): {interaction.errors}")
        break
    time.sleep(10)
```

```javascript
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    input: 'Research the history of Google TPUs.',
    agent: 'deep-research-preview-04-2026',
    background: true
});

console.log(`Research started: ${interaction.id}`);

while (true) {
    const result = await client.interactions.get(interaction.id);
    if (result.status === 'completed') {
        console.log(result.steps.at(-1).content[0].text);
        break;
    } else if (['failed', 'cancelled', 'incomplete'].includes(result.status)) {
        console.log(`Stopped (${result.status}): ${JSON.stringify(result.errors)}`);
        break;
    }
    await new Promise(resolve => setTimeout(resolve, 10000));
}
```

```bash
# 1. Start the research task
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "input": "Research the history of Google TPUs.",
    "agent": "deep-research-preview-04-2026",
    "background": true
}'

# 2. Poll for results (Replace INTERACTION_ID)
# curl -X GET "https://generativelanguage.googleapis.com/v1beta/interactions/INTERACTION_ID" \
# -H "x-goog-api-key: $GEMINI_API_KEY"
```

Collaborative planning (request plan, refine, approve):

```python
import time

# Second interaction: refine the plan
refined_plan = client.interactions.create(
    agent="deep-research-preview-04-2026",
    input="Focus more on the differences between Google TPUs and competitor hardware, and less on the history.",
    agent_config={
        "type": "deep-research",
        "thinking_summaries": "auto",
        "collaborative_planning": True,
    },
    previous_interaction_id=plan_interaction.id,
    background=True,
)

while (result := client.interactions.get(id=refined_plan.id)).status in ("in_progress", "queued"):
    time.sleep(5)
if result.status != "completed":
    raise RuntimeError(f"{result.status}: {result.errors}")
print(result.steps[-1].content[0].text)

# Third interaction: approve the plan and kick off research
final_report = client.interactions.create(
    agent="deep-research-preview-04-2026",
    input="Plan looks good!",
    agent_config={
        "type": "deep-research",
        "thinking_summaries": "auto",
        "collaborative_planning": False,
    },
    previous_interaction_id=refined_plan.id,
    background=True,
)

while (result := client.interactions.get(id=final_report.id)).status in ("in_progress", "queued"):
    time.sleep(5)
if result.status != "completed":
    raise RuntimeError(f"{result.status}: {result.errors}")
print(result.steps[-1].content[0].text)
```

REST for the first step (plan request):

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "agent": "deep-research-preview-04-2026",
    "input": "Do some research on Google TPUs.",
    "agent_config": {
        "type": "deep-research",
        "thinking_summaries": "auto",
        "collaborative_planning": true
    },
    "background": true
}'
```

Agent configuration, tools, and visualization:

```python
agent_config = {
    "type": "deep-research",
    "thinking_summaries": "auto",
    "visualization": "auto",
    "collaborative_planning": False,
}

interaction = client.interactions.create(
    agent="deep-research-preview-04-2026",
    input="Research the competitive landscape of cloud GPUs.",
    agent_config=agent_config,
    background=True,
)
```

```python
# Restrict tools
interaction = client.interactions.create(
    agent="deep-research-preview-04-2026",
    input="What are the latest developments in quantum computing?",
    tools=[{"type": "google_search"}],
    background=True,
)

# MCP server
interaction = client.interactions.create(
    agent="deep-research-preview-04-2026",
    input="Check the status of my last server deployment.",
    tools=[
        {
            "type": "mcp_server",
            "name": "Deployment Tracker",
            "url": "https://mcp.example.com/mcp",
            "headers": {"Authorization": "Bearer my-token"},
        }
    ],
    background=True,
)

# File Search
interaction = client.interactions.create(
    input="Compare our 2025 fiscal year report against current public web news.",
    agent="deep-research-preview-04-2026",
    background=True,
    tools=[
        {"type": "google_search"},
        {
            "type": "file_search",
            "file_search_store_names": ['fileSearchStores/my-store-name']
        }
    ]
)
```

Multimodal input (image or document by `uri`):

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "agent": "deep-research-preview-04-2026",
    "input": [
        {"type": "text", "text": "What is this document about?"},
        {"type": "document", "uri": "https://arxiv.org/pdf/1706.03762", "mime_type": "application/pdf"}
    ],
    "background": true
}'
```

Streaming with reconnection (`stream=True` and `background=True`):

```python
import time

interaction_id = None
last_event_id = None
is_complete = False

def process_stream(stream):
    global interaction_id, last_event_id, is_complete
    for event in stream:
        if event.event_type == "interaction.created":
            interaction_id = event.interaction.id
        if event.event_id:
            last_event_id = event.event_id
        if event.event_type == "step.delta":
            if event.delta.type == "text":
                print(event.delta.text, end="", flush=True)
            elif event.delta.type == "thought_summary":
                print(f"Thought: {event.delta.content.text}", flush=True)
        elif event.event_type in ("interaction.completed", "error"):
            is_complete = True

def safe_process(stream):
    try:
        process_stream(stream)
    except Exception as e:
        print(f"Stream interrupted: {e}")

stream = client.interactions.create(
    input="Research the history of Google TPUs.",
    agent="deep-research-preview-04-2026",
    background=True,
    stream=True,
    agent_config={"type": "deep-research", "thinking_summaries": "auto"},
)
safe_process(stream)

# Reconnect if the connection drops
while not is_complete and interaction_id:
    time.sleep(2)
    try:
        status = client.interactions.get(id=interaction_id)
        if status.status == "completed":
            print(status.steps[-1].content[0].text)
            break
        if status.status not in ("in_progress", "queued"):
            print(f"Stopped ({status.status}): {status.errors}")
            break
        stream = client.interactions.get(
            id=interaction_id, stream=True, last_event_id=last_event_id,
        )
        safe_process(stream)
    except Exception as e:
        print(f"Reconnect failed: {e}")
```

Reconnect over REST: `GET /v1beta/interactions/INTERACTION_ID?stream=true&last_event_id=LAST_EVENT_ID`.

Follow-up on a completed report (the page's example uses `model`, not `agent`):

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "input": "Can you elaborate on the second point in the report?",
    "model": "gemini-4-argon",
    "previous_interaction_id": "COMPLETED_INTERACTION_ID"
}'
```

## Options / Props

Versions:

| Agent ID | Description |
|----------|-------------|
| `deep-research-preview-04-2026` | Deep Research. Designed for speed and efficiency, ideal to be streamed back to a client UI |
| `deep-research-max-preview-04-2026` | Deep Research Max. Maximum comprehensiveness for automated context gathering and synthesis |

`agent_config`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | string | Required | Must be `"deep-research"` |
| `thinking_summaries` | string | `"none"` | `"auto"` to receive intermediate reasoning steps during streaming; `"none"` to disable |
| `visualization` | string | `"auto"` | `"auto"` enables agent-generated charts and images; `"off"` disables |
| `collaborative_planning` | boolean | `false` | `true` enables multi-turn plan review before research begins |

Tools (default when `tools` is omitted: Google Search, URL Context, Code Execution):

| Tool | Type value | Description |
|------|------------|-------------|
| Google Search | `google_search` | Search the public web. Enabled by default |
| URL Context | `url_context` | Read and summarize web page content. Enabled by default |
| Code Execution | `code_execution` | Execute code for calculations and data analysis. Enabled by default |
| MCP Server | `mcp_server` | Connect to remote MCP servers for external tool access |
| File Search | `file_search` | Search your uploaded document corpora |

`mcp_server` fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `"mcp_server"` |
| `name` | string | No | A display name for the MCP server |
| `url` | string | No | The full URL for the MCP server endpoint |
| `headers` | object | No | Key-value pairs sent as HTTP headers with every request (e.g., authentication tokens) |
| `allowed_tools` | array | No | Restrict which tools from the server the agent may call |

Stream event types:

| Event type | Delta type | Description |
|------------|------------|-------------|
| `step.delta` | `thought_summary` | Intermediate reasoning summary from the agent (text in `content`) |
| `error` | — | Error object with `message` and `code` |
| `step.delta` | `text` | Part of the final text output |
| `step.delta` | `image` | A generated image (base64-encoded) |

Comparison: standard Gemini models answer in seconds (generate then output; chatbots, extraction, creative writing); Deep Research takes minutes (async/background; plan, search, read, iterate, output; detailed reports, long-form analysis, comparative tables).

## Notes

- The official File Search sample passes only `file_search` while asking to compare against current public web news; since explicit `tools` replace the defaults (Google Search / URL Context / Code Execution), the example here adds `google_search` so the web comparison can run.
- Preview. The Deep Research agent is exclusively available using the Interactions API; it cannot be accessed through `generate_content`.
- `background=True` is required (agents run asynchronously). The API returns a partial `Interaction` immediately; status transitions from `in_progress` to `completed` or `failed`. Background execution requires `store=True`.
- The polling loops (including the collaborative-planning ones) also stop on `cancelled` / `incomplete`; the original page only checks `completed` / `failed` (collaborative-planning loops check only `completed`).
- The official page's Python/JS samples use `thought` deltas; aligned with the streaming guide's `thought_summary` delta and `error` event (also used by the page's Java/Go samples).
- The official page's Python/JS samples read `interaction.error`; the Interaction resource field is `errors` (array of Error, per the API reference and the page's Java sample), while the singular `error` belongs to the SSE `error` event.
- The reconnect loop prints the final output when the interaction completed while disconnected; the original sample breaks without reading it.
- Collaborative planning: step 1 set `collaborative_planning=True` to get a plan instead of a report; step 2 (optional) keep it `True` with `previous_interaction_id` to refine; step 3 set it `False` (or omit) to approve and execute.
- Visualization: generated images appear in response steps (`step.type == "model_output"` content items of type `image` with base64 `data`) and stream as `image` deltas. Ask for visuals explicitly in the prompt; `"auto"` enables the capability but visuals are generated only when requested.
- Streaming requires `stream=True` and `background=True`; set `thinking_summaries` to `"auto"` to get thoughts. The connection can drop (e.g. after the 600-second timeout); track `interaction_id` and `last_event_id` and reconnect.
- Multimodal inputs: images and documents (PDFs) are supported; use cautiously, as this increases costs and risks context window overflow. Steer output format through explicit formatting instructions in the prompt.
- Estimated cost (preview rates, subject to change): Deep Research about 80 search queries, ~250k input tokens (~50-70% cached), ~60k output tokens, ~$1.00 -- $3.00 per task; Deep Research Max up to ~160 search queries, ~900k input tokens, ~80k output tokens, ~$3.00 -- $7.00 per task.
- Limitations: no custom function calling tools (remote MCP servers are supported); no structured outputs; maximum research time 60 minutes (most tasks complete within 20 minutes); Google Search is enabled by default and use restrictions apply to grounded results.
- Safety: prompt injection via provided files, malicious web content (review `citations`), and exfiltration when combining private data with web browsing.
- The follow-up example on the official page passes `model="gemini-4-argon"` rather than the agent ID; model IDs are transcribed from the source as-is.
- API surface: Interactions API only (REST `v1beta`). Java and Go tabs exist on the official page.
- Distinct from other skills: Deep Research here is a Google-hosted agent; Claude and OpenAI equivalents live in anthropic-managed-agents / openai-agents. Its File Search tool relates to upstash and fandhe-db only as vector stores, not APIs.
- Polling and reconnect loops also treat `queued` (an Interaction status in the API reference) as non-terminal; the original examples check only `in_progress`.
- The reconnect example catches stream exceptions and waits before reconnecting; the original example only resumes after a stream ends normally.
- Docs fetched 2026-10-16.

## Related

- [Agents overview](./agents-overview.md)
- [Antigravity agent](./antigravity-agent.md)
- [Managed agents quickstart](./quickstart.md)
