---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/
---

# Cloudflare Environments

Select a Cloudflare environment (`env` in the Worker config) at dev or build time with the `CLOUDFLARE_ENV` environment variable.

## Signature / Usage

Worker config with multiple environments:

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

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-11-03"
main = "./src/index.ts"
upload_source_maps = true

[vars]
MY_VAR = "Top-level var"

[env.staging.vars]
MY_VAR = "Staging var"

[env.production.vars]
MY_VAR = "Production var"
```

`CLOUDFLARE_ENV=production vite build` outputs a flattened `wrangler.json` for the production environment:

Adapted (not in the official docs): `name` is `my-worker-production` (the environment name is appended to the Worker name); see Notes.

```json
{
	"name": "my-worker-production",
	"compatibility_date": "2025-04-03",
	"main": "index.js",
	"upload_source_maps": true,
	"vars": { "MY_VAR": "Production var" }
}
```

### Secrets in local development

Put local-development secrets in a `.dev.vars` or `.env` file in the same directory as the Wrangler configuration file (dotenv syntax):

```bash
SECRET_KEY="value"
API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

- Do not use `vars` for sensitive information. Do not commit `.dev.vars` / `.env` to git; add `.dev.vars*` and `.env*` to `.gitignore`.
- The `secrets` configuration property declares required secret names. When defined, only keys listed in `secrets.required` are loaded from `.dev.vars` or `.env`; additional keys are excluded and missing keys produce a warning.
- Use either `.dev.vars` or `.env`, not both. If `.dev.vars` exists, values in `.env` files are not included in the `env` object during local development.
- Per-environment files: `.dev.vars.<environment-name>` or `.env.<environment-name>`; the environment-specific file loads ahead of the generic one.
  - `.dev.vars.<environment-name>`: if it exists only it is loaded (all secrets must be defined per environment); `.dev.vars` is not loaded.
  - `.env` files: all matching files are loaded and merged; the most specific wins. Precedence: `.env.<environment-name>.local` (most specific), `.env.local`, `.env.<environment-name>`, `.env` (least specific).
- Controlling `.env` handling: set `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV` to `"false"` to disable loading local dev vars from `.env` files without providing a `.dev.vars` file. To include every process environment variable as a local dev variable, ensure there is no `.dev.vars` and set `CLOUDFLARE_INCLUDE_PROCESS_ENV` to `"true"` (not needed with the `secrets` config property, which loads from `process.env` automatically).

### Combining Cloudflare environments and Vite modes

Provide `.env.staging` and `.env.production` files that select the Cloudflare environment:

```sh
CLOUDFLARE_ENV=staging
```

```sh
CLOUDFLARE_ENV=production
```

`vite build` uses the `production` Vite mode, so it loads `.env.production` and selects the `production` Cloudflare environment (`MY_VAR` = `'Production var'`). `vite build --mode staging` selects the `staging` environment (`MY_VAR` = `'Staging var'`).

## Notes

- Corrected from the official docs: the official page shows `"name": "my-worker"` for the production output; the environment name is appended to the top-level Worker name for environments (as in Wrangler environments), so the output is `my-worker-production`.
- The flattened output combines top-level only, inheritable, and non-inheritable keys.
- The default Vite environment name for a Worker is always the top-level Worker name, so it can be referenced consistently in the Vite config across Cloudflare environments.
- Cloudflare environments also work in development, e.g. `CLOUDFLARE_ENV=development vite dev`. Without `CLOUDFLARE_ENV`, `vite dev` / `vite build` use the default top-level environment.
- Cloudflare environments are applied at dev and build time; `CLOUDFLARE_ENV` has no effect on `vite preview` or `wrangler deploy`.
- Docs inconsistency: the flattened-output example shows `"compatibility_date": "2025-04-03"` although the input example uses `2026-11-03`; transcribed verbatim.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.

## Related

- [secrets.md](./secrets.md)
- [vite-environments.md](./vite-environments.md)
- [migrating-from-wrangler-dev.md](./migrating-from-wrangler-dev.md)
