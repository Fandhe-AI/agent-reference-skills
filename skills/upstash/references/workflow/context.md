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
| `failureUrl` | `string` | Callback URL for workflow failures; same as `url` when a failure function is defined |
| `env` | `object` | Available environment variables |
| `qstashClient` | `Client` | QStash client instance backing this workflow |
| `labels` | `string[]` | Labels attached to the current run, if set in `client.trigger`; defaults to an empty array |
| `flowControl` | `object \| undefined` | Flow control configuration QStash applied to the current request (`key`, `parallelism`, `rate`, `period`); reflects step-level flow control when the step sets its own |
| `retries` | `number \| undefined` | Retry limit QStash applied to the current request |
| `retryDelay` | `string \| undefined` | Retry delay expression QStash applied to the current request |
| `label` | `string \| undefined` | Deprecated (June 2026); use `labels`. With multiple labels it returns only the first one |

### Available Methods

| Method | Description |
|--------|-------------|
| `context.run()` | Execute a step with custom business logic |
| `context.sleep()` | Pause execution for a duration |
| `context.sleepUntil()` | Pause until an absolute timestamp |
| `context.call()` | Make an HTTP request as a step |
| `context.invoke()` | Invoke another workflow and await its completion |
| `context.waitForEvent()` | Pause until an external event is received |
| `context.createWebhook()` | Create a webhook for the run |
| `context.waitForWebhook()` | Pause until a created webhook is called |
| `context.notify()` | Notify a waiting workflow with event data |
| `context.cancel()` | Cancel this workflow run (no DLQ, no failure handler) |
| `context.api()` | Call provider APIs (e.g., OpenAI) as a step |

## Notes

- All methods return Promises and must be awaited
- `context.cancel()` marks the run as "canceled" — the failure handler is not triggered and the run is not sent to DLQ
- `context.run()` accepts per-step `flowControl` / `retries` / `retryDelay` options since `@upstash/workflow` 1.5.0
- `workflowRunCreatedAt` (Unix ms) appears in the logs REST API response (see [api-reference-logs-notify](./api-reference-logs-notify.md)); the official context page does not list it as a `context` property
- Source: https://upstash.com/docs/workflow/steps (fetched 2026-11-14; no version pin on the site)

## Related

- [context.run](./context-run.md)
- [context.sleep](./context-sleep.md)
- [context.call](./context-call.md)
- [context.invoke](./context-invoke.md)
- [context.waitForEvent](./context-wait-for-event.md)
- [context.notify](./context-notify.md)
- [context.createWebhook / waitForWebhook](./context-webhook.md)
- [context.api](./context-api.md)
- [context.cancel](./context-cancel.md)
