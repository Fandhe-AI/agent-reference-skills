---
source: https://docs.cloud.google.com/service-mesh/docs/supported-features-managed
---

# Supported features using Istio APIs (managed control plane)

Supported features and limitations of managed Cloud Service Mesh with the `TRAFFIC_DIRECTOR` or `ISTIOD` control plane implementation. The managed `ISTIOD` implementation is deprecated and only exists for existing users; new installations use `TRAFFIC_DIRECTOR` when possible.

## Signature / Usage

### Inspect the control plane implementation

Snippet taken from https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane. The `implementation` field shows which one is in use.

```bash
gcloud container fleet mesh describe --project FLEET_PROJECT_ID
```

## Options / Props

Legend: Yes = available and enabled by default; Yes† = APIs may differ per platform / subset of fields; Yes\* = supported and can be enabled; No = unavailable or unsupported. Columns: Managed (TD) = `TRAFFIC_DIRECTOR`; Managed (istiod) = deprecated `ISTIOD`.

### Which implementation a fleet gets

New fleets receive `TRAFFIC_DIRECTOR` with these exceptions (`ISTIOD` is used): existing managed users onboarding a new fleet in the same organization until at least June 30, 2024 (incompatible usage until September 8, 2024); any GKE cluster in the fleet with an in-cluster Cloud Service Mesh control plane; any cluster in the fleet using GKE Sandbox.

### Limits and constraints

| Item | Limit |
|---|---|
| Fleet | All clusters of one mesh in the same fleet; other clusters in the project must not be registered to a different fleet |
| Regions / versions | Supported regions (below) and supported GKE versions only |
| `hostNetwork: true` pods | Not supported |
| Coexisting in-cluster OSS Istio or in-cluster Cloud Service Mesh control plane | Not allowed in the same cluster |
| Changing release channels | Not supported |
| `asmcli` managed to fleet API migration; `--management manual` to `automatic` | Not supported |
| Migration from in-cluster | Canary cluster migration only; only from supported in-cluster versions with Mesh CA or CAS (Istio CA must first migrate to Mesh CA) |
| Multi-cluster | Multi-primary only; primary-remote not supported |
| Unsupported APIs | `WasmPlugin`, `IstioOperator`, Kubernetes `Ingress` |
| DNS domain | Only `.cluster.local` |
| Managed data plane | Only workloads without additional sidecars |
| `istioctl ps` | Not supported; use `gcloud beta container fleet mesh debug` |

Provisioning overwrites existing Istio CRDs in the cluster. New installations fetch JWKS via Envoy only (equivalent to `PILOT_JWT_ENABLE_REMOTE_JWKS=envoy`) unless other fleet clusters differ; extra `ServiceEntry` and `DestinationRule` may be needed.

### Feature matrix (selected; TD / istiod)

| Feature | TD | istiod |
|---|---|---|
| Autopilot clusters | Yes | Yes |
| Environments outside Google Cloud (on-premises, other clouds, EKS, AKS) | No | No |
| Multi-network | No | No |
| Multi-project with Shared VPC | Yes | Yes |
| Multi-cluster endpoint discovery with declarative API | Yes | Yes |
| Endpoint discovery with remote secrets | No | Yes |
| Distroless proxy image | Yes | Yes |
| VPC Service Controls | Yes | Yes |
| Cloud Service Mesh CA / Certificate Authority Service | Yes | Yes |
| Istio CA / custom CAs | No | No |
| IAP integration, end-user authentication, dry-run, denial logging | Yes | Yes |
| mTLS PERMISSIVE / STRICT (STRICT is Yes\*) | Yes | Yes |
| mTLS DISABLE in `PeerAuthentication` | No † | Yes |
| JWT claim-based routing; JWT copy claim to headers | No | Yes |
| Cloud Monitoring HTTP in-proxy metrics / TCP in-proxy metrics | Yes / No | Yes / No |
| Istio Telemetry API | No † (subset for access logs and traces) | No |
| Cloud Trace | Yes\* | Yes\* |
| Jaeger / Zipkin | No | Compatible |
| `iptables` via init containers with `CAP_NET_ADMIN` | No | Yes |
| Istio CNI | Yes | Yes |
| IPv6 | Yes | No |
| Sidecars, ingress gateway, egress from sidecars | Yes | Yes |
| Kubernetes Gateway API | No | No |
| `EnvoyFilter` v1alpha3 | Yes† | No |
| `ServiceEntry` / `DestinationRule` / `Sidecar` v1beta1 | Yes† (subset) | Yes |
| Headless `Service` name resolution (DNS proxy) | No | Yes |
| `GCPTrafficDistributionPolicy`, `GCPBackendPolicy` | Yes | No |
| Balancing mode IN-FLIGHT | Yes | No |
| CUSTOM_METRICS balancing mode | No | No |
| MeshConfig `CACert` | No | Yes |
| MeshConfig `defaultProviders.accessLogging` / `tracing` | Yes | No |
| ProxyConfig HTTP/1.0 support, image selection | No | Yes |
| Kubernetes native sidecar (`ENABLE_NATIVE_SIDECARS`) | No | No |

