---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-principal-components
---

# The ML.PRINCIPAL_COMPONENTS function

## Signature / Usage

This document describes the `ML.PRINCIPAL_COMPONENTS` function, which lets you
see the principal components of a principal component analysis (PCA) model.
Principal components and
[eigenvectors](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors)
are the same concepts in PCA models.

### Syntax

```sql
ML.PRINCIPAL_COMPONENTS(
  MODEL `PROJECT_ID.DATASET.MODEL`
)
```

#### Arguments

`ML.PRINCIPAL_COMPONENTS` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL`: the name of the model.

### Output

`ML.PRINCIPAL_COMPONENTS` returns the following columns:

- `principal_component_id`: an `INT64` that contains the principal component ID.
- `feature`: a `STRING` value that contains the feature column name.
- `numerical_value`: a `FLOAT64` value that contains the feature value for the principal component that `principal_component_id` identifies if the column identified by the `feature` value is numeric. Otherwise, `numerical_value` is `NULL`.
- `categorical_value`: an `ARRAY<STRUCT>` value that contains information
  about categorical features. Each struct contains the following fields:

  - `categorical_value.category`: a `STRING` value that contains the name of each category.
  - `categorical_value.value`: a `FLOAT64` value that contains the value of `categorical_value.category` for the principal component that `principal_component_id` identifies.

The output is in descending order by the eigenvalues of the principal
components, which you can get by using the
[`ML.PRINCIPAL_COMPONENT_INFO` function](principal-component-info.md).

### Example

The following example retrieves the principal components from the model
`mydataset.mymodel` in your default project:

```sql
SELECT
  *
FROM
  ML.PRINCIPAL_COMPONENTS(MODEL `mydataset.mymodel`)
```

### What's next

- For more information about model weights support in BigQuery ML, see [BigQuery ML model weights overview](https://docs.cloud.google.com/bigquery/docs/weights-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-principal-components (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
