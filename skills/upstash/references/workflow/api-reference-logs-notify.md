# REST API: Logs and Notify

Endpoints to list workflow run logs, to notify an event (with or without a target run), and to list the waiters of an event.

## Signature / Usage

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/v2/workflows/logs` | List and filter workflow runs with state and step details; response `runs`, `cursor` |
| `POST` | `/v2/notify/{eventId}` | Notify all waiters of an event ("unsafe notify": lost if nobody is waiting) |
| `POST` | `/v2/notify/{workflowRunId}/{eventId}` | Notify a specific run ("safe notify": saved and delivered even if no waiter is active yet) |
| `GET` | `/v2/waiters/{eventId}` | List active waiters of an event |

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

Adapted (not in the official docs): request assembled from the documented path, query parameters and Bearer authentication.

```bash
curl "https://qstash-eu-central-1.upstash.io/v2/workflows/logs?state=RUN_FAILED&count=10" \
  -H "Authorization: Bearer $QSTASH_TOKEN"
```

## Options / Props

### Logs: query parameters

| Name | Description |
|------|-------------|
| `cursor` | Pagination cursor |
| `workflowUrl` | Exact match; must start with `http://` or `https://` |
| `workflowRunId` | Filter by run ID |
| `workflowCreatedAt` | Unix ms |
| `workflowRuns` | Comma-separated `workflowRunId@workflowCreatedAt` pairs |
| `state` | Workflow or step state (`RUN_STARTED`, `RUN_SUCCESS`, `RUN_FAILED`, `RUN_CANCELED`, ...) |
| `fromDate` / `toDate` | Unix ms, inclusive |
| `count` | Maximum results per page |
| `trimBody` | Trim request / response bodies to this many bytes; `-1` excludes bodies |
| `label` | Multiple values supported (any match) |
| `flowControlKey`, `callerIp` | Filters |

Run objects include `workflowRunCreatedAt` (Unix ms creation time of the run) and, for invoked workflows, `workflowRunCreatedAt` of the invoker; `400` for invalid parameters, `429` when rate limited.

### Notify and waiters

The notify body is `application/json`, `text/plain` or `application/octet-stream`; success is `201`. A `Waiter` has `url`, `headers`, `deadline` (Unix seconds), `timeoutBody`, `timeoutUrl`, `timeoutHeaders`.

## Notes

- The REST API belongs to Upstash Workflow (OpenAPI title "Upstash Workflow REST API", version 2.0.0); base URL `https://qstash-{region}.upstash.io` with `region` `us-east-1` or `eu-central-1` (default `eu-central-1`); authenticate with the QStash token as Bearer token (`bearerAuth`) or as the `qstash_token` query parameter (`bearerAuthQuery`)
- This is the Workflow endpoint family (`/v2/workflows/...`, `/v2/trigger/...`); the plain QStash message API is covered by the qstash category of this skill
- SDK counterparts: client-logs (`client.logs`), client-notify (`client.notify`), client-waiters (`client.getWaiters`)
- The logs response field `workflowRunCreatedAt` is the only place in the fetched official pages where this timestamp name appears; the `context` object page does not list it. `@upstash/workflow` 1.5.0 release notes mention a CI check of `context.workflowRunCreatedAt` (https://github.com/upstash/workflow-js/releases, release notes, checked 2026-11-14); its public API status is not documented
- Source: https://upstash.com/docs/workflow/api-reference/logs/list-workflow-run-logs (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/notify/notify-event (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/notify/notify-workflow-run-event (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/notify/list-waiters (fetched 2026-11-14; no version pin on the site)

## Related

- [client-logs](./client-logs.md)
- [client-notify](./client-notify.md)
- [client-waiters](./client-waiters.md)
- [wait-for-event](./wait-for-event.md)
