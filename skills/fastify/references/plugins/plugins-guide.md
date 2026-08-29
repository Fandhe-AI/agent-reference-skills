---
source: https://fastify.dev/docs/latest/Guides/Plugins-Guide/
---

# The hitchhiker's guide to plugins

Fastify was built to be an extremely modular system: everything in Fastify is a plugin, registered through a single `register` API that creates an encapsulation model. Target version: v5.12.1.

## Signature / Usage

```js
fastify.register(
  require('./my-plugin'),
  { options }
)
```

Required plugins expose a single function with the following signature:

```js
module.exports = function (fastify, options, done) {}
```

`register` creates a new Fastify context: changes performed on the Fastify instance inside it will not be reflected in the context's ancestors (encapsulation). Fastify's plugin model is graph-based (via [avvio](https://github.com/mcollina/avvio)) and starts loading plugins __after__ `.listen()`, `.inject()`, or `.ready()` is called.

```js
module.exports = function (fastify, options, done) {
  fastify.get('/plugin', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  done()
}
```

### Decorators

Creating a decorator with `decorate` shares a utility across the instance without re-importing it in every file:

```js
fastify.decorate('util', (a, b) => a + b)
```

`register` and `decorate` combined enable encapsulation:

```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (a, b) => a + b)
  console.log(instance.util('that is ', 'awesome'))
  done()
})

fastify.register((instance, opts, done) => {
  console.log(instance.util('that is ', 'awesome')) // This will throw an error
  done()
})
```

Encapsulation applies to ancestors and siblings, but not children:

```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (a, b) => a + b)

  instance.register((instance, opts, done) => {
    console.log(instance.util('that is ', 'awesome')) // This will not throw an error
    done()
  })

  done()
})
```

`decorateRequest` and `decorateReply` exist alongside `decorate` for ergonomics — e.g. attaching a helper directly to `reply`:

```js
fastify.decorateReply('html', function (payload) {
  this.type('text/html') // This is the 'Reply' object
  this.send(generateHtml(payload))
})

fastify.get('/html', (request, reply) => {
  reply.html({ hello: 'world' })
})
```

The `this` keyword is not bound in arrow functions, so `decorateReply` / `decorateRequest` handlers that need `request`/`reply` must use the `function` keyword.

### Hooks

Hooks let a utility run for every request without repeating code:

```js
fastify.decorate('util', (request, key, value) => { request[key] = value })

fastify.addHook('preHandler', (request, reply, done) => {
  fastify.util(request, 'timestamp', new Date())
  done()
})

fastify.get('/plugin1', (request, reply) => {
  reply.send(request)
})
```

Hooks can be scoped to a subset of routes via encapsulation, or applied dynamically per-route with the `onRoute` hook and a route `config` option:

```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (request, key, value) => { request[key] = value })

  function handler(request, reply, done) {
    instance.util(request, 'timestamp', new Date())
    done()
  }

  instance.addHook('onRoute', (routeOptions) => {
    if (routeOptions.config && routeOptions.config.useUtil === true) {
      if (!routeOptions.preHandler) {
        routeOptions.preHandler = [handler]
        return
      }
      if (Array.isArray(routeOptions.preHandler)) {
        routeOptions.preHandler.push(handler)
        return
      }
      routeOptions.preHandler = [routeOptions.preHandler, handler]
    }
  })

  instance.get('/plugin1', {config: {useUtil: true}}, (request, reply) => {
    reply.send(request)
  })

  done()
})
```

### How to handle encapsulation and distribution

The preferred way to distribute a utility is to wrap all code inside a `register`, supporting asynchronous bootstrapping since `decorate` is a synchronous API. Use [`fastify-plugin`](./fastify-plugin.md) to tell Fastify to avoid creating a new encapsulation scope:

```js
const fp = require('fastify-plugin')
const dbClient = require('db-client')

function dbPlugin (fastify, opts, done) {
  dbClient.connect(opts.url, (err, conn) => {
    if (err) return done(err)
    fastify.decorate('db', conn)
    done()
  })
}

module.exports = fp(dbPlugin)
```

Because Fastify loads plugins __after__ `.listen()` / `.inject()` / `.ready()`, a decorated variable from a preceding plugin can be passed into a later plugin's `options` via a function:

```js
const fastify = require('fastify')()
const fp = require('fastify-plugin')
const dbClient = require('db-client')

function dbPlugin (fastify, opts, done) {
  dbClient.connect(opts.url, (err, conn) => {
    if (err) return done(err)
    fastify.decorate('db', conn)
    done()
  })
}

fastify.register(fp(dbPlugin), { url: 'https://fastify.example' })
fastify.register(require('your-plugin'), parent => {
  return { connection: parent.db, otherOption: 'foo-bar' }
})
```

### ESM support

ESM is supported from Node.js `v13.3.0` and above:

```js
// plugin.mjs
async function plugin (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    return { hello: 'world' }
  })
}

export default plugin
```

### Handle errors

`after` registers a callback executed just after a `register`, taking up to three parameters (error; error + done; error + top-level context + done):

```js
fastify
  .register(require('./database-connector'))
  .after(err => {
    if (err) throw err
  })
```

### Custom errors

Use [`@fastify/error`](https://github.com/fastify/fastify-error) to generate consistent custom error objects:

```js
const createError = require('@fastify/error')
const CustomError = createError('ERROR_CODE', 'message')
console.log(new CustomError())
```

### Emit Warnings

Use [`process-warning`](https://github.com/fastify/process-warning) to deprecate an API or warn about a use case:

```js
const warning = require('process-warning')()
warning.create('MyPluginWarning', 'MP_ERROR_CODE', 'message')
warning.emit('MP_ERROR_CODE')
```

## Notes

- Real-world example plugins referenced by the guide: `@fastify/view`, `@fastify/mongodb`, `@fastify/multipart`, `@fastify/helmet`.
- The upstream guide's `dbPlugin` snippet ignores the `err` argument; it is adapted here to propagate connection errors through `done(err)` so a failed connection fails the boot instead of decorating `undefined`.

## Related

- [plugins](./plugins.md)
- [encapsulation](./encapsulation.md)
- [decorators](./decorators.md)
- [fastify-plugin](./fastify-plugin.md)
- [write-plugin](./write-plugin.md)
