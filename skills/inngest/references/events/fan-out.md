# Fan-out (One Event → Multiple Functions)

Trigger multiple independent functions in parallel by having them all listen on the same event name. No additional configuration required — each function with a matching trigger runs automatically.

## Signature / Usage

```ts
// 1. Send one event
await inngest.send({
  name: "app/user.created",
  data: { userId: "abc123", email: "user@example.com" },
});

// 2. Multiple functions independently consume the same event
export const sendWelcomeEmail = inngest.createFunction(
  { id: "send-welcome-email" },
  { event: "app/user.created" },
  async ({ event }) => { /* send email */ },
);

export const createCrmContact = inngest.createFunction(
  { id: "create-crm-contact" },
  { event: "app/user.created" },
  async ({ event }) => { /* create CRM entry */ },
);

export const grantTrialAccess = inngest.createFunction(
  { id: "grant-trial-access" },
  { event: "app/user.created" },
  async ({ event }) => { /* provision trial */ },
);
```

## Notes

- Functions run **in parallel** with no coordination overhead.
- A failure in one function does not affect the others.
- Each function has its own retry logic and can be replayed independently.
- Functions across different codebases and programming languages can consume the same event.
- For broadcasting many events from within a function, use `step.sendEvent()` with an array — up to 5,000 events per call.
- Consider setting concurrency limits on receiving functions when fanning out to a large number of events.

## Related

- [Sending Events](./sending-events.md)
- [step.sendEvent](./step-send-event.md)
- [Sending Events from Functions](./sending-events-from-functions.md)
- [Multiple Triggers and Wildcards](./multiple-triggers.md)
