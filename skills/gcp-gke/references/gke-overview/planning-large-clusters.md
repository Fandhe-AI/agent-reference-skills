---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/planning-large-clusters
---

# Plan for large GKE clusters

Best practices for planning and designing very large clusters. Exceeding architectural limits can degrade performance or cause downtime. The limits below apply to default Kubernetes clusters without extensions; webhooks and CRDs can constrain scaling.

## Signature / Usage

### Inspect GKE resource quotas (borrowed snippet)

The page has no code. The block below is taken from the GKE quotas page and inspects the per-namespace resource quota GKE applies to clusters under 100 nodes.

```bash
kubectl get resourcequota gke-resource-quotas -o yaml
```

## Options / Props

### Cluster size limits and requirements

| Node limit | Requirements |
| --- | --- |
| Up to 1,000 | All clusters; automatic; no extra networking requirements. |
| 1,000 to 5,000 | Regional Standard and Autopilot clusters; GKE Dataplane V2 and Private Service Connect required; automatic if requirements met. |
| 5,000 to 15,000 | Regional Standard only; GKE 1.36 or later recommended; Dataplane V2 and Private Service Connect required; contact Cloud Customer Care to raise the quota. Use cases: HPC, data processing. |
| 15,000 to 65,000 | GKE 1.31 or later (1.36+ recommended); regional Standard only; cluster autoscaler not supported (scale node pools via the GKE API); Services with more than 100 Pods must be headless; each Pod on its own node except system DaemonSets; Dataplane V2 and Private Service Connect required; multi-network support for Pods not available; contact Cloud Customer Care. Use case: large model training. |

Migrating from zonal to regional Standard clusters, or to clusters using Private Service Connect, requires re-creating the cluster to reach higher node quotas.

### Limits and best practices

| Limit | Guidance |
| --- | --- |
| etcd database size | 6 GB; alert via insights/recommendations at 80%, 90%, 95%. |
| Total etcd object size per type | Keep below 800 MB per resource type. Helm stores releases in Secrets by default; use Helm's SQL storage backend in large clusters. |
| Services (no Dataplane V2) | Below 10,000. |
| Services per namespace | Below 5,000 (or set `enableServiceLinks` to false in PodSpec). |
| Pods behind one Service (no Dataplane V2) | Below 10,000 (not applied to multi-cluster Services); endpoints above 1,000 Pods are truncated in Endpoints objects. |
| Pods behind one Service (Dataplane V2 / Autopilot) | Below 1,000 in GKE 1.23 and earlier; below 10,000 in GKE 1.24 and later. |
| DNS records per headless Service | Below 1,000 for kube-dns; 3,500 (IPv4) / 2,000 (IPv6) for Cloud DNS. |
| All Service endpoints | Below 260,000 (Dataplane V2 eBPF map limit). |
| HPA objects per cluster | 300 by default; Performance HPA profile: 1,000 on 1.31+, 5,000 on 1.33+. |
| Pods per node | 512 in Standard (assumes two or fewer containers per Pod); at least one vCPU per 10 Pods recommended. |
| Pod churn | Up to 500 nodes: about 20 Pods created and 20 deleted per second; above 500 nodes: about 100 and 100 per second. |
| Open watches | More than 200,000 per cluster may affect initialization and restart the control plane. |
| Secrets with application-layer encryption | Store fewer than 30,000. |
| Log bandwidth per node | 100 Kbps to 500 Kbps default; Standard can raise to 10 MiB with a high-throughput Logging agent. |
| Node pools | Below 200. |
| Admission webhook latency | Average below 10 ms; consider `failurePolicy: Ignore` and a low `timeoutSeconds`. |

## Notes

- Split into multiple clusters when you could exceed a limit or GKE quota; use fleet management to manage a multi-cluster fleet. Backup for GKE and Config Connector have their own limits (linked from the source).
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/quotas
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/planning-large-clusters (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [quotas.md](./quotas.md)
- [planning-scalability.md](./planning-scalability.md)
