# Flow Control Simulator

An interactive teaching tool in the Inngest docs that combines concurrency, throttling, rate limiting, batching, debounce, singleton, and priority and shows how runs are scheduled over time.

## Signature / Usage

The simulator applies controls in the documented flow control order:

```text
rate limiting, batching   -> before scheduling
debounce, singleton       -> when scheduling
throttling, step concurrency -> when steps execute
```

Pick a scenario, toggle controls, and press Play. The Code tab shows the TypeScript function configuration for the current settings; tenants map to `event.data.tenant_id`.

## Notes

- Event rows: a red X means rate limiting or singleton skipped the event; a hollow dot was replaced by a later debounced event; dashed outlines are events that have not arrived yet. Click a row to add an event, click an added event to remove it.
- Flow control band: scheduling rows hold debounce and batch timers, singleton locks, and rate-limit skips. The queue row shows runs waiting to start; dot color shows why (concurrency slot, throttle capacity, or blocked work from other keys).
- Lanes: a solid bar is an executing step; a dashed bar is a sleep, which holds no concurrency slot. A check marks a completed run, a red X a cancelled one.
- Every simulated function has a step concurrency limit, 5 by default.
- Limits of the model: it is a teaching model, not a benchmark. It runs in 50 ms ticks, does not model retries, failures, or network latency, and simplifies how the scheduler scans a function's queue.
- The page contains no code of its own; the block above restates the ordering from the page text.
- Source: https://www.inngest.com/docs-markdown/durable-execution/flow-control/simulator (fetched 2026-10).

## Related

- [Concurrency](./concurrency.md)
- [Throttling](./throttling.md)
- [Rate Limiting](./rate-limiting.md)
- [Batching](./batching.md)
- [Debounce](./debounce.md)
- [Singleton](./singleton.md)
- [Priority](./priority.md)
- [Multi-tenancy](./multi-tenancy.md)
