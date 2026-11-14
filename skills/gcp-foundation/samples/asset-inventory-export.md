---
source: https://docs.cloud.google.com/asset-inventory/docs/export-cloud-storage
---

# Export Asset Inventory to Cloud Storage and BigQuery

Export a snapshot of assets to a bucket or a BigQuery table, check the operation, and query the result.

## Signature / Usage

Enable the Cloud Asset Inventory API and hold the export role for the content type first.

### Export to Cloud Storage

```bash
gcloud asset export \
    --project=my-project \
    --billing-project=my-project \
    --content-type=resource \
    --snapshot-time="2024-01-30" \
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
            "readTime": "2024-01-30T00:00:00Z",
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
    --snapshot-time="2024-01-30" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
    --output-bigquery-force
```

One table per asset type:

```bash
gcloud asset export \
    --project=my-project \
    --content-type=resource \
    --snapshot-time="2024-01-30" \
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

```sql
SELECT name, asset_type, bindings.role
FROM `PROJECT_ID.DATASET_ID.TABLE_NAME`
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
