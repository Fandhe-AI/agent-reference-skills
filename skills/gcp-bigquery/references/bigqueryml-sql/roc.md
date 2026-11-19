---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-roc
---

# The ML.ROC_CURVE function

## Signature / Usage

This document describes the `ML.ROC_CURVE` function, which you can use to
evaluate binary class classification specific metrics.

### Syntax

Adapted (not in the official docs): the trailing comma after `(QUERY_STATEMENT) }` is removed, because the optional `[, GENERATE_ARRAY(THRESHOLDS)]` already starts with a comma.

```sql
ML.ROC_CURVE(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }
  [, GENERATE_ARRAY(THRESHOLDS)]
  [, STRUCT(TRIAL_ID AS trial_id)])
```

#### Arguments

`ML.ROC_CURVE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains
  the evaluation data.

  If `TABLE` is specified, the input column names in the table must match the
  column names in the model, and their types should be compatible according to
  BigQuery [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).
  The input must have a column that matches the
  label column name that's provided during training. This value is provided
  using the `input_label_cols` option. If `input_label_cols` is unspecified,
  the column that's named `label` in the training data is used.

  If you don't specify either `TABLE` or `QUERY_STATEMENT`,
  `ML.ROC_CURVE` computes the curve results as follows:
  - If the data is split during training, the split evaluation data is used to compute the curve results.
  - If the data is not split during training, the entire training input is used to compute the curve results.
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
  [`TRANSFORM` clause](create.md#transform)
  in the `CREATE MODEL` statement that created the model, then only the input
  columns present in the `TRANSFORM` clause must appear in `QUERY_STATEMENT`.

  If you don't specify either `table` or `QUERY_STATEMENT`,
  `ML.ROC_CURVE` computes the curve results as follows:
  - If the data is split during training, the split evaluation data is used to compute the curve results.
  - If the data is not split during training, the entire training input is used to compute the curve results.
- `THRESHOLDS`: an `ARRAY<FLOAT64>` value that specifies
  the percentile values of the prediction output supplied by the
  [`GENERATE_ARRAY` function](../googlesql-functions/array_functions.md#generate_array).

- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  function uses the optimal trial by default. Only specify this argument if you
  ran hyperparameter tuning when creating the model.

### Output

`ML.ROC_CURVE` returns multiple rows with metrics for
different threshold values for the model. The metrics include the following:

- `threshold`: a `FLOAT64` value that contains the custom threshold for the binary class classification model.
- `recall`: a `FLOAT64` value that indicates the proportion of actual positive cases that were correctly predicted by the model.
- `true_positives`: an `INT64` value that contains the number of cases correctly predicted as positive by the model.
- `false_positives`: an `INT64` value that contains the number of cases incorrectly predicted as positive by the model.
- `true_negatives`: an `INT64` value that contains the number of cases correctly predicted as negative by the model.
- `false_negatives`: an `INT64` value that contains the number of cases incorrectly predicted as negative by the model.

### Examples

The following examples assume your model and input table are in your default
project.

#### Evaluate the ROC curve of a binary class logistic regression model

The following query returns all of the output columns for `ML.ROC_CURVE`. You
can graph the `recall` and `false_positive_rate` values for an ROC curve. The
threshold values returned are chosen based on the percentile values of the
prediction output.

```sql
SELECT
  *
FROM
  ML.ROC_CURVE(MODEL `mydataset.mymodel`,
    TABLE `mydataset.mytable`)
```

#### Evaluate an ROC curve with custom thresholds

The following query returns all of the output columns for `ML.ROC_CURVE`. The
threshold values returned are chosen based on the output of the `GENERATE_ARRAY`
function.

```sql
SELECT
  *
FROM
  ML.ROC_CURVE(MODEL `mydataset.mymodel`,
    TABLE `mydataset.mytable`,
    GENERATE_ARRAY(0.4,0.6,0.01))
```

#### Evaluate the precision-recall curve

Instead of getting an ROC curve (the recall versus false positive rate), the
following query calculates a precision-recall curve by using the precision
from the true and false positive counts:

```sql
SELECT
  recall,
  true_positives / (true_positives + false_positives) AS precision
FROM
  ML.ROC_CURVE(MODEL `mydataset.mymodel`,
    TABLE `mydataset.mytable`)
```

### What's next

- For more information about model evaluation, see [BigQuery ML model evaluation overview](https://docs.cloud.google.com/bigquery/docs/evaluate-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-roc (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax block has `(QUERY_STATEMENT) },` followed by `[, GENERATE_ARRAY(THRESHOLDS)]`, which expands to a doubled comma when the optional argument is given. The comma after `}` is removed, because the optional part carries its own leading comma.
- Caution: the example text says you can graph the `recall` and `false_positive_rate` values, but the Output list on this page has no `false_positive_rate` column (only `threshold`, `recall`, `true_positives`, `false_positives`, `true_negatives`, `false_negatives`). The official text is kept as published.

## Related

- [Index of this directory](./README.md)
