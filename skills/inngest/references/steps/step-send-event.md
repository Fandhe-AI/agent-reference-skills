# step.sendEvent

Sends one or more events to Inngest from within a function. Preferred over `inngest.send()` inside functions for reliable delivery.

## Signature / Usage

```ts
step.sendEvent(
  id: string,
  payload: EventPayload | EventPayload[]
): Promise<{ ids: string[] }>
```

```ts
const { ids } = await step.sendEvent("send-welcome-events", [
  { name: "app/email.welcome", data: { userId: event.data.userId } },
  { name: "app/billing.trial-start", data: { userId: event.data.userId } },
]);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier used in logs and for memoizing state |
| `payload` | `EventPayload \| EventPayload[]` | A single event object or an array of event objects with `name` and `data` fields |

## Notes

- Must be called with `await` to ensure reliable delivery
- Returns an `ids` array of event IDs usable for dashboard lookup or REST API queries
- Use `step.sendEvent()` instead of `inngest.send()` inside functions — it participates in the step lifecycle and ensures atomicity
- Events sent here fan out to all functions that subscribe to those event names
- For fire-and-forget fan-out (parallel independent functions), prefer this over `step.invoke()`

## Related

- [step.invoke](./step-invoke.md)
- [step.waitForEvent](./step-wait-for-event.md)
- [Parallel Steps](./parallel-steps.md)
