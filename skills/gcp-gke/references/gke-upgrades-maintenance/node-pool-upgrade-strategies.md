---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-pool-upgrade-strategies
---

# Node upgrade strategies

Strategies GKE uses to recreate nodes in a node pool: surge (default), blue-green, autoscaled blue-green (Preview), and short-lived (flex-start / queued provisioning only). Configure one per Standard node pool.

## Signature / Usage

### Surge upgrade settings

The source describes the surge profiles (see Options / Props) as `maxSurge` / `maxUnavailable` values but shows no command. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/update (gcloud help example for `--max-surge-upgrade`; creates one extra node per upgrade and keeps full capacity, the default "Balanced" profile):

```bash
gcloud container node-pools update node-pool-1 \
    --cluster=example-cluster --max-surge-upgrade=1   \
    --max-unavailable-upgrade=0
```

### Pod placement during blue-green upgrades

Add a nodeSelector for this label to workloads so evicted Pods only reschedule onto the green pool; `${MY_NODE_POOL}` is the node pool name.

```
cloud.google.com/gke-nodepool: ${MY_NODE_POOL}
```

### Pods protected during autoscaled blue-green upgrades

```
"cluster-autoscaler.kubernetes.io/safe-to-evict": "false"
```

## Options / Props

### Strategy selection

| Case | Strategy |
| --- | --- |
| Standard node pool (default) | Surge |
| Autopilot clusters; Autopilot-managed node pools in Standard clusters | Surge only; not configurable |
| Nodes using Flex-start VMs; queued provisioning on 1.32.2-gke.1652000 or later | Short-lived upgrades (no settings; up to seven days) |

### Surge profiles

| Description | Configuration | Typical use |
| --- | --- | --- |
| Balanced (default), slower but least disruptive | `maxSurge=1 maxUnavailable=0` | Most workloads |
| Balanced, resource constrained, no surge resources | `maxSurge=0 maxUnavailable=1` | Resource-constrained node pool |
| Fast, no surge resources, most disruptive | `maxSurge=0 maxUnavailable=100` | Large node pools after jobs run to completion |
| Fast, most surge resources, less disruptive | `maxSurge=100 maxUnavailable=0` | Large node pools |

### Surge settings

| Setting | Default | Meaning |
| --- | --- | --- |
| `maxSurge` | 1 | Maximum additional surge nodes per zone during an upgrade. |
| `maxUnavailable` | 0 | Maximum nodes simultaneously unavailable per zone (fixed capacity). |

- Nodes upgraded simultaneously = `maxSurge` + `maxUnavailable`; the maximum is 20 for Autopilot mode and 100 for Standard mode. Multi-zone pools upgrade one zone at a time, capped by nodes in the zone.
- Surge drain respects PodDisruptionBudget and graceful termination for up to one hour; remaining Pods are then forcefully evicted.
- With `maxUnavailable` > 0 on CPU node pool version upgrades, GKE reuses the Compute Engine instance. It deletes and re-creates the instance for non-version updates, GPU/TPU pools, Spot or preemptible VMs, rolling back an incomplete surge upgrade, and node auto-repairs.
- `externalTrafficPolicy: Local` does not work with parallel node drains.

### Blue-green phases and settings

| Phase | Behavior |
| --- | --- |
| 1 Create green pool | New MIGs per zone; quota checked first; autoscaler doesn't scale blue; green scales up only. Rollback deletes green. |
| 2 Cordon blue pool | Blue nodes unschedulable. Rollback un-cordons blue and deletes green. |
| 3 Drain blue pool | Batches via `BATCH_NODE_COUNT` or `BATCH_PERCENT` (decimal 0 to 1, rounded down, min 1 node); `BATCH_SOAK_DURATION` seconds (default 0). Zero batch size skips to soak. |
| 4 Soak node pool | `NODE_POOL_SOAK_DURATION` seconds, default 3600 (1 hour); if total soak reaches 7 days (604,800 s), phase 5 starts immediately. Total = `NODE_POOL_SOAK_DURATION` + `BATCH_SOAK_DURATION` x batches. Can complete early. |
| 5 Delete blue pool | Can't be paused; deletes Pods (ignores PDBs), capping `terminationGracePeriodSeconds` at 60 minutes, then deletes nodes. |

Cancel is possible in all phases except Delete blue pool.

### Autoscaled blue-green (Preview)

- Requires control plane 1.34.0-gke.2201000 or later and cluster autoscaling enabled.
- Steps: create green pool with zero nodes; cordon blue; wait zero to seven days (default three days) while autoscaler scales down underutilized blue nodes (ignoring `--min-nodes` / `--total-min-nodes`; nodes with the `safe-to-evict: "false"` annotation stay); drain up to 20 nodes in parallel, respecting PDBs for up to 1 hour and `terminationGracePeriodSeconds` for up to 24 hours; skip soak; delete blue pool.
- Limitations: can be canceled and resumed but not rolled back; Pods can be temporarily unschedulable if the green pool can't scale up (quota, resources); don't use with node auto-provisioning node pools.
- Set `--max-nodes` / `--total-max-nodes` high enough; use the `optimize-utilization` autoscaling profile for more aggressive scale-down.

## Notes

- Preview features are subject to the Pre-GA Offerings Terms and might have limited support.
- Surge cancel pauses but doesn't roll back upgraded nodes and may leave mixed versions; you can resume or roll back a partial upgrade, but can't roll back after success (downgrade is separate).
- Blue-green and autoscaled blue-green continue to completion if they exceed a maintenance window.
- Blue-green uses double the resources temporarily; it is destructive for blue nodes (phase 5 deletes them), so try it on a disposable node pool first.
- Strategies apply to any node change that recreates nodes: surge for version changes, machine attributes, image type, IP and credential rotation, network policy, image streaming, gVNIC, node system config, confidential nodes; blue-green for version, machine attributes, image type, storage pools. Label/taint updates don't recreate nodes.
- Resources for surge nodes are subject to Compute Engine quota, availability and reservation capacity. Accelerator nodes without live migration should coordinate host maintenance with upgrades.
- This page is conceptual; the source has no gcloud commands for configuring strategies (they are in the linked how-to page). The label and annotation fences above are verbatim inline fragments of the source text, not runnable commands.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/update (the source page itself has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-pool-upgrade-strategies (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-upgrades.md](./cluster-upgrades.md)
- [upgrades.md](./upgrades.md)
- [maintenance-windows-and-exclusions.md](./maintenance-windows-and-exclusions.md)
