# Trigger Helpers (eventType / cron / invoke / staticSchema)

Type-safe helpers for defining triggers and schemas of Inngest functions. They replace raw string-based triggers with typed, validated alternatives.

## Signature / Usage

```ts
import { eventType, cron, invoke, staticSchema } from "inngest";
import { z } from "zod";

const orderPlaced = eventType("shop/order.placed", {
  schema: z.object({ orderId: z.string(), total: z.number() }),
});

inngest.createFunction(
  {
    id: "process-order",
    triggers: [orderPlaced, cron("0 0 * * *")],
  },
  async ({ event }) => {
    // event.data is typed from the schema
  }
);
```

More patterns:

```ts
// Combine with an `if` filter
triggers: [{ event: orderPlaced, if: "event.data.total > 100" }]

// Typed waitForEvent
const approval = await step.waitForEvent("wait-for-approval", {
  event: approvalReceived,
  timeout: "7d",
  match: "data.orderId",
});

// Typed send
await inngest.send(orderPlaced.create({ orderId: "order_123", total: 99.99 }));

// Multiple event triggers: narrow with event.name
if (event.name === "app/user.created") { /* event.data typed for that event */ }

// Wildcard (no schema allowed)
const anyUserEvent = eventType("user/*");

// Cron with timezone / with jitter
triggers: [cron("TZ=America/New_York 0 9 * * 1-5")]
triggers: [{ cron: "0 * * * *", jitter: "5m" }]

// invoke() schema on the target function
triggers: [
  { event: "image/uploaded" },
  invoke({ schema: z.object({ imageUrl: z.string().url(), width: z.number() }) }),
]
```

## Options / Props

### eventType(name, options?)

| Name | Type | Description |
|------|------|-------------|
| name | string | Event name. Lowercase dot notation with a prefix/namespace is recommended, e.g. `"app/account.created"`. |
| options.schema | Standard Schema or `staticSchema<T>()` | Schema for the event data payload. Any Standard Schema library (Zod, Valibot, ArkType, etc.). A runtime schema validates payloads at runtime. |
| options.version | string | Optional payload version identifier, e.g. `"2024-01-15.1"`. Sets the `v` field on sent events. |

Returns an `EventType` object. Call its `create(data)` method to build a typed payload for `inngest.send()` / `step.sendEvent()`.

### cron(cronExpression)

| Name | Type | Description |
|------|------|-------------|
| cronExpression | string | Unix-cron compatible schedule. Optional timezone prefix, e.g. `"TZ=Europe/Paris 0 12 * * 5"`. |

Object form `{ cron, jitter }`:

| Name | Type | Description |
|------|------|-------------|
| cron | string | Unix-cron compatible schedule string. |
| jitter | string | Duration (e.g. `"30s"`, `"5m"`) adding a random delay after the scheduled boundary. Must be between `"1s"` and `"5m"`. |

### invoke(options)

| Name | Type | Description |
|------|------|-------------|
| options.schema | Standard Schema or `staticSchema<T>()` | Expected data shape when callers invoke the function via `step.invoke()`. |

### staticSchema&lt;T&gt;()

| Name | Type | Description |
|------|------|-------------|
| T | type | TypeScript type of the event data. Compile-time checking only; no runtime validation. |

## Notes

- `cron()` accepts a schedule string only; use the object form `{ cron, jitter }` for jitter.
- Wildcard event types cannot define a schema because matched events may have different payload shapes.
- Schema transforms (e.g. Zod `.transform()`) are not supported with `eventType()`: only the input shape can be validated. Transform inside the function handler instead.
- All functions can be invoked regardless of whether `invoke()` is used; the helper only defines the schema so callers get type checking.
- Use `staticSchema()` when runtime validation is not needed; use a Standard Schema library when it is.
- Source: https://www.inngest.com/docs-markdown/reference/typescript/v4/functions/triggers (fetched 2026-10).

## Related

- [eventType()](./event-type.md)
- [Create Function](./create-function.md)
- [inngest.send()](./send-event.md)
- [Referencing Functions](./referencing-functions.md)
