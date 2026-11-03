---
source: https://developers.cloudflare.com/ai-search/how-to/simple-search-engine/
---

# Simple search engine with the AI Search binding

A Worker that returns the file names of the chunks matching a query, using `search()` on a namespace binding.

## Signature / Usage

Create a Worker project with `npm create cloudflare@latest -- search-engine` (Hello World example, Worker only, TypeScript); C3 generates a Wrangler configuration file whose `main` is `src/index.ts`. Add the binding to that file:

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

`src/index.ts` (set the secret with `npx wrangler secret put SEARCH_API_TOKEN`):

Adapted (not in the official docs): the official Worker is unauthenticated; this version requires a bearer token and rejects every request when the `SEARCH_API_TOKEN` secret is unset. See Notes.

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
	SEARCH_API_TOKEN?: string;
}

function isAuthorized(request: Request, token: string | undefined): boolean {
	if (!token) return false; // fail closed when the secret is unset
	const enc = new TextEncoder();
	const given = enc.encode(request.headers.get("authorization") ?? "");
	const expected = enc.encode(`Bearer ${token}`);
	return (
		given.byteLength === expected.byteLength &&
		crypto.subtle.timingSafeEqual(given, expected)
	);
}

export default {
	async fetch(request, env): Promise<Response> {
		if (!isAuthorized(request, env.SEARCH_API_TOKEN)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const url = new URL(request.url);
		const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";

		const searchResult = await env.AI_SEARCH.get("my-instance").search({
			messages: [{ role: "user", content: userQuery }],
		});

		return Response.json({
			files: searchResult.chunks.map((chunk) => chunk.item.key),
		});
	},
} satisfies ExportedHandler<Env>;
```

Secrets set with `npx wrangler secret put` apply to the deployed Worker only. For `wrangler dev`, put `SEARCH_API_TOKEN="<random-token>"` in a `.dev.vars` file in the project root (gitignored), then start a local development server:

```sh
npx wrangler dev
```

In another terminal, query it with the token from `.dev.vars`:

Adapted (not in the official docs): the official page only names the `/?query=your+search+terms` path; this request adds the bearer token the adapted Worker requires. See Notes.

```sh
curl -H "Authorization: Bearer <TOKEN>" "http://localhost:8787/?query=your+search+terms"
```

## Notes

- Adapted from the official docs: added the bearer-token check (fail-closed) so the Worker is not an open search endpoint over the index, and the local test request sends that token. For local development put `SEARCH_API_TOKEN` in `.dev.vars` and keep that file out of git.
- For best results with this pattern, disable query rewriting and use small chunk sizes (256 tokens is usually enough).
- `remote: true` lets `wrangler dev` proxy to the deployed instance because AI Search does not run locally.
- Replace `my-instance` with your instance name.

## Related

- [Instance methods](../references/ai-search/instance-methods.md)
- [Search](../references/ai-search/search.md)
- [Namespaces](../references/ai-search/namespaces.md)
