---
source: https://fastify.dev/docs/latest/Reference/Hooks/
---

# Request/Reply Hooks

Target: Fastify v5.12.1. Ten hooks registered via `fastify.addHook` that run at fixed points of the request/response lifecycle, in order of execution: `onRequest`, `preParsing`, `preValidation`, `preHandler`, `preSerialization`, `onError`, `onSend`, `onResponse`, `onTimeout`, `onRequestAbort`.

Hooks are affected by Fastify's encapsulation and can be scoped to selected routes — see `hook-scope.md`. The `done` callback is not available when using `async`/`await` or returning a `Promise`; invoking `done` in that situation may cause duplicate handler invocation.

## Signature / Usage

### onRequest

```js
fastify.addHook('onRequest', (request, reply, done) => {
  // Some code
  done()
})

// async/await
fastify.addHook('onRequest', async (request, reply) => {
  await asyncMethod()
})
```

`request.body` is always `undefined` here, because body parsing happens before `preValidation`.

### preParsing

Transforms the request payload stream before it is parsed. Receives `request`, `reply`, and a stream with the current payload. If it returns a value, it must be a stream.

```js
fastify.addHook('preParsing', (request, reply, payload, done) => {
  // Some code
  done(null, newPayload)
})

// async/await
fastify.addHook('preParsing', async (request, reply, payload) => {
  await asyncMethod()
  return newPayload
})
```

`request.body` is still `undefined` here. The returned stream should carry a `receivedEncodedLength` property (used to match `Content-Length`), and its size is checked against the `bodyLimit` server option.

### preValidation

Changes the payload before it is validated.

```js
fastify.addHook('preValidation', (request, reply, done) => {
  request.body = { ...request.body, importantKey: 'randomString' }
  done()
})

// async/await
fastify.addHook('preValidation', async (request, reply) => {
  const importantKey = await generateRandomString()
  request.body = { ...request.body, importantKey }
})
```

### preHandler

Runs before the route's handler.

```js
fastify.addHook('preHandler', (request, reply, done) => {
  done()
})

// async/await
fastify.addHook('preHandler', async (request, reply) => {
  await asyncMethod()
})
```

### preSerialization

Changes (or replaces) the payload before it is serialized. Not called if the payload is a `string`, `Buffer`, `stream`, or `null`.

```js
fastify.addHook('preSerialization', (request, reply, payload, done) => {
  const newPayload = { wrapped: payload }
  done(null, newPayload)
})

// async/await
fastify.addHook('preSerialization', async (request, reply, payload) => {
  return { wrapped: payload }
})
```

### onError

```js
fastify.addHook('onError', (request, reply, error, done) => {
  done()
})

// async/await
fastify.addHook('onError', async (request, reply, error) => {
  // Useful for custom error logging; do not use this hook to change the error
})
```

Useful for custom error logging or adding a header on error. Not intended for changing the error — calling `reply.send` here will throw. Runs before the custom error handler set by `setErrorHandler`. Unlike other hooks, passing an error to `done` is not supported.

### onSend

Changes the payload, or clears it to send an empty body by replacing it with `null` (unlike `''`, `null` avoids setting `Content-Length: 0`).

```js
fastify.addHook('onSend', (request, reply, payload, done) => {
  const newPayload = payload.replace('some-text', 'some-new-text')
  done(null, newPayload)
})

// async/await
fastify.addHook('onSend', async (request, reply, payload) => {
  return payload.replace('some-text', 'some-new-text')
})
```

If you change the payload, it may only become a `string`, `Buffer`, `stream`, `ReadableStream`, `Response`, or `null`.

### onResponse

```js
fastify.addHook('onResponse', (request, reply, done) => {
  done()
})

// async/await
fastify.addHook('onResponse', async (request, reply) => {
  await asyncMethod()
})
```

Executed after the response has been sent — you cannot send more data to the client. Useful for sending stats to external services. Setting `disableRequestLogging: true` disables error logs inside this hook; use `try/catch` instead.

### onTimeout

```js
fastify.addHook('onTimeout', (request, reply, done) => {
  done()
})

// async/await
fastify.addHook('onTimeout', async (request, reply) => {
  await asyncMethod()
})
```

Executed when a request times out (socket-level, via `connectionTimeout`) and the HTTP socket has been hung up — you cannot send data to the client. For application-level per-route timeouts, see the `handlerTimeout` server option, which uses `request.signal` for cooperative cancellation.

### onRequestAbort

```js
fastify.addHook('onRequestAbort', (request, done) => {
  done()
})

// async/await
fastify.addHook('onRequestAbort', async (request) => {
  await asyncMethod()
})
```

Executed when a client closes the connection before the entire request has been processed — you cannot send data to the client. Client-abort detection is not completely reliable.

### Manage errors from a hook

```js
fastify.addHook('onRequest', (request, reply, done) => {
  done(new Error('Some error'))
})

fastify.addHook('preHandler', (request, reply, done) => {
  reply.code(400)
  done(new Error('Some error'))
})

// async/await
fastify.addHook('onRequest', async (request, reply) => {
  throw new Error('Some error')
})
```

Passing an error to `done()` makes Fastify automatically close the request and send the appropriate error response.

### Respond to a request from a hook

Replying from a hook stops the hook chain — remaining hooks and handlers do not run. For callback-style hooks, call `reply.send()` and skip calling `done`. For `async` hooks, `reply.send()` must be called before the function returns/resolves, and you must `return reply` so the request is not executed further. Do not mix callbacks and `async`/`Promise` in the same hook — it causes the chain to run twice.

```js
fastify.addHook('onRequest', (request, reply, done) => {
  reply.send('Early response')
})

fastify.addHook('preHandler', async (request, reply) => {
  setTimeout(() => {
    reply.send({ hello: 'from prehandler' })
  })
  return reply // mandatory, so the request is not executed further
})
```

If you want to respond with a stream, avoid using an `async` function for the hook (if you must use `async`, follow the pattern in Fastify's `test/hooks-async.js`):

```js
fastify.addHook('onRequest', (request, reply, done) => {
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.send(stream)
})
```

## Options / Props

| Hook | Handler args | Runs |
|------|--------------|------|
| `onRequest` | `(request, reply, done)` | After routing, before body parsing (`request.body` is `undefined`) |
| `preParsing` | `(request, reply, payload, done)` | Before body parsing |
| `preValidation` | `(request, reply, done)` | Before schema validation |
| `preHandler` | `(request, reply, done)` | Before the route handler |
| `preSerialization` | `(request, reply, payload, done)` | Before payload serialization |
| `onError` | `(request, reply, error, done)` | On error, before `setErrorHandler` |
| `onSend` | `(request, reply, payload, done)` | Before sending the response |
| `onResponse` | `(request, reply, done)` | After the response has been sent |
| `onTimeout` | `(request, reply, done)` | On socket-level `connectionTimeout` |
| `onRequestAbort` | `(request, done)` | On client-initiated connection close |

## Notes

- All ten hooks (except `onClose`, which is an application hook) are encapsulated — see `hook-scope.md`.

## Related

- [lifecycle.md](./lifecycle.md)
- [application-hooks.md](./application-hooks.md)
- [route-level-hooks.md](./route-level-hooks.md)
- [hook-scope.md](./hook-scope.md)
