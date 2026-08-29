---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Basic Server

Create and start a minimal Fastify server with a single route (ESM and CJS variants).

```js
// ESM
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

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

```js
// CommonJS
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

## Notes

- ESM requires `"type": "module"` in `package.json`.
- `logger: true` enables the built-in Pino logger from the start.
- Async handlers return the payload directly; callback-style handlers call `reply.send()`.
