# Schedules and Delayed Starts

Schedule recurring or future work without keeping an app timer running. Inngest stores the schedule or delay and starts the function when due; it works on serverless hosts and survives restarts and redeploys.

## Signature / Usage

```ts
import { cron } from "inngest";

export const dailyReport = inngest.createFunction(
  {
    id: "daily-report",
    triggers: [cron("0 9 * * *")],
  },
  async ({ step }) => {
    return step.run("build-report", buildReport);
  }
);
```

Jitter spreads runs that share a schedule (must be between 1 second and 5 minutes):

```ts
inngest.createFunction(
  {
    id: "hourly-sync",
    triggers: [{ cron: "0 * * * *", jitter: "5m" }],
  },
  async ({ step }) => {
    // Fires at a random time within 5 minutes after each hour
  }
);
```

Start once in the future by setting the event `ts` (Unix milliseconds):

```ts
await inngest.send({
  name: "notifications/reminder.due",
  data: { reminderId: "rem_123" },
  ts: Date.now() + 5 * 60 * 1000,
});
```

Pause an existing run:

```ts
await step.sleep("wait-a-moment", "1 hour");
await step.sleepUntil("wait-for-timestamp", event.data.run_at);
```

## Options / Props

| Name | Description |
|------|-------------|
| `cron("<expr>")` / `{ cron, jitter }` | Five-field cron (minute, hour, day of month, month, day of week). Runs in UTC unless prefixed, e.g. `TZ=Europe/Paris 0 9 * * *`. |
| `jitter` | Random delay window after the scheduled time; 1 second to 5 minutes. |
| event `ts` | Future Unix millisecond timestamp; matching functions start at that time. |

## Notes

- Python: `inngest.TriggerCron(cron="0 9 * * *")` (with `jitter="5m"`). Go: `inngestgo.CronTrigger(...)` and `inngestgo.CronTriggerWithJitter("0 * * * *", 5*time.Minute)`; Go event timestamp field is `Timestamp` (`UnixMilli()`).
- Daylight saving: a cron may run zero, one, or two times on the day clocks change; Inngest follows the underlying cron library and does not correct for it. Avoid the transition hour or use `TZ=UTC`.
- For large scheduled jobs, have the cron function send one event per record (`step.sendEvent`) and handle each in an event-triggered function (fan-out pattern).
- On the free plan, Inngest pauses a function automatically after it fails 20 times in a row.
- A future `ts` does not delay a waiting run that matches the event; the delay happens before the run, not inside it.
- Choose: cron to repeat on a calendar schedule; future `ts` to start new work once; sleep step to continue the same run later. Sleeps outlast serverless timeouts, restarts, and redeploys.
- Check the Limits page for current delay allowances.

## Related

- [triggers](./triggers.md)
- [limits](./limits.md)
- [durable-execution](./durable-execution.md)
