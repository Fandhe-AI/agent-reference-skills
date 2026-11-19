---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-kmeans
---

# The CREATE MODEL statement for K-means models

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating
[k-means](https://en.wikipedia.org/wiki/K-means_clustering)
models in BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

You can use k-means models with the
[`ML.PREDICT` function](predict.md)
to cluster data, and you can use k-means models with the
[`ML.DETECT_ANOMALIES` function](detect-anomalies.md)
to perform [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### `CREATE MODEL` syntax

Adapted (not in the official docs): the trailing comma after `MODEL_TYPE = { 'KMEANS' }` is removed, because each following option starts with `[,`.

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL} model_name
OPTIONS(model_option_list)
AS query_statement

model_option_list:
MODEL_TYPE = { 'KMEANS' }
    [, NUM_CLUSTERS = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) } ]
    [, KMEANS_INIT_METHOD = { 'RANDOM' | 'KMEANS++' | 'CUSTOM' } ]
    [, KMEANS_INIT_COL = string_value ]
    [, DISTANCE_TYPE = { 'EUCLIDEAN' | 'COSINE' } ]
    [, STANDARDIZE_FEATURES = { TRUE | FALSE } ]
    [, MAX_ITERATIONS = int64_value ]
    [, EARLY_STOP = { TRUE | FALSE } ]
    [, MIN_REL_PROGRESS = float64_value ]
    [, WARM_START = { TRUE | FALSE } ]
    [, NUM_TRIALS = int64_value ]
    [, MAX_PARALLEL_TRIALS = int64_value ]
    [, HPARAM_TUNING_ALGORITHM = { 'VIZIER_DEFAULT' | 'RANDOM_SEARCH' | 'GRID_SEARCH' } ]
    [, HPARAM_TUNING_OBJECTIVES = 'DAVIES_BOULDIN_INDEX' ]
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
MODEL_TYPE = { 'KMEANS' }
```

**Description**

Specify the model type. This option is required.

**Arguments**

Specify `KMEANS` to use k-means clustering for data segmentation; for example,
identifying customer segments. K-means is an unsupervised learning technique, so
model training does not require labels or split data for training or
evaluation.

#### `NUM_CLUSTERS`

**Syntax**

`
NUM_CLUSTERS = { int64_value | HPARAM_RANGE(range) | HPARAM_CANDIDATES([candidates]) }
`

**Description**

The number of clusters to identify in the input data.

**Arguments**

If you aren't running hyperparameter tuning, then you can specify an `INT64`
value between `2` and `100`. The default value is
`log10(n)`, where `n` is the number of training examples.

If you are running hyperparameter tuning, use one of the following options:

- The `HPARAM_RANGE` keyword and two `INT64` values that define the range of the hyperparameter. For example, `NUM_CLUSTERS = HPARAM_RANGE(2, 25)`.
- The `HPARAM_CANDIDATES` keyword and an array of `INT64` values that provide discrete values to use for the hyperparameter. For example, `NUM_CLUSTERS = HPARAM_CANDIDATES([5, 10, 50, 100])`.

When running hyperparameter tuning, the valid range is `[2, 100]`,
the default range is `[2, 10]`, and the scale type is `LINEAR`.

#### `KMEANS_INIT_METHOD`

**Syntax**

```sql
KMEANS_INIT_METHOD = { 'RANDOM' | 'KMEANS++' | 'CUSTOM' }
```

**Description**

The method of initializing the clusters.

To use the same centroids in repeated `CREATE MODEL` queries, specify the option
`'CUSTOM'`.

**Arguments**

This option accepts the following values:

- `RANDOM`: Initializes the centroids by randomly selecting a number of data points equal to the [`NUM_CLUSTERS`](#num_clusters) value from the input data. This is the default value.
- `KMEANS++`: Initializes a number of centroids equal to the [`NUM_CLUSTERS`](#num_clusters) value by using the [k-means++](https://en.wikipedia.org/wiki/K-means%2B%2B) algorithm. Using this approach usually trains a better model than using random cluster initialization.
- `CUSTOM`: Initializes the centroids using a provided column of type `BOOL`.
  BigQuery ML uses the rows with a value of `TRUE` as the initial centroids. You specify the column to use by using the
  [`KMEANS_INIT_COL`](#kmeans_init_col) option.

  When you use this option, if the values in the column identified by
  `'KMEANS_INIT_COL'` remain constant, then repeated `CREATE MODEL` queries
  use the same centroids.

#### `KMEANS_INIT_COL`

**Syntax**

`
KMEANS_INIT_COL = string_value
`

**Description**

The name of the column to use to initialize the centroids. This column must have
a type of `BOOL`. If this column contains a value of `TRUE` for a given row,
then BigQuery ML uses that row as an initial centroid. The number
of `TRUE` rows in this column must be equal to the value you have specified
for the [`NUM_CLUSTERS`](#num_clusters) option.

You can only use this option if you have specified `CUSTOM` for the
[`KMEANS_INIT_METHOD`](#kmeans_init_method) option.

You can't use this column as a feature; BigQuery ML automatically excludes it.

**Arguments**

A `STRING` value.

#### `DISTANCE_TYPE`

**Syntax**

```sql
DISTANCE_TYPE = { 'EUCLIDEAN' | 'COSINE' }
```

**Description**

The type of metric to use to compute the distance between two points.

**Arguments**

This option accepts the following values:

- `EUCLIDEAN`: Use the following equation to calculate the distance between
  points `x` and `y`:

  $$ \\lVert x-y\\rVert_{2} $$

  This is the default value.
- `COSINE`: Use the following equation to calculate the distance between points
  `x` and `y`:

  $$ \\sqrt{1-\\frac{x \\cdot y}{\\lVert x\\rVert_{2}\\lVert y\\rVert_{2}}} $$

  where \\( \\lVert x\\rVert_{2} \\) represents the L2 norm for `x`.

#### `STANDARDIZE_FEATURES`

**Syntax**

```sql
STANDARDIZE_FEATURES = { TRUE | FALSE }
```

**Description**

Determines whether to
[standardize numerical features](https://en.wikipedia.org/wiki/Feature_scaling).
This setting doesn't affect
[automatic preprocessing](https://docs.cloud.google.com/bigquery/docs/auto-preprocessing) of non-numerical
features.

**Arguments**

A `BOOL` value. The default value is `TRUE`.

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

The value of the `MODEL_TYPE` and the training data schema must remain
constant in a warm start models retrain.

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
HPARAM_TUNING_OBJECTIVES = { 'DAVIES_BOULDIN_INDEX' }
```

