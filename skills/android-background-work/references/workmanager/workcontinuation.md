# WorkContinuation

Represents a chain of dependent `OneTimeWorkRequest`s created via `WorkManager.beginWith()` / `beginUniqueWork()`.

## Signature / Usage

```java
public abstract class WorkContinuation {
    public final WorkContinuation then(OneTimeWorkRequest work)
    public abstract WorkContinuation then(List<OneTimeWorkRequest> work)
    public abstract Operation enqueue()
    public abstract LiveData<List<WorkInfo>> getWorkInfosLiveData()
    public abstract ListenableFuture<List<WorkInfo>> getWorkInfos()
    public static WorkContinuation combine(List<WorkContinuation> continuations)
}
```

```kotlin
WorkManager.getInstance(myContext)
    // Candidates to run in parallel
    .beginWith(listOf(plantName1, plantName2, plantName3))
    // Dependent work, runs only after all previous work succeeds
    .then(cache)
    .then(upload)
    .enqueue()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WorkManager.beginWith(request)` / `beginWith(requests)` | `(...) -> WorkContinuation` | — | Starts a chain; a `List` runs in parallel. |
| `WorkManager.beginUniqueWork(name, policy, request)` | `(String, ExistingWorkPolicy, ...) -> WorkContinuation` | — | Starts a uniquely-named chain. |
| `then(work: OneTimeWorkRequest)` / `then(work: List<OneTimeWorkRequest>)` | `(...) -> WorkContinuation` | — | Appends work that depends on successful completion of all previously added requests; each call returns a new `WorkContinuation`. |
| `combine(continuations: List<WorkContinuation>)` | static | — | Merges multiple continuations as prerequisites of a new one, for complex fan-in chains. |
| `enqueue()` | `() -> Operation` | — | Enqueues the entire chain. |
| `getWorkInfosLiveData()` | `() -> LiveData<List<WorkInfo>>` | — | Observes status of every request in this continuation and its prerequisites. |

## Notes

- Success flow: the first request runs; once it returns `Result.success()`, its dependents are enqueued, continuing through the chain.
- Failure/retry: only the failed request retries per its `BackoffPolicy`; unrelated parallel work is unaffected. If retries are exhausted or `Result.failure()` is returned, that request and all dependents are marked `FAILED`.
- Cancellation of a request marks all its dependents `CANCELLED`. Appending work to an already failed/cancelled chain marks the new requests `FAILED`/`CANCELLED` too — use `ExistingWorkPolicy.APPEND_OR_REPLACE` to start a fresh chain instead.
- `InputMerger` controls how outputs from multiple parents in a chain are merged into a child's input (see [Data / InputMerger](./data.md)).
- Package: `androidx.work`.

## Related

- [WorkManager enqueue / cancel / query](./workmanager.md)
- [ExistingWorkPolicy / ExistingPeriodicWorkPolicy](./existingworkpolicy.md)
- [Data / workDataOf / InputMerger](./data.md)
- [WorkInfo and monitoring](./workinfo.md)
