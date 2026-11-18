---
source: https://docs.cloud.google.com/logging/docs/buckets
---

# Upgrade a bucket for Observability Analytics and create linked BigQuery datasets

Upgrading a log bucket lets you analyze its logs with SQL in Observability Analytics. A link connects an upgraded bucket to a read-only linked BigQuery dataset. Both operations are asynchronous.

## Signature / Usage

### Upgrade an existing bucket

```bash
gcloud logging buckets update BUCKET_ID --location=LOCATION --enable-analytics --async
```

REST: call `projects.locations.buckets.updateAsync` with `LogBucket.analyticsEnabled` set to `true` and the query parameter `updateMask=analyticsEnabled`.

### Create a linked BigQuery dataset

```bash
gcloud logging links create LINK_ID --bucket=BUCKET_ID --location=LOCATION
```

```bash
gcloud logging links create mylink --bucket=my-bucket --location=global
```

REST: call the asynchronous `projects.locations.buckets.links.create` with a `Link` request body and the query parameter `linkId=LINK_ID`.

### Poll an asynchronous operation

```bash
gcloud logging operations describe OPERATION_ID --location=LOCATION --project=PROJECT_ID
```

## Options / Props

### Restrictions for upgrading a bucket

| Restriction | Detail |
|-------------|--------|
| Level | The bucket was created at the Google Cloud project level. |
| Lock state | The bucket is unlocked, unless it is the `_Required` bucket. |
| Pending updates | There are no pending updates to the bucket. |
| VPC Service Controls perimeter | The perimeter must not restrict `logging.googleapis.com` and `cloudkms.googleapis.com` (the latter required for log buckets that use CMEK). |
| Cross-perimeter CMEK | You can't use identity-based ingress or egress rules to grant cross-perimeter access to the Cloud KMS key when the bucket and the key are in different perimeters. |
| Duration | Upgrading might take as long as 10 minutes; `updateAsync` may take several minutes. |

### Polling `Operation` fields

| Field | Meaning |
|-------|---------|
| `done: false` | In progress; send another `GET` to `projects.locations.operations.get`. |
| `done: true` with `error` | The operation failed; `error` is a `Status` with a gRPC code and message. |
| `done: true` with `response` | The operation succeeded. |

### Link errors

| Error | Cause |
|-------|-------|
| `BigQuery dataset with name "LINK_ID" already exists.` | `LINK_ID` (used as the dataset name) must be unique for the project. |
| `A link can only be created for an analytics-enabled bucket.` | The bucket isn't upgraded. |

## Notes

- You can't undo an upgrade. After the upgrade, new entries are available in Observability Analytics.
- Don't update any other property when upgrading; for example, an `update` call that changes retention and upgrades the bucket fails.
- A log bucket can be linked to at most one BigQuery dataset.
- `links create` takes several minutes. In the console, after Logging shows the linked dataset name it might take several minutes before BigQuery recognizes the dataset; the dataset name must be unique in the selected region.
- You can't delete a bucket that has links; see [delete-and-restore-log-bucket.md](./delete-and-restore-log-bucket.md). BigQuery datasets are covered by `gcp-bigquery` (planned).
- Required role: Logs Configuration Writer (`roles/logging.configWriter`). For upgrade troubleshooting see https://docs.cloud.google.com/logging/docs/analyze/troubleshoot-upgrade-bucket.
- The source also shows the Google Cloud console steps.
- Source: https://docs.cloud.google.com/logging/docs/buckets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-log-bucket.md](./create-log-bucket.md)
- [update-log-bucket-and-retention.md](./update-log-bucket-and-retention.md)
- [delete-and-restore-log-bucket.md](./delete-and-restore-log-bucket.md)
