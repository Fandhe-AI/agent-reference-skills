---
source: https://developers.cloudflare.com/kv/api/
---

# Workers Binding API

Use the Workers KV binding API (`KVNamespace`) to read, write, delete, and list key-value pairs from your Worker code.

## Signature / Usage

```js
env.NAMESPACE.get(key);
env.NAMESPACE.getWithMetadata(key);
env.NAMESPACE.put(key, value, options?);
env.NAMESPACE.delete(key);
env.NAMESPACE.list(options?);
```

## Notes

- Cloudflare Workers KV is distinct from Redis-based stores; for Upstash Redis see the upstash skill.
- Bulk writes and bulk deletes are not supported through the binding; use Wrangler or the REST API (see `write` and `delete` pages).
- `env` and binding configuration in general belong to the cloudflare-workers skill; KV-specific binding setup is in `kv-bindings.md`.

## Related

- [api-read.md](./api-read.md)
- [api-write.md](./api-write.md)
- [api-delete.md](./api-delete.md)
- [api-list.md](./api-list.md)
- [kv-bindings.md](./kv-bindings.md)
