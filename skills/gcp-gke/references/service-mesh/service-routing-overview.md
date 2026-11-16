---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/service-routing-overview
---

# Cloud Service Mesh service routing APIs overview

The service routing APIs configure Cloud Service Mesh with Google Cloud APIs (not Istio APIs) for Compute Engine VMs with Envoy and proxyless gRPC clients. They use `Mesh`, `Gateway` and `Route` resources (`HTTPRoute`, `GRPCRoute`, `TCPRoute`, `TLSRoute`). The Google Cloud console does not support them; use the Google Cloud CLI or REST APIs.

## Signature / Usage

### Inspect a Mesh

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-services/meshes/describe (the source page itself has no code).

```bash
gcloud network-services meshes describe my-mesh --location=global
```

## Options / Props

| Resource | Purpose |
|---|---|
| `Mesh` | Logical service mesh in a project (name unique per project, immutable after creation); east-west traffic for Envoy sidecars, proxyless gRPC, or a mix |
| `Gateway` | Envoy proxies as ingress gateways (north-south); listening ports plus a mandatory `scope`; Envoy data plane only (no proxyless gRPC); `type` is reserved, only `OPEN_MESH` (default, immutable) |
| `HTTPRoute`, `GRPCRoute`, `TCPRoute`, `TLSRoute` | Per-protocol routing to backend services (MIG or NEG backends); may reference both `Mesh` and `Gateway`; there is no generic `Route` resource |

### Data plane support

| Data plane | Supported Routes |
|---|---|
| Envoy sidecar | `HTTPRoute`, `GRPCRoute`, `TCPRoute`, `TLSRoute` |
| Proxyless gRPC | `GRPCRoute` only (limited to features gRPC proxyless supports) |

### IAM permissions

| Who | Permissions |
|---|---|
| Mesh administrators | `networkservices.mesh.*` |
| Gateway administrators | `networkservices.gateways.*` |
| Service owners | `networkservices.grpcRoutes.*`, `networkservices.httpRoutes.*`, or `networkservices.tcpRoutes.*` |
| Grant to service owners to attach Routes | `networkservices.mesh.use` (same model for `Gateway`) |

`roles/compute.networkAdmin` has `networkservices.*` by default; no other predefined role is required. Custom roles may need the permissions added.

## Notes

- This page covers `Gateway` as a Cloud Service Mesh network services resource for Envoy ingress. It is distinct from Kubernetes Gateway API resources on GKE and from Cloud Load Balancing configured directly (planned `gcp-networking`).
- `TLSRoute`: routes by SNI and ALPN, implies TLS passthrough (TLS terminates at the backend; encrypted `ClientHello` unsupported); supported only with Envoy sidecars or gateways.
- `Gateway` `scope` groups and merges configuration of several `Gateway` resources (for example port 80 and 443); Envoy proxies must use the same scope in their bootstrap. The scope is mandatory even for one gateway. Creating a `Gateway` does not deploy Envoy and does not provision a managed load balancer.
- Multi-project: a `Mesh` in a central administration project can be referenced by `Route` resources in other projects given VPC connectivity (Shared VPC or VPC Network Peering).
- All traffic is intercepted automatically with `Mesh` and `Gateway`.
- Considerations: xDS v3 or later (Envoy 1.20.0 minimum; gRPC bootstrap generator v0.14.0 minimum); only Compute Engine VMs with automatic Envoy deployment and GKE Pods with automatic Envoy injection (no manual deployment); not backward compatible with older APIs; a port matched by a `TCPRoute` attached to a `Mesh` cannot serve other routes even on different IPs; automatically deployed ingress Envoys must not use `serving_ports` in `--service-proxy`; automatic Envoy cannot use a project number different from the VM's project.
- TCP traffic splitting by weight is supported; `HTTPRoute` can split traffic (for example 70% / 30%).
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/service-routing-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/meshes/describe (gcloud 593.0.0 help text, retrieved 2026-11-14)

## Related

- [quotas.md](./quotas.md)
- [overview.md](./overview.md)
- [supported-platforms.md](./supported-platforms.md)
