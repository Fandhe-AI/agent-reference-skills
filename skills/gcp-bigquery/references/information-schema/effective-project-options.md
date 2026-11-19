---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-effective-project-options
---

# EFFECTIVE_PROJECT_OPTIONS view

## Signature / Usage

You can query the `INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS` view to
retrieve real-time metadata about BigQuery effective project options.
This view contains configuration options that are set at the organization or
project level. If the same configuration option is set at both the organization
and project level, the project configuration value is shown. To view the default
values for a configuration option, see [configuration
settings](https://docs.cloud.google.com/bigquery/docs/default-configuration#configuration-settings).

### Required permissions

To get effective project options metadata, you need the `bigquery.config.get`
Identity and Access Management (IAM) permission.

The following predefined IAM role includes the
permissions that you need in order to get effective project options metadata:

- `roles/bigquery.jobUser`

For more information about granular BigQuery permissions, see
[roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS` view, the query results contain one row for each configuration in a project.

The `INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `project_id` | `STRING` | The ID of the project. |
| `project_number` | `INTEGER` | Number of the project. |
| [`option_name`](#options-table) | `STRING` | Option ID for the specified configuration setting. |
| `option_description` | `STRING` | The option description. |
| `option_type` | `STRING` | The data type of the `OPTION_VALUE`. |
| `option_set_level` | `STRING` | The level in the hierarchy at which the setting is defined, with possible values of `DEFAULT`, `ORGANIZATION`, or `PROJECTS`. |
| `option_set_on_id` | `STRING` | Set value based on value of `option_set_level`: - If `DEFAULT`, set to `null`. - If `ORGANIZATION`, set to `""`. - If `PROJECT`, set to `ID`. |
| `option_value` | `STRING` | The current value of the option. |

###### Options table

| `option_name` | `option_type` | `option_value` |
|---|---|---|
| `default_time_zone` | `STRING` | The effective default time zone for this project. |
| `default_kms_key_name` | `STRING` | The effective default key name for this project. |
| `default_query_job_timeout_ms` | `INT64` | The effective default query timeout in milliseconds for this project. |
| `default_interactive_query_queue_timeout_ms` | `STRING` | The effective default timeout in milliseconds for queued interactive queries for this project. |
| `default_batch_query_queue_timeout_ms` | `STRING` | The effective default timeout in milliseconds for queued batch queries for this project. |
| `enable_reservation_based_fairness` | `BOOL` | Use reservation-based fairness as opposed to project-based fairness. |
| `reusable_column_aliases_mode` | `STRING` | Whether reusable column aliases are enabled in this project. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view contains currently running sessions and the history of sessions completed in the past 180 days.

### Scope and syntax

Queries against this view must have a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).

| View name | Resource scope | Region scope |
|---|---|---|
| `` `region-REGION`.INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS `` | Configuration options within the specified project. | `REGION` |

Replace the following:

- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `region-us`.

<br />

### Examples

The following example retrieves the `OPTION_NAME`, `OPTION_TYPE`, `OPTION_VALUE`, `OPTION_SET_LEVEL`, and `OPTION_SET_ON_ID` columns from the `INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS` view.

```googlesql
SELECT
  option_name, option_type, option_value, option_set_level, option_set_on_id
FROM
  `region-REGION`.INFORMATION_SCHEMA.EFFECTIVE_PROJECT_OPTIONS;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

<br />

```text
  +--------------------------------------------+-------------+---------------------+------------------+--------------------+
  | option_name                                | option_type | option_value        | option_set_level | option_set_on_id   |
  +--------------------------------------------+-------------+---------------------+------------------+--------------------+
  | default_time_zone                          | STRING      | America/Los_Angeles | organizations    | my_organization_id |
  +--------------------------------------------+-------------+---------------------+------------------+--------------------+
  | default_kms_key_name                       | STRING      | test/testkey1       | projects         | my_project_id      |
  +--------------------------------------------+-------------+---------------------+------------------+--------------------+
  | default_query_job_timeout_ms               | INT64       | 18000000            | projects         | my_project_id      |
  +--------------------------------------------+-------------+---------------------+------------------+--------------------+
  | default_interactive_query_queue_timeout_ms | INT64       | 600000              | organization     | my_organization_id |
  +--------------------------------------------+-------------+---------------------+------------------+--------------------+
  | default_batch_query_queue_timeout_ms       | INT64       | 1200000             | projects         | my_project_id      |
  +--------------------------------------------+-------------+---------------------+------------------+--------------------+

```

<br />

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-effective-project-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
