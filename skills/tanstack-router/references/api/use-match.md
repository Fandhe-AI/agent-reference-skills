---
source: https://tanstack.com/router/latest/docs/api/router/useMatchHook
---

# useMatch

Returns a `RouteMatch` in the component tree. It provides access to the raw route match and powers other hooks like `useParams` and `useLoaderData`.

## Signature / Usage

```tsx
import { useMatch } from '@tanstack/react-router'

function Component() {
  const match = useMatch({ from: '/posts/$postId' })
}
```

```ts
useMatch(opts: UseMatchOptions): RouteMatch | Partial<RouteMatch> | undefined
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `string` | — | RouteID of a match; required when `strict: true` |
| `strict` | `boolean` | `true` | When `false`, `from` must not be set |
| `shouldThrow` | `boolean` | `true` | When `false`, returns `undefined` if no match |
| `select` | `(match) => TSelected` | — | Transforms the returned match |
| `structuralSharing` | `boolean` | — | Enables structural sharing for the selected value |

## Related

- [RouteMatch](./route-match.md)
- [useMatches](./use-matches.md)
