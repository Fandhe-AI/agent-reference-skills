---
source: https://developers.cloudflare.com/workers/wrangler/system-environment-variables/
---

# System Environment Variables

Local environment variables that change Wrangler's behavior. Set them via a `.env` file (recommended), inline (`WRANGLER_LOG="debug" npx wrangler deploy`), or the shell environment.

## Signature / Usage

```bash
CLOUDFLARE_ACCOUNT_ID=<YOUR_ACCOUNT_ID_VALUE>
CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN_VALUE>
CLOUDFLARE_EMAIL=<YOUR_EMAIL>
WRANGLER_SEND_METRICS=true
CLOUDFLARE_API_BASE_URL=https://api.cloudflare.com/client/v4
WRANGLER_LOG=debug
WRANGLER_LOG_PATH=../Desktop/my-logs/my-log-file.log
WRANGLER_BASIN_SQL_AUTH_TOKEN=<YOUR_R2_API_TOKEN_VALUE>
CLOUDFLARE_CF_FETCH_ENABLED=false
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CLOUDFLARE_ACCOUNT_ID` | `string` | Account ID for the Workers related account. |
| `CLOUDFLARE_API_TOKEN` | `string` | API token, for CI/CD and other automation. Overrides all auth profiles. |
| `CLOUDFLARE_API_KEY` | `string` | API key; older authentication method, used with `CLOUDFLARE_EMAIL`. |
| `CLOUDFLARE_EMAIL` | `string` | Account email; older method, used with `CLOUDFLARE_API_KEY`. |
| `CLOUDFLARE_ACCESS_CLIENT_ID` | `string` | Client ID of a Cloudflare Access Service Token, to authenticate with Access-protected domains in non-interactive environments. Must be set with `CLOUDFLARE_ACCESS_CLIENT_SECRET`; when both set, Wrangler uses the service token instead of launching `cloudflared access login`. |
| `CLOUDFLARE_ACCESS_CLIENT_SECRET` | `string` | Client Secret of the Access Service Token, used with `CLOUDFLARE_ACCESS_CLIENT_ID`. |
| `CLOUDFLARE_AUTH_USE_KEYRING` | `boolean` | `true`/`false`, default unset. Overrides the persistent preference set by `wrangler login --use-keyring` / `--no-use-keyring` for one invocation. `true`: stores OAuth credentials in an encrypted file with the key held in the OS keychain, errors if the keychain is unavailable. `false`: legacy plaintext TOML file even if the preference is enabled. |
| `CLOUDFLARE_ENV` | `string` | Environment for Wrangler commands (no `--env` needed). `--env` takes precedence. |
| `NODE_ENV` | `string` | Sets `process.env.NODE_ENV` in Worker code. Defaults to `"development"` for `wrangler dev` and `"production"` for `wrangler deploy` and `wrangler versions upload`. |
| `WRANGLER_SEND_METRICS` | `boolean` | Default `true`. Whether Wrangler may send anonymous usage data. |
| `WRANGLER_SEND_ERROR_REPORTS` | `boolean` | Default `undefined`. Whether Wrangler may send non-user error reports; if undefined, Wrangler asks each time. |
| `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` | `string` | Local connection string for Hyperdrive in local development, e.g. `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_PROD_DB="postgres://user:password@127.0.0.1:5432/testdb"`. |
| `CLOUDFLARE_API_BASE_URL` | `string` | Default `"https://api.cloudflare.com/client/v4"`. |
| `WRANGLER_LOG` | `string` | `"none"`, `"error"`, `"warn"`, `"info"`, `"log"`, `"debug"`; case-insensitive; default `"log"`; invalid falls back to default. |
| `WRANGLER_LOG_PATH` | `string` | File or directory path for debug logs. Ending in `.log` means a single file; otherwise a directory with timestamped files. |
| `WRANGLER_LOG_SANITIZE` | `boolean` | Default `true`. Sanitize sensitive information (API tokens, emails, account IDs) from console/file logs. |
| `FORCE_COLOR` | `string` | Set to `0` to disable colorised output. |
| `WRANGLER_HTTPS_KEY_PATH` | `string` | Custom HTTPS certificate key path for `wrangler dev`, used with `WRANGLER_HTTPS_CERT_PATH`. |
| `WRANGLER_HTTPS_CERT_PATH` | `string` | Custom HTTPS certificate path for `wrangler dev`, used with `WRANGLER_HTTPS_KEY_PATH`. |
| `DOCKER_HOST` | `string` | Socket path for local Container development when auto-detection fails. |
| `WRANGLER_BASIN_SQL_AUTH_TOKEN` | `string` | API token for executing queries with Basin SQL. |
| `WRANGLER_OUTPUT_FILE_PATH` | `string` | File path for ND-JSON output of deployments, version uploads and errors. Takes precedence over `WRANGLER_OUTPUT_FILE_DIRECTORY`. |
| `WRANGLER_OUTPUT_FILE_DIRECTORY` | `string` | Directory in which Wrangler creates a randomly-named file `wrangler-output-<timestamp>-<random>.json`. |
| `WRANGLER_CACHE_DIR` | `string` | Custom Wrangler cache directory; overrides `node_modules/.cache/wrangler` (e.g. Yarn PnP). |
| `MINIFLARE_CACHE_DIR` | `string` | Custom directory for Miniflare's `cf.json` cache; overrides `node_modules/.mf`. |
| `CLOUDFLARE_CF_FETCH_ENABLED` | `string` | Whether Miniflare fetches `cf.json` (`Request.cf` properties) during local dev. `"false"` or `"0"` disables it and uses fallback data; no `node_modules/.mf/cf.json` is created. Default `"true"`. Explicit `cf` option in the Miniflare API takes precedence. |
| `CLOUDFLARE_CF_FETCH_PATH` | `string` | Custom path for caching `cf.json`. `CLOUDFLARE_CF_FETCH_ENABLED=false` takes precedence over it; the Miniflare `cf` option takes precedence over both. |

### Output file entries

Each line has `timestamp` and `type`:

```json
{"type":"wrangler-session","version":1,"wrangler_version":"3.78.0","command_line_args":["deploy"],"log_file_path":"/path/to/logs/wrangler-2024-11-03_12-00-00_abc.log","timestamp":"2024-11-03T12:00:00.000Z"}
{"type":"deploy","version":1,"worker_name":"my-worker","worker_tag":"abc123def456","version_id":"v1-abc123","targets":["https://my-worker.example.workers.dev"],"worker_name_overridden":false,"wrangler_environment":"production","timestamp":"2024-11-03T12:00:05.000Z"}
```

Other types: `version-upload`, `version-deploy`, `pages-deploy`, `command-failed`.

## Notes

- To set different variables per environment, create `.env.<environment-name>`; with `--env <name>` that file is loaded instead of `.env` (not merged).
- During local development, `.env` values are also loaded into the Worker's `env` object (e.g. `env.API_HOST`).
- Deprecated variables: `CF_ACCOUNT_ID`, `CF_API_TOKEN`, `CF_API_KEY`, `CF_EMAIL`, `CF_API_BASE_URL`; use the `CLOUDFLARE_*` equivalents.

## Related

- [secrets.md](./secrets.md)
- [profiles.md](./profiles.md)
- [environments.md](./environments.md)
