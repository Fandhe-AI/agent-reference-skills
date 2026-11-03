---
source: https://developers.cloudflare.com/pages/platform/limits/
---

# Limits

Build, domain, file, header, redirect and project limits for Cloudflare Pages.

## Signature / Usage

Raise the file limit on paid plans (Pro, Business, Enterprise) by setting this environment variable in the Pages project settings:

```txt
PAGES_WRANGLER_MAJOR_VERSION=4
```

## Options / Props

Builds:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Concurrent builds | limit | Free 1, Pro 5, Business 20 | Counted per account. |
| Builds per month | limit | Free 500, Pro 5,000, Business 20,000 | — |
| Build timeout | limit | 20 minutes | Builds time out after this. |

Other limits:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Custom domains per project | limit | Free 100, Pro 250, Business 500, Enterprise 500 | Per project; contact your account team for more on Enterprise. |
| Files per site | limit | Free 20,000; paid 100,000 | The higher paid limit needs `PAGES_WRANGLER_MAJOR_VERSION=4`. |
| File size | limit | 25 MiB | Per asset; serve larger files from an R2 public bucket (optionally on a custom domain). |
| `_headers` rules | limit | 100 | Each header line up to 2,000 characters; use Pages Functions for larger headers. |
| `_redirects` | limit | 2,000 static + 100 dynamic = 2,100 | Use Bulk Redirects for more. |
| Preview deployments | limit | unlimited | Active at one time. |
| Users | limit | unlimited | Managed through the dashboard. |
| Projects per account | limit | 100 | Not routinely increased. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). For more than 100 sites the source recommends Workers for Platforms (no project limit, supports static assets) or Workers Static Assets (paid plans: up to 500 Workers per account, each up to 100,000 static asset files). The Workers project limit (100 Free, 500 paid) is separate from the Pages limit.
- The page lists the Free plan limits as the baseline; request increases through the Limit Increase Request Form where allowed.
- Pages Functions requests count toward Workers plan quotas, including requests from the Function to KV or Durable Object bindings; Pages supports the Standard usage model.
- New Pages projects are rate-limited during your first 48 hours of use to prevent abuse; the block lifts automatically afterwards.

## Related

- [Known issues](./known-issues.md)
- [Redirects](../configuration/redirects.md)
- [Headers](../configuration/headers.md)
