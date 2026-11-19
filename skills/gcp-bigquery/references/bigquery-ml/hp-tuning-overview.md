---
source: https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview
---

# Hyperparameter tuning overview

Hyperparameter tuning in BigQuery ML identifies the optimal set of arguments for an ML algorithm. It is enabled by specifying a value for the `NUM_TRIALS` option in the `CREATE MODEL` statement, and a hyperparameter is tuned by giving a search space (`HPARAM_RANGE` or `HPARAM_CANDIDATES`) instead of a single value.

## Signature / Usage

### Conditional hyperparameters

```sql
BOOSTER_TYPE = HPARAM_CANDIDATES(['DART', 'GBTREE'])
DART_NORMALIZE_TYPE = HPARAM_CANDIDATES(['TREE', 'FOREST'])
```

## Options / Props

### Model types that support tuning with `NUM_TRIALS`

| Model type |
|------------|
| Linear and logistic regression |
| K-means |
| Matrix factorization |
| Autoencoder |
| Boosted trees |
| Random forest |
| Deep neural network (DNN) |
| Wide & Deep network |

AutoML Tables models have automatic tuning embedded in training. `ARIMA_PLUS` models use the `AUTO_ARIMA` argument (auto.ARIMA tunes the trend module only, not the entire modeling pipeline); neither lets you specify particular values.

### Search space keywords

| Keyword | Value | Example |
|---------|-------|---------|
| `HPARAM_RANGE` | Two-element `ARRAY(FLOAT64)` with min and max bounds of continuous values | `LEARN_RATE = HPARAM_RANGE(0.0001, 1.0)` |
| `HPARAM_CANDIDATES` | `ARRAY(STRUCT)` of discrete values | `OPTIMIZER = HPARAM_CANDIDATES(['ADAGRAD', 'SGD', 'FTRL'])` |

### Objectives and selected hyperparameters

| Model type | Objectives (default marked) | Hyperparameter: valid range / default range / scale |
|------------|-----------------------------|------------------------------------------------------|
| `LINEAR_REG` | `MEAN_ABSOLUTE_ERROR`, `MEAN_SQUARED_ERROR`, `MEAN_SQUARED_LOG_ERROR`, `MEDIAN_ABSOLUTE_ERROR`, `R2_SCORE` (default), `EXPLAINED_VARIANCE` | `L1_REG`, `L2_REG`: `(0, ∞]` / `(0, 10]` / `LOG` |
| `LOGISTIC_REG` | `PRECISION`, `RECALL`, `ACCURACY`, `F1_SCORE`, `LOG_LOSS`, `ROC_AUC` (default) | `L1_REG`, `L2_REG`: `(0, ∞]` / `(0, 10]` / `LOG` |
| `KMEANS` | `DAVIES_BOULDIN_INDEX` | `NUM_CLUSTERS`: `[2, 100]` / `[2, 10]` / `LINEAR` |
| `MATRIX_FACTORIZATION` (explicit) | `MEAN_SQUARED_ERROR` | `NUM_FACTORS`: `[2, 200]` / `[2, 20]` / `LINEAR`; `L2_REG`: `(0, ∞)` / `(0, 10]` / `LOG` |
| `MATRIX_FACTORIZATION` (implicit) | `MEAN_AVERAGE_PRECISION` (default), `MEAN_SQUARED_ERROR`, `NORMALIZED_DISCOUNTED_CUMULATIVE_GAIN`, `AVERAGE_RANK` | `NUM_FACTORS`: `[2, 200]` / `[2, 20]` / `LINEAR`; `L2_REG`: `(0, ∞)` / `(0, 10]` / `LOG`; `WALS_ALPHA`: `[0, ∞)` / `[0, 100]` / `LINEAR` |
| `AUTOENCODER` | `MEAN_ABSOLUTE_ERROR`, `MEAN_SQUARED_ERROR` (default), `MEAN_SQUARED_LOG_ERROR` | `LEARN_RATE`, `BATCH_SIZE`, `L1_REG`, `L2_REG`, `L1_REG_ACTIVATION`, `DROPOUT`, `HIDDEN_UNITS`, `OPTIMIZER`, `ACTIVATION_FN` (ranges in the source table) |
| `DNN_CLASSIFIER` / `DNN_REGRESSOR` | Classifier: `PRECISION`, `RECALL`, `ACCURACY`, `F1_SCORE`, `LOG_LOSS`, `ROC_AUC` (default). Regressor: error metrics, `R2_SCORE` (default), `EXPLAINED_VARIANCE` | `BATCH_SIZE`, `DROPOUT`, `HIDDEN_UNITS`, `LEARN_RATE`, `OPTIMIZER`, `L1_REG`, `L2_REG`, `ACTIVATION_FN` (ranges in the source table) |
| `DNN_LINEAR_COMBINED_CLASSIFIER` / `_REGRESSOR` | Same objectives as DNN | `BATCH_SIZE`, `DROPOUT`, `HIDDEN_UNITS`, `L1_REG`, `L2_REG`, `ACTIVATION_FN` |
| `BOOSTED_TREE_CLASSIFIER` / `_REGRESSOR` | Same objectives as DNN | `LEARN_RATE`, `L1_REG`, `L2_REG`, `DROPOUT`, `MAX_TREE_DEPTH`, `SUBSAMPLE`, `MIN_SPLIT_LOSS`, `NUM_PARALLEL_TREE`, `MIN_TREE_CHILD_WEIGHT`, `COLSAMPLE_BYTREE`, `COLSAMPLE_BYLEVEL`, `COLSAMPLE_BYNODE`, `BOOSTER_TYPE` {`GBTREE`, `DART`}, `DART_NORMALIZE_TYPE` {`TREE`, `FOREST`}, `TREE_METHOD` {`AUTO`, `EXACT`, `APPROX`, `HIST`} |
| `RANDOM_FOREST_CLASSIFIER` / `_REGRESSOR` | Same objectives as DNN | `L1_REG`, `L2_REG`, `MAX_TREE_DEPTH`, `SUBSAMPLE`, `MIN_SPLIT_LOSS`, `NUM_PARALLEL_TREE`, `MIN_TREE_CHILD_WEIGHT`, `COLSAMPLE_BYTREE`, `COLSAMPLE_BYLEVEL`, `COLSAMPLE_BYNODE`, `TREE_METHOD` |

