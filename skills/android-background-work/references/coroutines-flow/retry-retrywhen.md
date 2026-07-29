# retry, retryWhen

`retry` and `retryWhen` re-collect the upstream `Flow` when it throws, instead of just falling back to a value like `catch` does. They are the standard way to re-attempt a failed upstream flow (e.g. a network-backed flow) with a predicate that decides whether (and after what delay) to try again.

## Signature / Usage

```kotlin
fun <T> Flow<T>.retry(
    retries: Long = Long.MAX_VALUE,
    predicate: suspend (cause: Throwable) -> Boolean = { true }
): Flow<T>

fun <T> Flow<T>.retryWhen(
    predicate: suspend FlowCollector<T>.(cause: Throwable, attempt: Long) -> Boolean
): Flow<T>
```

```kotlin
newsRemoteDataSource.latestNews
    .retry(3) { cause ->
        // retry only on IOException, with a backoff delay
        (cause is IOException).also { if (it) delay(1000) }
    }
    .catch { emit(lastCachedNews()) } // fallback once retries are exhausted
    .collect { news -> render(news) }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `retry(retries, predicate)` | `Long`, `suspend (Throwable) -> Boolean` | `Long.MAX_VALUE`, `{ true }` | Re-collects the upstream flow up to `retries` times when `predicate` returns `true` for the thrown exception. |
| `retryWhen(predicate)` | `suspend FlowCollector<T>.(cause: Throwable, attempt: Long) -> Boolean` | — | Lower-level form: `attempt` is a 0-based retry counter; the predicate can also `emit` a value before signaling retry. |

## Notes

- `retry(retries, predicate)` is shorthand for `retryWhen { cause, attempt -> attempt < retries && predicate(cause) }` — the attempt-count check happens first, so the predicate is not invoked once `retries` is exhausted.
- Both operators are transparent to exceptions thrown **downstream** of them (e.g. inside `collect`); only exceptions from the upstream flow being retried are considered.
- The predicate is `suspend`, so it can `delay(...)` before returning `true` to implement backoff.
- Retrying restarts collection of the upstream flow from scratch (any upstream `onStart`/side effects re-run); it does not resume from the last emitted value.
- Combine with `catch` for a final fallback once retries are exhausted, as in the example above.

## Related

- [Flow intermediate operators](./flow-operators.md)
- [Flow basics](./flow-basics.md)
