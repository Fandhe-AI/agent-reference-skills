---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-seasonality
---

# The ML.SEASONALITY function

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

This document describes the `ML.SEASONALITY` function, which lets you
obtain seasonality insights from time series data. The *seasonality component*
of a time series represents repeating patterns over fixed time periods
in your data, such as years, weeks, or days. For example, your business
might see a small spike in sales every weekend and a larger spike in sales
every year around particular holidays.

![Time series data and its seasonality component](https://docs.cloud.google.com/static/bigquery/images/seasonality-decomposition.png)

The `ML.SEASONALITY` function is built using the algorithm that is used for the
`ARIMA_PLUS` model. For more information, see
[ARIMA_PLUS: Large-scale, Accurate, Automatic and Interpretable In-Database Time
Series Forecasting and Anomaly Detection in Google BigQuery](https://arxiv.org/abs/2510.24452).

Use the `ML.SEASONALITY` function to quickly decompose
a time series and view seasonal effects. For a more detailed explanation of the
trend component, see
[Seasonal and trend decomposition](https://otexts.com/fpp2/stl.html).

### Syntax

```googlesql
ML.SEASONALITY(
  { TABLE TABLE_NAME | (QUERY_STATEMENT) },
  data_col => 'DATA_COL',
  timestamp_col => 'TIMESTAMP_COL'
  [, id_cols => [ID_COLS]]
  [, seasonalities => [SEASONALITIES]]
  [, horizon => HORIZON]
)
```

#### Arguments

`ML.SEASONALITY` takes the following arguments:

- `TABLE_NAME`: the name of the table that contains the time series data to analyze.
- `QUERY_STATEMENT`: a GoogleSQL query that produces the time series data to analyze.
- `DATA_COL`: a `STRING` value that specifies the name of the column that contains the time series data. The data column must use one of the following data types: `INT64`, `NUMERIC`, `BIGNUMERIC`, or `FLOAT64`.
- `TIMESTAMP_COL`: a `STRING` value that specifies the name of the column that contains the timestamp data. The timestamp column must use one of the following data types: `TIMESTAMP`, `DATE`, or `DATETIME`.
- `ID_COLS`: an `ARRAY<STRING>` value that specifies the names of one or more ID columns. Each unique combination of IDs identifies a unique time series to analyze. Specify one or more values for this argument to analyze multiple time series using a single query. The columns that you specify must use one of the following data types: `STRING`, `INT64`, `ARRAY<STRING>`, or `ARRAY<INT64>`.
- `SEASONALITIES`: an `ARRAY<STRING>` value that specifies the seasonality types to extract. Valid values include `YEARLY`, `QUARTERLY`, `MONTHLY`, `WEEKLY`, and `DAILY`. If omitted, the function automatically detects all seasonalities.
- `HORIZON`: an `INT64` value that specifies the number of future time points to forecast for seasonality. The default value is `0`, which returns results for the historical data only. The valid input range is `[1, 10000]`.

### Output

`ML.SEASONALITY` returns a table with the following columns:

- The columns specified in the `ID_COLS` argument.
- The input timestamp column.
- `time_series_type`: A `STRING` value that indicates whether the row represents historical data (`history`) or forecasted data (`forecast`).
- The input column specified for `data_col` that contains the data of the time series. For rows where `time_series_type` is `history`, this is either the training data or the interpolated value. For rows where `time_series_type` is `forecast`, this is the forecasted value.
- `yearly`, `quarterly`, `monthly`, `weekly`, `daily`: `FLOAT64` values that contain the calculated seasonal components for each time point. If specific seasonalities are provided in the `seasonalities` argument, only those columns are returned. If no seasonal pattern is detected for a specific component, the value is `NULL`.
- `status`: A `STRING` value that contains error messages for invalid input. This column is empty for successful requests.

### Example

The following example demonstrates how to find the seasonality component for
total website visits over time from publicly available Google Analytics 360
data:

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
  ML.SEASONALITY(
    TABLE DailyVisits,
    data_col => 'total_visits',
    timestamp_col => 'visit_timestamp'
  )
ORDER BY
  visit_timestamp;
```

The result is similar to the following:

Adapted (not in the official docs): the first column header is changed from `visit_date` to `visit_timestamp`, and the column is widened to match.

```text
+-----------------+------------------+--------------+--------+-----------+---------+--------------------+-------+--------+
| visit_timestamp | time_series_type | total_visits | yearly | quarterly | monthly | weekly             | daily | status |
+-----------------+------------------+--------------+--------+-----------+---------+--------------------+-------+--------+
| 2016-08-01      | history          | 1711.0       | null   | null      | null    | 169.61193783007687 | null  |        |
| 2016-08-02      | history          | 2140.0       | null   | null      | null    | 287.0332731997334  | null  |        |
| 2016-08-03      | history          | 2890.0       | null   | null      | null    | 445.14087763116709 | null  |        |
| ...             | ...              | ...          | ...    | ...       | ...     | ...                | ...   | ...    |
+-----------------+------------------+--------------+--------+-----------+---------+--------------------+-------+--------+
```

The `NULL` values for the `yearly`, `quarterly`, `monthly`, and `daily` columns
indicate that no seasonality was detected for those time periods.

![A visualization of the seasonality decomposition graphed next to time series data](https://docs.cloud.google.com/static/bigquery/images/ml-seasonality-example.png)

### What's next

- Learn more about [forecasting](https://docs.cloud.google.com/bigquery/docs/forecasting-overview).
- Learn more about [trend decomposition](trend.md).
- Learn more about [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-seasonality (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: the `HORIZON` default is `0`, but the stated valid input range is `[1, 10000]`, which does not contain `0`. The official text is kept as published.
- Caution: the introduction refers to a "more detailed explanation of the trend component" on the `ML.SEASONALITY` page; the sentence is identical on the `ML.TREND` page, where it fits. The official text is kept as published.
- Corrected from the official docs: the example output names the first column `visit_date`, but the query on this page selects `*` from a table whose timestamp column is `visit_timestamp` (and `ML.SEASONALITY` returns the input timestamp column). The header is changed to `visit_timestamp`, as in the `ML.TREND` example output. The row values are kept as published.

## Related

- [Index of this directory](./README.md)
