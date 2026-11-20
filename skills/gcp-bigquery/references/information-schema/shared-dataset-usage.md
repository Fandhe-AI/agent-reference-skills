---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-shared-dataset-usage
---

# INFORMATION_SCHEMA.SHARED_DATASET_USAGE view

## Signature / Usage

The `INFORMATION_SCHEMA.SHARED_DATASET_USAGE` view contains the near real-time
metadata about consumption of your shared dataset tables. To get started with
sharing your data across organizations, see [BigQuery sharing (formerly Analytics Hub)](https://docs.cloud.google.com/bigquery/docs/analytics-hub-introduction).

### Required roles

To get the permission that
you need to query the `INFORMATION_SCHEMA.SHARED_DATASET_USAGE` view,

ask your administrator to grant you the
[BigQuery Data Owner](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataOwner) (`roles/bigquery.dataOwner`) IAM role on your source project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains the
`bigquery.datasets.listSharedDatasetUsage`
permission,
which is required to
query the `INFORMATION_SCHEMA.SHARED_DATASET_USAGE` view.

You might also be able to get
this permission
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

### Schema

The underlying data is partitioned by the `job_start_time` column and clustered by `project_id` and `dataset_id`.

The `INFORMATION_SCHEMA.SHARED_DATASET_USAGE` has the following schema:

| **Column name** | **Data type** | **Value** |
|---|---|---|
| `project_id` | `STRING` | **(*Clustering column*)** The ID of the project that contains the shared dataset. |
| `dataset_id` | `STRING` | **(*Clustering column*)** The ID of the shared dataset. |
| `table_id` | `STRING` | The ID of the accessed table. |
| `data_exchange_id` | `STRING` | The resource path of the data exchange. |
| `listing_id` | `STRING` | The resource path of the listing. |
| `job_start_time` | `TIMESTAMP` | **(*Partitioning column*)** The start time of this job. |
| `job_end_time` | `TIMESTAMP` | The end time of this job. |
| `job_id` | `STRING` | The job ID. For example, **bquxjob_1234**. |
| `job_project_number` | `INTEGER` | The number of the project this job belongs to. |
| `job_location` | `STRING` | The location of the job. |
| `linked_project_number` | `INTEGER` | The project number of the subscriber's project. |
| `linked_dataset_id` | `STRING` | The linked dataset ID of the subscriber's dataset. |
| `subscriber_org_number` | `INTEGER` | The organization number in which the job ran. This is the organization number of the subscriber. This field is empty for projects that don't have an organization. |
| `subscriber_org_display_name` | `STRING` | A human-readable string that refers to the organization in which the job ran. This is the organization number of the subscriber. This field is empty for projects that don't have an organization. |
| `job_principal_subject` | `STRING` | The principal identifier (user email ID, service account, group email ID, domain) of users who execute jobs and queries against linked datasets. |
| `num_rows_processed` | `INTEGER` | The total number of rows processed by the base tables that are referenced by the queried resource. |
| `total_bytes_processed` | `INTEGER` | The total number of bytes processed by the base tables that are referenced by the queried resource. |
| `shared_resource_id` | `STRING` | The ID of the queried resource (table, view, or routine). |
| `shared_resource_type` | `STRING` | The type of the queried resource. For example, `TABLE`, `EXTERNAL_TABLE`, `VIEW`, `MATERIALIZED_VIEW`, `TABLE_VALUED_FUNCTION`, or `SCALAR_FUNCTION`. |
| `referenced_tables` | `RECORD REPEATED` | Contains `project_id`, `dataset_id`, `table_id`, and `processed_bytes` fields of the base table. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

The `INFORMATION_SCHEMA.SHARED_DATASET_USAGE` view contains running
jobs and the job history of the past 180 days.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from the US
region. The following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]INFORMATION_SCHEMA.SHARED_DATASET_USAGE` | Project level | US region |
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

To run the query against a project other than your default project, add the
project ID in the following format:

`` `PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE ``

For example, `myproject.region-us.INFORMATION_SCHEMA.SHARED_DATASET_USAGE`.

#### Get the total number of jobs executed on all shared tables

