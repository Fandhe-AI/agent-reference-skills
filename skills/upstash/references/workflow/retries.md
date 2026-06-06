# Retries

Upstash Workflow automatically retries failed steps. Default retry count is 3 with exponential backoff. Retries can be customized at trigger time or suppressed with `WorkflowNonRetryableError`.

## Signature / Usage

```typescript
// Custom retry count and delay at trigger time
const { workflowRunId } = await client.trigger({
  url: "https://your-app.com/api/workflow",
  retries: 5,
  retryDelay: "(1 + retried) * 2000",  // ms; retried starts at 0
})
```

```typescript
// Prevent retries for a specific error
import { WorkflowNonRetryableError } from "@upstash/workflow"

await context.run("validate-user", async () => {
  const user = await db.getUser(id)
  if (!user) {
    throw new WorkflowNonRetryableError("User does not exist")
  }
  return user
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `retries` | `number` | Number of retry attempts before moving to DLQ; default: 3 |
| `retryDelay` | `number \| string` | Delay between retries in ms; supports math expressions using `retried` (0-indexed attempt count) |

## Default Backoff Schedule

| Attempt | Approximate delay |
|---------|------------------|
| 1 | ~12 seconds |
| 2 | ~2 minutes 28 seconds |
| 3 | ~30 minutes 8 seconds |
| 4+ | Capped at 24 hours |

Formula: `delay = min(86400, e^(2.5 * n))` seconds

## Stopping Retries

| Method | Effect |
|--------|--------|
| `WorkflowNonRetryableError` | Marks run as failed; triggers failure handler; sends to DLQ |
| `context.cancel()` | Marks run as "canceled"; does **not** trigger failure handler; does **not** go to DLQ |
| Early `return` | Completes the run successfully without error |

## Notes

- After all retries are exhausted, the failed run is moved to the Dead Letter Queue (DLQ) for manual inspection and recovery
- DLQ operations: `client.dlq.restart()` (restart from scratch) or `client.dlq.resume()` (resume from failure point)

## Related

- [failures](./failures.md)
- [client.trigger](./client-trigger.md)
- [client](./client.md)
