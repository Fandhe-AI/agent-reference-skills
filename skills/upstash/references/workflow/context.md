# Workflow Context

The `context` object passed to every workflow route function. Provides metadata about the current run and all step execution APIs.

## Signature / Usage

```typescript
serve(async (context) => {
  const payload = context.requestPayload  // typed by serve<TPayload>
  const runId   = context.workflowRunId

  await context.run("step", async () => { /* ... */ })
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `requestPayload` | `TPayload` | Data sent via `client.trigger({ body })` |
| `headers` | `Headers` | Request headers of the incoming workflow call |
| `workflowRunId` | `string` | Unique identifier for this run (`wfr_...`) |
| `url` | `string` | Public URL of this workflow endpoint |
| `failureUrl` | `string` | Callback URL for workflow failures |
| `env` | `object` | Available environment variables |
| `qstashClient` | `Client` | QStash client instance backing this workflow |
| `label` | `string \| undefined` | Optional run label set at trigger time |

## Available Methods

| Method | Description |
|--------|-------------|
| `context.run()` | Execute a step with custom business logic |
| `context.sleep()` | Pause execution for a duration |
| `context.sleepUntil()` | Pause until an absolute timestamp |
| `context.call()` | Make an HTTP request as a step |
| `context.invoke()` | Invoke another workflow and await its completion |
| `context.waitForEvent()` | Pause until an external event is received |
| `context.notify()` | Notify a waiting workflow with event data |
| `context.cancel()` | Cancel this workflow run (no DLQ, no failure handler) |
| `context.api()` | Call provider APIs (e.g., OpenAI) as a step |

## Notes

- All methods return Promises and must be awaited
- `context.cancel()` marks the run as "canceled" — the failure handler is not triggered and the run is not sent to DLQ

## Related

- [context.run](./context-run.md)
- [context.sleep](./context-sleep.md)
- [context.call](./context-call.md)
- [context.invoke](./context-invoke.md)
- [context.waitForEvent](./context-wait-for-event.md)
- [context.notify](./context-notify.md)
