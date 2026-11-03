---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/netlify-to-workers/
---

# Migrate from Netlify to Workers

Migrate a Netlify application to Cloudflare Workers with static assets.

## Signature / Usage

Static site (SSG):

```jsonc
{
	"name": "<your-project-name>",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "<your-build-directory>",
	},
}
```

Single Page Application:

```jsonc
{
	"name": "<your-project-name>",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "<your-build-directory>",
		"not_found_handling": "single-page-application",
	},
}
```

## Notes

- Netlify-specific features are not supported on Workers; check the compatibility matrix in the Pages migration guide.
- Some frameworks (Next.js, Astro with on-demand rendering, others) have dedicated "Deploy an existing project on Workers" guides; follow those first.
- Find the **Build command** and **Publish directory** under Netlify Project configuration > Build & deploy > Build settings. Put the publish directory in `assets.directory` (replace `<your-project-name>` and `<your-build-directory>`). `wrangler.jsonc` is recommended.
- Connect the GitHub repo through Workers Builds (https://developers.cloudflare.com/workers/ci-cd/builds/#connect-a-new-worker); use the same build command as Netlify and the default deploy command `npx wrangler deploy`.
- Workers Custom Domains only support domains configured as zones on your Cloudflare account.
- Delete the Netlify app after the custom domain sends traffic to Workers.

## Related

- [Migrate from Pages](./migrate-from-pages.md)
- [Migrate from Vercel](./migrate-from-vercel.md)
- [Single Page Application](./routing-single-page-application.md)
- [Static Site Generation and custom 404 pages](./routing-static-site-generation.md)
