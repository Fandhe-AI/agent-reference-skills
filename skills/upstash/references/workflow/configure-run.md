# Configure a Run

Retries, retry delay and flow control are configured when a workflow run is started with `client.trigger()`; a single `context.run` step can override them.

## Signature / Usage

```typescript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" })

const { workflowRunId } = await client.trigger({
    url: `http://localhost:3000/api/workflow`,
    retries: 3,
    retryDelay: "(1 + retried) * 1000",
    flowControl: {
        key: "limit-ads",
        rate: 1,
        parallelism: 10
    }
});
```

## Options / Props

| Name | Description |
|------|-------------|
| `retries` | Number of retry attempts when a step fails |
| `retryDelay` | Delay strategy between retries (math expression using `retried`) |
| `flowControl` | `rate`, `period`, `parallelism` and a logical grouping `key` shared with other runs |

## Notes

- The run configuration does **not** apply to `context.call()` and `context.invoke()` steps; they accept their own options and fall back to their defaults if none are given
- A single `context.run` step can override the run's flow control and retry configuration by passing `flowControl`, `retries` or `retryDelay` as its third argument (`@upstash/workflow` 1.5.0+)
- Source: https://upstash.com/docs/workflow/howto/configure (fetched 2026-11-14; no version pin on the site)

## Related

- [client-trigger](./client-trigger.md)
- [flow-control](./flow-control.md)
- [retries](./retries.md)
- [context-run](./context-run.md)
