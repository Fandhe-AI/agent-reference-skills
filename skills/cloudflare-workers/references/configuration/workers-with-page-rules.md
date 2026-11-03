---
source: https://developers.cloudflare.com/workers/configuration/workers-with-page-rules/
---

# Page Rules

Page Rules trigger actions when a request matches a URL pattern. This page describes how Page Rules interact with Workers: when a request matches a Worker route, Cloudflare disables the default setting of a number of features, including some set by Page Rules.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/configuration/routing/routes/#set-up-a-route-in-the-wrangler-configuration-file (a Worker route is what triggers the behavior below).

```jsonc
{
	"routes": [
		{
			"pattern": "subdomain.example.com/*",
			"zone_name": "example.com"
		}
	]
}
```

## Options / Props

Behavior of affected Page Rules by request stage. "Same Zone" is a Worker subrequest to an orange-clouded hostname in the same zone; other requests may count as "Other Zone".

| Page Rule | Client to Worker | Worker to Same Zone | Worker to Other Zone |
| --- | --- | --- | --- |
| Always Use HTTPS | Respected | Ignored | Ignored |
| Automatic HTTPS Rewrites | Ignored | Respected | Ignored |
| Browser Cache TTL | Ignored | Respected | Ignored |
| Browser Integrity Check | Respected | Ignored | Ignored |
| Cache Deception Armor | Respected | Respected | Ignored |
| Cache Level | Respected | Respected | Ignored |
| Disable Zaraz | Respected | Respected | Ignored |
| Edge Cache TTL | Respected | Respected | Ignored |
| Email Obfuscation | Ignored | Respected | Ignored |
| Forwarding URL | Ignored | Respected | Ignored |
| IP Geolocation Header | Respected | Respected | Ignored |
| Origin Cache Control | Respected | Respected | Ignored |
| Rocket Loader | Ignored | Ignored | Ignored |
| Security Level | Respected | Ignored | Ignored |
| SSL | Respected | Respected | Ignored |

Also listed as affected, without per-stage tables: Always Online, Disable Apps, Host Header Override.

## Notes

- Workflow with Page Rules: (1) request arrives at a Cloudflare data center; (2) Cloudflare decides it is a Worker route and evaluates and disables a number of features, including some that Page Rules would set; (3) Page Rules run as part of normal request processing with those features disabled; (4) the Worker executes; (5) the Worker makes a same-zone or other-zone subrequest, where Cloudflare again disables a number of features. Page Rules are evaluated at both the client-to-Worker stage (step 2) and the Worker subrequest stage (step 5).
- The default setting of the affected Page Rules is disabled when Cloudflare recognizes that the request is headed to a Worker. Details are updated following testing because of ongoing runtime changes.
- For Page Rule errors when running Workers, contact the Cloudflare account team or Cloudflare Support.
- The source text of step 2 contains a typo ("evaluates and disabled"); it is read here as "evaluates and disables".

## Related

- [Routes](./routes.md)
- [Routes and domains](./routing-overview.md)
