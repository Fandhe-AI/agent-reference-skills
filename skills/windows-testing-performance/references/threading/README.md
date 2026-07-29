# threading

| Name | Description | Path |
|------|-------------|------|
| Agile objects and cross-apartment marshaling | Callable from any thread without special handling via IAgileObject or MarshalingBehaviorAttribute | [agile-objects-marshaling.md](./agile-objects-marshaling.md) |
| Apartment model (STA / MTA) and WinUI 3 | COM/WinRT objects live in either STA or MTA; WinUI 3 uses standard STA | [apartment-model.md](./apartment-model.md) |
| async/await and ConfigureAwait | .NET async/await keywords consume Task/Task<TResult> and WinRT async APIs | [async-await-configureawait.md](./async-await-configureawait.md) |
| Background tasks | Lightweight code runs triggered by events even while app isn't running | [background-tasks.md](./background-tasks.md) |
| CoreDispatcher / CoreApplication migration to DispatcherQueue | UWP's CoreDispatcher is not available in WinUI 3 | [core-dispatcher-migration.md](./core-dispatcher-migration.md) |
| Deadlock avoidance | UI-thread deadlock from synchronously blocking on async operations | [deadlock-avoidance.md](./deadlock-avoidance.md) |
| DispatcherQueueController | Manages the lifetime of a DispatcherQueue | [dispatcher-queue-controller.md](./dispatcher-queue-controller.md) |
| DispatcherQueueTimer | Executes tasks on DispatcherQueue periodically or once | [dispatcher-queue-timer.md](./dispatcher-queue-timer.md) |
| DispatcherQueue | Prioritized queue for serial task execution on a thread | [dispatcher-queue.md](./dispatcher-queue.md) |
| Thread pool (Windows.System.Threading) | Windows.System.Threading.ThreadPool runs work asynchronously | [thread-pool.md](./thread-pool.md) |
| Updating the UI from outside the UI thread | UI elements only created/accessed on owning thread | [ui-thread-updates.md](./ui-thread-updates.md) |
| WinRT asynchronous patterns | WinRT async APIs return four interface types; bridgeable to .NET Task | [winrt-async-patterns.md](./winrt-async-patterns.md) |
