---
source: https://tanstack.com/query/latest/docs/reference/focusManager
---

# focusManager

Manages the focus state within TanStack Query. It enables customization of event listeners and manual control of the application's focus state.

## Signature / Usage

```tsx
import { focusManager } from '@tanstack/react-query'

focusManager.setEventListener((handleFocus) => {
  const listener = () => handleFocus(document.visibilityState === 'visible')
  document.addEventListener('visibilitychange', listener)
  return () => document.removeEventListener('visibilitychange', listener)
})
```

## Methods

| Name | Description |
|------|-------------|
| `setEventListener((handleFocus) => { ... })` | Establishes custom event listeners for focus detection. Should return an unsubscribe function for cleanup |
| `subscribe((isVisible) => { ... })` | Monitors visibility state changes. Returns an unsubscribe function |
| `setFocused(focused: boolean \| undefined)` | Manually controls focus state. Accepts `true`, `false`, or `undefined` (for default behavior) |
| `isFocused()` | Retrieves current focus state as a boolean |

## Notes

- The `visibilitychange` event is commonly used for detecting focus changes
- Passing `undefined` to `setFocused` restores default focus detection logic

## Related

- [onlineManager](./online-manager.md)
