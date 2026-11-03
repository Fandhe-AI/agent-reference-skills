---
source: https://developers.cloudflare.com/queues/reference/delivery-guarantees/
---

# Delivery guarantees

Queues provides at-least-once delivery by default.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/queues/configuration/batching-retries/

```js
export default {
	async queue(batch, env, ctx) {
		for (const msg of batch.messages) {
			// TODO: do something with the message
			// Explicitly acknowledge the message as delivered
			msg.ack();
		}
	},
};
```

## Notes

- Messages are guaranteed to be delivered at least once and, in rare cases, may be delivered more than once.
- Stronger guarantees (exactly once) cost latency and throughput, so Queues optimizes for reliability.
- If duplicate processing is harmful, generate a unique ID when writing the message and use it as the primary key on database inserts or as an idempotency key (for example with an email or payment API) to de-duplicate.

## Related

- [Batching, retries and delays](./batching-retries.md)
- [How Queues works](./how-queues-works.md)
