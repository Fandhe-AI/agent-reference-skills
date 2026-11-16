---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler
---

# Cluster autoscaler

How GKE automatically resizes the node pools of a Standard cluster based on workload demand. The cluster autoscaler works per node pool, between a minimum and maximum size you set, and decides from Pod resource requests (not actual utilization). In Autopilot clusters, node pools are provisioned and scaled automatically through node auto-provisioning.

## Signature / Usage

### Min and max nodes (per zone)

```bash
gcloud container clusters create example-cluster \
    --num-nodes=2 \
    --location=us-central1-a \
    --node-locations=us-central1-a,us-central1-b,us-central1-f \
    --enable-autoscaling --min-nodes=1 --max-nodes=4
```

Total size is between three and twelve nodes across the three zones. If one zone fails, between two and eight nodes.

### Total nodes (GKE 1.24 or later)

```bash
gcloud container clusters create example-cluster \
    --num-nodes=2 \
    --location=us-central1-a \
    --node-locations=us-central1-a,us-central1-b,us-central1-f \
    --enable-autoscaling --total-min-nodes=3 --total-max-nodes=12
```

### Autoscaling profile

```bash
gcloud container clusters update CLUSTER_NAME \
    --autoscaling-profile optimize-utilization
```

### Prioritize Spot VMs with a custom compute class

```yaml
apiVersion: cloud.google.com/v1
kind: ComputeClass
metadata:
  name: prefer-l4-spot
spec:
  # Defines a prioritized list of machine types and configurations for node provisioning.
  priorities:
  - machineType: g2-standard-24
    # Specifically requests Spot VMs for this configuration. GKE will try to provision these VMs first.
    spot: true
    gpu:
      type: nvidia-l4
      count: 2
  # If GKE can't satisfy the preceding rule, request on-demand nodes with the same configuration
  - machineType: g2-standard-24
    spot: false
    gpu:
      type: nvidia-l4
      count: 2
  nodePoolAutoCreation:
    enabled: true
  # Configures active migration behavior for workloads using this ComputeClass.
  activeMigration:
    optimizeRulePriority: true
    # Enables Cluster Autoscaler to attempt to migrate workloads to Spot VMs
    # if Spot capacity becomes available and the workload is currently
    # running on an on-demand VM (based on the priority rules in this example).
```

### Spot VM preference without compute classes

Adapted (not in the official docs): `operator: Equal` is not a valid node affinity operator and `values` must be strings, so `operator: In` and `"true"` are used.

```yaml
affinity:
  nodeAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 1
      preference:
        matchExpressions:
        # set to "true". GKE automatically applies this label to Spot VMs.
        - key: cloud.google.com/gke-spot
          operator: In
          values:
          - "true"
```

### Delay node deletion

Add an annotation whose key starts with `delay-deletion.cluster-autoscaler.kubernetes.io/` (for example `delay-deletion.cluster-autoscaler.kubernetes.io/ingress`) to the node. Deletion pauses until all such annotations are removed, for at most 2 minutes (120 seconds, not configurable). The value is not evaluated.

## Options / Props

| Item | Value / behavior |
|------|------------------|
| `--min-nodes` / `--max-nodes` | Per zone limits |
| `--total-min-nodes` / `--total-max-nodes` | Whole node pool across zones; GKE 1.24 and later; for new clusters |
| `location_policy` `BALANCED` | Spread as equally as possible across zones, best effort. Default for reservations/on-demand node pools; not supported for flex-start provisioning mode. GKE 1.24.1-gke.800 and later |
| `location_policy` `ANY` | Search capacity across all zones, prioritizing unused reservations. Default for flex-start and Spot VM node pools; requires autoscaling enabled and initial node count 0 |
| Autoscaling profile `balanced` | Default; keeps more spare resources. Not available for Autopilot |
| Autoscaling profile `optimize-utilization` | More aggressive scale-down; sets Pod scheduler name to `gke.io/optimize-utilization-scheduler` (Pods with a custom scheduler unaffected) |
| Scale-down drain timeout | 1 hour in GKE 1.32.7-gke.1079000 or later, 10 minutes earlier; not configurable |
| Eviction tier, PriorityClass < `1000000000` | Evicted first, waits up to 1 hour |
| Eviction tier, PriorityClass >= `1000000000` | Evicted after the lower tier, waits up to 10 minutes; `1000000000` is the highest custom value |
| Scale-up backoff | 5 minutes initially, exponential to a maximum of 30 minutes |
| Max cluster size | 15,000 nodes |
| Min Pod PriorityClass for scale-up | Pods with value below `-10` do not trigger scale-up |

