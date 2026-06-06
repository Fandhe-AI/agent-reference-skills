# Client

Lightweight, stateless client for programmatic workflow management. Used to trigger, cancel, notify, and inspect workflow runs from application code or external services.

## Signature / Usage

```typescript
import { Client } from "@upstash/workflow"

const client = new Client({
  baseUrl: process.env.QSTASH_URL!,
  token: process.env.QSTASH_TOKEN!,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `token` | `string` | QStash token from the Upstash dashboard |
| `baseUrl` | `string` | QStash base URL; defaults to production if omitted |

## Available Methods

| Method | Description |
|--------|-------------|
| `client.trigger()` | Start one or more workflow runs |
| `client.cancel()` | Terminate active workflow runs |
| `client.notify()` | Send an event to workflows paused at `waitForEvent` |
| `client.logs()` | Retrieve workflow execution history |
| `client.getWaiters()` | List workflows waiting for a specific event |
| `client.dlq.list()` | List failed runs in the Dead Letter Queue |
| `client.dlq.restart()` | Reprocess a failed run from the beginning |
| `client.dlq.resume()` | Resume a run from the point of failure |
| `client.dlq.delete()` | Remove an item from the DLQ |
| `client.dlq.retryFailureFunction()` | Retry the failure handler for a run |

## Notes

- A single `Client` instance can be safely reused throughout the application; it is stateless
- `QSTASH_URL` and `QSTASH_TOKEN` are provided by the Upstash dashboard or the local dev server

## Related

- [client.trigger](./client-trigger.md)
- [client.cancel](./client-cancel.md)
- [client.notify](./client-notify.md)
- [client.logs](./client-logs.md)
