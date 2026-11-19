---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-predict
---

# The AI.PREDICT function

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
> **Note:** For support during the preview, contact [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

This document describes the `AI.PREDICT` function, which uses a pre-trained
foundation model for tabular data,
[TabFM](https://docs.cloud.google.com/bigquery/docs/tabfm-model),
to perform regression and classification tasks on structured data.

### Syntax

```googlesql
AI.PREDICT(
  { TABLE TRAINING_TABLE | (TRAINING_QUERY)  },
  { TABLE PREDICTION_TABLE | (PREDICTION_QUERY)  }
  [, label_col => 'LABEL_COL' ]
)
```

#### Arguments

`AI.PREDICT` takes the following arguments:

- `TRAINING_TABLE | TRAINING_QUERY`: the table or query
  that contains the training data. The table or query result must contain a
  column named `label` or the column that you specify in the `LABEL_COL`
  argument. Every other column is considered a feature column. The feature and
  label columns must be one of the following types: `STRING`, `BOOL`,
  `INT64`, `FLOAT64`, `NUMERIC` or `BIGNUMERIC`.

- `PREDICTION_TABLE | PREDICTION_QUERY`: the table or
  query that contains the data to run prediction on. The table or query result
  must contain all of the feature columns in the training data and can
  optionally contain additional columns.

- `LABEL_COL`: a `STRING` value that specifies
  the name of the label column in the training data. The
  default value is `'label'`.

### Output

`AI.PREDICT` returns the columns from the training table or query result in
addition to the following columns:

- If the label column is of type `INT64`, `FLOAT64`, `NUMERIC` or `BIGNUMERIC`,
  then `AI.PREDICT` performs a regression task and returns the following column:

  - `predicted_<label_column_name>`: contains the predicted numerical values. The data type is the same as the label column in the training data.
- If the label column is of type `BOOL` or `STRING`, then `AI.PREDICT` performs
  a classification task and returns the following columns:

  - `predicted_<label_column_name>`: contains the predicted values. The data type is the same as the label column in the training data.
  - `predicted_<label_column_name>_probs`: an `ARRAY<STRUCT<label STRING, prob FLOAT64>>` value that contains each possible label and the probability of assignment to that label.

### Examples

The following examples show how to use the `AI.PREDICT` function for
regression and classification tasks.

#### Perform regression

The following query uses `AI.PREDICT` to perform regression to predict the
body mass of penguins:

```sql
WITH prepared_data AS (
  SELECT *, RAND() <= 0.8 AS training
  FROM `bigquery-public-data.ml_datasets.penguins`
  WHERE body_mass_g > 0
)
SELECT
  *
FROM AI.PREDICT(
  # Training data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE training),
  # Prediction data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE NOT training),
  label_col => 'body_mass_g');
```

The result is similar to the following:

```text
+-------------------+--------+------------------+-----------------+-------------------+-------------+--------+-----------------------+
| species           | island | culmen_length_mm | culmen_depth_mm | flipper_length_mm | body_mass_g | sex    | predicted_body_mass_g |
+-------------------+--------+------------------+-----------------+-------------------+-------------+--------+-----------------------+
| Adelie Penguin... | Dream  | 40.9             | 18.9            | 184.0             | 3900.0      | MALE   | 3904.0                |
| Adelie Penguin... | Dream  | 37.0             | 16.9            | 185.0             | 3000.0      | FEMALE | 3168.0                |
| ...               | ...    | ...              | ...             | ...               | ...         | ...    | ...                   |
+-------------------+--------+------------------+-----------------+-------------------+-------------+--------+-----------------------+
```

#### Calculate prediction accuracy

You can compute regression metrics for the predictions using the
[`ML.METRICS` function](metrics.md):

```sql
WITH prepared_data AS (
  SELECT *, RAND() <= 0.8 AS training
  FROM `bigquery-public-data.ml_datasets.penguins`
  WHERE body_mass_g > 0
)
SELECT *
FROM ML.METRICS(
  (
    SELECT
    *
    FROM
    AI.PREDICT(
      # Training data
      (SELECT * EXCEPT(training) FROM prepared_data WHERE training),
      # Prediction data
      (SELECT * EXCEPT(training) FROM prepared_data WHERE NOT training),
      label_col => 'body_mass_g')
  ),
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

#### Perform classification

The following query uses `AI.PREDICT` to perform classification to predict
the sex of a penguin:

```sql
WITH prepared_data AS (
  SELECT *, RAND() <= 0.8 AS training
  FROM `bigquery-public-data.ml_datasets.penguins`
  WHERE sex IS NOT NULL and sex != "."
)
SELECT
 *
FROM
 AI.PREDICT(
  # Training data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE training),
  # Prediction data
  (SELECT * EXCEPT(training) FROM prepared_data WHERE NOT training),
  label_col => 'sex');
```

The result is similar to the following:

```text
+----------------------+--------+------------------+-----+--------+---------------+---------------------------+--------------------------+
| species                | island | culmen_length_mm | ... | sex    | predicted_sex | predicted_sex_probs.label | predicted_sex_probs.prob |
+----------------------+--------+------------------+-----+--------+---------------+---------------------------+--------------------------+
| Chinstrap Penguin... | Dream  | 40.9             | ... | FEMALE | FEMALE        | MALE                      | 0.006192990157855187     |
|                      |        |                  |     |        |               | FEMALE                    | 0.99380700984214487      |
| Adelie Penguin...    | Dream  | 37.0             | ... | MALE   | MALE          | MALE                      | 0.99561766335926927      |
|                      |        |                  |     |        |               | FEMALE                    | 0.0043823366407307451    |
| ...                  | ...    | ...              | ... |        | ...           | ...                       | ...                      |
+----------------------+--------+------------------+-----+--------+---------------+---------------------------+--------------------------+
```

### Pricing

During Preview, usage of TabFM in BigQuery is billed in the
following ways:

- If you use Enterprise or Enterprise Plus edition, then your usage is billed in slots.
- If you use on-demand pricing, then your usage is billed based on the number of bytes processed.

BigQuery TabFM will use a token based pricing from 10/30/2026
onwards. At that time, you will be charged for TabFM tokens consumed by the
model in your query and BigQuery slots used or bytes processed
for the rest of the query.

### Limitations

- Your data can include up to 50 feature columns. If you need to use more than 50 feature columns, contact [bqml-feedback@google.com](mailto:bqml-feedback@google.com).
- You can classify data into at most 10 different categories.

### What's next

- Evaluate the performance of the TabFM model by using the [`AI.EVALUATE` function](ai-evaluate.md).
- Learn more about [regression](https://docs.cloud.google.com/bigquery/docs/regression-overview) and [classification](https://docs.cloud.google.com/bigquery/docs/classification-overview) in BigQuery.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-predict (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
