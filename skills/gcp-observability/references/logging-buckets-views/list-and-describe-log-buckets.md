---
source: https://docs.cloud.google.com/logging/docs/buckets
---

# List and describe log buckets

List the log buckets of a project, folder, or organization and view the details of a single bucket (name, description, location, retention, lock state, lifecycle state, create and update times, linked BigQuery dataset).

## Signature / Usage

### List buckets

```bash
gcloud logging buckets list
```

### Describe one bucket

```bash
gcloud logging buckets describe _Default --location=global
```

### REST

Use `projects.locations.buckets.list` to list buckets and `projects.locations.buckets.get` to view one bucket in the Logging API.

## Options / Props

### Attributes shown by `gcloud logging buckets list`

| Column | Description |
|--------|-------------|
| `LOCATION` | The region in which the bucket's data is stored. |
| `BUCKET_ID` | The name of the log bucket. |
| `RETENTION_DAYS` | The number of days that the bucket's data will be stored by Cloud Logging. |
| `LIFECYCLE_STATE` | Indicates whether the bucket is pending deletion by Cloud Logging. |
| `LOCKED` | Whether the bucket is locked or unlocked. |
| `CREATE_TIME` | A timestamp that indicates when the bucket was created. |
| `UPDATE_TIME` | A timestamp that indicates when the bucket was last modified. |

### Attributes shown by `gcloud logging buckets describe`

| Field | Description |
|-------|-------------|
| `createTime` | A timestamp that indicates when the bucket was created. |
| `description` | The description of the log bucket. |
| `lifecycleState` | Indicates whether the bucket is pending deletion by Cloud Logging. |
| `name` | The name of the log bucket. |
| `retentionDays` | The number of days that the bucket's data will be stored by Cloud Logging. |
| `updateTime` | A timestamp that indicates when the bucket was last modified. |

## Notes

- In the console, the Logs Storage page lists Name, Description, Retention period, Region, and Status (locked or unlocked); a bucket pending deletion is annotated with a warning symbol. The bucket details dialog also shows whether Observability Analytics is enabled, whether BigQuery analysis is linked, and the BigQuery dataset.
- The source also shows the Google Cloud console steps.
- Source: https://docs.cloud.google.com/logging/docs/buckets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-log-bucket.md](./create-log-bucket.md)
- [update-log-bucket-and-retention.md](./update-log-bucket-and-retention.md)
- [delete-and-restore-log-bucket.md](./delete-and-restore-log-bucket.md)
