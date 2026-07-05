# Routing Information

The `routing` object passed to `onBuildComplete` provides Next.js's processed routing patterns, organized by phase, ready for deployment.

## Signature / Usage

```typescript
routing.beforeMiddleware // routes applied before middleware (headers/redirects)
routing.beforeFiles      // rewrites checked before filesystem route matching
routing.afterFiles       // rewrites checked after filesystem route matching
routing.dynamicRoutes    // dynamic matchers generated from [slug] and catch-all segments
routing.onMatch          // routes applied after a successful match (e.g. immutable cache headers)
routing.fallback         // final rewrite routes checked when earlier phases had no match
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| source | string | Original route pattern (optional for generated internal rules). |
| sourceRegex | string | Compiled regex for matching requests. |
| destination | string | Internal destination or redirect destination. |
| headers | `Record<string, string>` | Headers to apply. |
| has | `RouteHas[]` | Positive matching conditions. |
| missing | `RouteHas[]` | Negative matching conditions. |
| status | number | Redirect status code. |
| priority | boolean | Internal route priority flag. |

## Related

- [Output Types](./adapters-output-types.md)
- [Routing with @next/routing](./adapters-routing-with-next-routing.md)
