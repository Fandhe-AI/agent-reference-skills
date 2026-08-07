# Method Not Allowed Middleware

Responds with `405 Method Not Allowed` (instead of the default `404`) when a request path is registered but the HTTP method used is not supported.

## Signature / Usage

```ts
import { Hono } from 'hono'
import { methodNotAllowed } from 'hono/method-not-allowed'

const app = new Hono()
app.use(methodNotAllowed({ app }))
app.get('/hello', (c) => c.text('Hello!'))
app.post('/hello', (c) => c.text('Posted!'))

// PUT /hello -> 405 with an `Allow` header listing GET, POST
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `app` | `Hono` | Yes | The Hono application instance used to collect the allowed methods for a path |
| `onMethodNotAllowed` | `Function` | No | Custom response handler receiving the context and the array of allowed methods |

## Notes

- The default response automatically includes an `Allow` header listing the supported methods for the matched path.
- Use `onMethodNotAllowed` to customize the response (e.g. return JSON) instead of the default plain response.
- Requires the app instance to introspect registered routes, similar to `methodOverride`.
