---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-reservations
---

# RESERVATIONS view

## Signature / Usage

The `INFORMATION_SCHEMA.RESERVATIONS` view contains a near real-time list of all
current reservations within the administration project. Each row represents a
single, current reservation. A current reservation is a reservation that has not
been deleted. For more information about reservation, see
[Introduction to reservations](https://docs.cloud.google.com/bigquery/docs/reservations-intro).

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.RESERVATIONS` and `INFORMATION_SCHEMA.RESERVATIONS_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permission

To query the `INFORMATION_SCHEMA.RESERVATIONS` view, you need
the `bigquery.reservations.list` Identity and Access Management (IAM) permission on the
project.
Each of the following predefined IAM roles includes the required
permission:

- BigQuery Resource Admin (`roles/bigquery.resourceAdmin`)
- BigQuery Resource Editor (`roles/bigquery.resourceEditor`)
- BigQuery Resource Viewer (`roles/bigquery.resourceViewer`)
- BigQuery User (`roles/bigquery.user`)
- BigQuery Admin (`roles/bigquery.admin`)

For more information about BigQuery permissions, see
[BigQuery IAM roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The `INFORMATION_SCHEMA.RESERVATIONS` view has the
following schema:

| Column name | Data type | Value |
|---|---|---|
| `ddl` | `STRING` | The DDL statement used to create this reservation. |
| `project_id` | `STRING` | ID of the administration project. |
| `project_number` | `INTEGER` | Number of the administration project. |
| `reservation_name` | `STRING` | User provided reservation name. |
| `ignore_idle_slots` | `BOOL` | If false, any query using this reservation can use unused idle slots from other capacity commitments. |
| `slot_capacity` | `INTEGER` | The baseline slot capacity of the reservation. |
| `target_job_concurrency` | `INTEGER` | The target number of queries that can execute simultaneously, which is limited by available resources. If zero, then this value is computed automatically based on available resources. |
| `autoscale` | `STRUCT` | Information about the autoscale capacity of the reservation. Fields include the following: - `current_slots`: the number of slots added to the reservation by autoscaling. > [!NOTE] > **Note:** After users reduce `max_slots`, it may take a while before it can be propagated, so `current_slots` may stay in the original value and could be larger than `max_slots` for that brief period (less than one minute). - `max_slots`: the maximum number of slots that could be added to the reservation by autoscaling. |
| `edition` | `STRING` | The edition associated with this reservation. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |
| `primary_location` | `STRING` | The current location of the reservation's primary replica. This field is only set for reservations using the [managed disaster recovery feature](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery). |
| `secondary_location` | `STRING` | The current location of the reservation's secondary replica. This field is only set for reservations using the [managed disaster recovery feature](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery). |
| `original_primary_location` | `STRING` | The location where the reservation was originally created. |
| `labels` | `RECORD` | Array of labels associated with the reservation. |
| `reservation_group_path` | `ARRAY<STRING>` | The reservation group to which the reservation is linked. For example, if the reservation is linked to group `my-group`, the `reservation_group_path` field contains a list such as: `[my-group]`. |
| `max_slots` | `INTEGER` | The maximum number of slots that this reservation can use, which includes baseline slots (`slot_capacity`), idle slots (if `ignore_idle_slots` is false), and autoscale slots. This field is specified by users for using the [reservation predictability feature](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#predictable). |
| `scaling_mode` | `STRING` | The scaling mode for the reservation, which determines how the reservation scales from baseline to `max_slots`. This field is specified by users for using the [reservation predictability feature](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#predictable). |
| `scheduling_policy` | `STRUCT` | The default [project caps](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#scheduling-policies) for each project using the reservation, or `NULL` if none are configured. Fields include the following: - `max_slots`: the default limit on the slot consumption of queries running for each project using the reservation, or `NULL` if unset. - `concurrency`: the default limit on the number of simultaneous queries admitted for each project using the reservation, or `NULL` if unset. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region
qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). The following table
explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.RESERVATIONS[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Joining between the reservation views and the job views

The [job views](jobs-by-user.md) contain the column
`reservation_id`. If your job ran in a project with a reservation assigned to
it, `reservation_id` would follow this format:
`reservation-admin-project:reservation-location.reservation-name`.

To join between the reservation views and the job views, you can join between
the job views column `reservation_id` and the reservation views columns
`project_id` and `reservation_name`. The following example shows an example of
using the `JOIN` clause between the reservation and the job views.

### Example

The following example shows slot usage, slot capacity, and assigned reservation
for a project with a reservation assignment, over the past hour. Slot usage is
given in units of slot milliseconds per second.

```googlesql
WITH
  job_data AS (
  SELECT
    job.period_start,
    job.reservation_id,
    job.period_slot_ms,
    job.job_id,
    job.job_type
  FROM
    `my-project.region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE AS job
  WHERE
    job.period_start > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR))
SELECT
  reservation.reservation_name AS reservation_name,
  job.period_start,
  reservation.slot_capacity,
  job.period_slot_ms,
  job.job_id,
  job.job_type
FROM
  job_data AS job
INNER JOIN
  `reservation-admin-project.region-us`.INFORMATION_SCHEMA.RESERVATIONS AS reservation
ON
  (job.reservation_id = CONCAT(reservation.project_id, ":", "US", ".", reservation.reservation_name));
```

The output is similar to the following:

```text
+------------------+---------------------+---------------+----------------+------------------+----------+
| reservation_name |    period_start     | slot_capacity | period_slot_ms |           job_id | job_type |
+------------------+---------------------+---------------+----------------+------------------+----------+
| my_reservation   | 2021-04-30 17:30:54 |           100 |          11131 | bquxjob_66707... | QUERY    |
| my_reservation   | 2021-04-30 17:30:55 |           100 |          49978 | bquxjob_66707... | QUERY    |
| my_reservation   | 2021-04-30 17:30:56 |           100 |           9038 | bquxjob_66707... | QUERY    |
| my_reservation   | 2021-04-30 17:30:57 |           100 |          17237 | bquxjob_66707... | QUERY    |
```

This query uses the `RESERVATIONS` view to get reservation
information. If the reservations have changed in the past hour, the
`reservation_slot_capacity` column might not be accurate.

The query joins `RESERVATIONS` with
[`JOBS_TIMELINE`](jobs-timeline.md) to
associate the job timeslices with the reservation information.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-reservations (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
