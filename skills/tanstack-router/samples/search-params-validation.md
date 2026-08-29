---
source: https://tanstack.com/router/latest/docs/framework/react/guide/search-params
---

# Search Params Validation with Zod

Validate and type URL search params with `validateSearch`, then read them with `Route.useSearch()`.

```tsx
// src/routes/shop.products.tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const productSearchSchema = z.object({
  page: z.number().catch(1),
  filter: z.string().catch(''),
  sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
})

export const Route = createFileRoute('/shop/products')({
  validateSearch: productSearchSchema,
  component: ProductList,
})

function ProductList() {
  const { page, filter, sort } = Route.useSearch()
  return (
    <div>
      Page {page}, filter "{filter}", sorted by {sort}
    </div>
  )
}
```

```tsx
// Navigating while updating a single search param
import { Link } from '@tanstack/react-router'

function NextPageLink() {
  return (
    <Link
      to="/shop/products"
      search={(prev) => ({ ...prev, page: prev.page + 1 })}
    >
      Next page
    </Link>
  )
}
```

## Notes

- Zod v4 schemas can be passed to `validateSearch` directly; Zod v3 needs `@tanstack/zod-adapter`.
- `validateSearch` is inherited by child routes and re-runs on every navigation into the route.
- If validation throws, `errorComponent` renders instead of `component` and `error.routerCode === 'VALIDATE_SEARCH'`.
- Outside the owning route, read search state with `useSearch({ from: '/shop/products' })` or the loosely-typed `useSearch({ strict: false })`.
