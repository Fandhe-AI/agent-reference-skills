---
source: https://developers.cloudflare.com/kv/api/delete-key-value-pairs/
---

# Delete key-value pairs

Remove a key and its value from a KV namespace with `delete()`.

## Signature / Usage

```js
env.NAMESPACE.delete(key);
```

```js
export default {
  async fetch(request, env, ctx) {
    try {
      await env.NAMESPACE.delete("first-key");

      return new Response("Successful delete", {
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
await self.env.NAMESPACE.delete(key)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| key | `string` | The key to associate with the value. |

Response: `Promise<void>`, resolving if the delete is successful.

## Notes

- `await` the promise to verify successful deletion. Calling `delete()` on a non-existing key is returned as a successful delete.
- It may take some time for the key to be deleted from various points in the Cloudflare global network.
- Bulk delete: up to 10,000 KV pairs at once via Wrangler or the REST API. Bulk operations are not supported using the KV binding.
- Other access methods: Wrangler (`kv key delete`) and the REST API.

## Related

- [api-write.md](./api-write.md)
- [api-list.md](./api-list.md)
- [kv-commands.md](./kv-commands.md)
