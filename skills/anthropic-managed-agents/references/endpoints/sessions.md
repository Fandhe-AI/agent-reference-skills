<!-- source: https://platform.claude.com/docs/en/api/beta/sessions/create, /list, /retrieve, /update, /delete, /archive, /events/list, /events/send, /events/stream, /resources/add, /resources/list, /resources/retrieve, /resources/update, /resources/delete, /threads/list, /threads/retrieve, /threads/archive, /threads/events/list, /threads/events/stream / last verified: 2026-08-07 -->

# Sessions API

A `session` is a running instance of an `agent`: it holds conversation state, mounted resources, and (for multiagent agents) a coordinator thread plus spawned subagent threads. Sessions are driven by sending/streaming `events`.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/sessions` | Create a session from an `agent` (with optional overrides), `environment_id`, initial events, resources, vault IDs |
| GET | `/v1/sessions` | List sessions (filter by agent, status, deployment, memory_store, created_at range; paginated) |
| GET | `/v1/sessions/{session_id}` | Retrieve a session |
| POST | `/v1/sessions/{session_id}` | Update a session (title, metadata patch, mid-session `tools`/`mcp_servers` replacement) |
| DELETE | `/v1/sessions/{session_id}` | Permanently delete a session |
| POST | `/v1/sessions/{session_id}/archive` | Archive a session |
| GET | `/v1/sessions/{session_id}/events` | List events processed by the session (paginated, filterable by `types`) |
| POST | `/v1/sessions/{session_id}/events` | Send events to the session (user message, interrupt, tool confirmation/result, define outcome, system message) |
| GET | `/v1/sessions/{session_id}/events/stream` | Server-sent event (SSE) stream of the session's live event feed |
| POST | `/v1/sessions/{session_id}/resources` | Mount a resource (file, github_repository, memory_store) into the session container |
| GET | `/v1/sessions/{session_id}/resources` | List resources mounted in the session |
| GET | `/v1/sessions/{session_id}/resources/{resource_id}` | Retrieve a mounted resource |
| POST | `/v1/sessions/{session_id}/resources/{resource_id}` | Update a resource (currently: rotate `authorization_token` on a `github_repository` resource) |
| DELETE | `/v1/sessions/{session_id}/resources/{resource_id}` | Unmount a resource |
| GET | `/v1/sessions/{session_id}/threads` | List execution threads (primary + spawned subagent threads) in a session |
| GET | `/v1/sessions/{session_id}/threads/{thread_id}` | Retrieve a thread |
| POST | `/v1/sessions/{session_id}/threads/{thread_id}/archive` | Archive a thread |
| GET | `/v1/sessions/{session_id}/threads/{thread_id}/events` | List events for a single thread |
| GET | `/v1/sessions/{session_id}/threads/{thread_id}/stream` | SSE stream of a single thread's events |

```bash
curl https://api.anthropic.com/v1/sessions \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: managed-agents-2026-04-01' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{
        "agent": "agent_011CZkYpogX7uDKUyvBTophP",
        "environment_id": "env_011CZkZ9X2dpNyB7HsEFoRfW",
        "title": "Order #1234 inquiry"
      }'
