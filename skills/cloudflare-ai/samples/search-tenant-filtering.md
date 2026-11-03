---
source: https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/
---

# Multitenancy: shared instance with folder filtering

Serve many tenants from one instance whose content is organized in per-tenant folders, scoping each query with a `folder` filter.

## Signature / Usage

Binding:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search": [
    {
      "binding": "SHARED_INSTANCE",
      "instance_name": "shared-instance",
      "remote": true
    }
  ]
}
```

Content layout: `customer-a/logs/`, `customer-a/contracts/`, `customer-b/contracts/`.

`src/index.ts` (the `TENANT_TOKENS` secret is JSON such as `{"customer-a":"<random-token>"}`):

Adapted (not in the official docs): the official Worker takes the tenant from an unverified `x-tenant-id` header; a forged header would read another tenant's folder. Here the tenant comes from a per-tenant bearer token, and the user's question comes from `?q=` instead of the hard-coded string. See Notes.

```ts
export type Env = {
	SHARED_INSTANCE: AiSearchInstance;
	TENANT_TOKENS?: string;
};

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
			/^[a-z0-9-]{1,32}$/.test(tenantId) &&
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

		// Filter results to only return documents from this tenant's folder.
		const results = await env.SHARED_INSTANCE.search({
			messages: [{ role: "user", content: query }],
			ai_search_options: {
				retrieval: {
					filters: {
						folder: { $gte: `${tenantId}/`, $lt: `${tenantId}0` },
					},
				},
			},
		});

		return Response.json(results);
	},
} satisfies ExportedHandler<Env>;
```

Store the tenant map with `npx wrangler secret put TENANT_TOKENS` for the deployed Worker. For `wrangler dev`, put `TENANT_TOKENS='{"customer-a":"<CUSTOMER_A_TOKEN>"}'` in a `.dev.vars` file in the project root (gitignored), then start a local development server:

```sh
npx wrangler dev
```

In another terminal:

Adapted (not in the official docs): the request sends the tenant's bearer token and a `?q=` question. See Notes.

```sh
curl "http://localhost:8787/?q=when+did+I+sign" -H "Authorization: Bearer <CUSTOMER_A_TOKEN>"
```

## Notes

- Adapted from the official docs: verified tenant identity (from the `TENANT_TOKENS` secret; `.dev.vars` locally, kept out of git) and a request-supplied query. The tenant ID regex also keeps `/` and other characters out of the filter bounds.
- The range `$gte "<tenant>/"` and `$lt "<tenant>0"` is the "starts with" folder filter (`0` is the character after `/`), matching subfolders too.
- This is the simpler option; the page recommends one instance per tenant when you need strong isolation or create and delete tenants at runtime.
- Works with R2 and built-in storage.

## Related

- [Instance per tenant](./search-tenant-instances.md)
- [Instance methods](../references/ai-search/instance-methods.md)
- [Bindings configuration](../references/ai-search/bindings-configuration.md)
