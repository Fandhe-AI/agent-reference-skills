---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-automl
---

# The CREATE MODEL statement for AutoML models

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating
[AutoML classification and regression models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/classification-regression/overview)
in BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself. AutoML lets you quickly build large-scale
machine learning models on tabular data.

You can use AutoML regressor models with the
[`ML.PREDICT` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict)
to perform [regression](https://docs.cloud.google.com/bigquery/docs/regression-overview), and you can use
AutoML classifier models with the `ML.PREDICT` function to
perform [classification](https://docs.cloud.google.com/bigquery/docs/classification-overview). You can use
both types of AutoML models with the
`ML.PREDICT` function
to perform [anomaly detection](https://docs.cloud.google.com/bigquery/docs/anomaly-detection-overview).

BigQuery ML uses the default values for
[AutoML training options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/classification-regression/train-model),
including [data splitting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/data-splits) and
[optimization functions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/classification-regression/train-model#optimization-objectives).

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
MODEL_TYPE = { 'AUTOML_REGRESSOR' | 'AUTOML_CLASSIFIER' }
    [, BUDGET_HOURS = float64_value ]
    [, OPTIMIZATION_OBJECTIVE = { string_value | struct_value } ]
    [, INPUT_LABEL_COLS = string_array ]
    [, DATA_SPLIT_COL = string_value ]
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
MODEL_TYPE = { 'AUTOML_REGRESSOR' | 'AUTOML_CLASSIFIER' }
```

**Description**

Specifies the model type. This option is required.

**Arguments**

This option accepts the following values:

- `AUTOML_REGRESSOR`: This creates a regression model that uses a label column with a numeric data type.
- `AUTOML_CLASSIFIER`: This creates a classification model that uses a label column with either a string or a numeric data type.

#### `BUDGET_HOURS`

**Syntax**

`BUDGET_HOURS = float64_value`

**Description**

Sets the training budget in hours for AutoML training.

After training an AutoML model, BigQuery ML
compresses the model to ensure it is small enough to import, which can take up
to 50% of the training time. The time to compress the model is not included
in the training budget time.

**Arguments**

A `FLOAT64` value between `1.0` and `72.0`. The default value is `1.0`.

#### `OPTIMIZATION_OBJECTIVE`

**Syntax**

`OPTIMIZATION_OBJECTIVE = { string_value | struct_value }`

**Description**

Sets the optimization objective function to use for AutoML
training.

For more details on the optimization objective functions, see the
[AutoML documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/classification-regression/train-model#optimization-objectives).

**Arguments**

This option can be specified as a `STRING` or `STRUCT` value.

This option accepts the following string values for optimization objective
functions:

- For regression:
  - `MINIMIZE_RMSE`(default)
  - `MINIMIZE_MAE`
  - `MINIMIZE_RMSLE`
- For binary classification:
  - `MAXIMIZE_AU_ROC`(default)
  - `MINIMIZE_LOG_LOSS`
  - `MAXIMIZE_AU_PRC`
  - `MAXIMIZE_PRECISION_AT_RECALL`
  - `MAXIMIZE_RECALL_AT_PRECISION`
- For multiclass classification:
  - `MINIMIZE_LOG_LOSS`

For example:

```sql
OPTIMIZATION_OBJECTIVE = 'MAXIMIZE_AU_ROC'
```

For binary classification models, you can alternatively specify a struct value
for this option. The struct must contain a `STRING` value and a `FLOAT64` value
in one of the following combinations:

- The string value is `MAXIMIZE_PRECISION_AT_RECALL` and the float value
  specifies the fixed recall value, which must be in the range of `[0,1]`.

- The string value is `MAXIMIZE_RECALL_AT_PRECISION` and the float value
  specifies the fixed precision value, which must be in the range of `[0,1]`.

For example:

```sql
OPTIMIZATION_OBJECTIVE = STRUCT('MAXIMIZE_PRECISION_AT_RECALL', 0.3)
```

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

Supported data types for `input_label_cols` include the following:

| `Model type` | `Supported label types` |
|---|---|
| `automl_regressor` | [`INT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#integer_types) [`NUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_type) [`BIGNUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#bignumeric_type) [`FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) |
| `automl_classifier` | Any [groupable](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties) data type |

#### `DATA_SPLIT_COL`

**Syntax**

`
DATA_SPLIT_COL = string_value
`

**Description**

The name of the column to use to sort input data into the training, validation,
or test set. Defaults to
[random splitting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/data-splits#default-data-split).

**Arguments**

The string value must be the name of one of the columns in the training data.
This column must have either a timestamp or string data type. This column is
passed directly to AutoML.

If you use a string column, rows are assigned to the appropriate dataset based
on the column's value, which must be one of the following options:

- `TRAIN`
- `VALIDATE`
- `TEST`
- `UNASSIGNED`

For more information about how to use these values, see
[Manual split](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/data-splits#classification-manual).

Timestamp columns are used to perform a
[chronological split](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/data-splits#classification-time).

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

### Supported data types for input columns

For columns other than the label column, any
[groupable](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties)
data type is supported. The BigQuery column type is used to
determine the feature column type in AutoML.

| `BigQuery type` | `AutoML type` |
|---|---|
| [`INT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#integer_types) [`NUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_type) [`BIGNUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#bignumeric_type) [`FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) | [`NUMERIC`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#numeric-transf) or [`TIMESTAMP`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#timestamp) if AutoML determines that it is a UNIX timestamp |
| [`BOOL`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#boolean_type) | [`CATEGORICAL`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#categorical-transf) |
| [`STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#string_type) [`BYTES`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#bytes_type) | Either [`CATEGORICAL`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#categorical-transf) or [`TEXT`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#text-transf), auto-selected by AutoML. |
| [`TIMESTAMP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#timestamp_type) [`DATETIME`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#datetime_type) [`TIME`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#time_type) [`DATE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#date_type) | Either [`TIMESTAMP`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#timestamp), [`CATEGORICAL`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#categorical-transf), or [`TEXT`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/datasets/data-types-tabular#text-transf), auto-selected by AutoML. |

To force a numeric column to be treated as categorical, use the
[`CAST` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast)
to cast it to a BigQuery string. Arrays of supported types are
allowed and remain arrays during AutoML training.

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Limitations

AutoML models have the following limitations:

- The input data to AutoML must be between 1,000 and 200,000,000 rows, and must be less than 100 GB.
- `Global` region customer-managed encryption keys (CMEKs) and multi-region CMEKs, for example `eu` or `us`, are not supported.
- BigQuery ML AutoML models aren't visible in the AutoML user interface, and aren't available for batch or online predictions in AutoML.
- The [default maximum number of concurrent training jobs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) is 5. Raising the Gemini Enterprise Agent Platform quota does not modify this quota. If you receive the error `Too many AutoML training queries have been issued within
  a short period of time`, you can submit a request to raise the maximum number of concurrent training jobs. To request an increase, email bqml-feedback@google.com with your project ID and the details of your request.
- Column names for feature columns must be 125 characters or fewer.
- For `AUTOML_CLASSIFIER` models, the `label` column can contain up to 1,000 unique values; that is, the number of classes is less than or equal to 1,000. If you need to classify into more than 1,000 labels, contact [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

### `CREATE MODEL` example

The following example creates a model named `mymodel` in `mydataset` in your
default project. It uses the public `nyc-tlc.yellow.trips` taxi trip data
available in BigQuery. The job takes approximately 3 hours to
complete, including training, model compression, temporary data movement (to
AutoML), and setup tasks.

Create the model:

```sql
CREATE OR REPLACE MODEL `project_id.mydataset.mymodel`
       OPTIONS(model_type='AUTOML_REGRESSOR',
               input_label_cols=['fare_amount'],
               budget_hours=1.0)
AS SELECT
  (tolls_amount + fare_amount) AS fare_amount,
  pickup_longitude,
  pickup_latitude,
  dropoff_longitude,
  dropoff_latitude,
  passenger_count
FROM `nyc-tlc.yellow.trips`
WHERE ABS(MOD(FARM_FINGERPRINT(CAST(pickup_datetime AS STRING)), 100000)) = 1
AND
  trip_distance > 0
  AND fare_amount >= 2.5 AND fare_amount <= 100.0
  AND pickup_longitude > -78
  AND pickup_longitude < -70
  AND dropoff_longitude > -78
  AND dropoff_longitude < -70
  AND pickup_latitude > 37
  AND pickup_latitude < 45
  AND dropoff_latitude > 37
  AND dropoff_latitude < 45
  AND passenger_count > 0
```

Run predictions:

```sql
SELECT * FROM ML.PREDICT(MODEL `project_id.mydataset.mymodel`, (
    SELECT * FROM `nyc-tlc.yellow.trips` LIMIT 100))
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-automl (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
