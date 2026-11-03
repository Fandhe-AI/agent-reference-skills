---
source: https://developers.cloudflare.com/workers/wrangler/commands/pages/
---

# Pages

Configure Cloudflare Pages using Wrangler.

## Signature / Usage

```sh
npx wrangler pages dev [DIRECTORY] [COMMAND]
npx wrangler pages functions build [DIRECTORY]
npx wrangler pages project list
npx wrangler pages project create <PROJECT-NAME>
npx wrangler pages project delete <PROJECT-NAME>
npx wrangler pages deployment list
npx wrangler pages deployment tail [DEPLOYMENT]
npx wrangler pages deployment delete <DEPLOYMENT-ID>
npx wrangler pages deploy [DIRECTORY]
npx wrangler pages secret put <KEY>
npx wrangler pages secret bulk [FILE]
npx wrangler pages secret delete <KEY>
npx wrangler pages secret list
npx wrangler pages download config [PROJECTNAME]
```

Descriptions:

- `pages dev`: Develop your full-stack Pages application locally
- `pages functions build`: Compile a folder of Pages Functions into a single Worker
- `pages project list`: List your Cloudflare Pages projects
- `pages project create`: Create a new Cloudflare Pages project
- `pages project delete`: Delete a Cloudflare Pages project
- `pages deployment list`: List deployments in your Cloudflare Pages project
- `pages deployment tail`: Start a tailing session for a project's deployment and livestream logs from your Functions
- `pages deployment delete`: Delete a deployment in your Cloudflare Pages project
- `pages deploy`: Deploy a directory of static assets as a Pages deployment
- `pages secret put`: Create or update a secret variable for a Pages project
- `pages secret bulk`: Bulk upload secrets for a Pages project
- `pages secret delete`: Delete a secret variable from a Pages project
- `pages secret list`: List all secrets for a Pages project
- `pages download config` (Experimental): Download your Pages project config as a Wrangler configuration file

## Options / Props

### `pages dev`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `[DIRECTORY]` | string | — | The directory of static assets to serve |
| `[COMMAND]` | string | — | The proxy command to run [deprecated] |
| `--compatibility-date` | string | — | Date to use for compatibility checks |
| `--compatibility-flags` (alias `--compatibility-flag`) | string | — | Flags to use for compatibility checks |
| `--ip` | string | — | The IP address to listen on |
| `--port` | number | — | The port to listen on (serve from) |
| `--inspector-port` | number | — | Port for devtools to connect to |
| `--proxy` | number | — | The port to proxy (where the static assets are served) |
| `--script-path` | string | — | The location of the single Worker script if not using functions [default: _worker.js] |
| `--no-bundle` | boolean | — | Whether to run bundling on `_worker.js` |
| `--binding` (alias `--b`) | array | — | Bind variable/secret (KEY=VALUE) |
| `--kv` (alias `--k`) | array | — | KV namespace to bind (--kv KV_BINDING) |
| `--d1` | array | — | D1 database to bind (--d1 D1_BINDING) |
| `--do` (alias `--o`) | array | — | Durable Object to bind (--do DO_BINDING=CLASS_NAME@SCRIPT_NAME) |
| `--r2` | array | — | R2 bucket to bind (--r2 R2_BINDING) |
| `--ai` | string | — | AI to bind (--ai AI_BINDING) |
| `--version-metadata` | string | — | Worker Version metadata (--version-metadata VERSION_METADATA_BINDING) |
| `--service` | array | — | Service to bind (--service SERVICE=SCRIPT_NAME) |
| `--live-reload` | boolean | false | Auto reload HTML pages when change is detected |
| `--local-protocol` | "http" \| "https" | — | Protocol to listen to requests on, defaults to http. |
| `--https-key-path` | string | — | Path to a custom certificate key |
| `--https-cert-path` | string | — | Path to a custom certificate |
| `--persist-to` | string | — | Specify directory to use for local persistence (defaults to .wrangler/state) |
| `--log-level` | "debug" \| "info" \| "log" \| "warn" \| "error" \| "none" | — | Specify logging level |
| `--show-interactive-dev-session` | boolean | — | Show interactive dev session (defaults to true if the terminal supports interactivity) |

