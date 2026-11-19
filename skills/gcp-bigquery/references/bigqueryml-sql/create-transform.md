---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-transform
---

# The CREATE MODEL statement for transform-only models

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating
transform-only models in BigQuery. Transform-only models use the
[`TRANSFORM` clause](create.md#transform)
to apply [preprocessing functions](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing)
to input data and return the preprocessed data. Transform-only models decouple
data preprocessing from model training, making it easier for you to capture and
reuse a set of data preprocessing rules.

You can use a transform-only model in conjunction with the
[`ML.TRANSFORM` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-transform)
to provide preprocessed data to other models:

- You can use it in the [query statement](create.md#query_statement) when creating another model, in order to use the transformed data as the training data for that model.
- You can use it in the [`query statement` argument](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict#arguments) of the `ML.PREDICT` function, in order to provide data for prediction that is processed in the way the target model expects.

For batch feature transformations, it is better to use transform-only models
because it lets you process large amounts of data in a short time. For online
feature transformations, it is better to use
[Vertex AI Feature Store](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/featurestore/latest/overview)
because it provides responses with low latency.

You can also use a transform-only model with the
[`ML.FEATURE_INFO` function](feature.md)
in order to return information about feature transformations in the model.

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL} model_name
TRANSFORM (select_list)
OPTIONS(MODEL_TYPE = 'TRANSFORM_ONLY')
AS query_statement
```

#### `CREATE MODEL`

Creates and trains a new model in the specified dataset. If the model name
exists, `CREATE MODEL` returns an error.

#### `CREATE MODEL IF NOT EXISTS`

Creates and trains a new model only if the model doesn't exist in the
specified dataset.

#### `CREATE OR REPLACE MODEL`

Creates and trains a model and replaces an existing model with the same name in
the specified dataset.

#### `model_name`

The name of the model you're creating or replacing. The model
name must be unique in the dataset: no other model or table can have the same
name. The model name must follow the same naming rules as a
BigQuery table. A model name can:

- Contain up to 1,024 characters
- Contain letters (upper or lower case), numbers, and underscores

`model_name` is case-sensitive.

If you don't have a default project configured, then you must prepend the
project ID to the model name in the following format, including backticks:

\`\[PROJECT_ID\].\[DATASET\].\[MODEL\]\`

For example, \`myproject.mydataset.mymodel\`.

#### `select_list`

You can pass columns from `query_statement` through to model training without
transformation by either using `*`, `* EXCEPT()`, or by listing
the column names directly.

Not all columns from `query_statement` are required to appear in the `TRANSFORM`
clause, so you can drop columns appearing in `query_statement` by omitting
them from the `TRANSFORM` clause.

You can transform inputs from `query_statement` by using expressions in
`select_list`. `select_list` is similar to a normal `SELECT` statement.
`select_list` supports the following syntax:

- `*`
- `* EXCEPT()`
- `* REPLACE()`
- `expression`
- `expression.*`

The following cannot appear inside `select_list`:

- Aggregation functions.
- Non-BigQuery ML analytic functions. For more information about supported functions, see [Manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing).
- UDFs.
- Subqueries.
- Anonymous columns. For example, `a + b as c` is allowed, while `a + b` isn't.

The output columns of `select_list` can be of any BigQuery
supported data type.

If present, the following columns must appear in `select_list` without
transformation:

- `label`
- `data_split_col`
- `kmeans_init_col`
- `instance_weight_col`

If these columns are returned by `query_statement`, you must reference them in
`select_list` by column name outside of any expression, or by using `*`. You
can't use aliases with these columns.

#### `MODEL_TYPE`

**Syntax**

```sql
MODEL_TYPE = 'TRANSFORM_ONLY'
```

**Description**

Specify the model type. This option is required.

#### `query_statement`

The
[GoogleSQL query](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
that contains the data to preprocess. The statistics that are calculated
when transforming this data are applied to the input data of any functions
that you use the model with.

### Examples

The following examples show how to create and use transform-only models.

**Example 1**

The following example creates a model named `transform_model` in `mydataset` in your
default project. The model transforms several columns from the
BigQuery public table `bigquery-public-data.ml_datasets.penguins`:

```sql
CREATE MODEL `mydataset.transform_model`
  TRANSFORM(
    species,
    island,
    ML.MAX_ABS_SCALER(culmen_length_mm) OVER () AS culmen_length_mm,
    ML.MAX_ABS_SCALER(culmen_depth_mm) OVER () AS culmen_depth_mm,
    ML.MAX_ABS_SCALER(flipper_length_mm) OVER () AS flipper_length_mm,
    sex,
    body_mass_g)
  OPTIONS (
    model_type = 'transform_only')
AS (
  SELECT *
  FROM `bigquery-public-data.ml_datasets.penguins`
);
```

**Example 2**

The following example creates a model named `mymodel` in `mydataset` in your
default project. The model is trained on data that is preprocessed by using
a transform-only model:

```sql
CREATE MODEL `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE = 'LINEAR_REG',
    MAX_ITERATIONS = 5,
    INPUT_LABEL_COLS = ['body_mass_g'] ) AS
SELECT
  *
FROM
  ML.TRANSFORM(
    MODEL `mydataset.transform_model`,
    TABLE `bigquery-public-data.ml_datasets.penguins`)
WHERE body_mass_g IS NOT NULL;
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-transform (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
