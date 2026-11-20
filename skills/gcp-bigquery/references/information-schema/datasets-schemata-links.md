---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-datasets-schemata-links
---

# SCHEMATA_LINKS view

## Signature / Usage

The `INFORMATION_SCHEMA.SCHEMATA_LINKS` view contains one row for each [linked
dataset](https://docs.cloud.google.com/bigquery/docs/analytics-hub-introduction#linked_datasets) that is
shared using BigQuery sharing. This view also contains
individual resources, such as tables or views, in a project that is shared using
[data clean rooms](https://docs.cloud.google.com/bigquery/docs/data-clean-rooms). This view displays one row for
each individual resource in the linked dataset.

### Required permission

To query the `INFORMATION_SCHEMA.SCHEMATA_LINKS` view, you need the
`bigquery.datasets.get` Identity and Access Management (IAM) permission at the project
level.

Each of the following predefined IAM roles includes the
permissions that you need in order to query the
`INFORMATION_SCHEMA.SCHEMATA_LINKS` view:

- `roles/bigquery.admin`
- `roles/bigquery.dataEditor`
- `roles/bigquery.dataOwner`
- `roles/bigquery.dataViewer`

For more information about BigQuery permissions, see [Access
control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The `INFORMATION_SCHEMA.SCHEMATA_LINKS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `catalog_name` | `STRING` | The name of the project that contains the source dataset. |
| `schema_name` | `STRING` | The name of the source dataset. The dataset name is also referred to as the `datasetId`. |
| `linked_schema_catalog_number` | `STRING` | The project number of the project that contains the linked dataset. |
| `linked_schema_catalog_name` | `STRING` | The project name of the project that contains the linked dataset. |
| `linked_schema_name` | `STRING` | The name of the linked dataset. The dataset name is also referred to as the `datasetId`. |
| `linked_schema_creation_time` | `TIMESTAMP` | The time when the linked dataset was created. |
| `linked_schema_org_display_name` | `STRING` | The display name of the organization in which the linked dataset is created. |
| `shared_asset_id` | `STRING` | The ID of the asset that is shared using data clean rooms. This value is `null` if `link_type` is `REGULAR`. |
| `link_type` | `STRING` | The type of linked dataset. Possible values are `REGULAR` or `DCR` (Data clean rooms). |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region
qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). If you don't
specify a regional qualifier, metadata is retrieved from the US region. The
following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]INFORMATION_SCHEMA.SCHEMATA_LINKS` | Project level | US region |
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.SCHEMATA_LINKS`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

This section lists examples to query the `INFORMATION_SCHEMA.SCHEMATA_LINKS`
view.

**Example: List all linked datasets against another project**

The following example lists all the linked datasets against another project
named `otherproject` within the `EU` multi-region:

```googlesql
SELECT * FROM `otherproject`.`region-eu`.INFORMATION_SCHEMA.SCHEMATA_LINKS;
```

The output is similar to the following. Some columns are omitted to simplify the
output.

```text
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
|    catalog_name    |  schema_name    | linked_schema_catalog_name | linked_schema_catalog_number | linked_schema_name | linked_schema_org_display_name | linked_schema_creation_time | shared_asset_id | link_type |
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
|  otherproject      | source_dataset  | subscriptioproject1        |                974999999291  | linked_dataset     |  subscriptionorg1              |         2025-08-07 05:02:27 | NULL            | REGULAR   |
|  otherproject      | source_dataset1 | subscriptionproject2       |                974999999292  | test_dcr           |  subscriptionorg2              |         2025-08-07 10:08:50 | test_table      | DCR       |
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
```

**Example: List all linked datasets by a shared dataset**

The following example lists all the linked datasets by a shared dataset
named `sharedataset` in the `US` multi-region:

```googlesql
SELECT * FROM INFORMATION_SCHEMA.SCHEMATA_LINKS WHERE schema_name = 'sharedataset';
```

The output is similar to the following. Some columns are omitted to simplify the
output.

```text
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
|    catalog_name     |  schema_name   | linked_schema_catalog_name | linked_schema_catalog_number | linked_schema_name | linked_schema_org_display_name | linked_schema_creation_time | shared_asset_id | link_type |
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
|  myproject          | sharedataset   | subscriptionproject1       |                974999999291  | linked_dataset     |  subscriptionorg1              |         2025-08-07 05:02:27 | NULL            | REGULAR   |
|  myproject          | sharedataset   | subscriptionproject2       |                974999999292  | test_dcr           |  subscriptionorg2              |         2025-08-07 10:08:50 | test_table      | DCR       |
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
```

**Example: List all resources shared using a data clean room**

The following example lists all the individual resources, such as tables or
views, that are shared using a data clean room from another project named
`otherproject` within the `EU` multi-region:

```googlesql
SELECT * FROM `otherproject`.`region-eu`.INFORMATION_SCHEMA.SCHEMATA_LINKS where link_type='DCR';
```

The output is similar to the following. Some columns are omitted to simplify the
output.

```text
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
|    catalog_name     |  schema_name   | linked_schema_catalog_name | linked_schema_catalog_number | linked_schema_name | linked_schema_org_display_name | linked_schema_creation_time | shared_asset_id | link_type |
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
|  otherproject       | sharedataset1  | subscriptionproject1       |                 974999999291 | test_dcr1          |  subscriptionorg1              |         2025-08-07 05:02:27 | test_view       | DCR       |
|  otherproject       | sharedataset2  | subscriptionproject2       |                 974999999292 | test_dcr2          |  subscriptionorg2              |         2025-08-07 10:08:50 | test_table      | DCR       |
+---------------------+----------------+----------------------------+------------------------------+--------------------+--------------------------------+-----------------------------+-----------------+-----------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-datasets-schemata-links (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
