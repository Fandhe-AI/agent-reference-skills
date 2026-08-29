---
source: https://fastify.dev/docs/latest/Reference/Hooks/
---

# Application Hooks

Target: Fastify v5.12.1. Hooks into the application lifecycle rather than the per-request lifecycle: `onReady`, `onListen`, `onClose`, `preClose`, `onRoute`, `onRegister`.

## Signature / Usage

### onReady

Triggered before the server starts listening for requests and when `.ready()` is invoked. Cannot change routes or add new hooks. Registered functions run serially; the server only starts listening once all `onReady` functions complete. `this` is bound to the Fastify instance.

```js
fastify.addHook('onReady', function (done) {
  const err = null
  done(err)
})

// or async/await
fastify.addHook('onReady', async function () {
  await loadCacheFromDatabase()
})
```

### onListen

Triggered when the server starts listening for requests. Hooks run one after another; if a hook errors, it is logged and ignored so the queue continues. `this` is bound to the Fastify instance. Alternative to `fastify.server.on('listening', () => {})`.

```js
fastify.addHook('onListen', function (done) {
  const err = null
  done(err)
})

// or async/await
fastify.addHook('onListen', async function () {
  // Some async code
})
```

This hook does not run when the server is started using `fastify.inject()` or `fastify.ready()`.

### onClose

Triggered when `fastify.close()` is invoked. By the time `onClose` hooks execute, the HTTP server has already stopped listening, all in-flight requests have completed, and connections have drained — the safe place for plugins to release resources such as database connection pools.

```js
fastify.addHook('onClose', (instance, done) => {
  done()
})

// or async/await
fastify.addHook('onClose', async (instance) => {
  await closeDatabaseConnections()
})
```

**Execution order**: when multiple `onClose` hooks are registered across plugins, child-plugin hooks execute before parent-plugin hooks.

```js
fastify.register(function dbPlugin (instance, opts, done) {
  instance.addHook('onClose', async (instance) => {
    // Runs first — close the database pool
    await instance.db.close()
  })
  done()
})

fastify.addHook('onClose', async (instance) => {
  // Runs second — after child plugins have cleaned up
})
```

### preClose

Triggered when `fastify.close()` is invoked, before `onClose`. At this point the server is already rejecting new requests with `503` (when `return503OnClosing` is `true`), but the HTTP server has not yet stopped listening and in-flight requests are still processing. Useful when a plugin has state attached to the HTTP server (e.g. open WebSocket connections) that must be explicitly terminated for `server.close()` to complete. Rarely needed — prefer `onClose`.

```js
fastify.addHook('preClose', (done) => {
  done()
})

// or async/await
fastify.addHook('preClose', async () => {
  await removeSomeServerState()
})
```

```js
fastify.addHook('preClose', async () => {
  for (const ws of activeWebSockets) {
    ws.close(1001, 'Server shutting down')
  }
})
```

### onRoute

Triggered when a new route is registered. Receives a `routeOptions` object; synchronous interface, no callback. Encapsulated.

```js
fastify.addHook('onRoute', (routeOptions) => {
  routeOptions.method
  routeOptions.schema
  routeOptions.url // complete URL including prefix
  routeOptions.path // alias of `url`
  routeOptions.routePath // URL without the prefix
  routeOptions.bodyLimit
  routeOptions.logLevel
  routeOptions.logSerializers
  routeOptions.prefix
})
```

Useful for a plugin that needs to customize routes (e.g. adding route hooks):

```js
fastify.addHook('onRoute', (routeOptions) => {
  function onPreSerialization (request, reply, payload, done) {
    done(null, payload)
  }
  routeOptions.preSerialization = [...(routeOptions.preSerialization || []), onPreSerialization]
})
```

To add routes within an `onRoute` hook, tag them to avoid an infinite loop:

```js
const kRouteAlreadyProcessed = Symbol('route-already-processed')

fastify.addHook('onRoute', function (routeOptions) {
  const { url, method } = routeOptions
  const isAlreadyProcessed = (routeOptions.custom && routeOptions.custom[kRouteAlreadyProcessed]) || false

  if (!isAlreadyProcessed) {
    this.route({
      url,
      method,
      custom: { [kRouteAlreadyProcessed]: true },
      handler: () => {}
    })
  }
})
```

### onRegister

Triggered when a new plugin is registered and a new encapsulation context is created, **before** the registered code runs. Encapsulated. Not called if the plugin is wrapped in `fastify-plugin`.

```js
fastify.decorate('data', [])

fastify.register(async (instance, opts) => {
  instance.data.push('hello')

  instance.register(async (instance, opts) => {
    instance.data.push('world')
  }, { prefix: '/hola' })
}, { prefix: '/ciao' })

fastify.addHook('onRegister', (instance, opts) => {
  // Create a new array so encapsulated instances don't share a reference
  instance.data = instance.data.slice()
  console.log(opts.prefix)
})
```

## Options / Props

| Hook | Handler args | Behavior |
|------|--------------|-----------|
| `onReady` | `(done)` | serial, blocks listening |
| `onListen` | `(done)` | error logged & ignored |
| `onClose` | `(instance, done)` | child before parent |
| `preClose` | `(done)` | before `onClose` |
| `onRoute` | `(routeOptions)` | synchronous only, no `done` |
| `onRegister` | `(instance, opts)` | signature only, no `done` |

## Notes

- `onClose` is the only hook not affected by encapsulation scoping (see `hook-scope.md`).
- `onListen` does not run under `fastify.inject()` / `fastify.ready()`.

## Related

- [lifecycle.md](./lifecycle.md)
- [request-hooks.md](./request-hooks.md)
- [hook-scope.md](./hook-scope.md)
