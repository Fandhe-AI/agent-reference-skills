# Mount Middleware

Mounts an application built with another framework into a Hono application.

## Signature / Usage

```ts
import { Hono } from 'hono'
import { mount } from 'hono/mount'
import { Router as IttyRouter } from 'itty-router'

// Create itty-router application
const ittyRouter = IttyRouter()

// Handle `GET /itty-router/hello`
ittyRouter.get('/hello', () => new Response('Hello from itty-router'))

const app = new Hono()

app.all('/itty-router/*', mount(ittyRouter.handle))
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `optionHandler` | `(c: Context) => unknown` | No | Returns the arguments passed to the mounted application after the `Request`. An array is spread into multiple arguments. |
| `replaceRequest` | `((originalRequest: Request) => Request) \| false` | No | Controls which `Request` is passed to the mounted application. `false` passes the original `Request` unchanged (shorthand for `(req) => req`). |

```ts
// Call `anotherApp(request, c.env)`
app.all('/app/*', mount(anotherApp, (c) => c.env))

// Call `anotherApp(request, c.env, c.executionCtx)`
app.all(
  '/app/*',
  mount(anotherApp, { optionHandler: (c) => [c.env, c.executionCtx] })
)

// `/legacy/users` reaches the mounted application as `/api/users`
app.all(
  '/legacy/*',
  mount(anotherApp, {
    replaceRequest: (req) => {
      const url = new URL(req.url)
      url.pathname = url.pathname.replace(/^\/legacy/, '/api')
      return new Request(url, req)
    },
  })
)
```

## Notes

- The second argument is either a function (treated as `optionHandler`) or an options object.
- Register it with `app.all()` on a path that ends with `/*`.
- By default the mounted application receives a new `Request` with the matched path prefix removed from its URL (`/itty-router/hello` reaches itty-router as `/hello`).
- The mounted application is called as `handler(request, c.env, c.executionCtx)`, the same arguments as a Cloudflare Workers `fetch` handler.
- Source: https://hono.dev/docs/middleware/builtin/mount (honojs/website@7838d779); implementation: https://github.com/honojs/hono/blob/v4.13.13/src/middleware/mount/index.ts

## Related

- [Combine](./combine.md)
