---
source: https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/
---

# Version Affinity

Deterministically route a user to the same Worker version during a gradual deployment using the `Cloudflare-Workers-Version-Key` header.

## Signature / Usage

```sh
curl -s https://example.com -H 'Cloudflare-Workers-Version-Key: foo'
```

For a deployment, all requests with the same key are handled by the same version. The platform hashes the key and applies the percentages; you do not choose the mapping. Users on the old version progressively move to the new one as the percentage increases and do not flip back unless you roll back. The header can be set on external requests and on service binding subrequests.

Set a long-lived cookie from the Worker (anonymous users):

```js
export default {
	async fetch(request, env) {
		const response = await handleRequest(request, env);

		// Set a long-lived cookie to use as a version affinity key.
		const COOKIE_NAME = "version-key"; // can be any name
		const cookieHeader = request.headers.get("Cookie") ?? "";
		const hasAffinityCookie = new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=`).test(
			cookieHeader,
		);

		if (!hasAffinityCookie) {
			const id = crypto.randomUUID();
			response.headers.append(
				"Set-Cookie",
				`${COOKIE_NAME}=${id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`,
			);
		}

		return response;
	},
};
```

## Options / Props

Transform Rule (Modify request header, *Set dynamic*, header name `Cloudflare-Workers-Version-Key`) by application type:

| Application | Expression Editor | Value |
| --- | --- | --- |
| Authenticated | `http.cookie contains "user_id"` | `http.request.cookies["user_id"][0]` |
| Sessions | `http.cookie contains "session_id"` | `http.request.cookies["session_id"][0]` |
| Anonymous (client IP) | `true` | `ip.src` |
| Anonymous (Worker-set cookie) | `http.cookie contains "version-key"` | `http.request.cookies["version-key"][0]` |

## Notes

- Matters most for static assets with content-hashed filenames: without affinity HTML from version A may request an asset only version B serves (404).
- Transform Rules need a Worker on a route on a zone you control; not available on `*.workers.dev` (set the header from the client or an upstream Worker via a service binding).
- Client IP grouping: users behind the same NAT/VPN are grouped; mobile users switching networks may change version. The first request of a new cookie user is randomly assigned.
- Test by sending repeated requests with the same key; include the version ID in responses via the Version metadata binding; monitor 404 rates for `.js`, `.css`, `.png` using Analytics Engine or Logpush.

## Related

- [versions-gradual-deployments.md](./versions-gradual-deployments.md)
- [versions-version-overrides.md](./versions-version-overrides.md)
