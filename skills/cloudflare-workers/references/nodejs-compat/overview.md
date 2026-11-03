---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/
---

# Node.js compatibility

Cloudflare Workers provides a subset of Node.js APIs as built-in runtime APIs and as Wrangler-injected polyfill shims (via unenv).

## Signature / Usage

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. For compatibility dates from `2024-09-23` through `2026-08-03`, add the `nodejs_compat` compatibility flag:

```jsonc
{
	"compatibility_date": "2026-08-03",
	"compatibility_flags": ["nodejs_compat"]
}
```

```toml
compatibility_date = "2026-08-03"
compatibility_flags = [ "nodejs_compat" ]
```

To enable only `AsyncLocalStorage`:

```jsonc
{
	"compatibility_flags": ["nodejs_als"],
}
```

```toml
compatibility_flags = [ "nodejs_als" ]
```

### Supported Node.js APIs

| API Name | Natively supported by the Workers Runtime |
| --- | --- |
| Assertion testing ([assert](./assert.md)) | supported |
| Asynchronous context tracking ([AsyncLocalStorage](./asynclocalstorage.md)) | supported |
| Buffer ([buffer](./buffer.md)) | supported |
| Console (nodejs.org) | partially supported |
| Crypto ([crypto](./crypto-zlib.md)) | supported |
| Debugger | supported via Chrome DevTools integration |
| Diagnostics Channel ([diagnostics-channel](./diagnostics-channel.md)) | supported |
| DNS ([dns](./dns.md)) | partially supported |
| Errors | supported |
| Events ([eventemitter](./eventemitter.md)) | supported |
| File system ([fs](./fs.md)) | supported |
| Globals | supported |
| HTTP ([http](./http.md)) | supported |
| HTTPS ([https](./https.md)) | supported |
| Module (nodejs.org) | partially supported |
| Net ([net](./net.md)) | supported |
| OS (nodejs.org) | partially supported |
| Path ([path](./path.md)) | supported |
| Performance hooks (nodejs.org) | partially supported |
| Process ([process](./process.md)) | supported |
| Punycode (nodejs.org, deprecated) | supported |
| Query strings (nodejs.org) | supported |
| Stream ([streams](./streams.md)) | supported |
| String decoder ([string-decoder](./string-decoder.md)) | supported |
| Test runner ([test](./test.md)) | partially supported |
| Timers ([timers](./timers.md)) | supported |
| TLS/SSL ([tls](./tls.md)) | partially supported |
| URL ([url](./url.md)) | supported |
| Utilities ([util](./util.md)) | supported |
| Web Crypto API | supported |
| Web Streams API | supported |
| Zlib ([zlib](./crypto-zlib.md)) | supported |

### Non-functional stub modules

A stub can be imported or required, but does not provide a working implementation. Stubs are enabled automatically only when `nodejs_compat` is enabled and the compatibility date is on or after the date shown. To enable one earlier, add the enable flag; to keep one unavailable, add the disable flag.

| Stub module | Enabled with `nodejs_compat` on or after | Enable flag | Disable flag |
| --- | --- | --- | --- |
| `node:http2` | `2025-09-01` | `enable_nodejs_http2_module` | `disable_nodejs_http2_module` |
| `node:vm` | `2025-10-01` | `enable_nodejs_vm_module` | `disable_nodejs_vm_module` |
| `node:cluster` | `2025-12-04` | `enable_nodejs_cluster_module` | `disable_nodejs_cluster_module` |
| `node:domain` | `2025-12-04` | `enable_nodejs_domain_module` | `disable_nodejs_domain_module` |
| `node:trace_events` | `2025-12-04` | `enable_nodejs_trace_events_module` | `disable_nodejs_trace_events_module` |
| `node:wasi` | `2025-12-04` | `enable_nodejs_wasi_module` | `disable_nodejs_wasi_module` |
| `node:_stream_wrap` | `2026-01-29` | `enable_nodejs_stream_wrap_module` | `disable_nodejs_stream_wrap_module` |
| `node:dgram` | `2026-01-29` | `enable_nodejs_dgram_module` | `disable_nodejs_dgram_module` |
| `node:inspector` | `2026-01-29` | `enable_nodejs_inspector_module` | `disable_nodejs_inspector_module` |
| `node:sqlite` | `2026-01-29` | `enable_nodejs_sqlite_module` | `disable_nodejs_sqlite_module` |
| `node:child_process` | `2026-03-17` | `enable_nodejs_child_process_module` | `disable_nodejs_child_process_module` |
| `node:readline` | `2026-03-17` | `enable_nodejs_readline_module` | `disable_nodejs_readline_module` |
| `node:repl` | `2026-03-17` | `enable_nodejs_repl_module` | `disable_nodejs_repl_module` |
| `node:tty` | `2026-03-17` | `enable_nodejs_tty_module` | `disable_nodejs_tty_module` |
| `node:v8` | `2026-03-17` | `enable_nodejs_v8_module` | `disable_nodejs_v8_module` |
| `node:worker_threads` | `2026-03-17` | `enable_nodejs_worker_threads_module` | `disable_nodejs_worker_threads_module` |

## Notes

- Deprecated or experimental Node.js APIs, and APIs that do not fit a serverless context, are not in the supported list.
- Existing projects do not need to remove `nodejs_compat` / `nodejs_compat_v2` when updating to `2026-08-04` or later; omit them from new configurations.
- To turn off Node.js compatibility completely with a compatibility date of `2026-08-04` or later, remove the positive flags if present, then add both `no_nodejs_compat` and `no_nodejs_compat_v2`.
- Unless otherwise specified, native implementations are intended to match the Current release of Node.js.
- Polyfills: APIs not yet supported in the runtime are polyfilled by Wrangler using unenv. When `nodejs_compat` is enabled and the compatibility date is 2024-09-23 or later, Wrangler automatically injects polyfills. Calling a mocked method either no-ops or throws an error like:

```plaintext
[unenv] <method name> is not implemented yet!
```

- Missing APIs can be suggested in the Node.js APIs discussions category at https://github.com/cloudflare/workerd/discussions/categories/node-js-apis.

## Related

- [fs](./fs.md)
- [http](./http.md)
- [process](./process.md)
- [Compatibility flags (configuration category)](../configuration/README.md)
