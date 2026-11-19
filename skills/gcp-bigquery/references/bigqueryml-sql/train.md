---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-train
---

# The ML.TRAINING_INFO function

## Signature / Usage

This document describes the `ML.TRAINING_INFO` function, which lets you see
information about the training iterations of a model.

You can run `ML.TRAINING_INFO` while the `CREATE MODEL`
statement for the target model is running, or you can wait until after the
`CREATE MODEL` statement completes. If you run `ML.TRAINING_INFO` before the
first training iteration of the `CREATE MODEL` statement completes, the query
returns a `Not found` error.

### Syntax

Adapted (not in the official docs): the trailing comma after the only argument is removed.

```sql
ML.TRAINING_INFO(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`
)
```

#### Arguments

`ML.TRAINING_INFO` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL_NAME`: the name of the model. For more information about which models are supported, see [Model creation user journeys](https://docs.cloud.google.com/bigquery/docs/e2e-journey#model_creation_phase).

### Output

`ML.TRAINING_INFO` returns the following columns:

- `training_run`: an `INT64` value that contains the training run identifier for the model. The value in this column is `0` for a newly created model. If you retrain the model using the `warm_start` argument of the `CREATE MODEL` statement, this value is incremented.
- `iteration`: an `INT64` value that contains the iteration number of the training run. The value for the first iteration is `0`. This value is incremented for each additional training run.
- `loss`: a `FLOAT64` value that contains the loss metric calculated after
  an iteration on the training data:

  - For logistic regression models, this is [log loss](https://developers.google.com/machine-learning/glossary/#Log_Loss).
  - For linear regression models, this is [mean squared error](https://developers.google.com/machine-learning/glossary/#MSE).
  - For multiclass logistic regressions, this is [cross-entropy log loss](https://developers.google.com/machine-learning/glossary/#cross-entropy).
  - For explicit matrix factorization models this is mean squared error calculated over the seen input ratings.
  - For implicit matrix factorization models, the loss is calculated using the following formula:

  $$ Loss = \\sum_{u, i} c_{ui}(p_{ui} - x\^T_uy_i)\^2 + \\lambda(\\sum_u\|\|x_u\|\|\^2 + \\sum_i\|\|y_i\|\|\^2) $$

  For more information about what the variables mean, see
  [Feedback types](create-matrix-factorization.md#feedback-types).
- `eval_loss`: a `FLOAT64` value that contains the loss metric calculated on the
  holdout data. For k-means models, `ML.TRAINING_INFO` doesn't return an
  `eval_loss` column. If the
  [`DATA_SPLIT_METHOD`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#data_split_method)
  argument is `NO_SPLIT`, then all entries in the `eval_loss` column are `NULL`.

- `learning_rate`: a `FLOAT64` value that contains the
  [learning rate](https://developers.google.com/machine-learning/glossary/#learning_rate)
  in this iteration.

- `duration_ms`: an `INT64` value that contains how long the iteration took,
  in milliseconds.

- `cluster_info`: an `ARRAY<STRUCT>` value that contains the
  fields `centroid_id`, `cluster_radius`, and `cluster_size`.
  `ML.TRAINING_INFO` computes `cluster_radius` and `cluster_size` with
  standardized features. Only returned for k-means models.

> [!NOTE]
> **Note:** For linear and logistic regression models, the `learning_rate` value can increase over the course of training if the [`LEARN_RATE_STRATEGY`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#learn_rate_strategy) argument isn't set to `CONSTANT`. This increase is due to the fact that when the `LEARN_RATE_STRATEGY` is set to `LINE_SEARCH`, four learning rates are generated from [`LS_INIT_LEARN_RATE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#ls_init_learn_rate). For example, if `LS_INIT_LEARN_RATE` is `0.1`, then the first iteration of training compares the respective loss from a set of four different models trained from setting the learn rate to `0.2`, `0.1`, `0.05`, and `0.025`. If `LEARN_RATE=0.2` generates the model with the smallest loss, then the next iteration generates four models with the learning rate set to `0.4`, `0.2`, `0.1`, `0.05` from the previous best fit model, and this process continues until the model converges.

### Permissions

You must have the `bigquery.models.create` and `bigquery.models.getData`
[Identity and Access Management (IAM) permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions)
in order to run `ML.TRAINING_INFO`.

### Limitations

`ML.TRAINING_INFO` is subject to the following limitations:

- `ML.TRAINING_INFO` doesn't support [imported TensorFlow models](create-tensorflow.md).
- For [time series models](create-time-series.md), `ML.TRAINING_INFO` only returns three columns: `training_run`, `iteration`, and `duration_ms`. It doesn't expose the training information per iteration, or per time series if multiple time series are forecasted at once. The `duration_ms` is the total time cost for the entire process.

### Example

The following example retrieves training information from the model
`mydataset.linear_regression` in your default project:

```sql
SELECT
  *
FROM
  ML.TRAINING_INFO(MODEL `mydataset.linear_regression`)
```

The result is similar to the following:

```text
+--------------+-----------+----------+-----------+---------------+-------------+
| training_run | iteration | loss     | eval_loss | learning_rate | duration_ms |
+--------------+-----------+----------+-----------+---------------+-------------+
| 0            | 1         | 16637.8  | 269004.9  | 0.6           | 2720        |
| 0            | 0         | 145701.3 | 368150.2  | 0.3           | 6313        |
+--------------+-----------+----------+-----------+---------------+-------------+
```

### What's next

- For more information about model evaluation, see [BigQuery ML model evaluation overview](https://docs.cloud.google.com/bigquery/docs/evaluate-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-train (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax block has a trailing comma after the `MODEL` argument, which is the only argument. It is removed, as in the example on this page (`ML.TRAINING_INFO(MODEL `mydataset.linear_regression`)`).
- Caution: the `iteration` column is described as incremented "for each additional training run", but the `training_run` column above it is the one incremented by retraining, and the example shows iterations `1` and `0` inside training run `0`. The official text is kept as published.

## Related

- [Index of this directory](./README.md)
