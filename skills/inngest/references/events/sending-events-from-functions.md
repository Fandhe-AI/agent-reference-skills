# Sending Events from Functions

Broadcast events from within a running Inngest function to trigger downstream functions, implement fan-out, or decouple pipeline stages.

## Signature / Usage

```ts
export const weeklyEmailJob = inngest.createFunction(
  { id: "weekly-email-job" },
  { cron: "0 9 * * MON" },
  async ({ step }) => {
    const users = await step.run("fetch-users", () => db.users.findAll());

    // Fan-out: send one event per user
    const events = users.map((user) => ({
      name: "app/weekly-email-activity.send",
      data: { userId: user.id, email: user.email },
    }));

    await step.sendEvent("fan-out-weekly-emails", events);
  },
);

// Receiving function — runs once per user, in parallel
export const sendWeeklyEmail = inngest.createFunction(
  { id: "send-weekly-email" },
  { event: "app/weekly-email-activity.send" },
  async ({ event }) => { /* send email to event.data.email */ },
);
```

## Notes

- Use `step.sendEvent()` inside functions — not `inngest.send()`. The step-based method records tracing context that links sent events to the current function run.
- `step.sendEvent()` must be `await`ed for the function to sleep correctly between steps.
- Maximum 5,000 events per `step.sendEvent()` call.
- Parallel functions (triggered via fan-out) have independent retry logic; a failure in one does not block others.
- Parallel functions are not limited to 1,000 (unlike steps), making this pattern preferable for large-scale fan-out.
- Configure concurrency limits on receiving functions to avoid overwhelming downstream services.

## Related

- [step.sendEvent](./step-send-event.md)
- [Fan-out](./fan-out.md)
- [Sending Events](./sending-events.md)
