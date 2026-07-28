# CoroutineWorker

Recommended `ListenableWorker` implementation for Kotlin, exposing a suspending `doWork()` function.

## Signature / Usage

```kotlin
public abstract class CoroutineWorker(appContext: Context, params: WorkerParameters) :
    ListenableWorker(appContext, params) {

    public abstract suspend fun doWork(): Result
    public open suspend fun getForegroundInfo(): ForegroundInfo
    public suspend fun setProgress(data: Data)
    public suspend fun setForeground(foregroundInfo: ForegroundInfo)
}
```

```kotlin
class ExpeditedWorker(appContext: Context, workerParams: WorkerParameters):
    CoroutineWorker(appContext, workerParams) {

    override suspend fun getForegroundInfo(): ForegroundInfo {
        return ForegroundInfo(NOTIFICATION_ID, createNotification())
    }

    override suspend fun doWork(): Result {
        // Perform work
        return Result.success()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `doWork()` | `suspend () -> Result` | — | Abstract suspending function to perform the background work; runs on a default `Dispatcher`, customizable via `withContext`. |
| `getForegroundInfo()` | `suspend () -> ForegroundInfo` | throws `IllegalStateException` if unimplemented | Required override when the `WorkRequest` is marked expedited. |
| `setProgress(data: Data)` | `suspend (Data) -> Unit` | — | Suspending equivalent of `setProgressAsync`. |
| `setForeground(foregroundInfo: ForegroundInfo)` | `suspend (ForegroundInfo) -> Unit` | — | Runs the worker in the context of a foreground `Service`; throws `IllegalStateException` if the process is subject to foreground service restrictions. |

## Notes

- `coroutineContext` (deprecated) previously controlled the dispatcher; prefer `withContext(...)` inside `doWork()` instead.
- `onStopped()` is `final` on `CoroutineWorker` and cancels the underlying coroutine.
- This is the Android WorkManager `CoroutineWorker` (`androidx.work`) — general coroutines / `Flow` usage is documented under the `coroutines-flow` category of this skill.
- Package: `androidx.work`.

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [ForegroundInfo and long-running workers](./foreground-work.md)
- [Testing workers](./testing.md)
