---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-recommendations
---

# INFORMATION_SCHEMA.RECOMMENDATIONS view

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

The `INFORMATION_SCHEMA.RECOMMENDATIONS` view contains data about all BigQuery
recommendations in the current project. BigQuery retrieves
recommendations for all BigQuery recommenders from the Active Assist
and present it in this view.

The `INFORMATION_SCHEMA.RECOMMENDATIONS` view supports the following
recommendations:

- [Partition \& cluster recommendations](https://docs.cloud.google.com/bigquery/docs/view-partition-cluster-recommendations)
- [Materialized view recommendations](https://docs.cloud.google.com/bigquery/docs/manage-materialized-recommendations)
- [Role recommendations for BigQuery datasets](https://docs.cloud.google.com/policy-intelligence/docs/review-apply-role-recommendations-datasets)

The `INFORMATION_SCHEMA.RECOMMENDATIONS` view shows only BigQuery-related recommendations.
You can view Google Cloud recommendations in the Active Assist.

### Required permission

To view recommendations with the `INFORMATION_SCHEMA.RECOMMENDATIONS` view, you
must have the required permissions for the corresponding recommender. The
`INFORMATION_SCHEMA.RECOMMENDATIONS` view only returns recommendations that you
have permission to view.

Ask your administrator to grant access to view the recommendations. To see the
required permissions for each recommender, see the following:

- [Partition \& cluster recommender permissions](https://docs.cloud.google.com/bigquery/docs/view-partition-cluster-recommendations#required_permissions)
- [Materialized view recommendations permissions](https://docs.cloud.google.com/bigquery/docs/manage-materialized-recommendations#required_permissions)
- [Role recommendations for datasets permissions](https://docs.cloud.google.com/policy-intelligence/docs/review-apply-role-recommendations-datasets#required-permissions)

### Schema

The `INFORMATION_SCHEMA.RECOMMENDATIONS` view has the following schema:

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
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.RECOMMENDATIONS[_BY_PROJECT]`` | Project level | `REGION` |

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
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.RECOMMENDATIONS
```
Replace the following:

<br />

- `PROJECT_ID`: the ID of the project.
- `REGION_NAME`: the region for your project.

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.RECOMMENDATIONS ``.

#### View top cost saving recommendations

The following example returns top 3 `COST` category recommendations on the basis
of the projected `slot_hours_saved_monthly`:

```sql
SELECT
   recommender,
   target_resources,
   LAX_INT64(additional_details.overview.bytesSavedMonthly) / POW(1024, 3) as est_gb_saved_monthly,
   LAX_INT64(additional_details.overview.slotMsSavedMonthly) / (1000 * 3600) as slot_hours_saved_monthly,
  last_updated_time
FROM
  `region-us`.INFORMATION_SCHEMA.RECOMMENDATIONS_BY_PROJECT
WHERE
   primary_impact.category = 'COST'
AND
   state = 'ACTIVE'
ORDER by
   slot_hours_saved_monthly DESC
LIMIT 3;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case sensitive.

The result is similar to the following:

```text
+---------------------------------------------------+--------------------------------------------------------------------------------------------------+
|                    recommender                    |   target_resources      | est_gb_saved_monthly | slot_hours_saved_monthly |  last_updated_time
+---------------------------------------------------+--------------------------------------------------------------------------------------------------+
| google.bigquery.materializedview.Recommender      | ["project_resource"]    | 140805.38289248943   |        9613.139166666666 |  2024-07-01 13:00:00
| google.bigquery.table.PartitionClusterRecommender | ["table_resource_1"]    | 4393.7416711859405   |        56.61476777777777 |  2024-07-01 13:00:00
| google.bigquery.table.PartitionClusterRecommender | ["table_resource_2"]    |   3934.07264107652   |       10.499466666666667 |  2024-07-01 13:00:00
+---------------------------------------------------+--------------------------------------------------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-recommendations (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the schema lists `target_resources` as `STRING`, but the example result shows its values as arrays such as `["project_resource"]`. The `INSIGHTS` view page also queries the similar `associated_recommendation_ids` column with `UNNEST`. Treat `target_resources` and `associated_insight_ids` as arrays of strings when you write queries.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
