---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-parse-document
---

# The AI.PARSE_DOCUMENT function

## Signature / Usage

This document describes the `AI.PARSE_DOCUMENT` function, a scalar function that
converts unstructured documents into structured `JSON` representations in a
single step.

The `AI.PARSE_DOCUMENT` function uses the
[Document AI layout parser](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk)
to analyze document structure and extract layout elements such as titles,
headings, paragraphs, lists, tables, and images. You can use the structured
output as input for agentic workflows, SQL analytics, or downstream chunking
with the
[`AI.CHUNK_DOCUMENT` function](ai-chunk-document.md).
This function has the following benefits:

- BigQuery automatically provisions and manages a Document AI layout parser; you don't have to create or train a model.
- The function uses a single processor per project, which prevents redundant provisioning across queries.
- You can parse documents stored in Cloud Storage and `ObjectRef` values, including Google Drive files, using Google Account user credentials.
- You can choose between two task-specific output schemas depending on your workflow:
  - `layout-v1` (default): a flat list of blocks in reading order, such as headings, paragraphs, HTML tables, and images, each with its page number and location. This schema is compact and standardized for querying in SQL or passing to agentic workflows.
  - `raw-docai`: the full nested Document AI layout tree, which keeps sections and their child elements together. Use this schema when you need hierarchical relationships or when passing the output to `AI.CHUNK_DOCUMENT`.
- You can pass the `raw-docai` output from `AI.PARSE_DOCUMENT` directly to `AI.CHUNK_DOCUMENT` to parse documents once and then chunk them.

The following query shows how to parse a document stored in a
Cloud Storage bucket:

```googlesql
SELECT
  AI.PARSE_DOCUMENT(
    'gs://cloud-samples-data/documentai/SampleDocuments/OCR_PROCESSOR/Winnie_the_Pooh_3_Pages.pdf'
  ) AS parsed_doc;
```

### Details

To use the `AI.PARSE_DOCUMENT` function, you must enable the
Document AI API (`documentai.googleapis.com`). When you run
`AI.PARSE_DOCUMENT`, BigQuery automatically creates a
Document AI layout parser processor named
`bq-created-layout-parser` in your project if one doesn't already exist.

The `AI.PARSE_DOCUMENT` function accepts the following input sources:

