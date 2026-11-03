---
source: https://developers.cloudflare.com/workers/wrangler/commands/workers/
---

# Local Development

Run a Worker locally with `wrangler dev`, use remote bindings, share the dev server, and manage local data. Full flag table: see [../references/commands/README.md](../references/commands/README.md) and [../references/local-development/README.md](../references/local-development/README.md).

## Start the local dev server

```sh
npx wrangler dev
```

Requests go to `localhost:8787`. The Worker runs in a local `workerd` process, which is not a hardened sandbox; only run code you trust.

## Run in a specific environment

```sh
npx wrangler dev -e=dev
```

Or select it with `CLOUDFLARE_ENV=staging`. When both are set, `--env` takes precedence.

## Choose port, IP, and protocol (flag table)

| Flag | Description (from the docs) |
| --- | --- |
| `--port` `number` | Port to listen on. |
| `--ip` `string` | IP address to listen on, defaults to `localhost`. |
| `--inspector-port` `number` | Port for devtools to connect to. |
| `--local-protocol` `'http'\|'https'` | Protocol to listen to requests on (default: http). |
| `--https-key-path` `string` | Path to a custom certificate key. |
| `--https-cert-path` `string` | Path to a custom certificate. |

Pass these to `npx wrangler dev`.

## Inject variables and build-time defines

```sh
npx wrangler dev --var "git_hash:'$(git rev-parse HEAD)'" "test:123"
npx wrangler dev --define "GIT_HASH:'$(git rev-parse HEAD)'"
```

## Test Cron Triggers locally

```sh
npx wrangler dev --test-scheduled
```

Then request `/cdn-cgi/local/scheduled` (add `?cron=*+*+*+*+*` to simulate a pattern).

## Run in local-only mode (disable remote bindings)

```sh
npx wrangler dev --local
```

## Run with remote bindings

```jsonc
{
	"name": "my-worker",
	"r2_buckets": [
		{
			"bucket_name": "screenshots-bucket",
			"binding": "screenshots_bucket",
			"remote": true,
		},
	],
}
```

```sh
npx wrangler dev
```

The Worker still executes locally; only the marked bindings connect to the deployed resource. Needs `compatibility_date` in the real config.

> **Warning**: writes, deletes, and updates through remote bindings change real (preview or production) data and incur normal usage charges.

## Run against remote bindings of a staging environment

```sh
npx wrangler dev -e staging
```

With `[env.staging]` bindings marked `remote = true`, calls use the staging resources while code runs locally.

## Run entirely on Cloudflare (legacy remote dev)

```sh
npx wrangler dev --remote
```

Uploads the Worker to a temporary preview environment. Slower iteration; not supported by the Vite plugin; Python Workers do not support `--remote`.

## Run multiple Workers in one session

```sh
npx wrangler dev -c ./wrangler.toml -c ../other-worker/wrangler.toml
```

The first config is the primary Worker exposed over HTTP; the others are reachable via service bindings.

## Share the dev server through a tunnel

```sh
npx wrangler dev --tunnel
```

Or press `[t]` during `wrangler dev`. For a named tunnel:

```sh
npx wrangler dev --tunnel-name=my-tunnel
```

> **Warning**: anyone with the tunnel URL can reach your dev server and any remote bindings it uses.

## Change the local data directory

```sh
npx wrangler dev --persist-to <DIRECTORY>
```

Default is `.wrangler/state`. Repeat the same `--persist-to` on other Wrangler commands that modify local data.

## Reset local data

Deleting the `.wrangler/state` folder resets your local environment; Miniflare recreates it the next time you run your `dev` command. You can also delete specific sub-folders for a targeted clean-up.

> **Warning**: this discards all local KV / R2 / D1 / Durable Object data for the project.

## Populate local KV, R2, D1 data

KV, R2, and D1 `--local` seeding commands belong to the cloudflare-storage skill; see its scripts.

## Generate types while running dev

```sh
npx wrangler dev --types
```

## Connect to Access-protected Workers (service token)

```sh
export CLOUDFLARE_ACCESS_CLIENT_ID=<CLIENT_ID>
export CLOUDFLARE_ACCESS_CLIENT_SECRET=<CLIENT_SECRET>
```

Needed for remote bindings in non-interactive environments.

## Set a Hyperdrive local connection string

```sh
CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>="postgres://user:password@127.0.0.1:5432/testdb" npx wrangler dev
```

The variable name uses the binding name (documented on the system environment variables page; the inline-env form follows that page's inline example).
