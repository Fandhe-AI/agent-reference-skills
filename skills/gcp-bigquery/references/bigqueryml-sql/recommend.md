---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-recommend
---

# The ML.RECOMMEND function

## Signature / Usage

This document describes the `ML.RECOMMEND` function, which lets you generate
a predicted rating for every user-item row
combination for a
[matrix factorization model](create-matrix-factorization.md).
Because the input data for a
matrix factorization model tends to be a sparse matrix with missing values,
`ML.RECOMMEND` can return the predictions for those missing values without
requiring specification of each entry.

> [!NOTE]
> **Note:** `ML.RECOMMEND` can generate large outputs. Consider saving the output to a table for analysis.

### Syntax

Adapted (not in the official docs): the comma after the model argument is removed, because each optional argument starts with its own comma.

```sql
ML.RECOMMEND(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }]
  [, STRUCT(TRIAL_ID AS trial_id)])
```

#### Arguments

`ML.RECOMMEND` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: The name of the input table that contains the
  user and item data.

  If you specify input data by using either the `TABLE` or `QUERY_STATEMENT`
  argument, the user and item columns must match the user and item columns in
  the model, and their types must be compatible according to
  BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

  If the input table does not contain both the user and item column, the input
  table can only contain one column. If the table contains both the user and
  item columns, then the non-user or item columns are passed through and
  available for use in the query.
- `QUERY_STATEMENT`: The GoogleSQL query that is
  used to generate the evaluation data. For the supported SQL syntax for the
  `QUERY_STATEMENT` clause in GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you specify input data by using either the `TABLE` or `QUERY_STATEMENT`
  argument, the user and item columns must match the user and item columns in
  the model, and their types must be compatible according to
  BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).
- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  function uses the optimal trial by default. Only specify this argument if you
  ran hyperparameter tuning when creating the model.

### Output

`ML.RECOMMEND` outputs at least 3 columns for all cases; the `user` column, the
`item` column and a column for predicted recommendations.

The output of `ML.RECOMMEND` is computed as follows:

- If both the user and item columns are in the input data, then `ML.RECOMMEND` returns a rating for each user-item pair.
- If only the user or only the item is specified (for example, if the table identified by the `table` argument only contains the user column), then all the item ratings for every user in the table are outputted.
- If either the user or item feature was not in the training dataset, the rating that is returned is the intercept of the feature that was provided, either item or user, added to the `global__intercept__` offset. For example, `global__intercept__ + __intercept__['user_a']`.
- If input data is specified but does not provide either the user or item column, `ML.RECOMMEND` returns an error.
- If no input data is specified, `ML.RECOMMEND` outputs the ratings for every user and item combination seen during training.

If the model was trained with `feedback_type=EXPLICIT`, a user column called
`user`, and an item column called `item`, then `ML.RECOMMEND` returns the
following columns:

- `user`: a `STRING` value containing the user data.
- `item`: a `STRING` value containing the item data
- `predicted_<rating_col_name>`: a `FLOAT64` value that contains the rating for each user-item pair. Because the input ratings from training are assumed to be explicit feedback, the predicted ratings are approximately in the range of the original input, although ratings outside the range are also normal.

If the model was trained with `feedback_type=IMPLICIT`, a user column called
`user`, and an item column called `item`, then `ML.RECOMMEND` returns the
following columns:

- `user`: a `STRING` value containing the user data.
- `item`: a `STRING` value containing the item data
- `predicted_<rating_col_name>_confidence`: a `FLOAT64` value that contains the relative confidence for each user-item pair. The input ratings from training are assumed to be a proxy for user confidence. Therefore, if the model has converged, the predicted confidences lie between approximately 0 and 1 (but can lie just outside that range). If the model hasn't converged, the predicted confidences can be any value. If your model isn't converging and your ratings are very large, try decreasing the `WALS_ALPHA` value that's specified in the `CREATE MODEL` statement for the model. If your model isn't converging and your ratings are very small, try increasing the `WALS_ALPHA` value.

### Examples

The following examples show how to use the `ML.RECOMMEND` function.

#### No input data

The following example generates predicted ratings for every
user-item pair in the inputs of `mymodel` because there is no input data
specified.

```sql
SELECT
  *
FROM
  ML.RECOMMEND(MODEL `mydataset.mymodel`)
```

#### With input data

The following example generates predicted ratings for each user-item row in
`mydataset.mytable` assuming that `mydataset.mymodel` was trained using the user
column `user` and item column `item`.

```sql
SELECT
  *
FROM
  ML.RECOMMEND(MODEL `mydataset.mymodel`,
      (
      SELECT
        user,
        item
      FROM
        `mydataset.mytable`))
```

### What's next

- For more information about model inference, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-recommend (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax ends the `MODEL` argument with a comma and then starts each optional argument with `[, ...]`, which gives a doubled or trailing comma; the comma after the model argument is removed.

## Related

- [Index of this directory](./README.md)
