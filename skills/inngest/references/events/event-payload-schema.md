# Event Payload Schema

The structure of an Inngest event object sent via `inngest.send()` or `step.sendEvent()`.

## Signature / Usage

```ts
await inngest.send({
  id: "cart-checkout-completed-ed12c8bde",   // optional: deduplication key
  name: "storefront/cart.checkout.completed", // required
  data: { cartId: "ed12c8bde" },              // required
  user: { external_id: "6463da8211cdbbcb191dd7da" }, // optional
  ts: 1684274328198,                           // optional: Unix ms
  v: "2024-05-15.1",                          // optional: payload version
});
```

## Options / Props

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Event type identifier. Recommended format: `prefix/entity.action` (e.g., `app/user.created`). |
| `data` | `object` | Yes | JSON-serializable event payload. Supports nested objects and arrays. |
| `id` | `string` | No | Unique ID for idempotent triggering. Duplicate IDs within 24 hours are ignored. |
| `ts` | `number` | No | Timestamp in Unix epoch milliseconds. Defaults to current time. Future timestamps delay execution. |
| `user` | `object` | No | User context object. Encrypted at rest. Fields: `external_id` (string), `email` (string). Empty during function replay. |
| `v` | `string` | No | Schema version string for the payload (e.g., `"2023-04-14.1"`). |

## Notes

- `name` and `data` are the only required fields.
- Sensitive user data should go in the `user` object (encrypted at rest) or be encrypted within `data` using middleware.
- The `id` field enables producer-side idempotency — combine the event type with a unique resource identifier to avoid cross-type collisions (e.g., `"cart-checkout-ed12c8bde"` rather than just `"ed12c8bde"`).
- For the complete TypeScript type, use `GetEvents<typeof inngest>` to extract the inferred event map from your client.

## Related

- [Sending Events](./sending-events.md)
- [Event Naming Conventions](./event-naming-conventions.md)
- [TypeScript Event Types](./typescript-event-types.md)
