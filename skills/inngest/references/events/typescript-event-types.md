# TypeScript Event Types

Define typed event schemas for compile-time safety in `inngest.send()`, `inngest.createFunction()`, and `step.waitForEvent()`.

## Signature / Usage

```ts
import { eventType, Inngest, staticSchema } from "inngest";
import { z } from "zod";

// Type-only (no runtime validation)
type UserSignup = { email: string; name: string };
export const userNewSignup = eventType("user/new.signup", {
  schema: staticSchema<UserSignup>(),
});

// With runtime validation via Zod (Standard Schema compatible)
export const orderPlaced = eventType("shop/order.placed", {
  schema: z.object({ orderId: z.string(), total: z.number() }),
});

// Pass event types to the client for full type safety
export const inngest = new Inngest({
  id: "my-app",
  schemas: new EventSchemas().fromZod([userNewSignup, orderPlaced]),
});
```

Once wired up, `inngest.send()` autocompletes event names and validates payload shapes at compile time.

## Options / Props

| API | Description |
|-----|-------------|
| `eventType(name, { schema })` | Defines a typed event. `schema` accepts `staticSchema<T>()` or any Standard Schema library (Zod, Valibot, ArkType, etc.). |
| `staticSchema<T>()` | Type-only validator — no runtime check. |
| `GetEvents<typeof inngest>` | Utility type: extract the full event map from a client instance. |
| `GetFunctionInput<typeof inngest>` | Utility type: access function argument types for building abstractions. |
| `GetStepTools<typeof inngest>` | Utility type: retrieve the `step` object type. |
| `Inngest.Any` / `InngestFunction.Any` | Untyped class instances, useful for typing heterogeneous collections. |

## Notes

- Centralise your `new Inngest()` client and `eventType()` definitions in a single file (e.g., `inngest/client.ts`) so they can be imported anywhere events are sent or functions are defined.
- When a runtime schema is provided via Zod/Valibot, the SDK validates event payloads at runtime in addition to compile time.
- `step.waitForEvent()` also accepts an `eventType` variable and returns a fully-typed event payload.
- Use `eventType().create()` to construct fully-typed event objects programmatically.

## Related

- [Sending Events](./sending-events.md)
- [Event Payload Schema](./event-payload-schema.md)
- [Event Naming Conventions](./event-naming-conventions.md)
