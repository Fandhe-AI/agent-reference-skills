# Channels & Topics

Channels are the top-level scope for realtime messages. Each channel has one or more typed topics (message streams with schemas) that provide end-to-end type safety from publishing to subscribing.

## Signature / Usage

```ts
import { realtime, staticSchema } from "inngest";
import { z } from "zod";

// Static channel
const alerts = realtime.channel({
  name: "system:alerts",
  topics: {
    alert: { schema: z.object({ message: z.string(), severity: z.enum(["info", "warn", "error"]) }) },
  },
});

// Parameterized channel
const chat = realtime.channel({
  name: ({ threadId }: { threadId: string }) => `chat:${threadId}`,
  topics: {
    message: { schema: z.object({ text: z.string() }) },
    typing: { schema: staticSchema<{ userId: string }>() },
  },
});

const ch = chat({ threadId: "abc123" });
ch.message.channel; // "chat:abc123"
ch.message.topic;   // "message"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| name | string \| (params) => string | Channel name. A static string for a fixed channel, or a function returning a string for a parameterized channel. |
| topics | Record<string, { schema }> | Map of topic name to config. Each topic requires a `schema`: any Standard Schema (Zod, Valibot, ArkType) or `staticSchema<T>()` for type-only schemas. |

## Notes

- When `name` is a string, `realtime.channel()` returns a channel instance directly (usable without instantiation).
- When `name` is a function, `realtime.channel()` returns a factory; call it with parameters to get a channel instance. Parameterized channels isolate subscribers — a subscriber to `chat:abc123` won't receive messages published to `chat:def456`.
- `staticSchema<T>()` provides compile-time typing only, with zero runtime validation cost; it can be mixed with runtime-validated schemas (Zod/Valibot/ArkType) on the same channel.
- Each topic accessor on a channel instance returns a `TopicRef` (carries channel name, topic name, schema config), the value passed to `publish`, `subscribe`, and `getClientSubscriptionToken`.
- Type utilities: `typeof channel.$infer.<topic>` infers topic data type; `typeof channel.$params` infers channel parameters (parameterized channels only).
- Channel definitions are plain objects with no server-side dependencies — define them in a shared file and import on both server and client for full type safety.
- This is the v4 TypeScript SDK realtime API.

## Related

- [Publishing](./publishing.md)
- [Subscribing](./subscribing.md)
- [useRealtime](./use-realtime.md)
- [Subscription Tokens](./subscription-tokens.md)
