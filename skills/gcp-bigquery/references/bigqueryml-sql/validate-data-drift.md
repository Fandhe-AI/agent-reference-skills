---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-validate-data-drift
---

# The ML.VALIDATE_DATA_DRIFT function

## Signature / Usage

This document describes the `ML.VALIDATE_DATA_DRIFT` function, which you can use
to compute the data drift between two sets of serving data. This
function computes and compares the statistics for the two data sets, and then
identifies where there are anomalous differences between the two
data sets.

For example, you might want to compare the current serving
data to historical serving data from a
[table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro), or to the features
served at a particular point in time, which you can get by using the
[`ML.FEATURES_AT_TIME` function](feature-time.md).

You can optionally visualize the function output by using
[Gemini Enterprise Agent Platform model monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/model-monitoring/overview).
For more information, see
[Monitoring visualization](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview#monitoring_visualization).

### Syntax

Adapted (not in the official docs): the trailing comma inside `[, NUM_VALUES_HISTOGRAM_BUCKETS AS num_values_histogram_buckets,]` is removed, as in the other `STRUCT` fields.

```sql
ML.VALIDATE_DATA_DRIFT(
  { TABLE `PROJECT_ID.DATASET.BASE_TABLE_NAME` | (BASE_QUERY_STATEMENT) },
  { TABLE `PROJECT_ID.DATASET.STUDY_TABLE_NAME` | (STUDY_QUERY_STATEMENT) },
  STRUCT(
    [NUM_HISTOGRAM_BUCKETS AS num_histogram_buckets]
    [, NUM_QUANTILES_HISTOGRAM_BUCKETS AS num_quantiles_histogram_buckets]
    [, NUM_VALUES_HISTOGRAM_BUCKETS AS num_values_histogram_buckets]
    [, NUM_RANK_HISTOGRAM_BUCKETS AS num_rank_histogram_buckets]
    [, CATEGORICAL_DEFAULT_THRESHOLD AS categorical_default_threshold]
    [, CATEGORICAL_METRIC_TYPE AS categorical_metric_type]
    [, NUMERICAL_DEFAULT_THRESHOLD AS numerical_default_threshold]
    [, NUMERICAL_METRIC_TYPE AS numerical_metric_type]
    [, THRESHOLDS AS thresholds])
    [, MODEL `PROJECT_ID.DATASET.MODEL_NAME`]
)
```

#### Arguments

`ML.VALIDATE_DATA_DRIFT` takes the following arguments:

- `PROJECT_ID`: the BigQuery project that contains the resource.
- `DATASET`: the BigQuery dataset that contains the resource.
- `BASE_TABLE_NAME`: the name of the input table of serving data that you want to use as the baseline for comparison.
- `BASE_QUERY_STATEMENT`: a query that generates the serving data that you want to use as the baseline for comparison. For the supported SQL syntax of the `BASE_QUERY_STATEMENT` clause, see [GoogleSQL query
  syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).
- `STUDY_TABLE_NAME`: the name of the input table that contains the serving data that you want to compare to the baseline.
- `STUDY_QUERY_STATEMENT`: a query that generates the serving data that you want to compare to the baseline. For the supported SQL syntax of the `STUDY_QUERY_STATEMENT` clause, see [GoogleSQL query
  syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).
- `NUM_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a histogram with equal-width buckets. Only applies to numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64,
  numerical>>` columns. The `NUM_HISTOGRAM_BUCKETS` value must be in the range `[1, 1,000]`. The default value is `10`.
- `NUM_QUANTILES_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a [quantiles](https://en.wikipedia.org/wiki/Quantile) histogram. Only applies to numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` columns. The `NUM_QUANTILES_HISTOGRAM_BUCKETS` value must be in the range `[1, 1,000]`. The default value is `10`.
- `NUM_VALUES_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a quantiles histogram. Only applies to `ARRAY` columns. The `NUM_VALUES_HISTOGRAM_BUCKETS` value must be in the range `[1, 1,000]`. The default value is `10`.
- `NUM_RANK_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a [rank](https://en.wikipedia.org/wiki/Ranking_(statistics)) histogram. Only applies to categorical and `ARRAY<categorical>` columns. The `NUM_RANK_HISTOGRAM_BUCKETS` value must be in the range `[1, 10,000]`. The default value is `50`.
- `CATEGORICAL_DEFAULT_THRESHOLD`: a `FLOAT64` value that specifies the custom threshold to use for anomaly detection for categorical and `ARRAY<categorical>` features. The value must be in the range `[0, 1)`. The default value is `0.3`.
- `CATEGORICAL_METRIC_TYPE`: a `STRING` value that specifies the metric used to compare statistics for categorical and `ARRAY<categorical>` features. Valid values are as follows:
  - `L_INFTY`: use [L-infinity distance](https://en.wikipedia.org/wiki/Chebyshev_distance). This value is the default.
  - `JENSEN_SHANNON_DIVERGENCE`: use [Jensen--Shannon divergence](https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence).
- `NUMERICAL_DEFAULT_THRESHOLD`: a `FLOAT64` value that specifies the custom threshold to use for anomaly detection for numerical features. The value must be in the range `[0, 1)`. The default value is `0.3`.
- `NUMERICAL_METRIC_TYPE`: a `STRING` value that specifies the metric used to compare statistics for numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` features. The only valid value is `JENSEN_SHANNON_DIVERGENCE`.
- `THRESHOLDS`: an `ARRAY<STRUCT<STRING, FLOAT64>>` value that specifies the anomaly detection thresholds for one or more columns for which you don't want to use the default threshold. The `STRING` value in the struct specifies the column name, and the `FLOAT64` value specifies the threshold. The `FLOAT64` value must be in the range `[0,1)`. For example, `[('col_a', 0.1), ('col_b', 0.8)]`.
- `MODEL`: The name of a BigQuery ML model that is [registered](https://docs.cloud.google.com/bigquery/docs/managing-models-vertex#register_models) with Agent Platform. When you specify this argument, the `ML.VALIDATE_DATA_DRIFT` output includes the `visualization_link` column. The `visualization_link` column provides URLs that link to visualizations of the function results in Agent Platform model monitoring.

### Output

`ML.VALIDATE_DATA_DRIFT` returns one row for each column in the input data.
`ML.VALIDATE_DATA_DRIFT` output contains the following columns:

- `input`: a `STRING` column that contains the input column name.
- `metric`: a `STRING` column that contains the metric used to compare the `input` column statistical value between the two data sets. This column value is `JENSEN_SHANNON_DIVERGENCE` for numerical features, and either `L_INFTY` or `JENSEN_SHANNON_DIVERGENCE` for categorical features.
- `threshold`: a `FLOAT64` column that contains the threshold used to determine whether the statistical difference in the `input` column value between the two data sets is anomalous.
- `value`: a `FLOAT64` column that contains the statistical difference in the `input` column value between the two data sets.
- `is_anomaly`: a `BOOL` column that indicates whether the `value` value is higher than the `threshold` value.
- `visualization_link`: a URL that links to an Agent Platform
  visualization of the results for the given feature. The URL is formatted
  as follows:

  ```text
  https://console.cloud.google.com/vertex-ai/model-monitoring/locations/region/model-monitors/vertex_model_monitor_id/model-monitoring-jobs/vertex_model_monitoring_job_id/feature-drift?project=project_id&featureName=feature_name
  ```

  For example:

  ```text
  https://console.cloud.google.com/vertex-ai/model-monitoring/locations/europe-west4/model-monitors/bq123456789012345647/model-monitoring-jobs/bqjob890123456789012/feature-drift?project=myproject&featureName=units_produced
  ```

  This column is only returned when you provide a value for the `MODEL`
  argument.

  For more information, see
  [Monitoring visualization](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview#monitoring_visualization).

### Examples

The following examples show how to use the `ML.VALIDATE_DATA_DRIFT` function.

#### Compute data drift

The following example computes data drift between a snapshot of the
serving data table and the current serving data table,
with a categorical feature threshold of `0.2`:

```sql
SELECT *
FROM ML.VALIDATE_DATA_DRIFT(
  TABLE `myproject.mydataset.previous_serving_data`,
  TABLE `myproject.mydataset.serving`,
  STRUCT(0.2 AS categorical_default_threshold)
);
```

The output looks similar to the following:

Adapted (not in the official docs): the metric name `L_INTFY` is changed to `L_INFTY`.

```text
+------------------+--------------------------+-----------+--------+------------+
| input            | metric                   | threshold |  value | is_anomaly |
+------------------+--------------------------+-----------+--------+------------+
| dropoff_latitude | JENSEN_SHANNON_DIVERGENCE| 0.2       | 0.7    | true       |
+------------------+--------------------------+-----------+--------+------------+
| payment_type     | L_INFTY                  | 0.3       | 0.2    | false      |
+------------------+--------------------------+-----------+--------+------------+
```

#### Compute data drift and visualize

The following example computes data drift between a snapshot of the
serving data table and the current serving data table,
with a categorical feature threshold of `0.2`:

```sql
SELECT *
FROM ML.VALIDATE_DATA_DRIFT(
  TABLE `myproject.mydataset.previous_serving_data`,
  TABLE `myproject.mydataset.serving`,
  STRUCT(0.2 AS categorical_default_threshold),
  MODEL `myproject.mydataset.registered_model`
);
```

The output looks similar to the following:

Adapted (not in the official docs): the metric name `L_INTFY` is changed to `L_INFTY`.

```text
+------------------+--------------------------+-----------+--------+------------+--------------------------------------------------------+
| input            | metric                   | threshold |  value | is_anomaly | visualization_link                                     |
+------------------+--------------------------+-----------+--------+------------+--------------------------------------------------------+
| dropoff_latitude | JENSEN_SHANNON_DIVERGENCE| 0.2       | 0.7    | true       | https://console.cloud.google.com/vertex-ai/            |
|                  |                          |           |        |            | model-monitoring/locations/us-central1/model-monitors/ |
|                  |                          |           |        |            | bq1111222233334444555/model-monitoring-jobs/           |
|                  |                          |           |        |            | bqjob1234512345123451234/feature-drift?project=        |
|                  |                          |           |        |            | myproject&featureName=dropoff_latitude                 |
+------------------+--------------------------+-----------+--------+------------+--------------------------------------------------------+
| payment_type     | L_INFTY                  | 0.3       | 0.2    | false      | https://console.cloud.google.com/vertex-ai/            |
|                  |                          |           |        |            | model-monitoring/locations/us-central1/model-monitors/ |
|                  |                          |           |        |            | bq1111222233334444555/model-monitoring-jobs/           |
|                  |                          |           |        |            | bqjob1234512345123451234/feature-drift?project=        |
|                  |                          |           |        |            | myproject&featureName=payment_type                     |
+------------------+--------------------------+-----------+--------+------------+--------------------------------------------------------+
```

Copying and pasting the visualization link into a browser tab returns results
similar to the following for numerical features:

![A graph that visualizes the monitoring output for the `ML.VALIDATE_DATA_DRIFT` function](https://docs.cloud.google.com/static/bigquery/images/model-monitoring-results.png)

Copying and pasting the visualization link into a browser tab returns results
similar to the following for categorical features:

![A bar chart that visualizes the monitoring output for the `ML.VALIDATE_DATA_DRIFT function](https://docs.cloud.google.com/static/bigquery/images/model-monitoring-results2.png)

### Limitations

- Running the `ML.VALIDATE_DATA_DRIFT` function on a large amount of input data
  can cause the query to
  return the error `Dry run query timed out`. To resolve the error,
  [disable retrieval of cached results for the query](https://docs.cloud.google.com/bigquery/docs/cached-results#disabling_retrieval_of_cached_results).

- `ML.VALIDATE_DATA_DRIFT` doesn't conduct schema validation between the two
  sets of input data, and so handles data type mismatches as follows:

  - If you specify `JENSEN_SHANNON_DIVERGENCE` for the `categorical_metric_type` or `numerical_metric_type` argument, the feature isn't included in the final anomaly report.
  - If you specify `L_INFTY` for the `categorical_metric_type` argument, the function outputs the computed feature distance as expected.

However, when you run inference on the serving data, the
[`ML.PREDICT` function](predict.md)
handles schema validation.

### Pricing

The `ML.VALIDATE_DATA_DRIFT` function uses
[BigQuery on-demand compute pricing](https://cloud.google.com/bigquery/pricing#on-demand-compute-pricing).

### What's next

- For more information about model monitoring in BigQuery ML, see [Model monitoring overview](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-validate-data-drift (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax writes `[, NUM_VALUES_HISTOGRAM_BUCKETS AS num_values_histogram_buckets,]` with a trailing comma; it is written without it like the other `STRUCT` fields.
- Corrected from the official docs: both example outputs show the metric `L_INTFY`. The valid value, as defined in the `CATEGORICAL_METRIC_TYPE` argument on this page, is `L_INFTY`, so the name is changed in both outputs.
- Caution: in the example outputs the `threshold` values look swapped. The query sets only `categorical_default_threshold` to `0.2` and the numerical default is `0.3`, yet the `payment_type` row (metric `L_INFTY`, a categorical metric) shows threshold `0.3` and `dropoff_latitude` shows `0.2`. The official outputs are kept as published.
- Corrected from the official docs: the two bullets about `JENSEN_SHANNON_DIVERGENCE` and `L_INFTY` say they are specified for the `categorical_default_threshold` / `numerical_default_threshold` argument. Those arguments take a `FLOAT64` threshold; the metric names are values of `categorical_metric_type` and `numerical_metric_type`, so the argument names are changed.

## Related

- [Index of this directory](./README.md)
