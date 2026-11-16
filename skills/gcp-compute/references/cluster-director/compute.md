---
source: https://docs.cloud.google.com/cluster-director/docs/compute
---

# Machine series supported in Cluster Director

CPU-based machines (C4A for login nodes only, N2) and GPU-accelerated machines (A4X Max, A4X, A4, A3 Ultra, A3 Mega) that Cluster Director can use to deploy HPC, AI and ML infrastructure. GPU machine types are available only in specific regions and zones (see GPU locations at https://docs.cloud.google.com/compute/docs/regions-zones/gpu-regions-zones). TPU machine series are on a separate page of the official docs (`cluster-director/docs/tpu-machines`) not covered here.

## Signature / Usage

### Create a cluster from the A3 Mega quickstart reference architecture

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/create (gcloud 593.0.0 help, "using the quickstart setup with default cluster parameters"):

```bash
gcloud cluster-director clusters create my-cluster \
    --location=us-central1 --reference-architecture=quickstart \
    --create-network=name=network0
```

## Options / Props

### C4A (login nodes only)

Arm-based Google Axion processors. Login nodes using C4A must be paired with compute nodes on A4X Max or A4X. Memory per vCPU: `standard` 4 GB, `highmem` 8 GB, `highcpu` 2 GB (DDR5). Sizes 1 to 72 vCPUs. Machine types with Local SSD (`-lssd`) or bare metal (`-metal`) cannot be used for login nodes. A vCPU is a full physical core (no SMT).

| vCPUs | standard mem (GB) | highmem mem (GB) | highcpu mem (GB) | Default egress (Gbps) | Tier_1 egress (Gbps) |
|---|---|---|---|---|---|
| 1 | 4 | 8 | 2 | Up to 10 | N/A |
| 2 | 8 | 16 | 4 | Up to 10 | N/A |
| 4 | 16 | 32 | 8 | Up to 23 | N/A |
| 8 | 32 | 64 | 16 | Up to 23 | N/A |
| 16 | 64 | 128 | 32 | Up to 23 | N/A |
| 32 | 128 | 256 | 64 | Up to 23 | Up to 50 |
| 48 | 192 | 384 | 96 | Up to 34 | Up to 50 |
| 64 | 256 | 512 | 128 | Up to 45 | Up to 75 |
| 72 | 288 | 576 | 144 | Up to 50 | Up to 100 |

Type names are `c4a-standard-N`, `c4a-highmem-N`, `c4a-highcpu-N` with N = vCPUs.

### N2

Memory per vCPU: `standard` 4 GB, `highmem` 8 GB, `highcpu` 1 GB; sizes 2 to 128 vCPUs. A vCPU is a hardware thread. For Windows OS images, maximum network bandwidth is limited to 50 Gbps.

| vCPUs | standard mem (GB) | highmem mem (GB) | highcpu mem (GB) | Default egress (Gbps) | Tier_1 egress (Gbps) |
|---|---|---|---|---|---|
| 2 | 8 | 16 | 2 | Up to 10 | N/A |
| 4 | 16 | 32 | 4 | Up to 10 | N/A |
| 8 | 32 | 64 | 8 | Up to 16 | N/A |
| 16 | 64 | 128 | 16 | Up to 32 | N/A |
| 32 | 128 | 256 | 32 | Up to 32 | Up to 50 |
| 48 | 192 | 384 | 48 | Up to 32 | Up to 50 |
| 64 | 256 | 512 | 64 | Up to 32 | Up to 75 |
| 80 | 320 | 640 | 80 | Up to 32 | Up to 100 |
| 96 | 384 | 768 | 96 | Up to 32 | Up to 100 |
| 128 | 512 | 864 | not offered (highcpu stops at 96) | Up to 32 | Up to 100 |

Type names are `n2-standard-N`, `n2-highmem-N`, `n2-highcpu-N`.

### GPU machine types

| Series | Machine type | GPUs | vCPUs | Memory (GB) | Local SSD (GiB) | Physical NICs | Max network (Gbps) | GPU memory (GB) |
|---|---|---|---|---|---|---|---|---|
| A4X Max (bare metal) | `a4x-maxgpu-4g-metal` | 4 NVIDIA GB300 (B300 Blackwell, `nvidia-gb300`) | 144 | 960 | 12,000 | 6 | 3,600 | 1,116 HBM3e |
| A4X | `a4x-highgpu-4g` | 4 NVIDIA GB200 (B200 Blackwell, `nvidia-gb200`) | 140 | 884 | 12,000 | 6 | 2,000 | 744 HBM3e |
| A4 | `a4-highgpu-8g` | 8 NVIDIA B200 (`nvidia-b200`) | 224 | 3,968 | 12,000 | 10 | 3,600 | 1,440 HBM3e |
| A3 Ultra | `a3-ultragpu-8g` | 8 NVIDIA H200 (`nvidia-h200-141gb`) | 224 | 2,952 | 12,000 | 10 | 3,600 | 1128 HBM3e |
| A3 Mega | `a3-megagpu-8g` | 8 NVIDIA H100 | 208 | 1,872 | 6,000 | 9 | 1,800 | 640 HBM3 |

### Capacity requirements per GPU series

| Series | Requirement stated in the source |
|---|---|
| A4X Max | Reserve capacity to create instances and clusters (see AI Hypercomputer "Reserve capacity" and "Deployment options overview"). |
| A4X | Reserve capacity through your account team and create VMs from it. |
| A4, A3 Ultra, A3 Mega | Reserve capacity, or create Spot VMs or Flex-start VMs. |

## Notes

- A4X Max and A4X are exascale platforms (NVIDIA GB300 NVL72 / GB200 NVL72) with two Grace CPU sockets (Arm Neoverse V2) linked to four Blackwell GPUs over NVLink-C2C; A4X Max is available only as bare metal instances (no hypervisor layer). A3 is powered by H100 or H200 SXM GPUs.
- vCPU count for GPU types is a hardware hyper-thread; maximum egress cannot exceed the number given and actual bandwidth depends on destination IP and other factors. Tier_1 egress needs high-bandwidth networking on larger sizes.
- Limitations per series are in the Compute Engine accelerator-optimized machines page (`https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines`).
- This table condenses the source's per-family tables (standard, highmem, highcpu) into one table per series; values are unchanged.
- Compute Engine / Cluster Director VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source page shows no commands; the snippet is borrowed from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/create (gcloud 593.0.0 help). Per the help, `quickstart` provisions "Compute: 2x a3-megagpu-8g nodes (Flex Start, max duration 7 days)", "Login Node: 1x n2-standard-16 node" and "Storage: 36TB Lustre storage (scratch disk)". It creates billable cluster resources; try it in a disposable project first and delete the cluster after testing.
- Source inconsistency: gcloud 593.0.0 also offers the `g4-flex-start` ("4x g4-standard-384 compute nodes (Flex Start)") and `h4d-highmem-flex-start` ("4x h4d-highmem-192 compute nodes (Flex Start)") reference architectures, while this page lists no G4 or H4D machine series and choose-consumption-option.md lists only "A4, A3 Ultra, A3 Mega, TPU7x, TPU v6e, TPU v5p" for Flex-start. The A4X Max default Slurm image family is in [os-images.md](./os-images.md).
- Source (Choose a consumption option, cited above as `choose-consumption-option.md`): https://docs.cloud.google.com/cluster-director/docs/choose-consumption-option (retrieved 2026-11-17)
- Source (compared page): https://docs.cloud.google.com/cluster-director/docs/os-images (os-images.md) (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/cluster-director/docs/compute (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [os-images.md](./os-images.md)
- [choose-consumption-option.md](./choose-consumption-option.md)
- [process-overview.md](./process-overview.md)
- [orchestration.md](./orchestration.md)
