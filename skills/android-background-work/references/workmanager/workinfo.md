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
    public val constraints: Constraints
    public val initialDelayMillis: Long
    public val periodicityInfo: PeriodicityInfo?
    public val nextScheduleTimeMillis: Long
    public val stopReason: Int // API 31+

    public enum class State { ENQUEUED, RUNNING, SUCCEEDED, FAILED, BLOCKED, CANCELLED }
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
| `outputData` | `Data` | — | Output data; only meaningful once state is terminal. |
| `progress` | `Data` | — | Progress data set via `setProgress` / `setProgressAsync`. |
| `runAttemptCount` | `Int` | — | Number of times the work has been attempted. |
| `periodicityInfo` | `PeriodicityInfo?` | `null` | Repeat interval and flex duration, for periodic work only. |
| `State.ENQUEUED` | enum value | — | Eligible to run once constraints and any initial delay are met. |
| `State.RUNNING` | enum value | — | Actively executing. |
| `State.SUCCEEDED` | enum value | terminal | Completed successfully (one-time work only). |
| `State.FAILED` | enum value | terminal | Execution failed; dependent work is also marked `FAILED`. |
| `State.BLOCKED` | enum value | — | Prerequisites in a chain have not yet finished successfully. |
| `State.CANCELLED` | enum value | terminal | Cancelled and will not execute; dependent work is also `CANCELLED`. |
| `State.isFinished()` | `() -> Boolean` | — | `true` for `SUCCEEDED`, `FAILED`, or `CANCELLED`. |

## Notes

- For periodic work, only `CANCELLED` is a terminal state — the request cycles between `ENQUEUED` and `RUNNING` indefinitely, rescheduling after every run regardless of result.
- Observe with `WorkManager.getWorkInfoByIdFlow(id)` / `getWorkInfoByIdLiveData(id)` or `getWorkInfosByTagFlow(tag)` (see [WorkManager](./workmanager.md)).
- Package: `androidx.work`.

## Related

- [WorkManager enqueue / cancel / query](./workmanager.md)
- [WorkContinuation](./workcontinuation.md)
- [BackoffPolicy and retry](./backoffpolicy.md)
