---
source: https://developers.cloudflare.com/queues/configuration/pull-consumers/
---

# Pull consumers

Pull messages from a queue over HTTP from any environment, then acknowledge or retry them by `lease_id`.

## Signature / Usage

Enable HTTP pull (Wrangler or dashboard; the config file no longer supports it):

Adapted (not in the official docs): the official `$QUEUE-NAME` expands `$QUEUE` plus the text `-NAME`; renamed and quoted.

```sh
npx wrangler queues consumer http add "${QUEUE_NAME}"
```

If a push consumer exists, remove it first:

Adapted (not in the official docs): `$QUEUE-NAME` is renamed and quoted, and `npx` is added; see Notes.

```sh
npx wrangler queues consumer worker remove "${QUEUE_NAME}" "${SCRIPT_NAME}"
```

Pull a batch with curl:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/pull" \
--header "Authorization: Bearer ${QUEUES_TOKEN}" \
--header "Content-Type: application/json" \
--data '{ "visibility_timeout_ms": 10000, "batch_size": 2 }'
```

Adapted (not in the official docs): wrapped in functions that take credentials and lease IDs as parameters (the official fragment awaited at module top level with undefined variables and hard-coded sample lease IDs).

```ts
async function pullMessages(accountId: string, queueId: string, apiToken: string): Promise<Response> {
	// POST /accounts/${accountId}/queues/${queueId}/messages/pull with the timeout & batch size
	return fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/queues/${queueId}/messages/pull`,
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiToken}`,
			},
			// Optional - you can provide an empty object '{}' and the defaults will apply.
			body: JSON.stringify({ visibility_timeout_ms: 6000, batch_size: 50 }),
		},
	);
}

async function ackMessages(
	accountId: string,
	queueId: string,
	apiToken: string,
	ackLeaseIds: string[],
	retryLeaseIds: string[] = [],
): Promise<Response> {
	// POST /accounts/${accountId}/queues/${queueId}/messages/ack with the lease_ids
	return fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/queues/${queueId}/messages/ack`,
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiToken}`,
			},
			// If you have no messages to retry, you can specify an empty array - retries: []
			body: JSON.stringify({
				acks: ackLeaseIds.map((lease_id) => ({ lease_id })),
				retries: retryLeaseIds.map((lease_id) => ({ lease_id })),
			}),
		},
	);
}
```

Response from `pull` (lease IDs replaced by placeholders):

Adapted (not in the official docs): the long `lease_id` token strings are replaced with placeholders.

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": {
		"message_backlog_count": 10,
		"messages": [
			{
				"body": "hello",
				"id": "1ad27d24c83de78953da635dc2ea208f",
				"timestamp_ms": 1689615013586,
				"attempts": 2,
				"metadata": {
					"CF-sourceMessageSource": "dash",
					"CF-Content-Type": "json"
				},
				"lease_id": "<opaque-lease-id-1>"
			},
			{
				"body": "world",
				"id": "95494c37bb89ba8987af80b5966b71a7",
				"timestamp_ms": 1689615013586,
				"attempts": 2,
				"metadata": {
					"CF-sourceMessageSource": "dash",
					"CF-Content-Type": "json"
				},
				"lease_id": "<opaque-lease-id-2>"
			}
		]
	}
}
```

Retry with a delay:

```json
{
	"acks": [
		{ "lease_id": "lease_id1" },
		{ "lease_id": "lease_id2" },
		{ "lease_id": "lease_id3" }
	],
	"retries": [{ "lease_id": "lease_id4", "delay_seconds": 600 }]
}
```

## Options / Props

### Pull request body (`POST .../messages/pull`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `batch_size` | number | 5 (max 100) | Messages returned per pull. |
| `visibility_timeout_ms` | number | 30 seconds (max 12 hours) | How long the consumer holds the lease; after it expires, unacknowledged messages become eligible for redelivery (possibly to another client). An ack sent with the original `lease_id` after the timeout is still accepted (see Notes), so always ack messages you finished processing. The prose calls this `visibility_timeout`; request bodies use `visibility_timeout_ms`. |

