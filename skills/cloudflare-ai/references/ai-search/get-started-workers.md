---
source: https://developers.cloudflare.com/ai-search/get-started/workers/
---

# Get started: Workers binding

Create, populate, and query an AI Search instance from a Worker without managing API tokens.

## Signature / Usage

Binding (`wrangler.jsonc`):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

`src/index.ts`. Visit `/setup` once to create the instance and index a sample document; the default route queries it.

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		// Visit /setup once to create an instance and index a sample document.
		if (url.pathname === "/setup") {
			const instance = await env.AI_SEARCH.create({ id: "my-instance" });
			const item = await instance.items.uploadAndPoll(
				"getting-started.md",
				"AI Search indexes uploaded content for retrieval.",
			);
			return Response.json({ created: "my-instance", status: item.status });
		}

		// Query the instance.
		const query = url.searchParams.get("q") ?? "What does AI Search do?";

		const results = await env.AI_SEARCH.get("my-instance").search({
			messages: [{ role: "user", content: query }],
			ai_search_options: {
				retrieval: { max_num_results: 3 },
			},
		});

		return Response.json(results.chunks);
	},
} satisfies ExportedHandler<Env>;
```

```sh
npx wrangler dev
npx wrangler login
npx wrangler deploy
```

## Notes

- `remote: true` lets `wrangler dev` proxy to the deployed instance because AI Search does not run locally.
- Calling `/setup` twice fails because instance names are unique per namespace; run it once.
- Project scaffold: `npm create cloudflare@latest -- ai-search-tutorial` (Hello World, Worker only, TypeScript).
- Worker project and `wrangler dev` / `deploy` mechanics: see the cloudflare-workers and cloudflare-wrangler skills.

## Related

- [Bindings configuration](./bindings-configuration.md)
- [Search](./search.md)
- [Items (Workers binding)](./items-workers-binding.md)
