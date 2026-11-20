---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-schemata-replicas
---

# SCHEMATA_REPLICAS view

## Signature / Usage

The `INFORMATION_SCHEMA.SCHEMATA_REPLICAS` view contains information about schemata replicas.

### Required roles

To get the permission that
you need to query the `INFORMATION_SCHEMA.SCHEMATA_REPLICAS` view,

ask your administrator to grant you the
[BigQuery Data Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataViewer) (`roles/bigquery.dataViewer`) IAM role on the project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains the
`bigquery.datasets.get`
permission,
which is required to
query the `INFORMATION_SCHEMA.SCHEMATA_REPLICAS` view.

You might also be able to get
this permission
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

### Schema

The `INFORMATION_SCHEMA.SCHEMATA_REPLICAS` view contains information about dataset replicas. The `INFORMATION_SCHEMA.SCHEMATA_REPLICAS` view has the following schema:

| Column | Type | Description |
|---|---|---|
| `catalog_name` | `STRING` | The project ID of the project that contains the dataset. |
| `schema_name` | `STRING` | The dataset ID of the dataset. |
| `replica_name` | `STRING` | The name of the replica. |
| `location` | `STRING` | The region or multi-region the replica was created in. |
| `replica_primary_assigned` | `BOOL` | If the value is `TRUE`, the replica has the primary assignment. When you change a secondary replica to a primary, this state takes effect immediately. |
| `replica_primary_assignment_complete` | `BOOL` | If the value is `TRUE`, the primary assignment is complete. If the value is `FALSE`, the replica is not (yet) the primary replica, even if `replica_primary_assigned` equals `TRUE`. For information about how long it takes for a secondary replica to become a primary, see [Promote the secondary replica](https://docs.cloud.google.com/bigquery/docs/data-replication#promote_the_secondary_replica). |
| `creation_time` | `TIMESTAMP` | The replica's creation time. When the replica is first created, it is not fully synced with the primary replica until `creation_complete` equals `TRUE`. The value of `creation_time` is set before `creation_complete` equals `TRUE`. |
| `creation_complete` | `BOOL` | If the value is `TRUE`, the initial full sync of the primary replica to the secondary replica is complete. |
| `replication_time` | `TIMESTAMP` | The value for `replication_time` indicates the staleness of the dataset. Some tables in the replica might be ahead of this timestamp. This value is only visible in the secondary region. If the dataset contains a table with streaming data, the value of `replication_time` will not be accurate. |
| `sync_status` | `JSON` | The status of the sync between the primary and secondary replicas for [cross-region replication](https://docs.cloud.google.com/bigquery/docs/data-replication) and [disaster recovery](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery) datasets. Returns `NULL` if the replica is a primary replica or the dataset doesn't use replication. |
| `replica_primary_assignment_time` | `TIMESTAMP` | The time at which the primary switch to the replica was triggered. |
| `replica_primary_assignment_completion_time` | `TIMESTAMP` | The time at which the primary switch to the replica was completed. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

This section lists example queries of the
`INFORMATION_SCHEMA.SCHEMATA_REPLICAS` view.

**Example: List all replicated datasets in a region**

The following example lists all the replicated datasets in the `US` region:

```googlesql
SELECT * FROM `region-us`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS;
```

The result is similar to the following:

```text
+---------------------+-------------------+--------------+----------+--------------------------+-------------------------------------+---------------------+-------------------+------------------+
|    catalog_name     |    schema_name    | replica_name | location | replica_primary_assigned | replica_primary_assignment_complete |    creation_time    | creation_complete | replication_time |
+---------------------+-------------------+--------------+----------+--------------------------+-------------------------------------+---------------------+-------------------+------------------+
| myproject           | replica1          | us-east7     | us-east7 |                     true |                                true | 2023-04-17 20:42:45 |              true |             NULL |
| myproject           | replica1          | us-east4     | us-east4 |                    false |                               false | 2023-04-17 20:44:26 |              true |             NULL |
+---------------------+-------------------+--------------+----------+--------------------------+-------------------------------------+---------------------+-------------------+------------------+
```

**Example: List replicated datasets and the primary replica for each**

The following example lists all replicated datasets and their primary replica in the `US` region:

```googlesql
SELECT
 catalog_name,
 schema_name,
 replica_name AS primary_replica_name,
 location AS primary_replica_location,
 replica_primary_assignment_complete AS is_primary,
FROM
 `region-us`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS
WHERE
 replica_primary_assignment_complete = TRUE
 AND replica_primary_assigned = TRUE;
```

The result is similar to the following:

```text
+---------------------+-------------+----------------------+--------------------------+------------+
|    catalog_name     | schema_name | primary_replica_name | primary_replica_location | is_primary |
+---------------------+-------------+----------------------+--------------------------+------------+
| myproject           | my_schema1  | us-east4             | us-east4                 |       true |
| myproject           | my_schema2  | us                   | US                       |       true |
| myproject           | my_schema2  | us                   | US                       |       true |
+---------------------+-------------+----------------------+--------------------------+------------+
```

<br />

**Example: List replicated datasets and their replica states**

The following example lists all replicated datasets and their replica states:

```googlesql
SELECT
  catalog_name,
  schema_name,
  replica_name,
  CASE
    WHEN (replica_primary_assignment_complete = TRUE AND replica_primary_assigned = TRUE) THEN 'PRIMARY'
    WHEN (replica_primary_assignment_complete = FALSE
    AND replica_primary_assigned = FALSE) THEN 'SECONDARY'
  ELSE
  'PENDING'
END
  AS replica_state,
FROM
  `region-us`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS;
```

The result is similar to the following:

```text
+---------------------+-------------+--------------+---------------+
|    catalog_name     | schema_name | replica_name | replica_state |
+---------------------+-------------+--------------+---------------+
| myproject           | my_schema1  | us-east4     | PRIMARY       |
| myproject           | my_schema1  | my_replica   | SECONDARY     |
+---------------------+-------------+--------------+---------------+
```

**Example: List when each replica was created and whether the initial backfill is
complete**

The following example lists all replicas and when that replica was created. When a secondary replica is created, its data is not fully synced with the primary replica until `creation_complete` equals `TRUE`.

```googlesql
SELECT
 catalog_name,
 schema_name,
 replica_name,
 creation_time AS creation_time,
FROM
 `region-us`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS
WHERE
 creation_complete = TRUE;
```

The result is similar to the following:

```text
+---------------------+-------------+--------------+---------------------+
|    catalog_name     | schema_name | replica_name |    creation_time    |
+---------------------+-------------+--------------+---------------------+
| myproject           | my_schema1  | us-east4     | 2023-06-15 00:09:11 |
| myproject           | my_schema2  | us           | 2023-06-15 00:19:27 |
| myproject           | my_schema2  | my_replica2  | 2023-06-15 00:19:50 |
| myproject           | my_schema1  | my_replica   | 2023-06-15 00:16:19 |
+---------------------+-------------+--------------+---------------------+
```

<br />

**Example: Show the most recent synced time**

The following example shows the most recent timestamp when the secondary replica
caught up with the primary replica.

You must run this query in the region that contains the secondary replica. Some
tables in the dataset might be ahead of the reported replication time.

```googlesql
SELECT
 catalog_name,
 schema_name,
 replica_name,
 -- Calculate the replication lag in seconds.
 TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), replication_time, SECOND) AS replication_lag_seconds, -- RLS
 -- Calculate the replication lag in minutes.
 TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), replication_time, MINUTE) AS replication_lag_minutes, -- RLM
 -- Show the last sync time for easier interpretation.
 replication_time AS secondary_replica_fully_synced_as_of_time,
FROM
 `region-us`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS
```

The result is similar to the following:

```text
+---------------------+-------------+--------------+-----+-----+-------------------------------------------+
|    catalog_name     | schema_name | replica_name | rls | rlm | secondary_replica_fully_synced_as_of_time |
+---------------------+-------------+--------------+-----+-----+-------------------------------------------+
| myproject           | my_schema1  | us-east4     |  23 |   0 |                       2023-06-15 00:18:49 |
| myproject           | my_schema2  | us           |  67 |   1 |                       2023-06-15 00:22:49 |
| myproject           | my_schema1  | my_replica   |  11 |   0 |                       2023-06-15 00:28:49 |
| myproject           | my_schema2  | my_replica2  | 125 |   2 |                       2023-06-15 00:29:20 |
+---------------------+-------------+--------------+-----+-----+-------------------------------------------+
```

A value of `NULL` indicates that the secondary replica was never fully synced to
the primary replica.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-schemata-replicas (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
