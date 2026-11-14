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

Query parameters: `cursor`, `messageId`, `state`, `url`, `topicName`, `scheduleId`, `queueName`, `fromDate` / `toDate` (unix ms, inclusive), `count` (default 100), `label` (multi-value).

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

Log entry fields: `time`, `messageId`, `header`, `body` (base64), `state`, `error`, `nextDeliveryTime`, `url`, `topicName`, `endpointName`, `scheduleId`, `queueName`, `responseStatus` / `responseBody` / `responseHeaders` (only for `ERROR`), `timeout`, `method`, `callback`, `callbackHeaders`, `failureCallback`, `failureCallbackHeaders`, `maxRetries`, `retryDelayExpression`, `labels`.

## Notes

- The `state` filter enum lists `IN_PROGRESS`; the response `state` enum in the same spec lists `FAILED` instead of `IN_PROGRESS` (the filter table also describes `FAILED`). Both are kept as published.
- SDK equivalent: `logs.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/logs/list-logs (fetched 2026-11-14; no version pin on the site)

## Related

- [logs.md](./logs.md)
- [api-messages.md](./api-messages.md)
