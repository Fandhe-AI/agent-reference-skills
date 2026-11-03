---
source: https://developers.cloudflare.com/workers/wrangler/commands/workers/
---

# Workers

Wrangler commands for creating, developing, deploying, and managing Workers: `init`, `dev`, `deploy`, `preview`, `delete`, `setup`, `secret`, `tail`. The remaining commands of this page (`versions`, `triggers`, `deployments`, `rollback`, and others) are in the Workers versions and deployments page of this reference.

## Signature / Usage

### `init`

Create a new project via the create-cloudflare-cli (C3) tool. A variety of web frameworks are available to choose from as well as templates. Dependencies are installed by default, with the option to deploy your project immediately.

```txt
wrangler init [<NAME>] [OPTIONS]
```

### `dev`

Start a local server for developing your Worker.

```txt
wrangler dev [<SCRIPT>] [OPTIONS]
```

By default, `wrangler dev` executes your Worker in a local `workerd` process, which is not a hardened sandbox. Only run code you trust. For more information, refer to Local development security considerations (https://developers.cloudflare.com/workers/local-development/#security-considerations).

None of the options for this command are required. Many of these options can be set in your Wrangler file.

`wrangler dev` is a way to locally test your Worker while developing. With `wrangler dev` running, send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see `console.log` messages and exceptions appearing in your terminal.

`wrangler dev` runs the local `workerd` runtime with `TZ=UTC` to match the production Cloudflare runtime. `Date` and `Intl` APIs inside your Worker observe UTC during local development, regardless of your machine's timezone.

### `deploy`

Deploy your Worker to Cloudflare.

When you run `wrangler deploy` in a project directory without a Wrangler configuration file, Wrangler will automatically detect your framework and configure your project for Cloudflare Workers. This command will prompt you to confirm the detected settings before applying changes. Confirm that you would like to proceed, and your project will be configured and deployed.

To deploy from an AI agent or another environment before Cloudflare authentication is available, use `wrangler deploy --temporary`. This flow requires Wrangler 4.102.0 or later. Wrangler creates or reuses a temporary preview account, deploys to that account, and prints a claim URL. For more information, refer to Claim deployments (https://developers.cloudflare.com/workers/platform/claim-deployments/).

To configure your project without deploying, use `wrangler setup` instead.

```txt
wrangler deploy [<PATH>] [OPTIONS]
```

None of the options for this command are required. Also, many can be set in your Wrangler file.

### `preview`

Create a Preview deployment of the current Worker for branch and pull request work. Use `wrangler deploy` for production.

```txt
wrangler preview [<SCRIPT>] [OPTIONS]
```

None of the options for this command are required. Also, many can be set in your Wrangler file or in your Previews Base configuration.

For example:

```sh
npx wrangler preview --name feature-branch
```

Other Preview branches are not affected.

### `preview delete` / `preview secret` / `preview base-config secret`

```sh
npx wrangler preview delete
npx wrangler preview secret put <KEY>
npx wrangler preview secret delete <KEY>
npx wrangler preview secret list
npx wrangler preview secret bulk [FILE]
npx wrangler preview base-config secret put <KEY>
npx wrangler preview base-config secret delete <KEY>
npx wrangler preview base-config secret list
npx wrangler preview base-config secret bulk [FILE]
```

- `preview delete`: Delete a Preview and all its deployments
- `preview secret put`: Create or update a secret variable on a Worker Preview and create a new deployment
- `preview secret delete`: Delete a secret variable from a Worker Preview and create a new deployment
- `preview secret list`: List all secrets on a Worker Preview's latest deployment
- `preview secret bulk`: Upload multiple secrets to a Worker Preview and create a new deployment
- `preview base-config secret put`: Create or update a secret variable on the Preview base config
- `preview base-config secret delete`: Delete a secret variable from the Preview base config
- `preview base-config secret list`: List all secrets on the Preview base config
- `preview base-config secret bulk`: Upload multiple secrets to the Preview base config

### `delete`

Delete your Worker and all associated Cloudflare developer platform resources.

```txt
wrangler delete [<SCRIPT>] [OPTIONS]
```

### `setup`

Setup a project to work on Cloudflare.

```sh
npx wrangler setup
```

This command configures your project for Cloudflare Workers without deploying. It performs the same automatic project configuration as `wrangler deploy`, but does not deploy. This is useful when you want to review the generated configuration before deploying.

### `secret`

Manage the secret variables for a Worker.

This action creates a new version of the Worker and deploys it immediately. To only create a new version of the Worker, use the `wrangler versions secret` commands.

#### `secret put`

Create or update a secret for a Worker

```sh
npx wrangler secret put <KEY>
```

When running this command, you will be prompted to input the secret's value:

```sh
npx wrangler secret put FOO
```

```sh
? Enter a secret value: > ***
🌀 Creating the secret for script worker-app
✨ Success! Uploaded secret FOO
```

The `put` command can also receive piped input. For example:

```sh
echo "-----BEGIN PRIVATE KEY-----\nM...==\n-----END PRIVATE KEY-----\n" | wrangler secret put PRIVATE_KEY
```

#### `secret delete`

Delete a secret from a Worker

```sh
npx wrangler secret delete <KEY>
```

#### `secret list`

List all secrets for a Worker

```sh
npx wrangler secret list
```

The following is an example of listing the secrets for the current Worker.

```sh
[
  {
    "name": "FOO",
    "type": "secret_text"
  }
]
```

#### `secret bulk`

Create, update, or delete multiple secrets for a Worker in a single request, with up to 100 secrets per command.

```sh
npx wrangler secret bulk [FILE]
```

The following is an example of creating, updating, and deleting secrets from a JSON file redirected to `stdin`. Set a key to `null` to delete it.

```json
{
	"secret-name-1": "secret-value-1",
	"secret-name-2": "secret-value-2",
	"secret-name-3": null
}
```

```sh
npx wrangler secret bulk < secrets.json
```

```sh
🌀 Processing the secrets for the Worker "script-name"
✨ Successfully created secret for key: secret-name-1
✨ Successfully created secret for key: secret-name-2
💥 Successfully deleted secret for key: secret-name-3

Finished processing secrets file:
✨ 2 secrets successfully created
💥 1 secrets successfully deleted
```

### `tail`

Start a log tailing session for a Worker

```sh
npx wrangler tail [WORKER]
```

After starting `wrangler tail`, you will receive a live feed of console and exception logs for each request your Worker receives.

If your Worker has a high volume of traffic, the tail might enter sampling mode. This will cause some of your messages to be dropped and a warning to appear in your tail logs. To prevent messages from being dropped, add the options listed above to filter the volume of tail messages.

It may take up to 1 minute (60 seconds) for a tail to exit sampling mode after adding an option to filter tail messages.

If sampling persists after using options to filter messages, consider using instant logs (https://developers.cloudflare.com/logs/instant-logs/).

## Options / Props

### `init`

| Flag | Type | Description |
| --- | --- | --- |
| `NAME` | string, optional (default: name of working directory) | The name of the Workers project. This is both the directory name and `name` property in the generated Wrangler configuration. |
| `--yes` | boolean, optional | Answer yes to any prompts for new projects. |
| `--from-dash` | string, optional | Fetch a Worker initialized from the dashboard. This is done by passing the flag and the Worker name. `wrangler init --from-dash <WORKER_NAME>`. The `--from-dash` command will not automatically sync changes made to the dashboard after the command is used. Therefore, it is recommended that you continue using the CLI. |

### `dev`

| Flag | Type | Description |
| --- | --- | --- |
| `SCRIPT` | string | The path to an entry point for your Worker. Only required if your Wrangler configuration file does not include a `main` key (for example, `main = "index.js"`). |
| `--name` | string, optional | Name of the Worker. |
| `--config`, `-c` | string[], optional | Path(s) to Wrangler configuration file. If not provided, Wrangler will use the nearest config file based on your current working directory. You can provide multiple configuration files to run multiple Workers in one dev session like this: `wrangler dev -c ./wrangler.toml -c ../other-worker/wrangler.toml`. The first config will be treated as the *primary* Worker, which will be exposed over HTTP. The remaining config files will only be accessible via a service binding from the primary Worker. |
| `--no-bundle` | boolean (default: false), optional | Skip Wrangler's build steps. Particularly useful when using custom builds. Refer to Bundling for more information. |
| `--env` | string, optional | Perform on a specific environment. |
| `--compatibility-date` | string, optional | A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. |
| `--compatibility-flags`, `--compatibility-flag` | string[], optional | Flags to use for compatibility checks. |
| `--latest` | boolean (default: true), optional | Use the latest version of the Workers runtime. |
| `--ip` | string, optional | IP address to listen on, defaults to `localhost`. |
| `--port` | number, optional | Port to listen on. |
| `--inspector-port` | number, optional | Port for devtools to connect to. |
| `--routes`, `--route` | string[], optional | Routes to upload. For example: `--route example.com/*`. |
| `--host` | string, optional | Host to forward requests to, defaults to the zone of project. |
| `--local-protocol` | 'http'\|'https' (default: http), optional | Protocol to listen to requests on. |
| `--https-key-path` | string, optional | Path to a custom certificate key. |
| `--https-cert-path` | string, optional | Path to a custom certificate. |
| `--local-upstream` | string, optional | Host to act as origin in local mode, defaults to `dev.host` or route. |
| `--infer-origin-from-routes` | boolean (default: true), optional | Use the first configured route to infer the origin ( `request.url` and the `Host` header) seen by the Worker in local mode. Set to `false` to preserve the real local origin, for example `localhost:8787`, so that Host- or Origin-sensitive logic behaves the same as the actual local request. An explicit `--host`, `--local-upstream`, or `dev.host` takes precedence either way. |
| `--assets` | string, optional, beta | Folder of static assets to be served. Replaces Workers Sites. Visit assets for more information. |
| `--site` | string, optional, deprecated, use `--assets` | Folder of static assets for Workers Sites. Caution: Workers Sites is deprecated. Please use Workers Assets or Pages. |
| `--site-include` | string[], optional, deprecated | Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded. |
| `--site-exclude` | string[], optional, deprecated | Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded. |
| `--upstream-protocol` | 'http'\|'https' (default: https), optional | Protocol to forward requests to host on. |
| `--var` | key:value[], optional | Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker. For example, `--var "git_hash:'$(git rev-parse HEAD)'" "test:123"` makes the `git_hash` and `test` variables available in your Worker's `env`. This flag is an alternative to defining `vars` in your Wrangler configuration file. If defined in both places, this flag's values will be used. |
| `--define` | key:value[], optional | Array of `key:value` pairs to replace global identifiers in your code. For example, `--define "GIT_HASH:'$(git rev-parse HEAD)'"` will replace all uses of `GIT_HASH` with the actual value at build time. This flag is an alternative to defining `define` in your Wrangler configuration file. If defined in both places, this flag's values will be used. |
| `--tsconfig` | string, optional | Path to a custom `tsconfig.json` file. |
| `--minify` | boolean, optional | Minify the Worker. |
| `--persist-to` | string, optional | Specify directory to use for local persistence. |
| `--remote` | boolean (default: false), optional | Execute your Worker in a preview environment on Cloudflare. All bindings connect to remote resources. |
| `--tunnel` | boolean (default: false), optional | Expose your local dev server over a Cloudflare Tunnel. For more information, refer to Share a local dev server. |
| `--tunnel-name` | string, optional | Use an existing named Cloudflare Tunnel. Combine with `--tunnel` to open it automatically at startup. |
| `--test-scheduled` | boolean (default: false), optional | Exposes a `/cdn-cgi/local/scheduled` fetch route which will trigger a scheduled event (Cron Trigger) for testing during development. To simulate different cron patterns, a `cron` query parameter can be passed in: `/cdn-cgi/local/scheduled?cron=*+*+*+*+*`. |
| `--log-level` | 'debug'\|'info'\|'log'\|'warn'\|'error\|'none' (default: log), optional | Specify Wrangler's logging level. |
| `--show-interactive-dev-session` | boolean (default: true if the terminal supports interactivity), optional | Show the interactive dev session. |
| `--alias` | Array<string> | Specify modules to alias using module aliasing. |
| `--types` | boolean (default: false), optional | Generate types from your Worker configuration. |
| `--local` | boolean (default: false), optional | Run in local mode. In this mode: the Worker code is running locally on your machine; all remote bindings are disabled, which behaves exactly as if they were configured with `remote: false`. |

### `deploy`

| Flag | Type | Description |
| --- | --- | --- |
| `PATH` | string | A path specific what needs to be deployed, this can either be: the path to an entry point for your Worker (only required if your Wrangler configuration file does not include a `main` key, for example `main = "index.js"`); or the path to an assets directory for the deployment of a static site (overrides the eventual `assets` configuration in your Wrangler configuration file; equivalent to the `--assets` option listed below; note: this option currently only works only in interactive mode, so not in CI systems). |
| `--name` | string, optional | Name of the Worker. |
| `--no-bundle` | boolean (default: false), optional | Skip Wrangler's build steps. Particularly useful when using custom builds. Refer to Bundling for more information. |
| `--env` | string, optional | Perform on a specific environment. Note: If you're using the Cloudflare Vite plugin, you select the environment at dev or build time via the `CLOUDFLARE_ENV` environment variable rather than the `--env` flag. Otherwise, environments are defined in your Worker config file as usual. |
| `--outdir` | string, optional | Path to directory where Wrangler will write the bundled Worker files. |
| `--compatibility-date` | string, optional | A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. |
| `--compatibility-flags`, `--compatibility-flag` | string[], optional | Flags to use for compatibility checks. |
| `--latest` | boolean (default: true), optional | Use the latest version of the Workers runtime. |
| `--assets` | string, optional, beta | Folder of static assets to be served. Replaces Workers Sites. Visit assets for more information. |
| `--site` | string, optional, deprecated, use `--assets` | Folder of static assets for Workers Sites. Caution: Workers Sites is deprecated. Please use Workers Assets or Pages. |
| `--site-include` | string[], optional, deprecated | Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded. |
| `--site-exclude` | string[], optional, deprecated | Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded. |
| `--var` | key:value[], optional | Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker. For example, `--var git_hash:$(git rev-parse HEAD) test:123` makes the `git_hash` and `test` variables available in your Worker's `env`. This flag is an alternative to defining `vars` in your Wrangler configuration file. If defined in both places, this flag's values will be used. |
| `--define` | key:value[], optional | Array of `key:value` pairs to replace global identifiers in your code. For example, `--define GIT_HASH:$(git rev-parse HEAD)` will replace all uses of `GIT_HASH` with the actual value at build time. This flag is an alternative to defining `define` in your Wrangler configuration file. If defined in both places, this flag's values will be used. |
| `--triggers`, `--schedule`, `--schedules` | string[], optional | Cron schedules to attach to the deployed Worker. Refer to Cron Trigger Examples. |
| `--routes`, `--route` | string[], optional | Routes where this Worker will be deployed. For example: `--route example.com/*`. |
| `--domain` | string[], optional | Custom domains where this Worker will be deployed. For example: `--domain example.com`. |
| `--tsconfig` | string, optional | Path to a custom `tsconfig.json` file. |
| `--minify` | boolean, optional | Minify the bundled Worker before deploying. |
| `--dry-run` | boolean (default: false), optional | Compile a project without actually deploying to live servers. Combined with `--outdir`, this is also useful for testing the output of `npx wrangler deploy`. It also gives developers a chance to upload our generated sourcemap to a service like Sentry, so that errors from the Worker can be mapped against source code, but before the service goes live. |
| `--keep-vars` | boolean (default: false), optional | It is recommended best practice to treat your Wrangler developer environment as a source of truth for your Worker configuration, and avoid making changes via the Cloudflare dashboard. If you change your environment variables in the Cloudflare dashboard, Wrangler will override them the next time you deploy. If you want to disable this behaviour set `keep-vars` to `true`. Secrets are never deleted by a deployment whether this flag is true or false. |
| `--secrets-file` | string, optional | Path to a file containing secrets to upload alongside the deployment. Accepts JSON or `.env` format — the same formats used by `wrangler secret bulk`. Existing secrets not included in the file are preserved from the previous version. Refer to Secrets — Upload secrets alongside code for more details. |
| `--dispatch-namespace` | string, optional | Specify the Workers for Platforms dispatch namespace to upload this Worker to. |
| `--metafile` | string, optional | Specify a file to write the build metadata from esbuild to. If flag is used without a path string, this defaults to `bundle-meta.json` inside the directory specified by `--outdir`. This can be useful for understanding the bundle size. |
| `--containers-rollout` | immediate \| gradual \| none, optional | Rollout mode for Containers on this deploy. `gradual` (default) uses `rollout_step_percentage`. `immediate` uses one 100% step (not a simultaneous restart of every container instance). `none` skips container image and instance updates. |
| `--strict` | boolean (default: false), optional | Turns on strict mode for the deployment command, meaning that the command will be more defensive and prevent deployments which could introduce potential issues. In particular, this mode prevents deployments if the deployment would potentially override remote settings in non-interactive environments. |
| `--tag` | string, optional | A tag for this Worker version. Matches the behavior of `wrangler versions upload --tag`. |
| `--message` | string, optional | A descriptive message for this Worker version and deployment. Matches the behavior of `wrangler versions upload --message`. The message is also applied to the deployment. |
| `--temporary` | boolean, optional | Deploy with a temporary preview account when no Cloudflare credentials are available. Requires Wrangler 4.102.0 or later. Wrangler prints a claim URL that lets you claim the deployment within 60 minutes. This is intended for AI agents and other first-time deployment flows. If Wrangler can already use OAuth, `CLOUDFLARE_API_TOKEN`, or a global API key, this flag returns an error. |

### `preview`

| Flag | Type | Description |
| --- | --- | --- |
| `SCRIPT` | string | The path to an entry point for your Worker. Only required if your Wrangler configuration file does not include a `main` key (for example, `main = "index.js"`). |
| `--name` | string, optional | Name of the Preview. Defaults to the current git branch. |
| `--tag` | string, optional | A tag for this Preview deployment. |
| `--message` | string, optional | A descriptive message for this Preview deployment. |
| `--json` | boolean (default: false), optional | Return machine-readable output. |
| `--ignore-base-config` | boolean (default: false), optional | Only use settings from your Wrangler file, ignoring the Preview base config configured in the Cloudflare dashboard. |
| `--worker-name` | string, optional | Name of the Worker to target. Defaults to the name in your local Wrangler file. |

### `preview delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | string | — | Name of the Preview to delete (defaults to current git branch) |
| `--skip-confirmation` (alias `--y`) | boolean | false | Skip the confirmation prompt |
| `--worker-name` | string | — | Name of the Worker to target (defaults to the name in your local config file) |

### `preview secret put`

| Flag | Type | Description |
| --- | --- | --- |
| `<KEY>` | string (required) | The secret name to be accessible in the Worker |
| `--name` | string | Name of the Preview (defaults to current git branch) |
| `--message` | string | A descriptive message for this Preview deployment |
| `--tag` | string | A tag for this Preview deployment |
| `--worker-name` | string | Name of the Worker to target (defaults to the name in your local config file) |

### `preview secret delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<KEY>` | string (required) | — | The secret name to delete |
| `--name` | string | — | Name of the Preview (defaults to current git branch) |
| `--message` | string | — | A descriptive message for this Preview deployment |
| `--tag` | string | — | A tag for this Preview deployment |
| `--skip-confirmation` (alias `--y`) | boolean | false | Skip the confirmation prompt |
| `--worker-name` | string | — | Name of the Worker to target (defaults to the name in your local config file) |

### `preview secret list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | string | — | Name of the Preview (defaults to current git branch) |
| `--json` | boolean | false | Return output as JSON |
| `--worker-name` | string | — | Name of the Worker to target (defaults to the name in your local config file) |

### `preview secret bulk`

| Flag | Type | Description |
| --- | --- | --- |
| `[FILE]` | string | The file of key-value pairs to upload, as JSON or .env format |
| `--name` | string | Name of the Preview (defaults to current git branch) |
| `--message` | string | A descriptive message for this Preview deployment |
| `--tag` | string | A tag for this Preview deployment |
| `--worker-name` | string | Name of the Worker to target (defaults to the name in your local config file) |

### `preview base-config secret put`

| Flag | Type | Description |
| --- | --- | --- |
| `<KEY>` | string (required) | The secret name to be accessible in the Worker |
| `--worker-name` | string | Name of the Worker to target (defaults to the name in your local config file) |

### `preview base-config secret delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<KEY>` | string (required) | — | The secret name to delete |
| `--skip-confirmation` (alias `--y`) | boolean | false | Skip the confirmation prompt |
| `--worker-name` | string | — | Name of the Worker to target (defaults to the name in your local config file) |

### `preview base-config secret list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--worker-name` | string | — | Name of the Worker to target (defaults to the name in your local config file) |
| `--json` | boolean | false | Return output as JSON |

### `preview base-config secret bulk`

| Flag | Type | Description |
| --- | --- | --- |
| `[FILE]` | string | The file of key-value pairs to upload, as JSON or .env format |
| `--worker-name` | string | Name of the Worker to target (defaults to the name in your local config file) |

### `delete`

| Flag | Type | Description |
| --- | --- | --- |
| `SCRIPT` | string | The path to an entry point for your Worker. Only required if your Wrangler configuration file does not include a `main` key (for example, `main = "index.js"`). |
| `--name` | string, optional | Name of the Worker. |
| `--env` | string, optional | Perform on a specific environment. |
| `--dry-run` | boolean (default: false), optional | Do not actually delete the Worker. This is useful for testing the output of `wrangler delete`. |

### `setup`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--yes` (alias `--y`) | boolean | false | Answer "yes" to any prompts for configuring your project |
| `--build` | boolean | false | Run your project's build command once it has been configured |
| `--dry-run` | boolean | — | Runs the command without applying any filesystem modifications |

### `secret put` / `secret delete`

| Flag | Type | Description |
| --- | --- | --- |
| `<KEY>` | string (required) | The variable name to be accessible in the Worker |
| `--name` | string | Name of the Worker. If this is not specified, it will default to the name specified in your Wrangler config file. |

### `secret list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | string | — | Name of the Worker. If this is not specified, it will default to the name specified in your Wrangler config file. |
| `--format` | "json" \| "pretty" | json | The format to print the secrets in |

### `secret bulk`

| Flag | Type | Description |
| --- | --- | --- |
| `[FILE]` | string | The file of key-value pairs to create, update, or delete, as JSON in form {"key": "value", ...} or .env file in the form KEY=VALUE. Set a key to null in the JSON file to delete it. Deletion is not supported with .env files. If omitted, Wrangler expects to receive input from stdin rather than a file. |
| `--name` | string | Name of the Worker. If this is not specified, it will default to the name specified in your Wrangler config file. |

### `tail`

| Flag | Type | Description |
| --- | --- | --- |
| `[WORKER]` | string | Name or route of the worker to tail |
| `--format` | "json" \| "pretty" | The format of log entries |
| `--status` | "ok" \| "error" \| "canceled" | Filter by invocation status |
| `--header` | string | Filter by HTTP header |
| `--method` | string | Filter by HTTP method |
| `--sampling-rate` | number | Adds a percentage of requests to log sampling rate |
| `--search` | string | Filter by a text match in console.log messages |
| `--ip` | string | Filter by the IP address the request originates from. Use "self" to filter for your own IP |
| `--version-id` | string | Filter by Worker version |

## Notes

- Commands that the official page documents with the reduced global flag set (`init`, `dev`, `deploy`, `preview`, `delete`) list `--help`, `--config` (not supported by Pages), `--cwd`. The other commands accept the full global flags; see the global flags page.
- Deleting secrets by setting a key to `null` (`secret bulk`) requires wrangler version 4.97.0 or later and JSON format. Deletion is not supported with `.env` files.
- Docs inconsistency: the `deploy` `--var` / `--define` examples are unquoted (`--var git_hash:$(git rev-parse HEAD) test:123`) while the `dev` examples are quoted; the `dev` `--log-level` type list in the official page has an unbalanced quote (`'error|'none'`), kept verbatim.
- Worker runtime APIs (`fetch`, `scheduled`, `env`) belong to the cloudflare-workers skill; configuration keys (`vars`, `define`, `main`) belong to the configuration references.

## Related

- [Workers versions and deployments](./workers-versions.md)
- [Workers for Platforms](./workers-for-platforms.md)
- [Global flags](./global-flags.md)
