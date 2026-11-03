---
source: https://developers.cloudflare.com/agents/agent-class/queue-tasks/
---

# Queue tasks (queue / dequeue / getQueue)

A built-in FIFO queue in the base `Agent` class. Tasks are stored in the `cf_agents_queues` SQLite table, flushed automatically in `created_at` order and survive restarts.

## Signature / Usage

```ts
type QueueItem<T> = {
	id: string; // Unique identifier for the queued task
	payload: T; // Data to pass to the callback function
	callback: keyof Agent; // Name of the method to call
	created_at: number; // Timestamp when the task was created
	retry?: RetryOptions; // Retry options for this task
};

async queue<T>(
  callback: keyof this,
  payload: T,
  options?: { retry?: RetryOptions }
): Promise<string>

dequeue(id: string): void
dequeueAll(): void
dequeueAllByCallback(callback: string): void
getQueue<T>(id: string): QueueItem<T> | undefined
getQueues<T>(key: string, value: string): QueueItem<T>[]

async callbackMethod(payload: unknown, queueItem: QueueItem): Promise<void>
```

Adapted (not in the official docs): the source example declares `onMessage(message: string)`, which does not match the `onMessage(connection, message)` hook; the signature below is corrected (see Notes).

```ts
class MyAgent extends Agent {
	async processEmail(data: { email: string; subject: string }) {
		// Process the email
		console.log(`Processing email: ${data.subject}`);
	}

	async onMessage(connection: Connection, message: WSMessage) {
		// Queue an email processing task
		const taskId = await this.queue("processEmail", {
			email: "user@example.com",
			subject: "Welcome!",
		});

		console.log(`Queued task with ID: ${taskId}`);
	}
}
```

With retry options:

Adapted (not in the official docs): `payload.url` is validated (https only, host allowlist, no redirects) before `fetch()`, and only transient responses are retried; see Notes.

```ts
// Placeholder: list the hosts this Agent may call.
const ALLOWED_HOSTS = new Set(["api.example.com"]);

class RobustAgent extends Agent {
	async reliableTask(payload: { url: string }, queueItem: QueueItem) {
		console.log(`Processing task ${queueItem.id}`);
		let target: URL;
		try {
			target = new URL(payload.url);
		} catch {
			return; // Invalid URL: do not retry.
		}
		if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
			return; // Rejected: do not fetch, do not retry.
		}
		const response = await fetch(target, { redirect: "manual" });
		if (!response.ok) {
			// Permanent failures (3xx, 4xx except 408/429): do not retry.
			if (response.status < 500 && response.status !== 408 && response.status !== 429) {
				console.error(`Request rejected permanently: ${response.status}`);
				return;
			}
			throw new Error(`Request failed: ${response.status}`); // transient: retry
		}
	}

	async onMessage(connection: Connection, message: WSMessage) {
		await this.queue(
			"reliableTask",
			{ url: "https://api.example.com/data" },
			{
				retry: {
					maxAttempts: 5,
					baseDelayMs: 500,
					maxDelayMs: 10_000,
				},
			},
		);
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `callback` | `keyof this` | — | Method name to call; validated to exist when queuing |
| `payload` | `T` | — | JSON-serialized data passed to the callback |
| `options.retry` | `RetryOptions` | class `static options.retry` (3 attempts, 100ms base, 3s max) | Retry with exponential backoff if the callback throws |

Queue vs schedule:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Queue | `cf_agents_queues` | — | Immediate FIFO execution; background processing |
| Schedule | `cf_agents_schedules` | — | Specific time, cron or recurring |

## Notes

- Adapted from the official docs: the official `reliableTask` passed `payload.url` straight to `fetch()`. A queued payload can originate from a client, so the example now accepts only https URLs whose host is in an allowlist (`ALLOWED_HOSTS` is a placeholder) and uses `redirect: "manual"`, so a 3xx response is not followed. Permanent responses (3xx, 4xx other than 408/429) are logged and not retried because the queue retries are head-of-line blocking; only 5xx, 408, 429 and network errors throw and are retried (capped by `maxAttempts`).

- Corrected from the official docs: the first example used `onMessage(message)`; the Agent hook is `onMessage(connection, message)`. Other source examples referencing helpers such as `this.notificationService` or `this.heavyComputation` are illustrative and omitted here.
- Placeholders: `Agent`, `Connection`, `WSMessage`, `QueueItem` and `RetryOptions` come from the `agents` package imports (omitted in the snippets); `https://api.example.com/data` and `user@example.com` are example values.
- `dequeue`, `dequeueAll`, `dequeueAllByCallback`, `getQueue` and `getQueues` are synchronous. `getQueues` fetches all items and filters in memory by parsing each payload.
- Each queued task runs with the same agent context (connection, request, email). Successful tasks are dequeued automatically; a missing callback at execution time is logged and the task skipped.
- Limitations: tasks run sequentially, FIFO only (no priority), processing happens during agent execution. Keep payloads small and callbacks idempotent. Retry head-of-line blocks the queue (see [retries.md](./retries.md)).

## Related

- [Retries](./retries.md)
- [Schedule tasks](./schedule-tasks.md)
- [Run Workflows](./run-workflows.md)
