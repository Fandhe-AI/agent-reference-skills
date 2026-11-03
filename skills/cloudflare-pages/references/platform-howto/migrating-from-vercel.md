---
source: https://developers.cloudflare.com/pages/migrations/migrating-from-vercel/
---

# Migrating from Vercel to Pages

Move a Vercel project to Pages: reuse the build command and output directory, then attach the same custom domain.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/configuration/custom-domains/ (CNAME for a subdomain when DNS is not on Cloudflare):

```txt
| Type | Name | Content |
| --- | --- | --- |
| `CNAME` | `shop.example.com` | `<YOUR_SITE>.pages.dev` |
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-vercel).
- The page says Vercel's serverless functions are not supported on Pages. Server-side code on Pages is done with Pages Functions ([get-started.md](../functions/get-started.md)).
- Find **Build Command** and **Output Directory** in Vercel **Settings** > **General** > **Build & Development settings** (framework defaults may show instead).
- Preferably add the domain to Cloudflare (nameserver change) for apex domain support. In Pages: **Custom domains** > **Set up a domain**. If the domain is on Cloudflare it becomes `Active` automatically; otherwise update DNS records at your provider.
- Delete the Vercel app only after the custom domain sends requests to Pages.
- Pages does not provide IP addresses and does not need `A` or `AAAA` records; it uses `CNAME` records.

## Related

- [Custom domains](../configuration/custom-domains.md)
- [Get started with Git integration](./get-started-git-integration.md)
