# Work Metrics (work-analytics): WorkMetricsInfoRepository / WorkMetricsInfo / WorkMetricsQuery

Experimental `androidx.work.analytics` APIs that record and query per-work metrics (timings, run attempts, stop reasons) by listening to WorkManager scheduling and execution events.

## Signature / Usage

```kotlin
@ExperimentalEventsApi
@ExperimentalWorkMetricsApi
public class WorkMetricsInfoRepository : ScheduleEventListener, ExecutionEventListener {
    public constructor(context: Context, dbExecutor: Executor? = null)
    public constructor(context: Context, retentionTime: Long, retentionTimeUnit: TimeUnit, dbExecutor: Executor? = null)
    @RequiresApi(26)
    public constructor(context: Context, retentionDuration: Duration, dbExecutor: Executor? = null)

    public val finishedWorkMetricsInfoFlow: Flow<WorkMetricsInfo>
    public suspend fun getWorkMetricsInfoById(workId: UUID): List<WorkMetricsInfo>
    public suspend fun getWorkMetricsInfos(query: WorkMetricsQuery): List<WorkMetricsInfo>
}
```

The repository is itself both listener types, so register it on `Configuration.Builder`:

```kotlin
val repository = WorkMetricsInfoRepository(context)
Configuration.Builder()
    .setExecutionEventListener(repository)
    .setScheduleEventListener(repository)
    .build()
```

Query with `WorkMetricsQuery.Builder`:

```kotlin
val query = WorkMetricsQuery.Builder()
    .addStates(WorkMetricsInfo.State.FAILED)
    .addTags("sync")
    .build()
val infos = repository.getWorkMetricsInfos(query)
```

## Options / Props

`WorkMetricsInfo` represents metrics info and diagnostics about a particular `WorkRequest` period: the period of time between the run being requested and the work actually finishing, which may cover multiple run attempts. A given `WorkRequest` may have multiple periods (e.g. `WorkManager.updateWork`, or a `PeriodicWorkRequest` finishing a period) and thus multiple `WorkMetricsInfo`.

`WorkMetricsInfo` (properties):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `workSpecId` | `UUID` | — | The unique identifier for the `WorkRequest`. |
| `generation` | `Int` | — | The specific generation of the `WorkRequest`. The generation is incremented every time the `WorkRequest` is updated. See `WorkInfo.generation`. |
| `workerClassName` | `String?` | — | The worker class specified when the work request was enqueued. |
| `tags` | `Set<String>` | — | The set of tags associated with the work. See `WorkInfo.tags`. |
| `state` | `WorkMetricsInfo.State` | — | The current `WorkMetricsInfo.State` of the work. |
| `enqueueTimeMillis` | `Long` | — | The timestamp (since epoch) when the `WorkRequest` was initially enqueued or updated. For a `PeriodicWorkRequest`, this is set every time a period finishes. |
| `unblockTimeMillis` | `Long` | — | The timestamp (since epoch) at which the work had all its prerequisite work finished, and it starts waiting for constraints. |
| `firstStartTimeMillis` | `Long` | — | The timestamp (since epoch) at which this work was first started. |
| `finishTimeMillis` | `Long` | — | The timestamp (since epoch) at which this work period finished, either by succeeding, failing, cancelling, or being updated. |
| `workerDurationMillis` | `Long` | — | The time in milliseconds it took for the worker to run when it actually returned a final result. |
| `runAttemptCount` | `Int` | `0` | The number of times this work has started in this period. This can occur multiple times for various reasons e.g. worker returns `Result.retry`, worker is stopped, app is closed. |
| `explicitRetryCount` | `Int` | `0` | The number of times this worker returned `Result.retry` in this period. This is separate from implicit retries such as stopping and starting or app kills. |
| `stopReasonCounts` | `Map<Int, Int>` | `emptyMap()` | How many times this work stopped for each `WorkInfo.stopReason` in this period. |
| `totalRuntimeMillis` | `Long` | `0` | The total time in milliseconds that this work ran across all its retries in this period. |

`WorkMetricsInfo.State` (values):

| Name | Description |
|------|-------------|
| `ENQUEUED_BLOCKED` | Used to indicate that the `WorkRequest` period is enqueued and still active but blocked by pre-requisite work. |
| `ENQUEUED_PENDING` | Used to indicate that the `WorkRequest` period is enqueued and still active and will run when its constraints are met and resources are available. |
| `RUNNING` | Used to indicate that this `WorkRequest` period is currently running. |
| `SUCCEEDED` | Used to indicate that this `WorkRequest` period completed in a successful state. |
| `FAILED` | Used to indicate that this `WorkRequest` period completed in a failed state. |
| `CANCELLED` | Used to indicate that the `WorkRequest` period has been cancelled. |
| `OBSOLETE_UPDATED` | Used to indicate that the `WorkRequest` period is obsolete because the `WorkRequest` was updated. |

