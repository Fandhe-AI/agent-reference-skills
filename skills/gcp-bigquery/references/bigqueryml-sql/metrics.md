---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-metrics
---

# The ML.METRICS function

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

This document describes the `ML.METRICS` function, which lets you compute
evaluation metrics for machine learning (ML) classification or regression tasks
on any table or query that contains actual and predicted values.
This function lets you evaluate predictions without needing to create or
reference a stored model in BigQuery ML.

For example, suppose you have a table that contains actual and predicted
categories for a text classification task. You can run a query similar to the
following to compute evaluation metrics for the predictions:

```sql
SELECT *
FROM ML.METRICS(
  TABLE `mydataset.predictions_table`,
  predicted_col => 'predicted_category',
  actual_col => 'actual_category',
  task_type => 'classification');
```

### Syntax

```sql
SELECT
  *
FROM
  ML.METRICS(
    { TABLE TABLE | (QUERY_STATEMENT) },
    predicted_col => 'PREDICTED_COL',
    actual_col => 'ACTUAL_COL',
    task_type => 'TASK_TYPE'
  )
```

#### Arguments

`ML.METRICS` takes the following arguments:

- `TABLE`: the name of the table that contains the
  predicted and actual values. For example, `` `mydataset.mytable` ``.

  If the table is in a different project, then you must prepend the
  project ID to the table name in the following format, including backticks:

  `` `PROJECT_ID.DATASET.TABLE` ``

  For example, `` `myproject.mydataset.mytable` ``.

  To prevent query errors, provide the fully qualified table name, including
  backticks. This practice is especially important if the project name contains
  characters other than letters, numbers, and underscores.
- `QUERY_STATEMENT`: the GoogleSQL query that
  generates the predicted and actual values. See the
  [GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax)
  page for the supported SQL syntax of the `QUERY_STATEMENT` clause.

- `PREDICTED_COL`: a `STRING` value that specifies the
  name of the column in the input table or query that contains the predicted
  values. The column must be one of the following data types depending on the
  `TASK_TYPE` value:

  - For regression tasks, the column must be one of the following
    data types:

    - `INT64`
    - `FLOAT64`
    - `NUMERIC`
    - `BIGNUMERIC`
  - For classification tasks, the column must be one of the following
    data types:

    - `STRING`
    - `BOOL`

  The `PREDICTED_COL` and
  `ACTUAL_COL` columns must have the same data type.
  Rows that contain a `NULL` value are omitted from metric calculations.
- `ACTUAL_COL`: a `STRING` value that specifies the name
  of the column in the input table or query that contains the actual values.
  The column must be one of the following data types depending on the
  `TASK_TYPE` value:

  - For regression tasks, the column must be one of the following
    data types:

    - `INT64`
    - `FLOAT64`
    - `NUMERIC`
    - `BIGNUMERIC`
  - For classification tasks, the column must be one of the following
    data types:

    - `STRING`
    - `BOOL`

  The `ACTUAL_COL` and
  `PREDICTED_COL` columns must have the same data type.
  Rows that contain a `NULL` value are omitted from metric calculations.
- `TASK_TYPE`: a `STRING` value that specifies the type of
  ML evaluation task. Valid values are case-insensitive and
  include the following:

  - `classification`
  - `regression`

### Output

The `ML.METRICS` function returns a single row containing evaluation metrics.
The output columns depend on the value that you specify for
`TASK_TYPE`. If all input rows are filtered out because of
`NULL` values, or if the input table is empty, then the function returns a
single row with `NULL` for all metric columns.

#### Regression metrics

When you set the `task_type` parameter to `regression`, the
function returns the following columns:

- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error).
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error).
- `mean_squared_log_error`: a `FLOAT64` value that contains the mean squared logarithmic error.
- `median_absolute_error`: a `FLOAT64` value that contains the [median absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error).
- `r2_score`: a `FLOAT64` value that contains the [R2 score](https://en.wikipedia.org/wiki/Coefficient_of_determination#Interpretation).
- `explained_variance`: a `FLOAT64` value that contains the [explained variance](https://en.wikipedia.org/wiki/Explained_variation).

#### Classification metrics

When you set the `task_type` parameter to `classification`, the
function returns the following columns:

- `precision`: a `FLOAT64` value that contains the [precision](https://en.wikipedia.org/wiki/Accuracy_and_precision).
- `recall`: a `FLOAT64` value that contains the [recall](https://en.wikipedia.org/wiki/Precision_and_recall).
- `accuracy`: a `FLOAT64` value that contains the [accuracy](https://en.wikipedia.org/wiki/Accuracy_and_precision).
- `f1_score`: a `FLOAT64` value that contains the [F1 score](https://en.wikipedia.org/wiki/F-score).

The calculation method for classification metrics depends on the data type of
the `PREDICTED_COL` and `ACTUAL_COL`
columns:

- **`BOOL` labels** . The function treats the evaluation as binary classification and calculates metrics specifically for the positive (`TRUE`) class.
- **`STRING` labels** . The function treats the evaluation as multiclass classification, even when only two distinct class labels are present in the data. The function calculates each metric as a [macro-average](https://www.evidentlyai.com/classification-metrics/multi-class-metrics#macro-averaging) across all classes. For a macro-average, metrics are calculated for each label, and then an unweighted average is taken of those values. If a class label exists only in the actual values or only in the predicted values, it is still included in the macro-average calculation.

### Examples

The following examples show how to use the `ML.METRICS` function to compute
evaluation metrics for predictions made on public datasets.

#### Calculate classification metrics

The following example calculates classification metrics for news categories
predicted by the `AI.CLASSIFY` function against actual labeled categories:

```sql
SELECT *
FROM ML.METRICS(
  (
    SELECT
      category,
      AI.CLASSIFY(
        body,
        categories => ['business', 'entertainment', 'politics', 'sport', 'tech']
      ) AS predicted_category
    FROM
      `bigquery-public-data.bbc_news.fulltext`
    LIMIT 100
  ),
  predicted_col => 'predicted_category',
  actual_col => 'category',
  task_type => 'classification');
```

The result is similar to the following:

```text
+-----------+--------+----------+----------+
| precision | recall | accuracy | f1_score |
+-----------+--------+----------+----------+
| 0.33      | 0.28   | 0.84     | 0.30     |
+-----------+--------+----------+----------+
```

#### Calculate regression metrics for a query

The following example calculates regression metrics for the average penguin body
mass per species against the actual body mass values:

```sql
SELECT *
FROM ML.METRICS(
  (
    SELECT
      body_mass_g,
      -- Baseline prediction: average body mass grouped by species
      AVG(body_mass_g) OVER(PARTITION BY species) AS predicted_body_mass_g
    FROM
      `bigquery-public-data.ml_datasets.penguins`
    WHERE
      body_mass_g IS NOT NULL
    LIMIT 100
  ),
  predicted_col => 'predicted_body_mass_g',
  actual_col => 'body_mass_g',
  task_type => 'regression');
```

The result is similar to the following:

```text
+---------------------+--------------------+------------------------+-----------------------+----------+--------------------+
| mean_absolute_error | mean_squared_error | mean_squared_log_error | median_absolute_error | r2_score | explained_variance |
+---------------------+--------------------+------------------------+-----------------------+----------+--------------------+
| 383.78              | 216347.17           | 0.016                 | 300.66                | -3.92E-5 | -6.66E-16          |
+---------------------+--------------------+------------------------+-----------------------+----------+--------------------+
```

#### Calculate regression metrics for a table

The following queries create a table of penguin body mass prediction using the
[`AI.PREDICT` function](ai-predict.md),
and then calculates regression metrics for the saved predictions:

```sql
CREATE OR REPLACE TABLE mydataset.penguin_body_mass_predictions
AS (
  WITH prepared_data AS (
    SELECT *, RAND() <= 0.8 AS training
    FROM `bigquery-public-data.ml_datasets.penguins`
    WHERE body_mass_g > 0
  )
  SELECT
  *
  FROM
  AI.PREDICT(
    # Training data
    (SELECT * EXCEPT(training) FROM prepared_data WHERE training),
    # Prediction data
    (SELECT * EXCEPT(training) FROM prepared_data WHERE NOT training),
    label_col => 'body_mass_g')
);

SELECT *
FROM ML.METRICS(
  TABLE `mydataset.penguin_body_mass_predictions`,
  predicted_col => 'predicted_body_mass_g',
  actual_col => 'body_mass_g',
  task_type => 'regression');
```

The result is similar to the following:

```text
+---------------------+--------------------+------------------------+-----------------------+---------------------+---------------------+
| mean_absolute_error | mean_squared_error | mean_squared_log_error | median_absolute_error | r2_score            | explained_variance  |
+---------------------+--------------------+------------------------+-----------------------+---------------------+---------------------+
| 158.33734939759032  | 46334.843373493975 | 0.0027285838904596953  | 104.0                 | 0.91609072642998024 | 0.91803270745448851 |
+---------------------+--------------------+------------------------+-----------------------+---------------------+---------------------+
```

### What's next

- For more information about model evaluation, see [BigQuery ML model evaluation overview](https://docs.cloud.google.com/bigquery/docs/evaluate-overview).
- For more information about supported SQL statements and functions for machine learning models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).
- To perform prediction and evaluation of TimesFM and TabFM models in one step, see the [`AI.EVALUATE` function](ai-evaluate.md).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-metrics (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
