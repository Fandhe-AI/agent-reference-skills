---
source: https://developers.cloudflare.com/pages/
---

# Cloudflare Pages overview

Landing page for Cloudflare Pages: full-stack applications deployed to the Cloudflare global network, with a recommendation to start new projects with Workers.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/get-started/c3/ (create a Pages project from the command line):

```
npm create cloudflare@latest -- --platform=pages
```

Deploy by connecting a Git provider, uploading prebuilt assets with Direct Upload, or using C3 from the command line.

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases and offers a broader feature set; Workers is Cloudflare's primary platform for building applications). See the cloudflare-workers skill (static-assets/migrate-from-pages) for the migration guide and the Pages-versus-Workers compatibility matrix.
- Available on all plans. Features highlighted: Pages Functions (server-side code), Rollbacks, Redirects.
- Related products listed: Workers, R2, D1, Zaraz.
- Limits note on the landing page: 500 deploys per month on the Free plan (see Limits).
- This skill covers the Pages platform pages (configuration, get-started, how-to, migrations, limits). Framework guides and Pages Functions are in the `framework-guides` and `functions` categories of this skill (see [overview.md](../framework-guides/overview.md) and [get-started.md](../functions/get-started.md)).

## Related

- [Get started with C3](./get-started-c3.md)
- [Get started with Direct Upload](./get-started-direct-upload.md)
- [Get started with Git integration](./get-started-git-integration.md)
- [Limits](./limits.md)
- [Known issues](./known-issues.md)
