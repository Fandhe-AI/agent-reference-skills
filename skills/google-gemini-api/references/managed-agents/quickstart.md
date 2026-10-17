---
source: https://ai.google.dev/gemini-api/docs/managed-agents-quickstart
---

# Managed agents quickstart

Create and use managed agents on the Gemini API with the Antigravity agent: first call, multi-turn, streaming, downloading sandbox files, saving a reusable agent.

## Signature / Usage

A single call to the Interactions API provisions a Linux sandbox, runs the agent loop, and returns the result.

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
    environment="remote",
)

# Print the agent's final output
print(f"Interaction ID: {interaction.id}")
print(f"Environment ID: {interaction.environment_id}")
print(f"Output: {interaction.output_text}")
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    agent: "antigravity-preview-09-2026",
    input: "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
    environment: "remote",
});

console.log(`Interaction ID: ${interaction.id}`);
console.log(`Environment ID: ${interaction.environment_id}`);
console.log(`Output: ${interaction.output_text}`);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "agent": "antigravity-preview-09-2026",
    "input": [{"type": "text", "text": "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents."}],
    "environment": {"type": "remote"}
}'
```

Multi-turn: pass both the conversation pointer and the environment.

```python
interaction_2 = client.interactions.create(
    agent="antigravity-preview-09-2026",
    previous_interaction_id=interaction.id,
    environment=interaction.environment_id,
    input="Now plot the Fibonacci sequence as a line chart and save it as chart.png.",
)

print(interaction_2.output_text)
```

Streaming:

```python
stream = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Read Hacker News, summarize the top 5 stories, and save the results as a PDF.",
    environment="remote",
    stream=True,
)

for event in stream:
    print(event)
    if event.event_type == "step.stop" and event.usage:
        print(event.usage)
```

Download files from the sandbox (Files API, direct HTTP request, no SDK method yet):

```bash
ENV_ID="your_environment_id_here"

curl -L -X GET "https://generativelanguage.googleapis.com/v1beta/files/environment-$ENV_ID:download?alt=media" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-o snapshot.tar

mkdir -p extracted_snapshot
tar -xf snapshot.tar -C extracted_snapshot
```

Save a managed agent, then invoke it by ID:

```python
agent = client.agents.create(
    id="fibonacci-analyst",
    base_agent="antigravity-preview-09-2026",
    agent_config={
        "type": "antigravity",
        "model": "gemini-3.8-flash",
    },
    system_instruction="You are a math analysis agent. Generate sequences, visualize them, and export results as PDF reports.",
    base_environment={
        "type": "remote",
        "sources": [
            {
                "type": "inline",
                "target": ".agents/AGENTS.md",
                "content": "Always include a chart and a summary table in your reports.",
            },
            {
                "type": "repository",
                "source": "https://github.com/your-org/skills",
                "target": ".agents/skills"
            }
        ],
    },
)

print(f"Saved agent: {agent.id}")

result = client.interactions.create(
    agent="fibonacci-analyst",
    input="Generate the first 50 prime numbers, plot their distribution, and save a PDF report.",
    environment="remote",
)

print(result.output_text)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent` | string | Agent ID: `"antigravity-preview-09-2026"` (current predefined general-purpose managed agent) or a saved agent ID |
| `environment` | string or object | `"remote"` (or `{"type": "remote"}`) provisions a fresh sandbox; an environment ID resumes an existing one |
| `input` | string or array | What the agent should do |
| `previous_interaction_id` | string | Continues conversation context (chat history, reasoning trace, tool use) |
| `stream` | boolean | Stream step deltas; the `step.stop` event includes accumulated usage |
| `base_agent` (`agents.create`) | string | Agent the saved agent is built on |
| `agent_config` | object | e.g. `{"type": "antigravity", "model": "gemini-3.8-flash"}` |
| `system_instruction` | string | Instructions for the saved agent |
| `base_environment` | object | Environment from sources or by forking an existing environment |

## Notes

- The response is an `Interaction` object. Store `interaction.id` and `interaction.environment_id` to continue in the same sandbox; `interaction.output_text` is the final response; `interaction.steps` lists each step (reasoning, tool calls, code execution).
- The API tracks two independent state dimensions: conversation context (`previous_interaction_id`) and environment state (files, installed packages, sandbox state, via `environment`). Clear conversation but keep files: omit `previous_interaction_id`, pass the environment ID. Keep conversation with a new workspace: pass `previous_interaction_id` and `environment="remote"`.
- Automatic context compaction: a native compaction step happens at around 135k tokens, automatically, to prevent token limit errors and "context rot".
- Each invocation of a saved managed agent forks the base environment, so every run starts clean.
- Environment files download shown on this page: `files/environment-{env_id}:download?alt=media`. The environments page (fetched the same day) marks this legacy endpoint as deprecated and replaces it with `GET /v1beta/environments/$ENV_ID/files?alt=media`.
- The Java and Go tabs of the original page use SDK types under `com.google.genai.gaos.models.*` and `google.golang.org/genai/interactions/models/*`; see the official page for them.
- API surface: Interactions API (`v1beta` in the REST examples). Managed agents are in Public Preview.
- Distinct from other skills: anthropic-managed-agents (Claude sessions / environments), anthropic-agent-sdk, openai-agents, hermes-agent.
- Docs fetched 2026-10-16.

## Related

- [Agents overview](./agents-overview.md)
- [Antigravity agent](./antigravity-agent.md)
- [Building managed agents](./custom-agents.md)
- [Environments in managed agents](./environments.md)
