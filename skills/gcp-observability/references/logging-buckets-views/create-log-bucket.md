---
source: https://docs.cloud.google.com/logging/docs/buckets
---

# Create a log bucket

User-defined Cloud Logging log buckets store and centralize log data in a Google Cloud project. You create them with the Google Cloud console, the gcloud CLI, or the Logging API. A bucket can optionally be upgraded to use Observability Analytics at creation time. This page assumes Google-managed encryption; for customer-managed encryption keys (CMEK) see "Configure CMEK for logs storage" at https://docs.cloud.google.com/logging/docs/routing/managed-encryption-storage.

## Signature / Usage

### Create a bucket with gcloud

Create a bucket and upgrade it to use Observability Analytics (`LOCATION` must be a supported bucket region):

```bash
gcloud logging buckets create BUCKET_ID --location=LOCATION --enable-analytics --async OPTIONAL_FLAGS
```

Create a plain bucket in the `global` region:

```bash
gcloud logging buckets create my-bucket --location global --description "My first bucket"
```

Create a bucket, upgrade it, and set 45-day retention:

```bash
gcloud logging buckets create my-upgraded-bucket --location global \
      --description "My first upgraded bucket" \
      --enable-analytics --retention-days=45
```

### Create a bucket with the REST API

Call `projects.locations.buckets.create` (synchronous) or `projects.locations.buckets.createAsync` (asynchronous, required when `LogBucket.analyticsEnabled` is `true`).

```text
parent: projects/PROJECT_ID/locations/LOCATION
bucketId: my-bucket
```

For example, the `parent` for project `my-project` in the `global` region is `projects/my-project/locations/global`.

## Options / Props

| Item | Value / Limit | Description |
|------|---------------|-------------|
| Buckets per project | maximum 100 | You can't create log buckets in folders or organizations. |
| Retention period | 1 to 3650 days; default `30 days` | Optional at creation; can be updated later. |
| `--location` | supported bucket region | Cannot be changed after creation. |
| `--enable-analytics` | flag | Upgrades the bucket to use Observability Analytics. |
| `--async` | flag | Returns an `Operation` object; omit it if you omit `--enable-analytics`. |
| `LogBucket.analyticsEnabled` | boolean | Set to `true` and call `createAsync` to create an upgraded bucket. |
| `bucketId` | string | Bucket name, for example `my-bucket`. |

## Notes

- After a bucket is upgraded to use Observability Analytics you can't reconfigure it to change or remove that use.
- Log buckets in the `global` region or in multi-regions don't offer added resiliency compared to log buckets created in single regions like `us-west1`.
- After you create a log bucket you can't change its region. To use a different region, create a new bucket there, redirect the appropriate sinks to the new bucket, and then delete the old bucket.
- You can't create a linked BigQuery dataset while creating a bucket unless you use the Google Cloud console; with gcloud or REST, create and upgrade the bucket, then create the link (`gcloud logging links create` / `projects.locations.buckets.links.create`).
- `createAsync` takes several minutes to complete and doesn't generate an error or fail when `analyticsEnabled` is `true`. Poll the returned operation; see [log-analytics-upgrade-and-linked-datasets.md](./log-analytics-upgrade-and-linked-datasets.md).
- Required role: Logs Configuration Writer (`roles/logging.configWriter`) on the project; billing must be enabled for the project.
- After creating a bucket, create a sink to route log entries into it, configure log views to control who can read which logs, and optionally configure custom retention and restricted fields (field-level access).
- The source also shows the Google Cloud console steps.
- Source: https://docs.cloud.google.com/logging/docs/buckets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [update-log-bucket-and-retention.md](./update-log-bucket-and-retention.md)
- [list-and-describe-log-buckets.md](./list-and-describe-log-buckets.md)
- [log-analytics-upgrade-and-linked-datasets.md](./log-analytics-upgrade-and-linked-datasets.md)
- [create-log-view.md](./create-log-view.md)
