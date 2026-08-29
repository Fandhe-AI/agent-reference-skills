---
source: https://tanstack.com/query/latest/docs/framework/react/guides/window-focus-refetching
---

# Window Focus Refetching

TanStack Query refetches stale query data automatically when the window regains focus. Configurable globally or per-query.

## Signature / Usage

```tsx
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }, // default: true
})

useQuery({ queryKey: ['todos'], queryFn: fetchTodos, refetchOnWindowFocus: false })
```

Custom focus event handling:

```tsx
import { focusManager } from '@tanstack/react-query'

focusManager.setEventListener((handleFocus) => {
  if (typeof window !== 'undefined' && window.addEventListener) {
    const handler = () => handleFocus(document.visibilityState === 'visible')
    window.addEventListener('visibilitychange', handler, false)
    return () => window.removeEventListener('visibilitychange', handler)
  }
})
```

React Native:

```tsx
import { AppState } from 'react-native'
import { focusManager } from '@tanstack/react-query'

function onAppStateChange(status) {
  if (Platform.OS !== 'web') focusManager.setFocused(status === 'active')
}
```

## Notes

- `focusManager.setEventListener` replaces the previously set handler entirely.
- Manage focus state manually with `focusManager.setFocused(true | false | undefined)` (`undefined` restores default detection).

## Related

- [background-fetching-indicators.md](./background-fetching-indicators.md)
