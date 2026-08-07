<!-- source: https://platform.claude.com/docs/en/api/messages/batches/retrieve.md / last verified: 2026-08-07 -->

# Retrieve a Message Batch

Idempotent; can be polled for Message Batch completion. To access results, request the `results_url` field.

## Signature / Usage

```
GET /v1/messages/batches/{message_batch_id}
```

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `message_batch_id` | string | ID of the Message Batch |

### Returns — `MessageBatch` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique object identifier |
| `archived_at` | string | Timestamp results became unavailable |
| `cancel_initiated_at` | string | Set only if cancellation was initiated |
| `created_at` | string | Creation time |
| `ended_at` | string | Set once processing ends (all requests succeeded/errored/canceled/expired) |
| `expires_at` | string | 24 hours after creation |
| `processing_status` | `"in_progress"` \| `"canceling"` \| `"ended"` | Batch status |
| `request_counts` | object | `{ canceled, errored, expired, processing, succeeded }` — zero until batch ends (except `processing`) |
| `results_url` | string | `.jsonl` results URL, set once ended |
| `type` | `"message_batch"` | Always `"message_batch"` |

## Related

- [batches-create.md](./batches-create.md)
- [batches-cancel.md](./batches-cancel.md)
- [batches-results.md](./batches-results.md)
