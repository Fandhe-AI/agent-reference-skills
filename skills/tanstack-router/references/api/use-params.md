---
source: https://tanstack.com/router/latest/docs/api/router/useParamsHook
---

# useParams

Returns all path parameters parsed for the closest match and all of its parent matches.

## Signature / Usage

```tsx
import { useParams } from '@tanstack/react-router'

function Component() {
  const params = useParams({ from: '/posts/$postId' })
  const postId = useParams({
    from: '/posts/$postId',
    select: (params) => params.postId,
  })
}
```

```ts
useParams(options?: {
  strict?: boolean
  shouldThrow?: boolean
  select?: (params: AllParams) => TSelected
  structuralSharing?: boolean
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `strict` | `boolean` | Defaults `true`; when `false`, `from` is ignored and the type becomes `Partial<AllParams>` |
| `shouldThrow` | `boolean` | Defaults `true`; when `false`, returns `undefined` instead of throwing if no match |
| `select` | `(params: AllParams) => TSelected` | Transforms the returned params (enables derived state) |
| `structuralSharing` | `boolean` | Enables shallow-equality based structural sharing for the selected value |

## Related

- [useSearch](./use-search.md)
- [useMatch](./use-match.md)
