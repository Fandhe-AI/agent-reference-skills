# REST API: Flow Control Keys

Endpoints to inspect and manage flow control keys: waitlist size, global parallelism, pause / resume delivery, pin / unpin configuration and reset the rate state.

## Signature / Usage

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/v2/flowControl` | List all keys; array of `flowControlKey`, `waitlistSize` |
| `GET` | `/v2/flowControl/{flowControlKey}` | One key: `flowControlKey`, `waitlistSize` (404 if not found) |
| `GET` | `/v2/globalParallelism` | `parallelismMax`, `parallelismCount` across all keys |
| `POST` | `/v2/flowControl/{flowControlKey}/pause` | Stop delivering messages of the key until resumed |
| `POST` | `/v2/flowControl/{flowControlKey}/resume` | Resume delivery |
| `POST` | `/v2/flowControl/{flowControlKey}/pin` | Pin a configuration (query `parallelism`, `rate`, `period` in seconds) |
| `POST` | `/v2/flowControl/{flowControlKey}/unpin` | Remove the pinned configuration (query booleans `parallelism`, `rate`) |
| `POST` | `/v2/flowControl/{flowControlKey}/resetRate` | Reset the rate state of the key |

```yaml
servers:
  - url: https://qstash-{region}.upstash.io
    description: Regional
    variables:
      region:
        default: eu-central-1
        enum:
          - us-east-1
          - eu-central-1
security:
  - bearerAuth: []
  - bearerAuthQuery: []
```

Adapted (not in the official docs): request assembled from the documented path and Bearer authentication; `<KEY>` is a flow control key such as the one set via `flowControl.key`.

```bash
curl "https://qstash-eu-central-1.upstash.io/v2/flowControl/<KEY>" \
  -H "Authorization: Bearer $QSTASH_TOKEN"
```

## Options / Props

| Field | Type | Description |
|-------|------|-------------|
| `flowControlKey` | `string` | Flow control key name |
| `waitlistSize` | `integer` | Messages waiting because of the flow control configuration |
| `parallelismMax` | `integer` | Configured maximum global parallelism |
| `parallelismCount` | `integer` | Messages currently running globally in parallel |

Pin and unpin: normally every message carries its own flow control configuration for the key and the processing configuration follows incoming messages; pinning fixes the configuration for the key until unpinned.

## Notes

- The official Workflow API pages spell the response field `waitlistSize`, while the QStash pages and SDK responses (qstash flow-control.md, api-flow-control.md) spell it `waitListSize`; both are kept as published, so confirm against a real response before relying on the casing
- The REST API belongs to Upstash Workflow (OpenAPI title "Upstash Workflow REST API", version 2.0.0); base URL `https://qstash-{region}.upstash.io` with `region` `us-east-1` or `eu-central-1` (default `eu-central-1`); authenticate with the QStash token as Bearer token (`bearerAuth`) or as the `qstash_token` query parameter (`bearerAuthQuery`)
- This is the Workflow endpoint family (`/v2/workflows/...`, `/v2/trigger/...`); the plain QStash message API is covered by the qstash category of this skill
- The official docs list a second page titled "Get Flow Control Key" (`flow-control/get-flow-control-key-1`) whose OpenAPI path is `GET /v2/keys/rotate` with a `flowControlKey` path parameter; this looks like a documentation inconsistency and is not reproduced here
- Flow control management is also available from the Console `FlowControl` tab and the QStash client; see flow-control for the Workflow-side concepts
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/list-flow-control-keys (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/get-flow-control-key (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/get-global-parallelism (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/pause-flow-control-key (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/resume-flow-control-key (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/pin-configuration-for-flow-control-key (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/unpin-configuration-for-flow-control-key (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/flow-control/reset-rate-for-flow-control-key (fetched 2026-11-14; no version pin on the site)

## Related

- [flow-control](./flow-control.md)
- [context-run](./context-run.md)
