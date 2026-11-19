---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-reservation-timeline
---

# RESERVATIONS_TIMELINE view

## Signature / Usage

The `INFORMATION_SCHEMA.RESERVATIONS_TIMELINE` view shows
time slices of reservation metadata for each reservation administration project
for every minute in real time. Additionally, the `per_second_details` array
shows autoscale details for each second.

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.RESERVATIONS_TIMELINE`, `INFORMATION_SCHEMA.RESERVATIONS_TIMELINE_BY_PROJECT`, `INFORMATION_SCHEMA.RESERVATION_TIMELINE`, and `INFORMATION_SCHEMA.RESERVATION_TIMELINE_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permission

To query the `INFORMATION_SCHEMA.RESERVATIONS_TIMELINE` view, you need
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

When you query the `INFORMATION_SCHEMA.RESERVATIONS_TIMELINE` view, the query
results contain one row for every minute of every BigQuery
reservation in the last 180 days, and one row for every minute with reservation
changes for any occurrences older than 180 days. Each period starts on a whole-minute
interval and lasts exactly one minute.

The `INFORMATION_SCHEMA.RESERVATIONS_TIMELINE` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `autoscale` | `STRUCT` | Contains information about the autoscale capacity of the reservation. Fields include the following: - `current_slots`: the number of autoscaling slots available to the reservation. > [!WARNING] > Because `current_slots` could be updated multiple times within a minute, use `per_second_details.autoscale_current_slots` instead. It reflects accurate state for each second. > Also, after users reduce `max_slots`, it may take a while before it can be propagated, > so `current_slots` may stay in the original value and could be larger than `max_slots` > for that brief period (less than one minute). - `max_slots`: the maximum number of slots that could be added to the reservation by autoscaling. > [!NOTE] > **Note:** If you frequently change the `max_slots`, consider using the `per_second_details.autoscale_max_slots` instead. |
| `edition` | `STRING` | The edition associated with this reservation. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |
| `ignore_idle_slots` | `BOOL` | False if slot sharing is enabled, otherwise true. |
| `labels` | `RECORD` | Array of labels associated with the reservation. |
| `reservation_group_path` | `ARRAY<STRING>` | The reservation group to which the reservation is linked. For example, if the reservation is linked to group `my-group`, the `reservation_group_path` field contains a list such as: `[my-group]`. |
| `period_start` | `TIMESTAMP` | Start time of this one-minute period. |
| `per_second_details` | `STRUCT` | Contains information about the reservation capacity and usage at each second. Fields include the following: - `start_time`: the exact timestamp of the second. - `autoscale_current_slots`: the number of autoscaling slots available to the reservation at this second. This number excludes baseline slots. > [!NOTE] > **Note:** When you reduce `max_slots`, the change might not take effect immediately. During this brief period (under one minute), the `current_slots` might remain at its original value that could be higher than the value of `max_slots`. - `autoscale_max_slots`: the maximum number of slots that could be added to the reservation by autoscaling at this second. This number excludes baseline slots. - `slots_assigned`: the number of slots assigned to this reservation at this second. It equals the baseline slot capacity of a reservation. - `slots_max_assigned`: the maximum slot capacity for this reservation, including slot sharing. If `ignore_idle_slots` is true, this field is the same as `slots_assigned`. Otherwise this field is either the total number of slots in all capacity commitments or in all baselines in the administration project, whichever is larger. - `borrowed_slots`: the number of slots used from the idle slot sharing. Only populated if `ignore_idle_slots` is false, and idle slots were used during this second. - `lent_slots`: the number of slots other reservations use from the pool of baseline slots of this reservation. Only populated if `ignore_idle_slots` is false, and idle slots were used by other reservations during this second. If there are any autoscale or reservation changes during this minute, the array is populated with 60 rows. However, for non-autoscale reservations that remain unchanged during this minute, the array is empty because it'll otherwise repeat the same number 60 times. |
| `project_id` | `STRING` | ID of the reservation administration project. |
| `project_number` | `INTEGER` | Number of the project. |
| `reservation_id` | `STRING` | For joining with the jobs_timeline table. This is of the form *project_id*:*location*.*reservation_name*. |
| `reservation_name` | `STRING` | The name of the reservation. |
| `slot_capacity` | `INTEGER` | The baseline slot capacity of the reservation. |
| `slots_assigned` | `INTEGER` | The number of slots assigned to this reservation. |
| `slots_max_assigned` | `INTEGER` | The maximum slot capacity for this reservation, including slot sharing. If `ignore_idle_slots` is true, this is the same as `slots_assigned`, otherwise this is the total number of slots in all capacity commitments in the administration project. |
| `max_slots` | `INTEGER` | The maximum number of slots that this reservation can use, which includes baseline slots (`slot_capacity`), idle slots (if `ignore_idle_slots` is false), and autoscale slots. This field is specified by users for using the [reservation predictability feature](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#predictable). |
| `scaling_mode` | `STRING` | The scaling mode for the reservation, which determines how the reservation scales from baseline to `max_slots`. This field is specified by users for using the [reservation predictability feature](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#predictable). |
| `period_autoscale_slot_seconds` | `INTEGER` | The total slot seconds charged by autoscale for a specific minute (each data row corresponds to one minute). |
| `is_creation_region` | `BOOLEAN` | Specifies if the current region is the location where the reservation was created. This location is used to determine the pricing of the baseline reservation slots. For a failover [disaster recovery (DR)](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery) reservation, a `TRUE` value indicates the original primary location, while for a non-DR reservation, a `TRUE` value denotes the reservation's location. For a non-failover reservation, this value is always `TRUE`. For a failover reservation, the value depends on the region: `TRUE` for the original primary and `FALSE` for the original secondary. |
| `scheduling_policy` | `STRUCT` | The default [project caps](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#scheduling-policies) for each project using the reservation, or `NULL` if none are configured. Fields include the following: - `max_slots`: the default limit on the slot consumption of queries running for each project using the reservation, or `NULL` if unset. - `concurrency`: the default limit on the number of simultaneous queries admitted for each project using the reservation, or `NULL` if unset. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region and resource scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.RESERVATIONS_TIMELINE[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

##### Example: See autoscaling per second

The following example shows per-second autoscaling of
`YOUR_RESERVATION_ID` across all jobs:

```googlesql
SELECT s.start_time, s.autoscale_current_slots
FROM `region-us.INFORMATION_SCHEMA.RESERVATIONS_TIMELINE` m
JOIN m.per_second_details s
WHERE period_start BETWEEN '2025-09-28' AND '2025-09-29'
  AND reservation_id = 'YOUR_RESERVATION_ID'
ORDER BY period_start, s.start_time
```

The result is similar to the following:

```text
+---------------------+-------------------------+
|     start_time      | autoscale_current_slots |
+---------------------+-------------------------+
| 2025-09-28 00:00:00 |                    1600 |
| 2025-09-28 00:00:01 |                    1600 |
| 2025-09-28 00:00:02 |                    1600 |
| 2025-09-28 00:00:03 |                    1600 |
| 2025-09-28 00:00:04 |                    1600 |
+---------------------+-------------------------+
```

> [!NOTE]
> **Note:** The `period_start` column is a partitioning key, so it's important to filter by `period_start` to make the query efficient.

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

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-reservation-timeline (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.

## Related

- [Index of this directory](./README.md)
