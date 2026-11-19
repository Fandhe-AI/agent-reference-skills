---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-chunk-document
---

# The AI.CHUNK_DOCUMENT function

## Signature / Usage

This document describes the `AI.CHUNK_DOCUMENT` function, a table-valued
function that splits unstructured documents into semantically coherent text
chunks based on document layout and structure.

The `AI.CHUNK_DOCUMENT` function uses the
[Document AI layout parser](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk)
to analyze document structure, including headings, sections, paragraphs,
lists, and tables. It preserves semantic context across structural boundaries
to generate chunks that are optimized for vector embedding and
Retrieval-Augmented Generation (RAG) workflows. This function has the following
benefits:

- BigQuery automatically provisions and manages a Document AI layout parser; you don't have to create or train a model.
- The function uses a single processor per project, which prevents redundant provisioning across queries.
- You can use documents stored in Cloud Storage by specifying their URI path patterns, such as `'gs://bucket/folder/*.pdf'`.
- The function splits documents into semantically coherent chunks, rather than arbitrarily by character or word count.

The following query shows how to chunk a document stored in a
Cloud Storage bucket:

```googlesql
SELECT *
FROM AI.CHUNK_DOCUMENT('gs://cloud-samples-data/documentai/SampleDocuments/OCR_PROCESSOR/Winnie_the_Pooh_3_Pages.pdf');
```

### Details

To use the `AI.CHUNK_DOCUMENT` function, you must enable the
Document AI API (`documentai.googleapis.com`). When you run
`AI.CHUNK_DOCUMENT`, BigQuery automatically
creates a Document AI layout parser processor named
`bq-created-layout-parser` in your project if one doesn't already exist.

The `AI.CHUNK_DOCUMENT` function accepts the following input sources:

- A Cloud Storage URI string literal with optional wildcard matching.
- An object table.
- A subquery that contains an `ObjectRef` column named `ref`.
- A table or subquery that contains a `JSON` column named `parsed_document` that contains the output of the [`AI.PARSE_DOCUMENT` function](ai-parse-document.md) with the `raw-docai` schema.

