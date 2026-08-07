# Observe Intermediate Worker Progress

How-to guide for setting intermediate progress from inside a worker via `setProgress`/`setProgressAsync`, and observing it (and the stop reason) from outside via `WorkInfo`.

## Signature / Usage

```kotlin
class ProgressWorker(context: Context, parameters: WorkerParameters) :
    CoroutineWorker(context, parameters) {

    override suspend fun doWork(): Result {
        setProgress(workDataOf(Progress to 0))
        delay(1L)
        setProgress(workDataOf(Progress to 100))
        return Result.success()
    }

    companion object {
        const val Progress = "Progress"
    }
}

// Observing from the UI layer
WorkManager.getInstance(applicationContext)
    .getWorkInfoByIdFlow(requestId)
    .collect { workInfo: WorkInfo? ->
        val value = workInfo?.progress?.getInt("Progress", 0)
        // update UI
    }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CoroutineWorker.setProgress(data)` | `suspend (Data) -> Unit` | Sets intermediate progress from inside `doWork()`. Ignored once the worker has completed. |
| `ListenableWorker.setProgressAsync(data)` | `(Data) -> ListenableFuture<Void>` | Non-coroutine equivalent of `setProgress`, for `Worker`/`ListenableWorker`. |
| `WorkManager.getWorkInfoByIdFlow(id)` | `(UUID) -> Flow<WorkInfo?>` | Kotlin Flow that emits on every `WorkInfo` change, including progress updates. |
| `WorkManager.getWorkInfoByIdLiveData(id)` | `(UUID) -> LiveData<WorkInfo>` | LiveData equivalent for observing progress from Java or non-coroutine callers. |
| `WorkInfo.progress` / `getProgress()` | `Data` | Latest `Data` set via `setProgress`/`setProgressAsync`. |
| `WorkInfo.stopReason` / `getStopReason()` | `Int` | Reason the worker was last stopped; observable via the same `WorkInfo` stream. |

## Notes

- Progress is represented by the same `Data` type used for worker input/output, and is subject to the same serialization size restrictions.
- Progress can only be observed and updated while the `ListenableWorker` is actively running; calls to `setProgress`/`setProgressAsync` after completion are silently ignored.
- Package: `androidx.work`.

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [CoroutineWorker](./coroutineworker.md)
- [WorkInfo / WorkInfo.State](./workinfo.md)
- [Data / workDataOf / InputMerger](./data.md)
