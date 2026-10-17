---
source: https://vite.dev/guide/api-plugin#client-server-communication
---

# Client-server Communication / Custom Events

Since Vite 2.9, utilities help plugins communicate with clients: `server.ws.send` / `server.ws.on` on the server, `hot.on` / `hot.send` on the client.

## Signature / Usage

Server to client:

```js
export default defineConfig({
  plugins: [
    {
      // ...
      configureServer(server) {
        server.ws.on('connection', () => {
          server.ws.send('my:greetings', { msg: 'hello' })
        })
      },
    },
  ],
})
```

```ts
// client side
if (import.meta.hot) {
  import.meta.hot.on('my:greetings', (data) => {
    console.log(data.msg) // hello
  })
}
```

Client to server:

```ts
// client side
if (import.meta.hot) {
  import.meta.hot.send('my:from-client', { msg: 'Hey!' })
}
```

```js
export default defineConfig({
  plugins: [
    {
      // ...
      configureServer(server) {
        server.ws.on('my:from-client', (data, client) => {
          console.log('Message from client:', data.msg) // Hey!
          // reply only to the client (if needed)
          client.send('my:ack', { msg: 'Hi! I got your message!' })
        })
      },
    },
  ],
})
```

TypeScript for custom events (extend `CustomEventMap`):

```ts
import 'vite/types/customEvent.d.ts'

declare module 'vite/types/customEvent.d.ts' {
  interface CustomEventMap {
    'custom:foo': { msg: string }
    // 'event-key': payload
  }
}
```

```ts
type CustomFooPayload = InferCustomEventPayload<'custom:foo'>
import.meta.hot?.on('custom:foo', (payload) => {
  // The type of payload will be { msg: string }
})
import.meta.hot?.on('unknown:event', (payload) => {
  // The type of payload will be any
})
```

## Options / Props

Built-in `CustomEventMap` keys (from `types/customEvent.d.ts`):

| Event | Payload type |
|-------|--------------|
| `vite:beforeUpdate` / `vite:afterUpdate` | `UpdatePayload` |
| `vite:beforePrune` | `PrunePayload` |
| `vite:beforeFullReload` | `FullReloadPayload` |
| `vite:error` | `ErrorPayload` |
| `vite:invalidate` | `InvalidatePayload` (`path`, `message`, `firstInvalidatedBy`) |
| `vite:ws:connect` / `vite:ws:disconnect` | `WebSocketConnectionPayload` (`webSocket`, marked `@experimental`) |
| `vite:client:connect` / `vite:client:disconnect` (server events) | `undefined` |

## Notes

- Always prefix custom event names to avoid collisions with other plugins.
- Include the `.d.ts` extension when specifying TypeScript declaration files; otherwise TypeScript may not know which file the module is trying to extend.
- `InferCustomEventPayload<T>` infers the payload type for event `T` from `CustomEventMap`; unknown events get `any`.
- `CustomEventMap` also contains `@internal` entries (`vite:forward-console`, `vite:client-connected`, `vite:bundled-dev:reload-needed`) that are not part of the documented API.

## Related

- [hot.on / hot.off / hot.send](./hot-events.md)
- [configureServer / configurePreviewServer](./hook-configure-server.md)
