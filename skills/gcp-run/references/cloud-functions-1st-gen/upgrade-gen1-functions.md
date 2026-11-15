---
source: https://docs.cloud.google.com/functions/1stgendocs/migrating/upgrade-gen1-functions
---

# Upgrade 1st gen functions to Cloud Run functions

Upgrade 1st gen HTTP and Pub/Sub functions to Cloud Run functions running exclusively as a Cloud Run service managed through the Cloud Run API, with `gcloud functions upgrade`. Benefits include request concurrency, longer timeouts and updated runtimes; deploying through the Cloud Run Admin API replaces the legacy Cloud Functions v1 API. Review the differences first (comparison in the `cloud-run-functions` category).

## Signature / Usage

Enable the Cloud Run API:

```sh
gcloud services enable run.googleapis.com
```

### Upgrade lifecycle (HTTP and Pub/Sub)

`--setup-config` creates a temporary 2nd gen copy; `--redirect-traffic` sends traffic to it; `--rollback-traffic` reverts; `--commit` finalizes (irreversible); `--abort` cancels any time before commit.

Create the 2nd gen copy:

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```sh
gcloud functions upgrade FUNCTION_NAME --setup-config --region=REGION
```

Redirect traffic to the copy:

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```sh
gcloud functions upgrade FUNCTION_NAME --redirect-traffic --region=REGION
```

Roll traffic back to the 1st gen function:

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```sh
gcloud functions upgrade FUNCTION_NAME --rollback-traffic --region=REGION
```

> **Warning**: `--commit` is irreversible and deletes the 1st gen function. Rehearse on a disposable function first.

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```sh
gcloud functions upgrade FUNCTION_NAME --commit --region=REGION
```

Abort the upgrade (any time before commit):

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```sh
gcloud functions upgrade FUNCTION_NAME --abort --region=REGION
```

### Override parameters before commit

```sh
gcloud functions upgrade FUNCTION \
  --region=REGION \
  --setup-config \
  --runtime=RUNTIME \
  --max-instances=MAX_INSTANCES
```

### Skip detach

> **Warning**: `--commit` is irreversible and deletes the 1st gen function, also with `--skip-detach`.

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```sh
gcloud functions upgrade FUNCTION_NAME --commit --skip-detach --region=REGION
```

### Pub/Sub trigger service account

Adapted (not in the official docs): added `--region=REGION`; without it gcloud uses the `functions/region` property (default `us-central1`).

```sh
gcloud functions upgrade FUNCTION_NAME --setup-config --trigger-service-account=CUSTOM_SA_EMAIL --region=REGION
```

### Verify state

Adapted (not in the official docs): added `--region=REGION`; without it gcloud needs the `run/region` property.

```sh
gcloud run services describe FUNCTION_NAME --format yaml --region=REGION
```

```sh
gcloud functions describe --region REGION_NAME FUNCTION_NAME
```

The function environment shows `1st gen` before redirect and `2nd gen` after; after commit, `gcloud functions describe` no longer finds the 1st gen function and the Cloud Run service shows a new generation with an empty `Goog-managed-by` label. Get the service URL:

```bash
gcloud run services describe YOUR_SERVICE_NAME \
    --region YOUR_REGION \
    --format="value(status.url)"
```

### Check IAM policy conversion

Adapted (not in the official docs): added `--region=REGION` to both commands; without it `functions get-iam-policy` uses the `functions/region` property (default `us-central1`) and `run services get-iam-policy` needs the `run/region` property.

```sh
gcloud functions get-iam-policy FUNCTION_NAME --region=REGION
gcloud run services get-iam-policy FUNCTION_NAME --region=REGION
```

Adapted (not in the official docs): added `--region=REGION` to `gcloud run services get-iam-policy`; without it gcloud needs the `run/region` property.

```sh
gcloud projects get-iam-policy PROJECT_ID | grep "roles/cloudfunctions.invoker"
gcloud run services get-iam-policy FUNCTION_NAME --region=REGION
```

## Options / Props

### Limitations

- Only 1st gen HTTP and Pub/Sub-triggered (`google.pubsub.topic.publish`) functions in an `ACTIVE` state can be upgraded.
- Projects with a domain-scoped ID (contains a colon) cannot be upgraded.
- A function on a decommissioned runtime must be redeployed on a supported runtime first.
- The function name must not collide with an existing Cloud Run service name in the project.

### Required roles

| Role / permission | Where | Purpose |
| --- | --- | --- |
| `roles/iam.serviceAccountUser` | On the function's service account | Upgrade |
| `roles/cloudfunctions.admin` (or equivalent) | Project | Perform the upgrade; includes `cloudfunctions.functions.generationUpgrade` |
| `roles/serviceusage.consumer` or custom role with `pubsub.topic.setIAMPermissions` | Pub/Sub function with `no-retry` | Set topic IAM |
| `roles/pubsub.admin` | Project | Commit a Pub/Sub function upgrade (grants administrative access to all Pub/Sub resources in the project) |
| `roles/run.invoker` | Pub/Sub trigger service account | Prompted if it lacks `run.route.invoke` |
| `projects.getIamPolicy`, `run.setIamPolicy` | Caller | IAM policy upgrade |

### IAM role conversion

