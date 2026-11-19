---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-xgboost
---

# The CREATE MODEL statement for importing XGBoost models

## Signature / Usage

This document describes the `CREATE MODEL` statement for importing
[XGBoost](https://xgboost.readthedocs.io/en/stable/) models into
BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for imported models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-import).

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL}
model_name
[INPUT(field_name field_type, …)
 OUTPUT(field_name field_type, …)]
OPTIONS(MODEL_TYPE = 'XGBOOST', MODEL_PATH = string_value
  [, KMS_KEY_NAME = string_value ]
);
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

#### `INPUT OUTPUT` clause

The `INPUT OUTPUT` clause lets you specify the model input output schema
information when you create the XGBoost model.

`INPUT OUTPUT` is optional only if `feature_names` and `feature_types`
are both specified in the model file. For more information about how to store
`feature_names` and `feature_types` in the XGBoost model file,
see [Introduction to Model IO](https://xgboost.readthedocs.io/en/stable/tutorials/saving_model.html).

##### `field_name`

Use `field_name` to define the name of an input feature or a model output.

If the `feature_names` field is populated in the XGBoost model file, the
input field names must be identical to the names in the `feature_names` field.
For more information, see the XGBoost model
[JSON Schema](https://xgboost.readthedocs.io/en/stable/tutorials/saving_model.html#json-schema).

##### `field_type`

Use `field_type` to specify the data type of an input feature or a model
output. Input data types must be one of the supported
[numeric types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types?_gl=1*8e0821*_ga*MjA2ODgzNzQ1NS4xNjc2NDg3ODM1#numeric_types).
The output data type must be [`FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types?_gl=1*8e0821*_ga*MjA2ODgzNzQ1NS4xNjc2NDg3ODM1#floating_point_types).

**Example**

```sql
INPUT(f1 INT64, f2 FLOAT64, f3 FLOAT64)
OUTPUT(predicted_label FLOAT64)
```

#### `MODEL_TYPE`

**Syntax**

```sql
MODEL_TYPE = 'XGBOOST'
```

**Description**

Specifies the model type. This option is required.

#### `MODEL_PATH`

**Syntax**

```sql
MODEL_PATH = string_value
```

**Description**

Specifies the [Cloud Storage URI](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage#gcs-uri)
of the XGBoost model to import. This option is required.

**Arguments**

A `STRING` value specifying the URI of a Cloud Storage bucket that contains
the model to import.

BigQuery ML imports the model from Cloud Storage by using the
credentials of the user who runs the `CREATE MODEL` statement.

**Example**

```sql
MODEL_PATH = 'gs://bucket/path/to/xgboost_model/*'
```

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

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Limitations

Imported XGBoost models have the following limitations:

- The XGBoost model must already exist before it can be imported into BigQuery.
- Models must be stored in Cloud Storage.
- XGBoost models must be in `BST`, `UBJ` or `JSON` format.
- You can only use XGBoost models with the [`ML.PREDICT`](predict.md) and [`ML.FEATURE_IMPORTANCE`](importance.md) functions.
- Models are limited to 250 MB in size.
- The memory limit to load and run the XGBoost model is 840 MB. You can reduce the model size by using fewer trees or shallower tree depth, or by using the XGBoost library's default `save_model` method to save the models.
- BigQuery ML uses the [XGBoost 3.1.0](https://xgboost.readthedocs.io/en/release_3.1.0/index.html) library to load and make predictions on XGBoost models. Forward compatibility for models saved with XGBoost version 3.2.0 or newer is not guaranteed.
- BigQuery XGBoost models only support [numeric types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_types) as input data types and [`FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) as the output data type.
- Categorical features that use XGBoost built-in [categorical data](https://xgboost.readthedocs.io/en/stable/tutorials/categorical.html) support are treated as integer inputs.
- BigQuery XGBoost models only support a single scalar or array output. [Multiple outputs](https://xgboost.readthedocs.io/en/stable/tutorials/multioutput.html) aren't supported.
- You can only use an imported XGBoost model with an object table when you use capacity-based pricing through reservations. On-demand pricing isn't supported.

### Examples

The following examples show how to create different types of imported
XGBoost models.

#### Import a model and specify input and output columns

The following example imports a XGBoost model into BigQuery as a
BigQuery model. The example assumes the following:

- There is an existing XGBoost model located at `gs://bucket-name/xgboost-model/*`.
- The model file is in `BST`, `JSON` or `UBJ` format.
- The model file doesn't contain information about input `feature_names` and `feature_types`.

```sql
CREATE OR REPLACE
  MODEL
    `project_id.mydataset.mymodel`
      INPUT(f1 float64, f2 float64, f3 float64, f4 float64)
      OUTPUT(predicted_label float64)
  OPTIONS (
    MODEL_TYPE = 'XGBOOST',
    MODEL_PATH = 'gs://bucket-name/xgboost-model/*')
```

#### Import a model that already contains input and output columns

The following example imports a XGBoost model into BigQuery as a
BigQuery model. The example assumes the following:

- There is an existing XGBoost model located at `gs://bucket-name/xgboost-model/*`.
- The model file is in `BST`, `JSON` or `UBJ` format.
- The model file contains information about input `feature_names` and `feature_types`.

```sql
CREATE OR REPLACE
  MODEL
    `project_id.mydataset.mymodel`
  OPTIONS (
    MODEL_TYPE = 'XGBOOST',
    MODEL_PATH = 'gs://bucket-name/xgboost-model/*')
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-xgboost (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
