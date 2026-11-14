---
source: https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/
---

# Version Affinity

Keep requests with the same key on one Worker version during a gradual deployment, while the deployment configuration stays the same, using the `Cloudflare-Workers-Version-Key` header.

## Signature / Usage

```sh
curl -s https://example.com -H 'Cloudflare-Workers-Version-Key: foo'
```

While the deployment configuration stays the same, all requests with the same key are handled by the same version. The platform hashes the key and applies the percentages; you do not choose the mapping. Users on the old version progressively move to the new one as the percentage increases and do not flip back unless you roll back. Changing the deployment can move a browser's requests to another version. The header can be set on external requests and on service binding subrequests, and must be set before Cloudflare selects a Worker version; setting it inside that Worker's handler cannot change the version handling that request.

Set a cookie in a redirect before serving HTML (anonymous users). A new visitor's first request has no cookie, so Cloudflare selects a version randomly; serving HTML and setting a random key in that response can cause a mismatch with the page's assets. For an application that requires cookies, set the cookie in a redirect response before serving HTML. This example serves HTML at `/`; adapt it to the routes that serve your application's HTML. Add the redirect logic to both versions in the deployment, and configure these page routes to run your Worker first, otherwise matching static assets bypass its code:

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"assets": {
		"directory": "./dist",
		"binding": "ASSETS",
		"run_worker_first": ["/"]
	}
}
```

```ts
export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const cookieHeader = request.headers.get("Cookie") ?? "";
		const hasAffinityCookie = /(?:^|;\s*)version-key=[^;]+/.test(cookieHeader);

		if (
			url.pathname === "/" &&
			request.method === "GET" &&
			!hasAffinityCookie
		) {
			return new Response(null, {
				status: 303,
				headers: {
					Location: request.url,
					"Set-Cookie": `version-key=${crypto.randomUUID()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`,
					"Cache-Control": "no-store",
				},
			});
		}

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<{ ASSETS: Fetcher }>;
```

## Options / Props

Transform Rule (Modify request header, *Set dynamic*, header name `Cloudflare-Workers-Version-Key`) by application type:

| Application | Expression Editor | Value |
| --- | --- | --- |
| Authenticated | `http.cookie contains "user_id"` | `http.request.cookies["user_id"][0]` |
| Sessions | `http.cookie contains "session_id"` | `http.request.cookies["session_id"][0]` |
| Anonymous (client IP) | `true` | `ip.src` |
| Anonymous (cookie set by the Worker redirect) | `http.cookie contains "version-key"` | `http.request.cookies["version-key"][0]` |

## Notes

- Matters most for static assets with content-hashed filenames: without affinity HTML from version A may request an asset only version B serves (404). Affinity keeps related requests on one version only when they carry the same key and use the same deployment configuration; version skew can still happen while a deployment change spreads across the network, and changing traffic percentages or removing a version can leave older pages requesting missing assets (see `versions-version-skew.md`).
- Transform Rules need a Worker on a route on a zone you control; not available on `*.workers.dev` (set the header from the client or an upstream Worker via a service binding).
- Client IP grouping: users behind the same NAT/VPN are grouped; mobile users switching networks may change version. The first request of a new cookie user is randomly assigned, which is why the cookie example above sets it in a redirect before serving HTML. The cookie approach requires the browser to accept cookies; handle visitors who block cookies to avoid a redirect loop.
- Apply the version-key rule to every hostname serving related requests. The example cookie has no `Domain` attribute, so the browser only sends it to the hostname that set it; requests to asset subdomains also need to carry the same key.
- Source: https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)
- Test by sending repeated requests with the same key; include the version ID in responses via the Version metadata binding; monitor 404 rates for `.js`, `.css`, `.png` using Analytics Engine or Logpush.

## Related

- [versions-gradual-deployments.md](./versions-gradual-deployments.md)
- [versions-version-overrides.md](./versions-version-overrides.md)
- [versions-version-skew.md](./versions-version-skew.md)
