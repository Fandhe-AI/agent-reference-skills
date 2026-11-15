---
source: https://docs.cloud.google.com/storage/docs/insights/datasets
---

# Storage Insights datasets

Storage Insights datasets generate a queryable index of metadata and activity across organizations, folders, projects, or specific buckets, exposed as a BigQuery linked dataset. Available only with Storage Intelligence configured.

## Signature / Usage

Select objects for batch operations directly from dataset fields with Common Expression Language (CEL) filter flags (`--bucket-filters`, `--object-filters`) instead of building CSV manifests. One batch job can cover up to 1,000 buckets. The flag fragment below is passed to a batch operations job command; it is not a command on its own.

```text
--object-filters="size >= 5000 && name.endsWith('.pdf')"
```

## Options / Props

### Dataset contents

| Table group | Contents |
|-------------|----------|
| Metadata | Snapshot of metadata for projects, buckets, and objects |
| Activity data | Mutation and error records for objects; aggregated activity for buckets and projects |
| Errors and events | Snapshot processing events and errors |

### Dataset configuration properties

| Property | Description and limits |
|----------|------------------------|
| Dataset scope | Organizations, projects, or folders; projects or folders individually or via CSV; one scope per configuration; up to `10,000` projects or folders |
| Bucket filters | Include or exclude by bucket name (regular expression) or bucket location |
| Retention period for dataset | Rolling window up to `90` days; metadata refreshes every `24` hours; data outside the window is deleted automatically; changeable at any time; applies to metadata tables and to activity tables unless overridden |
| Retention period for activity data | Overrides the dataset retention for activity data tables; up to `365 days` |
| Location | BigQuery location of the linked dataset (for example `us-central1`); source buckets can be in any Cloud Storage location |
| Service agent type | Configuration-scoped (access only that configuration's dataset; deleted with it) or project-scoped (access all configurations in the project; not deleted with a configuration) |

### Timing

| Event | Latency |
|-------|---------|
| Initial dataset load, or newly added buckets or objects | 24 to 48 hours to appear in BigQuery |
| Activity data | Typically within four hours of the activity |
| Metadata snapshots | Updated every 24 hours |

### Supported BigQuery locations for the linked dataset

`EU`, `US`, `asia-south1`, `asia-south2`, `asia-southeast1`, `europe-west1`, `us-central1`, `us-east1`, `us-east4`

## Notes

- Use cases: understand your storage estate (anomalies, duplicates, prefix lists); batch operations with dataset filters; activity patterns and inactive buckets; regional bucket activity to decide on bucket relocation; troubleshooting `429` and other errors through `object_events_view`; analysis with BigQuery `ObjectRef` functions.
- Security: the object metadata schema includes a computed public access status that considers public access prevention, uniform bucket-level access, ACLs, IAM policies, organization policy constraints, IAM deny policies, and tagged IAM policies. Query it in BigQuery and monitor with Looker dashboards. Public access status is unavailable for objects in managed folders, and VPC Service Controls and IP filtering are not considered.
- Encryption and retention: audit with `encryption.defaultEncryptionType`, `encryption.defaultKmsKeyName`, `encryptionType`, `retentionExpirationTime`, `softDeletePolicy`, and `softDeleteTime`.
- Renaming a folder in a hierarchical namespace bucket changes object names; the linked dataset ingests them as new entries.
- CRC32C checksums and MD5 hashes are not available for CMEK-encrypted objects in the object metadata table.
- Benefits: custom scope, SQL and Gemini natural-language queries, Looker dashboards (a Storage Intelligence dashboard template is available).
- Distance: Cloud Storage is Google Cloud's object storage; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/insights/datasets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-datasets.md](./configure-datasets.md)
- [batch-operations-overview.md](./batch-operations-overview.md)
- [inventory-reports.md](./inventory-reports.md)
- [storage-intelligence-overview.md](./storage-intelligence-overview.md)
