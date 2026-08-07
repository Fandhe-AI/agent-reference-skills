# Ensuring Instant Navigations

Guide to structuring an app so navigations are instant: static/cached/prefetched content renders immediately while the rest streams in, using Cache Components validation, DevTools, and e2e tests.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

```tsx filename="app/store/[slug]/page.tsx"
import { Suspense } from 'react'

export default function ProductPage(props: PageProps<'/store/[slug]'>) {
  return (
    <div>
      <Suspense fallback={<p>Loading product...</p>}>
        <ProductInfo params={props.params} />
      </Suspense>
      <Suspense fallback={<p>Checking availability...</p>}>
        <Inventory params={props.params} />
      </Suspense>
    </div>
  )
}

async function getProduct(slug: string) {
  'use cache'
  return db.products.findBySlug(slug)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| "instant" navigation | concept | Browser can start rendering the new page the moment the user clicks, with static/cached/fallback content showing immediately |
| App Shell | prerendered fallback | Generated per route; renders instantly during client navigations when nothing else is ready |
| `instant = false` | route segment config | Opts a segment out of instant-navigation validation feedback (does not force dynamic rendering) |
| Navigation Inspector | Next.js DevTools panel | Freezes the page at its initial loading state to inspect the static shell / prefetched destination |
| `instant()` helper | `@next/playwright` | Scopes Playwright assertions to the UI available immediately on navigation |
| `validationLevel` | `experimental.instantInsights` config | `'warning'` (default, validates every Page/Default) or `'manual-warning'` (only segments exporting `instant`) |

## Notes

- A direct visit gets the static shell as HTML (e.g. from a CDN); a client navigation only re-renders below the shared layout, so `<Suspense>` fallbacks above that point don't apply during the transition.
- With Cache Components enabled, every Page/Default segment is validated in development by default; validation surfaces blocking components and suggests `use cache`, `<Suspense>`, or `instant = false`.
- `"use cache: private"` results are cached only in the browser (not the server) and cannot be part of the static shell — pairs with runtime prefetching instead.
- Test both initial page load (`page.goto()`) and client navigation (`<Link>` click) since a `<Suspense>` boundary can cover one without covering the other.
- Run `next build --debug-prerender` equivalents against `next dev`/`next start` with `exposeTestingApiInProductionBuild` to run `instant()` tests in CI against a production build.

## Related

- [Adopting Partial Prefetching](./adopting-partial-prefetching.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
- [Prefetching](./prefetching.md)
