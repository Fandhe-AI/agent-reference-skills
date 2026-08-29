---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/deferFunction.md
---

# defer

Wraps a promise with a deferred state object that can be inspected and passed to `useAwaited` or `<Await>` for suspending until the promise resolves or rejects.

## Signature / Usage

```tsx
import { defer } from '@tanstack/react-router'

const route = createRoute({
  loader: () => {
    const deferredPromise = defer(fetch('/api/data'))
    return { deferredPromise }
  },
  component: MyComponent,
})

function MyComponent() {
  const { deferredPromise } = Route.useLoaderData()
  const data = useAwaited({ promise: deferredPromise })
  return <div>{JSON.stringify(data)}</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `promise` | `Promise<T>` | The promise to wrap with a deferred state object (required) |

## Notes

- You don't need to call `defer` manually anymore — promises returned from a loader are handled automatically.

## Related

- [Await](./await.md)
- [useAwaited](./use-awaited.md)
