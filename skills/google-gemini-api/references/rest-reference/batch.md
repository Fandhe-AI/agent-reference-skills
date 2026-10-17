---
source: https://ai.google.dev/api/batch-api
---

# Batch API (models.batchGenerateContent / batches.*)

REST reference for batch processing: enqueue a batch of `generateContent` or `embedContent` requests as a long-running `Operation`, then get, list, cancel, delete, or update it.

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/{batch.model=models/*}:batchGenerateContent
POST   https://generativelanguage.googleapis.com/v1beta/{batch.model=models/*}:asyncBatchEmbedContent
GET    https://generativelanguage.googleapis.com/v1beta/{name=batches/*}
GET    https://generativelanguage.googleapis.com/v1beta/{name=batches}
POST   https://generativelanguage.googleapis.com/v1beta/{name=batches/*}:cancel
DELETE https://generativelanguage.googleapis.com/v1beta/{name=batches/*}
PATCH  https://generativelanguage.googleapis.com/v1beta/{generateContentBatch.name=batches/*}:updateGenerateContentBatch
PATCH  https://generativelanguage.googleapis.com/v1beta/{embedContentBatch.name=batches/*}:updateEmbedContentBatch
```

JSON representation of the `GenerateContentBatch` resource:

```json
{
  "model": "string",
  "name": "string",
  "displayName": "string",
  "inputConfig": { "...": "InputConfig" },
  "output": { "...": "GenerateContentBatchOutput" },
  "createTime": "string",
  "endTime": "string",
  "updateTime": "string",
  "batchStats": { "...": "BatchStats" },
  "state": "enum (BatchState)",
  "priority": "string"
}
```

(Shape rendered from the source's JSON representation table; field names are verbatim.)

## Options / Props

`batchGenerateContent` request body (`batch.*`):

| Name | Type | Description |
|------|------|-------------|
| batch.model (path) | string | Required. Format `models/{model}`. |
| batch.displayName | string | Required. The user-defined name of this batch. |
| batch.inputConfig | object (InputConfig) | Required. Union `source`: `fileName` (name of the `File` containing the input requests) or `requests` (`InlinedRequests`: `requests[]` of `InlinedRequest` with `request` = GenerateContentRequest and optional `metadata`). |
| batch.priority | string | Optional. Batches with a higher priority value are processed before lower; negative values allowed; default is 0. |
| batch.webhookConfig.uris[] | string | Optional. If set, these webhook URIs will be used for webhook events instead of the registered webhooks. |
| batch.name, output, createTime, endTime, updateTime, batchStats, state | various | Output only. `name` format `batches/{batchId}`. |

Operation methods:

| Method | Parameters | Response |
|------|------|-------------|
| batches.get | `name`: `batches/{batches}`; empty body | `Operation` (poll at intervals recommended by the API service) |
| batches.list | `name` (`batches`); query `filter`, `pageSize`, `pageToken`, `returnPartialSuccess` (UNIMPLEMENTED unless documented otherwise) | `ListOperationsResponse` |
| batches.cancel | `name`; empty body | empty JSON object. Best-effort; on success the operation is not deleted but gets an `error` with code `1` (`Code.CANCELLED`). |
| batches.delete | `name`; empty body | empty JSON object. Does not cancel the operation. |
| batches.updateGenerateContentBatch | `generateContentBatch.name` (path), `updateMask` (query, optional); body `GenerateContentBatch` (`model`, `displayName`, `inputConfig`, `priority`) | `GenerateContentBatch` |
| batches.updateEmbedContentBatch | `embedContentBatch.name` (path), `updateMask` (query); body `EmbedContentBatch` | `EmbedContentBatch` |

`Operation` fields: `name` (server-assigned, ends with `operations/{unique_id}`), `metadata`, `done` (false while in progress), and a result union `error` (Status) or `response`.

`GenerateContentBatchOutput` union: `responsesFile` (file ID of a JSONL file, one `GenerateContentResponse` per line, same order as the input) or `inlinedResponses` (`InlinedResponses` of `InlinedResponse` with `metadata` and `error` or `response`).

`BatchStats`: `requestCount`, `successfulRequestCount`, `failedRequestCount`, `pendingRequestCount`.

`BatchState` values: `BATCH_STATE_UNSPECIFIED`, `BATCH_STATE_PENDING`, `BATCH_STATE_RUNNING`, `BATCH_STATE_SUCCEEDED`, `BATCH_STATE_FAILED`, `BATCH_STATE_CANCELLED`, `BATCH_STATE_EXPIRED`.

`ServiceTier` values: `unspecified` (standard), `standard`, `flex`, `priority`.

## Notes

- Availability: v1beta. The source page has no code examples; the shapes above are the endpoint and JSON representation lines from the page.
- This is the Gemini batch surface (an asynchronous `Operation`); compare anthropic-api-core (Message Batches) and openai-api-core (Batch API). The `webhookConfig` here refers to Gemini's registered webhooks (see webhooks.md); distinct from stripe / inngest webhooks.
- `embedContent` batches are also documented in embeddings.md (`asyncBatchEmbedContent`).
- Docs fetched 2026-10-16.

## Related

- [Embeddings](./embeddings.md)
- [Webhooks API](./webhooks.md)
- [Generating content](./generate-content.md)
