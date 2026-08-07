# Thread pool (Windows.System.Threading)

`Windows.System.Threading.ThreadPool` runs work items asynchronously without the overhead of managing threads manually, and offers `ThreadPoolTimer` for delayed/periodic work. It coexists with — and is distinct from — .NET's `Task.Run`/`ThreadPool`.

## Signature / Usage

```csharp
// Capture the DispatcherQueue on the UI thread before entering the background lambda.
var dispatcherQueue = Microsoft.UI.Dispatching.DispatcherQueue.GetForCurrentThread();

IAsyncAction asyncAction = Windows.System.Threading.ThreadPool.RunAsync((workItem) =>
{
    if (workItem.Status == AsyncStatus.Canceled)
    {
        return;
    }

    // ... CPU-bound work ...

    dispatcherQueue.TryEnqueue(
        Microsoft.UI.Dispatching.DispatcherQueuePriority.High,
        () => UpdateUI("done"));
});

asyncAction.Completed = new AsyncActionCompletedHandler((info, status) =>
{
    if (status == AsyncStatus.Canceled) return;
    dispatcherQueue.TryEnqueue(() => UpdateUI("completed"));
});

// Cancel later if needed.
asyncAction.Cancel();

// Single-shot timer.
ThreadPoolTimer delayTimer = ThreadPoolTimer.CreateTimer((source) =>
{
    CleanUpTempCache();
}, TimeSpan.FromMinutes(3));

delayTimer.Cancel();

// Periodic timer.
ThreadPoolTimer periodicTimer = ThreadPoolTimer.CreatePeriodicTimer((source) =>
{
    PollSensorAndQueueUiUpdate();
}, TimeSpan.FromSeconds(2));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ThreadPool.RunAsync(WorkItemHandler)` | static method → `IAsyncAction` | Queues a work item at default priority (`Normal`) and concurrency behavior. |
| `ThreadPool.RunAsync(WorkItemHandler, WorkItemPriority)` | static method → `IAsyncAction` | Queues a work item at the specified priority. |
| `ThreadPool.RunAsync(WorkItemHandler, WorkItemPriority, WorkItemOptions)` | static method → `IAsyncAction` | Also controls whether the item can run concurrently with other instances (`WorkItemOptions.TimeSliced` vs default). |
| `WorkItemPriority` | enum | `Low`, `Normal` (default), `High`. |
| `ThreadPoolTimer.CreateTimer(TimerElapsedHandler, TimeSpan delay)` | static method → `ThreadPoolTimer` | Single-shot timer; submits a work item after `delay`. |
| `ThreadPoolTimer.CreateTimer(TimerElapsedHandler, TimeSpan delay, TimerDestroyedHandler)` | static method → `ThreadPoolTimer` | Adds a handler invoked on cancellation or completion. |
| `ThreadPoolTimer.CreatePeriodicTimer(TimerElapsedHandler, TimeSpan period)` | static method → `ThreadPoolTimer` | Recurring timer; must not be given a *period* < 1&nbsp;ms. |
| `ThreadPoolTimer.Cancel()` | method | Cancels a pending or periodic timer; the work item won't be submitted (or won't run again). |
| `IAsyncAction.Status` / `IAsyncInfo.Status` | property → `AsyncStatus` | Checked inside the work item to detect `AsyncStatus.Canceled` and exit early. |
| `IAsyncAction.Completed` | property (setter) → `AsyncActionCompletedHandler` | Completion callback, invoked with the final `AsyncStatus`. |

## Notes

- Applies to UWP and Windows App SDK / WinUI 3 apps (`Windows.System.Threading` namespace) — separate from .NET's `System.Threading.ThreadPool` / `Task.Run`. Prefer `Windows.System.Threading.ThreadPool` when you need WinRT-native cancellation (`IAsyncAction.Cancel`), progress-style `Completed` handlers, or `ThreadPoolTimer`; prefer .NET `Task.Run` for plain CPU-bound work already living in `async`/`await` code, since it composes naturally with `Task` continuations and `ConfigureAwait`.
- Work items run asynchronously and can execute in any order — keep them short-lived and independent.
- Never call `Thread.Sleep` on a work item's thread; use `ThreadPoolTimer.CreateTimer` instead, since `Sleep` blocks a pooled thread without yielding it back.
- Don't create periodic timers with a period below 1&nbsp;ms (including 0) — it degrades to single-shot behavior. Don't submit periodic work that regularly takes longer than the specified period to run.
- To update the UI from a work item, capture the `DispatcherQueue` (`GetForCurrentThread()`) on the UI thread beforehand and call `TryEnqueue` from the work item — see UI thread updates.
- With `async` work-item handlers, the thread pool may mark the work item complete before all code after an internal `await` has actually executed; don't assume completion implies the whole handler body ran.
- Background-task work items (invoked from an `IBackgroundTask.Run`) must not attempt direct UI updates (other than toasts/notifications); report status via `IBackgroundTaskInstance.Progress` instead — see Background tasks.

## Related

- [DispatcherQueueTimer](./dispatcher-queue-timer.md)
- [UI thread updates](./ui-thread-updates.md)
- [Background tasks](./background-tasks.md)
