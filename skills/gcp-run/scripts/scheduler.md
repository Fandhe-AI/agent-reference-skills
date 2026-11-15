---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler
---

# Cloud Scheduler Jobs

Copy-paste gcloud commands for Cloud Scheduler: enable the API, create HTTP, Pub/Sub and App Engine HTTP jobs, authenticate calls to Cloud Run services and the Cloud Run Admin API, list, describe, run, edit, pause, resume and delete jobs.

## Signature / Usage

### Enable the API

```bash
gcloud services enable cloudscheduler.googleapis.com
```

### Create an HTTP job

Targeted HTTP endpoints must be publicly reachable (public ingress). Cloud Run and Cloud Run functions on the `run.app` URL can also be invoked when restricted to internal ingress, if they are in the same Google Cloud project or VPC Service Controls perimeter as the job. Reachability is separate from authentication: see the authentication sections below.

```bash
gcloud scheduler jobs create http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

Adapted (not in the official docs): the example URI uses `https://` instead of the source's `http://`, and `--location=LOCATION` is added (without it gcloud uses the App Engine app's location and fails in a project without one).

```bash
gcloud scheduler jobs create http my-http-job \
    --location=LOCATION \
    --schedule "0 1 * * 0" \
    --uri "https://myproject/my-url.com" \
    --http-method GET
```

### Create an HTTP job with OIDC authentication

Use `--oauth-service-account-email` instead of `--oidc-service-account-email` only for Google APIs on `*.googleapis.com`. `URI` must start with `https://`.

```bash
gcloud scheduler jobs create http JOB_ID \
    --location=LOCATION \
    --schedule="FREQUENCY" \
    --uri=URI \
    --oidc-service-account-email=SERVICE_ACCOUNT_EMAIL
```

### Run a Cloud Run service on a schedule

Create the invoker service account and allow it to call the service (private service, per-service binding):

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "DISPLAYED_SERVICE_ACCOUNT_NAME"
```

```bash
gcloud run services add-iam-policy-binding SERVICE \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

Adapted (not in the official docs): the source's command has blank lines between flags and no `\` line continuations, so it does not run as one command; continuations added. Also added `--location=REGION`, since gcloud otherwise falls back to the App Engine app's location and fails in a project without one.

```bash
gcloud scheduler jobs create http test-job --schedule "5 * * * *" \
       --location=REGION \
       --http-method=HTTP-METHOD \
       --uri=SERVICE-URL \
       --oidc-service-account-email=SERVICE-ACCOUNT-EMAIL \
       --oidc-token-audience=SERVICE-URL
```

Replace `HTTP-METHOD` with the HTTP method (GET, POST, PUT, and so on), `SERVICE-URL` with your service URL, and `SERVICE-ACCOUNT-EMAIL` with the service account email.

### Run a Cloud Run job on a schedule

```bash
gcloud scheduler jobs create http SCHEDULER_JOB_NAME \
    --location SCHEDULER_REGION \
    --schedule="SCHEDULE" \
    --uri="https://run.googleapis.com/v2/projects/PROJECT_ID/locations/CLOUD_RUN_REGION/jobs/JOB:run" \
    --http-method POST \
    --oauth-service-account-email PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

`SCHEDULE` example: `0 12 * * *`. `PROJECT_NUMBER` is the project number, not the ID.

### Allow a service account to invoke a Cloud Run function

Only for a function created with `gcloud functions deploy` (Cloud Functions v2 API) or a 1st gen function. For a function deployed with `gcloud run deploy --function`, use the `gcloud run services add-iam-policy-binding SERVICE … --role=roles/run.invoker` command under "Run a Cloud Run service on a schedule" above (see Notes).

```bash
gcloud functions add-invoker-policy-binding my-cloud-function \
    --region=REGION \
    --member=serviceAccount:my-service-account@my-project.iam.gserviceaccount.com
```

### Create a Pub/Sub job

The topic must already exist in the project.

Adapted (not in the official docs): adds `--message-body=MESSAGE_BODY`, which gcloud requires (one of `--attributes` / `--message-body` / `--message-body-from-file`).

```bash
gcloud scheduler jobs create pubsub JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --topic=TOPIC \
    --message-body=MESSAGE_BODY
```

Adapted (not in the official docs): added `--location=LOCATION` (without it gcloud uses the App Engine app's location and fails in a project without one).

```bash
gcloud scheduler jobs create pubsub myjob \
    --location=LOCATION \
    --schedule "0 1 * * 0" \
    --topic cron-topic \
    --message-body "Hello"
```

### Create an App Engine HTTP job

Only for the App Engine app of the current project; for another app use an HTTP target. The location must equal the App Engine app's location.

Adapted (not in the official docs): `JOB` is positional (as in the source's own example and `update app-engine` form), not `--JOB=JOB`.

```bash
gcloud scheduler jobs create app-engine JOB \
    --location=LOCATION \
    --schedule=SCHEDULE
```

### Edit a job

```bash
gcloud scheduler jobs update http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

```bash
gcloud scheduler jobs update pubsub JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --topic=TOPIC
```

```bash
gcloud scheduler jobs update app-engine JOB \
    --location=LOCATION \
    --schedule=SCHEDULE
```

### List jobs (from the gcloud reference)

All jobs in a project:

```bash
gcloud scheduler jobs list
```

### Describe a job (from the gcloud reference)

```bash
gcloud scheduler jobs describe my-job
```

### Run a job now

```bash
gcloud scheduler jobs run my-cron-job --location="us-east1"
```

The first job created in a project can take a few minutes to run.

### Pause a job

