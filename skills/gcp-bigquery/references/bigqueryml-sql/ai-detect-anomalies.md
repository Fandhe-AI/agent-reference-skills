---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-detect-anomalies
---

# The AI.DETECT_ANOMALIES function

## Signature / Usage

This document describes the `AI.DETECT_ANOMALIES` function, which lets you
detect anomalies in time series data by using
BigQuery ML's built-in [TimesFM model](https://docs.cloud.google.com/bigquery/docs/timesfm-model).

For example, imagine you have a table containing sales data for a
product. You could run a query similar to the following to detect anomalous
spikes or drops in sales in the last 10 data points:

```sql
SELECT *
FROM AI.DETECT_ANOMALIES(
  TABLE `mydataset.input_table`,
  data_col => 'units_sold',
  timestamp_col => 'sales_date',
  target_last_n_points => 10);
```

### Syntax

```sql
SELECT
  *
FROM
  AI.DETECT_ANOMALIES(
    { TABLE HISTORY_TABLE | (HISTORY_QUERY_STATEMENT) },
    [ { TABLE TARGET_TABLE | (TARGET_QUERY_STATEMENT) }, ]
    data_col => 'DATA_COL',
    timestamp_col => 'TIMESTAMP_COL'
    [, target_last_n_points => TARGET_LAST_N_POINTS]
    [, target_start_timestamp => TARGET_START_TIMESTAMP]
    [, model => 'MODEL']
    [, id_cols => ID_COLS]
    [, anomaly_prob_threshold => ANOMALY_PROB_THRESHOLD]
    [, context_window => CONTEXT_WINDOW]
  )
```

#### Description

The TimesFM model forecasts data for the `DATA_COL` value, based on the
historical data provided in the `HISTORY_TABLE` or `HISTORY_QUERY_STATEMENT`
argument, and using the fields contained in the `SELECT` statement as variables.
The data provided by the `TARGET_TABLE` or `TARGET_QUERY_STATEMENT` argument
is then compared to this forecasted data in order to detect anomalies.

The tables or queries that provide the historical and target data must use the
same column names for the `DATA_COL` and `TIMESTAMP_COL` arguments, and for the
`ID_COLS` argument if it is used.

Optionally, if the `TARGET_TABLE` or `TARGET_QUERY_STATEMENT` argument is not
provided, the `HISTORY_TABLE` or `HISTORY_QUERY_STATEMENT` argument provides
both the historical and target data, and you must use either the
`TARGET_LAST_N_POINTS` or `TARGET_START_TIMESTAMP` argument to split the data.

#### Arguments

`AI.DETECT_ANOMALIES` takes the following arguments:

- `HISTORY_TABLE`: the name of the table that contains
  historical time point data. For example, `` `mydataset.mytable` ``.
  If the `TARGET_TABLE` argument is not provided, this table provides both the
  historical and target data.

  If the table is in a different project, then you must prepend the
  project ID to the table name in the following format, including backticks:

  `` `[PROJECT_ID].[DATASET].[TABLE]` ``

  For example, `` `myproject.mydataset.mytable` ``.
- `HISTORY_QUERY_STATEMENT`: the query
  that generates the historical data. If the `TARGET_QUERY_STATEMENT` argument
  is not provided, this query generates both the historical and target data.

- `TARGET_TABLE`: the name of the table that contains
  the data in which you want to detect anomalies. The table's schema must match
  the schema of the historical data.

  If the table is in a different project, then you must prepend the
  project ID to the table name in the following format, including backticks:

  `` `[PROJECT_ID].[DATASET].[TABLE]` ``

  For example, `` `myproject.mydataset.mytable` ``.
- `TARGET_QUERY_STATEMENT`: the
  query that generates the data in which you want to detect anomalies. The
  schema of the query result should match the schema of the historical data.

- `DATA_COL`: a `STRING` value that specifies the name of
  the data column. The data column contains the data to evaluate. The data
  column must use one of the following data types:

  - `INT64`
  - `NUMERIC`
  - `BIGNUMERIC`
  - `FLOAT64`
- `TIMESTAMP_COL`: a `STRING` value that specifies the
  name of the timestamp column. The timestamp column must use one of
  the following data types:

  - `TIMESTAMP`
  - `DATE`
  - `DATETIME`
