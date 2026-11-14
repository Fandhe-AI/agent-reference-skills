---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset
---

# Cloud Asset Inventory

Copy-paste gcloud commands for searching, listing, analyzing, exporting and monitoring assets and IAM policies with Cloud Asset Inventory.

## Signature / Usage

### Search resources

```bash
gcloud asset search-all-resources \
    --scope=SCOPE_PATH \
    --query="QUERY" \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --order-by="ORDER_BY" \
    --read-mask="READ_MASK"
```

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="name:instance 1" \
    --asset-types=compute.googleapis.com/Instance \
    --order-by="name DESC" \
    --read-mask="name,location"
```

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="labels.env:*" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, labels)"
```

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --asset-types=iam.googleapis.com/PolicyV2 \
    --query="name:denypolicies"
```

### Search IAM policies

```bash
gcloud asset search-all-iam-policies \
    --scope=SCOPE_PATH \
    --query="QUERY" \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --order-by="ORDER_BY"
```

Owners on a project:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="roles:roles/owner" \
    --asset-types=cloudresourcemanager.* \
    --flatten="policy.bindings[].members[]" \
    --format="table(policy.bindings.members)"
```

Roles a principal holds on a project:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="policy:alex@example.com" \
    --asset-types=cloudresourcemanager.googleapis.com/Project \
    --flatten="policy.bindings[]" \
    --format="table(policy.bindings.role)"
```

Principals who can access Cloud Storage buckets:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="policy.role.permissions:storage.buckets" \
    --asset-types=cloudresourcemanager.* \
    --flatten="policy.bindings[].members[]" \
    --format="table(policy.bindings.members)"
```

Roles granted to a domain:

```bash
gcloud asset search-all-iam-policies \
    --scope=organizations/my-organization-id \
    --query="policy:\"domain:example.com\"" \
    --flatten="policy.bindings[]" \
    --format="table(resource, policy.bindings.role)"
```

### List assets and get history

```bash
gcloud asset list \
    --project=my-project \
    --asset-types=compute.googleapis.com/Instance \
    --content-type=resource \
    --snapshot-time="2024-01-30"
```

```bash
gcloud asset get-history \
    --project=my-project \
    --asset-names=//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance \
    --content-type=resource \
    --start-time="2024-01-30" \
    --end-time="2024-02-05"
```

### Effective IAM policy

```bash
gcloud asset get-effective-iam-policy \
    --scope=organizations/my-organization-id \
    --names=//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance
```

### Query assets with SQL

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

```bash
gcloud asset query \
    --project=my-project \
    --job-reference="0000000000000000000000000000000000000000000000000000000000000000"
```

### Export assets

To Cloud Storage:

```bash
gcloud asset export \
    --project=my-project \
    --billing-project=my-project \
    --content-type=resource \
    --snapshot-time="2024-01-30" \
    --output-path="gs://my-bucket/my-file.txt"
```

To BigQuery:

```bash
gcloud asset export \
    --project=my-project \
    --content-type=resource \
    --snapshot-time="2024-01-30" \
    --bigquery-table=projects/my-project/datasets/my-dataset/tables/my-table \
    --output-bigquery-force
```

Check the export status:

```bash
gcloud asset operations describe OPERATION_PATH
```

### Feeds

```bash
gcloud asset feeds create my-feed \
    --project=my-project \
    --pubsub-topic=projects/my-project/topics/my-topic \
    --asset-names=//storage.googleapis.com/my-bucket \
    --asset-types=bigquery.googleapis.com/Table \
    --content-type=resource
```

```bash
gcloud asset feeds describe FEED_ID \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID
```

```bash
gcloud asset feeds list \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID
```

```bash
gcloud asset feeds update my-feed \
    --project=my-project \
    --pubsub-topic=projects/my-project/topics/my-topic \
    --clear-asset-names \
    --add-asset-types=gkemulticloud.googleapis.com/AttachedCluster
```

```bash
gcloud asset feeds delete FEED_ID \
    --SCOPE \
    --billing-project=BILLING_PROJECT_ID
```

### Analyze a project move

```bash
gcloud asset analyze-move --project=PROJECT_ID \
  --destination-folder=FOLDER_ID
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--scope` | `search-all-*`, `get-effective-iam-policy` | `projects/ID`, `folders/ID` or `organizations/ID` |
| `--query` | `search-all-*` | Search query syntax string |
| `--asset-types` | most `asset` commands | Comma-separated asset types |
| `--content-type` | `list`, `export`, `feeds create`, `get-history` | For example `resource` or `iam-policy` |
| `--snapshot-time` | `list`, `export` | Point in time, within the last 35 days |
| `--names` | `get-effective-iam-policy` | Full asset names, up to 20 per batch |
| `--billing-project` | `feeds`, `export` | Project billed and used for quota |

## Notes

- Warning: use a disposable project and feed for `gcloud asset feeds delete` and for `export` with `--output-bigquery-force`, which overwrites the target table; always pass the exact feed ID and destination, and never omit the target.
- Enable the Cloud Asset Inventory API and hold the matching `cloudasset.*` permission before running these commands.
- `gcloud asset query` needs Security Command Center Premium or Enterprise, or Gemini Cloud Assist.
- Only allow policies are returned by `get-effective-iam-policy`; deny and Principal Access Boundary policies are not.
- Source: https://docs.cloud.google.com/asset-inventory/docs/search-resources (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/search-allow-policies (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/list-assets (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/view-effective-policies (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/query-assets-with-sql (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/export-cloud-storage (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/export-bigquery (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/monitor-asset-changes (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/moving-projects-folders (retrieved 2026-11-14)

## Related

- [search-resources.md](../references/asset-support/asset-analysis/search-resources.md)
- [search-iam-policies.md](../references/asset-support/asset-analysis/search-iam-policies.md)
- [list-and-history.md](../references/asset-support/asset-analysis/list-and-history.md)
- [effective-policies-and-analysis.md](../references/asset-support/asset-analysis/effective-policies-and-analysis.md)
- [sql-query-assets.md](../references/asset-support/asset-analysis/sql-query-assets.md)
- [export-to-cloud-storage.md](../references/asset-support/asset-feeds-export/export-to-cloud-storage.md)
- [export-to-bigquery.md](../references/asset-support/asset-feeds-export/export-to-bigquery.md)
- [feeds-pubsub.md](../references/asset-support/asset-feeds-export/feeds-pubsub.md)
