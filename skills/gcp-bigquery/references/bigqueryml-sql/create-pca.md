---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-pca
---

# The CREATE MODEL statement for PCA models

## Signature / Usage

### `CREATE MODEL` statement for PCA

This document describes the `CREATE MODEL` statement for creating
[principal component analysis (PCA) models](https://en.wikipedia.org/wiki/Principal_component_analysis)
in BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

You can use PCA models with the
[`ML.PREDICT`](predict.md)
or
[`AI.GENERATE_EMBEDDING`](ai-generate-embedding.md)
functions to embed data into a lower-dimensional space, and
with the
[`ML.DETECT_ANOMALIES` function](detect-anomalies.md)
to perform [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL}
model_name
OPTIONS(model_option_list)
AS query_statement

model_option_list:
MODEL_TYPE = PCA,
    NUM_PRINCIPAL_COMPONENTS = int64_value | PCA_EXPLAINED_VARIANCE_RATIO = float64_value
    [, SCALE_FEATURES = { TRUE | FALSE } ]
    [, PCA_SOLVER = { 'FULL' | 'RANDOMIZED' | 'AUTO' } ]
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
MODEL_TYPE = { 'PCA' }
```

**Description**

Specify the model type. This option is required.

**Arguments**

Principal component analysis computes principal components and uses them to
perform a change of basis on the data. This approach is commonly used for
dimensionality reduction by projecting each data point onto only the first few
principal components. This lets the model obtain lower-dimensional data
while preserving as much of the data's variation as possible. The first
principal component can equivalently be defined as a direction that maximizes
the variance of the projected data.

PCA is an unsupervised learning technique, so model training doesn't require
either labels or input data that is split into sets for training and evaluation.

#### `NUM_PRINCIPAL_COMPONENTS`

**Syntax**

`NUM_PRINCIPAL_COMPONENTS = int64_value`

**Description**

The number of principal components to keep.

You must specify either `NUM_PRINCIPAL_COMPONENTS` or
[`PCA_EXPLAINED_VARIANCE_RATIO`](#pca_explained_variance_ratio), but not both.

**Arguments**

An `INT64` value. This value can't be larger than the
total number of rows or the total feature cardinalities after one-hot encoding
the categorical features.

#### `PCA_EXPLAINED_VARIANCE_RATIO`

**Syntax**

`
PCA_EXPLAINED_VARIANCE_RATIO = float64_value
`

**Description**

The ratio for the explained variance. The number of principal components is
selected such that the percentage of variance explained by the principal
components is greater than the ratio specified by this argument.

You must specify either `PCA_EXPLAINED_VARIANCE_RATIO` or
[`NUM_PRINCIPAL_COMPONENTS`](#num_principal_components), but not both.

**Arguments**

A `FLOAT64` value in the range `(0, 1)`.

#### `SCALE_FEATURES`

**Syntax**

```sql
SCALE_FEATURES = { TRUE | FALSE }
```

**Description**

Determines whether or not to scale the numerical features to unit variance. The
input numerical features are always centered to have zero mean value.
Separately, categorical features are one-hot encoded.

**Arguments**

A `BOOL` value. The default value is `TRUE`.

#### `PCA_SOLVER`

**Syntax**

```sql
PCA_SOLVER = { 'FULL' | 'RANDOMIZED' | 'AUTO' }
```

**Description**

The solver to use to calculate the principal components.

**Arguments**

This option accepts the following values:

- `FULL`: Run a full [eigendecomposition](https://en.wikipedia.org/wiki/Eigendecomposition_of_a_matrix) algorithm. In this case, the maximum allowed feature cardinality after one-hot encoding the categoricals is dynamically estimated. The primary factor that determines the feature cardinality value is the lengths of the feature names, and this value isn't affected by the values of the [`NUM_PRINCIPAL_COMPONENTS`](#num_principal_components) or [`PCA_EXPLAINED_VARIANCE_RATIO`](#pca_explained_variance_ratio) options. As a guideline, the maximum allowed feature cardinality typically falls between 1,000 and 1,500. If the total feature cardinality of the input data violates the estimated maximum value, then an invalid query error is returned.
- `RANDOMIZED`: Run a randomized PCA algorithm. In this case, the maximum
  allowed feature cardinality is 10,000. If the feature
  cardinality of the input data is less than 10,000, then the cap on the number
  of principal components to compute is dynamically determined based on resource
  constraints.

  - If you specify [`NUM_PRINCIPAL_COMPONENTS`](#num_principal_components), then the value for `NUM_PRINCIPAL_COMPONENTS` must be less than or equal to 10,000. Larger values result in invalid query errors.
  - If you specify [`PCA_EXPLAINED_VARIANCE_RATIO`](#pca_explained_variance_ratio), then up to 100 principal components are computed, subject to feature cardinality and resource constraints. If their total explained variance ratio is less than the `PCA_EXPLAINED_VARIANCE_RATIO` value, then they are all returned; otherwise a subset is returned.
- `AUTO`: This is the default. In this case, the solver is selected by a
  default policy based on the input data.
  Typically, when the feature cardinality after one-hot encoding all the
  categoricals is less than a dynamically determined threshold, the exact full
  eigendecomposition is computed. Otherwise, randomized PCA is performed. The
  dynamically determined threshold typically falls between 1,000 and 1,500. The
  number of rows in the input data is not considered when choosing the solver.

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

```bash
'projects/my_project/locations/my_location/keyRings/my_ring/cryptoKeys/my_key'
```

#### `query_statement`

The `AS query_statement` clause specifies the
GoogleSQL query used to generate the training data. See the
[GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax)
page for the supported SQL syntax of the `query_statement` clause.

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Examples

The following examples create models named `mymodel` in `mydataset` in your
default project.

#### Use the `NUM_PRINCIPAL_COMPONENTS` option

**Example 1**

This example creates a PCA model with four principal components.

```sql
CREATE MODEL
  `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE='PCA',
    NUM_PRINCIPAL_COMPONENTS=4 ) AS
SELECT
  *
FROM `mydataset.mytable`
```

**Example 2**

This example performs dimensionality reduction with the
`mydataset.iris_pca` PCA model with input features.

```sql
CREATE MODEL
  `mydataset.iris_pca`
OPTIONS
  ( MODEL_TYPE='PCA',
    NUM_PRINCIPAL_COMPONENTS=2,
    SCALE_FEATURES=FALSE ) AS
SELECT
  sepal_length,
  sepal_width,
  petal_length,
  petal_width
FROM `bigquery-public-data.ml_datasets.iris`;
```

The following sample transforms the input features using the
`mydataset.iris_pca` model into a lower dimensional space, which is then used
to train the `mydataset.iris_logistic` model. `mydataset.iris_logistic` will be
a better ML model if the original input features are afflicted by the curse of
dimensionality.

```sql
CREATE MODEL
  `mydataset.iris_logistic`
OPTIONS
  ( MODEL_TYPE='LOGISTIC_REG',
    INPUT_LABEL_COLS=['species'] ) AS
SELECT
  *
FROM
  ML.PREDICT(
    MODEL `mydataset.iris_pca`,
    (
      SELECT
        sepal_length,
        sepal_width,
        petal_length,
        petal_width,
        species
      FROM `bigquery-public-data.ml_datasets.iris`
    )
  );
```

#### Use the `PCA_EXPLAINED_VARIANCE_RATIO` option

This example creates a PCA model, where the number of principal components is
selected such that the percentage of variance explained by them is greater than
0.8.

```sql
CREATE MODEL
  `mydataset.mymodel`
OPTIONS
  ( MODEL_TYPE='PCA',
    PCA_EXPLAINED_VARIANCE_RATIO=0.8 ) AS
SELECT
  *
FROM
  `mydataset.mytable`
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-pca (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
