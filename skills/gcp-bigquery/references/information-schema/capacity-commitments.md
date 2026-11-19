---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-capacity-commitments
---

# CAPACITY_COMMITMENTS view

## Signature / Usage

The `INFORMATION_SCHEMA.CAPACITY_COMMITMENTS` view contains a near real-time
list of all current capacity commitments within the administration project. Each
row represents a single, current capacity commitment. A current capacity
commitment is either pending or active and has not been deleted. For more
information about reservation, see [Slot commitments](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_commitments).

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.CAPACITY_COMMITMENTS` and `INFORMATION_SCHEMA.CAPACITY_COMMITMENTS_BY_PROJECT` are synonymous and can be used interchangeably.

### Required permission

To query the `INFORMATION_SCHEMA.CAPACITY_COMMITMENTS` view,
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
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control)

### Schema

The `INFORMATION_SCHEMA.CAPACITY_COMMITMENTS` view has the
following schema:

| Column name | Data type | Value |
|---|---|---|
| `ddl` | `STRING` | The DDL statement used to create this capacity commitment. |
| `project_id` | `STRING` | ID of the administration project. |
| `project_number` | `INTEGER` | Number of the administration project. |
| `capacity_commitment_id` | `STRING` | ID that uniquely identifies the capacity commitment. |
| `commitment_plan` | `STRING` | Commitment plan of the capacity commitment. |
| `state` | `STRING` | State the capacity commitment is in. Can be `PENDING` or `ACTIVE`. |
| `slot_count` | `INTEGER` | Slot count associated with the capacity commitment. |
| `edition` | `STRING` | The edition associated with this reservation. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |
| `is_flat_rate` | `BOOL` | Whether the commitment is associated with the legacy flat-rate capacity model or an edition. If `FALSE`, the current commitment is associated with an edition. If `TRUE`, the commitment is the legacy flat-rate capacity model. |
| `renewal_plan` | `STRING` | New commitment plan after the end of current commitment plan. You can change the renewal plan for a commitment at any time until it expires. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
If you don't specify a regional qualifier, metadata is retrieved from all
regions. The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.CAPACITY_COMMITMENTS[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

The following example returns a list of active capacity commitments for the
current project:

```googlesql
SELECT
  capacity_commitment_id,
  slot_count
FROM
  `region-us`.INFORMATION_SCHEMA.CAPACITY_COMMITMENTS
WHERE
  state = 'ACTIVE';
```

The result is similar to the following:

```text
+------------------------+------------+
| capacity_commitment_id | slot_count |
+------------------------+------------+
|    my_commitment_05    |    1000    |
|    my_commitment_06    |    1000    |
|    my_commitment_07    |    1500    |
|    my_commitment_08    |    2000    |
+------------------------+------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-capacity-commitments (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the Scope and syntax section says that queries against this view must include a region qualifier, and then that metadata is retrieved from all regions if you don't specify one. The INFORMATION_SCHEMA introduction (https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax, retrieved 2026-11-20) says that if neither a region qualifier nor a dataset qualifier is specified, you receive an error. Include a region qualifier when you query this view.

## Related

- [Index of this directory](./README.md)
