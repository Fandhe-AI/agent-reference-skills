# Updating the UI from outside the UI thread

UI elements (any `DependencyObject`) may only be created and accessed on the thread that owns them — typically the UI thread. Code running on a background thread, thread-pool work item, or timer callback must marshal the update back with `DispatcherQueue.TryEnqueue`.

## Signature / Usage

```csharp
// Capture the DispatcherQueue on the UI thread (e.g. in a Page/Window field or constructor).
private readonly DispatcherQueue _dispatcherQueue =
    Microsoft.UI.Dispatching.DispatcherQueue.GetForCurrentThread();

public void NotifyUser(string message)
{
    // Skip the enqueue overhead if already on the right thread.
    if (_dispatcherQueue.HasThreadAccess)
    {
        StatusBlock.Text = message;
    }
    else
    {
        bool isQueued = _dispatcherQueue.TryEnqueue(
            Microsoft.UI.Dispatching.DispatcherQueuePriority.Normal,
            () => StatusBlock.Text = message);
    }
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `DispatcherQueue.HasThreadAccess` | Fast check for "am I already on the UI thread" — avoids an unnecessary enqueue round-trip. |
| `DispatcherQueue.TryEnqueue(...)` | Marshals a delegate onto the `DispatcherQueue`'s thread; returns `false` if it couldn't be queued (e.g. queue shutting down). |
| Render thread (composition) | A separate thread applies certain UI changes (some animations/transitions that don't affect layout) without needing the UI thread — not a general-purpose escape hatch for arbitrary UI updates. |

## Notes

- Applies to WinUI 3 / Windows App SDK apps (`Microsoft.UI.Dispatching.DispatcherQueue`). For UWP apps, the equivalent is `CoreDispatcher.RunAsync`/`CoreDispatcher.HasThreadAccess` — see CoreDispatcher migration.
- `await`ing a `Task`/WinRT async call from a UI-thread `async` method already resumes on the UI thread automatically (via the captured `SynchronizationContext`) — an explicit `TryEnqueue` is only needed when the update originates from code that isn't already running as a continuation on that thread (e.g. inside a `ThreadPool.RunAsync` work item, a `DispatcherQueueTimer`/`ThreadPoolTimer` tick, or another thread entirely).
- Don't try to update the UI (other than toasts/notifications) from a background-task work item; use `IBackgroundTaskInstance.Progress`/completion handlers instead.
- Capture the `DispatcherQueue` reference on the UI thread *before* handing work off to a background thread — a background thread has no `DispatcherQueue` of its own to call `GetForCurrentThread()` against for the UI.

## Related

- [DispatcherQueue](./dispatcher-queue.md)
- [Thread pool](./thread-pool.md)
- [async/await and ConfigureAwait](./async-await-configureawait.md)
