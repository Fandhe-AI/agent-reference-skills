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
- Route Handlers can proxy to another backend by cloning/validating the request then `fetch`-ing a constructed `proxyRequest`.
- Custom file conventions beyond the built-in ones (`sitemap.xml`, `robots.txt`, `manifest.json`, `opengraph-image`) can be defined freely, e.g. `rss.xml/route.ts`.
- Caveats: fetch data in Server Components directly from the source, not via your own Route Handlers (adds a slow, and at build time unavailable, HTTP round trip); Server Actions are dispatched sequentially, so they're a poor fit for parallel data fetching; `output: 'export'` only supports `GET` Route Handlers with `dynamic = 'force-static'`; lambda-based deployments can't share state between requests or use WebSockets.
- Never trust incoming payloads — validate content type/size, sanitize, rate-limit, and don't rely on Proxy alone for auth.

## Related

- [Custom Server](./custom-server.md)
- [Server Actions and Mutations](./server-actions.md)
- [Authentication](./authentication.md)
