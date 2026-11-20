---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-streaming-by-organization
---

# STREAMING_TIMELINE_BY_ORGANIZATION view

## Signature / Usage

The `INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION` view contains per
minute aggregated streaming statistics for the whole organization associated
with the current project.

You can query the `INFORMATION_SCHEMA` streaming views
to retrieve historical and real-time information about streaming data into
BigQuery that uses the
[BigQuery Storage Write API (REST)](https://docs.cloud.google.com/bigquery/docs/streaming-data-into-bigquery). For more
information about streaming data into BigQuery, see
[Streaming data into BigQuery](https://docs.cloud.google.com/bigquery/docs/streaming-data-into-bigquery).

### Required permission

To query the `INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION` view, you need
the `bigquery.tables.list` Identity and Access Management (IAM) permission for the
organization.

Each of the following predefined IAM roles includes the required
permission:

- `roles/bigquery.admin`
- `roles/bigquery.user`
- `roles/bigquery.dataViewer`
- `roles/bigquery.dataEditor`
- `roles/bigquery.dataOwner`
- `roles/bigquery.metadataViewer`
- `roles/bigquery.resourceAdmin`

> [!CAUTION]
> **Caution:** The required \`bigquery.tables.list\` permission is *not* included in the [basic roles](https://docs.cloud.google.com/bigquery/docs/access-control-basic-roles) Owner or Editor.

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA` streaming views, the query results contain historical and real-time information about streaming data into BigQuery. Each row in the following views represents statistics for streaming into a specific table, aggregated over a one minute interval starting at `start_timestamp`. Statistics are grouped by error code, so there will be one row for each error code encountered during the one minute interval for each timestamp and table combination. Successful requests have the error code set to `NULL`. If no data was streamed into a table during a certain time period, then no rows are present for the corresponding timestamps for that table.

<br />

The `INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `start_timestamp` | `TIMESTAMP` | *(Partitioning column)* Start timestamp of the 1 minute interval for the aggregated statistics. |
| `project_id` | `STRING` | *(Clustering column)* ID of the project. |
| `project_number` | `INTEGER` | Number of the project. |
| `dataset_id` | `STRING` | *(Clustering column)* ID of the dataset. |
| `table_id` | `STRING` | *(Clustering column)* ID of the table. |
| `error_code` | `STRING` | Error code returned for the requests specified by this row. NULL for successful requests. |
| `total_requests` | `INTEGER` | Total number of requests within the 1 minute interval. |
| `total_rows` | `INTEGER` | Total number of rows from all requests within the 1 minute interval. |
| `total_input_bytes` | `INTEGER` | Total number of bytes from all rows within the 1 minute interval. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view contains the streaming history of the past 180 days.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION`` | Organization that contains the specified project | <var translate="no">REGION</var> |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

- To query data in the US multi-region, use `` `region-us`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION ``
- To query data in the EU multi-region, use `` `region-eu`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION ``
- To query data in the asia-northeast1 region, use `` `region-asia-northeast1`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION ``

For a list of available regions, see [Dataset locations](https://docs.cloud.google.com/bigquery/docs/locations).

### Examples

###### Example 1: Recent streaming failures

The following example calculates the per minute breakdown of total failed
requests for all tables in the project's organization in the last 30 minutes,
split by error code:

```googlesql
SELECT
  start_timestamp,
  error_code,
  SUM(total_requests) AS num_failed_requests
FROM
  `region-us`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION
WHERE
  error_code IS NOT NULL
  AND start_timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL 30 MINUTE)
GROUP BY
  start_timestamp,
  error_code
ORDER BY
  start_timestamp DESC;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+---------------------+------------------+---------------------+
|   start_timestamp   |    error_code    | num_failed_requests |
+---------------------+------------------+---------------------+
| 2020-04-15 20:55:00 | INTERNAL_ERROR   |                  41 |
| 2020-04-15 20:41:00 | CONNECTION_ERROR |                   5 |
| 2020-04-15 20:30:00 | INTERNAL_ERROR   |                 115 |
+---------------------+------------------+---------------------+
```

###### Example 2: Per minute breakdown for all requests with error codes

The following example calculates a per minute breakdown of successful and failed
streaming requests in the project's organization, split into error code
categories. This query could be used to populate a dashboard.

```googlesql
SELECT
  start_timestamp,
  SUM(total_requests) AS total_requests,
  SUM(total_rows) AS total_rows,
  SUM(total_input_bytes) AS total_input_bytes,
  SUM(
    IF(
      error_code IN ('QUOTA_EXCEEDED', 'RATE_LIMIT_EXCEEDED'),
      total_requests,
      0)) AS quota_error,
  SUM(
    IF(
      error_code IN (
        'INVALID_VALUE', 'NOT_FOUND', 'SCHEMA_INCOMPATIBLE',
        'BILLING_NOT_ENABLED', 'ACCESS_DENIED', 'UNAUTHENTICATED'),
      total_requests,
      0)) AS user_error,
  SUM(
    IF(
      error_code IN ('CONNECTION_ERROR','INTERNAL_ERROR'),
      total_requests,
      0)) AS server_error,
  SUM(IF(error_code IS NULL, 0, total_requests)) AS total_error,
FROM
  `region-us`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION
GROUP BY
  start_timestamp
ORDER BY
  start_timestamp DESC;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+---------------------+----------------+------------+-------------------+-------------+------------+--------------+-------------+
|   start_timestamp   | total_requests | total_rows | total_input_bytes | quota_error | user_error | server_error | total_error |
+---------------------+----------------+------------+-------------------+-------------+------------+--------------+-------------+
| 2020-04-15 22:00:00 |         441854 |     441854 |       23784853118 |           0 |          0 |           17 |          17 |
| 2020-04-15 21:59:00 |         355627 |     355627 |       26101982742 |           5 |          8 |            0 |          13 |
| 2020-04-15 21:58:00 |         354603 |     354603 |       26160565341 |           0 |          0 |            0 |           0 |
| 2020-04-15 21:57:00 |         298823 |     298823 |       23877821442 |           0 |          2 |            0 |           2 |
+---------------------+----------------+------------+-------------------+-------------+------------+--------------+-------------+
```

###### Example 3: Tables with the most incoming traffic

The following example returns the streaming statistics for the 10 tables in the
project's organization with the most incoming traffic:

```googlesql
SELECT
  project_id,
  dataset_id,
  table_id,
  SUM(total_rows) AS num_rows,
  SUM(total_input_bytes) AS num_bytes,
  SUM(total_requests) AS num_requests
FROM
  `region-us`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_ORGANIZATION
GROUP BY
  project_id,
  dataset_id,
  table_id
ORDER BY
  num_bytes DESC
LIMIT 10;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+----------------------+------------+-------------------------------+------------+----------------+--------------+
|      project_id      | dataset_id |           table_id            |  num_rows  |   num_bytes    | num_requests |
+----------------------+------------+-------------------------------+------------+----------------+--------------+
| my-project1          | dataset1   | table1                        | 8016725532 | 73787301876979 |   8016725532 |
| my-project2          | dataset1   | table2                        |   26319580 | 34199853725409 |     26319580 |
| my-project1          | dataset2   | table1                        |   38355294 | 22879180658120 |     38355294 |
| my-project3          | dataset1   | table3                        |  270126906 | 17594235226765 |    270126906 |
| my-project2          | dataset2   | table2                        |   95511309 | 17376036299631 |     95511309 |
| my-project2          | dataset2   | table3                        |   46500443 | 12834920497777 |     46500443 |
| my-project3          | dataset2   | table4                        |   25846270 |  7487917957360 |     25846270 |
| my-project4          | dataset1   | table4                        |   18318404 |  5665113765882 |     18318404 |
| my-project4          | dataset1   | table5                        |   42829431 |  5343969665771 |     42829431 |
| my-project4          | dataset1   | table6                        |    8771021 |  5119004622353 |      8771021 |
+----------------------+------------+-------------------------------+------------+----------------+--------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-streaming-by-organization (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
