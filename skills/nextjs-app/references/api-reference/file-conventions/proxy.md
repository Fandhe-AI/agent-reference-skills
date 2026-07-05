# proxy.js

Runs code on the server before a request completes, allowing you to rewrite, redirect, modify request/response headers, or respond directly based on the incoming request. Executes before routes are rendered.

## Signature / Usage

```tsx filename="proxy.ts"
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
| `proxy` (default or named export) | `(request: NextRequest, event: NextFetchEvent) => Response \| void` | The single required function; only one per file. `NextProxy` type infers both param types. |
| `config.matcher` | `string \| string[] \| MatcherObject[]` | Restricts which paths run the proxy. Without it, proxy runs on **every request** including static/_next assets. |
| `matcher[].source` | `string` | Path/pattern (must start with `/`); supports `:path*` (zero+), `:path?` (zero/one), `:path+` (one+), and regex in parens. |
| `matcher[].locale` | `boolean` | When `false`, ignores locale-based routing in matching. |
| `matcher[].has` / `missing` | `{ type, key, value? }[]` | Conditions on presence/absence of headers, query params, or cookies. |

## Notes

- **Formerly named `middleware.js`** — the convention was deprecated and renamed to `proxy` in `v16.0.0` (defaults to the Node.js runtime now); migrate with `npx @next/codemod@canary middleware-to-proxy .`, which renames the file and the exported function from `middleware` to `proxy`.
- The `runtime` route segment config option is not available in proxy files — setting it throws an error.
- Execution order: `next.config.js` `headers` → `next.config.js` `redirects` → proxy → `beforeFiles` rewrites → filesystem routes → `afterFiles` rewrites → dynamic routes → `fallback` rewrites. Server Functions are not separate routes in this chain — they're POST requests to the route they're used on, so a matcher excluding a path also skips Server Function calls there.
- `matcher` values must be constants (statically analyzable at build time); dynamic variables are ignored.
- Advanced flags: `skipProxyUrlNormalize` (formerly `skipMiddlewareUrlNormalize`) and `skipTrailingSlashRedirect`, set in `next.config.js`.
- Even when `_next/data` is excluded via a negative matcher, proxy still runs for `_next/data` routes intentionally, to avoid accidentally leaving data routes unprotected.
- Unit testing is experimental (`v15.1`+) via `next/experimental/testing/server` (`unstable_doesProxyMatch`, `isRewrite`, `getRewrittenUrl`).
- Static export is not supported for proxy (Node.js server / Docker: yes; Static export: no; Adapters: platform-specific).

## Related

- [NextRequest](../functions/next-request.md)
- [NextResponse](../functions/next-response.md)
- [route-segment-config](./route-segment-config.md)
