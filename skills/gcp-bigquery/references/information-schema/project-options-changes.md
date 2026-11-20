---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-project-options-changes
---

# PROJECT_OPTIONS_CHANGES view

## Signature / Usage

You can query the `INFORMATION_SCHEMA.PROJECT_OPTIONS_CHANGES` view to retrieve
real-time metadata about BigQuery configuration changes of a project.
This view reflects project-level configuration changes
made after January 31, 2024.

### Required permissions

To get the configuration, you need the `bigquery.config.update`
Identity and Access Management (IAM) permission at the project level. The predefined
IAM role `roles/bigquery.admin` includes the permissions that you
need to create a configuration.

For more information about granular BigQuery permissions, see
[roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.PROJECT_OPTIONS_CHANGES` view, the query
results contain one row for each configuration change in a project.

The `INFORMATION_SCHEMA.PROJECT_OPTIONS_CHANGES` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `update_time` | `TIMESTAMP` | The time the configuration change occurred. |
| `username` | `STRING` | For first-party users, it's their user email. For third-party users, it's the name that users set in the third-party identity provider. |
| `updated_options` | `JSON` | A JSON object of the configuration options users updated in the change, containing the previous and the new values of updated fields. |
| `project_id` | `STRING` | The project ID. This field is empty for organization-level configuration changes. |
| `project_number` | `INTEGER` | The project number. This field is empty for the organization-level configuration changes. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view contains sessions that are running and the history of sessions
completed in the past 180 days.

### Scope and syntax

Queries against this view must have a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).

| View name | Resource scope | Region scope |
|---|---|---|
| `` `region-REGION`.INFORMATION_SCHEMA.PROJECT_OPTIONS_CHANGES `` | Configuration changes within the specified project. | `REGION` |

Replace the following:

- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `US`, or `us-west2`.

<br />

> [!NOTE]
> **Note:** To learn how to extract a JSON scalar value from the `updated_options` column and convert it to a SQL STRING value such as `JSON_VALUE()`, see [JSON functions](../googlesql-functions/json_functions-1.md#categories).

### Examples

The following example retrieves all columns from the
`INFORMATION_SCHEMA.PROJECT_OPTIONS_CHANGES` view.

```googlesql
SELECT
  *
FROM
  `region-REGION`.INFORMATION_SCHEMA.PROJECT_OPTIONS_CHANGES;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+----------------+------------+-------------------------+-----------------+------------------------------------------------------------------------------------------------------------------+
| project_number | project_id | update_time             | username        | updated_options                                                                                                  |
|----------------|------------|-------------------------|-----------------|------------------------------------------------------------------------------------------------------------------|
| 4471534625     | myproject1 | 2023-08-22 06:57:49 UTC | user1@gmail.com | {"default_query_job_timeout_ms":{"new":0,"old":1860369},"default_time_zone":{"new":"America/New_York","old":""}} |
|----------------|------------|-------------------------|-----------------|------------------------------------------------------------------------------------------------------------------|
| 5027725474     | myproject2 | 2022-08-01 00:00:00 UTC | user2@gmail.com | {"default_interactive_query_queue_timeout_ms":{"new":1860369,"old":1860008}}                                     |
+----------------+------------+-------------------------+-----------------+------------------------------------------------------------------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-project-options-changes (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: the Data retention section says that this view contains running sessions and the history of sessions completed in the past 180 days. This view holds changes to configuration options, as its description and schema show, not sessions; the sentence appears to come from a sessions view. The page states no retention period for configuration changes.

## Related

- [Index of this directory](./README.md)
