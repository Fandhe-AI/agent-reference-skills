<!-- source: https://platform.claude.com/docs/en/api/beta/agents/create.md, https://platform.claude.com/docs/en/api/beta/agents/list.md, https://platform.claude.com/docs/en/api/beta/agents/retrieve.md, https://platform.claude.com/docs/en/api/beta/agents/update.md, https://platform.claude.com/docs/en/api/beta/agents/archive.md, https://platform.claude.com/docs/en/api/beta/agents/versions/list.md / last verified: 2026-10-17 -->

# Agents API

Managed Agents `agent` resource: reusable agent configurations (model, system prompt, tools, skills, MCP servers, optional `multiagent` topology) that can be run in sessions or deployments.

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
| `model` | `BetaManagedAgentsModel \| BetaManagedAgentsModelConfigParams` | Model string (e.g. `claude-sonnet-4-6`) or `{id, effort, speed, inference_geo}` object. Required on create; cannot be cleared on update. |
| `execution_identity` | `optional {type:"aws_role", role_arn} \| {type:"service_account"}` | Execution principal for runs of this agent. Omitting, `null`, or `{"type":"service_account"}` stores the default (service account, the Anthropic-managed principal). `role_arn`: IAM role ARN, max 2048 chars. |
| `name` | `string` | Human-readable name. Required on create; cannot be cleared on update. |
| `description` | `optional string` | What the agent does. |
| `mcp_servers` | `optional array<{name, type: "url", url}>` | MCP servers the agent connects to. Max 20, unique names, each must be referenced by an `mcp_toolset` in `tools`. |
| `metadata` | `optional map[string]` | Max 16 key/value pairs (keys ≤64 chars, values ≤512 chars). On update: set a key to `null` to delete it. |
| `multiagent` | `optional BetaManagedAgentsMultiagentParams` | `coordinator` or `multiagent_20261001` (see below). |
| `skills` | `optional array<AnthropicSkillParams \| CustomSkillParams>` | `{skill_id, type:"anthropic", version?}` or `{skill_id, type:"custom", version?}`. Version defaults to latest. |
| `system` | `optional string` | System prompt. |
| `tools` | `optional array<AgentToolset \| MCPToolset \| CustomTool>` | Max 256 tools across all toolsets (on update: full replacement; omit to preserve, empty array or null to clear). See table below. |
| `version` (Update only) | `optional number` | Current version to prevent concurrent overwrites; request fails if it does not match server state. |

### `tools` variants

| Type | Key fields | Description |
|------|------------|-------------|
| `agent_toolset_20260401` | `configs[]: {name: "bash"\|"edit"\|"read"\|"write"\|"glob"\|"grep"\|"web_fetch"\|"web_search", enabled?, permission_policy?}`, `default_config: {enabled?, permission_policy?}` | Built-in agent tools. |
| `mcp_toolset` | `mcp_server_name`, `configs[]: {name, enabled?, permission_policy?}`, `default_config: {enabled?, permission_policy?}` | Tools sourced from an entry in `mcp_servers`. |
| `custom` | `name`, `description`, `input_schema: {type:"object", properties?, required?}` | Client-executed tool; emits `agent.custom_tool_use` event, session idles until `user.custom_tool_result`. |

`permission_policy` is `{type:"always_allow"}`, `{type:"always_ask"}`, or `{type:"auto"}` (the server judges each call: allow when judged safe, deny when judged high-risk, ask when it cannot reach a judgement).

`agent_toolset_20260401` `configs[]` entries for `web_fetch` and `web_search` also accept `allowed_domains` / `blocked_domains` (arrays of plain hostnames, at most 64 entries each; an empty list is rejected, omit the field instead; the two cannot be combined). `web_fetch` matches the URL host or a subdomain; `web_search` entries may carry an optional path suffix.

### `model` object (`BetaManagedAgentsModelConfigParams`)