**Description**
The hyperparameter tuning objective for the model. If you specify a value
for this option, you must also specify a value for [`NUM_TRIALS`](#num_trials).

**Arguments**

The possible objectives are a subset of the
[model evaluation metrics](evaluate.md#output)
for the model type. If you aren't running hyperparameter tuning, or if you are
and you don't specify an objective, the `DAVIES_BOULDIN_INDEX` objective is
used.

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

### Hyperparameter tuning

K-means models support
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
supported for k-means models, see
[`KMEANS`](https://docs.cloud.google.com/bigquery/docs/hp-tuning-overview#kmeans).
To try a tutorial that walks you through hyperparameter tuning, see
[Improve model performance with hyperparameter tuning](https://docs.cloud.google.com/bigquery/docs/hyperparameter-tuning-tutorial).

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### `CREATE MODEL` examples

The following examples create models named `mymodel` in `mydataset` in your
default project.

#### Train a k-means model

This example creates a k-means model with four clusters using the default
`distance_type` value of `euclidean_distance`.

```sql
CREATE MODEL
  `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE='KMEANS',
    NUM_CLUSTERS=4 ) AS
SELECT
  *
FROM
  `mydataset.mytable`
```

> [!NOTE]
> **Note:** Changing the order of columns in the `SELECT` statement can affect the centroids in the final model.

#### Train a k-means model with random cluster initialization method.

This example creates a k-means model with three clusters using the random
cluster initialization method.

```sql
CREATE MODEL
  `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE='KMEANS',
    NUM_CLUSTERS=3,
    KMEANS_INIT_METHOD='RANDOM') AS
SELECT
  *
FROM
  `mydataset.mytable`
```

#### Train a k-means model with custom cluster initialization method

This example creates a k-means model with three clusters using the custom
cluster initialization method. `init_col` identifies the column of type `BOOL`
that contains the values which specify whether a given row is an initial
centroid. This column should only contain three rows with the value `TRUE`.

```sql
CREATE MODEL
  `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE='KMEANS',
    NUM_CLUSTERS=3,
    KMEANS_INIT_METHOD='CUSTOM',
    KMEANS_INIT_COL='init_col') AS
SELECT
  init_col,
  features
FROM
  `mydataset.mytable`
```

#### Train a k-means model with hyperparameter tuning

This example creates a k-means model and uses hyperparameter tuning to improve model performance.

```sql
CREATE MODEL
  `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE='KMEANS',
    num_trials=10,
    max_parallel_trials=2,
    HPARAM_TUNING_OBJECTIVES=['DAVIES_BOULDIN_INDEX'] ) AS
SELECT
  *
FROM
  `mydataset.mytable`
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-kmeans (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax list ends `MODEL_TYPE = { 'KMEANS' }` with a comma although each following option begins with `[,`, which would expand to `,,`; the trailing comma is removed.
- Corrected from the official docs: the "Train a k-means model" example says the default `distance_type` value is `euclidean_distance`; the `DISTANCE_TYPE` values are `'EUCLIDEAN'` and `'COSINE'`, and the default is `'EUCLIDEAN'`.
- Conflicting official statements: the syntax writes `HPARAM_TUNING_OBJECTIVES` as a single string value, but the hyperparameter tuning examples on the model pages (for example `create-kmeans.md`, `create-glm.md` and `create-dnn-models.md`) pass a one-element array such as `HPARAM_TUNING_OBJECTIVES=['ROC_AUC']`; only one objective is supported. Use the one-element array form of the examples.

## Related

- [Index of this directory](./README.md)
