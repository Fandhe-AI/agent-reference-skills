---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions
---

# Cloud Run Functions and Cloud Functions 1st Gen

Copy-paste gcloud commands for Cloud Run functions (deployed with `gcloud run deploy --function`), their management as Cloud Run services, local testing with the Functions Framework, and the legacy 1st gen commands including the upgrade to Cloud Run functions.

## Signature / Usage

### Enable the APIs

```bash
gcloud services enable artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    logging.googleapis.com
```

Optionally, enable the Eventarc API to use event triggers:

```bash
gcloud services enable eventarc.googleapis.com
```

### Deploy a function (Cloud Run functions)

The Cloud Build service account needs Cloud Run Builder (`roles/run.builder`); see the grant command in [services.md](./services.md). Run in the directory that contains the function source:

```bash
gcloud run deploy FUNCTION \
       --source . \
       --function FUNCTION_ENTRYPOINT \
       --base-image BASE_IMAGE \
       --region REGION
```

`FUNCTION_ENTRYPOINT` is the function name or fully-qualified class name in the source. `BASE_IMAGE` examples from the source: `nodejs24`, `python314`, `go127`, `java25`, `dotnet10`, `ruby40`, `php85`.

Store the image in your own Artifact Registry repository (`IMAGE_URL` example: `REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/FUNCTION`):

```bash
gcloud run deploy FUNCTION \
  --source . \
  --function FUNCTION_ENTRYPOINT \
  --base-image BASE_IMAGE \
  --region REGION \
  --image IMAGE_URL
```

### Add an Eventarc trigger

```bash
gcloud eventarc triggers create EVENTARC_TRIGGER_NAME \
    --location=EVENTARC_TRIGGER_LOCATION \
    --destination-run-service=FUNCTION \
    --destination-run-region=REGION \
    --event-filters="type=EVENTARC_FILTER_TYPE" \
    --event-filters="EVENTARC_EVENT_FILTER" \
    --service-account=EVENTARC_TRIGGER_SERVICE_ACCOUNT
```

### Update, describe, read logs and delete (a function is a Cloud Run service)

Add the flags to change; re-deploy code with the `gcloud run deploy FUNCTION --source . ...` command above.

```bash
gcloud run services update SERVICE
```

```bash
gcloud run services list
```

```bash
gcloud run services describe SERVICE --region REGION --format yaml
```

```bash
gcloud run services logs read SERVICE --limit=10 --project PROJECT-ID
```

> **Warning**: Deleting the service is permanent and removes all revisions; a deleted function stops accepting requests. Try it on a disposable function first.

```bash
gcloud run services delete SERVICE --region REGION
```

### Call a function for testing (from the gcloud reference)

`gcloud functions` commands apply only to functions created with `gcloud functions deploy` (the Cloud Functions v2 API) or to 1st gen functions, not to a function deployed with `gcloud run deploy --function` above (see Notes). Give the function `Hello World!` in the `message` field of its event argument:

```bash
gcloud functions call helloWorld \
  --data='{"message": "Hello World!"}'
```

### Allow a service account to call a function

