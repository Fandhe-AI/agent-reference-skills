---
source: https://docs.cloud.google.com/asset-inventory/docs/export-bigquery
---

# Export Assets to BigQuery

Export an asset snapshot of an organization, folder, or project to a BigQuery table (single table, one table per asset type, or a time-unit column partitioned table), then analyze inventory with SQL. For querying BigQuery itself see the gcp-bigquery skill.

## Signature / Usage

Before you begin: enable the Cloud Asset Inventory API, hold the required export role, and create a BigQuery dataset.

### Single table

```bash
gcloud asset export \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --content-type=CONTENT_TYPE \
    --relationship-types=RELATIONSHIP_TYPE_1,RELATIONSHIP_TYPE_2,... \
    --snapshot-time="SNAPSHOT_TIME" \
    --bigquery-table=projects/BIGQUERY_PROJECT_ID/datasets/DATASET_ID/tables/TABLE_NAME \
    --output-bigquery-force
```

Example:

```bash
gcloud asset export \
    --project=my-project \
    --content-type=resource \
    --snapshot-time="SNAPSHOT_TIME" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
    --output-bigquery-force
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
              "bigqueryDestination": {
                "dataset": "projects/my-project/datasets/my-dataset",
                "table": "my-table",
                "force": true
              }
            }
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project:exportAssets
```

### Separate tables per asset type

```bash
gcloud asset export \
    --project=my-project \
    --content-type=resource \
    --snapshot-time="SNAPSHOT_TIME" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
    --per-asset-type \
    --output-bigquery-force
```

REST: add `"separateTablesPerAssetType": true` inside `bigqueryDestination` (next to `"force": true`).

### Time-unit column partitioned table

```bash
gcloud asset export \
    --project=my-project \
    --content-type=resource \
    --snapshot-time="SNAPSHOT_TIME" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
    --partition-key=read-time \
    --output-bigquery-force
```

REST:

```json
"bigqueryDestination": {
  "dataset": "projects/my-project/datasets/my-dataset",
  "table": "my-table",
  "partitionSpec": {
    "partitionKey": "READ_TIME"
  },
  "force": true
}
```

### Check status (same as Cloud Storage export)

```bash
gcloud asset operations describe OPERATION_PATH
```

### Browse and query the result

REST browsing: call BigQuery `tabledata.list` with optional `maxResults`, `selectedFields`, `startIndex` (a `startIndex` beyond the last row succeeds with no `rows`; check `numRows` via `tables.get`). For queries: run an interactive query in BigQuery Studio, or `jobs.insert` with `configuration.query` plus `jobReference.location`, then poll `getQueryResults` until `jobComplete` is `true`.

Count assets by type:

```sql
SELECT asset_type, COUNT(*) AS asset_count
FROM `PROJECT_ID.DATASET_ID.TABLE_NAME`
GROUP BY asset_type
ORDER BY asset_count DESC
```

IAM policies granting access to Gmail accounts (`UNNEST` of repeated fields):

```sql
SELECT name, asset_type, bindings.role
FROM `PROJECT_ID.DATASET_ID.TABLE_NAME`
JOIN UNNEST(iam_policy.bindings) AS bindings
JOIN UNNEST(bindings.members) AS principals
WHERE principals like "%@gmail.com"
```

Scopes that allow Cloud SQL public IPs:

```sql
SELECT name
FROM `PROJECT_ID.DATASET_ID.TABLE_NAME`
JOIN UNNEST(org_policy) AS op
WHERE
  op.constraint = "constraints/sql.restrictPublicIp"
  AND (op.boolean_policy IS NULL OR op.boolean_policy.enforced = FALSE);
```

Resources in the same VPC Service Controls perimeter:

```sql
SELECT service_perimeter.title, service_perimeter.status.resources
FROM `PROJECT_ID.DATASET_ID.TABLE_NAME`
CROSS JOIN UNNEST(service_perimeter.status.resources) as resource
WHERE resource = "projects/PROJECT_ID";
```

Open firewall rules, single-table (JSON strings) versus per-asset-type table (structured):

```sql
CREATE TEMP FUNCTION json2array(json STRING)
RETURNS ARRAY<STRING>
LANGUAGE js AS """
  return JSON.parse(json).map(x=>JSON.stringify(x));
""";

SELECT firewall.name, firewall.resource.parent, JSON_EXTRACT(firewall.resource.data, '$.sourceRanges') AS sourceRanges
FROM `PROJECT_ID.DATASET_ID.TABLE_NAME` AS firewall
JOIN UNNEST(json2array(JSON_EXTRACT(firewall.resource.data, '$.sourceRanges'))) AS source_ranges
WHERE asset_type="compute.googleapis.com/Firewall" AND JSON_EXTRACT(firewall.resource.data, '$.sourceRanges') IS NOT NULL AND JSON_EXTRACT_SCALAR(source_ranges, '$') = "0.0.0.0/0"
```

