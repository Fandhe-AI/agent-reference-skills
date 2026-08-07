<!-- source: https://platform.claude.com/docs/en/api/messages/batches/cancel.md / last verified: 2026-08-07 -->

# Cancel a Message Batch

Batches may be canceled any time before processing ends. Cancellation moves the batch into a `canceling` state; the system may still finish in-progress non-interruptible requests before finalizing.

## Signature / Usage

```
POST /v1/messages/batches/{message_batch_id}/cancel
```

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID/cancel \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `message_batch_id` | string | ID of the Message Batch |

### Returns

Returns the `MessageBatch` object (same shape as [batches-retrieve.md](./batches-retrieve.md)).

## Notes

- `request_counts.canceled` reports how many requests were canceled; check individual results to determine which. Cancellation may cancel zero requests if all were non-interruptible.

## Related

- [batches-retrieve.md](./batches-retrieve.md)
- [batches-delete.md](./batches-delete.md)
