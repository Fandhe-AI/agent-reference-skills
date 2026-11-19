---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-constraint-column-usage
---

# CONSTRAINT_COLUMN_USAGE view

## Signature / Usage

The `CONSTRAINT_COLUMN_USAGE` view contains all columns used by
[constraints](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys).
For `PRIMARY KEY` constraints, these are the columns from
the `KEY_COLUMN_USAGE` view. For `FOREIGN KEY` constraints, these are the columns
of the referenced tables.

### Required roles

To get the permissions that
you need to query the `INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE` view,

ask your administrator to grant you the
[BigQuery Data Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataEditor) (`roles/bigquery.dataEditor`) IAM role on your project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains

the permissions required to query the `INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE` view. To see the exact permissions that are
required, expand the **Required permissions** section:

##### Required permissions

The following permissions are required to query the `INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE` view:

- Viewing primary and foreign key definitions: `bigquery.tables.get`
- Viewing table information schemas: `bigquery.tables.list`

You might also be able to get
these permissions
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

For more information about IAM roles and permissions in
BigQuery, see
[Predefined roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The `INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE` view has the following schema:

| Column Name | Data type | Value |
|---|---|---|
| ` table_catalog ` | ` STRING ` | The name of the project that contains the dataset. |
| ` table_schema ` | ` STRING ` | The name of the dataset that contains the table. Also referred to as the `datasetId`. |
| ` table_name ` | ` STRING ` | The name of the table. Also referred to as the `tableId`. |
| ` column_name ` | ` STRING ` | The column name. |
| ` constraint_catalog ` | ` STRING ` | The constraint project name. |
| ` constraint_schema ` | ` STRING ` | The constraint dataset name. |
| ` constraint_name ` | ` STRING ` | The constraint name. It can be the name of the primary key if the column is used by the primary key or the name of foreign key if the column is used by a foreign key. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a dataset qualifier. For queries with a
dataset qualifier, you must have permissions for the dataset. For more
information see
[Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table shows the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]DATASET.INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE;` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.

<br />

### Examples

The following query shows the constraints for a single table in a dataset:

```googlesql
SELECT *
FROM PROJECT_ID.DATASET.INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE
WHERE table_name = TABLE;
```

Replace the following:

- `PROJECT_ID`: Optional. The name of your cloud project. If not specified, this command uses the default project.
- `DATASET`: The name of your dataset.
- `TABLE`: The name of the table.

Conversely, the following query shows the constraints for all tables in a single dataset.

```googlesql
SELECT *
FROM PROJECT_ID.DATASET.INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE;
```

With existing constraints, the query results are similar to the following:

```text
+-----+---------------------+--------------+------------+-------------+---------------------+-------------------+-------------------------+
| row |    table_catalog    | table_schema | table_name | column_name | constraint_catalog  | constraint_schema |     constraint_name     |
+-----+---------------------+--------------+------------+-------------+---------------------+-------------------+-------------------------+
|   1 | myConstraintCatalog | myDataset    | orders     | o_okey      | myConstraintCatalog | myDataset         | orders.pk$              |
|   2 | myConstraintCatalog | myDataset    | orders     | o_okey      | myConstraintCatalog | myDataset         | lineitem.lineitem_order |
+-----+---------------------+--------------+------------+-------------+---------------------+-------------------+-------------------------+
```

> [!NOTE]
> **Note:** `lineitem.lineitem_order` is the foreign key defined in the `lineitem` table.

If the table or dataset has no constraints, the query results look like this:

```text
+-----------------------------+
| There is no data to display |
+-----------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-constraint-column-usage (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
