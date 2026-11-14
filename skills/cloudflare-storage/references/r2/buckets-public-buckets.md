---
source: https://developers.cloudflare.com/r2/buckets/public-buckets/
---

# Public buckets

Expose R2 bucket contents to the Internet via a custom domain or a Cloudflare-managed `r2.dev` subdomain. Buckets are never public by default.

## Signature / Usage

Custom domain (dashboard): bucket **Settings** > **Custom Domains** > **Add** > enter domain > **Continue** > review DNS record > **Connect Domain**.

Custom domain TLS settings are edited via the R2 custom domain settings API with the optional `minTLS` and `ciphers` parameters in the request body.

```txt
Public development URL (non-production): bucket Settings > Public Development URL > Enable > type "allow"
```

## Notes

- Custom domain: use Cloudflare Cache (Smart Tiered Cache recommended); by default only certain file types are cached, so set a Cache Everything page rule to cache all files. WAF custom rules, caching, access controls, and Bot Management require a custom domain and are not available on `r2.dev`.
- Access control for custom domains: Cloudflare Zero Trust Access and WAF Token Authentication. Disable the `r2.dev` public access when using WAF or Access, otherwise the bucket stays public via `r2.dev`.
- The domain must be a zone in the same account as the bucket. Non-Cloudflare domains need a partial (CNAME) setup. Enterprise zones: release the zone hold before adding the custom domain.
- Status goes from **Initializing** to **Active** in a few minutes; use **Retry connection** if stuck.
- **Disable domain** turns off access via that domain but keeps it connected; **Remove domain** disconnects it and removes the CNAME record.
- `r2.dev` is rate-limited and for development only. Do not CNAME to the `r2.dev` subdomain (unsupported access path). Disable with **Public Development URL** > **Disable** > type `disallow`.
- Public buckets do not list bucket contents at the root of the (sub)domain.
- To test public object access on your machine, use the local public bucket endpoint (`/cdn-cgi/local/r2/public/<BUCKET_ID>/<KEY>`, see `local-development.md`). It does not require enabling public access on a deployed bucket.
- Source: https://developers.cloudflare.com/r2/buckets/public-buckets/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Local development](./local-development.md)
- [CORS](./buckets-cors.md)
- [Create new buckets](./buckets-create.md)
- [Data Access Logs](./buckets-data-access-logs.md)
