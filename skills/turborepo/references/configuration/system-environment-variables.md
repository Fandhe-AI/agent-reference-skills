# System Environment Variables

## Options / Props

### Configuration

| Variable | Description |
|---|---|
| `TURBO_API` | Base URL of the Remote Cache service |
| `TURBO_BINARY_PATH` | Manually specify the location of the turbo binary |
| `TURBO_CACHE` | Controls cache read/write permissions |
| `TURBO_CACHE_DIR` | Cache storage directory |
| `TURBO_CACHE_MAX_AGE` | Maximum retention period for cache entries (e.g. `7d`, `24h`) |
| `TURBO_CACHE_MAX_SIZE` | Maximum size of the local cache (oldest entries are evicted once exceeded) |
| `TURBO_ENV_MODE` | Sets the environment mode (`strict` / `loose`), like the `--env-mode` flag |
| `TURBO_ROOT_TURBO_JSON` | Use the `turbo.json` at the provided path instead of the one at the repository root |
| `FORCE_COLOR` | Force colored output in terminal logs |

### CI / Platform

| Variable | Description |
|---|---|
| `TURBO_CI_VENDOR_ENV_KEY` | Environment variable prefix to exclude from Framework Inference |
| `TURBO_PLATFORM_ENV` | CSV of environment variable keys set in the CI environment |
| `TURBO_PLATFORM_ENV_DISABLED` | Disables matching against platform configuration |

### Cache / Performance

| Variable | Description |
|---|---|
| `TURBO_FORCE` | Bypasses the cache and re-runs tasks |
| `TURBO_REMOTE_ONLY` | Ignores the local cache |
| `TURBO_REMOTE_CACHE_READ_ONLY` | Allows read-only access to the Remote Cache |
| `TURBO_REMOTE_CACHE_SIGNATURE_KEY` | Sign artifacts with a secret key. Must be at least 32 bytes when `futureFlags.longerSignatureKey` is enabled |
| `TURBO_REMOTE_CACHE_TIMEOUT` | Download timeout in seconds |
| `TURBO_REMOTE_CACHE_UPLOAD_TIMEOUT` | Upload timeout in seconds |
| `TURBO_PREFLIGHT` | Enables preflight requests |

### Authentication

| Variable | Description |
|---|---|
| `TURBO_TOKEN` | Bearer token for Remote Cache access |
| `TURBO_TEAM` | Account/team slug |
| `TURBO_TEAMID` | Account ID |
| `TURBO_LOGIN` | Login URL for the Remote Cache service |

### Logging / UI

| Variable | Description |
|---|---|
| `TURBO_LOG_FILE` | Write structured JSON logs to a file: `1` / `true` for the default `.turbo/logs/<timestamp>.json`, or a custom path (same as `--log-file`) |
| `TURBO_LOG_ORDER` | `grouped` or `default` |
| `TURBO_PRINT_VERSION_DISABLED` | Suppresses version output at runtime |
| `TURBO_UI` | Enables TUI when `true` / `1`, disables when `false` / `0` |
| `TURBO_TUI_SCROLLBACK_LENGTH` | Lines kept in scrollback per task in the terminal UI (default `2048`) |
| `TURBO_WATCH_STARTUP_TIMEOUT` | Seconds `turbo watch` waits for the file watcher to become ready before failing (default `120`) |
| `TURBO_RUN_SUMMARY` | Generates a Run Summary report |
| `TURBO_CONCURRENCY` | Number of parallel executions |

### Source Control

| Variable | Description |
|---|---|
| `TURBO_SCM_BASE` | Base reference for `--affected` |
| `TURBO_SCM_HEAD` | Head reference for `--affected` |

### Automatically Provided During Task Execution

| Variable | Description |
|---|---|
| `TURBO_HASH` | Hash value of the currently running task |
| `TURBO_IS_TUI` | `true` when the TUI is in use |
| `TURBO_IS_MFE` | Set to the port when `microfrontends.json` is in use |

### Other

| Variable | Description |
|---|---|
| `TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK` | Disables the package manager declaration check in root `package.json` (`true` or `1`) |
| `TURBO_DOWNLOAD_LOCAL_ENABLED` | Allows installation of the correct local version |
| `TURBO_GLOBAL_WARNING_DISABLED` | Suppresses the warning when no local version is detected |
| `TURBO_NO_UPDATE_NOTIFIER` | Hides the update notification |
| `TURBO_TELEMETRY_MESSAGE_DISABLED` | Suppresses the telemetry notice |
| `TURBO_SSO_LOGIN_CALLBACK_PORT` | SSO callback port (default: 9789) |
