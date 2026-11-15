---
source: https://docs.cloud.google.com/functions/1stgendocs/migrating/upgrade-gen1-functions
---

# Upgrade 1st Gen Functions to Cloud Run Functions

Upgrade a 1st gen HTTP or Pub/Sub function to a Cloud Run function with `gcloud functions upgrade`: set up a 2nd gen copy, redirect traffic, then commit or roll back.

## Signature / Usage

`FUNCTION_NAME`, `FUNCTION` and `YOUR_SERVICE_NAME` are the same function; `REGION`, `REGION_NAME` and `YOUR_REGION` are its region. Each block keeps the placeholder of its source.

Only 1st gen HTTP and Pub/Sub-triggered (`google.pubsub.topic.publish`) functions in an `ACTIVE` state can be upgraded. Rehearse on a non-production function first.

### 1. Enable the Cloud Run API

```bash
gcloud services enable run.googleapis.com
```

### 2. Create the 2nd gen copy (setup)

This creates a temporary 2nd gen copy that serves no traffic yet.

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions upgrade FUNCTION_NAME --setup-config --region=REGION
```

To override parameters before the commit:

```bash
gcloud functions upgrade FUNCTION \
  --region=REGION \
  --setup-config \
  --runtime=RUNTIME \
  --max-instances=MAX_INSTANCES
```

For a Pub/Sub function, to use your own trigger service account:

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions upgrade FUNCTION_NAME --setup-config --trigger-service-account=CUSTOM_SA_EMAIL --region=REGION
```

### 3. Redirect traffic to the copy

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions upgrade FUNCTION_NAME --redirect-traffic --region=REGION
```

### 4. Verify the state

Adapted (not in the official docs): `--region=REGION` was appended; the command needs a region from the `--region` flag or the `run/region` property, and without either it fails or prompts.

```bash
gcloud run services describe FUNCTION_NAME --format yaml --region=REGION
```

```bash
gcloud functions describe --region REGION_NAME FUNCTION_NAME
```

The function environment shows `1st gen` before the redirect and `2nd gen` after it. Get the service URL:

```bash
gcloud run services describe YOUR_SERVICE_NAME \
    --region YOUR_REGION \
    --format="value(status.url)"
```

### 5. Check that IAM policies converted

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions get-iam-policy FUNCTION_NAME --region=REGION
```

Adapted (not in the official docs): `--region=REGION` was appended; the command needs a region from the `--region` flag or the `run/region` property, and without either it fails or prompts.

```bash
gcloud run services get-iam-policy FUNCTION_NAME --region=REGION
```

### 6a. Roll back (before the commit)

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions upgrade FUNCTION_NAME --rollback-traffic --region=REGION
```

### 6b. Abort (any time before the commit)

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions upgrade FUNCTION_NAME --abort --region=REGION
```

### 7. Commit (irreversible)

Warning: the commit deletes the 1st gen function and cannot be undone. Rehearse the whole sequence on a disposable function first.

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions upgrade FUNCTION_NAME --commit --region=REGION
```

Optionally keep the function manageable through the Cloud Functions v2 API as well:

Adapted (not in the official docs): `--region=REGION` was appended; the command's region is part of its resource argument (or comes from the `functions/region` property, which defaults to `us-central1`), so without it the command acts on a same-named function in `us-central1`.

```bash
gcloud functions upgrade FUNCTION_NAME --commit --skip-detach --region=REGION
```

## Options / Props

| Role | Where | Purpose |
|---|---|---|
| `roles/iam.serviceAccountUser` | On the function's service account | Upgrade |
| `roles/cloudfunctions.admin` (or equivalent) | Project | Perform the upgrade (includes `cloudfunctions.functions.generationUpgrade`) |
| `roles/pubsub.admin` | Project | Commit a Pub/Sub function upgrade (broad access to all Pub/Sub resources in the project) |
| `roles/run.invoker` | Pub/Sub trigger service account | Prompted if it lacks `run.routes.invoke` |

| 1st gen role | Converted to |
|---|---|
| `roles/cloudfunctions.invoker` | `roles/run.invoker` |
| `roles/cloudfunctions.developer` | `roles/run.sourceDeveloper` |
| `roles/cloudfunctions.viewer` | `roles/run.sourceViewer` |
| `roles/cloudfunctions.admin` | `roles/run.admin` and `roles/run.sourceDeveloper` |

Limitations: projects with a domain-scoped ID (contains a colon) cannot be upgraded; a function on a decommissioned runtime must be redeployed on a supported runtime first; the function name must not collide with an existing Cloud Run service name in the project.

## Notes

- Adapted from the official docs: the source's `gcloud functions upgrade FUNCTION_NAME --setup-config` (and the `--trigger-service-account`, `--redirect-traffic`, `--rollback-traffic`, `--abort`, `--commit`, `--commit --skip-detach` forms), `gcloud functions get-iam-policy FUNCTION_NAME`, `gcloud run services describe FUNCTION_NAME --format yaml` and `gcloud run services get-iam-policy FUNCTION_NAME` have no region; `--region=REGION` (listed in each command's help) was appended. Setting the `functions/region` and `run/region` properties instead also works.
- Do not delete the function source from Cloud Storage or the container from Artifact Registry once the upgrade starts. Without pinned dependencies the 2nd gen copy may pull newer dependency versions.
- Pub/Sub risks: duplicate messages (a new subscription is created before the old one is deleted) and lost messages if the new function fails after the redirect, especially with retry disabled. Retry disabled is unsupported on Cloud Run, so the tool creates an Eventarc Pub/Sub trigger plus a dead letter queue topic.
- If a commit fails in a rollback-safe state (`COMMIT_FUNCTION_UPGRADE_ERROR_ROLLBACK_SAFE`), retry `--commit`, `--rollback-traffic`, or `--abort`. Redirect and commit fail without a prior `--setup-config`; rollback fails without a prior redirect.
- The `roles/cloudfunctions.admin` and `roles/pubsub.admin` grants are broad; prefer the narrowest role that works and use a dedicated user-managed service account for the trigger.
- Upgrading gives request concurrency, longer timeouts and updated runtimes.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- Corrected from the official docs: the source says the system prompts to bind `roles/run.invoker` if the trigger service account "lacks the `run.route.invoke` permission"; that permission does not exist, and `roles/run.invoker` contains `run.routes.invoke` (https://docs.cloud.google.com/iam/docs/roles-permissions/run).
- Source: https://docs.cloud.google.com/functions/1stgendocs/migrating/upgrade-gen1-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/migrate/from-gen1-functions-to-cloud-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [function-http-and-event.md](./function-http-and-event.md)
- [migrate-app-engine-standard.md](./migrate-app-engine-standard.md)
- Runtime support: https://docs.cloud.google.com/functions/docs/runtime-support