| Field | Type | Description |
|-------|------|-------------|
| `id` | `BetaManagedAgentsModel` | The model that powers the agent. |
| `effort` | `optional "low" \| "medium" \| "high" \| "xhigh" \| "max" \| null` | Reasoning effort. `xhigh`: not all models accept this level. |
| `speed` | `optional "standard" \| "fast" \| null` | Inference speed mode; defaults to `standard`. `fast` is faster output at premium pricing; not all models support it (invalid combinations are rejected at create time). |
| `inference_geo` | `optional string \| null` | Geographic region for model inference; when unset, falls through to the workspace's `default_inference_geo`. On update, `model` is whole-object replacement, so omitting `inference_geo` clears it (`effort` is the sole exception on agent update; see Update semantics in `../getting-started/agent-setup.md`). |

### `multiagent` variants (`BetaManagedAgentsMultiagentParams`)

| Type | Fields | Description |
|------|--------|-------------|
| `coordinator` | `agents[]` | Coordinator topology: the primary thread spawns session threads from a 1–20 entry roster (agent ID string, `{type:"agent",id,version?}`, `{type:"self"}` (at most one), or `{type:"advisor", model}` (at most one; occupies the roster name `anthropic.advisor`)). Referenced agents must exist, not be archived, and not have `multiagent` set (depth limit 1). |
| `multiagent_20261001` | `advisor?`, `subagents?`, `workflows?` | Three members, each enabled or disabled on its own. `advisor`: `{type:"enabled", model}` or `{type:"disabled"}` (default disabled). `subagents` / `workflows`: `{type:"enabled", inline_agents?, predefined_agents?}` or `{type:"disabled"}` (default enabled; `inline_agents` default enabled; `predefined_agents` at most 20, separate lists, entries are an ID string, `{type:"agent",id,version?}`, or `{type:"self"}`). If `inline_agents` is disabled, `predefined_agents` must name at least one agent. |

On update, if the stored `multiagent` also has type `multiagent_20261001`, the sent configuration is merged level by level: an omitted key keeps its stored value, a key sent as `null` takes its default, a sent `predefined_agents` list replaces the stored list, and an object sent with a different `type` replaces the stored object. Every object sent needs its `type`, and an enabled `advisor` needs its `model`.

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
| `execution_identity` | `{type:"aws_role", role_arn} \| {type:"service_account"}` | Resolved execution principal. |
| `multiagent` | `coordinator` roster or `multiagent_20261001` configuration | Resolved configuration (each referenced agent pinned to a version); `multiagent_20261001` resolves all three members. |
| `skills` | `array<{skill_id, type, version}>` | Resolved to concrete version strings. |
| `tools` | `array<AgentToolset \| MCPToolset \| CustomTool>` | Resolved (all `enabled`/`permission_policy` filled in). |

List endpoints wrap this in `{data: array<Agent>, next_page: optional string}`.

## Notes

- Beta; requires header `anthropic-beta: managed-agents-2026-04-01` (or a superset beta list) on every request.
- `multiagent` depth is limited to 1: an agent cannot reference another agent that itself has `multiagent` set.
- Custom tool names cannot use the reserved `mcp__` or `ant__` prefixes (or match a built-in tool such as `bash`); an update to an agent that already has such a tool fails with 400 until `tools` is sent without that name.
- Update endpoint uses POST (not PATCH); omitted fields are preserved, `null`/empty values clear clearable fields, `name` and `model` cannot be cleared.
- The 256 limit is counted differently across sources: this API reference says "256 tools across all toolsets", while the self-hosted custom tools guide says 256 entries in the `tools` array with the built-in toolset counting as one entry. Not settled by the sources; near the limit, stay within 256 under the stricter reading (total tools after expansion). See `../environments/self-hosted-sandboxes-custom-tools.md`.
- `version` on Update enables optimistic concurrency control (obtain from a prior create/retrieve response).

## Related

- [deployments.md](./deployments.md) — deployments run agents on a schedule/trigger and reference `agent`/`version`
- [webhooks.md](./webhooks.md) — `agent.created` / `agent.updated` / `agent.archived` / `agent.deleted` events
