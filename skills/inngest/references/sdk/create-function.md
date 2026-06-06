# inngest.createFunction()

Defines a background function that is triggered by events or a cron schedule.

## Signature / Usage

```ts
const myFunction = inngest.createFunction(
  { id: "handle-signup", triggers: [{ event: "user/account.created" }] },
  async ({ event, step }) => {
    await step.run("send-welcome-email", async () => {
      await sendEmail(event.data.email);
    });
  }
);
```

## Options / Props

### Configuration object

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | **Required.** Stable unique identifier for the function. Never change after deploy. |
| `triggers` | `Trigger[]` | **Required.** One or more event or cron triggers. |
| `name` | `string` | Human-readable display name shown in the Inngest dashboard. |
| `concurrency` | `number \| ConcurrencyOption` | Limit concurrently running instances. |
| `throttle` | `ThrottleOption` | Rate-limit new runs started within a time period. |
| `rateLimit` | `RateLimitOption` | Maximum runs allowed in a given time period (CEL expression key). |
| `debounce` | `DebounceOption` | Delay execution; coalesce repeated events into one run. |
| `idempotency` | `string` | CEL expression; prevents duplicate triggers within 24 hours. |
| `retries` | `number` | Retry attempts on failure, 0–20 (default: `4`). |
| `cancelOn` | `CancelOn[]` | Events that cancel a running or paused function. |
| `timeouts` | `TimeoutsOption` | Start and total execution time limits. |
| `batchEvents` | `BatchEventsOption` | Process multiple events together. |
| `priority` | `PriorityOption` | Integer expression controlling execution order. |

### Handler arguments

| Name | Type | Description |
|------|------|-------------|
| `event` | `EventPayload` | The triggering event payload. |
| `events` | `EventPayload[]` | Array of events when `batchEvents` is configured. |
| `step` | `StepTools` | Step tooling: `run`, `sleep`, `sleepUntil`, `invoke`, `waitForEvent`, `sendEvent`. |
| `runId` | `string` | Unique ID for this execution run. |
| `logger` | `Logger` | Console-like structured logger. |
| `attempt` | `number` | Zero-indexed retry attempt counter. |

## Notes

- The `id` field is used to match function executions to their definitions; changing it creates a new function.
- Triggers moved to the configuration object in v4 (previously second argument).
- `step.run()` makes code retriable; wrap all side effects in steps.
- Default retries is 4; set `retries: 0` to disable retries entirely.

## Related

- [Inngest Client](./inngest-client.md)
- [serve()](./serve.md)
- [inngest.send()](./send-event.md)
