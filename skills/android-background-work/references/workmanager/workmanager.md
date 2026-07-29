# WorkManager

Singleton entry point for enqueueing, chaining, querying, and cancelling scheduled work.

## Signature / Usage

```kotlin
public abstract class WorkManager internal constructor() {
    public companion object {
        @JvmStatic public fun getInstance(context: Context): WorkManager
    }

    public fun enqueue(request: WorkRequest): Operation
    public abstract fun enqueue(requests: List<WorkRequest>): Operation

    public abstract fun enqueueUniqueWork(
        uniqueWorkName: String,
        existingWorkPolicy: ExistingWorkPolicy,
        request: OneTimeWorkRequest,
    ): Operation

    public abstract fun enqueueUniquePeriodicWork(
        uniqueWorkName: String,
        existingPeriodicWorkPolicy: ExistingPeriodicWorkPolicy,
        request: PeriodicWorkRequest,
    ): Operation

    public abstract fun cancelWorkById(id: UUID): Operation
    public abstract fun cancelAllWorkByTag(tag: String): Operation
    public abstract fun cancelUniqueWork(uniqueWorkName: String): Operation

    public abstract fun getWorkInfoByIdFlow(id: UUID): Flow<WorkInfo?>
    public abstract fun getWorkInfoByIdLiveData(id: UUID): LiveData<WorkInfo?>
    public abstract fun getWorkInfosByTagFlow(tag: String): Flow<List<WorkInfo>>
    public abstract fun getWorkInfos(workQuery: WorkQuery): ListenableFuture<List<WorkInfo>>

    public abstract fun updateWork(request: WorkRequest): ListenableFuture<UpdateResult>

    public abstract fun pruneWork(): Operation
    public abstract fun createCancelPendingIntent(id: UUID): PendingIntent
}
```

```kotlin
val sendLogsWorkRequest = PeriodicWorkRequestBuilder<SendLogsWorker>(24, TimeUnit.HOURS)
    .setConstraints(Constraints.Builder().setRequiresCharging(true).build())
    .build()

WorkManager.getInstance(context).enqueueUniquePeriodicWork(
    "sendLogs",
    ExistingPeriodicWorkPolicy.KEEP,
    sendLogsWorkRequest,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getInstance(context)` | static | — | Obtains the process-wide `WorkManager` singleton. |
| `enqueue(request)` / `enqueue(requests)` | `(WorkRequest) -> Operation` | — | Schedules one or more independent `WorkRequest`s. |
| `enqueueUniqueWork(name, policy, request)` | `(String, ExistingWorkPolicy, OneTimeWorkRequest) -> Operation` | — | Schedules one-time work under a unique, human-readable name; conflicts resolved via `ExistingWorkPolicy`. |
| `enqueueUniquePeriodicWork(name, policy, request)` | `(String, ExistingPeriodicWorkPolicy, PeriodicWorkRequest) -> Operation` | — | Same as above, for `PeriodicWorkRequest`, resolved via `ExistingPeriodicWorkPolicy`. |
| `beginWith(request)` / `beginUniqueWork(name, policy, request)` | `(...) -> WorkContinuation` | — | Starts a work chain; see [WorkContinuation](./workcontinuation.md). |
| `cancelWorkById(id)` | `(UUID) -> Operation` | — | Cancels a single work request. |
| `cancelAllWorkByTag(tag)` | `(String) -> Operation` | — | Cancels all requests carrying `tag`. |
| `cancelUniqueWork(uniqueWorkName)` | `(String) -> Operation` | — | Cancels all work under a unique name. |
| `getWorkInfoByIdFlow(id)` / `getWorkInfoByIdLiveData(id)` | `(UUID) -> Flow<WorkInfo?> / LiveData<WorkInfo?>` | — | Observes state changes for a single request. |
| `getWorkInfosByTagFlow(tag)` | `(String) -> Flow<List<WorkInfo>>` | — | Observes state for all requests carrying `tag`. |
| `getWorkInfos(workQuery)` | `(WorkQuery) -> ListenableFuture<List<WorkInfo>>` | — | Combined multi-criteria query across ids/tags/unique names/states in a single call; see [WorkQuery](./workquery.md). |
| `updateWork(request)` | `(WorkRequest) -> ListenableFuture<UpdateResult>` | — | Replaces an already-enqueued request's definition in place, preserving its enqueue time/slot instead of cancel+re-enqueue; see [updateWork](./update-work.md). |
| `pruneWork()` | `() -> Operation` | — | Cancels and removes all finished work from the internal database to free space. |
| `createCancelPendingIntent(id)` | `(UUID) -> PendingIntent` | — | `PendingIntent` that cancels the given work, e.g. for a notification action. |

## Notes

- `Operation` represents an asynchronous WorkManager database operation and exposes a `LiveData<Operation.State>`; call `.result.get()` in tests to block until enqueued. See [Operation](./operation.md) for `State.SUCCESS`/`FAILURE` inspection.
- `enqueueUniqueWork` / `enqueueUniquePeriodicWork` are the recommended way to avoid duplicate scheduling of the same logical job (e.g. periodic log upload), preferred over manually tracked tags.
- Package: `androidx.work`.

## Related

- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
- [PeriodicWorkRequest](./periodicworkrequest.md)
- [ExistingWorkPolicy / ExistingPeriodicWorkPolicy](./existingworkpolicy.md)
- [WorkContinuation](./workcontinuation.md)
- [WorkInfo and monitoring](./workinfo.md)
- [WorkQuery](./workquery.md)
- [updateWork](./update-work.md)
- [Operation](./operation.md)
