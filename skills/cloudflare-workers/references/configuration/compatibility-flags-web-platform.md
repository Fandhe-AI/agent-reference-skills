---
source: https://developers.cloudflare.com/workers/configuration/compatibility-flags/
---

# Compatibility flags: web platform

Flags for Web API and JavaScript runtime behavior: fetch and cache, streams, URL, WebSocket, Web Crypto, encoding, events, error handling, and the module system. Rows are grouped by area, with dates as written on the source page (not strictly sorted). "none" means the source gives no default-enable date.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-cache-no-cache-http-standard-api.

```js
const response = await fetch("https://example.com", { cache: "no-cache" });
```

## Options / Props

Fetch, cache, and HTTP.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `cache_option_preserves_cache_control` | `cache_option_overrides_cache_control` | 2026-11-17 | `cache: "no-cache"` / `"no-store"` on a Request no longer overrides the origin response's `Cache-Control` when Cloudflare caches it. Per the Fetch standard `no-cache` forces revalidation and `no-store` bypasses the cache. To override origin `Cache-Control`, omit `cache` and set `cf.cacheControl`. |
| `fetch_iterable_type_support` | `no_fetch_iterable_type_support` | 2026-02-19 | Sync and async iterables can be the body of a `fetch()` `Request` or `Response` and are iterated (streamed). Arrays are now iterated instead of stringified (breaking). |
| `fetch_iterable_type_support_override_adjustment` | `no_fetch_iterable_type_support_override_adjustment` | 2026-01-15 | Sync iterables with a custom `toString` or `Symbol.toPrimitive` are not treated as iterables (handled as stringified objects). Refines `fetch_iterable_type_support`; auto-enabled when that flag is enabled after 2026-01-15. |
| `strip_authorization_on_cross_origin_redirect` | `retain_authorization_on_cross_origin_redirect` | 2025-09-01 | Removes the `Authorization` header when following a redirect to a different origin, as the Fetch spec requires. The old behavior could leak credentials to untrusted origins. |
| `cache_no_cache_enabled` | `cache_no_cache_disabled` | 2025-08-07 | Allows `cache: "no-cache"` on Request: sets `Pragma: no-cache` and `Cache-Control: no-cache` on requests and forces Cloudflare's cache to revalidate with non-Cloudflare origins. Without it, a `TypeError` `Unsupported cache mode: no-cache` is thrown. |
| `cache_api_request_cf_overrides_cache_rules` | `no_cache_api_request_cf_overrides_cache_rules` | 2025-05-19 | Cache settings in the `cf` object of a request passed to the Cache API override cache rules (user-owned or grey-clouded sites only). Counterpart of `request_cf_overrides_cache_rules`. |
| `request_cf_overrides_cache_rules` | `no_request_cf_overrides_cache_rules` | 2025-04-02 | Cache settings in `request.cf` (such as `cacheEverything`, `cacheTtl`) take precedence over Cache Rules for the Fetch API. |
| `request_signal_passthrough` | `no_request_signal_passthrough` | none | The incoming request's `AbortSignal` is passed through to subrequests made with `fetch()` when the request is forwarded. |
| `enable_request_signal` | `disable_request_signal` | 2026-11-17 | Incoming `Request` objects have an `AbortSignal` that fires `abort` when the client disconnects. Does not change `request_signal_passthrough`; pass `request.signal` explicitly to cancel work such as `fetch()`. |
| `cache_option_enabled` | `cache_option_disabled` | 2024-11-11 | Allows `cache: "no-store"` on Request (the only value enabled by this flag; others throw `TypeError` `Unsupported cache mode`). Sets `Pragma: no-cache` and `Cache-Control: no-cache`; bypasses Cloudflare's cache for non-Cloudflare origins. Without it: `The 'cache' field on 'RequestInitializerDict' is not implemented.` |
| `global_fetch_strictly_public` | `global_fetch_private_origin` | none | Global `fetch()` routes strictly as on the public Internet: requests to the Worker's own zone loop back to Cloudflare's front door (possibly invoking the same Worker again). Without it such requests go to the zone's origin, ignoring Workers and bypassing security settings. |
| `upper_case_all_http_methods` | `no_upper_case_all_http_methods` | 2024-10-14 | Upper-cases all HTTP method names before parsing, so any known method is recognized (for example `patch`). |
| `allow_custom_ports` | `ignore_custom_ports` | 2024-09-02 | A port in a `fetch()` URL (and `new WebSocket(url)`) is honored. For orange-clouded sites only Cloudflare-proxy-supported ports are used (others ignored); grey-clouded sites accept any port. |
| `blob_standard_mime_type` | `blob_legacy_mime_type` | 2024-06-03 | `(await response.blob()).type` extracts the MIME type from `content-type` per the WHATWG spec. |
| `fetch_standard_url` | `fetch_legacy_url` | 2024-06-03 | `fetch()` uses WHATWG URL parsing. URL errors are thrown immediately on `new Request()` with an improper URL rather than on `fetch()`. |
| `brotli_content_encoding` | `no_brotli_content_encoding` | 2024-04-29 | Supports the `br` content encoding for requesting and responding with Brotli data. |
| `fetch_refuses_unknown_protocols` | `fetch_treats_unknown_protocols_as_http` | 2021-11-10 | `fetch()` refuses protocols other than `http:` / `https:` (previously silently treated as `http:`). Use `http:` / `https:` (not `ws:` / `wss:`) for a WebSocket handshake via `fetch()`. |
| `minimal_subrequests` | `no_minimal_subrequests` | 2022-04-05 | Same-zone `fetch()` subrequests get a reduced feature set: no opportunistic gzip of response bodies to the runtime, Automatic Platform Optimization only on the initiating request, link prefetching only on the Worker's response. |
| `no_cots_on_external_fetch` | `cots_on_external_fetch` | 2022-03-08 | Disables the Custom Origin Trust Store for external (grey-clouded) subrequests. |
| `no_cf_botmanagement_default` | `cf_botmanagement_default` | 2023-08-01 | `request.cf` includes the Bot Management object only if the account has Bot Management. Without it a default object is always included. |
| `http_headers_getsetcookie` | `no_http_headers_getsetcookie` | 2023-03-01 | Adds `Headers.getSetCookie()`. |
| `response_redirect_url_standard` | `response_redirect_url_original` | 2023-03-14 | `Response.redirect()` uses the spec-compliant WHATWG URL implementation. |
| `formdata_parser_supports_files` | `formdata_parser_converts_files_to_strings` | 2021-11-03 | `FormData` parsing returns `File` objects for uploaded files (previously the file contents as a string). |
| `set_forwardable_email_full_headers` | `set_forwardable_email_single_headers` | 2025-08-01 | Forwardable email headers such as To and Cc keep their full values instead of being truncated to a single value. |

