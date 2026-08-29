---
source: https://tanstack.com/router/latest/docs/api/router/useRouteContextHook
---

# useRouteContext

Returns the current context for the current route.

## Signature / Usage

```tsx
import { useRouteContext } from '@tanstack/react-router'

function Component() {
  const context = useRouteContext({ from: '/posts/$postId' })

  const selected = useRouteContext({
    from: '/posts/$postId',
    select: (context) => context.postId,
  })
}
```

```ts
useRouteContext(options: { from: string; select?: (context: RouteContext) => TSelected })
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `from` | `string` | Yes | RouteID to match the route context from |
| `select` | `(context: RouteContext) => TSelected` | No | Transforms the returned context object |

## Related

- [createRootRouteWithContext](./create-root-route-with-context.md)
- [useMatch](./use-match.md)
