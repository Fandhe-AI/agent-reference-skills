---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-key-column-usage
---

# KEY_COLUMN_USAGE view

## Signature / Usage

The `KEY_COLUMN_USAGE` view contains columns of the tables from
`TABLE_CONSTRAINTS` that are constrained as keys by
[primary and foreign key](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys) constraints.

### Required roles

To get the permissions that
you need to query the `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` view,

ask your administrator to grant you the
[BigQuery Data Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataEditor) (`roles/bigquery.dataEditor`) IAM role on your project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains

the permissions required to query the `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` view. To see the exact permissions that are
required, expand the **Required permissions** section:

##### Required permissions

The following permissions are required to query the `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` view:

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

The `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` view has the following schema:

| Column Name | Data Type | Value |
|---|---|---|
| ` constraint_catalog ` | ` STRING ` | The constraint project name. |
| ` constraint_schema ` | ` STRING ` | The constraint dataset name. |
| ` constraint_name ` | ` STRING ` | The constraint name. |
| ` table_catalog ` | ` STRING ` | The project name of the constrained table. |
| ` table_schema ` | ` STRING ` | The name of the constrained table dataset. |
| ` table_name ` | ` STRING ` | The name of the constrained table. |
| ` column_name ` | ` STRING ` | The name of the constrained column. |
| ` ordinal_position ` | ` INT64 ` | The ordinal position of the column within the constraint key (starting at 1). |
| ` position_in_unique_constraint ` | ` INT64 ` | For foreign keys, the ordinal position of the column within the primary key constraint (starting at 1). This value is `NULL` for primary key constraints. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a dataset qualifier. For queries with a
dataset qualifier, you must have permissions for the dataset. For more
information, see
[Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table shows the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.KEY_COLUMN_USAGE;` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.

<br />

For queries with a dataset qualifier, you must have permissions for the dataset.
For queries with a region qualifier, you must have permissions for the project.

### Examples

###### Example 1:

The following query shows the constraints for a single table in a dataset:

Adapted (not in the official docs): enclosed the `TABLE` placeholder in quotes, so that the table name is compared as a string.

```googlesql
SELECT *
FROM PROJECT_ID.DATASET.INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE table_name = 'TABLE';
```

Replace the following:

- `PROJECT_ID`: Optional. The name of your cloud project. If not specified, this command uses the default project.
- `DATASET`: The name of your dataset.
- `TABLE`: The name of the table.

Conversely, the following query shows the key columns usage for all tables in a single dataset.

```googlesql
SELECT *
FROM PROJECT_ID.DATASET.INFORMATION_SCHEMA.KEY_COLUMN_USAGE;
```

If a table or a dataset has no constraints, the query results look like this:

```text
+-----------------------------+
| There is no data to display |
+-----------------------------+
```

###### Example 2:

The following DDL statements create a primary key table and a foreign key table.

```googlesql
CREATE TABLE composite_pk (x int64, y string, primary key (x, y) NOT ENFORCED);
```

Adapted (not in the official docs): The doubled keyword `table` is removed from the `CREATE TABLE` statement.

```googlesql
CREATE TABLE composite_fk (x int64, y string, z string,  primary key (x, y)
NOT ENFORCED, CONSTRAINT composite_fk foreign key (z, x)
REFERENCES composite_pk (y, x) NOT ENFORCED);
```

If queried with the statement in [Example 1](#example-1), the query results
are similar to the following. Note that `CONSTRAINT_CATALOG`,
`CONSTRAINT_SCHEMA`, and duplicate columns are not included in the example results.

```text
+---------------------------+--------------+-------------+------------------+-------------------------------+
|     CONSTRAINT_NAME       |  TABLE_NAME  | COLUMN_NAME | ORDINAL_POSITION | POSITION_IN_UNIQUE_CONSTRAINT |
+---------------------------+--------------+-------------+------------------+-------------------------------+
| composite_pk.pk$          | composite_pk | x           | 1                | NULL                          |
| composite_pk.pk$          | composite_pk | y           | 2                | NULL                          |
| composite_fk.pk$          | composite_fk | x           | 1                | NULL                          |
| composite_fk.pk$          | composite_fk | y           | 2                | NULL                          |
| composite_fk.composite_fk | composite_fk | z           | 1                | 2                             |
| composite_fk.composite_fk | composite_fk | x           | 2                | 1                             |
+---------------------------+--------------+-------------+------------------+-------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-key-column-usage (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The foreign key DDL read `CREATE TABLE table composite_fk (...)`, which repeats the `table` keyword. It is now `CREATE TABLE composite_fk (...)`, like the primary key statement above it.
- Corrected from the official docs: the single-table example compares `table_name` with the unquoted placeholder `TABLE`. `table_name` is a `STRING` column, and an unquoted table name such as `orders` is read as a column name, so the query fails. The placeholder is enclosed in quotes (`'TABLE'`).

## Related

- [Index of this directory](./README.md)
