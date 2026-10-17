# Scheduling a One-off Function

Delay a function run to a specific future time by setting the event payload's `ts` field.

```typescript
const sendReminder = inngest.createFunction(
  { id: "send-reminder", triggers: { event: "notifications/reminder.scheduled" } },
  async ({ event, step }) => {
    const { user, message } = event.data;

    const { id } = await emailApi.send({
      to: user.email,
      subject: "Reminder for your upcoming event",
      body: message,
    });

    return { id }
  }
);

await inngest.send({
  name: "notifications/reminder.scheduled",
  data: {
    user: { email: "johnny.utah@fbi.gov" },
    message: "Don't forget to catch the wave at 3pm",
  },
  // Include the timestamp for 5 minutes in the future:
  ts: Date.now() + 5 * 60 * 1000,
});
```

## Notes

- `ts` is milliseconds since the Unix epoch
- A future `ts` only delays starting function runs; functions waiting for a matching event (`step.waitForEvent()`) resume immediately regardless of the timestamp
- For periodic work use a cron trigger; for mid-function delays use `step.sleepUntil()`
