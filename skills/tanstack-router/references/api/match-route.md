---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/matchRouteComponent.md
---

# MatchRoute

Wrapper component around `useMatchRoute` that always renders, adjusting its content based on whether a route currently matches — useful for conditional UI such as spinners.

## Signature / Usage

```tsx
import { MatchRoute } from '@tanstack/react-router'

<MatchRoute to="/posts/$postId" params={{ postId: '123' }} pending>
  {(match) => <Spinner show={!!match} wait="delay-50" />}
</MatchRoute>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...useMatchRoute options` | — | All options accepted by `useMatchRoute` |
| `children` | `React.ReactNode \| (match: params \| false) => React.ReactNode` | Static node, or function receiving the matched params (or `false` if no match) |

## Related

- [useMatchRoute](./use-match-route.md)
