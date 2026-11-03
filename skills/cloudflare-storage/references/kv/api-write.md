---
source: https://developers.cloudflare.com/kv/api/write-key-value-pairs/
---

# Write key-value pairs

Create or update a key-value pair with `put()`, optionally with expiration and metadata.

## Signature / Usage

```js
env.NAMESPACE.put(key, value, options?);
```

```js
export default {
	async fetch(request, env, ctx) {
		try {
			await env.NAMESPACE.put("first-key", "This is the value for the key");

			return new Response("Successful write", {
				status: 201,
			});
		} catch (e) {
			return new Response(e.message, { status: 500 });
		}
	},
};
```

Python Workers:

```py
self.env.NAMESPACE.put(key, value, options)
```

Expiring keys:

```js
await env.NAMESPACE.put(key, value, {
	expiration: secondsSinceEpoch,
});

await env.NAMESPACE.put(key, value, {
	expirationTtl: secondsFromNow,
});
```

Metadata:

```js
await env.NAMESPACE.put(key, value, {
	metadata: { someMetadataKey: "someMetadataValue" },
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| key | `string` | The key to associate with the value. A key cannot be empty or be exactly equal to `.` or `..`. All other keys are valid. Keys have a maximum length of 512 bytes. |
| value | `string \| ReadableStream \| ArrayBuffer` | The value to store. The type is inferred. The maximum size of a value is 25 MiB. |
| options | `{ expiration?: number, expirationTtl?: number, metadata?: object }` | Optional. |
| options.expiration | `number` | When to expire the key-value pair, in seconds since epoch. |
| options.expirationTtl | `number` | When to expire the key-value pair, in seconds from now. The minimum value is 60. |
| options.metadata | `object` | Must serialize to JSON. The maximum size of the serialized JSON representation is 1024 bytes. |

Response: `Promise<void>`, resolving if the update is successful. `await` it to verify a successful update.

## Notes

- Concurrent writes to the same key can overwrite one another because KV is eventually consistent; the last write takes precedence. A common pattern is to write from a single process (Wrangler, Durable Objects, or the API).
- Writes are immediately visible to other requests in the same global network location, but can take up to 60 seconds (or the `cacheTtl` of `get()` / `getWithMetadata()`) to be visible elsewhere.
- Maximum of 1 write per second to the same key. Writes to the same key within 1 second cause rate limiting (`429`) errors (`KV PUT failed: 429 Too Many Requests`). Consolidate writes within an invocation into one, or wait at least 1 second between writes; the recommended approach for handling these errors is retry with exponential backoff.
- Bulk writes (up to 10,000 KV pairs at once; entire request under 100 megabytes; a `key` and a `value` required per pair) are available through Wrangler or the REST API, not the KV binding.
- Expiration: set either an absolute time (`expiration`, seconds since the UNIX epoch, e.g. `1554076800` for 12:00AM UTC on April 1, 2019) or a relative TTL (`expirationTtl`, e.g. `600` for 10 minutes). Targets less than 60 seconds in the future are not supported by either method. After expiry the key is deleted and reads behave as if it does not exist; expired keys do not count toward storage billing. `expiration` always takes precedence over a longer `cacheTtl`.
- Other access methods: Wrangler (`kv key put`) and the REST API.

Retry with exponential backoff example:

```typescript
async function retryWithBackoff(
	fn: Function,
	maxAttempts = 5,
	initialDelay = 1000,
) {
	let attempts = 0;
	let delay = initialDelay;

	while (attempts < maxAttempts) {
		try {
			// Attempt the function
			return await fn();
		} catch (error) {
			// Check if the error is a rate limit error
			if (
				(error as Error).message.includes(
					"KV PUT failed: 429 Too Many Requests",
				)
			) {
				attempts++;
				if (attempts >= maxAttempts) {
					throw new Error("Max retry attempts reached");
				}

				// Wait for the backoff period
				console.warn(`Attempt ${attempts} failed. Retrying in ${delay} ms...`);
				await new Promise((resolve) => setTimeout(resolve, delay));

				// Exponential backoff
				delay *= 2;
			} else {
				// If it's a different error, rethrow it
				throw error;
			}
		}
	}
}
```

## Related

- [api-read.md](./api-read.md)
- [api-delete.md](./api-delete.md)
- [limits.md](./limits.md)
- [how-kv-works.md](./how-kv-works.md)
- [kv-commands.md](./kv-commands.md)
