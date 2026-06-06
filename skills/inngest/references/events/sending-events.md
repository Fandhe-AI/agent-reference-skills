# Sending Events (`inngest.send`)

Send one or more events to Inngest from your application backend. Triggers any functions listening on the matching event name.

## Signature / Usage

```ts
// Single event
await inngest.send({
  name: "app/post.created",
  data: { postId: "01H08SEAXBJFJNGTTZ5TAWB0BD" },
});

// Multiple events (batch)
await inngest.send([
  { name: "app/invoice.created", data: { invoiceId: "645e9e024befa68763f5b500" } },
  { name: "app/invoice.created", data: { invoiceId: "645e9e08f29fb563c972b1f7" } },
]);
```

**Returns:** `Promise<{ ids: string[] }>` — unique identifiers for each sent event.

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Event identifier (e.g., `"app/user.created"`). Used to match function triggers. |
| `data` | `object` | Yes | JSON-serializable payload with any custom properties. |
| `id` | `string` | No | Deduplication key. Duplicate events with the same `id` are ignored for 24 hours. |
| `ts` | `number` | No | Unix timestamp in milliseconds. Future timestamps schedule the function run. |
| `user` | `object` | No | User context. Encrypted at rest. `user.external_id` and `user.email` are supported sub-fields. Note: empty during function replay. |
| `v` | `string` | No | Payload version string (e.g., `"2024-05-15.1"`). Useful for schema versioning. |

## Notes

- `inngest.send()` is async — always `await` it or handle the returned Promise.
- In production, configure authentication via the `INNGEST_EVENT_KEY` environment variable or the `eventKey` constructor option (see [Event Keys](./event-keys.md)).
- Event keys are not required in local development with the Inngest Dev Server.
- Maximum batch payload: 512 KB per request (typically 10–1,000 events).
- Use `step.sendEvent()` instead of `inngest.send()` when sending events from inside a function — it adds tracing context automatically.
- The HTTP API endpoint is `https://inn.gs/e/$INNGEST_EVENT_KEY` (POST, JSON body).

## Related

- [Event Payload Schema](./event-payload-schema.md)
- [step.sendEvent](./step-send-event.md)
- [Event Keys](./event-keys.md)
- [Event Naming Conventions](./event-naming-conventions.md)
