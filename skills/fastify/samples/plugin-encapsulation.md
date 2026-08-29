---
source: https://fastify.dev/docs/latest/Reference/Encapsulation/
---

# Plugin Encapsulation

Show how decorators registered inside a nested `register()` call stay scoped to their own (grand)child context unless wrapped with `fastify-plugin`.

```js
'use strict'

const fastify = require('fastify')()
const fp = require('fastify-plugin')

fastify.register(fp(async function sharedContext (childServer) {
  childServer.decorate('foo', 'foo')

  childServer.register(async function encapsulatedContext (grandchildServer) {
    grandchildServer.decorate('bar', 'bar')
  })
}))

await fastify.ready()

console.log(fastify.foo) // 'foo'
console.log(fastify.bar) // undefined
```

## Notes

- Wrapping the outer plugin with `fastify-plugin` breaks encapsulation for that plugin, exposing `foo` on the root instance.
- The nested `register()` call still creates its own encapsulated context, so `bar` is only visible inside `encapsulatedContext` and its children.
- Always call `fastify.ready()` (or `listen()`) before inspecting decorators added asynchronously by plugins.
