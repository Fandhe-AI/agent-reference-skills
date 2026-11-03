---
source: https://developers.cloudflare.com/queues/configuration/pause-purge/
---

# Pause and Purge

Pause or resume delivery to consumers, or permanently delete every message in a queue.

## Signature / Usage

```sh
npx wrangler queues pause-delivery <QUEUE-NAME>
npx wrangler queues resume-delivery <QUEUE-NAME>
npx wrangler queues purge <QUEUE-NAME>
```

`purge` prompts for the queue name to confirm:

```sh
npx wrangler queues purge <QUEUE-NAME>

This operation will permanently delete all the messages in Queue <QUEUE-NAME>. Type <QUEUE-NAME> to proceed.
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `<QUEUE-NAME>` | string (required) | — | Queue to pause, resume or purge. |
| `--force` | boolean | — | `purge` only: skip the confirmation prompt (from the wrangler commands reference). |

## Notes

- Pausing: the queue still receives and stores messages, and messages still expire after the retention period. Affects both push consumers and HTTP pull consumers.
- A paused queue answers pull requests with HTTP `409` and the error `queue_delivery_paused`; the error code table lists `QueueDisabled` (10252) for sends.
- Purging is irreversible. In-flight messages may still be processed, messages sent during the purge might not be purged, and delayed messages are also deleted.
- A purge counts as one billable operation, regardless of how many messages are deleted.
- These commands call the Queues control-plane REST API, so they act on the account's real queue.
- Full flag tables for `wrangler queues` are in the cloudflare-wrangler skill.

## Related

- [Pull consumers](./pull-consumers.md)
- [Pricing](./pricing.md)
- [Error codes](./error-codes.md)
- [Wrangler commands](./wrangler-commands.md)
