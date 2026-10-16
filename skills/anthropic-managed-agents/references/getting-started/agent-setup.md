<!-- source: https://platform.claude.com/docs/en/managed-agents/agent-setup / last verified: 2026-10-17 -->

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
| `model` | Required. Claude model powering the agent; string ID or object, for example `{"id": "claude-opus-5", "speed": "fast", "effort": "high"}`. Claude 4.5+ supported. The object form accepts `speed` (`standard` / `fast`), `effort` (`low` / `medium` / `high` / `xhigh` / `max`), and `inference_geo` (`"us"` or `"global"`). |
| `system` | System prompt defining behavior/persona, distinct from user messages describing the work. |
| `tools` | Pre-built agent tools, MCP tools, and custom tools. |
| `mcp_servers` | MCP servers providing standardized third-party capabilities. |
| `skills` | Skills supplying domain-specific context with progressive disclosure. |
| `multiagent` | Lets the agent hand work to other agents, as subagents or in dynamic workflows, and optionally consult an advisor model. With the `multiagent_20261001` type, dynamic workflows are on unless you disable them (see multiagent-orchestration.md). |
| `description` | Description of what the agent does. |
| `metadata` | Arbitrary key-value pairs for your own tracking. |

`model`, `system`, `tools`, `mcp_servers`, and `skills` can also be overridden per-session without changing the agent. A `model` override replaces the agent's `model` object in full, so the agent's own `effort` isn't carried over; to run the session at a specific effort level, set `effort` inside the override's `model` object.

### Pin the inference geo

`inference_geo` is set through the object form of `model`, alongside `id` (like `speed` and `effort`). It accepts `"us"` or `"global"`. When unset, each model request follows the workspace's default inference geo at the time it's served.

```python
agent = client.beta.agents.create(
    name="Coding Assistant",
    model={"id": "claude-opus-5-5", "inference_geo": "us"},
    tools=[{"type": "agent_toolset_20260401"}],
)
```

### Create with the CLI

`ant apply coding-assistant.md` creates the agent from a markdown file (YAML frontmatter for `name`, `model`, `tools`; body is the system prompt), prints its ID, and records it in `claude-lock.json`. Commit `claude-lock.json` so the next `ant apply` updates the agent instead of creating a second one.

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
- Within a `model` object you supply, `effort` is the sole exception: if `id` is unchanged, omitting `effort` leaves the stored effort unchanged; changing `id` resets an omitted `effort` to the new model's default. Other `model` fields are replaced along with the object: supplying `model` without `inference_geo` clears the agent's inference geo pin.- Array fields (`tools`, `mcp_servers`, `skills`) are fully replaced; pass `null` or `[]` to clear.
- `multiagent` is merged into the stored block level by level when the update keeps the `multiagent_20261001` type (an omitted setting keeps its stored value; a sent `predefined_agents` list replaces the stored list; inside the block `null` resets a setting to its default, so `workflows: null` turns dynamic workflows on). Any other update that sends `multiagent` (for example one using the `coordinator` type) replaces the stored block as a whole, and omitted settings take their defaults. Pass `"multiagent": null` to clear the whole block.
- `metadata` is merged at the key level; set a key to `null` to delete it.
- No-op updates create no new version.
- Other agents' `predefined_agents` lists are not updated: agents that list this agent in `subagents` or `workflows` (or a coordinator in `multiagent.agents`) keep the version pinned when they were created or when an update last sent that list, even if the reference omits `version`. Update the listing agent to delegate to the new version.

## Agent lifecycle

| Operation | Behavior |
|-----------|----------|
| Update | Generates a new agent version when the configuration changes. |
| List versions | `client.beta.agents.versions.list(agent.id)` — full version history to track how an agent changed over time; paginated (the SDK examples fetch every page automatically). |
| Archive | `client.beta.agents.archive(agent.id)` — makes the agent read-only and cannot be undone; new sessions can't reference it, existing sessions continue. Sets `archived_at`. |

## Notes

- The `agent_toolset_20260401` tool's `default_config.permission_policy` defaults to `always_allow` unless configured otherwise.

## Related

- [Multiagent orchestration](../orchestration/multiagent-orchestration.md)
- [Get started with Claude Managed Agents](./quickstart.md)
- [Define outcomes](./define-outcomes.md)
