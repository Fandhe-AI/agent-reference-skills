---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-pools
---

# About node pools

A node pool is a group of nodes within a GKE Standard cluster that all have the same configuration (a `NodeConfig` specification). In Autopilot you do not configure node pools, although Autopilot-managed node pools in Standard clusters can be manually upgraded.

## Signature / Usage

### Inspect node pools

Every node carries the label `cloud.google.com/gke-nodepool` whose value is the node pool name. Use it in a `nodeSelector` to target a pool (see [node-pools-how-to.md](./node-pools-how-to.md)).

```bash
gcloud container node-pools list --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

## Options / Props

| Topic | Behavior |
|-------|----------|
| Default node pool | Created with the cluster: three nodes in each of the cluster's compute zones, node image `cos_containerd`, a general-purpose machine type |
| `--num-nodes=0` at cluster creation | GKE skips creating the default node pool. Requires GKE 1.36.4-gke.1469000 or later, 1.37.1-gke.1153000 or later, or 1.38.0-gke.2352000 or later |
| Configuration scope | You cannot configure a single node; changes affect all nodes in the pool |
| Default version | New node pools run the same Kubernetes version as the control plane; each pool can be upgraded independently |
| Multi-zonal clusters | Node pools are replicated to every zone automatically (new and deleted pools too), which consumes more regional quota |
| Autopilot-managed node pools (in Standard) | Created by GKE for Autopilot ComputeClasses. Only manual version upgrades are allowed; no other updates, and they cannot be deleted |

### Node pool deletion behavior

| Aspect | Behavior |
|--------|----------|
| Drain | GKE drains each node by deleting Pods with a graceful termination period of `MAX_POD`: the maximum `terminationGracePeriodSeconds` among Pods on the node, capped at one hour |
| PodDisruptionBudget | Not honored by default. Can be configured per node pool to respect PDBs, also capped at one hour |
| Cluster deletion | Nodes are not gracefully drained; run `kubectl drain` first if workloads must terminate gracefully |
| Pods with node selectors | Might stay unschedulable if no other node satisfies the criteria |

## Notes

- Warning from the source: essential `kube-system` Pods such as `kube-dns` and `konnectivity-agent` must stay schedulable. Before deleting the default node pool or applying restrictive taints to all pools, keep at least one node pool without custom `NoSchedule` or `NoExecute` taints; otherwise DNS resolution and control plane communication can fail.
- Deleting a node pool is destructive (nodes and running workloads are removed); try it on a disposable cluster first.
- Pods choose a node pool indirectly through `nodeSelector` / resource requests, not through the Service configuration.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/node-pools (the source concept page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-pools (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [node-pools-how-to.md](./node-pools-how-to.md)
- [node-images.md](./node-images.md)
- [node-auto-repair.md](./node-auto-repair.md)
- [about-compute-classes.md](./about-compute-classes.md)
