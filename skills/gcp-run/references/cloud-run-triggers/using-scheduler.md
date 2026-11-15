---
source: https://docs.cloud.google.com/run/docs/triggering/using-scheduler
---

# Run services on a schedule

Use Cloud Scheduler to securely trigger a Cloud Run service on a schedule (similar to cron) in the same Google Cloud project. Deploy the service with authentication required and give Cloud Scheduler a service account with `roles/run.invoker` on that service.

## Signature / Usage

### Create the Scheduler service account

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "DISPLAYED_SERVICE_ACCOUNT_NAME"
```

`SERVICE_ACCOUNT_NAME` must be lower case and unique within the project (for example `my-invoker-service-account-name`).

### Allow it to invoke the service

```bash
gcloud run services add-iam-policy-binding SERVICE \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

### Create the Cloud Scheduler job

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

## Options / Props

| Item | Detail |
|---|---|
| API to enable | Cloud Scheduler API |
| Deployment | Select "Require authentication"; don't allow public access |
| HTTP method | Must match what the service expects (Console default `POST`) |
| `--schedule` | Any crontab-compatible string, for example `0 */3 * * *` runs every 3 hours |
| `--uri` | Fully qualified service URL, for example `https://myservice-abcdef-uc.a.run.app` |
| `--oidc-service-account-email` | The invoker service account created above |
| `--oidc-token-audience` | The full URL of your service (the source's Console step and command both use the full service URL) |
| Request body | Sent only with `POST` or `PUT` |

## Notes

- The service must be deployed with authentication required; do not allow public access. Scheduler authenticates with an OIDC token minted for the invoker service account.
- The source's Console step also shows a project-level grant (`gcloud projects add-iam-policy-binding RESOURCE_ID --member=PRINCIPAL --role=roles/run.invoker`). It is omitted here because it would allow the principal to invoke every Cloud Run service in the project; the per-service binding above is sufficient.
- Corrected from the official docs: `gcloud scheduler jobs create http test-job --schedule "5 * * * *"` followed by blank-line-separated flags was rewritten with `\` continuations (see the Adapted line above).
- Adapted from the official docs: `--location=REGION` was added to the job create command. Without it, `--location` defaults to the location of the current project's App Engine app "if there is an associated app" (https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/create/http); Cloud Scheduler HTTP targets do not need an App Engine app. Replace `REGION` with a Cloud Scheduler location, for example the region of the service.
- Make the handler idempotent and deduplicate retried requests: https://docs.cloud.google.com/scheduler/docs/configuring/deduplicate-job-requests
- Monitor runs through the service logs. Use a dedicated user-managed service account for the invoker identity.
- The source also shows Console and Terraform forms (not reproduced).
- Source: https://docs.cloud.google.com/run/docs/triggering/using-scheduler (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Distance: Cloud Scheduler and Cloud Run are Google Cloud services, distinct from Cloudflare Workers cron triggers (`cloudflare-workers`) and Vercel Functions (`vercel`).

## Related

- [using-tasks.md](./using-tasks.md)
- [pubsub-triggers.md](./pubsub-triggers.md)
