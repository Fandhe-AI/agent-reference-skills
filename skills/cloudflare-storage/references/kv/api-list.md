---
source: https://developers.cloudflare.com/kv/api/list-keys/
---

# List keys

Enumerate keys in a KV namespace with `list()`, with prefix filtering and cursor pagination.

## Signature / Usage

```ts
env.NAMESPACE.list(options?)
```

```js
export default {
  async fetch(request, env, ctx) {
    try {
      const value = await env.NAMESPACE.list();

      return new Response(JSON.stringify(value.keys), {
        status: 200
      });
    }
    catch (e)
    {
      return new Response(e.message, {status: 500});
    }
  },
};
```

Python Workers:

```py
self.env.NAMESPACE.list(options)
```

The promise resolves with an object that looks like:

```json
{
  "keys": [
    {
      "name": "foo",
      "expiration": 1234,
      "metadata": { "someMetadataKey": "someMetadataValue" }
    }
  ],
  "list_complete": false,
  "cursor": "6Ck1la0VxJ0djhidm1MdX2FyD"
}
```

List by prefix:

```js
export default {
  async fetch(request, env, ctx) {
    const value = await env.NAMESPACE.list({ prefix: "user:1:" });
    return new Response(value.keys);
  },
};
```

Pagination:

```js
const value = await NAMESPACE.list();

const cursor = value.cursor;

const next_value = await NAMESPACE.list({ cursor: cursor });
```

## Options / Props

`options`: `{ prefix?: string, limit?: string, cursor?: string }`

| Name | Type | Description |
|------|------|-------------|
| prefix | `string` | A prefix used to filter all keys. |
| limit | `string` | Maximum number of keys returned. The default is 1,000 keys, which is the maximum. |
| cursor | `string` | Used for paginating responses. |

Response: `Promise<{ keys: { name: string, expiration?: number, metadata?: object }[], list_complete: boolean, cursor: string }>`

| Name | Type | Description |
|------|------|-------------|
| keys | `{ name: string, expiration?: number, metadata?: object }[]` | One object per listed key. `expiration` is present only if the key has one, in absolute form even if set as a TTL. `metadata` is present only if non-null metadata is set. |
| list_complete | `boolean` | `false` if there are more keys to fetch, even if `keys` is empty. |
| cursor | `string` | Used for paginating responses. |

## Notes

- Keys are returned in lexicographically sorted order according to their UTF-8 bytes.
- Do not use an empty `keys` array to decide whether more keys exist; use `list_complete`. An empty array can still have more keys because recently expired or deleted keys (tombstones) must be iterated through but are not returned.
- When paginating with `prefix`, provide the `prefix` argument in all subsequent calls along with the initial arguments.
- Changes may take up to 60 seconds (or the `cacheTtl` of `get()` / `getWithMetadata()`) to be reflected.
- Storing values in metadata (when they fit in the metadata size limit) is more efficient than a `list()` followed by a `get()` per key. Leave `value` empty in `put()` and include the value in metadata:

```js
await NAMESPACE.put(key, "", {
  metadata: { value: value },
});
```

- Other access methods: Wrangler (`kv key list`) and the REST API.

## Related

- [api-read.md](./api-read.md)
- [api-write.md](./api-write.md)
- [limits.md](./limits.md)
- [kv-commands.md](./kv-commands.md)
