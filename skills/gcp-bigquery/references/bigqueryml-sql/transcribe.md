---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-transcribe
---

# The ML.TRANSCRIBE function

## Signature / Usage

> [!NOTE]
> **Note:** This feature is automatically available in the [Enterprise and Enterprise Plus editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). If you use the Standard edition or [on-demand pricing](https://cloud.google.com/bigquery/pricing#on_demand_pricing) and would like to use this feature, send an email to bqml-feedback@google.com.

This document describes the `ML.TRANSCRIBE` function, which lets you
transcribe audio files from an
[object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction) by using the
[Speech-to-Text API](https://docs.cloud.google.com/speech-to-text).

### Syntax

```sql
ML.TRANSCRIBE(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  TABLE `PROJECT_ID.DATASET.OBJECT_TABLE`,
  [RECOGNITION_CONFIG => ( JSON 'RECOGNITION_CONFIG')]
)
```

#### Arguments

`ML.TRANSCRIBE` takes the following arguments:

- `PROJECT_ID`: the project that
  contains the resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of a
  [remote model](create-remote-model-service.md)
  with a [`REMOTE_SERVICE_TYPE`](create-remote-model-service.md#remote_service_type) of
  `CLOUD_AI_SPEECH_TO_TEXT_V2`.

- `OBJECT_TABLE`: the name of the
  [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction)
  that contains URIs of the audio files.

  The audio files in the object table must be of a
  [supported type](https://docs.cloud.google.com/speech-to-text/docs/encoding#audio-encodings). An error
  is returned for any row that contains an audio files of an unsupported type.
- `RECOGNITION_CONFIG`: a `STRING` value that contains a
  [`RecognitionConfig` resource](https://docs.cloud.google.com/speech-to-text/v2/docs/reference/rest/v2/projects.locations.recognizers#recognitionconfig)
  in JSON format.

  If a recognizer has been specified for the remote model by using the
  [`SPEECH_RECOGNIZER` option](create-remote-model-service.md#speech_recognizer), you can't
  specify a `RECOGNITION_CONFIG` value.

  If no recognizer has been specified for the remote model by using the
  `SPEECH_RECOGNIZER` option, you must specify a `RECOGNITION_CONFIG` value.
  This value is used to provide a configuration for the default
  recognizer. You can only use the `chirp`
  [transcription model](https://docs.cloud.google.com/speech-to-text/v2/docs/transcription-model#transcription_models)
  in the speech recognizer or `RECOGNITION_CONFIG` value that you provide.

### Output

`ML.TRANSCRIBE` returns the following columns:

- `transcripts`: a `STRING` value that contains the transcripts from processing the audio files.
- `ml_transcribe_result`: a `JSON` value that contains the result from the Speech-to-Text API.
- `ml_transcribe_status`: a `STRING` value that contains the API response status for the corresponding row. This value is empty if the operation was successful.
- The object table columns.

### Quotas

See [Cloud AI service functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions).

### Known issues

This section contains information about known issues.

<br />

#### Resource exhausted errors

Sometimes after a query job that uses this function finishes successfully,
some returned rows contain the following error message:

```sql
A retryable error occurred: RESOURCE EXHAUSTED error from <remote endpoint>
```

This issue occurs because BigQuery query jobs finish successfully
even if the function fails for some of the rows. The function fails when the
volume of API calls to the remote endpoint exceeds the quota limits for that
service. This issue occurs most often when you are running multiple parallel
batch queries. BigQuery retries these calls, but if the retries
fail, the `resource exhausted` error message is returned.

To iterate through inference calls until all rows are successfully processed,
you can use the
[BigQuery remote inference SQL scripts](https://github.com/GoogleCloudPlatform/bigquery-ml-utils/tree/master/sql_scripts/remote_inference)
or the
[BigQuery remote inference pipeline Dataform package](https://github.com/dataform-co/dataform-bqml).

#### Invalid argument errors

Sometimes after a query job that uses this function finishes successfully,
some returned rows contain the following error message:

```sh
INVALID_ARGUMENT: The audio file cannot be processed in time.
```

This issue occurs because one of the audio files being processed is too long.
Check your input audio files to make sure they are all 30 minutes or less.

### Locations

You can run the `ML.TRANSCRIBE` function in the following
[locations](https://docs.cloud.google.com/bigquery/docs/locations):

- `asia-southeast1`
- `europe-west4`
- `us-central1`
- `US`
- `EU`

`ML.TRANSCRIBE` must run in the same region as the remote model that the
function references.

### Limitations

The function can't process audio files that are longer than 30 minutes. Any row
that contains such a file returns an error.

### Example

The following example transcribes the audio files represented by the
`audio` table:

Create the model:

```sql
# Create model
CREATE OR REPLACE MODEL
`myproject.mydataset.transcribe_model`
REMOTE WITH CONNECTION `myproject.myregion.myconnection`
OPTIONS (remote_service_type = 'CLOUD_AI_SPEECH_TO_TEXT_V2',
speech_recognizer = 'projects/project_number/locations/recognizer_location/recognizer/recognizer_id');
```

Transcribe the audio files without overriding the recognizer's default
configuration:

```sql
SELECT *
FROM ML.TRANSCRIBE(
  MODEL `myproject.mydataset.transcribe_model`,
  TABLE `myproject.mydataset.audio`
);
```

Transcribe the audio files and override the recognizer's default configuration:

```sql
SELECT *
FROM ML.TRANSCRIBE(
  MODEL `myproject.mydataset.transcribe_model`,
  TABLE `myproject.mydataset.audio`,
  recognition_config => ( JSON '{"language_codes": ["en-US" ],"model": "chirp","auto_decoding_config": {}}')
);
```

The result is similar to the following:

```sh
transcripts | ml_transcribe_result | ml_transcribe_status | uri | ... |
------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------
OK Google stream stranger things from Netflix to my TV. Okay, stranger things from Netflix playing on t v smart home and it's just... | {"metadata":{"total_billed_duration":{"seconds":56}},"results":[{"alternatives":[{"confidence":0.738729,"transcript"... | | gs://mybucket/audio_files |
```

### What's next

- Get step-by-step instructions on how to [transcribe audio files from an object table](https://docs.cloud.google.com/bigquery/docs/transcribe) using the `ML.TRANSCRIBE` function.
- To learn more about model inference, including other functions you can use to analyze BigQuery data, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-transcribe (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
