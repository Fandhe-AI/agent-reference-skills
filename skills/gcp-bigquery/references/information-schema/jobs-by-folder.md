---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-by-folder
---

# JOBS_BY_FOLDER view

## Signature / Usage

The `INFORMATION_SCHEMA.JOBS_BY_FOLDER` view contains near real-time metadata
about all jobs submitted in the parent folder of the current project, including
the jobs in subfolders under it.

### Required role

To get the permission that
you need to query the `INFORMATION_SCHEMA.JOBS_BY_FOLDER` view,

ask your administrator to grant you the
[BigQuery Resource Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.resourceViewer) (`roles/bigquery.resourceViewer`) IAM role on your parent folder.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains the
`bigquery.jobs.listAll`
permission,
which is required to
query the `INFORMATION_SCHEMA.JOBS_BY_FOLDER` view.

You might also be able to get
this permission
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The underlying data is partitioned by the `creation_time` column and
clustered by `project_id` and `user_email`. The `query_info` column contains
additional information about your query jobs.

The `INFORMATION_SCHEMA.JOBS_BY_FOLDER` view has the following schema:

| **Column name** | **Data type** | **Value** |
|---|---|---|
| `bi_engine_statistics` | `RECORD` | If the project is configured to use the [BI Engine](https://docs.cloud.google.com/bigquery/docs/bi-engine-intro), then this field contains [BiEngineStatistics](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#bienginestatistics). Otherwise `NULL`. |
| `cache_hit` | `BOOLEAN` | Whether the query results of this job were from a cache. If you have a [multi-query statement job](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries), `cache_hit` for your parent query is `NULL`. |
| `copy_job_statistics` | `RECORD` | [Statistics for a copy job.](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#CopyJobStatistics) |
| `creation_time` | `TIMESTAMP` | (*Partitioning column*) Creation time of this job. Partitioning is based on the UTC time of this timestamp. |
| `destination_table` | `RECORD` | Destination [table](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/TableReference) for results, if any. |
| `dml_statistics` | `RECORD` | If the job is a query with a DML statement, the value is a record with the following fields: - `inserted_row_count`: The number of rows that were inserted. - `deleted_row_count`: The number of rows that were deleted. - `updated_row_count`: The number of rows that were updated. For all other jobs, the value is `NULL`. This column is present in the `INFORMATION_SCHEMA.JOBS_BY_USER` and `INFORMATION_SCHEMA.JOBS_BY_PROJECT` views. |
| `end_time` | `TIMESTAMP` | The end time of this job, in milliseconds since the epoch. This field represents the time when the job enters the `DONE` state. |
| `error_result` | `RECORD` | Details of any errors as [ErrorProto](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/ErrorProto) objects. |
| `folder_numbers` | `REPEATED INTEGER` | Number IDs of folders that contain the project, starting with the folder that immediately contains the project, followed by the folder that contains the child folder, and so forth. For example, if `folder_numbers` is `[1, 2, 3]`, then folder `1` immediately contains the project, folder `2` contains `1`, and folder `3` contains `2`. This column is only populated in `JOBS_BY_FOLDER`. |
| `global_query_info` | `RECORD` | Information about a [global query](https://docs.cloud.google.com/bigquery/docs/global-queries). Contains the following fields: - `parent_job_id`: The ID of the parent global query job in the primary region. - `parent_job_location`: The location of the parent global query job. - `remote_regions`: An array of remote regions referenced by the global query. |
| `job_creation_reason.code` | `STRING` | Specifies the high-level reason why a job was created. Possible values are: - `REQUESTED`: job creation was requested. - `LONG_RUNNING`: the query request ran beyond a system-defined timeout specified by the [timeoutMs field in the `QueryRequest`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest). As a result it was considered a long-running operation for which a job was created. - `LARGE_RESULTS`: the results from the query cannot fit in the in-line response. - `OTHER`: the system has determined that the query needs to be executed as a job. |
| `job_id` | `STRING` | The ID of the job if a job was created. Otherwise, the query ID of a query using optional job creation mode. For example, `bquxjob_1234`. |
| `job_stages` | `RECORD REPEATED` | [Query stages](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#ExplainQueryStage) of the job. **Note** : This column's values are empty for queries that read from tables with row-level access policies. For more information, see [best practices for row-level security in BigQuery.](https://docs.cloud.google.com/bigquery/docs/best-practices-row-level-security) |
| `job_type` | `STRING` | The type of the job. Can be `QUERY`, `LOAD`, `EXTRACT`, `COPY`, or `NULL`. A `NULL` value indicates a background job. |
| `labels` | `RECORD` | Array of labels applied to the job as key-value pairs. |
| `object_storage_stats` | `RECORD REPEATED` | Statistics for object storage and caching usage for a query job. The value is a repeated record with the following fields: - `cloud_provider`: The cloud provider where the object storage is hosted (for example, `AWS`). - `object_storage_bytes_read`: Total number of bytes read directly from object storage. - `cache_bytes_read`: Total number of bytes read from cache. |
| `parent_job_id` | `STRING` | ID of the parent job, if any. |
| `priority` | `STRING` | The priority of this job. Valid values include `INTERACTIVE` and `BATCH`. |
| `project_id` | `STRING` | (*Clustering column*) The ID of the project. |
| `project_number` | `INTEGER` | The number of the project. |
| `referenced_tables` | `RECORD` | Array of `STRUCT` values that contain the following `STRING` fields for each table referenced by the query: `project_id`, `dataset_id`, and `table_id`. Only populated for query jobs that are not cache hits. |
| `referenced_logical_views` | `RECORD` | Array of `STRUCT` values that contain the following `STRING` fields for each logical view referenced by the query: `project_id`, `dataset_id`, and `table_id`. Only populated for query jobs that are not cache hits. |
| `reservation_id` | `STRING` | Name of the primary reservation assigned to this job, in the format `RESERVATION_ADMIN_PROJECT:RESERVATION_LOCATION.RESERVATION_NAME`. In this output: - `RESERVATION_ADMIN_PROJECT`: the name of the Google Cloud project that administers the reservation - `RESERVATION_LOCATION`: the location of the reservation - `RESERVATION_NAME`: the name of the reservation |
| `reservation_group_path` | `ARRAY<STRING>` | The reservation group to which the reservation is linked. For example, if the reservation is linked to group `my-group`, the `reservation_group_path` field contains a list such as: `[my-group]`. |
| `edition` | `STRING` | The edition associated with the reservation assigned to this job. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |
| `session_info` | `RECORD` | Details about the [session](https://docs.cloud.google.com/bigquery/docs/sessions-intro) in which this job ran, if any. |
| `start_time` | `TIMESTAMP` | The start time of this job, in milliseconds since the epoch. This field represents the time when the job transitions from the `PENDING` state to either `RUNNING` or `DONE`. |
| `state` | `STRING` | Running state of the job. Valid states include `PENDING`, `RUNNING`, and `DONE`. |
| `statement_type` | `STRING` | The type of query statement. For example, `DELETE`, `INSERT`, `SCRIPT`, `SELECT`, or `UPDATE`. See [QueryStatementType](https://docs.cloud.google.com/bigquery/docs/reference/auditlogs/rest/Shared.Types/BigQueryAuditMetadata.QueryStatementType) for list of valid values. |
| `timeline` | `RECORD` | [Query timeline](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#QueryTimelineSample) of the job. Contains snapshots of query execution. |
| `total_bytes_billed` | `INTEGER` | If the project is configured to use [on-demand pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then this field contains the total bytes billed for the job. If the project is configured to use [flat-rate pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models), then you are not billed for bytes and this field is informational only. **Note** : This column's values are empty for queries that read from tables with row-level access policies. For more information, see [best practices for row-level security in BigQuery.](https://docs.cloud.google.com/bigquery/docs/best-practices-row-level-security) |
| `total_bytes_processed` | `INTEGER` | Total bytes processed by the job. **Note** : This column's values are empty for queries that read from tables with row-level access policies. For more information, see [best practices for row-level security in BigQuery.](https://docs.cloud.google.com/bigquery/docs/best-practices-row-level-security) |
| `total_modified_partitions` | `INTEGER` | The total number of partitions the job modified. This field is populated for `LOAD` and `QUERY` jobs. |
| `total_slot_ms` | `INTEGER` | Slot milliseconds for the last execution of the job, excluding prior retries, if any. |
| `total_services_sku_slot_ms` | `INTEGER` | Total slot milliseconds for the job that runs on external services and is billed on the services SKU. This field is only populated for jobs that have external service costs, and is the total of the usage for costs whose billing method is `"SERVICES_SKU"`. |
| `transaction_id` | `STRING` | ID of the [transaction](https://docs.cloud.google.com/bigquery/docs/transactions) in which this job ran, if any. |
| `user_email` | `STRING` | (*Clustering column*) Email address or service account of the user who ran the job. |
| `principal_subject` | `STRING` | A string representation of the identity of the principal that ran the job. |
| `query_info.resource_warning` | `STRING` | The warning message that appears if the resource usage during query processing is above the internal threshold of the system. A successful query job can have the `resource_warning` field populated. With `resource_warning`, you get additional data points to optimize your queries and to set up monitoring for performance trends of an equivalent set of queries by using `query_hashes`. |
| `query_info.query_hashes.normalized_literals` | `STRING` | Contains the hash value of the query. `normalized_literals` is a hexadecimal `STRING` hash that ignores comments, parameter values, UDFs, and literals. The hash value will differ when underlying views change, or if the query implicitly references columns, such as `SELECT *`, and the table schema changes. This field appears for successful [GoogleSQL](../googlesql-syntax/query-syntax-1.md) queries that are not cache hits. |
| `query_info.performance_insights` | `RECORD` | [Performance insights](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#PerformanceInsights) for the job. |
| `transferred_bytes` | `INTEGER` | Total bytes transferred for BigQuery Omni queries, such as BigQuery Omni transfer jobs. |
| `materialized_view_statistics` | `RECORD` | [Statistics of materialized views](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#MaterializedViewStatistics) considered in a query job. ([Preview](https://cloud.google.com/products#product-launch-stages)) |
| `metadata_cache_statistics` | `RECORD` | [Statistics for metadata column index usage for tables](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#metadatacachestatistics) referenced in a query job. |
| `search_statistics` | `RECORD` | [Statistics for a search query.](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#SearchStatistics) |
| `query_dialect` | `STRING` | This field will be available sometime in May, 2025. The query dialect used for the job. Valid values include: - `GOOGLE_SQL`: Job was requested to use GoogleSQL. - `LEGACY_SQL`: Job was requested to use LegacySQL. - `DEFAULT_LEGACY_SQL`: No query dialect was specified in the job request. BigQuery used the default value of LegacySQL. - `DEFAULT_GOOGLE_SQL`: No query dialect was specified in the job request. BigQuery used the default value of GoogleSQL. For jobs submitted by users, this field is only populated for query jobs. The default selection of query dialect can be controlled by the [configuration settings](https://docs.cloud.google.com/bigquery/docs/default-configuration#configuration-settings). For background jobs, the value of this field isn't controlled by the default query dialect configuration settings, and doesn't impact jobs submitted by users. For some background jobs, the value is omitted. |
| `continuous` | `BOOLEAN` | Whether the job is a [continuous query](https://docs.cloud.google.com/bigquery/docs/continuous-queries-introduction). |
| `continuous_query_info.output_watermark` | `TIMESTAMP` | Represents the point up to which the continuous query has successfully processed data. |
| `vector_search_statistics` | `RECORD` | [Statistics for a vector search query.](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#VectorSearchStatistics) |
| `external_service_costs` | `RECORD` | An array of information about the external service costs for a query job. |
| `ml_statistics.model_type` | `STRING` | If the job is a BigQuery ML model creation query, then this field specifies the [type of model](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/models#ModelType) being created. For all other jobs, the value is `NULL`. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view displays running jobs along with job history for the past 180 days.
If a project migrates to an organization (either from having no organization or
from a different one), job information predating the migration date isn't
accessible through the `INFORMATION_SCHEMA.JOBS_BY_FOLDER` view, as the view
only retains data starting from the migration date.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.JOBS_BY_FOLDER`` | Folder that contains the specified project | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

> [!NOTE]
> **Note:** When you query `INFORMATION_SCHEMA.JOBS_BY_FOLDER` to find a summary cost of query jobs, you should exclude the `SCRIPT` statement type, otherwise some values might be counted twice. The `SCRIPT` row includes summary values for all child jobs that were executed as part of this job.

### Examples

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.JOBS_BY_FOLDER
```

<br />

Replace the following:

- `PROJECT_ID`: the ID of the project
- `REGION_NAME`: the region for your project

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.JOBS_BY_FOLDER ``.

#### View interactive jobs

The following query displays the job ID, creation time, and state (`PENDING`,
`RUNNING`, or `DONE`) of all interactive jobs in the designated project's
folder:

```googlesql
SELECT
  job_id,
  creation_time,
  state
FROM
  `region-REGION_NAME`.INFORMATION_SCHEMA.JOBS_BY_FOLDER
WHERE
  priority = 'INTERACTIVE';
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+--------------+---------------------------+---------------------------------+
| job_id       |  creation_time            |  state                          |
+--------------+---------------------------+---------------------------------+
| bquxjob_1    |  2019-10-10 00:00:00 UTC  |  DONE                           |
| bquxjob_4    |  2019-10-10 00:00:03 UTC  |  RUNNING                        |
| bquxjob_5    |  2019-10-10 00:00:04 UTC  |  PENDING                        |
+--------------+---------------------------+---------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs-by-folder (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: the schema says that `query_dialect` will be available sometime in May, 2025. That sentence is out of date: the JOBS view page (jobs.md) says, in the example that counts legacy SQL query jobs, that the field has been available since May 2025.

## Related

- [Index of this directory](./README.md)
