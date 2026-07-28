# WorkRequest / OneTimeWorkRequest

Base class describing a unit of scheduled work (constraints, retry policy, tags, input data), and its non-repeating implementation.

## Signature / Usage

```kotlin
public abstract class WorkRequest internal constructor(
    public open val id: UUID,
    public val tags: Set<String>,
)

public class OneTimeWorkRequest internal constructor(builder: Builder) :
    WorkRequest(builder.id, builder.workSpec, builder.tags)

public inline fun <reified W : ListenableWorker> OneTimeWorkRequestBuilder(): OneTimeWorkRequest.Builder
```

```kotlin
val uploadWorkRequest: WorkRequest =
    OneTimeWorkRequestBuilder<UploadWork>()
        .setInputData(workDataOf("IMAGE_URI" to "http://..."))
        .setConstraints(constraints)
        .build()

WorkManager.getInstance(context).enqueue(uploadWorkRequest)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `OneTimeWorkRequest.from(workerClass)` | static | — | Shortcut to build a `OneTimeWorkRequest` with no extra configuration; overload also accepts `List<Class<out ListenableWorker>>`. |
| `Builder.setId(id: UUID)` | `(UUID) -> B` | random | Sets the work's identifier. |
| `Builder.setConstraints(constraints: Constraints)` | `(Constraints) -> B` | none | Attaches execution constraints. |
| `Builder.setInputData(inputData: Data)` | `(Data) -> B` | empty | Input `Data` for `doWork()`. |
| `Builder.setInitialDelay(duration, timeUnit)` | `(Long, TimeUnit) -> B` (also `Duration` overload) | `0` | Delays first execution. |
| `Builder.setBackoffCriteria(policy, delay, timeUnit)` | `(BackoffPolicy, Long, TimeUnit) -> B` (also `Duration` overload) | `EXPONENTIAL`, 30s | Retry backoff policy; delay must be within `MIN_BACKOFF_MILLIS` (10s) and `MAX_BACKOFF_MILLIS` (5h). |
| `Builder.setExpedited(policy: OutOfQuotaPolicy)` | `(OutOfQuotaPolicy) -> B` | not expedited | Marks work as expedited. |
| `Builder.addTag(tag: String)` | `(String) -> B` | — | Adds a searchable/cancelable tag. |
| `Builder.setInputMerger(inputMerger: Class<out InputMerger>)` (`OneTimeWorkRequest.Builder` only) | `(Class<out InputMerger>) -> Builder` | `OverwritingInputMerger` | Controls how parent outputs merge into this worker's input. |
| `Builder.keepResultsForAtLeast(duration, timeUnit)` | `(Long, TimeUnit) -> B` (also `Duration` overload) | — | Minimum retention time for results/output data. |
| `Builder.build()` | `() -> W` | — | Builds the immutable request. |

## Notes

- Constants: `WorkRequest.MIN_BACKOFF_MILLIS = 10_000L`, `WorkRequest.MAX_BACKOFF_MILLIS = 18_000_000L` (5h), `WorkRequest.DEFAULT_BACKOFF_DELAY_MILLIS = 30_000L`.
- Two concrete implementations exist: `OneTimeWorkRequest` (this page) and `PeriodicWorkRequest` (see [periodicworkrequest.md](./periodicworkrequest.md)).
- Tags enable bulk operations, e.g. `WorkManager.cancelAllWorkByTag("cleanup")`, `getWorkInfosByTag("cleanup")`.
- Package: `androidx.work`.

## Related

- [PeriodicWorkRequest](./periodicworkrequest.md)
- [Constraints](./constraints.md)
- [BackoffPolicy and retry](./backoffpolicy.md)
- [Data and workDataOf](./data.md)
- [WorkManager enqueue / cancel / query](./workmanager.md)
