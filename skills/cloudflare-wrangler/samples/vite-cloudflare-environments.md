---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/
---

# Vite Cloudflare Environments (staging / production)

Select a Wrangler environment at Vite dev or build time with `CLOUDFLARE_ENV`, or map Vite modes to environments.

`wrangler.jsonc`:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./src/index.ts",
	"upload_source_maps": true,
	"vars": {
		"MY_VAR": "Top-level var"
	},
	"env": {
		"staging": {
			"vars": {
				"MY_VAR": "Staging var"
			}
		},
		"production": {
			"vars": {
				"MY_VAR": "Production var"
			}
		}
	}
}
```

Build for production: `CLOUDFLARE_ENV=production vite build`. To use Vite modes instead, provide the following files.

`.env.staging`:

```sh
CLOUDFLARE_ENV=staging
```

`.env.production`:

```sh
CLOUDFLARE_ENV=production
```

Then `vite build --mode staging` selects the staging environment.

## Notes

- The output `wrangler.json` is a flattened config for the selected environment; `CLOUDFLARE_ENV` has no effect on `vite preview` or `wrangler deploy`, which use that output.
- Without `CLOUDFLARE_ENV`, the top-level environment is used. With plain Wrangler, use `--env staging` instead (`npx wrangler deploy --env staging`).
- Bindings such as `vars` and `kv_namespaces` are not inheritable and must be defined per environment.
- Docs inconsistency: the page's flattened-output example shows `"compatibility_date": "2025-04-03"` while the input config uses `2026-11-03`.
- See [../references/vite-plugin/README.md](../references/vite-plugin/README.md) and [../references/configuration/README.md](../references/configuration/README.md).
