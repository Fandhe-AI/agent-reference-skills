---
source: https://opencode.ai/docs/build/plugins/server/#events
---

# Events

Subscribe to the connected server's public event stream.

## Signature / Usage

Abort the stream during plugin cleanup. Pass `types`, for example `ctx.event.subscribe({ types: ["config.updated"] })`, to receive only those event types; the events are typed to match. Plugins run inside the server, so unlike SDK clients they never receive `server.connected`. Unknown type names are ignored with a warning in the server log.

```ts
const controller = new AbortController()
void (async () => {
  for await (const event of ctx.event.subscribe({ signal: controller.signal })) {
    console.log(event.type)
  }
})()
return () => controller.abort()
```

### Reference

Schema: [`V2EventEncoded`](https://opencode.ai/docs/api/#schema-V2EventEncoded)

```ts
type EventType = Exclude<OpenCodeEvent["type"], "server.connected">

interface EventContext {
  subscribe<Type extends EventType = EventType>(options?: {
    types?: Type[]
    signal?: AbortSignal
  }): AsyncIterable<Extract<OpenCodeEvent, { type: Type }>>
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `types` | `Type[]` | Receive only these event types. |
| `signal` | `AbortSignal` | Aborts the stream. |

## Notes

- V1 `event` hook migrates to `ctx.event.subscribe()`.

## Related

- [Lifecycle](./lifecycle.md)
- [Migrate plugins from V1](./migrate-v1.md)
