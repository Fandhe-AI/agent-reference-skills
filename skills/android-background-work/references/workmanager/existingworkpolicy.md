# ExistingWorkPolicy / ExistingPeriodicWorkPolicy

Conflict-resolution strategies applied when enqueueing unique work under a name that may already have pending work.

## Signature / Usage

```kotlin
public enum class ExistingWorkPolicy { REPLACE, KEEP, APPEND, APPEND_OR_REPLACE }

public enum class ExistingPeriodicWorkPolicy { REPLACE, KEEP, UPDATE, CANCEL_AND_REENQUEUE }
```

```kotlin
WorkManager.getInstance(context).enqueueUniqueWork(
    "uniqueName",
    ExistingWorkPolicy.KEEP,
    myWork,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ExistingWorkPolicy.REPLACE` | enum value | — | Cancels and deletes existing pending work with the same name, then inserts the new work. |
| `ExistingWorkPolicy.KEEP` | enum value | — | If pending work with the same name exists, does nothing; otherwise inserts the new work. |
| `ExistingWorkPolicy.APPEND` | enum value | — | Attaches new work as a child of the existing chain's leaves; if a prerequisite is `FAILED`/`CANCELLED`, the new work cascades to that state too. |
| `ExistingWorkPolicy.APPEND_OR_REPLACE` | enum value | — | Like `APPEND`, but failed/cancelled prerequisites are dropped and the new work starts a fresh sequence regardless. |
| `ExistingPeriodicWorkPolicy.REPLACE` (deprecated) | enum value | — | Cancels and deletes existing pending periodic work, then inserts new work; superseded by `UPDATE`. |
| `ExistingPeriodicWorkPolicy.KEEP` | enum value | — | If pending work with the same name exists, does nothing. |
| `ExistingPeriodicWorkPolicy.UPDATE` | enum value | — | Updates the existing pending work's spec in place (or enqueues if none exists), preserving original enqueue time; a currently running execution is not interrupted, but subsequent runs use the new spec. |
| `ExistingPeriodicWorkPolicy.CANCEL_AND_REENQUEUE` | enum value | — | Functionally identical to `REPLACE`; provided for readability. |

## Notes

- Use with `WorkManager.enqueueUniqueWork()` / `beginUniqueWork()` (`ExistingWorkPolicy`) and `enqueueUniquePeriodicWork()` (`ExistingPeriodicWorkPolicy`).
- Package: `androidx.work`.

## Related

- [WorkManager enqueue / cancel / query](./workmanager.md)
- [WorkContinuation](./workcontinuation.md)
- [PeriodicWorkRequest](./periodicworkrequest.md)
