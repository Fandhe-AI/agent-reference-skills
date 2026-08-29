---
source: https://tanstack.com/router/latest/docs/api/router/useSearchHook
---

# useSearch

Returns the current search query parameters as an object for the current location.

## Signature / Usage

```tsx
import { useSearch } from '@tanstack/react-router'

function Component() {
  const search = useSearch({ from: '/posts/$postId' })

  const selected = useSearch({
    from: '/posts/$postId',
    select: (search) => search.postView,
  })
}
```

```ts
useSearch(options: UseSearchOptions): SearchObject | TSelected | undefined
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `string` | — | RouteID to match the search params from (required when `strict: true`) |
| `strict` | `boolean` | `true` | When `false`, loosens types to `Partial<FullSearchSchema>` |
| `shouldThrow` | `boolean` | `true` | When `false`, returns `undefined` if no match |
| `select` | `(search) => TSelected` | — | Transforms the returned search object |
| `structuralSharing` | `boolean` | — | Enables structural sharing for the selected value |

## Related

- [useParams](./use-params.md)
- [useLoaderDeps](./use-loader-deps.md)
