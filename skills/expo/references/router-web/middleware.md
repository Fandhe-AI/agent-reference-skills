---
source: https://docs.expo.dev/router/web/middleware/
---

# Server middleware

A single `+middleware.ts` file in **src/app** runs before every matching server request, ahead of route handlers.

## Signature / Usage

```ts
// src/app/+middleware.ts
export default function middleware(request) {
  console.log(`Middleware executed for: ${request.url}`);
  // Your middleware logic goes here
}
```

Server output config:

```json
{
  "expo": {
    "web": { "output": "server" },
    "plugins": ["expo-router"]
  }
}
```

Matcher and typed middleware:

```ts
import { MiddlewareFunction } from 'expo-router/server';

export const unstable_settings = {
  matcher: {
    methods: ['GET'],
    patterns: ['/api', '/admin/[...path]'],
  },
};

const middleware: MiddlewareFunction = request => {
  if (request.headers.has('specific-header')) {
    return Response.redirect('https://expo.dev');
  }
};

export default middleware;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| default export | `(request: ImmutableRequest) => Response \| void \| Promise<...>` | Returning a `Response` sends it immediately; returning nothing continues to the matching route. |
| `unstable_settings.matcher.methods` | `string[]` | HTTP methods that trigger the middleware (default: all). |
| `unstable_settings.matcher.patterns` | `(string \| RegExp)[]` | Exact paths (`/api` does not match `/api/users`), named params (`/posts/[postId]`), catch-all (`/blog/[...slug]`), or regular expressions. Runs if any pattern matches; with both `methods` and `patterns` both must match. |

## Notes

- Not Next.js `middleware.ts` (`NextRequest` / `NextResponse` / `config.matcher`) nor hono / fastify middleware; this is Expo Router `+middleware.ts` served by `expo-server`. See nextjs-app, hono and fastify skills for those.
- Stable in SDK 58 and later. For SDK 54-57 enable `unstable_useServerMiddleware` in the `expo-router` plugin; in SDK 58 and later it is deprecated with no effect (remove it). Requires a deployed server for production use.
- SDK 58 and later: middleware works with `web.output: "static"` when `apiRoutes: true` is set in the `expo-router` plugin.
- Runs for initial page loads, full refreshes, direct URL navigation, API route calls from any client, and server-side rendering requests. Does not run for client-side navigation (`<Link />`, `router`), native screen transitions, prefetched routes, or static asset requests.
- The request is immutable: you can read `url`, `method`, `headers.get()` / `headers.has()` and query strings, but cannot call `set()` / `append()` / `delete()` on headers, consume the body (`text()`, `json()`, `formData()`), or access `body`.
- Only one root-level **+middleware.ts** is supported. Limitations that apply to API routes also apply to middleware.
- Use `setResponseHeaders` from `expo-server` to add headers (for example `Retry-After` or `Set-Cookie`) to the future response.
- Keep middleware lightweight; prefer matchers, exact paths and named parameters over regex.
- The `expo-server` API reference types the same function as `MiddlewareFunction` imported from `expo-server`; the guide imports it from `expo-router/server`.
- Pinned: documentation fetched 2026-10-17 (page modificationDate September 16, 2026), Expo SDK 58.

## Related

- [API Routes](./api-routes.md)
- [Server (expo-server)](./server.md)
- [Server headers](./server-headers.md)
