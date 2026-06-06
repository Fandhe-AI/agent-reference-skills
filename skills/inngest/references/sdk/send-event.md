# inngest.send()

Sends one or more events to Inngest to trigger registered functions.

## Signature / Usage

```ts
const { ids } = await inngest.send({
  name: "app/account.created",
  data: { accountId: "645e9f6794e10937e9bdc201" },
  user: { external_id: "645ea000129f1c40109ca7ad" },
});
```

## Options / Props

### EventPayload

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | **Required.** Event identifier using lowercase dot notation with slash prefix (e.g. `app/user.created`). |
| `data` | `object` | JSON-serializable payload associated with the event. |
| `user` | `object` | User identification data; encrypted at rest. Contains `external_id` and/or `email`. |
| `id` | `string` | Unique ID for idempotent event delivery; duplicate IDs skip function invocation. |
| `ts` | `number` | Unix timestamp in milliseconds. Future timestamps schedule deferred execution. |
| `v` | `string` | Payload version string for schema evolution. |

### Return value

| Name | Type | Description |
|------|------|-------------|
| `ids` | `string[]` | Array of generated Event IDs for tracking in the Inngest dashboard. |

## Notes

- Pass an array of event payloads to send multiple events in a single call.
- `user` data is fully encrypted at rest; it is empty when a function run is replayed.
- A future `ts` value defers execution until that time.
- Use the `eventType()` helper with `.create()` to build fully typed event payloads.

## Related

- [Inngest Client](./inngest-client.md)
- [TypeScript Types](./typescript-types.md)
- [eventType()](./event-type.md)
