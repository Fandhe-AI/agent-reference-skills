---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Your First Plugin

In Fastify, everything is a plugin. Routes are declared through `register`, which is the core mechanism for adding routes, plugins, and more, with predictable asynchronous bootstrapping.

## Signature / Usage

```js
// server.js
import Fastify from 'fastify'
import routes from './our-first-routes.js'

const fastify = Fastify({ logger: true })

fastify.register(routes)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

```js
// our-first-routes.js
async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

export default routes
```

A plugin needing asynchronous setup (e.g. a database connection) can be wrapped with `fastify-plugin` so its decorators and hooks are exposed to the parent scope:

```js
// our-db-connector.js
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/test_database'
  })
}

export default fastifyPlugin(dbConnector)
```

## Notes

- Fastify loads plugins in the order they are declared, and only proceeds to the next plugin once the current one has finished loading.
- Plugin loading starts when `fastify.listen()`, `fastify.inject()`, or `fastify.ready()` is called.
- The `decorate` API (used internally by plugins like `@fastify/mongodb`) adds custom objects to the Fastify instance so they are available everywhere, encouraging code reuse.
- See the plugins category (`plugins/`) for full details on encapsulation and `fastify-plugin`.

## Related

- [loading-order.md](./loading-order.md)
- [first-server.md](./first-server.md)
