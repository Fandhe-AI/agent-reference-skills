---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-resource-requests
---

# Resource requests in Autopilot

GKE Autopilot manages Pod resource requests (CPU, memory, ephemeral storage). Autopilot applies defaults to containers that do not specify requests, enforces minimum and maximum values per compute class or hardware configuration, raises requests that are below the minimum, and rejects workloads that exceed the maximum.

## Signature / Usage

### Choose where extra capacity goes

By default, when Autopilot scales a resource up to meet a minimum or default value, GKE allocates the extra capacity to the first container in the Pod manifest. In GKE version 1.27.2-gke.2200 and later, add this to the `annotations` field of your Pod manifest to allocate the extra resources to a specific container:

```text
autopilot.gke.io/primary-container: "CONTAINER_NAME"
```

Replace `CONTAINER_NAME` with the name of the container.

### Requests and limits set only one side

`requests` not set, `limits` set: Autopilot sets `requests` to the value of `limits`. Before:

```yaml
resources:
  limits:
    cpu: "400m"
```

After:

```yaml
resources:
  requests:
    cpu: "400m"
  limits:
    cpu: "400m"
```

`requests` greater than `limits`: Autopilot sets `requests` to the value of `limits`. Before:

```yaml
resources:
  requests:
    cpu: "450m"
  limits:
    cpu: "400m"
```

After:

```yaml
resources:
  requests:
    cpu: "400m"
  limits:
    cpu: "400m"
```

## Options / Props

### Defaults (all compute classes / hardware)

| Container type | CPU | Memory | Ephemeral storage |
| --- | --- | --- | --- |
| Containers in DaemonSets | 50 mCPU | 100 MiB | 100 MiB |
| All other containers | — | — | 1 GiB |

### Default requests for compute classes

If only one of CPU or memory is set, GKE uses the CPU:memory ratio of the class to set the other. Autopilot does not enforce default requests for GPU Pods and Pods that use the `Performance` ComputeClass.

| Compute class | CPU | Memory |
| --- | --- | --- |
| General-purpose (default `autopilot`, or `autopilot-arm`), Balanced, Scale-Out | 0.5 vCPU | 2 GiB |

### Minimums and maximums for compute classes

