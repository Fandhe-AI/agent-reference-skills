---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-autoencoder
---

# The CREATE MODEL statement for autoencoder models

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating
[autoencoder](https://wikipedia.org/wiki/Autoencoder)
models in BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

You can use autoencoder models with the
[`ML.PREDICT`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict)
or
[`AI.GENERATE_EMBEDDING`](ai-generate-embedding.md)
functions to embed data into a lower-dimensional space, and with the
[`ML.DETECT_ANOMALIES` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-detect-anomalies)
to perform [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### `CREATE MODEL` syntax

Adapted (not in the official docs): `HPARAM_RANGE(range)` is removed from `HIDDEN_UNITS`, because the `HIDDEN_UNITS` description allows only an integer array or `HPARAM_CANDIDATES` for hyperparameter tuning.

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL} model_name
OPTIONS(model_option_list)
AS query_statement

model_option_list:
MODEL_TYPE = { 'AUTOENCODER' } ]
    [, L1_REG_ACTIVATION = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, LEARN_RATE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, OPTIMIZER = { { 'ADAGRAD' | 'ADAM' | 'FTRL' | 'RMSPROP' | 'SGD' } | HPARAM_CANDIDATES([candidates]) } ]
    [, ACTIVATION_FN = { 'RELU' | 'RELU6' | 'ELU' | 'SELU' | 'SIGMOID' | 'TANH' } | HPARAM_CANDIDATES([candidates]) } ]
    [, BATCH_SIZE = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, DROPOUT = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, HIDDEN_UNITS = { int_array | HPARAM_CANDIDATES([candidates]) } ]
    [, EARLY_STOP = { TRUE | FALSE } ]
    [, MIN_REL_PROGRESS = float64_value ]
    [, MAX_ITERATIONS = int64_value ]
    [, WARM_START = { TRUE | FALSE } ]
    [, NUM_TRIALS = int64_value ]
    [, MAX_PARALLEL_TRIALS = int64_value ]
    [, HPARAM_TUNING_ALGORITHM = { 'VIZIER_DEFAULT' | 'RANDOM_SEARCH' | 'GRID_SEARCH' } ]
    [, HPARAM_TUNING_OBJECTIVES = { MEAN_SQUARED_ERROR | ... } ]
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
MODEL_TYPE = { 'AUTOENCODER' }
```

**Description**

The model type. This option is required.

#### `L1_REG_ACTIVATION`

**Syntax**

`
L1_REG_ACTIVATION = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
`

**Description**

The L1 regularizer to apply a penalty on the activations at the latent space.
This is a common approach to achieve high sparsity of data representations
after dimensionality reduction.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value. The default value is `0`.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range of the hyperparameter. For example, `L1_REG_ACTIVATION = HPARAM_RANGE(0.01, 1.0)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `L1_REG_ACTIVATION = HPARAM_CANDIDATES([0, 0.001, 0.01, 0.1, 1.0])`.

When running hyperparameter tuning, the valid range is
`(0, ∞)`, the default range is `(0, 10.0]`, and the scale
type is `LOG`.

#### `LEARN_RATE`

**Syntax**

