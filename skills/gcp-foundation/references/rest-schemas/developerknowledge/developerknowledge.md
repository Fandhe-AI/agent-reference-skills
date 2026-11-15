---
source: https://developerknowledge.googleapis.com/$discovery/rest?version=v1
---

# Developer Knowledge API message schemas (developerknowledge)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/developerknowledge/`.

### `Answer`

- An answer to a query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `answerText` | string | Contains the text of the answer. |
| `citations` | array<AnswerCitation> | Output only. Contains citations for the answer. |
| `references` | array<AnswerReference> | Output only. Contains references for the answer. |

### `AnswerCitation`

- Citation info for a segment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endIndex` | integer (int32) | Output only. Indicates the end of the segment, measured in bytes (UTF-8 unicode), exclusive. If there are multi-byte characters, such as non-ASCII characters, the index measurement is longer than the string length. |
| `sources` | array<CitationSource> | Output only. Contains citation sources for the attributed segment. |
| `startIndex` | integer (int32) | Output only. Indicates the start of the segment, measured in bytes (UTF-8 unicode), inclusive. If there are multi-byte characters, such as non-ASCII characters, the index measurement is longer than the string length. |

### `AnswerQueryRequest`

- Request message for DeveloperKnowledge.AnswerQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. Applies a strict filter to the search results used to ground the answer. The expression supports a subset of the syntax described at https://google.aip.dev/160. Supported fields for filtering: \* `content_length_bytes` (INTEGER): The length of the `Document.content` field in bytes. \* `data_source` (STRING): The source of the document, e.g. `docs.cloud.google.com`. See https://developers.google.com/knowledge/reference/corpus-reference for the complete list of data sources in the corpus. \* `update_time` (TIMESTAMP): The timestamp of when the document was last meaningfully updated. A meaningful update is one that changes document's markdown content or metadata. \* `uri` (STRING): The document URI, e.g. `https://docs.cloud.google.com/bigquery/docs/tables`. INTEGER fields support `=`, `<`, `<=`, `>`, and `>=` operators. STRING fields support `=` (equals) and `!=` (not equals) operators for \*\*exact match\*\* on the whole string. Partial match, prefix match, and regexp match are not supported. TIMESTAMP fields support `=`, `<`, `<=`, `>`, and `>=` operators. Timestamps must be in RFC-3339 format, e.g., `"2025-01-01T00:00:00Z"`. You can combine expressions using `AND`, `OR`, and `NOT` (or `-`) logical operators. `OR` has higher precedence than `AND`. Use parentheses for explicit precedence grouping. Examples: \* Filter by `Document.content_length_bytes`: `content_length_bytes < 50000` \* `data_source = "docs.cloud.google.com" OR data_source = "firebase.google.com"` \* `data_source != "firebase.google.com"` \* `update_time < "2024-01-01T00:00:00Z"` \* `update_time >= "2025-01-22T00:00:00Z" AND (data_source = "developer.chrome.com" OR data_source = "web.dev")` \* `uri = "https://docs.cloud.google.com/release-notes"` The `filter` string must not exceed 500 characters; values longer than 500 characters will result in an `INVALID_ARGUMENT` error. |
| `query` | string | Required. The query to answer. |

### `AnswerQueryResponse`

- Response message for DeveloperKnowledge.AnswerQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `answer` | Answer | The answer to the query. |

### `AnswerReference`

- Represents a reference to a source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documentReference` | DocumentReference | Output only. The reference document. |

### `BatchGetDocumentsResponse`

- Response message for DeveloperKnowledge.BatchGetDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documents` | array<Document> | Contains the documents requested. |

### `CitationSource`

- Citation source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `referenceIndex` | integer (int32) | Output only. Contains the index of the Answer.AnswerReference in the `references` repeated field. |

### `Document`

- A Document represents a page of documentation in the Developer Knowledge corpus, like the page at https://docs.cloud.google.com/storage/docs/creating-buckets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | Output only. Contains the full content of the document in Markdown format. |
| `contentLengthBytes` | integer (int32) | Output only. The length of the `content` field in bytes. |
| `dataSource` | string | Output only. Specifies the data source of the document. Example data source: `firebase.google.com` |
| `description` | string | Output only. Provides a description of the document. |
| `name` | string | Identifier. Contains the resource name of the document. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buckets` |
| `title` | string | Output only. Provides the title of the document. |
| `updateTime` | string (google-datetime) | Output only. Represents the timestamp when the content or metadata of the document was last updated. |
| `uri` | string | Output only. Provides the URI of the content, such as `https://docs.cloud.google.com/storage/docs/creating-buckets`. |
| `view` | string enum | Output only. Specifies the DocumentView of the document. |

### `DocumentChunk`

- A DocumentChunk represents a piece of content from a Document in the DeveloperKnowledge corpus. To fetch the entire document content, pass the `parent` to DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | Output only. Contains the content of the document chunk. |
| `document` | Document | Output only. Represents metadata about the Document this chunk is from. The DocumentView of this Document message will be set to `DOCUMENT_VIEW_BASIC`. It is included here for convenience so that clients do not need to call DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments if they only need the metadata fields. Otherwise, clients should use DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments to fetch the full document content. |
| `id` | string | Output only. Specifies the ID of this chunk within the document. The chunk ID is unique within a document, but not globally unique across documents. The chunk ID is not stable and may change over time. |
| `parent` | string | Output only. Contains the resource name of the document this chunk is from. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buckets` |
| `relevanceScore` | number (double) | Output only. Represents the relevance score of the chunk to the search query. Higher score indicates higher chunk relevance. The score is in range \[0.0, 1.0\]. |

### `DocumentReference`

- Represents a reference to a document.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documentChunk` | DocumentChunk | Output only. Contains the document chunk. The `document_chunk.id` field is not set and will be empty. |

### `SearchDocumentChunksResponse`

- Response message for DeveloperKnowledge.SearchDocumentChunks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Provides a token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `results` | array<DocumentChunk> | Contains the search results for the given query. Each DocumentChunk in this list contains a snippet of content relevant to the search query. Use the DocumentChunk.parent field of each result with DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments to retrieve the full document content. |

### Shape of `Answer`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "answerText": "string",
  "citations": "array<AnswerCitation>",
  "references": "array<AnswerReference>"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `developerknowledge` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://developerknowledge.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
