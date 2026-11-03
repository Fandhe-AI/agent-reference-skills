---
source: https://developers.cloudflare.com/queues/platform/audit-logs/
---

# Audit Logs

Account audit logs record configuration changes made to Queues; always enabled.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/queues/configuration/configure-queues/

```sh
npx wrangler queues update <QUEUE-NAME> --delivery-delay-secs 60 --message-retention-period-secs 3000
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `CreateQueue` | operation | — | Creation of a new queue. |
| `DeleteQueue` | operation | — | Deletion of an existing queue. |
| `UpdateQueue` | operation | — | Updating the configuration of a queue. |
| `AttachConsumer` | operation | — | Attaching a consumer, including HTTP pull consumers, to the queue. |
| `RemoveConsumer` | operation | — | Removing a consumer, including HTTP pull consumers, from the queue. |
| `UpdateConsumerSettings` | operation | — | Changing consumer settings. |

## Notes

- View them in the dashboard under Audit logs; see https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/.
- The official table is malformed in its rendered source; the six operations above are the complete list given.

## Related

- [Configure Queues](./configure-queues.md)