### `pages functions build`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `[DIRECTORY]` | string | functions | The directory of Pages Functions |
| `--outfile` | string | — | The location of the output Worker script |
| `--outdir` | string | — | Output directory for the bundled Worker |
| `--output-config-path` | string | — | The location for the output config file |
| `--build-metadata-path` | string | — | The location for the build metadata file |
| `--project-directory` | string | — | The location of the Pages project |
| `--output-routes-path` | string | — | The location for the output _routes.json file |
| `--minify` | boolean | false | Minify the output Worker script |
| `--sourcemap` | boolean | false | Generate a sourcemap for the output Worker script |
| `--fallback-service` | string | ASSETS | The service to fallback to at the end of the `next` chain. Setting to '' will fallback to the global `fetch`. |
| `--watch` | boolean | false | Watch for changes to the functions and automatically rebuild the Worker script |
| `--plugin` | boolean | false | Build a plugin rather than a Worker script |
| `--build-output-directory` | string | — | The directory to output static assets to |
| `--compatibility-date` | string | — | Date to use for compatibility checks |
| `--compatibility-flags` (alias `--compatibility-flag`) | string | — | Flags to use for compatibility checks |
| `--external` | string | — | A list of module imports to exclude from bundling |
| `--metafile` | string | — | Path to output build metadata from esbuild. If flag is used without a path, defaults to 'bundle-meta.json' inside the directory specified by --outdir. |

### `pages project list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--json` | boolean | false | Return output as JSON |

### `pages project create`

| Flag | Type | Description |
| --- | --- | --- |
| `<PROJECT-NAME>` | string (required) | The name of your Pages project |
| `--production-branch` | string | The name of the production branch of your project |
| `--compatibility-flags` (alias `--compatibility-flag`) | string | Flags to use for compatibility checks |
| `--compatibility-date` | string | Date to use for compatibility checks |

### `pages project delete`

| Flag | Type | Description |
| --- | --- | --- |
| `<PROJECT-NAME>` | string (required) | The name of your Pages project |
| `--yes` (alias `--y`) | boolean | Answer "yes" to confirm project deletion |

### `pages deployment list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--project-name` | string | — | The name of the project you would like to list deployments for |
| `--environment` | string | — | Environment type to list deployments for |
| `--json` | boolean | false | Return output as JSON |

### `pages deployment tail`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `[DEPLOYMENT]` | string | — | (Optional) ID or URL of the deployment to tail. Specify by environment if deployment ID is unknown. |
| `--project-name` | string | — | The name of the project you would like to tail |
| `--environment` | string | production | When not providing a specific deployment ID, specifying environment will grab the latest production or preview deployment |
| `--format` | string | — | The format of log entries |
| `--status` | "ok" \| "error" \| "canceled" | — | Filter by invocation status |
| `--header` | string | — | Filter by HTTP header |
| `--method` | string | — | Filter by HTTP method |
| `--search` | string | — | Filter by a text match in console.log messages |
| `--sampling-rate` | number | — | Adds a percentage of requests to log sampling rate |
| `--ip` | string | — | Filter by the IP address the request originates from. Use "self" to filter for your own IP |

### `pages deployment delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<DEPLOYMENT-ID>` | string (required) | — | The ID of the deployment to delete |
| `--project-name` | string | — | The name of the project the deployment belongs to |
| `--force` (alias `--f`) | boolean | false | Delete even if the deployment has an active alias |

### `pages deploy`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `[DIRECTORY]` | string | — | The directory of static files to upload |
| `--project-name` | string | — | The name of the project you want to deploy to |
| `--branch` | string | — | The name of the branch you want to deploy to |
| `--commit-hash` | string | — | The SHA to attach to this deployment |
| `--commit-message` | string | — | The commit message to attach to this deployment |
| `--commit-dirty` | boolean | — | Whether or not the workspace should be considered dirty for this deployment |
| `--skip-caching` | boolean | — | Skip asset caching which speeds up builds |
| `--no-bundle` | boolean | — | Whether to run bundling on `_worker.js` before deploying |
| `--upload-source-maps` | boolean | false | Whether to upload any server-side sourcemaps with this deployment |

### `pages secret put` / `pages secret delete`

| Flag | Type | Description |
| --- | --- | --- |
| `<KEY>` | string (required) | The variable name to be accessible in the Pages project |
| `--project-name` (alias `--project`) | string | The name of your Pages project |

### `pages secret bulk`

| Flag | Type | Description |
| --- | --- | --- |
| `[FILE]` | string | The file of key-value pairs to upload, as JSON in form {"key": value, ...} or .dev.vars file in the form KEY=VALUE |
| `--project-name` (alias `--project`) | string | The name of your Pages project |

### `pages secret list`

| Flag | Type | Description |
| --- | --- | --- |
| `--project-name` (alias `--project`) | string | The name of your Pages project |

### `pages download config`

| Flag | Type | Description |
| --- | --- | --- |
| `[PROJECTNAME]` | string | The Pages project to download |
| `--force` | boolean | Overwrite an existing Wrangler configuration file without prompting |

## Notes

- `pages download config` is marked Experimental on the official page.
- `--config` is not supported by Pages commands (stated on the other command pages that list the reduced global flag set).
- Each command also accepts the global flags; see the global flags page.
- Pages binding names in `pages dev` flags correspond to bindings documented in the cloudflare-storage / cloudflare-workers skills.

## Related

- [Workers](./workers.md)
- [Global flags](./global-flags.md)
