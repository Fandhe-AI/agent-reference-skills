---
source: https://developers.cloudflare.com/workers/runtime-apis/scheduler/
---

# Scheduler

The `scheduler` global provides task scheduling APIs based on the WICG Scheduling APIs proposal. Workers currently implement `scheduler.wait()`, an `await`-able alternative to `setTimeout()`.

## Signature / Usage

```js
await scheduler.wait(delay);
await scheduler.wait(delay, options);
```

Basic delay:

```js
export default {
	async fetch(request) {
		// Wait for 1 second
		await scheduler.wait(1000);
		return new Response("Delayed response");
	},
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delay` | number | Milliseconds to wait before the returned Promise resolves. |
| `options` | object (optional) | Configuration for the wait operation. |
| `options.signal` | AbortSignal (optional) | Cancels the wait. When aborted, the returned Promise rejects with an `AbortError`. |

Returns `Promise<void>` that resolves after `delay` milliseconds.

## Notes

- Like other timers in Workers, `scheduler.wait()` does not advance during CPU execution when deployed (Spectre mitigation). In local development timers advance regardless of I/O.

Retry with exponential backoff:

```js
async function fetchWithRetry(url, maxAttempts = 3) {
	const baseBackoffMs = 100;
	const maxBackoffMs = 10000;

	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		try {
			return await fetch(url);
		} catch (err) {
			if (attempt + 1 >= maxAttempts) {
				throw err;
			}
			const backoffMs = Math.min(
				maxBackoffMs,
				baseBackoffMs * Math.random() * Math.pow(2, attempt),
			);
			await scheduler.wait(backoffMs);
		}
	}
	throw new Error("unreachable");
}

export default {
	async fetch(request) {
		const response = await fetchWithRetry("https://example.com/api");
		return new Response(response.body, response);
	},
};
```

Cancel with AbortSignal:

```js
export default {
	async fetch(request) {
		const controller = new AbortController();

		// Cancel the wait after 500ms
		setTimeout(() => controller.abort(), 500);

		try {
			await scheduler.wait(5000, { signal: controller.signal });
			return new Response("Wait completed");
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") {
				return new Response("Wait was cancelled", { status: 408 });
			}
			throw err;
		}
	},
};
```

## Related

- [Performance and timers](./performance.md)
- [Web standards (timers, AbortController)](./web-standards.md)
