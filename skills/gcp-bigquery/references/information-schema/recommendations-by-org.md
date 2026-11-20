---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-recommendations-by-org
---

# INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION view

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
[bq-recommendations+feedback@google.com](mailto:bq-recommendations+feedback@google.com).

The `INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION` view contains data about all BigQuery
recommendations for all projects in the current organization.

The `INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION` view supports the following
recommendations:

- [Partition and cluster recommendations](https://docs.cloud.google.com/bigquery/docs/view-partition-cluster-recommendations)
- [Materialized view recommendations](https://docs.cloud.google.com/bigquery/docs/manage-materialized-recommendations)
- [Role recommendations for BigQuery datasets](https://docs.cloud.google.com/policy-intelligence/docs/review-apply-role-recommendations-datasets)

This schema view is only available to users with defined [Google Cloud organizations](https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations).

### Required permissions

To view recommendations with the
`INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION` view, you must have the
required permissions for the corresponding recommender. The
`INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION` view only returns
recommendations that you have permission to view. When you have the required
permissions on the organization, you can view recommendations for all projects
within that organization, regardless of your permissions on the project itself.

Ask your administrator to grant access to view the recommendations. To see the
required permissions for each recommender, see the following:

- [Partition \& cluster recommender permissions](https://docs.cloud.google.com/bigquery/docs/view-partition-cluster-recommendations#required_permissions)
- [Materialized view recommendations permissions](https://docs.cloud.google.com/bigquery/docs/manage-materialized-recommendations#required_permissions)
- [Role recommendations for datasets permissions](https://docs.cloud.google.com/policy-intelligence/docs/review-apply-role-recommendations-datasets#required-permissions)

### Schema

The `INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION` view has the following
schema:

| Column name | Data type | Value |
|---|---|---|
| `recommendation_id` | `STRING` | Base64 encoded ID that contains the RecommendationID and recommender. |
| `recommender` | `STRING` | The type of recommendation. For example, `google.bigquery.table.PartitionClusterRecommender` for partitioning and clustering recommendations. |
| `subtype` | `STRING` | The subtype of the recommendation. |
| `project_id` | `STRING` | The ID of the project. |
| `project_number` | `STRING` | The number of the project. |
| `description` | `STRING` | The description about the recommendation. |
| `last_updated_time` | `TIMESTAMP` | This field represents the time when the recommendation was last created. |
| `target_resources` | `STRING` | Fully qualified resource names this recommendation is targeting. |
| `state` | `STRING` | The state of the recommendation. For a list of possible values, see [State](https://docs.cloud.google.com/recommender/docs/reference/rest/v1/billingAccounts.locations.recommenders.recommendations#state). |
| `primary_impact` | `RECORD` | The impact this recommendation can have when trying to optimize the primary category. Contains the following fields: - `category`: The category this recommendation is trying to optimize. For a list of possible values, see [Category](https://docs.cloud.google.com/recommender/docs/reference/rest/v1/billingAccounts.locations.recommenders.recommendations#category). - `cost_projection`: This value may be populated if the recommendation can project the cost savings from this recommendation. Only present when the category is `COST`. - `security_projection`: Might be present when the category is `SECURITY`. |
| `priority` | `STRING` | The priority of the recommendation. For a list of possible values, see [Priority](https://docs.cloud.google.com/recommender/docs/reference/rest/v1/billingAccounts.locations.recommenders.recommendations#priority). |
| `associated_insight_ids` | `STRING` | Full Insight names associated with the recommendation. Insight name is the Base64 encoded representation of Insight type name \& the Insight ID. This can be used to query Insights view. |
| `additional_details` | `RECORD` | Additional Details about the recommendation. - `overview`: Overview of the recommendation in JSON format. The content of this field might change based on the recommender. - `state_metadata`: Metadata about the state of the recommendation in key-value pairs. - `operations`: List of operations the user can perform on the target resources. This contains the following fields: - `action`: The type of action the user must perform. This can be a free-text set by the system while generating the recommendation. Will always be populated. - `resource_type`: The cloud resource type. - `resource`: Fully qualified resource name. - `path`: Path of the target field relative to the resource. - `value`: Value of the path field. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a
[region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). A project ID
is optional. If no project ID is specified, the project that the query runs
in is used.

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.RECOMMENDATIONS[_BY_ORGANIZATION]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

To run the query against a project other than your default project, add the
project ID in the following format:

```bash
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION
```
Replace the following:

<br />

- `PROJECT_ID`: the ID of the project.
- `REGION_NAME`: the region for your project.

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION ``.

#### View materialized view recommendations in organization

The following example returns materialized view recommendations in the
organization:

```sql
SELECT
  project_id,
  LAX_INT64(additional_details.overview.bytesSavedMonthly) / POW(1024, 3) as est_gb_saved_monthly,
  LAX_INT64(additional_details.overview.slotMsSavedMonthly) / (1000 * 3600) as slot_hours_saved_monthly,
  last_updated_time
FROM
 `region-us`.INFORMATION_SCHEMA.RECOMMENDATIONS_BY_ORGANIZATION
WHERE
  recommender = 'google.bigquery.materializedview.Recommender'
LIMIT 3;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case sensitive.

The result is similar to the following:

```text
+-------------------------------+----------------------------------------------------------------------+
|          project_id           | est_gb_saved_monthly| slot_hours_saved_monthly |  last_updated_time  |
+-------------------------------+----------------------------------------------------------------------+
| project1                      |   4689.071544663957 |       2682.1816833333337 | 2024-07-01 13:00:31 |
| project2                      |   137.5052567309467 |        9613.139166666666 | 2024-07-01 13:00:31 |
| project3                      |  146.83722260318973 |        7093.014316666667 | 2024-07-01 13:00:31 |
+-------------------------------+----------------------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-recommendations-by-org (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the schema lists `target_resources` and `associated_insight_ids` as `STRING`, but the `RECOMMENDATIONS` view page (recommendations.md) shows `target_resources` values as arrays such as `["project_resource"]`. Treat both columns as arrays of strings when you write queries.
- Conflicting official statements: the Scope and syntax table names the view `RECOMMENDATIONS[_BY_ORGANIZATION]`, so the suffix looks optional, and gives the resource scope as `Project level`. The description says that `RECOMMENDATIONS_BY_ORGANIZATION` contains the recommendations for all projects in the current organization, and the `RECOMMENDATIONS` view page (recommendations.md) covers only the current project. To query the whole organization, write the full name `RECOMMENDATIONS_BY_ORGANIZATION`.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
