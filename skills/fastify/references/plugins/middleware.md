---
source: https://fastify.dev/docs/latest/Reference/Middleware/
---

# Middleware

As of Fastify v3.0.0, Express-style middleware is not supported out of the box and requires an external plugin such as `@fastify/express` or `@fastify/middie`. Target version: v5.12.1.

## Signature / Usage

```js
await fastify.register(require('@fastify/express'))
fastify.use(require('cors')())
fastify.use(require('dns-prefetch-control')())
fastify.use(require('frameguard')())
fastify.use(require('hsts')())
fastify.use(require('ienoopen')())
fastify.use(require('x-xss-protection')())
```

`@fastify/middie` provides simple Express-style middleware support with improved performance:

```js
await fastify.register(require('@fastify/middie'))
fastify.use(require('cors')())
```

Middleware can be encapsulated using `register`, which controls where it runs (see [plugins-guide](./plugins-guide.md)).

### Restrict Middleware Execution to Certain Paths

Pass the path as the first argument to `use` to restrict middleware to specific paths. This does not support routes with parameters (e.g. `/user/:id/comments`); wildcards are not supported in multiple paths.

```js
const path = require('node:path')
const serveStatic = require('serve-static')

// Single path
fastify.use('/css', serveStatic(path.join(__dirname, '/assets')))

// Wildcard path
fastify.use('/css/(.*)', serveStatic(path.join(__dirname, '/assets')))

// Multiple paths
fastify.use(['/css', '/js'], serveStatic(path.join(__dirname, '/assets')))
```

## Notes

- In Fastify, hooks are the first-class extension mechanism; Express-style middleware is a compatibility layer via `@fastify/middie` / `@fastify/express` and runs only in the `onRequest` phase. Not the same concept as `hono` / `go-echo` / Next.js middleware.
- Fastify wraps the incoming Node.js `req` and `res` objects into `Request` and `Reply` instances after the middleware phase; middleware therefore does not have access to `reply.send()` or other Fastify-specific `Reply` methods. Use the Node.js `req`/`res` objects in middleware, or use the `preHandler` hook for access to Fastify's `Request`/`Reply` instances.
- Fastify offers native alternatives to common middleware: `@fastify/helmet` for `helmet`, `@fastify/cors` for `cors`, and `@fastify/static` for `serve-static`.

## Related

- [plugins](./plugins.md)
- [plugins-guide](./plugins-guide.md)
