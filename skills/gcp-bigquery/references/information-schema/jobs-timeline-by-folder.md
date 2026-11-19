---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-timeline-by-folder
---

# JOBS_TIMELINE_BY_FOLDER view

## Signature / Usage

The `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_FOLDER` view contains near real-time
BigQuery metadata by timeslice for all jobs submitted in the
parent folder of the current project, including the jobs in subfolders under it.
This view contains both running and completed jobs.

### Required permissions

To query the `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_FOLDER` view, you need
the `bigquery.jobs.listAll` Identity and Access Management (IAM) permission for the parent
folder. Each of the following predefined IAM roles includes the
required permission:

- Folder Admin
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
| `total_bytes_billed` | `INTEGER` | If the project is configured to use [on-demand pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then this field contains the total bytes billed for the job. If the project is configured to use [flat-rate pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then you are not billed for bytes and this field is informational only. |
| `total_bytes_processed` | `INTEGER` | Total bytes processed by the job. |
| `error_result` | `RECORD` | Details of error (if any) as an ` https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/ErrorProto. ` |
| `cache_hit` | `BOOLEAN` | Whether the query results of this job were from a cache. |
| `period_shuffle_ram_usage_ratio` | `FLOAT` | Shuffle usage ratio in the selected time period. The value is `0.0` if the job ran with a reservation that uses autoscaling and has zero baseline slots. |
| `period_estimated_runnable_units` | `INTEGER` | Units of work that can be scheduled immediately in this period. Additional slots for these units of work accelerate your query, provided no other query in the reservation needs additional slots. |
| `transaction_id` | `STRING` | ID of the [transaction](https://docs.cloud.google.com/bigquery/docs/transactions) in which this job ran, if any. ([Preview](https://cloud.google.com/products#product-launch-stages)) |
| `global_query_info` | `RECORD` | Information about a [global query](https://docs.cloud.google.com/bigquery/docs/global-queries). Contains the following fields: - `parent_job_id`: The ID of the parent global query job in the primary region. - `parent_job_location`: The location of the parent global query job. - `remote_regions`: An array of remote regions referenced by the global query. |
| `copy_job_statistics` | `RECORD` | [Statistics for a copy job.](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#CopyJobStatistics) |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view displays running jobs along with job history for the past 180 days.
If a project migrates to an organization (either from having no organization or
from a different one), job information predating the migration date isn't
accessible through the `INFORMATION_SCHEMA.JOBS_TIMELINE_BY_FOLDER` view, as the
view only retains data starting from the migration date.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_FOLDER`` | Project level | <var translate="no">REGION</var> |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

The following examples show how to query the
`INFORMATION_SCHEMA.JOBS_TIMELINE_BY_FOLDER` view.

#### Get the number of unique jobs

The following query displays the number of unique jobs running per minute in the
designated project's folder:

```googlesql
SELECT
  TIMESTAMP_TRUNC(period_start, MINUTE) AS per_start,
  COUNT(DISTINCT job_id) AS unique_jobs
FROM
  `region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_FOLDER,
  UNNEST(folder_numbers) f
WHERE
  my_folder_number = f
GROUP BY
  per_start
ORDER BY
  per_start DESC;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+---------------------------+---------------------------------+
|  per_start                |  unique_jobs                    |
+---------------------------+---------------------------------+
|  2019-10-10 00:04:00 UTC  |  5                              |
|  2019-10-10 00:03:00 UTC  |  2                              |
|  2019-10-10 00:02:00 UTC  |  3                              |
|  2019-10-10 00:01:00 UTC  |  4                              |
|  2019-10-10 00:00:00 UTC  |  4                              |
+---------------------------+---------------------------------+
```

#### Calculate the slot-time used

The following query displays the slot-time used per minute in the
designated project's folder:

```googlesql
SELECT
  TIMESTAMP_TRUNC(period_start, MINUTE) AS per_start,
  SUM(period_slot_ms) AS slot_ms
FROM
  `region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_FOLDER,
  UNNEST(folder_numbers) f
WHERE
  my_folder_number = f
  AND reservation_id = "my reservation id"
  AND statement_type != "SCRIPT"
GROUP BY
  per_start
ORDER BY
  per_start DESC;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

> [!NOTE]
> **Note:** Projects within a single folder can be assigned to more than one reservation. `JOBS_TIMELINE_BY_FOLDER` can provide data across multiple reservations. When summing `period_slot_ms`, ensure that you are filtering for individual reservations.

The result is similar to the following:

```text
+---------------------------+---------------------------------+
|  per_start                |  slot_ms                        |
+---------------------------+---------------------------------+
|  2019-10-10 00:04:00 UTC  |  500                            |
|  2019-10-10 00:03:00 UTC  |  1000                           |
|  2019-10-10 00:02:00 UTC  |  3000                           |
|  2019-10-10 00:01:00 UTC  |  4000                           |
|  2019-10-10 00:00:00 UTC  |  4000                           |
+---------------------------+---------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-timeline-by-folder (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: The two example queries filter on `my_folder_number = f`. `my_folder_number` is not a column of the view and is not defined on this page; treat it as a placeholder for the folder number to filter on. The official docs are unchanged here.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.

## Related

- [Index of this directory](./README.md)
