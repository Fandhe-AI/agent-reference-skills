---
source: https://tanstack.com/query/latest/docs/reference/onlineManager
---

# onlineManager

Monitors and controls network connectivity status within TanStack Query. Per default, the `onlineManager` assumes an active network connection, and listens to the `online` and `offline` events.

## Signature / Usage

```tsx
import { onlineManager } from '@tanstack/react-query'

// React Native
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

## Methods

| Name | Description |
|------|-------------|
| `setEventListener(callback)` | Establish custom network detection logic |
| `subscribe(callback)` | Monitor online state changes; returns unsubscribe function |
| `setOnline(boolean)` | Manually override the online/offline status |
| `isOnline()` | Retrieve the current connectivity state |

## Notes

- The system defaults to assuming the user is online rather than relying on `navigator.onLine`, which produces unreliable results in Chromium browsers. This approach minimizes false negatives but may cause false positives in offline-capable service worker applications

## Related

- [focusManager](./focus-manager.md)
