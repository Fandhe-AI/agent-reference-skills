---
source: https://developers.cloudflare.com/workers/wrangler/configuration/
---

# Wrangler Configuration Overview

Wrangler optionally uses a configuration file (`wrangler.jsonc`, `wrangler.json` or `wrangler.toml`) to customize the development and deployment setup for a Worker. Wrangler is the Cloudflare Developer Platform CLI used to build, test, and deploy Workers projects.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	// Top-level configuration
	"name": "my-worker",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"workers_dev": false,
	"route": {
		"pattern": "example.org/*",
		"zone_name": "example.org",
	},
	"kv_namespaces": [
		{
			"binding": "<MY_NAMESPACE>",
			"id": "<KV_ID>",
		},
	],
	"env": {
		"staging": {
			"name": "my-worker-staging",
			"route": {
				"pattern": "staging.example.org/*",
				"zone_name": "example.org",
			},
			"kv_namespaces": [
				{
					"binding": "<MY_NAMESPACE>",
					"id": "<STAGING_KV_ID>",
				},
			],
		},
	},
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker"
main = "src/index.js"
upload_source_maps = true
# Set this to today's date
compatibility_date = "2026-11-03"
workers_dev = false

[route]
pattern = "example.org/*"
zone_name = "example.org"

[[kv_namespaces]]
binding = "<MY_NAMESPACE>"
id = "<KV_ID>"

[env.staging]
name = "my-worker-staging"

  [env.staging.route]
  pattern = "staging.example.org/*"
  zone_name = "example.org"

  [[env.staging.kv_namespaces]]
  binding = "<MY_NAMESPACE>"
  id = "<STAGING_KV_ID>"
```

## Notes

- As of Wrangler v3.91.0 Wrangler supports both JSON (`wrangler.json` or `wrangler.jsonc`) and TOML (`wrangler.toml`). Prior to that version, only `wrangler.toml` was supported.
- Cloudflare recommends `wrangler.jsonc` for new projects, and some newer Wrangler features will only be available to projects using a JSON config file.
- The format of the configuration file is exactly the same across both languages, only the syntax differs.
- It is best practice to treat the configuration file as the source of truth for configuring a Worker (see [source-of-truth.md](./source-of-truth.md)).
- Wrangler commands use the permissions of the authenticated member or API token.
- Environments are defined under `[env.<name>]` and selected with `-e` / `--env`; see [environments.md](./environments.md) and [top-level-keys.md](./top-level-keys.md) for which keys are inherited.
- Automatic provisioning: see [automatic-provisioning.md](./automatic-provisioning.md).
- Runtime behavior of the features configured here (compatibility dates, cron triggers, routes, bindings semantics) is documented by the cloudflare-workers skill; binding runtime APIs for KV / D1 / R2 / Hyperdrive belong to cloudflare-storage.

## Related

- [top-level-keys.md](./top-level-keys.md)
- [environments.md](./environments.md)
- [automatic-provisioning.md](./automatic-provisioning.md)
- [source-of-truth.md](./source-of-truth.md)
- [install-and-update.md](./install-and-update.md)