- `TARGET_LAST_N_POINTS`: an `INT64` value that specifies
  the number of most recent data points to use as the target data. The remaining
  data points are used as the historical data. If you use this argument, then you
  can't specify the `TARGET_TABLE`, `TARGET_QUERY_STATEMENT`, or
  `TARGET_START_TIMESTAMP` arguments. The `TARGET_LAST_N_POINTS` value must be
  in the range `[1, 10000]` for the `TimesFM 2.5` model, and
  in the range `[1, 2048]` for the `TimesFM 3.0` model.

- `TARGET_START_TIMESTAMP`: a `TIMESTAMP` value or
  expression that specifies the cutoff point for the target data. Data points
  with a timestamp strictly prior to the cutoff point are used as historical
  data. Data points with a timestamp on and after the cutoff point are used as
  the target data. If you use this argument, then you can't specify the
  `TARGET_TABLE`, `TARGET_QUERY_STATEMENT`, or `TARGET_LAST_N_POINTS` arguments.
  You can use an expression for this argument to specify a rolling time window,
  for example `TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)` to detect
  anomalies for the last week.

- `MODEL_NAME`: a `STRING` value that specifies the name
  of the model to use. Supported models include `TimesFM 2.5` and `TimesFM 3.0`
  ([Preview](https://cloud.google.com/products#product-launch-stages)).
  The default value is `TimesFM 2.5`.

- `ID_COLS`: an `ARRAY<STRING>` value that specifies the
  names of one or more ID columns. Each ID identifies a unique time series to
  evaluate. Specify one or more values for this argument in order to evaluate
  multiple time series using a single query. The columns that you specify must
  use one of the following data types:

  - `STRING`
  - `INT64`
  - `ARRAY<STRING>`
  - `ARRAY<INT64>`
- `ANOMALY_PROB_THRESHOLD`: a `FLOAT64` value that
  specifies the custom threshold to use for anomaly detection. The value must
  be in the range `[0, 1)`. The default value is `0.95`.

  The value of the anomaly probability at each timestamp is calculated using the
  target time series data value, the historical time series data values, and the
  variance from the model training. The target time series data value at a
  specific timestamp is identified as anomalous if the anomaly probability
  exceeds the `ANOMALY_PROB_THRESHOLD` value. The `ANOMALY_PROB_THRESHOLD` value
  also determines the lower and upper bounds, where a larger threshold value
  results in a larger interval size.
- `CONTEXT_WINDOW`: an `INT64` value that specifies the
  context window length used by BigQuery ML's built-in TimesFM model.
  The context window length determines how many of the most recent data points
  from the input time series are used by the model. For example, if your time
  series date range is March 1 to April 15, data points are selected starting
  at April 15 and working backwards. Valid values for models are as follows:

  | **Model Name** | **Supported Context Window Length** |
  |---|---|
  | TimesFM 2.5 | 64, 128, 256, 512, 1024, 2048, 4096, 8192, 15360 |
  | TimesFM 3.0 | `n * 32` where `n` is an integer in the range `[2, 64]` |

  If you don't specify a `CONTEXT_WINDOW` value when you use the
  `TimesFM 2.5` model, the `AI.FORECAST` function automatically chooses the
  smallest possible context window length to use that is still large enough to
  cover the number of time series data points in your input data. If you don't
  specify a `CONTEXT_WINDOW` value when you use the `TimesFM 3.0` model, the
  `AI.FORECAST` function defaults to the maximum supported size, `2048`. The
  following table shows the relationships between the number of
  time series data points in the input data, the selected context window length,
  and the corresponding supported TimesFM model name:

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

  For the `TimesFM 3.0` model, 2,048 is the maximum number of
  time series data
  points that are passed to the model. For the `TimesFM 2.5` model, 15,360 is
  the maximum number of time series data points that are passed to the model.
  Any additional time series data points in the input data are ignored.

### Output

`AI.DETECT_ANOMALIES` returns the following columns:

- All time series ID columns, as specified in the `ID_COLS` argument.
- `time_series_timestamp`: a `TIMESTAMP` value that contains the timestamp column for a time series. This value is inherited from the `TIMESTAMP_COL` argument.
- `time_series_data`: a `FLOAT64` value that contains the data column for a time series. This value is inherited from the `DATA_COL` argument.
- `is_anomaly`: a `BOOL` value that indicates whether the value associated with a given time point is an anomaly.
- `lower_bound`: a `FLOAT64` value that contains the lower bound of the prediction result.
- `upper_bound`: a `FLOAT64` value that contains the upper bound of the prediction result.
- `anomaly_probability`: a `FLOAT64` value that contains the probability the value associated with a given time point is an anomaly.
- `ai_detect_anomalies_status`: a `STRING` value that contains the anomaly detection operation status. The value is empty if the operation was successful. If the operation wasn't successful, the value is the error string. A common error is `The time series data is too short.` This error indicates that there wasn't enough historical data in the time series to evaluate. A minimum of 3 data points is required.

If the input is invalid, such as if the time series length is too short, then
the function returns `NULL` values in the `is_anomaly`, `upper_bound`,
`lower_bound`, and `anomaly_probability` columns.

### Examples

The following examples detect anomalies in the number of bike trips recorded
in the
[New York Citibike trips table](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=new_york&t=citibike_trips&page=table)
for two months following July 1, 2016.

#### Detect anomalies after a specific time

This query shows how to perform the same anomaly detection by providing a single
input table and using the `target_start_timestamp` argument to separate the
historical and target data:

```sql
WITH bike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date
  )
SELECT *
FROM
  AI.DETECT_ANOMALIES(
    # Input data from a query
    (SELECT * FROM bike_trips WHERE date <= DATE('2016-09-01')),
    data_col => 'num_trips',
    timestamp_col => 'date',
    target_start_timestamp => '2016-07-01');
```

#### Detect anomalies among a fixed number of data points

This query shows how to perform the anomaly detection by providing a single
input table and using the `target_last_n_points` argument to only detect
anomalies on the last 10 data points of the input table:

```sql
WITH bike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date
  )
SELECT *
FROM
  AI.DETECT_ANOMALIES(
    # Input data from a query
    (SELECT * FROM bike_trips WHERE date <= DATE('2016-09-01')),
    data_col => 'num_trips',
    timestamp_col => 'date',
    target_last_n_points => 10);
```

#### Detect anomalies across multiples time series

This query breaks down the anomalies by the dimensions `usertype` and `gender`,
specifies that BigQuery should use the `TimesFM 2.5` model, and
sets `anomaly_prob_threshold` to 0.8:

```sql
WITH bike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, usertype, gender, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date, usertype, gender
  )
SELECT *
FROM
  AI.DETECT_ANOMALIES(
    # Historical data from a query
    (SELECT * FROM bike_trips WHERE date <= DATE('2016-06-30')),
    # Target data from a query
    (SELECT * FROM bike_trips WHERE date BETWEEN '2016-07-01' AND '2016-09-01'),
    data_col => 'num_trips',
    timestamp_col => 'date',
    id_cols => ['usertype', 'gender'],
    model => "TimesFM 2.5",
    anomaly_prob_threshold => 0.8);
```

### Limitations

Only the most recent 1,024 time points are evaluated for anomalies. If you
need to evaluate more data points, reach out to
[bqml-feedback@google.com](mailto:bqml-feedback@google.com).

### Locations

`AI.DETECT_ANOMALIES` and the TimesFM model are available in all
[supported BigQuery ML locations](https://docs.cloud.google.com/bigquery/docs/locations#bqml-loc).

### Pricing

`AI.DETECT_ANOMALIES` usage is billed at the evaluation, inspection, and
prediction rate documented in the **BigQuery ML on-demand pricing**
section of the [BigQuery ML pricing](https://docs.cloud.google.com/bigquery/pricing#bqml) page.

During Preview, usage of `TimesFM 3.0` in BigQuery is billed in
the following ways:

- If you use Enterprise or Enterprise Plus edition, then your usage is billed in slots.
- If you use on-demand pricing, then your usage is billed based on the number of bytes processed.

`TimesFM 3.0` will use a token based pricing from 12/01/2026
onwards. At that time, you will be charged for tokens consumed by the
model in your query and BigQuery slots used or bytes processed
for the rest of the query.

### What's next

- Try [Detect anomalies with a TimesFM univariate model](https://docs.cloud.google.com/bigquery/docs/timesfm-anomaly-detection-tutorial).
- For information about anomaly detection in BigQuery ML, see [Anomaly detection overview](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-detect-anomalies (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
