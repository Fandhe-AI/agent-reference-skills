---
source: https://tanstack.com/router/latest/docs/api/router/useLoaderDataHook
---

# useLoaderData

Returns the loader data from the closest `RouteMatch` in the component tree.

## Signature / Usage

```tsx
import { useLoaderData } from '@tanstack/react-router'

function Component() {
  const loaderData = useLoaderData({ from: '/posts/$postId' })
  //     ^? { postId: string, body: string, ... }
}
```

```ts
useLoaderData(options?: {
  from?: string
  strict?: boolean
  select?: (loaderData: TLoaderData) => TSelected
  structuralSharing?: boolean
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `string` | — | Route identifier of the closest parent match (recommended for type safety) |
| `strict` | `boolean` | `true` | When `false`, loosens types and ignores `from` |
| `select` | `(loaderData) => TSelected` | — | Filters loader data; triggers re-render via shallow equality |
| `structuralSharing` | `boolean` | — | Enables structural sharing for the selected value |

## Related

- [useLoaderDeps](./use-loader-deps.md)
- [useMatch](./use-match.md)
