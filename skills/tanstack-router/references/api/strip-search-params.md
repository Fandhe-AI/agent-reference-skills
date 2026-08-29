---
source: https://tanstack.com/router/latest/docs/api/router/stripSearchParamsFunction
---

# stripSearchParams

A search middleware that removes search params from the URL.

## Signature / Usage

```tsx
import { z } from 'zod'
import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

const searchSchema = z.object({
  one: z.string().default('abc'),
  two: z.string().default('xyz'),
})

export const Route = createFileRoute('/')({
  validateSearch: searchSchema,
  search: {
    middlewares: [stripSearchParams({ one: 'abc', two: 'xyz' })],
  },
})
```

```ts
stripSearchParams(input: true | string[] | object)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `true` | `boolean` | Strips all search params (only valid when the schema has no required params) |
| `string[]` | `string[]` | Optional search param keys to remove |
| `object` | `object` | Params deeply equal to the given values are removed (useful for stripping defaults) |

## Notes

- Only optional search params may be specified for removal; required params cannot be stripped.

## Related

- [retainSearchParams](./retain-search-params.md)
