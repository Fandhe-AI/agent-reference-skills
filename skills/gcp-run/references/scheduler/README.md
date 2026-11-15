# scheduler

| Name | Description | Path |
|---|---|---|
| Cloud Scheduler overview | Targets, at-least-once delivery, regions, deduplication headers | [overview.md](./overview.md) |
| Set up Cloud Scheduler | Enable API, authentication, App Engine app | [setup.md](./setup.md) |
| Create and manage cron jobs | gcloud create/update for HTTP, Pub/Sub, App Engine; pause, resume, delete | [creating.md](./creating.md) |
| Schedule and run a cron job (gcloud quickstart) | Pub/Sub target quickstart | [schedule-run-cron-job-gcloud.md](./schedule-run-cron-job-gcloud.md) |
| Cron job format and time zone | unix-cron fields, groc format, `--time-zone` | [cron-job-schedules.md](./cron-job-schedules.md) |
| Retry jobs | Retry flags, defaults, backoff examples | [retry-jobs.md](./retry-jobs.md) |
| HTTP target authentication | OIDC vs OAuth, service accounts, service agent role | [http-target-auth.md](./http-target-auth.md) |
| Access control | IAM roles and permissions | [access-control.md](./access-control.md) |
| Locations | Supported regions | [locations.md](./locations.md) |
| Quotas and limits | Quotas, attempt deadline ranges | [quotas.md](./quotas.md) |
| Troubleshooting | Error codes, permission and execution issues | [troubleshooting.md](./troubleshooting.md) |
| Execute Cloud Run jobs on a schedule | Scheduler HTTP job calling the Cloud Run `:run` API | [jobs-on-schedule.md](./jobs-on-schedule.md) |
