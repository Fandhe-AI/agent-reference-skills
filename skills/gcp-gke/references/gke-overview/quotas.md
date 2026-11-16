---
source: https://docs.cloud.google.com/kubernetes-engine/quotas
---

# GKE quotas and limits

GKE uses quotas (default values, adjustable on request) and system limits (fixed values) to allocate resources fairly. Quotas generally apply per Google Cloud project, are shared across all applications and IP addresses in the project, and exceeding one usually makes the task fail.

## Signature / Usage

### Examine Kubernetes resource quotas

```bash
kubectl get resourcequota gke-resource-quotas -o yaml
```

Add `--namespace` to view the values for a given namespace.

## Options / Props

### Quotas per project

| Quota | Default |
| --- | --- |
| Zonal clusters | 100 per zone |
| Regional clusters | 100 per region (all Autopilot clusters are regional) |
| API reads | 600,000 requests per minute |
| API writes | 600 requests per minute |
| Token exchange requests for workload and agent identities | 6,000 requests per minute in a region, shared by all zonal and regional clusters in the region |

### Limits per cluster

GKE versions in the table apply to both nodes and control plane.

| Limit | Standard | Autopilot |
| --- | --- | --- |
| Nodes per cluster | 65,000 (not all increases are automatic; 5,000 / 15,000 / 65,000 tiers have infrastructure requirements, may need Cloud Customer Care) | 5,000. More than 1,000 nodes: use Autopilot 1.23 or newer. More than 400 nodes may require lifting a cluster size quota for clusters created on earlier versions. |
| Nodes per node pool | 1,000 per zone; 2,000 TPU nodes per zone (requires 1.28.5-gke.135500, 1.29.1-gke.1206000, 1.30 or newer) | Not applicable |
| Nodes in a zone | No limit with NEG-based Ingress (container-native load balancing; default in 1.17 and later); 1,000 with Instance Group-based Ingress | Not applicable |
| Pods per node | 512 | Set dynamically between 8 and 256; 32 for versions earlier than 1.28; one Pod per node for GPU Pods and Performance class Pods |
| Pods per cluster | 200,000 (includes system Pods) | 200,000 |
| Containers per cluster | 400,000 | 400,000 |
| Single resource size | 1.5 MiB | 1.5 MiB |
| Cluster state database size | 6 GB | 6 GB |
| Concurrent operations | 100 | 100 |

## Notes

- Resource quotas: GKE does not enforce the `gke-resource-quotas` Kubernetes quotas for clusters on version 1.28 or later (you can apply your own). Otherwise, for clusters under 100 nodes GKE applies a Kubernetes resource quota to every namespace that cannot be removed, scales it with node count, and removes it above 100 nodes.
- The Kubernetes API server updates some resources before deletion; this can grow a resource past the size limit and permanently prevent its deletion.
- The number of Pods that fit on a node depends on Pod requests and node capacity; load test large deployments.
- Quotas are viewed on the console Quotas page and adjusted via a quota adjustment request; system limits cannot be changed.
- Source inconsistency: the quota table says Pods per cluster is "200,000 (includes system Pods)", while dataplane-v2.md lists "Pods per cluster | 400,000" in its GKE Dataplane V2 technical specifications. The source does not reconcile the two figures.
- Source: https://docs.cloud.google.com/kubernetes-engine/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [planning-large-clusters.md](./planning-large-clusters.md)
- [planning-scalability.md](./planning-scalability.md)
- [autopilot-overview.md](./autopilot-overview.md)
