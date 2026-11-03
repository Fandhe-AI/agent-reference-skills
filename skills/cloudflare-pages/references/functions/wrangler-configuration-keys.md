---
source: https://developers.cloudflare.com/pages/functions/wrangler-configuration/
---

# Wrangler configuration keys and environments

Inheritable and non-inheritable keys, plus `env.preview` / `env.production` overrides for Pages.

## Signature / Usage

Override preview deployments only. Adapted (not in the official docs): `vars` uses non-secret `API_BASE_URL` values instead of `API_KEY` strings; see Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-pages-site",
	"pages_build_output_dir": "./dist",
	"kv_namespaces": [
		{
			"binding": "KV",
			"id": "<NAMESPACE_ID>"
		}
	],
	"vars": {
		"API_BASE_URL": "https://api.example.com"
	},
	"env": {
		"preview": {
			"kv_namespaces": [
				{
					"binding": "KV",
					"id": "<PREVIEW_NAMESPACE_ID>"
				}
			],
			"vars": {
				"API_BASE_URL": "https://api-preview.example.com"
			}
		}
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-pages-site"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_BASE_URL = "https://api.example.com"

[[env.preview.kv_namespaces]]
binding = "KV"
id = "<PREVIEW_NAMESPACE_ID>"

[env.preview.vars]
API_BASE_URL = "https://api-preview.example.com"
```

Local-development file with a compatibility flag:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-pages-app",
	"pages_build_output_dir": "./dist",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"kv_namespaces": [
		{
			"binding": "KV",
			"id": "<NAMESPACE_ID>"
		}
	]
}
```

Deploy (production, then explicit branch):

```sh
npx wrangler pages deploy
npx wrangler pages deploy --branch <PRODUCTION BRANCH>
```

## Options / Props

### Inheritable keys (top level, inherited or overridden per environment)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | — | Required. Pages project name; alphanumeric and dashes only. |
| `pages_build_output_dir` | string | — | Required. Build output folder, for example `./dist`. |
| `compatibility_date` | string | — | Required. `yyyy-mm-dd`; selects the Workers runtime version. |
| `compatibility_flags` | string[] | — | Optional. Flags enabling upcoming runtime features. |
| `send_metrics` | boolean | `true` | Optional. Whether Wrangler sends usage data to Cloudflare for this project. |
| `limits` | Limits | — | Optional. Runtime execution limits; same as Workers. |
| `placement` | Placement | — | Optional. Smart Placement. |
| `upload_source_maps` | boolean | — | Upload server-side source maps for corrected stack traces in logs. |

### Non-inheritable keys

If any one of these is overridden in an environment, all must be specified (and overridden) in that environment, otherwise deploy validation fails (local development still works).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `vars` | object | — | Environment variables. |
| `d1_databases` | object | — | D1 bindings. |
| `durable_objects` | object | — | Durable Object bindings; each requires the `script_name` key (optional in Workers). |
| `hyperdrive` | object | — | Hyperdrive configs. |
| `kv_namespaces` | object | — | KV namespaces. |
| `queues.producers` | object | — | Queue producer bindings (no consumers with Pages Functions). |
| `r2_buckets` | object | — | R2 buckets. |
| `vectorize` | object | — | Vectorize indexes. |
| `services` | object | — | Service bindings. |
| `analytics_engine_datasets` | object | — | Analytics Engine datasets. |
| `ai` | object | — | Workers AI binding; one AI binding per project. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Only `production` and `preview` are valid `env.<ENVIRONMENT>` names, unlike Workers environments. Top-level values apply to local and (unless overridden) production and preview. Override production with `env.production`, or both explicitly. Pages does not support branch-based configuration: deploying on a preview-configured branch sets configuration for all preview deployments.
- `--branch` is optional for `wrangler pages deploy`; with Git, Wrangler infers the branch.
- Adapted from the official docs: example `vars` used `API_KEY` values (`1234567asdf` etc.); use secrets for credentials, not `vars`.
- Failing example in the official page: overriding only `env.production.vars` while top-level `kv_namespaces` exists. The rule is that `env.production.kv_namespaces` must then be defined too.
- Binding configuration is done the same way as Workers (links under https://developers.cloudflare.com/workers/wrangler/configuration/); local-dev mode writes to local storage, not preview/production.
- Queues consumers cannot be configured with Pages Functions.

## Related

- [wrangler-configuration.md](./wrangler-configuration.md)
- [bindings.md](./bindings.md)
- [smart-placement.md](./smart-placement.md)
- [source-maps.md](./source-maps.md)
