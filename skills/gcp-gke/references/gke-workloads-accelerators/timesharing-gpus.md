---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/timesharing-gpus
---

# About GPU sharing strategies in GKE

Characteristics and best-fit workloads of the GPU sharing strategies in GKE: multi-instance GPU, GPU time-sharing, and NVIDIA MPS. Kubernetes only allows integer GPU requests, so a whole physical GPU goes to one container even if it needs a fraction; sharing strategies improve utilization.

## Signature / Usage

### Request multi-instance GPU in a Pod

Specify the `cloud.google.com/gke-gpu-partition-size` label in `spec.nodeSelector`. GKE schedules to matching nodes, and uses autoscaling and node auto-provisioning to create nodes or node pools that match the label.

### Request GPU time-sharing or NVIDIA MPS in a Pod

Specify these labels in `spec.nodeSelector`:

```text
cloud.google.com/gke-max-shared-clients-per-gpu
cloud.google.com/gke-gpu-sharing-strategy
```

### Rejection error

If GKE rejects a workload, you see an error similar to:

```yaml
status:
  message: 'Pod Allocate failed due to rpc error: code = Unknown desc = [invalid request
    for sharing GPU (time-sharing), at most 1 nvidia.com/gpu can be requested on GPU nodes], which is unexpected'
  phase: Failed
  reason: UnexpectedAdmissionError
```

## Options / Props

### Sharing strategies

| Strategy | How it works | Isolation |
| --- | --- | --- |
| Multi-instance GPU | GKE divides a supported GPU into up to seven slices; each slice goes to one container (max seven containers per GPU). | Hardware isolation, consistent and predictable QoS. |
| GPU time-sharing | Built-in NVIDIA timesharing (instruction-level preemption since the Pascal architecture). | Software-level: address space, performance, and error isolation. |
| NVIDIA MPS | NVIDIA Multi-Process Service, a binary-compatible CUDA API implementation for cooperative multi-process CUDA workloads. | Software-level: resource limits (active thread percentage, pinned device memory). |

Best practice: combine multi-instance GPU with GPU time-sharing, or multi-instance GPU with NVIDIA MPS. The maximum number of containers sharing a physical GPU is set in the workload spec on Autopilot, and at node pool creation on Standard (every GPU in the pool shares per that setting).

### Scheduling by node labels

| Labels specified | Behavior |
| --- | --- |
| Both `gke-max-shared-clients-per-gpu` and `gke-gpu-sharing-strategy` | Schedule on nodes matching both; otherwise autoscaling and node auto-provisioning create matching nodes or pools. |
| Only `gke-max-shared-clients-per-gpu` | Autopilot: GKE rejects the workload. Standard: schedule on matching nodes; auto-provisioned nodes get `cloud.google.com/gke-gpu-sharing-strategy: time-sharing` (time-sharing) or `mps` (MPS) by default. |
| Only `gke-gpu-sharing-strategy` | Autopilot: rejected. Standard: schedule on nodes with that strategy; with several shared pools of different values the workload can land on any available node; if none available the autoscaler scales up the pool with the lowest `gke-max-shared-clients-per-gpu`; if all are full, node auto-provisioning creates a pool with the default `cloud.google.com/gke-max-shared-clients-per-gpu=2`. |

### GPU request quantities (time-sharing and MPS)

| Request per container | Result |
| --- | --- |
| One GPU time-sharing or MPS | Allowed, whether the node has one or multiple physical GPUs. |
| More than one GPU time-sharing | Rejected (same for more than one multi-instance GPU instance, since each is a discrete GPU). |
| More than one MPS | Allowed if the node has only one physical GPU; rejected if the node has multiple physical GPUs. |

The number of GPUs requested with time-sharing or MPS is not a measure of compute power available to the container.

### Node-level metrics (time-sharing and MPS nodes)

| Metric | Description |
| --- | --- |
| `node/accelerator/duty_cycle` | Percentage of the last 10-second sample period the GPU node was actively processing; 1% to 100%. |
| `node/accelerator/memory_used` | Accelerator memory allocated in bytes per GPU node. |
| `node/accelerator/memory_total` | Total accelerator memory in bytes per GPU node. |

## Notes

- These node-level metrics differ from the container-level (`container/accelerator`) metrics of regular GPUs, which are not collected for containers on time-shared or MPS GPUs.
- NVIDIA MPS is available on Standard clusters; multi-instance GPUs and time-sharing are available on Autopilot and Standard (see gpus.md).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/timesharing-gpus (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gpus.md](./gpus.md)
- [dws.md](./dws.md)
