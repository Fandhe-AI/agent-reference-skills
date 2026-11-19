---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-feature
---

# The ML.FEATURE_INFO function

## Signature / Usage

This document describes the `ML.FEATURE_INFO` function, which lets you see
information about the input features that are used to train a model.

For more information about which models support this function, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### Syntax

```sql
ML.FEATURE_INFO(MODEL `PROJECT_ID.DATASET.MODEL_NAME`)
```

#### Arguments

`ML.FEATURE_INFO` takes the following arguments:

- `PROJECT_ID`: Your project ID.
- `DATASET`: The BigQuery dataset that contains the model.
- `MODEL_NAME`: The name of the model.

### Output

`ML.FEATURE_INFO` returns the following columns:

- `input`: a `STRING` value that contains the name of the column in the input training data.
- `min`: a `FLOAT64` value that contains the minimum value in the `input` column. `min` is `NULL` for non-numeric inputs.
- `max`: a `FLOAT64` value that contains the maximum value in the `input` column. `max` is `NULL` for non-numeric inputs.
- `mean`: a `FLOAT64` value that contains the average value for the `input` column. `mean` is `NULL` for non-numeric inputs.
- `median`: a `FLOAT64` value that contains the median value for the `input` column. `median` is `NULL` for non-numeric inputs.
- `stddev`: a `FLOAT64` value that contains the standard deviation value for the `input` column. `stddev` is `NULL` for non-numeric inputs.
- `category_count`: an `INT64` value that contains the number of categories in the `input` column. `category_count` is `NULL` for non-categorical columns.
- `null_count`: an `INT64` value that contains the number of `NULL` values in the `input` column.
- `dimension`: an `INT64` value that contains the dimension of the `input` column if the `input` column has a `ARRAY<STRUCT>` type. `dimension` is `NULL` for non-`ARRAY<STRUCT>` columns.

For [matrix factorization](create-matrix-factorization.md)
models, only `category_count` is calculated for the `user` and `item`
columns.

If you used the
[`TRANSFORM` clause](create.md#transform)
in the `CREATE MODEL` statement that created the model, `ML.FEATURE_INFO`
outputs the information of the pre-transform columns from the
`query_statement` argument.

### Permissions

You must have the `bigquery.models.create` and `bigquery.models.getData`
[Identity and Access Management (IAM) permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions)
in order to run `ML.FEATURE_INFO`.

### Limitations

`ML.FEATURE_INFO` doesn't support
[imported TensorFlow models](create-tensorflow.md).

### Example

The following example retrieves feature information from the model
`mydataset.mymodel` in your default project:

```sql
SELECT
  *
FROM
  ML.FEATURE_INFO(MODEL `mydataset.mymodel`)
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-feature (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
