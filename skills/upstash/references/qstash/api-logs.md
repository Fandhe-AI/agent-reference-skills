# REST API: Logs

List message delivery logs through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v2/logs` | Paginate logs of published messages (200, `{ cursor, logs[] }`) |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path and query parameter definitions.

```bash
curl "https://qstash.upstash.io/v2/logs?state=ERROR&count=50" \
  -H "Authorization: Bearer <QSTASH_TOKEN>"
```

## Options / Props

### Query parameters

| Name | Type | Description |
| --- | --- | --- |
| `cursor` | string | Pagination cursor |
| `messageId` | string | Filter |
| `state` | enum | See the state table below |
| `url` | string | Filter |
| `topicName` | string | Filter |
| `scheduleId` | string | Filter |
| `queueName` | string | Filter |
| `fromDate` / `toDate` | unix ms | Inclusive |
| `count` | integer | Default 100 |
| `label` | string | Multi-value |

### State values

| `state` | Meaning |
| --- | --- |
| `CREATED` | Accepted and stored |
| `ACTIVE` | Being processed by a worker |
| `RETRY` | Scheduled to retry |
| `ERROR` | Execution errored, waiting to retry |
| `IN_PROGRESS` | Any of `ACTIVE`, `RETRY`, `ERROR` |
| `DELIVERED` | Delivered successfully |
| `CANCEL_REQUESTED` | Cancel recorded |
| `CANCELLED` | Cancel honored |

### Log entry fields

| Name | Description |
| --- | --- |
| `time` | Time |
| `messageId` | Message ID |
| `header` | Headers |
| `body` | Base64 |
| `state` | State |
| `error` | Error |
| `nextDeliveryTime` | Next delivery time |
| `url` | URL |
| `topicName` | Topic name |
| `endpointName` | Endpoint name |
| `scheduleId` | Schedule ID |
| `queueName` | Queue name |
| `responseStatus` / `responseBody` / `responseHeaders` | Only for `ERROR` |
| `timeout` | Timeout |
| `method` | Method |
| `callback` | Callback |
| `callbackHeaders` | Callback headers |
| `failureCallback` | Failure callback |
| `failureCallbackHeaders` | Failure callback headers |
| `maxRetries` | Maximum retries |
| `retryDelayExpression` | Retry delay expression |
| `labels` | Labels |

## Notes

- The `state` filter enum lists `IN_PROGRESS`; the response `state` enum in the same spec lists `FAILED` instead of `IN_PROGRESS` (the filter table also describes `FAILED`). Both are kept as published.
- SDK equivalent: `logs.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/logs/list-logs (fetched 2026-11-14; no version pin on the site)

## Related

- [logs.md](./logs.md)
- [api-messages.md](./api-messages.md)
