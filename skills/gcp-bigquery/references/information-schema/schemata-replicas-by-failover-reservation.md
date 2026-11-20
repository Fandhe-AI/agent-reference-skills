---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-schemata-replicas-by-failover-reservation
---

# SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION view

## Signature / Usage

The `INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION` view contains
information about schemata replicas associated with a failover reservation. The
`INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION` view is scoped to
the project of the failover reservation, as opposed to the
[`INFORMATION_SCHEMA.SCHEMATA_REPLICAS`
view](schemata-replicas.md) that is scoped to the
project that contains the dataset.

### Required roles

To get the permission that
you need to query the `INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION` view,

ask your administrator to grant you the
[BigQuery Resource Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.resourceViewer) (`roles/bigquery.resourceViewer`) IAM role on the project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains the
`bigquery.reservations.listFailoverDatasets`
permission,
which is required to
query the `INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION` view.

You might also be able to get
this permission
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

### Schema

The `INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION` view has the following schema:

| Column | Type | Description |
|---|---|---|
| `failover_reservation_project_id` | `STRING` | The project ID of the failover reservation admin project if it's associated with the replica. |
| `failover_reservation_name` | `STRING` | The name of the failover reservation if it's associated with the replica. |
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
| ``[RESERVATION_PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION[_BY_PROJECT]`` | Project level | `REGION` |

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
`INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION` view.

**Example: List all replicated datasets in a region**

The following example lists all the replicated datasets in the `US` region:

```googlesql
SELECT *
FROM `region-us`.INFORMATION_SCHEMA.SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION
WHERE failover_reservation_name = "failover_reservation";
```

The result is similar to the following:

```text
+--------------+--------------+--------------+----------+--------------------------+-------------------------------------+---------------------+-------------------+---------------------+---------------------------------+---------------------------+-------------------------------------------------------------------------------+
| catalog_name | schema_name  | replica_name | location | replica_primary_assigned | replica_primary_assignment_complete |    creation_time    | creation_complete |  replication_time   | failover_reservation_project_id | failover_reservation_name |                                  sync_status                                  |
+--------------+--------------+--------------+----------+--------------------------+-------------------------------------+---------------------+-------------------+---------------------+---------------------------------+---------------------------+-------------------------------------------------------------------------------+
| project2     | test_dataset | us-east4     | us-east4 |                     true |                                true | 2024-05-09 20:34:06 |              true |                NULL | project1                        | failover_reservation      |                                                                          NULL |
| project2     | test_dataset | us           | US       |                    false |                               false | 2024-05-09 20:34:05 |              true | 2024-05-10 18:31:06 | project1                        | failover_reservation      | {"last_completion_time":"2024-06-06 18:31:06","error_time":null,"error":null} |
+--------------+--------------+--------------+----------+--------------------------+-------------------------------------+---------------------+-------------------+---------------------+---------------------------------+---------------------------+-------------------------------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-schemata-replicas-by-failover-reservation (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