Streams.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `pipe_to_backward_propagation` | `no_pipe_to_backward_propagation` | 2026-11-17 | `pipeTo()` / `pipeThrough()` to a JavaScript-created `WritableStream` propagate destination errors and closure back to the source (cancels the source unless `preventCancel`, then rejects with the destination error or a `TypeError` if closed). Without the flag the promise resolves, or never settles with `preventCancel: true`. |
| `encoder_stream_spec_compliant_backpressure` | `no_encoder_stream_spec_compliant_backpressure` | 2026-03-24 | `TextEncoderStream` / `TextDecoderStream` use a readable-side high water mark of 0 (previously 1), so writes block until a reader pulls. |
| `writable_stream_spec_compliant_writer` | `no_writable_stream_spec_compliant_writer` | 2026-03-24 | Fixes `WritableStream` writer lock and release behavior to match the WHATWG Streams Standard. |
| `strip_bom_in_read_all_text` | `do_not_strip_bom_in_read_all_text` | 2026-01-13 | `readAllText()` on streams strips a leading UTF-8 BOM. |
| `fixup-transform-stream-backpressure` | `original-transform-stream-backpressure` | 2024-12-16 | Fixes `TransformStream` backpressure signaling that failed after the first write. |
| `internal_writable_stream_abort_clears_queue` | `internal_writable_stream_abort_does_not_clear_queue` | 2024-09-02 | `abort()` on an internal `WritableStream` clears the pending write queue immediately (prevents hangs). |
| `internal_stream_byob_return_view` | `internal_stream_byob_return_undefined` | 2024-05-13 | The final BYOB `read()` returns an empty `Uint8Array` backed by the passed memory (previously `undefined`). |
| `streams_enable_constructors` | `streams_disable_constructors` | 2022-11-30 | Adds the `new ReadableStream()` and `new WritableStream()` constructors backed by JavaScript sources and sinks. |
| `transformstream_enable_standard_constructor` | `transformstream_disable_standard_constructor` | 2022-11-30 | Makes the `new TransformStream()` constructor standards-compliant. Must be combined with `streams_enable_constructors`. |
| `streams_byob_reader_detaches_buffer` | `streams_byob_reader_does_not_detach_buffer` | 2021-11-10 | BYOB reader `read()` detaches the passed `ArrayBuffer` per spec; reuse the buffer from `result.value.buffer`. `readAtLeast()` always detaches. |

