---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-importance
---

# The ML.FEATURE_IMPORTANCE function

## Signature / Usage

This document describes the `ML.FEATURE_IMPORTANCE` function, which lets you
see the feature importance score. This score indicates how useful or valuable
each feature was in the construction of a boosted tree or a random forest model
during training. For more information, see the
[`feature_importances` property](https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBRegressor.feature_importances_)
in the XGBoost library.

### Syntax

```sql
ML.FEATURE_IMPORTANCE(
  MODEL `PROJECT_ID.DATASET.MODEL`
)
```

#### Arguments

`ML.FEATURE_IMPORTANCE` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL`: the name of the model.

### Output

`ML.FEATURE_IMPORTANCE` returns the following columns:

- `feature`: a `STRING` value that contains the name of the feature column in the input training data.
- `importance_weight`: a `FLOAT64` value that contains the number of times a feature is used to split the data across all trees.
- `importance_gain`: a `FLOAT64` value that contains the average gain across all splits the feature is used in.
- `importance_cover`: a `FLOAT64` value that contains the average coverage across all splits the feature is used in.

If the [`TRANSFORM` clause](create.md#transform)
was used in the `CREATE MODEL` statement that created the model,
`ML.FEATURE_IMPORTANCE` returns the information of the pre-transform columns
from the `query_statement` clause of the `CREATE MODEL` statement.

### Permissions

You must have the `bigquery.models.create` and `bigquery.models.getData`
[Identity and Access Management (IAM) permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions)
in order to run `ML.FEATURE_IMPORTANCE`.

### Limitations

`ML.FEATURE_IMPORTANCE` is only supported with
[boosted tree models](create-boosted-tree.md)
and
[random forest models](create-random-forest.md).

### Example

This example retrieves feature importance from `mymodel` in
`mydataset`. The dataset is in your default project.

```sql
SELECT
  *
FROM
  ML.FEATURE_IMPORTANCE(MODEL `mydataset.mymodel`)
```

### What's next

- For more information about Explainable AI, see [BigQuery Explainable AI overview](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-xai-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-importance (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
