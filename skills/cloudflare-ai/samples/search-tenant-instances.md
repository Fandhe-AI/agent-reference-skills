---
source: https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/
---

# Multitenancy: one AI Search instance per tenant

Create, populate, search, and delete an isolated instance per tenant with the namespace binding (the approach the page recommends).

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

`src/index.ts` (the `TENANT_TOKENS` secret is JSON such as `{"acme":"<random-token>"}`):

Adapted (not in the official docs): the official Worker trusts an `x-tenant-id` request header, so any caller could read, write, or delete any tenant. This version maps a per-tenant bearer token to the tenant, fails closed, validates the tenant ID so `tenant-<id>` is a valid instance ID, and validates the upload (byte cap before buffering, `File` check); the `File` (a `Blob`) is passed to `items.upload()` instead of an `ArrayBuffer`. See Notes.

```ts
export type Env = {
	TENANTS: AiSearchNamespace;
	TENANT_TOKENS?: string;
};

// Example cap only; AI Search accepts 4-10 MiB per file depending on the format.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

// Lowercase letters, digits and single hyphens, at most 25 chars, so that
// "tenant-<id>" is a valid instance ID and "tenant-<id>-bucket" a valid R2 bucket name.
const TENANT_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
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
		const url = new URL(request.url);

		// Identify the tenant from a verified token, not a client-chosen header.
		const tenantId = resolveTenant(request, env);
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
			// Reject oversized bodies (in bytes) before buffering them. The
			// multipart body is slightly larger than the file, so allow 64 KiB of overhead.
			const length = Number(request.headers.get("content-length"));
			if (
				!Number.isFinite(length) ||
				length <= 0 ||
				length > MAX_UPLOAD_BYTES + 64 * 1024
			) {
				return new Response("Content-Length required; file too large", {
					status: 413,
				});
			}
			let formData: FormData;
			try {
				formData = await request.formData();
			} catch {
				return new Response("Expected multipart/form-data", { status: 400 });
			}
			const file = formData.get("file");
			if (!(file instanceof File)) {
				return new Response("Missing file field", { status: 400 });
			}
			if (file.size > MAX_UPLOAD_BYTES) {
				return new Response("File too large", { status: 413 });
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

R2-backed instances (change the `/onboard` route). One bucket per tenant:

```ts
const instance = await env.TENANTS.create({
	id: `tenant-${tenantId}`,
	type: "r2",
	source: `tenant-${tenantId}-bucket`,
});
```

A shared bucket organized by folder, scoped with path filtering:

```ts
const instance = await env.TENANTS.create({
	id: `tenant-${tenantId}`,
	type: "r2",
	source: "my-bucket",
	source_params: {
		include_items: [`/customers/${tenantId}/**`],
	},
});
```

Secrets set with `npx wrangler secret put TENANT_TOKENS` apply to the deployed Worker only. For `wrangler dev`, put `TENANT_TOKENS='{"acme":"<ACME_TOKEN>"}'` in a `.dev.vars` file in the project root (gitignored), then start a local development server:

```sh
npx wrangler dev
```

In another terminal, onboard, upload, search, and offboard a tenant:

Adapted (not in the official docs): each request sends the tenant's bearer token instead of an `x-tenant-id` header. See Notes.

```sh
curl -X POST http://localhost:8787/onboard -H "Authorization: Bearer <ACME_TOKEN>"
curl -X POST http://localhost:8787/upload -H "Authorization: Bearer <ACME_TOKEN>" -F "file=@./handbook.pdf"
curl "http://localhost:8787/search?q=vacation+policy" -H "Authorization: Bearer <ACME_TOKEN>"
curl -X DELETE http://localhost:8787/offboard -H "Authorization: Bearer <ACME_TOKEN>"
```

## Notes

- Corrected from the official docs: `items.upload()` takes `ReadableStream`, `Blob`, or `string` content; the source passed `await file.arrayBuffer()`, so the `File` is passed directly.
- Adapted from the official docs: token-derived tenant identity instead of `x-tenant-id`, a tenant ID pattern that keeps `tenant-<id>` within the instance ID pattern (`^[a-z0-9_]+(?:-[a-z0-9_]+)*$`, 32 characters in the `@cloudflare/workers-types` JSDoc) and `tenant-<id>-bucket` within R2 bucket naming, a `Content-Length` cap before buffering the upload plus a `file.size` check, `try`/`catch` around `formData()`, a `File` check, and a required `q`. `MAX_UPLOAD_BYTES` is an example value; the AI Search limits page sets 4 MiB for PDFs without OCR and most formats and 10 MiB for plain text, code, and PDFs with OCR. In production consider restricting `/onboard` and `/offboard` to an operator credential rather than the tenant's own token.
- Uploads are indexed asynchronously; wait before searching.
- Creating an `r2`-backed instance from a binding requires the service API token, which Cloudflare registers the first time you create an R2-backed instance via the dashboard or Wrangler. Deleting an instance removes its index but leaves R2 objects.
- AI Search limits instances per account; the page points to a limit increase request form for more tenants.
- Store the secret with `npx wrangler secret put TENANT_TOKENS`; `.dev.vars` stays out of git.

## Related

- [Namespaces](../references/ai-search/namespaces.md)
- [Namespace methods](../references/ai-search/namespace-methods.md)
- [Shared instance with metadata filtering](./search-tenant-filtering.md)
