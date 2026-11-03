---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/queues/
---

# Queues (Miniflare)

Configure Queue producers and consumers in Miniflare, and drive queues from outside a Worker.

## Signature / Usage

Producers:

```js
const mf = new Miniflare({
	queueProducers: { MY_QUEUE: "my-queue" },
	queueProducers: ["MY_QUEUE"], // If binding and queue names are the same
});
```

Consumers:

```js
const mf = new Miniflare({
	queueConsumers: {
		"my-queue": {
			maxBatchSize: 5, // default: 5
			maxBatchTimeout: 1 /* second(s) */, // default: 1
			maxRetries: 2, // default: 2
			deadLetterQueue: "my-dead-letter-queue", // default: none
		},
	},
	queueConsumers: ["my-queue"], // If using default consumer options
});
```

Manipulating from outside Workers:

```js
const mf = new Miniflare({
	workers: [
		{
			name: "a",
			modules: true,
			script: `
			export default {
				async fetch(request, env, ctx) {
					await env.QUEUE.send(await request.text());
				}
			}
			`,
			queueProducers: { QUEUE: "my-queue" },
		},
		{
			name: "b",
			modules: true,
			script: `
			export default {
				async queue(batch, env, ctx) {
					console.log(batch);
				}
			}
			`,
			queueConsumers: { "my-queue": { maxBatchTimeout: 1 } },
		},
	],
});

const queue = await mf.getQueueProducer("QUEUE", "a"); // Get from worker "a"
await queue.send("message"); // Logs "message" 1 second later
```

## Notes

- The two `queueProducers` / `queueConsumers` lines in each example show alternative forms (a duplicate key in one object literal is illustrative only).
- Queues product docs: https://developers.cloudflare.com/queues/

## Related

- [multiple-workers.md](./multiple-workers.md)
- [get-started.md](./get-started.md)
- [migrating-from-v2.md](./migrating-from-v2.md)
