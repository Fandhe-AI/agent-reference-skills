---
source: https://developers.cloudflare.com/pages/how-to/enable-zaraz/
---

# Enable Zaraz

Load third-party tools through Cloudflare Zaraz on a Pages project that has a custom domain.

## Signature / Usage

Zaraz needs a custom domain on the project; set up Zaraz (https://developers.cloudflare.com/zaraz/get-started/) on that domain. Snippet taken from https://developers.cloudflare.com/pages/configuration/custom-domains/ (CNAME record shape for a subdomain):

```txt
| Type | Name | Content |
| --- | --- | --- |
| `CNAME` | `shop.example.com` | `<YOUR_SITE>.pages.dev` |
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Zaraz offloads third-party tools (analytics, advertising pixels, chatbots, marketing automation) to Cloudflare's edge. The page gives no further Pages-specific steps.

## Related

- [Custom domains](../configuration/custom-domains.md)
- [Enable Web Analytics](./web-analytics.md)
