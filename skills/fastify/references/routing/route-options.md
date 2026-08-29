---
source: https://fastify.dev/docs/latest/Reference/Routes/
---

# Route Options

The route methods configure the endpoints of the application. Routes can be declared using the shorthand method or the full declaration. `fastify.route(options)` is Fastify's full declaration method for configuring a route endpoint.

## Signature / Usage

```js
fastify.route(options)
```

```js
fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `method` | `string \| string[]` | Currently supports `GET`, `HEAD`, `TRACE`, `DELETE`, `OPTIONS`, `PATCH`, `PUT` and `POST`. To accept more methods, `addHttpMethod` (see Server) must be used. Could also be an array of methods. |
| `url` | `string` | The path of the URL to match this route (alias: `path`). |
| `schema` | `object` | An object containing the schemas for the request and response, in JSON Schema format. Sub-keys: `body` (validates POST/PUT/PATCH/TRACE/SEARCH/PROPFIND/PROPPATCH/LOCK bodies), `querystring`/`query` (validates the querystring), `params` (validates the params), `response` (filter and generate a schema for the response; setting a schema allows 10-20% more throughput). |
| `exposeHeadRoute` | `boolean` | Creates a sibling `HEAD` route for any `GET` routes. Defaults to the value of `exposeHeadRoutes` instance option. If a custom `HEAD` handler is wanted without disabling this option, define it before the `GET` route. |
| `attachValidation` | `boolean` | Attach `validationError` to request, if there is a schema validation error, instead of sending the error to the error handler. Default error format follows the Ajv error-objects format. |
| `onRequest(request, reply, done)` | `function \| function[]` | Called as soon as a request is received. |
| `preParsing(request, reply, payload, done)` | `function \| function[]` | Called before parsing the request. |
| `preValidation(request, reply, done)` | `function \| function[]` | Called after the shared `preValidation` hooks, useful for route-level authentication for example. |
| `preHandler(request, reply, done)` | `function \| function[]` | Called just before the request handler. |
| `preSerialization(request, reply, payload, done)` | `function \| function[]` | Called just before the serialization. |
| `onSend(request, reply, payload, done)` | `function \| function[]` | Called right before a response is sent. |
| `onResponse(request, reply, done)` | `function \| function[]` | Called when a response has been sent; no more data can be sent to the client. |
| `onTimeout(request, reply, done)` | `function \| function[]` | Called when a request is timed out and the HTTP socket has been hung up. |
| `onError(request, reply, error, done)` | `function \| function[]` | Called when an Error is thrown or sent to the client by the route handler. |
| `handler(request, reply)` | `function` | The function that will handle this request. The Fastify server is bound to `this`; using an arrow function breaks the binding of `this`. |
| `errorHandler(error, request, reply)` | `function` | Custom error handler for the scope of the request. Overrides the default error global handler and anything set by `setErrorHandler` for requests to the route. Access the default handler via `instance.errorHandler`. |
| `childLoggerFactory(logger, binding, opts, rawReq)` | `function` | Custom factory function called to produce a child logger instance for every request. Overrides the default logger factory and anything set by `setChildLoggerFactory` for requests to the route. |
| `validatorCompiler({ schema, method, url, httpPart })` | `function` | Function that builds schemas for request validations. |
| `serializerCompiler({ schema, method, url, httpStatus, contentType })` | `function` | Function that builds schemas for response serialization. |
| `schemaErrorFormatter(errors, dataVar)` | `function` | Function that formats the errors from the validation compiler. Overrides the global schema error formatter handler, and anything set by `setSchemaErrorFormatter`, for requests to the route. |
| `bodyLimit` | `number` | Prevents the default JSON body parser from parsing request bodies larger than this number of bytes. Must be an integer. Defaults to `1048576` (1 MiB). May also be set globally when first creating the Fastify instance. |
| `handlerTimeout` | `number` | Maximum number of milliseconds for the route's full lifecycle. Overrides the server-level `handlerTimeout`. Must be a positive integer. When the timeout fires, `request.signal` is aborted and a 503 error is sent through the (customizable) error handler. |
| `logLevel` | `string` | Custom log level for this route. |
| `logSerializers` | `object` | Custom serializers to log for this route. |
| `config` | `object` | Object used to store custom configuration. |
| `version` | `string` | A semver-compatible string that defines the version of the endpoint. |
| `constraints` | `object` | Defines route restrictions based on request properties or values, enabling customized matching using find-my-way constraints. Includes built-in `version` and `host` constraints, with support for custom constraint strategies. |
| `prefixTrailingSlash` | `'both' \| 'slash' \| 'no-slash'` | Determines how to handle passing `/` as a route with a prefix. `both` (default) registers both `/prefix` and `/prefix/`; `slash` registers only `/prefix/`; `no-slash` registers only `/prefix`. Does not override `ignoreTrailingSlash` in Server configuration. |
| `request` | — | See Request reference. |
| `reply` | — | See Reply reference. |

## Notes

- The documentation for `onRequest`, `preParsing`, `preValidation`, `preHandler`, `preSerialization`, `onSend`, and `onResponse` is detailed in Hooks. To send a response before the request is handled by the `handler`, see "Respond to a request from a hook" in Hooks.
- `Router` / `route` は `hono`（Web Standards JS）・`go-echo`（Go）・`fandhe-backend`（Rust）・`react-router` / `tanstack-router`（クライアント側）とは別物。ここは Fastify の find-my-way ベースのサーバールーティング。

## Related

- [shorthand-declaration.md](./shorthand-declaration.md)
- [url-parameters.md](./url-parameters.md)
- [constraints-versioning.md](./constraints-versioning.md)
- [route-config-log-level.md](./route-config-log-level.md)
