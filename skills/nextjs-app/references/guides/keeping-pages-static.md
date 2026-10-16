# Keeping pages static

Use the `ensureStatic` route segment config to require that some or all of a route avoids request-time server rendering as the app changes.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

```tsx filename="app/store/layout.tsx"
export const ensureStatic = 'shell'
```

```tsx filename="app/guides/[id]/page.tsx"
export const ensureStatic = 'navigation'

export async function generateStaticParams() {
  const ids = await getGuideIds()
  return ids.map((id) => ({ id }))
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ensureStatic = 'shell'` | route segment config | The App Shell loaded by a default `<Link>` must use only static output |
| `ensureStatic = 'prefetch'` | route segment config | The App Shell and the per-link prefetch from `<Link prefetch={true}>` (which can include `params`-dependent content) must be static |
| `ensureStatic = 'navigation'` | route segment config | The complete route, including the response after the user navigates, must be static; requires `generateStaticParams()` on dynamic routes |

## Notes

- Source: https://nextjs.org/docs/app/guides/keeping-pages-static (v16.4.2)

- Before Cache Components, `dynamic = 'force-static'` / `'force-dynamic'` / `'error'` chose one rendering mode for a whole route. With Cache Components one route can mix prerendered, cached, and request-time content.
- Partial Prefetching navigation stages: (1) default `<Link>` loads the App Shell, (2) `<Link prefetch={true}>` can also load content for the link's URL, (3) the navigation renders the rest. Each `ensureStatic` level extends the static requirement through one of these stages.
- An `ensureStatic` value covers the whole route, including layouts above the segment that exports it.
- `'navigation'` on a dynamic route without `generateStaticParams()` fails the build ("requires an exported `generateStaticParams()` function"). Unlisted IDs are generated on first request, which waits for the complete static page instead of streaming a fallback.
- When uncached or runtime data remains, the build fails with "uncached or runtime data on a route that must be fully static". Fixes: cache with `"use cache"` (not applicable to `connection()`), remove the data access, or read the data on the client. Use `next dev` for source-mapped code frames, or `next build --debug-prerender`.
- To defer only one subtree instead of requiring a static route, call `await prefetch()` or `await navigation()` from `next/cache` inside it.

## Related

- [Optimizing prefetching](./optimizing-prefetching.md)
- [Instant navigation](./instant-navigation.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
- [Incremental static regeneration with Cache Components](./incremental-static-regeneration-cache-components.md)
