# step.sendEvent

Send one or more events reliably from within an Inngest function. Preferred over `inngest.send()` inside functions because it adds automatic tracing context linking events to the current run.

## Signature / Usage

```ts
step.sendEvent(id, eventPayload | eventPayload[]): Promise<{ ids: string[] }>
```

```ts
// Single event
await step.sendEvent("send-activation-event", {
  name: "app/user.activated",
  data: { userId: "01H08SEAXBJFJNGTTZ5TAWB0BD" },
});

// Multiple events (fan-out)
const { ids } = await step.sendEvent("send-invoices", [
  { name: "app/invoice.created", data: { invoiceId: "645e9e024befa68763f5b500" } },
  { name: "app/invoice.created", data: { invoiceId: "645e9e08f29fb563c972b1f7" } },
]);
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Step identifier shown in function logs; used for memoization across retries. |
| `eventPayload` | `object \| object[]` | Single event or array of events. Same schema as `inngest.send()`. |

**Return value:** `Promise<{ ids: string[] }>` — array of unique IDs for each sent event.

## Notes

- Always `await` the call (or use `.then()`) — the function sleeps until the step completes.
- Use `step.sendEvent()` instead of `inngest.send()` inside functions; the SDK adds execution tracing automatically.
- Maximum 5,000 events per call. Plan fan-out batches accordingly.
- Each event payload batch must be under 512 KB.
- Python equivalent: `step.send_event()`. Go equivalents: `step.Send()` / `step.SendMany()`.

## Related

- [Sending Events](./sending-events.md)
- [Fan-out](./fan-out.md)
- [Sending Events from Functions (guide)](./sending-events-from-functions.md)
