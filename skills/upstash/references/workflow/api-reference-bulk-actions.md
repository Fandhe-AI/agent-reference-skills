# REST API: Bulk Actions

A bulk action is created for every filter-based bulk cancel request and tracks the progress of the cancellation running in the background.

## Signature / Usage

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/v2/workflows/bulkActions` | List bulk actions (query `cursor`, `count`, `state`); response `bulkActions`, `cursor` |
| `GET` | `/v2/workflows/bulkActions/{actionId}` | Details and progress of one bulk action (404 if not found) |

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

Adapted (not in the official docs): request assembled from the documented path and Bearer authentication; `<ACTION_ID>` is the `actionId` returned by a filter-based bulk cancel with `async=true`.

```bash
curl "https://qstash-eu-central-1.upstash.io/v2/workflows/bulkActions/<ACTION_ID>" \
  -H "Authorization: Bearer $QSTASH_TOKEN"
```

## Options / Props

### BulkAction

| Field | Type | Description |
|-------|------|-------------|
| `actionId` | `string` | ID of the bulk action |
| `kind` | `string` | `cancel` |
| `state` | `string` | `IN_PROGRESS` or `FINISHED` |
| `total` | `integer` | In-progress workflow runs that matched the filter when the action was created |
| `processed` | `integer` | Runs processed so far |
| `createdAt` | `integer` | Creation time, Unix ms |
| `completedAt` | `integer` | Completion time, Unix ms; only present once finished |
| `filter` | `object` | The filter the action was created with (keys are the bulk cancel filter parameter names) |

List query parameters: `cursor` (pagination), `count` (bulk actions to scan per page; values above 1000 are treated as 1000), `state` (filter by state). `400` is returned for an invalid `count`, `cursor` or `state`.

## Notes

- The REST API belongs to Upstash Workflow (OpenAPI title "Upstash Workflow REST API", version 2.0.0); base URL `https://qstash-{region}.upstash.io` with `region` `us-east-1` or `eu-central-1` (default `eu-central-1`); authenticate with the QStash token as Bearer token (`bearerAuth`) or as the `qstash_token` query parameter (`bearerAuthQuery`)
- This is the Workflow endpoint family (`/v2/workflows/...`, `/v2/trigger/...`); the plain QStash message API is covered by the qstash category of this skill
- Source: https://upstash.com/docs/workflow/api-reference/bulk-actions/list-bulk-actions (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/bulk-actions/get-a-bulk-action (fetched 2026-11-14; no version pin on the site)

## Related

- [api-reference-runs](./api-reference-runs.md)
- [client-cancel](./client-cancel.md)
