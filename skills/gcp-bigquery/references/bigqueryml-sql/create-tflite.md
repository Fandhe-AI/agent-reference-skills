---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-tflite
---

# The CREATE MODEL statement for importing TensorFlow Lite models

## Signature / Usage

This document describes the `CREATE MODEL` statement for importing
[TensorFlow Lite](https://ai.google.dev/edge/litert) models into
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
OPTIONS(MODEL_TYPE = 'TENSORFLOW_LITE', MODEL_PATH = string_value
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

#### `MODEL_TYPE`

**Syntax**

```sql
MODEL_TYPE = 'TENSORFLOW_LITE'
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
of the TensorFlow Lite model to import. This option is required.

**Arguments**

A `STRING` value specifying the URI of a Cloud Storage bucket that contains
the model to import.

BigQuery ML imports the model from Cloud Storage by using the
credentials of the user who runs the `CREATE MODEL` statement.

**Example**

```sql
MODEL_PATH = 'gs://bucket/path/to/tflite_model/*'
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

### Supported data types for input and output columns

BigQuery ML converts some TensorFlow Lite model
input and output columns to BigQuery ML types, and some
[TensorFlow Lite types](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/lite/core/c/c_api_types.h#L96)
aren't supported. Supported data types for input and output columns include
the following:

| TensorFlow Lite types | Supported | BigQuery type |
|---|---|---|
| `UINT8, UINT16, UINT32, UINT64, INT8, INT16, INT32, INT64` | Supported | [`INT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#integer_types) |
| `FLOAT16, FLOAT32, FLOAT64` | Supported | [`FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) |
| `COMPLEX64, COMPLEX128` | Unsupported | N/a |
| `BOOL` | Supported | [`BOOL`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#boolean_type) |
| `STRING` | Supported | [`STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#string_type) |
| `RESOURCE` | Unsupported | N/a |
| `VARIANT` | Unsupported | N/a |

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Limitations

Imported TensorFlow Lite models have the following limitations:

- The TensorFlow Lite model must exist before you can import it into BigQuery.
- Models must be stored in Cloud Storage.
- TensorFlow Lite models must be in `.tflite` format.
- You can only use TensorFlow Lite models with the [`ML.PREDICT` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict).
- Models are limited to 450 MB in size.
- Only [TensorFlow core operations](https://ai.google.dev/edge/litert/models/op_select_allowlist#tensorflow_core_operators) and [TensorFlow Text operations](https://ai.google.dev/edge/litert/models/op_select_allowlist#tensorflow_text_and_sentencepiece_operators) are supported in BigQuery ML.
- SentencePiece operators are not supported.
- Sparse tensors are not supported.
- You can only use an imported TensorFlow Lite model with an object table when you use capacity-based pricing through reservations. On-demand pricing isn't supported.

### Example

The following example imports a TensorFlow Lite model into
BigQuery as a BigQuery ML model. The example
assumes that there is an existing TensorFlow Lite model located
at `gs://bucket/path/to/tflite_model/*`.

```sql
CREATE MODEL `project_id.mydataset.mymodel`
 OPTIONS(MODEL_TYPE='TENSORFLOW_LITE',
         MODEL_PATH="gs://bucket/path/to/tflite_model/*")
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-tflite (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