URL, encoding, and text.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `text_decoder_cjk_decoder` | `disable_text_decoder_cjk_decoder` | 2026-03-03 | Dedicated CJK `TextDecoder` implementation for CJK encoding overrides and Big5 lead-byte handling (instead of the ICU-only path). |
| `text_decoder_replace_surrogates` | `disable_text_decoder_replace_surrogates` | 2026-02-24 | The UTF-16le `TextDecoder` replaces lone surrogates with U+FFFD. |
| `urlpattern_standard` | `urlpattern_original` | 2025-05-01 | Spec-compliant WHATWG `URLPattern` implementation (breaking vs the original). |
| `urlsearchparams_delete_has_value_arg` | `no_urlsearchparams_delete_has_value_arg` | 2023-07-01 | `URLSearchParams.delete()` / `has()` accept the optional value argument. Beware `forEach(usp.delete.bind(usp))`: pass `(key) => usp.delete(key)` instead. |
| `url_standard` | `url_original` | 2022-10-31 | WHATWG-compliant `URL` parser (no slash collapsing, different percent-encoding, `URL.canParse()` etc.). |

WebSocket.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `web_socket_auto_reply_to_close` | `web_socket_manual_reply_to_close` | 2026-04-07 | On a server Close frame the runtime replies with a Close frame and sets `readyState` to `CLOSED` before firing `close`; calling `close()` in the handler is ignored. `ws.accept({ allowHalfOpen: true })` restores half-open behavior (useful for proxying). `new WebSocket(...)` always auto-replies. |
| `websocket_standard_binary_type` | `no_websocket_standard_binary_type` | 2026-03-17 | `WebSocket.binaryType` defaults to `"blob"` (binary frames arrive as `Blob`) instead of `"arraybuffer"`. Does not affect Durable Object hibernatable `webSocketMessage` (always `ArrayBuffer`). |
| `websocket_close_reason_byte_limit` | `no_websocket_close_reason_byte_limit` | 2026-03-03 | `WebSocket.close()` throws a `SyntaxError` `DOMException` if `reason` exceeds 123 UTF-8 bytes. |
| `web_socket_compression` | `no_web_socket_compression` | 2023-08-15 | Supports WebSocket compression (RFC 7692, `permessage-deflate`) inbound and outbound. `new WebSocket(url)` sets `Sec-WebSocket-Extensions: permessage-deflate` automatically; with `fetch()` set it yourself. |