| ProvisioningClass | Support |
|-------------------|---------|
| `queued-provisioning.gke.io` | GKE 1.28.3-gke.1098000+ Standard, 1.30.3-gke.1451000+ Autopilot; integrates with Dynamic Workload Scheduler |
| `check-capacity.autoscaling.x-k8s.io` | From GKE 1.30.2-gke.1468000 |
| `best-effort-atomic.autoscaling.x-k8s.io` | "Supported from GKE version 1.31.27" (as written in the source) |

| Current size vs limits | Autoscaler action |
|------------------------|-------------------|
| Below minimum | Scales up only for pending Pods; scale-down disabled; never forced up to the minimum |
| Within limits | Scales up or down on demand |
| Above maximum | Scales down only nodes that can be safely removed; scale-up disabled |

| Taint / annotation prefix | Meaning |
|---------------------------|---------|
| `delay-deletion.cluster-autoscaler.kubernetes.io/` | Pause final node deletion (2 minute cap) |

## Notes

- Scale-down is blocked by Pods with affinity/anti-affinity preventing rescheduling, Pods without a controller, Pods with local storage on control planes before 1.22, the annotation `"cluster-autoscaler.kubernetes.io/safe-to-evict": "false"`, or a PodDisruptionBudget violation.
- Do not enable Compute Engine autoscaling on the managed instance groups of GKE nodes; it conflicts with the cluster autoscaler.
- Standard clusters never automatically scale to zero nodes. Zone balancing happens only on scale-up.
- Reservations (GKE 1.27+) are always considered, but only in the cluster's own project; use custom compute classes for shared reservations.
- TPUs: single-host slice node pools scale node by node; multi-host slice node pools scale atomically between 0 and the full topology size (for example 0 or 64 nodes for `ct5lp-hightpu-4t` with `16x16`).
- Spot VM preference does not guarantee most Pods run on Spot; Spot Pods get 15 seconds to terminate.
- ProvisioningRequest: one PodTemplate per request, one node pool scaled at a time; prefer `--total-max-nodes` and `location-policy=ANY`.
- Observability: visibility events in Cloud Logging, Kubernetes events (`TriggeredScaleUp`, `NotTriggeredScaleUp`, `ScaleDown`), the `cluster-autoscaler-status` ConfigMap in `kube-system`, and GKE 1.37+ metrics `kubernetes.io/autoscaler/cluster_pending_pods_per_ccc`, `..._cluster_node_provisioning_failed_attempts_count_per_ccc`, `..._cluster_node_provisioning_attempts_count_per_ccc`.
- Limitations: local PersistentVolumes unsupported; custom schedulers and altered Filters unsupported; strict topology spread (`DoNotSchedule`) unsupported; IP exhaustion shows `scale.up.error.ip.space.exhausted`; DaemonSet Pods reduce predicted node capacity; GKE autoscaler differs from the open source one. Before 1.22 scale-up of empty clusters stopped.
- Deleting a node pool with autoscaling enabled can cause the autoscaler to provision new nodes and interrupt service; disabling autoscaling on the pool first is the documented workaround. Deletion is destructive; try it on a disposable cluster first.
- Corrected from the official docs: the source node affinity example used `operator: Equal` and boolean `values: - true`; changed to `operator: In` and `"true"`.
- The source also shows no Console steps on this page.
- The GKE API v1 field is `NodePoolAutoscaling.locationPolicy` (`LOCATION_POLICY_UNSPECIFIED` / `BALANCED` / `ANY`). Its Discovery enum descriptions: "BALANCED is a best effort policy that aims to balance the sizes of different zones." and "ANY policy picks zones that have the highest capacity available." (`rest-schemas/container/` lists the enum values only).
- Source (REST enum descriptions): https://container.googleapis.com/$discovery/rest?version=v1 (Discovery document bundled with `google-api-python-client`, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-autoscaler-how-to.md](./cluster-autoscaler-how-to.md)
- [node-auto-provisioning.md](./node-auto-provisioning.md)
- [capacity-buffer.md](./capacity-buffer.md)
- [horizontalpodautoscaler.md](./horizontalpodautoscaler.md)
