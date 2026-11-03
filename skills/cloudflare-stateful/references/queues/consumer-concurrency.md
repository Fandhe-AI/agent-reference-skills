---
source: https://developers.cloudflare.com/queues/configuration/consumer-concurrency/
---

# Consumer concurrency

Consumer Workers autoscale horizontally to keep up with the queue backlog; `max_concurrency` caps it.

## Signature / Usage

```jsonc
{
	"queues": {
		"consumers": [
			{
				"queue": "my-queue",
				"max_concurrency": 1
			}
		]
	}
}
```

```toml
[[queues.consumers]]
queue = "my-queue"
max_concurrency = 1
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `max_concurrency` | number | unset (auto) | Maximum concurrent consumer invocations; between 1 and 250 in the dashboard. Remove the setting and run `npx wrangler deploy` to lift the cap. |

## Notes

- Concurrency is enabled on all queues by default. After each processed batch, Queues re-evaluates the number of concurrent consumers using the backlog and its growth rate, the ratio of failed invocations (an uncaught exception from `queue()`), and `max_concurrency`.
- `retry()` / `retryAll()` do not count as failed invocations (changed 2024-02-24; previously they could scale consumers down).
- Example from the page: 100 messages/second written, one consumer taking 5 seconds per 100-message batch, scales to roughly five concurrent invocations.
- Not autoscaling? Causes: `max_concurrency` is 1; the consumer throws errors; a large batch is still processing (scaling is checked only after a whole batch), so reduce batch size or speed up the handler.
- Cloudflare recommends leaving `max_concurrency` unset; set it when an upstream API must not be overwhelmed, accepting a growing backlog. Messages that reach the retention period expire and are deleted.
- Dashboard: Queues > your queue > Settings > Edit Consumer > Maximum consumer invocations (or "auto (recommended)").
- Setting it from the config file needs wrangler 2.13.0 or greater.
- Producers scale up to the per-queue messages-per-second limit.
- Billing: each consumer invocation incurs Workers request and CPU charges; the overall cost to process all messages is the same with or without concurrency, concurrency only brings it forward.
- Concurrency is not supported in local development.

## Related

- [Batching, retries and delays](./batching-retries.md)
- [Configure Queues](./configure-queues.md)
- [Limits](./limits.md)
- [Local development](./local-development.md)
