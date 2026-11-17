---
source: https://docs.cloud.google.com/service-extensions/docs/callouts-overview
---

# Callouts overview

Service Extensions callouts let a networking proxy make Envoy gRPC calls to an extension service. They are supported by most Application Load Balancers and, in Preview, by Secure Web Proxy.

## Signature / Usage

### `ext_proc` gRPC API (abbreviated)

```text
// The gRPC API to be implemented by the external processing server
service ExternalProcessor {
  rpc Process(stream ProcessingRequest) returns (stream ProcessingResponse) {
  }
}

// Envoy sets one of these fields depending on the processing stage.
message ProcessingRequest {
  oneof request {
    HttpHeaders request_headers = 2;
    HttpHeaders response_headers = 3;
    HttpBody request_body = 4;
    HttpBody response_body = 5;
  }
}

message ProcessingResponse {
  oneof response {
    HeadersResponse request_headers = 1;
    HeadersResponse response_headers = 2;
    BodyResponse request_body = 3;
    BodyResponse response_body = 4;

    ImmediateResponse immediate_response = 7;
  }
}
```

### Forwarded attributes in `ProcessingRequest.attributes`

```text
attributes {
  key: "envoy.filters.http.ext_proc"
  value {
    fields {
      key: "request.host"
      value { string_value: "example.com" }
    }
    fields {
      key: "source.client_region"
      value { string_value: "US" }
    }
    // ... other forwarded attributes
  }
}
```

### `ext_authz` gRPC API (abbreviated)

```text
// A generic interface for performing authorization checks on incoming
// requests to a networked service.
service Authorization {
  // Performs an authorization check based on the attributes associated with
  // the incoming request and return status.
  rpc Check(CheckRequest) returns (CheckResponse) {
  }
}

message CheckRequest {
  // The request attributes.
  AttributeContext attributes = 1;
}

message CheckResponse {
  google.rpc.Status status = 1;
  oneof http_response {
    DeniedHttpResponse denied_response = 2;
    OkHttpResponse ok_response = 3;
  }
  google.protobuf.Struct dynamic_metadata = 4;
}
```

## Options / Props

### Protocols

| Protocol | Supported extensions | Notes |
|----------|----------------------|-------|
| `ext_proc` (External Processing) | Route, traffic and authorization extensions; default | Lets the service examine and modify request headers or body |
| `ext_authz` (External Authorization) | Authorization extensions only | Selected with the `wireFormat` option when configuring an authorization extension |

### Body processing modes (`request_body_send_mode` / `response_body_send_mode`)

| Mode | Behavior | Events required | Extensions supported |
|------|----------|-----------------|----------------------|
| `STREAMED` (default, also used if unset; recommended for most cases) | Proxy sends body chunks and expects one response per chunk; the extension can modify, acknowledge or delete chunks; acknowledge quickly because only limited data is sent at a time; a server can use the `ext_proc` `mode_override` option during a headers request to enable or disable later headers, body or trailers events | `REQUEST_BODY` for requests or `RESPONSE_BODY` for responses | Traffic extensions (requests and responses) |
| `FULL_DUPLEX_STREAMED` | Chunks are sent as they arrive without buffering; reply chunks are decoupled from sent chunks; the extension can buffer, modify and rechunk freely; if the extension doesn't send body content back, the next extension in the chain receives an empty body; `mode_override` isn't applicable and the mode can't be changed dynamically | `REQUEST_BODY` and `REQUEST_TRAILERS`, or `RESPONSE_BODY` and `RESPONSE_TRAILERS` | Traffic extensions (requests and responses); route extensions (requests) |

### Supported backends for user-managed callout backend services

| Supported backends for user-managed callout backend services |
|---|
| All managed and unmanaged instance group backends |
| All zonal NEGs |
| All hybrid connectivity NEGs |
| Private Service Connect NEGs pointing to VPC services |
| Serverless NEGs pointing to Cloud Run services (the Cloud Run service must listen on a plaintext gRPC port, be configured to accept HTTP/2 traffic and allow unauthenticated access) |

### Limitations

