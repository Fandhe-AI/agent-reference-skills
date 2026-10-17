---
source: https://www.electronjs.org/docs/latest/api/environment-variables
---

# Environment Variables

Control application configuration and behavior without changing code. Certain behaviors are controlled by environment variables because they are initialized earlier than command line flags and app code.

## Signature / Usage

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## Production Variables

| Variable | Description |
|----------|-------------|
| `NODE_OPTIONS` | A subset of Node's `NODE_OPTIONS` (all except those conflicting with Chromium's BoringSSL). Unsupported: `--use-bundled-ca`, `--force-fips`, `--enable-fips`, `--openssl-config`, `--use-openssl-ca`. Disallowed in packaged apps except `--max-http-header-size` and `--http-parser`. Ignored if the `nodeOptions` fuse is disabled. |
| `NODE_EXTRA_CA_CERTS` | See the Node.js cli docs. Ignored if the `nodeOptions` fuse is disabled. |
| `GOOGLE_API_KEY` | Geolocation requires Google Cloud Platform's geolocation webservice. Set `process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'` in the main process before opening windows that make geolocation requests. The key may need the geolocation service enabled in the API library and a Billing Account attached to the project. |
| `ELECTRON_NO_ASAR` | Disables ASAR support. Only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`. |
| `ELECTRON_RUN_AS_NODE` | Starts the process as a normal Node.js process; Node.js cli options can be passed except `--openssl-config`, `--use-bundled-ca`, `--use-openssl-ca`, `--force-fips`, `--enable-fips` (Electron uses BoringSSL). Ignored if the `runAsNode` fuse is disabled. |
| `ELECTRON_NO_ATTACH_CONSOLE` _Windows_ | Don't attach to the current console session. |
| `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_ | Don't use the global menu bar on Linux. |
| `ELECTRON_TRASH` _Linux_ | Trash implementation; default `gio`. Options: `gvfs-trash`, `trash-cli`, `kioclient5`, `kioclient`. |

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

## Development Variables

| Variable | Description |
|----------|-------------|
| `ELECTRON_ENABLE_LOGGING` | Prints Chromium's internal logging to the console; same as `--enable-logging`. |
| `ELECTRON_LOG_FILE` | File destination for Chromium's internal logging; same as `--log-file`. |
| `ELECTRON_DEBUG_NOTIFICATIONS` | Extra logs for `Notification` lifecycles on macOS (created, displayed, activated, replied to). |
| `ELECTRON_DEBUG_MSIX_UPDATER` | Extra logs for MSIX updater operations on Windows (package updates, registration, restart registration). |
| `ELECTRON_DEBUG_DRAGGABLE_REGIONS` _Experimental_ | Visualizes and logs the draggable regions of every window (translucent red rectangles; changed parts tinted yellow) to debug custom title bars. Only takes effect when `app.isPackaged` is `false`. Logging must be enabled (e.g. `ELECTRON_ENABLE_LOGGING`) for the logs to show. Not part of the formal API; may change or be removed in any release. |
| `ELECTRON_LOG_ASAR_READS` | Logs ASAR read offset and file path to the system `tmpdir` (usable by the ASAR module to optimize file ordering). Read once at process start, so set it in the launching environment. |
| `ELECTRON_ENABLE_STACK_DUMPING` | Prints the stack trace to the console on crash. Does not work if `crashReporter` is started. |
| `ELECTRON_DEFAULT_ERROR_MODE` _Windows_ | Shows the Windows crash dialog on crash. Does not work if `crashReporter` is started. |
| `ELECTRON_OVERRIDE_DIST_PATH` | Makes the `electron` command use the specified Electron build instead of the one downloaded by `npm install`. |
| `ELECTRON_INSTALL_PLATFORM` | Overrides the platform used by the `electron` package during install (e.g. `darwin`). |
| `ELECTRON_INSTALL_ARCH` | Overrides the architecture used during install (e.g. `arm64`); does not work under Rosetta. |

```sh
ELECTRON_INSTALL_PLATFORM=darwin npm install
```

## Notes

- Warning: `ELECTRON_DEBUG_DRAGGABLE_REGIONS` is experimental; its behavior, output, or existence may change or be removed without warning.
- The `nodeOptions` and `runAsNode` fuses are documented in the Fuses tutorial (security-performance category).

## Related

- [Supported Command Line Switches](./command-line-switches.md)
- [Installation](./installation.md)
