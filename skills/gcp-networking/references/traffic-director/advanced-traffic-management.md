---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/advanced-traffic-management
---

# Advanced traffic management overview

How Cloud Service Mesh routes requests and distributes traffic: `Mesh`, `Gateway`, `Route` resources and backend services, request handling, route actions, and backend traffic distribution policies. Supports Google Cloud APIs only, not Istio APIs. Traffic management can change without modifying application code.

## Signature / Usage

Routes are configured in `Route` resources, for example an `HTTPRoute` (snippet taken from https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-envoy-http-mesh):

```yaml
name: helloworld-http-route
hostnames:
- helloworld-gce
meshes:
- projects/PROJECT_NUMBER/locations/global/meshes/sidecar-mesh
rules:
- action:
   destinations:
   - serviceName: "projects/PROJECT_NUMBER/locations/global/backendServices/http-helloworld-service"
```

## Options / Props

### Resources

| Resource | Role |
|----------|------|
| `Mesh` | Identifies the mesh and the component forwarding traffic and applying policies; identifies the traffic interception port. |
| `Gateway` | Identifies middle proxies; listens on IP address:port pairs, forwards traffic and applies policies. |
| `HTTPRoute` | Only in meshes using Envoy proxies; all capabilities here are available. |
| `TCPRoute`, `TLSRoute` | Only in meshes using Envoy proxies. Traffic mirroring is not supported with them. |
| `GRPCRoute` | Envoy sidecar proxies and proxyless gRPC; some capabilities are not available with proxyless gRPC. |
| Backend service | The destination with which `Route` resources are associated. |

### Request handling

- Envoy: the HTTP host header is matched against `hostnames` of each `HTTPRoute` / `GRPCRoute` (only those have `hostnames`); the IP address is matched for `TCPRoute`; SNI and ALPN for `TLSRoute`. Routes attached to a `Mesh` or `Gateway` must have unique hostnames, the `TCPRoute` `IP:Port` must be unique and SNI / ALPN must be unique for `TLSRoute`, otherwise the configuration is rejected. With overlapping hostnames (`a.example.com` and `*.example.com`), the more specific route matches.
- Proxyless gRPC: clients use the `xds` scheme and resolve `hostname[:port]` by asking Cloud Service Mesh. Only the port of a `GRPCRoute` is compared to the port in the target URI (for example `xds:///example.hostname:8080`), and the target URI must exactly match the string in `hostnames`.
- After the destination backend service is selected, traffic is distributed per the backend service configuration. By default the client sends to the nearest healthy backend with capacity, using round robin across other backends.

### Actions

| Action | API field | Description |
|--------|-----------|-------------|
| Redirects | `redirect` | Configurable 3xx response; sets `Location` with host and path replaced as specified. |
| URL rewrites | `urlRewrite` | Rewrites host, path or both before sending to the backend service. |
| Header transformations | `requestHeaderModifier` / `responseHeaderModifier` | Adds or removes request and response headers. |
| Traffic mirroring | `requestMirrorPolicy` | Sends an identical request to a mirror backend service, fire and forget (no wait for response). |
| Weight-based traffic splitting | `weightDestination.serviceName` | Distributes matched traffic across backend services in proportion to weights (staged deployments, A/B testing). |
| Retries | `retryPolicy` | Retry conditions, wait before retrying, maximum retries. |
| Timeout | `timeout` | Route timeout, from fully processed request to fully processed response, includes all retries. |
| Fault injection | `faultInjectionPolicy` | Introduces errors (latency, overload, failures, network partitions) to test resiliency. |
| Security policies | `corsPolicy` | CORS settings. |

Each route rule specifies one of: route to a single service (`destination.serviceName`), split between services (`destination.weight`), or redirect (`redirect`). Any one of these can be combined with the add-on actions: header manipulation, mirroring, URL rewrite, retry, timeout, fault injection, CORS policy.

### HTTP versus gRPC matching

| | HTTP application | gRPC application |
|---|------------------|------------------|
| Host | Domain name part of the URL | Name in the channel URI, for example `xds:///example.com` |
| Path | Part after the hostname, for example `/video` | `:path` header, `/SERVICE_NAME/METHOD_NAME` (for example `/Example/Download`) |
| Other headers | | gRPC metadata as key-value pairs in HTTP/2 headers |

### Backend traffic distribution policies

| Policy | API field | Description |
|--------|-----------|-------------|
| Load-balancing mode | `balancingMode` | How a NEG or MIG is selected (concurrent connections, request rate). |
| Load-balancing policy | `localityLbPolicy` | Algorithm within a NEG or MIG (for example round robin or least request). |
| Session affinity | `sessionAffinity` | Best effort: client IP address, HTTP cookie, HTTP header, generated cookie. |
| Consistent hash | `consistentHash` | Soft session affinity on headers, cookies or other properties. |
| Circuit breakers | `circuitBreakers` | Upper limits on connections and requests per connection to a backend service. |
| Outlier detection | `outlierDetection` | Criteria to remove unhealthy backends or endpoints and add them back. Health is determined by the service's health check. |

## Notes

- Some actions (redirects, rewrites, header transformations, mirroring, per-try timeouts, CORS) are not available with proxyless gRPC; see the features and proxyless limitations pages.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/advanced-traffic-management (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [features.md](./features.md)
- [limitations.md](./limitations.md)
- [limitations-proxyless.md](./limitations-proxyless.md)
- [set-up-advanced-load-balancing.md](./set-up-advanced-load-balancing.md)
- [set-up-envoy-http-mesh.md](./set-up-envoy-http-mesh.md)
