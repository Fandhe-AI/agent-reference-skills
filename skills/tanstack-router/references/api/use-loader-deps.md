---
source: https://tanstack.com/router/latest/docs/api/router/useLoaderDepsHook
---

# useLoaderDeps

Returns an object with the dependencies used to trigger the `loader` for a given route.

## Signature / Usage

```tsx
import { useLoaderDeps } from '@tanstack/react-router'

function Component() {
  const deps = useLoaderDeps({ from: '/posts/$postId' })

  const postId = useLoaderDeps({
    from: '/posts',
    select: (deps) => deps.view,
  })
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `from` | `string` | Yes | RouteID or path to get loader dependencies from |
| `select` | `(deps: TLoaderDeps) => TSelected` | No | Transforms the returned dependencies object |
| `structuralSharing` | `boolean` | No | Enables structural sharing for the selected value |

## Related

- [useLoaderData](./use-loader-data.md)
