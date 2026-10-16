# Optimizing prefetching

With Cache Components and Partial Prefetching, resolve per-link URL data before the click, include session data in the App Shell, or defer expensive work to a later navigation stage with `prefetch()` / `navigation()`.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

```tsx filename="app/page.tsx"
import Link from 'next/link'

export default function Home() {
  return (
    <nav>
      <Link href="/search?q=react" prefetch={true}>
        React
      </Link>
      <Link href="/search?q=next" prefetch={true}>
        Next.js
      </Link>
    </nav>
  )
}
```

```tsx filename="app/dashboard/recommendations.tsx"
import { cookies } from 'next/headers'
import { prefetch } from 'next/cache'

async function Recommendations() {
  const session = (await cookies()).get('session')?.value
  await prefetch()
  const items = await rank(session)
  return <List items={items} />
}

async function rank(session?: string) {
  'use cache: private'
  return db.recommendations.rank({ session })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<Link prefetch={true}>` | prop | Per-link prefetch that resolves URL data (`searchParams`, `params`) before the click |
| `prefetch={'auto'}` | prop | Equivalent to omitting `prefetch` or passing `undefined`; keeps the default App Shell prefetch |
| `prefetch={false}` | prop | Disables prefetching for the link |
| `prefetch()` | function (`next/cache`) | Defers the code below it until a per-link prefetch or navigation |
| `navigation()` | function (`next/cache`) | Defers the code below it until navigation |
| `"use cache: private"` | directive | Caches a function that reads `cookies()` / `headers()` directly, in the browser only, scoped to the session |

Navigation stages:

| | App Shell | Per-link prefetch (`prefetch={true}`) | Navigation |
|---|---|---|---|
| Scope | One per route | One per visible `<Link prefetch={true}>` | One per click |
| Content | Route output minus per-link data and work below `prefetch()` / `navigation()` | App Shell plus per-link URL data and work below `prefetch()`, excluding work below `navigation()` | Everything left, including work below `navigation()` |
| Cost | Bounded by route count | Bounded by visible-link count | Bounded by navigations |

## Notes

- Source: https://nextjs.org/docs/app/guides/optimizing-prefetching (v16.4.2)

- Each per-link prefetch costs a server invocation per prefetchable link, so it is opt-in. Fully static pages serve the prefetch from the static cache. A cold cache can still show a loading spinner on the first navigation.
- `params` needs a `<Suspense>` boundary just like `searchParams`, even with `generateStaticParams`.
- Session data: a route that reads `cookies()` / `headers()` (including through `"use cache: private"`) gets an App Shell with its session data, cached per session on the client, without a per-link prefetch. `"use cache"` cannot call `cookies()` inside the cached function; either extract the cookie outside and pass it as an argument (shared across sessions), or use `"use cache: private"` (tied to one session).
- `prefetch()` and `navigation()` apply only during runtime rendering and cannot be awaited inside a cached scope; put the directive on a function called below them. Unlike `connection()`, neither makes the subtree request-dependent.
- When every `cookies()` / `headers()` / `params` / `searchParams` read sits below `navigation()`, the per-link prefetch can be served from static output (CDN-cacheable). Use `ensureStatic` to require this across a route.
- Skip `prefetch={true}` when the route has little URL-data dependency, content must be fresh every request, or the route is rarely navigated to. For grids of many links, prefer a hover-triggered prefetch.
- For `use cache` content, a `stale` time of five minutes or more lets the client router reuse it after the first navigation.
- Test with `instant()` from `@next/playwright`. In development, `prefetch()` / `navigation()` outside `<Suspense>` surface an Instant Insight.
- Optimizer skill: `npx skills add vercel/next.js --skill next-partial-prefetching-optimizer`.

## Related

- [Prefetching](./prefetching.md)
- [Adopting Partial Prefetching](./adopting-partial-prefetching.md)
- [Keeping pages static](./keeping-pages-static.md)
- [Instant navigation](./instant-navigation.md)
- [Runtime Prefetching](./runtime-prefetching.md)
