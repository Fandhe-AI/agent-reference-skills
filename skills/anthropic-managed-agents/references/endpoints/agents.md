<!-- source: https://platform.claude.com/docs/en/api/beta/agents/create.md, https://platform.claude.com/docs/en/api/beta/agents/list.md, https://platform.claude.com/docs/en/api/beta/agents/retrieve.md, https://platform.claude.com/docs/en/api/beta/agents/update.md, https://platform.claude.com/docs/en/api/beta/agents/archive.md, https://platform.claude.com/docs/en/api/beta/agents/versions/list.md / last verified: 2026-08-07 -->

# Agents API

Managed Agents `agent` resource: reusable agent configurations (model, system prompt, tools, skills, MCP servers, optional `multiagent` coordinator topology) that can be run in sessions or deployments.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/agents` | Create Agent |
| GET | `/v1/agents` | List Agents (paginated, `include_archived` filter) |
| GET | `/v1/agents/{agent_id}` | Get Agent (optional `version` query param) |
| POST | `/v1/agents/{agent_id}` | Update Agent (partial patch; omitted fields preserved) |
| POST | `/v1/agents/{agent_id}/archive` | Archive Agent |
| GET | `/v1/agents/{agent_id}/versions` | List Agent Versions (paginated) |

```http
curl https://api.anthropic.com/v1/agents \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d "{
          \"model\": \"claude-sonnet-4-6\",
          \"name\": \"My First Agent\",
          \"description\": \"A general-purpose starter agent.\",
          \"system\": \"You are a general-purpose agent that can research, write code, run commands, and use connected tools to complete the user's task end to end.\",
          \"tools\": [
            { \"type\": \"agent_toolset_20260401\" }
          ]
        }"
```

## Options / Props

### Body parameters (Create; Update is the same shape but every field becomes optional and "omit to preserve, null/empty to clear")

| Name | Type | Description |
|------|------|-------------|
| `model` | `BetaManagedAgentsModel \| BetaManagedAgentsModelConfigParams` | Model string (e.g. `claude-sonnet-4-6`) or `{id, effort, speed}` object. Required on create; cannot be cleared on update. |
| `name` | `string` | Human-readable name. Required on create; cannot be cleared on update. |
| `description` | `optional string` | What the agent does. |
| `mcp_servers` | `optional array<{name, type: "url", url}>` | MCP servers the agent connects to. Max 20, unique names, each must be referenced by an `mcp_toolset` in `tools`. |
| `metadata` | `optional map[string]` | Max 16 key/value pairs (keys ≤64 chars, values ≤512 chars). On update: set a key to `null` to delete it. |
| `multiagent` | `optional {agents: [...], type: "coordinator"}` | Coordinator topology: primary thread spawns session threads from a 1–20 entry `agents` roster (agent ID string, `{type:"agent",id,version}`, or `{type:"self"}`, at most one `self`, no nested `multiagent`, depth limit 1). |
| `skills` | `optional array<AnthropicSkillParams \| CustomSkillParams>` | `{skill_id, type:"anthropic", version?}` or `{skill_id, type:"custom", version?}`. Version defaults to latest. |
| `system` | `optional string` | System prompt. |
| `tools` | `optional array<AgentToolset \| MCPToolset \| CustomTool>` | Max 128 tools total. See table below. |
| `version` (Update only) | `optional number` | Current version to prevent concurrent overwrites; request fails if it does not match server state. |

### `tools` variants

| Type | Key fields | Description |
|------|------------|-------------|
| `agent_toolset_20260401` | `configs[]: {name: "bash"\|"edit"\|"read"\|"write"\|"glob"\|"grep"\|"web_fetch"\|"web_search", enabled?, permission_policy?}`, `default_config: {enabled?, permission_policy?}` | Built-in agent tools. |
| `mcp_toolset` | `mcp_server_name`, `configs[]: {name, enabled?, permission_policy?}`, `default_config: {enabled?, permission_policy?}` | Tools sourced from an entry in `mcp_servers`. |
| `custom` | `name`, `description`, `input_schema: {type:"object", properties?, required?}` | Client-executed tool; emits `agent.custom_tool_use` event, session idles until `user.custom_tool_result`. |

`permission_policy` is `{type:"always_allow"}` or `{type:"always_ask"}`.

### List Agents / List Agent Versions query parameters

| Name | Type | Description |
|------|------|-------------|
| `created_at[gte]` / `created_at[lte]` | `optional string` | Filter by creation time (List Agents only). |
| `include_archived` | `optional boolean` | Include archived agents (List Agents only). Default false. |
| `limit` | `optional number` | Default 20, max 100. |
| `page` | `optional string` | Opaque pagination cursor. |
| `version` (Get Agent only) | `optional number` | Specific version; omit for latest. |

### Response object `BetaManagedAgentsAgent`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | |
| `type` | `"agent"` | |
| `name`, `description`, `system` | `string` | |
| `archived_at`, `created_at`, `updated_at` | `string` (RFC 3339) | |
| `version` | `number` | Starts at 1, increments on modification. |
| `model` | `{id, effort?, speed?}` | Resolved model config. |
| `mcp_servers` | `array<{name, type:"url", url}>` | |
| `metadata` | `map[string]` | |
| `multiagent` | `{agents: [{id, type:"agent", version}], type:"coordinator"}` | Resolved coordinator roster (each entry pinned to a version). |
| `skills` | `array<{skill_id, type, version}>` | Resolved to concrete version strings. |
| `tools` | `array<AgentToolset \| MCPToolset \| CustomTool>` | Resolved (all `enabled`/`permission_policy` filled in). |

List endpoints wrap this in `{data: array<Agent>, next_page: optional string}`.

## Notes

- Beta; requires header `anthropic-beta: managed-agents-2026-04-01` (or a superset beta list) on every request.
- `multiagent` coordinator depth is limited to 1: a coordinator agent cannot reference another agent that itself has `multiagent` set.
- Update endpoint uses POST (not PATCH); omitted fields are preserved, `null`/empty values clear clearable fields, `name` and `model` cannot be cleared.
- `version` on Update enables optimistic concurrency control (obtain from a prior create/retrieve response).

## Related

- [deployments.md](./deployments.md) — deployments run agents on a schedule/trigger and reference `agent`/`version`
- [webhooks.md](./webhooks.md) — `agent.created` / `agent.updated` / `agent.archived` / `agent.deleted` events
