# Routing Middleware

Code that executes before a request is processed, enabling personalization, redirects, rewrites, geolocation-based routing, and header manipulation. Per the current docs, the `runtime` option defaults to `nodejs` (the older Edge-by-default wording is superseded).

## Signature / Usage

```ts
// middleware.ts — place at project root, same level as package.json
export const config = {
  matcher: '/about/:path*', // optional: limit which paths trigger middleware
  runtime: 'nodejs',        // docs: `runtime` defaults to 'nodejs'
};

export default function middleware(request: Request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

## `config` Properties

| Property | Type | Description |
|----------|------|-------------|
| `matcher` | `string \| string[]` | Paths the middleware runs on. Supports regex. |
| `runtime` | `string` (`'nodejs'`) | Middleware runtime; defaults to `'nodejs'` per the current Routing Middleware API docs (earlier versions of this page said `'edge'` was the default) |

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
- For Bun runtime: also set `bunVersion` in `vercel.json` together with `runtime: 'nodejs'` in `config`
- `proxy` in `vercel.json` explicitly configures the file built as Routing Middleware (without it Vercel looks for `middleware.ts` / `middleware.js` at the project root): `proxy.entrypoint` (required; path relative to project root, ends in `.js` or `.ts`, may be in a subdirectory such as `src/proxy.ts`) and `proxy.matcher` (optional; path starting with `/` or an array of them). Example: `"proxy": { "entrypoint": "proxy.ts", "matcher": "/api/:func*" }`. The entrypoint exports its handler as a default export and runs on the Node.js runtime; a `middleware.ts` with `runtime: 'nodejs'` behaves the same as `"proxy": { "entrypoint": "middleware.ts" }`. Without a matcher it runs on every request. Set duration/memory with `functions` keyed on the entrypoint path (e.g. `"proxy.ts": { "maxDuration": 10 }`)
- `skipMiddlewareRequestBody` (`vercel.json` / `vercel.ts`, boolean, default `false`; changelog 2026-10-08): skips forwarding the client request body to Routing Middleware, reducing Fast Origin Transfer and possibly TTFB. Enable only if your middleware never reads the body; Vercel Functions and rewrite targets still receive it
- `@vercel/functions` helpers are Vercel-specific and won't work on other providers

## Related

- [edge-runtime.md](./edge-runtime.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [regions.md](./regions.md)
