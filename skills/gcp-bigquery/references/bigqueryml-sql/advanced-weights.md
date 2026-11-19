---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-advanced-weights
---

# The ML.ADVANCED_WEIGHTS function

## Signature / Usage

This document describes the `ML.ADVANCED_WEIGHTS` function, which lets you
see the underlying weights that a linear or binary logistic regression model
uses during prediction, along with the associated p-values and
standard errors for that weight. `ML.ADVANCED_WEIGHTS` is an extended version of
`ML.WEIGHTS` for linear and binary logistic regression models.

### Usage requirements

You can only use `ML.ADVANCED_WEIGHTS` on linear and binary logistic regression
models that are trained with the following option settings:

- The [`CALCULATE_P_VALUES`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#calculate_p_values) value is `TRUE`.
- The [`CATEGORY_ENCODING_METHOD`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#category_encoding_method) value is `DUMMY_ENCODING`.
- The [`L1_REG`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#l1_reg) value is `0`.

It's common to require standard errors or p-values for either the regression
coefficients or other estimated quantities for these penalized regression
methods. In principle, such standard errors can be calculated---for example,
using the bootstrap. In practice, this calculation isn't done for reasons that
the authors of the
[R package](https://cran.r-project.org/web/packages/penalized/vignettes/penalized.pdf)
explain as follows:

<br />

*Standard errors are not very meaningful for strongly biased estimates arising from penalized estimation methods. Penalized estimation is a procedure that reduces the variance of estimators by introducing substantial bias. The bias of each estimator is therefore a major component of its mean squared error, whereas its variance may contribute only a small part. Unfortunately, in most applications of penalized regression it is impossible to obtain a sufficiently precise estimate of the bias. Any bootstrap-based calculations can only give an assessment of the variance of the estimates. Reliable estimates of the bias are only available if reliable unbiased estimates are available, which is typically not the case in situations in which penalized estimates are used.*

<br />

Multiclass logistic regression models aren't supported.

### Syntax

```sql
ML.ADVANCED_WEIGHTS(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  STRUCT(
    [STANDARDIZE AS standardize]))
```

#### Arguments

`ML.ADVANCED_WEIGHTS` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL`: the name of the model.
- `STANDARDIZE`: a `BOOL` value that specifies whether the model weights should be standardized to assume that all features have a mean of zero and a standard deviation of one. Standardizing the weights allows the absolute magnitude of the weights to be compared to each other. The default value is `FALSE`.

### Output

`ML.ADVANCED_WEIGHTS` returns the following columns:

- `processed_input`: a `STRING` value that contains the name of the feature column. The value of this column is the name of the feature column that's provided in the [`query_statement` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#query_statement) used during model training. If the feature is non-numeric, then there are multiple rows with the same `processed_input` value, one for each category of the feature.
- `category`: a `STRING` value that contains the category name if the column identified in the `processed_input` value is non-numeric. Returns a `NULL` value for numeric columns.
- `weight`: a `FLOAT64` value that contains the [weight](https://developers.google.com/machine-learning/glossary/#weight) of each feature.
- `standard_error`: a `FLOAT64` value that contains the [standard error](https://en.wikipedia.org/wiki/Standard_error) of the weight.
- `p_value`: a `FLOAT64` value that contains the
  [p-value](https://en.wikipedia.org/wiki/P-value) that was tested against
  the null hypothesis. The p-value for feature $j$ is calculated using the
  following formula:

  $$ p(j) = 2 \* (1 - stats.norm.cdf(abs(\\hat\\beta_j), loc=0, scale=\\sigma_j)) $$

  such that $\\hat\\beta_j$ is the weight of feature $j$ after training
  and $\\sigma_j$ is its standard error.

If the [`TRANSFORM` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#transform)
was used in the `CREATE MODEL` statement that created the model,
`ML.ADVANCED_WEIGHTS` outputs the weights of the `TRANSFORM` output
features. The weights are denormalized by default, with the option to get
normalized weights, exactly like models that are created without
`TRANSFORM`.

### Permissions

You must have the `bigquery.models.create` and`bigquery.models.getData`
[Identity and Access Management (IAM) permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions)
in order to run `ML.ADVANCED_WEIGHTS`.

### Limitations

The total cardinality of training features must be less than 1,000. This
limitation is the result of the
[limitations of computing p-values and standard error](#usage-requirements)
when you set the `CALCULATE_P_VALUES` option to `TRUE` when training
the model.

### Examples

The following examples demonstrate `ML.ADVANCED_WEIGHTS` with and without
standardization.

#### Without standardization

The following example retrieves weight information from `mymodel` in
`mydataset` where the dataset is in your default project.

The query returns the weights associated with each one-hot encoded category for
the input column `input_col`.

```sql
SELECT
  *
FROM
  ML.ADVANCED_WEIGHTS(MODEL `mydataset.mymodel`,
    STRUCT(FALSE AS standardize))
```

> [!NOTE]
> **Note:** Because un-standardizing the standard error for the intercept column is computationally expensive, the standard error and p-value aren't provided. If the standard error and p-value for the intercept are required, then set the `STANDARDIZE` argument to `TRUE`.

#### With standardization

The following example retrieves weight information from `mymodel` in
`mydataset`. The dataset is in your default project.

The query retrieves standardized weights, which assume all features have a mean
of `0` and a standard deviation of `1.0`.

```sql
SELECT
  *
FROM
  ML.ADVANCED_WEIGHTS(MODEL `mydataset.mymodel`,
    STRUCT(TRUE AS standardize))
```

### What's next

- For information about Explainable AI, see [BigQuery Explainable AI overview](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-xai-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-advanced-weights (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
