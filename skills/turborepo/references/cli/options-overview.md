# Options overview

## Signature / Usage

Three ways to manage `turbo` behavior, in order of precedence: CLI flags > System Environment Variables > `turbo.json` configuration. Where a flag is provided, it overrides the same setting from an environment variable or `turbo.json`.

Recommended usage: `turbo.json` for defaults, environment variables for per-environment overrides, flags for per-invocation overrides.

```bash
TURBO_CACHE_DIR=.cache/turbo turbo run build --cache-dir=./my-cache   # flag wins
```

## Options / Props

`-` means no equivalent in that column.

### Caching

| Behavior | Flag | Environment variable | turbo.json |
|---|---|---|---|
| Force tasks to run | `--force` | `TURBO_FORCE` | `cache` |
| Remote Cache timeout | `--remote-cache-timeout` | `TURBO_REMOTE_CACHE_TIMEOUT` | `remoteCache.timeout` |
| Remote Cache upload timeout | - | `TURBO_REMOTE_CACHE_UPLOAD_TIMEOUT` | `remoteCache.uploadTimeout` |
| Cache signature key | - | `TURBO_REMOTE_CACHE_SIGNATURE_KEY` | `signature` |
| Preflight request | `--preflight` | `TURBO_PREFLIGHT` | `remoteCache.preflight` |
| Remote Cache base URL | - | `TURBO_API` | `remoteCache.apiUrl` |
| Cache sources | `--cache` | `TURBO_CACHE` | - |
| Local cache directory | `--cache-dir` | `TURBO_CACHE_DIR` | `cacheDir` |
| Local cache max age | - | `TURBO_CACHE_MAX_AGE` | `cacheMaxAge` |
| Local cache max size | - | `TURBO_CACHE_MAX_SIZE` | `cacheMaxSize` |

### Messages

| Behavior | Flag | Environment variable | turbo.json |
|---|---|---|---|
| Disable version print | - | `TURBO_PRINT_VERSION_DISABLED` | - |
| Disable telemetry message | - | `TURBO_TELEMETRY_MESSAGE_DISABLED` | - |
| Disable global `turbo` warning | - | `TURBO_GLOBAL_WARNING_DISABLED` | - |
| No update notifier | - | `TURBO_NO_UPDATE_NOTIFIER` | `noUpdateNotifier` |

### Task running and logs

| Behavior | Flag | Environment variable | turbo.json |
|---|---|---|---|
| Terminal UI | `--ui` | `TURBO_UI` | `ui` |
| Run affected tasks | `--affected` | - | - |
| Disable package manager check | `--dangerously-disable-package-manager-check` | `TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK` | `dangerouslyDisablePackageManagerCheck` |
| Affected base ref | - | `TURBO_SCM_BASE` | - |
| Affected head ref | - | `TURBO_SCM_HEAD` | - |
| Only run directly specified tasks | `--only` | - | - |
| Task concurrency | `--concurrency` | `TURBO_CONCURRENCY` | - |
| Task log order | `--log-order` | `TURBO_LOG_ORDER` | - |
| Current working directory | `--cwd` | - | - |
| Streamed logs prefix | `--log-prefix` | - | - |
| Task logs output level | `--output-logs` | - | `outputLogs` |
| Global inputs | `--global-deps` | - | `globalDependencies` |
| Terminal colors | `--color` | `FORCE_COLOR` | - |

### Environment variables

| Behavior | Flag | Environment variable | turbo.json |
|---|---|---|---|
| Environment variable mode | `--env-mode` | - | `envMode` |
| Vendor environment variables | - | `TURBO_CI_VENDOR_ENV_KEY` | - |
| Framework variable exceptions | `--framework-inference` | - | - |

### Debugging outputs

| Behavior | Flag | Environment variable | turbo.json |
|---|---|---|---|
| Run Summaries | `--summarize` | `TURBO_RUN_SUMMARY` | - |
| Graph visualization | `--graph` | - | - |
| Dry run | `--dry` | - | - |

### Authentication

| Behavior | Flag | Environment variable | turbo.json |
|---|---|---|---|
| Login URL | - | `TURBO_LOGIN` | `remoteCache.loginUrl` |
| Team name (multi-team Remote Cache) | `--team` | `TURBO_TEAM` | - |
| Team ID (multi-team Remote Cache) | - | `TURBO_TEAMID` | - |
| Authentication token | `--token` | `TURBO_TOKEN` | - |

### Other

| Behavior | Flag | Environment variable | turbo.json |
|---|---|---|---|
| Binary path | - | `TURBO_BINARY_PATH` | - |
| Download local `turbo` | - | `TURBO_DOWNLOAD_LOCAL_ENABLED` | - |
| Daemon (deprecated) | `--daemon` / `--no-daemon` | - | `daemon` |

## Notes

- This page is the flag / `turbo.json` key / environment variable mapping; flag details live in `run.md`, key details in the `turbo.json` reference, and variable details in the system environment variables reference.
- In the official table the `--remote-cache-timeout` flag row links to the `remoteCache.timeout` configuration entry.

## Related

- [turbo run](./run.md)
- [Other commands](./other-commands.md)
- [turbo.json](../configuration/turbo-json.md)
- [System environment variables](../configuration/system-environment-variables.md)
