---
source: https://developers.cloudflare.com/pages/configuration/custom-domains/
---

# Custom domains

Attach custom apex domains and subdomains to a Pages project, remove them, and handle known issues.

## Signature / Usage

Add through the dashboard: **Workers & Pages** > Pages project > **Custom domains** > **Set up a domain**. For a subdomain on an external DNS provider, add a CNAME record to your `*.pages.dev` hostname (after associating the domain in the dashboard):

| Type | Name | Content |
| --- | --- | --- |
| `CNAME` | `shop.example.com` | `<YOUR_SITE>.pages.dev` |

CAA records that allow the certificate authorities Cloudflare uses:

```plaintext
example.com.            300     IN      CAA     0 issue "letsencrypt.org"
example.com.            300     IN      CAA     0 issue "pki.goog; cansignhttpexchanges=yes"
example.com.            300     IN      CAA     0 issue "ssl.com"
example.com.            300     IN      CAA     0 issuewild "letsencrypt.org"
example.com.            300     IN      CAA     0 issuewild "pki.goog; cansignhttpexchanges=yes"
example.com.            300     IN      CAA     0 issuewild "ssl.com"
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Apex domain (`example.com`) | domain | — | Requires the domain to be a zone on the same Cloudflare account and nameservers pointed to Cloudflare; Cloudflare then creates the CNAME. |
| Subdomain (`shop.example.com`) | domain | — | The zone need not be on Cloudflare; add a CNAME to `<YOUR_SITE>.pages.dev`. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). The migration guide there notes Workers does not support domains whose nameservers are not managed by Cloudflare, which Pages supports for subdomains.
- Adding a CNAME manually without first associating the domain in the Pages dashboard makes the domain fail to resolve with a 522 error.
- Enterprise zones: release any zone hold before adding the custom domain.
- Delete a custom domain: delete the project's CNAME record under **DNS Records**, then in the Pages project > **Custom domains** > three dot icon > **Remove domain**. The project is then reachable only on `*.pages.dev`.
- Disable access to `*.pages.dev`: protect previews with Cloudflare Access (see Preview deployments) and redirect the production `*.pages.dev` URL to the custom domain with an account-level Bulk Redirect.
- Zone settings: when a proxied CNAME record points the custom domain to Pages, requests pass through your zone first, so your WAF, Redirect Rules, Transform Rules, Cache Rules and Bot Management settings apply per your plan. A block, redirect or cached response in the zone can end a request before it reaches Pages. With a DNS-only record or an external DNS provider, requests do not pass through your zone's HTTP settings, but Pages-managed settings still apply.
- Settings managed by Pages rather than your zone: minimum TLS version and cipher suites (your zone's settings do not apply and cannot be customized for Pages hostnames); Browser Integrity Check (Pages can block a request even when the check is off or skipped in your zone, see the Known issues page); Early Hints (enabled by Pages independently of your zone's setting, see the Early Hints page).
- Source: https://developers.cloudflare.com/pages/configuration/custom-domains/ (fetched 2026-11-14, cloudflare-docs 34d908a)
- Caching: see Serving Pages (Caching and performance).
- Known issues: CAA records that do not permit Cloudflare block certificate issuance. If you point the DNS entry elsewhere (for example your origin) the custom domain becomes inactive and visitors see errors after pointing it back until it reactivates; use an Origin rule or a redirect rule to divert traffic temporarily.

## Related

- [Serving Pages](./serving-pages.md)
- [Preview deployments](./preview-deployments.md)
- [Debugging Pages](./debugging-pages.md)
