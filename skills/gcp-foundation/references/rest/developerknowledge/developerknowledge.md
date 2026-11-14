---
source: https://developerknowledge.googleapis.com/$discovery/rest?version=v1
---

# Developer Knowledge API REST API (developerknowledge)

## Signature / Usage

Base URL: `https://developerknowledge.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `developerknowledge.documents.batchGet`

- Versions: v1, v1alpha
- `GET https://developerknowledge.googleapis.com/v1/documents:batchGet`
- Retrieves multiple documents, each with its full Markdown content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BatchGetDocumentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `names` | query | string | no | Required. Specifies the names of the documents to retrieve. A maximum of 20 documents can be retrieved in a batch. The documents are returned in the same order as the `names` in the request. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buc… |
| `view` | query | string enum | no | Optional. Specifies the DocumentView of the document. If unspecified, DeveloperKnowledge.BatchGetDocuments defaults to `DOCUMENT_VIEW_CONTENT`. |

### `developerknowledge.documents.get`

- Versions: v1, v1alpha
- `GET https://developerknowledge.googleapis.com/v1/{+name}`
- Retrieves a single document with its full Markdown content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Document`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Specifies the name of the document to retrieve. Format: `documents/{uri_without_scheme}` Example: `documents/docs.cloud.google.com/storage/docs/creating-buckets` The name must not exceed 500 characters; values longer than 500 characters will result in an `INVALID_ARGUMENT` error. |
| `view` | query | string enum | no | Optional. Specifies the DocumentView of the document. If unspecified, DeveloperKnowledge.GetDocument defaults to `DOCUMENT_VIEW_CONTENT`. |

### `developerknowledge.documents.searchDocumentChunks`

- Versions: v1, v1alpha
- `GET https://developerknowledge.googleapis.com/v1/documents:searchDocumentChunks`
- Searches for developer knowledge across Google's developer documentation. Returns DocumentChunks based on the user's query. There may be many chunks from the same Document. To retrieve full documents, use DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments with the DocumentChunk.parent returned in the SearchDocumentChunksResponse.results.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchDocumentChunksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | no | Optional. Applies a strict filter to the search results. The expression supports a subset of the syntax described at https://google.aip.dev/160. While `SearchDocumentChunks` returns DocumentChunks, the filter is applied to `DocumentChunk.document` fields. Supported fields for filtering: \* `content\_… |
| `pageSize` | query | integer (int32) | no | Optional. Specifies the maximum number of results to return. The service may return fewer than this value. If unspecified, at most 5 results will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. Contains a page token, received from a previous `SearchDocumentChunks` call. Provide this to retrieve the subsequent page. |
| `query` | query | string | no | Required. Provides the raw query string provided by the user, such as "How to create a Cloud Storage bucket?". The query must not exceed 500 characters; values longer than 500 characters will result in an `INVALID_ARGUMENT` error. |

### `developerknowledge.answerQuery`

- Versions: v1, v1alpha
- `POST https://developerknowledge.googleapis.com/v1:answerQuery`
- Answers a query using grounded generation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AnswerQueryRequest`; Response: `AnswerQueryResponse`

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `developerknowledge` (retrieved 2026-11-14). Resources on this page: documents, v1.
- Message schemas are listed under `references/rest-schemas/developerknowledge/`.
- Source: https://developerknowledge.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
