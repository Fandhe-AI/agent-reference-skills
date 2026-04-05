# Trailing Slash Middleware

Redirects requests to normalize trailing slashes. Two functions are provided: `appendTrailingSlash` and `trimTrailingSlash`.

## Signature / Usage

```ts
import { appendTrailingSlash, trimTrailingSlash } from 'hono/trailing-slash'

// Redirect /about/me → /about/me/
const app = new Hono({ strict: true })
app.use(appendTrailingSlash())
app.get('/about/me/', (c) => c.text('With trailing slash'))

// Redirect /about/me/ → /about/me
const app2 = new Hono({ strict: true })
app2.use(trimTrailingSlash())
app2.get('/about/me', (c) => c.text('Without trailing slash'))
```

## Options / Props

Both functions accept the same options object.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `alwaysRedirect` | `boolean` | `false` | Redirect before route execution instead of waiting for a `404` response. Required for wildcard routes. |

## Notes

- By default, redirection only occurs when the response status is `404`.
- `alwaysRedirect: true` is needed for wildcard routes (`/my-path/*`) because those routes always match and never produce a `404`.
- Only applies to `GET` requests.