Adapted (not in the official docs): added `--location=LOCATION` so the command acts on the job in the intended location rather than the App Engine app's location.

```bash
gcloud scheduler jobs pause MY_JOB --location=LOCATION
```

### Resume a job

Adapted (not in the official docs): added `--location=LOCATION` so the command acts on the job in the intended location rather than the App Engine app's location.

```bash
gcloud scheduler jobs resume MY_JOB --location=LOCATION
```

### Delete a job

> **Warning**: Deleting a job is permanent. Try it on a disposable job first.

Adapted (not in the official docs): added `--location=LOCATION`, since without it `delete` can act on a same-named job in the App Engine region.

```bash
gcloud scheduler jobs delete MY_JOB --location=LOCATION
```

### Quickstart: publish to a Pub/Sub topic on a schedule

```bash
gcloud pubsub topics create cron-topic
gcloud pubsub subscriptions create cron-sub --topic cron-topic
```

```bash
gcloud scheduler jobs create pubsub my-cron-job \
    --schedule="30 16 * * 7" \
    --topic=cron-topic \
    --location="us-east1" \
    --message-body="Hello world"
```

```bash
gcloud pubsub subscriptions pull cron-sub --limit 5
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--location` | all `scheduler jobs` commands | Job location; cannot be changed after creation; for App Engine targets equal to the app location |
| `--schedule` | `create`, `update` | Unix-cron compatible string, for example `0 */3 * * *` |
| `--uri` / `--http-method` | `create http` | Endpoint and method (default `POST`; body only for `POST` / `PUT`) |
| `--oidc-service-account-email` / `--oidc-token-audience` | `create http` | OIDC token identity and audience (audience defaults to the `--uri` value) |
| `--oauth-service-account-email` | `create http` | OAuth token for `*.googleapis.com` targets only |
| `--topic` / `--message-body` | `create pubsub` | Pub/Sub topic and message data |
| `--relative-url` | `create app-engine` | Endpoint path on the App Engine app (default `/`) |
| `--max-retry-attempts` / `--max-retry-duration` / `--min-backoff` / `--max-backoff` / `--max-doublings` | `create`, `update` | Retry settings; `--max-retry-attempts` is limited to 5 (default 0) |
| `--attempt-deadline` | `create http`, `update http`, `create app-engine`, `update app-engine` | Attempt deadline, for example `320s` |

Roles: Cloud Scheduler Admin (`roles/cloudscheduler.admin`) to create and run jobs; Service Account User (`roles/iam.serviceAccountUser`) on the service account you attach; Cloud Run Invoker (`roles/run.invoker`) for the job's service account on a Cloud Run service or job. Do not use the Cloud Scheduler service agent as the job's identity and do not revoke `roles/cloudscheduler.serviceAgent` from it.

## Notes

- Commands marked from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- The `jobs list` and `jobs describe` examples in the gcloud reference have no `--location`; per the command help it defaults to the location of the current project's App Engine app if there is an associated app. Add `--location=LOCATION` to list or describe jobs in a specific location.
- Destructive command on this page: `scheduler jobs delete`. Try it on a disposable job first.
- `gcloud functions add-invoker-policy-binding` works only for functions created with `gcloud functions deploy` (Cloud Functions v2 API) or for 1st gen functions. The official deploy page says: "If you created a Cloud Run function using `gcloud run` commands or the Cloud Run Admin API, you can't manage that function with `gcloud functions` commands or the Cloud Functions v2 API." For a function deployed with `gcloud run deploy --function`, use `gcloud run services add-iam-policy-binding … --role=roles/run.invoker`.
- Source inconsistency: https://docs.cloud.google.com/scheduler/docs/http-target-auth presents `gcloud functions add-invoker-policy-binding` for "the Cloud Run function `my-cloud-function`", while https://docs.cloud.google.com/functions/docs/deploy says a Cloud Run function created with `gcloud run` commands can't be managed with `gcloud functions` commands.
- Adapted from the official docs: the example HTTP URI was changed from `http://` to `https://`; `--location=LOCATION` was added to commands that lacked it, because gcloud otherwise uses the location of the project's App Engine app "if there is an associated app"; `jobs create pubsub JOB ...` gained `--message-body`; `--JOB=JOB` in the App Engine form became positional `JOB`; `gcloud scheduler jobs pause MY_JOB`, `resume MY_JOB` and `delete MY_JOB` gained `--location=LOCATION`.
- Corrected from the official docs: the Cloud Run schedule command had blank lines between flags and no `\` continuations.
- The Cloud Run job example in the source uses the Compute Engine default service account. Prefer a dedicated user-managed service account that has only `roles/run.invoker` on that job, and pass its email in `--oauth-service-account-email`. OAuth (not OIDC) is used because the target is a Google API.
- Cloud Scheduler is meant for repeating jobs; for a one-off run use Cloud Tasks. Make handlers idempotent: retries can duplicate runs.
- Keep a Cloud Run service private (require authentication); do not allow public access for scheduled calls.
- Cloud Scheduler and Cloud Run are Google Cloud services, distinct from Cloudflare Workers Cron Triggers (`cloudflare-workers`) and Vercel Cron (`vercel`). See the `gcp-foundation` skill for IAM and service accounts.
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/list (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/describe (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/scheduler/docs/creating (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/scheduler/docs/http-target-auth (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/scheduler/docs/configuring/retry-jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/scheduler/docs/schedule-run-cron-job-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/triggering/using-scheduler (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/execute/jobs-on-schedule (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/docs/deploy (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [tasks.md](./tasks.md)
- [jobs.md](./jobs.md)
- [services.md](./services.md)
- [app-engine.md](./app-engine.md)
