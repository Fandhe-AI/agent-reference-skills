---
source: https://developers.cloudflare.com/pages/functions/wrangler-configuration/
---

# Wrangler configuration for Pages: setup and migration

Pages projects can be configured through the Cloudflare dashboard or a Wrangler configuration file. When a file is used it is the source of truth for the project.

## Signature / Usage

Adapted (not in the official docs): `vars` holds a non-secret setting instead of an `API_KEY`-style value; see Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-pages-app",
	"pages_build_output_dir": "./dist",
	"kv_namespaces": [
		{
			"binding": "KV",
			"id": "<NAMESPACE_ID>"
		}
	],
	"d1_databases": [
		{
			"binding": "DB",
			"database_name": "northwind-demo",
			"database_id": "<DATABASE_ID>"
		}
	],
	"vars": {
		"API_BASE_URL": "https://api.example.com"
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-pages-app"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"

[[d1_databases]]
binding = "DB"
database_name = "northwind-demo"
database_id = "<DATABASE_ID>"

[vars]
API_BASE_URL = "https://api.example.com"
```

Download the dashboard configuration into a Wrangler file:

```sh
npx wrangler pages download config <PROJECT_NAME>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `pages_build_output_dir` | string | — | Build output folder (for example `./dist`). Adding it to an existing Wrangler file makes Pages use that file's configuration on deploy. Pages-only key. |
| Requirement: build system | — | — | V2 build system or later. |
| Requirement: Wrangler | — | — | Wrangler 3.45.0 or higher. |
| JSON support | — | — | `wrangler.json` / `wrangler.jsonc` supported as of Wrangler v3.91.0; earlier only `wrangler.toml`. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages). Wrangler `pages` command flags are in the cloudflare-wrangler skill (commands/pages.md).
- Adapted from the official docs: the official examples put `"API_KEY": "1234567asdf"` in `vars`, but the page itself warns not to store sensitive information in `vars` (use secrets). Examples here use a non-secret `API_BASE_URL`.
- Existing Wrangler file used for local development: adding `pages_build_output_dir` and deploying makes Pages use whatever it defines, likely non-production. Verify before deploying. Without that key, `wrangler pages deploy` warns that fields are missing and the file stays local-only.
- `wrangler pages download config` overwrites an existing Wrangler file with one generated from dashboard settings. Then create a new deployment (Git integration or Direct Upload) to start using the file.
- Dashboard compatibility date "Latest" is not supported in Wrangler; the downloaded file contains the latest date at download time. Compatibility dates must be set explicitly.
- Differences from Workers: fields do not match exactly (Workers-only keys such as `main` do not apply; module aliasing is unavailable); `pages_build_output_dir` is new; environments and inheritance differ; fields set in the file cannot be edited in the dashboard (visible, not editable).
- To stop using the file, delete it and create a new deployment; last deployment's values still apply and become editable in the dashboard.
- Local development settings (port, protocol, ip) are the same as Workers: https://developers.cloudflare.com/workers/wrangler/configuration/#local-development-settings

## Related

- [wrangler-configuration-keys.md](./wrangler-configuration-keys.md)
- [bindings.md](./bindings.md)
- [local-development.md](./local-development.md)
