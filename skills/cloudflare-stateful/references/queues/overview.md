---
source: https://developers.cloudflare.com/queues/, https://developers.cloudflare.com/queues/glossary/
---

# Cloudflare Queues Overview

Send and receive messages with guaranteed delivery and no charges for egress bandwidth. Queues integrates with Workers: a Worker produces messages, and a Worker (push) or an HTTP client (pull) consumes them.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/queues/get-started/

```jsonc
{
	"queues": {
		"producers": [
			{
				"queue": "MY-QUEUE-NAME",
				"binding": "MY_QUEUE"
			}
		]
	}
}
```

## Options / Props

### Features

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Batching, Retries and Delays | feature | — | Batch, retry and delay messages. |
| Dead Letter Queues | feature | — | Redirect messages when delivery fails. |
| Pull consumers | feature | — | Pull from a queue over HTTP from infrastructure outside Workers. |
| Event subscriptions | feature | — | Receive events from Cloudflare products as queue messages. |

### Glossary

| Term | Definition |
| --- | --- |
| consumer | A client that subscribes to or consumes messages from a queue. |
| producer | A client that publishes or produces messages onto a queue. |
| queue | A buffer or list that automatically scales as messages are written to it, and allows a consumer Worker to pull messages from that same queue. |

## Notes

- Available on Free and Paid plans.
- Distinct products: Upstash QStash (HTTP message queue) is covered by the upstash skill, and BullMQ (Redis job queue) and Inngest (durable functions) by the bullmq and inngest skills. They are not Cloudflare Queues.
- Wrangler flag tables for `wrangler queues ...` live in the cloudflare-wrangler skill.

## Related

- [How Queues works](./how-queues-works.md)
- [Get started](./get-started.md)
- [Limits](./limits.md)
- [Pricing](./pricing.md)
