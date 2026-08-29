---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/awaitComponent.md
---

# Await

Suspends rendering until the provided promise is resolved or rejected. Targeted at React 18; React 19 users can use the `use()` hook instead.

## Signature / Usage

```tsx
import { Await } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `promise` | `Promise<T>` | The promise to await (required) |
| `children` | `(value: T) => React.ReactNode` | Function receiving the resolved value and returning React nodes (required) |

## Notes

- Throws an error if the promise rejects; suspends (throws the promise) while pending; renders via `children` once resolved.

## Related

- [defer](./defer.md)
- [useAwaited](./use-awaited.md)
