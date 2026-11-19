---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-transform
---

# The ML.TRANSFORM function

## Signature / Usage

This document describes the `ML.TRANSFORM` function, which you can use
to preprocess feature data. This function processes input data by
applying the data transformations captured in the
[`TRANSFORM` clause](create.md#transform)
of an existing model. The statistics that were calculated for data
transformation during model training are applied to the input data of the function.

For more information about which models support this function, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### Syntax

```sql
ML.TRANSFORM(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) }
)
```

#### Arguments

`ML.TRANSFORM` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the BigQuery dataset that contains the resource.
- `MODEL_NAME`: the name of a model. The model must have been created by using a `CREATE MODEL` statement that includes a [`TRANSFORM` clause](create.md#transform) to manually preprocess feature data. You can check to see if a model uses a `TRANSFORM` clause by using the [`bq show` command](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_show) to look at the [model's metadata](https://docs.cloud.google.com/bigquery/docs/getting-model-metadata#get_model_metadata). If the model was trained using a `TRANSFORM` clause, the model metadata contains a section about the transform columns. The function returns an error if you specify a model that was trained without a `TRANSFORM` clause.
- `TABLE_NAME`: the name of the input table that
  contains the feature data to preprocess.

  If you specify a value for the `TABLE_NAME` argument, the input column names
  in the table must match the input column names in the model's `TRANSFORM`
  clause, and their types should be compatible according to
  BigQuery [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).
  You can get the input column names and data types from the
  [model's metadata](https://docs.cloud.google.com/bigquery/docs/getting-model-metadata#get_model_metadata),
  in the section about the feature columns.
- `QUERY_STATEMENT`: A query that generates the feature
  data to preprocess. For the supported SQL syntax of the `QUERY_STATEMENT`
  clause, see
  [GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you specify a value for the `QUERY_STATEMENT` argument, the input column
  names from the query must match the input column names in the model's
  `TRANSFORM` clause, and their types should be compatible according to
  BigQuery [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).
  You can get the input column names and data types from the
  [model's metadata](https://docs.cloud.google.com/bigquery/docs/getting-model-metadata#get_model_metadata),
  in the section about the feature columns.

### Output

`ML.TRANSFORM` returns the columns specified in the model's `TRANSFORM` clause.

### Example

The following example returns feature data that has been preprocessed by
using the `TRANSFORM` clause included in the model named `mydataset.mymodel`
in your default project.

Create the model that contains the `TRANSFORM` clause:

```sql
CREATE OR REPLACE MODEL `mydataset.mymodel`
  TRANSFORM(
    species,
    island,
    ML.MAX_ABS_SCALER(culmen_length_mm) OVER () AS culmen_length_mm,
    ML.MAX_ABS_SCALER(flipper_length_mm) OVER () AS flipper_length_mm,
    sex,
    body_mass_g)
  OPTIONS (
    model_type = 'linear_reg',
    input_label_cols = ['body_mass_g'])
AS (
  SELECT *
  FROM `bigquery-public-data.ml_datasets.penguins`
  WHERE body_mass_g IS NOT NULL
);
```

Return feature data preprocessed by the model's `TRANSFORM` clause:

```sql
SELECT
  *
FROM
  ML.TRANSFORM(
    MODEL `mydataset.mymodel`,
    TABLE `bigquery-public-data.ml_datasets.penguins`);
```

The result is similar to the following:

```text
+-------------------------------------+--------+---------------------+---------------------+--------+-----------------+-------------+
| species                             | island | culmen_length_mm    | flipper_length_mm   | sex    | culmen_depth_mm | body_mass_g |
--------------------------------------+--------+ ------------------- +---------------------+--------+-----------------+-------------+
| Adelie Penguin (Pygoscelis adeliae) | Dream  | 0.61409395973154368 | 0.79653679653679654 | Female | 18.4            | 3475.0      |
| Adelie Penguin (Pygoscelis adeliae) | Dream  | 0.66778523489932884 | 0.79653679653679654 | Male   | 19.1            | 4650.0      |
+-------------------------------------+--------+---------------------+---------------------+--------+-----------------+-------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-transform (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: the example output has a `culmen_depth_mm` column, but the `TRANSFORM` clause of the model created above (`species`, `island`, `culmen_length_mm`, `flipper_length_mm`, `sex`, `body_mass_g`) does not produce it, and `ML.TRANSFORM` returns the columns of the `TRANSFORM` clause. Either the output or the clause is wrong; the official text is kept as published.

## Related

- [Index of this directory](./README.md)
