---
source: https://fastify.dev/docs/latest/Reference/Reply/
---

# Reply Methods

The second parameter of the handler function is `Reply`. This page covers status code, media type, header manipulation, and `Content-Type` shorthand methods.

## Signature / Usage

```js
fastify.get('/', options, function (request, reply) {
  // Your code
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ hello: 'world' })
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `.code(statusCode)` | Sets the status code. |
| `.status(statusCode)` | An alias for `.code(statusCode)`. |
| `.statusCode` | Read and set the HTTP status code (getter/setter alias of `.code()`). |
| `.mediaType` | The media type extracted from the `Content-Type` header; `undefined` if absent. |
| `.server` | A reference to the Fastify instance, scoped to the current encapsulation context. |
| `.header(key, value)` | Sets a response header. If `value` is omitted or `undefined`, it is coerced to `''`. |
| `.headers(object)` | Sets all the keys of the object as response headers; calls `.header()` under the hood. |
| `.getHeader(key)` | Retrieves the value of a previously set header. |
| `.getHeaders()` | Gets a shallow copy of all current response headers, including those set via raw `http.ServerResponse` (Fastify-set headers take precedence). |
| `.removeHeader(key)` | Removes the value of a previously set header. |
| `.hasHeader(key)` | Returns a boolean indicating if the specified header has been set. |
| `.writeEarlyHints(hints, callback)` | Sends an early hints informational response so the client can preload/preconnect resources while the final response is prepared. |
| `.type(contentType)` | Shortcut for `reply.header('Content-Type', contentType)`. |
| `.log` | The logger instance of the incoming request. It is the same instance as `request.log`, so every log line includes the request id. |
| `.request` | The `Request` object of the incoming request this reply belongs to. |
| `.routeOptions` | A read-only reference to the route options of the incoming request. It is the same object as `request.routeOptions`. |
| `.getDecorator(name)` | Returns the value of a reply decorator declared with `decorateReply`. If the decorator is a function, it is returned bound to the reply. Throws `FST_ERR_DEC_UNDECLARED` if the decorator has not been declared. |

## Notes

- Header values must be properly encoded using `encodeURI` or a module such as `encodeurl`; invalid characters result in a 500 `TypeError` response.
- Multiple `.header('set-cookie', value)` calls each send a separate cookie rather than replacing the previous value. The browser only considers the latest reference of a key for `set-cookie`. To reset it, explicitly call `reply.removeHeader('set-cookie')`.
- If `Content-Type` has a JSON subtype and no charset parameter is set, `utf-8` is used by default; for other content types the charset must be set explicitly.

```js
reply.writeEarlyHints({
  Link: '</styles.css>; rel=preload; as=style'
})
```

### Reply properties and decorators

```js
fastify.addHook('onSend', async function (request, reply, payload) {
  reply.header('x-request-url', reply.request.url)
})
```

```js
fastify.get('/', function (request, reply) {
  reply.log.info('sending the response')
  reply.send({ hello: 'world' })
})
```

```js
fastify.get('/', { config: { foo: 'bar' } }, function (request, reply) {
  reply.send(reply.routeOptions.config.foo) // bar
})
```

```js
fastify.decorateReply('helper', function () {
  return this.statusCode
})

fastify.get('/', function (request, reply) {
  const helper = reply.getDecorator('helper')
  reply.code(201).send({ statusCode: helper() }) // { statusCode: 201 }
})
```

- Source: https://raw.githubusercontent.com/fastify/fastify/v5.12.8/docs/Reference/Reply.md (tag v5.12.8, fetched 2026-11-14)

## Related

- [request](./request.md)
- [reply-send](./reply-send.md)
- [reply-hijack-trailers](./reply-hijack-trailers.md)
