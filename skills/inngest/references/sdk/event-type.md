# eventType()

Defines a typed event for use with `inngest.send()`, `waitForEvent()`, and function triggers. Replaces the `EventSchemas` class removed in SDK v4.

## Signature / Usage

```ts
import { eventType, staticSchema } from "inngest";
import { z } from "zod";

// With Zod schema (runtime validation + TypeScript types)
const userCreated = eventType("user/account.created", {
  schema: z.object({
    userId: z.string(),
    email: z.string().email(),
  }),
});

// With staticSchema (TypeScript types only, no runtime validation)
type UserSignup = { email: string; name: string };
const userSignup = eventType("user/new.signup", {
  schema: staticSchema<UserSignup>(),
});

// Sending a typed event
await inngest.send(userCreated.create({ userId: "123", email: "a@b.com" }));
```

## Notes

- `eventType()` supports any [Standard Schema](https://standardschema.dev/) implementation, not just Zod.
- `staticSchema<T>()` provides TypeScript-only type safety with no runtime overhead.
- Call `.create(data)` on the event type object to construct a fully typed payload for `inngest.send()`.
- Pass the event type variable directly to `waitForEvent()` or as a trigger for full type inference.
- Centralize event type definitions in a shared file (e.g. `inngest/events.ts`) for reuse across sending and consuming code.
- `EventSchemas` class was removed in v4; migrate to `eventType()`.

## Related

- [inngest.send()](./send-event.md)
- [TypeScript Types](./typescript-types.md)
- [Inngest Client](./inngest-client.md)
