---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Your First Server

The minimal Fastify server: instantiate, declare a route, and listen.

## Signature / Usage

```js
// ESM
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

`async`/`await` is supported out-of-the-box:

```js
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```

## Notes

- The examples default to listening only on `127.0.0.1`. To listen on all IPv4 interfaces, pass `host: '0.0.0.0'` to `listen()`. Use `::1` for local-only IPv6 or `::` for all IPv6 (and, if the OS supports it, all IPv4) addresses.
- When deploying to a Docker container, use `0.0.0.0` or `::` to expose the application.
- With `0.0.0.0`, the `address` argument in the `listen()` callback is the first address the wildcard refers to.

## Related

- [first-plugin.md](./first-plugin.md)
- [request-payload.md](./request-payload.md)
- [serializing-data.md](./serializing-data.md)
