# NextResponse

`NextResponse` extends the Web Response API with additional convenience methods, primarily for Proxy/middleware and Route Handlers.

## Signature / Usage

```ts
import { NextResponse } from 'next/server'

return NextResponse.redirect(new URL('/new', request.url))
```

## Options / Props

### `cookies`

| Method | Description |
| --- | --- |
| `set(name, value)` | Sets a cookie on the response. |
| `get(name)` | Returns the (first) cookie value, or `undefined`. |
| `getAll(name?)` | Returns all matching cookies, or all cookies if no name given. |
| `has(name)` | Returns whether the cookie exists. |
| `delete(name)` | Deletes the cookie; returns `true` if deleted. |

### Static methods

| Method | Description |
| --- | --- |
| `json(body, init?)` | Produces a response with the given JSON body. |
| `redirect(url, init?)` | Produces a redirect response to the given URL. |
| `rewrite(url)` | Produces a response that rewrites (proxies) to a URL while preserving the original URL in the browser. |
| `next(options?)` | Continues routing (for Proxy); accepts `{ request: { headers } }` to forward modified request headers upstream. |

## Notes

- `NextResponse.next({ headers })` (response headers) is discouraged — it can override framework-managed headers (e.g. `Content-Type` for Server Actions), breaking submissions/streaming. Use `NextResponse.next({ request: { headers } })` to forward headers upstream instead.
- Avoid copying all incoming request headers when forwarding upstream; use an allow-list to prevent leaking sensitive headers (e.g. `authorization`, `cookie`, custom `x-*`) to clients or external services.

## Related

- [NextRequest](./NextRequest.md)
- [redirect](./redirect.md)
