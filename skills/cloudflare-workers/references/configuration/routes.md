---
source: https://developers.cloudflare.com/workers/configuration/routing/routes/
---

# Routes

Routes map a URL pattern to a Worker within a Cloudflare zone. When a request matching the pattern arrives, the Worker executes; calling `fetch()` on the incoming `Request` triggers a subrequest to the application server defined in the zone's DNS settings.

## Signature / Usage

```jsonc
{
	"routes": [
		{
			"pattern": "subdomain.example.com/*",
			"zone_name": "example.com"
		},
		// or
		{
			"pattern": "subdomain.example.com/*",
			"zone_id": "<YOUR_ZONE_ID>"
		}
	]
}
```

```toml
[[routes]]
pattern = "subdomain.example.com/*"
zone_name = "example.com"

[[routes]]
pattern = "subdomain.example.com/*"
zone_id = "<YOUR_ZONE_ID>"
```

Add `zone_name` or `zone_id` after each route (interchangeable). Find the zone ID on the zone Overview page in the dashboard. Multiple routes are listed in the `routes` array. Configuration file keys: see the cloudflare-wrangler skill.

## Options / Props

Route pattern examples and matching:

| Pattern | Matches |
| --- | --- |
| `https://*.example.com/images/*` | All HTTPS requests to a subhost of example.com with paths prefixed by `/images/` |
| `*example.com/*` | All requests (host and all subhosts, and any host ending in `example.com`) |
| `https://*.example.com/` | `https://www.example.com/` but not `http://www.example.com/` |
| `*.example.com/` | Both `https://www.example.com/` and `http://www.example.com/` |
| `*example.com/` | `https://example.com/` and `https://www.example.com/` |
| `*.example.com/` (hostname starting `*.`) | Subhosts only, not `https://example.com/` |
| `https://example.com/path*` | `https://example.com/path`, `/path2`, and `/path/readme.txt` |

Wildcard comparison:

| Request URL | `*example.com/*` | `*.example.com/*` |
| --- | --- | --- |
| `https://example.com/` | Matches | Does not match |
| `https://www.example.com/path` | Matches | Matches |
| `https://myexample.com/` | Matches | Does not match |
| `https://not-example.com/` | Matches | Does not match |

| Request URL | `*sub.example.com/*` | `*.sub.example.com/*` |
| --- | --- | --- |
| `https://sub.example.com/` | Matches | Does not match |
| `https://foo.sub.example.com/path` | Matches | Matches |
| `https://notsub.example.com/` | Matches | Does not match |

## Notes

- Prerequisites: an active Cloudflare zone, a Worker to invoke, and a proxied (orange-clouded) DNS record for the domain or subdomain. Without a DNS record the request fails with `ERR_NAME_NOT_RESOLVED`. If the Worker is the application's origin, use Custom Domains instead.
- Dashboard: Worker > Settings > Domains & Routes > Add > Route. Routes can also be created via the Workers Routes API.
- Routes can `fetch()` Custom Domains and take precedence if configured on the same hostname (for example a logging Worker on route `app.example.com/*` in front of an application Worker on a Custom Domain `app.example.com`). Routes cannot be the target of a same-zone `fetch()`.
- Matching rules: the only operator is the wildcard `*` (zero or more of any character). No infix wildcards or query parameters in patterns (`example.com/*.jpg` and `example.com/?foo=*` are invalid). The most specific matching pattern wins (`www.example.com/*` over `*.example.com/*`; `example.com/hello/*` over `example.com/*`). Matching considers the whole URL including the query string, so match URLs with query parameters by ending the pattern with `*`.
- The path component is case sensitive. The host component is not case sensitive for routes created on or after October 15th, 2023 (case sensitive before that).
- A route can be specified without a Worker; it negates less specific patterns. With `*example.com/images/cat.png -> <no script>` and `*example.com/images/* -> worker-script`, `/images/cat.png` bypasses Workers, while `/images/cat.png?foo=bar` goes to `worker-script` because of the query string.
- Validity: patterns must include the zone (simplest is `example.com`, matching `http://example.com/` and `https://example.com/`, implied path `/`); may not contain query parameters; may optionally begin with `http://` or `https://` (omitted scheme matches both); hostnames may begin with `*` (host and all subhosts) or `*.` (subhosts only); paths may end with `*`.
- Because `*` matches any characters, `*example.com` matches `myexample.com` and `not-example.com` too. To match only `example.com` and its subdomains use two routes: `example.com/*` and `*.example.com/*`.
- Workers routes are evaluated within the zone where they are created; unrelated domains do not use that zone's routes in ordinary zone routing (the table rows illustrate string matching only). Cloudflare for SaaS custom hostnames can send traffic through the provider's zone, where its Workers routes are evaluated.
- A well-known bug concerns wildcards (`*`) and forward slashes (`/`) in path matching; see Known issues in the Workers platform docs.
- If an `AAAA` record for the name was previously added pointing to `100::`, Cloudflare recommends creating a Custom Domain instead.

## Related

- [Routes and domains](./routing-overview.md)
- [Custom Domains](./custom-domains.md)
- [workers.dev](./workers-dev.md)
- [Page Rules](./workers-with-page-rules.md)
