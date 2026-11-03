---
source: https://developers.cloudflare.com/workers/configuration/compatibility-flags/
---

# Compatibility flags: Node.js

Flags that control Node.js compatibility (`nodejs_compat`), Node.js built-in module availability, and related globals. Rows follow the order on the source page, which is roughly (not strictly) newest first by default date.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag.

```jsonc
{
	"compatibility_flags": [
		"nodejs_compat"
	]
}
```

```toml
compatibility_flags = [ "nodejs_compat" ]
```

## Options / Props

Core and behavior flags.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `remove_nodejs_compat_eol_v24` | `add_nodejs_compat_eol_v24` | 2028-04-30 | Removes APIs that reached end-of-life in Node.js 24.x. Implied by `remove_nodejs_compat_eol` after 2028-04-30. |
| `remove_nodejs_compat_eol_v22` | `add_nodejs_compat_eol_v22` | 2027-04-30 | Removes APIs that reached end-of-life in Node.js 22.x. Implied by `remove_nodejs_compat_eol` after 2027-04-30. |
| `nodejs_compat` | `no_nodejs_compat` | 2026-08-04 | Enables Node.js APIs in the Workers runtime. From 2026-08-04 both `nodejs_compat` and `nodejs_compat_v2` are on by default. |
| `throw_on_not_implemented_tls_options` | `no_throw_on_not_implemented_tls_options` | 2026-06-16 | Unsupported TLS options (for example `checkServerIdentity`) passed to `tls.connect()` or `new TLSSocket()` throw `ERR_OPTION_NOT_IMPLEMENTED` instead of being silently ignored. |
| `diagnostics_channel_has_subscribers_getter` | `no_diagnostics_channel_has_subscribers_getter` | 2026-05-19 | `Channel.hasSubscribers` and `TracingChannel.hasSubscribers` from `node:diagnostics_channel` become read-only boolean getters (previously methods called as `ch.hasSubscribers()`). Requires `nodejs_compat`. |
| `enable_nodejs_global_timers` | `no_nodejs_global_timers` | 2026-02-10 | `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` return Node.js-compatible `Timeout` objects (`refresh()`, `ref()`, `unref()`, `hasRef()`). Requires `nodejs_compat`; auto-enabled with it from 2026-02-10. |
| `require_returns_default_export` | `require_returns_namespace` | 2026-01-22 | `require()` returns the default export if it exists, otherwise a mutable copy of the module namespace (matches Node.js `require(esm)`; useful for frameworks like Next.js that patch exports). Previously always returned the namespace object (`{default: module.exports}`). |
| `enable_nodejs_process_v2` | `disable_nodejs_process_v2` | 2025-09-15 | With `nodejs_compat`, a comprehensive Node.js-compatible `process` replaces the minimal implementation that only had `nextTick`, `env`, `exit`, `getBuiltinModule`, `platform`, `features`. Unsupported features have undefined exports. |
| `enable_nodejs_http_server_modules` | `disable_nodejs_http_server_modules` | 2025-09-01 | Makes Node.js HTTP server modules such as `node:_http_server` available: `http.createServer()`, `http.Server`, `http.ServerResponse`. Must be combined with `enable_nodejs_http_modules` for full `node:http`. Auto-enabled with `nodejs_compat` from 2025-09-01. |
| `remove_nodejs_compat_eol` | `add_nodejs_compat_eol` | 2025-09-01 | Roll-up flag: removes APIs that reached Node.js end-of-life (when disabled they are present but may be non-functional stubs). Version-specific flags (`remove_nodejs_compat_eol_v22`, `remove_nodejs_compat_eol_v23`, `remove_nodejs_compat_eol_v24`) are implied by it after their dates. Auto-enabled with `nodejs_compat` from 2025-09-01. |
| `remove_nodejs_compat_eol_v23` | `add_nodejs_compat_eol_v23` | 2025-09-01 | Removes APIs that reached end-of-life in Node.js 23.x (EOL June 2025). Implied by `remove_nodejs_compat_eol_v24` after 2025-09-01. |
| `enable_nodejs_http_modules` | `disable_nodejs_http_modules` | 2025-08-15 | Enables `node:http` and `node:https` client APIs: `http.request()` / `https.request()`, `http.get()` / `https.get()`, standard request/response objects, methods, headers, options. |
| `nodejs_compat_populate_process_env` | `nodejs_compat_do_not_populate_process_env` | 2025-04-01 | With `nodejs_compat`, `process.env` is populated from bindings with text or JSON values (environment variables, secrets, version metadata). Not populated if `disallow_importable_env` is set. |
| `disallow_importable_env` | `allow_importable_env` | none | Disallows importing environment variables via `cloudflare:workers` and stops populating global `process.env` when Node.js compatibility is on. No default enable date. |
| `nodejs_zlib` | `no_nodejs_zlib` | 2024-09-23 | Enables `node:zlib`. Auto-enabled with `nodejs_compat` from 2024-09-23. |
| `nodejs_als` | `no_nodejs_als` | none | Enables only the Node.js `AsyncLocalStorage` API. |
| `enable_global_performance_classes` | `disable_global_performance_classes` | 2026-03-17 | Exposes `PerformanceEntry`, `PerformanceMark`, `PerformanceMeasure`, `PerformanceResourceTiming`, `PerformanceObserver`, `PerformanceObserverEntryList` globally. Also implied by `enable_nodejs_perf_hooks_module`; auto-enabled with `nodejs_compat` from 2026-03-17. |

