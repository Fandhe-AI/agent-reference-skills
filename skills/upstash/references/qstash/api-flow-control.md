# REST API: Flow Control

Inspect, pause, resume, pin and reset flow control keys and read global parallelism through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v2/flowControl` | List flow control keys |
| `GET` | `/v2/flowControl/{flowControlKey}` | Get one key (404 if unknown) |
| `GET` | `/v2/globalParallelism` | Global parallelism usage |
| `POST` | `/v2/flowControl/{flowControlKey}/pause` | Pause delivery for the key |
| `POST` | `/v2/flowControl/{flowControlKey}/resume` | Resume delivery |
| `POST` | `/v2/flowControl/{flowControlKey}/pin` | Pin `parallelism` / `rate` / `period` (query params) |
| `POST` | `/v2/flowControl/{flowControlKey}/unpin` | Unpin `parallelism` and / or `rate` (boolean query params, default `false`) |
| `POST` | `/v2/flowControl/{flowControlKey}/resetRate` | Reset the rate state |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path and query parameter definitions.

```bash
curl -X POST "https://qstash.upstash.io/v2/flowControl/my-key/pin?parallelism=3&rate=20&period=120" \
  -H "Authorization: Bearer <QSTASH_TOKEN>"
```

## Options / Props

### Key response fields

| Name | Type | Description |
| --- | --- | --- |
| `flowControlKey` | string | Flow control key |
| `waitListSize` | integer | Wait list size |
| `parallelismMax` | integer | Maximum parallelism |
| `parallelismCount` | integer | Current parallelism count |
| `rateMax` | integer | Maximum rate |
| `rateCount` | integer | Current rate count |
| `ratePeriod` | integer | Seconds |
| `ratePeriodStart` | integer | Unix seconds |
| `isPinnedParallelism` | boolean | Pinned parallelism |
| `isPinnedRate` | boolean | Pinned rate |
| `isPaused` | boolean | Paused |

### Global parallelism response

| Name | Description |
| --- | --- |
| `parallelismMax` | Maximum parallelism |
| `parallelismCount` | Current parallelism count |

### Errors

| Status | Description |
| --- | --- |
| `400` | Invalid flow-control key on the action endpoints |
| `500` | `resetRate` can also return this |

## Notes

- Since the February 2026 changelog entry, `GET /v2/globalParallelism` returns `{ parallelismMax, parallelismCount }` instead of the old `{ waitListSize }`, `GET /v2/flowControl` accepts an optional `search` query parameter (filter keys by name) and a reset endpoint was added (the changelog writes `POST /v2/flowControl/:flowControlKey/reset`; the OpenAPI page documents `/resetRate`, kept as published) (source: https://upstash.com/docs/qstash/overall/changelog). The `search` parameter is not in the endpoint's OpenAPI spec above.
- SDK equivalent: `flow-control.md` (`client.flowControl`).
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/flow-control/list-flow-control-keys , https://upstash.com/docs/qstash/api-reference/flow-control/get-flow-control-key , https://upstash.com/docs/qstash/api-reference/flow-control/get-global-parallelism , https://upstash.com/docs/qstash/api-reference/flow-control/pause-flow-control-key , https://upstash.com/docs/qstash/api-reference/flow-control/resume-flow-control-key , https://upstash.com/docs/qstash/api-reference/flow-control/pin-configuration-for-flow-control-key , https://upstash.com/docs/qstash/api-reference/flow-control/unpin-configuration-for-flow-control-key , https://upstash.com/docs/qstash/api-reference/flow-control/reset-rate-for-flow-control-key (fetched 2026-11-14; no version pin on the site)

## Related

- [flow-control.md](./flow-control.md)
- [api-messages.md](./api-messages.md)
