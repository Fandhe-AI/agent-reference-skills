# OutOfQuotaPolicy and Expedited Work

Fallback behavior for expedited work requests when the app has exhausted its expedited job quota.

## Signature / Usage

```kotlin
public enum class OutOfQuotaPolicy {
    RUN_AS_NON_EXPEDITED_WORK_REQUEST,
    DROP_WORK_REQUEST,
}
```

```kotlin
val request = OneTimeWorkRequestBuilder<ExpeditedWorker>()
    .setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST)
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST` | enum value | — | When quota is unavailable, the request falls back to running as a regular (non-expedited) work request. |
| `OutOfQuotaPolicy.DROP_WORK_REQUEST` | enum value | — | When quota is unavailable, the request is dropped entirely and never enqueued. |
| `WorkRequest.Builder.setExpedited(policy)` | `(OutOfQuotaPolicy) -> Builder` | not expedited | Marks the request as expedited, subject to the given out-of-quota policy. |

## Notes

- Expedited work is intended for immediate, important background tasks expected to complete within minutes.
- `ListenableWorker.getForegroundInfoAsync()` (or `CoroutineWorker.getForegroundInfo()`) must be overridden for expedited work requests.
- Package: `androidx.work`.

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [ForegroundInfo and long-running workers](./foreground-work.md)
- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
