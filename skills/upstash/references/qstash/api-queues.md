# REST API: Queues

Upsert, get, list, pause, resume and delete queues through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/v2/queues` | Create or update a queue |
| `GET` | `/v2/queues` | List queues |
| `GET` | `/v2/queues/{queueName}` | Get a queue (404 if unknown) |
| `POST` | `/v2/queues/{queueName}/pause` | Pause delivery of enqueued messages |
| `POST` | `/v2/queues/{queueName}/resume` | Resume delivery |
| `DELETE` | `/v2/queues/{queueName}` | Delete a queue |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path and body definitions.

```bash
curl -X POST "https://qstash.upstash.io/v2/queues" \
  -H "Authorization: Bearer <QSTASH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"queueName":"my-queue","parallelism":2}'
```

## Options / Props

### Upsert body

| Name | Type | Description |
| --- | --- | --- |
| `queueName` | string | Queue name |
| `parallelism` | integer | Greater than 0 |

### Errors

| Status | Description |
| --- | --- |
| `400` | Invalid queue name (check the page for allowed characters) |
| `412` | Exceeded the maximum number of queues or the maximum parallelism per queue |

### Get / list response fields

| Name | Description |
| --- | --- |
| `name` | Queue name |
| `createdAt` | Unix ms |
| `updatedAt` | Unix ms |
| `parallelism` | Parallelism |
| `paused` | Paused |
| `lag` | Unprocessed messages |

## Notes

- Enqueueing (`POST /v2/enqueue/{queueName}/{destination}`) is on `api-messages.md`.
- SDK equivalent: `queues.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/queues/upsert-a-queue , https://upstash.com/docs/qstash/api-reference/queues/get-a-queue , https://upstash.com/docs/qstash/api-reference/queues/list-queues , https://upstash.com/docs/qstash/api-reference/queues/pause-queue , https://upstash.com/docs/qstash/api-reference/queues/resume-queue , https://upstash.com/docs/qstash/api-reference/queues/delete-a-queue (fetched 2026-11-14; no version pin on the site)

## Related

- [queues.md](./queues.md)
- [api-messages.md](./api-messages.md)