The following example calculates total jobs run by [subscribers](https://docs.cloud.google.com/bigquery/docs/analytics-hub-view-subscribe-listings) for a project:

```googlesql
SELECT
  COUNT(DISTINCT job_id) AS num_jobs
FROM
  `region-us`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE
```

The result is similar to the following:

```text
+------------+
| num_jobs   |
+------------+
| 1000       |
+------------+
```

To check the total jobs run by subscribers, use the `WHERE` clause:

- For datasets, use `WHERE dataset_id = "..."`.
- For tables, use `WHERE dataset_id = "..." AND table_id = "..."`.

#### Get the most used table based on the number of rows processed

The following query calculates the most used table based on the number of rows
processed by subscribers.

```googlesql
SELECT
  dataset_id,
  table_id,
  SUM(num_rows_processed) AS usage_rows
FROM
  `region-us`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE
GROUP BY
  1,
  2
ORDER BY
  3 DESC
LIMIT
  1
```

The output is similar to the following:

```text
+---------------+-------------+----------------+
| dataset_id    | table_id      | usage_rows     |
+---------------+-------------+----------------+
| mydataset     | mytable     | 15             |
+---------------+-------------+----------------+
```

#### Find the top organizations that consume your tables

The following query calculates the top subscribers based on the number of bytes
processed from your tables. You can also use the `num_rows_processed` column as
a metric.

```googlesql
SELECT
  subscriber_org_number,
  ANY_VALUE(subscriber_org_display_name) AS subscriber_org_display_name,
  SUM(total_bytes_processed) AS usage_bytes
FROM
  `region-us`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE
GROUP BY
  1
```

The output is similar to the following:

```text
+--------------------------+--------------------------------+----------------+
|subscriber_org_number     | subscriber_org_display_name    | usage_bytes    |
+-----------------------------------------------------------+----------------+
| 12345                    | myorganization                 | 15             |
+--------------------------+--------------------------------+----------------+
```

For subscribers without an organization, you can use `job_project_number`
instead of `subscriber_org_number`.

#### Get usage metrics for your data exchange

If your [data exchange](https://docs.cloud.google.com/bigquery/docs/analytics-hub-introduction#data_exchanges)
and source dataset are in different projects, follow
these steps to view the usage metrics for your data exchange:

1. Find all [listings](https://docs.cloud.google.com/bigquery/docs/analytics-hub-introduction#listings) that belong to your data exchange.
2. Retrieve the source dataset attached to the listing.
3. To view the usage metrics for your data exchange, use the following query:

```googlesql
SELECT
  *
FROM
  source_project_1.`region-us`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE
WHERE
  dataset_id='source_dataset_id'
AND data_exchange_id="projects/4/locations/us/dataExchanges/x1"
UNION ALL
SELECT
  *
FROM
  source_project_2.`region-us`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE
WHERE
  dataset_id='source_dataset_id'
AND data_exchange_id="projects/4/locations/us/dataExchanges/x1"
```

#### Get usage metrics for shared views

The following query displays the usage metrics for all of the shared views
present in a project:

```googlesql
SELECT
  project_id,
  dataset_id,
  table_id,
  num_rows_processed,
  total_bytes_processed,
  shared_resource_id,
  shared_resource_type,
  referenced_tables
FROM `myproject`.`region-us`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE
WHERE shared_resource_type = 'VIEW'
```

The output is similar to the following:

```text
+---------------------+----------------+----------+--------------------+-----------------------+--------------------+----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|     project_id      |   dataset_id   | table_id | num_rows_processed | total_bytes_processed | shared_resource_id | shared_resource_type |                                                                                                              referenced_tables                                                                                                              |
+---------------------+----------------+----------+--------------------+-----------------------+--------------------+----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|     myproject       | source_dataset | view1    |                  6 |                    38 | view1              | VIEW                 | [{"project_id":"myproject","dataset_id":"source_dataset","table_id":"test_table","processed_bytes":"21"},
{"project_id":"bq-dataexchange-exp","dataset_id":"other_dataset","table_id":"other_table","processed_bytes":"17"}]                 |

+---------------------+----------------+----------+--------------------+-----------------------+--------------------+----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### Get usage metrics for shared table-valued functions

The following query displays the usage metrics for all of the shared
table-valued functions present in a project:

```googlesql
SELECT
  project_id,
  dataset_id,
  table_id,
  num_rows_processed,
  total_bytes_processed,
  shared_resource_id,
  shared_resource_type,
  referenced_tables
FROM `myproject`.`region-us`.INFORMATION_SCHEMA.SHARED_DATASET_USAGE
WHERE shared_resource_type = 'TABLE_VALUED_FUNCTION'
```

The output is similar to the following:

```text
+---------------------+----------------+----------+--------------------+-----------------------+--------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------+
|     project_id      |   dataset_id   | table_id | num_rows_processed | total_bytes_processed | shared_resource_id | shared_resource_type  |                                                  referenced_tables                                                  |
+---------------------+----------------+----------+--------------------+-----------------------+--------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------+
|     myproject       | source_dataset |          |                  3 |                    45 | provider_exp       | TABLE_VALUED_FUNCTION | [{"project_id":"myproject","dataset_id":"source_dataset","table_id":"test_table","processed_bytes":"45"}]           |
+---------------------+----------------+----------+--------------------+-----------------------+--------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-shared-dataset-usage (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
