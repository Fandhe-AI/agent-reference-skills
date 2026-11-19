---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-detect-anomalies
---

# The ML.DETECT_ANOMALIES function

## Signature / Usage

This document describes the `ML.DETECT_ANOMALIES` function, which lets you
perform anomaly detection in BigQuery ML.

You can use the following types of models with `ML.DETECT_ANOMALIES`, depending
on the type of input data you want to analyze:

- For time series data, use one of the following models:
  - [`ARIMA_PLUS`](create-time-series.md)
  - [`ARIMA_PLUS_XREG`](create-multivariate-time-series.md)
- For [independent and identically distributed random variables (IID)](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables) data, use one of the following models:
  - [K-means models](create-kmeans.md)
  - [Principal component analysis (PCA) models](create-pca.md)
  - [Autoencoder models](create-autoencoder.md)

If you don't want to manage your own time series anomaly detection model, you can
use the
[`AI.DETECT_ANOMALIES` function](ai-detect-anomalies.md)
with BigQuery ML's built-in
[TimesFM time series model](https://docs.cloud.google.com/bigquery/docs/timesfm-model) to perform anomaly detection.

### Syntax

```sql
# ARIMA_PLUS and ARIMA_PLUS_XREG models:
ML.DETECT_ANOMALIES(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`
  [, STRUCT(ANOMALY_PROB_THRESHOLD AS anomaly_prob_threshold)]
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }]
)

