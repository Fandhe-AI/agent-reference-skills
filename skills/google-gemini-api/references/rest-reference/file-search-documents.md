---
source: https://ai.google.dev/api/file-search/documents
---

# File Search Documents (fileSearchStores.documents.*)

REST reference for `Document`s in a File Search store: a `Document` is a collection of `Chunk`s. The File Search API references your raw source files, or documents, as temporary File objects.

## Signature / Usage

```text
DELETE https://generativelanguage.googleapis.com/v1beta/{name=fileSearchStores/*/documents/*}
GET    https://generativelanguage.googleapis.com/v1beta/{name=fileSearchStores/*/documents/*}
GET    https://generativelanguage.googleapis.com/v1beta/{parent=fileSearchStores/*}/documents
```

JSON representation of the `Document` resource:

```json
{
  "name": "string",
  "displayName": "string",
  "customMetadata": [ { "...": "CustomMetadata" } ],
  "updateTime": "string",
  "createTime": "string",
  "state": "enum (State)",
  "sizeBytes": "string",
  "mimeType": "string"
}
```

## Options / Props

| Method | Parameters | Response |
|------|------|-------------|
| delete | `name` (path, required), e.g. `fileSearchStores/my-file-search-store-123/documents/the-doc-abc`; `force` (query, optional): if true, related `Chunk`s are deleted too; if false (default), `FAILED_PRECONDITION` is returned when the `Document` contains any `Chunk`s | empty JSON object |
| get | `name` (path, required) | `Document` |
| list | `parent` (path, required): `fileSearchStores/{filesearchstore}`; `pageSize` (optional; default at most 10, maximum 20), `pageToken` (optional) | `{ "documents": [Document], "nextPageToken": string }`, sorted by ascending `create_time` |

`Document` fields:

| Name | Type | Description |
|------|------|-------------|
| name | string | Immutable. Identifier. ID up to 40 characters, lowercase alphanumeric or dashes, cannot start or end with a dash. If empty on create, derived from `displayName` plus a 12 character random suffix. |
| displayName | string | Optional. At most 512 characters. |
| customMetadata[] | object (CustomMetadata) | Optional. User-provided key-value pairs used for querying. A `Document` can have a maximum of 20 `CustomMetadata`. |
| updateTime / createTime | string (Timestamp) | Output only. |
| state | enum (State) | Output only. `STATE_UNSPECIFIED`, `STATE_PENDING` (Chunks being processed: embedding and vector storage), `STATE_ACTIVE` (all Chunks processed and available for querying), `STATE_FAILED`. |
| sizeBytes | string | Output only. Size of raw bytes ingested. |
| mimeType | string | Output only. |

`CustomMetadata`: `key` (string, required) plus a union `value`: `stringValue` (string), `stringListValue` (`StringList` with `values[]`), `numericValue` (number).

## Notes

- Availability: v1beta. The endpoints on this page are listed under v1beta; the api-versions table (migration/api-versions.md) also marks the File Search Stores Route (which hosts documents) as available in v1. The source page has no code examples; endpoint lines and the JSON representation above are verbatim.
- Documents are created by uploading or importing files into a store (see file-search-stores.md).
- For retrieval-side tooling in other providers see openai-agents and anthropic-api-tools-mcp; for self-managed vector search see upstash and fandhe-db.
- Docs fetched 2026-10-16.

## Related

- [File Search Stores](./file-search-stores.md)
- [Files](./files.md)
