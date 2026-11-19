---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-timeline
---

# JOBS_TIMELINE view

## Signature / Usage

The `INFORMATION_SCHEMA.JOBS_TIMELINE` view contains near real-time
BigQuery metadata by timeslice for all jobs submitted in the
current project. This view contains currently running and completed jobs.

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.JOBS_TIMELINE` and `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permissions

To query the `INFORMATION_SCHEMA.JOBS_TIMELINE` view, you need the
`bigquery.jobs.listAll` Identity and Access Management (IAM) permission for the project.
Each of the following predefined IAM roles includes the required
permission:

- Project Owner
- BigQuery Admin

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_*` views, the query
results contain one row for every second of execution of every
BigQuery job. Each period starts on a whole-second interval and
lasts exactly one second.

The `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_*` view has the following schema:

> [!NOTE]
> **Note:** The underlying data is partitioned by the `job_creation_time` column and clustered by `project_id` and `user_email`.

| Column name | Data type | Value |
|---|---|---|
| `period_start` | `TIMESTAMP` | Start time of this period. |
| `period_slot_ms` | `INTEGER` | Slot milliseconds consumed in this period. |
| `project_id` | `STRING` | *(Clustering column)* ID of the project. |
| `project_number` | `INTEGER` | Number of the project. |
| `user_email` | `STRING` | *(Clustering column)* Email address or service account of the user who ran the job. |
| `principal_subject` | `STRING` | A string representation of the identity of the principal that ran the job. |
| `job_id` | `STRING` | ID of the job. For example, `bquxjob_1234`. |
| `job_type` | `STRING` | The type of the job. Can be `QUERY`, `LOAD`, `EXTRACT`, `COPY`, or `NULL`. A `NULL` value indicates a background job. |
| `labels` | `RECORD` | Array of labels applied to the job as key-value pairs. |
| `statement_type` | `STRING` | The type of query statement, if valid. For example, `SELECT`, `INSERT`, `UPDATE`, or `DELETE`. |
| `priority` | `STRING` | The priority of this job. Valid values include `INTERACTIVE` and `BATCH`. |
| `parent_job_id` | `STRING` | ID of the parent job, if any. |
| `job_creation_time` | `TIMESTAMP` | *(Partitioning column)* Creation time of this job. Partitioning is based on the UTC time of this timestamp. |
| `job_start_time` | `TIMESTAMP` | Start time of this job. |
| `job_end_time` | `TIMESTAMP` | End time of this job. |
| `state` | `STRING` | Running state of the job at the end of this period. Valid states include `PENDING`, `RUNNING`, and `DONE`. |
| `reservation_id` | `STRING` | Name of the primary reservation assigned to this job at the end of this period, if applicable. |
| `reservation_group_path` | `ARRAY<STRING>` | The reservation group to which the reservation is linked. For example, if the reservation is linked to group `my-group`, the `reservation_group_path` field contains a list such as: `[my-group]`. |
| `edition` | `STRING` | The edition associated with the reservation assigned to this job. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |
| `total_bytes_billed` | `INTEGER` | If the project is configured to use [on-demand pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then this field contains the total bytes billed for the job. If the project is configured to use [flat-rate pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then you are not billed for bytes and this field is informational only. This field is only populated for completed jobs and contains the total number of bytes billed for the entire duration of the job. |
| `total_bytes_processed` | `INTEGER` | Total bytes processed by the job. This field is only populated for completed jobs and contains the total number of bytes processed over the entire duration of the job. |
| `error_result` | `RECORD` | Details of error (if any) as an ` https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/ErrorProto. ` |
| `cache_hit` | `BOOLEAN` | Whether the query results of this job were from a cache. |
| `period_shuffle_ram_usage_ratio` | `FLOAT` | Shuffle usage ratio in the selected time period. The value is `0.0` if the job ran with a reservation that uses autoscaling and has zero baseline slots. |
| `period_estimated_runnable_units` | `INTEGER` | Units of work that can be scheduled immediately in this period. Additional slots for these units of work accelerate your query, provided no other query in the reservation needs additional slots. |
| `transaction_id` | `STRING` | ID of the [transaction](https://docs.cloud.google.com/bigquery/docs/transactions) in which this job ran, if any. |
| `global_query_info` | `RECORD` | Information about a [global query](https://docs.cloud.google.com/bigquery/docs/global-queries). Contains the following fields: - `parent_job_id`: The ID of the parent global query job in the primary region. - `parent_job_location`: The location of the parent global query job. - `remote_regions`: An array of remote regions referenced by the global query. |
| `copy_job_statistics` | `RECORD` | [Statistics for a copy job.](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#CopyJobStatistics) |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view displays running jobs along with job history for the past 180 days.
If a project migrates to an organization (either from having no organization or
from a different one), job information predating the migration date isn't
accessible through the `INFORMATION_SCHEMA.JOBS_TIMELINE` view, as the view only
retains data starting from the migration date.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.JOBS_TIMELINE[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.VIEW
```

