---
source: https://docs.cloud.google.com/run/docs/triggering/using-scheduler
---

# Invoke a Private Service from Cloud Scheduler with OIDC

Call a private Cloud Run service on a cron schedule: a dedicated service account holds `roles/run.invoker` on the service and Cloud Scheduler sends an OIDC token minted for it.

## Signature / Usage

The service must already be deployed with authentication required (see the deploy samples). Enable the Cloud Scheduler API first.

### 1. Create the invoker service account

`SERVICE_ACCOUNT_NAME` must be lower case and unique within the project (for example `my-invoker-service-account-name`).

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "DISPLAYED_SERVICE_ACCOUNT_NAME"
```

### 2. Allow it to invoke the service

```bash
gcloud run services add-iam-policy-binding SERVICE \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

### 3. Create the Cloud Scheduler job

Replace `HTTP-METHOD` with the method the service expects (GET, POST, PUT, and so on), `SERVICE-URL` with the service URL, and `SERVICE-ACCOUNT-EMAIL` with `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`. `REGION` is a Cloud Scheduler location, for example the region of the service.

Adapted (not in the official docs): the source's command has blank lines between flags and no `\` line continuations, so it does not run as one command; continuations added. Also added `--location=REGION`, since gcloud otherwise falls back to the App Engine app's location and fails in a project without one.

```bash
gcloud scheduler jobs create http test-job --schedule "5 * * * *" \
       --location=REGION \
       --http-method=HTTP-METHOD \
       --uri=SERVICE-URL \
       --oidc-service-account-email=SERVICE-ACCOUNT-EMAIL \
       --oidc-token-audience=SERVICE-URL
```

### 4. Optional: restrict ingress to internal sources

`INGRESS` is one of `all`, `internal`, `internal-and-cloud-load-balancing`.

```bash
gcloud run services update SERVICE \
    --ingress INGRESS
```

## Options / Props

| Item | Detail |
|---|---|
| `--schedule` | Any crontab-compatible string, for example `0 */3 * * *` runs every 3 hours |
| `--uri` | Fully qualified service URL, for example `https://myservice-abcdef-uc.a.run.app` |
| `--oidc-token-audience` | The full URL of the service |
| Request body | Sent only with `POST` or `PUT` |

## Notes

- Keep the service private; do not allow public access. Use a dedicated user-managed service account for the invoker identity, not the default compute service account.
- The per-service binding in step 2 is sufficient; a project-level `roles/run.invoker` grant would let the principal invoke every Cloud Run service in the project.
- Corrected from the official docs: `gcloud scheduler jobs create http test-job --schedule "5 * * * *"` followed by blank-line-separated flags was rewritten with `\` continuations.
- Adapted from the official docs: `--location=REGION` was added to the job create command (the flag otherwise defaults to the location of the project's App Engine app "if there is an associated app").
- With ingress `internal`, Cloud Scheduler is allowed only when it is in the same project or perimeter and calls the default `run.app` URL (not a custom URL or domain). Disabling the default URL breaks Scheduler callers.
- Make the handler idempotent and deduplicate retried requests: https://docs.cloud.google.com/scheduler/docs/configuring/deduplicate-job-requests
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/triggering/using-scheduler (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/securing/ingress (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [tasks-http-target-oidc.md](./tasks-http-target-oidc.md)
- [service-to-service-id-token.md](./service-to-service-id-token.md)
- Retry settings: https://docs.cloud.google.com/scheduler/docs/configuring/retry-jobs