Web Crypto and compression.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `webcrypto_modern_algorithms` | none | none | Enables the Workers subset of the Modern Algorithms in the Web Cryptography API draft: ML-KEM and ML-DSA, key encapsulation/decapsulation, `getPublicKey()`, `SubtleCrypto.supports()`, JWKs with the `AKP` key type. API may change. |
| `crypto_preserve_public_exponent` | `no_crypto_preserve_public_exponent` | 2023-12-01 | RSA `publicExponent` is a `Uint8Array` (previously `ArrayBuffer`). |
| `strict_crypto_checks` | `no_strict_crypto_checks` | 2023-08-01 | Extra Web Crypto checks: RSA key sizes multiples of 128 bits; imported RSA keys 256 to 16384 bits; public exponent limited to `[3, 17, 37, 65537]`; importing a public ECDH key with non-empty usages throws. |
| `strict_compression_checks` | `no_strict_compression_checks` | 2023-08-01 | `DecompressionStream` errors on trailing data or if closed before the full compressed data. |

Events, errors, language, and misc.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `temporal` | `no_temporal` | 2026-12-01 | Makes the Temporal API available. `Temporal.Now` returns the same time as `Date.now()`. |
| `wasm_source_url_support` | `no_wasm_source_url_support` | 2026-12-01 | Stack traces name each WebAssembly module by its module name (for example `index_bg.wasm:wasm-function[42]:0x1a2b`) instead of a hash (`wasm://wasm/0543fef2:...`). Update any parsers matching `wasm://wasm/`. Bytes-compiled modules and service-worker-syntax bindings keep the hash name. |
| `spec_compliant_dispatch_exceptions` | `no_spec_compliant_dispatch_exceptions` | 2026-09-15 | Exceptions thrown by listeners during `dispatchEvent()` are reported (global `error` event and console) and the remaining listeners still run; applies to `dispatchEvent()`, `AbortSignal`, and runtime-fired events on `WebSocket`, `EventSource`, `MessagePort`. Legacy service worker top-level delivery still propagates. |
| `enhanced_error_serialization` | `legacy_error_serialization` | 2026-04-21 | `structuredClone()` / V8 serialization of errors supports more error types and own properties; deserialization does not preserve the original stack trace by default. |
| `unhandled_rejection_after_microtask_checkpoint` | `no_unhandled_rejection_after_microtask_checkpoint` | 2026-03-03 | `unhandledrejection` processing is deferred until the microtask checkpoint completes (avoids false events on multi-tick promise chains). |
| `enable_fast_jsg_struct` | `disable_fast_jsg_struct` | 2025-12-03 | Faster internal struct construction; optional fields are explicitly `undefined` rather than absent. Prefer `obj.key !== undefined` over `"key" in obj`. |
| `expose_global_message_channel` | `no_expose_global_message_channel` | 2025-08-15 | Exposes `MessageChannel` and `MessagePort` globally. |
| `set_event_target_this` | `no_set_event_target_this` | 2025-08-01 | Event handler `this` is the `EventTarget` the event is dispatched on (otherwise `undefined`). |
| `pedantic_wpt` | `non_pedantic_wpt` | none | Strict Web Platform Tests compliance (initially `Event` and `EventTarget` only). No default date. |
| `bind_asynclocalstorage_snapshot_to_request` | `do_not_bind_asynclocalstorage_snapshot_to` | 2025-06-16 | AsyncLocalStorage snapshots / bound functions are bound to the current request context and throw if called outside that request. |
| `allow_eval_during_startup` | `disallow_eval_during_startup` | 2025-06-01 | `eval()` and `new Function(text)` are allowed during the Worker startup phase. |
| `enable_navigator_language` | `disable_navigator_language` | 2025-05-19 | `navigator.language` is available (always `en` for now). |
| `enable_weak_ref` | `disable_weak_ref` | 2025-05-05 | Enables `FinalizationRegistry` and `WeakRef`. Cleanup callbacks may run any time (even after the handler completes), cannot do I/O, are non-deterministic and may never run. |
| `handle_cross_request_promise_resolution` | `no_handle_cross_request_promise_resolution` | 2024-10-14 | Promise continuations resolved from the wrong request context run in the correct context if alive, otherwise are dropped with a warning. |
| `set_tostring_tag` | `do_not_set_tostring_tag` | 2024-09-26 | Sets `Symbol.toStringTag` on Workers API objects. `do_not_set_tostring_tag` restores the original behavior. |
| `unwrap_custom_thenables` | `no_unwrap_custom_thenables` | 2024-04-01 | APIs that accept promises (such as `ctx.waitUntil`) handle custom thenables. |
| `no_global_importscripts` | `global_importscripts` | 2024-03-04 | Removes the non-implemented global `importScripts()`. |
| `capture_async_api_throws` | `do_not_capture_async_api_throws` | 2022-10-31 | Async APIs only reject (never throw synchronously) on error. |
| `dont_substitute_null_on_type_error` | `substitute_null_on_type_error` | 2022-06-01 | Built-ins throw `TypeError` for invalid values instead of coalescing them to `null`. |
| `global_navigator` | `no_global_navigator` | 2022-03-21 | Global `navigator` with `navigator.userAgent` set to `'Cloudflare-Workers'`. |
| `workers_api_getters_setters_on_prototype` | `workers_api_getters_setters_on_instance` | 2022-01-31 | API-object properties are defined on prototypes (fixes subclass overrides). Applies to `AbortSignal`, `AbortController`, `Blob`, `Body`, `DigestStream`, `Event`, `File`, `Request`, `ReadableStream`, `ReadableStreamDefaultReader`, `ReadableStreamBYOBReader`, `Response`, `TextDecoder`, `TextEncoder`, `TransformStream`, `URL`, `WebSocket`, `WritableStream`, `WritableStreamDefaultWriter`. |
| `html_rewriter_treats_esi_include_as_void_tag` | none | none | `HTMLRewriter` treats `<esi:include>` and `<esi:comment>` as void tags. Listed as experimental. |

