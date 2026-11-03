---
source: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
---

# Custom Domains

Custom Domains connect a Worker to a domain or subdomain without DNS changes or certificate management. Cloudflare creates DNS records pointing directly at the Worker and issues certificates. Unlike Routes, a Custom Domain sends all paths of the hostname to the Worker.

## Signature / Usage

```jsonc
{
	"routes": [
		{
			"pattern": "shop.example.com",
			"custom_domain": true
		},
		{
			"pattern": "shop-two.example.com",
			"custom_domain": true
		}
	]
}
```

```toml
[[routes]]
pattern = "shop.example.com"
custom_domain = true

[[routes]]
pattern = "shop-two.example.com"
custom_domain = true
```

Configuration file keys: see the cloudflare-wrangler skill.

## Notes

- Requirements: an active Cloudflare zone and a Worker. Attach via the dashboard (Worker > Settings > Domains & Routes > Add > Custom Domain), Wrangler (`custom_domain: true` on each pattern under `routes`), or the API. You cannot create a Custom Domain on a hostname with an existing CNAME DNS record or on a zone you do not own.
- Custom Domains are the Worker acting as the origin. Use `fetch()` with a `Request` for external dependencies. They can stack: Worker A on `app.example.com` can `fetch()` `api.example.com` served by Worker B.
- Same-zone Worker-to-Worker: for a Worker on a route or a `workers.dev` subdomain the only way to call it from another Worker in the same zone is a service binding. A same-zone `fetch()` to a Worker on a Custom Domain succeeds without a service binding (for example `fetch("https://shop.example.com")` fails from `worker-a` if `worker-b` is on the route `shop.example.com/*`, but works if `worker-b` is on the Custom Domain).
- Matching: wildcard DNS records are not supported. A request must exactly match the registered domain or subdomain; path and query are ignored (`api.example.com/login` and `api.example.com/user` invoke the same Worker).
- Interaction with Routes: a Worker on a Custom Domain is treated as an origin. A Worker on a route in front of it (for example route `api.example.com/auth` to `auth-worker`, Custom Domain `api.example.com` to `api-worker`) can invoke it with `fetch(request)`:

```js
export default {
	fetch(request) {
		const url = new URL(request.url);
		if (url.searchParams.get("auth") !== "SECRET_TOKEN") {
			return new Response(null, { status: 401 });
		} else {
			// This will invoke `api-worker`
			return fetch(request);
		}
	},
};
```

- The `SECRET_TOKEN` literal compared against a query parameter in the example above is a placeholder from the official docs. In real code, keep the expected value in a secret binding and have clients send it in a request header (or use Cloudflare Access), not a literal in code or a URL query string.
- Certificates: creating a Custom Domain also generates an Advanced Certificate for the hostname on the target zone, including multi-level subdomains such as `realms.app.example.com` (Universal SSL covers only the apex and one subdomain level; no separate Advanced Certificate Manager subscription is needed). To override the default settings delete the generated certificate and create your own. Deleting a Custom Domain does not delete its Advanced Certificate; remove it under SSL/TLS > Edge Certificates or via the API.
- Require sign-in for a Custom Domain with Cloudflare Access (hostname-based Access, or Access on the Worker itself).
- www and root: a Custom Domain needs an exact hostname, so a Worker on `example.com` does not receive `www.example.com` (and vice versa). Use a redirect rule (www to root, or root to www) plus a proxied DNS record for the hostname being redirected from: an `A` record to `192.0.2.0` or an `AAAA` record to `100::` (reserved placeholder addresses for originless setups; requests never reach them).
- Migrate from a Route `example.com/*` with a CNAME to `100::`: delete the CNAME record, add the Custom Domain (dashboard: Worker > Settings > Domains & Routes > Add > Custom domain), then delete the route. With Wrangler, delete the CNAME record, add the following, and run `npx wrangler deploy`:

```jsonc
{
  "routes": [
    {
      "pattern": "example.com",
      "custom_domain": true
    }
  ]
}
```

## Related

- [Routes and domains](./routing-overview.md)
- [Routes](./routes.md)
- [workers.dev](./workers-dev.md)
- [Cloudflare Access](./cloudflare-access.md)
- [Service bindings](../bindings-rpc/README.md)
