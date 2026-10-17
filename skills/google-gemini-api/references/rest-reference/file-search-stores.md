---
source: https://ai.google.dev/api/file-search/file-search-stores
---

# File Search Stores (fileSearchStores.*)

REST reference for the File Search API, a hosted question answering service for building Retrieval Augmented Generation (RAG) systems: create and manage `FileSearchStore`s, import or upload files into them, and poll the resulting operations.

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/fileSearchStores
GET    https://generativelanguage.googleapis.com/v1beta/fileSearchStores
GET    https://generativelanguage.googleapis.com/v1beta/{name=fileSearchStores/*}
DELETE https://generativelanguage.googleapis.com/v1beta/{name=fileSearchStores/*}
POST   https://generativelanguage.googleapis.com/v1beta/{fileSearchStoreName=fileSearchStores/*}:importFile
POST   https://generativelanguage.googleapis.com/upload/v1beta/{fileSearchStoreName=fileSearchStores/*}:uploadToFileSearchStore   (media upload)
POST   https://generativelanguage.googleapis.com/v1beta/{fileSearchStoreName=fileSearchStores/*}:uploadToFileSearchStore          (metadata-only)
GET    https://generativelanguage.googleapis.com/v1beta/{name=fileSearchStores/*/operations/*}
GET    https://generativelanguage.googleapis.com/v1beta/{name=fileSearchStores/*/upload/operations/*}
```

JSON representation of the `FileSearchStore` resource:

```json
{
  "name": "string",
  "displayName": "string",
  "createTime": "string",
  "updateTime": "string",
  "activeDocumentsCount": "string",
  "pendingDocumentsCount": "string",
  "failedDocumentsCount": "string",
  "sizeBytes": "string",
  "embeddingModel": "string"
}
```

## Options / Props

`FileSearchStore` fields:

| Name | Type | Description |
|------|------|-------------|
| name | string | Output only. Immutable. Identifier. ID (without the "fileSearchStores/" prefix) up to 40 characters, lowercase alphanumeric or dashes; derived from `displayName` plus a 12 character random suffix, e.g. `fileSearchStores/my-awesome-file-search-store-123a456b789c`. Randomly generated if `displayName` is not provided. |
| displayName | string | Optional. At most 512 characters, including spaces. |
| createTime / updateTime | string (Timestamp) | Output only. |
| activeDocumentsCount / pendingDocumentsCount / failedDocumentsCount | string | Output only. Counts of active (ready for retrieval), being processed, and failed documents. |
| sizeBytes | string | Output only. Total size of raw bytes ingested. |
| embeddingModel | string | Optional. Format `models/{model}`. If not specified, the default embedding model will be used. |

Methods:

| Method | Parameters | Response |
|------|------|-------------|
| create | body: `displayName`, `embeddingModel` (both optional) | The new `FileSearchStore` |
| delete | `name` (path, required); `force` (query, optional): if true, related `Document`s and objects are also deleted; if false (default), `FAILED_PRECONDITION` is returned when the store contains any `Document`s | empty JSON object |
| get | `name` (path, required) | `FileSearchStore` |
| list | `pageSize` (optional; default at most 10, maximum 20), `pageToken` (optional) | `{ "fileSearchStores": [..], "nextPageToken": string }`, sorted by ascending `create_time` |
| importFile | `fileSearchStoreName` (path); body: `fileName` (required, e.g. `files/abc-123`), `customMetadata[]`, `chunkingConfig` (optional; defaults used if absent) | `Operation` |
| uploadToFileSearchStore | `fileSearchStoreName` (path); body: `displayName`, `customMetadata[]`, `chunkingConfig`, `mimeType` (inferred if omitted) | long-running operation (`name`, `metadata`, `done`, `error` or `response`) |
| operations.get / upload.operations.get | `name`: `fileSearchStores/{filesearchstore}/operations/{operation}` or `.../upload/operations/{operation}` | `Operation` (poll for result) |

## Notes

- Availability: v1beta. The endpoints on this page are listed under v1beta; the api-versions table (migration/api-versions.md) also marks the File Search Stores Route as available in v1. The source page has no code examples; the Endpoint lines and the JSON representation above are verbatim.
- `documents.*` methods and the `Document`, `CustomMetadata` models are in file-search-documents.md.
- Server-side File Search vs. a vector store: this hosted RAG service is the Gemini counterpart of openai-agents file search and anthropic-api-tools-mcp tools; for self-managed vector storage see upstash (Vector) and fandhe-db.
- Docs fetched 2026-10-16.

## Related

- [File Search Documents](./file-search-documents.md)
- [Files](./files.md)
- [Embeddings](./embeddings.md)
