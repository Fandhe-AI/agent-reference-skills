---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-reconstruction-loss
---

# The ML.RECONSTRUCTION_LOSS function

## Signature / Usage

This document describes the `ML.RECONSTRUCTION_LOSS` function, which you can use
to compute the reconstruction losses between the input and output data of an
[autoencoder model](create-autoencoder.md).

### Syntax

```sql
ML.RECONSTRUCTION_LOSS(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }
)
```

#### Arguments

`ML.RECONSTRUCTION_LOSS` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input data table.

  If you specify `TABLE`, the input column names in the table must match
  the column names in the model, and their types must be compatible according to
  BigQuery [implicit coercion rules](../googlesql-syntax/conversion_rules.md#coercion).
- `QUERY_STATEMENT`: the GoogleSQL
  query to use for input data to generate the reconstruction losses. For
  the supported SQL syntax of the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax).

  If you specify `QUERY_STATEMENT`, the input column names from the query must
  match the column names in the model, and their types must be compatible
  according to BigQuery [implicit coercion rules](../googlesql-syntax/conversion_rules.md#coercion).

  If you used the
  [`TRANSFORM` clause](create.md#transform)
  in the `CREATE MODEL` statement that created the model,
  then you can only use the input columns present in the `TRANSFORM` clause
  in the `QUERY_STATEMENT`.

### Output

`ML.RECONSTRUCTION_LOSS` returns the following columns:

- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the model.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the model.
- `mean_squared_log_error`: a `FLOAT64` value that contains the mean squared log error for the model.

### Limitations

`ML.RECONSTRUCTION_LOSS` doesn't support
[imported TensorFlow models](create-tensorflow.md).

### Example

The following query computes reconstruction losses for the model
`mydataset.mymodel` in your default project:

```sql
SELECT *
FROM ML.RECONSTRUCTION_LOSS(
  MODEL `mydataset.mymodel`,
  (SELECT column1,
          column2,
          column3,
          column4
   FROM `mydataset.mytable`)
)
```

### What's next

- For more information about model evaluation, see [BigQuery ML model evaluation overview](https://docs.cloud.google.com/bigquery/docs/evaluate-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-reconstruction-loss (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
