---
source: https://developers.cloudflare.com/queues/configuration/dead-letter-queues/
---

# Dead Letter Queues

A Dead Letter Queue (DLQ) receives messages that still fail after the consumer's `max_retries`.

## Signature / Usage

```jsonc
{
	"queues": {
		"consumers": [
			{
				"queue": "my-queue",
				"dead_letter_queue": "my-other-queue"
			}
		]
	}
}
```

```toml
[[queues.consumers]]
queue = "my-queue"
dead_letter_queue = "my-other-queue"
```

Adapted (not in the official docs): variables are quoted and `npx` is added; see Notes.

```sh
npx wrangler queues consumer add "${QUEUE_NAME}" "${SCRIPT_NAME}" --dead-letter-queue="${NAME_OF_OTHER_QUEUE}"
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dead_letter_queue` | string | — | Consumer setting naming the DLQ. |
| `--dead-letter-queue` | string | — | Equivalent `wrangler queues consumer add` flag. |

## Notes

- A DLQ is a normal queue: it can be produced to and consumed from independently. To process its messages, configure a consumer for it.
- Without a DLQ, messages that reach the retry limit are deleted permanently.
- The DLQ must use the same jurisdiction as its source queue; a DLQ name that does not exist is created automatically in that jurisdiction.
- Messages in a DLQ without an active consumer persist for four days before deletion.
- Adapted from the official docs: shell variables are quoted to avoid word splitting.

## Related

- [Configure Queues](./configure-queues.md)
- [Batching, retries and delays](./batching-retries.md)
- [Data location](./data-location.md)
