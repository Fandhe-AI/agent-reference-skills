# Route Handler with GET and POST

Define a custom REST endpoint under `app/` with a `route.ts` file, using `NextRequest`/`Response`.

```ts
// app/api/items/route.ts
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')
  return Response.json({ query })
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ received: body })
}
```

## Notes

- Supported exports: `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`. Only export the methods you need.
- `NextRequest` extends the Web `Request` API with convenience accessors like `request.nextUrl.searchParams` and `request.cookies`.
- `GET` handlers are dynamic (not cached) by default as of Next.js 15+; opt into caching with `export const revalidate = 60` or by combining with `generateStaticParams`.
- A `route.ts` cannot coexist with a `page.tsx` at the same route segment.
