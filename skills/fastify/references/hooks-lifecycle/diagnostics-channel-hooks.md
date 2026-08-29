---
source: https://fastify.dev/docs/latest/Reference/Hooks/
---

# Diagnostics Channel Hooks

Target: Fastify v5.12.1. Fastify publishes events on Node's `node:diagnostics_channel` for instrumentation/tracing packages, independent of `addHook`.

## Signature / Usage

One publish event, `'fastify.initialization'`, fires at initialization time with the Fastify instance, letting a package add hooks/plugins/routes before the app starts:

```js
const tracer = /* retrieved from elsewhere in the package */
const dc = require('node:diagnostics_channel')
const channel = dc.channel('fastify.initialization')
const spans = new WeakMap()

channel.subscribe(function ({ fastify }) {
  fastify.addHook('onRequest', (request, reply, done) => {
    const span = tracer.startSpan('fastify.request.handler')
    spans.set(request, span)
    done()
  })

  fastify.addHook('onResponse', (request, reply, done) => {
    const span = spans.get(request)
    span.finish()
    done()
  })
})
```

Five more events are published per-request, following the `TracingChannel` nomenclature:

- `tracing:fastify.request.handler:start` — always fires: `{ request, reply, route: { url, method } }`
- `tracing:fastify.request.handler:end` — always fires: `{ request, reply, route, async: Bool }`
- `tracing:fastify.request.handler:asyncStart` — fires for promise/async handlers: `{ request, reply, route }`
- `tracing:fastify.request.handler:asyncEnd` — fires for promise/async handlers: `{ request, reply, route }`
- `tracing:fastify.request.handler:error` — fires on error: `{ request, reply, route, error }`

The object instance is the same across all events for a given request. `route` is `{ url, method }` of the matched route (e.g. `/collection/:id`, `GET`).

```js
const dc = require('node:diagnostics_channel')
const channel = dc.channel('tracing:fastify.request.handler:start')
channel.subscribe((msg) => {
  console.log(msg.request, msg.reply)
})
```

## Notes

- Node's `TracingChannel` class API is currently experimental and may undergo breaking changes even in semver-patch Node.js releases.
- These are distinct from `anthropic-claude-code-extend` hooks and `lefthook` git hooks — they are Node.js diagnostics events, not Fastify request/reply hooks.

## Related

- [request-hooks.md](./request-hooks.md)
- [lifecycle.md](./lifecycle.md)
