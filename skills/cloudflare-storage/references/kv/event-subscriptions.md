---
source: https://developers.cloudflare.com/kv/platform/event-subscriptions/
---

# Event subscriptions

Subscribe to Workers KV change events, published to a Cloudflare Queue that you consume with Workers or HTTP pull consumers.

## Signature / Usage

`namespace.created` payload:

```json
{
  "type": "cf.kv.namespace.created",
  "source": {
    "type": "kv"
  },
  "payload": {
    "id": "ns-12345678-90ab-cdef-1234-567890abcdef",
    "name": "my-kv-namespace"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

`namespace.deleted` payload:

```json
{
  "type": "cf.kv.namespace.deleted",
  "source": {
    "type": "kv"
  },
  "payload": {
    "id": "ns-12345678-90ab-cdef-1234-567890abcdef",
    "name": "my-kv-namespace"
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

| Event | Description |
|-------|-------------|
| `namespace.created` | Triggered when a namespace is created. |
| `namespace.deleted` | Triggered when a namespace is deleted. |

## Notes

- Event subscriptions are managed through Cloudflare Queues. Cloudflare Queues is covered by the cloudflare-stateful skill (https://developers.cloudflare.com/queues/; event subscriptions guide: https://developers.cloudflare.com/queues/event-subscriptions/).

## Related

- [kv-namespaces.md](./kv-namespaces.md)
