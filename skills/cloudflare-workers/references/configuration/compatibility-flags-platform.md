---
source: https://developers.cloudflare.com/workers/configuration/compatibility-flags/
---

# Compatibility flags: platform and products

Flags for Durable Objects, RPC and service bindings, Queues, Workflows, Python Workers, Containers, static assets, observability, and other Cloudflare product integrations. Rows are ordered newest first by default date. "none" means the source gives no default-enable date.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/configuration/compatibility-flags/#queue-consumers-dont-wait-for-ctxwaituntil-to-resolve.

```js
export default {
  async fetch(request, env, ctx) {
    // omitted
  },

  async queue(batch, env, ctx) {
    console.log(`received batch of ${batch.messages.length} messages to queue ${batch.queue}`);
    for (let i = 0; i < batch.messages.length; ++i) {
      console.log(`message #${i}: ${JSON.stringify(batch.messages[i])}`);
    }
    ctx.waitUntil(sleep(30 * 1000));
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Options / Props

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `python_shared_standard_library` | none | 2026-11-19 | The Python standard library (`/lib/python3XX.zip`) is shared across isolates via shared memory, reducing the memory footprint of Python Workers. |
| `durable_object_io_tasks_prevent_eviction` | `durable_object_io_tasks_do_not_prevent_eviction` | 2026-10-01 | Pending I/O keeps a Durable Object in memory after the client disconnects: service binding requests, Durable Object RPC calls, `container.monitor()`, and promises passed to `this.ctx.waitUntil()`. Each prevents eviction until it completes or up to 15 minutes from its start, whichever is first. |
| `python_workers_314` | none | 2026-09-08 | Python 3.14 is used for Python Workers. Normally not set manually; the version is selected by compatibility date. |
| `python_process_pth_files` | `disable_python_process_pth_files` | 2026-05-26 | Python Workers process `.pth` files in `python_modules/` at startup via `site.addsitedir()`. Moves top-level entropy context managers into workers-py. Requires `workers-py` 1.1.3 or later. |
| `workflows_preserve_non_retryable_error_message` | `workflows_replace_non_retryable_error_message` | 2026-05-14 | A Workflow step throwing `NonRetryableError` keeps its `message` and `name` on the thrown exception instead of a generic termination string. |
| `containers_pid_namespace` | `no_containers_pid_namespace` | 2026-04-01 | Containers use an isolated PID namespace; the container `ENTRYPOINT` has PID 1. When unset, the container shares the VM's PID namespace (ENTRYPOINT is not PID 1; other VM processes are visible). |
| `queue_expose_error_codes` | `no_queue_expose_error_codes` | 2026-03-12 | Queue operations include detailed error information (codes and causes). |
| `delete_all_deletes_alarm` | `delete_all_preserves_alarm` | 2026-02-24 | `deleteAll()` on Durable Object storage also deletes any active alarm (KV-backed and SQLite-backed). Previously a separate `deleteAlarm()` was required. |
| `rpc_params_dup_stubs` | `rpc_params_transfer_stubs` | 2026-01-20 | RPC stubs embedded in call parameters are duplicated instead of having ownership transferred, matching Cap'n Web. Fixes double-disposal when proxying calls and callbacks stored via `dup()` in a Durable Object. |
| `enable_ctx_exports` | `disable_ctx_exports` | 2025-11-17 | Enables `ctx.exports`: automatically configured loopback bindings for the Worker's top-level exports (`WorkerEntrypoint`s, Durable Object namespaces) without explicit bindings. |
| `enable_workers_observability_tracing` | none | none | Enables Workers Tracing by default when `observability.enabled` is true in the Wrangler configuration. Tracing can also be enabled explicitly with `observability.traces.enabled: true` on older dates. |
| `enable_validate_workflow_entrypoint` | `disable_validate_workflow_entrypoint` | 2025-09-20 | Extra validation that Workflows are defined and used correctly, catching configuration errors at upload time. |
| `python_no_global_handlers` | `disable_python_no_global_handlers` | 2025-08-14 | Python Workers disable global handlers and require default entrypoint classes. |
| `assets_navigation_prefers_asset_serving` | `assets_navigation_has_no_effect` | 2025-04-01 | For Workers with static assets, navigation requests (`Sec-Fetch-Mode: navigate`) prefer asset serving even without an exact match, so SPA (`200 /index.html`) and custom 404 (`404 /404.html`) fallbacks are served before invoking the Worker (avoids a charge). No effect when `assets.run_worker_first = true`. |
| `queue_consumer_no_wait_for_wait_until` | none | none | Queue consumers acknowledge messages without waiting for promises passed to `ctx.waitUntil()`. By default acknowledgment waits for them. Does not change `ctx.waitUntil()` extending the Worker lifetime. Listed as experimental. |
| `rpc` | `no_rpc` | 2024-04-03 | Durable Object stubs and service bindings support RPC: they appear to define every method name. Code that probes bindings for method names may misdetect service bindings. |
| `fetcher_no_get_put_delete` | `fetcher_has_get_put_delete` | 2024-03-26 | Removes the undocumented `get()`, `put()`, `delete()` helpers from Durable Object stubs and service bindings (frees those names for custom RPC methods). |
| `queues_json_messages` | `no_queues_json_messages` | 2024-03-18 | Queue bindings serialize values passed to `send()` / `sendBatch()` as JSON by default when no `contentType` is given. |
| `python_workers` | none | none | First-class Python support (most of the standard library, all bindings, environment variables, secrets, JS FFI). |
| `vectorize_query_metadata_optional` | `vectorize_query_original` | 2023-11-08 | Vectorize queries accept `returnValues` and `returnMetadata` separately instead of `returnVectors`; returned vectors are flattened with `score` attached. |
| `dynamic_dispatch_tunnel_exceptions` | `dynamic_dispatch_treat_exceptions_as_500` | 2023-03-01 | Workers for Platforms dynamic dispatch propagates user Worker exceptions to the dispatch Worker's `fetch()` instead of an empty HTTP 500. |
| `r2_list_honor_include` | none | 2022-08-04 | The R2 `list` `include` option is honored. Without it behaves as `include: ["httpMetadata", "customMetadata"]`. |
| `durable_object_fetch_requires_full_url` | `durable_object_fetch_allows_relative_url` | 2021-11-10 | `stub.fetch()` requires a full URL (relative URLs were resolved against `http://fake-host`). |

## Notes

- The Queue consumer flag is a listed experimental flag; the default behavior is documented in the Queues consumer configuration guide.
- `rpc` changes what looks like a method on service bindings and Durable Object stubs; guard code that auto-detects binding types from method names.
- Product-specific behavior of these flags is documented with each product; only the flag semantics are summarized here.
- For `ctx.exports` usage see the handlers-context category.

## Related

- [Compatibility flags](./compatibility-flags.md)
- [Node.js flags](./compatibility-flags-nodejs.md)
- [Web platform flags](./compatibility-flags-web-platform.md)
- [Handlers and context](../handlers-context/README.md)
- [Bindings and RPC](../bindings-rpc/README.md)
