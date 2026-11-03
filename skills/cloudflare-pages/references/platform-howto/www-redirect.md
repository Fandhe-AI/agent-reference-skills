---
source: https://developers.cloudflare.com/pages/how-to/www-redirect/
---

# Redirecting www to domain apex

Redirect `www.example.com` to the apex domain with a Bulk Redirect and a proxied DNS record.

## Signature / Usage

Bulk redirect list row and the DNS record for `www`:

```txt
Source URL: www.example.com
Target URL: https://example.com
Status: 301
Parameters: Preserve query string, Subpath matching, Preserve path suffix, Include subdomains

DNS record: Type A, Name www, IPv4 address 192.0.2.1, Proxy status Proxied
```

Verify after propagation:

```sh
curl --head -i https://www.example.com/
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Source URL | string | — | `www.example.com`. |
| Target URL | string | — | `https://example.com`. |
| Status | number | — | `301`. |
| DNS record `A` `www` | record | — | IPv4 `192.0.2.1`, proxied. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Assumes a custom domain is already attached to the Pages project.
- Steps: **Bulk Redirects** page > create list > create rule; then **DNS** > create the `www` record. Inspect the `location` header and status code of the curl output.
- `192.0.2.1` is a placeholder address; the record must be proxied so the redirect runs at Cloudflare.

## Related

- [Redirect *.pages.dev to a custom domain](./redirect-to-custom-domain.md)
- [Custom domains](../configuration/custom-domains.md)
- [Redirects](../configuration/redirects.md)
