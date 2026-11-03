---
source: https://developers.cloudflare.com/queues/configuration/batching-retries/
---

# Batching, Retries and Delays

Configure batch size/timeout, explicit acknowledgement, retry limits and delivery or retry delays.

## Signature / Usage

Explicit acknowledgement and retry:

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

Delay on retry:

```js
export default {
	async queue(batch, env, ctx) {
		for (const msg of batch.messages) {
			// Mark for retry and delay a singular message
			// by 3600 seconds (1 hour)
			msg.retry({ delaySeconds: 3600 });
		}
	},
};
```

Adapted (not in the official docs): placeholder variables replaced with concrete values inside a handler so it runs as written.

```js
export default {
	async fetch(req, env, ctx) {
		// Delay a singular message by 600 seconds (10 minutes)
		await env.YOUR_QUEUE.send({ id: "1" }, { delaySeconds: 600 });

		// Delay a batch of messages by 300 seconds (5 minutes)
		await env.YOUR_QUEUE.sendBatch([{ body: "a" }, { body: "b" }], { delaySeconds: 300 });

		// Do not delay this message.
		// If there is a global delay configured on the queue, ignore it.
		await env.YOUR_QUEUE.sendBatch([{ body: "c" }], { delaySeconds: 0 });
		return new Response("Sent!");
	},
};
```

Queue-level and consumer-level defaults (Wrangler CLI):

Adapted (not in the official docs): the official `$QUEUE-NAME` expands the shell variable `$QUEUE` followed by the text `-NAME`; variables are renamed and quoted, and `npx wrangler@latest` is replaced by the locally installed `npx wrangler`; see Notes.

```sh
# Delay all messages by 5 minutes as a default
npx wrangler queues create "${QUEUE_NAME}" --delivery-delay-secs=300

# Push-based consumers
# Delay any messages that are retried by 60 seconds (1 minute) by default.
npx wrangler queues consumer worker add "${QUEUE_NAME}" "${WORKER_SCRIPT_NAME}" --retry-delay-secs=60

# Pull-based consumers
# Delay any messages that are retried by 60 seconds (1 minute) by default.
npx wrangler queues consumer http add "${QUEUE_NAME}" --retry-delay-secs=60
```

Wrangler configuration:

```jsonc
{
	"queues": {
		"producers": [
			{
				"binding": "<BINDING_NAME>",
				"queue": "<QUEUE-NAME>",
				"delivery_delay": 60 // delay every message delivery by 1 minute
			}
		],
		"consumers": [
			{
				"queue": "my-queue",
				"retry_delay": 300 // delay any retried message by 5 minutes before re-attempting delivery
			}
		]
	}
}
```

Adapted (not in the official docs): the official helper returns `baseDelaySeconds ** attempts` unbounded, which exceeds the 86400-second maximum from attempt 4 with a base of 30; it is clamped.

```ts
const MAX_DELAY_SECONDS = 86400; // 24 hours, the maximum delaySeconds

function calculateExponentialBackoff(
	attempts: number,
	baseDelaySeconds: number,
): number {
	return Math.min(baseDelaySeconds ** attempts, MAX_DELAY_SECONDS);
}

const BASE_DELAY_SECONDS = 30;

export default {
	async queue(batch, env, ctx): Promise<void> {
		for (const msg of batch.messages) {
			// Mark for retry with exponential backoff
			msg.retry({
				delaySeconds: calculateExponentialBackoff(
					msg.attempts,
					BASE_DELAY_SECONDS,
				),
			});
		}
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Batch settings

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `max_batch_size` | number | 10 | Maximum messages per batch (minimum 1, maximum 100). |
| `max_batch_timeout` | number | 5 | Maximum seconds to wait before delivering a batch (minimum 0, maximum 60). |
| `max_retries` | number | 3 | Delivery retries before the message is deleted or sent to the DLQ. |
| `retry_delay` | number | — | Consumer-level default delay (seconds) for retried messages. |
| `delivery_delay` | number | — | Producer-level default delay (seconds) for every sent message. |

### Ack / retry precedence

| Situation | Result |
| --- | --- |
| `ack()` then `ack()`/`retry()` on same message | Later calls silently ignored. |
| `retry()` then `ack()` | `ack()` ignored; the first call wins. |
| Message-level call, then `ackAll()`/`retryAll()` | The message-level call takes precedence for that message. |

## Notes

- Whichever of `max_batch_size` and `max_batch_timeout` is reached first triggers delivery. Example: size 30 and timeout 10 delivers 30 messages if they arrive within 10 seconds, otherwise whatever (1 to 29) is waiting.
- Empty queues never invoke a push consumer; pull consumers incur a read operation even when empty.
- If one message in a batch fails, the whole batch is retried unless messages were explicitly acknowledged. `retry()` / `retryAll()` do not make the consumer scale down.
- Each retry counts as an additional read operation. Messages reaching max retries are deleted, or written to the DLQ if one is configured.
- Delay precedence: per-message or per-batch delay beats the queue default; `delaySeconds: 0` ignores the queue-level delay; a positive per-message delay is respected even if the queue default is shorter. Maximum delay is 24 hours.
- Delay settings via the CLI or local development need wrangler 3.38.0 or greater. If both CLI and the configuration file change settings, the latest change wins. The Queues REST API can also set delays.
- Corrected from the official docs: `$QUEUE-NAME` appears in three CLI examples (and in the pull-consumers page); the shell reads it as `$QUEUE` plus `-NAME`, so variables were renamed to `QUEUE_NAME` and quoted. The official consumer commands also run `npx wrangler@latest`; they use the project's installed `npx wrangler` here so the CLI version matches the one the project was tested with (3.38.0 or later is required for the delay flags).
- Adapted from the official docs: the exponential-backoff helper is clamped to 86400 seconds; larger values are rejected (see error code 10203) and `max_retries` can be raised to 100.
- Adapted from the official docs: `send()` / `sendBatch()` examples used undefined `message` / `messages` variables and top-level awaits.
- The backoff example retries every message to show the delay calculation; in a real consumer, call `retry()` only for messages whose processing failed and `ack()` the rest. `Env` is the type generated by `npx wrangler types`.
- The page's own `sendBatch` examples pass `delaySeconds: 0`, although the API page says batch delay must be a positive integer.

## Related

- [Consumer API](./consumer-api.md)
- [Configure Queues](./configure-queues.md)
- [Dead Letter Queues](./dead-letter-queues.md)
- [Consumer concurrency](./consumer-concurrency.md)
- [Metrics](./metrics.md)
