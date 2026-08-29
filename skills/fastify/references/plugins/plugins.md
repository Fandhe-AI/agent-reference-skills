---
source: https://fastify.dev/docs/latest/Reference/Plugins/
---

# Plugins

Fastify can be extended with plugins, which can be a set of routes, a server decorator, or other functionality, added via the `register` API. Target version: v5.12.1.

## Signature / Usage

```js
fastify.register(plugin, [options])
```

By default, `register` creates a *new scope*, meaning changes to the Fastify instance (via `decorate`) will not affect the current context ancestors, only its descendants. This feature enables plugin *encapsulation* and *inheritance*, creating a *directed acyclic graph* (DAG) and avoiding cross-dependency issues.

Creating a plugin is a function that takes three parameters: the `fastify` instance, an `options` object, and the `done` callback. Alternatively, use an `async` function and omit the `done` callback.

```js
module.exports = function callbackPlugin (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  fastify.get('/', handler)
  done()
}

// Or using async
module.exports = async function asyncPlugin (fastify, opts) {
  fastify.decorate('utility', function () {})
  fastify.get('/', handler)
}
```

`register` can also be used inside another `register`.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `logLevel` | string | Custom log level for the plugin. See [Routes custom log level](../routing/route-config-log-level.md). Ignored when the plugin is wrapped with `fastify-plugin`. |
| `logSerializers` | object | Custom log serializers for the plugin. Ignored when wrapped with `fastify-plugin`. |
| `prefix` | string | Prefixes all routes registered inside the plugin. Does not work if the plugin is wrapped with `fastify-plugin`. |

The `options` parameter can also be a `Function` evaluated at plugin registration, receiving the external Fastify instance as its first argument:

```js
const fp = require('fastify-plugin')

fastify.register(fp((fastify, opts, done) => {
  fastify.decorate('foo_bar', { hello: 'world' })
  done()
}))

// The opts argument of fastify-foo will be { hello: 'world' }
fastify.register(require('fastify-foo'), parent => parent.foo_bar)
```

### async/await

*async/await* is supported by `after`, `ready`, and `listen`, as well as `fastify` being a Thenable:

```js
await fastify.register(require('my-plugin'))
await fastify.after()
await fastify.ready()
await fastify.listen({ port: 3000 })
```

Using `await` when registering a plugin loads the plugin and its dependencies, "finalizing" the encapsulation process.

### ESM support

ESM is supported from Node.js `v13.3.0` and above:

```js
// main.mjs
import Fastify from 'fastify'
const fastify = Fastify()

fastify.register(import('./plugin.mjs'))

fastify.listen({ port: 3000 }, console.log)

// plugin.mjs
async function plugin (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    return { hello: 'world' }
  })
}

export default plugin
```

### Handle the scope

If `register` is used only to extend server functionality with `decorate`, tell Fastify not to create a new scope. There are two ways: use the `fastify-plugin` module (recommended), or the `Symbol.for('skip-override')` hidden property.

```js
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}, '0.x')
```

Not recommended alternative:

```js
function yourPlugin (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}
yourPlugin[Symbol.for('skip-override')] = true
module.exports = yourPlugin
```

### Error handling

Error handling is done by [avvio](https://github.com/mcollina/avvio#error-handling). Handle errors in the next `after` or `ready` block, otherwise they are caught inside the `listen` callback.

```js
fastify.register(require('my-plugin'))

fastify.after(err => console.log(err))
fastify.ready(err => console.log(err))
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) console.log(err)
})
```

## Notes

- v4 -> v5: do not mix callback-style (`done` argument) and promise-style (`async`/returned Promise) within the same plugin function. Choose one style per plugin. See `guides/migration-v5.md` for the full v4 -> v5 migration list.
- Plugins should namespace custom options (e.g. `{ prefix: '/foo', foo: { fooOption1: 'value' } }`) to avoid collisions with sibling plugins.

## Related

- [encapsulation](./encapsulation.md)
- [fastify-plugin](./fastify-plugin.md)
- [decorators](./decorators.md)
