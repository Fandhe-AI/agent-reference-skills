---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-trial-info
---

# The ML.TRIAL_INFO function

## Signature / Usage

This document describes the `ML.TRIAL_INFO` function, which lets you display
information about trials from a model that uses
[hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview).

You can use this function with models that support
[hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview). For more
information, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### Syntax

```sql
ML.TRIAL_INFO(MODEL `PROJECT_ID.DATASET.MODEL_NAME`)
```

#### Arguments

`ML.TRIAL_INFO` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL_NAME`: The name of the model.

### Output

`ML.TRIAL_INFO` returns one row per trial with the following columns:

- `trial_id`: an `INT64` value that contains the ID assigned to each trial in the approximate order of trial execution. `trial_id` values start from `1`.
- `hyperparameters`: a `STRUCT` value that contains the hyperparameters used in the trial.
- `hparam_tuning_evaluation_metrics`: a `STRUCT` value that contains the evaluation metrics appropriate to the hyperparameter tuning objective specified by the [`hparam_tuning_objectives` argument](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#hparam_tuning_objectives) in the `CREATE MODEL` statement. Metrics are calculated from the evaluation data. For more information about the datasets used in hyperparameter tuning, see [Data split](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#data_split).
- `training_loss`: a `FLOAT64` value that contains the loss of the trial during the last iteration, calculated using the training data.
- `eval_loss`: a `FLOAT64` value that contains the loss of the trial during the last iteration, calculated using the evaluation data.
- `status`: a `STRING` value that contains the final status of the trial.
  Possible values include the following:

  - `SUCCEEDED`: the trial succeeded.
  - `FAILED`: the trial failed.
  - `INFEASIBLE`: the trial was not run due to an invalid combination of hyperparameters.
- `error_message`: a `STRING` value that contains the error message that is
  returned if the trial didn't succeed. For more information, see
  [Error handling](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#error_handling).

- `is_optimal`: a `BOOL` value that indicates whether the trial had the best
  objective value. If multiple trials are marked as optimal, then the trial
  with the smallest `trial_id` value is used as the default trial during model
  serving.

### Example

The following query retrieves information of all trials for the model
`mydataset.mymodel` in your default project:

```sql
SELECT
  *
FROM
  ML.TRIAL_INFO(MODEL `mydataset.mymodel`)
```

### What's next

- For information about hyperparameter tuning, see [Hyperparameter tuning overview](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-trial-info (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
