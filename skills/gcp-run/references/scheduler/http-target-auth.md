---
source: https://docs.cloud.google.com/scheduler/docs/http-target-auth
---

# Use authentication with HTTP targets

Cloud Scheduler can call authenticated HTTP targets by minting a header token for a service account you attach to the job and sending it over HTTPS. Use an OIDC (ID) token in general; use an OAuth (access) token only for Google APIs hosted on `*.googleapis.com`.

## Signature / Usage

### Create a job with OIDC authentication

```bash
gcloud scheduler jobs create http JOB_ID \
    --location=LOCATION \
    --schedule="FREQUENCY" \
    --uri=URI \
    --oidc-service-account-email=SERVICE_ACCOUNT_EMAIL
```

Use `--oauth-service-account-email` instead of `--oidc-service-account-email` to send an OAuth token. `URI` must start with `https://`. The Console form offers an optional **Audience** for the OIDC token; the gcloud equivalent is `--oidc-token-audience=AUDIENCE` (default: the `--uri` value).

### Grant the service account permission to invoke a Cloud Run service

```bash
gcloud run services add-iam-policy-binding my-service \
    --region=REGION \
    --member=serviceAccount:my-service-account@my-project.iam.gserviceaccount.com \
    --role=roles/run.invoker
```

### Grant invoker access on a Cloud Run function

Only for a function created with `gcloud functions deploy` (Cloud Functions v2 API) or a 1st gen function. For a function deployed with `gcloud run deploy --function`, use the `gcloud run services add-iam-policy-binding … --role=roles/run.invoker` command above (see Notes).

```bash
gcloud functions add-invoker-policy-binding my-cloud-function \
    --region=REGION \
    --member=serviceAccount:my-service-account@my-project.iam.gserviceaccount.com
```

For Cloud Run functions this adds the `roles/run.invoker` binding on the underlying Cloud Run service; for Cloud Functions (1st gen) it adds `roles/cloudfunctions.invoker`.

### Generic form

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL \
    --role=ROLE
```

`RESOURCE_TYPE` e.g. `run services`; `PRINCIPAL` is `serviceAccount:SERVICE_ACCOUNT_EMAIL_ADDRESS`; `ROLE` e.g. `roles/run.invoker` (for Cloud Run functions prefer `add-invoker-policy-binding`).

## Options / Props

| Item | Rule |
|---|---|
| OIDC vs OAuth | OIDC except for `*.googleapis.com` APIs; Cloud Scheduler accepts OAuth tokens only for target URLs on `*.googleapis.com`. |
| Service account | Must belong to the project of the job. Do not use the Cloud Scheduler service agent (`service-PROJECT_NUMBER@gcp-sa-cloudscheduler.iam.gserviceaccount.com`). |
| Service agent role | Do not revoke `roles/cloudscheduler.serviceAgent` from the service agent; revoking causes `403` responses from authenticated endpoints even if the job's service account is correct. Grant it manually only if the API was enabled before March 19, 2019 or the role was removed. |
| Attaching a service account | Requires `roles/iam.serviceAccountUser` (permission `iam.serviceAccounts.actAs`) on the service account. |
| Invoker roles | Cloud Run and Cloud Run functions: `roles/run.invoker`; Cloud Functions (1st gen): `roles/cloudfunctions.invoker`. |
| Audience | If unspecified, the whole URL including request parameters is used. When the function takes URL parameters (for example `my_function?key=value`), the audience (`aud`) must not contain them. With gcloud, set it with `--oidc-token-audience=AUDIENCE` on `create http` / `update http` (for example the URI without the query string). |
| API key header | Use `x-api-key` (API Gateway, Endpoints) or `X-Goog-Api-Key` (Google Cloud REST APIs); `api_key` can cause authentication failures. |
| Non-Google targets | The receiving service must verify the token manually. |

## Notes

- Best practice: for production create a dedicated service account with minimum permissions and bind its invoker role on the target only (least privilege), rather than reusing a broad or default service account.
- The Cloud Scheduler service agent is set up automatically when you enable the API (unless enabled before March 19, 2019); to grant the role manually use the service agent address `service-PROJECT_NUMBER@gcp-sa-cloudscheduler.iam.gserviceaccount.com` (replace `PROJECT_NUMBER` with the project number, not the project ID). Select **Include Google-provided role grants** in the Console to view it.
- Service agent roles must not be granted to anything except service agents. See the `gcp-foundation` skill for IAM and service account basics.
- `gcloud functions add-invoker-policy-binding` works only for functions created with `gcloud functions deploy` (Cloud Functions v2 API) or for 1st gen functions. The official deploy page says: "If you created a Cloud Run function using `gcloud run` commands or the Cloud Run Admin API, you can't manage that function with `gcloud functions` commands or the Cloud Functions v2 API." For a function deployed with `gcloud run deploy --function`, use `gcloud run services add-iam-policy-binding … --role=roles/run.invoker` (above); the generic-form recommendation of `add-invoker-policy-binding` for Cloud Run functions targets applies to the other case.
- Source inconsistency: this page presents `gcloud functions add-invoker-policy-binding` for "the Cloud Run function `my-cloud-function`" and recommends it for Cloud Run functions targets, while https://docs.cloud.google.com/functions/docs/deploy says a Cloud Run function created with `gcloud run` commands can't be managed with `gcloud functions` commands.
- The source also shows Console steps and a Terraform pointer; not reproduced.
- Source: https://docs.cloud.google.com/scheduler/docs/http-target-auth (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/docs/deploy (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating.md](./creating.md)
- [access-control.md](./access-control.md)
- [troubleshooting.md](./troubleshooting.md)
- [jobs-on-schedule.md](./jobs-on-schedule.md)
