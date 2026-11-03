---
source: https://developers.cloudflare.com/queues/configuration/configure-queues/
---

# Configure Queues

Queue-level settings, producer bindings and consumer settings in the Wrangler configuration.

## Signature / Usage

```sh
npx wrangler queues update <QUEUE-NAME> --delivery-delay-secs 60 --message-retention-period-secs 3000
```

Producer:

```jsonc
{
	"queues": {
		"producers": [
			{
				"queue": "my-queue",
				"binding": "MY_QUEUE"
			}
		]
	}
}
```

Consumer:

```jsonc
{
	"queues": {
		"consumers": [
			{
				"queue": "my-queue",
				"max_batch_size": 10,
				"max_batch_timeout": 30,
				"max_retries": 10,
				"dead_letter_queue": "my-queue-dlq"
			}
		]
	}
}
```

```toml
[[queues.consumers]]
queue = "my-queue"
max_batch_size = 10
max_batch_timeout = 30
max_retries = 10
dead_letter_queue = "my-queue-dlq"
```

## Options / Props

### Queue-level flags (`wrangler queues update`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--delivery-delay-secs` | number | 0 | Delay before a published message is delivered. Between 0 and 86400 (24 hours). |
| `--message-retention-period-secs` | number | 345600 (4 days) | How long messages are retained. Between 60 and 1209600 (14 days) on Workers Paid; for Workers Free see Notes. |

### Producer (`queues.producers[]`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `queue` | string | — | Queue name. |
| `binding` | string | — | Binding name (a JavaScript variable). |
| `delivery_delay` | number | — | Default delay for every message sent through this binding (see the batching page). |

### Consumer (`queues.consumers[]`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `queue` | string | — | Queue name. |
| `max_batch_size` | number | 10 | Maximum messages per batch. |
| `max_batch_timeout` | number | 5 | Maximum seconds to wait until a batch is full. |
| `max_retries` | number | 3 | Maximum retries if a message fails or `retryAll()` is invoked. |
| `dead_letter_queue` | string | — | Queue that receives a message after at least `max_retries` failures. If the named queue does not exist it is created automatically. Without one, repeatedly failing messages are discarded. |
| `max_concurrency` | number | unset (scales to the supported maximum) | Maximum concurrent consumer invocations. |
| `retry_delay` | number | — | Seconds to delay retried messages (see the batching page). |

## Notes

- Any Worker can write to a queue, including from a Durable Object.
- Maximum values for these options are in the limits page.
- Source inconsistency: the limits page says message retention is non-configurable at 24 hours on Workers Free, while the Wrangler command reference says `--message-retention-period-secs` must be between 60 and 86400 on the free tier. Expect at most 24 hours of retention on Free.
- A queue can instead have an HTTP pull consumer; see the pull consumers page.
- Wrangler CLI flag tables for `wrangler queues ...` are in the cloudflare-wrangler skill (commands/queues.md).

## Related

- [Batching, retries and delays](./batching-retries.md)
- [Consumer concurrency](./consumer-concurrency.md)
- [Dead Letter Queues](./dead-letter-queues.md)
- [Pull consumers](./pull-consumers.md)
- [Limits](./limits.md)