† `PeerAuthentication` `DISABLE` mode: disable mTLS for specific services or ports with `DestinationRule`. † DNS proxy features need sidecar `1.21.5-asm.39` or later. † `DestinationRule` subsets must be in the same namespace and cluster as the Kubernetes service or `ServiceEntry`.

### Protocols

IPv4, HTTP/1.1, HTTP/2, TCP byte streams, gRPC supported. L7 handling is not supported for WebSocket, MongoDB, Redis, MySQL, Kafka, Cassandra, RabbitMQ, Cloud SQL (TCP byte stream may work). TCP metrics are collected but not reported; the console shows metrics only for HTTP services. Proxyless gRPC dual-stack needs gRPC 1.66.1+ (C++, Python), Go v1.71, Node.js v1.12.

### Regions

GKE clusters must be in one of these regions or any zone within them: africa-south1, asia-east1, asia-east2, asia-northeast1, asia-northeast2, asia-northeast3, asia-south1, asia-south2, asia-southeast1, asia-southeast2, australia-southeast1, australia-southeast2, europe-central2, europe-north1, europe-north2, europe-southwest1, europe-west1, europe-west2, europe-west3, europe-west4, europe-west6, europe-west8, europe-west9, europe-west10, europe-west12, me-central1, me-central2, me-west1, northamerica-northeast1, northamerica-northeast2, northamerica-south1, southamerica-east1, southamerica-west1, us-central1, us-east1, us-east4, us-east5, us-south1, us-west1, us-west2, us-west3, us-west4.

## Notes

- Managed `ISTIOD` is deprecated; modernize every managed `ISTIOD` fleet to `TRAFFIC_DIRECTOR` (see deprecations.md).
- Managed Cloud Service Mesh can be used without a GKE Enterprise subscription, but some console UI is subscriber-only.
- Distroless: directly onboarded `TRAFFIC_DIRECTOR` clusters use distroless by default and cannot change it; migrated clusters use the default image and can opt in to distroless. Overrides to `debug` are unsupported. Use ephemeral containers to inspect distroless pods.
- Default and optional features get full Google Cloud Support; unlisted features are best-effort. Third-party telemetry (Grafana, Prometheus, Jaeger, Zipkin, Kiali) has no compatibility guarantee.
- JWT notes: third-party JWT is on by default; use the full FQDN in JWKS URI; the managed control plane makes Envoy fetch JWKS; AES CBC algorithms A128CBC-HS256, A192CBC-HS384, A256CBC-HS512 are not allowed in inlined JWKS with `TRAFFIC_DIRECTOR`.
- The source page also contains per-feature links; only a selection of the matrix is kept here.
- Source inconsistency: the Kubernetes Gateway API row says "No | No" for both managed implementations, while managed-control-plane-overview.md says `TRAFFIC_DIRECTOR` is "Current (Istio APIs, Gateway API or Google Cloud APIs)". The source does not reconcile the two.
- Source: https://docs.cloud.google.com/service-mesh/docs/supported-features-managed (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-control-plane-overview.md](./managed-control-plane-overview.md)
- [provision-control-plane.md](./provision-control-plane.md)
- [supported-platforms.md](./supported-platforms.md)
- [deprecations.md](./deprecations.md)
