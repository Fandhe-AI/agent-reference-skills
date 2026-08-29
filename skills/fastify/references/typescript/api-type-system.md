---
source: https://fastify.dev/docs/latest/Reference/TypeScript/
---

# API Type System Documentation

The full generic-parameter type system underlying the Fastify factory, instance, request/reply, plugin/register, logger, context, routing, content-type-parser, error, and hook types.

## Signature / Usage

```typescript
import fastify, { FastifyInstance } from 'fastify'

const f: FastifyInstance = fastify()
f.listen({ port: 8080 }, () => { console.log('running') })
```

Import styles:

| Style | Result |
|-------|--------|
| `import fastify from 'fastify'` | Types resolve, but not accessible via dot notation without destructuring |
| `import * as Fastify from 'fastify'` | Types accessible via dot notation |
| `const fastify = require('fastify')` | Valid at runtime, but types do not resolve |

## Options / Props

### Generics

| Name | Default | Constraints |
|------|---------|-------------|
| `RawServer` | `http.Server` | `http.Server`, `https.Server`, `http2.Http2Server`, `http2.Http2SecureServer` |
| `RawRequest` | `RawRequestDefaultExpression` | `http.IncomingMessage`, `http2.Http2ServerRequest` |
| `RawReply` | `RawReplyDefaultExpression` | `http.ServerResponse`, `http2.Http2ServerResponse` |
| `Logger` | `FastifyLoggerOptions` | — |
| `RawBody` | — (generic on content-type-parser methods) | `string \| Buffer` |

`RawServer` enforces the cascading of `RawRequest` and `RawReply` through dependent types.

### Fastify factory

| Name | Description |
|------|-------------|
| `fastify<RawServer, RawRequest, RawReply, Logger>(opts?: FastifyServerOptions): FastifyInstance` | Main entry point; creates HTTP/HTTPS/HTTP2 servers. Infers server type from `opts` via discriminant unions and overloads |
| `fastify.HTTPMethods` | Union: `'DELETE' \| 'GET' \| 'HEAD' \| 'PATCH' \| 'POST' \| 'PUT' \| 'OPTIONS'` |
| `fastify.RawServerBase` | Union: `http.Server \| https.Server \| http2.Http2Server \| http2.Http2SecureServer` |
| `fastify.RawServerDefault` | Alias for `http.Server` |
| `fastify.FastifyServerOptions<RawServer, Logger>` | Options object passed to `fastify()`; cascades `RawServer` and `Logger` |
| `fastify.FastifyInstance<RawServer, RawRequest, RequestGeneric, Logger>` | The server object returned by `fastify()`; extensible via `decorate` + declaration merging |

### Request / Reply

| Name | Description |
|------|-------------|
| `fastify.FastifyRequest<RequestGeneric, RawServer, RawRequest>` | Request object properties, independent of HTTP/HTTP2. Custom properties added via `decorateRequest()` require declaration merging on this interface |
| `fastify.RequestGenericInterface` | Named properties `Body`, `Querystring`, `Params`, `Headers` (all default `unknown`) |
| `fastify.RawRequestDefaultExpression<RawServer>` | `http.IncomingMessage` for HTTP/HTTPS, `http2.Http2ServerRequest` for HTTP2 |
| `fastify.FastifyReply<RequestGeneric, RawServer, RawRequest, RawReply, ContextConfig>` | Reply object properties added on top of the Node.js response. Custom properties via `decorateReply()` require declaration merging |
| `fastify.RawReplyDefaultExpression<RawServer>` | `http.ServerResponse` for HTTP/HTTPS, `http2.Http2ServerResponse` for HTTP2 |

### Plugin / Register

| Name | Description |
|------|-------------|
| `fastify.FastifyPluginCallback<Options>` | Interface for callback-style plugin functions used in `fastify.register()` |
| `fastify.FastifyPluginAsync<Options>` | Interface for async/promise-style plugin functions used in `fastify.register()` |
| `fastify.FastifyPlugin<Options>` | Deprecated in favor of `FastifyPluginCallback`/`FastifyPluginAsync` — does not properly infer types for async functions |
| `fastify.FastifyPluginOptions` | Loosely-typed base interface to constrain a plugin's `options` parameter |
| `fastify.FastifyRegister(plugin, opts)` | Type for `fastify.register()`; infers `Options` from the plugin parameter, adds `prefix: string` and `logLevel: LogLevel` to the options intersection |
| `fastify.FastifyRegisterOptions` | Intersection of the plugin's `Options` generic and `{ prefix?: string; logLevel?: LogLevel }`; can also be a function returning that intersection |

