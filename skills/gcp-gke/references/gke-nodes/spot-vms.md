---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/spot-vms
---

# Spot VMs in GKE

Spot VMs are Compute Engine VMs priced lower than standard VMs with no availability guarantee. GKE can use them in Standard node pools and, via ComputeClasses or node selectors, in both Standard and Autopilot, for stateless, batch or fault-tolerant workloads.

## Signature / Usage

### Schedule Pods on Spot VMs

GKE labels Spot nodes with `cloud.google.com/gke-spot=true` and (GKE 1.25.5-gke.2500 or later) `cloud.google.com/gke-provisioning=spot`.

Adapted (not in the official docs): restored the YAML indentation, which was flattened in the source.

```yaml
apiVersion: v1
kind: Pod
spec:
  nodeSelector:
    cloud.google.com/gke-spot: "true"
```

Node affinity alternative (required).

Adapted (not in the official docs): restored the YAML indentation, which was flattened in the source (same fix as above).

```yaml
apiVersion: v1
kind: Pod
spec:
...
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: cloud.google.com/gke-spot
            operator: In
            values:
            - "true"
...
```

### Toleration for node auto-provisioning

Node auto-provisioning adds the taint `cloud.google.com/gke-spot=true:NoSchedule` to new Spot node pools; Pods need this toleration (plus a `nodeSelector` or node affinity to run only on Spot):

```yaml
   tolerations:
   - key: cloud.google.com/gke-spot
     operator: Equal
     value: "true"
     effect: NoSchedule
```

## Options / Props

| Item | Value |
|------|-------|
| Default graceful termination | 30 s after preemption notice: 15 s for Pods, then 15 s for critical system Pods |
| Extended period | Up to 120 s total (maximum for any Pod); `terminationGracePeriodSeconds` larger than the node period does not extend it |
| `shutdownGracePeriodSeconds` | Total grace period: up to 120, or 0 for none |
| `shutdownGracePeriodCriticalPodsSeconds` | Grace for critical system Pods; valid only with `shutdownGracePeriodSeconds` and must be smaller (e.g. 30 and 120 give 90 s regular, 30 s system) |
| Standard node pools | Configure via node system config; control plane must run GKE 1.35.0-gke.1171000 or later |
| Custom ComputeClasses | `kubeletConfig` fields above; control plane GKE 1.36.0-gke.3204000 or later |
| Autoscaler location policy | From GKE 1.24.1-gke.800, default `ANY` for Spot node pools (others default `BALANCED`) |

## Notes

- Warning from the source: data on Spot nodes is deleted on preemption, and Local SSDs do not persist. Use Spot VMs only for fault-tolerant workloads. Reclamation is involuntary and is not covered by PodDisruptionBudgets.
- Keep at least one standard-VM node pool for critical system components (DNS); create a non-GPU standard pool before a GPU Spot pool, otherwise GKE does not add the `nvidia.com/gpu=present:NoSchedule` taint.
- `preferredDuringScheduling...` affinity for Spot is not recommended (Pods may land on standard VMs). A toleration alone does not restrict Pods to Spot VMs.
- Surge upgrades create Spot surge nodes without waiting for them to be ready. Preemptible VMs are still supported but Spot VMs are recommended (no 24-hour expiry).
- Stateful workloads should terminate within 25 seconds to minimize volume corruption risk; IP addresses may change after recreation.
- GKE runs Kubernetes workloads on Google Cloud; this is distinct from Cloud Run (`gcp-run`).
- Corrected from the official docs: the `nodeSelector` / `affinity` snippets had lost their indentation.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/spot-vms (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-compute-classes.md](./about-compute-classes.md)
- [node-pools.md](./node-pools.md)
- [node-pools-how-to.md](./node-pools-how-to.md)
