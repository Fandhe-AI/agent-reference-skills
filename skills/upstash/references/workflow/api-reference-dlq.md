# REST API: Dead Letter Queue

Endpoints to list, inspect, restart, resume, delete DLQ entries (single and bulk) and to retry or cancel the failure callback.

## Signature / Usage

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/v2/workflows/dlq` | List failed runs (filters below); response `messages`, `cursor` |
| `GET` | `/v2/workflows/dlq/{dlqId}` | Details of one failed run |
| `DELETE` | `/v2/workflows/dlq/{dlqId}` | Delete one entry |
| `DELETE` | `/v2/workflows/dlq` | Bulk delete (`dlqIds` or filters); response `deleted`, `cursor` |
| `POST` | `/v2/workflows/dlq/restart/{dlqId}` | Restart from the first step with a new run ID; response `workflowRunId`, `workflowCreatedAt` |
| `POST` | `/v2/workflows/dlq/restart` | Bulk restart; response `workflowRuns`, `cursor` |
| `POST` | `/v2/workflows/dlq/resume/{dlqId}` | Resume at the failed step without re-running completed steps |
| `POST` | `/v2/workflows/dlq/resume` | Bulk resume; response `workflowRuns`, `cursor` |
| `POST` | `/v2/workflows/dlq/callback/{dlqId}` | Retry a failed failure callback |
| `DELETE` | `/v2/workflows/dlq/callback/{dlqId}` | Cancel an in-progress failure callback (302 on success) |

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

Adapted (not in the official docs): request assembled from the documented path, query filters and Bearer authentication.

```bash
curl "https://qstash-eu-central-1.upstash.io/v2/workflows/dlq?count=10&label=my-label" \
  -H "Authorization: Bearer $QSTASH_TOKEN"
```

## Options / Props

### Filters (list / bulk delete / bulk restart / bulk resume)

| Name | Type | Description |
|------|------|-------------|
| `dlqIds` | `array` | Specific DLQ IDs; when given, other filters are ignored (bulk endpoints) |
| `cursor` | `string` | Pagination cursor |
| `count` | `integer` | Page size / maximum number to process; for bulk restart and resume all matching runs are processed when omitted |
| `fromDate` / `toDate` | `integer` | Unix ms, inclusive |
| `workflowUrl`, `label`, `failureFunctionState`, `callerIp`, `flowControlKey` | `array` | Multiple values supported; `label` matches runs having any of them |
| `workflowRunId` | `string` | Filter by run ID |
| `workflowCreatedAt` | `integer` | Unix ms |

### Override headers (restart and resume, single and bulk)

`Upstash-Retries`, `Upstash-Delay` (`<value><unit>`, e.g. `10s`, `5m`), `Upstash-Retry-Delay`, `Upstash-Flow-Control-Key`, `Upstash-Flow-Control-Value` (`parallelism=<value>, rate=<value>, period=<value>`), `Upstash-Label`, `Upstash-Failure-Callback`. For resume they apply to the remaining steps.

## Notes

- The REST API belongs to Upstash Workflow (OpenAPI title "Upstash Workflow REST API", version 2.0.0); base URL `https://qstash-{region}.upstash.io` with `region` `us-east-1` or `eu-central-1` (default `eu-central-1`); authenticate with the QStash token as Bearer token (`bearerAuth`) or as the `qstash_token` query parameter (`bearerAuthQuery`)
- This is the Workflow endpoint family (`/v2/workflows/...`, `/v2/trigger/...`); the plain QStash message API is covered by the qstash category of this skill
- Restart creates a new workflow run ID and executes all steps again; resume continues from the failed step. Both return `404` when a DLQ message is not found
- The failure callback state is exposed in the DLQ message as `failureCallbackInfo.state`; filter runs with a failed callback with the `failureFunctionState` filter on the list endpoint
- SDK counterparts are in client-dlq (`client.dlq.*`)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/list-failed-workflow-runs (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/get-failed-workflow-run (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/delete-failed-workflow-run (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/bulk-delete-failed-workflow-runs (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/restart-workflow-from-dlq (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/bulk-restart-workflows-from-dlq (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/resume-workflow-from-dlq (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/bulk-resume-workflows-from-dlq (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/retry-failure-callback (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/dlq/cancel-in-progress-failure-callback (fetched 2026-11-14; no version pin on the site)

## Related

- [dlq](./dlq.md)
- [client-dlq](./client-dlq.md)
- [failure-callback](./failure-callback.md)
