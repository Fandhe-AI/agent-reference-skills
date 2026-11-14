---
source: https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/
---

# Automatic retries

The runtime retries some failed `fetch()` and RPC calls to a Durable Object through a stub, whether the caller is a Worker or another Durable Object. No code change is needed to get these retries; stub options and `retryable()` adjust them.

## Signature / Usage

Set retry limits when creating a stub (the official example):

```js
export default {
	async fetch(request, env) {
		// Retry at most once, and start no retry after 2 seconds.
		const stub = env.CART.getByName("user-123", {
			retry: { maxRetries: 1, timeoutMs: 2000 },
		});

		await stub.setQuantity("item-1", 3);
		return new Response("OK");
	},
};
```

Mark an idempotent method so the Durable Object runs a retry even if it already received the first attempt (the official example):

```js
import { DurableObject } from "cloudflare:workers";
import { retryable } from "cloudflare:durable-objects";

export class Cart extends DurableObject {
	static {
		retryable(this.prototype.setQuantity);
	}
	// Idempotent: a second run sets the same quantity.
	async setQuantity(itemId, quantity) {
		await this.ctx.storage.put(itemId, quantity);
	}

	// Not retryable: a second run would add another item.
	async addOne(itemId) {
		const quantity = (await this.ctx.storage.get(itemId)) ?? 0;
		await this.ctx.storage.put(itemId, quantity + 1);
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `retry.maxRetries` | integer `0` to `10` | `4` | Retries after the first attempt. `0` turns off retries for the stub. |
| `retry.timeoutMs` | integer `500` to `60000` | `10000` | Milliseconds from the start of a call after which no retry starts. |
| `retryable(...fns)` | `(...Function) => void` | — | From `cloudflare:durable-objects`. Marks methods (or `fetch()`) as safe to run more than once. Throws `TypeError` and marks none if any argument is not a function. |

## Notes

- Retried failures: errors with `.retryable === true` where the request never reached the Durable Object (for example restarting or moving), or the connection dropped and the runtime cannot tell whether it arrived. The retry carries the same request identity; if the first attempt arrived, the Durable Object rejects the retry and the call fails with the original error unless the method is marked with `retryable()`.
- Not retried: errors thrown by your Durable Object code, errors after the request reached the object, `.overloaded` errors, and HTTP error responses such as `500`.
- Defaults: up to five attempts in total (first plus four retries), no retry starting after 10 seconds, exponential backoff with jitter. The first attempt is never cancelled; a retry still running at the timeout is cancelled. When retries run out, the call fails with the error from the first failed attempt (or a later non-retryable error). Retries do not count toward the subrequest limit.
- Calls that cannot be sent again unchanged are not retried: a `fetch()` with a `ReadableStream` body; RPC calls whose arguments include a stream, stub, function or `RpcTarget`; calls using promise pipelining; calls through a stub received as an RPC argument or return value (only stubs created from a namespace, such as with `getByName()`, retry).
- `retryable()` does not change which failures are retried or how many retries occur. The mark belongs to the function: subclasses inherit it, but an override, a bound copy or a wrapper must be marked itself. Each attempt creates its own return value, so an `RpcTarget` `[Symbol.dispose]()` can run once per attempt.
- Invalid `retry` values: a non-number throws `TypeError`; an out-of-range or non-integer number throws `RangeError`.
- If your own code also retries, each of its attempts can include runtime retries (up to five attempts by default). Keep your own retry count low or set `maxRetries: 0`; see the error-handling page.
- Only the JavaScript snippets are reproduced; the official page also gives TypeScript versions.
- Source: https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Error handling](./error-handling.md)
- [DurableObjectNamespace](./namespace.md)
- [DurableObjectStub](./stub.md)
