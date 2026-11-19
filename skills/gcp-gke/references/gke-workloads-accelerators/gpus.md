---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gpus
---

# About GPUs in GKE

Overview of GPUs in GKE to help you pick a GPU configuration: GPU quota, Autopilot vs Standard, GKE-managed GPU stack vs the NVIDIA GPU Operator, GPU sharing features, CUDA-X libraries, monitoring, and node-maintenance disruption. For Slurm-based GPU workloads, see "Create an AI-optimized Slurm cluster" in the AI Hypercomputer docs.

## Signature / Usage

### Make CUDA-X libraries available to a container

To use CUDA applications the image must include the libraries. Build your own image and include these values in `LD_LIBRARY_PATH` in the container spec:

```text
/usr/local/nvidia/lib64
/usr/local/cuda-CUDA_VERSION/lib64
```

`/usr/local/nvidia/lib64` is the location of the NVIDIA device drivers. `/usr/local/cuda-CUDA_VERSION/lib64` is the location of the CUDA-X libraries on the node; replace `CUDA_VERSION` with the CUDA-X image version you used. Some versions also contain debug utilities in `/usr/local/nvidia/bin`.

Ensure the GKE patch version on your nodes includes a GPU driver compatible with your CUDA version. In Autopilot, GKE manages driver selection and installation.

## Options / Props

### Autopilot vs Standard

| Description | Autopilot | Standard |
| --- | --- | --- |
| Requesting GPU hardware | Specify GPU resources in your workloads. | Attach GPU hardware to nodes, then allocate GPU resources to workloads on those nodes. |
| GPU hardware | NVIDIA GB300, GB200, B200, H200 141GB, H100 80GB, A100 80GB, A100 40GB, RTX PRO 6000, L4, T4 | All GPU types supported by Compute Engine |
| Selecting a GPU | Request quantity and type in the workload spec; Autopilot installs the default driver for that GKE version. | Create a node pool with the GPU type and machine type and choose a driver; manually install drivers if not automatic; request GPU quantities in the Pod spec. |
| Improve utilization | Multi-instance GPUs, time-sharing GPUs | Multi-instance GPUs, time-sharing GPUs, NVIDIA MPS |
| Security | GPUs with GKE Sandbox; GPUs with Confidential GKE Nodes | Same |
| Pricing | Autopilot GPU Pod pricing | Compute Engine GPU pricing |

Best practice: use Autopilot for a fully managed experience (GKE manages driver installation, node scaling, Pod isolation, and node provisioning).

### GKE-managed vs NVIDIA GPU Operator

| Description | GKE-managed GPU nodes | NVIDIA GPU Operator on GKE |
| --- | --- | --- |
| Node lifecycle (installation, upgrade) | Fully managed by GKE | Managed by the user |
| Driver installation | Automatic and manual | Manual |
| Node selector | `cloud.google.com/gke-gpu=true` | `nvidia.com/gpu=true` |
| Multi-instance GPUs | Configure with the GKE API | Node label and ConfigMap; supports in-place reconfiguration |
| Time sharing | Configure with the GKE API | Node label and ConfigMap |
| Multi-Process Service | Configure with the GKE API | Not supported |
| Health checking | Monitors XID 48; node repair triggered in 15 min if GPU allocatable count differs from capacity and auto-repair is enabled | Monitors all error codes by default; same 15 min repair rule |
| Metrics | GKE managed DCGM; with system metrics: duty cycle, memory usage, memory capacity | Self-managed DCGM; GKE GPU system metrics are not collected |

### GPU features to reduce underutilization

| Feature | Available on | Description |
| --- | --- | --- |
| Multi-instance GPUs | Autopilot and Standard | Split a single GPU into up to seven hardware-separated instances. |
| Time-sharing GPUs | Autopilot and Standard | Present one GPU as multiple units; the driver context-switches. |
| NVIDIA MPS | Standard | Share one physical NVIDIA GPU across containers (CUDA MPS). |

### GPU quota

| Rule | Value |
| --- | --- |
| Minimum quota | At least the total number of GPUs you intend to run. |
| With cluster autoscaling | At least max nodes multiplied by GPUs per node (3 nodes with 2 GPUs each requires 6). |
| Quota metric to request | `gpus` |

### Monitoring metrics (system metrics enabled)

| Metric | Description |
| --- | --- |
| `container/accelerator/duty_cycle` | Percentage of the past 10-second sample period the accelerator was actively processing; 1 to 100. |
| `container/accelerator/memory_used` | Accelerator memory allocated in bytes. |
| `container/accelerator/memory_total` | Total accelerator memory in bytes. |
| `kubernetes.io/jobset/times_between_interruptions`, `times_to_recover`, `uptime` | JobSet metrics (GPU and TPU JobSets with a single replicated Job). |
| `kubernetes.io/node/status_condition` | Requires GKE 1.32.1-gke.1357001 or later. |

These container-level metrics are not collected for containers on a GPU that uses time-sharing or NVIDIA MPS. Kube-state-metrics for JobSets can be used with GPUs and require GKE 1.32.1-gke.1357001 or later.

## Notes

- GPU availability depends on the Compute Engine region or zone. Performance-oriented machine types (A4X Max, A4X, A4, A3 Ultra) need specific configuration documented in AI Hypercomputer docs (GB300: A4X Max, GB200: A4X, B200 or H200: A4 or A3 Ultra).
- In clusters with control plane 1.29.1-gke.1425000 and later you can configure GKE to terminate GPU workloads gracefully on node maintenance.
- The NVIDIA GPU Operator works on Container-Optimized OS and Ubuntu node images; choose it for cross-cloud consistency or software that depends on it.
- Choose a consumption option on the page "About accelerator consumption options for AI/ML workloads in GKE".
- This page has no commands beyond the `LD_LIBRARY_PATH` values above; Console steps for viewing Workloads GPU usage are omitted.
- GKE runs Kubernetes workloads on Google Cloud; this is distinct from the GPU compute stacks in `nvidia-cuda` and from Compute Engine GPU VMs (`gcp-compute`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gpus (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [timesharing-gpus.md](./timesharing-gpus.md)
- [autopilot-resource-requests.md](./autopilot-resource-requests.md)
- [dws.md](./dws.md)
- [tpus.md](./tpus.md)
