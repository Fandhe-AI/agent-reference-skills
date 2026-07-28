# Threading

| Name | Description | Path |
|------|-------------|------|
| DispatcherQueue | Serial task queue for a thread; WinUI 3's replacement for `CoreDispatcher` | [dispatcher-queue.md](./dispatcher-queue.md) |
| DispatcherQueueController | Creates/shuts down a thread's `DispatcherQueue` | [dispatcher-queue-controller.md](./dispatcher-queue-controller.md) |
| DispatcherQueueTimer | Periodic/single-shot timer bound to a `DispatcherQueue` | [dispatcher-queue-timer.md](./dispatcher-queue-timer.md) |
| CoreDispatcher / CoreApplication migration | Why UWP's `CoreDispatcher`/`CoreApplication` don't exist in WinUI 3, and how to migrate | [core-dispatcher-migration.md](./core-dispatcher-migration.md) |
| WinRT asynchronous patterns | `IAsyncAction`, `IAsyncOperation<T>`, `IAsyncOperationWithProgress`, `AsTask`, `Completed`, `CancellationToken` | [winrt-async-patterns.md](./winrt-async-patterns.md) |
| async/await and ConfigureAwait | .NET async/await semantics, `Task.ConfigureAwait`, `SynchronizationContext` | [async-await-configureawait.md](./async-await-configureawait.md) |
| Thread pool | `Windows.System.Threading.ThreadPool.RunAsync`, `WorkItemPriority`, `ThreadPoolTimer`, vs. `Task.Run` | [thread-pool.md](./thread-pool.md) |
| Apartment model (STA / MTA) | STA/ASTA/MTA differences and WinUI 3's standard-STA UI thread | [apartment-model.md](./apartment-model.md) |
| UI thread updates | Marshaling updates to UI elements from background code | [ui-thread-updates.md](./ui-thread-updates.md) |
| Deadlock avoidance | Common UI-thread deadlock patterns and mitigations | [deadlock-avoidance.md](./deadlock-avoidance.md) |
| Background tasks | `BackgroundTaskBuilder`, `IBackgroundTask`, manifest declarations, desktop alternatives (Task Scheduler, Worker Services, `StartupTask`) | [background-tasks.md](./background-tasks.md) |
