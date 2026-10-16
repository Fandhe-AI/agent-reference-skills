<!-- source: https://platform.claude.com/docs/en/managed-agents/reference / last verified: 2026-10-17 -->

# Reference

Event types, self-hosted worker CLI flags, supported MCP server types, rate limits, and branding guidelines for Claude Managed Agents.

## Signature / Usage

```bash
ant beta:worker poll --workdir "/workspace"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `user.*` events | event type | `message`, `interrupt` (ends no workflow run), `custom_tool_result`, `tool_confirmation`, `define_outcome`, `tool_result` (self-hosted only) |
| `agent.*` events | event type | `message`, `thinking`, `tool_use`/`tool_result`, `mcp_tool_use`/`mcp_tool_result` (the `*_use` events carry `evaluated_permission` and, usually, `evaluation`), `custom_tool_use`, `thread_context_compacted`, `thread_message_received`/`sent` |
| `session.*` events | event type | `status_running`/`status_idle`/`status_rescheduled`/`status_terminated`, `deleted`, `updated`, `error`, `usage` (snapshot of cumulative usage and tracked list cost, plus the budget if any), `thread_created` (carries `workflow_run_id`: the run's ID for a workflow run's thread, null otherwise), `thread_status_*` (running / idle / rescheduled / terminated) |
| `workflow_run.*` events | event type | `created` (`workflow_run_id`, `name`, `description`, `phases`), `status_running`, `status_idle`, `status_ended` (`result.type`), `error` (`workflow_run_id` is null when no run was created), `phase_started` (`workflow_run_phase_id`), `phase_ended` (`workflow_run_phase_id`, `phase_started_id`). Arrive only when dynamic workflows are turned on for the agent |
| `span.*` events | event type | `model_request_start`/`end`, `outcome_evaluation_start`/`ongoing`/`end` |
| `system.message` | event type | Append privileged system-level context for the accompanying and all subsequent turns. Supported models: Claude Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Opus 5.5, Opus 5, Opus 4.8, Sonnet 5.5, Haiku 5.5. On an unsupported primary model: `model_does_not_support_mid_conversation_system` |
| `event_start` / `event_delta` | stream-only event | Preview events on streams that opt in with `event_deltas`; never persisted |
| `--environment-id` / `--environment-key` / `--workdir` / `--on-work` / `--unrestricted-paths` / `--max-idle` / `--log-format` | worker CLI flag | `ant beta:worker` flags for a `self_hosted` environment worker |

## Notes

- Event type strings follow `{domain}.{action}`; `event_start`/`event_delta` are stream-only preview deltas (opt in via `event_deltas[]`), never persisted. Webhook event type names differ from the stream's in places (for example `session.status_idled` rather than `session.status_idle`).
- Message content in agent events can include a `redacted` content block, `{"type": "redacted"}`: a placeholder for content withheld by Anthropic model policy, with no other fields. Redacted blocks appear only in content the platform emits; a user event that includes one is rejected with a 400 error.
- `session.thread_status_terminated` also fires when an advisor thread's consultation ends; the server archives a workflow run's threads itself.
- Rate limits: create endpoints 300 req/min, read endpoints 1,200 req/min, per organization; org-level spend/usage-tier limits also apply.
- Supported MCP servers: remote HTTP endpoints (streamable HTTP; deprecated SSE falls back automatically) or private servers via MCP tunnels.
- Branding: "Claude Agent" / "Claude" (within an "Agents" menu) / "{YourAgentName} Powered by Claude" allowed; "Claude Code(...)" or "Claude Cowork(...)" branding not permitted.

## Related

- [Session operations](./session-operations.md)
- [Self-hosted sandboxes](../environments/self-hosted-sandboxes.md)
- [Self-hosted worker reference](../environments/self-hosted-sandboxes-reference.md) — `ant beta:worker` CLI flags, environment variables, filesystem paths, SDK helper options
- [Session event stream](../orchestration/events-and-streaming.md)
- [Event deltas](../orchestration/event-deltas.md)