`
LEARN_RATE = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The initial learn rate for training.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a
`FLOAT64` value. The default value is `0.001`.

If you are running hyperparameter tuning, use one of the following options:

- Use the `HPARAM_RANGE` keyword and specify two `FLOAT64` values that define the range to use for the hyperparameter. For example, `LEARN_RATE = HPARAM_RANGE(0.001, 0.005)`.
- Use the `HPARAM_CANDIDATES` keyword and specify an array of `FLOAT64` values to provide discrete values to use for the hyperparameter. For example, `LEARN_RATE = HPARAM_CANDIDATES([0, 0.001, 0.01, 0.1])`.

When running hyperparameter tuning, the valid range is `[0, 1.0]`, the
default range is `[0, 1.0]`, and the scale type is `LOG`.

#### `OPTIMIZER`

**Syntax**

`
OPTIMIZER = { { 'ADAGRAD' | 'ADAM' | 'FTRL' | 'RMSPROP' | 'SGD' } | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The optimizer for training the model.

**Arguments**

This option accepts the following values:

- `ADAM` --- [Implements the Adam algorithm](https://www.tensorflow.org/api_docs/python/tf/compat/v1/train/AdamOptimizer). This is the default.
- `ADAGRAD` --- [Implements the Adagrad algorithm](https://www.tensorflow.org/api_docs/python/tf/compat/v1/train/AdagradOptimizer)
- `FTRL` --- [Implements the FTRL algorithm](https://www.tensorflow.org/api_docs/python/tf/compat/v1/train/FtrlOptimizer)
- `RMSPROP` --- [Implements the RMSProp algorithm](https://www.tensorflow.org/api_docs/python/tf/compat/v1/train/RMSPropOptimizer)
- `SGD` --- [Implements the gradient descent algorithm](https://www.tensorflow.org/api_docs/python/tf/compat/v1/train/GradientDescentOptimizer)

If you are running hyperparameter training, you can provide more than one
value for this option by using `HPARAM_CANDIDATES` and specifying an array.
For example, `OPTIMIZER = HPARAM_CANDIDATES(['ADAM', 'FTRL', 'SGD'])`.

#### `ACTIVATION_FN`

**Syntax**

`
ACTIVATION_FN = { { 'RELU' | 'RELU6' | 'ELU' | 'SELU' | 'SIGMOID' | 'TANH' } | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The activation function of the neural network.

**Arguments**

This option accepts the following values:

- `RELU` --- [Rectified linear](https://www.tensorflow.org/api_docs/python/tf/nn/relu). This is the default.
- `RELU6` --- [Rectified linear 6](https://www.tensorflow.org/api_docs/python/tf/nn/relu6)
- `ELU` --- [Exponential linear](https://www.tensorflow.org/api_docs/python/tf/nn/elu)
- `SELU` --- [Scaled exponential linear](https://www.tensorflow.org/api_docs/python/tf/nn/selu)
- `SIGMOID` --- [Sigmoid activation](https://www.tensorflow.org/api_docs/python/tf/math/sigmoid)
- `TANH` --- [Tanh activation](https://www.tensorflow.org/api_docs/python/tf/math/tanh)

If you are running hyperparameter training, then you can provide more than one
value for this option by using `HPARAM_CANDIDATES` and specifying an array.
For example, `ACTIVATION_FN = HPARAM_CANDIDATES(['RELU', 'RELU6', 'TANH'])`.

#### `BATCH_SIZE`

**Syntax**

`
BATCH_SIZE = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The mini batch size of samples that are fed to the neural network.

**Arguments**

If you aren't running hyperparameter tuning, specify an `INT64` value that
is positive and is less than or equal to `8192`. The default value is `32`
or the number of samples, whichever is smaller.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range to use for the hyperparameter. For example, `BATCH_SIZE = HPARAM_RANGE(16, 64)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `BATCH_SIZE = HPARAM_CANDIDATES([32, 64, 256, 1024])`.

When running hyperparameter tuning, the valid range is `(0, ∞)`,
the default range is `[16, 1024]`, and the scale type is `LOG`.

#### `DROPOUT`

**Syntax**

`
DROPOUT = { float64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The dropout rate of units in the neural network.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify a `FLOAT64`
value that is positive and is less than or equal to `1.0`. The default value is
`0`.

If you are running hyperparameter tuning, then you must use one of the
following options:

- The `HPARAM_RANGE` keyword and two `FLOAT64` values that define the range to use for the hyperparameter. For example, `DROPOUT = HPARAM_RANGE(0, 0.6)`.
- The `HPARAM_CANDIDATES` keyword and an array of `FLOAT64` values that provide discrete values to use for the hyperparameter. For example, `DROPOUT = HPARAM_CANDIDATES([0.1, 0.3, 0.6])`.

When running hyperparameter tuning, the valid range is `[0, 1.0)`, the
default range is `[0, 0.8]`, and the scale type is `LINEAR`.

#### `HIDDEN_UNITS`

**Syntax**

`
HIDDEN_UNITS = { int_array | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The hidden layers of the neural network.

**Arguments**

An array of integers that represents the architecture of the hidden layers. If
not specified, BigQuery ML applies a single hidden layer that
contains no more than 128 units. The number of units is calculated as `[min(128,
num_samples / (10 * (num_input_units + num_output_units)))]`. The upper bound of
the rule ensures that the model isn't overfitting.

The number in the middle of the array defines the shape of the latent space. For
example, `hidden_units=[128, 64, 4, 64, 128]` defines a four-dimensional latent
space.

The number of layers in `hidden_units` must be odd, and we recommend that the
sequence be symmetrical.

The following example defines a model architecture that uses three hidden layers
with 256, 128, and 64 nodes, respectively.

```sql
HIDDEN_UNITS = [256, 128, 64]
```

If you are running hyperparameter tuning, then you must use the
`HPARAM_CANDIDATES` keyword and specify an array in the form
`ARRAY<STRUCT<ARRAY<INT64>>>` to provide discrete values to use for the
hyperparameter. Each struct value in the outer array represents a candidate
neural architecture. The array of `INT64` values in each struct represents a
hidden layer.

The following example represents a neural architecture search with three
candidates, which include a single layer of 8 neurons, two layers of neurons
with 8 and 16 in sequence, and three layers of neurons with 16, 32 and 64 in
sequence, respectively.

```sql
hidden_units=hparam_candidates([struct([8]), struct([8, 16]), struct([16, 32, 64])])
```

The valid range for the `INT64` arrays is `[1, ∞)`.

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

#### `WARM_START`

**Syntax**

```sql
WARM_START = { TRUE | FALSE }
```

**Description**

Determines whether to train a model with new training data, new model options,
or both. Unless you explicitly override them, the initial options used to train
the model are used for the warm start run.

In a warm start run, the iteration numbers are reset to start from zero. Use
the training run or iteration information returned by the
[`ML.TRAINING_INFO` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-train)
to distinguish the warm start run from the original run.

The values of the `MODEL_TYPE`, the `HIDDEN_UNITS` options, and the model
retraining data schema must all remain the same as they were in the
previous training job.

**Arguments**

A `BOOL` value. The default value is `FALSE`.

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

```sql
HPARAM_TUNING_OBJECTIVES = { 'MEAN_ABSOLUTE_ERROR' | 'MEAN_SQUARED_ERROR' | 'MEAN_SQUARED_LOG_ERROR' }
```

**Description**

The hyperparameter tuning objective for the model; only one objective is
supported. If you specify a value for this option, you must also specify a
value for [`NUM_TRIALS`](#num_trials).

**Arguments**

The possible objectives are a subset of the
[model evaluation metrics](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-evaluate#output)
for the model type. If you aren't running hyperparameter tuning, or if you are
and you don't specify an objective, the `MEAN_SQUARED_ERROR` objective is
used.

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

#### `query_statement`

The `AS query_statement` clause specifies the
GoogleSQL query used to generate the training data. See the
[GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax)
page for the supported SQL syntax of the `query_statement` clause.

### Hyperparameter tuning

Autoencoder models support
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
supported for autoencoder models, see
[`AUTOENCODER`](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#autoencoder).
To try a tutorial that walks you through hyperparameter tuning, see
[Improve model performance with hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hyperparameter-tuning-tutorial).

### Supported machine learning functions

The following machine learning functions are supported for the Autoencoder model, including:

- `https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-evaluate` for evaluating model metrics.

- `https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-feature` for reviewing information about the input features used to train a model.

- `https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict` for dimensionality reduction.

- `https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-reconstruction-loss` for anomaly detection and data sanitation purposes.

- `https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-train` for tracking information about the training iterations of a model.

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Example

The following example trains an autoencoder model against the table `mytable`.

```sql
CREATE MODEL `project_id.mydataset.mymodel`
OPTIONS(MODEL_TYPE='AUTOENCODER',
        ACTIVATION_FN = 'RELU',
        BATCH_SIZE = 16,
        DROPOUT = 0.1,
        EARLY_STOP = FALSE,
        HIDDEN_UNITS = [128, 64, 8, 64, 128],
        LEARN_RATE=0.001,
        MAX_ITERATIONS = 50,
        OPTIMIZER = 'ADAGRAD')
AS SELECT * FROM `project_id.mydataset.mytable`;
```

### Pricing

Model training does not incur any charges if you are using on-demand pricing. If you are using capacity-based pricing, model training will use reserved slots. All prediction queries are billable, regardless of the pricing model.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-autoencoder (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the autoencoder syntax lists `HPARAM_RANGE(range)` for `HIDDEN_UNITS`, but the `HIDDEN_UNITS` section says that for hyperparameter tuning you must use the `HPARAM_CANDIDATES` keyword with an `ARRAY<STRUCT<ARRAY<INT64>>>` value; `HPARAM_RANGE` is removed from the syntax.
- Conflicting official statements: the `HIDDEN_UNITS` section says the number of layers must be odd, but its neural architecture search example includes the two-layer candidate `struct([8, 16])`. For an autoencoder, give only candidates with an odd number of layers, such as `struct([8])` and `struct([16, 32, 64])` from the same example.
- Conflicting official statements: the syntax writes `HPARAM_TUNING_OBJECTIVES` as a single string value, but the hyperparameter tuning examples on the model pages (for example `create-kmeans.md`, `create-glm.md` and `create-dnn-models.md`) pass a one-element array such as `HPARAM_TUNING_OBJECTIVES=['ROC_AUC']`; only one objective is supported. Use the one-element array form of the examples. The syntax list also writes the value without quotes (`{ MEAN_SQUARED_ERROR | ... }`).

## Related

- [Index of this directory](./README.md)