```typescript
const server = fastify()

const plugin: FastifyPluginCallback<{
  option1: string;
  option2: boolean;
}> = function (instance, opts, done) { }

server.register(plugin, {}) // Error - options object is missing required properties
server.register(plugin, { option1: '', option2: true }) // OK
```

### Logger

| Name | Description |
|------|-------------|
| `fastify.FastifyLoggerOptions<RawServer, RawRequest, RawReply>` | Internal Fastify logger interface, emulative of Pino |
| `fastify.FastifyLogFn` | Overload function interface implementing the two call shapes Fastify uses for log methods |
| `fastify.LogLevel` | Union: `'info' \| 'error' \| 'debug' \| 'fatal' \| 'warn' \| 'trace'` |

### Context

| Name | Description |
|------|-------------|
| `fastify.FastifyRequestContext` | Interface with a required `config` property (default `unknown`), specifiable via generic or overload |
| `fastify.FastifyReplyContext` | Same shape as `FastifyRequestContext`, for the reply side |

### Routing

| Name | Description |
|------|-------------|
| `fastify.RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>` | Route handler signature `(request, reply) => void \| Promise<any>` |
| `fastify.RouteOptions<...>` | Extends `RouteShorthandOptions` with required `method`, `url`, `handler` |
| `fastify.RouteShorthandMethod<RawServer, RawRequest, RawReply>` | Overloaded interface backing `.get`/`.post`/etc. |
| `fastify.RouteShorthandOptions<...>` | All-optional base options shared by `RouteOptions` and `RouteShorthandOptionsWithHandler` |
| `fastify.RouteShorthandOptionsWithHandler<...>` | `RouteShorthandOptions` plus a required `handler: RouteHandlerMethod` |

### Parsers

| Name | Description |
|------|-------------|
| `RawBody` | `string \| Buffer` generic used by content-type-parser types |
| `fastify.FastifyBodyParser<RawBody, RawServer, RawRequest>` | Body parser function type, typed via the `RawBody` generic |
| `fastify.FastifyContentTypeParser<RawServer, RawRequest>` | Body parser function type, typed via the `RawRequest` generic |
| `fastify.AddContentTypeParser<RawServer, RawRequest>` | Overloaded interface for `addContentTypeParser`; uses `FastifyBodyParser` when `opts.parseAs` is set, else `FastifyContentTypeParser` |
| `fastify.hasContentTypeParser` | Checks whether a parser is registered for a given content type |

### Errors

| Name | Description |
|------|-------------|
| `fastify.FastifyError` | Extends Node's `Error` with optional `statusCode: number` and `validation: ValidationResult[]` |
| `fastify.ValidationResult` | Result shape from the internal Ajv validator, attached to `FastifyError.validation` |

### Hooks

All hook handler types share the generics `<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>` (or `<..., Logger>` for `onRegister`/`onClose`).

| Name | Order | Description |
|------|-------|-------------|
| `fastify.onRequestHookHandler` | 1 | First hook; `request.body` is always `null` here |
| `fastify.preParsingHookHandler` | 2 | `request.body` still `null`; returned stream should carry `receivedEncodedLength` |
| `fastify.preValidationHookHandler` | 3 | Runs before schema validation |
| `fastify.preHandlerHookHandler` | 4 | Runs before the route handler |
| `fastify.preSerializationHookHandler<PreSerializationPayload, ...>` | 5 | Not called if payload is a string, Buffer, stream, or null |
| `fastify.onSendHookHandler<OnSendPayload, ...>` | 6 | May only change payload to a string, Buffer, stream, or null |
| `fastify.onResponseHookHandler` | 7 (last) | Runs after the response is sent; cannot send more data to the client |
| `fastify.onErrorHookHandler` | — | For logging/headers on error only; not for changing the error; runs before the custom error handler |
| `fastify.onRouteHookHandler` | — | Synchronous; fires when a route is registered, receives `RouteOptions & { path, prefix }` |
| `fastify.onRegisterHookHandler` | — | Fires when a new encapsulation context is created; not called for plugins wrapped in `fastify-plugin` |
| `fastify.onCloseHookHandler` | — | Fires on `fastify.close()`, useful for shutting down external connections |

## Notes

- `FastifyPlugin` (unparameterized) is deprecated; use `FastifyPluginCallback` or `FastifyPluginAsync` instead, since `FastifyPlugin` cannot correctly infer types for async functions.
- `FastifyRequestContext` / `FastifyReplyContext` are documented upstream as potentially incomplete.
- `onErrorHookHandler`'s `done` callback does not accept an error argument, unlike the other lifecycle hooks.

## Related

- [Using Generics for Route Types](./route-generics.md)
- [Creating a TypeScript Fastify Plugin](./plugin-typing.md)
- [Code Completion Tips](./code-completion-tips.md)
