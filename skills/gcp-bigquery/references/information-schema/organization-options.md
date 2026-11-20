---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-organization-options
---

# ORGANIZATION_OPTIONS view

## Signature / Usage

You can query the `INFORMATION_SCHEMA.ORGANIZATION_OPTIONS` view to retrieve
real-time metadata about BigQuery organization options. This view
contains configuration options that are set at the organization level.
To view the default values for a configuration option, see [configuration
settings](https://docs.cloud.google.com/bigquery/docs/default-configuration#configuration-settings).

### Required permissions

To get organization options metadata, you need the following Identity and Access Management (IAM) permissions:

- `bigquery.config.get`

The following predefined IAM role includes the
permissions that you need in order to get organization options metadata:

- `roles/bigquery.jobUser`

For more information about granular BigQuery permissions, see
[roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.ORGANIZATION_OPTIONS` view, the query
results contain one row for each configuration option in a project, if that
option differs from the default value at the organization level.

The `INFORMATION_SCHEMA.ORGANIZATION_OPTIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| [`option_name`](#options-table) | `STRING` | One of the name values in the [options table](#options-table). |
| `option_description` | `STRING` | The option description. |
| `option_type` | `STRING` | The data type of the `option_value`. |
| `option_value` | `STRING` | The current value of the option. |

###### Options table

| `option_name` | `option_type` | `option_value` |
|---|---|---|
| `default_time_zone` | `STRING` | The default time zone for this organization. |
| `default_kms_key_name` | `STRING` | The default key name for this organization. |
| `default_query_job_timeout_ms` | `STRING` | The default query timeout in milliseconds for this organization. |
| `default_interactive_query_queue_timeout_ms` | `STRING` | The default timeout in milliseconds for queued interactive queries for this organization. |
| `default_batch_query_queue_timeout_ms` | `STRING` | The default timeout in milliseconds for queued batch queries for this organization. |
| `reusable_column_aliases_mode` | `STRING` | Whether reusable column aliases are enabled in this organization. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view contains currently running sessions and the history of sessions completed in the past 180 days.

### Scope and syntax

Queries against this view must have a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).

| View name | Resource scope | Region scope |
|---|---|---|
| `` `region-REGION`.INFORMATION_SCHEMA.ORGANIZATION_OPTIONS `` | Configuration options within the specified organization. | `REGION` |

Replace the following:

- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

<br />

### Examples

The following example retrieves the `OPTION_NAME`, `OPTION_TYPE`, and `OPTION_VALUE` columns from the `INFORMATION_SCHEMA.ORGANIZATION_OPTIONS`.

```googlesql
SELECT
  option_name, option_type, option_value
FROM
  `region-us`.INFORMATION_SCHEMA.ORGANIZATION_OPTIONS;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

<br />

```text
  +--------------------------------------------+-------------+---------------------+
  | option_name                                | option_type | option_value        |
  +--------------------------------------------+-------------+---------------------+
  | default_time_zone                          | STRING      | America/Los_Angeles |
  +--------------------------------------------+-------------+---------------------+
  | default_kms_key_name                       | STRING      | test/testkey1       |
  +--------------------------------------------+-------------+---------------------+
  | default_query_job_timeout_ms               | INT64       | 18000000            |
  +--------------------------------------------+-------------+---------------------+
  | default_interactive_query_queue_timeout_ms | INT64       | 600000              |
  +--------------------------------------------+-------------+---------------------+
  | default_batch_query_queue_timeout_ms       | INT64       | 1200000             |
  +--------------------------------------------+-------------+---------------------+

```

<br />

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-organization-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: the Data retention section says that this view contains currently running sessions and the history of sessions completed in the past 180 days. This view holds configuration option values, as its description and schema show, not sessions; the sentence appears to come from a sessions view. The page states no retention period for configuration options.
- Corrected from the official docs: the example value for `REGION` is `region-us`, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
