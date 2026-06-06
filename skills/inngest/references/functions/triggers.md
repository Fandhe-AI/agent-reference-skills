# Triggers

Triggers define what starts an Inngest function run. A function accepts up to 10 triggers — any combination of event triggers and cron triggers.

## Signature / Usage

```ts
// Single event trigger
inngest.createFunction(
  { id: "my-fn", triggers: { event: "app/user.created" } },
  handler
);

// Cron trigger
inngest.createFunction(
  { id: "weekly-report", triggers: { cron: "0 9 * * MON" } },
  handler
);

// Multiple triggers
inngest.createFunction(
  {
    id: "multi-trigger-fn",
    triggers: [
      { event: "app/user.created" },
      { event: "app/user.imported" },
      { cron: "0 0 * * *" },
    ],
  },
  handler
);
```

## Options / Props

### Event trigger

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `event` | `string \| EventType` | Yes | Event name to listen for. Accepts a plain string or an `eventType()` helper object. |
| `if` | `string` | No | CEL expression to filter events. Only matching events trigger the function. |

### Cron trigger

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cron` | `string` | Yes | Unix-cron compatible schedule string. Optional `TZ=<tz>` prefix sets timezone. |

## Notes

- `if` on an event trigger uses CEL with `event` in scope. Example: `"event.data.status == 'active'"`.
- Cron format supports standard 5-field unix-cron plus the `TZ=` prefix, e.g. `"TZ=America/New_York 0 9 * * *"`.
- Cron triggers with overlapping schedules for the same function are automatically deduplicated.
- Functions can be triggered by webhook events by routing webhook payloads as Inngest events from your serve handler.
- In the handler, cron-triggered runs receive a synthetic event with `name: "inngest/scheduled.timer"`.

## Related

- [create-function](./create-function.md)
- [durable-execution](./durable-execution.md)
