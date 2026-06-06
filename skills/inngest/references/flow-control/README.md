# Flow Control

| Name | Description | Path |
|------|-------------|------|
| Concurrency | Limit the number of steps executing simultaneously; supports per-tenant virtual queues via `key` | [concurrency.md](./concurrency.md) |
| Throttling | Limit new function run starts over a time period; excess runs are queued (not dropped) | [throttling.md](./throttling.md) |
| Rate Limiting | Hard cap on function executions per period; excess events are skipped | [rate-limiting.md](./rate-limiting.md) |
| Debounce | Delay execution until a stream of rapid events stabilizes; runs with the last event | [debounce.md](./debounce.md) |
| Priority | Dynamically reorder queued runs based on event data expressions | [priority.md](./priority.md) |
| Batching | Process multiple events in a single function run via an `events` array | [batching.md](./batching.md) |
| Idempotency | Guarantee at-most-once execution per unique key within a 24-hour window | [idempotency.md](./idempotency.md) |