### Message object

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `body` | string | — | Message body; may be base64-encoded depending on content type. |
| `id` | string | — | Unique, read-only ephemeral identifier. |
| `timestamp_ms` | number | — | Publish time in ms since the Unix epoch. |
| `attempts` | number | — | Delivery attempts so far; at `max_retries` the message is deleted, or sent to the Dead Letter Queue if one is configured. |
| `lease_id` | string | — | Encoded lease ID used to ack or retry the message. |

### Ack request body (`POST .../messages/ack`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `acks` | array of `{ lease_id }` | — | Messages to acknowledge. |
| `retries` | array of `{ lease_id, delay_seconds? }` | — | Messages to retry immediately, optionally delayed (use `[]` if none). |

### Wrangler flags (`consumer http add`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--batch-size` | number | — | Maximum messages per batch. |
| `--message-retries` | number | — | Maximum retries per message. |
| `--dead-letter-queue` | string | — | Queue for messages that failed to be consumed. |
| `--visibility-timeout-secs` | number | — | Seconds a message waits for acknowledgement before returning to the queue. |
| `--retry-delay-secs` | number | — | Seconds to wait before retrying a message. |

### Content types

| Content type | Representation in pull responses |
| --- | --- |
| `json` | base64-encoded (RFC 4648) |
| `bytes` | base64-encoded (RFC 4648) |
| `text` | plain UTF-8 string |
| `v8` | Cannot be decoded by pull consumers. |

## Notes

- Choose push when starting out (autoscales on Workers); choose pull for existing infrastructure outside Workers or when you must control consumption speed. You can switch a queue between consumer types at any time.
- API token: needs the `queues#read` and `queues#write` permissions (shown in the API as `com.cloudflare.api.account.queues_read` / `queues_write`) because acknowledging mutates queue state. Create it under My Profile > API Tokens > Custom Token > Account > Queues > Edit. The token is shown once; store it securely and never commit it.
- Pull is short polling: Queues returns immediately and returns an empty response if no messages are available; there is no long polling.
- Several HTTP clients may pull concurrently, each receiving a unique batch and holding the lease until the visibility timeout expires or the message is marked for retry.
- Unacknowledged messages are redelivered after the visibility timeout. Queues accepts late acks by lease ID, even after the timeout, and even if the message was redelivered elsewhere.
- Source inconsistency: the same official page says "A `lease_id` is no longer valid once this timeout has been reached" and, later, that Queues still accepts an acknowledgment by lease ID after the visibility timeout (also when the message was meanwhile delivered to another consumer). This page follows the latter: the timeout controls when a message can be redelivered, not whether a late ack is accepted. Ack every message you processed, and keep processing idempotent because a redelivered copy may already be in progress elsewhere.
- Ack all `lease_id`s you processed; group acknowledgements to reduce API calls.
- Pull delivery is also at-least-once: a message whose visibility timeout expires before the ack arrives is delivered again, possibly to another client. Ack only after processing succeeds, and make processing idempotent (see [delivery-guarantees.md](./delivery-guarantees.md)).
- Only use `text`, `bytes` or `json` content types for queues with a pull consumer.
- Use the `/queues/queue_id/messages/{action}` API format; the undocumented `/queues/queue_id/{action}` endpoints were deprecated as of June 30, 2024.
- If you removed a Worker consumer with Wrangler but left `[[queues.consumers]]` in the configuration, the next deploy fails; delete the configuration first. Remove a legacy `type = "http_pull"` from the configuration and redeploy; HTTP pull stays enabled.
- Limits: pull consumers can pull and acknowledge up to 5,000 messages per second per queue (changelog 2025-04-17; previously 1200 requests per 5 minutes across all queues).
- Corrected from the official docs: the `$QUEUE-NAME` shell variable (see the batching page). The official remove command also omits `npx`; it is added for a project-local Wrangler.
- Adapted from the official docs: JavaScript/TypeScript fragments wrapped in functions with explicit parameters (the ack helper takes the `lease_id`s to acknowledge and retry instead of hard-coded sample strings); `lease_id` sample strings replaced with placeholders.

## Related

- [Configure Queues](./configure-queues.md)
- [Batching, retries and delays](./batching-retries.md)
- [Producer API](./producer-api.md)
- [Pause and Purge](./pause-purge.md)
- [Limits](./limits.md)
