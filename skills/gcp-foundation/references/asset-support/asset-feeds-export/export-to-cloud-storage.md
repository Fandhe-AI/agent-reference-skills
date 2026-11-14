---
source: https://docs.cloud.google.com/asset-inventory/docs/export-cloud-storage
---

# Export Assets to Cloud Storage

Export a snapshot of the asset metadata of an organization, folder, or project to a Cloud Storage bucket with `ExportAssets`.

## Signature / Usage

Before you begin: enable the Cloud Asset Inventory API, hold the required role (the export permission matching the content type), and create a bucket.

```bash
gcloud asset export \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --content-type=CONTENT_TYPE \
    --relationship-types=RELATIONSHIP_TYPE_1,RELATIONSHIP_TYPE_2,... \
    --snapshot-time="SNAPSHOT_TIME" \
    --OUTPUT_TYPE
```

Example: export `resource` metadata as of January 30, 2024 for `my-project` to a file.

```bash
gcloud asset export \
    --project=my-project \
    --billing-project=my-project \
    --content-type=resource \
    --snapshot-time="SNAPSHOT_TIME" \
    --output-path="gs://my-bucket/my-file.txt"
```

Response:

```
Export in progress for root asset [projects/my-project].
Use [gcloud asset operations describe projects/000000000000/operations/ExportAssets/RESOURCE/00000000000000000000000000000000] to check the status of the operation.
```

REST:

```bash
curl -X POST \
     -H "X-Goog-User-Project: BILLING_PROJECT_ID" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "contentType": "RESOURCE",
            "readTime": "READ_TIME",
            "outputConfig": {
              "gcsDestination": {
                "uri": "gs://my-bucket/my-file"
              }
            }
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project:exportAssets
```

### Check export status

`OPERATION_PATH` format: `projects/PROJECT_NUMBER/operations/ExportAssets/CONTENT_TYPE/OPERATION_ID`.

```bash
gcloud asset operations describe OPERATION_PATH

curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     https://cloudasset.googleapis.com/v1/OPERATION_PATH
```

Example operation response:

```json
{
  "name": "projects/000000000000/operations/ExportAssets/RESOURCE/00000000000000000000000000000000",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.asset.v1.ExportAssetsRequest",
    "parent": "projects/000000000000",
    "readTime": "2024-01-30T00:00:00Z",
    "contentType": "RESOURCE",
    "outputConfig": {
      "gcsDestination": {
        "uri": "gs://my-bucket/export.txt"
      }
    }
  }
}
```

View the snapshot: in the Cloud Storage Buckets page open the bucket, click the export file name, then Download.

## Options / Props

| Flag | Description |
|------|-------------|
| `SCOPE` | `project=PROJECT_ID`, `folder=FOLDER_ID`, or `organization=ORGANIZATION_ID` |
| `--billing-project` | Optional; project whose default Cloud Asset Inventory service agent can manage the bucket |
| `--asset-types` | Comma-separated asset types, RE2 regex supported; a regex matching nothing returns `INVALID_ARGUMENT`; omitted returns all |
| `--content-type` | Omitted returns basic information only |
| `--relationship-types` | Needs Security Command Center Premium or Enterprise and `--content-type=relationship` |
| `--snapshot-time` | gcloud datetime format; not more than 35 days in the past; omitted means now |
| `--output-path="gs://BUCKET/FILE"` | Write to a single file |
| `--output-path-prefix="gs://BUCKET/FOLDER"` | Write to a folder, split into subfolders named after asset types; the subfolders must not already exist |

## Notes

- Adapted from the official docs: request examples use `SNAPSHOT_TIME` / `READ_TIME` placeholders instead of the fixed `2024-01-30`; use a time within the last 35 days.
- Limitations: buckets encrypted with customer-managed Cloud KMS keys are not supported; the bucket cannot have a retention policy; temporary files may appear in the output folder during export and must not be removed until it completes; `ACCESS_POLICY` can only be exported at the organization level; exporting to a file already being exported to returns `400`; an empty test file is created first, causing an extra `google.cloud.storage.object.v1.finalized` event.
- New export requests to the same destination are accepted only after the previous request finished or more than 15 minutes elapsed.
- Operation IDs are UUIDs that need no extra permission to query; share them only with trusted users.
- Large exports are preferred over paged `ListAssets` to conserve quota.
- Source: https://docs.cloud.google.com/asset-inventory/docs/export-cloud-storage (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [export-to-bigquery.md](./export-to-bigquery.md)
- [billing-project-and-client-libraries.md](./billing-project-and-client-libraries.md)
- [audit-logging-quota.md](../asset-inventory-core/audit-logging-quota.md)