| Area | Limit |
|------|-------|
| Headers that can't be manipulated | `X-user-IP`, `CDN-Loop`, headers starting with `X-Forwarded`, `X-Google`, `X-GFE` or `X-Amz-`, `connection`, `keep-alive`, `transfer-encoding`, `te`, `upgrade`, `proxy-connection`, `proxy-authenticate`, `proxy-authorization`, `trailers` |
| Extra for traffic and authorization extensions | `:method`, `:authority`, `:scheme` and host headers can't be manipulated |
| `HeaderMutation` | The `value` field is ignored when a gRPC server specifies header values; use `raw_value` |
| Disallowed header name or value in `CheckResponse` | Request is rejected with `500 Internal Error` |
| gRPC response message size | 128 kB maximum; larger closes the stream with `RESOURCE_EXHAUSTED` |
| Callout backend service | Can't use Cloud Armor, IAP or Cloud CDN policies; must use HTTP/2 |
| Authorization extensions | Load balancer doesn't forward any request body |
| Route extensions | Callout backend can't override the processing mode of the `ext_proc` stream |
| HTTP/1.1 body processing (`ext_proc` only) | With `REQUEST_BODY` or `RESPONSE_BODY` configured, a matching request loses the `Content-Length` header on the response and uses chunked encoding; the proxy might send a trailing empty `ProcessingRequest` with `end_stream` set to `true` |
| Edge, authorization and route extensions | HTTP headers only; can't inspect or mutate bodies |

## Notes

- Data flow: after receiving request headers, the proxy sends `ProcessingRequest` with `request_headers` set; the service must answer with a matching `ProcessingResponse`, or set `immediate_response` to end processing and reply to the client. For `REQUEST_HEADER` and `RESPONSE_HEADER` events, use the `raw_value` field for headers.
- Traffic extensions can override the processing mode dynamically; load balancers don't reevaluate route rules after calling a traffic extension.
- For route and traffic extensions, callouts run asynchronously when `observabilityMode` is `true` and the body mode is `STREAMED` (default); responses, if any, are ignored.
- Forwarded attributes appear in the map under a key such as `envoy.filters.http.ext_proc`; keys correspond to names in `forwardAttributes`.
- In `ext_authz`, `status` `OK` allows the request, any other status denies it; `dynamic_metadata` is optional metadata for later extensions such as traffic extensions.
- `FULL_DUPLEX_STREAMED` warning in the source: the proxy fail-opens up to the first chunk of body data; errors after that are fail-closed and propagated to the end user.
- Latency tips from the source: deploy callouts in the same zones as the destination backend service; for a cross-region internal Application Load Balancer use the region of the proxy-only subnets; for a global external Application Load Balancer place callout backends where the destination VMs, GKE workloads and Cloud Run functions are; set `supported_events` to `REQUEST_HEADERS` when only request headers are needed.
- The sample deployment shows a gRPC server on a VM or GKE cluster exposed to the load balancer as a regular backend service.
- A Serverless NEG callout on Cloud Run must allow unauthenticated access, which makes the Cloud Run service publicly invokable (as the source requires), so anyone who can reach its URL can invoke it.
- The source's `ext_proc` and `ext_authz` blocks are abbreviated proto fragments, kept as `text`.
- Google Cloud Load Balancing callouts, not Cloudflare or Vercel (see `cloudflare-workers`, `vercel`).
- Source inconsistency: this page says "Edge, authorization, and route extensions support only HTTP headers. These extensions can't inspect or mutate HTTP bodies" and "For authorization extensions, the load balancer doesn't forward any request body to the callout backend service", but its body processing modes table lists `FULL_DUPLEX_STREAMED` for "route extensions (requests)" and the load balancer extensions overview (https://docs.cloud.google.com/service-extensions/docs/lb-extensions-overview, retrieved 2026-11-17) says "Extensions invoked by authorization policies of the `CONTENT_AUTHZ` profile type receive headers, body, and trailers of requests and responses".
- Source: https://docs.cloud.google.com/service-extensions/docs/callouts-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-callout-backend-service.md](./configure-callout-backend-service.md)
- [configure-traffic-extensions.md](./configure-traffic-extensions.md)
- [lb-extensions-overview.md](./lb-extensions-overview.md)
- [swp-extensions-overview.md](./swp-extensions-overview.md)
- [attributes.md](./attributes.md)
