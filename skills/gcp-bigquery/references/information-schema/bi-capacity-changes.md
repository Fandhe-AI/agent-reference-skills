---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-bi-capacity-changes
---

# INFORMATION_SCHEMA.BI_CAPACITY_CHANGES view

## Signature / Usage

The `INFORMATION_SCHEMA.BI_CAPACITY_CHANGES` view contains history of changes
to the BI Engine capacity. If you want to view the current state
of BI Engine reservation, see the
[`INFORMATION_SCHEMA.BI_CAPACITIES` view](bi-capacities.md).

### Required permission

To query the `INFORMATION_SCHEMA.BI_CAPACITY_CHANGES` view, you need the
`bigquery.bireservations.get` Identity and Access Management (IAM) permission for
BI Engine reservations.

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.BI_CAPACITY_CHANGES` view, the query
results contain one row for each update of BI Engine capacity,
including the current state.

The `INFORMATION_SCHEMA.BI_CAPACITY_CHANGES` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `change_timestamp` | `TIMESTAMP` | Timestamp when the current update to BI Engine capacity was made. |
| `project_id` | `STRING` | The project ID of the project that contains BI Engine capacity. |
| `project_number` | `INTEGER` | The project number of the project that contains BI Engine capacity. |
| `bi_capacity_name` | `STRING` | The name of the object. There can only be one capacity per project, hence the name is always `default`. |
| `size` | `INTEGER` | BI Engine RAM in bytes. |
| `user_email` | `STRING` | Email address of the user or subject of the [workforce identity federation](https://docs.cloud.google.com/iam/docs/workforce-identity-federation) that made the change. `google` for changes made by Google. `NULL` if the email address is unknown. |
| `preferred_tables` | `REPEATED STRING` | The set of preferred tables this BI Engine capacity must be used for. If set to `null`, BI Engine capacity is used for all queries in the current project. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Syntax

Queries against this view must include a
[region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). A project ID
is optional. If no project ID is specified, the project that the query runs
in is used.

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.BI_CAPACITY_CHANGES`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

```sql
-- Returns the history of BI Engine capacity.
SELECT * FROM myproject.`region-us`.INFORMATION_SCHEMA.BI_CAPACITY_CHANGES;
```

### Examples

The following example retrieves the current BI Engine capacity
changes from the `INFORMATION_SCHEMA.BI_CAPACITY_CHANGES` view.

To run the query against a project other than the project that the query is
running in, add the project ID to the region in the following format:
`` `project_id`.`region_id`.INFORMATION_SCHEMA.BI_CAPACITY_CHANGES ``.

The following example gets all changes made to BI Engine capacity
by a user with email `email@mycompanymail.com`:

```sql
SELECT *
FROM `my-project-id.region-us`.INFORMATION_SCHEMA.BI_CAPACITY_CHANGES
WHERE user_email = "email@mycompanymail.com"
```

The result looks similar to the following:

<br />

```text
  +---------------------+---------------+----------------+------------------+--------------+---------------------+----------------------------------------------------------------------------------------+
  |  change_timestamp   |  project_id   | project_number | bi_capacity_name |     size     |     user_email      |                                               preferred_tables                         |
  +---------------------+---------------+----------------+------------------+--------------+---------------------+----------------------------------------------------------------------------------------+
  | 2022-06-14 02:22:18 | my-project-id |   123456789000 | default          | 268435456000 | email@mycompany.com | ["my-project-id.dataset1.table1","bigquery-public-data.chicago_taxi_trips.taxi_trips"] |
  | 2022-06-08 20:25:51 | my-project-id |   123456789000 | default          | 268435456000 | email@mycompany.com | ["bigquery-public-data.chicago_taxi_trips.taxi_trips"]                                 |
  | 2022-04-01 21:06:49 | my-project-id |   123456789000 | default          | 161061273600 | email@mycompany.com | [""]                                                                                   |
  +---------------------+---------------+----------------+------------------+--------------+---------------------+----------------------------------------------------------------------------------------+

```

<br />

The following example gets BI Engine capacity changes for the last
seven days:

```sql
SELECT
  change_timestamp,
  size,
  user_email,
  preferred_tables
FROM `my-project-id.region-us`.INFORMATION_SCHEMA.BI_CAPACITY_CHANGES
WHERE change_timestamp > TIMESTAMP_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
```

The result looks similar to the following:

<br />

```text
  +---------------------+--------------+----------------------+-------------------+
  |  change_timestamp   |     size     |     user_email       |  preferred_tables |                                                                                    |
  +---------------------+--------------+----------------------+-------------------+
  | 2023-07-08 18:25:09 | 268435456000 | sundar@mycompany.com | [""]              |
  | 2023-07-09 17:47:26 | 161061273600 | pichai@mycompany.com | ["pr.dataset.t1"] |
  +---------------------+--------------+----------------------+-------------------+

```

<br />

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-bi-capacity-changes (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
