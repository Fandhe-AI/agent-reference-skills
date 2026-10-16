# Configuring Agents

An agent configuration defines how the agent behaves. Supply it when creating a session or save it for reuse. The session holds the conversation and work; the saved agent holds reusable settings.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()
agent = client.beta.agents.create(
    model="gpt-6-astra",
    instructions="Answer technical questions accurately.",
    reasoning={"summary": "auto"},
    timeout=360,
)
session = client.beta.agents.sessions.create(
    agent_id=agent.id,
    environment={"type": "none"},
    input="Explain how an agent connects to an MCP server.",
)
print(session.to_json())
```

Inline per-session configuration passes `agent={"model": ..., "instructions": ...}` instead of `agent_id`. Override a saved agent for one session by passing both `agent_id` and `agent`.

Update settings on an existing session (`POST /v1/agents/sessions/{session_id}`):

```json
{
  "agent": {
    "reasoning": { "effort": "low" },
    "service_tier": null
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent.model` | string | Which model does the work |
| `agent.instructions` | string | What the agent should do and how it should behave |
| `agent.tools` | array | Actions the agent can take (web search, your functions, MCP, ...) |
| `agent.reasoning` | object | Reasoning settings (`effort`, `summary`) |
| `agent.text` | object | Output format (`text.format.schema`) |
| `agent.service_tier` | string \| null | Service tier; `null` restores automatic selection |
| `agent.multi_agent` | object | Subagent delegation settings |
| `agent_id` | string | ID of a saved agent whose configuration the session copies |
| `environment.type` | `none` \| `openai_hosted` \| `self_hosted` | Where the agent runs commands and works with files |

## Notes

- Size limit: keep combined instructions and tool configuration below 4 MiB (4,194,304 bytes). Files uploaded to the environment follow separate file limits.
- Saved-agent updates apply only to new sessions; each session copies the saved configuration at creation and keeps it.
- Saved-agent update semantics: omitted fields keep saved values; supplied objects replace the whole field (supplying `reasoning` with only `effort` clears the saved `summary`); `null` resets fields that accept it. Change or reset settings the new model does not support in the same request.
- Per-session overrides: supplied objects and arrays replace the entire field (supplying `tools` replaces the saved tool list); other settings are copied from the saved agent at creation. They do not change the saved agent or other sessions.
- Existing-session update: only `model`, `reasoning.effort`, `service_tier` (plus `metadata`) can change. Changes apply to new turns started by messages sent after the update completes; an active turn keeps its settings, including when steered. The `agent` and `reasoning` objects merge supplied fields; `reasoning.effort: null` resets to the model default; `model` cannot be `null`; `metadata` replaces the full map (omit to preserve, `null` or `{}` to clear). Cannot update `reasoning.summary`, `text`, `tools`, `instructions`, or `multi_agent`; create a new session for those.
- Credentials stay in vaults, separate from the saved configuration.
- Environment: choose `none`, `openai_hosted`, or `self_hosted`. For OpenAI-hosted, choose a container size and configure packages, initial files, network access; environment templates can be reused across sessions.
- Source: https://developers.openai.com/api/docs/guides/agents-api/configuration (fetched 2026-10).

## Related

- [Architecture](./architecture.md)
- [Functions](./functions.md)
- [MCP Connections](./mcp-connections.md)
- [Vaults](./vaults.md)
- [Plugins](./plugins.md)
- [Multi-agent (Agents API)](./multi-agent.md)
