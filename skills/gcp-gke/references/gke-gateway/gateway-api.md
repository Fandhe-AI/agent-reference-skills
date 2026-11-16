---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-api
---

# Gateway API

The GKE implementation of the Kubernetes Gateway API through the GKE Gateway controller. Gateway API is a role-oriented, portable, expressive successor to Ingress (header matching, traffic weighting and CORS without custom annotations). It defines GatewayClass, Gateway, HTTPRoute, TLSRoute, Policy and ReferenceGrant resources.

## Signature / Usage

### Gateway and HTTPRoute equivalent of an Ingress

A single Ingress corresponds to both a Gateway (frontend configuration) and an HTTPRoute (routing configuration). Gateway and HTTPRoute can be created separately, also by different users.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
spec:
  gatewayClassName: gke-l7-rilb
  listeners:
  - name: http
    protocol: HTTP
    port: 80
    allowedRoutes:
      kinds:
      - kind: HTTPRoute
```

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: my-route
spec:
  parentRefs:
  - name: my-gateway
  hostnames:
  - "example.com"
  rules:
  - matches:
    - path:
        value: /
    backendRefs:
    - name: site
      port: 80
  - matches:
    - path:
        value: /shop
    backendRefs:
    - name: store
      port: 80
```

### Cross-namespace reference (ReferenceGrant)

To let an HTTPRoute in the `frontend` namespace route to a Service in the `backend` namespace, create a ReferenceGrant in the `backend` namespace. `from` lists the source namespace and resource type; `to` lists the target resource type.

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: allow-frontend-to-access-backend
  namespace: backend
spec:
  from:
  - group: gateway.networking.k8s.io
    kind: HTTPRoute
    namespace: frontend
  to:
  - group: ""
    kind: Service
