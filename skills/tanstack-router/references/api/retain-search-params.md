---
source: https://tanstack.com/router/latest/docs/api/router/retainSearchParamsFunction
---

# retainSearchParams

A search middleware that retains search params across navigations.

## Signature / Usage

```tsx
import { createRootRoute, retainSearchParams } from '@tanstack/react-router'

export const Route = createRootRoute({
  validateSearch: searchSchema,
  search: {
    middlewares: [retainSearchParams(['rootValue'])],
  },
})
```

```ts
retainSearchParams(true | string[])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `true` | `boolean` | Retains all search params |
| `string[]` | `string[]` | Retains only the specified search param keys |

## Notes

- Configured inside a route's `search.middlewares` array; can be applied at the root route or any file route.

## Related

- [stripSearchParams](./strip-search-params.md)
- [useSearch](./use-search.md)
