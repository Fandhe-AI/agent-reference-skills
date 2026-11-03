---
source: https://developers.cloudflare.com/vectorize/platform/event-subscriptions/
---

# Event subscriptions

Vectorize publishes `index.created` and `index.deleted` events to a Queue that you can consume with a Worker or an HTTP pull consumer.

## Signature / Usage

```json
{
  "type": "cf.vectorize.index.created",
  "source": {
    "type": "vectorize"
  },
  "payload": {
    "name": "my-vector-index",
    "description": "Index for embeddings",
    "createdAt": "2025-05-01T02:48:57.132Z",
    "modifiedAt": "2025-05-01T02:48:57.132Z",
    "dimensions": 1536,
    "metric": "cosine"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `index.created` | event | — | Triggered when an index is created. Payload has name, description, createdAt, modifiedAt, dimensions, metric. |
| `index.deleted` | event | — | Triggered when an index is deleted. Payload has name. |

## Notes

- Event type strings: `cf.vectorize.index.created`, `cf.vectorize.index.deleted`.
- Event subscriptions and queue consumers are documented in the cloudflare-stateful skill (queues, event-subscriptions; https://developers.cloudflare.com/queues/)
- The IDs in the example are sample values.

## Related

- [Create indexes](./create-indexes.md)
