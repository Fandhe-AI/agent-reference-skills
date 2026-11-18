---
source: https://docs.cloud.google.com/build/docs/securing-builds/store-manage-build-logs
---

# Store and manage build logs

Store Cloud Build logs in user-created Cloud Logging or Cloud Storage buckets, or in a region-specific user-owned Cloud Storage bucket, to control retention and analysis. If build log storage is left undefined, Cloud Build stores logs in a Google Cloud-owned bucket with fewer analysis options. Storing logs in your own buckets incurs Cloud Storage and Cloud Logging costs (see the pricing pages).

## Signature / Usage

### User-created Cloud Logging bucket

Create a bucket with a **Retention period**, then create a sink with this inclusion filter. Optionally exclude the logs from the default Logging bucket as described in "Stop storing log entries in log buckets".

```text
logName = "projects/PROJECT_ID/logs/cloudbuild"
```

### User-created Cloud Storage bucket

Create the bucket with no retention policy, then point `logsBucket` at it.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'us-east1-docker.pkg.dev/myproject/myimage', '.' ]
logsBucket: 'gs://mylogsbucket'
options:
  logging: GCS_ONLY
```

### Region-specific user-owned Cloud Storage bucket

Cloud Build creates the bucket in the build's region, once per unique region, and reuses it while `REGIONAL_USER_OWNED_BUCKET` is active. Useful for data residency.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'us-central1-docker.pkg.dev/myproject/myrepo/myimage', '.' ]
options:
  defaultLogsBucketBehavior: REGIONAL_USER_OWNED_BUCKET
```

### View logs

```bash
gcloud builds log build-id
```

The build ID is shown at the end of `gcloud builds submit` and in the ID column of `gcloud builds list`. To see logs in GitHub / GitHub Enterprise commit checks, create the trigger with `gcloud` or the API and the `--include-logs-with-status` option.

## Options / Props

### Roles

| Task | Role | On |
|------|------|----|
| Store logs in a user-created Logging bucket | Logs Configuration Writer (`roles/logging.configWriter`) | Account or service account for the project |
| Store logs in a user-created or region-specific Cloud Storage bucket (only if bucket and build are in different projects or the build does not use the legacy service account) | Storage Admin (`roles/storage.admin`) | Service account used for the build |
| View logs in a user-created or user-owned Cloud Storage bucket | Storage Object Viewer (`roles/storage.objectViewer`) and Logs View Accessor (`roles/logging.viewAccessor`) | Principals who view logs |
| View logs in the default Cloud Storage bucket | Viewer (`roles/viewer`) | Project where the build is configured |
| View logs in Logging | Logs Viewer (`roles/logging.viewer`) | Principals who view logs |
| Send logs to GitHub / GitHub Enterprise | `roles/logging.viewer` | Service account used for the trigger |
| Delete logs or a Cloud Storage bucket | Storage Admin (`roles/storage.admin`) | User or service account deleting |
| Delete a user-created Logging bucket | Logs Configuration Writer (`roles/logging.configWriter`) | Project |

## Notes

- If the Cloud Storage bucket and Cloud Build are in the same project and you use the legacy Cloud Build service account, that account already has the needed permissions and no additional grant is required. Prefer a user-specified build service account with a scoped bucket-level role over the legacy account.
- Roles apply to the service account used for the build, as the source phrases it. `roles/storage.admin` is broad.
- You can grant project-level Owner or Editor to view logs from Cloud Build-created and user-owned buckets, but the source recommends Viewer for least privilege; if you do not want to grant basic Viewer, use user-created buckets, especially for trigger-invoked builds where principals should only invoke builds and view progress.
- Deleting logs: Cloud Storage objects are removed under the Cloud Storage "Deleting objects" docs, buckets under "Deleting buckets", and Logging buckets under "Delete a bucket"; deletion is irreversible, so try it on a disposable project or bucket first.
- A `serviceAccount` build config needs `logsBucket` or a logging option such as `CLOUD_LOGGING_ONLY`.
- Alternatively use a user-created bucket in the same region as the build to align regions.
- The source also shows JSON forms and Console steps for viewing logs.
- Source: https://docs.cloud.google.com/build/docs/securing-builds/store-manage-build-logs (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-build-results.md](./view-build-results.md)
- Build log storage options: https://docs.cloud.google.com/build/docs/securing-builds/build-log-storage
- Cloud Build audit logs: https://docs.cloud.google.com/build/docs/securing-builds/audit-logs
