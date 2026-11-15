---
source: https://docs.cloud.google.com/scheduler/quotas
---

# Cloud Scheduler quotas and limits

Quotas have default values and can usually be adjusted; system limits are fixed. Quotas apply per project. Includes the attempt deadline range for each target type.

## Signature / Usage

Attempt deadline is part of the Job resource (`attemptDeadline` in the REST API); a job that exceeds it ends with a `DEADLINE_EXCEEDED` error and is retried per the retry policy.

```bash
gcloud scheduler jobs create http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

Snippet taken from https://docs.cloud.google.com/scheduler/docs/creating; the retrieved quota page shows no gcloud command. The gcloud flag that sets the attempt deadline is `--attempt-deadline=ATTEMPT_DEADLINE` (for example `--attempt-deadline=320s`; HTTP range 15s to 1800s per the table below) on `gcloud scheduler jobs create http`, `update http`, `create app-engine` and `update app-engine` (https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/create/http).

## Options / Props

### Quotas (per project, adjustable)

| Resource | Value |
|---|---|
| Read API requests per minute (`ListJobs`, `GetJob`, `ListLocations`, `GetLocation`) | 1,250 |
| Write API requests per minute (`CreateJob`, `UpdateJob`, `DeleteJob`, `PauseJob`, `ResumeJob`, `RunJob`) | 500 |
| Number of jobs (per region) | 5,000 |
| Fixed maximum job size (payload) | 1 MB total including about 1 KB request overhead |

### Limits (not adjustable): job duration / attempt deadline

| Target | Default | Configurable range / maximum |
|---|---|---|
| HTTP | 3 minutes | 15 seconds to 30 minutes (1,800 seconds) |
| App Engine HTTP, standard automatic scaling | 10 minutes | Maximum 10 minutes |
| App Engine HTTP, standard basic or manual scaling | 24 hours | Maximum 24 hours |
| App Engine HTTP, flexible environment | 60 minutes | Maximum 60 minutes |
| Pub/Sub | `attemptDeadline` is ignored | — |

For App Engine targets the deadline is configurable from 15 seconds up to the scaling type's maximum timeout. Summary in the source's table: HTTP targets 30 minutes (1,800 seconds); App Engine targets up to 24 hours.

## Notes

- Request quota changes in the Google Cloud console (see Cloud Quotas "Request a quota adjustment").
- Longer-running work: when a long operation (more than 30 minutes) makes Cloud Scheduler return HTTP `504`, the target may still be running and a retry can duplicate it; see [troubleshooting.md](./troubleshooting.md) and the deduplication headers in [overview.md](./overview.md).
- Source: https://docs.cloud.google.com/scheduler/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [retry-jobs.md](./retry-jobs.md)
- [creating.md](./creating.md)
