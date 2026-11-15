---
source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks
---

# Cloud Tasks Queues

Copy-paste gcloud commands for Cloud Tasks queues that dispatch HTTP tasks to Cloud Run services: create and describe queues, tune rate limits and retries, pause, resume, purge and delete, and let the task identity call a private Cloud Run service.

## Signature / Usage

### Create, describe and list queues

```bash
gcloud tasks queues create QUEUE_ID \
    --location=LOCATION
```

```bash
gcloud tasks queues describe QUEUE_ID \
    --location=LOCATION
```

```bash
gcloud tasks queues list \
    --location=LOCATION
```

`queues list` covers one location only; repeat it per location. A new queue can take a few minutes to become available.

### Create a queue with REST

Request body (`request.json`):

```json
{
  "name": "projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID"
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://cloudtasks.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/queues"
```

### Set rate limits

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --max-dispatches-per-second=DISPATCH_RATE \
    --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES
```

### Set retry parameters

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --max-attempts=MAX_ATTEMPTS \
    --max-retry-duration=MAX_RETRY_DURATION \
    --min-backoff=MIN_INTERVAL \
    --max-backoff=MAX_INTERVAL \
    --max-doublings=MAX_DOUBLINGS
```

Verify:

```bash
gcloud tasks queues describe QUEUE_ID --location=LOCATION
```

### Pause and resume a queue

When updating queue-level routing on an existing queue, pause it first and wait one minute after the change before resuming.

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues pause QUEUE_ID --location=LOCATION
```

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues resume QUEUE_ID --location=LOCATION
```

### Purge a queue (from the gcloud reference)

> **Warning**: Purging deletes all tasks in the queue. Try it on a disposable queue first.

Adapted (not in the official docs): added `--location=LOCATION` so the irreversible purge acts on the intended queue.

```bash
gcloud tasks queues purge my-queue --location=LOCATION
```

### Delete a queue (from the gcloud reference)

> **Warning**: Deleting a queue is destructive. Try it on a disposable queue first.

Adapted (not in the official docs): added `--location=LOCATION` so the delete acts on the intended queue.

```bash
gcloud tasks queues delete my-queue --location=LOCATION
```

### Route HTTP tasks to another host (queue-level routing)

`ACCESS_TOKEN` comes from `gcloud auth application-default login` then `gcloud auth application-default print-access-token`; pause the queue first (see above).

```bash
curl -X PATCH -d @- -i \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  "https://cloudtasks.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID?updateMask=httpTarget.uriOverride" << EOF
{
  "httpTarget": {"uriOverride":{"host":"NEW_HOST"}}
}
EOF
```

### Route App Engine tasks (queue-level routing)

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --routing-override=service:SERVICE,version:VERSION
```

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --clear-routing-override
```

### Let the task identity invoke a private Cloud Run service

Create a service account for the tasks and grant it `roles/run.invoker` on the service only:

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "DISPLAYED_SERVICE_ACCOUNT_NAME"
```

```bash
gcloud run services add-iam-policy-binding SERVICE \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

### Create a task over the REST BufferTask method

Requires a queue with queue-level routing. `PROJECT_ID` comes from `gcloud config get-value project`.

Adapted (not in the official docs): added the missing space before the line-continuation backslash after `-X HTTP_METHOD`, and replaced the dangling trailing backslash with the `Authorization: Bearer ACCESS_TOKEN` header from the source's authenticated BufferTask variant.

```bash
curl -X HTTP_METHOD \
  "https://cloudtasks.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID/tasks:buffer" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--location` | all `tasks queues` commands | Queue location; without it gcloud uses the project's App Engine app location |
| `--max-dispatches-per-second` | `queues update` | Steady-state dispatch rate (default 500) |
| `--max-concurrent-dispatches` | `queues update` | Maximum tasks running at once (default 1000) |
| `--max-attempts` | `queues update` | Attempts including the first; `-1` for unlimited (default 100) |
| `--max-retry-duration` | `queues update` | Limit from the first attempt, a string ending in `s`; `0s` for unlimited |
| `--min-backoff` / `--max-backoff` | `queues update` | Wait between retries, strings ending in `s` (defaults `0.100s` / `3600s`) |
| `--max-doublings` | `queues update` | Doublings of the retry interval before it grows linearly (default 16) |
| `--routing-override` / `--clear-routing-override` | `queues update` | App Engine queue-level routing `service:SERVICE,version:VERSION` / remove it |

Roles: Cloud Tasks Enqueuer (`roles/cloudtasks.enqueuer`) on the identity that creates tasks, plus `iam.serviceAccounts.actAs` (for example Service Account User) for that identity on the task service account when the task carries an OIDC or OAuth token (Cloud Tasks v2 API reference, `OidcToken.serviceAccountEmail`); Service Account User (`roles/iam.serviceAccountUser`) for the Cloud Tasks service agent on the task service account; the handler role (for example Cloud Run Invoker) on the target. The handler timeout defaults to 10 minutes and is at most 30 minutes.

## Notes

- Commands marked from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed); the purge and delete commands additionally have `--location=LOCATION` added (see their Adapted lines).
- Destructive: `queues purge` irreversibly removes every task in the queue and `queues delete` removes the queue. Try them on a disposable queue first. `pause` stops dispatch until `resume`.
- Adapted from the official docs: the purge and delete examples in the gcloud reference name only the queue (`gcloud tasks queues purge my-queue`, `gcloud tasks queues delete my-queue`); without `--location` they use the location of the project's App Engine app if there is an associated app (see the command help), so they could purge or delete a same-named queue there, or fail in a project without an App Engine app. `--location=LOCATION` was added to both.
- Adapted from the official docs: the `gcloud tasks queues update`, `pause` and `resume` commands had no `--location` (for example `gcloud tasks queues pause QUEUE_ID`); `--location=LOCATION` was added so they act on the same queue as the `describe --location=LOCATION` verify step. Without it, `--location` defaults to the App Engine app's location "if there is an associated app" (https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues/update).
- Corrected from the official docs: the BufferTask example had `curl -X HTTP_METHOD\` (no space) and a trailing `\`; the `Authorization` header line comes from the source's second BufferTask example.
- Queue-level authentication overrides task-level authentication; queue-level routing overrides task-level routing. Use either a `queue.yaml` file or the Cloud Tasks API to configure queues, not both.
- Keep the Cloud Run service private (require authentication) and use a dedicated user-managed service account for the task identity. Do not grant `roles/run.invoker` at project level.
- `gcloud tasks create-http-task` is not included: its only EXAMPLES entry targets a plain `http://example.com/handler-path` URL and shows no OIDC flags. Its OIDC flags (`--oidc-service-account-email`, `--oidc-token-audience`) are in its SYNOPSIS; the audited source pages show OIDC tasks only in Python and Node.js client library code. Client library setup (not the Cloud Tasks methods) is in the `gcp-client-libraries` skill.
- Cloud Tasks and Cloud Run are Google Cloud services, distinct from Cloudflare Queues (`cloudflare-stateful`) and Vercel Functions (`vercel`). See the `gcp-foundation` skill for IAM and service accounts.
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/tasks
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues/purge (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues/delete (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/tasks/docs/creating-queues (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/tasks/docs/configuring-queues (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/tasks/docs/creating-http-target-tasks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/triggering/using-tasks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [scheduler.md](./scheduler.md)
- [services.md](./services.md)
- [app-engine.md](./app-engine.md)
