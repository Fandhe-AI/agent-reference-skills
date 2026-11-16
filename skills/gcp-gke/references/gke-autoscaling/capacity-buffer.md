---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/capacity-buffer
---

# About capacity buffers

Capacity buffers reduce Pod startup latency by declaring active or standby spare capacity through a CapacityBuffer custom resource. The cluster autoscaler treats buffers as pending demand and provisions nodes to keep the capacity available.

## Signature / Usage

Pair buffers with the `optimize-utilization` profile on Standard clusters (snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler):

```bash
gcloud container clusters update CLUSTER_NAME \
    --autoscaling-profile optimize-utilization
```

Buffer size estimate (plain-text restatement of the source's formulas):

- Active buffer replicas = Expected scale-up rate x Standby node resume latency
- Standby buffer replicas = (Expected scale-up rate x Cold node creation latency) - Active buffer replicas

Example: 2 Pods/s, 30 s resume, 90 s cold creation gives 60 active and 120 standby replicas.

## Options / Props

| Buffer type | Total buffer replicas per cluster | Buffers per cluster |
|-------------|-----------------------------------|---------------------|
| Active | Up to 7,000 | Up to 100 |
| Standby | Up to 5,000 | Up to 25 |

| Strategy | Description |
|----------|-------------|
| Active buffer | Running nodes, minimal latency; billed at standard node rates |
| Standby buffer | Suspended nodes; no CPU/memory charge while suspended (storage and IP charges apply); resume takes about 30 seconds (typically 30 to 35 s); cold node creation typically 60 to 120 s |

| CapacityBuffer sizing | Description |
|-----------------------|-------------|
| Fixed replicas | Number of buffer Pods from a referenced Pod template |
| Resource limits | Total CPU and memory to reserve |
| Percentage-based | Percentage of a scalable object with a scale subresource (Deployment, StatefulSet, ReplicaSet, Job) |

`replicas` and `percentage` can be combined (the larger is a floor), with `limits` as the upper bound.

## Notes

- Requires GKE 1.37.1-gke.3020000 or later. Only node-based billing (Standard node pools, Autopilot node pools selecting specific hardware); Pod-based billing is not supported. No extra charge beyond node costs.
- Scheduling priority: running active-buffer nodes, running not-yet-suspended standby nodes, suspended standby nodes, then new nodes. Any Pod whose constraints match can claim buffer capacity; use workload separation to dedicate a buffer.
- On Standard, enable node pool auto-creation (otherwise only existing node pools scale). Spare nodes scale up one node pool at a time, so avoid many buffers needing separate node pools.
- Quotas: active nodes count against Compute Engine vCPU, memory, disk and IP quotas; suspended standby nodes still use IP and disk quotas; both count toward Kubernetes resource quotas.
- Standby limitations: no GPUs/TPUs, no Local SSD, no Confidential GKE Nodes, only Container-Optimized OS and Ubuntu images, no CSEK disks, no nodes over 208 GB memory, no bare metal, ACPI S3 required; memory is encrypted with Google-owned keys during suspension. Resuming needs zonal capacity; suspended Spot VMs cannot become on-demand.
- Best practices: standby-first, small active plus larger standby (hybrid), pair with HPA scale-from-zero, use the open-source buffers simulator (`gke-labs/buffers-simulator`).
- Snippet taken from the cluster autoscaler page because this twin has no code block.
- The active and standby buffer formulas are LaTeX in the source; they are restated as plain-text lines here (not code).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/capacity-buffer (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-autoscaler.md](./cluster-autoscaler.md)
- [node-auto-provisioning.md](./node-auto-provisioning.md)
- [horizontalpodautoscaler.md](./horizontalpodautoscaler.md)
