---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-forecast
---

# The ML.FORECAST function

## Signature / Usage

This document describes the `ML.FORECAST` function, which you can use to
forecast a time series based on a trained `ARIMA_PLUS` or `ARIMA_PLUS_XREG`
model.

If you don't want to manage your own time series forecasting model, you can
use the
[`AI.FORECAST` function](ai-forecast.md)
with BigQuery ML's built-in
[TimesFM time series model](https://docs.cloud.google.com/bigquery/docs/timesfm-model)
to perform forecasting.

### Syntax

```text
# ARIMA_PLUS models:
ML.FORECAST(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
    STRUCT(
      [, HORIZON AS horizon]
      [, CONFIDENCE_LEVEL AS confidence_level])
)

# ARIMA_PLUS_XREG model:
ML.FORECAST(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
    STRUCT(
      [HORIZON AS horizon]
      [, CONFIDENCE_LEVEL AS confidence_level]),
    { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }
)
```

#### Arguments

`ML.FORECAST` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: The name of the model.
- `HORIZON`: an `INT64` value that specifies the number of
  time points to forecast. The default value is `3`, and the maximum value is
  the value
  of the `HORIZON` option specified in the
  [`CREATE MODEL`](create-time-series.md)
  statement for time-series models, or `1000` if that option isn't specified.
  When forecasting multiple time series at the same time, this parameter
  applies to each time series.

  > [!NOTE]
  > **Note:** Forecasting takes place when the [`CREATE MODEL` statement](create-time-series.md) runs. `ML.FORECAST` just retrieves the forecasting values and computes the prediction intervals. Therefore, this argument exists mainly for filtering results when forecasting multiple time series. To save query time, you should specify a value for the `HORIZON` option in the `CREATE MODEL` statement.

- `CONFIDENCE_LEVEL`: a `FLOAT64` value that specifies
  percentage of the future values that fall in the prediction interval. The
  default value is `0.95`. The valid input range is `[0, 1)`.

- `TABLE`: The name of the input table that contains the
  features.

  If `TABLE` is specified, the input column names in the table must match the
  column names in the model, and their types should be compatible according to
  BigQuery [implicit coercion rules](../googlesql-syntax/conversion_rules.md#coercion).

  If there are unused columns from the table, they are ignored.
- `QUERY_STATEMENT`: The GoogleSQL query that is
  used to generate the features. See the
  [GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax)
  page for the supported SQL syntax of the `QUERY_STATEMENT` clause.

  If `QUERY_STATEMENT` is specified, the input column names from the query
  must match the column names in the model, and their types should be
  compatible according to BigQuery
  [implicit coercion rules](../googlesql-syntax/conversion_rules.md#coercion).

  If there are unused columns from the query, they are ignored.

### Output

`ML.FORECAST` returns the following columns:

- `time_series_id_col` or `time_series_id_cols`: a value that contains the identifiers of a time series. `time_series_id_col` can be an `INT64` or `STRING` value. `time_series_id_cols` can be an `ARRAY<INT64>` or `ARRAY<STRING>` value. Only present when forecasting multiple time series at once. The column names and types are inherited from the `TIME_SERIES_ID_COL` option as specified in the `CREATE MODEL` statement.
- `forecast_timestamp`: a `TIMESTAMP` value that contains the timestamps of a time series.
- `forecast_value`: a `FLOAT64` value that contains the average of the `prediction_interval_lower_bound` and `prediction_interval_upper_bound` values.
- `standard_error`: a `FLOAT64` value that contains the amount of variability in the estimated results.
- `confidence_level`: a `FLOAT64` value that contains the `confidence_level` value you specified in the function input, or `0.95` if you didn't specify a `confidence_level` value. It is the same across all rows.
- `prediction_interval_lower_bound`: a `FLOAT64` value that contains the lower bound of the prediction interval for each forecasted point.
- `prediction_interval_upper_bound`: a `FLOAT64` value that contains the upper bound of the prediction interval for each forecasted point.
- `confidence_interval_lower_bound`: a `FLOAT64` value that contains the lower bound of the confidence interval for each forecasted point.
- `confidence_interval_upper_bound`: a `FLOAT64` value that contains the upper bound of the confidence interval for each forecasted point.

The output of `ML.FORECAST` has the following properties:

- For each time series, the output rows are sorted in the chronological order of `forecast_timestamp`.
- `forecast_timestamp` always has a type of `TIMESTAMP`, regardless of the type of the column specified in the [`TIME_SERIES_TIMESTAMP_COL` option](create-time-series.md#time_series_timestamp_col) of the `CREATE MODEL` statement.

### `ARIMA_PLUS` example

The following example forecasts 30 time points with a
confidence level of `0.8`:

```sql
SELECT
  *
FROM
  ML.FORECAST(MODEL `mydataset.mymodel`,
    STRUCT(30 AS horizon, 0.8 AS confidence_level))
```

### `ARIMA_PLUS_XREG` example

The following example forecasts 30 time points with a
confidence level of `0.8` with future features:

```sql
SELECT
  *
FROM
  ML.FORECAST(MODEL `mydataset.mymodel`,
    STRUCT(30 AS horizon, 0.8 AS confidence_level),
    (SELECT * FROM `mydataset.mytable`))
```

### Limitation

Applying any additional computation on top of `ML.FORECAST`'s result
columns might lead to an out of memory error if the model size is too large. If this happens, you might see errors like
`Resources exceeded during query execution: The query could not be executed in the allotted memory`.
Examples of operations that might cause this issue are calculating minimum or maximum values, or adding to or subtracting
from a particular column. If you are trying to filter on the forecasted value,
we recommend that you use the [forecast with limit](create-time-series.md#forecast_limit_lower_bound) option instead, because the algorithm it uses is less likely to cause an issue. If you keep getting out of memory errors, you can try working around this issue by
creating a new table for the `ML.FORECAST` result, and then applying other computations in a different query that uses data from the new table.

### What's next

- For information about model inference, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for time series forecasting models, see [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-forecast (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
