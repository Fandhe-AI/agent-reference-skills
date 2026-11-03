---
source: https://developers.cloudflare.com/agents/agent-class/retries/
---

# Retries (this.retry / RetryOptions)

Built-in retry with full-jitter exponential backoff for `this.retry()`, `schedule()`, `scheduleEvery()`, `queue()` and MCP server connections.

## Signature / Usage

```ts
async retry<T>(
  fn: (attempt: number) => Promise<T>,
  options?: RetryOptions & {
    shouldRetry?: (err: unknown, nextAttempt: number) => boolean;
  }
): Promise<T>

interface RetryOptions {
	/** Maximum number of attempts (including the first). Must be an integer >= 1. Default: 3 */
	maxAttempts?: number;
	/** Base delay in milliseconds for exponential backoff. Must be > 0 and <= maxDelayMs. Default: 100 */
	baseDelayMs?: number;
	/** Maximum delay cap in milliseconds. Must be > 0. Default: 3000 */
	maxDelayMs?: number;
}
```

Adapted (not in the official docs): `url` is validated (https only, host allowlist, no redirects) before `fetch()`, and only transient errors are retried via `shouldRetry`; see Notes.

```ts
import { Agent } from "agents";

// Placeholder: list the hosts this Agent may call.
const ALLOWED_HOSTS = new Set(["api.example.com"]);

class HttpError extends Error {
	constructor(
		public status: number,
		body: string,
	) {
		super(`HTTP ${status}: ${body}`);
	}
}

export class MyAgent extends Agent {
	async fetchWithRetry(url: string) {
		const target = new URL(url); // Throws on an invalid URL.
		if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
			throw new Error("URL not allowed");
		}
		const response = await this.retry(async () => {
			const res = await fetch(target, { redirect: "manual" });
			if (!res.ok) throw new HttpError(res.status, await res.text());
			return res.json();
		}, {
			// Retry transient failures only; 4xx (except 408/429) and 3xx are permanent.
			shouldRetry: (err) =>
				!(err instanceof HttpError) ||
				err.status >= 500 ||
				err.status === 408 ||
				err.status === 429,
		});

		return response;
	}
}
```

Selective retry:

```ts
const data = await this.retry(
	async () => {
		const res = await fetch("https://api.example.com/data");
		if (!res.ok) throw new HttpError(res.status, await res.text());
		return res.json();
	},
	{
		maxAttempts: 5,
		shouldRetry: (err, nextAttempt) => {
			// Do not retry 4xx client errors — our request is wrong
			if (err instanceof HttpError && err.status >= 400 && err.status < 500) {
				return false;
			}
			return true; // retry everything else (5xx, network errors, etc.)
		},
	},
);
```

Schedules, queue, class defaults and MCP:

Adapted (not in the official docs): the source's schedule examples pass `("processTask", 60, ...)` (callback first), which contradicts `schedule(when, callback, ...)`; arguments are reordered here (see Notes).

```ts
// Retry up to 5 times if the callback fails
await this.schedule(
	60,
	"processTask",
	{ taskId: "123" },
	{
		retry: { maxAttempts: 5 },
	},
);

// Cron with retries
await this.schedule(
	"0 8 * * *",
	"dailyDigest",
	{},
	{
		retry: { maxAttempts: 3 },
	},
);

// Interval with retries
await this.scheduleEvery(
	30,
	"poll",
	{ source: "api" },
	{
		retry: { maxAttempts: 5, baseDelayMs: 200 },
	},
);

await this.queue(
	"sendEmail",
	{ to: "user@example.com" },
	{
		retry: { maxAttempts: 5 },
	},
);

await this.addMcpServer("github", "https://mcp.github.com", {
	retry: { maxAttempts: 5, baseDelayMs: 1000, maxDelayMs: 10000 },
});
```

Class-level defaults:

```ts
class MyAgent extends Agent {
	// Only override maxAttempts; baseDelayMs (100) and maxDelayMs (3000) stay default
	static options = {
		retry: { maxAttempts: 10 },
	};
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxAttempts` | `number` | `3` | Maximum attempts including the first; integer >= 1. `1` disables retries |
| `baseDelayMs` | `number` | `100` | Base backoff delay; > 0 and <= `maxDelayMs` |
| `maxDelayMs` | `number` | `3000` | Delay cap; > 0 |
| `shouldRetry` | `(err, nextAttempt) => boolean` | retry all errors | Only on `this.retry()`; return `false` to stop |
| MCP `retry` | `RetryOptions` | 3 attempts, 500ms base, 5s max | Applies to MCP connection/reconnection, persisted across hibernation and OAuth completion |

Backoff: `delay = random(0, min(2^attempt * baseDelayMs, maxDelayMs))`. With defaults: attempt 1 upper bound 200ms, attempt 2 400ms.

## Notes

- Adapted from the official docs: the official `fetchWithRetry(url)` fetched any caller-supplied URL (SSRF). It now rejects non-https URLs and hosts outside an allowlist (`ALLOWED_HOSTS` is a placeholder) before calling `this.retry()`, and uses `redirect: "manual"` so redirects are not followed (a 3xx is not `ok`). The validation runs outside the retried function so a rejected URL is not retried. The `HttpError` class and the `shouldRetry` filter are additions so that permanent responses (3xx, 4xx other than 408/429) are not retried; `HttpError` in the "Selective retry" snippet below is the same placeholder class.

- Corrected from the official docs: schedule examples showed `schedule("processTask", 60, ...)`; the signature is `schedule(when, callback, payload?, options?)`.
- Options are validated eagerly (`retry.maxAttempts must be >= 1`, `retry.baseDelayMs must be > 0`, integer check, `baseDelayMs <= maxDelayMs` after resolving class defaults). E.g. `{ baseDelayMs: 5000 }` throws because the default `maxDelayMs` is 3000.
- Schedules: after all attempts fail the error is logged and routed through `onError()`; one-time schedules are still removed and cron/interval rescheduled. Queues: the task is dequeued after exhaustion.
- Limitations: no dead-letter queue, delays block the agent (awake but idle), queue retries are head-of-line blocking, no circuit breaker, `shouldRetry` unavailable for `schedule()`/`queue()` (functions cannot be serialized).
- For long outages combine `this.retry()` with `this.schedule()` re-scheduling.

## Related

- [Schedule tasks](./schedule-tasks.md)
- [Queue tasks](./queue-tasks.md)
- [Run Workflows](./run-workflows.md)
