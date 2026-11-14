# REST API: Dead Letter Queue

List, get, retry and delete dead letter queue messages (single and bulk) through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v2/dlq` | List DLQ messages (cursor pagination) |
| `GET` | `/v2/dlq/{dlqId}` | Get one DLQ message (404 if absent) |
| `POST` | `/v2/dlq/retry/{dlqId}` | Retry one (201, `{ messageId, deduplicated }`) |
| `POST` | `/v2/dlq/retry` | Bulk retry by `dlqIds` or filters (201, `{ cursor, responses[] }`; 404 if some not found) |
| `DELETE` | `/v2/dlq/{dlqId}` | Delete one |
| `DELETE` | `/v2/dlq` | Bulk delete by `dlqIds` or filters (200, `{ cursor, deleted }`) |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path and query parameter definitions.

```bash
curl "https://qstash.upstash.io/v2/dlq?count=50&responseStatus=500" \
  -H "Authorization: Bearer <QSTASH_TOKEN>"
```

## Options / Props

### List / bulk query parameters

| Name | Type | Description |
| --- | --- | --- |
| `cursor` | string | Pagination cursor |
| `messageId` | string | Filter (array filters accept multiple values) |
| `url` | string | Filter (array filters accept multiple values) |
| `topicName` | string | Filter (array filters accept multiple values) |
| `scheduleId` | string | Filter (array filters accept multiple values) |
| `queueName` | string | Filter (array filters accept multiple values) |
| `fromDate` / `toDate` | unix ms | Inclusive |
| `responseStatus` | integer | Status of the last attempt |
| `callerIp` | string | Filter (array filters accept multiple values) |
| `label` | string | Filter (array filters accept multiple values) |
| `count` | integer | Default 100; list and bulk delete |
| `flowControlKey` | string | Accepted by bulk retry and bulk delete only (not by the list endpoint) |
| `dlqIds` | array | Bulk only; overrides all other filters |

### DLQ message fields

| Name | Description |
| --- | --- |
| All message fields | `messageId`, `url`, `topicName`, `endpointName`, `method`, `header`, `body` / `bodyBase64`, `maxRetries`, `notBefore`, `createdAt`, `callback`, `failureCallback`, `queueName`, `scheduleId`, `callerIP`, `labels`, flow control fields |
| `responseStatus` | Additional DLQ field |
| `responseHeader` | Additional DLQ field |
| `responseBody` / `responseBodyBase64` | Additional DLQ field |

The list response wraps them in `messages` with a `cursor`.

## Notes

- Retrying creates new messages with the same body and headers and removes the originals from the DLQ; configuration headers (for example `Upstash-Retries: 0`) can be passed to override the original settings.
- SDK equivalent: `dlq.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/dlq/list-dlq-messages , https://upstash.com/docs/qstash/api-reference/dlq/get-a-dlq-message , https://upstash.com/docs/qstash/api-reference/dlq/retry-a-dlq-message , https://upstash.com/docs/qstash/api-reference/dlq/bulk-retry-dlq-messages , https://upstash.com/docs/qstash/api-reference/dlq/delete-a-dlq-message , https://upstash.com/docs/qstash/api-reference/dlq/bulk-delete-dlq-messages (fetched 2026-11-14; no version pin on the site)

## Related

- [dlq.md](./dlq.md)
- [retry.md](./retry.md)
