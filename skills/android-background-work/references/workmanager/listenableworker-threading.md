# Threading in ListenableWorker

Deep dive on `ListenableWorker`, the base primitive that leaves threading entirely to the implementation, and the `ListenableFuture`-based `startWork()` contract used to wrap callback-based async APIs.

## Signature / Usage

```kotlin
class CallbackWorker(
        context: Context,
        params: WorkerParameters
) : ListenableWorker(context, params) {
    override fun startWork(): ListenableFuture<Result> {
        return CallbackToFutureAdapter.getFuture { completer ->
            val callback = object : Callback {
                var successes = 0
                override fun onFailure(call: Call, e: IOException) {
                    completer.setException(e)
                }
                override fun onResponse(call: Call, response: Response) {
                    successes++
                    if (successes == 100) completer.set(Result.success())
                }
            }
            completer.addCancellationListener(cancelDownloadsRunnable, executor)
            repeat(100) { downloadAsynchronously("https://example.com", callback) }
            callback
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ListenableWorker.startWork()` | `() -> ListenableFuture<Result>` | Abstract method; the start signal is invoked on the **main thread**, so implementations must explicitly hand off to a background thread/callback API. Must return a `ListenableFuture` that is set with a `Result` once the operation completes. |
| `CallbackToFutureAdapter.getFuture { completer -> ... }` | builder | Recommended (non-Guava) way to construct the `ListenableFuture` returned by `startWork()`; requires the `androidx.concurrent:concurrent-futures` dependency. |
| `Completer.setException(e)` / `set(result)` | callback | Resolves the future from within the wrapped callback. |
| `Completer.addCancellationListener(runnable, executor)` | callback | Registers cleanup logic run when the `ListenableFuture` is cancelled (i.e. WorkManager stopped the worker). |

## Notes

- `ListenableFuture` is always cancelled when the work is stopped; register a cancellation listener to release resources (e.g. cancel in-flight network calls).
- `Worker`, `CoroutineWorker`, and `RxWorker` are all built on top of `ListenableWorker` and hide this manual threading; implement `ListenableWorker` directly only for callback-based async APIs that don't fit those higher-level primitives.
- `RemoteListenableWorker` (from `work-multiprocess`) extends this same contract to bind a worker to a specific process; see [Multiprocess WorkManager](./multiprocess.md).
- This page is the API-focused deep dive on `ListenableWorker` specifically; the cross-primitive overview comparing `Worker`/`CoroutineWorker`/`RxWorker`/`ListenableWorker` threading is on [Threading in WorkManager](./threading.md).
- Package: `androidx.work`.

## Related

- [Threading in WorkManager](./threading.md)
- [Worker / ListenableWorker / Result](./worker.md)
- [Multiprocess WorkManager](./multiprocess.md)
