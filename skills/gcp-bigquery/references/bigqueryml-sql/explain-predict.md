---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-explain-predict
---

# The ML.EXPLAIN_PREDICT function

## Signature / Usage

This document describes the `ML.EXPLAIN_PREDICT` function, which lets you
generate a predicted value and a set of feature attributions for each instance
of the input data. Feature attributions indicate how much each feature in your
model contributed to the final prediction for each given instance.
`ML.EXPLAIN_PREDICT` is essentially an extended version of
[`ML.PREDICT`](predict.md).

### Syntax

Adapted (not in the official docs): the `MAX_OUTPUT_TOKENS` field, which the arguments of `ML.EXPLAIN_PREDICT` don't define, is removed.

```sql
ML.EXPLAIN_PREDICT(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
  STRUCT(
  [TOP_K_FEATURES AS top_k_features]
  [, THRESHOLD AS threshold]
  [, APPROX_FEATURE_CONTRIB AS approx_feature_contrib])
)
```

#### Arguments

`ML.EXPLAIN_PREDICT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the
  data to be evaluated.

  If `TABLE` is specified, the input column names in the table must match the
  column names in the model, and their types should be compatible according to
  BigQuery [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

  If there are unused columns from the table, they are passed through to
  the output columns.
- `QUERY_STATEMENT`: the GoogleSQL query that is
  used to generate the evaluation data. For the supported SQL syntax for the
  `QUERY_STATEMENT` clause in GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If `QUERY_STATEMENT` is specified, the input column names from the query
  must match the column names in the model, and their types should be
  compatible according to BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

  If there are unused columns from the table, they are passed through to
  the output columns.

  If you used the
  [`TRANSFORM` clause](create.md#transform)
  in the `CREATE MODEL` statement that created the model, then only the input
  columns present in the `TRANSFORM` clause can appear in `QUERY_STATEMENT`.
- `TOP_K_FEATURES`: an `INT64` value that specifies how
  many top feature attribution pairs are generated for each row of input data.
  The features are ranked by the absolute values of their attributions.

  By default, `TOP_K_FEATURES` is set to `5`. If its value is greater than
  the number of features in the training data, the attributions of all
  features are returned.
- `THRESHOLD`: a `FLOAT64` value that specifies the cutoff
  between the two labels for binary classification models. Predictions above the
  threshold are positive predictions. Predictions below the threshold are
  negative predictions. Feature attributions are returned only for the predicted
  label.

  The `THRESHOLD` value must be between `0.0` and `1.0`. The default value is
  `0.5`.
- `APPROX_FEATURE_CONTRIB`: a `BOOL` value that indicates
  whether to use an approximate feature contribution method in the XGBoost model
  explanation. This option applies only to
  [boosted tree](create-boosted-tree.md)
  and
  [random forest](create-random-forest.md)
  models.

  This capability is provided by the XGBoost library;
  BigQuery ML only passes this option through to it. For more
  information, see
  [Package 'xgboost'](https://cran.r-project.org/web/packages/xgboost/xgboost.pdf)
  and search for `approxcontrib`.

  The default value is `FALSE`.

### Output

`ML.EXPLAIN_PREDICT` returns the following columns in addition to any
passthrough columns:

- `predicted_<label_column_name>`: a `STRING` value that contains either the predicted value of the label for regression models or the predicted label class for classification models.
- `probability`: a `FLOAT64` value that contains the probability of the predicted label class. This column is only present for classification models.
- `top_feature_attributions`: An `ARRAY<STRUCT>` value that contains the attributions of the top *k* features to the final prediction:
  - `top_feature_attributions.feature`: a `STRING` value that contains the feature name.
  - `top_feature_attributions.attribution`: a `FLOAT64` value that contains the attribution of the feature to the final prediction.
- `baseline_prediction_value`: a `FLOAT64` value that contains one of the following:
  - For linear models, the `baseline_prediction_value` value is the intercept of the model.
  - For boosted tree and random forest models, the `baseline_prediction_value` value is equal to the bias term, which is the expected output of the model over the training dataset. See [Tree SHAP documentation](https://shap.readthedocs.io/en/latest/example_notebooks/tabular_examples/tree_based_models/Understanding%20Tree%20SHAP%20for%20Simple%20Models.html) for more information.
- `prediction_value`: The raw prediction value.
  - For regression models, this is a `FLOAT64` value that contains the value of the column identified by `predicted_<label_column_name>`.
  - For classification models, this is an `INT` or `STRING` value that contains the [logit](https://en.wikipedia.org/wiki/Logit) value (also called log-odds) for the predicted class. The predicted class probabilities are obtained by applying the [softmax](https://en.wikipedia.org/wiki/Softmax_function) transformation to the logit values.
- `approximation_error`:

  - Exact attribution methods like Tree SHAP are defined as follows:

    $$\\frac{\|\\texttt{prediction_value} - \\texttt{baseline_prediction_value} - \\sum{\\texttt{feature_attributions}}\|}{\|\\texttt{prediction_value} - \\texttt{baseline_prediction_value}\|}$$

    Because of this explanation of the contributions to the predicted value,
    there is no approximation error for these types of
    methods, and this column value is `0`. Exact attribution methods are
    used for the following types of models:
    - [Linear \& logistic regression](create-glm.md)
    - [Boosted tree](create-boosted-tree.md)
    - [Random forest](create-random-forest.md)

### Examples

The following examples assume that your model and input table are in your
default project.

#### Explain a prediction generated by a linear regression model

The following example explains a prediction for a
linear regression model by generating the top three attributions.

Assume a linear regression model stored in `mydataset.mymodel` was trained with
the table `mydataset.table` with the following columns:

- `label`
- `column1`
- `column2`
- `column3`
- `column4`
- `column5`

```sql
SELECT
  *
FROM
  ML.EXPLAIN_PREDICT(MODEL `mydataset.mymodel`,
    (
    SELECT
      label,
      column1,
      column2,
      column3,
      column4,
      column5
    FROM
      `mydataset.mytable`), STRUCT(3 AS top_k_features))
```

#### Explain a prediction generated by a boosted tree or a random forest binary classification model

The following example explains a prediction generated by a boosted tree or a
random forest binary classification model. It generates the top three
attributions with a custom threshold.

Assume a boosted tree or a random forest binary classification model stored
in `mydataset.mymodel` is trained with the table `mydataset.table` with the
following columns:

- `label`
- `column1`
- `column2`
- `column3`
- `column4`
- `column5`

```sql
SELECT
  *
FROM
  ML.EXPLAIN_PREDICT(MODEL `mydataset.mymodel`,
    (
    SELECT
      label,
      column1,
      column2,
      column3,
      column4,
      column5
    FROM
      `mydataset.mytable`), STRUCT(3 AS top_k_features, 0.7 AS threshold))
```

### What's next

- For more information about Explainable AI, see [BigQuery Explainable AI overview](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-xai-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-explain-predict (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax includes `[MAX_OUTPUT_TOKENS AS max_output_tokens]`, a text generation option that the argument list of `ML.EXPLAIN_PREDICT` doesn't describe; it is removed, and `TOP_K_FEATURES` is the first field.
- Conflicting official statements: `predicted_<label_column_name>` is described as a `STRING` value for both regression and classification models, while `prediction_value` for regression models is a `FLOAT64` value that contains the same value; for classification models `prediction_value` is described as an `INT` or `STRING` value that contains a logit, which is a number. The output types of these two columns are not confirmed.

## Related

- [Index of this directory](./README.md)
