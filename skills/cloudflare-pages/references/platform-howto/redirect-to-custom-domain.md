---
source: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/
---

# Redirecting *.pages.dev to a Custom Domain

Use a Bulk Redirect to send `<project>.pages.dev` traffic to your custom domain.

## Signature / Usage

Create a bulk redirect list shaped like this row, then a bulk redirect rule that uses it:

```txt
| Source URL | Target URL | Status | Parameters |
| --- | --- | --- | --- |
| `<project>.pages.dev` | `https://example.com` | `301` | Preserve query string, Subpath matching, Preserve path suffix, Include subdomains |
```

Snippet taken from https://developers.cloudflare.com/pages/how-to/www-redirect/ (verify a redirect):

```sh
curl --head -i https://www.example.com/
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Source URL | string | — | `<project>.pages.dev`. |
| Target URL | string | — | Your custom domain, for example `https://example.com`. |
| Status | number | — | `301` in the example. |
| Parameters | options | — | Preserve query string, Subpath matching, Preserve path suffix, Include subdomains. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Steps: Pages project > **Custom domains** (add the custom domain if missing) > **Bulk Redirects**; create the list and the rule. Test by visiting your `<project>.pages.dev` domain; it should end on the custom domain once propagated.
- The Parameters column is a bullet list in the source; the row above is condensed to one line.
- Purpose: serve content only on the custom domain, not on the generated `pages.dev` site.

## Related

- [Redirecting www to domain apex](./www-redirect.md)
- [Custom domains](../configuration/custom-domains.md)
- [Redirects](../configuration/redirects.md)
