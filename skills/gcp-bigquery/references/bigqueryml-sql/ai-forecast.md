---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-forecast
---

# The AI.FORECAST function

## Signature / Usage

This document describes the `AI.FORECAST` function, which lets you forecast time
series by using the [TimesFM model](https://docs.cloud.google.com/bigquery/docs/timesfm-model) that's built
into BigQuery ML. You can use this function to perform univariate or
multivariate forecasting:

- **Univariate forecasting**: predicts future values of a single time series based only on its own past values.
- **Multivariate forecasting**: predicts future values based on the time series' past values and additional variables (covariates) that might influence the forecast.

For example, imagine you have a table containing sales data for a
product. You could run a query similar to the following to forecast
sales for the next 30 data points:

```sql
SELECT *
FROM AI.FORECAST(
  TABLE `mydataset.input_table`,
  data_col => 'units_sold',
  timestamp_col => 'sales_date',
  horizon => 30);
```

### Syntax

The syntax for `AI.FORECAST` depends on if you're performing univariate or
multivariate forecasting.

#### Univariate

```sql
SELECT
  *
FROM
  AI.FORECAST(
    { TABLE TABLE | (QUERY_STATEMENT) },
    data_col => 'DATA_COL',
    timestamp_col => 'TIMESTAMP_COL'
    [, model => 'MODEL']
    [, id_cols => ID_COLS]
    [, horizon => HORIZON]
    [, forecast_end_timestamp => FORECAST_END_TIMESTAMP]
    [, confidence_level => CONFIDENCE_LEVEL]
    [, output_historical_time_series => OUTPUT_HISTORICAL_TIME_SERIES]
    [, context_window => CONTEXT_WINDOW]
  )
```

##### Arguments

`AI.FORECAST` takes the following arguments for univariate forecasting:

- `TABLE`: the name of the table that contains the
  data that you want to forecast. For example, `` `mydataset.mytable` ``.

  If the table is in a different project, then you must prepend the
  project ID to the table name in the following format, including backticks:

  `` `PROJECT_ID.DATASET.TABLE` ``

  For example, `` `myproject.mydataset.mytable` ``.

  To prevent query errors, we recommend providing the fully qualified table
  name, including backticks. This is especially important if the project name
  contains characters other than letters, numbers, and underscores.
- `QUERY_STATEMENT`: the GoogleSQL query that
  generates the data that you want to forecast. See the
  [GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax)
  page for the supported SQL syntax of the `QUERY_STATEMENT` clause.

- `DATA_COL`: a `STRING` value that specifies the name of
  the data column. The data column contains the data to forecast. The data
  column must use one of the following data types:

  - `INT64`
  - `NUMERIC`
  - `BIGNUMERIC`
  - `FLOAT64`
- `TIMESTAMP_COL`: a `STRING` value that specifies the
  name of the timestamp column. The timestamp
  column must use one of the following data types:

  - `TIMESTAMP`
  - `DATE`
  - `DATETIME`
- `MODEL`: a `STRING` value that specifies the name of the
  model to use. Supported models include `TimesFM 2.5` and
  `TimesFM 3.0` ([Preview](https://cloud.google.com/products#product-launch-stages)).
  The default value is `TimesFM 2.5`.

- `ID_COLS`: an `ARRAY<STRING>` value that specifies the
  names of one or more ID columns. Each unique combination of IDs identifies a
  unique time series to forecast. Specify one or more values for this argument
  in order to forecast multiple time series using a single query. The columns
  that you specify must use one of the following data types:

  - `STRING`
  - `INT64`
  - `ARRAY<STRING>`
  - `ARRAY<INT64>`
- `HORIZON`: an `INT64` value that specifies the number of
  time series data points to forecast. The default value is `10`. The valid
  input range for the `TimesFM 2.5` model is `[1, 10,000]`.
  The valid input range for the `TimesFM 3.0` model is `[1, 1024]`. This argument
  can't be used with the
  `forecast_end_timestamp` argument.

- `FORECAST_END_TIMESTAMP`: a timestamp literal value that
  specifies the end timestamp for the forecasted values. The horizon is
  calculated based on the end timestamp and the frequency provided from the
  input table for each time series. If the calculated horizon is out of the
  valid range `[1, 10,000]`, the query returns an error. You can then adjust the
  `forecast_end_timestamp` value so that the calculated horizon is within the
  valid range. This argument can't be used with the `horizon` argument.

- `CONFIDENCE_LEVEL`: a `FLOAT64` value that specifies the
  percentage of the future values that fall in the prediction interval. The
  default value is `0.95`. The valid input range is `[0, 1)`.

- `OUTPUT_HISTORICAL_TIME_SERIES`: a `BOOL` value that
  determines whether the input data is returned along with the forecasted
  data. Set this argument to `TRUE` to return input data. The default value
  is `FALSE`.

  Returning the input data along with the forecasted data lets you compare the
  historical value of the data column with the forecasted value of the data
  column, or chart the change in the data column values over time.
- `CONTEXT_WINDOW`: an `INT64` value that specifies the
  context window length used by BigQuery ML's built-in TimesFM model.
  The context window length determines how many of the most recent data points
  from the input time series are used by the model. For example, if your time
  series date range is March 1 to April 15, data points are selected starting
  at April 15 and working backwards. Valid values for models are as follows:

  | **Model name** | **Supported context window length** |
  |---|---|
  | `TimesFM 2.5` | 64, 128, 256, 512, 1024, 2048, 4096, 8192, 15360 |
  | `TimesFM 3.0` | `n * 32` where `n` is an integer in the range `[2, 64]` |

  If you don't specify a `CONTEXT_WINDOW` value when you use the
  `TimesFM 2.5` model, the `AI.FORECAST` function
  automatically chooses the smallest possible context window length to use that
  is still large enough to cover the number of time series data points in your
  input data. If you don't specify a `CONTEXT_WINDOW` value when you use the
  `TimesFM 3.0` model, the `AI.FORECAST` function defaults to the maximum
  supported size, `2048`. The following table shows the relationships between
  the number of time series data points in the input data, the selected context
  window length and the corresponding supported TimesFM model name:

  | **Number of time series data points** | **Context window length** | **Supported model names** |
  |---|---|---|
  | `(1, 64]` | 64 | `TimesFM 2.5`, `TimesFM 3.0` |
  | `(65, 128]` | 128 | `TimesFM 2.5`, `TimesFM 3.0` |
  | `(129, 256]` | 256 | `TimesFM 2.5`, `TimesFM 3.0` |
  | `(257, 512]` | 512 | `TimesFM 2.5`, `TimesFM 3.0` |
  | `(513, 1024]` | 1,024 | `TimesFM 2.5`, `TimesFM 3.0` |
  | `(1025, 2048]` | 2,048 | `TimesFM 2.5`, `TimesFM 3.0` |
  | `(2049, 4096]` | 4,096 | `TimesFM 2.5` |
  | `(4097, 8192]` | 8,192 | `TimesFM 2.5` |
  | `(8193, 15360]` | 15,360 | `TimesFM 2.5` |
  | `15360` | 15,360 | `TimesFM 2.5` |

  For the `TimesFM 3.0` model, 2,048 is the maximum
  number of time series data
  points that are passed to the model. For the `TimesFM 2.5`
  model, 15,360 is the maximum number of time series data points that are
  passed to the model. Any additional time series data points in the input data
  are ignored.

#### Multivariate

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

<br />

```sql
SELECT *
FROM AI.FORECAST(
  { TABLE TABLE | (QUERY_STATEMENT) },
  target_cols => [TARGET_COLS],
  timestamp_col => 'TIMESTAMP_COL',
  model => 'MODEL'
  [, id_cols => [ID_COLS]]
  [, horizon => HORIZON]
  [, confidence_level => CONFIDENCE_LEVEL]
  [, context_window => CONTEXT_WINDOW]
  [, past_covariate_cols => [PAST_COVARIATE_COLS]]
  [, future_covariate_cols => [FUTURE_COVARIATE_COLS]]
  [, output_historical_time_series => OUTPUT_HISTORICAL_TIME_SERIES]
);
```

##### Arguments

`AI.FORECAST` takes the following arguments for multivariate forecasting:

- `TABLE`: the name of the table that contains the
  data that you want to forecast. For example, `` `mydataset.mytable` ``.

  If the table is in a different project, then you must prepend the
  project ID to the table name in the following format, including backticks:

  `` `PROJECT_ID.DATASET.TABLE` ``

  For example, `` `myproject.mydataset.mytable` ``.

  To prevent query errors, we recommend providing the fully qualified table
  name, including backticks. This is especially important if the project name
  contains characters other than letters, numbers, and underscores.
- `QUERY_STATEMENT`: the GoogleSQL query that
  generates the data that you want to forecast. See the
  [GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax)
  page for the supported SQL syntax of the `QUERY_STATEMENT` clause.

- `TARGET_COLS`: an `ARRAY<STRING>` value that specifies the names of
  the data columns. The data columns contain the data to forecast. The data
  columns must use one of the following data types:

  - `INT64`
  - `NUMERIC`
  - `BIGNUMERIC`
  - `FLOAT64`
- `TIMESTAMP_COL`: a `STRING` value that specifies the
  name of the timestamp column. The timestamp
  column must use one of the following data types:

  - `TIMESTAMP`
  - `DATE`
  - `DATETIME`
- `MODEL`: a `STRING` value that specifies the name of the
  model to use. You must use the `TimesFM 3.0` model
  ([Preview](https://cloud.google.com/products#product-launch-stages))
  for multivariate forecasting.

- <var translate="no">PAST_COVARIATE_COLS</var>: an `ARRAY<STRING>` value that specifies the
  names of columns that could influence the target columns and that are only
  known historically. For
  example, if you're forecasting daily sales at a store's location,
  then a past covariate column could be the number of customers who visited
  the store each day. Customer counts are known historically and can
  influence sales, but they aren't known for the future. The columns
  that you specify must use one of the following data types:

  - `INT64`
  - `FLOAT64`
  - `NUMERIC`
  - `BIGNUMERIC`
- <var translate="no">FUTURE_COVARIATE_COLS</var>: an `ARRAY<STRING>` value that specifies
  the names of columns that could influence the target
  columns and are known for both the past and
  the future. For example, if you're forecasting daily sales at a store's
  location, then a future covariate column could be whether or not the day
  is a weekend. This data is known in advance for both the past and the
  future. The columns that you specify must use one of the following data
  types:

  - `INT64`
  - `FLOAT64`
  - `NUMERIC`
  - `BIGNUMERIC`

  > [!NOTE]
  > **Note:** When you use `FUTURE_COVARIATE_COLS`, *all* input columns must have data spanning the entire `CONTEXT_WINDOW` + `HORIZON` length.

- `HORIZON`: an `INT64` value that specifies the number of
  time series data points to forecast. The default value is `10`. The valid
  input range for the `TimesFM 3.0` model is `[1, 1024]`. This argument can't be used with the
  `forecast_end_timestamp` argument.

- `ID_COLS`: an `ARRAY<STRING>` value that specifies the
  names of one or more ID columns. Each unique combination of IDs identifies a
  unique time series to forecast. Specify one or more values for this argument
  in order to forecast multiple time series using a single query. The columns
  that you specify must use one of the following data types:

  - `STRING`
  - `INT64`
  - `ARRAY<STRING>`
  - `ARRAY<INT64>`
- `CONFIDENCE_LEVEL`: a `FLOAT64` value that specifies the
  percentage of the future values that fall in the prediction interval. The
  default value is `0.95`. The valid input range is `[0, 1)`.

- `CONTEXT_WINDOW`: an `INT64` value that specifies the
  context window length used by the TimesFM model.
  The context window length determines how many of the most recent data points
  from the input time series are used by the model. For example, if your time
  series date range is March 1 to April 15, data points are selected starting
  at April 15 and working backwards. Valid values for the `TimesFM 3.0` model are
  as follows:

  | **Model name** | **Supported context window length** |
  |---|---|
  | `TimesFM 3.0` | `n * 32` where `n` is an integer in the range `[2, 64]` |

  If you don't specify a `CONTEXT_WINDOW` value when you use the `TimesFM 3.0`
  model, the `AI.FORECAST` function defaults to the maximum supported size,
  `2048`.

  For the `TimesFM 3.0` model, 2,048 is the maximum number of time series
  data points that are passed to the model. Any additional time series data
  points in the input data are ignored.
- `OUTPUT_HISTORICAL_TIME_SERIES`: a `BOOL` value that
  determines whether the input data is returned along with the forecasted
  data. Set this argument to `TRUE` to return input data. The default value
  is `FALSE`.

  Returning the input data along with the forecasted data lets you compare the
  historical value of the data column with the forecasted value of the data
  column, or chart the change in the data column values over time.

### Output

The output schema of `AI.FORECAST` depends on if you're performing univariate or
multivariate forecasting.

#### Univariate

The output schema of `AI.FORECAST` depends on the value of the
`output_historical_time_series` argument. The following columns are always part
of the output:

- `id_cols`: one or more values that contain the identifiers of a time series. `id_cols` can be an `INT64`, `STRING`, `ARRAY<INT64>`, or `ARRAY<STRING>` value. The column names and types are inherited from the `ID_COLS` argument value specified in the function input.
- `confidence_level`: a `FLOAT64` value that contains the `confidence_level` value that you specified in the function input, or `0.95` if you didn't specify a `confidence_level` value. This value is the same across all rows.
- `prediction_interval_lower_bound`: a `FLOAT64` value that contains the lower bound of the prediction interval for each forecasted point. For historical points, the value is `NULL`.
- `prediction_interval_upper_bound`: a `FLOAT64` value that contains the upper bound of the prediction interval for each forecasted point. For historical points, the value is `NULL`.
- `ai_forecast_status`: a `STRING` value that contains the forecast status. This value is empty if the operation was successful. If the operation wasn't successful, the value is the error string. A common error is `The time series data is too short.` This error indicates that there wasn't enough historical data in the time series to generate a forecast. A minimum of 3 data points is required.

If you set `output_historical_time_series` to `FALSE`, then the output rows
only include forecasted data and the output columns are the following:

- `forecast_timestamp`: a `TIMESTAMP` value that contains the timestamps of the time series.
- `forecast_value`: a `FLOAT64` value that contains the 50% quantile value for the forecasting output from the model. The 50% quantile value represents the median value of the forecasted data.

If you set `output_historical_time_series` to `TRUE`, then the output rows
include all data, and the output columns are the following:

- `time_series_type`: a `STRING` value that contains a value of either `history` or `forecast`. Rows that have a value of `history` contain data from the input table or query. Rows that have a value of `forecast` contain forecasted data.
- `time_series_timestamp`: a `TIMESTAMP` value that contains the timestamps of the time series.
- `time_series_data`: a `FLOAT64` value that represents the historical input if the `time_series_type` is `history`. Otherwise, if the `time_series_type` is `forecast` this number represents the 50% quantile of the forecast.

#### Multivariate

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

<br />

If you perform a multivariate forecast, the output schema is restructured to
support multiple targets:

- `id_cols`: one or more values that contain the identifiers of a time
  series. `id_cols` can be an `INT64`, `STRING`, `ARRAY<INT64>`, or
  `ARRAY<STRING>` value. The column names and types are inherited from the
  `ID_COLS` argument value specified in the function input.

- `timestamp_col`: a `TIMESTAMP` value that contains the timestamp of the data
  point. Unlike univariate, this column preserves the name of the timestamp
  column from your input table---for example, `date`.

- `target_cols`: for each target column specified in
  `TARGET_COLS` input argument, the output contains a `STRUCT` type with the
  following fields:

  - `value`: a `FLOAT64` value that contains the 50% quantile value for
    the forecasting output from the model. The 50% quantile value represents
    the median value of the forecasted data.

  - `prediction_interval_lower_bound`: a `FLOAT64` value that contains the
    lower bound of the prediction interval for each forecasted point. For
    historical points, the value is `NULL`.

  - `prediction_interval_upper_bound`: a `FLOAT64` value that contains the
    upper bound of the prediction interval for each forecasted point. For
    historical points, the value is `NULL`.

- `time_series_type`: a
  `STRING` value that contains a value of either `history` or `forecast`. Rows
  that have a value of `history` contain data from the input table or query.
  Rows that have a value of `forecast` contain forecasted data.

- `confidence_level`: a `FLOAT64` value that contains the
  `confidence_level` value that you specified in the function input, or
  `0.95` if you didn't specify a `confidence_level` value. This value is the
  same across all rows.

- `ai_forecast_status`: a `STRING` value that contains the forecast status.
  This value is empty if the operation was successful. If the operation failed,
  the value is the error string. A common error is
  `The time series data is too short.` This error indicates that there wasn't
  enough historical data in the time series to generate a forecast.
  A minimum of 3 data points is required.

### Examples

The following examples show how to perform univariate and multivariate
forecasting.

#### Univariate forecasting

The following example performs univariate forecasting to predict the daily
number of bike trips for each different user type for the next 30 days:

```sql
WITH
  citibike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, usertype, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date, usertype
  )
SELECT *
FROM
  AI.FORECAST(
    TABLE citibike_trips,
    data_col => 'num_trips',
    timestamp_col => 'date',
    id_cols => ['usertype'],
    horizon => 30);
```

The result is similar to the following:

```text
+------------+-------------------------+----------------+------------------+---------------------------------+---------------------------------+--------------------+
| usertype   | forecast_timestamp      | forecast_value | confidence_level | prediction_interval_lower_bound | prediction_interval_upper_bound | ai_forecast_status |
+------------+-------------------------+----------------+------------------+---------------------------------+---------------------------------+--------------------+
| Subscriber | 2016-10-01 00:00:00 UTC | 21225.859375   | 0.95             | -3706.6855220930775             | 46158.404272093074              |                    |
| Subscriber | 2016-10-02 00:00:00 UTC | 25503.98046875 | 0.95             | 1723.3565528871222              | 49284.604384612874              |                    |
| ...        | ...                     | ...            | ...              | ...                             | ...                             | ...                |
+------------+-------------------------+----------------+------------------+---------------------------------+---------------------------------+--------------------+
```

#### Univariate forecasting with historical data output

The following example performs univariate forecasting to predict the daily
number of bike trips for each
different user type, the `output_historical_time_series` argument is set to
`TRUE`, so the output includes historical and forecasted data.

```sql
WITH
  citibike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, usertype, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date, usertype
  )
SELECT *
FROM
  AI.FORECAST(
    TABLE citibike_trips,
    data_col => 'num_trips',
    timestamp_col => 'date',
    id_cols => ['usertype'],
    horizon => 30,
    output_historical_time_series => true);
```

The result is similar to the following:

```text
+----------+------------------+-------------------------+------------------+------------------+---------------------------------+---------------------------------+--------------------+
| usertype | time_series_type | time_series_timestamp   | time_series_data | confidence_level | prediction_interval_lower_bound | prediction_interval_upper_bound | ai_forecast_status |
+----------+------------------+-------------------------+------------------+------------------+---------------------------------+---------------------------------+--------------------+
| Customer | history          | 2013-07-01 00:00:00 UTC | 2734.0           | null             | null                            | null                            | null               |
| Customer | history          | 2013-07-02 00:00:00 UTC | 4070.0           | null             | null                            | null                            | null               |
| Customer | history          | 2013-07-03 00:00:00 UTC | 4152.0           | null             | null                            | null                            | null               |
| Customer | history          | 2013-07-04 00:00:00 UTC | 10773.0          | null             | null                            | null                            | null               |
| ...      | ...              | ...                     | ...              | ...              | ...                             | ...                             | ...                |
| Customer | forecast         | 2016-10-21 00:00:00 UTC | 3912.359375      | .95              | 862.76858192148256              | 6961.9501680785179              | null               |
| Customer | forecast         | 2016-10-22 00:00:00 UTC | 5978.39404296875 | .95              | 2670.9416601195244              | 9285.8464258179756              | null               |
+----------+------------------+-------------------------+------------------+------------------+---------------------------------+---------------------------------+--------------------+
```

#### Multivariate forecasting

The following example performs multivariate forecasting to predict the daily
number of bike trips and their average duration for the next 30 days:

```sql
WITH
  citibike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, usertype, COUNT(*) AS num_trips, AVG(tripduration) AS avg_duration
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date, usertype
  )
SELECT
  FORMAT_DATE('%Y-%m-%d', date) AS date,
  num_trips.value AS num_trips,
  num_trips.prediction_interval_lower_bound AS trips_lb,
  num_trips.prediction_interval_upper_bound AS trips_ub,
  avg_duration.value AS avg_duration_forecast,
  avg_duration.prediction_interval_lower_bound AS duration_lb,
  avg_duration.prediction_interval_upper_bound AS duration_ub,
FROM
  AI.FORECAST(
    TABLE citibike_trips,
    target_cols => ['num_trips', 'avg_duration'],
    timestamp_col => 'date',
    model => 'TimesFM 3.0',
    horizon => 30);
```

The result is similar to the following, with values rounded for clarity. It
includes the forecasted values for the next 30 days, as well as the lower and
upper bounds for the prediction intervals:

```text
+------------+-----------+----------+----------+-----------------------+-------------+-------------+
| date       | num_trips | trips_lb | trips_ub | avg_duration_forecast | duration_lb | duration_ub |
+------------+-----------+----------+----------+-----------------------+-------------+-------------+
| 2016-10-01 | 17252     | 2792     | 25973    | 1243                  | 1064        | 1511        |
| 2016-10-02 | 20303     | 7130     | 29752    | 1271                  | 1081        | 1554        |
| ...        | ...       | ...      | ...      | ...                   | ...         | ...         |
+------------+-----------+----------+----------+-----------------------+-------------+-------------+
```

#### Multivariate forecasting with past and future covariates

The following example performs multivariate forecasting to predict daily
bike trips for subscribers and unsubscribed (casual) users. The query uses
the average trip duration as a past covariate because this value is not
available for the future. The query uses whether the date is a weekend as a
future covariate because the day of the week is known in advance.

Adapted (not in the official docs): `horizon => 7` is added, because the future covariate `is_weekend` covers only 2016-06-01 to 2016-06-07 and the default horizon is 10.

```sql
WITH data AS (
  SELECT
    DATE(starttime) AS dt,
    -- Set target columns to NULL for future dates to be forecasted.
    IF(MIN(starttime) < '2016-06-01', COUNTIF(usertype = 'Subscriber'), NULL) AS subscriber_trips,
    IF(MIN(starttime) < '2016-06-01', COUNTIF(usertype = 'Customer'), NULL) AS casual_trips,
    -- Define the past covariate on historical dates and assign it to NULL for future dates.
    IF(MIN(starttime) < '2016-06-01', AVG(tripduration / 60.0), NULL) AS avg_duration_min,
    -- Define the future covariate on historical and future dates.
    IF(EXTRACT(DAYOFWEEK FROM MIN(starttime)) IN (1, 7), 1.0, 0.0) AS is_weekend
  FROM `bigquery-public-data.new_york.citibike_trips`
  WHERE starttime >= '2016-01-01' AND starttime < '2016-06-08'
  GROUP BY dt
)
SELECT
  FORMAT_DATE('%Y-%m-%d', dt) AS trip_date,
  subscriber_trips.value AS total_subscriber_trips,
  casual_trips.value AS total_casual_trips
FROM
  AI.FORECAST(
    TABLE data,
    MODEL => 'TimesFM 3.0',
    TIMESTAMP_COL => 'dt',
    TARGET_COLS => ['subscriber_trips', 'casual_trips'],
    PAST_COVARIATE_COLS => ['avg_duration_min'],
    FUTURE_COVARIATE_COLS => ['is_weekend'],
    horizon => 7
  );
```

The result is similar to the following, with values rounded for clarity. There
is a significant increase in the number of forecasted casual trips on June 4 and
June 5, which are weekend days.

```text
+------------+------------------------+--------------------+
| trip_date  | total_subscriber_trips | total_casual_trips |
+------------+------------------------+--------------------+
| 2016-06-01 | 44699                  | 4581               |
| 2016-06-02 | 44611                  | 4647               |
| 2016-06-03 | 41379                  | 5341               |
| 2016-06-04 | 30164                  | 9097               |
| 2016-06-05 | 26727                  | 8398               |
| 2016-06-06 | 36713                  | 4723               |
| 2016-06-07 | 39749                  | 4180               |
+------------+------------------------+--------------------+
```

### Locations

`AI.FORECAST` and the TimesFM model are available in all
[supported BigQuery ML locations](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Pricing

`AI.FORECAST` usage is billed at the evaluation, inspection, and prediction
rate documented in the **BigQuery ML on-demand pricing** section
of the [BigQuery ML pricing](https://cloud.google.com/bigquery/pricing#bigquery-ml-pricing) page.

During Preview, usage of `TimesFM 3.0` in BigQuery is billed in
the following ways:

- If you use Enterprise or Enterprise Plus edition, then your usage is billed in slots.
- If you use on-demand pricing, then your usage is billed based on the number of bytes processed.

`TimesFM 3.0` will use a token based pricing from 12/01/2026
onwards. At that time, you will be charged for tokens consumed by the
model in your query and BigQuery slots used or bytes processed
for the rest of the query.

### What's next

- Learn how to [forecast single or multiple time series with a TimesFM univariate model](https://docs.cloud.google.com/bigquery/docs/timesfm-time-series-forecasting-tutorial).
- Learn how to [forecast single time series with a TimesFM multivariate model](https://docs.cloud.google.com/bigquery/docs/timesfm-multivariate-single-time-series-forecasting-tutorial).
- Learn how to [forecast multiple time series with a TimesFM multivariate model](https://docs.cloud.google.com/bigquery/docs/timesfm-multivariate-multi-time-series-forecasting-tutorial).
- Evaluate forecasting results from the TimesFM model using the [`AI.EVALUATE` function](ai-evaluate.md).
- For information about forecasting in BigQuery ML, see [Forecasting overview](https://docs.cloud.google.com/bigquery/docs/forecasting-overview).
- For more information about supported SQL statements and functions for time series forecasting models, see [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-forecast (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the multivariate example with past and future covariates gives `is_weekend` only for 2016-06-01 to 2016-06-07 and omits `HORIZON` (default `10`), although all input columns must span `CONTEXT_WINDOW` + `HORIZON`; `horizon => 7` is added, which also matches the seven rows of the example result.

## Related

- [Index of this directory](./README.md)
