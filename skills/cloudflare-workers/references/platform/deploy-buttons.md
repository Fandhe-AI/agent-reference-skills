---
source: https://developers.cloudflare.com/workers/platform/deploy-buttons/
---

# Deploy to Cloudflare buttons

Embed a button in a README, blog post, or docs so others can clone, configure, build, and deploy your public Workers repository on their own account. Also covers the "Built with Cloudflare" badge.

## Signature / Usage

```md
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=<your git repo URL>)
```

```html
<a href="https://deploy.workers.cloudflare.com/?url=<YOUR_REPO_URL>"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare"/></a>
```

```plaintext
https://deploy.workers.cloudflare.com/?url=<YOUR_REPO_URL>
```

Optionally specify a subdirectory in the URL. After deploying with Workers Builds you can generate the snippet from the dashboard share button on the Worker details page.

Resource provisioning reads the Wrangler config. Worker variables:

```jsonc
{
  "name": "my-worker",
  "main": "./src/index.ts",
  "upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
  "vars": {
    "API_HOST": "https://example.com",
  },
}
```

Secrets are declared in `.dev.vars.example` or `.env.example` (dotenv format):

```ini
COOKIE_SIGNING_KEY=my-secret # comment
```

Binding descriptions in `package.json` (inline markdown `code`, `**bold**`, `__italics__`, links supported):

```json
{
	"name": "my-worker",
	"private": true,
	"cloudflare": {
		"bindings": {
			"API_KEY": {
				"description": "Select your company's [API key](https://example.com/) for connecting to the example service."
			},
			"COOKIE_SIGNING_KEY": {
				"description": "Generate a random string using `openssl rand -hex 32`."
			}
		}
	}
}
```

D1 migrations in the deploy script (reference the binding name, not the database name):

```json
{
	"scripts": {
		"build": "astro build",
		"deploy": "npm run db:migrations:apply && wrangler deploy",
		"db:migrations:apply": "wrangler d1 migrations apply DB_BINDING --remote"
	}
}
```

### Built with Cloudflare button

An SVG badge to show you use Cloudflare products (it does not deploy anything):

```md
[![Built with Cloudflare](https://workers.cloudflare.com/built-with-cloudflare.svg)](https://cloudflare.com)
```

```html
<a href="https://cloudflare.com"><img src="https://workers.cloudflare.com/built-with-cloudflare.svg" alt="Built with Cloudflare"/></a>
```

## Notes

- Also covers https://developers.cloudflare.com/workers/platform/built-with-cloudflare/.
- Auto-provisioned resources: KV namespaces, D1, R2, Hyperdrive, Vectorize, Secrets Store secrets (storage); Durable Objects, Workers AI, Queues (compute). Include default values for resource names, IDs, and other binding properties in the source repo. Cloudflare updates the Wrangler config with new IDs.
- Build/deploy commands are detected from `package.json` scripts; the default deploy is `npx wrangler deploy`, build is left blank if no `build` script.
- Limitations: monorepos not fully supported (a subdirectory is treated as the new repo root and must be self-contained; each Worker needs its own button); Workers only (not Pages); only github.com and gitlab.com (no self-hosted); repositories must be public.

## Related

- [claim-deployments.md](./claim-deployments.md)
- [infrastructure-as-code.md](./infrastructure-as-code.md)
- [get-started-cli.md](./get-started-cli.md)
