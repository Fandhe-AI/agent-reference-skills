# Route Handlers

Create custom request handlers for a route using the Web `Request`/`Response` APIs.

## Signature / Usage

```ts
// app/api/route.ts
export async function GET(request: Request) {
  return Response.json({ data: 'hello' })
}
```

```ts
// app/items/route.ts — static caching for GET (previous caching model)
export const dynamic = 'force-static'

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...')
  const data = await res.json()
  return Response.json({ data })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GET`/`POST`/`PUT`/`PATCH`/`DELETE`/`HEAD`/`OPTIONS` | exported function | Supported HTTP methods; unsupported ones return 405 |
| `NextRequest`/`NextResponse` | `next/server` | Extended Request/Response helpers for advanced use cases |
| `RouteContext<'/path'>` | type helper | Types the `context` param (e.g. `ctx.params`), generated during `next dev`/`build`/`typegen` |
| `dynamic = 'force-static'` | route config | Opts a `GET` handler into caching (previous caching model) |

## Notes

- Route Handlers live in `route.js`/`route.ts` inside `app`, and cannot coexist with `page.js` at the same route segment
- Only `GET` can be cached; other methods are never cached even alongside a cached `GET` in the same file
- With Cache Components enabled, `GET` handlers follow the same prerendering model as pages: they prerender when no uncached/runtime data is accessed, and can use `use cache` (in a helper function, not directly in the handler body) to include uncached data in a static response
- Prerendering stops if the handler accesses network/database calls, request properties (`req.url`, headers, cookies, body), or runtime APIs (`cookies()`, `headers()`, `connection()`)

## Related

- [fetching-data](./fetching-data.md)
- [caching](./caching.md)
- [proxy](./proxy.md)
