---
source: https://tanstack.com/router/latest/docs/api/router/lazyRouteComponentFunction
---

# lazyRouteComponent

Creates a code-split route component (for code-based routing) with preload capability via `component.preload()`.

## Signature / Usage

```tsx
import { lazyRouteComponent } from '@tanstack/react-router'

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(() => import('./Post')),
})
```

```ts
lazyRouteComponent(importer, exportName?)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `importer` | `() => Promise<T>` | Function returning a promise resolving to an object containing the component (required) |
| `exportName` | `string` | Which named export to use; defaults to `'default'` |

## Notes

- File-based routing users should use `createLazyFileRoute` instead of this function directly.

## Related

- [createLazyFileRoute](./create-lazy-file-route.md)
- [createRoute](./create-route.md)
