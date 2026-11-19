---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-onnx
---

# The CREATE MODEL statement for importing ONNX models

## Signature / Usage

This document describes the `CREATE MODEL` statement for importing
[Open Neural Network Exchange (ONNX)](https://onnx.ai/) models into
BigQuery by using SQL. Alternatively, you can use the
Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself. ONNX is an open standard format for representing machine
learning models.

For more information about supported SQL statements and functions for this
model, see
[End-to-end user journeys for imported models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-import).

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL}
model_name
OPTIONS(MODEL_TYPE = 'ONNX', MODEL_PATH = string_value
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
MODEL_TYPE = 'ONNX'
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
of the ONNX model to import. This option is required.

**Arguments**

A `STRING` value specifying the URI of a Cloud Storage bucket that contains
the model to import.

BigQuery ML imports the model from Cloud Storage by using the
credentials of the user who runs the `CREATE MODEL` statement.

**Examples**

```sql
MODEL_PATH = 'gs://bucket/path/to/onnx_model/*'
```

```sql
MODEL_PATH = 'gs://bucket/path/to/onnx_model/model.onnx'
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

BigQuery ML supports the ONNX [Tensor type](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html#ONNX_TYPE_TENSOR)
as the type for a model input or output column. The following types aren't
supported:

- [Map type](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html#ONNX_TYPE_MAP)
- [Opaque type](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html#ONNX_TYPE_OPAQUE)
- [Sequence type](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html#ONNX_TYPE_SEQUENCE)
- [Optional type](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html#ONNX_TYPE_OPTIONAL)
- [Sparse tensor type](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html#ONNX_TYPE_SPARSETENSOR)

BigQuery ML converts some ONNX model input
and output columns to BigQuery data types, and some
[ONNX tensor element types](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/TensorInfo.OnnxTensorType.html)
aren't supported. Supported data types for input and output
columns include the following:

| ONNX Tensor type | Supported | BigQuery type |
|---|---|---|
| `ONNX_TENSOR_ELEMENT_DATA_TYPE_INT8` `ONNX_TENSOR_ELEMENT_DATA_TYPE_INT16` `ONNX_TENSOR_ELEMENT_DATA_TYPE_INT32` `ONNX_TENSOR_ELEMENT_DATA_TYPE_INT64` `ONNX_TENSOR_ELEMENT_DATA_TYPE_UINT8` `ONNX_TENSOR_ELEMENT_DATA_TYPE_UINT16` `ONNX_TENSOR_ELEMENT_DATA_TYPE_UINT32` `ONNX_TENSOR_ELEMENT_DATA_TYPE_UINT64` | Supported | [`INT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#integer_types) |
| `ONNX_TENSOR_ELEMENT_DATA_TYPE_FLOAT16` `ONNX_TENSOR_ELEMENT_DATA_TYPE_BFLOAT16` `ONNX_TENSOR_ELEMENT_DATA_TYPE_FLOAT` `ONNX_TENSOR_ELEMENT_DATA_TYPE_DOUBLE` | Supported | [`FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) |
| `ONNX_TENSOR_ELEMENT_DATA_TYPE_BOOL` | Supported | [`BOOL`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#boolean_type) |
| `ONNX_TENSOR_ELEMENT_DATA_TYPE_STRING` | Supported | [`STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#string_type) |
| `ONNX_TENSOR_ELEMENT_DATA_TYPE_COMPLEX64` `ONNX_TENSOR_ELEMENT_DATA_TYPE_COMPLEX128` | Unsupported | N/A |

### Locations

For information about supported locations, see
[Locations for non-remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-non-remote-models).

### Limitations

Imported ONNX models have the following limitations:

- ONNX models must be in `.onnx` format.
- You can only use imported ONNX models with the [`ML.PREDICT` function](predict.md).
- Model size is limited to 450 MB.
- Among [ONNX value types](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html), only the [Tensor type](https://onnxruntime.ai/docs/api/java/ai/onnxruntime/OnnxValue.OnnxValueType.html#ONNX_TYPE_TENSOR) is supported in BigQuery ML.
- BigQuery ML uses the [ONNX Runtime 1.12.0](https://onnxruntime.ai/docs/) library to make predictions on ONNX models. Check [ONNX Runtime compatibility](https://onnxruntime.ai/docs/reference/compatibility.html) for the [ONNX version](https://github.com/onnx/onnx/blob/master/docs/Versioning.md) supported by the 1.12 library.
- You can only use an imported ONNX model with an object table when you use capacity-based pricing through reservations. On-demand pricing isn't supported.

### Example

The following example imports an ONNX model into BigQuery as a
BigQuery model. The example assumes that there is an existing
ONNX model located at `gs://bucket/path/to/onnx_model/*`.

```sql
CREATE MODEL `project_id.mydataset.mymodel`
 OPTIONS(MODEL_TYPE='ONNX',
         MODEL_PATH="gs://bucket/path/to/onnx_model/*")
```

### Troubleshooting

Error: `ONNX model output 'output_probability' has unsupported ONNX type: ONNX_TYPE_SEQUENCE.`
Error: `ONNX model output 'output_probability' is a list of dictionaries, which is not supported in BigQuery ML.`
:   **Resolution:** If you convert the ONNX model from a
[scikit-learn](https://scikit-learn.org/stable/index.html) classifier by using
[sklearn-onnx](https://github.com/onnx/sklearn-onnx), set the
converter option to `zipmap=False` or `zipmap='columns'` in order to not output
a list of dictionaries for the probabilities. A list of dictionaries is
converted to a sequence of map of tensors in ONNX, and BigQuery ML
doesn't support sequences in ONNX. For more information, see
[Choose appropriate output of a classifier](https://onnx.ai/sklearn-onnx/auto_tutorial/plot_dbegin_options_zipmap.html).

### What's next

- Check the [ONNX tutorial](https://github.com/onnx/tutorials) on GitHub for converters you can use to convert your pre-trained models to ONNX format.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-onnx (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; definition-list bodies are un-indented by four spaces so that they are not read as code; the `:` markers of the twin are kept (GitHub Markdown has no definition lists); indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
