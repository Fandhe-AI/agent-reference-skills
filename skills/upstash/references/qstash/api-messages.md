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

### Publish / enqueue headers (all optional)

| Header | Description |
| --- | --- |
| `Content-Type` | Body type |
| `Upstash-Forward-*` | Forwarded headers |
| `Upstash-Method` | `GET` \| `POST` \| `PUT` \| `PATCH` \| `DELETE`, default `POST` |
| `Upstash-Timeout` | Timeout |
| `Upstash-Retries` | Default 3 |
| `Upstash-Retry-Delay` | Expression with `retried` |
| `Upstash-Delay` | Publish only; `Not-Before` wins |
| `Upstash-Not-Before` | Publish only; `Not-Before` wins |
| `Upstash-Label` | Comma-separated |
| `Upstash-Flow-Control-Key` + `Upstash-Flow-Control-Value` | `parallelism=<v>, rate=<v>, period=<v>`; publish only |
| `Upstash-Deduplication-Id` | Deduplication ID |
| `Upstash-Content-Based-Deduplication` | Content-based deduplication |
| `Upstash-Callback` / `Upstash-Callback-Forward-*` / `Upstash-Callback-*` | Callback |
| `Upstash-Failure-Callback` / `-Forward-*` / `-*` | Failure callback |
| `Upstash-Redact-Fields` | `body`, `headers`, `header[name]` |

Body: `text/plain`, `application/json` or `application/octet-stream`, passed as is. `destination` is a URL (with `http://` or `https://`) or a URL Group name (one message per endpoint, response has `messages`).

### Batch body

Array of objects:

| Name | Type | Description |
| --- | --- | --- |
| `destination` | string | Required |
| `body` | string | Body |
| `headers` | object | Accept everything the single publish API supports |
| `queue` | string | Queue |

### Bulk cancel query parameters

| Name | Type | Description |
| --- | --- | --- |
| `messageIds` | array | Other filters ignored when set |
| `topicName` | string | Filter |
| `queueName` | string | Filter |
| `url` | string | Filter |
| `host` | string | Filter |
| `path` | string | Filter |
| `label` | string | Filter |
| `flowControlKey` | string | Filter |
| `scheduleId` | string | Filter |
| `callerIp` | string | Filter (`callerIP` deprecated) |
| `fromDate` / `toDate` | unix ms | Inclusive |
| `async` | boolean | Default `false`; filter-based only, returns an `actionId` immediately |
| `count` | integer | Deprecated, ignored |

### Bulk cancel responses

| Status | Description |
| --- | --- |
| `202` | `cancelled` (by IDs) or `actionId` (`async=true`) |
| `412` | Too many bulk actions in progress (up to 1000) |
| `429` | The bulk action did not finish within one minute but keeps running; track it via `GET /v2/bulkActions` |

### Get-message response fields

| Name | Description |
| --- | --- |
| `messageId` | Message ID |
| `url` | URL |
| `topicName` | Topic name |
| `endpointName` | Endpoint name |
| `method` | Method |
| `header` | Headers |
| `body` / `bodyBase64` | Body |
| `maxRetries` | Maximum retries |
| `notBefore` | Not before |
| `createdAt` | Creation time |
| `callback` | Callback |
| `failureCallback` | Failure callback |
| `queueName` | Queue name |
| `scheduleId` | Schedule ID |
| `callerIP` | Caller IP |
| `labels` | Labels (`label` deprecated) |
| `flowControlKey` | Flow control key |
| `rate` | Rate |
| `period` | Period |
| `parallelism` | Parallelism |

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
