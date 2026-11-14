# REST API: Workflow Runs (trigger / cancel / retry a step)

Endpoints to start, batch-start and cancel workflow runs, and to execute a step that is waiting for its next retry right away.

## Signature / Usage

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/v2/trigger/{workflowUrl}` | Start a new workflow run; response `workflowRunId`, `workflowCreatedAt` |
| `POST` | `/v2/batch/trigger` | Start multiple runs in one request; response array of `workflowRunId`, `workflowCreatedAt`, `deduplicated` |
| `DELETE` | `/v2/workflows/runs/{workflowRunId}` | Cancel one ongoing run (404 if not found) |
| `DELETE` | `/v2/workflows/runs` | Bulk cancel by run IDs or filters; response `cancelled`, `actionId` |
| `POST` | `/v2/messages/{messageId}/retry` | Execute a step waiting for its next retry immediately |

Server and authentication (verbatim from the OpenAPI definition on every page):

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

Adapted (not in the official docs): the official pages contain only the OpenAPI definition; the request below is assembled from the documented path, `Upstash-*` headers and Bearer authentication, with the token read from an environment variable.

```bash
curl -X POST "https://qstash-eu-central-1.upstash.io/v2/trigger/https://example.com/api/workflow" \
  -H "Authorization: Bearer $QSTASH_TOKEN" \
  -H "Upstash-Retries: 3" \
  -H "Upstash-Label: my-label" \
  -d '{"foo": "bar"}'
```

## Options / Props

### Trigger: headers

| Header | Description |
|--------|-------------|
| `Upstash-Workflow-RunId` | Optional custom run ID; random if omitted |
| `Upstash-Forward-*` | Custom headers for the workflow; the `Upstash-Forward-` prefix is stripped (`Upstash-Forward-My-Header: v` arrives as `My-Header: v`) |
| `Upstash-Retries` | Retries for the workflow steps; default `3` |
| `Upstash-Delay` | Delay delivery; `<value><unit>` with `s`, `m`, `h`, `d` (e.g. `50s`, `1d10h30m`) |
| `Upstash-Not-Before` | Unix timestamp in seconds (UTC); takes precedence over `Upstash-Delay` |
| `Upstash-Label` | Label(s); comma-separated list for several (`label_1,label_2`) |
| `Upstash-Flow-Control-Key` / `Upstash-Flow-Control-Value` | Flow control key and its parallelism / rate / period configuration |
| `Upstash-Failure-Callback` | URL called if the run fails after all retries |
| `Upstash-Failure-Callback-Forward-*` | Custom headers for the failure callback message |
| `Upstash-Retry-Delay` | Retry delay expression between step delivery attempts |

The request body (`text/plain`, `application/json` or `application/octet-stream`) is passed to the workflow endpoint as is and is available as the request payload on the context.

### Batch trigger: body

A JSON array of objects with required `destination` (workflow URL), optional `body` (string) and `headers` (object of strings; any header supported by the single trigger API).

### Bulk cancel: query parameters

| Name | Description |
|------|-------------|
| `workflowRunIds` | List of run IDs to cancel; other filters are ignored when given |
| `workflowUrl` | Workflow URL(s); searched as a prefix unless `workflowUrlExactMatch=true` |
| `fromDate` / `toDate` | Unix timestamp in milliseconds |
| `callerIp`, `flowControlKey`, `label`, `host`, `path` | Filters; multiple values supported (`label` matches runs having any of them) |
| `async` | Filter-based cancels only; `true` returns as soon as the bulk action is created (the cancellation runs in the background; see api-reference-bulk-actions) |
| `count` | Deprecated and ignored; all matching runs are cancelled |

Responses: `412` when too many bulk actions are in progress; `429` when the bulk action did not finish within one minute (it keeps running).

## Notes

- The REST API belongs to Upstash Workflow (OpenAPI title "Upstash Workflow REST API", version 2.0.0); base URL `https://qstash-{region}.upstash.io` with `region` `us-east-1` or `eu-central-1` (default `eu-central-1`); authenticate with the QStash token as Bearer token (`bearerAuth`) or as the `qstash_token` query parameter (`bearerAuthQuery`)
- This is the Workflow endpoint family (`/v2/workflows/...`, `/v2/trigger/...`); the plain QStash message API is covered by the qstash category of this skill
- Bulk cancel warning from the docs: with run IDs only those runs are cancelled; with filter parameters only matching runs; with neither, all workflow runs are cancelled
- The retry-now endpoint returns `404` when the step is not found or not waiting for a retry, `400` for an invalid message ID; see retry-now for the console / SDK behaviour
- Source: https://upstash.com/docs/workflow/api-reference/runs/trigger-workflow-run (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/runs/batch-trigger-workflow-runs (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/runs/cancel-workflow-run (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/runs/bulk-cancel-workflow-runs (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/runs/retry-a-step-now (fetched 2026-11-14; no version pin on the site)

## Related

- [client-trigger](./client-trigger.md)
- [client-cancel](./client-cancel.md)
- [retry-now](./retry-now.md)
- [api-reference-bulk-actions](./api-reference-bulk-actions.md)
