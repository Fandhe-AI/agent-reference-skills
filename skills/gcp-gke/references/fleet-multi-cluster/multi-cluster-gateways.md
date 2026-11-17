---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-gateways
---

# Multi-cluster Gateways

Multi-cluster Gateways are configured with Kubernetes Gateway API resources (Gateway, HTTPRoute, TLSRoute). The GKE Gateway controller watches the config cluster and provisions Google Cloud load balancing for Services deployed across clusters in a fleet.

## Signature / Usage

The source page has no code. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/prepare-environment-multi-cluster-gateways, to confirm the multi-cluster GatewayClasses exist in the config cluster:

```bash
kubectl get gatewayclasses --context=gke-west-1
```

## Options / Props

### Multi-cluster GatewayClasses

| GatewayClass | Provisions |
| --- | --- |
| `gke-l7-global-external-managed-mc` | Global external Application Load Balancer |
| `gke-l7-regional-external-managed-mc` | Regional external Application Load Balancer or regional external proxy Network Load Balancer |
| `gke-l7-cross-regional-internal-managed-mc` | Cross-region internal Application Load Balancer or cross-region internal proxy Network Load Balancer |
| `gke-l7-rilb-mc` | Regional internal Application Load Balancer or regional internal proxy Network Load Balancer |
| `gke-l7-gxlb-mc` | Classic Application Load Balancer |

### Route resources

| Route | Behavior |
| --- | --- |
| HTTPRoute | Routes HTTP and HTTPS by hostname, path, headers, query parameters; supports traffic splitting, redirection, mirroring |
| TLSRoute | Routes encrypted TLS by SNI hostname using TLS passthrough; supported on `gke-l7-regional-external-managed-mc`, `gke-l7-rilb-mc`, `gke-l7-cross-regional-internal-managed-mc`; forwards to backend ServiceImports without decrypting |

## Notes

- All participating clusters must be registered to a fleet; one is the config cluster. Gateway, HTTPRoute and TLSRoute are deployed only to the config cluster. Choose a regional or other highly available cluster.
- The controller uses multi-cluster Services (MCS) to discover Services across clusters and group Pods into one Service addressable across clusters.
- Capabilities: phased rollouts and blue-green, header-based matching, weighted splitting, traffic mirroring, health-based failover, capacity-based load balancing, SNI routing via TLSRoute.
- Traffic is routed by health checks, traffic splitting rules and capacity, directly to the optimal Pod in the selected cluster.
- Kubernetes Gateway API resources on GKE, and Multi Cluster Ingress, are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (`gcp-load-balancing`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-gateways (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/prepare-environment-multi-cluster-gateways (retrieved 2026-11-16; the `kubectl get gatewayclasses` snippet above)

## Related

- [prepare-environment-multi-cluster-gateways.md](./prepare-environment-multi-cluster-gateways.md)
- [multi-cluster-services.md](./multi-cluster-services.md)
- [choose-mc-lb-api.md](./choose-mc-lb-api.md)
