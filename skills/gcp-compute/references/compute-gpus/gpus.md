---
source: https://docs.cloud.google.com/compute/docs/gpus
---

# GPU platforms

NVIDIA GPU models for Compute Engine: which GPUs come pre-attached to accelerator-optimized machine series (A5X, A4X Max, A4X, A4, A3, A2, G4, G2) and which can be attached to N1 general-purpose instances, with machine type shapes, comparison chart and per-architecture performance. GPU regions and zones: https://docs.cloud.google.com/compute/docs/gpus/gpu-regions-zones.

## Signature / Usage

Snippets below are from the gcloud help text of `gcloud compute accelerator-types list`.

```bash
gcloud compute accelerator-types list
```

```bash
gcloud compute accelerator-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

In all tables `vCPU` is one hardware hyper-thread (A5X bare metal: 176 = physical cores across two 88-core NVIDIA Vera sockets). Maximum network bandwidth is a cap on egress; actual bandwidth depends on destination IP and other factors. GPU memory is separate from instance memory.

### A5X (NVIDIA Vera Rubin, bare metal)

To get started, contact your account team to reserve capacity. Two Vera CPU sockets connect to four Rubin GPUs over NVLink-C2C.

| Machine type | vCPU | Memory (GB) | Local SSD (GiB) | NICs | Max network (Gbps) | Rubin GPUs | GPU memory (GB HBM4) |
|---|---|---|---|---|---|---|---|
| `a5x-highgpu-4g-metal` | 176 | 1,440 | 48,000 | 10 | 7,200 | 4 | 1,152 |

### A4X Max (NVIDIA GB300, bare metal only) and A4X (NVIDIA GB200)

Two Grace CPU sockets (Arm Neoverse V2) connect to four GPUs over NVLink-C2C. Capacity must be reserved when provisioning A4X Max and A4X.

| Machine type | vCPU | Memory (GB) | Local SSD (GiB) | NICs | Max network (Gbps) | GPUs | GPU memory (GB HBM3e) |
|---|---|---|---|---|---|---|---|
| `a4x-maxgpu-4g-metal` | 144 | 960 | 12,000 | 6 | 3,600 | 4 (B300) | 1,116 |
| `a4x-highgpu-4g` | 140 | 884 | 12,000 | 6 | 2,000 | 4 (B200) | 744 |

### A4 (NVIDIA B200) and A3 Ultra (NVIDIA H200)

A4 and A3 Ultra require reserving capacity, Spot VMs, Flex-start VMs, or a MIG resize request.

| Machine type | vCPU | Memory (GB) | Local SSD (GiB) | NICs | Max network (Gbps) | GPUs | GPU memory (GB) |
|---|---|---|---|---|---|---|---|
| `a4-highgpu-8g` | 224 | 3,968 | 12,000 | 10 | 3,600 | 8 | 1,440 (HBM3e) |
| `a3-ultragpu-8g` | 224 | 2,952 | 12,000 | 10 | 3,600 | 8 | 1128 (HBM3e) |

### A3 Mega, High and Edge (NVIDIA H100 SXM)

- `a3-megagpu-8g` (`nvidia-h100-mega-80gb`): a cluster deployed with GKE or Slurm is recommended.
- A3 High (`nvidia-h100-80gb`): `a3-highgpu-1g`, `-2g` and `-4g` must be created with Spot VMs (`SPOT`) or Flex-start VMs (`FLEX_START`, or a MIG resize request).
- A3 Edge (`nvidia-h100-80gb`): serving only, limited regions.

| Machine type | vCPU | Memory (GB) | Local SSD (GiB) | NICs | Max network (Gbps) | GPUs | GPU memory (GB HBM3) |
|---|---|---|---|---|---|---|---|
| `a3-megagpu-8g` | 208 | 1,872 | 6,000 | 9 | 1,800 | 8 | 640 |
| `a3-highgpu-1g` | 26 | 234 | 750 | 1 | 25 | 1 | 80 |
| `a3-highgpu-2g` | 52 | 468 | 1,500 | 1 | 50 | 2 | 160 |
| `a3-highgpu-4g` | 104 | 936 | 3,000 | 1 | 100 | 4 | 320 |
| `a3-highgpu-8g` | 208 | 1,872 | 6,000 | 5 | 1,000 | 8 | 640 |
| `a3-edgegpu-8g` | 208 | 1,872 | 6,000 | 5 | 600 (`asia-south1`, `northamerica-northeast2`) or 400 (other A3 Edge regions) | 8 | 640 |

### A2 (NVIDIA A100)

A2 Ultra (A100 80GB, `nvidia-a100-80gb`) has Local SSD attached. A2 Standard (A100 40GB, `nvidia-tesla-a100`) can add Local SSD at creation.

| Machine type | vCPU | Memory (GB) | Local SSD | Max network (Gbps) | GPUs | GPU memory (GB) |
|---|---|---|---|---|---|---|
| `a2-ultragpu-1g` | 12 | 170 | 375 GiB | 24 | 1 | 80 HBM2e |
| `a2-ultragpu-2g` | 24 | 340 | 750 GiB | 32 | 2 | 160 |
| `a2-ultragpu-4g` | 48 | 680 | 1,500 GiB | 50 | 4 | 320 |
| `a2-ultragpu-8g` | 96 | 1,360 | 3,000 GiB | 100 | 8 | 640 |
| `a2-highgpu-1g` | 12 | 85 | supported | 24 | 1 | 40 HBM2 |
| `a2-highgpu-2g` | 24 | 170 | supported | 32 | 2 | 80 |
| `a2-highgpu-4g` | 48 | 340 | supported | 50 | 4 | 160 |
| `a2-highgpu-8g` | 96 | 680 | supported | 100 | 8 | 320 |
| `a2-megagpu-16g` | 96 | 1,360 | supported | 100 | 16 | 640 |

### G4 (NVIDIA RTX PRO 6000 Blackwell Server Edition)

Supports vWS and Titanium SSD. Multi-GPU types (`g4-standard-96`, `g4-standard-192`, `g4-standard-384`) support GPU peer-to-peer over PCIe. Fractional GPU types are `g4-standard-6`, `-12`, `-24`.

| Machine type | vCPU | Memory (GB) | Max Titanium SSD (GiB) | NICs | Max network (Gbps) | GPUs | GPU memory (GB GDDR7) |
|---|---|---|---|---|---|---|---|
| `g4-standard-6` | 6 | 22 | 0 | 1 | 20 | 1/8 | 12 |
| `g4-standard-12` | 12 | 45 | 375 | 1 | 20 | 1/4 | 24 |
| `g4-standard-24` | 24 | 90 | 750 | 1 | 20 | 1/2 | 48 |
| `g4-standard-48` | 48 | 180 | 1,500 | 1 | 50 | 1 | 96 |
| `g4-standard-96` | 96 | 360 | 3,000 | 1 | 100 | 2 | 192 |
| `g4-standard-192` | 192 | 720 | 6,000 | 1 | 200 | 4 | 384 |
| `g4-standard-384` | 384 | 1,440 | 12,000 | 2 | 400 | 8 | 768 |

### G2 (NVIDIA L4)

| Machine type | vCPU | Default memory (GB) | Custom memory range (GB) | Max Local SSD (GiB) | Max network (Gbps) | GPUs | GPU memory (GB GDDR6) |
|---|---|---|---|---|---|---|---|
| `g2-standard-4` | 4 | 16 | 16 to 32 | 375 | 10 | 1 | 24 |
| `g2-standard-8` | 8 | 32 | 32 to 54 | 375 | 16 | 1 | 24 |
| `g2-standard-12` | 12 | 48 | 48 to 54 | 375 | 16 | 1 | 24 |
| `g2-standard-16` | 16 | 64 | 54 to 64 | 375 | 32 | 1 | 24 |
| `g2-standard-24` | 24 | 96 | 96 to 108 | 750 | 32 | 2 | 48 |
| `g2-standard-32` | 32 | 128 | 96 to 128 | 375 | 32 | 1 | 24 |
| `g2-standard-48` | 48 | 192 | 192 to 216 | 1,500 | 50 | 4 | 96 |
| `g2-standard-96` | 96 | 384 | 384 to 432 | 3,000 | 100 | 8 | 192 |

### N1 with attached GPUs

You specify the GPU count at creation; fewer GPUs limit max vCPUs. N1 shared-core types are excluded.

| Accelerator type | GPUs | GPU memory (GB) | vCPU | Memory (GB) | Local SSD |
|---|---|---|---|---|---|
| `nvidia-tesla-t4` / `nvidia-tesla-t4-vws` | 1 | 16 GDDR6 | 1 to 48 | 1 to 312 | Yes |
| same | 2 | 32 | 1 to 48 | 1 to 312 | Yes |
| same | 4 | 64 | 1 to 96 | 1 to 624 | Yes |
| `nvidia-tesla-p4` / `nvidia-tesla-p4-vws` | 1 | 8 GDDR5 | 1 to 24 | 1 to 156 | Yes (`us-central1-c`, `northamerica-northeast1-b` only) |
| same | 2 | 16 | 1 to 48 | 1 to 312 | same zones only |
| same | 4 | 32 | 1 to 96 | 1 to 624 | same zones only |
| `nvidia-tesla-v100` | 1 | 16 HBM2 | 1 to 12 | 1 to 78 | Yes (except `us-east1-c`) |
| same | 2 | 32 | 1 to 24 | 1 to 156 | Yes (except `us-east1-c`) |
| same | 4 | 64 | 1 to 48 | 1 to 312 | Yes (except `us-east1-c`) |
| same | 8 | 128 | 1 to 96 | 1 to 624 | Yes (except `us-east1-c`) |

N1 host maintenance (all: stop and restart, 7 days advance notice, simulate maintenance supported; frequencies are approximations, not guarantees):

| GPU | GPUs | Typical scheduled maintenance frequency | On-demand maintenance |
|---|---|---|---|
| T4 / P4 | 1 or 2 | Minimum of 15 days | No |
| T4 / P4 | 4 | Minimum of 30 days | Yes |
| V100 | 1, 2 or 4 | Minimum of 15 days | No |
| V100 | 8 | Minimum of 30 days | Yes |

### General comparison chart

| Machine type (GPU) | GPU memory and bandwidth | Interconnect | vWS | Best used for |
|---|---|---|---|---|
| A5X (Vera Rubin) | 288 GB HBM4 (22 TBps) | NVLink Full Mesh (3,600 GBps) | No | Large-scale distributed training and inference of MoE LLMs, Recommenders, HPC |
| A4X Max (GB300) | 279 GB HBM3e (8 TBps) | NVLink Full Mesh (1,800 GBps) | No | same as A5X |
| A4X (GB200) | 186 GB HBM3e (8 TBps) | NVLink Full Mesh (1,800 GBps) | No | Large-scale distributed training and inference of LLMs, Recommenders, HPC |
| A4 (B200) | 180 GB HBM3e (8 TBps) | NVLink Full Mesh (1,800 GBps) | No | same as A4X |
| A3 Ultra (H200) | 141 GB HBM3e (4.8 TBps) | NVLink Full Mesh (900 GBps) | No | Large models with large data tables for ML Training, Inference, HPC, BERT, DLRM |
| A3 Mega/High/Edge (H100) | 80 GB HBM3 (3.35 TBps) | NVLink Full Mesh (900 GBps) | No | same as A3 Ultra |
| A2 Ultra (A100 80GB) | 80 GB HBM2e (1.9 TBps) | NVLink Full Mesh (600 GBps) | No | same as A3 Ultra |
| A2 Standard (A100 40GB) | 40 GB HBM2 (1.6 TBps) | NVLink Full Mesh (600 GBps) | No | ML Training, Inference, HPC |
| G4 (RTX PRO 6000) | 96 GB GDDR7 (1.597 TBps) | N/A | Yes | ML Inference, Training, Remote Visualization Workstations, Video Transcoding, HPC |
| G2 (L4) | 24 GB GDDR6 (300 GBps) | N/A | Yes | same as G4 |
| N1 (T4) | 16 GB GDDR6 (320 GBps) | N/A | Yes | ML Inference, Training, Remote Visualization Workstations, Video Transcoding |
| N1 (P4) | 8 GB GDDR5 (192 GBps) | N/A | Yes | Remote Visualization Workstations, ML Inference, Video Transcoding |
| N1 (V100) | 16 GB HBM2 (900 GBps) | NVLink Ring (300 GBps) | No | ML Training, Inference, HPC |

### Tensor Core performance (dense; structural sparsity doubles TF32 / mixed FP16/32 / INT8 / FP8 / FP4 throughput)

`bfloat16` is supported for mixed precision on Rubin, Blackwell, and H200, H100, A100 and L4. Units TFLOPS (INT8 on Hopper/Ada/Ampere/Turing/Volta: TOPS). `N/A` = not applicable.

| GPU | FP64 | TF32 | Mixed FP16/32 | INT8 | FP8 | FP4 |
|---|---|---|---|---|---|---|
| A5X (Rubin) | 200 | 2,000 | 4,000 | 250 | 17,000 | 34,000 |
| A4X Max (GB300) | 1.3 | 1,250 | 2,500 | 5,000 | 5,000 | 15,000 |
| A4X (GB200) | 45 | 1,250 | 2,500 | 5,000 | 5,000 | 10,000 |
| A4 (B200) | 40 | 1,100 | 2,250 | 4,500 | 4,500 | 9,000 |
| G4 (RTX PRO 6000) | N/A | 233.9 | 467.8 | 935.6 | 935.6 | 1871.2 |
| A3 Ultra (H200) / A3 Mega, High, Edge (H100) | 67 | 494.5 | 989.5 | 1,979 | 1,979 | n/a in source |
| A2 Ultra / Standard (A100) | 19.5 | 156 | 312 | 624 | N/A | n/a in source |
| G2 (L4) | N/A | 60 | 121 | 242.5 | 121 | n/a in source |

The A5X row also lists FP32 800 TFLOPS in the source; Volta/Turing Tensor Core: N1 (V100) mixed FP16/32 125 TFLOPS (INT8/INT4 N/A); N1 (T4) mixed FP16/32 65 TFLOPS, INT8 130 TOPS, INT4 260 TOPS; P4 has no Tensor Cores.

### Standard (vector) CUDA core performance (TFLOPS)

| GPU | FP64 | FP32 | FP16 |
|---|---|---|---|
| A5X (Rubin) | 32 | 130 | n/a in source |
| A4X Max (GB300) | 1.39 (reduced to prioritize FP4) | 45 | N/A |
| A4X (GB200) | 45 | 45 | N/A |
| A4 (B200) | 40 | 80 | N/A |
| G4 (RTX PRO 6000) | 1.8 | 117 | 117 |
| A3 Ultra (H200) / A3 Mega, High, Edge (H100) | 34 | 67 | n/a in source |
| A2 Ultra / Standard (A100) | 9.7 | N/A | n/a in source |
| G2 (L4) | N/A | 30.3 | n/a in source |
| N1 (V100) | 7.8 | 15.6 | n/a in source |
| N1 (T4) | N/A | 8.1 | n/a in source |
| N1 (P4) | 0.2 | 5.5 | n/a in source |

Architectures: Rubin (A5X), Blackwell (A4X Max, A4X, A4, G4), Hopper (A3), Ampere (A2), Ada Lovelace (G2), Volta (V100), Pascal (P4), Turing (T4).

## Notes

- NVIDIA T4 and P4 reach end of support on August 1, 2027 (https://docs.cloud.google.com/compute/docs/eol/t4-eos, https://docs.cloud.google.com/compute/docs/eol/p4-eos). The source marks T4 and P4 as approaching end of support in the machine-types table.
- Corrected from the official docs: the about-gpus source writes "NVIDIA A100 4OGB" (letter O) for A2 Standard in one list; this page uses 40GB as in the A2 sections.
- The A5X, A4X Max, A4X, A4 and A3 Ultra provisioning requirements above are conditions stated by the source; A5X requires contacting the account team.
- GPU / TPU pages in this category cover Compute Engine VMs; GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Prices are not copied; see https://cloud.google.com/compute/gpus-pricing.
- The source twin has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/accelerator-types/list (gcloud 593.0.0 help).
- Source inconsistency: this page says capacity "must be reserved" for A4X Max and A4X and that A4 and A3 Ultra require "reserving capacity", while reservations-overview.md says "You can't reserve A4X Max bare metal instances, or A4X, A4, A3 Ultra, or A3 High (with less than 8 GPUs), TPU7x, TPU v6e, and TPU v5p VMs". Reserving capacity for these series means future reservations: choose-reservation-type.md lists A4X Max and A4X only under future reservations for capacity blocks, and A4 and A3 Ultra under future reservations in calendar mode and for capacity blocks, with on-demand reservations not supported.
- Source (About Compute Engine reservations, cited above as `reservations-overview.md`): https://docs.cloud.google.com/compute/docs/instances/reservations-overview (retrieved 2026-11-17)
- Source (Choose a reservation type, cited above as `choose-reservation-type.md`): https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/gpus (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-gpus.md](./about-gpus.md)
- [overview.md](./overview.md)
- [install-drivers-gpu.md](./install-drivers-gpu.md)
- [gpu-host-maintenance.md](./gpu-host-maintenance.md)
