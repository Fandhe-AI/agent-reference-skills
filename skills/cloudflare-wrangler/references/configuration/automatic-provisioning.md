---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#automatic-provisioning
---

# Automatic Provisioning

Wrangler can automatically provision resources when you deploy your Worker, without creating them ahead of time.

## Signature / Usage

Add bindings to the configuration file without resource IDs (or, for R2, without a bucket name):

```jsonc
{
	"kv_namespaces": [
		{
			"binding": "<MY_KV_NAMESPACE>",
		},
	],
}
```

```toml
[[kv_namespaces]]
binding = "<MY_KV_NAMESPACE>"
```

## Notes

- Currently works for: KV, R2, D1, Flagship, AI Search, Agent Memory, Dispatch Namespaces and Queues.
- Resources are created with the name of your worker as the prefix.
- When you run `wrangler dev`, local resources are created automatically and persist between runs.
- When you run `wrangler deploy`, resources are created for you and their IDs are written back to your configuration file.
- If you deploy a worker with resources and no resource IDs from the dashboard (for example, via GitHub), resources are created, but their IDs are only accessible via the dashboard. Currently, these resource IDs are not written back to your repository.

## Related

- [overview.md](./overview.md)
- [bindings-storage.md](./bindings-storage.md)
- [bindings-queues.md](./bindings-queues.md)
