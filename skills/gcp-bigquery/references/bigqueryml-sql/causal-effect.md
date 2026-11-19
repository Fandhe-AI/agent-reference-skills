---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-causal-effect
---

# The AI.CAUSAL_EFFECT function

## Signature / Usage

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** To request feedback or support for this feature, send an email to [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

This document describes the `AI.CAUSAL_EFFECT` function, which lets you
quantify the impact of specific interventions on time series data. For example,
if you launched a marketing campaign on a specific date, you can measure by how
much your incremental sales increased relative to what would have happened
without the campaign. The function compares
actual post-intervention values against an estimate of the outcome without the
action. `AI.CAUSAL_EFFECT` offers the following features:

- **Time series segmentation**: splits data based on a provided timestamp into pre-intervention and post-intervention periods to calculate absolute and relative effects and statistical significance.
- **Parallel processing**: supports analyzing multiple time series in parallel.
- **Univariate time series modeling** : uses `ARIMA_PLUS` forecasting to establish a counterfactual baseline without requiring control series or external covariates, preventing bias from experiment spillover effects.

### Syntax

```googlesql
AI.CAUSAL_EFFECT(
  {TABLE TABLE_NAME | (query_statement)},
  data_col => DATA_COL,
  timestamp_col => TIMESTAMP_COL,
  intervention_timestamp => INTERVENTION_TIMESTAMP
  [, id_cols => ID_COLS]
  [, confidence_level => CONFIDENCE_LEVEL]
  [, output_time_series => OUTPUT_TIME_SERIES]
  [, num_post_intervention_points => NUM_POST_INTERVENTION_POINTS]
);
```

#### Arguments

- `TABLE_NAME` or `query_statement`: the table or GoogleSQL query that contains the time series data. This input must include data from before and after the intervention.
- `DATA_COL`: a `STRING` value that specifies the name of
  the column with the time series values to analyze. The data column must use
  one of the following data types:

  - `INT64`
  - `NUMERIC`
  - `BIGNUMERIC`
  - `FLOAT64`
- `TIMESTAMP_COL`: a `STRING` value that specifies the
  name of the column that contains the timestamps for the time series. The
  timestamp column must use one of the following data types:

  - `TIMESTAMP`
  - `DATE`
  - `DATETIME`
- `INTERVENTION_TIMESTAMP`: a `TIMESTAMP` value that
  indicates when the intervention occurred. This timestamp divides the data into
  the pre-intervention and post-intervention periods.

- `ID_COLS`: an `ARRAY<STRING>` value that contains the
  names of columns that identify individual time series. Use this to analyze
  multiple time series in a single call. Each unique combination of values in
  these columns defines a separate time series. Supported data types for these
  columns are `STRING` and `INT64`.

- `CONFIDENCE_LEVEL`: a `FLOAT64` value in the range
  `[0, 1)` that specifies the percentage of future values expected to fall
  within the prediction interval. The default value is `0.95`.

- `OUTPUT_TIME_SERIES`: an optional `BOOL` value that
  determines the level of detail in the output. If the value is `FALSE`
  (default), the function returns a summary view including only metadata and
  aggregated per-time series summary statistics. If the value is `TRUE`, the
  function returns the detailed time series view, including all pointwise data
  columns.

- `NUM_POST_INTERVENTION_POINTS`: an optional `INT64`
  value that specifies the number of time series points after the
  `INTERVENTION_TIMESTAMP` to include in the causal effect analysis. The
  counterfactual forecast and all summary statistics are based on this value. If
  you don't specify a value, the analysis includes all data points from the
  `INTERVENTION_TIMESTAMP` to the end of the time series.

### Output

By default, the function returns a summary table with one row per time series
containing aggregated statistics.

If `OUTPUT_TIME_SERIES` is `TRUE`, it returns a flattened, granular table where
each row represents a single timestamp, and aggregate values, like `p_value`,
are repeated across every row to maintain a flat structure.

The output includes all of the columns that you specify in the `ID_COLS`
argument in addition to the following columns:

#### Aggregated summary statistics

- `p_value`: a `FLOAT64` value containing the two-tailed p-value for the null hypothesis for the entire post-intervention period. The p-value is calculated based on `ARIMA_PLUS` standard errors, leading to more conservative estimates of causal effect and fewer false positives.
- `prob_causal_effect`: a `FLOAT64` value containing the probability of a causal effect, calculated as `(1 - p_value)`.
- `absolute_effect`: a `FLOAT64` value calculated as `SUM(actual_value - expected_value)` across the post-intervention period.
- `relative_effect`: a `FLOAT64` value calculated as `SUM(actual_value - expected_value)/SUM(expected_value)` across the post-intervention period.
- `status`: a `STRING` value that contains the forecast status. This value is empty if the operation was successful. If the operation wasn't successful, the value is the error string. A common error is `The time series data is too
  short`. This error indicates that there wasn't enough historical data in the time series to generate a forecast. You need at least three data points.

#### Pointwise data

Pointwise data is included in the output only if the `OUTPUT_TIME_SERIES`
argument is set to `TRUE`.

- `<timestamp_col name>`: a `TIMESTAMP` value that contains the timestamp of the data point from the `TIMESTAMP_COL` input. This column contains all timestamps (pre- and post-intervention) from the input.
- `is_post_intervention`: a `BOOL` value that's `TRUE` for timestamps greater than or equal to the `INTERVENTION_TIMESTAMP`, indicating that the data is from the post-intervention period. The value is `FALSE` for timestamps less than the `INTERVENTION_TIMESTAMP`, indicating that the timestamp is from the pre-intervention period.
- `<data_col name>`: a `FLOAT64` value of the observed value from the `data_col` at the specified `<timestamp_col name>`.
- `predicted_<data_col name>`: a `FLOAT64` value of the forecasted (counterfactual) value at the specified `<timestamp_col name>`. This value is `NULL` for all timestamps prior to the intervention timestamp.
- `lower_bound`: a `FLOAT64` that contains the lower bound of the prediction result. This value is `NULL` for all timestamps prior to the intervention timestamp.
- `upper_bound`: a `FLOAT64` that contains the upper bound of the prediction result. This value is `NULL` for all timestamps prior to the intervention timestamp.

### Examples

The following examples demonstrate how to use the `AI.CAUSAL_EFFECT` function.

#### Impact of the 2023 Nobel Prize on Wikipedia page views

The following example shows you how to use the `AI.CAUSAL_EFFECT` function to
analyze differences in Wikipedia page views related to the 2023 Nobel Prize
winners:

```sql
SELECT * FROM AI.CAUSAL_EFFECT(
  (
    SELECT
      DATE(datehour) AS view_date,
      title,
      SUM(views) AS daily_views
    FROM `bigquery-public-data.wikipedia.pageviews_2023`
    WHERE
      datehour BETWEEN '2023-07-01' AND '2023-10-31'
      AND wiki = 'en'
      AND title IN (
        'Nobel_Prize',
        'Nobel_Prize_in_Physics',
        'Nobel_Prize_in_Chemistry',
        'Nobel_Prize_in_Physiology_or_Medicine',
        'Quantum_dot',
        'Attosecond',
        'Physics',
        'Chemistry',
        'Quantum_mechanics'
      )
    GROUP BY view_date, title
  ),
  data_col => 'daily_views',
  timestamp_col => 'view_date',
  intervention_timestamp => '2023-10-02', -- Start of 2023 Nobel Prize announcement week
  id_cols => ['title']
);
```

This query uses the Wikipedia page title as the `id_col` to organize the default
summary view:

```text
+--------------------------+-------------------+--------------------+--------------------+--------------------+--------+
| title                    | p_value           | prob_causal_effect | absolute_effect    | relative_effect    | status |
+--------------------------+-------------------+--------------------+--------------------+--------------------+--------+
| Chemistry                | 0.912565563365... | 0.087434436634...  | -361.1770287181... | -0.017380008274... |        |
| Attosecond               | 0.0               | 1.0                | 25601.92393847...  | 21.97446568855...  |        |
| Nobel_Prize_in_Physics   | 0.034821045775... | 0.965178954224...  | 13342.83392650...  | 1.014111538302...  |        |
| Quantum_mechanics        | 0.557980122639... | 0.442019877360...  | -5896.606165928... | -0.111127547618... |        |
| Physics                  | 0.671949069437... | 0.328050930562...  | -2149.471016462... | -0.063529026814... |        |
| Nobel_Prize_in_Chemistry | 3.204658760580... | 0.999999999967...  | 10490.52230016...  | 1.712045773819...  |        |
| Nobel_Prize              | 2.051915413137... | 0.999999794808...  | 41474.77221542...  | 1.210510083471...  |        |
| ...                      | ...               | ...                | ...                | ...                | ...    |
+--------------------------+-------------------+--------------------+--------------------+--------------------+--------+
```

The default summary view highlights a statistically significant impact on the
award category pages and the specific scientific breakthrough. The *Attosecond*
page experienced a 2,197.45% relative increase over its predicted baseline, with
a p-value of 0.0 and a 100% probability of a causal effect, confirming the 2023
Physics prize announcement as a significant driver of increased traffic.
Similarly, the main *Nobel Prize* , *Nobel Prize in Chemistry* , and *Nobel Prize in Physics*
pages saw statistically significant relative increases of 121.05%, 171.20%, and
101.41% respectively, with all p-values less than 0.05.

In contrast, broad scientific disciplines and adjacent concepts showed no
statistically significant causal effect. The *Chemistry* page saw a slight 1.74%
decrease compared to predictions with a p-value of 0.913 (causal probability of
8.74%), *Physics* saw a 6.35% decrease with a p-value of 0.672 (causal
probability of 32.81%), and *Quantum mechanics* saw an 11.11% decrease with a
p-value of 0.558 (causal probability of 44.20%).

#### Impact of the COVID-19 pandemic on New York City taxi trips

The following example shows you how to use the `AI.CAUSAL_EFFECT` function to
quantify the impact of the COVID-19 pandemic on taxi trips in New York City:

```sql
SELECT pickup_date, trip_count, predicted_trip_count, lower_bound, upper_bound
FROM
  AI.CAUSAL_EFFECT(
    (
      SELECT
        DATE(pickup_datetime) AS pickup_date,
        COUNT(*) AS trip_count
      FROM `bigquery-public-data.new_york_taxi_trips.tlc_yellow_trips_2020`
      WHERE EXTRACT(YEAR FROM pickup_datetime) = 2020
      GROUP BY pickup_date
    ),
    data_col => 'trip_count',
    timestamp_col => 'pickup_date',
    intervention_timestamp => '2020-03-11',  -- WHO declares COVID-19 a pandemic
    num_post_intervention_points => 120,
    output_time_series => TRUE);
```

This query sets `OUTPUT_TIME_SERIES` to `TRUE`, so the output includes pointwise
values.

```text
+-------------+------------+----------------------+--------------------+---------------------+
| pickup_date | trip_count | predicted_trip_count | lower_bound        | upper_bound         |
+-------------+------------+----------------------+--------------------+---------------------+
| 2020-01-01  | 169437.0   | null                 | null               | null                |
| 2020-01-02  | 162141.0   | null                 | null               | null                |
| 2020-01-03  | 183477.0   | null                 | null               | null                |
| 2020-01-04  | 182752.0   | null                 | null               | null                |
| 2020-01-05  | 164399.0   | null                 | null               | null                |
| ...         | ...        | ...                  | ...                | ...                 |
| 2020-07-04  | 14476.0    | 191116.09175879564…  | 19877.20579618783… | 362354.9777214034…  |
| 2020-07-05  | 14450.0    | 126387.79611099855…  | -45584.014231973…  | 298359.606453970…   |
| 2020-07-06  | 24504.0    | 146169.325786536…    | -26532.2985241909… | 318870.950097263…   |
| 2020-07-07  | 26050.0    | 174436.93300780…     | 1008.56587460252…  | 347865.30014100095… |
| 2020-07-08  | 27038.0    | 208480.5766585973…   | 34328.4994002080…  | 382632.65391698654… |
+-------------+------------+----------------------+--------------------+---------------------+
```

To plot this data in BigQuery, use the **Visualize** tab.

### What's next

- Learn about [forecasting](https://docs.cloud.google.com/bigquery/docs/forecasting-overview).
- Learn about [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-causal-effect (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
