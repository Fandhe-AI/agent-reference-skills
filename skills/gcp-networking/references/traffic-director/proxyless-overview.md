---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/proxyless-overview
---

# Cloud Service Mesh with proxyless gRPC services overview

Architecture, use cases and name-resolution behavior of Cloud Service Mesh with proxyless gRPC services. Cloud Service Mesh uses open source xDS APIs to configure gRPC applications directly, so gRPC clients join a service mesh without a sidecar proxy. This guide only supports Cloud Service Mesh with Google Cloud APIs, not Istio APIs.

## Signature / Usage

### Resources to configure for proxyless gRPC

The source shows a diagram of the resources: health check, backend service (protocol `GRPC`, load-balancing scheme `INTERNAL_SELF_MANAGED`) and backends (managed or unmanaged instance groups in Compute Engine, zonal NEGs in GKE). The Mesh and GRPCRoute that tie them to an `xds:///` hostname look like this.

```yaml
name: grpc-mesh
```

```yaml
name: helloworld-grpc-route
hostnames:
- helloworld-gce
meshes:
- projects/PROJECT_NUMBER/locations/global/meshes/grpc-mesh
rules:
- action:
    destinations:
    - serviceName: projects/PROJECT_NUMBER/locations/global/backendServices/grpc-helloworld-service
```

## Options / Props

### Name resolution

| Item | Behavior |
|------|----------|
| Scheme | Set `xds` as the name resolution scheme in the gRPC client channel. Target URI format: `xds:///hostname:port`. |
| Default port | 80 when the port is not specified (for example `xds:///example.hostname`). |
| Resolution | The client sends a listener discovery service (LDS) request to Cloud Service Mesh. Cloud Service Mesh finds forwarding rules with a matching port, then the URL map host rule matching `hostname:port`, and returns the routing configuration. |
| Host rule uniqueness | Host rules must be unique across all URL maps. `example.hostname`, `example.hostname:80` and `example.hostname:8080` are all different rules. |
| Sidecar clients | gRPC clients with sidecar proxies use the `dns` name resolution scheme. |

### Resource requirements

| Resource | Requirement |
|----------|-------------|
| Health check | gRPC health check can check a service on a backend VM or NEG. If the server does not implement the gRPC health checking protocol, use a TCP health check; do not use HTTP, HTTPS or HTTP/2 health checks. |
| Backend service | Set the protocol field to `GRPC`. The load-balancing scheme must be `INTERNAL_SELF_MANAGED` in all Cloud Service Mesh deployments. A `GRPC` backend service can also be reached through a sidecar proxy, in which case the client must not use the `xds` scheme. |
| Backends | Managed or unmanaged instance groups in Compute Engine; zonal NEGs in Google Kubernetes Engine. |

### Use cases

- Resource efficiency in a large-scale service mesh (hundreds or thousands of clients and backends).
- High-performance gRPC applications (reduced latency without client-side and server-side sidecars).
- Environments where you cannot deploy sidecar proxies or configure request interception (for example with `iptables`).
- Heterogeneous mesh mixing proxyless gRPC and Envoy.
- Gradual migration from proxies to proxyless: create a new Cloud Service Mesh service that the proxyless client uses; the same APIs configure both.

## Notes

- Some Cloud Service Mesh capabilities are not supported with proxyless gRPC (see the features and limitations pages). If you need an unsupported feature, use Envoy with your gRPC applications. Some limits are inherent to RPCs; for example HTTP redirects with gRPC are not supported.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Snippet taken from https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-proxyless-mesh (the source page for this overview has no code).
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/proxyless-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-service-routing-envoy-proxyless.md](./prepare-service-routing-envoy-proxyless.md)
- [set-up-proxyless-mesh.md](./set-up-proxyless-mesh.md)
- [limitations-proxyless.md](./limitations-proxyless.md)
- [features.md](./features.md)
