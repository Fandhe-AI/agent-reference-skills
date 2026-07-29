# RxWorker

RxJava interoperability `ListenableWorker` implementation: override `createWork()` to return a `Single<Result>` instead of implementing a blocking or suspending `doWork()`.

## Signature / Usage

```java
public abstract class RxWorker extends ListenableWorker {
    public RxWorker(Context appContext, WorkerParameters workerParams)

    public abstract Single<Result> createWork();

    protected Scheduler getBackgroundScheduler(); // default: WorkManager's Configuration executor
    public Single<ForegroundInfo> getForegroundInfo();
    public final Completable setForeground(ForegroundInfo foregroundInfo);
    public final Completable setCompletableProgress(Data data);
}
```

```kotlin
class UploadRxWorker(context: Context, params: WorkerParameters) : RxWorker(context, params) {
    override fun createWork(): Single<Result> =
        uploadRepository.upload(inputData)
            .map { Result.success() }
            .onErrorReturn { Result.failure() }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `createWork()` | `() -> Single<Result>` | — | The work itself; called on the main thread, subscribed on `getBackgroundScheduler()`. If the returned `Single` errors, the worker is considered failed. |
| `getBackgroundScheduler()` | `() -> Scheduler` | scheduler backed by `Configuration`'s executor | Override to change which `Scheduler` the subscription runs on; the result is always observed on WorkManager's own internal thread regardless. |
| `getForegroundInfo()` | `() -> Single<ForegroundInfo>` | errors by default | Override for expedited/long-running work that must run as a foreground service; required when using `setExpedited(OutOfQuotaPolicy...)`. |
| `setForeground(foregroundInfo)` | `(ForegroundInfo) -> Completable` | — | Rx equivalent of `ListenableWorker.setForegroundAsync()`; must complete before `createWork()`'s `Single` emits. |
| `setCompletableProgress(data)` | `(Data) -> Completable` | — | Rx equivalent of `ListenableWorker.setProgressAsync()`. |

## Notes

- Given a maximum of ten minutes to finish and return a `Result`; after that WorkManager signals the worker to stop, same as other `ListenableWorker` subclasses.
- If the worker is cancelled by WorkManager (e.g. a constraint stops being met), the RxJava subscription is disposed immediately.
- Choose `RxWorker` for RxJava-based codebases; this skill's other worker guidance is Kotlin-coroutine-first, so prefer `CoroutineWorker` unless the surrounding code is already RxJava (see [Threading in WorkManager](./threading.md)).
- Gradle: `androidx.work:work-rxjava3` (or the older `work-rxjava2`, package `androidx.work` instead of `androidx.work.rxjava3`).
- Package: `androidx.work.rxjava3` (RxJava 3) / `androidx.work` (RxJava 2, deprecated artifact).

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [CoroutineWorker](./coroutineworker.md)
- [Threading in WorkManager](./threading.md)
