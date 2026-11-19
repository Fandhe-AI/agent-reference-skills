---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-insights
---

# INFORMATION_SCHEMA.INSIGHTS view

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

The `INFORMATION_SCHEMA.INSIGHTS` view contains insights about all BigQuery
recommendations in the current project. BigQuery retrieves
insights for all BigQuery insight types from the Active Assist
and present it in this view. BigQuery insights are always
associated with a recommendation.

The `INFORMATION_SCHEMA.INSIGHTS` view supports the following
recommendations:

- [Partition and cluster recommendations](https://docs.cloud.google.com/bigquery/docs/view-partition-cluster-recommendations)
- [Materialized view recommendations](https://docs.cloud.google.com/bigquery/docs/manage-materialized-recommendations)
- [Role recommendations for BigQuery datasets](https://docs.cloud.google.com/policy-intelligence/docs/review-apply-role-recommendations-datasets)

### Required permission

To view insights with the `INFORMATION_SCHEMA.INSIGHTS` view, you
must have the required permissions for the corresponding recommender. The
`INFORMATION_SCHEMA.INSIGHTS` view only returns insights from recommendations
that you have permission to view.

Ask your administrator to grant access to view insights. To see the
required permissions for each recommender, see the following:

- [Partition \& cluster recommender permissions](https://docs.cloud.google.com/bigquery/docs/view-partition-cluster-recommendations#required_permissions)
- [Materialized view recommendations permissions](https://docs.cloud.google.com/bigquery/docs/manage-materialized-recommendations#required_permissions)
- [Role recommendations for datasets permissions](https://docs.cloud.google.com/policy-intelligence/docs/review-apply-role-recommendations-datasets#required-permissions)

### Schema

The `INFORMATION_SCHEMA.INSIGHTS` view has the following
schema:

| Column name | Data type | Value |
|---|---|---|
| `insight_id` | `STRING` | Base64 encoded ID that contains the insight type and insight ID |
| `insight_type` | `STRING` | The type of the Insight. For example, `google.bigquery.materializedview.Insight`. |
| `subtype` | `STRING` | The subtype of the insight. |
| `project_id` | `STRING` | The ID of the project. |
| `project_number` | `STRING` | The number of the project. |
| `description` | `STRING` | The description about the recommendation. |
| `last_updated_time` | `TIMESTAMP` | This field represents the time when the insight was last refreshed. |
| `category` | `STRING` | The optimization category of the impact. |
| `target_resources` | `STRING` | Fully qualified resource names this insight is targeting. |
| `state` | `STRING` | The state of the insight. For a list of possible values, see [Value](https://docs.cloud.google.com/recommender/docs/reference/rest/v1/billingAccounts.locations.insightTypes.insights#Insight.State). |
| `severity` | `STRING` | The severity of the Insight. For a list of possible values, see [Severity](https://docs.cloud.google.com/recommender/docs/reference/rest/v1/billingAccounts.locations.insightTypes.insights#severity). |
| `associated_recommendation_ids` | `STRING` | Full recommendation names this insight is associated with. Recommendation name is the Base64 encoded representation of recommender type and the recommendations ID. |
| `additional_details` | `RECORD` | Additional details about the insight. - `content`: Insight content in JSON format. - `state_metadata`: Metadata about the state of the Insight. Contains key-value pairs. - `observation_period_seconds`: Observation Period for generating the insight. |

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
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.INSIGHTS[_BY_PROJECT]`` | Project level | `REGION` |

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
`PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.INSIGHTS
```
Replace the following:

<br />

- `PROJECT_ID`: the ID of the project.
- `REGION_NAME`: the region for your project.

For example, `` `myproject`.`region-us`.INFORMATION_SCHEMA.INSIGHTS ``.

#### View active insights with cost savings

The following example joins insights view with the recommendations view to
return 3 recommendations for the insights that are ACTIVE in COST category:

```sql
WITH
 insights as (SELECT * FROM `region-us`.INFORMATION_SCHEMA.INSIGHTS),
 recs as (SELECT recommender, recommendation_id, additional_details FROM `region-us`.INFORMATION_SCHEMA.RECOMMENDATIONS)

SELECT
   recommender,
   target_resources,
   LAX_INT64(recs.additional_details.overview.bytesSavedMonthly) / POW(1024, 3) as est_gb_saved_monthly,
   LAX_INT64(recs.additional_details.overview.slotMsSavedMonthly) / (1000 * 3600) as slot_hours_saved_monthly,
   insights.additional_details.observation_period_seconds / 86400 as observation_period_days,
   last_updated_time
FROM
  insights
JOIN recs
ON
  recommendation_id in UNNEST(associated_recommendation_ids)
WHERE
  state = 'ACTIVE'
AND
  category = 'COST'
LIMIT 3;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case sensitive.

The result is similar to the following:

```text
+---------------------------------------------------+---------------------+--------------------+--------------------------+-------------------------+---------------------+
|                    recommender                    |   target_resource   |  gb_saved_monthly  | slot_hours_saved_monthly | observation_period_days |  last_updated_time  |
+---------------------------------------------------+---------------------+--------------------+--------------------------+-------------------------+---------------------+
| google.bigquery.table.PartitionClusterRecommender | ["table_resource1"] |   3934.07264107652 |       10.499466666666667 |                    30.0 | 2024-07-01 16:41:25 |
| google.bigquery.table.PartitionClusterRecommender | ["table_resource2"] | 4393.7416711859405 |        56.61476777777777 |                    30.0 | 2024-07-01 16:41:25 |
| google.bigquery.materializedview.Recommender      | ["project_resource"]| 140805.38289248943 |        9613.139166666666 |                     2.0 | 2024-07-01 13:00:31 |
+---------------------------------------------------+---------------------+--------------------+--------------------------+-------------------------+---------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-insights (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the schema lists `target_resources` and `associated_recommendation_ids` as `STRING`, but the example query uses `UNNEST(associated_recommendation_ids)`, which needs an array, and the example result shows `target_resources` values as arrays such as `["table_resource1"]`. Treat both columns as arrays of strings when you write queries.

## Related

- [Index of this directory](./README.md)