Module flags: each enables the named module (a non-functional stub unless noted). Auto-enabled when `nodejs_compat` is on and the compatibility date is on or after the default date.

| Flag to enable | Flag to disable | Default as of | Module |
| --- | --- | --- | --- |
| `enable_nodejs_child_process_module` | `disable_nodejs_child_process_module` | 2026-03-17 | `node:child_process` (stub) |
| `enable_nodejs_perf_hooks_module` | `disable_nodejs_perf_hooks_module` | 2026-03-17 | `node:perf_hooks` (also enables global Performance classes) |
| `enable_nodejs_readline_module` | `disable_nodejs_readline_module` | 2026-03-17 | `node:readline` (stub) |
| `enable_nodejs_repl_module` | `disable_nodejs_repl_module` | 2026-03-17 | `node:repl` (stub) |
| `enable_nodejs_tty_module` | `disable_nodejs_tty_module` | 2026-03-17 | `node:tty` (stub) |
| `enable_nodejs_v8_module` | `disable_nodejs_v8_module` | 2026-03-17 | `node:v8` (stub) |
| `enable_nodejs_worker_threads_module` | `disable_nodejs_worker_threads_module` | 2026-03-17 | `node:worker_threads` (stub) |
| `enable_nodejs_dgram_module` | `disable_nodejs_dgram_module` | 2026-01-29 | `node:dgram` (stub) |
| `enable_nodejs_inspector_module` | `disable_nodejs_inspector_module` | 2026-01-29 | `node:inspector` (stub) |
| `enable_nodejs_sqlite_module` | `disable_nodejs_sqlite_module` | 2026-01-29 | `node:sqlite` (stub) |
| `enable_nodejs_stream_wrap_module` | `disable_nodejs_stream_wrap_module` | 2026-01-29 | `node:_stream_wrap` (stub) |
| `enable_nodejs_cluster_module` | `disable_nodejs_cluster_module` | 2025-12-04 | `node:cluster` (stub) |
| `enable_nodejs_domain_module` | `disable_nodejs_domain_module` | 2025-12-04 | `node:domain` (stub; deprecated in Node.js) |
| `enable_nodejs_punycode_module` | `disable_nodejs_punycode_module` | 2025-12-04 | `node:punycode` (deprecated in Node.js) |
| `enable_nodejs_trace_events_module` | `disable_nodejs_trace_events_module` | 2025-12-04 | `node:trace_events` (stub) |
| `enable_nodejs_wasi_module` | `disable_nodejs_wasi_module` | 2025-12-04 | `node:wasi` (stub) |
| `enable_nodejs_vm_module` | `disable_nodejs_vm_module` | 2025-10-01 | `node:vm` (stub) |
| `enable_nodejs_console_module` | `disable_nodejs_console_module` | 2025-09-21 | `node:console` |
| `enable_nodejs_fs_module` | `disable_nodejs_fs_module` | 2025-09-15 | `node:fs` |
| `enable_nodejs_os_module` | `disable_nodejs_os_module` | 2025-09-15 | `node:os` |
| `enable_nodejs_http2_module` | `disable_nodejs_http2_module` | 2025-09-01 | `node:http2` (stubs) |

## Notes

- Some Node.js modules exist only as non-functional stubs: they can be imported or required but do not provide working implementations. They exist for packages that check whether a module exists and should not be used directly in application code.
- `nodejs_compat` APIs gated by date (enabled with `nodejs_compat` on or after): top-level await disabled in `require()` (`2024-12-02`), `process.env` (`2025-04-01`), `node:http` / `node:https` (`2025-08-15`), `http.server` (`2025-09-01`).
- When enabling `nodejs_compat`, use the latest Wrangler and the latest compatibility date; older Wrangler versions inject polyfills that are unnecessary with recent dates because the runtime provides them.
- If an npm package fails on Workers, first update the compatibility date and Wrangler (or the Cloudflare Vite plugin); if it still fails, report it at https://github.com/cloudflare/workers-sdk/issues/new?template=bug-template.yaml.
- Disabling Node.js compatibility for dates of `2026-08-04` or later requires both `no_nodejs_compat` and `no_nodejs_compat_v2` (see the main compatibility flags page).

## Related

- [Compatibility flags](./compatibility-flags.md)
- [Web platform flags](./compatibility-flags-web-platform.md)
- [Platform and product flags](./compatibility-flags-platform.md)
- [Compatibility dates](./compatibility-dates.md)
- [Node.js compatibility](../nodejs-compat/README.md)
