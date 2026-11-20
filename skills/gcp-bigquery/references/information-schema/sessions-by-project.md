---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-sessions-by-project
---

# SESSIONS_BY_PROJECT view

## Signature / Usage

The `INFORMATION_SCHEMA.SESSIONS_BY_PROJECT` view contains real-time
metadata about all BigQuery sessions in the current project.

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.SESSIONS` and `INFORMATION_SCHEMA.SESSIONS_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permissions

To query the `INFORMATION_SCHEMA.SESSIONS_BY_PROJECT` view, you need
the `bigquery.jobs.listAll` Identity and Access Management (IAM) permission for the project.
Each of the following predefined IAM roles includes the
required permission:

- Project Owner
- BigQuery Admin

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.SESSIONS_BY_*` views, the query results
contain one row for each BigQuery session.

The `INFORMATION_SCHEMA.SESSIONS_BY_*` view has the following schema:

> [!NOTE]
> **Note:** The underlying data is partitioned by the `creation_time` column and clustered by `project_id` and `user_email`.

| Column name | Data type | Value |
|---|---|---|
| `creation_time` | `TIMESTAMP` | (*Partitioning column*) Creation time of this session. Partitioning is based on the UTC time of this timestamp. |
| `expiration_time` | `TIMESTAMP` | (*Partitioning column*) Expiration time of this session. Partitioning is based on the UTC time of this timestamp. |
| `folder_numbers` | `ARRAY<INT64>` | IDs of the folders in the hierarchy that contains the project, ordered from lowest to highest in the hierarchy. |
| `is_active` | `BOOL` | Is the session is still active? `TRUE` if yes, otherwise `FALSE`. |
| `last_modified_time` | `TIMESTAMP` | (*Partitioning column*) Time when the session was last modified. Partitioning is based on the UTC time of this timestamp. |
| `principal_subject` | `STRING` | Identifier for the principal who ran the session. Formatted as `user:USER_EMAIL` for Google Account users, `serviceAccount:SA_EMAIL` for service accounts, or a principal identifier starting with `principal://` for [Workforce Identity Federation](https://docs.cloud.google.com/iam/docs/workforce-identity-federation) and [Workload Identity Federation](https://docs.cloud.google.com/iam/docs/workload-identity-federation) principals. |
| `project_id` | `STRING` | (*Clustering column*) ID of the project. |
| `project_number` | `INTEGER` | Number of the project. |
| `session_id` | `STRING` | ID of the session. For example, `bquxsession_1234`. |
| `user_email` | `STRING` | (*Clustering column*) Email address or service account of the user who ran the session. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view contains currently running sessions and the history of sessions
completed in the past 180 days.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you do not specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.SESSIONS_BY_PROJECT`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.SESSIONS_BY_PROJECT
```
For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.SESSIONS_BY_PROJECT ``. The following example lists all users or service accounts that created sessions for a given project within the last day:

<br />

```googlesql
SELECT
  DISTINCT(user_email) AS user
FROM
  `region-us`.INFORMATION_SCHEMA.SESSIONS_BY_PROJECT
WHERE
  is_active = true
  AND creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY);
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+--------------+
| user         |
+--------------+
| abc@xyz.com  |
+--------------+
| def@xyz.com  |
+--------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-sessions-by-project (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
