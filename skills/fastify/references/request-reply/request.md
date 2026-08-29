---
source: https://fastify.dev/docs/latest/Reference/Request/
---

# Request

The first parameter of the handler function is `Request`. Request is a core Fastify object exposing the incoming HTTP request's data, scoped to the current encapsulation context.

## Signature / Usage

```js
fastify.post('/:params', options, function (request, reply) {
  // Destructure to reference the available properties; avoid logging
  // request.body / request.headers / request.raw wholesale (see Notes).
  const { body, query, params, headers } = request
  console.log(request.server)
  console.log(request.id)
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.host)
  console.log(request.hostname)
  console.log(request.port)
  console.log(request.protocol)
  console.log(request.url)
  console.log(request.routeOptions.method)
  console.log(request.routeOptions.bodyLimit)
  console.log(request.routeOptions.handlerTimeout)
  console.log(request.routeOptions.url)
  console.log(request.routeOptions.attachValidation)
  console.log(request.routeOptions.logLevel)
  console.log(request.routeOptions.version)
  console.log(request.routeOptions.exposeHeadRoute)
  console.log(request.routeOptions.prefixTrailingSlash)
  console.log(request.routeOptions.config)
  request.log.info({ url: request.url, method: request.method }, 'incoming')
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `query` | The parsed querystring, its format is specified by `querystringParser`. |
| `body` | The request payload, see Content-Type Parser for details on what request payloads Fastify natively parses and how to support other content types. |
| `params` | The params matching the URL. Values are percent-decoded (for example `%20` becomes a space, and `%2f` becomes `/`). Decoded values may contain `.`, `..`, `/`, or other characters; treat them as untrusted input. |
| `headers` | The headers getter and setter. |
| `raw` | The incoming HTTP request from Node core. |
| `server` | The Fastify server instance, scoped to the current encapsulation context. |
| `id` | The request ID. |
| `log` | The logger instance of the incoming request. |
| `ip` | The IP address of the incoming request. Taken from `socket.remoteAddress` (or from `X-Forwarded-For` when `trustProxy` is enabled). |
| `ips` | An array of IP addresses, ordered from closest to furthest, from `X-Forwarded-For` (only when `trustProxy` is enabled). |
| `host` | The host of the incoming request (derived from `X-Forwarded-Host` when `trustProxy` is enabled). For HTTP/2 compatibility, returns `:authority` if no host header exists. |
| `hostname` | The hostname parsed from `request.host`. |
| `port` | The port parsed from `request.host`, which may refer to the port the server is listening on. |
| `protocol` | The protocol of the incoming request (`https` or `http`). From `socket.encrypted` (or `X-Forwarded-Proto` when `trustProxy` is enabled). |
| `method` | The method of the incoming request. |
| `url` | The URL of the incoming request. |
| `originalUrl` | Similar to `url`, allows access to the original `url` in case of internal re-routing. |
| `mediaType` | The media type extracted from `Content-Type` header. `undefined` if the header is missing. |
| `is404` | `true` if request is being handled by 404 handler, `false` otherwise. |
| `socket` | The underlying connection of the incoming request. |
| `signal` | An `AbortSignal` that aborts when the handler timeout fires or the client disconnects. Created lazily on first access. Pass it to `fetch()`, database queries, or any API accepting a `signal` option. On timeout, `signal.reason` is the `FST_ERR_HANDLER_TIMEOUT` error; on client disconnect it is a generic `AbortError`. |
| `context` | Deprecated, use `request.routeOptions.config` instead. `context.config` accesses the route `config` object. |
| `routeOptions` | The route option object: `bodyLimit`, `handlerTimeout`, `config`, `method`, `url`, `handler`, `attachValidation`, `logLevel`, `schema`, `version`, `exposeHeadRoute`, `prefixTrailingSlash`. |
| `.getValidationFunction(schema \| httpPart)` | Returns a validation function for the specified schema or HTTP part, if set or cached. Returns `undefined` if none is found. Has an `errors` property populated after the last validation. |
| `.compileValidationSchema(schema, [httpPart])` | Compiles the specified schema and returns a validation function using the `SchemaController#ValidationCompiler`. Cached via a `WeakMap` keyed by schema reference. |
| `.validateInput(data, [schema \| httpPart], [httpPart])` | Validates `data` using the specified schema or HTTP part; returns `true`/`false`. If both `schema` and `httpPart` are given, `httpPart` takes precedence. |

