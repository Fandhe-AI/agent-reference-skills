---
source: https://developers.cloudflare.com/kv/
---

# Cloudflare Workers KV

Workers KV is a global, low-latency, key-value data store for building dynamic and performant APIs and websites. Available on Free and Paid plans.

## Signature / Usage

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		// write a key-value pair
		await env.KV.put('KEY', 'VALUE');

		// read a key-value pair
		const value = await env.KV.get('KEY');

		// list all key-value pairs
		const allKeys = await env.KV.list();

		// delete a key-value pair
		await env.KV.delete('KEY');

		// return a Workers response
		return new Response(
			JSON.stringify({
				value: value,
				allKeys: allKeys,
			}),
		);
	},

} satisfies ExportedHandler<{ KV: KVNamespace }>;
```

Wrangler configuration:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<ENTER_WORKER_NAME>",
	"main": "src/index.ts",
	"upload_source_maps": true,
	"compatibility_date": "2025-02-04",
	"observability": {
		"enabled": true
	},

	"kv_namespaces": [
		{
			"binding": "KV",
			"id": "<YOUR_BINDING_ID>"
		}
	]
}
```

Access from an external application with the REST API:

```plaintext
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/values/$KEY_NAME \
		-X PUT \
		-H 'Content-Type: multipart/form-data' \
		-H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
		-H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
		-d '{
			"value": "Some Value"
		}'

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/values/$KEY_NAME \
		-H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
		-H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

Or with the Cloudflare TypeScript SDK:

```ts
const client = new Cloudflare({
	apiEmail: process.env['CLOUDFLARE_EMAIL'], // This is the default and can be omitted
	apiKey: process.env['CLOUDFLARE_API_KEY'], // This is the default and can be omitted
});

const value = await client.kv.namespaces.values.update('<KV_NAMESPACE_ID>', 'KEY', {
	account_id: '<ACCOUNT_ID>',
	value: 'VALUE',
});

const value = await client.kv.namespaces.values.get('<KV_NAMESPACE_ID>', 'KEY', {
	account_id: '<ACCOUNT_ID>',
});

const value = await client.kv.namespaces.values.delete('<KV_NAMESPACE_ID>', 'KEY', {
	account_id: '<ACCOUNT_ID>',
});

// Automatically fetches more pages as needed.
for await (const namespace of client.kv.namespaces.list({ account_id: '<ACCOUNT_ID>' })) {
	console.log(namespace.id);
}
```

## Notes

- Typical uses: caching API responses, storing user configurations / preferences, storing user authentication details.
- The REST API and pre-generated SDKs (TypeScript, Python, Go) are documented at the Cloudflare KV REST API reference (`https://developers.cloudflare.com/api/resources/kv/`), which is outside this reference.
- Related products: R2 (unstructured object storage without egress fees), Durable Objects (scalable compute and permanent, consistent storage), D1 (SQLite-based relational database).
- Cloudflare Workers KV is distinct from Redis-based stores; for Upstash Redis see the upstash skill.
- Bindings (`env`) as a general concept and Wrangler commands in general are covered by the cloudflare-workers and cloudflare-wrangler skills.

## Related

- [api-overview.md](./api-overview.md)
- [get-started.md](./get-started.md)
- [how-kv-works.md](./how-kv-works.md)
- [kv-bindings.md](./kv-bindings.md)
- [limits.md](./limits.md)
- [pricing.md](./pricing.md)
