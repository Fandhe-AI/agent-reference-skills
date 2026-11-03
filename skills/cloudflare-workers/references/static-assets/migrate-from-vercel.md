---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/
---

# Migrate from Vercel to Workers

Migrate a Vercel application to Cloudflare Workers with static assets.

## Signature / Usage

Static site:

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

Single page application:

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

- Vercel-specific features are not supported on Workers; check the compatibility matrix in the Pages migration guide.
- Some frameworks have dedicated "Deploy an existing project on Workers" guides; follow those first.
- Find the **Build Command** and **Output Directory** under Vercel project Settings > Build & Development settings. Use correct pathing for `assets.directory` (for example `./dist` or `./build`).
- Connect the GitHub repo through Workers Builds (https://developers.cloudflare.com/workers/ci-cd/builds/#connect-a-new-worker) with the same build command and the default deploy command `npx wrangler deploy`.
- Workers Custom Domains only support domains configured as zones on your Cloudflare account.
- Delete the Vercel app after the custom domain sends traffic to Workers.

## Related

- [Migrate from Pages](./migrate-from-pages.md)
- [Migrate from Netlify](./migrate-from-netlify.md)
- [Single Page Application](./routing-single-page-application.md)
