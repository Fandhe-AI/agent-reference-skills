---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-tfdv-describe
---

# The ML.TFDV_DESCRIBE function

## Signature / Usage

This document describes the `ML.TFDV_DESCRIBE` function, which you can use
to generate fine-grained statistics for the columns in a table. For example, you
might want to know statistics for a table of training or serving data
statistics that you plan to use with a machine learning (ML) model. Calling
this function provides the same behavior as calling the TensorFlow
[TensorFlow `tfdv.generate_statistics_from_csv` API](https://www.tensorflow.org/tfx/data_validation/api_docs/python/tfdv/generate_statistics_from_csv).
You can use the data output by this function for such purposes as
[feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing) or
[model monitoring](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).

### Syntax

```sql
ML.TFDV_DESCRIBE(
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT(
    [NUM_HISTOGRAM_BUCKETS AS num_histogram_buckets]
    [, NUM_QUANTILES_HISTOGRAM_BUCKETS AS num_quantiles_histogram_buckets]
    [, NUM_VALUES_HISTOGRAM_BUCKETS AS num_values_histogram_buckets]
    [, NUM_RANK_HISTOGRAM_BUCKETS AS num_rank_histogram_buckets])
)
```

#### Arguments

`ML.TFDV_DESCRIBE` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the table.
- `TABLE_NAME`: the name of the input table that contains the training or serving data to calculate statistics for.
- `QUERY_STATEMENT`: a query that generates the training or serving data to calculate statistics for. For the supported SQL syntax of the `QUERY_STATEMENT` clause, see [GoogleSQL query
  syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).
- `NUM_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a histogram with equal-width buckets. Only applies to numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64,
  numerical>>` columns. The `num_histogram_buckets` value must be in the range `[1, 1,000]`. The default value is `10`.
- `NUM_QUANTILES_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a [quantiles](https://en.wikipedia.org/wiki/Quantile) histogram. Only applies to numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` columns. The `num_quantiles_histogram_buckets` value must be in the range `[1, 1,000]`. The default value is `10`.
- `NUM_VALUES_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a quantiles histogram. Only applies to `ARRAY` columns. The `num_values_histogram_buckets` value must be in the range `[1, 1,000]`. The default value is `10`.
- `NUM_RANK_HISTOGRAM_BUCKETS`: an `INT64` value that specifies the number of buckets to use for a [rank](https://en.wikipedia.org/wiki/Ranking_(statistics)) histogram. Only applies to categorical and `ARRAY<categorical>` columns. The `num_rank_histogram_buckets` value must be in the range `[1, 10,000]`. The default value is `50`.

### Output

`ML.TFDV_DESCRIBE` returns a column named `dataset_feature_statistics_list`
that contains a TensorFlow
[`DatasetFeatureStatisticsList` protocol buffer](https://www.tensorflow.org/tfx/tf_metadata/api_docs/python/tfmd/proto/statistics_pb2/DatasetFeatureStatisticsList)
in JSON format.

### Example

The following example returns statistics for the `penguins` public dataset and
uses 20 buckets for rank histograms for string values:

```sql
SELECT * FROM ML.TFDV_DESCRIBE(
  TABLE `bigquery-public-data.ml_datasets.penguins`,
  STRUCT(20 AS num_rank_histogram_buckets)
);
```

### Limitations

Input data for the `ML.TFDV_DESCRIBE` function can only contain columns of the
following data types:

- [Numeric](../googlesql-syntax/data-types.md#numeric-types) types
- `STRING`
- `BOOL`
- `BYTES`
- `DATE`
- `DATETIME`
- `TIME`
- `TIMESTAMP`
- `ARRAY<STRUCT<INT64, FLOAT64>>` (a sparse tensor)
- `STRUCT` columns that contain any of the following types:
  - Numeric types
  - `STRING`
  - `BOOL`
  - `BYTES`
  - `DATE`
  - `DATETIME`
  - `TIME`
  - `TIMESTAMP`
- `ARRAY` columns that contain any of the following types:
  - Numeric types
  - `STRING`
  - `BOOL`
  - `BYTES`
  - `DATE`
  - `DATETIME`
  - `TIME`
  - `TIMESTAMP`

### Pricing

The `ML.TFDV_DESCRIBE` function uses
[BigQuery on-demand compute pricing](https://cloud.google.com/bigquery/pricing#on-demand-compute-pricing).

### What's next

- For more information about model monitoring in BigQuery ML, see [Model monitoring overview](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-tfdv-describe (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the lists of supported input column types name `BYTE`; the GoogleSQL type is `BYTES`.

## Related

- [Index of this directory](./README.md)
