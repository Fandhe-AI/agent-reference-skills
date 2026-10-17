---
source: https://ai.google.dev/gemini-api/docs/antigravity-agent
---

# Antigravity agent

General-purpose managed agent on the Gemini API: reasons, executes code, manages files, and browses the web inside a Google-hosted Linux sandbox. Built with Gemini 3.8 Flash and the same harness as the Antigravity IDE; the underlying model is configurable via `agent_config`. Available through the Interactions API and Google AI Studio.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Read Hacker News, summarize the top 10 stories, and save the results as a PDF.",
    environment="remote",
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    agent: "antigravity-preview-09-2026",
    input: "Read Hacker News, summarize the top 10 stories, and save the results as a PDF.",
    environment: "remote",
}, { timeout: 300000 });

console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "agent": "antigravity-preview-09-2026",
    "input": "Read Hacker News, summarize the top 10 stories, and save the results as a PDF.",
    "environment": "remote"
}'
```

Restrict tools:

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Search for the latest AI research papers on reasoning and summarize them.",
    environment="remote",
    tools=[
        {"type": "google_search"},
        {"type": "url_context"},
    ],
)
```

Multimodal input (text and image only; image as inline base64 `data`):

```python
interaction_inline = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input=[
        {"type": "text", "text": "Analyze this chart and summarize the trends."},
        {
            "type": "image",
            "data": base64.b64encode(image_bytes).decode("utf-8"),
            "mime_type": "image/png",
        },
    ],
    environment="remote",
)
```

Custom function (two-turn; `status == "requires_action"`, then return a `function_result`):

```python
get_weather_tool = {
    "type": "function",
    "name": "get_weather",
    "description": "Gets the current weather for a given location.",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The city and country, e.g. San Francisco, USA",
            }
        },
        "required": ["location"],
    },
}

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="What is the weather in Tokyo?",
    environment="remote",
    tools=[{"type": "code_execution"}, get_weather_tool],
)

if interaction.status == "requires_action":
    # Find function calls that do not have a matching function result.
    # Filesystem tools (like write_to_file) are also represented as function calls
    # but are executed automatically by the environment.
    executed_calls = {step.call_id for step in interaction.steps if step.type == "function_result"}
    pending_calls = [step for step in interaction.steps if step.type == "function_call" and step.id not in executed_calls]

    if pending_calls:
        fc_step = pending_calls[0]

        final_interaction = client.interactions.create(
            agent="antigravity-preview-09-2026",
            previous_interaction_id=interaction.id,
            environment=interaction.environment_id,
            input=[
                {
                    "type": "function_result",
                    "name": fc_step.name,
                    "call_id": fc_step.id,
                    "result": {"temperature": 23, "unit": "celsius"},
                }
            ],
        )
```

Remote MCP server:

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="What is the weather in Tokyo?",
    environment="remote",
    tools=[{
        "type": "mcp_server",
        "name": "weather", # Must be lowercase
        "url": "https://gemini-api-demos.uc.r.appspot.com/mcp"
    }]
)
```

Model selection and budget control:

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
      "agent": "antigravity-preview-09-2026",
      "input": "Summarize the key differences between functional and object-oriented programming.",
      "environment": "remote",
      "agent_config": {
          "type": "antigravity",
          "model": "gemini-3.5-flash-lite"
      }
  }'
```

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Analyze the dataset in /workspace/data.csv and generate a summary report.",
    agent_config={
        "type": "antigravity",
        "max_total_tokens": 50000
    },
    environment={
        "type": "remote",
        "sources": [
            {
                "type": "inline",
                "target": "/workspace/data.csv",
                "content": "id,name,value\n1,alpha,100\n2,beta,200\n",
            }
        ],
    }
)
print(f"Status: {interaction.status}")  # "incomplete" if budget was hit
print(f"Tokens used: {interaction.usage.total_tokens}")
```

Background execution, polling, cancel:

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Run a complex analysis on the repository.",
    environment="remote",
    background=True,
)

while interaction.status in ("in_progress", "queued"):
    time.sleep(5)
    interaction = client.interactions.get(id=interaction.id)

client.interactions.cancel(id="INTERACTION_ID")
```

Triggers (cron schedule):

```python
trigger = client.triggers.create(
    schedule="0 9 * * *",
    time_zone="America/Argentina/Buenos_Aires",
    display_name="issue-solver",
    interaction={
        "agent": "antigravity-preview-09-2026",
        "input": "Review open PRs in my-org/my-app for new comments and address feedback. ...",
        "environment": {
            "type": "remote",
            "network": {
                "allowlist": [
                    {"domain": "api.github.com", "credential": "github-production"},
                    {"domain": "github.com"},
                ]
            },
        },
    },
)
```

## Options / Props

Supported tools:

| Tool | Type value | Description |
|------|------------|-------------|
| Code Execution | `code_execution` | Run shell commands (bash, Python, Node) with stdout/stderr capture |
| Google Search | `google_search` | Search the public web |
| URL Context | `url_context` | Fetch and read web pages |
| Filesystem | (enabled via `environment`) | Read, write, edit, search, and list files in the sandbox; enabled automatically when you set `environment` |
| Custom Functions | `function` | Custom functions the agent can request to execute |
| Remote MCP Server | `mcp_server` | Register external MCP servers as tools |