| 1st gen role | Converted to |
| --- | --- |
| `roles/cloudfunctions.invoker` | `roles/run.invoker` |
| `roles/cloudfunctions.developer` | `roles/run.sourceDeveloper` |
| `roles/cloudfunctions.viewer` | `roles/run.sourceViewer` |
| `roles/cloudfunctions.admin` | `roles/run.admin` and `roles/run.sourceDeveloper` |

### State per step (HTTP function)

| Step | 1st gen function | 2nd gen copy |
| --- | --- | --- |
| Start | Serves traffic from `cloudfunctions.net`; visible in 1st gen console | Has `cloudfunctions.net` and `run.app` URLs, serves no traffic; visible in Cloud Run console |
| Redirect | No traffic; hidden in 1st gen console but still exists | Serves `cloudfunctions.net` and `run.app` |
| Rollback | Serves traffic | No traffic; hidden in Cloud Run console but exists |
| Abort | Serves traffic | Deleted |
| Commit | Deleted | Becomes a Cloud Run Admin API function (detached); keeps `cloudfunctions.net` URL plus `run.app` |

## Notes

- Source inconsistency: the Pub/Sub `no-retry` row is kept verbatim from a visibly truncated source sentence ("`roles/serviceusage.consumer` role or a custom role with the ... and `pubsub.topic.setIAMPermissions` role"); the role ID used elsewhere in the docs is `roles/serviceusage.serviceUsageConsumer`, and the Pub/Sub topic IAM permission is `pubsub.topics.setIamPolicy`.
- Do not delete the function source from Cloud Storage or the container from Artifact Registry once the upgrade starts. Without pinned dependencies the 2nd gen copy may pull newer dependency versions.
- Commit is irreversible and deletes the 1st gen function; it is equivalent to `detach` unless `--skip-detach` is used (then the function stays manageable with the Cloud Functions v2 API as well). Try the process on non-production functions first. If a commit fails in a rollback-safe state (`COMMIT_FUNCTION_UPGRADE_ERROR_ROLLBACK_SAFE`), retry `--commit`, `--rollback-traffic`, or `--abort`.
- Pub/Sub risks: duplicate messages (a new subscription is created before the old one is deleted) and lost messages if the new function fails after redirect, especially with retry disabled. Retry disabled is unsupported on Cloud Run, so the tool creates an Eventarc Pub/Sub trigger plus a dead letter queue (DLQ) whose topic stores undelivered messages; retry enabled yields an Eventarc trigger with default settings. CMEK for the DLQ topic can be updated after migration.
- Start fails when: a function with the same name exists in the region and project, the runtime is decommissioned, the caller lacks `cloudfunctions.functions.generationUpgrade`; for Pub/Sub also when upgrading a 2nd gen function, an upgrade is already in progress, the function does not exist or is in an error state, or it is neither HTTP nor Pub/Sub. Redirect and commit fail without a prior `--setup-config` / redirect; rollback fails without a prior redirect.
- Console flow: Functions (1st gen) page, Upgrade status Ready to upgrade, Upgrade; then the Cloud Run console Upgrade in progress panel (Test function, Redirect traffic, Rollback traffic, Commit upgrade); Abort is only offered right after the initial upgrade. `gcloud functions upgrade FUNCTION_NAME --abort --region=REGION` works even for console-started upgrades.
- Before you begin the source also asks for `roles/cloudfunctions.admin` on the function's service account via `gcloud functions add-iam-policy-binding FUNCTION_NAME --region=REGION --member=serviceAccount:SERVICE_ACCOUNT --role="roles/cloudfunctions.admin"` (not reproduced); that grant is broad, so prefer the narrowest role that works. The `--max-instances` setting must not exceed Cloud Run quota.
- Adapted from the official docs: the source's `gcloud functions upgrade FUNCTION_NAME --setup-config` (and the `--redirect-traffic`, `--rollback-traffic`, `--commit`, `--abort`, `--commit --skip-detach` and `--setup-config --trigger-service-account=CUSTOM_SA_EMAIL` forms), `gcloud functions get-iam-policy FUNCTION_NAME`, `gcloud run services describe FUNCTION_NAME --format yaml` and `gcloud run services get-iam-policy FUNCTION_NAME` have no region. `--region=REGION` (in each command's SYNOPSIS) was added: `gcloud functions` commands otherwise use the `functions/region` property (default `us-central1`), so a function in another region is not found and the irreversible `--commit` could act on a same-named function in `us-central1`; `gcloud run services` commands otherwise need the `run/region` property. Setting the `functions/region` and `run/region` properties instead also works.
- Destructive / irreversible: `--commit` deletes the 1st gen function and cannot be undone; do a rehearsal on a disposable function.
- Merged short page https://docs.cloud.google.com/run/docs/migrate/from-gen1-functions-to-cloud-run: transitioning 1st gen functions to Cloud Run functions gives request concurrency, longer processing timeouts and updated language runtimes; review the differences, then follow this upgrade guide.
- Source: https://docs.cloud.google.com/functions/1stgendocs/migrating/upgrade-gen1-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/migrate/from-gen1-functions-to-cloud-run

## Related

- [deploy-1st-gen.md](./deploy-1st-gen.md)
- [runtime-support.md](./runtime-support.md)
- [concepts-overview.md](./concepts-overview.md)
