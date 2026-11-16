---
source: https://docs.cloud.google.com/service-mesh/docs/overview
---

# Cloud Service Mesh overview

Cloud Service Mesh is Google's service mesh for Google Cloud and supported GKE platforms. On Google Cloud, GKE workloads use the open source Istio APIs and Compute Engine workloads use Google Cloud service routing APIs; off Google Cloud (Distributed Cloud or GKE multicloud) it supports the Istio APIs for Kubernetes workloads. It is for new users and for continuing Anthos Service Mesh or Traffic Director customers.

## Signature / Usage

### Check the control plane of a fleet

Snippet taken from https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane. The `implementation` field shows `ISTIOD` or `TRAFFIC_DIRECTOR`.

```bash
gcloud container fleet mesh describe --project FLEET_PROJECT_ID
```

## Options / Props

### Deployment options

| Location | Option | Status |
|---|---|---|
| On Google Cloud | Managed Cloud Service Mesh - managed control and data plane for GKE | Recommended |
| On Google Cloud | Managed Cloud Service Mesh - managed control and data plane for Compute Engine with VMs | Recommended |
| On Google Cloud | In-cluster control plane for GKE with Istio APIs | Deprecated |
| Off Google Cloud | In-cluster control plane for Kubernetes with Istio APIs | Supported |

### Control plane by user type

| User | Control plane / APIs |
|---|---|
| Existing, off Google Cloud | In-cluster, unmanaged control plane |
| Existing Anthos Service Mesh on Google Cloud | Istio APIs (managed control plane) |
| Existing Traffic Director | Managed control plane with Google Cloud APIs |
| New, off Google Cloud | In-cluster, unmanaged control plane |
| New, on GKE | Istio APIs with the Traffic Director control plane implementation |
| New, on Compute Engine VMs | Traffic Director control plane implementation (Google Cloud APIs) |

## Notes

- A mesh has one or more control planes and a data plane. On Kubernetes a proxy is deployed as a sidecar; on Compute Engine you can deploy proxies on VMs or use proxyless gRPC.
- Features: traffic management at L7 (service discovery, load balancing, canary and blue-green, routing control, circuit breakers), observability (metrics and logs for HTTP traffic in GKE mesh clusters, dashboards, SLOs, backed by Cloud Monitoring, Cloud Logging, Cloud Trace), security (mTLS peer authentication instead of bearer tokens, encryption in transit, mTLS identity in access logs, FIPS 140-2 validated modules in in-cluster components and proxies).
- Data plane: with Google Cloud APIs it is Envoy proxies or proxyless gRPC (Go, C++, Java, Python); both use the xDS API. With Istio APIs it is Envoy proxies.
- Managed Cloud Service Mesh: Google handles upgrades, scaling and security of the control plane, data plane and related resources.
- If any fleet still uses the `ISTIOD` control plane implementation you must modernize it (see deprecations.md).
- Anthos Service Mesh and Traffic Director converged into Cloud Service Mesh.
- Source: https://docs.cloud.google.com/service-mesh/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [provision-control-plane.md](./provision-control-plane.md)
- [managed-control-plane-overview.md](./managed-control-plane-overview.md)
- [supported-platforms.md](./supported-platforms.md)
- [service-routing-overview.md](./service-routing-overview.md)
- [security-overview.md](./security-overview.md)
- [deprecations.md](./deprecations.md)
