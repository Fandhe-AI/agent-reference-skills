---
source: https://www.electronjs.org/docs/latest/api/command-line-switches
---

# Supported Command Line Switches

Command line switches supported by Electron. Append them with `app.commandLine.appendSwitch` in your app's main script before the `ready` event of `app` is emitted.

## Signature / Usage

```js
const { app } = require('electron')

app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## Electron CLI Flags

| Flag | Description |
|------|-------------|
| `--auth-server-whitelist=url` | Comma-separated servers for which integrated authentication is enabled (`*` prefix matches suffix; without it the URL must match exactly), e.g. `'*example.com, *foobar.com, *baz'`. |
| `--auth-negotiate-delegate-whitelist=url` | Comma-separated servers for which delegation of user credentials is required. |
| `--disable-ntlm-v2` | Disables NTLM v2 for POSIX platforms, no effect elsewhere. |
| `--disable-http-cache` | Disables the disk cache for HTTP requests. |
| `--disable-http2` | Disable HTTP/2 and SPDY/3.1 protocols. |
| `--disable-geolocation` _macOS_ | Disables the Geolocation API; permission requests are denied internally regardless of a `session.setPermissionRequestHandler` decision. Only implemented on macOS. |
| `--disable-renderer-backgrounding` | Prevents Chromium from lowering the priority of invisible pages' renderer processes. Global to all renderers. |
| `--disk-cache-size=size` | Maximum disk space for the disk cache, in bytes. |
| `--enable-logging[=file]` | Prints Chromium's logging to stderr (or a log file). Same effect as `ELECTRON_ENABLE_LOGGING`. `--enable-logging=file` saves to `--log-file=...` or `electron_debug.log` in the user-data directory. On Windows, child-process logs cannot go to stderr; file logging is most reliable. |
| `--force-fieldtrials=trials` | Field trials to be forcefully enabled or disabled, e.g. `WebRTC-Audio-Red-For-Opus/Enabled/`. |
| `--host-rules=rules` _Deprecated_ | Comma-separated rules controlling hostname mapping (e.g. `MAP * 127.0.0.1`); use `--host-resolver-rules` instead. Applies to the endpoint host in a net request (TCP connect, host resolver, proxy CONNECT / SOCKS endpoint). |
| `--host-resolver-rules=rules` | Same rule syntax as above; applies only to the host resolver. |
| `--ignore-certificate-errors` | Ignores certificate related errors. |
| `--ignore-connections-limit=domains` | Ignore the connections limit for `domains` separated by `,`. |
| `--js-flags=flags` | Flags passed to V8; must be passed on startup to take effect in the main process. |
| `--lang` | Set a custom locale. |
| `--log-file=path` | With `--enable-logging`, logs go to this path (parent directory must exist). `ELECTRON_LOG_FILE` is equivalent; the switch takes precedence. |
| `--log-net-log=path` | Saves net log events to `path`. |
| `--log-level=N` | Verbosity of logging with `--enable-logging`; one of Chrome's LogSeverities. Controls `LOG()` messages while `--v` and `--vmodule` control `VLOG()`. |
| `--no-proxy-server` | Don't use a proxy server; overrides other proxy flags. |
| `--no-sandbox` | Disables the Chromium sandbox; forces renderer and helper processes to run un-sandboxed. Should only be used for testing. |
| `--no-stdio-init` | Disable stdio initialization during node initialization (avoids crash when the nul device is disabled on Windows). |
| `--proxy-bypass-list=hosts` | Semi-colon-separated hosts to bypass the proxy; only effective together with `--proxy-server`. |
| `--proxy-pac-url=url` | Uses the PAC script at `url`. |
| `--proxy-server=address:port` | Use a specified proxy server (overrides system setting). Affects HTTP, HTTPS and WebSocket requests; not all proxies support HTTPS/WebSocket; username/password authentication in the proxy URL is not supported. |
| `--remote-debugging-port=port` | Enables remote debugging over HTTP on `port`. |
| `--v=log_level` | Default maximal active V-logging level (0 default); only works with `--enable-logging`. |
| `--vmodule=pattern` | Per-module maximal V-logging levels overriding `--v`, e.g. `my_module=2,foo*=3`; only works with `--enable-logging`. |
| `--force_high_performance_gpu` | Force the discrete GPU when multiple GPUs are available. |
| `--force_low_power_gpu` | Force the integrated GPU when multiple GPUs are available. |
| `--xdg-portal-required-version=version` | Minimum XDG portal implementation version for the portal backend for file dialogs on Linux; falls back to gtk or kde otherwise. Default is `3`. |

```sh
electron --js-flags="--trace-opt --trace-deopt" your-app
```

## Node.js Flags

Electron supports some Node.js CLI flags. Passing unsupported switches when not running with `ELECTRON_RUN_AS_NODE` has no effect.

| Flag | Description |
|------|-------------|
| `--inspect-brk[=[host:]port]` | Activate inspector and break at start of user script. Default `127.0.0.1:9229`. Aliased to `--debug-brk`. |
| `--inspect-brk-node[=[host:]port]` | Break at start of the first internal JavaScript script executed when the inspector is available. |
| `--inspect-port=[host:]port` | Host:port used when the inspector is activated (e.g. via SIGUSR1). Aliased to `--debug-port`. |
| `--inspect[=[host:]port]` | Activate inspector (Chrome DevTools Protocol). Default `127.0.0.1:9229`. Aliased to `--debug`. |
| `--inspect-publish-uid=stderr,http` | Ways of inspector web socket url exposure (default: stderr and `/json/list`). |
| `--experimental-network-inspection` | DevTools network inspector events for requests made by the Node.js `http` / `https` modules. |
| `--experimental-inspector-network-resource` | Resolve source maps over the network via the Node.js inspector. The inspector will make network requests to URLs in source maps; be mindful in environments with internal network access. |
| `--no-deprecation` | Silence deprecation warnings. |
| `--throw-deprecation` | Throw errors for deprecations. |
| `--trace-deprecation` | Print stack traces for deprecations. |
| `--trace-warnings` | Print stack traces for process warnings (including deprecations). |
| `--dns-result-order=order` | Default `verbatim` parameter of `dns.lookup()` / `dnsPromises.lookup()`: `ipv4first` (false) or `verbatim` (true). Default is `verbatim`; `dns.setDefaultResultOrder()` has higher priority. |
| `--diagnostic-dir=directory` | Directory for Node.js diagnostic output files (default: cwd). |
| `--no-experimental-global-navigator` | Disable the Navigator API on the Node.js global scope. |
| `--experimental-transform-types` | Enables transformation of TypeScript-only syntax into JavaScript. |

## Chromium Flags

- There is no documented list of all Chromium switches. Use `about://flags` (enable a flag, then read the command-line arguments at `about://version` between `--flag-switches-begin` and `--flag-switches-end`); most flags are part of `--enable-features=`, some are standalone (e.g. `--enable-experimental-web-platform-features`). Chromium's flag metadata (`flag-metadata.json`) lists many flags but includes expired / non-functional ones. Ensure the Chromium version of the browser you cross-reference matches the one in Electron.
- `AlwaysLogLOAFURL`: script attribution for `long-animation-frame` `PerformanceObserver` events for non-http(s), non-data, non-blob URLs.
- `SpareRendererForSitePerProcess`: keeps a spare renderer process running so new windows or navigations needing a new process do not wait. Electron starts one when the default session is created, for the first sandboxed window that uses it. Only windows with sandboxed `webPreferences` and none of `additionalArguments`, `enableBlinkFeatures`, `disableBlinkFeatures`, `experimentalFeatures`, `offscreen` or (macOS) `scrollBounce` can use it.

## Related

- [CommandLine](./command-line.md)
- [Environment Variables](./environment-variables.md)
