---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-tfdv-validate
---

# The ML.TFDV_VALIDATE function

## Signature / Usage

This document describes the `ML.TFDV_VALIDATE` function, which you can use to
compare the statistics for training and serving data, or two sets of
serving data, in order to identify anomalous differences between the two data
sets. Calling this function provides the same behavior as calling the
TensorFlow
[`validate_statistics` API](https://www.tensorflow.org/tfx/data_validation/api_docs/python/tfdv/validate_statistics).
You can use the data output by this function for
[model monitoring](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).

### Syntax

```sql
ML.TFDV_VALIDATE(
  base_statistics,
  study_statistics
  [, detection_type]
  [, categorical_default_threshold]
  [, categorical_metric_type]
  [, numerical_default_threshold]
  [, numerical_metric_type]
  [, thresholds]
)
```

#### Arguments

`ML.TFDV_VALIDATE` takes the following arguments:

- `base_statistics`: the statistics of the training or serving data that you want to use as the baseline for comparison. This must be a TensorFlow [`DatasetFeatureStatisticsList` protocol buffer](https://www.tensorflow.org/tfx/tf_metadata/api_docs/python/tfmd/proto/statistics_pb2/DatasetFeatureStatisticsList) in JSON format. You can generate a protocol buffer in the correct format by running the [`ML.TFDV_DESCRIBE` function](tfdv-describe.md), or you can load it from outside of BigQuery.
- `study_statistics`: the statistics of the training or serving data that you want to compare to the baseline. This must be a TensorFlow `DatasetFeatureStatisticsList` protocol buffer in JSON format. You can generate a protocol buffer in the correct format by running the `ML.TFDV_DESCRIBE` function, or you can load it from outside of BigQuery.
- `detection_type`: a `STRING` value that specifies the type of comparison that you want to make. Valid values are as follows:
  - `SKEW`: returns the data skew, which represents the statistical variation between training and serving data.
  - `DRIFT`: returns the data drift, which represents the statistical variation between two different sets of serving data.
- `categorical_default_threshold`: a `FLOAT64` value that specifies the custom threshold to use for anomaly detection for categorical and `ARRAY<categorical>` features. The value must be in the range `[0, 1)`. The default value is `0.3`.
- `categorical_metric_type`: a `STRING` value that specifies the metric used to compare statistics for categorical and `ARRAY<categorical>`features. Valid values are as follows:
  - `L_INFTY`: use [L-infinity distance](https://en.wikipedia.org/wiki/Chebyshev_distance). This value is the default.
  - `JENSEN_SHANNON_DIVERGENCE`: use [Jensen--Shannon divergence](https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence).
- `numerical_default_threshold`: a `FLOAT64` value that specifies the custom threshold to use for anomaly detection for numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` features. The value must be in the range `[0, 1)`. The default value is `0.3`.
- `numerical_metric_type`: a `STRING` value that specifies the metric used to compare statistics for numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` features. The only valid value is `JENSEN_SHANNON_DIVERGENCE`.
- `thresholds`: an `ARRAY<STRUCT<STRING, FLOAT64>>` value that specifies the anomaly detection thresholds for one or more columns for which you don't want to use the default threshold. The `STRING` value in the struct specifies the column name, and the `FLOAT64` value specifies the threshold. The `FLOAT64` value must be in the range `[0, 1)`. For example, `[('col_a', 0.1), ('col_b', 0.8)]`.

`ML.TFDV_VALIDATE` uses positional arguments, so if you specify an
optional argument, you must also specify all arguments prior to that argument.
For more information on argument types, see
[Named arguments](../googlesql-functions/functions-reference.md#named-arguments).

### Output

`ML.TFDV_VALIDATE` returns a TensorFlow
[`Anomalies` protocol buffer](https://www.tensorflow.org/tfx/tf_metadata/api_docs/python/tfmd/proto/anomalies_pb2/Anomalies)
in JSON format.

### Examples

The following example returns the skew between training and serving data
and also sets custom anomaly detection thresholds for two of the feature
columns:

Adapted (not in the official docs): the statistics saved into `serve_stats` are changed from `stats1` (training data) to `stats2` (serving data).

```sql
DECLARE stats1 JSON;
DECLARE stats2 JSON;

SET stats1 = (SELECT * FROM ML.TFDV_DESCRIBE(TABLE `myproject.mydataset.training`));

SET stats2 = (SELECT * FROM ML.TFDV_DESCRIBE(TABLE `myproject.mydataset.serving`));

SELECT ML.TFDV_VALIDATE(
  stats1, stats2, 'SKEW', .3, 'L_INFTY', .3, 'JENSEN_SHANNON_DIVERGENCE', [('feature1', 0.2), ('feature2', 0.5)]
);

INSERT `myproject.mydataset.serve_stats`
  (t, dataset_feature_statistics_list)
SELECT CURRENT_TIMESTAMP() AS t, stats2;
```

The following example returns the drift between two sets of serving data:

```sql
SELECT ML.TFDV_VALIDATE(
  (SELECT dataset_feature_statistics_list FROM `myproject.mydataset.servingJan24`),
  (SELECT * FROM ML.TFDV_DESCRIBE(TABLE `myproject.mydataset.serving`)),
  'DRIFT'
);
```

### Limitations

The `ML.TFDV_VALIDATE` function doesn't conduct schema validation.

`ML.TFDV_VALIDATE` handles type mismatch as follows:

- If you specify `JENSEN_SHANNON_DIVERGENCE` for the `categorical_metric_type` or `numerical_metric_type` argument, the feature isn't included in the final anomaly report.
- If you specify `L_INFTY` for the `categorical_metric_type` argument, the function outputs the computed feature distance as expected.

### Pricing

The `ML.TFDV_VALIDATE` function uses
[BigQuery on-demand compute pricing](https://cloud.google.com/bigquery/pricing#on-demand-compute-pricing).

### What's next

- For more information about model monitoring in BigQuery ML, see [Model monitoring overview](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-tfdv-validate (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the two bullets about `JENSEN_SHANNON_DIVERGENCE` and `L_INFTY` say they are specified for the `categorical_default_threshold` / `numerical_default_threshold` argument. Those arguments take a `FLOAT64` threshold; the metric names are values of `categorical_metric_type` and `numerical_metric_type`, so the argument names are changed.
- Corrected from the official docs: the example stores `stats1` into `myproject.mydataset.serve_stats`, but in the same example `stats1` is computed from the `training` table and `stats2` from the `serving` table. The saved value is changed to `stats2`, so that the serving-statistics table holds serving statistics.

## Related

- [Index of this directory](./README.md)