```

## Options / Props

### GatewayClasses

| GatewayClass name | Underlying load balancer | Supported cluster stack types |
| --- | --- | --- |
| `gke-l7-global-external-managed` | Global external Application Load Balancer | IPv4-only, dual-stack, IPv6-only |
| `gke-l7-regional-external-managed` | Regional external Application Load Balancer and regional external proxy Network Load Balancer | IPv4-only, dual-stack, IPv6-only |
| `gke-l7-rilb` | Internal Application Load Balancer and regional internal proxy Network Load Balancer | IPv4-only, dual-stack, IPv6-only |
| `gke-l7-gxlb` | Global external Application Load Balancer (classic) | IPv4-only, dual-stack |
| `gke-l7-cross-regional-internal-managed-mc` | Multi-cluster cross-region internal Application Load Balancer and proxy Network Load Balancer | IPv4-only, dual-stack |
| `gke-l7-global-external-managed-mc` | Multi-cluster global external Application Load Balancer | IPv4-only, dual-stack |
| `gke-l7-regional-external-managed-mc` | Multi-cluster regional external Application Load Balancer and proxy Network Load Balancer | IPv4-only, dual-stack |
| `gke-l7-rilb-mc` | Multi-cluster internal Application Load Balancer and proxy Network Load Balancer | IPv4-only, dual-stack |
| `gke-l7-gxlb-mc` | Multi-cluster global external Application Load Balancer (classic) | IPv4-only, dual-stack |
| `gke-td` | Multi-cluster Cloud Service Mesh | IPv4-only |
| `asm-l7-gxlb` | Global external Application Load Balancer built on Cloud Service Mesh | IPv4-only |

### Resource types

| Resource | Purpose |
| --- | --- |
| GatewayClass | Cluster-scoped template for load balancers; GKE provides the classes. |
| Gateway | Where and how the load balancer listens; created by cluster operators from a GatewayClass. |
| HTTPRoute | HTTP(S) routing rules from a Gateway to Services; filters for header modification, redirect, rewrite and CORS. |
| TLSRoute | Layer 4 routing of TLS streams by SNI hostname (exact or wildcard) without terminating TLS (TLS passthrough). |
| Policy | Implementation-specific characteristics attachable to a Gateway, Route or Service. |
| ReferenceGrant | Permission for cross-namespace references (needed in the namespace of the referenced object). |

### Policies supported by the GKE Gateway controller

| Policy | Purpose |
| --- | --- |
| HealthCheckPolicy | Health check parameters and behavior for backend Pods. |
| GCPGatewayPolicy | Frontend parameters of the load balancer (similar to Ingress FrontendConfig). |
| GCPBackendPolicy | How backend services distribute traffic to endpoints (similar to BackendConfig); supports the `CUSTOM_METRICS` balancing mode (ORCA load reports). |
| GCPTrafficDistributionPolicy | How traffic is distributed across endpoints within a backend. |
| GCPAuthzPolicy | Identity-based access control at the Gateway for north-south traffic. |

### Gateway controller versions

| Item | Single-cluster | Multi-cluster |
| --- | --- | --- |
| Managed by | Google Cloud | Google Cloud |
| Scope | Single cluster Gateways | Multi-cluster Gateways |
| Deployment | Regionally, in the same region as its GKE cluster | Globally across multiple Google Cloud regions |
| Enablement | Enabled by default in GKE | Multi Cluster Ingress API and registration into a fleet |
| GatewayClasses | `gke-l7-global-external-managed` (GA), `gke-l7-regional-external-managed` (GA), `gke-l7-rilb` (GA), `gke-l7-gxlb` (GA), `asm-l7-gxlb` (Preview) | `gke-l7-global-external-managed-mc` (GA), `gke-l7-regional-external-managed-mc` (GA), `gke-l7-cross-regional-internal-managed-mc` (GA), `gke-l7-rilb-mc` (GA), `gke-l7-gxlb-mc` (GA), `gke-td` (Preview) |

### Service Extensions (Preview)

| Extension | Purpose |
| --- | --- |
| GCPTrafficExtension | Custom logic that modifies request and response headers and payloads without changing backend selection or security policies. |
| GCPRoutingExtension | Custom logic that controls where traffic is routed for a request. |
| GCPAuthzExtension | Delegates authorization decisions to custom or third-party engines via service callouts (for example Identity-Aware Proxy). |

## Notes

- Gateway resources (`gke-l7-rilb`, `gke-l7-regional-external-managed`, `gke-l7-global-external-managed`) run on single-stack IPv4, dual-stack, or single-stack IPv6 clusters (IPv6 single-stack is Preview). Frontend and backend can use different IP versions because the load balancer terminates client connections.
- Prefer `gke-l7-global-external-managed(-mc)` over `gke-l7-gxlb(-mc)` for a global external Application Load Balancer, for the advanced security and traffic management capabilities.
- Gateway and Route binding is bidirectional: both resources must select each other. All HTTPRoutes attached to one Gateway are compiled into a single URL map and share its quotas and limits.
- LbPolicy is replaced by GCPBackendPolicy; LbPolicy is still supported but without additional attributes.
- Usage patterns: self-managed Gateway, platform-managed Gateway per Namespace, shared Gateway per cluster, shared Gateway per Fleet (multi-cluster Gateway with ServiceImports). Gateways restrict which Namespaces may attach Routes.
- "No valid reference grant found" in the Gateway status means the `group`, `kind`, `namespace` and `name` values in `from` and `to` are not valid.
- The controllers are Google-hosted (not on GKE control planes or in the user project), are GA, are not a data plane and process no traffic. Several controllers, including non-Google ones, can coexist; each GatewayClass is served by exactly one controller.
- Ingress and Gateway can be used at the same time; Google recommends moving to Gateway over time.
- Compute Engine resources created by the controllers are charged to the cluster's project. The single-cluster controller has no additional charge in GKE Standard and Autopilot; multi-cluster Gateway has separate pricing.
- These are Kubernetes Gateway API resources on GKE, not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (planned `gcp-networking`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-api (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gateway-security.md](./gateway-security.md)
- [configure-gateway-resources.md](./configure-gateway-resources.md)