<br />

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE ``.

The following example calculates the slot utilization for every second in the
last day:

```googlesql
SELECT
  period_start,
  SUM(period_slot_ms) AS total_slot_ms,
FROM
  `reservation-admin-project.region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE
WHERE
  period_start BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY) AND CURRENT_TIMESTAMP()
GROUP BY
  period_start
ORDER BY
  period_start DESC;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+---------------------+---------------+
|    period_start     | total_slot_ms |
+---------------------+---------------+
| 2020-07-29 03:52:14 |     122415176 |
| 2020-07-29 03:52:15 |     141107048 |
| 2020-07-29 03:52:16 |     173335142 |
| 2020-07-28 03:52:17 |     131107048 |
+---------------------+---------------+
```

You can check usage for a particular reservation with
`WHERE reservation_id = "..."`. For script jobs, the parent job also reports the
total slot usage from its children jobs. To avoid double counting, use
`WHERE statement_type != "SCRIPT"` to exclude the parent job.

#### Number of `RUNNING` and `PENDING` jobs over time

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.VIEW
```

<br />

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE ``.

The following example computes the number of `RUNNING` and `PENDING` jobs at every
second in the last day:

```googlesql
SELECT
  period_start,
  SUM(IF(state = "PENDING", 1, 0)) as PENDING,
  SUM(IF(state = "RUNNING", 1, 0)) as RUNNING
FROM
  `reservation-admin-project.region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE
WHERE
  period_start BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY) AND CURRENT_TIMESTAMP()
GROUP BY
  period_start;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+---------------------+---------+---------+
|    period_start     | PENDING | RUNNING |
+---------------------+---------+---------+
| 2020-07-29 03:52:14 |       7 |      27 |
| 2020-07-29 03:52:15 |       1 |      21 |
| 2020-07-29 03:52:16 |       5 |      21 |
| 2020-07-29 03:52:17 |       4 |      22 |
+---------------------+---------+---------+
```

#### Resource usage by jobs at a specific point in time

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.VIEW
```

<br />

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.JOBS ``.

The following example returns the `job_id` of all jobs running at a specific
point in time together with their resource usage during that one-second period:

```googlesql
SELECT
  job_id,
  period_slot_ms
FROM
  `reservation-admin-project.region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_PROJECT
WHERE
  period_start = '2020-07-29 03:52:14'
  AND (statement_type != 'SCRIPT' OR statement_type IS NULL);
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+------------------+
| job_id | slot_ms |
+------------------+
| job_1  | 2415176 |
| job_2  | 4417245 |
| job_3  |  427416 |
| job_4  | 1458122 |
+------------------+
```

#### Match slot usage behavior from administrative resource charts

You can use
[administrative resource charts](https://docs.cloud.google.com/bigquery/docs/admin-resource-charts) to
monitor your organization's health, slot usage, and BigQuery jobs
performance over time. The following example queries the
`INFORMATION_SCHEMA.JOBS_TIMELINE` view for a slot usage timeline at one-hour
intervals, similar to the information that is available in administrative
resource charts.

```googlesql
DECLARE
  start_time timestamp DEFAULT TIMESTAMP(START_TIME);
DECLARE
  end_time timestamp DEFAULT TIMESTAMP(END_TIME);

