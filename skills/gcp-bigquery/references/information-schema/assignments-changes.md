---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-assignments-changes
---

# ASSIGNMENT_CHANGES view

## Signature / Usage

The `INFORMATION_SCHEMA.ASSIGNMENT_CHANGES` view contains a near real-time list
of all changes to assignments within the administration project. Each row
represents a single change to a single assignment. For more information about
reservation, see [Introduction to Reservations](https://docs.cloud.google.com/bigquery/docs/reservations-intro).

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.ASSIGNMENT_CHANGES` and `INFORMATION_SCHEMA.ASSIGNMENT_CHANGES_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permission

To query the `INFORMATION_SCHEMA.ASSIGNMENT_CHANGES` view, you need the
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

The `INFORMATION_SCHEMA.ASSIGNMENT_CHANGES` view has the following
schema:

| Column name | Data type | Value |
|---|---|---|
| `change_timestamp` | `TIMESTAMP` | Time when the change occurred. |
| `project_id` | `STRING` | ID of the administration project. |
| `project_number` | `INTEGER` | Number of the administration project. |
| `assignment_id` | `STRING` | ID that uniquely identifies the assignment. |
| `reservation_name` | `STRING` | Name of the reservation that the assignment uses. |
| `job_type` | `STRING` | The type of job that can use the reservation. Can be `PIPELINE`, `QUERY`, `CONTINUOUS`, `ML_EXTERNAL`, or `BACKGROUND`. When `assignment_type` is `SCHEDULING_POLICY`, this value is `JOB_TYPE_UNSPECIFIED`. |
| `assignee_id` | `STRING` | ID that uniquely identifies the assignee resource. |
| `assignee_number` | `INTEGER` | Number that uniquely identifies the assignee resource. |
| `assignee_type` | `STRING` | Type of assignee resource. Can be `organization`, `folder` or `project`. |
| `action` | `STRING` | Type of event that occurred with the assignment. Can be `CREATE`, `UPDATE`, or `DELETE`. |
| `user_email` | `STRING` | Email address of the user or subject of the [workforce identity federation](https://docs.cloud.google.com/iam/docs/workforce-identity-federation) that made the change. `google` for changes made by Google. `NULL` if the email address is unknown. |
| `state` | `STRING` | State of the assignment. Can be `PENDING` or `ACTIVE`. |
| `assignment_type` | `STRING` | Type of the assignment. Can be `RESERVATION_SELECTION` for assignments that route jobs to a reservation, or `SCHEDULING_POLICY` for [project caps and scheduling policy overrides](https://docs.cloud.google.com/bigquery/docs/reservations-assignments#scheduling-policy-assignments). If a change to a reservation-selection assignment occurred before `assignment_type` tracking was supported, this value is `NULL`. |
| `scheduling_policy` | `STRUCT` | Project-specific [project caps and scheduling policy overrides](https://docs.cloud.google.com/bigquery/docs/reservations-assignments#scheduling-policy-assignments) for `assignee_id` within the reservation, or `NULL` if `assignment_type` isn't `SCHEDULING_POLICY`. Fields include the following: - `max_slots`: the limit on the slot consumption of queries running for `assignee_id` in the reservation, or `NULL` if unset. - `concurrency`: the limit on the number of simultaneous queries admitted for `assignee_id` in the reservation, or `NULL` if unset. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view contains current assignments and deleted assignments that are
kept for a maximum of 41 days after which they are removed from the view.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.ASSIGNMENT_CHANGES[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Examples

#### Find the latest changes to an assignment

The following example displays the user who has made the latest assignment
update to a particular assignment within a specified date.

```googlesql
SELECT
  user_email,
  change_timestamp,
  reservation_name,
  assignment_id
FROM
  `region-us`.INFORMATION_SCHEMA.ASSIGNMENT_CHANGES
WHERE
  change_timestamp BETWEEN '2021-09-30' AND '2021-10-01'
  AND assignment_id = 'assignment_01'
ORDER BY
  change_timestamp DESC
LIMIT 1;
```

The result is similar to the following:

```text
+--------------------------------+-----------------------+--------------------+-----------------+
|           user_email           |    change_timestamp   |  reservation_name  |  assignment_id  |
+--------------------------------+-----------------------+--------------------+-----------------+
|  cloudysanfrancisco@gmail.com  |2021-09-30 09:30:00 UTC|   my_reservation   |  assignment_01  |
+--------------------------------+-----------------------+--------------------+-----------------+
```

#### Identify the assignment status of a reservation at a specific point in time

The following example displays all of the active assignments of a reservation at
a certain point in time.

Adapted (not in the official docs): moved the `reservation_name` condition from `WHERE` to `QUALIFY`, so that it is checked after the latest change of each assignment is found.

```googlesql
SELECT
    reservation_name,
    assignee_id,
    assignee_type,
    job_type
FROM
    `region-REGION`.INFORMATION_SCHEMA.ASSIGNMENT_CHANGES
WHERE
    change_timestamp < TIMESTAMP
QUALIFY ROW_NUMBER() OVER(PARTITION BY assignee_id, job_type ORDER BY change_timestamp DESC) = 1
AND action != 'DELETE'
AND reservation_name = RESERVATION_NAME;
```

Replace the following:

- <var translate="no">`REGION`</var>: the region where your reservation is located
- <var translate="no">`RESERVATION_NAME`</var>: the name of the reservation that the assignment uses
- <var translate="no">`TIMESTAMP`</var>: the timestamp representing the specific point in time at which the list of assignments is checked

The result is similar to the following:

```text
+-------------------------+---------------------------+---------------+----------+
|    reservation_name     |        assignee_id        | assignee_type | job_type |
+-------------------------+---------------------------+---------------+----------+
| test-reservation        | project_1                 | PROJECT       | QUERY    |
| test-reservation        | project_2                 | PROJECT       | QUERY    |
+-------------------------+---------------------------+---------------+----------+
```

#### Identify the assignment status of a reservation when a particular job was executed

To display the assignments that were active when a certain job was executed,
use the following example.

Adapted (not in the official docs): moved the `reservation_name` condition from `WHERE` to `QUALIFY`, so that it is checked after the latest change of each assignment is found.

```googlesql
SELECT
    reservation_name,
    assignee_id,
    assignee_type,
    job_type
FROM
    `region-REGION`.INFORMATION_SCHEMA.ASSIGNMENT_CHANGES
WHERE
    change_timestamp < (SELECT creation_time FROM PROJECT_ID.`region-REGION`.INFORMATION_SCHEMA.JOBS WHERE job_id = JOB_ID)
QUALIFY ROW_NUMBER() OVER(PARTITION BY assignee_id, job_type ORDER BY change_timestamp DESC) = 1
AND action != 'DELETE'
AND reservation_name = RESERVATION_NAME;
```

Replace the following:

- <var translate="no">`REGION`</var>: the region where your reservation is located
- <var translate="no">`RESERVATION_NAME`</var>: the name of the reservation that the assignment uses
- <var translate="no">`PROJECT_ID`</var>: the ID of your Google Cloud project where the job was executed
- <var translate="no">`JOB_ID`</var>: the job ID against which the assignment status was checked

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-assignments-changes (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.
- Corrected from the official docs: the two examples that list the assignments of a reservation at a point in time filter on `reservation_name` in `WHERE`, before `QUALIFY` picks the latest change for each `assignee_id` and `job_type`. If an assignment later moved to another reservation, that later change is filtered out, and the older change in the requested reservation is returned as the latest. The condition is moved to `QUALIFY`, after the latest change is picked.
- Caution: those two examples are described as returning active assignments, but `action != 'DELETE'` alone also returns assignments whose latest change has `state` `PENDING`; the schema on this page lists `PENDING` and `ACTIVE`. The page doesn't say whether the change from `PENDING` to `ACTIVE` is recorded as a separate change, so no `state` condition is added to the examples. Check the `state` column of the results.

## Related

- [Index of this directory](./README.md)
