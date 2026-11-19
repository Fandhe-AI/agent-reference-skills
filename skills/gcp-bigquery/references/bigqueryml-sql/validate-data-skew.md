---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-validate-data-skew
---

# The ML.VALIDATE_DATA_SKEW function

## Signature / Usage

This document describes the `ML.VALIDATE_DATA_SKEW` function, which you can use
to compute the data skew between a model's training and serving data. This
function computes the statistics for the serving data, compares them to the
statistics that were computed for the training data at the time the model was
created, and identifies where there are anomalous differences between the two
data sets.

You can optionally visualize the function output by using
[Agent Platform model monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/model-monitoring/overview).
For more information, see
[Monitoring visualization](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview#monitoring_visualization).

Statistics are only computed for feature columns in the serving data that match
feature columns in the training data, in order to achieve better performance and
lower cost. For models that were created with use of the
[`TRANSFORM` clause](create.md#transform),
the statistics are based on the raw feature data before feature preprocessing
within the `TRANSFORM` clause.

### Syntax

```sql
ML.VALIDATE_DATA_SKEW(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT(
    [CATEGORICAL_DEFAULT_THRESHOLD AS categorical_default_threshold]
    [, CATEGORICAL_METRIC_TYPE AS categorical_metric_type]
    [, NUMERICAL_DEFAULT_THRESHOLD AS numerical_default_threshold]
    [, NUMERICAL_METRIC_TYPE AS numerical_metric_type]
    [, THRESHOLDS AS thresholds]
    [, ENABLE_VISUALIZATION_LINK AS enable_visualization_link])
)
```

#### Arguments

`ML.VALIDATE_DATA_SKEW` takes the following arguments:

- `PROJECT_ID`: the BigQuery project that contains the resource.
- `DATASET`: the BigQuery dataset that contains the resource.
- `MODEL_NAME`: the name of the model.
- `TABLE_NAME`: the name of the input table that contains the serving data to calculate statistics for.
- `QUERY_STATEMENT`: a query that generates the serving data to calculate statistics for. For the supported SQL syntax of the `QUERY_STATEMENT` clause, see [GoogleSQL query
  syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax).
- `CATEGORICAL_DEFAULT_THRESHOLD`: a `FLOAT64` value that specifies the custom threshold to use for anomaly detection for categorical and `ARRAY<categorical>` features. The value must be in the range `[0, 1)`. The default value is `0.3`.
- `CATEGORICAL_METRIC_TYPE`: a `STRING` value that specifies the metric used to compare statistics for categorical and `ARRAY<categorical>` features. Valid values are as follows:
  - `L_INFTY`: use [L-infinity
    distance](https://en.wikipedia.org/wiki/Chebyshev_distance). This value is the default.
  - `JENSEN_SHANNON_DIVERGENCE`: use [Jensen--Shannon divergence](https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence).
- `NUMERICAL_DEFAULT_THRESHOLD`: a `FLOAT64` value that specifies the custom threshold to use for anomaly detection for numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` features. The value must be in the range `[0, 1)`. The default value is `0.3`.
- `NUMERICAL_METRIC_TYPE`: a `STRING` value that specifies the metric used to compare statistics for numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` features. The only valid value is `JENSEN_SHANNON_DIVERGENCE`.
- `THRESHOLDS`: an `ARRAY<STRUCT<STRING, FLOAT64>>` value that specifies the anomaly detection thresholds for one or more columns for which you don't want to use the default threshold. The `STRING` value in the struct specifies the column name, and the `FLOAT64` value specifies the threshold. The `FLOAT64` value must be in the range `[0, 1)`. For example, `[('col_a', 0.1), ('col_b', 0.8)]`.
- `ENABLE_VISUALIZATION_LINK`: a `BOOL` value that
  determines whether to return links to the visualized function output. When you
  specify `TRUE` for this argument, the `ML.VALIDATE_DATA_SKEW` output includes
  the `visualization_link` column. The `visualization_link` column provides URLs
  that link to visualizations of the function results in
  Agent Platform monitoring.

  When you specify `TRUE` for this argument, the `model` argument value must
  refer to a BigQuery ML model that is
  [registered](https://docs.cloud.google.com/bigquery/docs/managing-models-vertex#register_models) with
  Agent Platform. If the model isn't registered, an invalid query
  error is returned.

### Output

`ML.VALIDATE_DATA_SKEW` returns one row for each column in the input data.
`ML.VALIDATE_DATA_SKEW` output contains the following columns:

- `input`: a `STRING` column that contains the input column name.
- `metric`: a `STRING` column that contains the metric used to compare the `input` column statistical value between the training and serving data sets. This column value is `JENSEN_SHANNON_DIVERGENCE` for numerical features, and either `L_INFTY` or `JENSEN_SHANNON_DIVERGENCE` for categorical features.
- `threshold`: a `FLOAT64` column that contains the threshold used to determine whether the statistical difference in the `input` column value between the training and serving data is anomalous.
- `value`: a `FLOAT64` column that contains the statistical difference in the `input` column value between the serving and the training data sets.
- `is_anomaly`: a `BOOL` column that indicates whether the `value` value is higher than the `threshold` value.
- `visualization_link`: a URL that
  links to an Agent Platform visualization of the results for the given
  feature. The URL is formatted as follows:

  ```text
  https://console.cloud.google.com/vertex-ai/model-monitoring/locations/region/model-monitors/vertex_model_monitor_id/model-monitoring-jobs/vertex_model_monitoring_job_id/feature-drift?project=project_id&featureName=feature_name
  ```

  For example:

  ```text
  https://console.cloud.google.com/vertex-ai/model-monitoring/locations/us-central1/model-monitors/bq123456789012345647/model-monitoring-jobs/bqjob890123456789012/feature-drift?project=myproject&featureName=petal_length
  ```

  This column is only returned when the `enable_visualization_link` argument
  value is `TRUE`.

  For more information, see
  [Monitoring visualization](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview#monitoring_visualization).

### Examples

The following examples demonstrate how to use the `ML.VALIDATE_DATA_SKEW`
function.

#### Run `ML.VALIDATE_DATA_SKEW`

The following example computes data skew between the serving data and the
training data used to create the model, with a categorical feature threshold
of `0.2`:

```sql
SELECT *
FROM ML.VALIDATE_DATA_SKEW(
  MODEL `myproject.mydataset.mymodel`,
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

#### Run `ML.VALIDATE_DATA_SKEW` and visualize the results

The following example computes data skew between the serving data and the
training data used to create the model, with a categorical feature threshold
of `0.2`:

```sql
SELECT *
FROM ML.VALIDATE_DATA_SKEW(
  MODEL `myproject.mydataset.mymodel`,
  TABLE `myproject.mydataset.serving`,
  STRUCT(0.2 AS categorical_default_threshold,
    TRUE AS enable_visualization_link)
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

![A graph that visualizes the monitoring output for the `ML.VALIDATE_DATA_SKEW` function](https://docs.cloud.google.com/static/bigquery/images/model-monitoring-results.png)

Copying and pasting the visualization link into a browser tab returns results
similar to the following for categorical features:

![A bar chart that visualizes the monitoring output for the `ML.VALIDATE_DATA_SKEW` function](https://docs.cloud.google.com/static/bigquery/images/model-monitoring-results2.png)

#### Automate skew detection

The following example shows how to automate skew detection for a
linear regression model:

```sql
DECLARE anomalies ARRAY<STRING>;

SET anomalies = (
  SELECT ARRAY_AGG(input)
  FROM
    ML.VALIDATE_DATA_SKEW(
      MODEL mydataset.model_linear_reg,
      TABLE mydataset.serving,
      STRUCT(
        0.3 AS categorical_default_threshold,
        0.2 AS numerical_default_threshold,
        'JENSEN_SHANNON_DIVERGENCE' AS numerical_metric_type,
        [STRUCT('fare', 0.15), STRUCT('company', 0.25)] AS thresholds))
  WHERE is_anomaly
);

IF(ARRAY_LENGTH(anomalies) > 0)
  THEN
    CREATE OR REPLACE MODEL mydataset.model_linear_reg
    TRANSFORM(
      ML.MIN_MAX_SCALER(fare) OVER() AS f1,
      ML.ROBUST_SCALER(pickup_longitude) OVER() AS f2,
      ML.LABEL_ENCODER(company) OVER() AS f3,
      ML.ONE_HOT_ENCODER(payment_type) OVER() AS f4,
      label
    )
    OPTIONS (
      model_type = 'linear_reg',
      max_iterations = 1)
    AS (
      SELECT
        fare,
        pickup_longitude,
        company,
        payment_type,
        2 AS label
      FROM mydataset.new_training_data
    );

    SELECT
      ERROR(
        CONCAT(
          "Found data skew in features: ",
          ARRAY_TO_STRING(anomalies, ", "),
          ". Model is retrained with the latest data."));
  ELSE
    SELECT *
    FROM
      ML.PREDICT(
        MODEL mydataset.model_linear_reg,
        TABLE mydataset.serving);
END IF;
```

### Limitations

- `ML.VALIDATE_DATA_SKEW` doesn't support the following types of models:

  - [AutoML](create-automl.md)
  - [Matrix factorization](create-matrix-factorization.md)
  - [`ARIMA_PLUS`](create-time-series.md)
  - Remote models over [LLMs](create-remote-model.md), [Cloud AI services](create-remote-model-service.md), or [Gemini Enterprise Agent Platform endpoints](create-remote-model-https.md)
  - Imported [Open Neural Network Exchange (ONNX)](create-onnx.md), [TensorFlow](create-tensorflow.md), [TensorFlow Lite](create-tflite.md), or [XGBoost](create-xgboost.md) models
- `ML.VALIDATE_DATA_SKEW` doesn't support models created before March 28, 2024,
  or models that use the
  [`WARM START` option](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#warm_start). To enable use of
  `ML.VALIDATE_DATA_SKEW`, retrain the model by running the
  [`CREATE OR REPLACE model` statement](create.md#create-or-replace-model).

- Running the `ML.VALIDATE_DATA_SKEW` function on a large amount of input data
  can cause the query to
  return the error `Dry run query timed out`. To resolve the error,
  [disable retrieval of cached results for the query](https://docs.cloud.google.com/bigquery/docs/cached-results#disabling_retrieval_of_cached_results).

- `ML.VALIDATE_DATA_SKEW` doesn't conduct schema validation between the two sets
  of input data, and so handles data type mismatches as follows:

  - If you specify `JENSEN_SHANNON_DIVERGENCE` for the `categorical_metric_type` or `numerical_metric_type` argument, the feature isn't included in the final anomaly report.
  - If you specify `L_INFTY` for the `categorical_metric_type` argument, the function outputs the computed feature distance as expected.

  However, when you run inference on the serving data, the
  [`ML.PREDICT` function](predict.md)
  handles schema validation.

### Pricing

The `ML.VALIDATE_DATA_SKEW` function uses
[BigQuery on-demand compute pricing](https://cloud.google.com/bigquery/pricing#on-demand-compute-pricing).

### What's next

- For more information about model monitoring in BigQuery ML, see [Model monitoring overview](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-validate-data-skew (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `ENABLE_VISUALIZATION_LINK` bullet names `ML.VALIDATE_DATA_DRIFT` on the `ML.VALIDATE_DATA_SKEW` page. It is changed to `ML.VALIDATE_DATA_SKEW`.
- Corrected from the official docs: both example outputs show the metric `L_INTFY`. The valid value, as defined in the `CATEGORICAL_METRIC_TYPE` argument on this page, is `L_INFTY`, so the name is changed in both outputs.
- Caution: in the example outputs the `threshold` values look swapped. The query sets only `categorical_default_threshold` to `0.2` and the numerical default is `0.3`, yet the `payment_type` row (metric `L_INFTY`, a categorical metric) shows threshold `0.3` and `dropoff_latitude` shows `0.2`. The official outputs are kept as published.
- Corrected from the official docs: the two bullets about `JENSEN_SHANNON_DIVERGENCE` and `L_INFTY` say they are specified for the `categorical_default_threshold` / `numerical_default_threshold` argument. Those arguments take a `FLOAT64` threshold; the metric names are values of `categorical_metric_type` and `numerical_metric_type`, so the argument names are changed.

## Related

- [Index of this directory](./README.md)
