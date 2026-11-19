---
source: https://docs.cloud.google.com/bigquery/docs/conditions
---

# Control access with IAM Conditions

IAM Conditions grant access to BigQuery resources only when requirements are met, such as a limited duration or scheduled hours. Conditions apply at organization, folder, project and dataset level; allow policies are inherited by child resources. For unrelated collections of resources, consider IAM tags.

## Signature / Usage

### Enable the IAM API

```bash
gcloud services enable iam.googleapis.com
```

### View conditional access on a dataset

Requires Cloud Shell version 503.0.0 or later.

```bash
bq show --format=prettyjson PROJECT_ID:DATASET > PATH_TO_FILE
```

The `access` property of the dataset resource JSON holds the policy. In the REST API call `datasets.get` with `accessPolicyVersion=3`.

### Grant or remove conditional access on a dataset

With `bq`, edit the `access` section of the dataset JSON file (see "Grant access to a dataset" / "Revoke access to a dataset" in the IAM-for-resources guide) and update. With the API, use the same flows with `accessPolicyVersion=3`; condition entries go in the `access.condition` property. Users can update unconditional access settings on datasets that have conditions without specifying `accessPolicyVersion`.

### Example condition: read one table

Printed in the source as pseudo-notation (values unquoted); it is not valid JSON as written.

```text
{
  "members": [cloudysanfrancisco@gmail.com],
  "role": roles/bigquery.dataViewer,
  "condition": {
    "title": "Table dataset_1.table_1",
    "description": "Allowed to read table with name table_1 in dataset_1 dataset",
    "expression":
resource.name == projects/project_1/datasets/dataset_1/tables/table_1
&& resource.type == bigquery.googleapis.com/Table
  }
}
```

### Example condition: tables in datasets with a prefix

```text
{
  "members": [cloudysanfrancisco@gmail.com],
  "role": roles/bigquery.dataOwner,
  "condition": {
    "title": "Tables public_",
    "description": "Allowed owner access to tables in datasets with public_ prefix",
    "expression":
resource.name.startsWith("projects/project_3/datasets/public_")
&& resource.type == bigquery.googleapis.com/Table
  }
}
```

## Options / Props

### Required roles and permissions

| Level | Role | Permissions |
|-------|------|-------------|
| Projects | `roles/resourcemanager.projectIamAdmin` | `resourcemanager.projects.setIamPolicy` |
| Datasets | `roles/bigquery.dataOwner` | `bigquery.datasets.setIamPolicy`, `bigquery.datasets.update` |

Using conditions across an organization also needs permissions to manage organization policies.

### Condition attributes

| Attribute | Description |
|-----------|-------------|
| `request.time` | Time at which the user attempts to access a BigQuery resource |
| `resource.name` | Path of the BigQuery resource |
| `resource.type` | Type of the BigQuery resource |
| `resource.service` | Google Cloud service the resource uses |
| `resource.tags` | Tags attached to the resource; supported only on datasets, tables and views |

### Attribute formats

| Resource | `resource.type` | `resource.name` | `resource.service` |
|----------|-----------------|-----------------|--------------------|
| Dataset | `bigquery.googleapis.com/Dataset` | `projects/PROJECT_ID/datasets/DATASET_ID` | `bigquery.googleapis.com` |
| Table / view | `bigquery.googleapis.com/Table` | `projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID` | `bigquery.googleapis.com` |
| Routine | `bigquery.googleapis.com/Routine` | `projects/PROJECT_ID/datasets/DATASET_ID/routines/ROUTINE_ID` | `bigquery.googleapis.com` |
| Model | `bigquery.googleapis.com/Model` | `projects/PROJECT_ID/datasets/DATASET_ID/models/MODEL_ID` | `bigquery.googleapis.com` |

`resource.tags` supports `hasTagKey`, `hasTagKeyId`, `matchTag` and `matchTagId` for datasets, tables and views.

### Limitations

| Limitation |
|------------|
| Authorized view, authorized routine and authorized dataset grants can't be added with IAM Conditions |
| An incompatible `accessPolicyVersion` can show bindings with `withcond` followed by a hash |
| Users with conditional access to a dataset or table can't modify permissions in the Google Cloud console; only the bq tool and BigQuery API |
| Row-level and column-level access control are not supported directly through IAM Conditions |
| IAM policy changes can take up to five minutes to take effect |
| Users with conditional access might not be able to query `INFORMATION_SCHEMA` views |
| Users with only conditional table access can't run table wildcard functions (legacy SQL) |

## Notes

- Best practices: use positive conditions on `resource.type`, `resource.name`, `resource.service`, and include all three even when not strictly needed; use dataset-level conditions only for roles on resources within the dataset (tables, views, models, routines), not for `bigquery.user` or `bigquery.jobUser`; don't use `resource.type == 'bigquery.googleapis.com/Dataset'` for dataset-level policies (no effect on authorization); grant the narrowest permission set; don't add conditions for resources other than datasets, tables, views, routines and models.
- `resource.name.startsWith` with a table prefix also lets users run wildcard queries, for example `SELECT * FROM my_dataset.table_prefix*`; use with caution because paths start with project ID and dataset ID.
- Negative conditions (for example `resource.name != ...`) can be overly permissive: unsupported resources have empty attributes and match them, wildcard queries such as `SELECT * from my_project.my_dataset.secre*;` still reach a table excluded by name, and negative conditions on tables, routines and models can expose their parent datasets, whose deletion permissions are managed at dataset level.
- `bigquery.RESOURCE.list` must be granted at the parent level, `bigquery.RESOURCE.delete` at the resource level; deleting a dataset needs table, model and routine delete permissions on it. Table snapshots and time travel have no effect on permissions.
- Opens: the source example grants `roles/bigquery.dataOwner` on all tables whose datasets start with `public_`; a user with conditional access can also grant themselves `roles/bigquery.admin` on the table and then change row and column policies.
- Omitted: the source `bq` JSON example with an expiring `roles/bigquery.dataViewer` grant (its `expression` is cut off in the retrieved page), two further examples (dataset-list access with `roles/bigquery.metadataViewer`; owner access to tables, models and routines with a `general_` prefix), and Console steps.
- Source: https://docs.cloud.google.com/bigquery/docs/conditions (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [dataset-access-control.md](./dataset-access-control.md)
- [authorized-views.md](./authorized-views.md)
