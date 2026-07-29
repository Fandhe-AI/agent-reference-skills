# WorkManager.updateWork()

Replaces the definition of an already-enqueued `WorkRequest` in place — preserving its enqueue time (and, for periodic work, its scheduling alignment) instead of cancelling and re-enqueueing a new request. Available since WorkManager 2.8.0.

## Signature / Usage

```kotlin
public abstract class WorkManager {
    public abstract fun updateWork(request: WorkRequest): ListenableFuture<UpdateResult>

    // UpdateResult is nested inside WorkManager, not a top-level type
    public enum class UpdateResult { NOT_APPLIED, APPLIED_IMMEDIATELY, APPLIED_FOR_NEXT_RUN }
}
```

```kotlin
suspend fun relaxUploadConstraint(workManager: WorkManager, uniqueWorkName: String) {
    val existing = workManager.getWorkInfosForUniqueWork(uniqueWorkName).await()
    val existingId = existing.firstOrNull()?.id ?: return

    val updatedRequest = OneTimeWorkRequestBuilder<UploadWorker>()
        .setId(existingId) // must match the id of the request being replaced
        .setConstraints(Constraints.Builder().setRequiresCharging(false).build())
        .build()

    workManager.updateWork(updatedRequest)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `request` | `WorkRequest` | — | Must carry an `id` (via `WorkRequest.Builder.setId()`) matching a previously enqueued request's id. |
| `UpdateResult.APPLIED_IMMEDIATELY` | enum value | — | The update was applied right away because the targeted work wasn't currently running. |
| `UpdateResult.APPLIED_FOR_NEXT_RUN` | enum value | — | The targeted work is currently running; the current run keeps its old constraints/tags, and the new definition takes effect on the next run (retry, or next periodic iteration). |
| `UpdateResult.NOT_APPLIED` | enum value | — | The one-time work being updated has already finished; nothing changed. |

## Notes

- Preserves enqueue time: e.g. a request enqueued 3 hours ago with a 6-hour initial delay is still eligible to run in 3 hours after the update, as long as the delay itself wasn't changed.
- Cannot convert between `OneTimeWorkRequest` and `PeriodicWorkRequest` — the returned future completes exceptionally with `IllegalArgumentException` per the API javadoc, though the current implementation actually throws `UnsupportedOperationException` for this case. Use cancel + enqueue instead for such a conversion. Swapping the `Worker`/`CoroutineWorker` class itself while keeping the same request type (one-time or periodic) is allowed and is applied by `updateWork()`.
- If no enqueued work matches `request`'s id, the future completes exceptionally with `IllegalArgumentException`.
- Each successful update increments the work's generation, retrievable via `WorkInfo.getGeneration()`; the returned `UpdateResult` itself does not carry the generation.
- Package: `androidx.work`.

## Related

- [WorkManager enqueue / cancel / query](./workmanager.md)
- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
- [WorkInfo and monitoring](./workinfo.md)
