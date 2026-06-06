# Step Workflow

Compose a multi-step workflow where each step is independently retried and data flows between steps.

```typescript
import { Inngest } from "inngest";

const inngest = new Inngest({ id: "my-app" });

export const processOrder = inngest.createFunction(
  { id: "process-order" },
  { event: "order/created" },
  async ({ event, step }) => {
    // Step 1: Validate — result is memoized on retry
    const validation = await step.run("validate-order", async () => {
      return validateOrder(event.data);
    });

    // Step 2: Charge — uses output from step 1
    const payment = await step.run("process-payment", async () => {
      return processPayment({
        orderId: validation.id,
        amount: validation.total,
      });
    });

    // Step 3: Wait before fulfillment
    await step.sleep("delay-fulfillment", "1h");

    // Step 4: Ship — uses outputs from steps 1 & 2
    const fulfillment = await step.run("fulfill-order", async () => {
      return shipOrder({
        orderId: validation.id,
        paymentId: payment.transactionId,
      });
    });

    return { validation, payment, fulfillment };
  }
);
```

## Notes

- Each `step.run()` result is persisted; on retry Inngest replays the function and injects stored results, skipping completed steps
- `step.sleep("id", "1h")` pauses execution without consuming compute — accepts strings (`"30m"`, `"2d"`), milliseconds, or `Temporal.Duration`
- Steps can be run in parallel using `Promise.all([step.run(...), step.run(...)])`
- `step.sleepUntil("id", isoDateString)` pauses until an absolute timestamp
