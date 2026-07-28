# Worker / ListenableWorker / Result

Base classes for defining background work executed by WorkManager, and the result type returned from execution.

## Signature / Usage

```kotlin
public abstract class ListenableWorker(context: Context, workerParams: WorkerParameters)

public abstract class Worker(context: Context, workerParams: WorkerParameters) :
    ListenableWorker(context, workerParams) {

    @WorkerThread
    public abstract fun doWork(): Result
}
```

```kotlin
class UploadWork(appContext: Context, workerParams: WorkerParameters)
    : Worker(appContext, workerParams) {

    override fun doWork(): Result {
        val imageUriInput = inputData.getString("IMAGE_URI")
            ?: return Result.failure()

        uploadFile(imageUriInput)
        return Result.success()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `doWork()` (Worker) | `() -> Result` | — | Runs synchronously on a background thread provided by WorkManager. Must be implemented. |
| `startWork()` (ListenableWorker) | `() -> ListenableFuture<Result>` | — | Abstract async entry point; `Worker`, `CoroutineWorker`, `RxWorker` all derive from this. |
| `applicationContext` | `Context` | — | The application context. |
| `id` | `UUID` | — | Identifier of the `WorkRequest` that created this worker. |
| `inputData` | `Data` | — | Input data, merged from prerequisites and `setInputData`. |
| `tags` | `Set<String>` | — | Tags associated with the `WorkRequest`. |
| `runAttemptCount` | `Int` | — | Current execution attempt count; resets between periodic cycles. |
| `network` (API 28+) | `Network?` | `null` | Network designated for this worker, if constrained. |
| `setProgressAsync(data: Data)` | `(Data) -> ListenableFuture<Void>` | — | Updates work progress. |
| `setForegroundAsync(foregroundInfo: ForegroundInfo)` | `(ForegroundInfo) -> ListenableFuture<Void>` | — | Marks the worker as long-running/important, showing a notification. |
| `getForegroundInfoAsync()` | `() -> ListenableFuture<ForegroundInfo>` | — | Required override for expedited work requests. |
| `isStopped` | `Boolean` | — | `true` if WorkManager has requested this work stop. |
| `onStopped()` | `() -> Unit` | — | Invoked when work is told to stop; override to clean up. |
| `Result.success()` / `Result.success(outputData)` | static | — | Work completed successfully; dependent work may proceed. |
| `Result.failure()` / `Result.failure(outputData)` | static | — | Permanent failure; halts dependent work in the chain. |
| `Result.retry()` | static | — | Transient failure; WorkManager retries according to `BackoffPolicy`. |

## Notes

- `Worker.doWork()` gets a maximum of ten minutes of execution; exceeding it triggers a stop signal.
- Each `Worker` instance receives exactly one invocation of `doWork()`; a new instance is created for retries.
- Use `CoroutineWorker` for Kotlin coroutines, `RxWorker` for RxJava, or `ListenableWorker` directly for callback-based async APIs (e.g. `FusedLocationProviderClient`); `ListenableWorker.startWork()` is invoked on the main thread, so implementers must move to a background thread themselves.
- Package: `androidx.work`.

## Related

- [CoroutineWorker](./coroutineworker.md)
- [WorkRequest](./workrequest.md)
- [Data](./data.md)
- [ForegroundInfo and long-running workers](./foreground-work.md)
- [Testing workers](./testing.md)
