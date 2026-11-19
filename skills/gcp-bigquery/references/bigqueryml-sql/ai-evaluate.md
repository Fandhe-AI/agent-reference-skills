---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-evaluate
---

# The AI.EVALUATE function

## Signature / Usage

This document describes the `AI.EVALUATE` function, which lets you
evaluate [TimesFM](https://docs.cloud.google.com/bigquery/docs/timesfm-model) forecasted data against a
reference time series based on historical data, or
[TabFM](https://docs.cloud.google.com/bigquery/docs/tabfm-model) predicted data against
ground truth data.

For example, suppose you have
tables that contain data about car rentals each day. The following query
returns statistics about how well the model predicts car rentals in the current
year based on the previous year:

```sql
SELECT *
FROM
  AI.EVALUATE(
    TABLE rentals.last_year,
    TABLE rentals.this_year,
    data_col => 'num_rentals',
    timestamp_col => 'date');
```

### Syntax

Choose one of the following syntaxes based on whether you're evaluating TimesFM
or TabFM predictions:

#### TimesFM

```googlesql
SELECT
  *
FROM
  AI.EVALUATE(
    { TABLE HISTORY_TIME_SERIES_TABLE | (HISTORY_TIME_SERIES_QUERY_STATEMENT) },
    { TABLE ACTUAL_TIME_SERIES_TABLE | (ACTUAL_TIME_SERIES_QUERY_STATEMENT) },
    data_col => 'DATA_COL',
    timestamp_col => 'TIMESTAMP_COL',
    [, model => 'MODEL']
    [, id_cols => ID_COLS]
    [, horizon => HORIZON]
    [, context_window => CONTEXT_WINDOW]
  )
```

#### Arguments

`AI.EVALUATE` takes the following arguments:

- `HISTORY_TIME_SERIES_TABLE`: the name of the table
  that contains historical time series data, which is used to generate a
  forecast.
  For example, `` `mydataset.mytable` ``.
  The forecasted values are then evaluated against the data in the
  `ACTUAL_TIME_SERIES_TABLE` or `ACTUAL_TIME_SERIES_QUERY_STATEMENT` argument.

  If the table is in a different project, then you must prepend the
  project ID to the table name in the following format, including backticks:

  `` `[PROJECT_ID].[DATASET].[TABLE]` ``

  For example, `` `myproject.mydataset.mytable` ``.
- `HISTORY_TIME_SERIES_QUERY_STATEMENT`: the
  GoogleSQL query
  that generates historical time series data which is used to generate a
  forecast. The forecasted values are then evaluated against the data in the
  `ACTUAL_TIME_SERIES_TABLE` or `ACTUAL_TIME_SERIES_QUERY_STATEMENT`
  argument. See the
  [GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax)
  page for the supported SQL syntax of the `HISTORY_TIME_SERIES_QUERY_STATEMENT`
  clause.

- `ACTUAL_TIME_SERIES_TABLE`: the name of the table that
  contains the actual time series data. For example,
  `` `mydataset.mytable` ``. The data in this table is evaluated
  against the forecasted values for the historical time series provided by the
  `HISTORY_TIME_SERIES_TABLE` or `HISTORY_TIME_SERIES_QUERY_STATEMENT`
  argument.

  If the table is in a different project, then you must prepend the
  project ID to the table name in the following format, including backticks:

  `` `[PROJECT_ID].[DATASET].[TABLE]` ``

  For example, `` `myproject.mydataset.mytable` ``.
- `ACTUAL_TIME_SERIES_QUERY_STATEMENT`: the GoogleSQL
  query that generates the actual time series data. The data from this
  query is evaluated against the forecasted values for the historical time
  series provided by the `HISTORY_TIME_SERIES_TABLE` or
  `HISTORY_TIME_SERIES_QUERY_STATEMENT` argument. See the
  [GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax)
  page for the supported SQL syntax of the `ACTUAL_TIME_SERIES_QUERY_STATEMENT` clause.

- `DATA_COL`: a `STRING` value that specifies the name of
  the time series data column. The data column must use one of the following
  data types:

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
- `MODEL`: a `STRING` value that specifies the name
  of the model to use. Supported models include `TimesFM 2.5`
  and `TimesFM 3.0` ([Preview](https://cloud.google.com/products#product-launch-stages)).
  The default value is `TimesFM 2.5`.

- `ID_COLS`: an `ARRAY<STRING>` value that specifies the
  names of one or more ID columns. Each unique combination of IDs identifies a
  unique time series to evaluate. Specify one or more values for this argument
  in order to evaluate multiple time series using a single query. The columns
  that you specify must use one of the following data types:

  - `STRING`
  - `INT64`
- `HORIZON`: an `INT64` value that specifies the number of
  forecasted time points to evaluate. The default value is `1024`. The valid
  input range is `[1, 10,000]`.

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
  window length, and the corresponding supported TimesFM model name:

  | **Number of time series data points** | **Context window length** | **Supported model names** |
  |---|---|---|
  | (`1`, `64`\] | 64 | `TimesFM 2.5`, `TimesFM 3.0` |
  | (`65`, `128`\] | 128 | `TimesFM 2.5`, `TimesFM 3.0` |
  | (`129`, `256`\] | 256 | `TimesFM 2.5`, `TimesFM 3.0` |
  | (`257`, `512`\] | 512 | `TimesFM 2.5`, `TimesFM 3.0` |
  | (`513`, `1024`\] | 1,024 | `TimesFM 2.5`, `TimesFM 3.0` |
  | (`1025`, `2048`\] | 2,048 | `TimesFM 2.5`, `TimesFM 3.0` |
  | (`2049`, `4096`\] | 4,096 | `TimesFM 2.5` |
  | (`4097`, `8192`\] | 8,192 | `TimesFM 2.5` |
  | (`8193`, `15360`\] | 15,360 | `TimesFM 2.5` |
  | `15360` | 15,360 | `TimesFM 2.5` |

  For the `TimesFM 3.0` model, 2,048 is the maximum number of
  time series data
  points that are passed to the model. For the `TimesFM 2.5` model, 15,360 is
  the maximum number of time series data points that are passed to the model.
  Any additional time series data points in the input data are ignored.

#### TabFM

```googlesql
SELECT
  *
FROM
  AI.EVALUATE(
  { TABLE TRAINING_TABLE | (TRAINING_QUERY)  },
  { TABLE PREDICTION_TABLE | (PREDICTION_QUERY)  },
  label_col => 'LABEL_COL'
  )
```

#### Arguments

`AI.EVALUATE` takes the following arguments:

- `TRAINING_TABLE | TRAINING_QUERY`: the table or query
  that contains the training data. The table or query result must contain a
  column named `label` or the column that you specify in the `LABEL_COL`
  argument. Every other column is considered a feature column. The feature and
  label columns must be one of the following types: `STRING`, `BOOL`,
  `INT64`, `FLOAT64`, `NUMERIC` or `BIGNUMERIC`.

- `PREDICTION_TABLE | PREDICTION_QUERY`: the table or
  query that contains the data to evaluate. The table or query result
  must contain all of the feature columns in the training data and can
  optionally contain additional columns.

- `LABEL_COL`: a `STRING` value that specifies
  the name of the label column in the training data. You must provide this
  argument for TabFM evaluation. If the column is of type `STRING` or `BOOL`,
  then classification is evaluated. If the column is of type `INT64`, `FLOAT64`,
  `NUMERIC` or `BIGNUMERIC`, then regression is evaluated.

### Output

`AI.EVALUATE` returns the following columns based on whether you're evaluating
TimesFM or TabFM predictions:

#### TimesFM

The following columns are returned for TimesFM forecasted data:

- `id_cols`: one or more values that contain the identifiers of a time series. `id_cols` can be an `INT64`, `STRING`, `ARRAY<INT64>` or `ARRAY<STRING>` value. The column names and types are inherited from the `ID_COLS` argument value specified in the function input.
- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the time series.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the time series.
- `root_mean_squared_error`: a `FLOAT64` value that contains the [root mean squared error](https://en.wikipedia.org/wiki/Root-mean-square_deviation) for the time series.
- `mean_absolute_percentage_error`: a `FLOAT64` value that contains the [mean absolute percentage error](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error) for the time series.
- `symmetric_mean_absolute_percentage_error`: a `FLOAT64` value that contains the [symmetric mean absolute percentage error](https://en.wikipedia.org/wiki/Symmetric_mean_absolute_percentage_error) for the time series.
- `mean_absolute_scaled_error`: a `FLOAT64` value that contains the [mean absolute scaled error](https://en.wikipedia.org/wiki/Mean_absolute_scaled_error) for the time series.
- `ai_evaluate_status`: a `STRING` value that contains the evaluation status. The value is empty if the operation was successful. If the operation wasn't successful, the value is the error string. A common error is `The time series data is too short.` This error indicates that there wasn't enough historical data in the time series to generate forecasted data to evaluate. A minimum of 3 data points is required.

#### TabFM

The following columns are returned for TabFM regression predictions:

- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the data.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the data.
- `mean_squared_log_error`: a `FLOAT64` value that contains the mean squared logarithmic error for the data.
- `median_absolute_error`: a `FLOAT64` value that contains the median absolute error for the data.
- `r2_score`: a `FLOAT64` value that contains the [coefficient of determination](https://en.wikipedia.org/wiki/Coefficient_of_determination) for the data.
- `explained_variance`: a `FLOAT64` value that contains the [explained variance](https://en.wikipedia.org/wiki/Explained_variation) for the data.

The following columns are returned for TabFM classification predictions:

- `precision`: a `FLOAT64` value that contains the [macro-average precision](https://www.evidentlyai.com/classification-metrics/multi-class-metrics#macro-averaging) across all classes.
- `recall`: a `FLOAT64` value that contains the [macro-average recall](https://www.evidentlyai.com/classification-metrics/multi-class-metrics#macro-averaging) across all classes.
- `accuracy`: a `FLOAT64` value that contains the accuracy of the prediction.
- `f1_score`: a `FLOAT64` value that contains the macro-average [`F1` score](https://en.wikipedia.org/wiki/F-score) across all classes.

### Examples

The following examples show how to use the `AI.EVALUATE` function.

#### Evaluate a single time series

The following example evaluates historical bike trips against actual bike trips
for a single time series:

```sql
WITH
  citibike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date
  )
SELECT *
FROM
  AI.EVALUATE(
    (SELECT * FROM citibike_trips WHERE date < '2016-07-01'),
    (SELECT * FROM citibike_trips WHERE date >= '2016-07-01'),
    data_col => 'num_trips',
    timestamp_col => 'date');
```

The result is similar to the following:

```text
+---------------------+--------------------+-------------------------+--------------------------------+------------------------------------------+-----------------------------+--------------------+
| mean_absolute_error | mean_squared_error | root_mean_squared_error | mean_absolute_percentage_error | symmetric_mean_absolute_percentage_error | mean_absolute_scaled_error  | ai_evaluate_status |
+---------------------+--------------------+-------------------------+--------------------------------+------------------------------------------+-----------------------------+--------------------+
| 7512.2744140624982  | 88702684.834815472 | 9418.210277691589       | 16.068001108491149             | 15.740030591250889                       | 0.981234567                 | null               |
+---------------------+--------------------+-------------------------+--------------------------------+------------------------------------------+-----------------------------+--------------------+
```

#### Evaluate multiple time series

The following example evaluates historical bike trips against actual bike trips
for multiple time series:

```sql
WITH
  citibike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, usertype, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date, usertype
  )
SELECT *
FROM
  AI.EVALUATE(
    (SELECT * FROM citibike_trips WHERE date < '2016-07-01'),
    (SELECT * FROM citibike_trips WHERE date >= '2016-07-01'),
    data_col => 'num_trips',
    timestamp_col => 'date',
    id_cols => ['usertype']);
```

#### Evaluate regression prediction

The following query evaluates the performance of TabFM regression to predict a
penguin's mass:

```sql
WITH prepared_data AS (
  SELECT *, RAND() <= 0.8 AS training
  FROM `bigquery-public-data.ml_datasets.penguins`
  WHERE body_mass_g > 0
)
SELECT
 *
FROM
 AI.EVALUATE(
  # Training data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE training),
  # Prediction data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE NOT training),
  label_col => 'body_mass_g');
```

The result is similar to the following:

```text
+---------------------+--------------------+------------------------+-----------------------+---------------------+---------------------+
| mean_absolute_error | mean_squared_error | mean_squared_log_error | median_absolute_error | r2_score            | explained_variance  |
+---------------------+--------------------+------------------------+-----------------------+---------------------+---------------------+
| 187.47826086956516  | 57233.014492753638 | 0.0036635839277726163  | 160.0                 | 0.91107011835200613 | 0.91265547176600315 |
+---------------------+--------------------+------------------------+-----------------------+---------------------+---------------------+
```

#### Evaluate classification prediction

The following query evaluates the performance of TabFM classification to predict
a penguin's sex:

```sql
WITH prepared_data AS (
  SELECT *, RAND() <= 0.8 AS training
  FROM `bigquery-public-data.ml_datasets.penguins`
  WHERE sex IS NOT NULL and sex != "."

)
SELECT
 *
FROM
 AI.EVALUATE(
  # Training data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE training),
  # Prediction data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE NOT training),
  label_col => 'sex');
```

The result is similar to the following:

```text
+---------------------+---------------------+----------+-------------------+
| precision           | recall              | accuracy | f1_score          |
+---------------------+---------------------+----------+-------------------+
| 0.96511627906976738 | 0.95714285714285707 | 0.96     | 0.959539651141881 |
+---------------------+---------------------+----------+-------------------+
```

### Locations

`AI.EVALUATE` and the TimesFM and TabFM models are available in all
[supported BigQuery ML locations](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Pricing

`AI.EVALUATE` usage is billed at the evaluation, inspection, and prediction
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

- Try [using a TimesFM model with the `AI.FORECAST` function](https://docs.cloud.google.com/bigquery/docs/timesfm-time-series-forecasting-tutorial).
- Try performing regression or classification with the [`AI.PREDICT` function](ai-predict.md).
- For information about forecasting in BigQuery ML, see [Forecasting overview](https://docs.cloud.google.com/bigquery/docs/forecasting-overview).
- For more information about supported SQL statements and functions for time series forecasting models, see [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-evaluate (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
