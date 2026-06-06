# Idempotency

Guarantees that an operation produces the same result regardless of how many times it is executed. Inngest supports idempotency at both the event level (producer) and the function level (consumer).

## Signature / Usage

**Event-level idempotency** — set a unique `id` when sending an event:

```ts
await inngest.send({
  id: `checkout-completed-${cartId}`,
  name: "cart/checkout.completed",
  data: { email: "taylor@example.com", cartId },
});
```

**Function-level idempotency** — use the `idempotency` option in `createFunction`:

```ts
export const sendEmail = inngest.createFunction(
  {
    id: "send-checkout-email",
    idempotency: "event.data.cartId",
  },
  { event: "cart/checkout.completed" },
  async ({ event, step }) => { /* handler */ }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `idempotency` | `string` (CEL expression) | Evaluated against event payload. Each unique result allows one execution per 24-hour window. Equivalent to `rateLimit` with `limit: 1` and `period: "24h"`. |

For event-level idempotency, set `id` on the event object (a plain string serving as the idempotency key).

## Notes

- The deduplication window is 24 hours for both event-level and function-level idempotency.
- Duplicate events are stored in event history but do not trigger additional function runs.
- Event-level idempotency is ignored by: debouncing, event batching, and function pausing.
- For fan-out scenarios, apply `idempotency` only to functions that require deduplication; other functions will process all events normally.
- Incompatible with event batching.

## Related

- [Rate Limiting](./rate-limiting.md)
- [Debounce](./debounce.md)
- [Batching](./batching.md)