Module system.

| Flag to enable | Flag to disable | Default as of | Behavior |
| --- | --- | --- | --- |
| `new_module_registry` | `legacy_module_registry` | 2026-11-17 | JavaScript Workers use the new module registry (provides `import.meta.url`, `import.meta.main`, `import.meta.resolve()`; specifiers resolved as URLs; query strings or fragments create separate instances). Python Workers keep the legacy registry. Does not download arbitrary URLs or install npm packages. |
| `throw_on_unrecognized_import_assertion` | `ignore_unrecognized_import_assertion` | 2025-06-16 | Unrecognized import attributes throw instead of being ignored. |
| `disable_top_level_await_in_require` | `enable_top_level_await_in_require` | 2024-12-02 | `require()` fails if the module uses top-level await. |
| `export_commonjs_default` | `export_commonjs_namespace` | 2022-10-31 | CommonJS modules export only `module.exports` (not a `{ default: module.exports }` namespace). |

## Notes

- With `new_module_registry`: import attributes are validated (unknown keys, unsupported types, or type mismatch throw); `require()` of an ES module returns its namespace unless it exports `"module.exports"`; built-in `node:` modules return their default export; `require()` rejects module graphs containing top-level `await` (use dynamic `import()`). The legacy flags `export_commonjs_default`, `require_returns_default_export`, `throw_on_unrecognized_import_assertion`, and `disable_top_level_await_in_require` do not control the new registry.
- `web_socket_auto_reply_to_close`: for a Worker created with `new WebSocket(url)` and needing half-open behavior, use `fetch()` with an `Upgrade: websocket` header and call `accept({ allowHalfOpen: true })`.
- `html_rewriter_treats_esi_include_as_void_tag` is listed on the source page under both flag history and "Experimental flags" and has no default date.
- Corrected from the official docs: for `blob_standard_mime_type` the official page says "When calling `response.blob.type()`", but `type` is a property of the `Blob` returned by `response.blob()`, not a method; the row now reads `(await response.blob()).type`.
- Node.js module flags are on the Node.js flags page; Durable Object, RPC, Python, and other product flags are on the platform page.

## Related

- [Compatibility flags](./compatibility-flags.md)
- [Node.js flags](./compatibility-flags-nodejs.md)
- [Platform and product flags](./compatibility-flags-platform.md)
- [Compatibility dates](./compatibility-dates.md)
- [Web APIs](../web-apis/README.md)
