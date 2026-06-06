# Routing Middleware

Code that executes before a request is processed, enabling personalization, redirects, rewrites, geolocation-based routing, and header manipulation. Runs on the Edge runtime by default (Node.js opt-in).

## Signature / Usage

```ts
// middleware.ts — place at project root, same level as package.json
export const config = {
  matcher: '/about/:path*', // optional: limit which paths trigger middleware
  runtime: 'edge',          // 'edge' (default) or 'nodejs'
};

export default function middleware(request: Request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

## `config` Properties

| Property | Type | Description |
|----------|------|-------------|
| `matcher` | `string \| string[]` | Paths the middleware runs on. Supports regex. |
| `runtime` | `'edge' \| 'nodejs'` | Runtime to use. Default: `'edge'` |

### Matcher Examples

```ts
// Single path
export const config = { matcher: '/about/:path*' };

// Multiple paths
export const config = { matcher: ['/about/:path*', '/dashboard/:path*'] };

// Regex: exclude api, _next/static, favicon.ico
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
```

## Middleware Signature

| Parameter | Type | Description |
|-----------|------|-------------|
| `request` | `Request` (Web Standard) or `NextRequest` (Next.js) | Incoming request |
| `context` | `RequestContext` / `NextFetchEvent` | Contains `waitUntil()` |

## Helper Methods (`@vercel/functions`)

### `geolocation(request)`

```ts
import { geolocation } from '@vercel/functions';
const { city, country, latitude, longitude, region } = geolocation(request);
```

| Property | Type | Description |
|----------|------|-------------|
| `city` | `string \| undefined` | City of origin |
| `country` | `string \| undefined` | Country of origin |
| `latitude` | `string \| undefined` | Client latitude |
| `longitude` | `string \| undefined` | Client longitude |
| `region` | `string \| undefined` | CDN region that received the request |

### `ipAddress(request)`

Returns client IP as `string | undefined`.

### `rewrite(url)`

Returns a response that rewrites the request to a different URL without redirect.

### `next(options?)`

Continues the middleware chain. Options:

| Parameter | Type | Description |
|-----------|------|-------------|
| `headers` | `Headers[] \| Headers` | Headers to set |
| `status` | `number` | Status code |
| `statusText` | `string` | Status text |

### `waitUntil(promise)`

Continues executing `promise` after the response is sent (background tasks).

## Next.js Equivalents

| `@vercel/functions` | Next.js (`next/server`) |
|--------------------|------------------------|
| `geolocation()` | `request.geo` |
| `ipAddress()` | `request.ip` |
| `rewrite(url)` | `NextResponse.rewrite(url)` |
| `next(opts)` | `NextResponse.next(opts)` |

## Notes

- Middleware runs on **every route** unless `matcher` or conditional statements are used
- Routing Middleware deploys to all CDN regions by default (fewer on Hobby)
- Node.js runtime for middleware: set `runtime: 'nodejs'` in `config` and `experimental.nodeMiddleware: true` in `next.config.ts` (Node.js middleware incurs fluid compute pricing)
- For Bun runtime: also set `bunVersion` in `vercel.json`
- `@vercel/functions` helpers are Vercel-specific and won't work on other providers

## Related

- [edge-runtime.md](./edge-runtime.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [regions.md](./regions.md)
