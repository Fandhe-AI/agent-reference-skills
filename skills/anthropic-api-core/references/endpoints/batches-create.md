<!-- source: https://platform.claude.com/docs/en/api/messages/batches/create.md / last verified: 2026-08-07 -->

# Create a Message Batch

Send a batch of Message creation requests. Processing begins immediately and can take up to 24 hours to complete.

## Signature / Usage

```
POST /v1/messages/batches
```

```bash
curl https://api.anthropic.com/v1/messages/batches \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "requests": [
            {
              "custom_id": "my-custom-id-1",
              "params": {
                "max_tokens": 1024,
                "messages": [{"content": "Hello, world", "role": "user"}],
                "model": "claude-opus-4-6"
              }
            }
          ]
        }'
```

## Options / Props

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-user-profile-id` | optional string | Attributes every request in the batch to this profile. An individual request whose `params.metadata`-level profile conflicts with this header errors |

### Body parameters

| Name | Type | Description |
|------|------|-------------|
| `requests` | array of `{ custom_id, params }` | List of per-request Message creation calls |
| `requests[].custom_id` | string | Developer-provided ID, unique within the batch, used to match results (results may return out of order) |
| `requests[].params` | object | Same body shape as `POST /v1/messages` — see [messages-create.md](./messages-create.md) Options / Props for the full parameter list (`max_tokens`, `messages`, `model`, `system`, `tools`, `thinking`, etc.) |

### Returns

Returns a `MessageBatch` object — same shape as [batches-retrieve.md](./batches-retrieve.md) Returns (`id`, `archived_at`, `cancel_initiated_at`, `created_at`, `ended_at`, `expires_at`, `processing_status`, `request_counts`, `results_url`, `type: "message_batch"`).

## Notes

- Each `requests[].params` object accepts the identical schema as [messages-create.md](./messages-create.md); no batch-specific fields are added there.
- Fetch completed results via [batches-results.md](./batches-results.md) once `processing_status` is `"ended"`.

## Related

- [messages-create.md](./messages-create.md)
- [batches-list.md](./batches-list.md)
- [batches-retrieve.md](./batches-retrieve.md)
- [batches-results.md](./batches-results.md)
