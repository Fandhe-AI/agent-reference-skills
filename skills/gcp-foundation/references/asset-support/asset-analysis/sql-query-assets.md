---
source: https://docs.cloud.google.com/asset-inventory/docs/query-assets-with-sql
---

# Query Assets with SQL

Query assets in a project, folder, or organization with a BigQuery SQL-compatible dialect (`QueryAssets`, `gcloud asset query`), retrieve results later by job reference, and export results to BigQuery. For general BigQuery SQL see the gcp-bigquery skill.

## Signature / Usage

Requires Security Command Center Premium or Enterprise tier, or Gemini Cloud Assist (new sign-ups: up to 6 hours for API access and up to 48 hours for historical data).

```bash
gcloud asset query \
    --SCOPE \
    --statement="SQL_SELECT_QUERY" \
    --timeout="TIMEOUTs"
```

Example (first two Compute Engine instances):

```bash
gcloud asset query \
    --project=my-project \
    --statement="
      SELECT
        name, assetType
      FROM
        compute_googleapis_com_Instance
      LIMIT 2"
```

Finished-job response:

```
done: true
jobReference: 0000000000000000000000000000000000000000000000000000000000000000
queryResult:
  nextPageToken: ''
  totalRows: '2'

name: //compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/instance-1
assetType: compute.googleapis.com/Instance

name: //compute.googleapis.com/projects/my-project/zones/us-central1-c/instances/instance-2
assetType: compute.googleapis.com/Instance
```

REST:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "statement": "
              SELECT
                name, assetType
              FROM
                compute_googleapis_com_Instance
              LIMIT 2"
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project:queryAssets
```

Retrieve results later (use a `--timeout` to run asynchronously and keep the job reference):

```bash
gcloud asset query \
    --project=my-project \
    --job-reference="0000000000000000000000000000000000000000000000000000000000000000"
```

Export results to BigQuery (US multi-region datasets only):

```bash
gcloud asset query \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID \
    --statement="SQL_SELECT_QUERY" \
    --bigquery-table=projects/BIGQUERY_PROJECT_ID/datasets/DATASET_ID/tables/TABLE_NAME \
    --write-disposition="WRITE_METHOD"
```

```bash
gcloud asset query \
  --project=my-project \
  --statement="
    SELECT
      name, assetType
    FROM
      compute_googleapis_com_Instance
    LIMIT 2" \
  --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
  --write-disposition="write-truncate"
```

REST export body:

```bash
curl -X POST \
     -H "X-Goog-User-Project: BILLING_PROJECT_ID" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "statement": "
              SELECT
                name, assetType
              FROM
                compute_googleapis_com_Instance
              LIMIT 2",
            "outputConfig": {
              "bigqueryDestination": {
                "dataset": "projects/my-project/datasets/my-dataset",
                "table": "my-table",
                "writeDisposition": "WRITE_TRUNCATE"
              }
            }
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project:queryAssets
```

### Example queries

VM instances in Asia with creation time:

```sql
SELECT
  name,
  resource.DATA.creationTimestamp
FROM
  compute_googleapis_com_Instance
WHERE
  resource.location LIKE '%asia%'
```

BigQuery datasets per project:

```sql
SELECT
  ancestor AS project,
  COUNT(*)
FROM
  bigquery_googleapis_com_Dataset
CROSS JOIN
  UNNEST (ancestors) AS ancestor
WHERE
  ancestor LIKE '%project%'
GROUP BY
  ancestor
ORDER BY
  2 DESC
```

All resources in a region (cross-type table):

```sql
SELECT
  name,
  assetType
FROM
  STANDARD_METADATA
WHERE
  resource.location LIKE '%asia%'
```

Publicly available Cloud Storage buckets:

```sql
SELECT
  name
FROM
  IAM_POLICY
CROSS JOIN
  UNNEST(iamPolicy.bindings) AS binding
WHERE
  ('allUsers' IN UNNEST(binding.members)
  OR 'allAuthenticatedUsers' IN UNNEST(binding.members))
  AND assetType = 'storage.googleapis.com/Bucket'
```

Subnetworks without attached VMs:

```sql
SELECT
  subnetwork_table.name
FROM
  compute_googleapis_com_Subnetwork AS subnetwork_table
LEFT JOIN (
  SELECT
    interface.subnetwork AS subnetwork
  FROM
    compute_googleapis_com_Instance
  CROSS JOIN
    UNNEST(resource.DATA.networkInterfaces) AS interface) AS instance_table
ON
  SUBSTR(subnetwork_table.name, 25) = SUBSTR(instance_table.subnetwork,38)
WHERE
  instance_table.subnetwork IS NULL
  AND NOT subnetwork_table.name LIKE '%default%'
```

## Options / Props

| Flag / field | Description |
|--------------|-------------|
| `--statement` / `statement` | A `SELECT` query |
| `--timeout` | Optional seconds to wait before continuing; use with job references for async runs |
| `--job-reference` | Job reference from a previous response to fetch results later |
| `--bigquery-table` | Destination `projects/BIGQUERY_PROJECT_ID/datasets/DATASET_ID/tables/TABLE_NAME`; created if missing |
| `--write-disposition` | `write-empty` (default; duplicate error if the table has data), `write-append` (append to table or latest partition), `write-truncate` (overwrite entire table or all partitions); REST values like `WRITE_TRUNCATE` |

Tables: for `RESOURCE` content, table name = asset type with `.` and `/` replaced by `_` (`compute_googleapis_com_Instance`); for other content types, the content type name (`ACCESS_POLICY`, `IAM_POLICY`); `STANDARD_METADATA` queries standard metadata across resource types (all fields except `resource.DATA`).

## Notes

- Limitations: `SELECT` only; legacy SQL unsupported; results larger than 10 GB unsupported; results over 10 MB or 1,000 rows are always paginated; queries must finish within 6 hours; export destination datasets must be in the `US` multi-region.
- Quota: `QueryAssets` is 20/min per organization with a statement and 200/min with a job reference.
- Kubernetes pod queries (`k8s_io_Pod`) use `JSON_EXTRACT_SCALAR` on `resource.data.metadata`; see the official page for the full example.
- Export with `write-truncate` overwrites the destination table; verify the target first.
- Source: https://docs.cloud.google.com/asset-inventory/docs/query-assets-with-sql (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [export-to-bigquery.md](../asset-feeds-export/export-to-bigquery.md)
- [search-resources.md](./search-resources.md)
- [audit-logging-quota.md](../asset-inventory-core/audit-logging-quota.md)
