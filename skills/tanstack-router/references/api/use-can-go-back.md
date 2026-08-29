---
source: https://tanstack.com/router/latest/docs/api/router/useCanGoBack
---

# useCanGoBack

Returns a boolean representing whether router history can safely go back without exiting the application.

## Signature / Usage

```tsx
import { useRouter, useCanGoBack } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div>
      {canGoBack ? (
        <button onClick={() => router.history.back()}>Go back</button>
      ) : null}
    </div>
  )
}
```

```ts
useCanGoBack(): boolean
```

## Notes

- Returns `true` if the router history index is not `0`, `false` otherwise.
- Experimental. Navigating with `reloadDocument: true` resets the history index, so the new location is treated as initial and `useCanGoBack` returns `false`.

## Related

- [useRouter](./use-router.md)
- [useLocation](./use-location.md)
