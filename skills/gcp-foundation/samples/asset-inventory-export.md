---
source: https://docs.cloud.google.com/asset-inventory/docs/export-cloud-storage
---

# Export Asset Inventory to Cloud Storage and BigQuery

Export a snapshot of assets to a bucket or a BigQuery table, check the operation, and query the result.

## Signature / Usage

Enable the Cloud Asset Inventory API and hold the export role for the content type first.

### Export to Cloud Storage

Adapted (not in the official docs): the official examples use a fixed date (`2024-01-30`) that is outside the 35-day window; replace `SNAPSHOT_TIME` (`--snapshot-time`) and `READ_TIME` (`readTime`) with a time within the last 35 days, or omit them to export the current state.

```bash
gcloud asset export \
    --project=my-project \
    --billing-project=my-project \
    --content-type=resource \
    --snapshot-time="SNAPSHOT_TIME" \
    --output-path="gs://my-bucket/my-file.txt"
```

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

### Check status

`OPERATION_PATH` format: `projects/PROJECT_NUMBER/operations/ExportAssets/CONTENT_TYPE/OPERATION_ID`.

```bash
gcloud asset operations describe OPERATION_PATH
```

### Export to BigQuery

```bash
gcloud asset export \
    --project=my-project \
    --content-type=resource \
    --snapshot-time="SNAPSHOT_TIME" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
    --output-bigquery-force
```

One table per asset type:

```bash
gcloud asset export \
    --project=my-project \
    --content-type=resource \
    --snapshot-time="SNAPSHOT_TIME" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
    --per-asset-type \
    --output-bigquery-force
```

### Query the exported table

```sql
SELECT asset_type, COUNT(*) AS asset_count
FROM `PROJECT_ID.DATASET_ID.TABLE_NAME`
GROUP BY asset_type
ORDER BY asset_count DESC
```

Adapted (not in the official docs): the IAM query reads a table exported with `--content-type=iam-policy`, so that export is added first.

```bash
gcloud asset export \
    --project=my-project \
    --content-type=iam-policy \
    --snapshot-time="SNAPSHOT_TIME" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-iam-table \
    --output-bigquery-force
```

```sql
SELECT name, asset_type, bindings.role
FROM `PROJECT_ID.DATASET_ID.IAM_POLICY_TABLE_NAME`
JOIN UNNEST(iam_policy.bindings) AS bindings
JOIN UNNEST(bindings.members) AS principals
WHERE principals like "%@gmail.com"
```

## Options / Props

| Flag | Description |
|------|-------------|
| `SCOPE` | `project=`, `folder=`, or `organization=` |
| `--snapshot-time` | Not more than 35 days in the past |
| `--content-type` | Omitted returns basic information only |
| `--output-path` / `--output-path-prefix` | Single file / folder split by asset type |
| `--bigquery-table` | `projects/BIGQUERY_PROJECT_ID/datasets/DATASET_ID/tables/TABLE_NAME` |
| `--per-asset-type` | One table per asset type |

## Notes

- Adapted from the official docs: `--snapshot-time` / `readTime` examples use placeholders instead of the fixed `2024-01-30` (outside the 35-day limit), and the IAM query runs against a separate `iam-policy` export.
- `--output-bigquery-force` overwrites the destination table (or partition); point it only at a table you intend to replace.
- A new export to the same destination is rejected while the previous one started less than 15 minutes ago is still running.
- Buckets with customer-managed KMS keys or retention policies are not supported for Cloud Storage export.
- Prefer exports over paged list calls for large inventories to conserve quota.
- Source: https://docs.cloud.google.com/asset-inventory/docs/export-cloud-storage (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/export-bigquery (retrieved 2026-11-14)

## Related

- [export-to-cloud-storage.md](../references/asset-support/asset-feeds-export/export-to-cloud-storage.md)
- [export-to-bigquery.md](../references/asset-support/asset-feeds-export/export-to-bigquery.md)
- [sql-query-assets.md](../references/asset-support/asset-analysis/sql-query-assets.md)
