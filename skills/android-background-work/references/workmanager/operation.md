# Operation

Return type of `WorkManager.enqueue*`, `cancel*`, and `pruneWork()` calls; represents the asynchronous WorkManager database write itself (not the eventual work execution).

## Signature / Usage

```kotlin
public interface Operation {
    public fun getState(): LiveData<State>
    public fun getResult(): ListenableFuture<State.SUCCESS>

    public abstract class State {
        public class SUCCESS : State
        public class IN_PROGRESS : State
        public class FAILURE(val throwable: Throwable) : State
    }
}
```

```kotlin
val operation = workManager.enqueue(request)

// Block (e.g. in a test) until the enqueue has been written to the database
operation.result.get()

// Or observe asynchronously
operation.state.observe(lifecycleOwner) { state ->
    if (state is Operation.State.FAILURE) {
        Log.e("WM", "enqueue failed", state.throwable)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `LiveData<Operation.State>` | — | Observe with `LiveData.observe(LifecycleOwner, Observer)`; emits `IN_PROGRESS`, then a terminal `SUCCESS` or `FAILURE`. |
| `result` | `ListenableFuture<Operation.State.SUCCESS>` | — | Resolves only on `SUCCESS`; a `FAILURE` surfaces as an exception on the future instead of a value. `IN_PROGRESS` is never reported since it isn't terminal. |
| `State.SUCCESS` | terminal | — | The database operation (enqueue/cancel/prune) completed successfully. |
| `State.IN_PROGRESS` | non-terminal | — | The operation has been submitted but not yet completed. |
| `State.FAILURE` | terminal | — | The operation failed; `getThrowable()` returns the cause. |

## Notes

- `Operation` tracks whether the WorkManager database write succeeded — it says nothing about whether the underlying `Worker` itself later succeeds or fails; use `WorkInfo` / `WorkInfo.State` to observe actual work execution.
- Calling `.result.get()` synchronously is a common pattern in unit tests to wait for `enqueue()`/`cancelUniqueWork()` to finish before asserting on `WorkInfo`.
- Package: `androidx.work`.

## Related

- [WorkManager enqueue / cancel / query](./workmanager.md)
- [WorkInfo and monitoring](./workinfo.md)
- [Testing WorkManager](./testing.md)
