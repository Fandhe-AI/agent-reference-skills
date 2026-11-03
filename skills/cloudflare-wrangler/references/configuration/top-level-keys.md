---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#top-level-only-keys
---

# Top-level, Inheritable and Non-inheritable Keys

Configuration keys fall into three classes with respect to environments: top-level only, inheritable, and non-inheritable.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"main": "src/index.ts",
	"compatibility_date": "2026-11-03",
	"vars": { "API_HOST": "example.com" },
	"env": {
		"production": {
			// non-inheritable keys (vars, bindings) must be redefined here
			"vars": { "API_HOST": "production.example.com" },
		},
	},
}
```

## Options / Props

### Top-level only keys

Apply to the Worker as a whole (and therefore all environments). Cannot be defined within named environments.

| Name | Type | Description |
|------|------|-------------|
| `keep_vars` | `boolean` optional | Whether Wrangler should keep variables configured in the dashboard on deploy. Refer to source of truth. |
| `addresses` | `string[]` optional | A list of inbound email addresses that Email Routing routes to this Worker. Each entry is either a literal recipient address (for example, `support@example.com`) or a `*@domain` catch-all (for example, `*@example.com`). Catch-all entries support apex domains only. When you deploy the Worker or its triggers, Wrangler reconciles the Worker's managed Email Routing rules with this list. |
| `send_metrics` | `boolean` optional | Whether Wrangler should send usage data to Cloudflare for this project. Defaults to `true`. |
| `dependencies_instrumentation` | `object` optional | Configures npm package dependency instrumentation when deploying or uploading a Worker version. Defaults to enabled. Sub-key `enabled` (`boolean`, default `true`): whether Wrangler should collect and send npm package dependency metadata (package names and versions). |
| `site` | `object` optional deprecated | See Workers Sites ([workers-sites.md](./workers-sites.md)). Cloudflare Pages and Workers Assets is preferred. Not supported by the Cloudflare Vite plugin. |

### Inheritable keys

Configurable at the top-level, and can be inherited (or overridden) by environment-specific configuration. At a minimum, `name`, `main` and `compatibility_date` are required to deploy a Worker. `main` is optional for assets-only Workers.

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` required | The name of your Worker. Alphanumeric characters (`a`, `b`, `c`, etc.) and dashes (`-`) only. Do not use underscores (`_`). Worker names can be up to 255 characters. If you plan to use a `workers.dev` subdomain, the name must be 63 characters or less and cannot start or end with a dash. |
| `main` | `string` required | The path to the entrypoint of your Worker that will be executed. For example: `./src/index.ts`. |
| `compatibility_date` | `string` required | A date in the form `yyyy-mm-dd`, which will be used to determine which version of the Workers runtime is used. |
| `account_id` | `string` optional | The ID of the account associated with your zone. You might have more than one account, so use the ID of the account associated with the zone/route you provide. Can also be specified through the `CLOUDFLARE_ACCOUNT_ID` environment variable. |
| `compatibility_flags` | `string[]` optional | Flags that enable features from upcoming features of the Workers runtime, usually used together with `compatibility_date`. |
| `workers_dev` | `boolean` optional | Enables use of `*.workers.dev` subdomain to deploy your Worker. If you have a Worker that is only for `scheduled` events, you can set this to `false`. Defaults to `true` when the configuration has no `route` or `routes`, and `false` otherwise. |
| `preview_urls` | `boolean` optional | Enables Version URLs and `workers.dev` Preview URLs. If omitted, Wrangler does not change an existing setting. If no setting exists, its initial value depends on `workers_dev`. |
| `route` | `Route` optional | A route that your Worker should be deployed to. Only one of `routes` or `route` is required. See [routes.md](./routes.md). |
| `routes` | `Route[]` optional | An array of routes that your Worker should be deployed to. Only one of `routes` or `route` is required. |
| `tsconfig` | `string` optional | Path to a custom `tsconfig`. Not applicable with the Cloudflare Vite plugin. |
| `triggers` | `object` optional | Cron definitions to trigger a Worker's `scheduled` function. See [triggers.md](./triggers.md). |
| `rules` | `Rule` optional | An ordered list of rules that define which modules to import, and what type to import them as. Needed for `Text`, `Data` and `CompiledWasm` modules, or to treat a `.js` file as an `ESModule` instead of `CommonJS`. Not applicable with the Vite plugin. See [bundling-rules.md](./bundling-rules.md). |
| `build` | `Build` optional | Configures a custom build step to be run by Wrangler. See [custom-builds.md](./custom-builds.md). Not applicable with the Vite plugin. |
| `no_bundle` | `boolean` optional | Skip internal build steps and directly deploy your Worker script. You must have a plain JavaScript Worker with no dependencies. Not applicable with the Vite plugin. |
| `find_additional_modules` | `boolean` optional | If true then Wrangler will traverse the file tree below `base_dir`. Any files that match `rules` will be included in the deployed Worker. Defaults to true if `no_bundle` is true, otherwise false. Can only be used with Module format Workers (not Service Worker format). Not applicable with the Vite plugin. |
| `base_dir` | `string` optional | The directory in which module "rules" should be evaluated when including additional files (via `find_additional_modules`). Defaults to the directory containing the `main` entry point. Not applicable with the Vite plugin. |
| `preserve_file_names` | `boolean` optional | Whether Wrangler preserves the file names of additional modules bundled with the Worker. The default is to prepend filenames with a content hash, for example `34de60b44167af5c5a709e62a4e20c4f18c9e3b6-favicon.ico`. Not applicable with the Vite plugin. |
| `minify` | `boolean` optional | Minify the Worker script before uploading. With the Vite plugin, replaced by Vite's `build.minify`. |
| `keep_names` | `boolean` optional | Whether esbuild should apply its `keepNames` logic to the code. Defaults to `true`. |
| `logpush` | `boolean` optional | Enables Workers Trace Events Logpush for a Worker. Scripts with this property are picked up by the Workers Logpush job configured for your account. Defaults to `false`. |
| `limits` | `Limits` optional | Limits imposed on execution at runtime. See [limits.md](./limits.md). |
| `observability` | `object` optional | Automatic observability settings for telemetry data emitted from your Worker. See [observability.md](./observability.md). |
| `assets` | `Assets` optional | Static assets that will be served. See [assets.md](./assets.md). |
| `exports` | `object` optional | Declares the Durable Object classes this Worker exports and their lifecycle state (`created`, `deleted`, `renamed`, `transferred`, `expecting-transfer`), and declares the Workflows this Worker defines. Durable Object entries are mutually exclusive with `migrations`. |
| `migrations` | `object` optional | Legacy imperative configuration that maps a Durable Object from a class name to a runtime state. For new Workers, prefer `exports`. |
| `placement` | `object` optional | Where your Worker runs to minimize latency to back-end services. Sub-keys: `mode` (`"smart"` places the Worker near back-end services based on observed latency), `region` (a cloud region such as `"aws:us-east-1"`, `"gcp:europe-west1"`, `"azure:westeurope"`), `host` (hostname and port of a single-homed layer 4 service, for example `"my_database_host.com:5432"`), `hostname` (hostname of a single-homed layer 7 service, for example `"my_api_server.com"`). |

