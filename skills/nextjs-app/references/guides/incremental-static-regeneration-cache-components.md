# Incremental Static Regeneration with Cache Components

The Cache Components equivalent of ISR/`fallback: true`: prerender a subset of dynamic routes via `generateStaticParams`, serve the shared App Shell instantly for unlisted params, and upgrade them to fully cached pages in the background after the first visit.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

```tsx filename="app/[category]/[product]/page.tsx"
import { Suspense } from 'react'

export async function generateStaticParams({
  params,
}: {
  params: { category: string }
}) {
  const products = await getPopularProducts(params.category)
  return products.map((p) => ({ product: p.slug }))
}

export default function ProductPage(props: PageProps<'/[category]/[product]'>) {
  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <ProductDetails {...props} />
    </Suspense>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| App Shell | prerendered fallback | Generic, URL-independent part of the page, served instantly for unlisted params |
| `generateStaticParams` | route function | Lists param values to prerender in full at build time; unlisted params get the shell + background upgrade |
| Background upgrade | behavior | After first visit to an unlisted URL, Next.js renders with the now-known params; subsequent visits get the upgraded result from cache |
| Prefetch as first visit | behavior | A `<Link>` entering the viewport or `router.prefetch()` triggers the background upgrade before the click |

## Notes

- Enable `cacheComponents` and `partialPrefetching` together; Cache Components prerenders a static shell that can include fallback UI (for paths not returned by `generateStaticParams`, Next.js can render on demand and store the completed result in the ISR cache), and Partial Prefetching determines whether the fallback is served before the URL-specific render completes.
- With Partial Prefetching: await `params` inside `<Suspense>`; Next.js serves the fallback immediately for an unlisted path, renders the URL-specific content and stores the completed result in the ISR cache. Without Partial Prefetching: the first request for an unlisted path waits for the URL-specific render, so await `params` outside any `<Suspense>` boundary (including one created by `loading.tsx`) so Next.js creates an ISR entry for that URL; awaiting `params` inside `<Suspense>` without Partial Prefetching keeps serving the shared fallback instead of a URL-specific ISR entry (data fetched by the route can still be cached independently).
- Even for params covered by `generateStaticParams`, keep the `params`/`searchParams` read inside a `<Suspense>` boundary (with Partial Prefetching) — awaiting above it would still tie that layout's shell to one URL.
- Wait for complete static output: for an unlisted parameter, `ensureStatic = 'navigation'` makes the first request wait for the complete static page. Without it, Next.js can return a prerendered fallback while it generates the page in the background and stores the completed page for later requests.
- Links to these pages need `prefetch={true}` to resolve the URL-specific content before the click.
- The App Shell for unlisted params is served starting Next.js 16.3; earlier versions wait for a full server render before responding.
- Upgrade outcome depends on data: fully cached data + resolved params → fully static page; resolved params but some uncached/runtime data → cached page with those parts still behind `<Suspense>`. Params resolve in route order — an unresolved param blocks deeper params from upgrading.
- Pages Router migration mapping: `getStaticPaths` `fallback: true` → with Partial Prefetching (await `params` inside `<Suspense>`); `fallback: 'blocking'` → without Partial Prefetching (await `params` outside `<Suspense>`);  `router.isFallback` → not needed; `getStaticProps` + `revalidate` → `use cache` + `cacheLife`; `getStaticPaths` → `generateStaticParams`.

## Related

- [Incremental Static Regeneration (ISR)](./incremental-static-regeneration.md)
- [How Revalidation Works](./how-revalidation-works.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
