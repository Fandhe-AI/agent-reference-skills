---
source: https://fastify.dev/docs/latest/Reference/Routes/
---

# Custom Log Level, Log Serializer, and Config

Fastify lets routes (and plugins) override the global log level and serializers, and lets a route carry a custom `config` object retrievable in the handler.

## Signature / Usage

Custom log level, at plugin or route level:

```js
// server.js
const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/user'), { logLevel: 'warn' })
fastify.register(require('./routes/events'), { logLevel: 'debug' })

fastify.listen({ port: 3000 })
```

```js
fastify.get('/', { logLevel: 'warn' }, (request, reply) => {
  reply.send({ hello: 'world' })
})
```

Custom log serializers, at plugin level:

```js
const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/user'), {
  logSerializers: {
    user: (value) => `My serializer one - ${value.name}`
  }
})
fastify.register(require('./routes/events'), {
  logSerializers: {
    user: (value) => `My serializer two - ${value.name} ${value.surname}`
  }
})

fastify.listen({ port: 3000 })
```

Serializers can be inherited by context:

```js
const fastify = Fastify({
  logger: {
    level: 'info',
    serializers: {
      user (req) {
        return {
          method: req.method,
          url: req.url,
          headers: { 'user-agent': req.headers['user-agent'] },
          host: req.host,
          remoteAddress: req.ip,
          remotePort: req.socket.remotePort
        }
      }
    }
  }
})

fastify.register(context1, {
  logSerializers: {
    user: value => `My serializer father - ${value}`
  }
})

async function context1 (fastify, opts) {
  fastify.get('/', (req, reply) => {
    req.log.info({ user: 'call father serializer', key: 'another key' })
    // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
    reply.send({})
  })
}

fastify.listen({ port: 3000 })
```

Route `config`:

```js
// server.js
const fastify = require('fastify')()

function handler (req, reply) {
  reply.send(reply.routeOptions.config.output)
}

fastify.get('/en', { config: { output: 'hello world!' } }, handler)
fastify.get('/it', { config: { output: 'ciao mondo!' } }, handler)

fastify.listen({ port: 3000 })
```

## Notes

- If a route `logLevel` is invalid, Fastify throws `FST_ERR_ROUTE_LOG_LEVEL_INVALID` during route registration.
- Setting `logLevel` at the plugin level also affects `setNotFoundHandler` and `setErrorHandler`.
- The custom log level applies only to routes, not to the global Fastify logger accessible with `fastify.log`.
- Do not log `req.headers` wholesale — it contains `Authorization` / `Cookie`; the upstream example is narrowed here. Prefer Pino `redact` for anything sensitive that must be logged.

## Related

- [route-options.md](./route-options.md)
