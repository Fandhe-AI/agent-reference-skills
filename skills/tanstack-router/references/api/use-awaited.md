---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/useAwaitedHook.md
---

# useAwaited

Suspends rendering of a component until an asynchronous promise settles, integrating with React's Suspense mechanism.

## Signature / Usage

```tsx
import { useAwaited } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = Route.useLoaderData()
  const data = useAwaited({ promise: deferredPromise })
  return <div>{JSON.stringify(data)}</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `promise` | `Promise<T>` | The deferred promise to await (required) |

## Notes

- Pending: suspends (throws the promise) while awaiting resolution.
- Resolved: returns the resolved value.
- Rejected: throws the rejection error.

## Related

- [defer](./defer.md)
- [Await](./await.md)
