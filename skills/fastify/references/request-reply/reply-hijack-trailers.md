---
source: https://fastify.dev/docs/latest/Reference/Reply/
---

# Reply Hijack, Trailers & Timing

`.hijack()` halts the normal request/response lifecycle for manual response handling; `.trailer()` sets response trailers; `.elapsedTime`, `.raw`, and `.sent` expose low-level state.

## Signature / Usage

```js
app.get('/', (req, reply) => {
  reply.hijack()
  reply.raw.end('hello world')

  return Promise.resolve('this will be skipped')
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `.elapsedTime` | Amount of time (ms) passed since the request was received by Fastify. |
| `.raw` | The Node core `http.ServerResponse`. Using it directly bypasses Fastify's response logic (at your own risk). |
| `.sent` | Boolean indicating whether `reply.send()` has been called. Also `true` after `reply.hijack()`. Directly modifying `.sent` is deprecated; use `.hijack()` instead. |
| `.hijack()` | Prevents Fastify from sending the response automatically and from running remaining hooks (and the user handler, if hijacked before it runs). Can be called any time before `reply.send()`. |
| `.trailer(key, function)` | Sets a response trailer — a header sent after the response body, useful for expensive-to-compute headers like `Server-Timing` or `Etag`. |
| `.hasTrailer(key)` | Returns a boolean indicating if the specified trailer has been set. |
| `.removeTrailer(key)` | Removes the value of a previously set trailer. |

```js
const milliseconds = reply.elapsedTime
```

```js
reply.trailer('server-timing', async function () {
  return 'db;dur=53, app;dur=47.2'
})

const { createHash } = require('node:crypto')
// trailer function also receives two arguments: reply, payload, done
reply.trailer('content-md5', function (reply, payload, done) {
  const hash = createHash('md5')
  hash.update(payload)
  done(null, hash.digest('hex'))
})
```

```js
reply.trailer('server-timing', async function () {
  return 'db;dur=53, app;dur=47.2'
})
reply.removeTrailer('server-timing')
reply.hasTrailer('server-timing') // false
```

## Notes

- `Transfer-Encoding: chunked` is automatically added once `.trailer()` is used — a hard requirement for trailers in Node.js.
- Any error passed to a trailer's `done` callback is ignored; enable `debug` level logging to inspect it.
- If `reply.raw` is used to send the response, `onResponse` hooks still execute.
- **v4 → v5** (see Migration Guide V5): `reply.getResponseTime()` was already deprecated in v4 (`FSTDEP20`) — use the `reply.elapsedTime` property instead:
  ```js
  // v4: reply.getResponseTime()
  // v5: reply.elapsedTime
  ```
- Setting `reply.sent = true` directly to suppress the automatic response was already deprecated in v4 (`FSTDEP010`) — use `reply.hijack()` instead:
  ```js
  // v4
  reply.sent = true
  reply.raw.end('hello')
  // v5
  reply.hijack()
  reply.raw.end('hello')
  ```
- Trailer functions were already deprecated in v4 (`FSTDEP013`) when declared as plain synchronous functions returning a value directly — v5 expects an `async` function (or the callback-based `done(err, value)` form is still available):
  ```js
  // v4
  reply.trailer('ETag', function (reply, payload) { return 'custom-etag' })
  // v5
  reply.trailer('ETag', async function (reply, payload) { return 'custom-etag' })
  ```

## Related

- [reply-methods](./reply-methods.md)
- [reply-send](./reply-send.md)
- [request](./request.md)
