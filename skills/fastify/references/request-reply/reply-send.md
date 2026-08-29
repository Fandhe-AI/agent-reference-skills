---
source: https://fastify.dev/docs/latest/Reference/Reply/
---

# Reply.send()

`.send(data)` transmits the payload to the end user. The accepted payload types determine how the response is serialized and what `Content-Type` is applied by default.

## Signature / Usage

```js
fastify.get('/json', options, function (request, reply) {
  reply.send({ hello: 'world' })
})
```

## Options / Props

| Payload type | Behavior |
|------|-------------|
| Objects | Serialized via [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify) if an output schema is set, otherwise `JSON.stringify()`. |
| Strings | Sent as `text/plain; charset=utf-8` unless `Content-Type` is set. If `Content-Type` is set, serialized with a custom serializer if one is configured, otherwise sent unmodified (even for `application/json`). |
| Streams | Default `Content-Type` becomes `application/octet-stream` if unset; treated as pre-serialized, sent unmodified without response validation. |
| Buffers | Default `Content-Type` becomes `application/octet-stream` if unset; pre-serialized, sent unmodified. |
| TypedArrays | Managed like a Buffer; default `Content-Type` becomes `application/octet-stream` if unset. |
| ReadableStream | Treated identically to a Node stream; pre-serialized, sent unmodified. |
| Response | Web API `Response` object; status code and headers are readonly and do not reflect back into `reply.statusCode` / `reply.getHeaders()`. Payload is pre-serialized. |
| Errors | See [reply-errors](./reply-errors.md). |

### Strings

```js
fastify.get('/json-string', async function (request, reply) {
  reply
    .type('application/json; charset=utf-8')
    .serializer(JSON.stringify)
    .send('Hello') // Returns "Hello" (JSON-encoded string)
})
```

### Streams

```js
const fs = require('node:fs')

fastify.get('/streams', async function (request, reply) {
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.header('Content-Type', 'application/octet-stream')
  return reply.send(stream)
})
```

### ReadableStream

```js
const fs = require('node:fs')
const { ReadableStream } = require('node:stream/web')

fastify.get('/streams', function (request, reply) {
  const stream = fs.createReadStream('some-file')
  reply.header('Content-Type', 'application/octet-stream')
  reply.send(ReadableStream.from(stream))
})
```

### Response

```js
fastify.get('/streams', function (request, reply) {
  const stream = fs.createReadStream('some-file')
  const readableStream = ReadableStream.from(stream)
  const response = new Response(readableStream, {
    status: 200,
    headers: { 'content-type': 'application/octet-stream' }
  })
  reply.send(response)
})
```

### Async-Await and Promises

Fastify natively handles promises and supports async-await.

```js
fastify.get('/async-await', options, async function (request, reply) {
  await delay(200)
  return { hello: 'world' }
})
```

Rejected promises default to a `500` HTTP status code. Reject the promise, or `throw` in an `async function`, with an object that has `statusCode` (or `status`) and `message` properties to modify the reply:

```js
fastify.get('/teapot', async function (request, reply) {
  const err = new Error()
  err.statusCode = 418
  err.message = 'short and stout'
  throw err
})
```

### .then(fulfilled, rejected)

A `Reply` object can be awaited upon: `await reply` waits until the reply is sent (calls `reply.then()`). `fulfilled` is called when the response has been fully sent; `rejected` is called if the underlying stream had an error (e.g. the socket was destroyed).

## Notes

- When sending streams over HTTP/2, Fastify does not alter chunks emitted by the stream; split very large chunks in application code if needed.
- The final payload type (after serialization and `onSend` hooks) must be one of: `string`, `Buffer`, `stream`, `undefined`, `null` — otherwise an error is thrown.
- TypedArrays/Buffers/streams are considered pre-serialized and skip response validation.

## Related

- [reply-methods](./reply-methods.md)
- [reply-serialization](./reply-serialization.md)
- [reply-errors](./reply-errors.md)
