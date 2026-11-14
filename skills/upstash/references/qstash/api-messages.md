# REST API: Messages

Publish, enqueue, batch, get, cancel, bulk-cancel and run-now endpoints of the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/v2/publish/{destination}` | Publish to a URL or URL Group (200) |
| `POST` | `/v2/enqueue/{queueName}/{destination}` | Enqueue into a queue, created automatically if missing (200; 404 queue not found) |
| `POST` | `/v2/batch` | Publish many messages in one request (200, array of `{ messageId, deduplicated }`) |
| `GET` | `/v2/messages/{messageId}` | Get an in-flight message (404 if gone) |
| `DELETE` | `/v2/messages/{messageId}` | Cancel one message (202, `{ cancelled: 1 }`) |
| `DELETE` | `/v2/messages` | Bulk cancel by `messageIds` or filters (202) |
| `POST` | `/v2/messages/{messageId}/retry` | Run a delayed / retry-waiting message now (200; 400 invalid or queued; 404 not waiting) |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path, headers and body definitions.

```bash
curl -X POST "https://qstash.upstash.io/v2/publish/https://example.com/api/handler" \
  -H "Authorization: Bearer <QSTASH_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "Upstash-Delay: 10s" \
  -d '{"hello":"world"}'
```

## Options / Props

Publish / enqueue headers (all optional): `Content-Type`, `Upstash-Forward-*`, `Upstash-Method` (`GET` \| `POST` \| `PUT` \| `PATCH` \| `DELETE`, default `POST`), `Upstash-Timeout`, `Upstash-Retries` (default 3), `Upstash-Retry-Delay` (expression with `retried`), `Upstash-Delay` and `Upstash-Not-Before` (publish only; `Not-Before` wins), `Upstash-Label` (comma-separated), `Upstash-Flow-Control-Key` + `Upstash-Flow-Control-Value` (`parallelism=<v>, rate=<v>, period=<v>`; publish only), `Upstash-Deduplication-Id`, `Upstash-Content-Based-Deduplication`, `Upstash-Callback` / `Upstash-Callback-Forward-*` / `Upstash-Callback-*`, `Upstash-Failure-Callback` / `-Forward-*` / `-*`, `Upstash-Redact-Fields` (`body`, `headers`, `header[name]`). Body: `text/plain`, `application/json` or `application/octet-stream`, passed as is. `destination` is a URL (with `http://` or `https://`) or a URL Group name (one message per endpoint, response has `messages`).

Batch body: array of `{ destination (required), body, headers, queue }`; `headers` accept everything the single publish API supports.

Bulk cancel query parameters: `messageIds` (other filters ignored when set), `topicName`, `queueName`, `url`, `host`, `path`, `label`, `flowControlKey`, `scheduleId`, `callerIp` (`callerIP` deprecated), `fromDate` / `toDate` (unix ms, inclusive), `async` (default `false`; filter-based only, returns an `actionId` immediately), `count` (deprecated, ignored). Response 202: `cancelled` (by IDs) or `actionId` (`async=true`). `412`: too many bulk actions in progress (up to 1000). `429`: the bulk action did not finish within one minute but keeps running; track it via `GET /v2/bulkActions`.

Get-message response fields: `messageId`, `url`, `topicName`, `endpointName`, `method`, `header`, `body` / `bodyBase64`, `maxRetries`, `notBefore`, `createdAt`, `callback`, `failureCallback`, `queueName`, `scheduleId`, `callerIP`, `labels` (`label` deprecated), `flowControlKey`, `rate`, `period`, `parallelism`.

## Notes

- Messages are removed shortly after delivery, so `GET /v2/messages/{messageId}` is for in-flight (delivering / retrying) messages only.
- SDK equivalents: `publish.md`, `batch.md`, `queues.md`, `messages.md` (`cancel`, `runNow`), `bulk-actions.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/messages/publish-a-message , https://upstash.com/docs/qstash/api-reference/messages/enqueue-a-message , https://upstash.com/docs/qstash/api-reference/messages/batch-messages , https://upstash.com/docs/qstash/api-reference/messages/get-a-message , https://upstash.com/docs/qstash/api-reference/messages/cancel-a-message , https://upstash.com/docs/qstash/api-reference/messages/bulk-cancel-messages , https://upstash.com/docs/qstash/api-reference/messages/retry-a-message-now (fetched 2026-11-14; no version pin on the site)

## Related

- [publish.md](./publish.md)
- [messages.md](./messages.md)
- [api-bulk-actions.md](./api-bulk-actions.md)
