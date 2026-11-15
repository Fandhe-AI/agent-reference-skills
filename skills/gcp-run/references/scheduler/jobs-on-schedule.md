---
source: https://docs.cloud.google.com/run/docs/execute/jobs-on-schedule
---

# Execute Cloud Run jobs on a schedule

Trigger a Cloud Run job on a recurring schedule with a Cloud Scheduler HTTP job that POSTs to the Cloud Run Admin API `:run` endpoint using an OAuth token (the target is `run.googleapis.com`).

## Signature / Usage

### Enable the API

```bash
gcloud services enable cloudscheduler.googleapis.com
```

### Create the Scheduler job

```bash
  gcloud scheduler jobs create http SCHEDULER_JOB_NAME \
      --location SCHEDULER_REGION \
      --schedule="SCHEDULE" \
      --uri="https://run.googleapis.com/v2/projects/PROJECT_ID/locations/CLOUD_RUN_REGION/jobs/JOB:run" \
      --http-method POST \
      --oauth-service-account-email PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

Replace: `SCHEDULER_JOB_NAME` (name), `SCHEDULER_REGION` (a Cloud Scheduler region such as `europe-west2`), `SCHEDULE` (for example `0 12 * * *`), `PROJECT_ID`, `CLOUD_RUN_REGION` (job region, for example `europe-west1`), `JOB` (Cloud Run job name), `PROJECT_NUMBER` (project number, not ID).

### URI inside a VPC Service Controls perimeter

```text
https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/jobs/JOB:run
```

This is the same URI as the `--uri` value above; it is not a shell command.

## Options / Props

| Role | Purpose |
|---|---|
| Cloud Scheduler Admin (`roles/cloudscheduler.admin`) or a custom role with `cloudscheduler.jobs.create` | Create the Scheduler job |
| Cloud Run Invoker (`roles/run.invoker`) | Execute jobs with gcloud |
| Cloud Run Developer (`roles/run.developer`) | Execute jobs with the Console |
| Service Account User (`roles/iam.serviceAccountUser`) on the service account passed in `--oauth-service-account-email` | Attach the service account to the Scheduler job (permission `iam.serviceAccounts.actAs`; from https://docs.cloud.google.com/scheduler/docs/http-target-auth, not listed on this page) |

Console flow: job page, **Triggers** tab, **Add Scheduler Trigger**; the Scheduler region need not match the Cloud Run job region; choose a service account allowed to invoke the job.

## Notes

- OAuth (not OIDC) is used because the target is a Google API on `*.googleapis.com`; see [http-target-auth.md](./http-target-auth.md).
- The source example uses the Compute Engine default service account. Prefer a dedicated user-managed service account that has only `roles/run.invoker` on this job, and pass its email in `--oauth-service-account-email`.
- To prevent duplicate executions when Cloud Scheduler retries, see "Prevent duplicate requests to Google Cloud API targets" at https://docs.cloud.google.com/scheduler/docs/configuring/deduplicate-job-requests#deduplicate-google-api-targets.
- The source also shows a Terraform resource; omitted. Cloud Run jobs configuration lives in the Cloud Run job pages of this skill.
- Cloud Run and Cloud Scheduler are Google Cloud services, distinct from Cloudflare Workers Cron Triggers (`cloudflare-workers`) and Vercel Cron (`vercel`).
- Source: https://docs.cloud.google.com/run/docs/execute/jobs-on-schedule (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [http-target-auth.md](./http-target-auth.md)
- [creating.md](./creating.md)
- [cron-job-schedules.md](./cron-job-schedules.md)
