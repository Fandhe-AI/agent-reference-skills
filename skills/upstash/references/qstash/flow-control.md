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

**Management API** (`client.flowControl` namespace; Python: `client.flow_control`; February 2026)

REST base `https://qstash.upstash.io`, `Authorization: Bearer <token>`:

| Endpoint | Description |
| --- | --- |
| `GET /v2/flowControl/{key}` | Get the state of a key |
| `POST /v2/flowControl/{key}/pause` | Hold messages in the waitlist |
| `POST /v2/flowControl/{key}/resume` | Resume delivery |
| `POST /v2/flowControl/{key}/pin?parallelism=3&rate=20&period=120` | Pin a fixed configuration |
| `POST /v2/flowControl/{key}/unpin?parallelism=true&rate=true` | Unpin parallelism and/or rate |
| `POST /v2/flowControl/{key}/resetRate` | End the current rate period |
| `GET /v2/globalParallelism` | Global parallelism usage |

SDK usage:

```typescript
import { Client } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });

const info = await client.flowControl.get("USER_GIVEN_KEY");
// { flowControlKey, waitListSize, parallelismMax, parallelismCount, rateMax, rateCount,
//   ratePeriod, ratePeriodStart, isPaused, isPinnedParallelism, isPinnedRate }

await client.flowControl.pause("USER_GIVEN_KEY");   // hold messages in the waitlist
await client.flowControl.resume("USER_GIVEN_KEY");

// Pin a fixed configuration (incoming messages cannot override it); period in seconds
await client.flowControl.pin("USER_GIVEN_KEY", { parallelism: 3, rate: 20, period: 120 });
await client.flowControl.unpin("USER_GIVEN_KEY", { parallelism: true, rate: true });

await client.flowControl.resetRate("USER_GIVEN_KEY"); // ends the current rate period

const global = await client.flowControl.getGlobalParallelism();
// { parallelismMax: 500, parallelismCount: 42 }
```

```python
from qstash import QStash

client = QStash("<QSTASH-TOKEN>")

info = client.flow_control.get("USER_GIVEN_KEY")
client.flow_control.pause("USER_GIVEN_KEY")
client.flow_control.resume("USER_GIVEN_KEY")
client.flow_control.pin("USER_GIVEN_KEY", {"parallelism": 3, "rate": 20, "period": 120})
client.flow_control.unpin("USER_GIVEN_KEY", {"parallelism": True, "rate": True})
client.flow_control.reset_rate("USER_GIVEN_KEY")
info = client.flow_control.get_global_parallelism()
```

Response fields of `get`:

| Field | Description |
| --- | --- |
| `flowControlKey` | The flow control key name (Python: `key`) |
| `waitListSize` | Messages currently waiting in the queue |
| `parallelismMax` | Configured maximum concurrent messages (if set) |
| `parallelismCount` | Messages currently running in parallel |
| `rateMax` | Configured maximum messages per rate period (if set) |
| `rateCount` | Messages dispatched in the current rate period |
| `ratePeriod` | Rate period length in seconds |
| `ratePeriodStart` | Unix timestamp when the current rate period started |
| `isPaused` | Whether delivery is paused for this key |
| `isPinnedParallelism` | Whether the parallelism configuration is pinned |
| `isPinnedRate` | Whether the rate configuration is pinned |

## Notes

- Messages that exceed rate or parallelism limits are queued automatically and delivered once constraints clear
- Flow control state is tracked server-side per `key`
- You can pin or unpin only parallelism, only rate, or both; when pinning rate, `period` (seconds) is optional
- Changelog (February 2026) also lists `list()` and `reset(key)` on `client.flowControl`, `GET /v2/flowControl` with an optional `search` query parameter filtering keys by name, and `POST /v2/flowControl/:flowControlKey/reset` resetting parallelism and rate counters; the Flow Control page itself shows only the methods above (`resetRate`), so the exact `list` / `reset` signatures are not confirmed here
- `GET /v2/globalParallelism` now returns `{ parallelismMax, parallelismCount }` instead of the old `{ waitListSize }` shape
- The console `FlowControl` tab shows wait list size and can pin, unpin, and reset rate
- `parallelism` in `flowControl` applies across all messages sharing the same `key`; queue-level `parallelism` (in `queue.upsert()`) applies only within that queue
- Source: https://upstash.com/docs/qstash/features/flowcontrol , https://upstash.com/docs/qstash/sdks/ts/examples/flow-control , https://upstash.com/docs/qstash/sdks/py/examples/flow-control (fetched 2026-10-17; no version pin on the site).

## Related

- [publish.md](./publish.md)
- [queues.md](./queues.md)
