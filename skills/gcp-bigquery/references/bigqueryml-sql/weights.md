---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-weights
---

# The ML.WEIGHTS function

## Signature / Usage

This document describes the `ML.WEIGHTS` function, which lets you see the
underlying weights that a model uses during prediction. This function applies to
[linear and logistic regression models](create-glm.md)
and
[matrix factorization models](create-matrix-factorization.md).

For matrix factorization models, you can use the
[`AI.GENERATE_EMBEDDING` function](ai-generate-embedding.md)
as an alternative to the `ML.WEIGHTS` function.
`AI.GENERATE_EMBEDDING` generates the same factor weights and intercept data as
`ML.WEIGHTS` as an array in a single column, rather than in two columns.
Having all of the embeddings in a single column lets you directly use the
[`VECTOR_SEARCH` function](../googlesql-functions/search_functions.md#vector_search)
on the`AI.GENERATE_EMBEDDING` output.

### Syntax

Adapted (not in the official docs): the optional `STRUCT` argument is bracketed as a whole, and the stray comma inside `STRUCT(...)` is removed.

```sql
ML.WEIGHTS(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, STRUCT(STANDARDIZE AS standardize)])
```

#### Arguments

`ML.WEIGHTS` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL`: the name of the model.
- `STANDARDIZE`: a `BOOL` value that specifies whether the model weights should be standardized to assume that all features have a mean of `0` and a standard deviation of `1`. Standardizing the weights allows the absolute magnitude of the weights to be compared to each other. The default value is `FALSE`. This argument only applies to linear and logistic regression models.

### Output

`ML.WEIGHTS` has different output columns for different model types.

#### Linear and logistic regression models

For linear and logistic regression models, `ML.WEIGHTS` returns the
following columns:

- `trial_id`: an `INT64` value that contains the hyperparameter tuning trial ID. This column is only returned if you ran hyperparameter tuning when creating the model.
- `processed_input`: a `STRING` value that contains the name of the feature input column. The value of this column matches the name of the feature column provided in the [`query_statement` clause](create.md#query_statement) that was used when the model was trained.
- `weight`: if the column identified by the `processed_input` value is numerical, `weight` contains a `FLOAT64` value and the `category_weights` column contains `NULL` values. If the column identified by the `processed_input` value is non-numerical and has been converted to one-hot encoding, the `weight` column is `NULL` and the `category_weights` column contains the category names and weights for each category.
- `category_weights.category`: a `STRING` value that contains the category name if the column identified by the `processed_input` value is non-numeric.
- `category_weights.weight`: a `FLOAT64` that contains the category's weight if the column identified by the `processed_input` value is non-numeric.
- `class_label`: a `STRING` value that contains the label for a given weight. Only used for multiclass models. The output includes one row per `<class_label, processed_input>` combination.

If you used the
[`TRANSFORM` clause](create.md#transform)
in the `CREATE MODEL` statement that created the model, `ML.WEIGHTS` outputs
the weights of `TRANSFORM` output features. The weights are denormalized by
default, with the option to get normalized weights, exactly like models that
are created without `TRANSFORM`.

#### Matrix factorization models

For matrix factorization models, `ML.WEIGHTS` returns the following columns:

- `trial_id`: an `INT64` value that contains the hyperparameter tuning trial ID. This column is only returned if you ran hyperparameter tuning when creating the model.
- `processed_input`: a `STRING` value that contains the name of the user or item column. The value of this column matches the name of the user or item column provided in the [`query_statement` clause](create.md#query_statement) that was used when the model was trained.
- `feature`: a `STRING` value that contains the names of the specific users or items used during training.
- `factor_weights`: an `ARRAY<STRUCT>` value that contains the factors and the weights for each factor.
  - `factor_weights.factor`: an `INT64` value that contains the latent factor from training. This value can be between `1` and the value of the [`NUM_FACTORS` option](create-matrix-factorization.md#num_factors).
  - `factor_weights.weight`: a `FLOAT64` value that contains the [weight](https://developers.google.com/machine-learning/glossary/#weight) of the respective factor and feature.
- `intercept`: a `FLOAT64` value that contains the intercept or bias term for a feature.

There is an additional row in the output that contains the
`global__intercept__` value calculated from the input data. This row has `NULL`
values for the `processed_input` and `factor_weights` columns. For
[implicit feedback](create-matrix-factorization.md#feedback_type)
models, `global__intercept__` is always 0.

### Examples

The following examples show how to use `ML.WEIGHTS` with and without the
`standardize` argument.

#### Without standardization

The following example retrieves weight information from `mymodel` in
`mydataset`. The dataset is in your default project. It returns the weights
that are associated with each one-hot encoded category for the input column
`input_col`.

```sql
SELECT
  category,
  weight
FROM
  UNNEST((
    SELECT
      category_weights
    FROM
      ML.WEIGHTS(MODEL `mydataset.mymodel`)
    WHERE
      processed_input = 'input_col'))
```

This command uses the [`UNNEST`](../googlesql-syntax/query-syntax-1.md#unnest-operator)
function because the `category_weights` column is a nested repeated column.

#### With standardization

The following example retrieves weight information from `mymodel` in
`mydataset`. The dataset is in your default project. It retrieves standardized
weights, which assume all features have a mean of `0` and a standard deviation
of `1`.

```sql
SELECT
  *
FROM
  ML.WEIGHTS(MODEL `mydataset.mymodel`,
    STRUCT(true AS standardize))
```

### What's next

- For more information about model weights support in BigQuery ML, see [BigQuery ML model weights overview](https://docs.cloud.google.com/bigquery/docs/weights-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-weights (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax block has `STRUCT([, STANDARDIZE AS standardize])`, which expands to `STRUCT(, STANDARDIZE ...)` and makes the `STRUCT` argument look required, although the first example on this page calls `ML.WEIGHTS(MODEL `mydataset.mymodel`)`. It is changed to `[, STRUCT(STANDARDIZE AS standardize)]`.

## Related

- [Index of this directory](./README.md)
