---
source: https://modelcontextprotocol.io/extensions/tasks/overview
---

# Tasks Extension

The `io.modelcontextprotocol/tasks` extension lets servers return a durable task handle instead of blocking, so clients can poll for progress, provide input when needed, and retrieve the final result after reconnecting.

## Signature / Usage

Client declares support in per-request capabilities:

```jsonc
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "...",
  "params": {
    // Other fields...
    "_meta": {
      // Other fields...
      "io.modelcontextprotocol/clientCapabilities": {
        "extensions": {
          "io.modelcontextprotocol/tasks": {},
        },
      },
    },
  },
}
```

Server advertises support in `server/discover`:

```jsonc
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    // Other fields...
    "capabilities": {
      "extensions": {
        "io.modelcontextprotocol/tasks": {},
      },
    },
  },
}
```

Flow:

1. Capability negotiation (client per-request capabilities; server `server/discover` capabilities).
2. Task creation: the server returns a `CreateTaskResult` (`resultType: "task"`) with `taskId`, initial status, TTL (`ttlMs`), and suggested polling interval (`pollIntervalMs`). The task is durably created before the response is sent.
3. Polling: the client calls `tasks/get` with the `taskId`; terminal states carry the final `result` or `error`.
4. Mid-flight input: on `input_required`, the `tasks/get` response includes an `inputRequests` map; the client fulfills them via `tasks/update` (`inputResponses`).
5. Completion: on `completed`, `result` holds what the original request would have returned synchronously; on `failed`, `error` holds the JSON-RPC error.
6. Cancellation: `tasks/cancel`, cooperative; the server is not obligated to stop the work.

## Options / Props

Task lifecycle statuses:

| Status | Meaning |
| --- | --- |
| `working` | The operation is in progress. |
| `input_required` | The server needs client input before continuing. See `inputRequests`. |
| `completed` | The operation finished. The `result` field contains the final output. |
| `failed` | A JSON-RPC error occurred during execution. The `error` field has details. |
| `cancelled` | The operation was cancelled (not always honored). |

`completed`, `failed`, and `cancelled` are terminal; once reached, the task's state does not change.

## Notes

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path `/extensions/`). The full specification lives in a separate repository (see the Specification section of the source page); only the overview is reproduced here.
- Replaced in 2026-07-28: tasks were moved out of the core protocol into this official extension (SEP-2663). The redesigned extension replaces the blocking `tasks/result` method with polling via `tasks/get` and a new `tasks/update` for client-to-server input, removes `tasks/list`, and allows servers to return task handles unsolicited without per-request opt-in (changelog 2026-07-28).
- Server rules: verify the client declared the extension before returning a `CreateTaskResult` (never return a task to a client that did not declare support); acknowledge `tasks/update` and `tasks/cancel` with an empty result; ignore responses for unknown or already-satisfied `inputResponses` keys.
- Client rules: be prepared for either the standard result or a `CreateTaskResult` on a supported request (e.g., `tools/call`); respect `pollIntervalMs`; persist task IDs durably so polling can resume after a crash or restart.
- Notifications: servers can push `notifications/tasks`, which clients opt into through `subscriptions/listen`; each carries the full task state. Polling is the default.
- Distance: the MCP Tasks extension (`io.modelcontextprotocol/tasks`) is unrelated to job queues (inngest, bullmq) or Claude Code scheduled tasks (anthropic-claude-code-extend).

## Related

- [Extensions Overview](./extensions-overview.md)
- [Extension Client Matrix](./client-matrix.md)
