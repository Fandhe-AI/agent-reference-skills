---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-global-explain
---

# The ML.GLOBAL_EXPLAIN function

## Signature / Usage

This document describes the `ML.GLOBAL_EXPLAIN` function, which lets you provide
explanations for the entire model by aggregating the local explanations of the evaluation data. You can only use `ML.GLOBAL_EXPLAIN` with models that are trained with the
[`ENABLE_GLOBAL_EXPLAIN` option](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#enable_global_explain)
set to `TRUE`.

### Syntax

```sql
ML.GLOBAL_EXPLAIN(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  STRUCT(
    [CLASS_LEVEL_EXPLAIN AS class_level_explain]))
```

#### Arguments

`ML.GLOBAL_EXPLAIN` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL`: the name of the model.
- `CLASS_LEVEL_EXPLAIN`: a `BOOL` value that specifies
  whether global feature importances are returned for each class. Applies only
  to non-AutoML Tables classification models. When set to `FALSE`, the global
  feature importance of the entire model is returned rather than that of each
  class. The default value is `FALSE`.

  Regression models and AutoML Tables classification models only have
  model-level global feature importance.

### Output

The output of `ML.GLOBAL_EXPLAIN` has two formats:

- For classification models with `class_level_explain` set
  to `FALSE`, and for regression models, the following columns are returned:

  - `feature`: a `STRING` value that contains the feature name.
  - `attribution`: a `FLOAT64` value that contains the feature importance to the model overall.
- For classification models with `class_level_explain` set to `TRUE`,
  the following columns are returned:

  - `<class_name>`: a `STRING` value that contains the name of the class in the label column.
  - `feature`: a `STRING` value that contains the feature name.
  - `attribution`: a `FLOAT64` value that contains the feature importance to this class.

  For each class, only the top 10 most important features are returned.

### Examples

The following examples assume your model is in your default project.

#### Regression model

This example gets global feature importance for the boosted tree regression
model `mymodel` in `mydataset`. The dataset is in your default project.

```sql
SELECT
  *
FROM
  ML.GLOBAL_EXPLAIN(MODEL `mydataset.mymodel`)
```

#### Classifier model

This example gets global feature importance for the boosted tree classifier
model `mymodel` in `mydataset`. The dataset is in your default project.

```sql
SELECT
  *
FROM
  ML.GLOBAL_EXPLAIN(MODEL `mydataset.mymodel`, STRUCT(TRUE AS class_level_explain))
```

### What's next

- For information about Explainable AI, see [BigQuery Explainable AI overview](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-xai-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-global-explain (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
