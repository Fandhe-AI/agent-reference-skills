# Limits

Platform and host limits to check before deploying a workflow. Plan limits apply to Inngest Cloud; your hosting provider can impose separate request and runtime limits.

## Signature / Usage

```ts
// Keep step output under 4 MiB: store large results elsewhere and return a reference.
const ref = await step.run("store-result", async () => {
  return await saveToStorage(bigPayload); // returns a small reference
});
```

## Options / Props

### Plan-based limits

| Measure | Free | Pro | Business | Enterprise |
|---------|------|-----|----------|------------|
| Executions included per month | 50,000 | 1 million | 10 million | Custom |
| Events ingested included per month | 500,000 | 5 million | 50 million | Custom |
| Scores included per month | 10,000 | 50,000 | 250,000 | Custom |
| Concurrent steps | 5 | 100 included | 500 | Custom |
| Maximum event size | 256 KiB | 3 MiB | 3 MiB | Custom |
| Queue depth | 100,000 | 1 million | 10 million | Custom |
| Event batch capacity | 5 events | 100 events | 500 events | Custom |
| Event batch timeout | 30 seconds | 5 minutes | 5 minutes | Custom |
| Active workspaces per account | 3 | 10 | 10 | 50 |
| Active apps per workspace | 5 | 10 | 10 | 250 |
| Active functions per app | 100 | 500 | 500 | 1,000 |
| Trace and log history | 24 hours | 7 days | 14 days | Up to 365 days |
| Maximum function run length, including sleeps | 30 days | 90 days | 366 days | Custom |

### Active branch deploys

| Free | Pro | Business | Enterprise |
|------|-----|----------|------------|
| 2 | 10 | 10 | Up to 250 |

### Platform limits (all plans)

| Limit | Value | Action |
|-------|-------|--------|
| Step sleep | Up to 1 year for `step.sleep()` / `step.sleepUntil()`, within the plan's maximum function run length | Keep total run length, including every sleep, within plan limit. |
| Step timeout | Up to 2 hours, subject to the host's shorter timeout | Check the host's timeout; split long work into steps. |
| Step return | 4 MiB returned by one step | Store large results outside step state and return a reference. |
| Function run state | 32 MiB across event data, step data, return data, and metadata | Keep large data outside run state. |
| Steps per function | 1,000 | Process items within a step or fan out to more runs. |
| Event name | 256 characters | Shorten the event `name`. |
| Events per send request | 5,000 in `inngest.send(events)` or `step.sendEvent(events)` | Send in multiple requests. |
| Event batch size | 10 MiB hard cap per configured batch | Batch starts at this size even before count or timeout threshold. |

## Notes

- An execution is one function run or one step execution; a run with five steps uses six executions.
- Maximum function run length is total time from start to finish, including `step.sleep()`, `step.sleepUntil()`, and `step.waitForEvent()`.
- Only active resources count toward workspace, app, and function limits. Functions-per-workspace is the app limit multiplied by the function limit, not a separate limit.
- Concurrent steps bound active work; rate limiting and throttling settings control how a function handles incoming work and do not add plan capacity.
- Inngest's 2-hour step ceiling does not extend a shorter host timeout. Confirm current host numbers (request size, concurrency, memory, timeout) with your provider, and ensure your framework's body parser accepts the expected payload and run state.

## Related

- [timeouts](./timeouts.md)
- [schedules-and-delayed-starts](./schedules-and-delayed-starts.md)
- [batch-events](./batch-events.md)
