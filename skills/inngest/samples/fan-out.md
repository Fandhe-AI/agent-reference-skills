# Fan-out Pattern

Trigger multiple independent functions from a single event, each running in parallel.

```typescript
import { Inngest } from "inngest";

const inngest = new Inngest({ id: "my-app" });

// One event triggers all functions listening to it — no coordination needed

export const sendWelcomeEmail = inngest.createFunction(
  { id: "send-welcome-email" },
  { event: "app/user.signup" },
  async ({ event, step }) => {
    await step.run("send-email", async () => {
      await sendEmail({ to: event.data.user.email, template: "welcome" });
    });
  }
);

export const startStripeTrial = inngest.createFunction(
  { id: "start-stripe-trial" },
  { event: "app/user.signup" },
  async ({ event, step }) => {
    const customer = await step.run("create-stripe-customer", async () => {
      return stripe.customers.create({ email: event.data.user.email });
    });

    await step.run("create-trial-subscription", async () => {
      return stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: "price_1MowQULkdIwHu7ixraBm864M" }],
        trial_period_days: 14,
      });
    });
  }
);

// Trigger both functions simultaneously with a single send
await inngest.send({
  name: "app/user.signup",
  data: { user: { id: "usr_123", email: "user@example.com" } },
});
```

## Notes

- Multiple functions with the same event trigger run independently and in parallel — no explicit orchestration required
- Each function has its own retry budget; a failure in one does not affect others
- For dynamic fan-out (unknown number of tasks), use `step.sendEvent()` inside a function to dispatch per-item events
- This pattern keeps concerns separated — add new handlers without modifying existing code
