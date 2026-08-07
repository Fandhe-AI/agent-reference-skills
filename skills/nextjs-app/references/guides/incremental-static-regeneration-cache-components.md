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

- Requires both `cacheComponents` and `partialPrefetching` enabled; Cache Components produces the App Shell, Partial Prefetching upgrades it once params are known.
- Even for params covered by `generateStaticParams`, keep the `params`/`searchParams` read inside a `<Suspense>` boundary — awaiting above it would still tie that layout's shell to one URL.
- The App Shell for unlisted params is served starting Next.js 16.3; earlier versions wait for a full server render before responding.
- Upgrade outcome depends on data: fully cached data + resolved params → fully static page; resolved params but some uncached/runtime data → cached page with those parts still behind `<Suspense>`. Params resolve in route order — an unresolved param blocks deeper params from upgrading.
- Pages Router migration mapping: `fallback: true` → default Cache Components behavior; `router.isFallback` → not needed; `getStaticProps` + `revalidate` → `use cache` + `cacheLife`; `getStaticPaths` → `generateStaticParams`.

## Related

- [Incremental Static Regeneration (ISR)](./incremental-static-regeneration.md)
- [How Revalidation Works](./how-revalidation-works.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
