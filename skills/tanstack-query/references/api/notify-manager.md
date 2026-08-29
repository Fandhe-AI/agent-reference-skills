---
source: https://tanstack.com/query/latest/docs/reference/notifyManager
---

# notifyManager

Manages scheduling and batching callbacks. It optimizes update handling through controlled batching and scheduling mechanisms.

## Signature / Usage

```ts
import { notifyManager } from '@tanstack/react-query'

notifyManager.setScheduler(queueMicrotask)
```

## Methods

| Name | Description |
|------|-------------|
| `batch<T>(callback: () => T): T` | Batches all updates within the callback for optimization |
| `batchCalls<T extends Array<unknown>>(callback: BatchCallsCallback<T>): BatchCallsCallback<T>` | Wraps callbacks to schedule execution in the next batch cycle |
| `schedule(callback: () => void): void` | Queues a function for the next batch, using `setTimeout` by default |
| `setNotifyFunction(fn)` | Overrides the notify function that executes callbacks. Useful for test environments |
| `setBatchNotifyFunction(fn)` | Configures framework-specific batching (e.g. Solid.js `batch` function) |
| `setScheduler(fn)` | Defines custom timing for batch execution via custom schedulers |

## Notes

```ts
// Wrapping notifications with React's test utilities
notifyManager.setNotifyFunction(act)

// Custom schedulers for batch timing
notifyManager.setScheduler(queueMicrotask)
notifyManager.setScheduler(requestAnimationFrame)
notifyManager.setScheduler((cb) => setTimeout(cb, 10))
```

## Related

- [focusManager](./focus-manager.md)
- [onlineManager](./online-manager.md)
