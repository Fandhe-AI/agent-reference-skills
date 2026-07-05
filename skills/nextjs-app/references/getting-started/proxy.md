# Proxy

Run code before a request completes to rewrite, redirect, modify headers, or respond directly. (Renamed from Middleware in Next.js 16; functionality unchanged.)

## Signature / Usage

```ts
// proxy.ts — at the project root (or inside src/), alongside app/
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/about/:path*',
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `proxy` (named or default export) | function | Runs before a matched request completes; can be `async` |
| `config.matcher` | `string \| string[]` | Restricts which paths trigger the proxy function |

## Notes

- Only one `proxy.ts` file is supported per project; split logic into modules and import them into the main file
- For simple redirects, prefer the `redirects` config in `next.config.ts`; use Proxy when request data or complex logic is needed
- Proxy is not intended for slow data fetching, and `fetch` options like `cache`, `next.revalidate`, `next.tags` have no effect inside it
- Not a full session-management/authorization solution — useful for optimistic permission checks only

## Related

- [route-handlers](./route-handlers.md)
- [deploying](./deploying.md)