```

## Options / Props

### Create Session body

| Name | Type | Description |
|------|------|-------------|
| `agent` | string \| `AgentParams{id,type:"agent",version?}` \| `AgentWithOverridesParams{id,type:"agent_with_overrides",mcp_servers?,model?,skills?,system?,tools?,version?}` | Agent ID (pins latest version) or explicit version, or agent + per-session override fields (full-replacement semantics; omit to inherit, `[]`/`null` to clear) |
| `environment_id` | string | Container environment for this session |
| `initial_events` | array of `UserMessageEventParams` \| `UserDefineOutcomeEventParams` (max 50) | Events processed in order at creation |
| `metadata` | map[string] | Up to 16 pairs, keys ≤64 chars, values ≤512 chars |
| `resources` | array of `GitHubRepositoryResourceParams` \| `FileResourceParams` \| `MemoryStoreResourceParam` | Resources to mount (see Resources below) |
| `title` | optional string | Human-readable title |
| `vault_ids` | optional array of string | Vault IDs for stored credentials |

### Agent model config (nested under `agent`)

| Name | Type | Description |
|------|------|-------------|
| `model.id` | `BetaManagedAgentsModel` (e.g. `claude-sonnet-5`, `claude-opus-5`, `claude-sonnet-4-6`, ...) or string | Model powering the agent |
| `model.effort` | `"low"\|"medium"\|"high"\|"xhigh"\|"max"` or `{type: <level>}` | Reasoning depth vs latency tradeoff; invalid combos rejected at create |
| `model.speed` | `"standard"\|"fast"` | `fast` = faster output tokens at premium price; not all models support it |
| `tools[].type` | `"agent_toolset_20260401"` \| `"mcp_toolset"` \| `"custom"` | Built-in toolset, MCP-server toolset, or client-executed custom tool |
| `tools[].configs[].permission_policy` | `{type:"always_allow"}` \| `{type:"always_ask"}` | Per-tool execution approval policy |
| `skills[].type` | `"anthropic"` \| `"custom"` | Anthropic-managed skill (`skill_id`, optional `version`) or user-created custom skill |

### List Sessions query

| Name | Type | Description |
|------|------|-------------|
| `agent_id`, `agent_version`, `deployment_id`, `memory_store_id` | optional string/number | Filters |
| `created_at[gt\|gte\|lt\|lte]` | optional string | Time-range filters |
| `include_archived` | optional boolean | Default false |
| `statuses` | optional array of `"rescheduling"\|"running"\|"idle"\|"terminated"` | Repeatable |
| `order` | `"asc"\|"desc"` | Default desc |
| `limit`, `page` | optional number/string | Pagination |

### Session (response) top-level fields

| Name | Type | Description |
|------|------|-------------|
| `id`, `type:"session"` | string | Identity |
| `agent` | `SessionAgent` | Snapshot of the resolved agent at creation time (includes `multiagent.agents[]` roster when applicable) |
| `status` | `"rescheduling"\|"running"\|"idle"\|"terminated"` | |
| `stats` | `{active_seconds, duration_seconds}` | |
| `usage` | `{input_tokens, output_tokens, cache_read_input_tokens, cache_creation:{ephemeral_1h_input_tokens, ephemeral_5m_input_tokens}}` | Cumulative across turns |
| `resources` | array of `GitHubRepositoryResource` \| `FileResource` \| `MemoryStoreResource` | |
| `outcome_evaluations` | array of `{outcome_id, description, iteration, result, explanation, completed_at}` | One per `user.define_outcome` sent |
| `vault_ids`, `metadata`, `environment_id`, `title`, `deployment_id?`, `archived_at`, `created_at`, `updated_at` | | |

### Update Session body

| Name | Type | Description |
|------|------|-------------|
| `agent.tools`, `agent.mcp_servers` | optional array | Only these two sub-fields are mid-session updatable; full replacement — GET, modify, POST back to preserve entries |
| `metadata` | optional map[string] | Patch semantics: string upserts a key, `null` deletes it |
| `title` | optional string | |
| `vault_ids` | optional array of string | **Not yet supported** — requests setting this are rejected |

### Resources (mountable into a session container)

| Type | Key fields | Notes |
|------|-----------|-------|
| `github_repository` | `authorization_token`, `url`, `checkout?:{type:"branch",name}\|{type:"commit",sha}`, `mount_path?` | Defaults mount path to `/workspace/<repo-name>` |
| `file` | `file_id`, `mount_path?` | Defaults to `/mnt/session/uploads/<file_id>` |
| `memory_store` | `memory_store_id`, `access?:"read_write"\|"read_only"`, `instructions?` (max 4096 chars) | Rendered into the agent's system prompt memory section; response also carries snapshotted `name`/`description` and derived `mount_path` |

Add Session Resource (`POST .../resources`) accepts the same 3-variant body as `resources[]` at session create. Update Session Resource (`POST .../resources/{resource_id}`) currently supports only `authorization_token` rotation, and only for `github_repository`. Delete returns `{id, type:"session_resource_deleted"}`.

### Threads

A session has one primary thread plus zero or more child threads spawned by a coordinator (multiagent) agent.

| Name | Type | Description |
|------|------|-------------|
| `id`, `type:"session_thread"` | string | |
| `agent` | `SessionThreadAgent` | Snapshot of the thread's own agent (not the roster) |
| `parent_thread_id` | string \| null | Null for the primary thread |
| `session_id` | string | |
| `status` | `"running"\|"idle"\|"rescheduling"\|"terminated"` | |
| `stats` | `{active_seconds, duration_seconds, startup_seconds}` | `startup_seconds` is 0 for child threads |
| `usage` | same shape as session usage | |

List Session Threads / Get Session Thread / Archive Session Thread mirror the session-level CRUD subset (list is paginated via `limit`/`page`; archive returns the updated thread). Thread-scoped events (`.../threads/{thread_id}/events` and `.../threads/{thread_id}/stream`) return the identical event union as the session-level `events`/`events/stream` endpoints below, scoped to that thread.

## Events — send (`POST .../events`)

Body: `events: array of` one of:

| `type` | Key fields | Purpose |
|--------|-----------|---------|
| `user.message` | `content: TextBlock\|ImageBlock\|DocumentBlock[]` | Send a user turn |
| `user.interrupt` | `session_thread_id?` | Pause the agent; omit thread id to interrupt all non-archived threads |
| `user.tool_confirmation` | `result:"allow"\|"deny"`, `tool_use_id`, `deny_message?`, `session_thread_id?` | Approve/deny a pending `agent.tool_use`/`agent.mcp_tool_use` |
| `user.custom_tool_result` | `custom_tool_use_id`, `content?`, `is_error?`, `session_thread_id?` | Result of a client-executed `custom` tool |
| `user.tool_result` | `tool_use_id`, `content?`, `is_error?`, `session_thread_id?` | Result of a sandbox-routed built-in tool; **self_hosted environments only** |
| `user.define_outcome` | `description`, `rubric:{type:"file",file_id}\|{type:"text",content}` (max 262144 chars), `max_iterations?` (default 3, max 20) | Defines a goal the agent iterates toward with grading; agent begins work immediately |
| `system.message` | `content: SystemContentBlock[]` (text-only) | Privileged context appended as a `role:"system"` turn; must be the final event in the request, immediately following the `user.message`/`user.tool_result`/`user.custom_tool_result` it accompanies; model-dependent support |

`tool_use_id`/`custom_tool_use_id` values come from the most recent `session.status_idle` event's `stop_reason.event_ids` (when `stop_reason.type == "requires_action"`).

## Events — SSE stream (`GET .../events/stream`, `GET .../threads/{thread_id}/stream`)

Standard SSE connection (`text/event-stream`). Query param `event_deltas` (repeatable: `agent.message`, `agent.thinking`) opts into low-latency preview frames (`event_start` / `event_delta`) ahead of the final buffered event; deltas are best-effort and never appear in event history (`GET .../events` list).

Full set of event `type` discriminators emitted on the stream (also returned, minus the delta-preview pair, from `GET .../events` history):

| `type` | Emitted when |
|--------|-------------|
| `user.message`, `user.interrupt`, `user.tool_confirmation`, `user.custom_tool_result`, `user.tool_result`, `user.define_outcome`, `system.message` | Echo of the corresponding client-sent input event (see table above); `user.define_outcome` echo carries the server-generated `outcome_id` |
| `agent.message` | Agent text response (`content: TextBlock[]`) |
| `agent.thinking` | Progress signal only — agent is doing extended thinking; carries no content |
| `agent.tool_use` / `agent.tool_result` | Built-in agent tool invocation / its result; tool_use carries `evaluated_permission:"allow"\|"ask"\|"deny"` |
| `agent.mcp_tool_use` / `agent.mcp_tool_result` | MCP-server tool invocation (adds `mcp_server_name`) / its result |
| `agent.custom_tool_use` | Client-executed custom tool call; session goes idle awaiting `user.custom_tool_result` |
| `agent.thread_message_sent` / `agent.thread_message_received` | Agent-to-agent (coordinator ↔ subagent) message send/delivery, cross-posted between threads |
| `agent.thread_context_compacted` | Context compaction (summarization) occurred |
| `session.status_running` / `session.status_idle` / `session.status_rescheduled` / `session.status_terminated` | Session-level status transitions; `status_idle` carries `stop_reason: {type:"end_turn"}` \| `{type:"requires_action", event_ids}` \| `{type:"retries_exhausted"}` |
| `session.thread_created` | Coordinator spawned a subagent thread |
| `session.thread_status_running` / `_idle` / `_rescheduled` / `_terminated` | Per-thread status transitions (same `stop_reason` shape for `_idle`) |
| `session.updated` | An `UpdateSession` call changed ≥1 field; carries only the changed fields (`agent?`, `metadata?`, `title?`) |
| `session.error` | Error during execution; `error` is a discriminated union (`unknown_error`, `model_overloaded_error`, `model_rate_limited_error`, `model_request_failed_error`, `mcp_connection_failed_error`, `mcp_authentication_failed_error`, `billing_error`, `credential_host_unreachable_error`), each carrying `message` and `retry_status: {type:"retrying"\|"exhausted"\|"terminal"}` |
| `session.deleted` | Session deleted; terminates the stream |
| `span.model_request_start` / `span.model_request_end` | Bracket a single underlying model call; `_end` carries `is_error` and `model_usage` |
| `span.outcome_evaluation_start` / `_ongoing` / `_end` | Bracket one grading cycle for a `user.define_outcome`; `_end.result` is `"satisfied"\|"needs_revision"\|"max_iterations_reached"\|"failed"\|"interrupted"` |
| `event_start` / `event_delta` | Only when `event_deltas` query param is set; preview frames for `agent.message` (`content_delta` fragments) / `agent.thinking` (start-only) |

## Notes

- All endpoints require header `anthropic-beta: managed-agents-2026-04-01`.
- `session_thread_id` fields let a coordinator's subagent-originated events (tool use, messages) be cross-posted onto the primary thread's stream; echo the same id back on the corresponding `user.*` response event to route it to the right thread.
- Deltas from `event_deltas` are best-effort: if a model request ends early (error/interrupt) with no final buffered event, the terminal `span.model_request_end` closes the preview instead.
- `user.tool_result` (as opposed to `user.custom_tool_result`) is valid only on `self_hosted` environments, where the client — not the server sandbox — executes tools.

## Related

- [environments.md](./environments.md) — `environment_id` defines the session's container
- [memory-stores.md](./memory-stores.md) — `memory_store` resource type and its attach semantics
- [vaults.md](./vaults.md) — `vault_ids` for credentials the agent can use during the session
