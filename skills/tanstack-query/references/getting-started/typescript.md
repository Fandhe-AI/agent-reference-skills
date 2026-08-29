---
source: https://tanstack.com/query/latest/docs/framework/react/typescript
---

# TypeScript

TanStack Query is written in TypeScript for type-safety; types flow through `useQuery`/`useMutation` automatically when `queryFn` has a well-defined return type.

## Signature / Usage

```tsx
const fetchGroups = (): Promise<Group[]> =>
  axios.get('/groups').then((response) => response.data)

const { data } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const data: Group[] | undefined
```

Registering a global error type:

```tsx
import '@tanstack/react-query'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: unknown
  }
}
```

Extracting typed query options with `queryOptions`:

```ts
import { queryOptions } from '@tanstack/react-query'

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

useQuery(groupOptions())
const data = queryClient.getQueryData(groupOptions().queryKey)
```

## Notes

- Follows DefinitelyTyped's support window: TypeScript versions released within the last 2 years (currently 5.6+)
- Type changes are considered **non-breaking** and released as patch semver — lock to a specific patch version if type stability matters
- Query result uses a discriminated union on `status` (and derived boolean flags like `isSuccess`) to narrow `data`
- Error type defaults to `Error`; can be customized via generics or globally via `Register.defaultError` (module augmentation)
- Global `Meta`, `QueryKey`, and `MutationKey` types can also be registered via the same `Register` interface
- `mutationOptions` mirrors `queryOptions` for extracting reusable typed mutation configs
- `skipToken` provides typesafe query disabling (see disabling-queries guide)

## Related

- [Quick Start](./quick-start.md)
