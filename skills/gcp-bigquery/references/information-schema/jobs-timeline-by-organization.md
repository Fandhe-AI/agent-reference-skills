---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-timeline-by-organization
---

# JOBS_TIMELINE_BY_ORGANIZATION view

## Signature / Usage

The `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION` view contains near
real-time
BigQuery metadata by timeslice for all jobs submitted in the
organization associated with the current project.
This view contains currently running and completed jobs.

### Required permissions

To query the `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION` view, you need
the `bigquery.jobs.listAll` Identity and Access Management (IAM) permission for the organization.
Each of the following predefined IAM roles includes the required
permission:

- BigQuery Resource Admin at the organization level
- Organization Owner
- Organization Admin

The `JOBS_BY_ORGANIZATION` schema table is only available to users with defined
Google Cloud organizations.

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
| `folder_numbers` | `REPEATED INTEGER` | Number IDs of the folders that contain the project, starting with the folder that immediately contains the project, followed by the folder that contains the child folder, and so forth. For example, if \`folder_numbers\` is \`\[1, 2, 3\]\`, then folder \`1\` immediately contains the project, folder \`2\` contains \`1\`, and folder \`3\` contains \`2\`. |
| `user_email` | `STRING` | *(Clustering column)* Email address or service account of the user who ran the job. |
| `principal_subject` | `STRING` | A string representation of the identity of the principal that ran the job. |
| `job_id` | `STRING` | ID of the job. For example, `bquxjob_1234`. |
| `job_type` | `STRING` | The type of the job. Can be `QUERY`, `LOAD`, `EXTRACT`, `COPY`, or `null`. Job type `null` indicates an internal job, such as script job statement evaluation or materialized view refresh. |
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
| `total_bytes_billed` | `INTEGER` | If the project is configured to use [on-demand pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then this field contains the total bytes billed for the job. If the project is configured to use [flat-rate pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then you are not billed for bytes. This field is not configurable. |
| `total_bytes_processed` | `INTEGER` | Total bytes processed by the job. |
| `error_result` | `RECORD` | Details of error (if any) as an ` https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/ErrorProto. ` |
| `cache_hit` | `BOOLEAN` | Whether the query results of this job were from a cache. |
| `period_shuffle_ram_usage_ratio` | `FLOAT` | Shuffle usage ratio in the selected time period. The value is `0.0` if the job ran with a reservation that uses autoscaling and has zero baseline slots. |
| `period_estimated_runnable_units` | `INTEGER` | Units of work that can be scheduled immediately in this period. Additional slots for these units of work accelerate your query, provided no other query in the reservation needs additional slots. |
| `global_query_info` | `RECORD` | Information about a [global query](https://docs.cloud.google.com/bigquery/docs/global-queries). Contains the following fields: - `parent_job_id`: The ID of the parent global query job in the primary region. - `parent_job_location`: The location of the parent global query job. - `remote_regions`: An array of remote regions referenced by the global query. |
| `copy_job_statistics` | `RECORD` | [Statistics for a copy job.](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#CopyJobStatistics) |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view displays running jobs along with job history for the past 180 days.
If a project migrates to an organization (either from having no organization or
from a different one), job information predating the migration date isn't
accessible through the `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION` view,
as the view only retains data starting from the migration date.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you do not specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION`` | Organization that contains the specified project | <var translate="no">REGION</var> |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

##### Example: See total slot usage per second

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION
```
For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION ``.

<br />

The following example shows per-second slot usage from projects assigned to
`YOUR_RESERVATION_ID` across all jobs:

```googlesql
SELECT
  jobs.period_start,
  SUM(jobs.period_slot_ms) / 1000 AS period_slot_seconds,
  ANY_VALUE(COALESCE(s.slots_assigned, res.slots_assigned)) AS estimated_slots_assigned,
  ANY_VALUE(COALESCE(s.slots_max_assigned, res.slots_max_assigned)) AS estimated_slots_max_assigned
FROM `region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION jobs
JOIN `region-us`.INFORMATION_SCHEMA.RESERVATIONS_TIMELINE res
  ON jobs.reservation_id = res.reservation_id
  AND TIMESTAMP_TRUNC(jobs.period_start, MINUTE) = res.period_start
LEFT JOIN UNNEST(res.per_second_details) s
  ON jobs.period_start = s.start_time
WHERE
  jobs.job_creation_time
    BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
        AND CURRENT_TIMESTAMP()
  AND res.period_start
    BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
        AND CURRENT_TIMESTAMP()
  AND res.reservation_id = 'YOUR_RESERVATION_ID'
  AND (jobs.statement_type != "SCRIPT" OR jobs.statement_type IS NULL)  -- Avoid duplicate byte counting in parent and children jobs.
GROUP BY
  period_start
ORDER BY
  period_start DESC;
```

The result is similar to the following:

```text
+-----------------------+---------------------+--------------------------+------------------------------+
|     period_start      | period_slot_seconds | estimated_slots_assigned | estimated_slots_max_assigned |
+-----------------------+---------------------+--------------------------+------------------------------+
|2021-06-08 21:33:59 UTC|       100.000       |         100              |           100                |
|2021-06-08 21:33:58 UTC|        96.753       |         100              |           100                |
|2021-06-08 21:33:57 UTC|        41.668       |         100              |           100                |
+-----------------------+---------------------+--------------------------+------------------------------+
```

##### Example: Slot usage by reservation

The following example shows per-second slot usage for each reservation in the
last day:

```googlesql
SELECT
  jobs.period_start,
  res.reservation_id,
  SUM(jobs.period_slot_ms) / 1000 AS period_slot_seconds,
  ANY_VALUE(COALESCE(s.slots_assigned, res.slots_assigned)) AS estimated_slots_assigned,
  ANY_VALUE(COALESCE(s.slots_max_assigned, res.slots_max_assigned)) AS estimated_slots_max_assigned
FROM `region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_ORGANIZATION jobs
JOIN `region-us`.INFORMATION_SCHEMA.RESERVATIONS_TIMELINE res
  ON jobs.reservation_id = res.reservation_id
  AND TIMESTAMP_TRUNC(jobs.period_start, MINUTE) = res.period_start
LEFT JOIN UNNEST(res.per_second_details) s
  ON jobs.period_start = s.start_time
WHERE
  jobs.job_creation_time
      BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
          AND CURRENT_TIMESTAMP()
  AND res.period_start
      BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
          AND CURRENT_TIMESTAMP()
  AND (jobs.statement_type != "SCRIPT" OR jobs.statement_type IS NULL)  -- Avoid duplicate byte counting in parent and children jobs.
GROUP BY
  period_start,
  reservation_id
ORDER BY
  period_start DESC,
  reservation_id;
```

The result is similar to the following:

```text
+-----------------------+----------------+---------------------+--------------------------+------------------------------+
|     period_start      | reservation_id | period_slot_seconds | estimated_slots_assigned | estimated_slots_max_assigned |
+-----------------------+----------------+---------------------+--------------------------+------------------------------+
|2021-06-08 21:33:59 UTC|     prod01     |       100.000       |             100          |              100             |
|2021-06-08 21:33:58 UTC|     prod02     |       177.201       |             200          |              500             |
|2021-06-08 21:32:57 UTC|     prod01     |        96.753       |             100          |              100             |
|2021-06-08 21:32:56 UTC|     prod02     |       182.329       |             200          |              500             |
+-----------------------+----------------+---------------------+--------------------------+------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-timeline-by-organization (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.

## Related

- [Index of this directory](./README.md)
