---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-explain-forecast
---

# The ML.EXPLAIN_FORECAST function

## Signature / Usage

This document describes the `ML.EXPLAIN_FORECAST` function, which lets you
generate forecasts that are based on a trained
time series model. It only works on `ARIMA_PLUS` models with the
training option `decompose_time_series` enabled or on `ARIMA_PLUS_XREG` models.
The `ML.EXPLAIN_FORECAST` function encompasses the `ML.FORECAST` function
because its output is a superset of the results of `ML.FORECAST`.

### Syntax

```sql
# `ARIMA_PLUS` models:
ML.EXPLAIN_FORECAST(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  STRUCT(
    [HORIZON AS horizon]
    [, CONFIDENCE_LEVEL AS confidence_level]))

# `ARIMA_PLUS_XREG` model:
ML.EXPLAIN_FORECAST(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  STRUCT(
    [HORIZON AS horizon]
    [, CONFIDENCE_LEVEL AS confidence_level]),
    { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) })
```

> [!NOTE]
> **Note:** No input data is required for `ARIMA_PLUS` models.

#### Arguments

`ML.EXPLAIN_FORECAST` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the
  data to be evaluated.

  If `TABLE` is specified, the input column names in the table must match the
  column names in the model, and their types should be compatible according to
  BigQuery [implicit coercion rules](../googlesql-syntax/conversion_rules.md#coercion).

  If there are unused columns from the table, they are ignored.

  The `TABLE` argument is required for the `ARIMA_PLUS_XREG` model.
- `QUERY_STATEMENT`: the GoogleSQL query that is
  used to generate the evaluation data. For the supported SQL syntax for the
  `QUERY_STATEMENT` clause in GoogleSQL, see
  [Query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax).

  If `QUERY_STATEMENT` is specified, the input column names from the query
  must match the column names in the model, and their types should be
  compatible according to BigQuery
  [implicit coercion rules](../googlesql-syntax/conversion_rules.md#coercion).
- `HORIZON`: an `INT64` value that specifies the number of
  time points to forecast. The maximum value is the horizon value specified in
  the
  [`CREATE MODEL`](create-time-series.md)
  statement for the time series model, or `1000` if unspecified. The default
  value is `3`. When forecasting multiple time series at the same time, this
  parameter applies to each time series.

  > [!NOTE]
  > **Note:** Forecasting takes place when the `CREATE MODEL` statement runs. The `ML.EXPLAIN_FORECAST` function retrieves the forecasting values and computes the prediction intervals. If you want to filter results when you're forecasting multiple time series, use the `ML.EXPLAIN_FORECAST` function. To save query time, specify a value for the `HORIZON` option in the `CREATE MODEL` statement.

- `CONFIDENCE_LEVEL`: a `FLOAT64` value that specifies the
  percentage of the future values that fall in the prediction interval. The
  valid input range is `[0, 1)`. The default value is `0.95`.

### Output

The `ML.EXPLAIN_FORECAST` function returns the following columns:

- `time_series_id_col` or `time_series_id_cols`: a value that contains
  the identifiers of a time series. `time_series_id_col` can be an `INT64` or
  `STRING` value. `time_series_id_cols` can be an `ARRAY<INT64>` or
  `ARRAY<STRING>` value. Only present when forecasting multiple time series at
  once. The column names and types are inherited from the `TIME_SERIES_ID_COL`
  option as specified in the `CREATE MODEL` statement.

- `time_series_timestamp`: a `TIMESTAMP` value that contains the timestamp of
  the time series. This column has a type of `TIMESTAMP` regardless of the
  type of the input
  [`time_series_timestamp_col`](create-time-series.md#time_series_timestamp_col).
  For each time series, the output rows are sorted in chronological order by
  the `time_series_timestamp` value.

- `time_series_type`: a `STRING` value that contains either `history` or
  `forecast`. The rows that have a value of `history` in this
  column are used in training, either directly from the training table, or from
  interpolation using the training data.

- `time_series_data`: a `FLOAT64` value that contains the data of the time
  series. For rows that have a value of `history` in the `time_series_type`
  column, `time_series_data` is either
  the training data or the interpolated value using the training data.
  For rows that have a value of `forecast` in the `time_series_type`
  column, `time_series_data` is the forecast value.

- `time_series_adjusted_data`: a `FLOAT64` value that contains the adjusted
  data of the time series. For rows that have a value of `history` in the
  `time_series_type` column, this is the value
  after cleaning spikes and dips, adjusting the step changes, and removing the
  residuals. It is the aggregation of all the valid components:
  [holiday effect](#holiday_effect),
  [seasonal components](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-explain-forecast#seasonal_components), and [trend](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-explain-forecast#trend).
  For rows that have a value of `forecast` in the `time_series_type`
  column, this is the forecast value, which is the same as the
  value of `time_series_data`.

- `standard_error`: a `FLOAT64` value that contains the standard error of the
  residuals during the ARIMA fitting. The values are
  the same for all rows that have a value of `history` in the
  `time_series_type` column. For rows that have a value of `forecast` in the
  `time_series_type` column, this value increases
  with time, as the forecast values become less reliable.

- `confidence_level`: a `FLOAT64` value that contains the user-specified
  confidence level or, if unspecified, the default value. Only rows that have a
  value of `forecast` in the `time_series_type` column have values other than
  `NULL`. This value is the same for all such rows.

- `prediction_interval_lower_bound`: a `FLOAT64` value that contains the lower
  bound of the prediction result. Only rows that have a value of
  `forecast` in the `time_series_type` column have values
  other than `NULL` in this column.

- `prediction_interval_upper_bound`: a `FLOAT64` value that contains the upper
  bound of the prediction result. Only rows that have a value of
  `forecast` in the `time_series_type` column have values
  other than `NULL` in this column.

- `trend`: a `FLOAT64` value that contains the long-term increase or decrease
  in the time series data.

- `seasonal_period_yearly`: a `FLOAT64` value that contains the time series
  data value affected by the time of the year. This value is
  `NULL` if no yearly effect is found.

- `seasonal_period_quarterly`: a `FLOAT64` value that contains the time series
  data value affected by the time of the quarter. This value is
  `NULL` if no quarterly effect is found.

- `seasonal_period_monthly`: a `FLOAT64` value that contains the time series
  data value affected by the time of the month. This value is
  `NULL` if no monthly effect is found.

- `seasonal_period_weekly`: a `FLOAT64` value that contains the time series
  data value affected by the time of the week. This value is
  `NULL` if no weekly effect is found.

- `seasonal_period_daily`: a `FLOAT64` value that contains the time series
  data value affected by the time of the day. This value is
  `NULL` if no daily effect is found.

- `holiday_effect`: a `FLOAT64` value that contains the time series data value
  affected by different holidays. This is the
  sum of the maximum positive individual holiday effect and the minimum
  negative individual holiday effect. This is shown in the following formula,
  where \\(H\\) is the overall holiday effect and \\(h(i)\\) is the individual
  holiday effect:

  \\\[H=\\max\\limits_{h(i)\>0} h(i) + \\min\\limits_{h(i)\<0} h(i)\\\]

  This value is `NULL` if no holiday effect is found.
- `spikes_and_dips`: a `FLOAT64` value that contains the unexpectedly high
  or low values of the time series. For rows that have a value of `history` in the
  `time_series_type` column, the value is `NULL` if no spike or dip is found.
  For rows that have a value of `forecast` in the `time_series_type` column, this
  value is `NULL`.

- `step_changes`: a `FLOAT64` value that contains the abrupt or structural
  change in the distributional properties of the time
  series. For rows that have a value of `history` in the
  `time_series_type` column, this value is `NULL` if no step change is found.
  For rows that have a value of `forecast` in the `time_series_type` column,
  this value is `NULL`.

- `residual`: a `FLOAT64` value that contains the difference between the actual
  time series and the fitted time series after model training. The residual
  value is only meaningful for historical data. For rows that have a value of
  `forecast` in the `time_series_type` column, the `residual` value is `NULL`.

- `holiday_effect_holiday_name`:
  a `FLOAT64` value that contains the time series data value affected by
  the holiday that's identified in
  <var translate="no">holiday_name</var>. If no holiday effect is found, this value is `NULL`.

  There is one `holiday_effect_holiday_name` column
  for each holiday that's included in the model.
- `attribution_feature_name`: a `FLOAT64` value that
  contains the attribution of each feature to the final forecast. This only
  applies to `ARIMAX_PLUS_XREG` models. The value is calculated by multiplying
  the weight of the feature with the feature value. This is shown in the
  following formula, where \\(\\beta_{fn}\\) is the weight of feature `fn` in the
  linear regression and \\(X_{fn}\\) is the numericalized feature value:

  \\\[attribution_{fn}=\\beta_{fn} \* X_{fn}\\\]

### Mathematical explanation

The mathematical relationship of the output columns is described in the
following sections.

#### `time_series_data`

The `time_series_data` value is decomposed into several components to get better
explainability. For `ARIMA_PLUS` models, the component list includes the
following components for better explainability:

- `trend`
- `seasonal_period_yearly`
- `seasonal_period_quarterly`
- `seasonal_period_monthly`
- `seasonal_period_weekly`
- `seasonal_period_daily`
- `holiday_effect`
- `spikes_and_dips`
- `step_changes`
- `residual`

For `ARIMA_PLUS_XREG` models, this list also includes the feature contribution
`attribution_feature_name`. For future data,
the `spikes_and_dips`, `step_changes`, and `residuals` values aren't applicable.

The following formulas show what components make up the `time_series_data`
value for historical and forecast data for time series models

- For `ARIMA_PLUS` models:

  - Historical data:

    ```text
    time_series_data = trend + seasonal_period_yearly + seasonal_period_quarterly + seasonal_period_monthly
                        + seasonal_period_weekly + seasonal_period_daily + holiday_effect
                        + spikes_and_dips + step_changes + residual
    ```

  - Forecast data:

    ```text
    time_series_data = trend + seasonal_period_yearly + seasonal_period_quarterly + seasonal_period_monthly
                      + seasonal_period_weekly + seasonal_period_daily + holiday_effect
    ```

- For `ARIMA_PLUS_XREG` models:

  - Historical data:

    ```text
    time_series_data = trend + seasonal_period_yearly + seasonal_period_quarterly + seasonal_period_monthly
                      + seasonal_period_weekly + seasonal_period_daily + holiday_effect
                      + spikes_and_dips + step_changes + residual
                      + (attribution_feature_1 + ... + attribution_feature_n)
    ```

  - Forecast data:

    ```text
    time_series_data = trend + seasonal_period_yearly + seasonal_period_quarterly + seasonal_period_monthly
                      + seasonal_period_weekly + seasonal_period_daily + holiday_effect
                      + (attribution_feature_1 + ... + attribution_feature_n)
    ```

#### `time_series_adjusted_data`

The `time_series_adjusted_data` value is the value that remains after cleaning
spikes and dips, adjusting the step changes, and removing the residuals. Its
formula is the same for both historical and forecast data.

- For `ARIMA_PLUS` models:

  ```text
  time_series_adjusted_data = trend + seasonal_period_yearly + seasonal_period_quarterly
                              + seasonal_period_monthly + seasonal_period_weekly + seasonal_period_daily
                              + holiday_effect
  ```

- For `ARIMA_PLUS_XREG` models:

  ```text
  time_series_adjusted_data = trend + seasonal_period_yearly + seasonal_period_quarterly
                              + seasonal_period_monthly + seasonal_period_weekly + seasonal_period_daily
                              + holiday_effect + (attribution_feature_1 + ... + attribution_feature_n)
  ```

> [!NOTE]
> **Note:** For rows that have a value of `forecast` in the `time_series_type` column, you might notice that the `time_series_data` and `time_series_adjusted_data` values are the same .

#### `holiday_effect`

The `holiday_effect_holiday_name` value is a subcomponent
. The `holiday_effect` value is the sum of all the
`holiday_effect_holiday_name` values. For example, if you
specify holidays `xmas` and `mlk`, the formula is
`holiday_effect = holiday_effect_xmas + holiday_effect_mlk`.

### `ARIMA_PLUS` example

The following example forecasts 30 time points with
a confidence level of `0.8`:

```sql
SELECT
  *
FROM
  ML.EXPLAIN_FORECAST(MODEL `mydataset.mymodel`,
    STRUCT(30 AS horizon, 0.8 AS confidence_level))
```

### `ARIMA_PLUS_XREG` example

The following example forecasts 30 time points with a
confidence level of `0.8` with future features:

```sql
SELECT
  *
FROM
  ML.EXPLAIN_FORECAST(MODEL `mydataset.mymodel`,
    STRUCT(30 AS horizon, 0.8 AS confidence_level),
    (SELECT * FROM `mydataset.mytable`))
```

### What's next

- For more information about Explainable AI, see [BigQuery Explainable AI overview](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-xai-overview).
- For more information about supported SQL statements and functions for time series forecasting models, see [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-explain-forecast (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: `holiday_effect` is defined as the sum of the maximum positive individual holiday effect and the minimum negative individual holiday effect, while the `holiday_effect_holiday_name` description says `holiday_effect` is the sum of all `holiday_effect_holiday_name` values. The two differ when several holidays have effects of the same sign; the source does not say which one applies.

## Related

- [Index of this directory](./README.md)
