# Threading in WorkManager

Overview of how the four worker primitives (`Worker`, `CoroutineWorker`, `RxWorker`, `ListenableWorker`) execute in the background.

## Signature / Usage

```kotlin
// Worker: runs automatically on a background thread from Configuration's Executor
override fun doWork(): Result { /* runs off the main thread */ }

// CoroutineWorker: suspending function on a default Dispatcher, customizable via withContext
override suspend fun doWork(): Result { /* use withContext(Dispatchers.IO) { ... } as needed */ }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Worker.doWork()` | sync | Called automatically on a background thread sourced from `Configuration.Builder.setExecutor()`. |
| `CoroutineWorker.doWork()` | suspend | Runs on a default `Dispatcher`; override behavior with `withContext(...)` inside the function rather than the deprecated `coroutineContext` property. |
| `RxWorker.createWork()` | `Single<Result>` | Threading strategy fully controlled by RxJava schedulers. |
| `ListenableWorker.startWork()` | async | Most basic primitive; the base class for the other three. Its start signal is invoked on the **main thread**, so implementations must explicitly move to a background thread (e.g. for callback-based async APIs like `FusedLocationProviderClient`). |

## Notes

- Choose `CoroutineWorker` for Kotlin coroutine-based code, `RxWorker` for RxJava, `Worker` for simple synchronous work, and `ListenableWorker` directly only for callback-based async APIs.
- Advanced concerns covered by this guide: correctly handling `isStopped` / `onStopped()`, choosing an appropriate dispatcher/thread pool, managing long-running operations (see [ForegroundInfo and long-running workers](./foreground-work.md)), and observing intermediate progress via `setProgress` / `setProgressAsync`.
- General Kotlin coroutines / `Flow` usage (unrelated to WorkManager) is documented in this skill's `coroutines-flow` category.
- Package: `androidx.work`.

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [CoroutineWorker](./coroutineworker.md)
- [RxWorker](./rxworker.md)
- [ForegroundInfo and long-running workers](./foreground-work.md)
