---
source: https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions
---

# Workers versions and deployments

Second half of the official Workers commands page: `versions`, `triggers`, `deployments`, `rollback`, `types`, and `check`. The first half (`init`, `dev`, `deploy`, `preview`, `secret`, `tail`, and others) is in the Workers page of this reference.

## Signature / Usage

### `versions`

The minimum required wrangler version to use these commands is 3.40.0. For versions before 3.73.0, you will need to add the `--x-versions` flag.

#### `versions upload`

Upload a new version of your Worker that is not deployed immediately.

```sh
npx wrangler versions upload [PATH]
```

#### `versions deploy`

Deploy a previously created version of your Worker all at once or create a gradual deployment to incrementally shift traffic to a new version by following an interactive prompt.

```sh
npx wrangler versions deploy [VERSION-SPECS]
```

The non-interactive version of this prompt is: `wrangler versions deploy version-id-1@percentage-1% version-id-2@percentage-2 -y`

For example: `wrangler versions deploy 095f00a7-23a7-43b7-a227-e4c97cab5f22@10% 1a88955c-2fbd-4a72-9d9b-3ba1e59842f2@90% -y`

#### `versions list`

Retrieve details for the 10 most recent versions. Details include `Version ID`, `Created on`, `Author`, `Source`, and optionally, `Tag` or `Message`.

```sh
npx wrangler versions list
```

#### `versions view`

View the details of a specific version of your Worker

```sh
npx wrangler versions view <VERSION-ID>
```

#### `versions secret put` / `delete` / `bulk`

```sh
npx wrangler versions secret put [KEY]
npx wrangler versions secret delete [KEY]
npx wrangler versions secret bulk [FILE]
```

- `versions secret put`: Create or update a secret variable for a Worker
- `versions secret delete`: Delete a secret variable from a Worker
- `versions secret bulk`: Create, update, or delete multiple secret variables for a Worker

### `triggers`

The minimum required wrangler version to use these commands is 3.40.0. For versions before 3.73.0, you will need to add the `--x-versions` flag.

#### `triggers deploy` (Experimental)

Apply changes to triggers (Routes or domains and Cron Triggers) when using `wrangler versions upload`

```sh
npx wrangler triggers deploy
```

### `deployments`

Deployments track the version(s) of your Worker that are actively serving traffic. The minimum required wrangler version to use these commands is 3.40.0. For versions before 3.73.0, you will need to add the `--x-versions` flag.

#### `deployments list`

Displays the 10 most recent deployments of your Worker

```sh
npx wrangler deployments list
```

#### `deployments status`

View the current state of your production

```sh
npx wrangler deployments status
```

### `rollback`

Caution: a rollback will immediately create a new deployment with the specified version of your Worker and become the active deployment across all your deployed routes and domains. This change will not affect work in your local development environment.

```txt
wrangler rollback [<VERSION_ID>] [OPTIONS]
```

### `types`

Generate types based on your Worker configuration, including `Env` types based on your bindings, module rules, and runtime types based on the `compatibility_date` and `compatibility_flags` in your config file.

```txt
wrangler types [<PATH>] [OPTIONS]
```

#### Multi-environment support

By default, `wrangler types` generates types for bindings from **all environments** defined in your configuration file. This ensures your generated `Env` type includes all bindings that might be used across different deployment environments (such as staging and production), preventing TypeScript errors when accessing environment-specific bindings.

For example, if you have a KV namespace binding only in production and an R2 bucket binding only in staging, both will be included in the generated types as optional properties.

To generate types for only a specific environment, use the `--env` flag.

With multiple config files (service bindings / Durable Objects), `wrangler types -c wrangler.toml -c ../bound-worker/wrangler.toml` will generate an `Env` type like this:

```ts
interface Env {
	SERVICE_BINDING: Service<import("../bound-worker/src/index").Entrypoint>;
}
```

### `check startup`

Analyze your Worker's startup phase. Wrangler reports bundle size and a summary of local CPU activity. It also saves a detailed CPU profile.

```sh
wrangler check startup
```

```txt
Bundle: 42.31 KiB / gzip: 11.24 KiB

Local startup profile:
  Profile window: 25.2 ms
  Sampled time: 24.8 ms
  Active: 18.4 ms (including 1.2 ms garbage collection)
  Idle: 6.4 ms
  Samples: 25
```

The local startup profile includes the following metrics:

| Metric | Description |
| --- | --- |
| Profile window | Elapsed time between the start and end of the profiling session. |
| Sampled time | Total time represented by the captured CPU samples. |
| Active | Sampled time that the Worker was not idle, including garbage collection. |
| Idle | Sampled time that the Worker was idle. |
| Samples | Number of CPU samples captured during the profiling session. |