### Headers

`request.headers` is a getter that returns an object with the headers of the incoming request. Custom headers can be set:

```js
request.headers = {
  'foo': 'bar',
  'baz': 'qux'
}
```

This adds new values accessible via `request.headers.foo` (and `request.headers.baz`). Standard request headers remain accessible via `request.raw.headers`. For performance reasons, `Symbol('fastify.RequestAcceptVersion')` may be added to headers on `not found` routes.

### .getValidationFunction(schema | httpPart)

```js
const validate = request.getValidationFunction({
  type: 'object',
  properties: { foo: { type: 'string' } }
})
console.log(validate({ foo: 'bar' })) // true
console.log(validate.errors) // null
```

### .compileValidationSchema(schema, [httpPart])

```js
const validate = request.compileValidationSchema({
  type: 'object',
  properties: { foo: { type: 'string' } }
}, 200)
console.log(validate({ hello: 'world' })) // false
console.log(validate.errors) // validation errors
```

Compiled functions are cached by schema reference. If schema properties need to change, create a new schema object rather than mutating the existing one, otherwise the cached (stale) validator is reused.

### .validateInput(data, [schema | httpPart], [httpPart])

```js
request.validateInput({ foo: 'bar' }, {
  type: 'object',
  properties: { foo: { type: 'string' } }
}) // true

request.validateInput({ hello: 'world' }, 'query') // false
```

## Notes

- The upstream example logs `request.headers` / `request.body` wholesale; it is narrowed here because those carry `Authorization`, `Cookie`, and user data — use Pino `redact` for anything sensitive that must be logged.
- The upstream doc's prose says the example's `set()` call adds a value "accessible via `request.headers.bar`", but the example assigns `foo` and `baz` keys (not `bar`); this appears to be an inconsistency in the upstream source, so the accessor names in the example above have been corrected to `foo` / `baz`.
- Security: `request.params`, `request.query`, `request.headers`, and `request.body` are untrusted network input. Route parameter values are percent-decoded before the handler runs, so a segment like `..%2ffile` becomes `../file` in `request.params`. Do not use parameter values as filesystem paths, template names, or redirect targets without validating or containing them. Prefer `@fastify/static` (or `reply.sendFile`) for serving files from a root directory.
- `request.ip`, `request.ips`, `request.host`, `request.hostname`, `request.port`, and `request.protocol` come from request metadata (socket and/or forwarding headers) and must also be treated as untrusted input if used in security-sensitive decisions.
- Schema validation may mutate the `request.headers` and `request.raw.headers` objects, causing them to become empty.
- **v4 → v5** (see Migration Guide V5): `request.connection` was already deprecated in v4 (`FSTDEP05`) and its replacement is `request.socket`:
  ```js
  // v4: req.connection.remoteAddress
  // v5: req.socket.remoteAddress
  ```
- In v4, `req.hostname` included both hostname and port (e.g. `localhost:1234`). In v5, Fastify aligned to the Node.js `URL` object: `req.host` now has the value `req.hostname` used to have in v4, `req.hostname` contains the hostname _without_ a port if a port is present, and `req.port` contains just the port number.
- The `request.params` object no longer inherits from `Object.prototype` (hardening against prototype pollution). Replace `req.params.hasOwnProperty('name')` with `Object.hasOwn(req.params, 'name')`:
  ```js
  // v4: req.params.hasOwnProperty('name')
  // v5: Object.hasOwn(req.params, 'name')
  ```

## Related

- [reply-methods](./reply-methods.md)
- [reply-send](./reply-send.md)
