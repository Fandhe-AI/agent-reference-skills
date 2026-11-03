---
source: https://developers.cloudflare.com/workers-ai/platform/event-subscriptions/
---

# Event subscriptions

Workers AI publishes batch events to a Cloudflare Queue through event subscriptions.

## Signature / Usage

```json
{
  "type": "cf.workersAi.model.batch.failed",
  "source": {
    "type": "workersAi.model",
    "modelName": "@cf/baai/bge-base-en-v1.5"
  },
  "payload": {
    "requestId": "req-12345678-90ab-cdef-1234-567890abcdef",
    "message": "Model execution failed",
    "internalCode": 5001,
    "httpCode": 500
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
| --- | --- | --- | --- |
| batch.queued | event | — | Type `cf.workersAi.model.batch.queued`; triggered when a batch request is queued. Payload: `requestId`. |
| batch.succeeded | event | — | Type `cf.workersAi.model.batch.succeeded`; triggered when a batch request has completed. Payload: `requestId`. |
| batch.failed | event | — | Type `cf.workersAi.model.batch.failed`; triggered when a batch request has failed. Payload: `requestId`, `message`, `internalCode`, `httpCode`. |

## Notes

- Events are consumed with Workers or HTTP pull consumers of a queue. Queues and event subscriptions are in the cloudflare-stateful skill (queues, event-subscriptions).
- The `batch.queued` and `batch.succeeded` examples have the same shape as the failed example without `message`, `internalCode`, `httpCode`.
- IDs and timestamps above are sample values from the docs.

## Related

- [Batch API](./batch-api.md)
- [Errors](./errors.md)