#Autoencoder, k-means, or PCA models:
ML.DETECT_ANOMALIES(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  STRUCT(CONTAMINATION AS contamination),
  { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }
)
```

#### Arguments

`ML.DETECT_ANOMALIES` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: The name of the table to use to perform anomaly detection.
- `QUERY_STATEMENT`: The GoogleSQL query that generates the data to use to perform anomaly detection. For the supported SQL syntax for the `QUERY_STATEMENT` clause in GoogleSQL, see [Query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax).
- `ANOMALY_PROB_THRESHOLD`: a `FLOAT64` value that
  identifies the custom threshold to use for anomaly detection. The value must
  be in the range `[0, 1)`, with a default value of `0.95`.

  The value of the anomaly probability
  at each timestamp is calculated using the actual time series data value and
  the values of the predicted time series data and the variance from the model
  training. The actual time series data value at a specific timestamp is
  identified as anomalous if the anomaly probability exceeds the
  `ANOMALY_PROB_THRESHOLD` value. The `ANOMALY_PROB_THRESHOLD` value also
  determines the lower and upper bounds, where a larger threshold value
  results in a larger interval size.
- `CONTAMINATION`: a `FLOAT64` value that identifies the
  proportion of anomalies in the training dataset that are used to create the
  autoencoder, k-means, or PCA input models. The value must be in the range `[0,
  0.5]`.

  For example, a `CONTAMINATION` value of `0.1` means that 10% of the training
  data that was used to create the input model is anomalous. The
  `CONTAMINATION` value determines the cutoff threshold of the target metric
  to become anomalous, and any input data with a target metric greater than
  the cutoff threshold is identified as anomalous. The target metric is
  [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for
  autoencoder and PCA models, and the target metric is normalized distance
  for k-means models. For more information on normalized distance, see
  [K-means model output](#k-means-model-output).

### Input

The input requirements for the `ML.DETECT_ANOMALIES` function depend upon the
input model type.

#### Time series model input

Anomaly detection with `ARIMA_PLUS` and `ARIMA_PLUS_XREG` models has the
following requirements:

- To detect anomalies in historical time-series data, the [`DECOMPOSE_TIME_SERIES`](create-time-series.md#decompose_time_series) training option must be set as its default value of `TRUE` when the input model is created. Neither `table_name` nor `query_statement` is accepted.
- The `anomaly_prob_threshold` value must be specified to detect anomalies in new time-series data.
- The column names of either the `table_name` input table or the `query_statement` clause must match the column names that are used to create the input model.
- The data types of the `TIME_SERIES_ID_COL` columns must match the data types of the columns that are used to create the input model.

For a list of supported data types, see
[`TIME_SERIES_TIMESTAMP_COL`](create-time-series.md#time_series_timestamp_col)
and
[`TIME_SERIES_DATA_COL`](create-time-series.md#time_series_data_col).

#### Autoencoder, k-means, or PCA model input

Anomaly detection with autoencoder, k-means, or PCA models has the following
requirements:

- The column names of the input data from either the `table` or the `query_statement` argument must match the column names of the model. The column data types must be compatible according to BigQuery [implicit coercion rules](../googlesql-syntax/conversion_rules.md#supertypes).
- If you used the [`TRANSFORM` clause](create.md#transform) in the `CREATE MODEL` statement that created the model, then only the input columns present in the `TRANSFORM` clause can appear in `query_statement`.

### Output

`ML.DETECT_ANOMALIES` always returns the `is_anomaly` column that contains the
anomaly detection results. Other output columns differ based upon the
input model type and input data table.

#### Time series model output

`ARIMA_PLUS` and `ARIMA_PLUS_XREG` model output includes the following columns,
followed by the input table columns, if present. Output can include the
following:

- `time_series_id_col` or `time_series_id_cols`: the identifiers of a time series. Only present when forecasting multiple time series at once. The column names and types are inherited from the `TIME_SERIES_ID_COL` option as specified in the model creation query.
- `time_series_timestamp`: a `TIMESTAMP` value that contains the timestamp column for a time series. The column name is inherited from the `TIME_SERIES_TIMESTAMP_COL` option as specified in the `CREATE MODEL` statement. The column has a type of `TIMESTAMP`, regardless of the [`TIME_SERIES_TIMESTAMP_COL`](create-time-series.md#time_series_timestamp_col) input column data type.
- `time_series_data`: a `FLOAT64` value that contains the data column for a time series. The column name is inherited from the `TIME_SERIES_DATA_COL` option as specified in the `CREATE MODEL` statement. The column has a type of `FLOAT64`, regardless of the [`TIME_SERIES_DATA_COL`](create-time-series.md#time_series_data_col) input column data type.
- `is_anomaly`: a `BOOL` value that indicates whether the value at a specific timestamp is an anomaly. If the `anomaly_probability` value is above the `anomaly_prob_threshold` value, then the `time_series_data` value is out of the range for the lower and upper bounds and the `is_anomaly` value is `TRUE`.
- `lower_bound`: a `FLOAT64` value that contains the lower bound of the prediction result.
- `upper_bound`: a `FLOAT64` value that contains the upper bound of the prediction result.
- `anomaly_probability`: a `FLOAT64` value that contains the probability that this point is an anomaly. For example, an `anomaly_probability` value of `0.95` means that, among all possible values at the given timestamp, there is a 95% chance that the value is closer to the predicted value than it is to the given time series data value. This indicates a 95% probability that the given time series data value is an anomaly.

`ML.DETECT_ANOMALIES` output for time series models has the
following properties:

- The function returns `NULL` values in the `is_anomaly`, `upper_bound`, `lower_bound` and `anomaly_probability` columns for rows with invalid input, which include the following cases:
  - The value in the `TIME_SERIES_ID_COL` column does not exist in the model.
  - The value in the `TIME_SERIES_TIMESTAMP_COL` column is not in the range of the forecast [horizon](create-time-series.md#horizon).
  - The value in the `TIME_SERIES_TIMESTAMP_COL` column does not follow the same [frequency](create-time-series.md#data_frequency) as the one in the model.

#### Autoencoder and PCA model output

Autoencoder and PCA model output includes the following columns, followed by
the input table columns:

- `is_anomaly`: a `BOOL` value that indicates whether the value is anomalous.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error).

#### K-means model output

K-means model output includes the following, followed by the input table
columns:

- `is_anomaly`: a `BOOL` value that indicates whether the value is anomalous.
- `normalized_distance`: a `FLOAT64` value that contains the shortest distance among the normalized distances from the input data to each cluster centroid. Normalized distances are computed as the absolute distance from the input data to a cluster centroid, divided by the cluster's radius. The cluster radius is defined as the root mean square of all of the distances from each cluster's assigned data points to its centroid. Normalized distance is used in favor of absolute distance to determine anomalies because anomalies might not be detected as effectively using absolute distances, since they don't account for cluster radius. The distance type is determined by the [`DISTANCE_TYPE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#distance_type) value specified during model training.
- `centroid_id`: an `INT64` value that contains the centroid ID.

### Examples

The following examples show how to use `ML.DETECT_ANOMALIES` with different
input models and settings.

#### `ARIMA_PLUS` model without specified settings

