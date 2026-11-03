---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#queues
---

# Queues Bindings (Producers and Consumers)

A producer Worker sends messages to a queue; a consumer Worker pulls batches. A single Worker can produce to and consume from multiple Queues.

## Signature / Usage

```jsonc
{
	"queues": {
		"producers": [
			{
				"binding": "<BINDING_NAME>",
				"queue": "<QUEUE_NAME>",
				"delivery_delay": 60, // Delay messages by 60 seconds before they are delivered to a consumer
			},
		],
		"consumers": [
			{
				"queue": "my-queue",
				"max_batch_size": 10,
				"max_batch_timeout": 30,
				"max_retries": 10,
				"dead_letter_queue": "my-queue-dlq",
				"max_concurrency": 5,
				"retry_delay": 120, // Delay retried messages by 2 minutes before re-attempting delivery
			},
		],
	},
}
```

```toml
[[queues.producers]]
binding = "<BINDING_NAME>"
queue = "<QUEUE_NAME>"
delivery_delay = 60

[[queues.consumers]]
queue = "my-queue"
max_batch_size = 10
max_batch_timeout = 30
max_retries = 10
dead_letter_queue = "my-queue-dlq"
max_concurrency = 5
retry_delay = 120
```

## Options / Props

### `queues.producers`

| Name | Type | Description |
|------|------|-------------|
| `queue` | `string` required | The name of the queue, used on the Cloudflare dashboard. |
| `binding` | `string` required | Binding name used to refer to the queue; a valid JavaScript variable name. |
| `delivery_delay` | `number` optional | Seconds to delay messages sent to a queue by default. Can be overridden per message or per batch. |

### `queues.consumers`

| Name | Type | Description |
|------|------|-------------|
| `queue` | `string` required | The name of the queue. |
| `max_batch_size` | `number` optional | Maximum number of messages in each batch. |
| `max_batch_timeout` | `number` optional | Maximum seconds to wait for messages to fill a batch before it is sent to the consumer. |
| `max_retries` | `number` optional | Maximum retries for a message, if it fails or `retryAll()` is invoked. |
| `dead_letter_queue` | `string` optional | Another queue to send a message to if it fails processing at least `max_retries` times. If not defined, messages that repeatedly fail are discarded. If no queue with the name exists, it is created automatically. |
| `max_concurrency` | `number` optional | Maximum concurrent consumers. Unset means invocations scale to the currently supported maximum. |
| `retry_delay` | `number` optional | Seconds to delay retried messages by default before re-delivery. Can be overridden per message or per batch. |

## Notes

- Queues API semantics (batching, retries, delivery guarantees, concurrency) are documented by the Queues docs.
- Queues can be auto-provisioned; see [automatic-provisioning.md](./automatic-provisioning.md).

## Related

- [automatic-provisioning.md](./automatic-provisioning.md)
- [top-level-keys.md](./top-level-keys.md)
