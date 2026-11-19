---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-confusion
---

# The ML.CONFUSION_MATRIX function

## Signature / Usage

This document describes the `ML.CONFUSION_MATRIX` function, which you can use
to return a confusion matrix for the input classification model and input data.

### Syntax

```sql
ML.CONFUSION_MATRIX(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }]
    STRUCT(
      [THRESHOLD AS threshold]
      [, TRIAL_ID AS trial_id]))
```

#### Arguments

`ML.CONFUSION_MATRIX` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains
  the evaluation data.

  If `TABLE` is specified, the input column names in the table must match the
  column names in the model, and their types should be compatible according to
  BigQuery [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).
  The input must have a column that matches the
  label column name provided during training. This value is provided using the
  `input_label_cols` option. If `input_label_cols` is unspecified, the column
  named `label` in the training data is used.

  If you don't specify either `TABLE` or `QUERY_STATEMENT`,
  `ML.CONFUSION_MATRIX` computes the confusion matrix results as follows:
  - If the data is split during training, the split evaluation data is used to compute the confusion matrix results.
  - If the data is not split during training, the entire training input is used to compute the confusion matrix results.
- `QUERY_STATEMENT`: a GoogleSQL query that is
  used to generate the evaluation data. For the supported SQL syntax of the
  `QUERY_STATEMENT` clause in GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If `QUERY_STATEMENT` is specified, the input column names from the query
  must match the column names in the model, and their types should be
  compatible according to BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).
  The input must have a column that matches the label column name provided
  during training. This value is provided using the `input_label_cols` option.
  If `input_label_cols` is unspecified, the column named `label` in the
  training data is used. The extra columns are ignored.

  If you used the
  [`TRANSFORM` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#transform)
  in the `CREATE MODEL` statement that created the model, then only the input
  columns present in the `TRANSFORM` clause must appear in `QUERY_STATEMENT`.

  If you don't specify either `TABLE` or `QUERY_STATEMENT`,
  `ML.CONFUSION_MATRIX` computes the confusion matrix results as follows:
  - If the data is split during training, the split evaluation data is used to compute the confusion matrix results.
  - If the data is not split during training, the entire training input is used to compute the confusion matrix results.
- `THRESHOLD`: a `FLOAT64` value that specifies a custom
  threshold for the binary-class classification model to use for evaluation. The
  default value is `0.5`.

  A `0` value for precision or recall means that the selected threshold
  produced no true positive labels. A `NaN` value for precision means that the
  selected threshold produced no positive labels, neither true positives nor
  false positives.

  If both `TABLE` and `QUERY_STATEMENT` are unspecified, you can't use a
  threshold.

  You can't use `THRESHOLD` with multiclass classification models.
- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  function uses the optimal trial by default. Only specify this argument if you
  ran hyperparameter tuning when creating the model.

> [!NOTE]
> **Note:** `ML.CONFUSION_MATRIX` requires input data with some models, and returns an error if it is absent. If this occurs, provide input data when using `ML.CONFUSION_MATRIX` with these models.

### Output

The output columns of the `ML.CONFUSION_MATRIX` function depend on the model.
The first output column is always `expected_label`. There are `N` additional
columns, one for each class in the trained model. The names of the additional
columns depend on the class labels used to train the model.

If the training class labels all conform to BigQuery
[column naming rules](https://docs.cloud.google.com/bigquery/docs/schemas#column_names), the labels are used
as the column names. Columns that don't conform to naming rules are altered to
conform to the column naming rules and to be unique. For example, if the labels
are `0` and `1`, the output column names are `_0` and `_1`.

The columns are ordered based on the class labels in ascending order. If the
labels in the evaluation data match those in the training data, the
[True Positives](https://developers.google.com/machine-learning/glossary/#true_positive)
are shown on the diagonal from top left to bottom right. The expected (or
actual) labels are listed one per row, and the predicted labels are listed one
per column.

The values in the `expected_label` column are the exact values and type passed
into `ML.CONFUSION_MATRIX` in the label column of the evaluation data. This is
true even if they don't exactly match the values or type used during training.

### Limitations

`ML.CONFUSION_MATRIX` doesn't support
[imported TensorFlow models](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-tensorflow).

### Examples

The following examples demonstrate the use of the `ML.CONFUSION_MATRIX` function.

#### `ML.CONFUSION_MATRIX` with a query statement

The following example returns the confusion matrix for a logistic
regression model named `mydataset.mymodel` in your default project:

```sql
SELECT
  *
FROM
  ML.CONFUSION_MATRIX(MODEL `mydataset.mymodel`,
  (
    SELECT
      *
    FROM
      `mydataset.mytable`))
```

#### `ML.CONFUSION_MATRIX` with a custom threshold

The following example returns the confusion matrix for a logistic
regression model named `mydataset.mymodel` in your default project:

```sql
SELECT
  *
FROM
  ML.CONFUSION_MATRIX(MODEL `mydataset.mymodel`,
    (
    SELECT
      *
    FROM
      `mydataset.mytable`),
    STRUCT(0.6 AS threshold))
```

### What's next

- For more information about model evaluation, see [BigQuery ML model evaluation overview](https://docs.cloud.google.com/bigquery/docs/evaluate-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-confusion (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
