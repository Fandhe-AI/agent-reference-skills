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

Python Routing Middleware (`proxy` entrypoint in `vercel.json`):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy:proxy"
  }
}
```

```python
from vercel.proxy import Proxy, RedirectResponse, Request, Response

proxy = Proxy()

# Redirect old paths
@proxy.route("/old-page")
def old_page(request: Request) -> Response:
    return RedirectResponse("/new-page", status_code=302)

# Requests that match no route continue to your app unchanged
```

```toml
# pyproject.toml
[dependency-groups]
"vercel.proxy" = ["vercel-proxy"]
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
- Routing Middleware is available on all plans, built on fluid compute, and written in TypeScript / JavaScript (Node.js or Bun) or Python. It must use the same runtime as the app; a mismatch fails the build with `proxy_runtime_mismatch`
- `proxy` in `vercel.json` cannot be used with frameworks that build their own routing middleware (Next.js, Astro). Next.js 16+: add `proxy.ts` at the project root; earlier Next.js: `middleware.ts`
- Without a matcher it runs on every request, including static files. Each `proxy.matcher` entry must start with `/`; a `config.matcher` export also works in TypeScript / JavaScript
- Prefer static configuration (redirects, rewrites, `headers`, route transforms, `has` / `missing` conditions in `vercel.json`, or project routing rules) when no custom code is needed: it runs on the CDN without invoking your code. Use middleware for logic such as session verification, API calls, or A/B assignment
- Request limits: URL length 14 KB, request body 4 MB, 64 request headers, 32 KB per request header
- Geolocation headers such as `x-vercel-ip-country` and `x-vercel-ip-city` are added to every request; in Python read them from `request.headers`
- Pricing follows the fluid compute model. Distant databases add latency; use a global database (Global Config, Vercel Blob, Marketplace storage). `console` API logs appear under View Functions Logs for the deployment. Observability shows invocation counts and performance; Observability Plus adds per-path, per-action (redirect / rewrite), and rewrite-target insights
- Source: https://vercel.com/docs/routing-middleware (fetched 2026-11-14)
- `@vercel/functions` helpers are Vercel-specific and won't work on other providers

## Related

- [edge-runtime.md](./edge-runtime.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [regions.md](./regions.md)
