# DispatcherQueue

Manages a prioritized queue on which tasks execute in a serial fashion on a thread. `Microsoft.UI.Dispatching.DispatcherQueue` (Windows App SDK) is the WinUI 3 replacement for UWP's `Windows.UI.Core.CoreDispatcher`.

## Signature / Usage

```csharp
// Get the DispatcherQueue for the current thread (e.g. inside a Page/Window constructor).
DispatcherQueue dispatcherQueue = Microsoft.UI.Dispatching.DispatcherQueue.GetForCurrentThread();

// From a background thread, marshal work back onto the captured DispatcherQueue.
bool wasQueued = dispatcherQueue.TryEnqueue(() =>
{
    StatusBlock.Text = "Updated from a background thread";
});

// With explicit priority.
dispatcherQueue.TryEnqueue(
    Microsoft.UI.Dispatching.DispatcherQueuePriority.High,
    () => ProgressBar.Value = 100);

// Check whether the calling thread is already the DispatcherQueue's thread.
if (this.DispatcherQueue.HasThreadAccess)
{
    StatusBlock.Text = "Direct update, no marshaling needed";
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `HasThreadAccess` | `bool` (property, get) | Whether the `DispatcherQueue` has access to the current thread. Use it to avoid an unnecessary `TryEnqueue` when already on the right thread. |
| `GetForCurrentThread()` | static method → `DispatcherQueue` | Gets the `DispatcherQueue` associated with the current thread (`null` if none was created). |
| `TryEnqueue(DispatcherQueueHandler)` | method → `bool` | Adds a task to run on the thread associated with the `DispatcherQueue`, at `Normal` priority. |
| `TryEnqueue(DispatcherQueuePriority, DispatcherQueueHandler)` | method → `bool` | Adds a task to run on the thread associated with the `DispatcherQueue`, at the specified priority. |
| `CreateTimer()` | method → `DispatcherQueueTimer` | Creates a `DispatcherQueueTimer` on this `DispatcherQueue`. |
| `EnqueueEventLoopExit()` | method | Enqueues a message-loop exit message; used with `RunEventLoop`. |
| `RunEventLoop()` | method | Runs a message loop until `EnqueueEventLoopExit` or `PostQuitMessage` is called. |
| `EnsureSystemDispatcherQueue()` | method | Has this `DispatcherQueue` also manage the shutdown of the system `Windows.System.DispatcherQueue` on the same thread (needed by components such as `MicaController`). |
| `ShutdownStarting` / `ShutdownCompleted` | events | Raised (app-facing) when `DispatcherQueueController.ShutdownQueue`/`ShutdownQueueAsync` runs down the queue. |
| `FrameworkShutdownStarting` / `FrameworkShutdownCompleted` | events | Raised (framework-facing), between `ShutdownStarting` and `ShutdownCompleted`. |

`DispatcherQueuePriority` fields: `Low` (-10, runs only when idle, preemptable), `Normal` (0, default), `High` (10, dispatched before `Normal`/`Low`).

## Notes

- Applies to WinUI 3 / Windows App SDK apps (`Microsoft.UI.Dispatching` namespace). This is a distinct type from UWP's `Windows.UI.Core.CoreDispatcher` — see the CoreDispatcher migration page.
- The `DispatcherQueue` is a thread singleton: at most one runs on a given thread, and by default a thread has none. A `DispatcherQueueController` must initialize it first (see the DispatcherQueueController page).
- Timer tasks (`DispatcherQueueTimer`) run at a priority lower than idle and don't keep the event loop alive by themselves.
- `TryEnqueue` returns `false` if the queue can't accept the work (e.g. it's shutting down); check the return value for reliability-sensitive code instead of assuming success.

## Related

- [DispatcherQueueController](./dispatcher-queue-controller.md)
- [DispatcherQueueTimer](./dispatcher-queue-timer.md)
- [CoreDispatcher / CoreApplication migration](./core-dispatcher-migration.md)
- [UI thread updates](./ui-thread-updates.md)
