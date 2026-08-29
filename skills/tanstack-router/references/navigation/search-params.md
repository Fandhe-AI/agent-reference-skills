---
source: https://tanstack.com/router/latest/docs/framework/react/guide/search-params
---

# Search Params

TanStack Router treats URL search params as JSON-first, structured, and type-validated application state, going beyond flat/string-only `URLSearchParams`.

## Signature / Usage

```tsx title="src/routes/shop/products.tsx"
import { z } from 'zod'

const productSearchSchema = z.object({
  page: z.number().catch(1),
  filter: z.string().catch(''),
  sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
})

export const Route = createFileRoute('/shop/products')({
  validateSearch: productSearchSchema,
})

function ProductList() {
  const { page, filter, sort } = Route.useSearch()
  return <div>...</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `validateSearch` | `(search: Record<string, unknown>) => T` \| schema | Validates/types raw parsed search params; inherited by child routes |
| `search.middlewares` | `SearchMiddleware[]` | Transform search params when building links and after navigation validation |
| `retainSearchParams(keys)` | helper | Built-in middleware that always retains listed search keys on generated links |
| `stripSearchParams(defaults)` | helper | Built-in middleware that strips search keys matching given default values |

## Notes

- First-level search values are preserved as real numbers/booleans/strings; nested objects/arrays are JSON-encoded, staying `URLSearchParams`-compliant at the top level.
- If `validateSearch` throws, the route's `onError` fires with `error.routerCode === 'VALIDATE_SEARCH'` and `errorComponent` renders instead of `component`.
- Adapters exist for Zod (`@tanstack/zod-adapter`, only needed for Zod v3; Zod v4 schemas can be used directly), Valibot, ArkType, and Effect/Schema (the latter three implement Standard Schema natively).
- `fallback()` from `@tanstack/zod-adapter` retains typed defaults on validation failure (Zod v3 `catch` loses type info; Zod v4 `catch` does not).
- Read via `Route.useSearch()` inside the route component, `getRouteApi(id).useSearch()` or `useSearch({ from })` outside it, or `useSearch({ strict: false })` for a loosely-typed optional search object.
- Write via `<Link search />`, `navigate({ search })`, `router.navigate({ search })`, or `<Navigate search />`; `search` can be an object or a function of the previous search state.

## Related

- [custom-search-param-serialization.md](./custom-search-param-serialization.md)
- [path-params.md](./path-params.md)
- [navigation.md](./navigation.md)