WITH
  snapshot_data AS (
  SELECT
    UNIX_MILLIS(period_start) AS period_start,
    IFNULL(SUM(period_slot_ms), 0) AS period_slot_ms,
    DIV(UNIX_MILLIS(period_start), 3600000 * 1) * 3600000 * 1 AS time_ms
  FROM (
    SELECT
      *
    FROM
      `PROJECT_ID.region-US`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_PROJECT
    WHERE
      ((job_creation_time >= TIMESTAMP_SUB(start_time, INTERVAL 1200 MINUTE)
          AND job_creation_time < TIMESTAMP(end_time))
        AND period_start >= TIMESTAMP(start_time)
        AND period_start < TIMESTAMP(end_time))
      AND (statement_type != "SCRIPT"
        OR statement_type IS NULL)
      AND REGEXP_CONTAINS(reservation_id, "^PROJECT_ID:") )
  GROUP BY
    period_start,
    time_ms ),
  converted_percentiles_data AS (
  SELECT
    time_ms,
    100 - CAST(SAFE_DIVIDE(3600000 * 1 * 1 / 1000, COUNT(*)) AS INT64) AS converted_percentiles,
  FROM
    snapshot_data
  GROUP BY
    time_ms ),
  data_by_time AS (
  SELECT
    time_ms,
  IF
    (converted_percentiles <= 0, 0, APPROX_QUANTILES(period_slot_ms, 100)[SAFE_OFFSET(converted_percentiles)] / 1000) AS p99_slots,
    SUM(period_slot_ms) / (3600000 * 1) AS avg_slots
  FROM
    snapshot_data
  JOIN
    converted_percentiles_data AS c
  USING
    (time_ms)
  GROUP BY
    time_ms,
    converted_percentiles )
SELECT
  time_ms,
  TIMESTAMP_MILLIS(time_ms) AS time_stamp,
  IFNULL(avg_slots, 0) AS avg_slots,
  IFNULL(p99_slots, 0) AS p99_slots,
FROM (
  SELECT
    time_ms * 3600000 * 1 AS time_ms
  FROM
    UNNEST(GENERATE_ARRAY(DIV(UNIX_MILLIS(start_time), 3600000 * 1), DIV(UNIX_MILLIS(end_time), 3600000 * 1) - 1, 1)) AS time_ms )
LEFT JOIN
  data_by_time
USING
  (time_ms)
ORDER BY
  time_ms DESC;
```

#### Calculate the percentage of execution time that had pending work

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.VIEW
```

<br />

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.JOBS ``.

The following example returns a float value that represents the percentage of
the total job execution duration where the value of
[`period_estimated_runnable_units`](#schema)
was non-zero, which means that the job was requesting more slots. A large
value indicates that the job suffered from slot contention, whereas a small
value indicates that the job wasn't requesting slots for the majority of the
execution time, which means that there was little to no slot contention.

If the resulting value is large, you can try adding more slots to see
the impact and understand whether slot contention is the only bottleneck.

```googlesql
SELECT ROUND(COUNTIF(period_estimated_runnable_units > 0) / COUNT(*) * 100, 1) as execution_duration_percentage
FROM `myproject`.`region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE
WHERE job_id = 'my_job_id'
GROUP BY job_id
```

If you know the date of the query execution, add a
`DATE(period_start) = 'YYYY-MM-DD'` clause to the query to reduce the amount of
bytes processed and speed up the execution. For example,
`DATE(period_start) = '2025-08-22'`.

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+-------------------------------+
| execution_duration_percentage |
+-------------------------------+
|                          96.7 |
+-------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-timeline (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.
- Caution: the example that returns the percentage of a job's execution time with non-zero `period_estimated_runnable_units` suggests adding `DATE(period_start) = 'YYYY-MM-DD'`. For a job that ran across midnight UTC, that condition drops the seconds on the other date, so the percentage covers only part of the job. This view is partitioned by `job_creation_time`, as the note under the schema says; to reduce the bytes processed without changing the result, filter on the date the job was created, for example `DATE(job_creation_time) = 'YYYY-MM-DD'`.

## Related

- [Index of this directory](./README.md)
