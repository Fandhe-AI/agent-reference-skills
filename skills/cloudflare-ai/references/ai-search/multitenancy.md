---
source: https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/
---

# Multitenancy (instance per tenant)

Isolate tenants by giving each its own instance (recommended) or by sharing one instance and filtering by metadata at query time.

## Signature / Usage

Binding:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "TENANTS",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

Adapted (not in the official docs): the tenant is derived from a verified API key instead of a raw `x-tenant-id` header; the secret `TENANT_KEYS` is a JSON map of tenant ID to key, and the Worker fails closed when it is unset. The upload route also caps `Content-Length` before buffering and passes the `File` (a `Blob`) to `items.upload()` instead of an `ArrayBuffer`, and `q` is required. See Notes.

```ts
export type Env = {
	TENANTS: AiSearchNamespace;
	// Secret: JSON object mapping tenant ID to API key, e.g. {"acme":"<key>"}
	TENANT_KEYS?: string;
};

// Resolve the tenant from a verified credential. Never trust a client-supplied
// tenant header directly.
function authenticate(request: Request, env: Env): string | null {
	if (!env.TENANT_KEYS) return null; // fail closed when the secret is unset
	const presented = request.headers.get("authorization")?.replace(/^Bearer /, "");
	if (!presented) return null;
	let keys: unknown;
	try {
		keys = JSON.parse(env.TENANT_KEYS);
	} catch {
		return null; // malformed secret: fail closed
	}
	if (typeof keys !== "object" || keys === null) return null;
	const enc = new TextEncoder();
	const given = enc.encode(presented);
	for (const [tenant, key] of Object.entries(keys)) {
		if (typeof key !== "string" || !/^[a-z0-9_]+(?:-[a-z0-9_]+)*$/.test(tenant)) continue;
		const expected = enc.encode(key);
		if (
			given.byteLength === expected.byteLength &&
			crypto.subtle.timingSafeEqual(given, expected)
		) {
			return tenant;
		}
	}
	return null;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		const tenantId = authenticate(request, env);
		if (!tenantId) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Create a new instance for the tenant.
		if (url.pathname === "/onboard" && request.method === "POST") {
			const instance = await env.TENANTS.create({
				id: `tenant-${tenantId}`,
			});
			return Response.json({ success: true, instance: await instance.info() });
		}

		// Upload a document to the tenant's instance.
		if (url.pathname === "/upload" && request.method === "POST") {
			// Reject oversized bodies before buffering them.
			const length = Number(request.headers.get("content-length"));
			if (!Number.isFinite(length) || length <= 0 || length > 5 * 1024 * 1024) {
				return new Response("Content-Length required, max 5 MB", { status: 413 });
			}
			const formData = await request.formData();
			const file = formData.get("file");
			if (!(file instanceof File)) {
				return new Response("Missing file", { status: 400 });
			}

			const item = await env.TENANTS.get(`tenant-${tenantId}`).items.upload(
				file.name,
				file,
			);
			return Response.json({ success: true, item });
		}

		// Search the tenant's instance. Search is isolated to their instance.
		if (url.pathname === "/search") {
			const query = url.searchParams.get("q");
			if (!query) {
				return new Response("Add a ?q= query parameter", { status: 400 });
			}

			const results = await env.TENANTS.get(`tenant-${tenantId}`).search({
				messages: [{ role: "user", content: query }],
			});
			return Response.json(results);
		}

		// Delete the tenant's instance and all its data.
		if (url.pathname === "/offboard" && request.method === "DELETE") {
			await env.TENANTS.delete(`tenant-${tenantId}`);
			return Response.json({ success: true });
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Corrected from the official docs: the source passes `await file.arrayBuffer()` to `items.upload()`, whose content parameter is documented as `ReadableStream`, `Blob`, or `string` (items-workers-binding.md); the `File` itself is passed, which is a `Blob` and avoids buffering the whole file.
- Adapted from the official docs: the source reads the tenant from the client-supplied `x-tenant-id` header, which lets any caller impersonate any tenant. Production code must derive the tenant from a verified identity (API key as above, a signed JWT, or Cloudflare Access); the key compare is constant-time and a malformed secret fails closed.
- Set the secret with `npx wrangler secret put TENANT_KEYS`; for local development use `.dev.vars` and keep it out of version control.
- Choose instance-per-tenant for strong isolation and runtime tenant churn; choose a shared instance with metadata filtering (and R2 `Include: customers/<tenant>/**` path scoping per instance; R2 object keys do not start with `/`) for many small tenants. The official page also covers the shared-instance and R2 variants; they are not reproduced here (https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/).
- Account limits on instances apply (see limits-pricing.md). Uploads are indexed asynchronously; wait before searching.
- Instance per tenant, namespace-level search over several tenants: see search.md.

## Related

- [Namespaces](./namespaces.md)
- [Namespace methods](./namespace-methods.md)
- [Limits and pricing](./limits-pricing.md)
