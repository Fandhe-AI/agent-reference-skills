---
source: https://developers.cloudflare.com/kv/concepts/kv-namespaces/
---

# KV namespaces

A KV namespace is a key-value database replicated to Cloudflare's global network. Bind namespaces through Wrangler or the Cloudflare dashboard.

## Signature / Usage

```jsonc
{
	"kv_namespaces": [
		{
			"binding": "<TEST_NAMESPACE>",
			"id": "<TEST_ID>"
		}
	]
}
```

## Options / Props

Each entry of the `kv_namespaces` array:

| Name | Type | Description |
|------|------|-------------|
| binding | `string` (required) | The binding name used to refer to the KV namespace. |
| id | `string` (required) | The ID of the KV namespace. |
| preview_id | `string` (optional) | The ID of the KV namespace used during `wrangler dev`. |

## Notes

- KV namespace IDs are public and bound to your account.
- Namespaces can optionally be restricted to a jurisdiction (see `data-location.md`).
- Dashboard binding steps: **Workers & Pages** > select your Worker > **Settings** > **Bindings** > **Add** > **KV Namespace** > enter the variable name > select the namespace > **Deploy**.

## Related

- [kv-bindings.md](./kv-bindings.md)
- [data-location.md](./data-location.md)
- [kv-commands.md](./kv-commands.md)