| Compute class | CPU:memory ratio (vCPU:GiB) | CPU min | CPU max | Memory min | Memory max |
| --- | --- | --- | --- | --- | --- |
| General-purpose | Between 1:1 and 1:6.5 | 50m (clusters that support bursting); 250m (clusters that don't) | 30 vCPU | 52 MiB (bursting); 512 MiB (no bursting) | 110 GiB |
| Balanced | Between 1:1 and 1:8 | 0.25 vCPU | 222 vCPU (with minimum CPU platform: Intel 126, AMD 222) | 0.5 GiB | 851 GiB (with minimum CPU platform: Intel 823 GiB, AMD 851 GiB) |
| Scale-Out | Exactly 1:4 | 0.25 vCPU | `arm64`: 43 vCPU; `amd64`: 54 vCPU | 1 GiB | `arm64`: 172 GiB; `amd64`: 216 GiB |
| Performance | N/A | No minimum enforced | see below | No minimum enforced | see below |

Performance class maximums per machine series (no minimum requests enforced):

| Machine series | Max CPU (vCPU) | Max memory (GiB) | Max ephemeral storage |
| --- | --- | --- | --- |
| C2 | 58 | 218 | 56 TiB |
| C2D | 110 | 835 | 56 TiB |
| C3 | 174 | 1,345 | 56 TiB |
| C3 with Local SSD | 174 | 670 | 10,000 GiB |
| C3D | 358 | 2750 | 56 TiB |
| C3D with Local SSD | 358 | 1,375 | 10,000 GiB |
| C4A (see Arm requirements and limitations) | 70 | 540 | 56 TiB |
| C4D (1.32.9-gke.1711000 or later) | 382 | 2905 | 56 TiB |
| C4D with Local SSD (1.32.9-gke.1711000 or later) | 382 | 2905 | 10,000 GiB |
| C4N (1.36.0-gke.3009002 or later) | 192 | 1,488 | not listed |
| H3 | 86 | 330 | 56 TiB |
| H4D (1.33.2-gke.4731000 or later) | 192 | 1400 | 56 TiB |
| T2A | 46 | 172 | 56 TiB |
| T2D | 58 | 218 | 56 TiB |
| C4 | 286 | 2140 | 56 TiB |
| M4 (1.33.4-gke.1013000 or later) | 224 | 5952 | 56 TiB |
| N4 | 78 | 600 | 56 TiB |
| N4A (1.34.1-gke.3403001 or later) | 64 | 512 | 56 TiB |
| N4D (1.33.13-gke.1079000 or later, or 1.34.1-gke.2037000 or later) | 94 | 768 | 56 TiB |
| Z3 | 174 | 1406 | 34,000 GiB |
| Z4D (1.36.3-gke.1244000 or later) | 382 | 3024 | 75,000 GiB |

### Maximums for accelerators

GKE does not enforce minimum CPU, memory, or ephemeral storage for accelerator Pods. Unless specified, the maximum ephemeral storage is 56 TiB.

| Accelerator (node selector value) | Max CPU | Max memory | Max ephemeral storage |
| --- | --- | --- | --- |
| NVIDIA B200 `nvidia-B200` | 8 GPUs: 220 vCPU | 8 GPUs: 3800 GiB | 8 GPUs: 10 TiB |
| NVIDIA H200 (141GB) `nvidia-h200-141gb` | 8 GPUs: 220 vCPU | 8 GPUs: 2810 GiB | 8 GPUs: 10 TiB (1.32.2-gke.1182000 or later); 2540 GiB (earlier) |
| NVIDIA H100 Mega (80GB) `nvidia-h100-mega-80gb` | 8 GPUs: 206 vCPU | 8 GPUs: 1795 GiB | 8 GPUs: 5250 GiB |
| NVIDIA H100 (80GB) `nvidia-h100-80gb` | 8 GPUs: 206 vCPU | 8 GPUs: 1795 GiB | 8 GPUs: 5250 GiB |
| NVIDIA A100 (40GB) `nvidia-tesla-a100` | 1 GPU: 11; 2: 22; 4: 46; 8: 94; 16: 94 vCPU (sum of DaemonSet CPU requests on the node must not exceed 2 vCPU) | 1 GPU: 74 GiB; 2: 148; 4: 310; 8: 632; 16: 1264 (sum of DaemonSet memory requests must not exceed 14 GiB) | 56 TiB |
| NVIDIA A100 (80GB) `nvidia-a100-80gb` | 1 GPU: 11; 2: 22; 4: 46; 8: 94 vCPU (DaemonSets: max 2 vCPU) | 1 GPU: 148 GiB; 2: 310; 4: 632; 8: 1264 (DaemonSets: max 14 GiB) | 1 GPU: 280 GiB; 2: 585; 4: 1220; 8: 2540 |
| NVIDIA RTX PRO 6000 `nvidia-rtx-pro-6000` | 1/8 GPU: 6; 1/4: 12; 1/2: 24; 1: 47; 2: 94; 4: 190; 8: 380 vCPU | 1/8 GPU: 22 GiB; 1/4: 45; 1/2: 90; 1: 164; 2: 330; 4: 675; 8: 1350 | 1/8 GPU: 0 GiB (no ephemeral storage); 1/4: 375 GiB; 1/2: 750 GiB; 1: 1500 GiB; 2: 3 TiB; 4: 6 TiB; 8: 12 TiB |
| NVIDIA L4 `nvidia-l4` | 1 GPU: 31; 2: 23; 4: 47; 8: 95 vCPU (DaemonSets: max 2 vCPU) | 1 GPU: 115 GiB; 2: 83; 4: 177; 8: 363 (DaemonSets: max 14 GiB) | 56 TiB |
| NVIDIA Tesla T4 `nvidia-tesla-t4` | 1 GPU: 46; 2: 46; 4: 94 vCPU | 1 GPU: 287.5 GiB; 2: 287.5; 4: 587.5 | 56 TiB |
| Ironwood (TPU7x) `tpu7x` | tpu7x-standard-4t: 224 vCPU | tpu7x-standard-4t: 992 GiB | 56 TiB |
| TPU v6e (Preview) `tpu-v6e-slice` | ct6e-standard-1t: 44; 4t: 180; 8t: 180 vCPU | 1t: 176 GiB; 4t: 720; 8t: 1440 | 56 TiB |
| TPU v5e `tpu-v5-lite-podslice` | 1x1: 24; 2x2: 112; 2x4 (4-chip): 112; 2x4 (8-chip): 224; 4x4, 4x8, 8x8, 8x16, 16x16: 112 vCPU | 1x1: 48 GiB; 2x2: 192; 2x4 (4-chip): 192; 2x4 (8-chip): 384; 4x4 to 16x16: 192 | 56 TiB |
| TPU v5p `tpu-v5p-slice` | 280 vCPU | 448 GiB | 56 TiB |
| TPU v4 `tpu-v4-podslice` | 240 vCPU | 407 GiB | 56 TiB |

### Workload separation and extended duration (higher defaults and minimums)

Applies when you use a `podFamily` priority rule in any custom Autopilot ComputeClass that is not the cluster-level default, or when you use the default platform, any built-in ComputeClass, `podFamily` rules in a cluster-level default custom class, or `Balanced` / `Scale-Out`, and also use workload separation, Pod anti-affinity, or the extended-duration annotation (no eviction from node auto-upgrade and scale-down for up to seven days). Below the minimum, Autopilot raises requests, except with Pod anti-affinity, where it rejects the Pod.

| Configuration | Default | Minimum |
| --- | --- | --- |
| Modified scheduling/eviction on default platform, built-in classes, or `podFamily` rules in cluster-level default classes | CPU 0.5 vCPU, memory 2 GiB | CPU 0.5 vCPU, memory 0.5 GiB |
| `podFamily` rules in non-default custom ComputeClasses | CPU 0.5 vCPU, memory 2 GiB | CPU 0.5 vCPU, memory 0.5 GiB |
| Modified scheduling/eviction and `Balanced` class | CPU 2 vCPU, memory 8 GiB | CPU 1 vCPU, memory 4 GiB |
| Modified scheduling/eviction and `Scale-Out` class | CPU 0.5 vCPU, memory 2 GiB | CPU 0.5 vCPU, memory 2 GiB |

### Other limits and rules

| Topic | Rule |
| --- | --- |
| Ephemeral storage backing | VM boot disk unless nodes have local SSDs (A100 80GB, H100 80GB, Z3, Z4D); then max equals local SSD size minus system overhead. |
| Ephemeral storage max | GKE 1.29.3-gke.1038000 and later: Performance class and accelerator Pods up to 56 TiB (unless local SSD). All other Autopilot Pods: total across containers between 10 MiB and 10 GiB. For more, use generic ephemeral volumes (for example, `pd-balanced` up to 64 TiB). |
| DaemonSet minimums | Bursting clusters: 1 mCPU, 2 MiB memory per Pod, 10 MiB ephemeral storage per container. Non-bursting: 10 mCPU, 10 MiB memory per Pod, 10 MiB ephemeral storage per container. |
| CPU increments | Clusters that support bursting: 0.25 vCPU increments not enforced. Otherwise CPU rounds up to the nearest 0.25 vCPU. |
| CPU:memory ratio | Out-of-range ratio: Autopilot increases the smaller resource (1 vCPU + 16 GiB on Scale-Out becomes 4 vCPU). |
| Per-node minimum (Pod-based billing in Standard clusters) | If billable Pod requests on a node are below the single-Pod minimum, GKE charges the minimum. |
| Ephemeral storage over max | Before 1.28.6-gke.1317000 Autopilot scales it down; 1.28.6-gke.1317000 and later it rejects the workload. |

### Requests and limits behavior

| Values set | Autopilot behavior |
| --- | --- |
| `requests` equal to `limits` | Guaranteed QoS. Ephemeral storage limits must always equal requests (GKE enforces). |
| `requests` set, `limits` not set | Bursting clusters: Pods can burst into burstable capacity. Non-bursting: `limits` = `requests`. |
| `requests` less than `limits` | Bursting clusters: burst up to `limits`. Non-bursting: `limits` = `requests`. |
| neither set | `requests` = class/hardware defaults; bursting: no `limits`; non-bursting: `limits` = `requests`. |

### Init containers

If init container CPU/memory requests are unset or `0`, Autopilot adds requests equal to the sum of requests of all application containers (unlike Standard, where init containers use unallocated node resources). Billing uses the effective request: the larger of the largest single init container request and the sum of application container requests. Changing application container requests after creation does not update init container requests; update them manually or remove them to let Autopilot recompute.

## Notes

- Autopilot rejects (does not modify) workloads whose requests exceed the maximum.
- Whether a cluster supports bursting is shown at https://docs.cloud.google.com/kubernetes-engine/docs/how-to/pod-bursting-gke#availability-in-gke.
- NVIDIA RTX PRO 6000: starting October 1, 2026, GKE bills the Autopilot node management premium in addition to existing hardware charges.
- All A100 (80GB) GPU nodes use local SSDs for boot disks at fixed sizes by GPU count, billed separately; A100 (40GB) does not.
- Resource modification examples in the source: 30 mCPU raised to 50 mCPU; three 10 mCPU containers raised to 30/10/10 for a 50 mCPU total; 4 vCPU with 1 GiB memory raised to 4 GiB memory (1:1 minimum ratio).
- The source also shows no Console or Terraform content; its before/after YAML appears inside a table.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-resource-requests (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [workload-separation.md](./workload-separation.md)
- [gpus.md](./gpus.md)
- [tpus.md](./tpus.md)