The following example detects anomalies using an `ARIMA_PLUS` model that has the
[`DECOMPOSE_TIME_SERIES`](create-time-series.md#decompose_time_series)
training option set to its default value of `TRUE`, without specifying the
`anomaly_prob_threshold` argument.

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES(MODEL `mydataset.my_arima_plus_model`)
```

If the time series input column names are `ts_timestamp` and `ts_data`, then
this query returns results similar to the following:

```text
+-------------------------+----------+------------+-------------+-------------+---------------------+
|      ts_timestamp       | ts_data  | is_anomaly | lower_bound | upper_bound | anomaly_probability |
+-------------------------+----------+------------+-------------+-------------+---------------------+
| 2021-01-01 00:00:01 UTC |  125.3   |   FALSE    |  123.5      |  139.1      |  0.93               |
| 2021-01-02 00:00:01 UTC |  145.3   |   TRUE     |  128.5      |  143.1      |  0.96               |
+-------------------------+----------+------------+-------------+-------------+---------------------+
```

#### `ARIMA_PLUS` model with a custom `anomaly_prob_threshold` value

The following example detects anomalies using an `ARIMA_PLUS` model that has the
[`DECOMPOSE_TIME_SERIES`](create-time-series.md#decompose_time_series)
training option set to its default value of `TRUE`, using a custom
`anomaly_prob_threshold` value of `0.8`:

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES(MODEL `mydataset.my_arima_plus_model`,
    STRUCT(0.8 AS anomaly_prob_threshold))
```

If the time series input column names are `ts_timestamp` and `ts_data`, then
this query returns results similar to the following:

```text
+-------------------------+----------+------------+-------------+-------------+---------------------+
|      ts_timestamp       | ts_data  | is_anomaly | lower_bound | upper_bound | anomaly_probability |
+-------------------------+----------+------------+-------------+-------------+---------------------+
| 2021-01-01 00:00:01 UTC |  125.3   |    TRUE    |  129.5      |  133.6      |  0.93               |
| 2021-01-02 00:00:01 UTC |  145.3   |    TRUE    |  131.5      |  136.6      |  0.96               |
+-------------------------+----------+------------+-------------+-------------+---------------------+
```

#### `ARIMA_PLUS` model with input data as a query statement

The following example detects anomalies using an `ARIMA_PLUS` model, using a
custom `anomaly_prob_threshold` value of `0.9` and passing an input data table
into the query:

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES(MODEL `mydataset.my_arima_plus_model`,
    STRUCT(0.9 AS anomaly_prob_threshold),
    (
      SELECT
        state, city, date, temperature, weather
      FROM
        `mydataset.my_time_series_data_table`))
```

This example uses the following column values:

- `TIME_SERIES_ID_COL` is `state`, `city`.
- `TIME_SERIES_TIMESTAMP_COL` is`date`.
- `TIME_SERIES_DATA_COL` is `temperature`.

This example returns results similar to the following:

```text
+-------+------------+-------------------------+-------------+------------+-------------+-------------+---------------------+---------+
| state |   city     |           date          | temperature | is_anomaly | lower_bound | upper_bound | anomaly_probability | weather |
+-------+------------+-------------------------+-------------+------------+-------------+-------------+---------------------+---------+
| "WA"  | "Kirkland" | 2021-01-01 00:00:00 UTC |   38.1      |   FALSE    |     36.4    |    42.0     |        0.8293       | "sunny" |
| "WA"  | "Kirkland" | 2021-01-02 00:00:00 UTC |   37.1      |   TRUE     |     37.4    |    43.3     |        0.9124       | "rainy" |
+-------+------------+-------------------------+-------------+------------+-------------+-------------+---------------------+---------+
```

#### `ARIMA_PLUS` model with input data as a table

The following example detects anomalies using an `ARIMA_PLUS` model, using
a custom `anomaly_prob_threshold` value of `0.9` and passing an input data table
into the query:

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES(MODEL `mydataset.my_arima_plus_model`,
    STRUCT(0.9 AS anomaly_prob_threshold),
    TABLE `mydataset.my_time_series_data_table`)
```

If the `TIME_SERIES_ID_COL` column names are `state`, `city`, and
`TIME_SERIES_TIMESTAMP_COL`, and the `TIME_SERIES_DATA_COL` column names are
`date` and `temperature`, and one additional column `weather` is in the input
data table, then this query returns results similar to the following:

```text
+-------+------------+-------------------------+-------------+------------+-------------+-------------+---------------------+---------+
| state |   city     |           date          | temperature | is_anomaly | lower_bound | upper_bound | anomaly_probability | weather |
+-------+------------+-------------------------+-------------+------------+-------------+-------------+---------------------+---------+
| "WA"  | "Kirkland" | 2021-01-01 00:00:00 UTC |   38.1      |   FALSE    |     36.4    |    42.0     |        0.8293       | "sunny" |
| "WA"  | "Kirkland" | 2021-01-02 00:00:00 UTC |   37.1      |   TRUE     |     37.4    |    43.3     |        0.9124       | "rainy" |
+-------+------------+-------------------------+-------------+------------+-------------+-------------+---------------------+---------+
```

#### `ARIMA_PLUS_XREG` model with a custom `anomaly_prob_threshold` value

The following example detects anomalies using an `ARIMA_PLUS_XREG` model that
uses a custom `anomaly_prob_threshold` value of `0.6`:

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES (
   MODEL `mydataset.my arima_plus_xreg_model`,
   STRUCT(0.6 AS anomaly_prob_threshold)
  )
ORDER BY
  date ASC;
```

If the time series input column names are `date` and `temperature`, then
this query returns results similar to the following:

```text
+-------------------------+-------------+------------+---------------------+---------------------+----------------------+
|      date               | temperature | is_anomaly | lower_bound         | upper_bound         | anomaly_probability  |
+-------------------------+-------------+------------+---------------------+---------------------+----------------------+
| 2009-08-11 00:00:00 UTC |  70.1       |    false   |  67.65879917809896  |  72.541200821901029 |  0.0                 |
| 2009-08-12 00:00:00 UTC |  73.4       |    false   |  71.714971312549849 |  76.597372956351919 |  0.20573021642489953 |
| 2009-08-13 00:00:00 UTC |  64.6       |    true    |  67.7428898975034   |  72.625291541305472 |  0.94632610424009034 |
+-------------------------+-------------+------------+---------------------+---------------------+----------------------+
```

#### Autoencoder model

The following example detects anomalies using an autoencoder model and a
`contamination` value of `0.1`.

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES(MODEL `mydataset.my_autoencoder_model`,
    STRUCT(0.1 AS contamination),
    TABLE `mydataset.mytable`)
```

If the feature column names are `f1` and `f2`, then this query returns results
similar to the following:

```text
+------------+--------------------+---------+--------+
| is_anomaly | mean_squared_error |    f1   |   f2   |
+------------+--------------------+---------+--------+
|   FALSE    |     0.63456        |   120   |  "a"   |
|   TRUE     |     11.342         |  15000  |  "b"   |
+------------+--------------------+---------+--------+
```

#### K-means model

The following example detects anomalies using a k-means model and a
`contamination` value of `0.2`.

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES(MODEL `mydataset.my_kmeans_model`,
    STRUCT(0.2 AS contamination),
    (
      SELECT
        f1,
        f2
      FROM
        `mydataset.mytable`))
```

This query returns results similar to the following:

```text
+------------+---------------------+-------------+--------+--------+
| is_anomaly | normalized_distance | centroid_id |   f1   |   f2   |
+------------+---------------------+-------------+--------+--------+
|   FALSE    |     0.63456         |     1       |  120   |  "a"   |
|   TRUE     |     6.3243          |     2       | 15000  |  "b"   |
+------------+---------------------+-------------+--------+--------+
```

#### PCA model

The following example detects anomalies using a PCA model and a
`contamination` value of `0.1`.

```sql
SELECT
  *
FROM
  ML.DETECT_ANOMALIES(MODEL `mydataset.my_pca_model`,
    STRUCT(0.1 AS contamination),
    TABLE `mydataset.mytable`)
```

If the feature column names are `f1`, `f2` and `f3`, then this query returns
results similar to the following:

```text
+------------+--------------------+---------+--------+------+
| is_anomaly | mean_squared_error |    f1   |   f2   |  f3  |
+------------+--------------------+---------+--------+------+
|   FALSE    |     0.63456        |   120   |  "a"   |  0.9 |
|   TRUE     |     11.342         |  15000  |  "b"   |  25  |
+------------+--------------------+---------+--------+------+
```

### Pricing

All queries that use the `ML.DETECT_ANOMALIES` function are billable, regardless
of the pricing model.

### What's next

- For more information about model inference, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for models
  that work with `ML.DETECT_ANOMALIES`, see the following documents:

  - [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast)
  - [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-detect-anomalies (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `ARIMA_PLUS` output describes `time_series_timestamp` and `time_series_data` as `STRING` values and then says the columns have the types `TIMESTAMP` and `FLOAT64`; they are written as `TIMESTAMP` and `FLOAT64` values (the `AI.DETECT_ANOMALIES` page also gives `TIMESTAMP`).

## Related

- [Index of this directory](./README.md)
