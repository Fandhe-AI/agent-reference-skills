# Backend for Frontend

Next.js supports the "Backend for Frontend" pattern: public HTTP endpoints via Route Handlers and Proxy that can return any content type, access data sources, and perform side effects — not a full backend replacement.

## Signature / Usage

```ts filename="/app/api/route.ts"
import { submit } from '@/lib/submit'

export async function POST(request: Request) {
  try {
    await submit(request)
    return new Response(null, { status: 204 })
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : 'Unexpected error'
    return new Response(message, { status: 500 })
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `route.ts` file convention | — | Defines a public Route Handler (`GET`, `POST`, etc.) |
| `request.json()` / `.formData()` / `.text()` / `.clone()` | Request methods | Read the request body once; `.clone()` to read again |
| `NextRequest.nextUrl` | property | Parsed pathname/search params helper |
| `NextResponse.next() / .json() / .redirect() / .rewrite()` | helpers | Response construction shortcuts |
| `proxy` (`config.matcher`) | file convention | Runs before a request reaches a route; only one per project |

## Notes

- Use `next.config.js` `rewrites` with header matching (e.g. `Accept: text/markdown`) for content negotiation from the same URL; set `Vary: Accept` on the response so caches don't serve the wrong variant.
- To forward requests to another backend, prefer `rewrites` in `next.config.js` or a `proxy` rewrite (type the `proxy` argument as `NextRequest` when reading `request.nextUrl`). Use a Route Handler when you must validate requests, authenticate with the backend, or transform its response: expose a fixed endpoint map (upstream path from an allowlist, not from the request URL), send only the headers and credentials the backend needs (copying every incoming header forwards the user's `Cookie` / `Authorization`), and use `redirect: 'error'` so a server-side token cannot be sent elsewhere. The official example reads the whole request and upstream response into memory, so use rewrites for large payloads or streaming.
- An in-memory rate limiter tracks each server instance separately and resets on restart; with several instances keep counts in a shared store or use the host's rate limiting.
- Route Handler checks run only when the handler runs: a response with `Cache-Control: public` and `max-age` / `s-maxage` can be served by a CDN without calling the handler, so credential checks and rate limits do not apply; cache only responses safe for anyone with the URL.
- Custom file conventions beyond the built-in ones (`sitemap.xml`, `robots.txt`, `manifest.json`, `opengraph-image`) can be defined freely, e.g. `rss.xml/route.ts`.
- Caveats: fetch data in Server Components directly from the source, not via your own Route Handlers (adds a slow, and at build time unavailable, HTTP round trip); Server Actions are dispatched sequentially, so they're a poor fit for parallel data fetching; `output: 'export'` only supports `GET` Route Handlers with `dynamic = 'force-static'`; lambda-based deployments can't share state between requests or use WebSockets.
- Never trust incoming payloads — validate content type/size, sanitize, rate-limit, and don't rely on Proxy alone for auth.

## Related

- [Custom Server](./custom-server.md)
- [Server Actions and Mutations](./server-actions.md)
- [Authentication](./authentication.md)
