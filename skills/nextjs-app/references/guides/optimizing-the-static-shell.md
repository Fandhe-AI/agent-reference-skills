# Optimizing the static shell

Use Cache Components to keep layouts, navigation, and useful loading states in the prerendered static shell while request-time content streams through focused `<Suspense>` boundaries.

## Signature / Usage

```tsx filename="app/products/page.tsx" highlight={3-4}
// After: only inventory uses the loading state
<main>
  <h1>Products</h1>
  <p>Browse the latest products.</p>
  <Suspense fallback={<InventorySkeleton />}>
    <LiveInventory />
  </Suspense>
</main>
```

```tsx filename="app/products/product-list.tsx" highlight={5-6}
// After: the reusable result can render in the shell
import { cacheLife } from 'next/cache'

export async function ProductList() {
  'use cache'
  cacheLife('hours')

  const products = await db.products.findMany()
  return <List products={products} />
}
```

## Options / Props

| Pattern | Use it when | Result |
|---------|-------------|--------|
| Keep static UI in the shell | UI does not need data | The UI can render in the static shell |
| Stream request-time work | A region needs data only known at request time | Its nearest `<Suspense>` fallback can render first |
| Cache reusable work | A result can be reused across requests | The completed result can render in the static shell |

## Notes

- Prerequisite: enable `cacheComponents` and resolve the route's blocking validation errors first (see Migrating to Cache Components). Consider Partial Prefetching for client navigations.
- Push data access down: move `params`, `searchParams`, `cookies()`, `headers()` reads into the Server Component for the region that needs them, behind `<Suspense>`. Resolve small promises inline with `.then()`, or start a request without awaiting it and pass the promise to a Client Component that unwraps it with `use()`. Client Components can often use `useParams()` / `useSearchParams()` instead, which resolve synchronously during a client navigation.
- Loading states: use sibling boundaries for independent regions, nested boundaries to reveal related regions in stages. Keep the layout-owning container outside the boundary, and reserve space in fallbacks. An empty fallback is only appropriate when the resolved component also has no visual footprint (e.g. an auth gate returning `null`). `loading.tsx` can remain as an outer fallback.
- Related patterns: parallel data fetching, preloading, passing runtime values as arguments to cached functions, React `cache()` for per-request dedup, on-demand revalidation when writes change cached data.
- Validation: `next dev` validates whether each page load or client navigation has instant UI; a route can be instant for one entry point and show an insight for another. Suggested fixes: cache the component or data, or wrap in / move into Suspense. Use `instant()` from `@next/playwright` to assert the static shell. For production builds with `next start`, enable `experimental.exposeTestingApiInProductionBuild` for the test build.
- A layout redirect does not protect a database query or Server Action; keep authorization checks in the data access functions. `unauthorized()` / `forbidden()` after streaming starts keep a `200` status.
- Optimizer skill: `npx skills add vercel/next.js --skill next-cache-components-optimizer`.

## Related

- [Migrating to Cache Components](./migrating-to-cache-components.md)
- [Optimizing prefetching](./optimizing-prefetching.md)
- [Instant navigation](./instant-navigation.md)
- [Streaming](./streaming.md)
- [Authentication with Cache Components](./authentication-with-cache-components.md)
