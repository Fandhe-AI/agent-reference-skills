---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-bi-capacities
---

# INFORMATION_SCHEMA.BI_CAPACITIES view

## Signature / Usage

The `INFORMATION_SCHEMA.BI_CAPACITIES` view contains metadata about the current
state of BI Engine capacity. If you want to view the history
of changes to BI Engine reservation, see the
[`INFORMATION_SCHEMA.BI_CAPACITY_CHANGES` view](bi-capacity-changes.md).

### Required permission

To query the `INFORMATION_SCHEMA.BI_CAPACITIES` view, you need the
`bigquery.bireservations.get` Identity and Access Management (IAM) permission for
BI Engine reservations.

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.BI_CAPACITIES` view, the query results
contain one row with current state of BI Engine capacity.

The `INFORMATION_SCHEMA.BI_CAPACITIES` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `project_id` | `STRING` | The project ID of the project that contains BI Engine capacity. |
| `project_number` | `INTEGER` | The project number of the project that contains BI Engine capacity. |
| `bi_capacity_name` | `STRING` | The name of the object. There can only be one capacity per project, hence the name is always set to `default`. |
| `size` | `INTEGER` | BI Engine RAM in bytes |
| `preferred_tables` | `REPEATED STRING` | Set of preferred tables this BI Engine capacity must be used for. If set to `null`, BI Engine capacity is used for all queries in the current project |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a
[region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). A project ID
is optional. If no project ID is specified, the project that the query runs
in is used.

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.BI_CAPACITIES`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

```googlesql
-- Returns current state of BI Engine capacity.
SELECT * FROM myproject.`region-us`.INFORMATION_SCHEMA.BI_CAPACITIES;
```

### Examples

The following example retrieves current BI Engine capacity changes from
`INFORMATION_SCHEMA.BI_CAPACITIES` view.

To run the query against a project other than the project that the query is
running in, add the project ID to the region in the following format:
`` `project_id`.`region_id`.INFORMATION_SCHEMA.BI_CAPACITIES ``.

The following example shows the current state of BI Engine in the
project with id 'my-project-id':

```googlesql
SELECT *
FROM `my-project-id.region-us`.INFORMATION_SCHEMA.BI_CAPACITIES
```

The result looks similar to the following:

<br />

```text
  +---------------+----------------+------------------+--------------+-----------------------------------------------------------------------------------------------+
  |  project_id   | project_number | bi_capacity_name |     size     |                                               preferred_tables                                |
  +---------------+----------------+------------------+--------------+-----------------------------------------------------------------------------------------------+
  | my-project-id |   123456789000 | default          | 268435456000 | "my-company-project-id.dataset1.table1","bigquery-public-data.chicago_taxi_trips.taxi_trips"] |
  +---------------+----------------+------------------+--------------+-----------------------------------------------------------------------------------------------+

```

<br />

The following example returns size of BI Engine capacity in
gigabytes for the query project:

```googlesql
SELECT
  project_id,
  size/1024.0/1024.0/1024.0 AS size_gb
FROM `region-us`.INFORMATION_SCHEMA.BI_CAPACITIES
```

The result looks similar to the following:

<br />

```text
  +---------------+---------+
  |  project_id   | size_gb |
  +---------------+---------+
  | my-project-id |  250.0  |
  +---------------+---------+

```

<br />

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-bi-capacities (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