### Non-inheritable keys

Configurable at the top-level, but cannot be inherited by environments and must be specified for each environment.

| Name | Type | Description |
|------|------|-------------|
| `define` | `Record<string, string>` optional | A map of values to substitute when deploying your Worker. With the Vite plugin, replaced by Vite's `define`. |
| `vars` | `object` optional | A map of environment variables to set when deploying your Worker. |
| `durable_objects` | `object` optional | Durable Objects your Worker should be bound to. See [bindings-durable-objects.md](./bindings-durable-objects.md). |
| `kv_namespaces` | `object` optional | KV namespaces. See [bindings-storage.md](./bindings-storage.md). |
| `r2_buckets` | `object` optional | R2 buckets. See [bindings-storage.md](./bindings-storage.md). |
| `analytics` | `object` optional | An Analytics SQL binding. See [bindings-misc.md](./bindings-misc.md). |
| `ai_search_namespaces` | `object` optional | AI Search namespaces. See [bindings-misc.md](./bindings-misc.md). |
| `ai_search` | `object` optional | AI Search instance bindings bound directly to pre-existing instances in the default namespace. |
| `vectorize` | `object` optional | Vectorize indexes. See [bindings-storage.md](./bindings-storage.md). |
| `services` | `object` optional | Service bindings. See [bindings-services-dispatch.md](./bindings-services-dispatch.md). |
| `queues` | `object` optional | Queue producers and consumers. See [bindings-queues.md](./bindings-queues.md). |
| `workflows` | `object` optional | Workflows. See [bindings-workflows.md](./bindings-workflows.md). |
| `tail_consumers` | `object` optional | The Tail Workers your Worker sends data to. |
| `secrets` | `object` optional | Declares the secret names your Worker requires. Used for validation during local development and deploy, and as the source of truth for type generation. `required` (`string[]`, optional): secret names that must be set to deploy. See [secrets.md](./secrets.md). |
| `secrets_store_secrets` | `object` optional | Secrets Store bindings. |
| `flagship` | `object` optional | Flagship apps. See [bindings-misc.md](./bindings-misc.md). |

## Notes

- Bindings such as `vars` or `kv_namespaces` are not inheritable and need to be defined explicitly in each environment; only the top-level `[env.<name>]` overrides apply.
- Several keys are "Not applicable if you're using the Cloudflare Vite plugin"; the Vite plugin replaces them with Vite equivalents (`build.minify`, `define`, `resolve.alias`, server options).
- Docs inconsistency: keys such as `dev`, `alias`, `containers`, `python_modules`, `upload_source_maps`, `browser`, `d1_databases`, `hyperdrive`, `images`, `ai`, `mtls_certificates`, `send_email`, `analytics_engine_datasets` and `dispatch_namespaces` are documented in other sections of the configuration page but do not appear in any of the three key lists above; their inheritance is not stated there.
- The cloudflare-workers skill covers the runtime behavior of compatibility dates/flags, placement, routes and logpush.

## Related

- [environments.md](./environments.md)
- [overview.md](./overview.md)
- [routes.md](./routes.md)
- [bindings-storage.md](./bindings-storage.md)
