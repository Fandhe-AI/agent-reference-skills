---
source: https://developers.cloudflare.com/pages/how-to/deploy-a-wordpress-site/
---

# Deploy a static WordPress site

Export a WordPress site with the Simply Static plugin and publish the ZIP to Pages with Direct Upload.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/get-started/direct-upload/ (Wrangler alternative to the dashboard upload; Wrangler needs an unzipped folder, not a ZIP):

```sh
npx wrangler pages deploy <BUILD_OUTPUT_DIRECTORY>
```

Dashboard flow from the page: WordPress **Plugins** > **Add New** > install and activate **Simply Static**; **Simply Static** > **GENERATE STATIC FILES**; download the ZIP from the Activity Log; in Cloudflare **Create application** > **Pages** > **Use direct upload**, name the project, upload the ZIP (or unzipped folder), **Deploy site**.

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- You need the Administrator account and permission to install plugins.
- Every change requires generating and uploading a new ZIP; automatic updates are not available with the free version of Simply Static.
- Not supported on the static site: WordPress forms, comments, and links to `/wp-admin` or similar internal routes.
- Follow-ups: move the WordPress instance to a custom domain or subdomain, run it locally or behind Cloudflare Access for contributors only, and downgrade hosting.

## Related

- [Get started with Direct Upload](./get-started-direct-upload.md)
- [Custom domains](../configuration/custom-domains.md)