- A Cloud Storage URI string.
- An [`ObjectRef` value](https://docs.cloud.google.com/bigquery/docs/work-with-objectref), such as from the [`OBJ.MAKE_REF`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or [`OBJ.LIST`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objlist) functions, or from an [object table](https://docs.cloud.google.com/bigquery/docs/object-tables).

The `AI.PARSE_DOCUMENT` function supports the
[file formats](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk#parser-types)
handled by the Document AI layout parser and is subject to the
[layout parser limitations](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk#limitations),
along with the following limitations:

- The maximum supported document length is 130 pages. Selecting a specific page range isn't supported.
- Files stored in Drive are supported only when passed as an `ObjectRef` value. Passing a Drive URI directly as a `STRING` isn't supported.
- Chaining `AI.PARSE_DOCUMENT` output with `AI.CHUNK_DOCUMENT` is supported only when using the `raw-docai` schema, not the `layout-v1` schema.

### Syntax

```googlesql
AI.PARSE_DOCUMENT(
  [ document => ] DOCUMENT
  [, connection_id => 'CONNECTION_ID' ]
  [, options => OPTIONS ]
)
```

#### Arguments

The `AI.PARSE_DOCUMENT` function takes the following arguments:

- `DOCUMENT`: a `STRING` or `ObjectRef` value that
  specifies the document to parse. If `DOCUMENT` is `NULL`, the
  function returns `NULL`. You can specify one of the following:

  - A `STRING` value that specifies a Cloud Storage URI, such as `'gs://my-bucket/docs/doc.pdf'`.
  - An [`ObjectRef` value](https://docs.cloud.google.com/bigquery/docs/work-with-objectref), for example
    from `OBJ.MAKE_REF`, `OBJ.LIST`, or an object table.

    - Drive files must be passed as an `ObjectRef` value.
    - The function doesn't use the `ObjectRef` authorizer for access.
    - Access to the object is authenticated by using the `connection_id` value if specified. Otherwise, Google Account user credentials are used. We recommend that the `connection_id` value match the `ObjectRef` authorizer.
- `CONNECTION_ID`: a `STRING` value that
  specifies the BigQuery Cloud resource connection ID used to
  call Document AI and access Cloud Storage, in the
  format
  `PROJECT_ID.LOCATION.CONNECTION_ID`,
  `LOCATION.CONNECTION_ID`, or
  `projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID`.
  For example, `'myproject.us.my_connection'`. If omitted,
  BigQuery uses Google Account user credentials by default. For
  more information, see [Authentication](#authentication).

- `OPTIONS`: a `JSON` object that
  configures parsing options. The `JSON` object supports the following field:

  - `schema`: a `STRING` value that specifies the output format, either `'layout-v1'` (the default) or `'raw-docai'`. For example, `JSON '{"schema": "layout-v1"}'`. Specifying any other value returns an error.

### Authentication

The following sections describe how to authenticate with Google Account user
credentials or a Cloud resource connection.

#### Google Account user credentials

To authenticate using Google Account user credentials, you must have the
following roles and permissions:

- To create and use the `bq-created-layout-parser` processor, you must have the **Document AI Editor** (`roles/documentai.editor`) role on the project. If the processor already exists in the project, then you only need the **Document AI Viewer** (`roles/documentai.viewer`) role.
- For documents in Cloud Storage, you must have the **Storage Object Viewer** (`roles/storage.objectViewer`) or **Storage Object User** (`roles/storage.objectUser`) role on the Cloud Storage bucket that contains the documents.
- For documents in Drive, you must have view access to the Drive files.

#### Cloud resource connection

If you authenticate using a Cloud resource connection, you and your connection's
service account must have the following roles:

- To create and invoke the `bq-created-layout-parser` processor, grant the connection's service account the **Document AI Editor** (`roles/documentai.editor`) role on the project. If the processor already exists in the project, the service account only needs the **Document AI Viewer** (`roles/documentai.viewer`) role.
- Grant the connection's service account the **Storage Object Viewer** (`roles/storage.objectViewer`) role on the Cloud Storage bucket containing the documents.
- You must have the **BigQuery Connection User** (`roles/bigquery.connectionUser`) role on the connection.

### Output

The `AI.PARSE_DOCUMENT` function returns a `JSON` object with the following
fields:

- `metadata.schema`: a `STRING` value that indicates the schema used, either
  `"layout-v1"` or `"raw-docai"`.

- `errors`: an `ARRAY` of `{code, message}` objects that describe the errors
  that occurred during processing. This field is present only if processing
  failed.

- `blocks`: an `ARRAY` that contains the parsed content. This field is always
  present, and its format depends on the `schema` option:

  - `layout-v1` (default): a flat list of blocks in reading order. Each block
    has the following fields:

    - `id`: an `INT64` value containing the sequential identifier of the block, starting at `0`.
    - `type`: a `STRING` value that specifies the block type, which is one of `title`, `heading`, `text`, `table`, `image`, `list_item`, `page_header`, or `page_footer`.
    - `content`: a `STRING` value containing the text of the block. Tables are returned as HTML (`<table>...</table>`).
    - `page_number`: an `INT64` value containing the page on which the block appears, starting at `1`.
    - `bbox`: an `ARRAY<FLOAT64>` value containing the normalized bounding box `[min_y, min_x, max_y, max_x]`, with values from `0.0` to `1.0`. This field is omitted if no location is available.
  - `raw-docai`: the full nested Document AI layout tree, as
    an array of
    [`DocumentLayoutBlock` objects](https://docs.cloud.google.com/document-ai/docs/reference/rest/v1/Document#DocumentLayoutBlock)
    in camelCase. This format is verbose and is primarily intended as
    input to `AI.CHUNK_DOCUMENT`.

The following example shows truncated `layout-v1` output:

```json
{
  "metadata": {
    "schema": "layout-v1"
  },
  "blocks": [
    {
      "id": 0,
      "type": "title",
      "content": "Q4 Financial Summary",
      "page_number": 1,
      "bbox": [0.05, 0.10, 0.12, 0.40]
    },
    {
      "id": 1,
      "type": "table",
      "content": "<table><tr><td>Revenue</td><td>$10M</td></tr></table>",
      "page_number": 1,
      "bbox": [0.15, 0.10, 0.45, 0.90]
    }
  ]
}
```

The following example shows truncated `raw-docai` output:

```json
{
  "metadata": {
    "schema": "raw-docai"
  },
  "blocks": [
    {
      "blockId": "1",
      "boundingBox": {
        "normalizedVertices": [
          {"x": 0.2452, "y": 0.1262},
          {"x": 0.2452, "y": 0.1473},
          {"x": 0.7560, "y": 0.1473},
          {"x": 0.7560, "y": 0.1262}
        ]
      },
      "pageSpan": {"pageStart": 1, "pageEnd": 6},
      "textBlock": {
        "text": "Deep Reinforcement Learning for Trading",
        "type": "heading-1",
        "blocks": [
          {
            "blockId": "2",
            "pageSpan": {"pageStart": 1, "pageEnd": 1},
            "textBlock": {
              "text": "Zihao Zhang, Stefan Zohren, and Stephen Roberts",
              "type": "paragraph"
            }
          }
        ]
      }
    }
  ]
}
```

The following example shows the output when processing fails:

```json
{
  "metadata": {
    "schema": "layout-v1"
  },
  "errors": [
    {
      "code": "INVALID_ARGUMENT",
      "message": "Unsupported mime type for document parsing: text/markdown"
    }
  ],
  "blocks": []
}
```

### Examples

The following examples show how to use the `AI.PARSE_DOCUMENT` function.

#### Parse a single document

The following query parses a single Cloud Storage PDF file using the
default `layout-v1` schema:

```googlesql
SELECT
  AI.PARSE_DOCUMENT(
    'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/documents/crittercuisine_5000_user_manual.pdf'
  ) AS parsed_doc;
```

#### Parse all documents in a folder

The following query uses the
[`OBJ.LIST` table function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objlist)
to parse every PDF file under a Cloud Storage prefix:

```googlesql
SELECT
  uri,
  AI.PARSE_DOCUMENT(ref) AS parsed_doc
FROM
  OBJ.LIST(
    'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/document_chunks/*.pdf'
  );
```

#### Specify a schema in options

The following query returns the full Document AI layout tree by
specifying the `raw-docai` schema in the `options` argument:

```googlesql
SELECT
  AI.PARSE_DOCUMENT(
    'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/documents/crittercuisine_5000_user_manual.pdf',
    options => JSON '{"schema": "raw-docai"}'
  ) AS parsed_doc;
```

#### Flatten a document into rows

The following query unnests the parsed blocks so that each layout element is
returned as a separate row with its ID, type, page number, and content:

```googlesql
SELECT
  INT64(block.id) AS block_id,
  JSON_VALUE(block.type) AS block_type,
  INT64(block.page_number) AS page_number,
  JSON_VALUE(block.content) AS content
FROM
  UNNEST(
    JSON_QUERY_ARRAY(
      AI.PARSE_DOCUMENT(
        'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/documents/crittercuisine_5000_user_manual.pdf'
      ).blocks
    )
  ) AS block;
```

The output is similar to the following:

```text
+------------+------------+-------------+---------------------------------------------------+
| block_id   | block_type | page_number | content                                           |
+------------+------------+-------------+---------------------------------------------------+
| 0          | heading    | 1           | CritterCuisine Pro 5000 - Automatic Pet Feeder... |
| 1          | image      | 1           | 0 P_{c} C_{2} C_{2} 10:00 C                       |
| 2          | text       | 1           | Version 1.2 (Revised: October 26, 2023)           |
| 3          | text       | 1           | Welcome to the CritterCuisine Pro 5000! This...   |
| ...        | ...        | ...         | ...                                               |
+------------+------------+-------------+---------------------------------------------------+
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

Document processing with `AI.PARSE_DOCUMENT` uses the
Document AI Layout Parser API, which is billed per processed page
according to standard
[Document AI pricing](https://docs.cloud.google.com/document-ai/pricing).

There is no idle holding fee for maintaining this processor. If you delete the
`bq-created-layout-parser` processor from the Google Cloud console,
BigQuery automatically recreates it the next time you run
`AI.PARSE_DOCUMENT`.

BigQuery query slot usage is billed normally.

### Locations

The `AI.PARSE_DOCUMENT` function is supported in the
`US` and `EU` multi-regions, and in all single regions within the US and EU
except `europe-west2` and `europe-west6`.

### What's next

- Learn more about [chunking documents with the `AI.CHUNK_DOCUMENT` function](ai-chunk-document.md).
- Learn more about [working with `ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref).
- Learn more about [creating and querying object tables](https://docs.cloud.google.com/bigquery/docs/object-tables).
- Learn more about [parsing PDFs in a RAG pipeline](https://docs.cloud.google.com/bigquery/docs/rag-pipeline-pdf).
- Learn more about the [Document AI layout parser](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-parse-document (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
