---
source: https://docs.cloud.google.com/bigquery/docs/reference/system-variables
---

# System variables reference

## Signature / Usage

BigQuery supports the following system variables for
[multi-statement queries](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries) or within
[sessions](https://docs.cloud.google.com/bigquery/docs/sessions-intro).
You can use system variables to set or retrieve information during query
execution, similar to user-defined
[procedural language variables](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries#variables).

| Name | Type | Read and write or read-only | Description |
|---|---|---|---|
| `@@current_job_id` | `STRING` | Read-only | Job ID of the currently executing job. In the context of a multi-statement query, this returns the job responsible for the current statement, not the entire multi-statement query. |
| `@@dataset_id` | `STRING` | Read and write | ID of the default dataset in the current project. This ID is used when a dataset is not specified for a project in the query. You can use the `SET` statement to assign `@@dataset_id` to another dataset ID in the current project. The system variables `@@dataset_project_id` and `@@dataset_id` can be set and used together. |
| `@@dataset_project_id` | `STRING` | Read and write | ID of the default project that's used when one is not specified for a dataset used in the query. If `@@dataset_project_id` is not set, or if it is set to `NULL`, the query-executing project (`@@project_id`) is used. You can use the `SET` statement to assign `@@dataset_project_id` to another project ID. The system variables `@@dataset_project_id` and `@@dataset_id` can be set and used together. |
| `@@last_job_id` | `STRING` | Read-only | Job ID of the most recent job to execute in the current multi-statement query, not including the current one. If the multi-statement query contains `CALL` statements, this job may have originated in a different procedure. |
| `@@location` | `STRING` | Read and write | The location in which to run the query. `@@location` can only be set to a string literal with a [valid location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations). A `SET @@location` statement must be the first statement in a query. An error occurs if there is a mismatch between `@@location` and another [location setting](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations) for the query. You can improve the latency of queries that set `@@location` by using [optional job creation mode](https://docs.cloud.google.com/bigquery/docs/running-queries#optional-job-creation). You can use the `@@location` system variable inside of [SQL UDFs](https://docs.cloud.google.com/bigquery/docs/user-defined-functions#sql-udf-structure) and [table functions](https://docs.cloud.google.com/bigquery/docs/table-functions). |
| `@@max_staleness_override` | `INTERVAL` | Read and write | Overrides the maximum staleness interval for all applicable entities queried within the current multi-statement query or session. Applicable entities include [streamed tables](https://docs.cloud.google.com/bigquery/docs/write-api-grpc#query-streamed-data-max-staleness), [Change Data Capture (CDC) tables](https://docs.cloud.google.com/bigquery/docs/change-data-capture#query-max-staleness), and [materialized views](https://docs.cloud.google.com/bigquery/docs/materialized-views-create#max_staleness)) queried within the current multi-statement query or session. By default, every time you run a query, BigQuery returns the most up-to-date results or respects the entity's configured `max_staleness` option. You can use `@@max_staleness_override` to dynamically customize the staleness behavior without altering table or view configurations: - **Reduce query latency and costs:** to tolerate stale data, set `@@max_staleness_override` to a non-negative interval---for example, `INTERVAL 10 MINUTE`. - **Ensure completely up-to-date results:** to force pending modifications or refreshes to be applied at query run time, set `@@max_staleness_override` to `INTERVAL 0 SECOND`. - **Clear the override:** to revert back to the entity-level `max_staleness` settings, set `@@max_staleness_override` to `NULL`. |
| `@@project_id` | `STRING` | Read-only | ID of the project used to execute the current query. In the context of a procedure, `@@project_id` refers to the project that is running the multi-statement query, not the project which owns the procedure. |
| `@@query_label` | `STRING` | Read and write | Query label to associate with query jobs in the current multi-statement query or session. If set in a query, all subsequent query jobs in the script or session will have this label. If not set in a query, the value for this system variable is `NULL`. For an example of how to set this system variable, see [Associate jobs in a session with a label](https://docs.cloud.google.com/bigquery/docs/adding-labels#adding-label-to-session). |
| `@@reservation` | `STRING` | Read and write | Lets you specify or override the reservation to use for running the following statements. Must be in the following format: `projects/project_id/locations/location/reservations/reservation_id`. Forces the query to use on-demand billing when set to `'none'`. This requires the project or organization to have `reservation_override_mode` set to `ALLOW_ANY_OVERRIDE`. This value can be set using [`ALTER PROJECT SET OPTIONS`](data-definition-language-3.md#alter-project-set-options-statement) or [`ALTER ORGANIZATION SET OPTIONS`](data-definition-language-3.md#alter-organization-set-options-statement) statements. In case of any issues, [request support](https://docs.cloud.google.com/bigquery/docs/getting-support). The location of the reservation must match the location where the query is running. If `@@reservation` is `NULL`, the reservation is automatically detected based on [assignment settings](https://docs.cloud.google.com/bigquery/docs/reservations-assignments) matching the query properties. |
| `@@row_count` | `INT64` | Read-only | If used in a multi-statement query and the previous statement is DML, specifies the number of rows inserted, modified, or deleted, as a result of that DML statement. If the previous statement is a \`MERGE\` statement, `@@row_count` represents the combined total number of rows inserted, modified, and deleted. This value is `NULL` if not in a multi-statement query. |
| `@@script.bytes_billed` | `INT64` | Read-only | Total bytes billed so far in the currently executing multi-statement query job. This value is `NULL` if not in the job. |
| `@@script.bytes_processed` | `INT64` | Read-only | Total bytes processed so far in the currently executing multi-statement query job. This value is `NULL` if not in the job. |
| `@@script.creation_time` | `TIMESTAMP` | Read-only | Creation time of the currently executing multi-statement query job. This value is `NULL` if not in the job. |
| `@@script.job_id` | `STRING` | Read-only | Job ID of the currently executing multi-statement query job. This value is `NULL` if not in the job. |
| `@@script.num_child_jobs` | `INT64` | Read-only | Number of currently completed child jobs. This value is `NULL` if not in the job. |
| `@@script.slot_ms` | `INT64` | Read-only | Number of slot milliseconds used so far by the script. This value is `NULL` if not in the job. |
| `@@session_id` | `STRING` | Read-only | ID of the session that the current query is associated with. You can use the `@@session_id` system variable within [SQL user-defined functions](https://docs.cloud.google.com/bigquery/docs/user-defined-functions#sql-udf-structure), [table functions](https://docs.cloud.google.com/bigquery/docs/table-functions), and [logical views](https://docs.cloud.google.com/bigquery/docs/views). The use of this system variable in materialized views isn't supported. |
| `@@time_zone` | `STRING` | Read and write | The default time zone to use in time zone-dependent SQL functions, when a time zone is not specified as an argument. `@@time_zone` can be modified by using a `SET` statement to any valid time zone name. At the start of each script, `@@time_zone` begins as "UTC". |

For backward compatibility, expressions used in an `OPTIONS` or
`FOR SYSTEM TIME AS OF` clause default to the `America/Los_Angeles` time zone,
while all other date/time expressions default to the `UTC` time zone. If
`@@time_zone` has been set earlier in the multi-statement query, the chosen
time zone will apply to all date/time expressions, including `OPTIONS` and
`FOR SYSTEM TIME AS OF` clauses.

In addition to the system variables shown previously, you can use `EXCEPTION` system
variables during execution of a multi-statement query. For more information
about the `EXCEPTION` system variables, see the procedural language statement
[BEGIN...EXCEPTION](procedural-language.md#beginexceptionend).

### Examples

You don't create system variables, but you can override
the default value for some of them:

```sql
SET @@dataset_project_id = 'MyProject';
```

The following example overrides the maximum staleness interval for subsequent queries in the session to 10 minutes:

```sql
SET @@max_staleness_override = INTERVAL 10 MINUTE;
```

To force queries to return the freshest, fully up-to-date results and apply pending modifications at query run time:

```sql
SET @@max_staleness_override = INTERVAL 0 SECOND;
```

To reset the staleness override back to the table-level settings, set `@@max_staleness_override` to `NULL`:

```sql
SET @@max_staleness_override = NULL;
```

The following query returns the default time zone:

```sql
SELECT @@time_zone AS default_time_zone;
```

```text
+-------------------+
| default_time_zone |
+-------------------+
| UTC               |
+-------------------+
```

You can use system variables with DDL and DML queries.
For example, here are a few ways to use the system variable `@@time_zone`
when creating and updating a table:

```sql
BEGIN
  CREATE TEMP TABLE MyTempTable
  AS SELECT @@time_zone AS default_time_zone;
END;
```

```sql
CREATE OR REPLACE TABLE MyDataset.MyTable(default_time_zone STRING)
  OPTIONS (description = @@time_zone);
```

```sql
UPDATE MyDataset.MyTable
SET default_time_zone = @@time_zone
WHERE TRUE;
```

There are some places where system variables can't be used in
DDL and DML queries. For example, you can't use a system variable as a
project name, dataset, or table name. The following query produces an error when
you include the `@@dataset_id` system variable in a table path:

```sql
BEGIN
  CREATE TEMP TABLE @@dataset_id.MyTempTable (id STRING);
END;
```

For more examples of how you can use system variables in multi-statement queries,
see [Set a variable](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries#set_system_variable).

For examples of how you can use system variables in sessions, see
[Example session](https://docs.cloud.google.com/bigquery/docs/sessions-write-queries#session_system_variables).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/system-variables (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
