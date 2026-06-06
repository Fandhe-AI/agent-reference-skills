# Flow Control

Rate limiting and parallelism control for message delivery. Group messages under a named key and configure how many can be delivered per time window and how many can be active concurrently.

## Signature / Usage

```ts
await client.publishJSON({
  url: "https://example.com/api/handler",
  body: { hello: "world" },
  flowControl: {
    key: "per-user-rate-limit",
    rate: 100,
    period: "1m",
    parallelism: 5,
  },
});
```

## Options / Props

**`flowControl` object in `publishJSON` / `enqueueJSON`:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | — | User-defined identifier grouping messages for shared limits |
| `rate` | `number` | — | Maximum number of deliveries allowed within `period` |
| `period` | `string` | `"1s"` | Time window for rate limit (e.g. `"1s"`, `"1m"`, `"1h"`) |
| `parallelism` | `number` | — | Maximum number of concurrently active (in-flight) delivery requests |

## Notes

- Messages that exceed rate or parallelism limits are queued automatically and delivered once constraints clear
- Flow control state is tracked server-side per `key`
- The Management API provides endpoints to: get key metrics, pause/resume delivery for a key, pin configurations, reset rate period counters, and monitor global parallelism
- `parallelism` in `flowControl` applies across all messages sharing the same `key`; queue-level `parallelism` (in `queue.upsert()`) applies only within that queue

## Related

- [publish.md](./publish.md)
- [queues.md](./queues.md)