### Data split and error handling

| Topic | Behavior |
|-------|----------|
| Default split with `NUM_TRIALS` | Randomized, 80% training, 10% evaluation, 10% test |
| Training set only | `DATA_SPLIT_METHOD` = `NO_SPLIT` |
| Training and evaluation only | `DATA_SPLIT_TEST_FRACTION` = `0`; the evaluation set is then used as the test set for final metrics |
| Comparable metrics | Normal and tuned models compare only when split fractions are equal, for example `DATA_SPLIT_METHOD='RANDOM', DATA_SPLIT_EVAL_FRACTION=0.2` vs the same plus `DATA_SPLIT_TEST_FRACTION=0` |
| Canceled job | Successful trials remain usable |
| Invalid hyperparameters for a trial | Trial skipped, marked `INFEASIBLE` in `ML.TRIAL_INFO` |
| More than 50% of `NUM_TRIALS` fail with `INTERNAL_ERROR` | Training stops and returns a user error |
| Less than 50% fail with `INTERNAL_ERROR` | Training continues; failed trials marked `FAILED` in `ML.TRIAL_INFO` |
| Transfer learning | Default when `HPARAM_TUNING_ALGORITHM` is `VIZIER_DEFAULT`; requires same model type, same project, and the same or a subset search space as previously tuned models |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The Objectives table above condenses the source table; for the full valid / default ranges and scale type of the autoencoder, DNN, boosted tree and random forest hyperparameters, see the source page.
- `LOG` scale hyperparameters default to an open lower bound of `0`; set `0` with `HPARAM_RANGE` (for example `L1_REG = HPARAM_RANGE(0, 5)`); a value of `0` is converted to `1e-14`.
- Search start: with no search space, the search starts at the default value. With a space containing the default, it starts there; otherwise at the closest point (for `WALS_ALPHA` `[10, 20, 30]` the start is `30`, default is `40`).
- `DROPOUT` for boosted trees can only be tuned when `BOOSTER_TYPE` includes `'DART'`; limiting `BOOSTER_TYPE` to `HPARAM_CANDIDATES(['GBTREE'])` with a `DROPOUT` search space makes the tuning job fail.
- Recommended at least 10 trials per hyperparameter (total at least `10 * num_hyperparameters`).
- Serving functions: with input data, one trial is returned (optimal by default, or choose with `TRIAL_ID`): `ML.CONFUSION_MATRIX`, `ML.EVALUATE`, `ML.PREDICT`, `ML.RECOMMEND`, `ML.ROC_CURVE`. Without input data all trials are returned with `TRIAL_ID` first: `ML.CENTROIDS`, `ML.EVALUATE`, `ML.WEIGHTS`. `ML.TRAINING_INFO` is unsupported (use `ML.TRIAL_INFO`). `ML.EVALUATE` runs against the test data, `ML.TRIAL_INFO` against the evaluation data.
- Export: tuned models export with `EXPORT MODEL` (optimal trial by default or a specified trial). Cost is the sum of all executed trials, consistent with BigQuery ML pricing.
- The source page has no code block beyond the conditional example. Locations that support tuning are listed on the BigQuery ML locations page.

## Related

- [create-machine-learning-model.md](./create-machine-learning-model.md)
- [bqml-introduction.md](./bqml-introduction.md)
