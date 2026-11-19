---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-process-document
---

# The ML.PROCESS_DOCUMENT function

## Signature / Usage

This document describes the `ML.PROCESS_DOCUMENT` function, which lets you
process unstructured documents from an
[object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction) by using the
[Document AI API](https://docs.cloud.google.com/document-ai).

### Syntax

```sql
ML.PROCESS_DOCUMENT(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  { TABLE `PROJECT_ID.DATASET.OBJECT_TABLE` | (QUERY_STATEMENT) },
   [, PROCESS_OPTIONS => ( JSON 'PROCESS_OPTIONS')]
)
```

#### Arguments

`ML.PROCESS_DOCUMENT` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the dataset that contains the
  resource.

- `MODEL`: the name of a
  [remote model](create-remote-model-service.md)
  with a
  [`REMOTE_SERVICE_TYPE`](create-remote-model-service.md#remote_service_type)
  of `CLOUD_AI_DOCUMENT_V1`.

- `OBJECT_TABLE`: the name of the
  [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction)
  that contains URIs of the documents.

  The documents in the object table must be of a
  [supported type](https://docs.cloud.google.com/document-ai/docs/file-types). An error is returned for
  any row that contains a document of an unsupported type.
- `QUERY_STATEMENT`: a GoogleSQL `SELECT` query
  that only references the object table. The query can't contain `JOIN`
  operations and can't use aliases to rename columns. You must include the
  `uri` and `content_type` columns from the object table in the `SELECT`
  statement. Other columns are optional.

- `PROCESS_OPTIONS`: a `STRING` value that contains a
  [`ProcessOptions` resource](https://docs.cloud.google.com/document-ai/docs/reference/rest/v1/ProcessOptions)
  in JSON format. Use this option to configure custom processing options
  corresponding to the document processor for your use case.

  For example, you might configure process options when using the [layout parser](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk) to perform document chunking. The JSON configuration would look similar to `'{"layout_config": {"chunking_config": {"chunk_size": 250,"include_ancestor_headings": true}}}'`.

### Output

`ML.PROCESS_DOCUMENT` returns the following columns:

- `ml_process_document_result`: a `JSON` value that contains the entities returned by the Document AI API.
- `ml_process_document_status`: a `STRING` value that contains the API response status for the corresponding row. This value is empty if the operation was successful.
- The fields returned by the processor specified in the model.
- The columns from the object table or query referenced in the function input.

### Quotas

See [Cloud AI service functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions).

For quick links to update the quotas for specific Document AI API
metrics, see [Quotas list](https://docs.cloud.google.com/document-ai/quotas#quotas_list).

### Known issues

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

### Locations

`ML.PROCESS_DOCUMENT` must run in the same region as the remote model that the
function references. You can only create models based on
Document AI in the `US` and `EU`
[multi-regions](https://docs.cloud.google.com/bigquery/docs/locations#multi-regions).

### Limitations

- The function can't process documents with more than 130 pages. Any row that contains such a file returns an error.
- The function has a 120 second timeout limit per request.
- Requests are processed in batches of 10.

### Example

The following example uses the
[invoice parser](https://docs.cloud.google.com/document-ai/docs/processors-list#processor_invoice-processor)
to process the documents represented by the `documents` table.

Create the model:

```sql
CREATE OR REPLACE MODEL `myproject.mydataset.invoice_parser`
REMOTE WITH CONNECTION `myproject.myregion.myconnection`
OPTIONS (remote_service_type = 'cloud_ai_document_v1',
         document_processor='processor_id');
```

> [!NOTE]
> **Note:** For more information about how to specify a processor ID, see [Create a model](https://docs.cloud.google.com/bigquery/docs/process-document#create_a_model).

Process the documents:

```sql
SELECT *
FROM ML.PROCESS_DOCUMENT(
  MODEL `myproject.mydataset.invoice_parser`,
  TABLE `myproject.mydataset.documents`
);
```

The result is similar to the following:

```sh
ml_process_document_result | ml_process_document_status | invoice_type | currency | ... |
------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------
{"entities":[{"confidence":1,"id":"0","mentionText":"10 105,93 10,59","pageAnchor":{"pageRefs":[{"boundingPoly":{"normalizedVertices":[{"x":0.40452111,"y":0.67199326},{"x":0.74776918,"y":0.67199326},{"x":0.74776918,"y":0.68208581},{"x":0.40452111,"y":0.68208581}]}}]},"properties":[{"confidence":0.66... | | | USD |
```

### What's next

- Get step-by-step instructions on how to [process documents](https://docs.cloud.google.com/bigquery/docs/process-document) using the `ML.PROCESS_DOCUMENT` function.
- To learn more about model inference, including other functions that you can use to analyze BigQuery data, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-process-document (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
