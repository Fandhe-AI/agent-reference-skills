---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Lifecycle Methods

Methods controlling plugin-loading completion, server startup, listening addresses, shutdown, and async disposal of a Fastify instance.

## Signature / Usage

```js
fastify
  .register((instance, opts, done) => { done() })
  .after(err => { console.log('after current plugin') })
  .ready(err => { if (err) throw err })

await fastify.listen({ port: 3000 })
const addrs = fastify.addresses()
await fastify.close()
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `after` | `.after([func])` | Runs after the current plugin and its registered plugins finish loading, always before `ready`. Returns a `Promise` if called without a function. |
| `ready` | `.ready([func])` | Runs once all plugins have loaded; `func(err)` receives an error if one occurred. Returns a `Promise` if called without a function. |
| `listen` | `.listen([options][, callback])` | Starts the server; internally awaits `ready()`. `options` extends Node core `server.listen()` options plus `listenTextResolver`. Default: `{ port: 0, host: 'localhost', exclusive: false, readableAll: false, writableAll: false, ipv6Only: false }`. Returns a `Promise<string>` (listening address) if no callback given. |
| `addresses` | `.addresses()` | Returns an array of addresses the server is listening on (includes `fastify.server.address()`); empty before `listen()` or after `close()`. |
| `close` | `.close([callback])` | Closes the instance and runs the `onClose` hook. Returns a `Promise` if called without a callback. |
| `listeningOrigin` | `.listeningOrigin` | Current origin the server is listening on, e.g. `http://127.0.0.1:3000`, or the Unix socket path. |
| `Symbol.asyncDispose` | `fastify[Symbol.asyncDispose]` | Async function invoked when the instance is disposed; pairs with the TypeScript `using`/`await using` keyword for automatic cleanup. |

## Notes

- `.listen()` shutdown sequence (`close()`): (1) instance flagged closing, new requests get `Connection: close` per `return503OnClosing`; (2) `preClose` hooks run while in-flight requests continue; (3) connection draining per `forceCloseConnections`; (4) `server.close()` stops accepting new connections and waits for in-flight requests; (5) `onClose` hooks run; (6) callback/Promise resolves. Upgraded connections (e.g. WebSocket) are not tracked by the HTTP server and must be closed explicitly in a `preClose` hook.
- v4 → v5: the variadic `.listen()` argument signature was removed. `fastify.listen(8000)` no longer works; use `fastify.listen({ port: 8000 })`.

```ts
test('uses app and closes it afterwards', async () => {
  await using app = fastify()
  // do something with app.
})
```

## Related

- [Instance Routing](./instance-routing.md)
- [Instance Misc](./instance-misc.md)
