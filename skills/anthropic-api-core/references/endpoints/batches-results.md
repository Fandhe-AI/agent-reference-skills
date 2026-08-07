<!-- source: https://platform.claude.com/docs/en/api/messages/batches/results.md / last verified: 2026-08-07 -->

# Retrieve Message Batch Results

Streams the results of a Message Batch as a `.jsonl` file. Each line is a JSON object for one request's result; order is not guaranteed — match via `custom_id`.

## Signature / Usage

```
GET /v1/messages/batches/{message_batch_id}/results
```

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID/results \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `message_batch_id` | string | ID of the Message Batch |

### Returns — one `MessageBatchIndividualResponse` per JSONL line

| Name | Type | Description |
|------|------|-------------|
| `custom_id` | string | Developer-provided ID from the original batch request; matches results to requests |
| `result` | `MessageBatchResult` | Discriminated by `type`: `"succeeded"` (`{ message: Message }`, same `Message` shape as [messages-create.md](./messages-create.md) Returns), `"errored"` (`{ error: ErrorResponse }` with `error.error.type` one of `invalid_request_error`, `authentication_error`, `billing_error`, `permission_error`, `not_found_error`, `rate_limit_error`, `timeout_error`, `api_error`, `overloaded_error`), `"canceled"` (no payload), `"expired"` (no payload) |

## Notes

- Response body is JSON Lines (`.jsonl`), not a single JSON object — one `MessageBatchIndividualResponse` per line.
- Fetch via the `results_url` returned by [batches-retrieve.md](./batches-retrieve.md) / [batches-list.md](./batches-list.md), only available once `processing_status` is `"ended"`.

## Related

- [batches-retrieve.md](./batches-retrieve.md)
- [messages-create.md](./messages-create.md)
