---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-trend
---

# The ML.TREND function

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

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

This document describes the `ML.TREND` function, which provides insight into
trends in your time series data.
The *trend component* of a time series represents the directional trajectory
of a metric over time, while ignoring short-term fluctuations or noise.

![Time series data and its trend component](https://docs.cloud.google.com/static/bigquery/images/trend-decomposition.png)

The `ML.TREND` function is built using the algorithm that is used for `ARIMA_PLUS`
model. For more information, see
[ARIMA_PLUS: Large-scale, Accurate, Automatic and Interpretable In-Database Time
Series Forecasting and Anomaly Detection in Google BigQuery](https://arxiv.org/abs/2510.24452).

Use the `ML.TREND` function to quickly explore the trend component of
time series data. For a more detailed explanation of the trend component, see
[STL decomposition](https://otexts.com/fpp2/stl.html).

### Syntax

```googlesql
ML.TREND(
  { TABLE TABLE_NAME | (QUERY_STATEMENT) },
  data_col => 'DATA_COL',
  timestamp_col => 'TIMESTAMP_COL'
  [, id_cols => [ID_COLS]]
  [, horizon => HORIZON]
  [, smoothing_window_size => SMOOTHING_WINDOW_SIZE]
  [, adjust_step_changes => ADJUST_STEP_CHANGES]
)
```

#### Arguments

`ML.TREND` takes the following arguments:

- `TABLE_NAME`: the name of the table that contains the time series data to analyze.
- `QUERY_STATEMENT`: a GoogleSQL query that produces the time series data to analyze.
- `DATA_COL`: a `STRING` value that specifies the name of the column that contains the time series data. The data column must use one of the following data types: `INT64`, `NUMERIC`, `BIGNUMERIC`, or `FLOAT64`.
- `TIMESTAMP_COL`: a `STRING` value that specifies the name of the column that contains the timestamp data. The timestamp column must use one of the following data types: `TIMESTAMP`, `DATE`, or `DATETIME`.
- `ID_COLS`: an `ARRAY<STRING>` value that specifies the names of one or more ID columns. Each unique combination of IDs identifies a unique time series to analyze. Specify one or more values for this argument to analyze multiple time series using a single query. The columns that you specify must use one of the following data types: `STRING`, `INT64`, `ARRAY<STRING>`, or `ARRAY<INT64>`.
- `HORIZON`: an `INT64` value that specifies the number of time points to forecast. The default value is `0`, which returns results for the historical data only. The valid input range is `[1, 10000]`.
- `SMOOTHING_WINDOW_SIZE`: an `INT64` value that specifies the smoothing window size. The default value is `5`. You must specify a positive value to smooth the trend. When you specify a value, a center moving average smoothing is applied to the historical trend. When the smoothing window is outside of the boundary at the beginning or end of the trend, the first or last element is padded to fill the smoothing window before the average is applied.
- `ADJUST_STEP_CHANGES`: a `BOOL` value that determines whether to perform automatic step change detection and adjustment. The default value is `FALSE`.

### Output

`ML.TREND` returns a table with the following columns:

- The columns specified in the `ID_COLS` argument.
- The input timestamp column.
- `time_series_type`: a `STRING` value that indicates whether the row represents historical data (`history`) or forecasted data (`forecast`).
- The input column specified for `data_col` that contains the data of the time series. For rows where `time_series_type` is `history`, this is either the training data or the interpolated value. For rows where `time_series_type` is `forecast`, this is the forecasted value.
- `trend`: a `FLOAT64` value that contains the calculated trend component for each time point.
- `status`: a `STRING` value that contains error messages for invalid input. This column is empty for successful requests.

### Example

The following example demonstrates how to find the trend component for total
website visits over time from publicly available Google Analytics 360 data:

```sql
WITH DailyVisits AS (
  SELECT
    PARSE_TIMESTAMP('%Y%m%d', date) AS visit_timestamp,
    SUM(totals.visits) AS total_visits
  FROM
    `bigquery-public-data.google_analytics_sample.ga_sessions_*`
  GROUP BY
    visit_timestamp
)
SELECT
  *
FROM
  ML.TREND(
    TABLE DailyVisits,
    data_col => 'total_visits',
    timestamp_col => 'visit_timestamp'
  )
ORDER BY
  visit_timestamp;
```

The result is similar to the following:

```text
+-----------------+------------------+--------------+--------------------+
| visit_timestamp | time_series_type | total_visits | trend              |
+-----------------+------------------+--------------+--------------------+
| 2016-08-01      | history          | 1711.0       | 663.58261817132723 |
| 2016-08-02      | history          | 2140.0       | 1108.5377263889254 |
| 2016-08-03      | history          | 2890.0       | 1615.04323567092   |
| ...             | ...              | ...          |                    |
+-----------------+------------------+--------------+--------------------+
```

![A visualization of the trend decomposition overlaid on time series data](https://docs.cloud.google.com/static/bigquery/images/ml-trend-example.png)

### What's next

- Learn more about [forecasting](https://docs.cloud.google.com/bigquery/docs/forecasting-overview).
- Learn more about [seasonality decomposition](seasonality.md).
- Learn more about [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-trend (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
