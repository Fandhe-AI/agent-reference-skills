---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model-service
---

# The CREATE MODEL statement for remote models over Cloud AI services

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating remote models
in BigQuery over Cloud AI services by using SQL. For example,
the [Cloud Natural Language API](https://docs.cloud.google.com/natural-language).
Alternatively, you can use the Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL}
`project_id.dataset.model_name`
REMOTE WITH CONNECTION `project_id.region.connection_id`
OPTIONS(REMOTE_SERVICE_TYPE = remote_service_type
[, DOCUMENT_PROCESSOR = document_processor]
[, SPEECH_RECOGNIZER = speech_recognizer]
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

#### `REMOTE WITH CONNECTION`

**Syntax**

```googlesql
`[PROJECT_ID].[LOCATION].[CONNECTION_ID]`
```

BigQuery uses a
[Cloud resource connection](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection)
to interact with

the Cloud AI service.

The connection elements are as follows:

- `PROJECT_ID`: the project ID of the project that contains the connection.
- `LOCATION`: the [location](https://docs.cloud.google.com/bigquery/docs/locations) used by the connection. The connection must be in the same location as the dataset that contains the model.
- `CONNECTION_ID`: the connection ID---for example, `myconnection`.

  To find your connection ID,
  [view the connection details](https://docs.cloud.google.com/bigquery/docs/working-with-connections#view-connections)
  in the Google Cloud console. The connection ID is the value in the last
  section of the fully qualified connection ID that is shown in
  **Connection ID** ---for example
  `projects/myproject/locations/connection_location/connections/*myconnection*`.

  To use a [default
  connection](https://docs.cloud.google.com/bigquery/docs/default-connections), specify `DEFAULT` instead of the connection string
  containing <var translate="no">PROJECT_ID</var>.<var translate="no">LOCATION</var>.<var translate="no">CONNECTION_ID</var>.

<br />

You need to grant the [Agent Platform User role](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#aiplatform.user) to the connection's service account in the project where you create the model.

If you are using the remote model to analyze unstructured data from an
[object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction), you must also grant the
[Vertex AI Service Agent role](https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.serviceAgent)
to the service account of the connection associated with the object table.
You can find the object table's connection in the Google Cloud console, on the
**Details** pane for the object table.

**Example**

```googlesql
`myproject.us.my_connection`
```

#### `REMOTE_SERVICE_TYPE`

**Syntax**

```sql
REMOTE_SERVICE_TYPE = { 'CLOUD_AI_NATURAL_LANGUAGE_V1' | 'CLOUD_AI_TRANSLATE_V3' | 'CLOUD_AI_VISION_V1' | 'CLOUD_AI_DOCUMENT_V1' | 'CLOUD_AI_SPEECH_TO_TEXT_V2' }
```

**Description**

Specifies the service to use to create the model:

- [Cloud Natural Language API](https://docs.cloud.google.com/natural-language)
- [Cloud Translation API](https://docs.cloud.google.com/translate)
- [Cloud Vision API](https://docs.cloud.google.com/vision)
- [Document AI API](https://docs.cloud.google.com/document-ai)
- [Speech-to-Text API](https://docs.cloud.google.com/speech-to-text)

After you create a remote model based on a Cloud AI service, you can use the
model with one of the following BigQuery ML functions to
analyze your BigQuery data:

- For Cloud Natural Language API models, use [`ML.UNDERSTAND_TEXT`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-understand-text)
- For Cloud Translation API models, use [`ML.TRANSLATE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-translate)
- For Cloud Vision API models, use [`ML.ANNOTATE_IMAGE`](annotate-image.md)
- For Document AI API models, use [`ML.PROCESS_DOCUMENT`](process-document.md) ([preview](https://cloud.google.com/products#product-launch-stages))
- For Speech-to-Text API models, use [`ML.TRANSCRIBE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-transcribe) ([preview](https://cloud.google.com/products#product-launch-stages))

**Example**

```sql
REMOTE_SERVICE_TYPE = 'CLOUD_AI_VISION_V1'
```

#### `DOCUMENT_PROCESSOR`

This option identifies the
[document processor](https://docs.cloud.google.com/document-ai/docs/create-processor) to use when the
`REMOTE_SERVICE_TYPE` value is `CLOUD_AI_DOCUMENT_V1`. You must use
this option when creating a remote model over the Document AI API. You
can't use this option with any other type of remote model.

A document processor from Document AI should exist when you specify
this option to create the model in BigQuery. You can create a document
processor supported by BigQuery by using one of the following options:

- Select a prebuilt processor from the **Specialized** section of the [Processor Gallery](https://console.cloud.google.com/ai/document-ai/processor-library). Supported processors have a description that starts with the word `Extract`. For example, `Invoice Parser`, `Utility Parser`, and `W2 Parser` are all supported processors. These types of processors extract predefined, domain-specific fields from the documents as output columns.
- Use the Form Parser processor or the Layout Parser processor. These processors are available in the [Processor Gallery](https://console.cloud.google.com/ai/document-ai/processor-library).
- Use [Workbench](https://console.cloud.google.com/ai/document-ai/workbench) to build a [`Custom Extractor` processor](https://docs.cloud.google.com/document-ai/docs/processors-list#processor_cde) based on an Gemini Enterprise Agent Platform [foundation model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models#foundation_model_apis). You can specify the fields for extraction, and then tune the model with custom documents that contain those fields.

You can provide the `DOCUMENT_PROCESSOR` value in one of the following formats:

- Use the processor ID if you want to use the default processor version. You can find the processor ID by [viewing the processor details page](https://docs.cloud.google.com/document-ai/docs/create-processor#get-processor). The processor ID is in the **ID** field in the **Basic information** section. The processor ID is a unique string such as `639b990bd98a132a`.
- Use the full processor name if you want to use a specific processor version. You can specify the full processor name in the following format:

```sql
projects/PROJECT_NUMBER/locations/LOCATION/processors/PROCESSOR_ID/processorVersions/PROCESSOR_VERSION
```

Replace the following:

- `PROJECT_NUMBER`: the project number of the project that contains the document processor. To find this value, [look at the processor details](https://docs.cloud.google.com/document-ai/docs/create-processor#get-processor), look at **Prediction endpoint** , and take the value following the **projects** element---for example `
  https://us-documentai.googleapis.com/v1/projects/*project_number*/locations/processor_location/processors/processor_id:process`.
- `LOCATION`: the location used by the document processor. To find this value, [look at the processor details](https://docs.cloud.google.com/document-ai/docs/create-processor#get-processor), look at **Prediction endpoint** , and take the value following the **locations** element---for example `
  https://us-documentai.googleapis.com/v1/projects/project_number/locations/*processor_location*/processors/processor_id:process`.
- `PROCESSOR_ID`: the document processor ID. To find this value, [look at the processor details](https://docs.cloud.google.com/document-ai/docs/create-processor#get-processor), look at **Prediction endpoint** , and take the value following the **processors** element---for example `
  https://us-documentai.googleapis.com/v1/projects/project_number/locations/processor_location/processors/*processor_id*:process`.
- `PROCESSOR_VERSION`: the [document processor version](https://docs.cloud.google.com/document-ai/docs/manage-processor-versions). You can find this value by [looking at the processor details](https://docs.cloud.google.com/document-ai/docs/create-processor#get-processor), selecting the **Manage Versions** tab, and copying the **Version ID** value of the version you want to use.

<br />

The `CREATE MODEL` statement fails if any of the following are true:

- The processor is not supported. To fix this, select a processor supported by BigQuery.
- The processor doesn't exist. To fix this, use an existing processor instead.
- The processor exists but is not enabled. To fix this, enable the processor.
- The processor exists in a different region than the model. To fix this, create the model and processor in the same region. The region of the model is determined by the dataset that you create it in.
- The service account of the connection that you use when creating the model doesn't have permission to access for the document processor. [Grant the **Document AI Viewer** IAM role to the service account of the connection](https://docs.cloud.google.com/bigquery/docs/process-document#grant_access_to_the_service_account).

#### `SPEECH_RECOGNIZER`

This option identifies the
[speech recognizer](https://docs.cloud.google.com/speech-to-text/v2/docs/recognizers) to optionally use when
the `REMOTE_SERVICE_TYPE` value is `CLOUD_AI_SPEECH_TO_TEXT_V2`. If you don't
specify this option, a default recognizer is used. In that case, you must
specify a value for the
[`recognition_config` argument](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-transcribe#arguments)
of the `ML.TRANSCRIBE` function when you reference the remote model. The
`recognition_config` argument value provides a configuration for the default
recognizer.

You can only use the `chirp`
[transcription model](https://docs.cloud.google.com/speech-to-text/v2/docs/transcription-model#transcription_models)
in the speech recognizer or `recognition_config` value that you provide.

You can't use this option with any other type of remote model.

The `SPEECH_RECOGNIZER` value must be a string in the following format:

```sql
projects/PROJECT_NUMBER/locations/LOCATION/recognizers/RECOGNIZER_ID
```

Replace the following:

- `PROJECT_NUMBER`: the project number of the project that contains the speech recognizer. You can find this value on the **Project info** card in the **Dashboard** page of the Google Cloud console.
- `LOCATION`: the location used by the speech recognizer. You can find this value in the **Location** field on the **List recognizers** page of the Google Cloud console.
- `RECOGNIZER_ID`: the speech recognizer ID. You can find this value in the **ID** field on the **List recognizers** page of the Google Cloud console.

<br />

### Locations

For information about supported locations, see
[Locations for remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-remote-models).

### Example

The following example creates a BigQuery ML remote model that
uses the [Cloud Vision API](https://docs.cloud.google.com/vision):

```text
CREATE MODEL `project_id.mydataset.mymodel`
REMOTE WITH CONNECTION `myproject.us.test_connection`
 OPTIONS(REMOTE_SERVICE_TYPE = 'CLOUD_AI_VISION_V1')
```

### What's next

For more information about Generative AI in BigQuery ML, see
[Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model-service (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
