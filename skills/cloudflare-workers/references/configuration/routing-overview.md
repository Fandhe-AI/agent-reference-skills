---
source: https://developers.cloudflare.com/workers/configuration/routing/
---

# Routes and domains

To receive inbound HTTP requests, a Worker must be connected to an external endpoint. There are three types: Custom Domains, Routes, and `workers.dev`.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#set-up-a-custom-domain-in-your-wrangler-configuration-file.

```jsonc
{
	"routes": [
		{
			"pattern": "shop.example.com",
			"custom_domain": true
		}
	]
}
```

```toml
[[routes]]
pattern = "shop.example.com"
custom_domain = true
```

Configuration file keys: see the cloudflare-wrangler skill.

## Options / Props

| Type | Use when | Same-zone `fetch()` target |
| --- | --- | --- |
| Custom Domains | The Worker is the origin for a domain or subdomain (such as `example.com` or `shop.example.com`) in a Cloudflare zone. | Yes |
| Routes | The application's origin server is external to Cloudflare, behind a Worker that can communicate with it. | No |
| `workers.dev` | Created automatically for each Worker for quick starts; personal or hobby projects. | No (a service binding is required between Workers on routes or `workers.dev` in the same zone) |

## Notes

- Run production Workers on a Workers route or Custom Domain rather than `workers.dev`; `workers.dev` is treated as a Free website for personal or hobby projects that are not business-critical.
- Custom Domains can be invoked within the same zone via `fetch()`, unlike Routes.
- Routes cannot be the target of a same-zone `fetch()` call.
- A `workers.dev` route can be disabled.

## Related

- [Routes](./routes.md)
- [Custom Domains](./custom-domains.md)
- [workers.dev](./workers-dev.md)
- [Cloudflare Access](./cloudflare-access.md)
- [Page Rules](./workers-with-page-rules.md)
