<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-operations / last verified: 2026-10-17 -->

# Monitor and troubleshoot self-hosted workers

Read queue depth, stop sessions and workers without losing work, and fix common self-hosted sandbox failures. Monitoring calls run from your operations tooling with your Claude API key.

## Signature / Usage

```bash
# Queue state
ant beta:environments:work stats --environment-id "$ANTHROPIC_ENVIRONMENT_ID"

# Stop a session's work item gracefully (add --force to mark it stopped immediately)
ant beta:environments:work stop \
  --environment-id "$ANTHROPIC_ENVIRONMENT_ID" \
  --work-id "$ANTHROPIC_WORK_ID"
```

```bash
curl -sS "https://api.anthropic.com/v1/environments/$ANTHROPIC_ENVIRONMENT_ID/work/stats" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "anthropic-version: 2023-06-01"
```

```text
{
  "type": "work_queue_stats",
  "depth": 0,
  "pending": 0,
  "oldest_queued_at": null,
  "workers_polling": 0
}
```

## Options / Props

`GET /v1/environments/{environment_id}/work/stats` fields:

| Field | Meaning |
|-------|---------|
| `depth` | Items waiting to be claimed. Scale the fleet or alert on backlog |
| `pending` | Items claimed but not yet acknowledged (near zero normally). Alert on a sustained non-zero value |
| `oldest_queued_at` | Timestamp of the oldest item still queued or claimed-but-unacknowledged; `null` when none |
| `workers_polling` | Workers that have polled in the last 30 seconds. Alert on liveness |

`POST /v1/environments/{environment_id}/work/{work_id}/stop`: by default the item moves to `stopping`, the worker notices on its next lease heartbeat, cancels the in-flight tool call, and confirms; the item becomes `stopped`. `force: true` (python: `force=True`; cli: `--force`) marks it `stopped` immediately.

Memory mount failures (worker log):

| Symptom | Fix |
|---------|-----|
| `the work item carried no sessions token` (Go: `ErrSessionMemoryNoToken`), work item fails | Forward the work item's secret. If the worker polls and runs in one process and still logs this, contact support |
| `something already exists at the memory store's path` | Remove the leftover directory the log names (unsynced edits are lost) |
| `cannot create the memory store's folder` / `the worker host must make this mount path writable` | Create `/mnt/memory` and `chown` it to the worker user |
| Session `idle` with `requires_action` and no error event soon after a claim | Fix the cause, then send a `user.interrupt` event; the work is queued again and the next worker retries the mount |

## Notes

- These endpoints accept either your organization API key or the environment key. Call them from outside the worker host with the organization API key; setting `ANTHROPIC_API_KEY` on the worker host exposes an organization-scoped credential to agent tool calls.
- `ANTHROPIC_WORK_ID` is not set automatically in ops tooling; list the environment's work items through the Environments Work endpoints to find the ID.
- Stop workers gracefully: the `ant` CLI handles SIGTERM/SIGINT itself; an SDK worker as its own process must cancel from a signal handler (`EnvironmentWorker` installs none); an SDK worker inside a webhook server must cancel from the server's shutdown hook. Allow at least 30 seconds before any hard kill (Docker sends SIGKILL after 10 seconds by default; raise with `--stop-timeout` or the orchestrator's grace period). With memory stores attached, a cancelled worker skips the final sync but still uploads changed files and removes the store directories. A killed worker loses unsynced edits and leaves directories under `/mnt/memory/`.
- Worker does not connect: `workers_polling` stays 0; confirm `ANTHROPIC_ENVIRONMENT_KEY` and `ANTHROPIC_ENVIRONMENT_ID` are set on the host.
- A session stays queued: no worker is claiming work (queued sessions wait rather than fail); check `workers_polling` and `depth`.
- Memory mount failures are logged by the worker, not reported to the session; only read-only refusals reach the agent as tool errors.
- A custom tool call never returns: the session pauses with `requires_action` because no worker or client serves that tool.
- A wrapped MCP tool call hangs without an MCP client timeout until a backstop fires: Python, the worker's tool call limit (about two and a half minutes); TypeScript, the MCP SDK's default request timeout (about a minute); Go, the worker cancels after its default limit (120 seconds).
- Status: beta (`managed-agents-2026-04-01`).

## Related

- [Deploy self-hosted workers](./self-hosted-sandboxes-workers.md)
- [Memory stores in self-hosted sandboxes](./self-hosted-sandboxes-memory.md)
- [Custom tools in self-hosted sandboxes](./self-hosted-sandboxes-custom-tools.md)
- [Security model](./self-hosted-sandboxes-security.md)
