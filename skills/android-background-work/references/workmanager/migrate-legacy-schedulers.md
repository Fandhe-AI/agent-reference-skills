# Migrate from FirebaseJobDispatcher / GcmNetworkManager

Official mapping guides for moving off the two deprecated pre-WorkManager job schedulers onto `Worker`/`WorkRequest`. Both source libraries are deprecated; WorkManager is the only currently maintained option and unifies `JobScheduler`/`AlarmManager`/Firebase JobDispatcher/GCMNetworkManager scheduling under one API, currently down to minSdk API 23 (raised from API 21 in WorkManager 2.11.0).

## Signature / Usage

```kotlin
// FirebaseJobDispatcher SimpleJobService -> WorkManager Worker
class MyWorker(context: Context, params: WorkerParameters) : Worker(context, params) {
    override fun doWork(): Result {
        val input = inputData // replaces Job's Bundle extras
        return Result.success()
    }
}

val request = OneTimeWorkRequestBuilder<MyWorker>()
    .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.UNMETERED).build())
    .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30_000, TimeUnit.MILLISECONDS)
    .build()

WorkManager.getInstance(context)
    .enqueueUniqueWork("my-unique-name", ExistingWorkPolicy.KEEP, request)
```

## Options / Props

| FirebaseJobDispatcher / GcmNetworkManager | WorkManager equivalent |
|------|-------------|
| `JobService` (direct) | `ListenableWorker` |
| `SimpleJobService` / non-recurring `GcmTaskService` | `Worker` |
| `Job.Builder`/`Task.Builder` with `setRecurring(false)` / `OneoffTask` | `OneTimeWorkRequest` |
| `Job.Builder`/`Task.Builder` with `setRecurring(true)` / `PeriodicTask` | `PeriodicWorkRequest` |
| `setTag(tag)` (FJD, must be unique) | `enqueueUniqueWork(uniqueWorkName, ...)` |
| `setReplaceCurrent()` / `setUpdateCurrent()` | `ExistingWorkPolicy.REPLACE` passed to `enqueueUniqueWork` |
| `Bundle` extras (`setExtras()`) | `Data` (`workDataOf(...)`, read via `inputData`) |
| `Constraint`/`setRequiredNetwork()` | `Constraints` / `setRequiredNetworkType()` — note GCM requires network by default, WorkManager does not unless a `Constraints` is set |
| `RetryStrategy.DEFAULT_EXPONENTIAL` | `setBackoffCriteria(BackoffPolicy.EXPONENTIAL, ...)` |
| `Trigger.executionWindow()` | No direct equivalent; approximate with `setInitialDelay()`, or use `AlarmManager` for precise-time windows |
| `setLifetime(Lifetime.UNTIL_NEXT_BOOT)` / `setPersisted()` | Not needed — all `WorkRequest`s persist across reboots automatically |

## Notes

- Gradle: add `androidx.work:work-runtime`/`work-runtime-ktx`; migrating specifically off `GcmNetworkManager` on API 22 and below additionally needs `androidx.work:work-gcm` so WorkManager can fall back to GCM Network Manager as its scheduling backend on very old devices.
- Remove the old `GcmTaskService`/`JobService` `<service>` declaration from the manifest — WorkManager's own initialization (see [Configuration](./configuration.md)) handles registration.
- Both FirebaseJobDispatcher and GCMNetworkManager are themselves deprecated/archived; there is no ongoing API surface to track beyond this one-time migration.

## Related

- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
- [PeriodicWorkRequest](./periodicworkrequest.md)
- [Constraints / NetworkType](./constraints.md)
- [BackoffPolicy and retry](./backoffpolicy.md)
- [ExistingWorkPolicy / ExistingPeriodicWorkPolicy](./existingworkpolicy.md)
