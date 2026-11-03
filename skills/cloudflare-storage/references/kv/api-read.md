---
source: https://developers.cloudflare.com/kv/api/read-key-value-pairs/
---

# Read key-value pairs

Retrieve values from a KV namespace with `get()` and `getWithMetadata()`, for single keys or arrays of up to 100 keys.

## Signature / Usage

```js
// Read individual key
env.NAMESPACE.get(key);

// Read multiple keys
env.NAMESPACE.get(keys);
```

```js
export default {
	async fetch(request, env, ctx) {
		try {
			// Read single key, returns value or null
			const value = await env.NAMESPACE.get("first-key");

			// Read multiple keys, returns Map of values
			const values = await env.NAMESPACE.get(["first-key", "second-key"]);

			// Read single key with metadata, returns value or null
			const valueWithMetadata = await env.NAMESPACE.getWithMetadata("first-key");

			// Read multiple keys with metadata, returns Map of values
			const valuesWithMetadata = await env.NAMESPACE.getWithMetadata(["first-key", "second-key"]);

			return Response.json({
				value: value,
				values: Object.fromEntries(values),
				valueWithMetadata: valueWithMetadata,
				valuesWithMetadata: Object.fromEntries(valuesWithMetadata)
			});
		} catch (e) {
			return new Response(e.message, { status: 500 });
		}
	},
};
```

If you request a single key as a string, the promise resolves with a single value; if the key is not found, it resolves with the literal value `null`. If you request an array of keys, the return value is a `Map` of the key-value pairs found, with keys not found having `null` values.

Single key:

```js
env.NAMESPACE.get(key, type?);
// OR
env.NAMESPACE.get(key, options?);
```

Multiple keys:

```js
env.NAMESPACE.get(keys, type?);
// OR
env.NAMESPACE.get(keys, options?);
```

With metadata (single key / multiple keys):

```js
env.NAMESPACE.getWithMetadata(key, type?);
// OR
env.NAMESPACE.getWithMetadata(key, options?);

env.NAMESPACE.getWithMetadata(keys, type?);
// OR
env.NAMESPACE.getWithMetadata(keys, options?);
```

Python Workers:

```py
self.env.NAMESPACE.get(key, type)
# OR
self.env.NAMESPACE.get(key, options)
```

## Options / Props

`get(key: string)` and `getWithMetadata(key: string)`:

| Name | Type | Description |
|------|------|-------------|
| key | `string` | The key of the KV pair. |
| type | `"text" \| "json" \| "arrayBuffer" \| "stream"` | Optional. The type of the value to be returned. `text` is the default. |
| options | `{ cacheTtl?: number, type?: "text" \| "json" \| "arrayBuffer" \| "stream" }` | Optional. Object containing the optional `cacheTtl` and `type` properties. The `cacheTtl` property defines the length of time in seconds that a KV result is cached in the global network location it is accessed from (minimum: 30). The `type` property defines the type of the value to be returned. |

`get(keys: string[])` and `getWithMetadata(keys: string[])`:

| Name | Type | Description |
|------|------|-------------|
| keys | `string[]` | The keys of the KV pairs. Max: 100 keys |
| type | `"text" \| "json"` | Optional. The type of the value to be returned. `text` is the default. |
| options | `{ cacheTtl?: number, type?: "text" \| "json" }` | Optional. Object containing the optional `cacheTtl` and `type` properties. |

Response types:

| Call | Response |
|------|----------|
| `get(key)` | `Promise<string \| Object \| ArrayBuffer \| ReadableStream \| null>` |
| `get(keys)` | `Promise<Map<string, string \| Object \| null>>` |
| `getWithMetadata(key)` | `Promise<{ value: string \| Object \| ArrayBuffer \| ReadableStream \| null, metadata: string \| Object \| null }>` |
| `getWithMetadata(keys)` | `Promise<Map<string, { value: string \| Object \| null, metadata: string \| Object \| null }>` |

Value by `type`: `text` returns a `string` (default); `json` an object decoded from a JSON string; `arrayBuffer` an `ArrayBuffer`; `stream` a `ReadableStream`. If there is no metadata associated with the key, `null` is returned for metadata.

## Notes

- `get()` and `getWithMetadata()` may return stale values. If a key has recently been read in a location, writes made in other locations may take up to 60 seconds (or the duration of the `cacheTtl`) to appear.
- Corrected from the official docs: the official example passes a plain object to `new Response(...)`, which would produce `[object Object]`; it is written as `Response.json(...)`. The official single-key `getWithMetadata` response types `metadata` as `string | null`, but metadata stored as a JSON object (see the write page) is returned as an object, matching the multi-key signature; it is written as `string | Object | null`.
- Reading multiple keys does not support `arrayBuffer` or `stream`. To read multiple keys of those types, call `.get()` for individual keys in parallel with `Promise.all()`.
- Multi-key response size limit is 25 MB; larger responses fail with a `413 Error` message.
- Type choice affects latency and CPU for large values. Fastest to slowest: `stream`, `arrayBuffer`, `text`, `json`.
- `cacheTtl` must be an integer >= `30`; `60` is the default; the maximum is `Number.MAX_SAFE_INTEGER`. It is useful for write-once or write-rarely data and reduces cold-read latency; it is not recommended if data is updated often and updates must be seen quickly, since writes from other locations are invisible until the cached value expires. Both existing and non-existent keys (negative lookups) are cached at the edge.
- A hot read means the data is cached on Cloudflare's edge network (local or regional cache); a cold read means it must be fetched from the central stores.
- Workers are limited to 1,000 operations to external services per invocation. A multi-key (bulk) read counts as a single operation.
- Coalescing: merging related hot and cold keys into one "super" entry keeps cold keys warm in cache. Advantage: infrequently accessed keys stay cached. Disadvantage: the resulting value size can push the Worker past memory limits, and safe updates require a locking mechanism. It works best when values are not updated independently, to avoid race conditions.

```plaintext
coalesced: {
  key1: value1,
  key2: value2,
  key3: value3,
}
```

- Other access methods: Wrangler `kv key get` and the REST API.

## Related

- [api-write.md](./api-write.md)
- [api-list.md](./api-list.md)
- [limits.md](./limits.md)
- [how-kv-works.md](./how-kv-works.md)
- [kv-commands.md](./kv-commands.md)
