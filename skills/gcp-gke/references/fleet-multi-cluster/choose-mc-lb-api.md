---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/choose-mc-lb-api
---

# Choose your multi-cluster load balancing API for GKE

Compares the three ways to attach a load balancer to a fleet of GKE clusters: Multi Cluster Ingress (MCI), multi-cluster Gateway (MCG), and a user-managed load balancer with Standalone NEGs. Features not listed in the table should be handled with a user-managed load balancer with Standalone NEGs instead of the Kubernetes-native API. The multi-cluster Gateway columns lag behind the multi-cluster Gateway concepts page (see Notes); check `multi-cluster-gateways.md` before choosing Standalone NEGs.

## Signature / Usage

The MCI resources use `networking.gke.io/v1`; the MCG path uses Gateway API resources plus `ServiceExport` (`net.gke.io/v1`) and `ServiceImport`. Minimal MCI `MultiClusterService` from the Multi Cluster Ingress concepts page:

```yaml
apiVersion: networking.gke.io/v1
kind: MultiClusterService
metadata:
  name: foo
  namespace: blue
spec:
  template:
    spec:
      selector:
        app: foo
      ports:
      - name: web
        protocol: TCP
        port: 80
        targetPort: 80
```

## Options / Props

### Platform

| Item | Multi Cluster Ingress | Multi-cluster Gateway | User-managed LB with Standalone NEGs |
| --- | --- | --- | --- |
| Launch stage | GA | GA | GA |
| Cluster mode | Standard / Autopilot | Standard / Autopilot | Standard / Autopilot |
| GKE version | 1.18 and later | 1.24 and later (Standard), 1.26 and later (Autopilot) | 1.18 and later |
| Google-managed controller | Yes (off-cluster, Google Cloud infrastructure) | Yes (off-cluster, Google Cloud infrastructure) | No |
| API | Kubernetes-native | Kubernetes-native | Google Cloud API (gcloud CLI) |
| API resources | MultiClusterIngress, MultiClusterService | GatewayClass, Gateway, HTTPRoute, \*Policy | - |
| API enablement on GKE | Cluster setting on Autopilot / Standard | Default on Autopilot; cluster setting on Standard | - |
| MCS required | Yes (`networking.gke.io/v1`, `MultiClusterService`) | Yes (`net.gke.io/v1`, `ServiceExport`) | No |
| License | Proprietary | Open source | - |
| Clusters and fleet in host project | Yes | Yes | Yes |
| Clusters and fleet in same service project | Yes (needs firewall rule permissions in host project) | Yes (needs firewall rule permissions in host project) | Yes |
| Clusters and fleet in different projects | No | No | Yes (cross-project Service referencing) |

### Load balancer types and protocols

| Item | MCI | MCG | Standalone NEGs |
| --- | --- | --- | --- |
| Application LB: Classic | Yes | Yes | Yes |
| Application LB: Global external | No | Yes | Yes |
| Application LB: Regional external | No | Yes | Yes |
| Application LB: Regional internal | No | Yes | Yes |
| Application LB: Cross-region internal | No | No | Yes |
| Proxy Network LB (classic, global external, regional external, internal) | No | No | Yes |
| Passthrough Network LB (external, internal) | No | No | No |
| HTTP, HTTPS, HTTP/2, WebSocket | Yes | Yes | Yes |
| HTTP/3 (IETF QUIC), SSL (TLS) or TCP | No | No | Yes |
| Backends: Pods (zonal NEGs) | Yes | Yes | Yes |
| Backends: VMs including GKE nodes | Yes (not recommended) | No | Yes |
| Other backends (Cloud Storage, Internet / Hybrid / PSC / Serverless NEGs) | No | No | Yes |
| IPv6 | Yes (LB-to-backend stays IPv4) | Yes (LB-to-backend stays IPv4) | Yes (LB-to-backend stays IPv4) |
| Global access, cross-project load balancing | No | Global access only | Yes |

### Routing and features

| Item | MCI | MCG | Standalone NEGs |
| --- | --- | --- | --- |
| Host/path routing | Prefix, Exact | Prefix, Exact, Regular expression | Yes |
| Header-based routing | No | Exact, Regular expression | Yes |
| Path redirects, traffic splitting, mirroring, cut over, traffic-based autoscaling | No | Yes | Yes |
| URL rewrites | No | Prefix, Regular expression | Yes |
| Custom request headers | Yes | Yes | Yes |
| Custom response headers, cross-namespace routing, custom default backend | No | Yes | Yes |
| Kubernetes Secrets-based certificates | Yes | Yes | No |
| Certificate Manager support | No | Yes | Yes |
| SSL policy, HTTP-to-HTTPS redirect, multiple TLS certs, self-managed / Google-managed certs | Yes | Yes | Yes |
| Connection draining, session affinity, access logging, backend timeout, TLS to backends | Yes | Yes | Yes |
| Health check configuration | BackendConfig | HealthCheckPolicy | gcloud CLI / console / Terraform |
| Cloud CDN | Yes; signed cookies, dynamic compression, private origin authentication not supported | Yes; signed URLs and dynamic compression not supported | All features |
| Identity-Aware Proxy, Cloud Armor security policy | Yes | Yes | Yes |
| Automated NEG management | Zonal NEGs only | Zonal NEGs only | Zonal NEGs only, annotation required on the Service |
| Cloud NGFW management | VPC firewall rules only (managed rules) | VPC firewall rules only (managed rules) | No |

## Notes

- Kubernetes Gateway API resources on GKE, and Multi Cluster Ingress, are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (`gcp-load-balancing`).
- The source table also lists automated frontend IP management, forwarding rule / target proxy / URL map / backend service / health check management (Yes for MCI and MCG, No for Standalone NEGs) and static / dynamic IP assignment (all Yes).
- Source inconsistency: this comparison page marks multi-cluster Gateway as "No" for cross-region internal Application Load Balancer, proxy Network Load Balancer and SSL (TLS). The multi-cluster Gateway concepts page (same retrieval date) lists `gke-l7-cross-regional-internal-managed-mc` (cross-region internal Application Load Balancer or cross-region internal proxy Network Load Balancer), regional external and regional internal proxy Network Load Balancers through `gke-l7-regional-external-managed-mc` / `gke-l7-rilb-mc`, and `TLSRoute` (TLS passthrough) on those three GatewayClasses. The table is kept as published; prefer the concepts page for multi-cluster Gateway support (see `multi-cluster-gateways.md`).
- Source (multi-cluster Gateway GatewayClasses and TLSRoute): https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-gateways (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/choose-mc-lb-api (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-ingress (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-ingress (the source page has no code).

## Related

- [multi-cluster-ingress.md](./multi-cluster-ingress.md)
- [multi-cluster-gateways.md](./multi-cluster-gateways.md)
- [multi-cluster-services-overview.md](./multi-cluster-services-overview.md)
