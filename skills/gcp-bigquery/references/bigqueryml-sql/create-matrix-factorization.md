---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-matrix-factorization
---

# The CREATE MODEL statement for matrix factorization models

## Signature / Usage

> [!NOTE]
> **Note:** Matrix factorization models are only available to customers with reservations. For more information, see [Pricing](#pricing).

This document describes the `CREATE MODEL` statement for creating
[matrix factorization](https://en.wikipedia.org/wiki/Matrix_factorization_(recommender_systems))
models in BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

Matrix factorization models use
[collaborative filtering](https://developers.google.com/machine-learning/recommendation/collaborative/basics)
to identify similar items. Use matrix factorization models with the
[`ML.RECOMMEND` function](recommend.md)
to generate [recommendations](https://docs.cloud.google.com/bigquery/docs/recommendation-overview).

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL} model_name
OPTIONS(model_option_list)
AS query_statement

model_option_list:
MODEL_TYPE = 'MATRIX_FACTORIZATION'
    [, FEEDBACK_TYPE = {'EXPLICIT' | 'IMPLICIT'} ]
    [, NUM_FACTORS = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, USER_COL = string_value ]
    [, ITEM_COL = string_value ]
    [, RATING_COL = string_value ]
    [, WALS_ALPHA = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, L2_REG = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, MAX_ITERATIONS = int64_value ]
    [, EARLY_STOP = { TRUE | FALSE } ]
    [, MIN_REL_PROGRESS = float64_value ]
    [, DATA_SPLIT_METHOD = { 'AUTO_SPLIT' | 'RANDOM' | 'CUSTOM' | 'SEQ' | 'NO_SPLIT' } ]
    [, DATA_SPLIT_EVAL_FRACTION = float64_value ]
    [, DATA_SPLIT_TEST_FRACTION = float64_value ]
    [, DATA_SPLIT_COL = string_value ]
    [, NUM_TRIALS = int64_value ]
    [, MAX_PARALLEL_TRIALS = int64_value ]
    [, HPARAM_TUNING_ALGORITHM = { 'VIZIER_DEFAULT' | 'RANDOM_SEARCH' | 'GRID_SEARCH' } ]
    [, HPARAM_TUNING_OBJECTIVES = { 'MEAN_SQUARED_ERROR' | 'MEAN_AVERAGE_PRECISION' | ... } ]
    [, MODEL_REGISTRY = { 'VERTEX_AI' } ]
    [, VERTEX_AI_MODEL_ID = string_value ]
    [, VERTEX_AI_MODEL_VERSION_ALIASES = string_array ]
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
MODEL_TYPE = 'MATRIX_FACTORIZATION'
```

**Description**

Specifies the model type. To create a matrix factorization model, specify `MATRIX_FACTORIZATION`.

#### `FEEDBACK_TYPE`

**Syntax**

```sql
FEEDBACK_TYPE = { 'EXPLICIT' | 'IMPLICIT' }
```

**Description**

Specifies the feedback type for the model. The feedback type determines the
algorithm that is used during training.

**Arguments**

There are two types of ratings (user feedback): `EXPLICIT` and `IMPLICIT`.
Use the one that best fits your use case.

- If the user has explicitly provided a rating, for example 1-5, to an item
  such as movie recommendations, then specify `EXPLICIT`. This trains the
  model using the
  [Alternating Least Squares](https://en.wikipedia.org/wiki/Matrix_completion#Alternating_least_squares_minimization)
  algorithm. This is the default value.

- If you don't have explicit user feedback, the rating value must be
  artificially constructed based on the user's interaction with the item,
  for example, by looking at their clicks, pageviews, and purchases.
  In this situation, specify `IMPLICIT`. This trains the model using the
  [Weighted-Alternating Least Squares](http://yifanhu.net/PUB/cf.pdf) algorithm.

For more information about the differences between the two feedback types and
when to use which type, see
[Feedback types](#feedback-types).

#### `NUM_FACTORS`

**Syntax**

` NUM_FACTORS = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

Specifies the number of latent factors to use.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify an `INT64`
value between `2` and `200`. The default value is
`log2(n)`, where `n` is the number of training examples.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `INT64` values that define the range of the hyperparameter. For example, `NUM_FACTORS = HPARAM_RANGE(5, 20)`.
- The `HPARAM_CANDIDATES` keyword and an array of `INT64` values that provide discrete values to use for the hyperparameter. For example, `NUM_FACTORS = HPARAM_CANDIDATES([5, 10, 20, 40])`.

When running hyperparameter tuning, the valid range is `[2, 200]`,the
default range is `[2, 20]`, and the scale type is `LINEAR`.

#### `USER_COL`

**Syntax**

` USER_COL = string_value`

**Description**

The user column name.

**Arguments**

A `STRING` value. The default value is `user`.

#### `ITEM_COL`

**Syntax**

` ITEM_COL = string_value`

**Description**

The item column name.

**Arguments**

A `STRING` value. The default value is `item`.

#### `RATING_COL`

**Syntax**

` RATING_COL = string_value`

**Description**

The rating column name.

**Arguments**

A `STRING` value. The default value is `rating`.

##### `WALS_ALPHA`

**Syntax**

` WALS_ALPHA = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

Adjusts the user feedback's impact on recommendation confidence, balancing
positive and negative input in the loss function.

You can only use this hyperparameter with `IMPLICIT` matrix factorization models.

For more information, see
[Feedback types](#feedback-types).

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value. The default value is `40.0`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `WALS_ALPHA = HPARAM_RANGE(0, 5.0)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `WALS_ALPHA = HPARAM_CANDIDATES([0, 1.0, 3.0, 5.0])`.

When running hyperparameter tuning, the valid range is `(0, ∞]`,
the default range is `[0, 100.0]`, and the scale type is `LINEAR`.

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

#### `MAX_ITERATIONS`

**Syntax**

`
MAX_ITERATIONS = int64_value
`

**Description**

The maximum number of training iterations, where one iteration represents
a single pass of the entire training data.

**Arguments**

An `INT64` value. The default value is `20`.

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

- `AUTO_SPLIT`: This option splits the data as follows:

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
  > **Note:** A random split is based on the [FARM_FINGERPRINT](../googlesql-functions/hash_functions.md#farm_fingerprint) of the data (including the column name and schema), so tables with the same content but different column names and schemas may get different splitting and different evaluation metrics.

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
- `NO_SPLIT`: This is the default. No data split; all input data is used as
  training data.

  While the other methods are supported, use them with caution. Due to the
  nature of the matrix factorization algorithm, if a split eliminates all
  of the ratings for a user or item, a factor weight vector is not
  generated for the user or item.

  However, use this option with caution when tuning the `NUM_FACTORS`
  hyperparameter. Although `NO_SPLIT` allows better performance when using
  larger values for `NUM_FACTORS`, the validity of the results might be
  degraded.

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

For matrix factorization models, increasing `NUM_TRIALS` is the
recommended way to reduce model output variance.

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

For explicit `MATRIX_FACTORIZATION` models:

```sql
HPARAM_TUNING_OBJECTIVES = 'MEAN_SQUARED_ERROR'
```

For implicit `MATRIX_FACTORIZATION` models:

```sql
HPARAM_TUNING_OBJECTIVES = { 'MEAN_AVERAGE_PRECISION' | 'MEAN_SQUARED_ERROR' | 'NORMALIZED_DISCOUNTED_CUMULATIVE_GAIN' | 'AVERAGE_RANK' }
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
is used. For explicit `MATRIX_FACTORIZATION` models, the default is `MEAN_SQUARED_ERROR'`. For implicit `MATRIX_FACTORIZATION` models , the
default is `MEAN_AVERAGE_PRECISION`.

#### `MODEL_REGISTRY`

The `MODEL_REGISTRY` option specifies the model registry destination.
`VERTEX_AI` is the only supported model registry destination. To learn more, see
[Register a BigQuery ML model](https://docs.cloud.google.com/bigquery/docs/create_vertex#register-model).

#### `VERTEX_AI_MODEL_ID`

The `VERTEX_AI_MODEL_ID` option specifies an Gemini Enterprise Agent Platform model ID
to register the model with. The model ID is associated with your
BigQuery ML model, and is visible from the
Model Registry. If you don't specify an
Agent Platform model ID, the BigQuery ML
model name is used.

The `VERTEX_AI_MODEL_ID` value can have up to 63 characters, and valid
characters are `[a-z0-9_-]`. The first character cannot be a number or hyphen.
If you don't specify an Agent Platform model ID, the
BigQuery ML model name must meet these requirements.

You can only set the `VERTEX_AI_MODEL_ID` option when the `MODEL_REGISTRY`
option is set to `VERTEX_AI`.

#### `VERTEX_AI_MODEL_VERSION_ALIASES`

The `VERTEX_AI_MODEL_VERSION_ALIASES` option specifies an Agent Platform model alias to use when registering a model. Model
aliases are helpful for fetching or deploying a particular model version by
reference without needing to know the specific version ID. To learn more about
how Model Registry aliases work, see
[How to use model version aliases](https://docs.cloud.google.com/vertex-ai/docs/model-registry/model-alias).

You can only set the `VERTEX_AI_MODEL_VERSION_ALIASES` option when the
`MODEL_REGISTRY` option is set to `VERTEX_AI`.

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

#### `query_statement`

The `AS query_statement` clause specifies the
GoogleSQL query used to generate the training data. See the
[GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax)
page for the supported SQL syntax of the `query_statement` clause.

The query_statement is expected to contain exactly 3 columns
(user, item, and rating) unless you specify a `DATA_SPLIT_METHOD` value that
requires use of a `DATA_SPLIT_COL` value.

### Supported inputs

BigQuery supports different GoogleSQL data types for the input
columns for matrix factorization. Supported data types for each respective
column include:

| `Matrix factorization input column` | `Supported types` |
|---|---|
| `user` | Any [groupable](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties) data type |
| `item` | Any [groupable](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties) data type |
| `rating` | [`INT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#integer_types) [`NUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_type) [`BIGNUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#bignumeric_type) [`FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) |

### Feedback types

An important part of creating a good matrix factorization model for
recommendations is to make sure that data is trained on the algorithm that is
best suited for it. For matrix factorization models, there are two different
ways to get a rating for a user-item pair.

Ratings provided by the user are considered to be explicit
feedback. A low explicit rating tends to imply the user felt very negatively
about an item while a high explicit rating tends to imply that the use liked the
item. Movie streaming sites where users give ratings are examples of explicitly
labeled datasets. For explicit feedback problems, BigQuery ML
uses the alternating least squares algorithm (ALS). ALS seeks to minimize the following loss function:
\\( Loss = \\sum_{u, i \\in \\text{observed ratings}} (r_{ui} - x\^T_uy_i)\^2 + \\lambda(\\sum_u\|\|x_u\|\|\^2 + \\sum_i\|\|y_i\|\|\^2)\\)

<br />

Where
\\(r_{ui} = \\) rating that user \\(u\\) gave to item \\(i\\)   
\\(x_u = \\) latent factor weights vector for user \\(u\\). Is length [`NUM_FACTORS`](#num_factors).   
\\(y_i = \\) latent factor weights vector for item \\(i\\). Is length [`NUM_FACTORS`](#num_factors).   
\\(\\lambda = \\) [`L2_REG`](#l2_reg)

However, most of the time data isn't labeled by users. Often, the only
metrics that you have as to whether a user liked an item or movie is
by the click rate or engagement time. You can use this as a proxy rating,
but it is not necessarily a definitive indication as to whether a user
likes or dislikes something. The data in these datasets is considered to be
implicit feedback. For implicit feedback problems, BigQuery ML
uses a variant of the ALS algorithm called weighted-alternating least squares
(WALS), which is described in
<http://yifanhu.net/PUB/cf.pdf>. This approach
uses these proxy ratings and treats them as an indicator of the interest that
a user has in an item. WALS seeks to minimize the following loss function:
$$ Loss = \\sum_{u, i} c_{ui}(p_{ui} - x\^T_uy_i)\^2 + \\lambda(\\sum_u\|\|x_u\|\|\^2 + \\sum_i\|\|y_i\|\|\^2) $$

Where, in addition to the variables defined previously, the function also
introduces the following variables:
\\(p_{ui} = 1\\) when \\(r_{ui} \> 0\\) and \\(p_{ui} = 0\\) when \\(r_{ui} \< 0\\)   
\\(c_{ui} = 1 + \\alpha r_{ui}\\)   
\\(\\alpha = \\) [`WALS_ALPHA`](#wals_alpha)

For explicit matrix factorization, the input is typically integers within a
known fixed range. For implicit matrix factorization, the input ratings can
be doubles or integers that span a wider range. We recommend that you make sure
there aren't any outliers in the input ratings, and that you scale the input
ratings if the model is performing poorly.

### Training data handling

When you train a matrix factorization model, BigQuery ML uses all
provided input data for training. No automatic sampling or bootstrapping occurs
unless you explicitly split the data by using the
[`DATA_SPLIT_METHOD` option](#data_split_method).

### Hyperparameter tuning

Matrix factorization models support
[hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview), which you can use
to improve model performance for your data. To use
hyperparameter tuning, set the [`NUM_TRIALS` option](#num_trials) to the
number of trials that you want to run. BigQuery ML then trains the
model the number of times that you specify, using different hyperparameter
values, and returns the model that performs the best.

Hyperparameter tuning defaults to improving the key performance metric for the
given model type. You can use the
[`HPARAM_TUNING_OBJECTIVES` option](#hparam_tuning_objectives) to tune for
a different metric if you need to.

For more information about the training objectives and hyperparameters
supported for explicit matrix factorization models, see
[`MATRIX_FACTORIZATION` (explicit)](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#matrix_factorization_explicit).
For more information about the training objectives and hyperparameters
supported for implicit matrix factorization models, see
[`MATRIX_FACTORIZATION` (implicit)](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#matrix_factorization_implicit).
To try a tutorial that walks you through hyperparameter tuning, see
[Improve model performance with hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hyperparameter-tuning-tutorial).

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Limitations

Matrix factorization models have the following limitations:

- User-defined random seeds for weight initialization aren't supported.
- If you get the "Model is too large (\>100 MB)" error, check the input
  data. This error is caused by having too many ratings for a single user or a
  single item. Hashing the user or item columns into an `INT64` value or
  reducing the data size can help. You can use the following formula to
  determine whether this error might occur:

  ```sql
  max(num_rated_user, num_rated_item) < 100 million
  ```

  Where `num_rated_user` is the maximum item ratings that a single user has
  entered and `num_rated_items` is the maximum user ratings for a given item.

### Pricing

To create a matrix factorization model you must
[create a reservation](https://docs.cloud.google.com/bigquery/docs/reservations-tasks#create_reservations)
that uses the BigQuery
[Enterprise or Enterprise Plus edition](https://docs.cloud.google.com/bigquery/docs/editions-intro),
and then
[create a reservation assignment](https://docs.cloud.google.com/bigquery/docs/reservations-assignments#create_reservation_assignments)
that uses the `QUERY` job type.

### Examples

The following example creates models named `mymodel` in dataset `mydataset` in
your default project.

#### Train a matrix factorization model with explicit feedback

This example creates an explicit feedback matrix factorization model.

```sql
CREATE MODEL `project_id.mydataset.mymodel`
 OPTIONS(MODEL_TYPE='MATRIX_FACTORIZATION') AS
SELECT
  user,
  item,
  rating
FROM
  `mydataset.mytable`
```

#### Train a matrix factorization model with implicit feedback

This example creates an implicit feedback matrix factorization model.

```sql
CREATE MODEL `project_id.mydataset.mymodel`
 OPTIONS(MODEL_TYPE='MATRIX_FACTORIZATION',
         FEEDBACK_TYPE='IMPLICIT') AS
SELECT
  user,
  item,
  rating
FROM
  `mydataset.mytable`
```

### What's next

- [Use BigQuery ML to make recommendations from Google Analytics data](https://docs.cloud.google.com/bigquery/docs/bigqueryml-mf-implicit-tutorial) (implicit feedback)
- [Use BigQuery ML to make recommendations from movie ratings](https://docs.cloud.google.com/bigquery/docs/bigqueryml-mf-explicit-tutorial) (explicit feedback)

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-matrix-factorization (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `DATA_SPLIT_EVAL_FRACTION` and `DATA_SPLIT_TEST_FRACTION` sections give `20.00` and `8.0` as values for a training dataset of 72%; the options are fractions (`1 - eval_fraction - test_fraction`, default `0.2`), so those values are `0.20` and `0.08`.
- Conflicting official statements: the syntax writes `HPARAM_TUNING_OBJECTIVES` as a single string value, but the hyperparameter tuning examples on the model pages (for example `create-kmeans.md`, `create-glm.md` and `create-dnn-models.md`) pass a one-element array such as `HPARAM_TUNING_OBJECTIVES=['ROC_AUC']`; only one objective is supported. Use the one-element array form of the examples.
- Conflicting official statements: these hyperparameter tuning examples include values outside the valid range that the same option section gives: `WALS_ALPHA = HPARAM_RANGE(0, 5.0)` (valid range `(0, ∞]`); `WALS_ALPHA = HPARAM_CANDIDATES([0, 1.0, 3.0, 5.0])` (valid range `(0, ∞]`); `L2_REG = HPARAM_CANDIDATES([0, 1.0, 3.0, 5.0])` (valid range `(0, ∞)`). Keep `HPARAM_RANGE` bounds and `HPARAM_CANDIDATES` values inside the stated valid range.

## Related

- [Index of this directory](./README.md)
