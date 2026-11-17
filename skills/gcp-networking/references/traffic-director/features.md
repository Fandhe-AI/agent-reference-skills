---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/features
---

# Cloud Service Mesh with Google Cloud APIs supported features

Feature matrix for Cloud Service Mesh (Traffic Director) with Google Cloud APIs: an xDS-compatible data plane (open source Envoy or gRPC proxyless) plus Cloud Service Mesh as control plane. This guide only supports Google Cloud APIs, not Istio APIs. In the source tables, "N/A" means the feature cannot be supported in that configuration and a blank cell means not supported.

## Signature / Usage

Some features are available only with the load balancing APIs, but the source strongly recommends the service routing APIs and says not to create new deployments with the load balancing APIs. Example of a global mesh backend service (scheme `INTERNAL_SELF_MANAGED`, from the Envoy HTTP mesh guide):

```bash
gcloud compute backend-services create http-helloworld-service \
  --global \
  --load-balancing-scheme=INTERNAL_SELF_MANAGED \
  --protocol=HTTP \
  --health-checks http-helloworld-health-check
```

## Options / Props

### General

| Area | Support |
|------|---------|
| xDS version | xDS v3 only (migrate from v2) |
| Platforms | Compute Engine VMs, GKE container instances, Kubernetes on Compute Engine |
| Data plane topologies | Sidecar proxies, proxyless gRPC, middle proxies, edge proxies, mesh spanning multiple GKE clusters / Compute Engine VMs in multiple regions |
| Endpoints | VM and container apps in and outside the mesh, on-premises, multicloud |
| Configuration | REST API, Google Cloud console, Google Cloud CLI, Cloud Deployment Manager, Terraform |
| Proxyless gRPC languages | Java, Go, C++, Python, Ruby, PHP, Node |
| Request protocols | HTTP, HTTPS, HTTP/2, TCP, gRPC |
| Network topologies | Single network in a project, multiple meshes per project, multiple gateways per project, Shared VPC |
| Compliance | HIPAA; ISO 27001 / 27017 / 27018; SOC1 / SOC2 / SOC3; PCI DSS |

### Services management

Supported: automated deployment of sidecar proxies for Compute Engine VMs; automated injection of sidecar proxies for GKE Pods; hostname-based service discovery; autoscaling on CPU utilization; autoscaling on traffic load/serving capacity (Compute Engine MIGs only); autohealing on health checks; automatic endpoint registration for VMs and GKE Pods; API to add or remove endpoints.

### Service security

| Feature | Envoy | gRPC |
|---------|-------|------|
| TLS with GKE Pods | Yes | Yes |
| mTLS with GKE Pods | Yes | Yes |
| Access control and authorization | Yes | Yes |
| Rate limiting with Google Cloud Armor | Yes | No |

### Routing and traffic management

None of the advanced traffic management features are available with the target TCP proxy resource, and none are supported when handling TCP (non-HTTP(S)) traffic.

| Feature | Envoy (HTTP(S) or gRPC) | Proxyless gRPC |
|---------|-------------------------|----------------|
| Routing on hostname / path / headers / cookies | Yes | Yes |
| Routing on method / request parameters | Yes | N/A |
| Fault injection | Yes | Yes |
| Configurable timeouts | Yes | N/A (see max stream duration) |
| Retries | Yes | Yes, except per retry timeout |
| Redirects | Yes | No |
| URI rewrites | Yes | No |
| Request/response header transformations | Yes | No |
| Traffic splitting | Yes | Yes |
| Traffic mirroring | Yes | No |
| Outlier detection | Yes | Yes |
| Circuit breaking | Yes | Only `maxRequests` |
| Max stream duration | Yes | Yes |

### Load balancing

| Feature | Envoy (HTTP(S), TCP or gRPC) | Proxyless gRPC |
|---------|------------------------------|----------------|
| Region-based backend selection (nearest region with healthy capacity) | Yes | Yes |
| Rate-based (requests per second) balancing mode | Yes; not with TCP (non-HTTP(S)) traffic | Yes |
| Utilization-based balancing mode (VMs in Compute Engine instance groups only) | Yes | Yes |
| Configurable maximum capacity per backend (Compute Engine and GKE only) | Yes | Yes |
| `localityLbPolicy` | One built-in policy: round robin, least request, ring hash, random, original destination, Maglev | One built-in policy: round robin, ring hash; or a custom policy; or a list of preferred policies |

### Resiliency, capacity, failover, health checks, observability, session affinity

| Area | Support |
|------|---------|
| Weight-based traffic splits | Envoy and proxyless gRPC |
| Circuit breaking | Envoy; proxyless gRPC only `maxRequests` |
| Capacity | Automatic CPU-based tracking for MIG VMs; manual capacity and overrides (request rate) for MIGs and NEGs; manual capacity draining |
| Failover | Automatic to another zone in the same region and to the nearest region with healthy capacity |
| Health checks | gRPC, HTTP, HTTPS, HTTP/2, TCP; configurable port, intervals, timeouts, thresholds, request path (HTTP, HTTPS, HTTP/2), request string or path (TCP or SSL), expected response string |
| Observability | Service health dashboard, data plane logging and tracing with proxies; for proxyless gRPC the dashboard is available but data plane logging and tracing cannot be configured by Cloud Service Mesh (use for example OpenTelemetry) |

| Session affinity | HTTP(S) proxies | TCP proxies | Proxyless gRPC |
|------------------|-----------------|-------------|----------------|
| Client IP address | Yes | Yes | No |
| HTTP cookie | Yes | N/A | No |
| HTTP header | Yes | N/A | Yes |
| Generated cookie | Yes | N/A | No |

## Notes

- Snippet taken from https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-envoy-http-mesh (the source page for the feature matrix has no code).
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/features (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [limitations.md](./limitations.md)
- [limitations-proxyless.md](./limitations-proxyless.md)
- [advanced-traffic-management.md](./advanced-traffic-management.md)
- [xds-control-plane-apis.md](./xds-control-plane-apis.md)
