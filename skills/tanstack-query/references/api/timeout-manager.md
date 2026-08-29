---
source: https://tanstack.com/query/latest/docs/reference/timeoutManager
---

# timeoutManager

Manages `setTimeout` and `setInterval` timers within TanStack Query, supporting features like query staleness, garbage collection, retries, throttling, and debouncing. Defaults to global timer functions, but developers can configure custom implementations for specialized use cases.

## Signature / Usage

```tsx
import { timeoutManager } from '@tanstack/react-query'

timeoutManager.setTimeoutProvider(customProvider)
// must be called before creating a QueryClient
```

## Methods

| Name | Description |
|------|-------------|
| `setTimeoutProvider(provider)` | Establishes a custom `TimeoutProvider` implementation. Must be called before creating a `QueryClient` to ensure consistent timer behavior |
| `setTimeout(callback, delayMs)` | Schedules callback execution after approximately the specified delay, returning a timer ID |
| `clearTimeout(timerId)` | Cancels a scheduled timeout using its timer ID |
| `setInterval(callback, intervalMs)` | Repeatedly executes a callback at approximately the specified interval, returning a timer ID |
| `clearInterval(intervalId)` | Stops an active interval using its interval ID |

## Notes

- It is important to call `setTimeoutProvider` before creating a `QueryClient` to maintain consistency
- Custom providers should handle timer IDs convertible via `Symbol.toPrimitive` to accommodate runtime variations like Node.js
- Long-term timers may benefit from timer coalescing techniques using hierarchical time wheel data structures
- Global `setTimeout` has a maximum delay of approximately 24 days

## Related

- [environmentManager](./environment-manager.md)
