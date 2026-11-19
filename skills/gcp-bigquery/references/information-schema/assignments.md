---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-assignments
---

# ASSIGNMENTS view

## Signature / Usage

The `INFORMATION_SCHEMA.ASSIGNMENTS` view contains a near real-time list of all
current assignments within the administration project. Each row represents a
single, current assignment. A current assignment is either pending or active and
has not been deleted. For more information about reservations, see [Introduction
to Reservations](https://docs.cloud.google.com/bigquery/docs/reservations-intro).

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.ASSIGNMENTS` and `INFORMATION_SCHEMA.ASSIGNMENTS_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permission

To query the `INFORMATION_SCHEMA.ASSIGNMENTS` view, you need the
`bigquery.reservationAssignments.list` Identity and Access Management (IAM) permission for
the project.
Each of the following predefined IAM roles includes the required
permission:

- `roles/bigquery.resourceAdmin`
- `roles/bigquery.resourceEditor`
- `roles/bigquery.resourceViewer`
- `roles/bigquery.user`
- `roles/bigquery.admin`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The `INFORMATION_SCHEMA.ASSIGNMENTS` view has the following
schema:

| Column name | Data type | Value |
|---|---|---|
| `ddl` | `STRING` | The DDL statement used to create this assignment. |
| `project_id` | `STRING` | ID of the administration project. |
| `project_number` | `INTEGER` | Number of the administration project. |
| `assignment_id` | `STRING` | ID that uniquely identifies the assignment. |
| `reservation_name` | `STRING` | Name of the reservation that the assignment uses. |
| `job_type` | `STRING` | The type of job that can use the reservation. Can be `PIPELINE`, `QUERY`, `CONTINUOUS`, `ML_EXTERNAL`, or `BACKGROUND`. When `assignment_type` is `SCHEDULING_POLICY`, this value is `JOB_TYPE_UNSPECIFIED`. |
| `assignee_id` | `STRING` | ID that uniquely identifies the assignee resource. |
| `assignee_number` | `INTEGER` | Number that uniquely identifies the assignee resource. |
| `assignee_type` | `STRING` | Type of assignee resource. Can be `organization`, `folder` or `project`. |
| `assignment_type` | `STRING` | Type of the assignment. Can be `RESERVATION_SELECTION` for assignments that route jobs to a reservation, or `SCHEDULING_POLICY` for [project caps and scheduling policy overrides](https://docs.cloud.google.com/bigquery/docs/reservations-assignments#scheduling-policy-assignments). If a reservation-selection assignment was created before `assignment_type` tracking was supported and hasn't been updated since, this value is `NULL`. |
| `scheduling_policy` | `STRUCT` | Project-specific [project caps and scheduling policy overrides](https://docs.cloud.google.com/bigquery/docs/reservations-assignments#scheduling-policy-assignments) for `assignee_id` within the reservation, or `NULL` if `assignment_type` isn't `SCHEDULING_POLICY`. Fields include the following: - `max_slots`: the limit on the slot consumption of queries running for `assignee_id` in the reservation, or `NULL` if unset. - `concurrency`: the limit on the number of simultaneous queries admitted for `assignee_id` in the reservation, or `NULL` if unset. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.ASSIGNMENTS[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.ASSIGNMENTS
```
.

<br />

Replace the following:

- <var translate="no">PROJECT_ID</var>: the ID of the project to which you have assigned reservations.
- <var translate="no">REGION_NAME</var>: the name of the region.

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.ASSIGNMENTS ``.

The following example gets a project's currently assigned reservation and its
slot capacity. This information is useful for debugging job performance by
comparing the project's slot usage with the slot capacity of the reservation
assigned to that project.

```googlesql
SELECT
  reservation.reservation_name,
  reservation.slot_capacity
FROM
  `RESERVATION_ADMIN_PROJECT.region-REGION_NAME`.
  INFORMATION_SCHEMA.ASSIGNMENTS_BY_PROJECT assignment
INNER JOIN
  `RESERVATION_ADMIN_PROJECT.region-REGION_NAME`.
  INFORMATION_SCHEMA.RESERVATIONS_BY_PROJECT AS reservation
ON
  (assignment.reservation_name = reservation.reservation_name)
WHERE
   assignment.assignee_id = "PROJECT_ID"
  AND job_type = "QUERY";
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-assignments (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
