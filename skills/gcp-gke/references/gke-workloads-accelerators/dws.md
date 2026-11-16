---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dws
---

# About GPU, TPU, and H4D provisioning with flex-start provisioning mode

Flex-start, powered by Dynamic Workload Scheduler, lets GKE dynamically provision Flex-start VMs for GPUs, TPUs, and H4D machine series for up to seven days, not bound to a specific start time and without long-term reservations. It suits smaller to medium workloads with fluctuating demand or short duration, such as small model pre-training, fine-tuning, or scalable serving.

## Signature / Usage

### Compute class with node recycling

Node recycling replaces a node that reaches the end of its seven-day duration. It requires a custom compute class with the `nodeRecycling` field and `leadTimeSeconds` inside `flexStart`.

```yaml
apiVersion: cloud.google.com/v1
kind: ComputeClass
metadata:
  name: dws-model-inference-class
spec:
  priorities:
    - machineType: g2-standard-24
      spot: true
    - machineType: g2-standard-24
      maxRunDurationSeconds: 72000
      flexStart:
        enabled: true
        nodeRecycling:
          leadTimeSeconds: 3600
  nodePoolAutoCreation:
    enabled: true
```

## Options / Props

### Requirements

| Item | Requirement |
| --- | --- |
| GPUs | GKE 1.32.2-gke.1652000 or later |
| TPUs | See "Plan TPUs in GKE"; Ironwood (TPU7x) in `us-central1-c`; TPU Trillium (v6e) in `asia-northeast1-b`, `us-east5-a`, `us-east5-b`; TPU v5e in `us-west4-a`; TPU v5p in `us-east5-a`. TPU v3 and v4 are not supported. |

### Flex-start configurations

| | Flex-start | Flex-start with queued provisioning |
| --- | --- | --- |
| Availability | Preview | GA (the `flex-start` and `enable-queued-provisioning` flags are Preview in Flex-start) |
| Accelerators | GPU; TPU in single-host and multi-host slice node pools | GPU; TPU in multi-host slice node pools |
| Workload size | Small to medium (fits one node) | Medium to large (multiple nodes, all needed at once) |
| Provisioning | One node at a time (TPU: one node in single-host pools, the full slice in multi-host pools) | All requested resources at once, in a single zone |
| Setup complexity | Less complex; similar to on-demand and Spot | More complex; a quota tool such as Kueue is strongly recommended |
| Custom compute classes | Yes | No |
| Node recycling | Yes | No |
| Price | Flex Start SKU | Flex Start SKU |
| Quota | GPU and TPU preemptible quota | GPU and TPU preemptible quota |
| Node upgrade strategy | Short-lived upgrades | Short-lived upgrades |
| Node pool create flags | `--flex-start` | `--flex-start` and `--enable-queued-provisioning` |

### How provisioning works

| Behavior | Value |
| --- | --- |
| Wait without `--request-valid-for-duration` | GPU workloads up to 14 days; TPU workloads indeterminate |
| Node run time | Up to seven days (default); shorter via `maxRunDurationSeconds` |
| Recycling starts | When now >= `creationTimestamp` + `maxRunDurationSeconds` - `leadTimeSeconds` |
| Pricing | Dynamic Workload Scheduler pricing; discount up to 53% for vCPUs, GPUs, TPUs, attached Local SSD; pay as you go |

### Limitations

- Inter-pod anti-affinity is not supported (autoscaler ignores it during provisioning).
- Reservations are not supported; only the `ANY` location policy is supported.
- A single request creates up to 1,000 VMs (max nodes per zone for a node pool).
- The Compute Engine `ACTIVE_RESIZE_REQUESTS` quota limits pending requests (default 100 per project); larger requests fail.
- Spot VMs are not supported. Ephemeral volumes are not supported; use persistent volumes.
- If the workload uses node recycling and runs as a Job, set the Job completion mode to `Indexed`.
- A `ProvisioningRequest` supports only one entry in `podSets`; more than one fails.
- Additional short-lived VMs may appear in the console (expected).

## Notes

- Nodes using Flex-start VMs, queued provisioning, or both use short-lived upgrades when the control plane is 1.32.2-gke.1652000 or later. Minimize disruption with maintenance windows and exclusions, and disable node auto-repair (not supported for these nodes).
- For queued provisioning nodes on versions earlier than 1.32.2-gke.1652000: with a release channel use maintenance windows and exclusions; without one disable node auto-upgrades (release channels are recommended); disable auto-repair; manually upgrade the node pool when no requests are active and the pool is empty. Clusters upgraded to 1.32.2-gke.1652000 or later migrate automatically; a disabled `--no-enable-autoupgrade` setting is not re-enabled, and enabling it is recommended.
- Clusters on GKE 1.29.1-gke.1708000 and later optimize zone selection for lower queue wait times.
- Combine flex-start with custom compute classes to define a prioritized list of node configurations.
- The source has no gcloud code block beyond the flag names above; Console and Terraform forms are not on this page.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dws (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gpus.md](./gpus.md)
- [tpus.md](./tpus.md)
- [timesharing-gpus.md](./timesharing-gpus.md)
