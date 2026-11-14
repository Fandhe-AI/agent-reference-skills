# Flow Control

Limits the rate and concurrency of workflow step execution. When thresholds are exceeded, steps are queued rather than rejected.

## Signature / Usage

```typescript
// Set flow control at trigger time
const { workflowRunId } = await client.trigger({
  url: "https://your-app.com/api/workflow",
  flowControl: {
    key: "user-signup",
    parallelism: 1,
    rate: 10,
    period: "1m",
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Logical grouping identifier; steps sharing the same key share limits |
| `rate` | `number` | Maximum number of steps that may start within `period` |
| `period` | `string \| number` | Time window for rate enforcement (e.g., `"1m"`, `"1s"`); default: `"1s"` |
| `parallelism` | `number` | Maximum number of steps allowed to run concurrently |

## Notes

- Flow control set at trigger time is applied at the workflow-run level; all steps in the run inherit the same limits unless a step overrides it
- Two exceptions that apply their own limits independently:
  - `context.call()` — throttles external HTTP requests
  - `context.invoke()` — allows invoked workflows their own flow control config
- Changing rate/parallelism on redeploy affects only new steps; existing queued steps retain original configuration
- During limit transitions, the system permits the highest configured limits until older steps complete
- For per-step control pass `flowControl` as the third argument of `context.run()` (1.5.0+, see below); before 1.5.0 the workaround was a separate workflow with dedicated limits

### Step-level Flow Control

Since `@upstash/workflow` 1.5.0 a single `context.run` step can carry its own flow control configuration (third argument):

```typescript
export const { POST } = serve(async (context) => {
  await context.run("prepare", () => { ... });

  await context.run(
    "charge customer",
    () => chargeCustomer("customer-id"),
    {
      flowControl: { key: "payment-provider", parallelism: 3 },
    }
  );

  await context.run("notify", () => { ... });
});
```

- Only the `charge customer` step is bound by the `payment-provider` key; other steps keep the run's configuration. The key is shared, so at most 3 such steps run at once across all runs using it
- The step-level configuration replaces the run's flow control for that step as a whole; the step does not also count against the run's key
- When the step comes right after a `context.run`, `context.sleep` or `context.sleepUntil` step, its configuration rides on the delivering request at no extra cost; otherwise (first step of a run, after `context.call`) the SDK publishes an additional hidden request not shown in the workflow logs. Steps in a parallel group never need the extra request
- Inside a step, `context.flowControl` returns the configuration applied to the current delivery

### Monitor and Manage

- The console `FlowControl` tab shows the wait list size per key and can pin, unpin and reset rate; the same data is available from the REST API (see [api-reference-flow-control](./api-reference-flow-control.md))
- Pausing / resuming delivery, pinning / unpinning configurations and resetting rate counts are done through the QStash client (QStash Flow Control Management API)

### Rate, Period and Parallelism

- `rate` with `period` caps how many steps may **start** per window (e.g. `rate: 2`, `period: 1 minute`: a third step in the same minute is moved to the next window rather than rejected); execution may outlast the period
- `parallelism` is token based: when all tokens are in use, steps wait in a waitlist; token handoff does not guarantee strict ordering
- The first configuration example in the official rate/period page uses `period: 100` (number)
- `context.call()` takes its own `flowControl`, whose `rate` is documented as the maximum number of requests per second

- Source: https://upstash.com/docs/workflow/features/flow-control (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/features/flow-control/rate-period (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/features/flow-control/parallelism (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/features/flow-control/monitor (fetched 2026-11-14; no version pin on the site)

## Related

- [client.trigger](./client-trigger.md)
- [context.call](./context-call.md)
- [context.invoke](./context-invoke.md)
- [context.run](./context-run.md)
