# client.trigger()

Initiates one or more new workflow runs and returns the assigned `workflowRunId`.

## Signature / Usage

```typescript
// Single workflow
const { workflowRunId } = await client.trigger({
  url: "https://your-app.com/api/workflow",
  body: { userId: "user_123" },
  retries: 3,
  delay: "5m",
})

// Batch trigger
const results = await client.trigger([
  { url: "https://your-app.com/api/workflow", body: { userId: "a" } },
  { url: "https://your-app.com/api/workflow", body: { userId: "b" } },
])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | **Required.** Public workflow endpoint URL |
| `body` | `any` | Payload accessible via `context.requestPayload` |
| `headers` | `object` | HTTP headers forwarded to the workflow |
| `workflowRunId` | `string` | Custom run ID (auto-prefixed with `wfr_` if set) |
| `retries` | `number` | Retry attempts on step failure; default: 3 |
| `retryDelay` | `number \| string` | Delay between retries in ms; supports expressions (e.g., `"(1 + retried) * 1000"`) |
| `delay` | `string \| number` | Start delay before first execution (e.g., `"1h"`, `"30m"`, seconds as number) |
| `notBefore` | `number` | Unix timestamp override for absolute scheduled start |
| `label` | `string` | Label for dashboard/log filtering |
| `disableTelemetry` | `boolean` | Disable telemetry collection for this run |
| `flowControl` | `object` | Rate limiting and concurrency controls |

### flowControl

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Logical grouping key for shared limits |
| `rate` | `number` | Maximum requests per `period` |
| `parallelism` | `number` | Maximum concurrent executions |
| `period` | `string \| number` | Time window for rate enforcement; default: `"1s"` |

## Notes

- Trigger from server-side code only; do not expose `QSTASH_TOKEN` to the client
- `retryDelay` expressions use `retried` (0-indexed attempt count), e.g., `"1000 * (1 + retried)"`
- Batch trigger returns an array of `{ workflowRunId }` objects

## Related

- [client](./client.md)
- [flow-control](./flow-control.md)
- [retries](./retries.md)
