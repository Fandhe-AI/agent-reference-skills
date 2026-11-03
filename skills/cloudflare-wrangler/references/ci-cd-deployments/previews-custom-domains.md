---
source: https://developers.cloudflare.com/workers/previews/custom-domains/
---

# Preview Custom Domains

Serve Preview URLs from custom domains and/or `workers.dev`, and protect them with Cloudflare Access.

## Signature / Usage

Preview-only custom domain (then run `npx wrangler deploy`):

```jsonc
{
  "routes": [
    {
      "pattern": "app.example.com",
      "custom_domain": true,
      "previews_enabled": true,
      "enabled": false
    }
  ]
}
```

```toml
[[routes]]
pattern = "app.example.com"
custom_domain = true
previews_enabled = true
enabled = false
```

Enable `workers.dev` Preview URLs:

```jsonc
{
  "preview_urls": true
}
```

```toml
preview_urls = true
```

## Options / Props

| Traffic | `previews_enabled` | `enabled` |
| --- | --- | --- |
| Preview only | `true` | `false` |
| Production and Preview | `true` | Omit or set `true` |

| Host | Preview URL | Unique deployment URL |
| --- | --- | --- |
| Custom domain | `<preview-name>.app.example.com` | `<deployment-id>-<preview-name>.app.example.com` |
| `workers.dev` | `<preview-name>-<worker-name>.<subdomain>.workers.dev` | `<deployment-id>-<worker-name>.<subdomain>.workers.dev` |

## Notes

- Enable at least one host to get a Preview URL. Configure in the system that manages the domain: Wrangler (`npx wrangler deploy`), Dashboard, or Terraform.
- Dashboard: **Domains** tab > **Custom Domains and Routes** > **+ Add Domain** > **Enable for** *Preview* or *Production and Preview*; `workers.dev`: **Worker URL** > turn on **Preview**.
- DNS/certificates: Cloudflare creates a wildcard DNS record and SSL certificate (e.g. `*.app.example.com`); issuance can take time after the first Preview. Use a dedicated hostname such as `previews.example.com` if production already has subdomains. Deeper hostnames (`app.preview.example.com` -> `<preview-name>.app.preview.example.com`) may need Advanced Certificate Manager with Total TLS.
- `preview_urls` omitted: Wrangler leaves the existing setting; if none exists its initial value depends on `workers_dev`. Production and Preview `workers.dev` URLs are configured separately.
- Protect with Cloudflare Access. To keep public but discourage indexing add `X-Robots-Tag: noindex` (automatic on `workers.dev` Preview URLs, not on custom domains); for static assets use a `_headers` file, otherwise add it in Worker code.

## Related

- [previews-overview.md](./previews-overview.md)
- [routes.md](../configuration/routes.md)
