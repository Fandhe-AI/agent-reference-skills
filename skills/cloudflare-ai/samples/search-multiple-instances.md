---
source: https://developers.cloudflare.com/ai-search/how-to/search-multiple-sources/
---

# Search several AI Search instances in one call

Fan one query out to a shared instance and a per-tenant instance with the namespace-level `search()`, and group chunks by `instance_id`.

## Signature / Usage

Binding:

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

`src/index.ts` (the `TENANT_TOKENS` secret is a JSON object such as `{"acme":"<random-token>"}`):

Adapted (not in the official docs): the official Worker trusts an `x-tenant-id` header and creates instances on demand for any value. This version derives the tenant from a per-tenant bearer token held in the `TENANT_TOKENS` secret, fails closed, validates the tenant ID against the instance ID pattern, and expects the instances to be provisioned ahead of time. See Notes.

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
	TENANT_TOKENS?: string;
}

// The shared instance that every tenant can search.
const GENERAL_INSTANCE = "general-knowledge";
// Each tenant also has its own instance, holding only that tenant's content.
const tenantInstance = (tenantId: string) => `tenant-${tenantId}`;
// Instance IDs must match ^[a-z0-9_]+(?:-[a-z0-9_]+)*$. The tenant part is
// capped at 25 chars so "tenant-<id>" stays within 32 chars.
const TENANT_ID = /^[a-z0-9_]+(?:-[a-z0-9_]+)*$/;
const isValidTenantId = (id: string) => id.length <= 25 && TENANT_ID.test(id);

function safeEqual(a: string, b: string): boolean {
	const enc = new TextEncoder();
	const x = enc.encode(a);
	const y = enc.encode(b);
	return x.byteLength === y.byteLength && crypto.subtle.timingSafeEqual(x, y);
}

// Returns the tenant that owns the bearer token, or null (fail closed).
function resolveTenant(request: Request, env: Env): string | null {
	let tokens: unknown;
	try {
		tokens = JSON.parse(env.TENANT_TOKENS ?? "");
	} catch {
		return null;
	}
	if (typeof tokens !== "object" || tokens === null || Array.isArray(tokens)) {
		return null;
	}
	const bearer = (request.headers.get("authorization") ?? "").replace(
		/^Bearer /,
		"",
	);
	if (!bearer) return null;
	for (const [tenantId, token] of Object.entries(tokens)) {
		if (
			typeof token === "string" &&
			isValidTenantId(tenantId) &&
			safeEqual(token, bearer)
		) {
			return tenantId;
		}
	}
	return null;
}

export default {
	async fetch(request, env): Promise<Response> {
		const tenantId = resolveTenant(request, env);
		if (!tenantId) {
			return new Response("Unauthorized", { status: 401 });
		}
		const query = new URL(request.url).searchParams.get("q");
		if (!query) {
			return new Response("Add a ?q= query parameter", { status: 400 });
		}

		// Search the shared instance and this tenant's instance in one call.
		// AI Search fans out to both, merges the results, and tags each chunk
		// with the instance_id it came from. You can pass 1 to 10 instance IDs.
		const results = await env.AI_SEARCH.search({
			query,
			ai_search_options: {
				instance_ids: [GENERAL_INSTANCE, tenantInstance(tenantId)],
			},
		});

		// Use the instance_id tag to separate shared results from tenant results.
		const fromGeneral = results.chunks.filter(
			(chunk) => chunk.instance_id === GENERAL_INSTANCE,
		);
		const fromTenant = results.chunks.filter(
			(chunk) => chunk.instance_id === tenantInstance(tenantId),
		);

		return Response.json({
			query: results.search_query,
			general: fromGeneral.map((chunk) => ({
				key: chunk.item.key,
				text: chunk.text,
			})),
			tenant: fromTenant.map((chunk) => ({
				key: chunk.item.key,
				text: chunk.text,
			})),
			// If one instance fails, the other still returns. Failures land here.
			errors: results.errors,
		});
	},
} satisfies ExportedHandler<Env>;
```

To return one written answer grounded in both instances, use `chatCompletions` with the same `instance_ids` (inside the same handler, after `tenantId` and `query` are resolved):

Adapted (not in the official docs): the official snippet passes `query`, but `chatCompletions()` takes a `messages` array (the binding reference and `AiSearchMultiChatCompletionsRequest` both require it); the query is wrapped in a user message. See Notes.

```ts
const completion = await env.AI_SEARCH.chatCompletions({
	messages: [{ role: "user", content: query }],
	ai_search_options: {
		instance_ids: [GENERAL_INSTANCE, tenantInstance(tenantId)],
	},
});

// The generated answer, grounded in both the shared and tenant content.
const answer = completion.choices[0]?.message.content;
```

## Notes

- Adapted from the official docs: tenant identity comes from a verified token rather than a client-supplied header, and the on-request `ensureInstance()` (create + seed, with a catch that swallowed every error) was removed; provision `general-knowledge` and `tenant-<id>` instances beforehand (for example with `env.AI_SEARCH.create({ id })` from an admin script).
- Corrected from the official docs: the guide's `chatCompletions({ query, ... })` example does not match the binding, whose namespace-level `chatCompletions()` requires `messages` (only `search()` accepts a plain `query`); the example sends `messages: [{ role: "user", content: query }]`.
- Instance IDs must match `^[a-z0-9_]+(?:-[a-z0-9_]+)*$`. The instances binding page allows 1-64 characters while the `@cloudflare/workers-types` JSDoc says 1-32, so tenant IDs are capped at 25 characters to keep `tenant-<id>` within the stricter limit.
- `env.AI_SEARCH.search()` is the namespace-level search; `env.AI_SEARCH.get(id).search()` searches a single instance.
- A missing or failing instance yields a partial result and an `errors` array instead of throwing.
- Store the secret with `npx wrangler secret put TENANT_TOKENS` for the deployed Worker; `wrangler dev` does not read deployed secrets, so for local runs put `TENANT_TOKENS='{"acme":"<random-token>"}'` in `.dev.vars` and keep it out of git.

## Related

- [Namespace methods](../references/ai-search/namespace-methods.md)
- [Namespaces](../references/ai-search/namespaces.md)
- [Chat completions](../references/ai-search/chat-completions.md)
