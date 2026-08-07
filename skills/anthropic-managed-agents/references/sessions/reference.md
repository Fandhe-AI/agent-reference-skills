<!-- source: https://platform.claude.com/docs/en/managed-agents/reference / last verified: 2026-08-07 -->

# Reference

Event types, self-hosted worker CLI flags, supported MCP server types, rate limits, and branding guidelines for Claude Managed Agents.

## Signature / Usage

```bash
ant beta:worker poll --workdir "/workspace"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `user.*` events | event type | `message`, `interrupt`, `custom_tool_result`, `tool_confirmation`, `define_outcome`, `tool_result` (self-hosted only) |
| `agent.*` events | event type | `message`, `thinking`, `tool_use`/`tool_result`, `mcp_tool_use`/`mcp_tool_result`, `custom_tool_use`, `thread_context_compacted`, `thread_message_received`/`sent` |
| `session.*` events | event type | `status_running`/`status_idle`/`status_rescheduled`/`status_terminated`, `deleted`, `updated`, `error`, `thread_created`, `thread_status_*` |
| `span.*` events | event type | `model_request_start`/`end`, `outcome_evaluation_start`/`ongoing`/`end` |
| `system.message` | event type | Append privileged system-level context; supported on Opus 4.8 / Fable 5 / Mythos 5 / Opus 5 only |
| `--environment-id` / `--environment-key` / `--workdir` / `--on-work` / `--unrestricted-paths` / `--max-idle` / `--log-format` | worker CLI flag | `ant beta:worker` flags for a `self_hosted` environment worker |

## Notes

- Event type strings follow `{domain}.{action}`; `event_start`/`event_delta` are stream-only preview deltas (opt in via `event_deltas[]`), never persisted.
- Rate limits: create endpoints 300 req/min, read endpoints 1,200 req/min, per organization; org-level spend/usage-tier limits also apply.
- Supported MCP servers: remote HTTP endpoints (streamable HTTP; deprecated SSE falls back automatically) or private servers via MCP tunnels.
- Branding: "Claude Agent" / "Claude" (within an "Agents" menu) / "{YourAgentName} Powered by Claude" allowed; "Claude Code(...)" or "Claude Cowork(...)" branding not permitted.

## Related

- [Session operations](./session-operations.md)
- [Self-hosted sandboxes](../environments/self-hosted-sandboxes.md)
