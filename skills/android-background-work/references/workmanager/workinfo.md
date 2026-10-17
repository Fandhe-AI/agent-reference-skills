# WorkInfo / WorkInfo.State

Snapshot of a `WorkRequest`'s current status, output data, and progress, returned by WorkManager's query/observe APIs.

## Signature / Usage

```kotlin
public class WorkInfo {
    public val id: UUID
    public val state: State
    public val tags: Set<String>
    public val outputData: Data
    public val progress: Data
    public val runAttemptCount: Int
    public val generation: Int
    public val constraints: Constraints
    public val initialDelayMillis: Long
    public val periodicityInfo: PeriodicityInfo?
    public val nextScheduleTimeMillis: Long
    public val stopReason: Int // API 31+
    public val workerClassName: String? // default null; since 2.12.0

    public enum class State {
        ENQUEUED, RUNNING, SUCCEEDED, FAILED, BLOCKED, CANCELLED;
        public val isFinished: Boolean
    }
}
```

```kotlin
val workInfo = workManager.getWorkInfoById(request.id).get()
assertThat(workInfo.state, `is`(WorkInfo.State.SUCCEEDED))
val outputData = workInfo.outputData
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UUID` | — | Identifier of the associated `WorkRequest`. |
| `state` | `State` | — | Current lifecycle state. |
| `outputData` | `Data` | `Data.EMPTY` | Output data; available only for `SUCCEEDED` / `FAILED`, `Data.EMPTY` while unfinished. |
| `progress` | `Data` | `Data.EMPTY` | Progress data set via `setProgress` / `setProgressAsync`. |
| `runAttemptCount` | `Int` | `0` | Number of times the work has been attempted. |
| `generation` | `Int` | `0` | Latest generation of the work; it increases when the work is updated via `WorkManager.updateWork()` or `enqueueUniquePeriodicWork` with `ExistingPeriodicWorkPolicy.UPDATE`. A running worker may still be an older generation. |
| `tags` | `Set<String>` | — | Tags attached to the `WorkRequest`. |
| `constraints` | `Constraints` | `Constraints.NONE` | Constraints of the request. |
| `initialDelayMillis` | `Long` | `0` | Initial delay of the request in milliseconds. |
| `nextScheduleTimeMillis` | `Long` | `Long.MAX_VALUE` | Earliest time (`System.currentTimeMillis`) the work is eligible to run next while `ENQUEUED`; `Long.MAX_VALUE` in other states (including `RUNNING` / `BLOCKED`). Work rarely runs exactly at this time. |
| `stopReason` | `Int` | `STOP_REASON_NOT_STOPPED` | Reason the work was last stopped (`@StopReason`, API 31+). |
| `periodicityInfo` | `PeriodicityInfo?` | `null` | Repeat interval and flex duration, for periodic work only. |
| `workerClassName` | `String?` | `null` | The worker class specified when the work request was enqueued. Added in 2.12.0. |
| `State.ENQUEUED` | enum value | — | Eligible to run once constraints and any initial delay are met. |
| `State.RUNNING` | enum value | — | Actively executing. |
| `State.SUCCEEDED` | enum value | terminal | Completed successfully (one-time and chained work only). |
| `State.FAILED` | enum value | terminal | Execution failed; dependent work is also marked `FAILED` (one-time and chained work only). |
| `State.BLOCKED` | enum value | — | Prerequisites in a chain have not yet finished successfully. |
| `State.CANCELLED` | enum value | terminal | Cancelled and will not execute; dependent work is also `CANCELLED`. |
| `State.isFinished` | `Boolean` (property) | — | `true` for `SUCCEEDED`, `FAILED`, or `CANCELLED`. |

## Notes

- For periodic work, only `CANCELLED` is a terminal state — the request cycles between `ENQUEUED` and `RUNNING` indefinitely, rescheduling after every run regardless of result.
- Observe with `WorkManager.getWorkInfoByIdFlow(id)` / `getWorkInfoByIdLiveData(id)` or `getWorkInfosByTagFlow(tag)` (see [WorkManager](./workmanager.md)).
- Since 2.12.0, a nonexistent stop reason code of 0 is mapped to `WorkInfo.STOP_REASON_UNKNOWN`.
- Package: `androidx.work`.

## Related

- [WorkManager enqueue / cancel / query](./workmanager.md)
- [WorkContinuation](./workcontinuation.md)
- [BackoffPolicy and retry](./backoffpolicy.md)
