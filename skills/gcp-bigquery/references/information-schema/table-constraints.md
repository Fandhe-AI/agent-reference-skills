---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-constraints
---

# TABLE_CONSTRAINTS view

## Signature / Usage

The `TABLE_CONSTRAINTS` view contains [the primary and foreign key](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys)
relations in a BigQuery dataset.

### Required permissions

You need the following
[Identity and Access Management (IAM) permissions](https://docs.cloud.google.com/iam/docs/overview):

- `bigquery.tables.get` for viewing primary and foreign key definitions.
- `bigquery.tables.list` for viewing table information schemas.

Each of the following
[predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined)
has the needed permissions to perform the workflows detailed in this document:

- `roles/bigquery.dataEditor`
- `roles/bigquery.dataOwner`
- `roles/bigquery.admin`

> [!NOTE]
> **Note:** Roles are presented in ascending order of permissions granted. We recommend that you use predefined roles from earlier in the list to not allocate excess permissions.

For more information about IAM roles and permissions in
BigQuery, see
[Predefined roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The `INFORMATION_SCHEMA.TABLE_CONSTRAINTS` view has the following schema:

| Column Name | Type | Meaning |
|---|---|---|
| ` constraint_catalog ` | ` STRING ` | The constraint project name. |
| ` constraint_schema ` | ` STRING ` | The constraint dataset name. |
| ` constraint_name ` | ` STRING ` | The constraint name. |
| ` table_catalog ` | ` STRING ` | The constrained table project name. |
| ` table_schema ` | ` STRING ` | The constrained table dataset name. |
| ` table_name ` | ` STRING ` | The constrained table name. |
| ` constraint_type ` | ` STRING ` | Either `PRIMARY KEY` or `FOREIGN KEY`. |
| ` is_deferrable ` | ` STRING ` | `YES` or `NO` depending on if a constraint is deferrable. Only `NO` is supported. |
| ` initially_deferred ` | ` STRING ` | Only `NO` is supported. |
| ` enforced ` | ` STRING ` | `YES` or `NO` depending on if the constraint is enforced. Only `NO` is supported. |

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
| `[PROJECT_ID.]DATASET.INFORMATION_SCHEMA.TABLE_CONSTRAINTS;` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.

<br />

### Examples

The following query shows the constraints for a single table in a dataset:

Adapted (not in the official docs): enclosed the `TABLE` placeholder in quotes, so that the table name is compared as a string.

```googlesql
SELECT *
FROM PROJECT_ID.DATASET.INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE table_name = 'TABLE';
```

Replace the following:

- `PROJECT_ID`: Optional. The name of your cloud project. If not specified, this command uses the default project.
- `DATASET`: The name of your dataset.
- `TABLE`: The name of the table.

Conversely, the following query shows the constraints for all tables in a
single dataset.

```googlesql
SELECT *
FROM PROJECT_ID.DATASET.INFORMATION_SCHEMA.TABLE_CONSTRAINTS;
```

With existing constraints, the query results are similar to the following:

```text
+-----+---------------------+-------------------+-----------------------+---------------------+--------------+------------+-----------------+---------------+--------------------+----------+
| Row | constraint_catalog  | constraint_schema |    constraint_name    |    table_catalog    | table_schema | table_name | constraint_type | is_deferrable | initially_deferred | enforced |
+-----+---------------------+-------------------+-----------------------+---------------------+--------------+------------+-----------------+---------------+--------------------+----------+
|   1 | myConstraintCatalog | myDataset         | orders.pk$            | myConstraintCatalog | myDataset    | orders     | PRIMARY KEY     | NO            | NO                 | NO       |
|   2 | myConstraintCatalog | myDataset         | orders.order_customer | myConstraintCatalog | myDataset    | orders     | FOREIGN KEY     | NO            | NO                 | NO       |
+-----+---------------------+-------------------+-----------------------+---------------------+--------------+------------+-----------------+---------------+--------------------+----------+
```

If the table or dataset has no constraints, the query results look like this:

```text
+-----------------------------+
| There is no data to display |
+-----------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-constraints (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the single-table example compares `table_name` with the unquoted placeholder `TABLE`. `table_name` is a `STRING` column, and an unquoted table name such as `orders` is read as a column name, so the query fails. The placeholder is enclosed in quotes (`'TABLE'`).

## Related

- [Index of this directory](./README.md)
