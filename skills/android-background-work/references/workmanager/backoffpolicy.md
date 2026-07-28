# BackoffPolicy and Retry

Retry backoff strategy applied when a worker returns `Result.retry()` or throws, configured via `WorkRequest.Builder.setBackoffCriteria`.

## Signature / Usage

```kotlin
public enum class BackoffPolicy { EXPONENTIAL, LINEAR }
```

```kotlin
val myWorkRequest = OneTimeWorkRequestBuilder<MyWork>()
    .setBackoffCriteria(
        BackoffPolicy.LINEAR,
        WorkRequest.MIN_BACKOFF_MILLIS, // 10 seconds minimum
        TimeUnit.MILLISECONDS,
    )
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `BackoffPolicy.EXPONENTIAL` | enum value | default policy | Increases backoff time exponentially between retries. |
| `BackoffPolicy.LINEAR` | enum value | — | Increases backoff time linearly between retries. |
| `setBackoffCriteria(policy, delay, timeUnit)` | `(BackoffPolicy, Long, TimeUnit) -> Builder` | `EXPONENTIAL`, 30s | Sets the retry policy and minimum initial delay; also has a `Duration` overload. |

## Notes

- Minimum backoff delay is `WorkRequest.MIN_BACKOFF_MILLIS` (10 seconds); maximum is `WorkRequest.MAX_BACKOFF_MILLIS` (5 hours).
- Default policy is `EXPONENTIAL` with a 30 second initial delay (`WorkRequest.DEFAULT_BACKOFF_DELAY_MILLIS`).
- Only the failed request in a chain is retried; parallel/unrelated work is unaffected. If retries are exhausted or `Result.failure()` is returned, the request and its dependents are marked `FAILED`.
- Package: `androidx.work`.

## Related

- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
- [Worker / ListenableWorker / Result](./worker.md)
- [WorkInfo and monitoring](./workinfo.md)
