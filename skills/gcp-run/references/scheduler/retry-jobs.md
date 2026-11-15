---
source: https://docs.cloud.google.com/scheduler/docs/configuring/retry-jobs
---

# Retry jobs

If a job receives no acknowledgement from its handler it is considered failed and is retried with exponential backoff per the configured retry policy. Configure it in the Console, the gcloud CLI, or the `RetryConfig` of a `Job` resource in the API.

## Signature / Usage

Retry flags are used with `gcloud scheduler jobs create|update ...`:

```bash
gcloud scheduler jobs create http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

Snippet taken from https://docs.cloud.google.com/scheduler/docs/creating; add the retry flags from the table below to the command (this page lists them but shows no command).

## Options / Props

| Setting | Console label | CLI flag | API field | Default | Description |
|---|---|---|---|---|---|
| Maximum retry attempts | Max retry attempts | `--max-retry-attempts` | `retryCount` | 0 | Number of retries with exponential backoff. Values greater than 5 and negative values are not allowed. 0 (with `maxRetryDuration` also 0) means a failed attempt is not retried and the job waits for the next scheduled time. The next scheduled execution may be skipped if retries run through it. |
| Maximum retry duration | Max retry duration | `--max-retry-duration` | `maxRetryDuration` | 0 seconds | Time limit for retrying, from the first attempt. Duration in seconds with up to nine fractional digits ending in "s" (for example "3.5s"). 0 means unlimited, but if `retryCount` is also 0 there are no retries. If both are set, retries continue until both limits are reached. |
| Minimum backoff duration | Min backoff duration | `--min-backoff` | `minBackoffDuration` | 5 seconds | Minimum wait before retrying. |
| Maximum backoff duration | Max backoff duration | `--max-backoff` | `maxBackoffDuration` | 3600 seconds (1 hour) | Maximum wait before retrying. |
| Maximum doublings | Max doublings | `--max-doublings` | `maxDoublings` | 5 | Number of times the retry interval doubles before increasing linearly, then capped at `maxBackoffDuration`. |

### Backoff examples

- `minBackoffDuration` 10s, `maxBackoffDuration` 300s, `maxDoublings` 3: retries at 10s, 20s, 40s, 80s, 160s (maximum 5 retries).
- `minBackoffDuration` 10s, `maxBackoffDuration` 120s, `maxDoublings` 2: retries at 10s, 20s, 40s, 80s, 120s.

### Combination behavior

| `retryCount` | `maxRetryDuration` | Behavior |
|---|---|---|
| not set | not set | Both 0; no retries; runs at the next scheduled time |
| set | set | Retries at least `retryCount` times until `maxRetryDuration`; may retry more than `retryCount` times |
| set | not set | `maxRetryDuration` 0; retries exactly `retryCount` times |
| not set | set | Retries any number of times (up to 5) or until `maxRetryDuration` |

## Notes

- Setting `retryCount` to 0 does not prevent the job from running at its next schedule after a failure.
- Source inconsistency: the Console duration entry (see [creating.md](./creating.md)) accepts unit suffixes `h`, `m`, `s`, `ms`, `us`, `ns`; this page documents API durations in seconds (for example "3.5s"); the Console `Max retry duration` accepts only `h`, `m`, `s`.
- Retries combined with an attempt deadline can lead to duplicates; use the deduplication headers described in [overview.md](./overview.md).
- Source: https://docs.cloud.google.com/scheduler/docs/configuring/retry-jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating.md](./creating.md)
- [overview.md](./overview.md)
- [quotas.md](./quotas.md)
