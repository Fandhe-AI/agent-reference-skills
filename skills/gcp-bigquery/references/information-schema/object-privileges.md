---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-object-privileges
---

# OBJECT_PRIVILEGES view

## Signature / Usage

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

The `INFORMATION_SCHEMA.OBJECT_PRIVILEGES` view contains metadata about access
control bindings that are explicitly set on BigQuery objects.
This view does not contain metadata about the inherited access control bindings.

### Required permissions

To query the `INFORMATION_SCHEMA.OBJECT_PRIVILEGES` view, you need following
Identity and Access Management (IAM) permissions:

- `bigquery.datasets.get` for datasets.
- `bigquery.tables.getIamPolicy` for tables and views.

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.OBJECT_PRIVILEGES` view, the query
results contain one row for each access control binding for a resource.

The `INFORMATION_SCHEMA.OBJECT_PRIVILEGES` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `object_catalog` | `STRING` | The project ID of the project that contains the resource. |
| `object_schema` | `STRING` | The name of the dataset that contains the resource. This is `NULL` if the resource itself is a dataset. |
| `object_name` | `STRING` | The name of the table, view, or dataset the policy applies to. |
| `object_type` | `STRING` | The resource type, such as `SCHEMA` (dataset), `TABLE`, `VIEW`, and `EXTERNAL`. |
| `privilege_type` | `STRING` | The role ID, such as `roles/bigquery.dataEditor`. |
| `grantee` | `STRING` | The user type and user that the role is granted to. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
A project ID is optional. If no project ID is specified, then the project that
the query runs in is used. The following table explains the region scope for
this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.OBJECT_PRIVILEGES`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

```sql
-- Returns metadata for the access control bindings for mydataset.
SELECT * FROM myproject.`region-us`.INFORMATION_SCHEMA.OBJECT_PRIVILEGES
WHERE object_name = "mydataset";
```

### Limitations

- `OBJECT_PRIVILEGES` queries must contain a `WHERE` clause limiting queries to a single dataset, table, or view.
- Queries to retrieve access control metadata for a dataset must specify the `object_name`.
- Queries to retrieve access control metadata for a table or view must specify both `object_name` AND `object_schema`.

### Examples

The following example retrieves all columns from the
`INFORMATION_SCHEMA.OBJECT_PRIVILEGES` view.

To run the query against a project other than the project that the query is
running in, add the project ID to the region in the following format:
`` `project_id`.`region_id`.INFORMATION_SCHEMA.OBJECT_PRIVILEGES ``.

The following example gets all access control metadata for the `mydataset` dataset
in the `mycompany` project:

```sql
SELECT *
FROM mycompany.`region-us`.INFORMATION_SCHEMA.OBJECT_PRIVILEGES
WHERE object_name = "mydataset"
```

The results should look like the following:

<br />

```text
  +----------------+---------------+-------------+-------------+---------------------------+-----------------------------------+
  | object_catalog | object_schema | object_name | object_type |  privilege_type           | grantee                           |
  +----------------+---------------+-------------+-------------+---------------------------+-----------------------------------+
  | mycompany      | NULL          | mydataset   | SCHEMA      | roles/bigquery.dataEditor | projectEditor:mycompany           |
  +----------------+---------------+-------------+-------------+---------------------------+-----------------------------------+
  | mycompany      | NULL          | mydataset   | SCHEMA      | roles/bigquery.dataOwner  | projectOwner:mycompany            |
  +----------------+---------------+-------------+-------------+---------------------------+-----------------------------------+
  | mycompany      | NULL          | mydataset   | SCHEMA      | roles/bigquery.dataOwner  | user:cloudysanfrancisco@gmail.com |
  +----------------+---------------+-------------+-------------+---------------------------+-----------------------------------+
  | mycompany      | NULL          | mydataset   | SCHEMA      | roles/bigquery.dataViwer  | projectViewer:mycompany           |
  +----------------+---------------+-------------+-------------+---------------------------+-----------------------------------+

```

<br />

The following example gets all access control information for the `testdata` table
in the `mydataset` dataset:

```sql
SELECT *
FROM mycompany.`region-us`.INFORMATION_SCHEMA.OBJECT_PRIVILEGES
WHERE object_schema = "mydataset" AND object_name = "testdata"
```

The results should look like the following:

<br />

```text
  +----------------+---------------+--------------+-------------+----------------------+------------------------------------+
  | object_catalog | object_schema |  object_name | object_type |  privilege_type      | grantee                            |
  +----------------+---------------+--------------+-------------+----------------------+------------------------------------+
  | mycompany      | mydataset     | testdata     | TABLE       | roles/bigquery.admin | user:baklavainthebalkans@gmail.com |
  +----------------+---------------+--------------+-------------+----------------------+------------------------------------+

```

<br />

The `INFORMATION_SCHEMA.OBJECT_PRIVILEGES` view only shows access control
bindings that are explicitly set. The first example shows that the user
`cloudysanfrancisco@gmail.com`
has the `bigquery.dataOwner` role on the `mydataset` dataset. The user
`cloudysanfrancisco@gmail.com` inherits permissions to create, update, and
delete tables in `mydataset`, including the `testdata` table. However, since
those permissions were not explicitly granted on the `testdata` table, they
don't appear in the results of the second example.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-object-privileges (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
