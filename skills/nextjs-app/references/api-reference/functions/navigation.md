# navigation

`await navigation()` keeps runtime work below it out of the App Shell and per-link prefetches. The work runs when the user navigates, while the fallback of the nearest `<Suspense>` boundary renders in the prefetched output.

## Signature / Usage

```tsx
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife, navigation } from 'next/cache'

export default function Page({ params }: PageProps<'/post/[slug]'>) {
  return (
    <>
      <Suspense fallback={<p>Loading post...</p>}>
        <PostBody params={params} /> {/* in a per-link prefetch */}
      </Suspense>
      <Suspense fallback={<p>Loading comments...</p>}>
        {/* the fallback is in the prefetch, the comments are not */}
        <Comments params={params} />
      </Suspense>
    </>
  )
}

async function Comments({ params }: { params: Promise<{ slug: string }> }) {
  await navigation() // runtime work below renders on navigation
  const { slug } = await params
  const sort = (await cookies()).get('comment-sort')?.value ?? 'newest'
  const items = await getComments(slug, sort)
  return <CommentList items={items} />
}

async function getComments(slug: string, sort: string) {
  'use cache'
  cacheLife('hours')
  return db.comments.list({ slug, sort })
}
```

```ts
function navigation(): Promise<void>
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
- Requires Cache Components (`cacheComponents: true`); throws without it. Meant for routes using Partial Prefetching (`partialPrefetching`), enabled globally or per route.
- Navigation stages: a default `<Link>` loads the App Shell; `<Link prefetch={true}>` can also load content that depends on the link's URL; following the link renders the rest.
- Without Partial Prefetching, `navigation()` still defers the content for a default `<Link>`, but `<Link prefetch={true}>` fetches the whole route, deferred content included, the same as a navigation.
- To keep content out of the App Shell while still including it in a per-link prefetch, use `prefetch()`.
- Deferral is scoped to the component that awaits it and the tree below; sibling branches keep their existing behavior. Place it above the code to defer and wrap the component in `<Suspense>`.
- Put the `"use cache"` directive on a function called below `navigation()`. Awaiting `navigation()` inside a cached scope (`use cache`, `use cache: private`) is not allowed.
- Differs from `connection()`: `connection()` waits for a real request and makes the following work request-dependent; `navigation()` excludes the following code from route prefetches and resolves when the user navigates, without making the work request-dependent. Code after `await navigation()` can use `"use cache"` and keep its cache lifetime.
- Give cached deferred content a `stale` time of five minutes or more and the client-side router reuses it after the first navigation into the route; below that, a short lifetime keeps it out of the App Shell, so each navigation fetches it again.
- When every read of `cookies()`, `headers()`, `params`, and `searchParams` sits below `navigation()`, a prefetch can be served from the static output the build already generated (optional optimization; CDN-cacheable). To require a static App Shell and static per-link prefetches across the route, use `ensureStatic = 'prefetch'`.
- No effect on the initial load of a page.
- Reading `cookies()` or `headers()` below `navigation()` does not make the route's prefetches render per request.
- A call outside a `<Suspense>` boundary surfaces an Instant Insight in development.
- Calling it inside `use cache`, `use cache: private`, `unstable_cache()`, `after()`, `generateStaticParams`, or a Client Component throws.
- Version history: `v16.4.0` introduced `navigation`, replacing the `unstable_navigation` name used in earlier canary releases.

## Related

- [prefetch](./prefetch.md)
- [connection](./connection.md)
- [cacheLife](./cacheLife.md)
- [cookies](./cookies.md)
- [headers](./headers.md)
- [unstable_cache](./unstable_cache.md)
- [after](./after.md)
- [generateStaticParams](./generateStaticParams.md)
