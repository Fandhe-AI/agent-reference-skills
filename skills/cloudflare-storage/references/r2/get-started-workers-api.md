---
source: https://developers.cloudflare.com/r2/get-started/workers-api/
---

# Get started: Workers API

Bind an R2 bucket to a Worker and read and write objects directly through the binding.

## Signature / Usage

```jsonc
{
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket"
    }
  ]
}
```

```js
export default {
	async fetch(request, env) {
		// Get the object key from the URL path
		// For example: /images/cat.png → images/cat.png
		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		// PUT: Store the request body in R2
		if (request.method === "PUT") {
			await env.MY_BUCKET.put(key, request.body);
			return new Response(`Put ${key} successfully!`);
		}

		// GET: Retrieve the object from R2
		const object = await env.MY_BUCKET.get(key);
		if (object === null) {
			return new Response("Object not found", { status: 404 });
		}
		return new Response(object.body);
	},
};
```

## Notes

- Create the project with `npm create cloudflare@latest -- r2-worker` (select **Hello World example**); TypeScript users regenerate types with `npx wrangler types`.
- TypeScript variant uses `async fetch(request, env): Promise<Response>` and ends with `} satisfies ExportedHandler<Env>;`.
- Test locally with `npx wrangler dev`. By default it uses a local R2 simulation; objects exist only in `.wrangler/state` and do not affect the production bucket. To connect to the real bucket add `"remote": true` to the R2 binding.
- Local test: `curl -X PUT http://localhost:8787/my-file.txt -d 'Hello, R2!'` then `curl http://localhost:8787/my-file.txt`. Deploy with `npx wrangler deploy`.
- Bindings in general are covered by the cloudflare-workers skill; Wrangler configuration by the cloudflare-wrangler skill.

## Related

- [Use R2 from Workers](./workers-api-usage.md)
- [Workers API reference](./workers-api-reference.md)
- [Get started](./get-started.md)
