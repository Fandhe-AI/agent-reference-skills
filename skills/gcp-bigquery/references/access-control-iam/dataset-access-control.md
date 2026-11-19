---
source: https://docs.cloud.google.com/bigquery/docs/dataset-access-control
---

# Changes to dataset-level access controls

Opt-in enforcement of fine-grained dataset ACL permissions. When the `enable_fine_grained_dataset_acls_option` configuration setting is `TRUE`, `bigquery.datasets.getIamPolicy` is required to view a dataset's access controls (and to query `INFORMATION_SCHEMA.OBJECT_PRIVILEGES`), and `bigquery.datasets.setIamPolicy` is required to update them or to create a dataset with access controls through the API. If you don't opt in, dataset-level access controls are unchanged.

## Signature / Usage

### Opt in at organization level

```sql
ALTER ORGANIZATION
SET OPTIONS (
  `region-REGION.enable_fine_grained_dataset_acls_option` = TRUE);
```

Replace `REGION` with the region associated with your organization, for example `us` or `europe-west6`. To clear the setting:

```sql
ALTER ORGANIZATION
SET OPTIONS (
  `region-REGION.enable_fine_grained_dataset_acls_option` = FALSE);
```

### Opt in at project level

`project_id` is optional; if omitted it defaults to the project where the query runs.

```sql
ALTER PROJECT PROJECT_ID
SET OPTIONS (
  `region-REGION.enable_fine_grained_dataset_acls_option` = TRUE);
```

```sql
ALTER PROJECT PROJECT_ID
SET OPTIONS (
  `region-REGION.enable_fine_grained_dataset_acls_option` = FALSE);
```

### `datasets.get` with `datasetView`

```text
GET https://bigquery.googleapis.com/bigquery/v2/projects/YOUR_PROJECT/datasets/YOUR_DATASET?datasetView=METADATA&key=YOUR_API_KEY HTTP/1.1
```

### `datasets.update` with `updateMode`

```text
PUT https://bigquery.googleapis.com/bigquery/v2/projects/YOUR_PROJECT/datasets/YOUR_DATASET?updateMode=METADATA&key=YOUR_API_KEY HTTP/1.1
```

`datasets.patch` takes the same `updateMode` parameter (the source example shows the same `PUT` request form).

## Options / Props

### `dataset_view` parameter of `datasets.get` (REST v2)

| Value | Permissions required | Response |
|-------|----------------------|----------|
| `DATASET_VIEW_UNSPECIFIED` (or empty) | `bigquery.datasets.get`, `bigquery.datasets.getIamPolicy` | Default. Metadata and access controls. |
| `METADATA` | `bigquery.datasets.get` | Metadata. |
| `ACL` | `bigquery.datasets.getIamPolicy` | Access controls, required fields, and output-only fields. |
| `FULL` | `bigquery.datasets.get`, `bigquery.datasets.getIamPolicy` | Metadata and access controls. |

### `update_mode` parameter of `datasets.update`

| Value | Permissions required | Response |
|-------|----------------------|----------|
| `UPDATE_MODE_UNSPECIFIED` (or empty) | `bigquery.datasets.update`, `bigquery.datasets.setIamPolicy` | Default. Updated metadata and access controls. |
| `UPDATE_METADATA` | `bigquery.datasets.update` | Updated metadata. |
| `UPDATE_ACL` | `bigquery.datasets.update`, `bigquery.datasets.setIamPolicy` | Updated access controls, required fields, output-only fields. |
| `UPDATE_FULL` | `bigquery.datasets.update`, `bigquery.datasets.setIamPolicy` | Updated metadata and access controls. |

### `update_mode` parameter of `datasets.patch`

| Value | Permissions required | Response |
|-------|----------------------|----------|
| `UPDATE_MODE_UNSPECIFIED` (or empty) | `bigquery.datasets.update`, `bigquery.datasets.setIamPolicy` | Default. Updated metadata and access controls. |
| `UPDATE_METADATA` | `bigquery.datasets.update` | Updated metadata. |
| `UPDATE_ACL` | `bigquery.datasets.setIamPolicy` | Updated access controls, required fields, output-only fields. |
| `UPDATE_FULL` | `bigquery.datasets.update`, `bigquery.datasets.setIamPolicy` | Updated metadata and access controls. |

### Other changes after opting in

| Surface | Requirement |
|---------|-------------|
| `datasets.insert` with access controls | `bigquery.datasets.create` and `bigquery.datasets.setIamPolicy` (only `bigquery.datasets.create` without access controls) |
| DCL `GRANT` / `REVOKE` on datasets | `bigquery.datasets.setIamPolicy` |
| `INFORMATION_SCHEMA.OBJECT_PRIVILEGES` | `bigquery.datasets.getIamPolicy` |

## Notes

- The `access` field of the dataset resource holds access controls; `friendlyName`, `description`, `labels` etc. are metadata.
- If you don't opt in, or opt out afterwards, `dataset_view` accepts `METADATA` and `ACL`, but `FULL` and unspecified keep the previous behavior (`bigquery.datasets.get` returns both metadata and access controls). For `update_mode`, BigQuery keeps the previous behavior (`bigquery.datasets.update` updates both).
- Custom roles that grant only `bigquery.datasets.get`, `bigquery.datasets.create` or `bigquery.datasets.update` are impacted once you opt in; add `bigquery.datasets.getIamPolicy` / `bigquery.datasets.setIamPolicy` to keep existing functionality, or use `dataset_view` / `update_mode` for metadata-only access.
- Predefined roles `roles/bigquery.admin`, `roles/bigquery.dataOwner`, `roles/bigquery.dataEditor`, `roles/bigquery.dataViewer`, `roles/bigquery.metadataViewer`, `roles/bigquery.user`, `roles/bigquery.studioAdmin`, `roles/bigquery.securityAdmin` already grant the matching permissions. Authorized routine roles, metadata roles of other services and some service agent roles do not.
- Omitted: the source also describes `bq show --dataset_view={METADATA|ACL|FULL}` and `bq update --update_mode={UPDATE_METADATA|UPDATE_ACL|UPDATE_FULL}`; those flags are not listed in the `bq` command-line reference, so they are not shown as commands here.
- The option name `enable_fine_grained_dataset_acls_option` is not listed among the options in the `ALTER ORGANIZATION` / `ALTER PROJECT` reference; it is kept as written in the source. Configuration settings are described in "Manage configuration settings".
- The `YOUR_API_KEY` query parameter in the source examples is a placeholder; do not paste real keys into shared code.
- Source: https://docs.cloud.google.com/bigquery/docs/dataset-access-control (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [access-control-intro.md](./access-control-intro.md)
- [authorized-datasets.md](./authorized-datasets.md)
