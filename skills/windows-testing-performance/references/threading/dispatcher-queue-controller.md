# DispatcherQueueController

Manages the lifetime of a `DispatcherQueue`. `Microsoft.UI.Dispatching.DispatcherQueueController` is what creates and shuts down the `DispatcherQueue` for a thread.

## Signature / Usage

```csharp
// Create a DispatcherQueue running its own message loop on a dedicated background thread.
DispatcherQueueController controller =
    Microsoft.UI.Dispatching.DispatcherQueueController.CreateOnDedicatedThread();

DispatcherQueue queue = controller.DispatcherQueue;

queue.TryEnqueue(() => { /* work on the dedicated thread */ });

// Shut the queue (and its dedicated thread) down when no longer needed.
await controller.ShutdownQueueAsync();
```

```cppwinrt
// Take over the current thread's message loop (e.g. custom Win32 message loop / XAML Islands).
auto dispatcherQueueController{ winrt::DispatcherQueueController::CreateOnCurrentThread() };
dispatcherQueueController.DispatcherQueue().RunEventLoop();
dispatcherQueueController.ShutdownQueue();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DispatcherQueue` | property → `DispatcherQueue` | The `DispatcherQueue` associated with this controller. |
| `CreateOnDedicatedThread()` | static method → `DispatcherQueueController` | Creates a `DispatcherQueue` that runs its own message loop on a brand-new dedicated thread. |
| `CreateOnCurrentThread()` | static method → `DispatcherQueueController` | Creates a `DispatcherQueue` on the calling thread that interoperates with a USER32 message loop the caller owns. |
| `ShutdownQueueAsync()` | method → `IAsyncAction` | Asynchronously stops the `DispatcherQueue` and, if created via `CreateOnDedicatedThread`, shuts down the dedicated thread. Returns as soon as shutdown starts; the operation completes asynchronously. |
| `ShutdownQueue()` | method | Synchronous version of `ShutdownQueueAsync`; returns only when shutdown is complete. |

## Notes

- Applies to WinUI 3 / Windows App SDK apps (`Microsoft.UI.Dispatching` namespace).
- The controller and its `DispatcherQueue` stay alive while the event loop runs; after `Shutdown` completes, the dedicated thread unwinds, but the objects themselves can outlive the thread until all references are released.
- Only the code that owns a thread's outermost message loop should create the `DispatcherQueue` for that thread — components that merely rely on a `DispatcherQueue` must not create one themselves.
- Shutdown raises events in order: `ShutdownStarting` → `FrameworkShutdownStarting` → `FrameworkShutdownCompleted` → `ShutdownCompleted`.

## Related

- [DispatcherQueue](./dispatcher-queue.md)
- [DispatcherQueueTimer](./dispatcher-queue-timer.md)