```sql
SELECT firewall.name, firewall.resource.parent, sourceRanges
FROM `PROJECT_ID.DATASET_ID.STRUCTURED_INSTANCE_TABLE_NAME` AS firewall
JOIN UNNEST(firewall.resource.data.sourceRanges) AS sourceRanges
WHERE sourceRanges = "0.0.0.0/0";
```

Subnetworks with no VM attached (per-asset-type tables).

Adapted (not in the official docs): the outer `IS NULL` was removed (it excluded the unattached subnetworks) and the subquery filters `networkInterface.subnetwork IS NOT NULL` so `NOT IN` never yields UNKNOWN.

```sql
SELECT name, subnetwork.resource.data.selfLink
FROM `PROJECT_ID.DATASET_ID.STRUCTURED_SUBNETWORK_TABLE_NAME` AS subnetwork
WHERE
  subnetwork.resource.data.selfLink
    NOT IN (
      SELECT DISTINCT networkInterface.subnetwork
      FROM `PROJECT_ID.DATASET_ID.STRUCTURED_INSTANCE_TABLE_NAME` as instance
      JOIN
        UNNEST(instance.resource.data.networkInterfaces) AS networkInterface
      WHERE
        networkInterface.subnetwork IS NOT NULL
    );
```

## Options / Props

| Flag / field | Description |
|--------------|-------------|
| `SCOPE` | `project=`, `folder=`, or `organization=` |
| `--bigquery-table` | `projects/BIGQUERY_PROJECT_ID/datasets/DATASET_ID/tables/TABLE_NAME`; created if missing. With `--per-asset-type` it is a prefix |
| `--output-bigquery-force` | Overwrite the destination table (REST `"force": true`); in partitioned mode overwrites only the matching partition |
| `--per-asset-type` | One table per asset type, named `TABLE_NAME` + `_` + asset type, non-alphanumerics replaced with `_` (REST `separateTablesPerAssetType`); `RELATIONSHIP` cannot be exported this way |
| `--partition-key` | `read-time` or `request-time`; daily granularity with extra `readTime` and `requestTime` columns |
| `--snapshot-time` | Not more than 35 days in the past |
| `--asset-types`, `--content-type`, `--relationship-types` | As for Cloud Storage export |

Resource schema (content type `RESOURCE` or unspecified, not per asset type): top-level `name` (STRING), `asset_type` (STRING), and a `resource` record containing `version`, `discovery_document_uri`, `discovery_name`, `resource_url`, `parent`, `data` (STRING containing JSON), `location`; the full schema continues with ancestors and policy columns in the official page.

Casing: for `RESOURCE` content type exported per asset type, field names are camelCase (`assetType`); for all other content types, lowercase with underscores (`asset_type`).

## Notes

- Adapted from the official docs: request examples use `SNAPSHOT_TIME` / `READ_TIME` placeholders instead of the fixed `2024-01-30`; use a time within the last 35 days.
- Limitations: not all BigQuery table fields are exported; frequently changing fields (`numBytes`, `numLongTermBytes`, `numPhysicalBytes`, `numRows`) can be `null`; clustered tables are unsupported; appending to an existing table is unsupported unless partitioned (otherwise the table must be empty or overwritten with force); GKE resource types other than `container.googleapis.com/Cluster` and `NodePool` are unsupported in per-asset-type mode; `ACCESS_POLICY` exports only at organization level; a `400` is returned if the table is currently being exported to.
- A new export to the same destination is rejected if the previous one started less than 15 minutes ago and is still running; after 15 minutes the earlier export is marked done.
- Per-asset-type exports fail entirely on the first error (earlier successful tables persist). Proto3 types `Timestamp`, `Duration`, `FieldMask`, `ListValue`, `Value`, `Struct`, and `google.api.*` are packed as JSON strings.
- Partitioned export fails if a schema update/append fails, including an existing table with an unexpected schema; without force, data appends to the partition.
- Experimental fields can appear empty at first; do not depend on them until populated.
- `--output-bigquery-force` overwrites data; point it only at a table or partition you intend to replace.
- The official CVE-2021-44228 Dataproc query (Managed Service for Apache Spark) is not reproduced here; see the official page. The official HTML renders `&&` as `&amp;&amp;` in that sample.
- Source: https://docs.cloud.google.com/asset-inventory/docs/export-bigquery (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [export-to-cloud-storage.md](./export-to-cloud-storage.md)
- [billing-project-and-client-libraries.md](./billing-project-and-client-libraries.md)
- [sql-query-assets.md](../asset-analysis/sql-query-assets.md)
- gcp-bigquery skill (BigQuery SQL and datasets)