`WorkMetricsQuery` is a specification for querying `WorkMetricsInfo`s. Each component in a `WorkMetricsQuery` is `AND`-ed with the others. Each value in a component is `OR`-ed.

`WorkMetricsQuery` (properties, all produced by the Builder; the constructor is `internal`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `workIds` | `List<UUID>` | `emptyList()` | The `List` of `WorkRequest` ids being queried. |
| `states` | `List<WorkMetricsInfo.State>` | `emptyList()` | The `List` of `WorkMetricsInfo.State`s being queried. |
| `tags` | `List<String>` | `emptyList()` | The `List` of tags being queried. |
| `workerClassNames` | `List<String>` | `emptyList()` | The `List` of worker class names being queried. |
| `beginTimeMillis` | `Long` | `0L` | The start of the enqueue time range filter (inclusive), in milliseconds since epoch (e.g. `System.currentTimeMillis`). |
| `endTimeMillis` | `Long` | `Long.MAX_VALUE` | The end of the enqueue time range filter (inclusive), in milliseconds since epoch (e.g. `System.currentTimeMillis`). |

`WorkMetricsQuery.Builder` methods:

| Name | Description |
|------|-------------|
| `addWorkIds` | Adds `WorkRequest` `workIds` (a `List<UUID>` or vararg `UUID`) to the `WorkMetricsQuery`. |
| `addStates` | Adds `WorkMetricsInfo.State`s (a `List` or vararg) to the `WorkMetricsQuery`. |
| `addTags` | Adds tags (a `List<String>` or vararg `String`) to the `WorkMetricsQuery`. |
| `addWorkerClassNames` | Adds worker class names (a `List<String>` or vararg `String`) to the `WorkMetricsQuery`. |
| `setBeginTimeMillis` | Sets the start of the enqueue time range to filter the `WorkMetricsQuery` (inclusive, milliseconds since epoch). |
| `setEndTimeMillis` | Sets the end of the enqueue time range to filter the `WorkMetricsQuery` (inclusive, milliseconds since epoch). |
| `build` | Creates an instance of `WorkMetricsQuery`. Throws `IllegalArgumentException` if `beginTimeMillis` or `endTimeMillis` is negative, or if `beginTimeMillis` is greater than `endTimeMillis`. |

`WorkMetricsInfoRepository` (companion constants):

| Name | Type | Value | Description |
|------|------|-------|-------------|
| `DEFAULT_RETENTION_TIME_MILLIS` | `Long` | `7.days.inWholeMilliseconds` | The default retention time for finished work metrics (7 days). |
| `MAX_RETENTION_TIME_MILLIS` | `Long` | `30.days.inWholeMilliseconds` | The maximum allowed retention time for finished work metrics (30 days). |

`WorkMetricsInfoRepository.finishedWorkMetricsInfoFlow` is a hot `Flow` that emits a `WorkMetricsInfo` whenever one finishes (the request period is complete or obsolete, e.g. the work finished, the request was updated, or a periodic request completed a period). `getWorkMetricsInfoById` gets a list of `WorkMetricsInfo` snapshots for a given work id; `getWorkMetricsInfos` gets those matching the query criteria.

## Notes

- All types are experimental: `@ExperimentalWorkMetricsApi` (opt-in, warning level); the repository also requires `@ExperimentalEventsApi`.
- Retention time must be positive; values above `MAX_RETENTION_TIME_MILLIS` are clamped with a warning, and non-positive values throw `IllegalArgumentException`.
- `dbExecutor` is passed to Room for database queries and transactions only, not for running the event hooks. It is recommended to pass the same executor as `Configuration.Builder.setTaskExecutor`; if null, Room's default executors are used.
- The `Duration` constructors require API 26.
- Package: `androidx.work.analytics`. Source: androidx `work-analytics` API file and sources at AOSP commit `cbf5ea2a1e5a`; listed under WorkManager 2.12.0 at https://developer.android.com/jetpack/androidx/releases/work#2.12.0.

## Related

- [ExecutionEventListener / ScheduleEventListener](./event-listeners.md)
- [Configuration](./configuration.md)
- [WorkInfo](./workinfo.md)
