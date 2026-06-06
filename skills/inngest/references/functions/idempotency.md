# idempotency

Prevents duplicate function executions within a 24-hour window by evaluating a CEL expression as a unique key per triggering event. Equivalent to `rateLimit` with `limit: 1` and `period: "24h"`.

## Signature / Usage

```ts
const sendCheckoutEmail = inngest.createFunction(
  {
    id: "send-checkout-email",
    triggers: { event: "cart/checkout.completed" },
    idempotency: "event.data.cartId",
  },
  async ({ event, step }) => {
    await step.run("send-email", async () => {
      await sendEmail(event.data.email);
    });
  }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `idempotency` | `string` | CEL expression evaluated against the event payload. Each unique resulting string allows only one function execution per 24-hour window. |

## Notes

- Duplicate events (same key within 24 hours) are stored but do not trigger additional function runs.
- For event-level idempotency (preventing duplicate events from being processed by *any* function), set a unique `id` field when calling `inngest.send()`.
- CEL expressions use `event` in scope with dot-notation access: `event.data.userId`, `event.data.userId + "-" + event.data.orderId`.
- `idempotency` is incompatible with `batchEvents`.
- In fan-out scenarios (one event triggers multiple functions), apply `idempotency` selectively only to functions where duplicate execution wastes resources.

## Related

- [create-function](./create-function.md)
- [batch-events](./batch-events.md)
- [rate-limiting](../flow-control/rate-limiting.md)
