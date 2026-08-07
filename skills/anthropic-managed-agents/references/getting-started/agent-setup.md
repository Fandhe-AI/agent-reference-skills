<!-- source: https://platform.claude.com/docs/en/managed-agents/agent-setup / last verified: 2026-08-07 -->

# Define your agent

Create a reusable, versioned agent configuration that bundles the model, system prompt, tools, MCP servers, and skills. Create the agent once and reference it by ID every time you start a session.

## Signature / Usage

```python
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-opus-5",
    system="You are a helpful coding agent.",
    tools=[{"type": "agent_toolset_20260401"}],
)
```

The response echoes your configuration and adds `id`, `type`, `version` (starts at 1, increments on each update), `created_at`, `updated_at`, and `archived_at`. Omitted `model` fields (such as `effort`) are filled with defaults.

## Options / Props

| Field | Description |
|-------|-------------|
| `name` | Required. Human-readable name for the agent. |
| `model` | Required. Claude model powering the agent; string ID or object, for example `{"id": "claude-opus-5", "speed": "fast", "effort": "high"}`. Claude 4.5+ supported. |
| `system` | System prompt defining behavior/persona, distinct from user messages describing the work. |
| `tools` | Pre-built agent tools, MCP tools, and custom tools. |
| `mcp_servers` | MCP servers providing standardized third-party capabilities. |
| `skills` | Skills supplying domain-specific context with progressive disclosure. |
| `multiagent` | Coordinator declaration listing agents this agent can delegate to (see multiagent-orchestration.md). |
| `description` | Description of what the agent does. |
| `metadata` | Arbitrary key-value pairs for your own tracking. |

`model`, `system`, `tools`, `mcp_servers`, and `skills` can also be overridden per-session without changing the agent (an `effort` level set inside a per-session `model` override is not applied; set it on the agent instead).

## Update an agent

```python
updated_agent = client.beta.agents.update(
    agent.id,
    version=agent.version,
    system="You are a helpful coding agent. Always write tests.",
)
```

### Update semantics

- `version` is optional, must be ≥1 when supplied. Supplying it returns 409 on mismatch (optimistic concurrency); omitting it applies unconditionally (last write wins).
- Omitted fields are preserved; only include fields you want to change.
- Scalar fields (`model`, `system`, `name`, `description`) are replaced. `system`/`description` can be cleared with `null`; `model`/`name` cannot.
- Within `model`, omitting `effort` when the `id` is unchanged leaves the stored effort unchanged; changing `id` resets an omitted `effort` to the new model's default.
- Array fields (`tools`, `mcp_servers`, `skills`) are fully replaced; pass `null` or `[]` to clear.
- `multiagent` is replaced as a whole (including its `agents` roster); pass `null` to clear.
- `metadata` is merged at the key level; set a key to `null` to delete it.
- No-op updates create no new version.
- Coordinators referencing this agent in `multiagent.agents` keep the pinned version until the coordinator itself is updated.

## Agent lifecycle

| Operation | Behavior |
|-----------|----------|
| Update | Generates a new agent version when the configuration changes. |
| List versions | `client.beta.agents.versions.list(agent.id)` — full version history. |
| Archive | `client.beta.agents.archive(agent.id)` — makes the agent read-only; new sessions can't reference it, existing sessions continue. Sets `archived_at`. |

## Notes

- The `agent_toolset_20260401` tool's `default_config.permission_policy` defaults to `always_allow` unless configured otherwise.

## Related

- [Multiagent orchestration](../orchestration/multiagent-orchestration.md)
- [Get started with Claude Managed Agents](./quickstart.md)
- [Define outcomes](./define-outcomes.md)
