---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-describe-data
---

# The ML.DESCRIBE_DATA function

## Signature / Usage

This document describes the `ML.DESCRIBE_DATA` function, which you can use to
generate descriptive statistics for the columns in a table or subquery. For
example, you might want to know statistics for a table of training or serving
data that you plan to use with a machine learning (ML) model. You can use the
data output by this function for such purposes as
[feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing) or [model
monitoring](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).

### Syntax

```sql
ML.DESCRIBE_DATA(
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT(
    [NUM_QUANTILES AS num_quantiles]
    [, NUM_ARRAY_LENGTH_QUANTILES AS num_array_length_quantiles]
    [, TOP_K AS top_k])
)
```

#### Arguments

`ML.DESCRIBE_DATA` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the table.
- `TABLE_NAME`: the name of the input table that contains the training or serving data to calculate statistics for.
- `QUERY_STATEMENT`: a query that generates the training or serving data to calculate statistics for. For the supported SQL syntax of the `QUERY_STATEMENT` clause, see [GoogleSQL query
  syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax).
- `NUM_QUANTILES`: an `INT64` value that specifies the number of [quantiles](https://en.wikipedia.org/wiki/Quantile) to return for numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` columns. This affects the number of results shown in the `quantiles` output column. These quantiles describe the distribution of the data in the column. Specify a lower value for coarser-grained distribution information and a higher value for finer-grained distribution information. The `NUM_QUANTILES` value must be in the range `[1, 100,000]`. The default value is `2`.
- `NUM_ARRAY_LENGTH_QUANTILES`: an `INT64` value that specifies the number of quantiles to return for `ARRAY` columns. This affects the number of results shown in the `array_length_quantiles` output column. These quantiles describe the distribution of the length of the arrays in the column. Specify a lower value for coarser-grained distribution information and a higher value for finer-grained distribution information. The `NUM_ARRAY_LENGTH_QUANTILES` value must be in the range `[1, 100,000]`. The default value is `10`.
- `TOP_K`: an `INT64` value that specifies the number of top values to return for categorical and `ARRAY<categorical>` columns. This affects the number of results shown in the `top_values` output column. The top values are the values that are shown most frequently in the column. The `TOP_K` value must be in the range `[1, 10,000]`. The default value is `1`.

### Details

`ML.DESCRIBE_DATA` handles input columns as follows:

- `ARRAY` columns are unnested before statistics are computed on them.
- `ARRAY<STRUCT<INT64, numerical>>`. The `INT64` value is the index, and the numerical value is the value. For statistics computation, BigQuery ML treats columns of this type as `ARRAY<numerical>` based on the value. The value of the dimension column in the output is `MAX(index) + 1`.
- `STRUCT` fields are expanded, and then categorical columns are cast to `STRING` and numerical columns are cast to `FLOAT64`.
- Columns of the following data types are [cast](../googlesql-functions/conversion_functions.md#cast) to `STRING` and return the same statistics as `STRING` columns:
  - `BOOL`
  - `BYTE`
  - `DATE`
  - `DATETIME`
  - `TIME`
  - `TIMESTAMP` Columns of the following data types are [cast](../googlesql-functions/conversion_functions.md#cast) to `FLOAT64` and return the same statistics as `FLOAT64` columns:
  - `INT64`
  - `NUMERIC`
  - `BIGNUMERIC`

### Output

`ML.DESCRIBE_DATA` returns one row for each column in the input data.
`ML.DESCRIBE_DATA` output contains the following columns:

- `name`: a `STRING` column that contains the name of the input column.
- `num_rows`: an `INT64` column that contains the total number of rows for the input column.
- `num_nulls`: an `INT64` column that returns the number of `NULL` values found in the column.
- `num_zeros`: an `INT64` column that contains one of the following:
  - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns the number of `0` values found in the column.
  - For categorical or `ARRAY<categorical>` input columns, returns `NULL`.
- `min`: a `STRING` column that contains the [`MIN`](../googlesql-functions/aggregate_functions.md#min) value for the column.
- `max`: a `STRING` column that contains the [`MAX`](../googlesql-functions/aggregate_functions.md#max) value for the column.
- `mean`: a `FLOAT64` column that contains one of the following:
  - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns the [mean](https://en.wikipedia.org/wiki/Mean) value calculated for the column.
  - For categorical or `ARRAY<categorical>` input columns, returns `NULL`.
- `stdev`: a `FLOAT64` column that contains one of the following:
  - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns the [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) value calculated for the column.
  - For categorical or `ARRAY<categorical>` input columns, returns `NULL`.
- `median`: a `FLOAT64` column that contains one of the following:
  - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns the [median](https://en.wikipedia.org/wiki/Median) value calculated for the column.
  - For categorical or `ARRAY<categorical>` input columns, returns `NULL`.
- `quantiles`: an `ARRAY<FLOAT64>` column that contains information about the [quantiles](https://en.wikipedia.org/wiki/Quantile) in an input column, as computed by the [`APPROX_QUANTILES`](../googlesql-functions/approximate_aggregate_functions.md#approx_quantiles) function. The `quantiles` column contains one of the following values:
  - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns the [quantiles](https://en.wikipedia.org/wiki/Quantile) computed for the column.
  - For categorical or `ARRAY<categorical>` input columns, returns `NULL`.
- `unique`: an `INT64` column that contains information about the number of unique values in an input column, as computed by the [`APPROX_COUNT_DISTINCT`](../googlesql-functions/approximate_aggregate_functions.md#approx_count_distinct) function. The `unique` column contains one of the following values:
  - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns `NULL`.
  - For categorical or `ARRAY<categorical>` input columns, returns the number of unique values in the input column.
- `avg_string_length`: a `FLOAT64` column that contains one of the following:
  - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns `NULL`.
  - For categorical or `ARRAY<categorical>` input columns, returns the average length of the values in the column.
- `num_values`: an `INT64` column that contains the number of array elements for `ARRAY` columns, and the number of values in the column for other types of columns.
- `top_values`: a `ARRAY<STRUCT<STRING, INT64>>` column that contains information about the top values and number of occurrences in an input column, as computed by the [`APPROX_TOP_COUNT`](../googlesql-functions/approximate_aggregate_functions.md#approx_top_count) function. The `top_values` column contains the following fields:
  - `top_values.value`: a `STRING` field that contains one of the following values:
    - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns `NULL`.
    - For categorical or `ARRAY<categorical>` input columns, returns one of the top values in the input column.
  - `top_values.count`: an `INT64` field that contains one of the following values:
    - For numerical, `ARRAY<numerical>`, and `ARRAY<STRUCT<INT64, numerical>>` input columns, returns `NULL`.
    - For categorical or `ARRAY<categorical>` input columns, returns the number of times the related top value appears.
- `min_array_length`: an `INT64` column that contains one of the following values:
  - For `ARRAY` input columns, returns the minimum length of an array in the column.
  - For other types of input columns, returns `NULL`.
- `max_array_length`: an `INT64` column that contains one of the following values:
  - For `ARRAY` input columns, returns the maximum length of an array in the column.
  - For other types of input columns, returns `NULL`.
- `avg_array_length`: a `FLOAT64` column that contains one of the following values:
  - For `ARRAY` input columns, returns the average length of an array in the column.
  - For other types of input columns, returns `NULL`.
- `total_array_length`: an `INT64` column that contains one of the following values:
  - For `ARRAY` input columns, returns the sum of the size of the arrays in the column.
  - For other types of input columns, returns `NULL`.
- `array_length_quantiles`: an `ARRAY<INT64>` column that contains the information about the quantiles for the array length in an input column, as computed by the [`APPROX_QUANTILES`](../googlesql-functions/approximate_aggregate_functions.md#approx_quantiles) function. The `array_length_quantiles` column contains one of the following values:
  - For `ARRAY` input columns, returns the quantiles for the array length computed for the column.
  - For other types of input columns, returns `0`.
- `dimension`: an `INT64` column that contains one of the following:
  - For `ARRAY<STRUCT<INT64, numerical>>` input columns, returns the dimension computed for the column, which is `MAX(index) + 1` for [sparse input](https://docs.cloud.google.com/bigquery/docs/input-feature-types#split-inputs).
  - For other types of input columns, returns `NULL`.

### Example

The following example returns statistics for a table with five quantiles
calculated for numeric columns and three top values returned for non-numeric
columns:

```sql
SELECT *
FROM ML.DESCRIBE_DATA(
  TABLE `myproject.mydataset.mytable`,
  STRUCT(5 AS num_quantiles, 3 AS top_k)
);
```

### Limitations

Input data for the `ML.DESCRIBE_DATA` function can only contain columns of the
following data types:

- [Numeric](../googlesql-syntax/data-types.md#numeric-types) types
- `STRING`
- `BOOL`
- `BYTE`
- `DATE`
- `DATETIME`
- `TIME`
- `TIMESTAMP`
- `ARRAY<STRUCT<INT64, FLOAT64>>` (a sparse tensor)
- `STRUCT` columns that contain any of the following types:
  - Numeric types
  - `STRING`
  - `BOOL`
  - `BYTE`
  - `DATE`
  - `DATETIME`
  - `TIME`
  - `TIMESTAMP`
- `ARRAY` columns that contain any of the following types:
  - Numeric types
  - `STRING`
  - `BOOL`
  - `BYTE`
  - `DATE`
  - `DATETIME`
  - `TIME`
  - `TIMESTAMP`

### Pricing

The `ML.DESCRIBE_DATA` function uses
[BigQuery on-demand compute pricing](https://cloud.google.com/bigquery/pricing#on-demand-compute-pricing).

### What's next

- For more information about model monitoring in BigQuery ML, see [Model monitoring overview](https://docs.cloud.google.com/bigquery/docs/model-monitoring-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-describe-data (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
