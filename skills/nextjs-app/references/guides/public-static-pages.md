# Public Static Pages

Build public pages (landing pages, product lists, marketing sites) that share data across users by classifying each component as static, cached (`'use cache'`), or streamed (`<Suspense>`), letting Next.js prerender and serve most of the page from a CDN.

## Signature / Usage

```tsx filename="app/products/page.tsx"
import { Suspense } from 'react'

async function ProductList() {
  'use cache'
  const products = await db.product.findMany()
  return <List items={products} />
}

async function PromotionContent() {
  const promotion = await getPromotion()
  return <Promotion data={promotion} />
}

export default async function Page() {
  return (
    <>
      <Suspense fallback={<PromotionSkeleton />}>
        <PromotionContent />
      </Suspense>
      <ProductList />
    </>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| static component | component with no changing inputs | No external data/headers/random values — prerendered at build time automatically, no config needed |
| dynamic component | `async` component reading uncached data | Blocks the whole route from responding unless cached or streamed |
| `'use cache'` | directive | Caches a component's/function's output so it becomes stable and prerenderable, appropriate for data shared across users |
| `<Suspense fallback={...}>` | React API | Unblocks the response by streaming a dynamic (request-specific) component in after the shell, for data that can't be cached |

## Notes

- Run `next build` to confirm classification: `○ (Static)` for fully static/cached routes, `◐ (Partial Prerender)` once a `<Suspense>` boundary introduces streamed dynamic content.
- Choose caching when data is shared across all users (e.g. a product catalog); choose streaming when data is per-request (e.g. a promotion banner keyed on location/A/B test).
- The fallback UI itself is prerendered and cached alongside the static shell; only the inner component streams in later.
- For locale-aware date/time formatting without a flash, see Preventing Flash Before Hydration.

## Related

- [Preventing Flash Before Hydration](./preventing-flash-before-hydration.md)
- [Incremental Static Regeneration](./incremental-static-regeneration.md)
