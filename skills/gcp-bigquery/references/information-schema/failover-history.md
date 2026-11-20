---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-failover-history
---

# FAILOVER_HISTORY view

## Signature / Usage

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

To request feedback or support for this feature, send email to
[bigquery-wlm-feedback@google.com](mailto:bigquery-wlm-feedback@google.com).

The `INFORMATION_SCHEMA.FAILOVER_HISTORY` view contains a near real-time list
of failover events for reservations within the administration project that use
[managed disaster recovery](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery). Each row
represents a single failover event for a single reservation.

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.FAILOVER_HISTORY` and `INFORMATION_SCHEMA.FAILOVER_HISTORY_BY_PROJECT` are synonymous and can be used interchangeably.

### Required roles

To get the permission that
you need to query the `INFORMATION_SCHEMA.FAILOVER_HISTORY` view,

ask your administrator to grant you the
[BigQuery Resource Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.resourceViewer) (`roles/bigquery.resourceViewer`) IAM role on the project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains the
`bigquery.reservations.list`
permission,
which is required to
query the `INFORMATION_SCHEMA.FAILOVER_HISTORY` view.

You might also be able to get
this permission
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

### Schema

The `INFORMATION_SCHEMA.FAILOVER_HISTORY` view has the
following schema:

| Column name | Data type | Value |
|---|---|---|
| `project_id` | `STRING` | ID of the administration project that contains the reservation. |
| `project_number` | `INTEGER` | Number of the administration project. |
| `reservation_name` | `STRING` | User-provided reservation name. For example, if the reservation URI is `projects/my-project/locations/US/reservations/my-reservation`, then the reservation name is `my-reservation`. |
| `start_time` | `TIMESTAMP` | Time when the failover was initiated. |
| `original_primary_location` | `STRING` | The location where the reservation was originally created. |
| `from_location` | `STRING` | The primary location before the failover. This location becomes the secondary after the failover. |
| `to_location` | `STRING` | The secondary location before the failover, where the failover was initiated. This location becomes the primary after the failover. |
| `end_time` | `TIMESTAMP` | Time when the soft failover completed. `NULL` while the soft failover is in progress, and always `NULL` for the hard failover. |
| `failover_mode` | `STRING` | Type of failover. Can be `SOFT` or `HARD`. For more information, see [Managed disaster recovery](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery). |
| `state` | `STRING` | State of the failover. Can be `STARTED` (while a soft failover is in progress, or for a hard failover) or `COMPLETED` (after a soft failover finishes). For more information about the `STARTED` state for a hard failover, see [Limitations](#limitations). |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view keeps failover events for 180 days,
after which they are removed from the view.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). The following table
explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.FAILOVER_HISTORY[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Limitations

The following limitations apply to the `INFORMATION_SCHEMA.FAILOVER_HISTORY`
view:

- This view only contains failover events for reservations. It doesn't contain
  failover events for individual datasets.

- Each failover event is recorded in the region that becomes the new primary
  location (`to_location`). For example, if you fail over a reservation from
  `US` to `EU`, the event is recorded in `region-eu`. To view failover events
  in both directions between a primary and secondary location, query the view
  separately in each region.

- A hard failover doesn't wait for the operation to be confirmed in the
  secondary location, so a hard failover event has no completion signal. The
  `state` column for a hard failover event remains `STARTED`, and the
  `end_time` column remains `NULL`, even after the failover has taken effect.

### Example

The following example retrieves the failover events in `region-us` (where `US`
was the destination location `to_location` of the failover) for a specific
reservation and project, ordered by the most recent event:

```googlesql
SELECT
  project_id,
  reservation_name,
  failover_mode,
  state,
  original_primary_location,
  from_location,
  to_location,
  start_time,
  end_time
FROM
  `reservation-admin-project.region-us`.INFORMATION_SCHEMA.FAILOVER_HISTORY
WHERE
  reservation_name = 'my-reservation'
ORDER BY
  start_time DESC;
```

The output is similar to the following:

```text
+---------------+------------------+---------------+-----------+---------------------------+---------------+-------------+---------------------+---------------------+
|  project_id   | reservation_name | failover_mode |   state   | original_primary_location | from_location | to_location |     start_time      |      end_time       |
+---------------+------------------+---------------+-----------+---------------------------+---------------+-------------+---------------------+---------------------+
| my-admin-proj | my-reservation   | SOFT          | COMPLETED | US                        | EU            | US          | 2026-03-15 14:20:00 | 2026-03-15 14:31:05 |
| my-admin-proj | my-reservation   | HARD          | STARTED   | US                        | EU            | US          | 2026-02-10 08:15:30 | NULL                |
+---------------+------------------+---------------+-----------+---------------------------+---------------+-------------+---------------------+---------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-failover-history (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
