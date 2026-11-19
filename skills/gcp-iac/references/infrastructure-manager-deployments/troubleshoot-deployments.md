---
source: https://docs.cloud.google.com/infrastructure-manager/docs/troubleshoot-deployments
---

# Troubleshoot deployment errors

Inspect the state of a deployment or revision, read Terraform errors from `tfErrors` and `errorLogs`, and apply fixes for common failures such as missing permissions, a bad configuration location, a backend block, or an inaccessible Cloud Build repository.

## Signature / Usage

### Verify access to a Cloud Build repository

Infra Manager uses the first connection whose Cloud Build repository URL matches `--git-source-repo` and for which it can generate a read-only token (validated by calling `accessReadToken` on the repository). Run this using the Infra Manager service account to check permissions:

```bash
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token \
--impersonate-service-account=SERVICE_ACCOUNT)" \
"https://cloudbuild.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/connections/CB_CONNECTION/repositories/CB_REPO:accessReadToken"
```

### Error messages

```text
error downloading 'GCS_LOCATION': googleapi: Error 403: SA_EMAIL does
not have storage.objects.list access to the Google Cloud Storage bucket.
```

```text
blueprint fetch failed: invalid path
```

```text
blueprint invalid: found backend config in file.tf
```

## Options / Props

| Symptom | Cause | Fix |
|---|---|---|
| Deployment state `FAILED` | Unexpected error | View deployment state; read `stateDetail` and `errorCode` |
| Error code `REVISION_FAILED` | A revision failed | View revision state; read `stateDetail` and `errorCode` (also includes the build ID) |
| `tfErrors` / `errorLogs` present | Configuration errors (invalid configuration, missing permissions) | `tfErrors` summarizes Terraform errors, limited to 10; `errorLogs` points to a Cloud Storage object in the artifacts bucket with all `tfErrors` as newline delimited JSON |
| 403 for Cloud Storage configuration | Service account lacks permission to read the configuration | Grant the `storage.objectViewer` role to the service account |
| `blueprint fetch failed: invalid path` | Invalid location to fetch the configuration | Verify the location and its format in your command |
| `tfErrors` with response code `403` | Service account lacks permissions to create, read, update or delete configured resources | Grant the service account IAM permissions |
| `blueprint invalid: found backend config in file.tf` | Configuration has a backend block; Infra Manager manages the backend | Remove the backend block |

### `tfError` fields

| Field | Meaning |
|---|---|
| resource address | Address of the failed resource |
| `errorDescription` | Human readable description |
| `httpResponseCode` | Populated when a Google Cloud API returned an HTTP error |
| `error` | Additional API failure information |

## Notes

- Get the Cloud Build build ID from the revision state and inspect logs as described in Cloud Build "View build results" (https://docs.cloud.google.com/build/docs/view-build-results); Cloud Build is in `gcp-devops`.
- The `curl` call impersonates the service account; per the gcloud help for `--impersonate-service-account`, your account needs `iam.serviceAccounts.getAccessToken` on it (included in `roles/iam.serviceAccountTokenCreator`).
- The command puts an access token in a `curl` argument (visible in the process list and shell history), and the API generates a read-only repository token; run it only in a trusted shell and do not share the output.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/troubleshoot-deployments (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-deployments.md](./view-deployments.md)
- [configure-service-account.md](./configure-service-account.md)
- [deploy-resources.md](./deploy-resources.md)
