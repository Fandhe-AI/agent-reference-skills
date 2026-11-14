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

Adapted (not in the official docs): added a pre-shared-secret authorization check (403 before any bucket operation); see Notes.

```js
export default {
	async fetch(request, env) {
		// Reject unauthorized callers (secret set with `npx wrangler secret put AUTH_KEY_SECRET`)
		if (
			!env.AUTH_KEY_SECRET ||
			request.headers.get("X-Custom-Auth-Key") !== env.AUTH_KEY_SECRET
		) {
			return new Response("Forbidden", { status: 403 });
		}

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
- Test locally with `npx wrangler dev`. By default it uses a local R2 simulation; objects exist only in `.wrangler/state` and do not affect the production bucket. To connect to the real bucket add `"remote": true` to the R2 binding; see Local development (`local-development.md`) for local data, HTTP endpoints, and remote binding setup.
- Adapted from the official docs: added an authorization check; the official example is unauthenticated and must not be deployed as is. For local testing put `AUTH_KEY_SECRET=<value>` in `.dev.vars` (add it to `.gitignore`) and send the same value in the `X-Custom-Auth-Key` header.
- Local test: `curl -X PUT http://localhost:8787/my-file.txt -H "X-Custom-Auth-Key: <value>" -d 'Hello, R2!'` then `curl http://localhost:8787/my-file.txt -H "X-Custom-Auth-Key: <value>"`. Deploy with `npx wrangler deploy`.
- Bindings in general are covered by the cloudflare-workers skill; Wrangler configuration by the cloudflare-wrangler skill.

## Related

- [Local development](./local-development.md)
- [Use R2 from Workers](./workers-api-usage.md)
- [Workers API reference](./workers-api-reference.md)
- [Get started](./get-started.md)
