---
source: https://developers.cloudflare.com/workers/wrangler/environments/
---

# Environments

Environments create different configurations for the same Worker application, defined under `env.<name>` in the Wrangler configuration file. Each environment effectively creates a new Worker named `<top-level-name>-<environment-name>` (e.g. `my-worker-dev`).

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"route": "dev.example.com/*",
	"vars": {
		"ENVIRONMENT": "dev",
	},
	"env": {
		"staging": {
			"vars": {
				"ENVIRONMENT": "staging",
			},
			"route": "staging.example.com/*",
		},
		"production": {
			"vars": {
				"ENVIRONMENT": "production",
			},
			"routes": ["example.com/foo/*", "example.com/bar/*"],
		},
	},
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker"
route = "dev.example.com/*"

[vars]
ENVIRONMENT = "dev"

[env.staging]
route = "staging.example.com/*"

  [env.staging.vars]
  ENVIRONMENT = "staging"

[env.production]
routes = [ "example.com/foo/*", "example.com/bar/*" ]

  [env.production.vars]
  ENVIRONMENT = "production"
```

Select an environment with `--env` / `-e`:

```sh
npx wrangler dev -e=dev
npx wrangler deploy --env staging   # Uploaded my-worker-staging
```

## Notes

- Use Wrangler environments for persistent Workers such as staging or development. Use Previews when every branch or pull request should get a URL.
- Alternatively select with `CLOUDFLARE_ENV` (e.g. `CLOUDFLARE_ENV=dev npx wrangler deploy`). The `--env` argument takes precedence. With the Cloudflare Vite plugin, select the environment at dev/build time via `CLOUDFLARE_ENV` rather than `--env`.
- Non-inheritable keys (bindings, `vars`) must be specified per environment. Example: top-level `vars.API_HOST = "example.com"` and `kv_namespaces`, with `env.production` redefining both.
- Service bindings targeting a Worker in a specific environment must append the environment: `service = "worker-a-staging"` in worker-b's `staging` environment while the top-level binding uses `worker-a`.
- Secrets: per-environment with `wrangler secret put <KEY> --env`, or `.dev.vars.<environment-name>`; secrets are non-inheritable (see [secrets.md](./secrets.md)).
- Deploying to a Custom Domain or route requires a `route` / `routes` key per environment.
- `workers_dev = true` in an environment deploys it to `https://my-worker-staging.<YOUR_SUBDOMAIN>.workers.dev`.
- Caution: creating a Worker via an environment automatically creates a publicly discoverable SSL certificate; do not put sensitive information in environment names.
- Docs inconsistency: the staging `workers.dev` example output shows `Uploaded my-worker` while the published URL contains `my-worker-staging`; and the Secrets section writes `-env` instead of `--env`.
- The `service` environments mechanism (`legacy_env`) is deprecated; see [deprecations.md](./deprecations.md).

## Related

- [top-level-keys.md](./top-level-keys.md)
- [secrets.md](./secrets.md)
- [bindings-services-dispatch.md](./bindings-services-dispatch.md)
- [system-environment-variables.md](./system-environment-variables.md)
