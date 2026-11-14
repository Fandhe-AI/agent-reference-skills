# REST API: Bulk Actions

Track asynchronous filter-based bulk cancel operations through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v2/bulkActions` | List bulk actions |
| `GET` | `/v2/bulkActions/{actionId}` | Get one bulk action (404 if unknown) |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path and query parameter definitions.

```bash
curl "https://qstash.upstash.io/v2/bulkActions?state=IN_PROGRESS" \
  -H "Authorization: Bearer <QSTASH_TOKEN>"
```

## Options / Props

List query parameters: `cursor`, `count` (default 100, scanned per page; values above 1000 are treated as 1000), `state` (`IN_PROGRESS` \| `FINISHED`). `400` for invalid `count`, `cursor` or `state`. List response: `bulkActions[]` and `cursor`.

Bulk action fields: `actionId`, `kind` (`cancel`), `state`, `total` (in-progress messages matched at creation), `processed`, `createdAt`, `completedAt` (only when finished), `filter` (the filter parameters used).

## Notes

- Bulk actions are created by `DELETE /v2/messages` with filters and `async=true` (the response contains `actionId`); see `api-messages.md`.
- Console / usage description is on `bulk-actions.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/bulk-actions/list-bulk-actions , https://upstash.com/docs/qstash/api-reference/bulk-actions/get-a-bulk-action (fetched 2026-11-14; no version pin on the site)

## Related

- [bulk-actions.md](./bulk-actions.md)
- [api-messages.md](./api-messages.md)
