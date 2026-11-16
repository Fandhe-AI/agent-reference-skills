---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/planning-scalability
---

# About GKE scalability

General best practices for architecting scalable GKE clusters, for administrators and for developers of Kubernetes components. Scalability means the cluster can grow while staying within its service-level objectives (SLOs).

## Signature / Usage

### Inspect GKE resource quotas (borrowed snippet)

The page has no code. The block below is taken from the GKE quotas page.

```bash
kubectl get resourcequota gke-resource-quotas -o yaml
```

## Options / Props

### Availability

| Topic | Guidance |
| --- | --- |
| Control plane | Use regional clusters for production: multiple control planes across zones stay available during upgrades and a single-zone outage. Zonal clusters have one control plane that is unavailable during upgrade. Trade-offs: config changes propagate more slowly, and create/upgrade fails if VMs cannot be created in one zone. The cluster type cannot be changed after creation. |
| Node pools | Default to multi-zonal node pools (cluster autoscaler does not guarantee equal spread). Use single-zone pools if the app is fragile to network partitioning or uses GPUs. |
| AI zones | Preview (must be enabled per project). Existing clusters need control plane 1.36.4-gke.1495002 or later, or 1.37.1-gke.1552000 or later. Zone names end in `ai` (for example `us-central1-ai1a`). Only TPU VMs supported. Not used by default: use ComputeClasses (recommended), node auto-provisioning with `nodeSelector`/`nodeAffinity`, or an AI zone in `--node-locations` in Standard. Avoid mixing `us-central1-ai1a` and `us-central1-a` for high availability. |

### Scale

| Topic | Guidance |
| --- | --- |
| Networking | VPC-native is the default and recommended; a VPC network supports up to 15,000 VMs. Routes-based clusters are deprecated and support at most 1,500 nodes. |
| Cluster size | Standard supports up to 65,000 nodes. |
| Load balancer node limits | Internal passthrough NLB: 250 nodes without backend subsetting, 2,000 with subsetting. Regional external passthrough NLB: 1,000 nodes per zone. External Application LB: 1,000 per zone, no limit with container-native load balancing. Internal Application LB: no limit. |
| DNS | kube-dns autoscales; for very large clusters or heavy DNS load enable NodeLocal DNS. |
| IP ranges (IPv4 / dual-stack VPC-native) | Node subnet primary range defaults to /20; Pod secondary range defaults to /14 (configurable); Service secondary range defaults to /20 (cannot be changed after creation). Default node limit is 1024 due to Pod IP addresses; default Pod limit is 110 per node; 4096 Services by default. Add Pod IPs later with discontiguous multi-Pod CIDR. |
| Disks | Disk size drives IOPS/throughput; about one vCPU per 2,000-2,500 IOPS. Regular VMs: up to 128 disks / 64 TB; shared-core VMs: 16 PDs / 3 TB. |
| API latency | Suggested upper bound: one second for single-resource GET/POST/PATCH, 30 seconds for LIST. |

### Developer practices

| Practice | Detail |
| --- | --- |
| List and watch | Prefer list once + Watch over periodic LIST; set `resourceVersion=0` on LIST; Go: SharedInformer / SharedInformerFactory. |
| Limit watches | Avoid watching frequently changing objects from many places (DaemonSets); prefer a central controller or watch a subset. |
| DaemonSets | Use rolling updates with limited `maxSurge`. |
| Manifest size | Object manifest about 1.5 MiB max; cluster quota 6 GiB (includes the last 150 seconds of changes); keep Pod manifests ideally under 10 KiB for high-throughput operations. |
| Service account | Disable automounting of the default service account when Pods do not use the Kubernetes API. |
| Serialization | Use protocol buffers rather than JSON for highly scalable components. |

## Notes

- Use Image streaming to reduce Pod initialization times. Monitor control plane metrics, especially API latency; slow admission webhooks can also raise API latency.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/quotas
- Source inconsistency: the load balancer node limits row says "Internal passthrough NLB: 250 nodes without backend subsetting, 2,000 with subsetting. Regional external passthrough NLB: 1,000 nodes per zone", while service-load-balancer.md says internal passthrough with `Local` is "limited to 250 nodes with serving Pods", `Cluster` uses up to 25 nodes, and regional external passthrough is limited to 3,000 (`Local`) or 250 (`Cluster`) nodes. For GKE-managed LoadBalancer Services follow service-load-balancer.md, which describes the per-`externalTrafficPolicy` endpoint membership.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/planning-scalability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [planning-large-clusters.md](./planning-large-clusters.md)
- [quotas.md](./quotas.md)
- [autopilot-overview.md](./autopilot-overview.md)
