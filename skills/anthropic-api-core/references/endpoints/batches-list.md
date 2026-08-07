<!-- source: https://platform.claude.com/docs/en/api/messages/batches/list.md / last verified: 2026-08-07 -->

# List Message Batches

List all Message Batches within a Workspace. Most recently created batches are returned first.

## Signature / Usage

```
GET /v1/messages/batches
```

```bash
curl https://api.anthropic.com/v1/messages/batches \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Query parameters

| Name | Type | Description |
|------|------|-------------|
| `after_id` | optional string | Cursor: return page immediately after this object ID |
| `before_id` | optional string | Cursor: return page immediately before this object ID |
| `limit` | optional number | Items per page. Default `20`, range `1`–`1000` |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of `MessageBatch` | `id`, `archived_at`, `cancel_initiated_at`, `created_at`, `ended_at`, `expires_at` (24h after creation), `processing_status` (`"in_progress"` \| `"canceling"` \| `"ended"`), `request_counts` (`{ canceled, errored, expired, processing, succeeded }`), `results_url` (`.jsonl`, set once ended), `type: "message_batch"` |
| `first_id` | string | First ID in `data`; use as `before_id` for previous page |
| `has_more` | boolean | More results in requested direction |
| `last_id` | string | Last ID in `data`; use as `after_id` for next page |

## Notes

- `results_url` points at the results endpoint ([batches-results.md](./batches-results.md)); results are unordered, match via `custom_id`.

## Related

- [batches-create.md](./batches-create.md)
- [batches-retrieve.md](./batches-retrieve.md)
- [batches-results.md](./batches-results.md)
