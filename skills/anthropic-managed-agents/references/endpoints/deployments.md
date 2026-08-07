<!-- source: https://platform.claude.com/docs/en/api/beta/deployments/create.md, https://platform.claude.com/docs/en/api/beta/deployments/list.md, https://platform.claude.com/docs/en/api/beta/deployments/retrieve.md, https://platform.claude.com/docs/en/api/beta/deployments/update.md, https://platform.claude.com/docs/en/api/beta/deployments/archive.md, https://platform.claude.com/docs/en/api/beta/deployments/pause.md, https://platform.claude.com/docs/en/api/beta/deployments/unpause.md, https://platform.claude.com/docs/en/api/beta/deployments/run.md / last verified: 2026-08-07 -->

# Deployments API

A `deployment` binds an `agent` to everything needed to run it autonomously: an `environment`, credentials (`vault_ids`), initial events, and an optional cron schedule. Deployments create sessions, either on schedule or via the run endpoint.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/deployments` | Create Deployment |
| GET | `/v1/deployments` | List Deployments (filters: `agent_id`, `status`, `created_at[gte/lte]`, `include_archived`) |
| GET | `/v1/deployments/{deployment_id}` | Get Deployment |
| POST | `/v1/deployments/{deployment_id}` | Update Deployment (partial patch) |
| POST | `/v1/deployments/{deployment_id}/archive` | Archive Deployment |
| POST | `/v1/deployments/{deployment_id}/pause` | Pause Deployment |
| POST | `/v1/deployments/{deployment_id}/unpause` | Unpause Deployment |
| POST | `/v1/deployments/{deployment_id}/run` | Run Deployment Now (creates a session immediately, outside the schedule) |

```http
curl https://api.anthropic.com/v1/deployments \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "agent": "agent_011CZkYpogX7uDKUyvBTophP",
          "environment_id": "env_011CZkZ9X2dpNyB7HsEFoRfW",
          "name": "Daily order report",
          "initial_events": [
            { "content": [{ "text": "Compile yesterday'"'"'s orders into report.md.", "type": "text" }], "type": "user.message" }
          ],
          "schedule": { "expression": "0 9 * * 1-5", "timezone": "America/Los_Angeles", "type": "cron" }
        }'
```

## Options / Props

### Body parameters (Create; Update is the same shape but every field becomes optional — "omit to preserve", most support clearing via `null`/empty; `agent`, `environment_id`, `name` cannot be cleared, `initial_events` cannot be cleared)

| Name | Type | Description |
|------|------|-------------|
| `agent` | `string \| {id, type:"agent", version?}` | Agent to deploy: ID string (pins latest) or explicit `{id, version}`. Agent must exist and not be archived. Required on create. |
| `environment_id` | `string` | ID of the `environment` (container config) sessions run in. Required on create. |
| `initial_events` | `array<UserMessageEvent \| UserDefineOutcomeEvent \| SystemMessageEvent>` | Events sent to each new session on creation. 1–50 entries. Required on create. |
| `name` | `string` | Human-readable name. Required on create. |
| `description` | `optional string` | |
| `metadata` | `optional map[string]` | Max 16 pairs. Update: set key to `null` to delete. |
| `resources` | `optional array<GitHubRepositoryResource \| FileResource \| MemoryStoreResource>` | Mounted into each session's container. Max 500. |
| `schedule` | `optional {expression, timezone, type:"cron"}` | 5-field POSIX cron (no seconds/year/`L`/`W`/`#`/`?`/`@daily`). `timezone` is an IANA identifier, validated. |
| `vault_ids` | `optional array<string>` | Stored-credential vaults available to sessions. Max 50. |
| `version` (Update only, on `agent` sub-object) | see `agent` | — |

### `initial_events` variants

| Type | Key fields | Description |
|------|------------|-------------|
| `user.message` | `content: array<TextBlock \| ImageBlock \| DocumentBlock>` | A user turn. Block sources support `base64`, `url`, or `file` (`file_id`). |
| `user.define_outcome` | `description`, `rubric: {type:"file", file_id} \| {type:"text", content}`, `max_iterations?` (default 3, max 20) | Task spec + grading rubric; agent begins work immediately. |
| `system.message` | `content: array<{text, type:"text"}>` | Privileged context appended to system turns; must be the final event, immediately following a `user.message`/`user.tool_result`/`user.custom_tool_result`. At most one per request. |

### `resources` variants

| Type | Key fields | Description |
|------|------------|-------------|
| `github_repository` | `authorization_token`, `url`, `checkout?: {type:"branch",name} \| {type:"commit",sha}`, `mount_path?` | Default mount `/workspace/<repo-name>`. Token is write-only (never echoed back). |
| `file` | `file_id`, `mount_path?` | Default mount `/mnt/session/uploads/<file_id>`. |
| `memory_store` | `memory_store_id`, `access?: "read_write"\|"read_only"`, `instructions?` (max 4096 chars) | Rendered into the session's memory system-prompt section. |

### List Deployments query parameters

| Name | Type | Description |
|------|------|-------------|
| `agent_id` | `optional string` | Filter by agent. |
| `status` | `optional "active" \| "paused"` | Cannot combine with `include_archived`. |
| `created_at[gte]` / `created_at[lte]` | `optional string` | |
| `include_archived` | `optional boolean` | Default false. |
| `limit` | `optional number` | Default 20, max 100. |
| `page` | `optional string` | Cursor. |

### Response object `BetaManagedAgentsDeployment`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | `depl_...` |
| `type` | `"deployment"` | |
| `agent` | `{id, type:"agent", version}` | Resolved, pinned version. |
| `status` | `"active" \| "paused"` | |
| `paused_reason` | `{type:"manual"} \| {type:"error", error: {...}}` | Non-null iff `status` is `paused`. `error` variants mirror run-failure error types (see below) plus `self_hosted_resources_unsupported_error` / `mcp_egress_blocked_error`. |
| `resources` | `array<ResourceConfig>` | Echoes input minus write-only credentials. |
| `schedule` | `{expression, timezone, type:"cron", last_run_at?, upcoming_runs_at?}` | `upcoming_runs_at`: up to 5 timestamps, jittered; empty once archived. |
| `name`, `description` | `string` | |
| `environment_id`, `vault_ids` | `string`, `array<string>` | |
| `initial_events` | `array<DeploymentInitialEvent>` | Same shape as request. |
| `metadata` | `map[string]` | |
| `archived_at`, `created_at`, `updated_at` | `string` (RFC 3339) | |

List endpoint wraps in `{data: array<Deployment>, next_page}`.

### Response object `BetaManagedAgentsDeploymentRun` (Run Deployment Now)

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | `drun_...` |
| `type` | `"deployment_run"` | |
| `agent` | `{id, type:"agent", version}` | |
| `deployment_id` | `string` | |
| `session_id` | `string \| null` | Set on success; exactly one of `session_id`/`error` is non-null. |
| `error` | `{type, message} \| null` | Failure reason: `environment_archived_error`, `agent_archived_error`, `environment_not_found_error`, `vault_not_found_error`, `vault_archived_error`, `file_not_found_error`, `memory_store_archived_error`, `skill_not_found_error`, `session_resource_not_found_error`, `workspace_archived_error`, `organization_disabled_error`, `session_rate_limited_error`, `session_creation_rejected_error`, `self_hosted_resources_unsupported_error`, `mcp_egress_blocked_error`, `unknown_error`. |
| `trigger_context` | `{type:"schedule", scheduled_at} \| {type:"manual"}` | What fired the run. |
| `created_at` | `string` (RFC 3339) | |

## Notes

- Beta; requires header `anthropic-beta: managed-agents-2026-04-01` (or a superset) on every request.
- A run record tracks only session-creation success/failure, not session lifecycle — poll the `session_id` via the Sessions API (outside this scope) for execution status.
- A failed scheduled run can auto-pause the deployment (`paused_reason.type: "error"`); `pause`/`unpause` set/clear `paused_reason.type: "manual"`.
- `session_rate_limited_error` is retryable — the cron schedule keeps firing and later runs may succeed.

## Related

- [agents.md](./agents.md) — the `agent`/`version` a deployment pins
- [webhooks.md](./webhooks.md) — `deployment.*`, `deployment_run.*`, `environment.*` events
