# Conditional Steps

Branch step execution using standard JavaScript control flow. Steps that are never reached are never executed or memoized.

## Signature / Usage

```ts
// Branch on step output
const user = await step.run("fetch-user", () => db.users.findOne(event.data.userId));

if (user.plan === "premium") {
  await step.run("send-premium-email", () => sendPremiumEmail(user.email));
} else {
  await step.run("send-standard-email", () => sendStandardEmail(user.email));
}
```

Wait for different events depending on prior state:

```ts
const payment = await step.run("create-payment", () => stripe.createPaymentIntent(event.data));

if (payment.requiresAction) {
  const confirmed = await step.waitForEvent("await-confirmation", {
    event: "app/payment.confirmed",
    timeout: "1 day",
    match: "data.paymentId",
  });

  if (!confirmed) {
    await step.run("cancel-order", () => cancelOrder(event.data.orderId));
    return;
  }
}

await step.run("fulfill-order", () => fulfillOrder(event.data.orderId));
```

## Notes

- Use regular `if`/`else`, `switch`, ternaries, and early `return` — no special Inngest API needed
- Step IDs must be **deterministic** for the same logical branch; using a different ID on re-entry (e.g., based on runtime data) causes the SDK to treat it as a new step
- Code outside `step.run()` runs on every re-entry; keep it side-effect-free and deterministic (no random values, no mutable globals)
- Combining conditionals with `step.waitForEvent()` enables human-in-the-loop and approval workflows
- Loops work naturally with steps: use a dynamic ID per iteration (e.g., `fetch-page-${cursor}`) to prevent ID collisions

## Related

- [step.run](./step-run.md)
- [step.waitForEvent](./step-wait-for-event.md)
- [Parallel Steps](./parallel-steps.md)
