---
source: https://developers.cloudflare.com/sandbox/previews/serve-previews-on-their-own-hostnames/
---

# Serve previews on their own hostnames

Serve each sandbox preview from its own hostname such as `ada.example-previews.com`. Each hostname is a separate origin, so code in one preview cannot read your application pages or another preview's storage, and paths reach the server unchanged (no base path needed).

## Signature / Usage

Add a proxied wildcard DNS record on the preview domain (for example `AAAA` named `*` with content `100::`, proxy status Proxied); the Worker route handles the requests, so Cloudflare never contacts that address. Then in `wrangler.jsonc`:

```jsonc
{
	"vars": {
		"PREVIEW_DOMAIN": "example-previews.com",
	},
	"routes": [
		{
			"pattern": "*.example-previews.com/*",
			"zone_name": "example-previews.com",
		},
	],
	"workers_dev": true,
}
```

Run `npx wrangler types`, then route hostnames in the Worker:

Adapted (not in the official docs): the forwarded request drops the visitor's `Cookie`, `Authorization` and `Proxy-Authorization` headers so credentials never reach code in the sandbox; see Notes.

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const suffix = `.${env.PREVIEW_DOMAIN}`;

		// A preview hostname reaches only the sandbox with the same name.
		if (url.hostname.endsWith(suffix)) {
			const name = url.hostname.slice(0, -suffix.length);

			// Accept only sandbox names that are valid DNS labels
			if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(name)) {
				return new Response("Not found", { status: 404 });
			}

			// Forward with the `http:` scheme, because `getTcpPort().fetch()`
			// does not accept `https:` URLs
			url.protocol = "http:";
			const forwarded = new Request(url, request);
			// Authenticate the visitor first (if required), then strip credentials
			// so the untrusted preview server never receives them.
			forwarded.headers.delete("Cookie");
			forwarded.headers.delete("Authorization");
			forwarded.headers.delete("Proxy-Authorization");
			return env.MY_CONTAINER.getByName(name).fetch(forwarded);
		}

		// Other hostnames manage previews.
		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

Under a subdomain of a domain you already use (record `*.previews` instead of `*`):

```jsonc
{
	"vars": {
		"PREVIEW_DOMAIN": "previews.example.com",
	},
	"routes": [
		{
			"pattern": "*.previews.example.com/*",
			"zone_name": "example.com",
		},
	],
	"workers_dev": true,
}
```

## Notes

- Adapted from the official docs: the official route forwards `new Request(url, request)`, which copies the visitor's `Cookie` and `Authorization` headers to the preview server. The three `headers.delete()` lines were added so credentials (including those added by an authentication layer, such as an access-gateway token header, which you should delete the same way) are never exposed to untrusted code in the sandbox, matching the preview-a-web-application page.
- Prerequisites: a Durable Object whose `fetch()` forwards to a web server in its container (see the preview-a-web-application page) and a Cloudflare-managed domain your application does not use. `routes` turns off the `workers.dev` URL, so `workers_dev: true` keeps it for requests that manage previews.
- Every request to a preview hostname goes to the preview: keep management routes (such as stopping a preview) on other hostnames so preview code cannot call them from its own origin. Authenticate visitors on the preview hostname and do not send your application session cookie there.
- Universal SSL covers a domain and first-level subdomains only (`ada.example-previews.com`); `ada.previews.example.com` needs Total TLS or an advanced certificate or browsers show certificate errors. A wildcard record named `*.previews` matches only preview hostnames; `*` also matches every other unused subdomain.
- Previews under a domain your application also uses share cookies with it (`Domain=example.com` cookies reach every preview). Code in one preview can set a cookie with `Domain=example-previews.com` that all previews receive: set cookies without a `Domain` attribute and do not trust a cookie because it arrived on a preview hostname.
- Troubleshooting: the container server must speak plain HTTP; Cloudflare handles TLS and the Worker forwards over HTTP, so an HTTPS-only server cannot handle the requests.
- Check isolation: set `localStorage.setItem("name", "ada")` on the `ada` hostname; `localStorage.getItem("name")` on `grace` prints `null`. Example: https://github.com/cloudflare/sandbox-sdk/tree/main/examples/preview-workspace.
- Routes and DNS are covered by the cloudflare-workers and cloudflare-wrangler skills; `getTcpPort()` in the `containers` category of this skill.

## Related

- [Preview a web application](./preview-a-web-application.md)
- [Sandbox security](./sandbox-security.md)