Import the generated `.cpuprofile` file into Chrome DevTools or open it directly in VS Code to view a flamegraph. When a Worker deployment fails with a startup time error, Wrangler also generates this profile automatically.

This command measures performance of your Worker locally, on your own machine — which has a different CPU than when your Worker runs on Cloudflare. This means results can vary widely.

Use the summary and CPU profile to understand where your Worker spends time during startup. Do not expect the local profile duration to match your Worker's startup time on Cloudflare.

## Options / Props

### `versions upload`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `[PATH]` | string | — | The path to an entry point for your Worker or a directory of static assets |
| `--name` | string | — | Name of the Worker |
| `--tag` | string | — | A tag for this Worker Version |
| `--message` | string | — | A descriptive message for this Worker Version |
| `--no-bundle` | boolean | false | Skip internal build steps and directly upload Worker |
| `--outdir` | string | — | Output directory for the bundled Worker |
| `--outfile` | string | — | Output file for the bundled worker |
| `--compatibility-date` | string | — | Date to use for compatibility checks |
| `--compatibility-flags` (alias `--compatibility-flag`) | string | — | Flags to use for compatibility checks |
| `--latest` | boolean | false | Use the latest compatibility date supported by this version of Wrangler |
| `--assets` | string | — | Static assets to be served. Replaces Workers Sites. |
| `--var` | string | — | A key-value pair to be injected into the script as a variable |
| `--define` | string | — | A key-value pair to be substituted in the script |
| `--alias` | string | — | A module pair to be substituted in the script |
| `--jsx-factory` | string | — | The function that is called for each JSX element |
| `--jsx-fragment` | string | — | The function that is called for each JSX fragment |
| `--tsconfig` | string | — | Path to a custom tsconfig.json file |
| `--minify` | boolean | — | Minify the Worker |
| `--upload-source-maps` | boolean | — | Include source maps when uploading this Worker (defaults to true) |
| `--dry-run` | boolean | — | Compile a project and run checks without actually uploading the Worker |
| `--secrets-file` | string | — | Path to a file containing secrets to upload with the version (JSON or .env format). Applies additively with secrets from previous deployments - omitted secrets will not be deleted. |
| `--keep-vars` | boolean | false | When not used (or set to false), Wrangler will delete all vars before setting those found in the Wrangler configuration. When used (and set to true), the environment variables are not deleted before the deployment. If you set variables via the dashboard you probably want to use this flag. Note that secrets are never deleted by deployments. |
| `--strict` | boolean | false | Enables strict mode, which prevents uploads when there are conflicting remote changes. |
| `--preview-alias` | string | — | Name of an alias for this Worker version |

### `versions deploy`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--durable-objects-code-update-mode` | string | — | How to update Durable Object code: immediate, or deferred followed by a maximum delay (for example, deferred 30s) |
| `--name` | string | — | Name of the worker |
| `--version-id` | string | — | Worker Version ID(s) to deploy |
| `--percentage` | number | — | Percentage of traffic to split between Worker Version(s) (0-100) |
| `[VERSION-SPECS]` | string | — | Shorthand notation to deploy Worker Version(s) [<version-id>@<percentage>..]. Omitted percentages share the remaining traffic. |
| `--version-tag` | string | — | Worker Version tag(s) to deploy, resolved to a Version ID against the deployable versions. Supports the shorthand notation [<version-tag>@<percentage>..]. |
| `--message` | string | — | Description of this deployment (optional) |
| `--yes` (alias `--y`) | boolean | false | Automatically accept defaults to prompts |
| `--dry-run` | boolean | false | Don't actually deploy |

### `versions list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | string | — | Name of the Worker |
| `--json` | boolean | false | Display output as JSON |

### `versions view`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<VERSION-ID>` | string (required) | — | The Worker Version ID to view |
| `--name` | string | — | Name of the worker |
| `--json` | boolean | false | Display output as JSON |

### `versions secret put` / `versions secret delete`

| Flag | Type | Description |
| --- | --- | --- |
| `[KEY]` | string | The variable name to be accessible in the Worker |
| `--name` | string | Name of the Worker |
| `--message` | string | Description of this deployment |
| `--tag` | string | A tag for this version |

### `versions secret bulk`

| Flag | Type | Description |
| --- | --- | --- |
| `[FILE]` | string | The file of key-value pairs to create, update, or delete, as JSON in form {"key": "value", ...} or .env file in the form KEY=VALUE. Set a key to null in the JSON file to delete it. Deletion is not supported with .env files. If omitted, Wrangler expects to receive input from stdin rather than a file. |
| `--name` | string | Name of the Worker |
| `--message` | string | Description of this deployment |
| `--tag` | string | A tag for this version |

