---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/limitations-proxyless
---

# Proxyless gRPC limitations

Limitations of Cloud Service Mesh with proxyless gRPC applications. Limitations on forwarding rules, URL maps and target proxies apply only to Cloud Service Mesh with the Google Cloud load balancing APIs. This guide only supports Google Cloud APIs, not Istio APIs. For quotas and limits see the Cloud Service Mesh quotas and limits page.

## Signature / Usage

URL map features supported in the `pathMatcher` of `hostRules` with proxyless gRPC (an outline in the source, not a valid YAML document):

```text
pathMatcher
  name
  description
  defaultService
  defaultRouteAction
     weightedBackendServices
       backendService
       weight
    retryPolicy
       retryConditions
       numRetries
    faultInjectionPolicy
    maxStreamDuration
  pathRules
    service
    routeAction
      weightedBackendServices
         backendService
         weight
      retryPolicy
         retryConditions
         numRetries
      faultInjectionPolicy
      maxStreamDuration
    paths
  routeRules
    priority
    description
    matchRules
        prefixMatch
        fullPathMatch
        headerMatches
        metadataFilters
    service
    routeAction
      weightedBackendServices
         backendService
         weight
      retryPolicy
         retryConditions
         numRetries
      faultInjectionPolicy
      maxStreamDuration
```

## Options / Props

### General

| General |
|---|
| Backend services and routing rule maps with the gRPC protocol cannot be configured in the Google Cloud console (read-only there). |
| Proxyless gRPC supports endpoint discovery, routing, load balancing, load reporting and many advanced traffic management features; minimum gRPC versions apply to some features. |
| For unsupported advanced traffic management features, use the DNS name resolver instead of xDS and deploy with sidecar proxies; set `validateForProxyless` to `FALSE` in the target gRPC proxy to configure features gRPC does not support yet. |
| Only round-robin and ring hash load-balancing policies are supported. Cloud Service Mesh gives the client a prioritized weighted list of localities (one instance group or NEG each), computed from closest available zone, capacity and balancing mode. |
| Failover from one zone (locality) to another starts when the current zone capacity falls under 50%; this threshold cannot be configured. |
| Target gRPC proxy and forwarding rule configuration commands can take up to a minute. |
| Hybrid connectivity NEGs (`NON_GCP_PRIVATE_IP_PORT`) are not supported with proxyless gRPC clients. |

### URL map limitations

| Item | Limitation |
|------|------------|
| Wildcards | Wildcards in host rules and default rules (including the implicit `*` host rule) are not supported; such entries are skipped in host matching. |
| Unsupported | `queryParameterMatches` in `routeRules`; route actions `headerAction`, `urlRewrite`, `requestMirrorPolicy`, `corsPolicy`, `urlRedirect`; `timeout` (use `maxStreamDuration`); `perTryTimeout` in `retryPolicy`; `headerAction` in `weightedBackendServices`. |
| `retryConditions` | Only one or more of `cancelled`, `deadline-exceeded`, `internal`, `resource-exhausted`, `unavailable`. |
| URL map defaults | `defaultService`, `defaultRouteAction`, `defaultUrlRedirect` and `headerAction` of the URL map are not used. If no host rule matches, a name lookup error is returned. |
| Header matching | Only non-binary user-specified custom metadata and `content-type` are supported. Not usable: `:authority`, `:method`, `:path`, `:scheme`, `user-agent`, `accept-encoding`, `content-encoding`, `grpc-accept-encoding`, `grpc-encoding`, `grpc-previous-rpc-attempts`, `grpc-tags-bin`, `grpc-timeout`, `grpc-trace-bin`. |
| Changing a host rule's backend service | Traffic might be dropped momentarily. Use traffic splitting with weighted backend services and shift traffic slowly. |

### Service Directory limitations

| Service Directory limitations |
|---|
| Network reachability for clients is not guaranteed. |
| A backend service can reference only one of: instance groups, a network endpoint group, or service bindings. |
| Service Directory services can only be used with global backend services with `load-balancing-scheme=INTERNAL_SELF_MANAGED`. |
| A Service Directory service referenced by a service binding can be deleted, after which requests fail. |
| A backend service bound to a Service Directory service cannot have a health check. |

## Notes

- Target gRPC proxy limitations: With a URL map referenced by a target gRPC proxy (sidecar or proxyless), these cannot be configured: `queryParameterMatches` match rule, `urlRewrite`, `urlRedirect` route actions, `corsPolicy`.
- Backend service limitations: Not supported with proxyless gRPC services: `localityLbPolicy` except `LEAST_REQUEST` (Java clients only), `ROUND_ROBIN`, `RING_HASH`; `sessionAffinity` except `HEADER_FIELD` and `NONE`; `consistentHash` except `httpHeaderName` and `minimumRingSize`; `affinityCookieTtlSec`; `timeoutSec` (use `maxStreamDuration`); `circuitBreakers` except `maxRequests`.
- Backend service limitations: A gRPC client NACKs configuration with unsupported values. Because xDS rejects all resources in a response, configuration for all backend services is rejected and the channel enters a transient error state until fixed. Make sure all clients support a value before configuring it (for example, before changing `ROUND_ROBIN` to `RING_HASH`, upgrade all clients).
- Changing a backend service value that clients do not support, or deleting a bound Service Directory service, can break traffic; try such changes on disposable resources first.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source inconsistency: this page says the zone failover threshold of 50% "cannot be configured", but the advanced load balancing page (https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-advanced-load-balancing, retrieved 2026-11-17) describes `failoverHealthThreshold` in a service load balancing policy (values 1 to 99; defaults 50 for proxyless gRPC and 70 for Envoy).
- Source inconsistency: this page says proxyless gRPC "supports only round-robin and ring hash load balancing", but its own list of unsupported `localityLbPolicy` values excludes `LEAST_REQUEST` (with Java clients only), `ROUND_ROBIN` and `RING_HASH`, so `LEAST_REQUEST` is supported with Java clients.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/limitations-proxyless (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [limitations.md](./limitations.md)
- [proxyless-overview.md](./proxyless-overview.md)
- [features.md](./features.md)
- [advanced-traffic-management.md](./advanced-traffic-management.md)
