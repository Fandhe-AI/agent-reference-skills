# Web Frameworks

Integrate pino with Fastify and Express for per-request structured HTTP logging.

```js
// --- Fastify (built-in, no extra package) ---
const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
  request.log.info('handling request')
  return { hello: 'world' }
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

// --- Express (requires pino-http) ---
// npm install pino-http
const express = require('express')
const pinoHttp = require('pino-http')

const app = express()
app.use(pinoHttp())

app.get('/', (req, res) => {
  req.log.info('something')
  res.send('hello world')
})

app.listen(3000)
```

## Notes

- Fastify ships pino as its built-in logger; pass `logger: true` (or a pino options object) to enable it.
- For Express, Node `http`, Hono, and H3 use the `pino-http` middleware package.
- `pino-http` binds a per-request child logger to `req.log`, including response time and status code automatically.
- Other adapters: `hapi-pino` (Hapi), `koa-pino-logger` (Koa), `nestjs-pino` (NestJS).
