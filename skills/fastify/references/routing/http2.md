---
source: https://fastify.dev/docs/latest/Reference/HTTP2/
---

# HTTP/2

Fastify supports HTTP/2 over HTTPS (h2) or plaintext (h2c). Currently, none of the HTTP/2-specific APIs are available through Fastify, but Node's `req` and `res` can be accessed through the `Request` and `Reply` interfaces.

## Signature / Usage

Secure (HTTPS) — HTTP/2 is supported in all modern browsers only over a secure connection:

```js
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
  }
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

ALPN negotiation enables both HTTPS and HTTP/2 over the same socket. Node core `req` and `res` objects can be either HTTP/1 or HTTP/2. Fastify supports both out of the box via `allowHTTP1`:

```js
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const fastify = require('fastify')({
  http2: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
  }
})

// This route can be accessed through both protocols
fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

Test the server with `npx h2url https://localhost:3000`.

Plain or insecure — for microservices, HTTP/2 can connect in plain text (h2c), but this is not supported by browsers:

```js
'use strict'

const fastify = require('fastify')({
  http2: true
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

Test the server with `npx h2url http://localhost:3000`.

## Notes

- None of the HTTP/2-specific APIs are exposed through Fastify's `Request`/`Reply`; only the underlying Node `req`/`res` objects are reachable.

## Related

- [route-options.md](./route-options.md)