### `triggers deploy`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | string | — | Name of the worker |
| `--triggers` (aliases `--schedule`, `--schedules`) | string | — | cron schedules to attach |
| `--routes` (alias `--route`) | string | — | Routes to upload |
| `--experimental-route-zones` (aliases `--x-route-zones`) | boolean | false | Experimental: Enable the --zone and --zone-id flags to attach a zone to the routes passed via --route |
| `--zone` (alias `--zones`) | string | — | Experimental (requires --x-route-zones): Zone name for the routes passed via --route. Pass one value to apply it to all routes, or one value per --route in the same order |
| `--zone-id` (alias `--zone-ids`) | string | — | Experimental (requires --x-route-zones): Zone ID for the routes passed via --route. Pass one value to apply it to all routes, or one value per --route in the same order |
| `--dry-run` | boolean | false | Don't actually deploy |

### `deployments list` / `deployments status`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | string | — | Name of the Worker |
| `--json` | boolean | false | Display output as JSON |

### `rollback`

| Flag | Type | Description |
| --- | --- | --- |
| `VERSION_ID` | string, optional | The ID of the version you wish to roll back to. If not supplied, the `rollback` command defaults to the version uploaded before the latest version. |
| `--name` | string, optional | Perform on a specific Worker rather than inheriting from the Wrangler configuration file. |
| `--message` | string, optional | Add message for rollback. Accepts empty string. When specified, interactive prompts for rollback confirmation and message are skipped. |

### `types`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `PATH` | string | `./worker-configuration.d.ts` | The path to where types for your Worker will be written. The path must have a `d.ts` extension. |
| `--env` | string, optional | — | Generate types for bindings in a specific environment only, rather than aggregating bindings from all environments. |
| `--env-interface` | string | `Env` | The name of the interface to generate for the environment object. Not valid if the Worker uses the Service Worker syntax. |
| `--include-runtime` | boolean | true | Whether to generate runtime types based on the `compatibility_date` and `compatibility_flags` in your config file. |
| `--include-env` | boolean | true | Whether to generate `Env` types based on your Worker bindings. |
| `--strict-vars` | boolean, optional | true | Control the types that Wrangler generates for `vars` bindings. If `true`, (the default) Wrangler generates literal and union types for bindings (e.g. `myVar: 'my dev variable' \| 'my prod variable'`). If `false`, Wrangler generates generic types (e.g. `myVar: string`). This is useful when variables change frequently, especially when working across multiple environments. |
| `--check` | boolean, optional | — | Compare the generated file's recorded environment/configuration hash and runtime header with the current Wrangler configuration and runtime inputs. This does not compare or validate the generated file body or regenerate the file. Exits with code 0 if types are up-to-date, or code 1 if types are out-of-date. Useful for CI/CD pipelines and pre-commit hooks to detect input changes that require regeneration. |
| `--config`, `-c` | string[], optional | — | Path(s) to Wrangler configuration file. If the Worker you are generating types for has service bindings or bindings to Durable Objects, you can also provide the paths to those configuration files so that the generated `Env` type will include RPC types. |

### `check startup`

| Flag | Type | Description |
| --- | --- | --- |
| `--args` | string, optional | To customise the way `wrangler check startup` builds your Worker for analysis, provide the exact arguments you use when deploying your Worker with `wrangler deploy`, or your Pages project with `wrangler pages functions build`. For instance, if you deploy your Worker with `wrangler deploy --no-bundle`, you should use `wrangler check startup --args="--no-bundle"` to profile the startup phase. |
| `--worker` | string, optional | If you don't use Wrangler to deploy your Worker, you can use this argument to provide a Worker bundle to analyse. This should be a file path to a serialized multipart upload, with the exact same format as the Workers script-update API expects. |
| `--pages` | boolean, optional | If you don't use a Wrangler config file with your Pages project (i.e. a Wrangler config file containing `pages_build_output_dir`), use this flag to force `wrangler check startup` to treat your project as a Pages project. |

## Notes

- `rollback`, `types`, and `check startup` list the reduced global flag set (`--help`, `--config` not supported by Pages, `--cwd`); the other commands accept the full global flags (see the global flags page).
- For Wrangler versions greater than `3.66.0` but below `4.0.0`, `wrangler types` needed `--experimental-include-runtime`. During its experimental release, runtime types were output to a separate file (`.wrangler/types/runtime.d.ts` by default). With older Wrangler, runtime types are available through the `@cloudflare/workers-types` package.
- Docs inconsistency: the `wrangler types` `--config` description in the official page's Options list restates the multi-config example with `-c wrangler.toml`; the `--check` flag is listed under Options with no minimum version.
- `versions secret put|delete|bulk` only create a new version (use `wrangler secret ...` to create and deploy immediately).

## Related

- [Workers](./workers.md)
- [Global flags](./global-flags.md)
