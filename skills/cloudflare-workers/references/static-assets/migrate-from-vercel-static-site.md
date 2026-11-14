---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/
---

# Migrate a static site or SPA from Vercel

Move a static site or single-page application (SPA) from Vercel to Cloudflare Workers when your project does not render pages on the server. Workers Static Assets serves your build output, so you do not need a framework adapter.

## Signature / Usage

Create a Wrangler configuration file in the root of your project. Replace `<your-project-name>` with your project name, and `<your-build-directory>` with the output directory, for example `./dist`. For a static site:

```jsonc
{
	"name": "<your-project-name>",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"assets": {
		"directory": "<your-build-directory>",
	},
}
```

For a single-page application, add `not_found_handling`:

```jsonc
{
	"name": "<your-project-name>",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"assets": {
		"directory": "<your-build-directory>",
		"not_found_handling": "single-page-application",
	},
}
```

Build your project, then deploy it:

```sh
npx wrangler deploy
```

## Notes

- In the Vercel dashboard, go to your project's **Settings** > **Build & Development settings** and note the **Build Command** and **Output Directory** values.
- To deploy on every push, connect your repository to Workers Builds. Use the same build command as on Vercel, and use `npx wrangler deploy` as the deploy command.
- Review the shared steps in [migrate-from-vercel.md](./migrate-from-vercel.md) first.
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel.md](./migrate-from-vercel.md)
- [routing-single-page-application.md](./routing-single-page-application.md)
- [overview.md](./overview.md)
