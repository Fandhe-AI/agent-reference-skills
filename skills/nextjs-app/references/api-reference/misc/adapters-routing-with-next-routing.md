# Routing with @next/routing

`@next/routing` reproduces Next.js route matching behavior in an adapter, using data produced by `onBuildComplete`.

## Signature / Usage

```typescript
import { resolveRoutes } from '@next/routing'

const result = await resolveRoutes({
  url: new URL(requestUrl),
  buildId,
  basePath: config.basePath || '',
  i18n: config.i18n,
  headers: new Headers(requestHeaders),
  requestBody, // ReadableStream
  pathnames,
  routes: routing,
  invokeMiddleware: async (ctx) => {
    // platform-specific middleware invocation
    return {}
  },
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| middlewareResponded | boolean | `true` when middleware already sent a response; the adapter should not invoke an entrypoint. |
| externalRewrite | URL | Set when routing resolved to an external rewrite destination. |
| redirect | `{ url: URL; status: number }` | Set when the request should be redirected. |
| resolvedPathname | string | Route pathname selected by Next.js routing (the matched route template, e.g. `/blog/[slug]`, for dynamic routes). |
| resolvedQuery | object | Final query after rewrites/middleware have added or replaced search params. |
| invocationTarget | object | Concrete pathname and query to invoke for the matched route (e.g. `/blog/post-1`). |
| resolvedHeaders | Headers | Headers added or modified during routing. |
| status | number | HTTP status code set by routing (e.g. from a redirect/rewrite rule). |
| routeMatches | object | Named matches extracted from dynamic route segments. |

## Notes

- `@next/routing` is experimental and will stabilize alongside the adapters API.

## Related

- [Adapters](./adapters.md)
- [Routing Information](./adapters-routing-information.md)
- [Output Types](./adapters-output-types.md)
