<!-- source: https://platform.claude.com/docs/en/api/beta/environments/create, /list, /retrieve, /update, /delete, /archive, /work/list, /work/poll, /work/retrieve, /work/ack, /work/heartbeat, /work/stats, /work/stop, /work/update / last verified: 2026-08-07 -->

# Environments API

An `environment` defines the container configuration (`cloud` sandbox managed by Anthropic, or `self_hosted`) that a session's agent runs in. `environments/*/work/*` is the work queue self-hosted sandbox workers poll to pick up session execution.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/environments` | Create an environment (`cloud` or `self_hosted` config) |
| GET | `/v1/environments` | List environments (paginated, `include_archived`) |
| GET | `/v1/environments/{environment_id}` | Retrieve an environment |
| POST | `/v1/environments/{environment_id}` | Update an environment (name, description, metadata, config, scope) |
| DELETE | `/v1/environments/{environment_id}` | Permanently delete an environment |
| POST | `/v1/environments/{environment_id}/archive` | Archive an environment (blocks new session creation) |
| GET | `/v1/environments/{environment_id}/work` | List work items in the environment's queue |
| GET | `/v1/environments/{environment_id}/work/poll` | Long-poll for the next queued work item |
| GET | `/v1/environments/{environment_id}/work/{work_id}` | Retrieve a work item |
| POST | `/v1/environments/{environment_id}/work/{work_id}/ack` | Acknowledge a work item (`queued` → `starting`) |
| POST | `/v1/environments/{environment_id}/work/{work_id}/heartbeat` | Extend a work item's lease |
| GET | `/v1/environments/{environment_id}/work/stats` | Work queue depth/pending/workers-polling stats |
| POST | `/v1/environments/{environment_id}/work/{work_id}/stop` | Stop a work item (graceful or forced) |
| POST | `/v1/environments/{environment_id}/work/{work_id}` | Patch a work item's metadata |

```bash
curl https://api.anthropic.com/v1/environments \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: managed-agents-2026-04-01' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{
        "name": "python-data-analysis",
        "config": {
          "type": "cloud",
          "networking": {"type": "limited", "allow_package_managers": true, "allowed_hosts": ["api.example.com"]},
          "packages": {"pip": ["pandas", "numpy"]}
        },
        "description": "Python environment with data-analysis packages."
      }'
```

## Options / Props

### Create/Update Environment body

| Name | Type | Description |
|------|------|-------------|
| `name` | string (create: required) | Human-readable name |
| `config` | `CloudConfigParams{type:"cloud", networking?, packages?}` \| `SelfHostedConfigParams{type:"self_hosted"}` | On update, omitted sub-fields preserve existing values |
| `config.networking` | `{type:"unrestricted"}` \| `{type:"limited", allow_mcp_servers?, allow_package_managers?, allowed_hosts?}` | `limited`: both allow flags default `false`; `allowed_hosts` is an explicit allowlist |
| `config.packages` | `{type:"packages", apt?, cargo?, gem?, go?, npm?, pip?}` (each array of string) | Package manager install lists; version pin via manager syntax, e.g. `pip: ["package==1.0.0"]`; caller validates existence |
| `description` | optional string | |
| `metadata` | optional map[string] | Update: set value to `null`/`""` to delete a key |
| `scope` | optional `"organization"\|"account"` | Visibility; **self-hosted environments only**; defaults based on org type |

### Environment (response)

| Name | Type | Description |
|------|------|-------------|
| `id`, `type:"environment"` | string | |
| `config` | `CloudConfig` (resolved `networking`+`packages`, all arrays non-optional) \| `SelfHostedConfig{type:"self_hosted"}` | |
| `name`, `description`, `metadata`, `scope?`, `archived_at`, `created_at`, `updated_at` | | |

Delete returns `{id, type:"environment_deleted"}`. Archive returns the updated `Environment`.

### Work items (`BetaSelfHostedWork`) — self-hosted sandbox work queue

> These endpoints (except `work/stats`) are called automatically by the pre-built environment worker in the SDKs/CLI. Documented for reference; direct invocation is not normally needed.

| Name | Type | Description |
|------|------|-------------|
| `id`, `type:"work"` | string | |
| `data` | `{id, type:"session"}` | The session this work item executes |
| `state` | `"queued"\|"starting"\|"active"\|"stopping"\|"stopped"` | |
| `secret` | string \| null | Credential payload for the worker; populated only on `poll`, null elsewhere |
| `environment_id`, `metadata` | | |
| `created_at`, `acknowledged_at`, `started_at`, `latest_heartbeat_at`, `stop_requested_at`, `stopped_at` | RFC 3339 or null | Lifecycle timestamps |

| Endpoint | Params | Notes |
|----------|--------|-------|
| List (`GET .../work`) | query `limit`, `page` | Paginated |
| Poll (`GET .../work/poll`) | query `block_ms` (1-999, default non-blocking), `reclaim_older_than_ms` (default 5000); header `Anthropic-Worker-ID` optional | Long-poll; returns a single `BetaSelfHostedWork` with `secret` populated; also reclaims unacknowledged items past the reclaim window |
| Ack (`POST .../work/{id}/ack`) | path only | `queued` → `starting`, removes from queue |
| Heartbeat (`POST .../work/{id}/heartbeat`) | query `desired_ttl_seconds?`, `expected_last_heartbeat?` (`"NO_HEARTBEAT"` to claim first lease, else echo prior value for optimistic concurrency; 412 on mismatch) | Returns `BetaSelfHostedWorkHeartbeatResponse{last_heartbeat, lease_extended, state, ttl_seconds, type:"work_heartbeat"}` |
| Stats (`GET .../work/stats`) | path only | Returns `{depth, pending, oldest_queued_at, workers_polling, type:"work_queue_stats"}`; Redis Stream consumer-group metrics; `workers_polling` requires callers to send `Anthropic-Worker-ID` on poll |
| Stop (`POST .../work/{id}/stop`) | body `force?: boolean` | `force:true` skips graceful shutdown |
| Update (`POST .../work/{id}`) | body `metadata` (patch semantics, same as sessions) | |

## Notes

- All endpoints require header `anthropic-beta: managed-agents-2026-04-01`.
- `scope` (`organization`/`account` visibility) applies only to `self_hosted` environments; irrelevant for `cloud`.
- `work/poll`, `work/ack`, `work/heartbeat`, `work/stop`, `work/update` are relevant only when running self-hosted sandbox workers — not needed for `cloud` environments.

## Related

- [sessions.md](./sessions.md) — `environment_id` on session create selects the environment a session runs in