`mcp_server` tool fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `"mcp_server"` |
| `name` | string | Yes | Unique identifier; strictly lowercase alphanumeric (matching `^[a-z0-9_-]+$`) |
| `url` | string | Yes | Endpoint URL of the remote MCP server |
| `headers` | object | No | Custom headers (e.g., authentication) sent with requests |
| `allowed_tools` | array | No | Tool names allowed to be executed. If omitted, all tools are allowed |

`agent_config.model` values:

| Model | Value | Description |
|-------|-------|-------------|
| Gemini 3.8 Flash (default) | `gemini-3.8-flash` | Default balanced model for reasoning, coding, and tool use |
| Gemini 3.6 Flash | `gemini-3.6-flash` | Balanced Flash model for general agentic workflows |
| Gemini 3.5 Flash-Lite | `gemini-3.5-flash-lite` | Lightweight model optimized for low latency and cost-sensitive tasks |

Other `agent_config` field: `max_total_tokens` (with `"type": "antigravity"`), total input + output + thinking tokens an interaction may consume; cached tokens do not count.

`environment` forms: `"remote"` (fresh sandbox), `"env_abc123"` (reuse an environment by ID), `{...}` (full `EnvironmentConfig` with custom sources and network rules).

`CreateTrigger` fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `schedule` | string | Yes | Cron expression (e.g., `0 * * * *` hourly, `0 9 * * 1-5` weekday mornings) |
| `time_zone` | string | Yes | IANA time zone (e.g., `UTC`, `America/Argentina/Buenos_Aires`) |
| `display_name` | string | No | Human-readable name |
| `max_consecutive_failures` | integer | No | Max failures before the trigger is automatically paused. Default: 5 |
| `execution_timeout_seconds` | integer | No | Timeout per execution in seconds. Default: 600 |
| `interaction` | object | Yes | A `CreateInteractionRequest` defining the agent, input, tools, and environment |

Trigger response fields: `id`, `status` (`active`, `paused`, or `disabled`), `next_run_time` (ISO 8601), `consecutive_failure_count`. Trigger operations (REST `v1beta/triggers`): create `POST /triggers`, list `GET /triggers`, get, pause/resume `PATCH /triggers/{id}` with `{"status": "paused"}` / `{"status": "active"}`, delete `DELETE /triggers/{id}`, run now `POST /triggers/{id}/executions`, list executions `GET /triggers/{id}/executions`.

Estimated costs (from the page):

| Task category | Input tokens | Output tokens | Typical cost |
|---------------|--------------|---------------|--------------|
| Research & information synthesis | 100k--500k | 10k--40k | $0.30--$1.00 |
| Document & content generation | 100k--500k | 15k--50k | $0.30--$1.30 |
| Process & system design | 100k--400k | 10k--30k | $0.25--$0.80 |
| Data processing & analysis | 300k--3M | 30k--150k | $0.70--$3.25 |

## Notes

- Default tools are `code_execution`, `google_search`, and `url_context`; pass `tools` only when customizing or restricting the set, or adding custom functions. `code_execution` and filesystem tool execution can be intercepted by synchronous hooks (see `hooks.md`).
- Capabilities: code execution (Bash, Python, Node.js), file management (files persist across interactions), web access, and automatic context compaction at ~135k tokens.
- For a managed agent saved with `agents.create`, the model is locked to what was set at creation and cannot be overridden at interaction time.
- Budget: when `max_total_tokens` is reached the interaction stops with `status: "incomplete"` (best-effort; usage may slightly exceed). Continue by sending a new interaction with `previous_interaction_id` and `environment` (the new interaction gets its own budget).
- Function calling: filesystem tools such as `write_to_file` are also represented as function calls but executed automatically by the environment, so match `function_call` steps against `function_result` steps to find pending calls. Only stateful mode is supported (use `previous_interaction_id`).
- The polling loop also waits while `queued` (an Interaction status in the API reference); the original example checks only `in_progress`.
- Background execution requires `store=True` (default). The page's REST background examples send an `Api-Revision: 2026-05-20` header. `POST /v1beta/interactions/{id}:cancel` cancels a running background interaction.
- Triggers: each execution reuses the same environment so files persist across runs. Reference a stored credential rather than an inline token for unattended schedules. Deleting a trigger does not delete past execution history; run-now works even if the trigger is paused.
- Limitations: Preview; `temperature`, `top_p`, `top_k`, `stop_sequences`, `max_output_tokens` return a 400; no structured outputs; `file_search`, `computer_use`, `google_maps` not supported; MCP over SSE transport not supported (use Streamable HTTP) and an uppercase server `name` triggers a generic `400`; audio, video, and document inputs not supported (text and image only).
- Availability: preview via the Interactions API in Google AI Studio and the Gemini API, free and paid tier. Pay-as-you-go on model tokens and tool use; environment compute is not billed during preview. Complex workflows can reach 3--5 million tokens (up to ~$5); 50--70% of input tokens are typically cached.
- API surface: Interactions API (REST `v1beta`). Java and Go tabs exist on the official page.
- Distinct from other skills: remote MCP here is consumed by a Google-hosted agent (compare anthropic-api-tools-mcp, openai-agents); Claude-hosted agents are in anthropic-managed-agents; `SKILL.md` mounted in the sandbox is not a Claude Code Agent Skill (anthropic-claude-code-extend).
- Docs fetched 2026-10-16.

## Related

- [Agents overview](./agents-overview.md)
- [Managed agents quickstart](./quickstart.md)
- [Building managed agents](./custom-agents.md)
- [Environments in managed agents](./environments.md)
- [Hooks (managed agents)](./hooks.md)
- [Gemini Deep Research agent](./deep-research.md)
