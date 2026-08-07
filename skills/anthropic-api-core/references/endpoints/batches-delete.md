<!-- source: https://platform.claude.com/docs/en/api/messages/batches/delete.md / last verified: 2026-08-07 -->

# Delete a Message Batch

Message Batches can only be deleted once they've finished processing. To delete an in-progress batch, cancel it first.

## Signature / Usage

```
DELETE /v1/messages/batches/{message_batch_id}
```

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `message_batch_id` | string | ID of the Message Batch |

### Returns — `DeletedMessageBatch` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | ID of the deleted Message Batch |
| `type` | `"message_batch_deleted"` | Always `"message_batch_deleted"` |

## Related

- [batches-cancel.md](./batches-cancel.md)
- [batches-retrieve.md](./batches-retrieve.md)
