---
source: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
---

# workers.dev

Every Workers account has a `workers.dev` subdomain. Each Worker gets a route `<YOUR_WORKER_NAME>.<YOUR_SUBDOMAIN>.workers.dev` when created or renamed, so Workers can be deployed without onboarding a custom domain.

## Signature / Usage

```jsonc
{
	"workers_dev": false
}
```

```toml
workers_dev = false
```

Configuration file keys: see the cloudflare-wrangler skill.

## Notes

- Not for production: `workers.dev` is treated as a Free website for personal or hobby projects. Use a Workers route or Custom Domain for production.
- Subdomain format: `<YOUR_ACCOUNT_SUBDOMAIN>.workers.dev`; change it in the dashboard (Workers & Pages > Change next to Your subdomain). The Worker `name` is used as the subdomain label.
- When enabled the URL is public. Cloudflare Access can require authentication for Version URLs, Preview URLs, and Deployment URLs (production `workers.dev`, previews, or both; or all Workers or previews in the account). Read the signed-in user with `ctx.access`, the validated JWT, or `/cdn-cgi/access/get-identity`.
- Disable in the dashboard: Worker > Settings > Domains & Routes > `workers.dev` > Disable. Via Wrangler set `workers_dev = false` and redeploy. Disabling does not disable Version URLs, Preview URLs, or Deployment URLs.
- If `workers_dev` is not specified but a `routes` component is added to the Wrangler configuration, `workers_dev` is inferred as `false` on the next deploy.
- If you disable `workers.dev` in the dashboard but do not set `workers_dev = false` in the Wrangler file, the route is re-enabled on the next Wrangler deploy.
- Limitations when `workers.dev` is enabled: the Worker name must be 63 characters or less, contain only alphanumerics (`a-z`, `A-Z`, `0-9`) and dashes, and not start or end with a dash (the name is used as a DNS label). Without `workers.dev`, names can be up to 255 characters; disable it and use routes or Custom Domains for longer names.

### Browser Integrity Check on `workers.dev`

- All requests to a `workers.dev` hostname are evaluated by Browser Integrity Check (BIC) on the Cloudflare-managed `workers.dev` zone, including Preview URLs and Version URLs. You cannot turn off this check for a `workers.dev` hostname, and turning off BIC or adding a skip rule in your own zone does not affect it.
- Automated clients that send some default library `User-Agent` headers (for example, the default Python `urllib` user agent) receive error 1010 before your Worker runs; these requests do not appear in your Worker logs.
- Recommended fix: configure the client to send a descriptive `User-Agent` header that identifies your application (it does not need to be a browser user agent). Alternatively, serve the Worker on a Custom Domain or route in a zone you own and turn off or skip BIC for only the paths that need it, with a configuration rule or custom rule.

```python
import urllib.request

req = urllib.request.Request(
    "https://example.com/data.json",
    headers={"User-Agent": "my-app/1.0 (+https://example.com)"},
)
urllib.request.urlopen(req)
```

- Source: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Routes and domains](./routing-overview.md)
- [Routes](./routes.md)
- [Custom Domains](./custom-domains.md)
- [Cloudflare Access](./cloudflare-access.md)
