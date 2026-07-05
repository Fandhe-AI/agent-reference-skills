# route.js

Creates custom request handlers for a given route using the Web `Request`/`Response` APIs.

## Signature / Usage

```ts filename="route.ts"
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

```ts filename="app/dashboard/[team]/route.ts"
export async function GET(
  request: Request,
  { params }: { params: Promise<{ team: string }> }
) {
  const { team } = await params
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS` | exported `async function` | Supported HTTP method handlers. If `OPTIONS` isn't defined, Next.js auto-implements it and sets the `Allow` header. |
| `request` (optional) | `NextRequest` | Extension of the Web `Request` API; adds convenience access to `cookies` and a parsed `nextUrl`. |
| `context.params` (optional) | `Promise<object>` | Resolves to [dynamic route parameters](./dynamic-routes.md) for the current route. |

Use the globally available `RouteContext<'/route'>` helper (generated during `next dev`/`build`/`typegen`) to strongly type `context.params`.

## Notes

- Segment config (`dynamic`, `dynamicParams`, `revalidate`, `fetchCache`, `runtime`, `preferredRegion`) works the same as in pages/layouts — see [Route Segment Config](./route-segment-config.md).
- Built-in support exists for non-UI responses like `sitemap.xml`, `robots.txt`, app icons, and Open Graph images — prefer those metadata file conventions over hand-written route handlers when applicable.
- For CORS on a single handler, set headers manually on the `Response`; to cover multiple handlers, use `proxy.js` or `next.config.js` `headers`.
- `headers()` from `next/headers` is read-only inside a route handler — to set headers you must return a new `Response` with new headers.
- Version history: `v15.0.0-RC` made `context.params` a promise (codemod available) and changed default `GET` caching from static to dynamic; `v13.2.0` introduced Route Handlers.

## Related

- [Dynamic Segments](./dynamic-routes.md)
- [Route Segment Config](./route-segment-config.md)
- [proxy.js](./proxy.md)
- [NextRequest](../functions/next-request.md)
