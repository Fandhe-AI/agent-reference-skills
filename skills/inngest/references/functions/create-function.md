# createFunction

Defines an Inngest function by specifying configuration (id, triggers, flow control) and a handler. Returns an `InngestFunction` to be exported and served.

## Signature / Usage

```ts
inngest.createFunction(configuration, handler): InngestFunction

// Minimal example
export default inngest.createFunction(
  {
    id: "send-welcome-email",
    triggers: { event: "app/user.created" },
  },
  async ({ event, step }) => {
    await step.run("send-email", async () => {
      await sendEmail(event.data.email);
    });
  }
);
```

## Options / Props

### Configuration object

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique, stable identifier. Must not change between deploys. |
| `name` | `string` | No | Friendly display name shown in the UI instead of `id`. |
| `triggers` | `Trigger \| Trigger[]` | Yes | One or more event or cron triggers. Up to 10 triggers supported. |
| `retries` | `number` | No | Retry attempts (0–20). Default: `4`. |
| `concurrency` | `number \| object \| [object, object]` | No | Limit concurrent executing steps. See [concurrency](../flow-control/concurrency.md). |
| `throttle` | `object` | No | Rate-limit new run initiations. See [throttling](../flow-control/throttling.md). |
| `rateLimit` | `object` | No | Hard cap on executions per period; excess events are dropped. See [rate-limiting](../flow-control/rate-limiting.md). |
| `debounce` | `object` | No | Delay execution until quiet period elapses. See [debounce](../flow-control/debounce.md). |
| `idempotency` | `string` | No | CEL expression; prevents duplicate triggers within 24 hours. |
| `priority` | `object` | No | CEL expression returning −600 to 600 to order runs within the same function. |
| `batchEvents` | `object` | No | Aggregate multiple events into a single invocation. |
| `cancelOn` | `array` | No | Stop running functions when specific events arrive. |
| `timeouts` | `object` | No | Auto-cancel runs that exceed start or execution time limits. |
| `onFailure` | `function` | No | Handler invoked after all retries are exhausted. |

### Handler parameters

| Name | Description |
|------|-------------|
| `event` | Triggering event payload. |
| `events` | Array of event payloads when `batchEvents` is configured. |
| `step` | Step utilities: `run`, `sleep`, `sleepUntil`, `invoke`, `waitForEvent`, `sendEvent`. |
| `runId` | Unique identifier for this function run. |
| `logger` | Structured logger with `info`, `warn`, `error`, `debug`. |
| `attempt` | Zero-indexed retry counter. |

## Notes

- `id` is the stable identity for versioning and memoization — changing it loses step memoization state for in-progress runs.
- `triggers` accepts a single object or array; overlapping cron schedules are automatically deduplicated.
- `batchEvents` is incompatible with `idempotency`, `rateLimit`, `cancelOn`, and `priority`.
- Maximum of 2 `concurrency` constraints per function.

## Related

- [triggers](./triggers.md)
- [retries](./retries.md)
- [concurrency](../flow-control/concurrency.md)
- [throttling](../flow-control/throttling.md)
- [cancel-on](./cancel-on.md)
- [timeouts](./timeouts.md)
- [on-failure](./on-failure.md)
- [batch-events](./batch-events.md)
- [priority](./priority.md)
- [idempotency](./idempotency.md)
- [versioning](./versioning.md)
- [durable-execution](./durable-execution.md)