The `AI.CHUNK_DOCUMENT` function supports the
[file formats](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk#parser-types)
handled by the Document AI layout parser and is subject to the
[layout parser limitations](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk#limitations).

### Syntax

```googlesql
AI.CHUNK_DOCUMENT(
  { 'STORAGE_URI' | TABLE INPUT_TABLE | (QUERY_STATEMENT) }
  [, connection_id => 'CONNECTION_ID' ]
  [, chunk_size => CHUNK_SIZE ]
)
```

#### Arguments

The `AI.CHUNK_DOCUMENT` function takes the following arguments:

- `STORAGE_URI`: A `STRING` literal that specifies the Cloud Storage URI to list and chunk objects from. You can use a single wildcard character (`*`) at the end of a directory path, such as `'gs://my-bucket/docs/*'`, or you can filter by a file extension, such as `'gs://my-bucket/docs/*.pdf'`. When you specify a URI, you must authenticate with your Google Account user credentials. For more information, read about [authentication with Google Account user credentials](#google-account-user-credentials).
- `TABLE INPUT_TABLE`: The name of an existing table or object table that contains an [`ObjectRef` column](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) named `ref` or a `JSON` column named `parsed_document` that contains the output of the `AI.PARSE_DOCUMENT` function with the `raw-docai` schema. When you use an object table, the `connection_id` argument is required and must match the connection ID configured on the object table. If you use a standard table, the `connection_id` argument must match the authorizer of the `ObjectRef` column. For more information, read about [authentication with a connection](#cloud-resource-connection).
- `QUERY_STATEMENT`: A subquery that returns an
  `ObjectRef` column named `ref` or a `JSON` column named `parsed_document`
  that contains the output of the `AI.PARSE_DOCUMENT` function with the
  `raw-docai` schema.

  - If the `ObjectRef` value has an authorizer, it must match the `connection_id` value.
  - If the `ObjectRef` value doesn't have an authorizer, omit the `connection_id` argument.
- `CONNECTION_ID`: A `STRING` value that specifies the
  BigQuery Cloud resource connection ID used to authenticate to
  Document AI and access Cloud Storage, in the format
  `[PROJECT_ID.]LOCATION.CONNECTION_ID`
  or
  `projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID`.
  For example, `'myproject.us.my_connection'`. If omitted,
  BigQuery uses Google Account user credentials by default. For
  more information, read about [authentication](#authentication).

- `CHUNK_SIZE`: An `INT64` value that specifies the target
  maximum chunk size, measured in tokens.
  The value must be between `1` and `2000`. The default
  value is `1000`.

### Authentication

The following sections describe how to authenticate with Google Account user
credentials or a Cloud resource connection.

#### Google Account user credentials

To authenticate using Google Account user credentials, you must have the
following roles:

- To create and use the `bq-created-layout-parser` processor, you must have the **Document AI Editor** (`roles/documentai.editor`) role on the project. If the processor already exists in the project, then you only need the **Document AI Viewer** (`roles/documentai.viewer`) role.
- You must have the **Storage Object Viewer** (`roles/storage.objectViewer`) or **Storage Object User** (`roles/storage.objectUser`) role on the Cloud Storage bucket that contains the documents.

#### Cloud resource connection

If you authenticate using a Cloud resource connection, you and your connection's
service account must have the following roles:

- To create and invoke the `bq-created-layout-parser` processor, grant the connection's service account the **Document AI Editor** (`roles/documentai.editor`) role on the project. If the processor already exists in the project, the service account only needs the **Document AI Viewer** (`roles/documentai.viewer`) role.
- Grant the connection's service account the **Storage Object Viewer** (`roles/storage.objectViewer`) role on the Cloud Storage bucket containing the documents.
- You must have the **BigQuery Connection User** (`roles/bigquery.connectionUser`) role on the connection.

### Output

The `AI.CHUNK_DOCUMENT` function returns the following columns:

- `chunk_id`: an `INT64` value containing the 1-based sequential index of the chunk within the document.
- `start_page`: an `INT64` value containing the 1-based starting page number of the chunk in the source document.
- `end_page`: an `INT64` value containing the 1-based ending page number of the chunk in the source document.
- `content`: a `STRING` value containing the extracted text content of the chunk.
- `status`: a `STRING` value containing the execution status for the document or chunk. An empty string indicates successful processing. Processing might fail because a file is unreadable, corrupt, or too large. If processing fails, the status contains the error code and message, such as `INVALID_ARGUMENT` or `PERMISSION_DENIED`.
- `uri`: a `STRING` value that contains the Cloud Storage URI of the object.
- `generation`: an `INT64` value that contains a unique identifier for the object's version.
- `content_type`: a `STRING` value that contains the MIME type of the object, for example, `image/jpeg` or `application/pdf`.
- `size`: an `INT64` value that contains the object size in bytes.
- `md5_hash`: a `STRING` value that contains the MD5 hash of the object.
- `updated`: a `TIMESTAMP` value that contains the time the object was last updated.
- `metadata`: an `ARRAY<STRUCT<name STRING, value STRING>>` value that contains additional Cloud Storage metadata.
- `ref`: an `ObjectRef` value that represents the Cloud Storage object.

### Examples

The following examples demonstrate how to use `AI.CHUNK_DOCUMENT`.

#### Chunk documents using a Cloud Storage URI

The following query parses and chunks a PDF file directly from a
Cloud Storage bucket:

```googlesql
SELECT
  chunk_id,
  start_page,
  end_page,
  content
FROM
  AI.CHUNK_DOCUMENT(
    'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/documents/crittercuisine_5000_user_manual.pdf'
  );
```

The output is similar to the following:

```text
+----------+------------+----------+----------------------------------------------------------------+
| chunk_id | start_page | end_page | content                                                        |
+----------+------------+----------+----------------------------------------------------------------+
| 1        | 1          | 6        | # CritterCuisine Pro 5000 - Automatic Pet Feeder - User Manual |
|          |            |          |                                                                |
|          |            |          | 0 P_{c} C_{2} C_{2} 10:00 C Version 1.2 (Revised: October 26,  |
|          |            |          | 2023) Welcome to the CritterCuisine Pro 5000!                  |
| 2        | 4          | 6        | # CritterCuisine Pro 5000 - Automatic Pet Feeder - User Manual |
|          |            |          |                                                                |
|          |            |          | ## 6.2.2 Programming a Meal                                    |
| 3        | 6          | 8        | # 9. Troubleshooting:                                          |
| ...      | ...        | ...      | ...                                                            |
+----------+------------+----------+----------------------------------------------------------------+
```

#### Chunk documents using an `OBJ.LIST` subquery and a connection

When documents require specific connection credentials to access
Cloud Storage, use a subquery that calls the
[`OBJ.LIST` table function](../googlesql-functions/objectref_functions.md#objlist)
and specify the `connection_id` parameter. Make sure to use the same
connection ID in both `OBJ.LIST` and `AI.CHUNK_DOCUMENT`. The following query
shows how to parse each page of the Critter Cuisine user manual by using the
`OBJ.LIST` function with `AI.CHUNK_DOCUMENT`:

```googlesql
SELECT
  chunk_id,
  start_page,
  end_page,
  content,
  ref.uri
FROM
  AI.CHUNK_DOCUMENT(
    (SELECT ref
     FROM OBJ.LIST(
       'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/document_chunks/*.pdf',
       'us.example_connection')),
    connection_id => 'us.example_connection',
    chunk_size => 250
  );
```

The output is similar to the following:

```text
+----------+------------+----------+----------------------------------------------+---------------------------------------------------+
| chunk_id | start_page | end_page | content                                      | uri                                               |
+----------+------------+----------+----------------------------------------------+---------------------------------------------------+
| 1        | 1          | 1        | Regular Monitoring: While the feeder is      | gs://...crittercuisine_5000_user_manual_page3.pdf |
|          |            |          | automatic, regularly check the food level... |                                                   |
| 2        | 1          | 1        | # 3. Product Overview and Features:...       | gs://...crittercuisine_5000_user_manual_page3.pdf |
| 1        | 1          | 1        | # CritterCuisine Pro 5000 - Automatic Pet    | gs://...crittercuisine_5000_user_manual_page1.pdf |
|          |            |          | Feeder - User Manual                         |                                                   |
| ...      | ...        | ...      | ...                                          | ...                                               |
+----------+------------+----------+----------------------------------------------+---------------------------------------------------+
```

#### Chunk documents using an `ObjectRef` column

You can pass an `ObjectRef` column into `AI.CHUNK_DOCUMENT`. You can create an
`ObjectRef` value by passing a Cloud Storage URI to the
[`OBJ.MAKE_REF` function](../googlesql-functions/objectref_functions.md#objmake_ref)
or by using an `ObjectRef` column from a table.

The following query shows how to parse a PDF file into chunks by using the
`OBJ.MAKE_REF` function and Google Account user credentials:

```googlesql
SELECT
  chunk_id,
  start_page,
  end_page,
  content
FROM
  AI.CHUNK_DOCUMENT(
    (SELECT OBJ.MAKE_REF(
       'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/documents/crittercuisine_5000_user_manual.pdf') AS ref)
  );
```

The following query shows how to parse multiple PDF files
stored in an object table. The connection specified in `AI.CHUNK_DOCUMENT` is
required and must match the connection used to create the object table.

```googlesql
CREATE OR REPLACE EXTERNAL TABLE cymbal_pets.product_manual
WITH CONNECTION us.example_connection
OPTIONS (
  object_metadata = 'SIMPLE',
  uris = ['gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/document_chunks/*.pdf']
);

SELECT *
FROM AI.CHUNK_DOCUMENT(TABLE cymbal_pets.product_manual, connection_id => 'us.example_connection');
```

#### Parse and chunk documents

The following query parses documents using the `raw-docai` schema and passes the
result to `AI.CHUNK_DOCUMENT` to produce semantic chunks:

```googlesql
SELECT
  uri,
  chunk_id,
  start_page,
  end_page,
  content
FROM
  AI.CHUNK_DOCUMENT(
    (
      SELECT
        uri,
        AI.PARSE_DOCUMENT(
          ref,
          options => JSON '{"schema": "raw-docai"}'
        ) AS parsed_document # Required for AI.CHUNK_DOCUMENT
      FROM
        OBJ.LIST(
          'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/document_chunks/*.pdf'
        )
    )
  );
```

The output is similar to the following:

```text
+---------------------------------------------------+----------+------------+----------+----------------------------------------------+
| uri                                               | chunk_id | start_page | end_page | content                                      |
+---------------------------------------------------+----------+------------+----------+----------------------------------------------+
| gs://...crittercuisine_5000_user_manual_page3.pdf | 1        | 1          | 1        | Regular Monitoring: While the feeder is      |
|                                                   |          |            |          | automatic, regularly check the food level... |
| gs://...crittercuisine_5000_user_manual_page5.pdf | 1        | 1          | 1        | 2. Speak clearly into the microphone...      |
| gs://...crittercuisine_5000_user_manual_page1.pdf | 1        | 1          | 1        | # CritterCuisine Pro 5000 - Automatic Pet    |
|                                                   |          |            |          | Feeder - User Manual                         |
| ...                                               | ...      | ...        | ...      | ...                                          |
+---------------------------------------------------+----------+------------+----------+----------------------------------------------+
```

### Pricing

Document processing with `AI.CHUNK_DOCUMENT` uses the
Document AI Layout Parser API, which is billed per processed page
according to standard
[Document AI pricing](https://docs.cloud.google.com/document-ai/pricing).

There is no idle holding fee for maintaining this processor. If you delete the
`bq-created-layout-parser` processor from the Google Cloud console,
BigQuery automatically recreates it the next time you run
`AI.CHUNK_DOCUMENT`.

BigQuery query slot usage is billed normally.

### Locations

The `AI.CHUNK_DOCUMENT` function is supported in the
`US` and `EU` multi-regions, and in all single regions within the US and EU
except `europe-west2` and `europe-west6`.

### What's next

- Learn more about [working with `ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref).
- Learn more about [`ObjectRef` functions](../googlesql-functions/objectref_functions.md).
- Learn more about [creating and querying object tables](https://docs.cloud.google.com/bigquery/docs/object-tables).
- Learn more about [parsing PDFs in a RAG pipeline](https://docs.cloud.google.com/bigquery/docs/rag-pipeline-pdf).
- Learn more about the [Document AI layout parser](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-chunk-document (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