For a function deployed with `gcloud run deploy --function`, grant Cloud Run Invoker on its Cloud Run service (`my-service` is the function's service name):

```bash
gcloud run services add-iam-policy-binding my-service \
    --region=REGION \
    --member=serviceAccount:my-service-account@my-project.iam.gserviceaccount.com \
    --role=roles/run.invoker
```

For a function created with `gcloud functions deploy` (Cloud Functions v2 API) or a 1st gen function:

```bash
gcloud functions add-invoker-policy-binding my-cloud-function \
    --region=REGION \
    --member=serviceAccount:my-service-account@my-project.iam.gserviceaccount.com
```

For Cloud Run functions this adds the `roles/run.invoker` binding on the underlying Cloud Run service; for Cloud Functions (1st gen) it adds `roles/cloudfunctions.invoker`.

### Test locally with the Functions Framework

```bash
npm install --save-dev @google-cloud/functions-framework
```

```bash
pip3 install functions-framework
```

```bash
functions-framework --target=YOUR_FUNCTION_NAME
```

By default the function is served at `localhost:8080`; call it from the same system it runs on:

```bash
curl localhost:8080
```

### Deploy with `gcloud functions` (backward compatibility)

Set all future first-time deployments to Cloud Run functions (2nd gen):

```bash
gcloud config set functions/gen2 true
```

### Deploy a 1st gen function

Use `--no-gen2`. Check the 1st gen runtime support table before reusing other runtimes (for example `nodejs20` and older are decommissioned).

```bash
gcloud functions deploy my-http-function \
  --no-gen2 \
  --region=us-central1 \
  --runtime=nodejs22 \
  --source=. \
  --entry-point=myHttpFunction \
  --trigger-http
```

```bash
gcloud functions deploy my-pubsub-function \
  --no-gen2 \
  --region=europe-west1 \
  --runtime=python312 \
  --source=gs://my-bucket/my_function_source.zip \
  --entry-point=pubsub_handler \
  --trigger-topic=my-topic
```

```bash
gcloud functions deploy my-storage-function \
  --no-gen2 \
  --region=asia-northeast1 \
  --runtime=java17 \
  --source=./functions/storage-function \
  --entry-point=myproject.StorageFunction \
  --trigger-resource=gs://my-bucket \
  --trigger-event=google.storage.object.delete
```

### Upgrade a 1st gen function to Cloud Run functions

Only HTTP and Pub/Sub-triggered 1st gen functions in an `ACTIVE` state can be upgraded. Enable the Cloud Run API first (the `gcloud services enable run.googleapis.com` command above covers it). Create a temporary 2nd gen copy:

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```bash
gcloud functions upgrade FUNCTION_NAME --region=REGION --setup-config
```

Send traffic to the copy:

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```bash
gcloud functions upgrade FUNCTION_NAME --region=REGION --redirect-traffic
```

Revert traffic to the 1st gen function:

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```bash
gcloud functions upgrade FUNCTION_NAME --region=REGION --rollback-traffic
```

Cancel the upgrade at any time before commit:

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```bash
gcloud functions upgrade FUNCTION_NAME --region=REGION --abort
```

> **Warning**: `--commit` is irreversible and deletes the 1st gen function. Rehearse on a disposable function first.

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```bash
gcloud functions upgrade FUNCTION_NAME --region=REGION --commit
```

Override parameters before commit:

```bash
gcloud functions upgrade FUNCTION \
  --region=REGION \
  --setup-config \
  --runtime=RUNTIME \
  --max-instances=MAX_INSTANCES
```

Verify the state:

```bash
gcloud run services describe FUNCTION_NAME --format yaml
```

```bash
gcloud functions describe --region REGION_NAME FUNCTION_NAME
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--source` | `run deploy` | Source directory (`.`), or a gzipped `.tar.gz` archive in Cloud Storage |
| `--function` | `run deploy` | Function entry point to run |
| `--base-image` | `run deploy` | Runtime base image, for example `nodejs24` or `python314` |
| `--no-gen2` / `--gen2` | `functions deploy` | Deploy to 1st gen / to Cloud Run functions |
| `--runtime` / `--entry-point` / `--source` | `functions deploy` | Runtime ID, entry point, source location |
| `--trigger-http` / `--trigger-topic` / `--trigger-bucket` / `--trigger-event` | `functions deploy` | Trigger of a 1st gen function |
| `--data` / `--cloud-event` | `functions call` | Event argument as JSON (one of the two) |
| `--setup-config` / `--redirect-traffic` / `--rollback-traffic` / `--commit` / `--abort` | `functions upgrade` | Upgrade lifecycle steps |

Deployer roles on the project: Cloud Run Source Developer (`roles/run.sourceDeveloper`) and Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`); Service Account User (`roles/iam.serviceAccountUser`) on the service identity. `gcloud functions deploy` needs `roles/cloudfunctions.developer` or equivalent.

## Notes

- Commands marked from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- `gcloud functions call` has a limited quota that cannot be increased; it is intended for testing and debugging, not production. Calls to HTTP-triggered functions are sent as HTTP POST requests; use cURL or wget for other methods. Depending on your shell you might need to escape the `--data` value differently.
- The gcloud reference pages for `functions describe`, `list`, `logs read` and `delete` have no EXAMPLES section, so they are not repeated; their flags are in each command's SYNOPSIS (for example `--gen2` / `--region` on `functions logs read`, `--v2` on `functions describe` and `functions list`). Cloud Run functions are managed with the `gcloud run services` commands above.
- Destructive or irreversible commands on this page: `run services delete` and `functions upgrade --commit`. Try them on a disposable function first.
- `gcloud functions call` and `gcloud functions add-invoker-policy-binding` work only for functions created with `gcloud functions deploy` (Cloud Functions v2 API) or for 1st gen functions. The official deploy page says: "If you created a Cloud Run function using `gcloud run` commands or the Cloud Run Admin API, you can't manage that function with `gcloud functions` commands or the Cloud Functions v2 API." For a function deployed with `gcloud run deploy --function`, use `gcloud run services add-iam-policy-binding … --role=roles/run.invoker` (above and in [services.md](./services.md)).
- Source inconsistency: https://docs.cloud.google.com/scheduler/docs/http-target-auth presents `gcloud functions add-invoker-policy-binding` for "the Cloud Run function `my-cloud-function`", while https://docs.cloud.google.com/functions/docs/deploy says a Cloud Run function created with `gcloud run` commands can't be managed with `gcloud functions` commands.
- Adapted from the official docs: the five `gcloud functions upgrade FUNCTION_NAME --setup-config` / `--redirect-traffic` / `--rollback-traffic` / `--abort` / `--commit` steps had no `--region`; `--region=REGION` was added because the command otherwise uses the `functions/region` property (default `us-central1`), so a function in another region is not found and the irreversible `--commit` could act on a same-named function in `us-central1`.
- The source's quickstart also deploys with `--allow-unauthenticated`, which assigns the Cloud Run Invoker role to `allUsers`. It makes the function publicly accessible; use only for intentionally public content such as a webhook. The flag is not used in the fences above; omit it for event-triggered or authenticated functions.
- The default compute service account is used for builds and Eventarc triggers unless overridden; prefer dedicated user-managed service accounts (`gcp-foundation`): for builds, pass `--build-service-account=BUILD_SERVICE_ACCOUNT` to `gcloud run deploy --source` (the flag applies only to source deploy builds) and grant `roles/run.builder` to that account; for Eventarc triggers, pass `--service-account` to `gcloud eventarc triggers create`.
- The local Functions Framework server has no authentication, and calling it through `localhost` does not limit who can reach it: the Node.js and Python frameworks listen on all network interfaces by default (Node.js calls `server.listen(options.port)` with no host; Python's `--host` / `HOST` option defaults to `0.0.0.0`). Block the port with a host firewall on shared or untrusted networks. The local development page says the interface "is only accessible from the machine or VM your function is running on"; the framework sources (Source lines below) do not bear that out.
- Pub/Sub upgrades can duplicate or lose messages; read the full upgrade guide before upgrading a Pub/Sub function.
- The 1st gen functions line is legacy; new functions should use Cloud Run functions. Client libraries for calling functions belong to the `gcp-client-libraries` skill (planned).
- Cloud Run functions are Google Cloud's serverless functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/functions
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/call (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploy-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/services (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/logging (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/local-dev-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/v5.0.5/src/main.ts (Node.js bind behavior; retrieved 2026-11-15)
- Source: https://github.com/GoogleCloudPlatform/functions-framework-python/blob/v3.10.2/src/functions_framework/_cli.py (Python bind behavior; retrieved 2026-11-15)
- Source: https://docs.cloud.google.com/scheduler/docs/http-target-auth (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/docs/deploy (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/1stgendocs/deploy (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/1stgendocs/migrating/upgrade-gen1-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [services.md](./services.md)
- [scheduler.md](./scheduler.md)
