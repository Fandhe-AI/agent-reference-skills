# How Workflow Works

Upstash Workflow is an orchestration layer for durable, scalable, cost-efficient multi-step workflows, built on top of Upstash QStash.

## Signature / Usage

```typescript
// Each context.run is one step; each step executes in its own HTTP call to your endpoint.
// Completed step results are stored in durable state and skipped on the next call.
export const { POST } = serve<string>(async (context) => {
  const result = await context.run("step-1", () => ({ success: true }))

  await context.run("step-2", () => {
    console.log("Step 1 status is:", result.success)
  })
})
```

## Execution model

- Your logic is split into multiple steps inside a workflow endpoint, each managed and retried by the orchestration engine
- Each step is executed in its own HTTP call to your application
- After a step finishes, its result is stored in durable state inside Upstash Workflow
- On the next execution, Workflow skips completed steps and resumes where it left off by restoring previous step results
- If a step fails, it is retried automatically based on the retry configuration

## Problems it addresses

| Problem | Description |
|---------|-------------|
| Timeouts | A single function runs inside one execution window; slow APIs can exceed serverless limits (often 10-60 seconds) |
| Temporary issues | Slow or unreliable external services can fail the entire request |
| Failures | If a step fails the whole request fails; restart everything or write custom retry logic |
| Rate limits | Bulk external calls need concurrency control, hard to implement manually |
| Complexity | Custom queues, schedulers, or state trackers add infrastructure overhead |

## Extended features

| Feature | Description |
|---------|-------------|
| Parallel Steps | Multiple steps (e.g. inside `Promise.all()`) run concurrently as separate HTTP executions |
| Delays / Sleep | `context.sleep` and `context.sleepUntil` pause for hours, days, or months; no compute is held while waiting |
| External Event Handling | `context.waitForEvent` pauses until notified externally (e.g. webhook or user action); state is persisted until the event arrives |
| External Calls | `context.call` has Upstash perform slow or unreliable HTTP calls; the workflow resumes with the response |

## Notes

- Because the endpoint is called multiple times per run, code outside `context.run` runs repeatedly; see best-practices
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/basics/how

## Related

- [best-practices](./best-practices.md)
- [overview](./overview.md)
- [context-run](./context-run.md)
- [context-sleep](./context-sleep.md)
- [context-wait-for-event](./context-wait-for-event.md)
- [context-call](./context-call.md)
- [parallel-steps](./parallel-steps.md)
