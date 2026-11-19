---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-capacity-commitment-changes
---

# CAPACITY_COMMITMENT_CHANGES view

## Signature / Usage

The `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` view contains a near
real-time list of all changes to capacity commitments within the administration
project. Each row represents a single change to a single capacity commitment.
For more information, see [Slot commitments](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_commitments).

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` and `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permission

To query the `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` view,
you need the `bigquery.capacityCommitments.list` Identity and Access Management (IAM)
permission for the project.
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

The `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` view has the
following schema:

| Column name | Data type | Value |
|---|---|---|
| `change_timestamp` | `TIMESTAMP` | Time when the change occurred. |
| `project_id` | `STRING` | ID of the administration project. |
| `project_number` | `INTEGER` | Number of the administration project. |
| `capacity_commitment_id` | `STRING` | ID that uniquely identifies the capacity commitment. |
| `commitment_plan` | `STRING` | Commitment plan of the capacity commitment. |
| `state` | `STRING` | State the capacity commitment is in. Can be `PENDING` or `ACTIVE`. |
| `slot_count` | `INTEGER` | Slot count associated with the capacity commitment. |
| `action` | `STRING` | Type of event that occurred with the capacity commitment. Can be `CREATE`, `UPDATE`, or `DELETE`. |
| `user_email` | `STRING` | Email address of the user or subject of the [workforce identity federation](https://docs.cloud.google.com/iam/docs/workforce-identity-federation) that made the change. `google` for changes made by Google. `NULL` if the email address is unknown. |
| `commitment_start_time` | `TIMESTAMP` | The start of the current commitment period. Only applicable for `ACTIVE` capacity commitments, otherwise this is `NULL`. |
| `commitment_end_time` | `TIMESTAMP` | The end of the current commitment period. Only applicable for `ACTIVE` capacity commitments, otherwise this is `NULL`. |
| `failure_status` | `RECORD` | For a `FAILED` commitment plan, provides the failure reason, otherwise this is `NULL`. `RECORD` consists of `code` and `message`. |
| `renewal_plan` | `STRING` | The plan this capacity commitment is converted to after `commitment_end_time` passes. After the plan is changed, the committed period is extended according to the commitment plan. Only applicable for `ANNUAL` and `TRIAL` commitments, otherwise this is `NULL`. |
| `edition` | `STRING` | The edition associated with this reservation. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |
| `is_flat_rate` | `BOOL` | Whether the commitment is associated with the legacy flat-rate capacity model or an edition. If `FALSE`, the current commitment is associated with an edition. If `TRUE`, the commitment is the legacy flat-rate capacity model. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Data retention

This view contains current capacity commitments and the deleted capacity
commitments that are kept for a maximum of 41 days after which they are removed
from the view.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

The following query displays the user who has made the latest capacity commitment
update to the current project within the specified date.

```googlesql
SELECT
  user_email,
  change_timestamp
FROM
  `region-us`.INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES
WHERE
  change_timestamp BETWEEN '2021-09-30' AND '2021-10-01'
ORDER BY
  change_timestamp DESC
LIMIT 1;
```

The result is similar to the following:

```text
+--------------------------------+-------------------------+
|           user_email           |     change_timestamp    |
+--------------------------------+-------------------------+
|     222larabrown@gmail.com     | 2021-09-30 09:30:00 UTC |
+--------------------------------+-------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-capacity-commitment-changes (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.

## Related

- [Index of this directory](./README.md)
