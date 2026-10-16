<!-- source: https://platform.claude.com/docs/en/api/files/list / last verified: 2026-10-17 -->

# List Files

List files previously uploaded via the Files API.

## Signature / Usage

```
GET /v1/files
```

```bash
curl https://api.anthropic.com/v1/files \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Query parameters

| Name | Type | Description |
|------|------|-------------|
| `ids` | optional array of string | Restrict the result set to Files whose `id` is in this list. At most 100 entries (after de-duplication). Mutually exclusive with `page` and `limit`. The response is always a single page (`next_page` is null). IDs that do not resolve to a visible File, including deleted Files, are silently omitted |
| `limit` | optional number | Items per page. Default `20`, range `1`–`1000` |
| `page` | optional string | Opaque page cursor returned in a prior list response's `next_page`. Prefixed `page_` |

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-version` | optional string | The version of the Claude API you want to use |
| `anthropic-workspace-id` | optional string | Selects the Workspace for this request (e.g. `wrkspc_011CZkZaBF1tNoB5wlCeusgy`). Only needed for credentials that can act on more than one Workspace; if sent, it must match that Workspace |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of `FileMetadata` | Same shape as [files-upload.md](./files-upload.md) Returns (including `expires_at`) |
| `next_page` | optional string or null | Opaque cursor for the next page. Supply as `?page=`; null when there are no more results |

## Notes

- The Files API is GA: no `anthropic-beta` header is needed. The previous path `api/beta/files/*` with the `files-api-2025-04-14` header is deprecated but still works and keeps the beta shapes (`after_id` / `before_id` cursors, `scope_id` filter, `first_id` / `has_more` / `last_id` in the response).
- `before_id` / `after_id` return 400 on GA requests. They remain a compatibility affordance only for requests that carry the `files-api-2025-04-14` beta header or `managed-agents-2026-04-01` (the latter also gets `has_more`, `first_id`, `last_id` alongside `next_page`; not combinable with `page` or `ids[]`).

## Related

- [files-upload.md](./files-upload.md)
- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
