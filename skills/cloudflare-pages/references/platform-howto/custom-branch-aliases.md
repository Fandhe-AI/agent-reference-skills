---
source: https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/
---

# Add a custom domain to a branch

Point a custom domain such as `staging.example.com` at the latest build of a specific branch.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/configuration/custom-domains/ (CNAME record shape):

```txt
| Type | Name | Content |
| --- | --- | --- |
| `CNAME` | `shop.example.com` | `<YOUR_SITE>.pages.dev` |
```

For a branch, activate the custom domain first, then edit that CNAME target in DNS to include the branch alias: change `your-project.pages.dev` to `staging.your-project.pages.dev`.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Custom domain | domain | — | For example `staging.example.com`. |
| CNAME target | hostname | `your-project.pages.dev` | Change to `<branch>.your-project.pages.dev`, for example `staging.your-project.pages.dev`. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Only supported with a proxied Cloudflare DNS record. With an external DNS provider or an unproxied record the alias is sent to the production branch.
- Steps: ensure a successful deployment on the branch; Pages project > **Custom domains** > **Setup a custom domain**; enter the domain; **Continue** > **Activate domain**; then edit the zone's DNS CNAME.
- Result: the branch is served at the custom domain and always shows the branch's latest build.

## Related

- [Preview deployments](../configuration/preview-deployments.md)
- [Custom domains](../configuration/custom-domains.md)
