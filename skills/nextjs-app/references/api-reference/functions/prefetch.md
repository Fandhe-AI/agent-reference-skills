# prefetch

`await prefetch()` keeps runtime work below it out of the route's App Shell. The work can run during a per-link prefetch or navigation, while the fallback of the nearest `<Suspense>` boundary renders in the shell.

## Signature / Usage

```tsx
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife, prefetch } from 'next/cache'

export default function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading greeting...</p>}>
        <Greeting /> {/* in the App Shell */}
      </Suspense>
      <Suspense fallback={<p>Loading recommendations...</p>}>
        {/* the fallback is in the App Shell, the recommendations are not */}
        <Recommendations />
      </Suspense>
    </>
  )
}

async function Greeting() {
  const session = (await cookies()).get('session')?.value
  return <p>{session ? 'Welcome back' : 'Welcome'}</p>
}

async function Recommendations() {
  await prefetch() // runtime work below renders on a per-link prefetch or navigation
  const items = await getRecommendations()
  return <List items={items} />
}

async function getRecommendations() {
  'use cache: private'
  cacheLife('hours')
  const session = (await cookies()).get('session')?.value
  return db.recommendations.rank({ session })
}
```

```ts
function prefetch(): Promise<void>
```

Required configuration (Cache Components plus Partial Prefetching):

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

## Notes

- Parameters: none. Returns a `Promise<void>` that is not meant to be consumed.
- Requires Cache Components (`cacheComponents: true`) and throws if not enabled. Without Partial Prefetching a route has no App Shell, so the function has no effect.
- Everything above `prefetch()` renders in the App Shell; everything below renders on a per-link prefetch or on the navigation. Deferral is scoped to the component that awaits it and the tree below; sibling branches render in the shell as usual. Wrap the component in `<Suspense>`.
- To keep content out of per-link prefetches as well, so it renders only on the navigation, use `navigation()`.
- Put the cache directive on a function called below `prefetch()`. Awaiting `prefetch()` inside a cached scope (`use cache`, `use cache: private`) is not allowed.
- Differs from `connection()`: `connection()` waits for a real request and makes the following work request-dependent; `prefetch()` excludes the following code from the App Shell without marking it request-dependent, so content below it stays fully cacheable with `"use cache"`.
- Uncached reads, values with a short `stale` time, and anything behind `params` or `searchParams` are already left out of the shell on their own.
- When every read of `cookies()` and `headers()` sits below `prefetch()`, the shell can be served from the static output generated at build time (optional optimization). To require a static App Shell across the route, use `ensureStatic = 'shell'`. A route that resolves `params` or `searchParams` still gets a prerender for the shell.
- No effect on the initial load of a page.
- A call outside a `<Suspense>` boundary surfaces an Instant Insight in development.
- Calling it inside `use cache`, `use cache: private`, `unstable_cache()`, `after()`, `generateStaticParams`, or a Client Component throws.
- In a `page` or `layout` that sets the `prefetch` route segment config, import the function under another name, e.g. `import { prefetch as prefetchStage } from 'next/cache'`, since both are named `prefetch`.
- Version history: `v16.4.0` introduced `prefetch`, replacing the `unstable_prefetch` name used in earlier canary releases.

## Related

- [navigation](./navigation.md)
- [connection](./connection.md)
- [cacheLife](./cacheLife.md)
- [cookies](./cookies.md)
- [headers](./headers.md)
- [unstable_cache](./unstable_cache.md)
- [after](./after.md)
- [generateStaticParams](./generateStaticParams.md)
