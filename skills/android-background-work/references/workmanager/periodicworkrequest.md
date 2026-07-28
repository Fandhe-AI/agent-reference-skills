# PeriodicWorkRequest

`WorkRequest` implementation for work that repeats on a fixed interval, optionally within a flex window.

## Signature / Usage

```kotlin
public class PeriodicWorkRequest internal constructor(builder: Builder) :
    WorkRequest(builder.id, builder.workSpec, builder.tags)

public inline fun <reified W : ListenableWorker> PeriodicWorkRequestBuilder(
    repeatInterval: Long,
    repeatIntervalTimeUnit: TimeUnit,
): PeriodicWorkRequest.Builder

public inline fun <reified W : ListenableWorker> PeriodicWorkRequestBuilder(
    repeatInterval: Long,
    repeatIntervalTimeUnit: TimeUnit,
    flexTimeInterval: Long,
    flexTimeIntervalUnit: TimeUnit,
): PeriodicWorkRequest.Builder
```

```kotlin
// Runs once every hour, within the last 15 minutes of each hour
val myUploadWork = PeriodicWorkRequestBuilder<SaveImageToFileWorker>(
    1, TimeUnit.HOURS,
    15, TimeUnit.MINUTES
).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PeriodicWorkRequestBuilder<W>(repeatInterval, timeUnit)` | function | — | Repeat interval only; also has a `Duration`-based overload (API 26+). |
| `PeriodicWorkRequestBuilder<W>(repeatInterval, timeUnit, flexInterval, flexUnit)` | function | — | Repeat interval plus a flex window during which the work may run; also has a `Duration`-based overload. |
| `Builder.setConstraints` / `setInputData` / `setBackoffCriteria` / `setInitialDelay` | inherited from `WorkRequest.Builder` | — | Same as `OneTimeWorkRequest.Builder`. |
| `Builder.setNextScheduleTimeOverride(millis: Long)` | `(Long) -> Builder` | — | Overrides the next scheduled run time. |
| `Builder.clearNextScheduleTimeOverride()` | `() -> Builder` | — | Clears a previously set override. |
| `MIN_PERIODIC_INTERVAL_MILLIS` | `Long` (const) | `15 * 60 * 1000L` | Minimum allowed repeat interval (15 minutes). |
| `MIN_PERIODIC_FLEX_MILLIS` | `Long` (const) | `5 * 60 * 1000L` | Minimum allowed flex interval (5 minutes). |

## Notes

- Repeat interval below 15 minutes is coerced up to the 15-minute minimum.
- Enqueue with `WorkManager.enqueue()` for a one-off unique instance, or prefer `enqueueUniquePeriodicWork()` to avoid duplicate scheduling (see [WorkManager](./workmanager.md)).
- Periodic work states cycle between `ENQUEUED` and `RUNNING`; only `CANCELLED` is terminal — it is automatically rescheduled after each run regardless of result (see [WorkInfo](./workinfo.md)).
- Package: `androidx.work`.

## Related

- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
- [WorkManager enqueue / cancel / query](./workmanager.md)
- [ExistingWorkPolicy / ExistingPeriodicWorkPolicy](./existingworkpolicy.md)
- [WorkInfo and monitoring](./workinfo.md)
