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

- Flow control is applied at the workflow-run level; all steps in the run inherit the same limits
- Two exceptions that apply their own limits independently:
  - `context.call()` — throttles external HTTP requests
  - `context.invoke()` — allows invoked workflows their own flow control config
- Changing rate/parallelism on redeploy affects only new steps; existing queued steps retain original configuration
- During limit transitions, the system permits the highest configured limits until older steps complete
- For per-step control, extract the step into a separate workflow with dedicated limits

## Related

- [client.trigger](./client-trigger.md)
- [context.call](./context-call.md)
- [context.invoke](./context-invoke.md)
