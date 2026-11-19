---
source: https://docs.cloud.google.com/bigquery/docs/authorized-datasets
---

# Authorized datasets

An authorized dataset gives all current and future views in one dataset access to the data in a second (shared) dataset, so you don't authorize each view individually. The dataset that authorizes access is the shared dataset; the dataset holding the views is the authorized dataset.

## Signature / Usage

### Authorize a dataset with bq

Read-modify-write: dump the shared dataset's metadata (including the ACL), add the entry, update.

```bash
bq show --format=prettyjson PROJECT:SHARED_DATASET > FILE_PATH
```

Add this entry to the `access` array in the file:

Adapted (not in the official docs): the field names are the dataset resource's JSON names (`projectId`, `datasetId`, `targetTypes`, as `bq show --format=prettyjson` prints them) and `targetTypes` is an array.

```json
{
  "dataset": {
    "dataset": {
      "projectId": "PROJECT",
      "datasetId": "AUTHORIZED_DATASET"
    },
    "targetTypes": ["VIEWS"]
  }
}
```

```bash
bq update --source FILE_PATH PROJECT:SHARED_DATASET
```

Verify with `bq show --format=prettyjson PROJECT:SHARED_DATASET`. To revoke, remove the same entry from the `access` section and run `bq update --source` again.

### Authorize a dataset with the API

```text
GET https://bigquery.googleapis.com/bigquery/v2/projects/PROJECT/datasets/SHARED_DATASET
```

Add the entry above to `access` in the returned `Dataset` resource, then send the whole resource back:

```text
PUT https://bigquery.googleapis.com/bigquery/v2/projects/PROJECT/datasets/SHARED_DATASET
```

## Options / Props

### Permissions to authorize or revoke (on the shared dataset)

| Permission | Resource |
|------------|----------|
| `bigquery.datasets.get` | The dataset you are sharing |
| `bigquery.datasets.update` | The dataset you are sharing |

Predefined roles that include them: `bigquery.dataOwner` (BigQuery Data Owner), `bigquery.admin` (BigQuery Admin).

### Permissions to create or update a view in an authorized dataset

| Permission | Resource |
|------------|----------|
| `bigquery.datasets.get` | The dataset you are sharing |
| `bigquery.tables.getData` | Tables or views from the shared dataset referenced by the new view |
| `bigquery.tables.create` | The authorized dataset in which you create a view |
| `bigquery.tables.update` | The authorized dataset in which you update a view |

### Limits

| Limit | Value |
|-------|-------|
| Authorized resources in a dataset's ACL (authorized views, authorized datasets, authorized functions) | Up to 2,500 total |
| Reflection of a deleted authorized dataset in the source ACL | Up to 24 hours |

## Notes

- Authorized datasets are subject to the dataset limits in the quotas page.
- You don't need extra permissions to delete a view from an authorized dataset. `bigquery.datasets.update` on the shared dataset is not needed to create or update a view in an authorized dataset; it is reserved for managing the authorization list (authorizing a dataset, adding / removing individual authorized views).
- To query a view in an authorized dataset a user needs access to the view, not to the shared dataset.
- After deleting an authorized dataset, for up to 24 hours you can't access source data through it, and it can still appear in the source ACL and count toward limits, which can block creating new authorized datasets.
- Example from the source: `private_dataset` holds `private_table`; `public_dataset` holds the view `private_table_filtered`. Grant the user `bigquery.dataViewer` on `public_dataset`, then authorize `PROJECT.public_dataset` on `private_dataset`; direct queries on `private_table` still fail with `Access Denied`.
- Authorized datasets can be in different regions, but cross-region queries are not supported, so keep them in the same region. You can't create an authorized dataset in a secondary replica.
- `ALTER VIEW` and other view statements can apply to both regular and authorized views; verify which view you manage.
- The bq flow rewrites the whole ACL from the file: an out-of-date file overwrites later ACL changes, so re-run `bq show` just before editing.
- Omitted: Console steps. The REST `access` fragments in the source are shown here as the single JSON entry.
- Corrected from the official docs: the source writes the access entry as `"project_id"`, `"dataset_id"` and `"target_types": "VIEWS"`; in the `Dataset` resource `DatasetAccessEntry.targetTypes` is `array<string>` (`VIEWS`, `ROUTINES`) and the reference fields are `projectId` / `datasetId`.
- Source: https://docs.cloud.google.com/bigquery/docs/authorized-datasets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [authorized-views.md](./authorized-views.md)
- [dataset-access-control.md](./dataset-access-control.md)
- [access-control.md](./access-control.md)
