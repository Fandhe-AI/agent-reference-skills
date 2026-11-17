---
source: https://docs.cloud.google.com/service-extensions/docs/plugins-overview
---

# Plugins overview

Plugins are WebAssembly (Wasm) modules that use Proxy-Wasm APIs and run inline in the Application Load Balancer and Media CDN processing path. The feature is in Preview for Media CDN.

## Signature / Usage

### Read a forwarded attribute with `proxy_get_property`

The source calls this a conceptual Rust example.

```rust
use proxy_wasm::traits::{HttpContext, RootContext};
use proxy_wasm::types::Action;

// ... inside your HttpContext implementation ...

fn on_request_headers(&mut self, _num_headers: usize, _end_of_stream: bool) -> Action {
    if let Some(host) = self.get_property(vec!["request", "host"]) {
        // host is a Vec, convert to string
        let host_str = String::from_utf8(host).unwrap_or_default();
        log::info!("Request host: {}", host_str);
    }

    if let Some(region) = self.get_property(vec!["source", "client_region"]) {
        let region_str = String::from_utf8(region).unwrap_or_default();
        log::info!("Client region: {}", region_str);
    }

    Action::Continue
}
```

## Options / Props

### Resources

| Resource | Description |
|----------|-------------|
| Plugin | Contains the custom code to deploy |
| Plugin version | A version of your Wasm module; one version is marked as the main (active) one |

### Resource limits

| Limit | Value |
|-------|-------|
| CPU per invocation | Up to 1 msec of normalized vCPU (about a 4 GHz processor); an invocation is request headers, request body, response headers or response body |
| Memory per VM instance | 16 MiB (4 MiB for Media CDN plugins) |
| Concurrent requests an instance must serve | Up to 1,000, so up to 16 KiB per stream (4 KiB for Media CDN plugins); total includes global state and stack allocations; plugins exceeding the limit are terminated |
| Maximum size of any mutation (headers or body chunks) | 128 KiB |

### API limits

| API limits |
|---|
| Subset of the Proxy-Wasm ABI; no timers, custom metrics, shared data, shared queues or outbound network calls. |
| HTTP trailer events aren't supported. |
| Plugins can't override the processing mode of the `ext_proc` stream. |

### Headers that plugins can't manipulate

| Plugin type | Headers | Header prefixes |
|-------------|---------|-----------------|
| Media CDN | `CDN-Loop`, `connection`, `keep-alive`, `proxy-authenticate`, `proxy-authorization`, `proxy-connection`, `te`, `trailers`, `transfer-encoding`, `upgrade`, `X-user-IP` | `x-forwarded`, `x-goog-`, `x-google`, `x-gfe`, `x-amz-` |
| Cloud Load Balancing | `connection`, `keep-alive`, `proxy-authenticate`, `proxy-authorization`, `proxy-connection`, `sec-user-ip`, `te`, `trailer`, `transfer-encoding`, `upgrade`, `x-dont-count-ads`, `x-dont-show-ads`, `x-gr`, `x-proxyuser-ip`, `x-user-ip`; for `LbTrafficExtension` also `method`, `authority`, `scheme`, host headers | `sec-gfe-`, `sec-google-`, `x-amz-`, `x-forwarded-`, `x-gfe-`, `x-goog-`, `x-google-`, `x-gproxy-` |

## Notes

- Workflow: 1. Prepare plugin code with a Proxy-Wasm SDK (Rust, Go or C++), compile to a Wasm module, upload it to an Artifact Registry repository. 2. Create a plugin that contains the uploaded code. 3. Configure the plugin in Cloud Load Balancing extensions or Media CDN extensions.
- Headers that plugins can't manipulate: Modifications to these are ignored and processing continues.
- Wasm benefits listed in the source: sandboxing for security, multiple languages, portability, broad industry support, better performance than VM-based options such as JavaScript. Proxy-Wasm is an open source project started by Google.
- C++ and Rust produce the smallest memory footprint. The Go SDK isn't recommended for Media CDN because the Go runtime and garbage collector need a 2-3 MiB baseline.
- With `REQUEST_BODY` or `RESPONSE_BODY` configured on HTTP/1.1, a matching request loses the `Content-Length` header on the response and uses chunked encoding.
- Use the plugin tester (plugin best practices) to benchmark CPU and memory.
- Plugin attribute property names correspond to attribute names, as a path (for example `{"request", "host"}` for `request.host`).
- Google Cloud Service Extensions plugins, not Cloudflare Workers (see `cloudflare-workers`) and not the Wasm toolchain itself (see `rust`).
- Source: https://docs.cloud.google.com/service-extensions/docs/plugins-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-plugin.md](./create-plugin.md)
- [attributes.md](./attributes.md)
- [quotas.md](./quotas.md)
- [lb-extensions-overview.md](./lb-extensions-overview.md)
- [media-cdn-extensions-overview.md](./media-cdn-extensions-overview.md)
