---
source: https://docs.cloud.google.com/scheduler/docs/overview
---

# Cloud Scheduler overview

Cloud Scheduler runs scheduled units of work (cron jobs) at defined times or regular intervals and sends each to a target: HTTP/S endpoints, Pub/Sub topics, or App Engine HTTP/S applications. Delivery is at-least-once, so targets must be idempotent.

## Signature / Usage

### Create an HTTP target job

```bash
gcloud scheduler jobs create http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

### Deduplicate retried requests

Use the `X-CloudScheduler-JobName` and `X-CloudScheduler-ScheduleTime` HTTP headers that Cloud Scheduler adds to requests. Duplicate requests for the same scheduled run can occur when the target takes longer than the job's `attemptDeadline` or a transient network interruption prevents Cloud Scheduler from receiving the `2xx` acknowledgment.

## Options / Props

| Topic | Rule |
|---|---|
| Target types | HTTP/S endpoint, Pub/Sub topic, App Engine HTTP/S app |
| Regions: HTTP/S or Pub/Sub target | All supported Cloud Scheduler regions |
| Regions: App Engine target in the current project | Job can only be created in the project's App Engine region (one App Engine app per project; region cannot be changed). To spread jobs across regions, target HTTP/S or Pub/Sub instead. |
| App Engine app required? | Only when using an App Engine target; otherwise you need not deploy one and can disable an existing app. |
| Retry | Failed jobs (no acknowledgment from the handler) retry with exponential backoff per the retry policy. |
| Interfaces | Cloud console or gcloud CLI |

## Notes

- Snippet taken from https://docs.cloud.google.com/scheduler/docs/creating (`gcloud scheduler jobs create http`); the overview page itself has no code block.
- Cloud Scheduler is Google Cloud's managed cron service; it is distinct from Cloudflare Workers Cron Triggers (`cloudflare-workers`) and from Cloud Tasks (one-off task queue).
- Source: https://docs.cloud.google.com/scheduler/docs/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [creating.md](./creating.md)
- [retry-jobs.md](./retry-jobs.md)
- [cron-job-schedules.md](./cron-job-schedules.md)
