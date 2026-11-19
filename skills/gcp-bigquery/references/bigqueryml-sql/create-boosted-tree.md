---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-boosted-tree
---

# The CREATE MODEL statement for boosted trees models using XGBoost

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating
[boosted trees](https://xgboost.readthedocs.io/en/stable/tutorials/model.html)
models in BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself. Boosted trees models are trained using the
[XGBoost library](https://xgboost.readthedocs.io/en/latest/).

You can use boosted trees regressor models with the
[`ML.PREDICT` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict)
to perform [regression](https://docs.cloud.google.com/bigquery/docs/regression-overview), and you can use
boosted trees classifier models with the `ML.PREDICT` function to
perform [classification](https://docs.cloud.google.com/bigquery/docs/classification-overview). You can use
both types of boosted trees models with the
`ML.PREDICT` function
to perform [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### `CREATE MODEL` syntax

Adapted (not in the official docs): the closing backtick of `'ONE_HOT_ENCODING'` is replaced with a single quote.

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL} model_name
OPTIONS(model_option_list)
AS query_statement

model_option_list:
MODEL_TYPE = { 'BOOSTED_TREE_CLASSIFIER' | 'BOOSTED_TREE_REGRESSOR' }
    [, APPROX_GLOBAL_FEATURE_CONTRIB = { TRUE | FALSE } ]
    [, CATEGORY_ENCODING_METHOD = { 'ONE_HOT_ENCODING' | 'TARGET_ENCODING' | 'LABEL_ENCODING' } ]
    [, BOOSTER_TYPE = { {'GBTREE' | 'DART'} | HPARAM_CANDIDATES([candidates]) } ]
    [, DART_NORMALIZE_TYPE = { {'TREE' | 'FOREST'} | HPARAM_CANDIDATES([candidates]) } ]
    [, NUM_PARALLEL_TREE = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, MAX_TREE_DEPTH = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, DROPOUT = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, L1_REG = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, L2_REG = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, LEARN_RATE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, TREE_METHOD = { {'AUTO' | 'EXACT' | 'APPROX' | 'HIST'} | HPARAM_CANDIDATES([candidates]) } ]
    [, MIN_TREE_CHILD_WEIGHT = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, COLSAMPLE_BYTREE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, COLSAMPLE_BYLEVEL = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, COLSAMPLE_BYNODE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, MIN_SPLIT_LOSS = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, SUBSAMPLE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, INSTANCE_WEIGHT_COL = string_value ]
    [, AUTO_CLASS_WEIGHTS = { TRUE | FALSE } ]
    [, CLASS_WEIGHTS = struct_array ]
    [, ENABLE_GLOBAL_EXPLAIN = { TRUE | FALSE } ]
    [, EARLY_STOP = { TRUE | FALSE } ]
    [, MIN_REL_PROGRESS = float64_value ]
    [, INPUT_LABEL_COLS = string_array ]
    [, MAX_ITERATIONS = int64_value ]
    [, DATA_SPLIT_METHOD = { 'AUTO_SPLIT' | 'RANDOM' | 'CUSTOM' | 'SEQ' | 'NO_SPLIT' } ]
    [, DATA_SPLIT_EVAL_FRACTION = float64_value ]
    [, DATA_SPLIT_TEST_FRACTION = float64_value ]
    [, DATA_SPLIT_COL = string_value ]
    [, NUM_TRIALS = int64_value ]
    [, MAX_PARALLEL_TRIALS = int64_value ]
    [, HPARAM_TUNING_ALGORITHM = { 'VIZIER_DEFAULT' | 'RANDOM_SEARCH' | 'GRID_SEARCH' } ]
    [, HPARAM_TUNING_OBJECTIVES = { 'ROC_AUC' | 'R2_SCORE' | ... } ]
    [, KMS_KEY_NAME = string_value ]
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

#### `MODEL_TYPE`

**Syntax**

```sql
MODEL_TYPE = { 'BOOSTED_TREE_CLASSIFIER' | 'BOOSTED_TREE_REGRESSOR' }
```

**Description**

Specifies the model type. This option is required.

#### `APPROX_GLOBAL_FEATURE_CONTRIB`

**Syntax**

```sql
APPROX_GLOBAL_FEATURE_CONTRIB = { TRUE | FALSE }
```

**Description**

Enables fast approximation for feature contributions. This capability is
provided by the XGBoost library; BigQuery ML only passes this
option through to it. For more information, see
[Package 'xgboost'](https://cran.r-project.org/web/packages/xgboost/xgboost.pdf)
and search for `approxcontrib`.

In order to use the fast approximation for feature contribution
computations, you need to set both `ENABLE_GLOBAL_EXPLAIN` and
`APPROX_GLOBAL_FEATURE_CONTRIB` to `TRUE`.

**Arguments**

A `BOOL` value. The default value is `TRUE` when `ENABLE_GLOBAL_EXPLAIN` is
`TRUE` and `NUM_PARALLEL_TREE >= 10`, otherwise it is `FALSE`.

#### `CATEGORY_ENCODING_METHOD`

**Syntax**

```sql
CATEGORY_ENCODING_METHOD = { 'ONE_HOT_ENCODING' | 'TARGET_ENCODING' | 'LABEL_ENCODING' }
```

**Description**

Specifies which encoding method to use on non-numeric features. For more
information about supported encoding methods, see
[BigQuery ML auto preprocessing](https://docs.cloud.google.com/bigquery/docs/auto-preprocessing).

**Arguments**

This option accepts the following values:

- `LABEL_ENCODING`. This is the default.
- `TARGET_ENCODING`
- `ONE_HOT_ENCODING`

#### `BOOSTER_TYPE`

**Syntax**

`
BOOSTER_TYPE = { { 'GBTREE' | 'DART'} | HPARAM_CANDIDATES([candidates]) }
`

**Description**

Specifies the booster type to use.

**Arguments**

This option accepts the following values:

- `GBTREE`: [tree-booster](https://xgboost.readthedocs.io/en/latest/parameter.html#parameters-for-tree-booster). This is the default.
- `DART`: [dart-booster](https://xgboost.readthedocs.io/en/latest/tutorials/dart.html)

If you are running hyperparameter training, you can provide more than one
value for this option by using `HPARAM_CANDIDATES` and specifying an array.
For example, `BOOSTER_TYPE = HPARAM_CANDIDATES(['GBTREE', 'DART'])`.

#### `DART_NORMALIZE_TYPE`

**Syntax**

`
DART_NORMALIZE_TYPE = { { 'TREE' | 'FOREST'} | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The type of normalization algorithm to use if you are using the `DART`
booster.

**Arguments**

This option accepts the following values:

- `TREE`: New trees have the same weight of each of the dropped trees. This is the default value.
- `FOREST`: New trees have the same weight of the sum of the dropped trees (forest).

If you are running hyperparameter training, you can provide more than one
value for this option by using `HPARAM_CANDIDATES` and specifying an array.
For example, `DART_NORMALIZE_TYPE = HPARAM_CANDIDATES(['TREE', 'FOREST'])`.

#### `NUM_PARALLEL_TREE`

**Syntax**

`
NUM_PARALLEL_TREE = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The number of parallel trees constructed during each iteration. To train a
boosted random forest model, set this value to larger than `1`.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify an `INT64`
value. The default value is `1`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `INT64` values that define the range of the hyperparameter. For example, `NUM_PARALLEL_TREE = HPARAM_RANGE(1, 5)`.
- The `HPARAM_CANDIDATES` keyword and an array of `INT64` values that provide discrete values to use for the hyperparameter. For example, `NUM_PARALLEL_TREE = HPARAM_CANDIDATES([0, 1, 3, 5])`.

When running hyperparameter tuning, the valid range is `(1, ∞]`, there
is no default range, and the scale type is `LINEAR`.

#### `MAX_TREE_DEPTH`

**Syntax**

`
MAX_TREE_DEPTH = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The maximum depth of a tree.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify an `INT64`
value. The default value is `6`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `INT64` values that define the range of the hyperparameter. For example, `MAX_TREE_DEPTH = HPARAM_RANGE(0, 4)`.
- The `HPARAM_CANDIDATES` keyword and an array of `INT64` values that provide discrete values to use for the hyperparameter. For example, `MAX_TREE_DEPTH = HPARAM_CANDIDATES([1, 5, 10, 15])`.

When running hyperparameter tuning, the valid range is `(1, 20]`, the default
range is `(1, 10]`, and the scale type is `LINEAR`.

#### `DROPOUT`

**Syntax**

`
DROPOUT = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

Specifies the dropout rate, which is the fraction of previous trees to drop
during the dropout.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value between `0` and `1.0`. The default value is `0`.

> [!NOTE]
> **Note:** The `DROPOUT` parameter is only applicable when the `BOOSTER_TYPE` is set to `'DART'`. If you are using hyperparameter tuning, ensure that `'DART'` is included in the `HPARAM_CANDIDATES` for `BOOSTER_TYPE` if you intend to tune `DROPOUT`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `DROPOUT = HPARAM_RANGE(0, 0.6)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `DROPOUT = HPARAM_CANDIDATES([0, 0.1, 0.2, 0.6])`.

When running hyperparameter tuning, the valid range is `(0, 1.0]`, there is no
default range, and the scale type is `LINEAR`.

#### `L1_REG`

**Syntax**

`
L1_REG = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The amount of
[L1 regularization](https://developers.google.com/machine-learning/glossary/#L1_regularization)
applied.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a
`FLOAT64` value. The default value is `0`.

If you are running hyperparameter tuning, then you can use one of the
following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range to use for the hyperparameter. For example, `L1_REG = HPARAM_RANGE(0, 5.0)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `L1_REG = HPARAM_CANDIDATES([0, 1.0, 3.0, 5.0])`.

When running hyperparameter tuning, the valid range is
`(0, ∞)`, the default range is `(0, 10.0]`, and the scale
type is `LOG`.

#### `L2_REG`

**Syntax**

`
L2_REG = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The amount of
[L2 regularization](https://developers.google.com/machine-learning/glossary/#L2_regularization)
applied.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a
`FLOAT64` value. The default value is `1.0`.

If you are running hyperparameter tuning, then you can use one of the
following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range to use for the hyperparameter. For example, `L2_REG = HPARAM_RANGE(1.5, 5.0)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `L2_REG = HPARAM_CANDIDATES([0, 1.0, 3.0, 5.0])`.

When running hyperparameter tuning, the valid range is `(0, ∞)`, the
default range is `(0, 10.0]`, and the scale type is `LOG`.

#### `LEARN_RATE`

**Syntax**

`
LEARN_RATE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

`LEARN_RATE` is the step size shrinkage used in updates to prevents overfitting.
After each boosting step, `LEARN_RATE` shrinks the feature weights to make the
boosting process more conservative.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value. The default value is `0.3`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `LEARN_RATE = HPARAM_RANGE(0, 0.5)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `LEARN_RATE = HPARAM_CANDIDATES([0, 0.1, 0.3, 0.5])`.

When running hyperparameter tuning, the valid range is `(0, ∞]`, the
default range is `(0, 1.0]`, and the scale type is `LINEAR`.

#### `TREE_METHOD`

**Syntax**

`
TREE_METHOD = { { 'AUTO' | 'EXACT' | 'APPROX' | 'HIST'} | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The type of tree construction algorithm.

`HIST` is recommended for large datasets in order to increase training
speed and reduce resource consumption. For more information, see
[tree booster](https://xgboost.readthedocs.io/en/latest/parameter.html#parameters-for-tree-booster).

**Arguments**

This option accepts the following values:

- `AUTO`: Faster histogram optimized approximate greedy algorithm. This is the default.
- `EXACT`: Exact greedy algorithm. Enumerates all split candidates.
- `APPROX`: Approximate greedy algorithm using quantile sketch and gradient histogram.
- `HIST`: Same as the `AUTO` tree method.

If you are running hyperparameter training, you can provide more than one
value for this option by using `HPARAM_CANDIDATES` and specifying an array.
For example, `TREE_METHOD = HPARAM_CANDIDATES(['APPROX', 'HIST'])`.

#### `MIN_TREE_CHILD_WEIGHT`

**Syntax**

`
MIN_TREE_CHILD_WEIGHT = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The minimum sum of instance weight needed in a child for further partitioning.
If the tree partition step results in a leaf node whose sum of instance
weight is less than `MIN_TREE_CHILD_WEIGHT`, then the building process stops
partitioning. The larger the `MIN_TREE_CHILD_WEIGHT` value is,
the more conservative the algorithm is.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify an `INT64`
value greater than or equal to `0`. The default value is `1`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `INT64` values that define the range of the hyperparameter. For example, `MIN_TREE_CHILD_WEIGHT = HPARAM_RANGE(0, 5)`.
- The `HPARAM_CANDIDATES` keyword and an array of `INT64` values that provide discrete values to use for the hyperparameter. For example, `MIN_TREE_CHILD_WEIGHT = HPARAM_CANDIDATES([0, 1, 3, 5])`.

When running hyperparameter tuning, the valid range is `[0, ∞)`,
there is no default range, and the scale type is `LINEAR`.

#### `COLSAMPLE_BYTREE`

**Syntax**

`
COLSAMPLE_BYTREE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The subsample ratio of columns when constructing each tree. Subsampling occurs
once for every tree constructed.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value between `0` and `1.0`. The default value is `1.0`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `COLSAMPLE_BYTREE = HPARAM_RANGE(0, 0.3)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `COLSAMPLE_BYTREE = HPARAM_CANDIDATES([0, 0.1, 0.3, 0.5])`.

When running hyperparameter tuning, the valid range is `[0, 1.0]`, there is
no default range, and the scale type is `LINEAR`.

#### `COLSAMPLE_BYLEVEL`

**Syntax**

`
COLSAMPLE_BYLEVEL = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The subsample ratio of columns for each level. Subsampling occurs once for every
new depth level reached in a tree. Columns are subsampled from the set of
columns chosen for the current tree.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value between `0` and `1.0`. The default value is `1.0`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `COLSAMPLE_BYLEVEL = HPARAM_RANGE(0, 0.3)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `COLSAMPLE_BYLEVEL = HPARAM_CANDIDATES([0, 0.1, 0.3, 0.5])`.

When running hyperparameter tuning, the valid range is `[0, 1.0]`, there is
no default range, and the scale type is `LINEAR`.

#### `COLSAMPLE_BYNODE`

**Syntax**

`
COLSAMPLE_BYNODE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The subsample ratio of columns for each node (split). Subsampling occurs once
for every time a new split is evaluated. Columns are subsampled from the set of
columns chosen for the current level.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value between `0` and `1.0`. The default value is `1.0`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `COLSAMPLE_BYNODE = HPARAM_RANGE(0, 0.3)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `COLSAMPLE_BYNODE = HPARAM_CANDIDATES([0, 0.1, 0.3, 0.5])`.

When running hyperparameter tuning, the valid range is `[0, 1.0]`, there is
no default range, and the scale type is `LINEAR`.

#### `MIN_SPLIT_LOSS`

**Syntax**

`
MIN_SPLIT_LOSS = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The minimum loss reduction required to make a further partition on a leaf node of
the tree. The larger the `MIN_SPLIT_LOSS` value is, the more conservative the
algorithm is.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value. The default value is `0`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `MIN_SPLIT_LOSS = HPARAM_RANGE(0, 5.5)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `MIN_SPLIT_LOSS = HPARAM_CANDIDATES([0, 0.5, 1.5, 2.5])`.

When running hyperparameter tuning, the valid range is `[0, ∞)`, there
is no default range, and the scale type is `LINEAR`.

#### `SUBSAMPLE`

**Syntax**

`
SUBSAMPLE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The subsample ratio of the training instances. Setting this value to `0.5` means
that training randomly samples half of the training data prior to growing trees,
which prevents overfitting. Subsampling occurs once in every boosting iteration.
This is independent of the training-test data split used in the training
options. The test data is not used in any iteration irrespective of the
`SUBSAMPLE` value; subsampling is only applied to the training data.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value between `0` and `1.0`. The default value is `1.0`, which
specifies that subsampling uses all of the training data in each iteration.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `SUBSAMPLE = HPARAM_RANGE(0, 0.6)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `SUBSAMPLE = HPARAM_CANDIDATES([0, 0.1, 0.2, 0.6])`.

When running hyperparameter tuning, the valid range is `(0, 1.0]`, the default
range is `(0, 1.0]`, and the scale type is `LINEAR`.

#### `INSTANCE_WEIGHT_COL`

**Syntax**

`INSTANCE_WEIGHT_COL = string_value`

**Description**

The column used to specify the weights for each data point in the
training dataset. The column you specify must be a numerical column. You can't
use this column as a feature or label, and it is excluded from features
automatically. You can't specify this option if `AUTO_CLASS_WEIGHTS` is `TRUE`
or if `CLASS_WEIGHTS` is set.

The `INSTANCE_WEIGHT_COL` option is only supported for non-array
features.

**Arguments**

A `STRING` value.

#### `AUTO_CLASS_WEIGHTS`

**Syntax**

```sql
AUTO_CLASS_WEIGHTS = { TRUE | FALSE }
```

**Description**

Determines whether to balance class labels by using weights for each class in
inverse proportion to the frequency of that class.

Only use this option with classifier models.

By default, the training data used to create the model
is unweighted. If the labels in the training data are imbalanced, the model
might learn to predict the most popular class of labels more heavily, which
you might not want.

To balance every class, set this option to `TRUE`. Balance is
accomplished using the following formula:

```sql
total_input_rows / (input_rows_for_class_n * number_of_unique_classes)
```

**Arguments**

A `BOOL` value. The default value is `FALSE`.

#### `CLASS_WEIGHTS`

**Syntax**

`
CLASS_WEIGHTS = struct_array
`

**Description**

The weights to use for each class label. You can't specify this option if
[`AUTO_CLASS_WEIGHTS`](#auto_class_weights) is `TRUE`.

**Arguments**

An `ARRAY` of `STRUCT` values. Each `STRUCT` contains a
`STRING` value that specifies the class label and a `FLOAT64` value that
specifies the weight for that class label. A weight must be present for every
class label. The weights are not required to add up to 1.

A `CLASS_WEIGHTS` value might look like the following example:

```sql
CLASS_WEIGHTS = [STRUCT('example_label', .2)]
```

#### `ENABLE_GLOBAL_EXPLAIN`

**Syntax**

```sql
ENABLE_GLOBAL_EXPLAIN = { TRUE | FALSE }
```

**Description**

Determines whether to compute global explanations by using
[explainable AI](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-xai-overview)
to evaluate the importance of global features to the model.

Global explanations are computed when you create the model. This option
must be `TRUE` if you want to use the
[`ML.GLOBAL_EXPLAIN` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-global-explain)
to retrieve the global explanations after the model is created.

**Arguments**

A `BOOL` value. The default value is `FALSE`.

#### `EARLY_STOP`

**Syntax**

```sql
EARLY_STOP = { TRUE | FALSE }
```

**Description**

Determines whether training should stop after the first iteration in which the
relative loss improvement is less than the value specified for
[`MIN_REL_PROGRESS`](#min_rel_progress).

**Arguments**

A `BOOL` value. The default value is `TRUE`.

#### `MIN_REL_PROGRESS`

**Syntax**

`
MIN_REL_PROGRESS = float64_value
`

**Description**

The minimum relative loss improvement that is necessary to continue training
when [`EARLY_STOP`](#early_stop) is set to `TRUE`. For example, a value of
`0.01` specifies that each iteration must reduce the loss by 1% for training
to continue.

**Arguments**

A `FLOAT64` value. The default value is `0.01`.

#### `INPUT_LABEL_COLS`

**Syntax**

`
INPUT_LABEL_COLS = string_array
`

**Description**

The name of the label column in the training data. The label column contains the
expected machine learning result for the given record. For example, in a spam
detection dataset, the label column value would probably be either `spam` or
`not spam`. In a rainfall dataset, the label column value might be the amount
of rain that fell during a certain period.

**Arguments**

A one-element `ARRAY` of string values. Defaults to `label`.

#### `MAX_ITERATIONS`

**Syntax**

`
MAX_ITERATIONS = int64_value
`

**Description**

The maximum number of rounds for boosting.

**Arguments**

An `INT64` value. The default value is `20`.

#### `DATA_SPLIT_METHOD`

**Syntax**

```sql
DATA_SPLIT_METHOD = { 'AUTO_SPLIT' | 'RANDOM' | 'CUSTOM' | 'SEQ' | 'NO_SPLIT' }
```

**Description**

The method used to split input data into training, evaluation, and, if you are
running hyperparameter tuning, test data sets. Training data is used to train
the model. Evaluation data is used to avoid
[overfitting](https://developers.google.com/machine-learning/glossary/#overfitting)
by using early stopping. Test data is used to test the hyperparameter tuning
trial and record its metrics in the model.

The percentage sizes of the data sets produced by the various arguments for
this option are approximate. Larger input data sets come closer to the
percentages described than smaller input data sets do.

You can see the model's data split information in the following ways:

- The data split method and percentage are shown in the **Training Options** section of the model's **Details** page on the BigQuery page of the Google Cloud console.
- Links to temporary tables that contain the split data are available in the **Model Details** section of the model's **Details** page on the BigQuery of the Google Cloud console. You can also return this information from the [`DataSplitResult` field](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/models#datasplitresult) in the BigQuery API. These tables are saved for 48 hours. If you need this information for more than 48 hours, then you should export this data or copy it to permanent tables.

**Arguments**

This option accepts the following values:

- `AUTO_SPLIT`: This is the default
  value. This option splits the data as follows:

  - If there are fewer than 500 rows in the input data, then all rows are used as training data.
  - If you aren't running hyperparameter tuning, then data is randomized and
    split as follows:

    - If there are between 500 and 50,000 rows in the input data, then 20% of the data is used as evaluation data and 80% is used as training data.
    - If there are more than 50,000 rows, then 10,000 rows are used as evaluation data and the remaining rows are used as training data.
  - If you are running hyperparameter tuning and there are more than 500 rows in
    the input data, then the data is randomized and split as follows:

    - 10% of the data is used as evaluation data
    - 10% is used as test data
    - 80% is used as training data

    For more information, see
    [Data split](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#data_split).
- `RANDOM`: Data is randomized before being split into sets. You can use this
  option with the [`DATA_SPLIT_EVAL_FRACTION`](#data_split_eval_fraction) and
  [`DATA_SPLIT_TEST_FRACTION`](#data_split_test_fraction)
  options to customize the data split. If you don't specify either of those
  options, data is split in the same way as for the `AUTO_SPLIT` option.

  A random split is deterministic: different training runs produce the same
  split results if the same underlying training data is used.

  > [!NOTE]
  > **Note:** A random split is based on the [FARM_FINGERPRINT](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions#farm_fingerprint) of the data (including the column name and schema), so tables with the same content but different column names and schemas may get different splitting and different evaluation metrics.

- `CUSTOM`: Split data using the value in a specified column:

  - If you aren't running hyperparameter tuning, then you must provide the name of a column of type `BOOL`. Rows with a value of `TRUE` or `NULL` are used as evaluation data, rows with a value of `FALSE` are used as training data.
  - If you are running hyperparameter tuning, then you must provide the name of a column of type `STRING`. Rows with a value of `TRAIN` are used as training data, rows with a value of `EVAL` are used as evaluation data, and rows with a value of `TEST` are used as test data.

  Use the [`DATA_SPLIT_COL` option](#data_split_col) to identify the column
  that contains the data split information.
- `SEQ`: Split data sequentially by using the value in a specified column of one
  of the following types:

  - `NUMERIC`
  - `BIGNUMERIC`
  - `STRING`
  - `TIMESTAMP`

  The data is sorted smallest to largest based on the specified column.

  When you aren't running hyperparameter tuning, the last <var translate="no">n</var> rows
  are used as evaluation data, where <var translate="no">n</var> is the value specified for
  `DATA_SPLIT_EVAL_FRACTION`. The remaining rows are used as training data.

  When you are running hyperparameter tuning, the last <var translate="no">m</var> rows
  are used as test data, where <var translate="no">m</var> is the value specified for
  `DATA_SPLIT_TEST_FRACTION`. The second last <var translate="no">n</var> rows are used as
  evaluation data, where <var translate="no">n</var> is the value specified for
  `DATA_SPLIT_EVAL_FRACTION`. The remaining rows are used as training data.

  All rows with split values smaller than the threshold, including `NULL`s,
  are used as training data. The remaining rows are used as evaluation data.

  Use the `DATA_SPLIT_COL` option to identify the column that contains the
  data split information.
- `NO_SPLIT`: No data split; all input data is used as training data.

#### `DATA_SPLIT_EVAL_FRACTION`

**Syntax**

`DATA_SPLIT_EVAL_FRACTION = float64_value`

**Description**

The fraction of the data to use as evaluation data. Use when you are
specifying `RANDOM` or `SEQ` as the value for the
[`DATA_SPLIT_METHOD` option](#data_split_method).

If you are running hyperparameter tuning and you specify a value for this
option, you must also specify a value for
[`DATA_SPLIT_TEST_FRACTION`](#data_split_test_fraction). In this
case, the training dataset is
`1 - eval_fraction - test_fraction`. For
example, if you specify `20.00` for `DATA_SPLIT_EVAL_FRACTION` and `8.0` for
`DATA_SPLIT_TEST_FRACTION`, your training dataset is 72% of the input data.

**Arguments**

A `FLOAT64` value. The default is `0.2`. The service maintains the accuracy of
the input value to two decimal places.

#### `DATA_SPLIT_TEST_FRACTION`

**Syntax**

`DATA_SPLIT_TEST_FRACTION = float64_value`

**Description**

The fraction of the data to use as test data. Use this option when you are
running hyperparameter tuning and specifying either `RANDOM` or `SEQ` as
value for the [`DATA_SPLIT_METHOD` option](#data_split_method).

If you specify a value for this option, you must also specify a value for
[`DATA_SPLIT_EVAL_FRACTION`](#data_split_eval_fraction). In this case,
the training dataset is
`1 - eval_fraction - test_fraction`.
For example, if you specify `20.00` for `DATA_SPLIT_EVAL_FRACTION` and `8.0` for
`DATA_SPLIT_TEST_FRACTION`, your training dataset is 72% of the input data.

**Arguments**

A `FLOAT64` value. The default is `0`. The service maintains the accuracy of
the input value to two decimal places.

#### `DATA_SPLIT_COL`

**Syntax**

`DATA_SPLIT_COL = string_value`

**Description**

The name of the column to use to sort input data into the training,
evaluation, or test set. Use when you are specifying `CUSTOM` or `SEQ` as the
value for the [`DATA_SPLIT_METHOD` option](#data_split_method):

- If you aren't running hyperparameter tuning and you are specifying `SEQ` as the value for `DATA_SPLIT_METHOD`, then the data is first sorted smallest to largest based on the specified column. The last <var translate="no">n</var> rows are used as evaluation data, where <var translate="no">n</var> is the value specified for [`DATA_SPLIT_EVAL_FRACTION`](#data_split_eval_fraction). The remaining rows are used as training data.
- If you aren't running hyperparameter tuning and you are specifying `CUSTOM` as the value for `DATA_SPLIT_METHOD`, then you must provide the name of a column of type `BOOL`. Rows with a value of `TRUE` or `NULL` are used as evaluation data, rows with a value of `FALSE` are used as training data.
- If you are running hyperparameter tuning and you are specifying `SEQ` as the value for `DATA_SPLIT_METHOD`, then the data is first sorted smallest to largest based on the specified column. The last <var translate="no">m</var> rows are used as test data, where <var translate="no">m</var> is the value specified for [`DATA_SPLIT_TEST_FRACTION`](#data_split_test_fraction). The second last <var translate="no">n</var> rows are used as evaluation data, where <var translate="no">n</var> is the value specified for [`DATA_SPLIT_EVAL_FRACTION`](#data_split_eval_fraction). The remaining rows are used as training data.
- If you are running hyperparameter tuning and you are specifying `CUSTOM` as the value for `DATA_SPLIT_METHOD`, then you must provide the name of a column of type `STRING`. Rows with a value of `TRAIN` are used as training data, rows with a value of `EVAL` are used as evaluation data, and rows with a value of `TEST` are used as test data.

The column you specify for `DATA_SPLIT_COL` can't be used as a feature or
label, and is excluded from features automatically.

**Arguments**

A `STRING` value.

#### `NUM_TRIALS`

**Syntax**

`NUM_TRIALS = int64_value`

**Description**

The maximum number of submodels to train. The tuning stops when `NUM_TRIALS`
submodels are trained, or when the hyperparameter search space is exhausted.
You must specify this option in order to use hyperparameter tuning.

**Arguments**

An `INT64` value between `1` and `100`, inclusive.

> [!NOTE]
> **Note:** We recommend using at least `(number_of_hyperparameters * 10)` trials to tune a model.

#### `MAX_PARALLEL_TRIALS`

**Syntax**

`MAX_PARALLEL_TRIALS = int64_value`

**Description**

The maximum number of trials to run at the same time. If you specify a value
for this option, you must also specify a value for
[`NUM_TRIALS`](#num_trials).

**Arguments**

An `INT64` value between `1` and `5`, inclusive. The default value is `1`.

> [!NOTE]
> **Note:** Although specifying larger `MAX_PARALLEL_TRIALS` values can accelerate the hyperparameter tuning process, acceleration can undermine the final model quality when you specify `VIZIER_DEFAULT` as the [`HPARAM_TUNING_ALGORITHM`](#hparam_tuning_algorithm) value. This is because the parallel trials can't benefit from concurrent training results.

#### `HPARAM_TUNING_ALGORITHM`

**Syntax**

```sql
HPARAM_TUNING_ALGORITHM = { 'VIZIER_DEFAULT' | 'RANDOM_SEARCH' | 'GRID_SEARCH' }
```

**Description**

The algorithm used to tune the hyperparameters. If you specify a value
for this option, you must also specify a value for [`NUM_TRIALS`](#num_trials).

**Arguments**

Specify one of the following values:

- `VIZIER_DEFAULT`: Use the default algorithm in
  Vertex AI Vizier to tune hyperparameters. This algorithm is the most
  powerful algorithm of those offered. It performs a mixture of advanced
  search algorithms, including
  [Bayesian optimization](https://en.wikipedia.org/wiki/Bayesian_optimization)
  with [Gaussian processes](https://en.wikipedia.org/wiki/Gaussian_process). It
  also uses
  [transfer learning](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-hyperparameter-tuning#transfer_learning)
  to take advantage of previously tuned models. This is the default, and also
  the recommended approach.

- `RANDOM_SEARCH`: Use
  [random search](https://en.wikipedia.org/wiki/Hyperparameter_optimization#Random_search)
  to explore the search space.

- `GRID_SEARCH`: Use
  [grid search](https://en.wikipedia.org/wiki/Hyperparameter_optimization#Grid_search)
  to explore the search space. You can only use this algorithm when every
  hyperparameter's search space is discrete.

#### `HPARAM_TUNING_OBJECTIVES`

**Syntax**

For `BOOSTED_TREE_CLASSIFIER` models:

```sql
HPARAM_TUNING_OBJECTIVES = { 'PRECISION' | 'RECALL' | 'ACCURACY' | 'F1_SCORE' | 'LOG_LOSS' | 'ROC_AUC' }
```

For `BOOSTED_TREE_REGRESSOR` models:

```sql
HPARAM_TUNING_OBJECTIVES = { 'MEAN_ABSOLUTE_ERROR' | 'MEAN_SQUARED_ERROR' | 'MEAN_SQUARED_LOG_ERROR' | 'MEDIAN_ABSOLUTE_ERROR' | 'R2_SCORE' | 'EXPLAINED_VARIANCE' }
```

**Description**
The hyperparameter tuning objective for the model; only one objective is
supported. If you specify a value for this option, you must also specify a
value for [`NUM_TRIALS`](#num_trials).

**Arguments**

The possible objectives are a subset of the
[model evaluation metrics](evaluate.md#output)
for the model type. If you aren't running hyperparameter tuning, or if you are
and you don't specify an objective, the default objective
is used. For `BOOSTED_TREE_CLASSIFIER` models, the default is `ROC_AUC`.
For `BOOSTED_TREE_REGRESSOR` models, the default is `R2_SCORE`.

#### `KMS_KEY_NAME`

**Syntax**

`
KMS_KEY_NAME = string_value
`

**Description**

The Cloud Key Management Service [customer-managed encryption key (CMEK)](https://docs.cloud.google.com/kms/docs/cmek) to
use to encrypt the model.

**Arguments**

A `STRING` value containing the fully-qualified name of the CMEK. For example,

```sh
'projects/my_project/locations/my_location/keyRings/my_ring/cryptoKeys/my_key'
```

#### Internal parameter defaults

BigQuery ML uses the following default values when building
models:

```sql
loss_reduction = losses_utils.ReductionV2.SUM_OVER_BATCH_SIZE

batch_norm = False
```

### hyperparameter tuning

Boosted trees classification and regression models support
[hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview), which you can use
to improve model performance for your data. To use
hyperparameter tuning, set the [`NUM_TRIALs` option](#num_trials) to the
number of trials that you want to run. BigQuery ML then trains the
model the number of times that you specify, using different hyperparameter
values, and returns the model that performs the best.

Hyperparameter tuning defaults to improving the key performance metric for the
given model type. You can use the
[`HPARAM_TUNING_OBJECTIVES` option](#hparam_tuning_objectives) to tune for
a different metric if you need to.

For more information about the training objectives and hyperparameters
supported for boosted trees classification models, see
[`BOOSTED_TREE_CLASSIFIER`](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#boosted_tree_classifier).
For more information about the training objectives and hyperparameters
supported for boosted trees regression models, see
[`BOOSTED_TREE_REGRESSOR`](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#boosted_tree_regressor).
To try a tutorial that walks you through hyperparameter tuning, see
[Improve model performance with hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hyperparameter-tuning-tutorial).

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Limitations

`CREATE MODEL` statements must comply with the following rules:

- For `BOOSTED_TREE_CLASSIFIER` models, the `label` column can contain up to 1,000 unique values; that is, the number of classes is less than or equal to 1,000. If you need to classify into more than 1,000 labels, contact [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

### Example

The following example trains a boosted trees classifier model against `'mytable'` with `'mylabel'` as the label column.

```sql
CREATE MODEL `project_id.mydataset.mymodel`
OPTIONS(MODEL_TYPE='BOOSTED_TREE_CLASSIFIER',
        BOOSTER_TYPE = 'GBTREE',
        NUM_PARALLEL_TREE = 1,
        MAX_ITERATIONS = 50,
        TREE_METHOD = 'HIST',
        EARLY_STOP = FALSE,
        SUBSAMPLE = 0.85,
        INPUT_LABEL_COLS = ['mylabel'])
AS SELECT * FROM `project_id.mydataset.mytable`;
```

#### Train a boosted trees regression model with hyperparameter tuning

The following example creates and trains a boosted trees regression model. It uses hyperparameter tuning to improve model performance.

```sql
CREATE MODEL
  `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE='BOOSTED_TREE_REGRESSOR',
    num_trials=10,
    max_parallel_trials=2,
    HPARAM_TUNING_OBJECTIVES=['R2_SCORE'] ) AS
SELECT
  column1,
  column2,
  column3,
  label
FROM
  `mydataset.mytable`
```

### Supported regions

Training boosted trees models is not supported in all BigQuery ML
regions. For a complete list of supported regions and multi-regions, see
[BigQuery ML locations](https://docs.cloud.google.com/bigquery/docs/locations#bqml-loc).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-boosted-tree (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax list writes `CATEGORY_ENCODING_METHOD` value `ONE_HOT_ENCODING` with an opening single quote and a closing backtick; it is written `'ONE_HOT_ENCODING'`, as in the `CATEGORY_ENCODING_METHOD` section.
- Corrected from the official docs: the `DATA_SPLIT_EVAL_FRACTION` and `DATA_SPLIT_TEST_FRACTION` sections give `20.00` and `8.0` as values for a training dataset of 72%; the options are fractions (`1 - eval_fraction - test_fraction`, default `0.2`), so those values are `0.20` and `0.08`.
- Conflicting official statements: the syntax writes `HPARAM_TUNING_OBJECTIVES` as a single string value, but the hyperparameter tuning examples on the model pages (for example `create-kmeans.md`, `create-glm.md` and `create-dnn-models.md`) pass a one-element array such as `HPARAM_TUNING_OBJECTIVES=['ROC_AUC']`; only one objective is supported. Use the one-element array form of the examples.
- Conflicting official statements: these hyperparameter tuning examples include values outside the valid range that the same option section gives: `NUM_PARALLEL_TREE = HPARAM_RANGE(1, 5)` (valid range `(1, ∞]`); `NUM_PARALLEL_TREE = HPARAM_CANDIDATES([0, 1, 3, 5])` (valid range `(1, ∞]`); `MAX_TREE_DEPTH = HPARAM_RANGE(0, 4)` (valid range `(1, 20]`); `MAX_TREE_DEPTH = HPARAM_CANDIDATES([1, 5, 10, 15])` (valid range `(1, 20]`); `DROPOUT = HPARAM_RANGE(0, 0.6)` (valid range `(0, 1.0]`); `DROPOUT = HPARAM_CANDIDATES([0, 0.1, 0.2, 0.6])` (valid range `(0, 1.0]`); `L2_REG = HPARAM_CANDIDATES([0, 1.0, 3.0, 5.0])` (valid range `(0, ∞)`); `LEARN_RATE = HPARAM_RANGE(0, 0.5)` (valid range `(0, ∞]`); `LEARN_RATE = HPARAM_CANDIDATES([0, 0.1, 0.3, 0.5])` (valid range `(0, ∞]`); `SUBSAMPLE = HPARAM_RANGE(0, 0.6)` (valid range `(0, 1.0]`); `SUBSAMPLE = HPARAM_CANDIDATES([0, 0.1, 0.2, 0.6])` (valid range `(0, 1.0]`). Keep `HPARAM_RANGE` bounds and `HPARAM_CANDIDATES` values inside the stated valid range.

## Related

- [Index of this directory](./README.md)
