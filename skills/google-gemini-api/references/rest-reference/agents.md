---
source: https://ai.google.dev/api/agents
---

# Agents API

REST reference for the Gemini Agents API (Beta): create, list, get, and delete named agents that extend a base agent with a system instruction, environment, and tools.

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/agents
GET    https://generativelanguage.googleapis.com/v1beta/agents
GET    https://generativelanguage.googleapis.com/v1beta/agents/{agentsId}
DELETE https://generativelanguage.googleapis.com/v1beta/agents/{agentsId}
```

Fork an environment into a named agent (Python):

```python
import uuid
from google import genai

client = genai.Client()

# Step 1: Set up the environment interactively.
interaction = client.interactions.create(
    agent="antigravity-preview-05-2026",
    input="Write a basic Hello World template to /workspace/template.py.",
    environment="remote",
)

# Step 2: Fork that environment into a named agent.
agent_id = f"my-data-analyst-{uuid.uuid4().hex[:8]}"
agent = client.agents.create(
    id=agent_id,
    base_agent="antigravity-preview-05-2026",
    system_instruction=(
        "You are a data analyst. Use the template at /workspace/template.py"
        " for all reports."
    ),
    base_environment=interaction.environment_id,
)
print(f"Forked agent: {agent.id}")
```

REST:

```sh
# Step 1: Set up the environment interactively
RESPONSE=$(curl -s -X POST https://generativelanguage.googleapis.com/v1beta/interactions \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "antigravity-preview-05-2026",
    "input": "Write a basic Hello World template to /workspace/template.py.",
    "environment": "remote"
  }')
ENV_ID=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['environment_id'])")

# Step 2: Fork that environment into a named agent
curl -X POST https://generativelanguage.googleapis.com/v1beta/agents \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"id\": \"my-data-analyst\",
    \"base_agent\": \"antigravity-preview-05-2026\",
    \"system_instruction\": \"You are a data analyst. Use the template at /workspace/template.py for all reports.\",
    \"base_environment\": \"${ENV_ID}\"
  }"
```

Response:

```json
{
  "base_agent": "antigravity-preview-05-2026",
  "base_environment": "env_abc123",
  "id": "my-data-analyst-abc123",
  "system_instruction": "You are a data analyst. Use the template at /workspace/template.py for all reports."
}
```

## Options / Props

`CreateAgent` request body (the `Agent` resource):

| Name | Type | Description |
|------|------|-------------|
| id | string | The unique identifier for the agent. |
| base_agent | string | The base agent to extend. |
| base_environment | EnvironmentConfig or string | The environment configuration for the agent, or an environment ID. `EnvironmentConfig`: `type` = `remote` (required), `env` (environment variables for the sandbox), `environment_id`, `network` (`disabled`, or an allowlist of egress rules), `sources[]` (`type` = `gcs` / `inline` / `repository` / `skill_registry`, `content`, `encoding`, `source`, `target`). |
| agent_config | AntigravityAgentConfig | Configuration parameters for the agent: `type` = `antigravity` (required), `model`, `max_total_tokens`. |
| description | string | Agent description for developers to quickly read and understand. |
| system_instruction | string | System instruction for the agent. |
| tools | array (AgentTool) | Tools available to the agent: `code_execution`, `function` (`name`, `description`, `parameters`), `google_search` (`search_types`: `web_search` / `image_search` / `enterprise_web_search`), `mcp_server` (`name`, `url`, `headers`, `allowed_tools`), `url_context`. |

Other methods:

| Method | Parameters | Response |
|------|------|-------------|
| ListAgents | `page_size` (integer), `page_token` (string), `parent` (string, required; format `projects/{project}/locations/{location}`) | `agents[]` (Agent), `next_page_token` |
| GetAgent | `agentsId` (string, required): the name of the agent to retrieve | `Agent` |
| DeleteAgent | `agentsId` (string, required): the name of the agent to delete | empty |

## Notes

- Availability: v1beta (the source states "This API is in Beta. Endpoints are under `/v1beta/`.").
- The source shows Python, JavaScript, Java, Go and REST examples for each method; the SDK calls are `client.agents.create` / `ai.agents.create`.
- Agents here are Gemini-hosted (compare anthropic-managed-agents), not a local agent framework (compare anthropic-agent-sdk, openai-agents, hermes-agent).
- The `mcp_server` tool entry lists an MCP server URL the model calls; see anthropic-api-tools-mcp and openai-agents for the other providers' MCP surfaces.
- Docs fetched 2026-10-16.

## Related

- [Environments API](./environments.md)
- [Credentials API](./credentials.md)
- [Triggers API](./triggers.md)
- [Interactions API (v1beta)](./interactions-v1beta.md)
