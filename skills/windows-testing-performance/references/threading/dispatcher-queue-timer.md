# DispatcherQueueTimer

Executes a task on a `DispatcherQueue` periodically (or once) after a time interval elapses. Created via `DispatcherQueue.CreateTimer()`.

## Signature / Usage

```csharp
DispatcherQueueController controller = DispatcherQueueController.CreateOnDedicatedThread();
DispatcherQueue queue = controller.DispatcherQueue;

DispatcherQueueTimer repeatingTimer = queue.CreateTimer();
repeatingTimer.Interval = TimeSpan.FromSeconds(5);
repeatingTimer.IsRepeating = true; // defaults to true

repeatingTimer.Tick += (s, e) =>
{
    DoWork();
};

repeatingTimer.Start();
// ...
repeatingTimer.Stop();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Interval` | `TimeSpan` (get/set) | The timer interval. |
| `IsRepeating` | `bool` (get/set) | Whether the timer fires repeatedly (`true`) or once (`false`). |
| `IsRunning` | `bool` (get) | Whether the timer is currently running. |
| `Start()` | method | Starts the timer. |
| `Stop()` | method | Stops the timer. |
| `Tick` | event | Raised when `Interval` elapses. |

## Notes

- Applies to WinUI 3 / Windows App SDK apps (`Microsoft.UI.Dispatching` namespace) — distinct from UWP/Win32 `Windows.System.Threading.ThreadPoolTimer` (see the thread pool page), which is not tied to a `DispatcherQueue`.
- The tick handler is guaranteed to run only after the interval expires, but may be delayed further by other pending items in the queue; timer tasks run at a priority lower than idle.
- Timers don't keep the `DispatcherQueue` event loop alive — a timer created after the event loop has stopped is never processed.

## Related

- [DispatcherQueue](./dispatcher-queue.md)
- [DispatcherQueueController](./dispatcher-queue-controller.md)
- [Thread pool](./thread-pool.md)
