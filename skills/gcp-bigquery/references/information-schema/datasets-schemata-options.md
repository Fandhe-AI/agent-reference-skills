---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-datasets-schemata-options
---

# SCHEMATA_OPTIONS view

## Signature / Usage

The `INFORMATION_SCHEMA.SCHEMATA_OPTIONS` view contains one row for each option
that is set in each dataset in a project.

### Before you begin

To query the `SCHEMATA_OPTIONS`
view for dataset metadata, you need the `bigquery.datasets.get`
Identity and Access Management (IAM) permission at the project level.

Each of the following predefined IAM roles includes the
permissions that you need in order to get the `SCHEMATA_OPTIONS` view:

- `roles/bigquery.admin`
- `roles/bigquery.dataEditor`
- `roles/bigquery.dataOwner`
- `roles/bigquery.dataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.SCHEMATA_OPTIONS` view, the query results contain one row for each option that is set in each dataset in a project.

<br />

The `INFORMATION_SCHEMA.SCHEMATA_OPTIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `catalog_name` | `STRING` | The name of the project that contains the dataset |
| `schema_name` | `STRING` | The name of the dataset, also referred to as the `datasetId` |
| `option_name` | `STRING` | The name of the option. For a list of supported options, see the [schema options list](../googlesql-syntax/data-definition-language-1.md#schema_option_list). The `storage_billing_model` option is only displayed for datasets that have been updated after December 1, 2022. For datasets that were last updated before that date, the storage billing model is `LOGICAL`. |
| `option_type` | `STRING` | The data type of the option |
| `option_value` | `STRING` | The value of the option |

<br />

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region
qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). If you do not
specify a regional qualifier, metadata is retrieved from the US region.
The following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]INFORMATION_SCHEMA.SCHEMATA_OPTIONS` | Project level | US region |
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.SCHEMATA_OPTIONS`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

```sql
-- Returns metadata for datasets in a region.
SELECT * FROM region-us.INFORMATION_SCHEMA.SCHEMATA_OPTIONS;
```

### Examples

##### Retrieve the default table expiration time for all datasets in your project

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:

```bash
`PROJECT_ID`.INFORMATION_SCHEMA.SCHEMATA_OPTIONS
```
for example, `` `myproject`.INFORMATION_SCHEMA.SCHEMATA_OPTIONS ``.

<br />

```googlesql
SELECT
  *
FROM
  INFORMATION_SCHEMA.SCHEMATA_OPTIONS
WHERE
  option_name = 'default_table_expiration_days';
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

<br />

```text
  +----------------+---------------+-------------------------------+-------------+---------------------+
  |  catalog_name  |  schema_name  |          option_name          | option_type |    option_value     |
  +----------------+---------------+-------------------------------+-------------+---------------------+
  | myproject      | mydataset3    | default_table_expiration_days | FLOAT64     | 0.08333333333333333 |
  | myproject      | mydataset2    | default_table_expiration_days | FLOAT64     | 90.0                |
  | myproject      | mydataset1    | default_table_expiration_days | FLOAT64     | 30.0                |
  +----------------+---------------+-------------------------------+-------------+---------------------+

```

<br />

> [!NOTE]
> **Note:** `0.08333333333333333` is the floating point representation of 2 hours.

##### Retrieve labels for all datasets in your project

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:

```bash
`PROJECT_ID`.INFORMATION_SCHEMA.SCHEMATA_OPTIONS
```
; for example, `` `myproject`.INFORMATION_SCHEMA.SCHEMATA_OPTIONS ``.

<br />

```googlesql
SELECT
  *
FROM
  INFORMATION_SCHEMA.SCHEMATA_OPTIONS
WHERE
  option_name = 'labels';
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

<br />

```text
  +----------------+---------------+-------------+---------------------------------+------------------------+
  |  catalog_name  |  schema_name  | option_name |          option_type            |      option_value      |
  +----------------+---------------+-------------+---------------------------------+------------------------+
  | myproject      | mydataset1    | labels      | ARRAY<STRUCT<STRING, STRING>>   | [STRUCT("org", "dev")] |
  | myproject      | mydataset2    | labels      | ARRAY<STRUCT<STRING, STRING>>   | [STRUCT("org", "dev")] |
  +----------------+---------------+-------------+---------------------------------+------------------------+

```

<br />

> [!NOTE]
> **Note:** Datasets without labels are excluded from the query results.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-datasets-schemata-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
