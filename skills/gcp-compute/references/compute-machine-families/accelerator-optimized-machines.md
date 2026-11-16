---
source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines
---

# Accelerator-optimized machine family (overview, GPU models and consumption options)

Compute Engine instances with pre-attached NVIDIA GPUs for AI, ML, HPC and graphics: series A5X, A4X Max, A4X, A4, A3, A2, G4 and G2. Each machine type has a specific GPU model and count. Some GPU models (T4, P4, V100) can also be attached to N1 general-purpose types. For TPU machines see "TPU machines in accelerator-optimized machine family".

## Signature / Usage

GPU accelerator type names named in the source: `nvidia-gb300` (A4X Max), `nvidia-gb200` (A4X), `nvidia-b200` (A4), `nvidia-h200-141gb` (A3 Ultra), `nvidia-rtx-pro-6000` (G4). Spot VMs use provisioning model `SPOT` and Flex-start VMs use `FLEX_START`. To list accelerator types and the zones that offer them:

```bash
gcloud compute accelerator-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### GPU models and machine series

| GPU model | Series | Architecture | GPU memory (bandwidth) | GPUs per instance | Max network | Local SSD | Interconnect | RTX vWS |
|---|---|---|---|---|---|---|---|---|
| NVIDIA Vera Rubin | A5X | Rubin | 288 GB HBM4 (22 TBps) | 4 (NVL72) | 7,200 Gbps | 48,000 GiB | NVLink Full Mesh (3,600 GBps) | No |
| NVIDIA GB300 | A4X Max | Blackwell Ultra | 279 GB HBM3e (8 TBps) | 4 (NVL72) | 3,600 Gbps | 12,000 GiB | NVLink Full Mesh (1,800 GBps) | No |
| NVIDIA GB200 | A4X | Blackwell | 186 GB HBM3e (8 TBps) | 4 (NVL72) | 2,000 Gbps | 12,000 GiB | NVLink Full Mesh (1,800 GBps) | No |
| NVIDIA B200 | A4 | Blackwell | 180 GB HBM3e (8 TBps) | 8 | 3,600 Gbps | 12,000 GiB | NVLink Full Mesh (1,800 GBps) | No |
| NVIDIA H200 | A3 Ultra | Hopper | 141 GB HBM3e (4.8 TBps) | 8 | 3,600 Gbps | 12,000 GiB | NVLink Full Mesh (900 GBps) | No |
| NVIDIA H100 | A3 Mega, High, Edge | Hopper | 80 GB HBM3 (3.35 TBps) | 1, 2, 4, 8 | Up to 1,000 Gbps | Up to 6,000 GiB | NVLink Full Mesh (900 GBps) | No |
| NVIDIA A100 (80GB) | A2 Ultra | Ampere | 80 GB HBM2e (1.9 TBps) | 1, 2, 4, 8 | 100 Gbps | Up to 3,000 GiB | NVLink Full Mesh (600 GBps) | No |
| NVIDIA A100 (40GB) | A2 Standard | Ampere | 40 GB HBM2 (1.6 TBps) | 1, 2, 4, 8, 16 | 100 Gbps | Up to 3,000 GiB | NVLink Full Mesh (600 GBps) | No |
| NVIDIA RTX PRO 6000 | G4 | Blackwell | 96 GB GDDR7 (1.597 TBps) | 1/8, 1/4, 1/2, 1, 2, 4, 8 | 200 Gbps | Up to 3,000 GiB | PCIe Gen 5 | Yes |
| NVIDIA L4 | G2 | Ada Lovelace | 24 GB GDDR6 (300 GBps) | 1, 2, 4, 8 | 100 Gbps | Up to 3,000 GiB | PCIe Gen 4 | Yes |
| NVIDIA V100 | N1 + V100 | Volta | 16 GB HBM2 (900 GBps) | 1, 2, 4, 8 | 100 Gbps | Supported | NVLink Ring (300 GBps) | No |
| NVIDIA T4 (approaching end of support) | N1 + T4 | Turing | 16 GB GDDR6 (320 GBps) | 1, 2, 4 | 100 Gbps | Supported | PCIe Gen 3 | Yes |
| NVIDIA P4 (approaching end of support) | N1 + P4 | Pascal | 8 GB GDDR5 (192 GBps) | 1, 2, 4 | 100 Gbps | Supported | PCIe Gen 3 | Yes |

### Recommended machine series by workload

| Workload | Recommended series |
|---|---|
| Frontier foundation models and MoE pre-training | A5X, A4X Max, A4X, A4, A3 Ultra, A3 Mega |
| Fine-tuning (PEFT, LoRA) and moderate training | A3 High, A2, G4 |
| Large model inference (more than 70B parameters) | A5X, A4X Max, A4X, A4, A3 Ultra |
| High-throughput and real-time serving (FP8, INT8, INT4) | G2, G4, A3 Edge and High |
| 3D CAD, digital twins, virtual workstations | G4, G2 |
| Video processing and transcoding (NVENC / NVDEC, AV1, HEVC, H.264) | G2, G4 |
| HPC and scientific simulation (FP64) | A5X, A4X, A4, A3, A2 |

### Consumption options

Discounts: a resource is eligible for only one type of discount at any time. Compute flexible CUDs apply on-demand only to eligible spend on N1 (vCPUs, memory, Local SSD only), G2 and G4 (vCPUs, memory, GPUs, Local SSD). For resource-based CUDs on other accelerator-optimized series, including G2 and G4, use a reservation option. Spot VMs receive Spot pricing; Flex-start receives Dynamic Workload Scheduler pricing. Resource-based commitments for all GPUs and most Local SSD disks require attached reservations. Before creating a future reservation request for a supported GPU machine type, contact your account team or the sales team, otherwise Google Cloud is likely to decline it.

| Machine type (GPU model) | On-demand | Spot | Flex-start | On-demand reservations | Future reservations | Future reservations calendar mode | Future reservations for capacity blocks |
|---|---|---|---|---|---|---|---|
| A5X (Vera Rubin) | No | No | No | No | No | No | Yes |
| A4X Max (GB300) and A4X (GB200) | No | No | No | No | No | No | Yes |
| A4 (B200) | No | Yes | Yes | No | No | Yes | Yes |
| A3 Ultra (H200) | No | Yes | Yes | No | No | Yes | Yes |
| A3 Mega (H100) | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| A3 High, 8 GPUs (H100) | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| A3 High, fewer than 8 GPUs (H100) | No | Yes | Yes | No | No | No | No |
| A3 Edge (H100) | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| A2 (A100) | Yes | Yes | Yes | Yes | Yes | No | No |
| G4 (RTX PRO 6000) | Yes | Yes | Yes | Yes | Yes | No | No |
| G2 (L4) | Yes | Yes | Yes | Yes | Yes | No | No |
| N1 with GPUs (T4 / P4 / V100) | Yes | Yes | Yes | Yes | Yes | No | No |

## Notes

- Compute Engine VMs with GPUs; GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Per-series details: A5X, A4X Max, A4X, A4 in the A5X/A4 page; A3 in the A3 page; A2, G4, G2 in the A2/G4/G2 page.
- A5X and A4X Max / A4X: the Compute Engine SLA doesn't apply.
- Prices are not copied.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/accelerator-types/list (gcloud 593.0.0 help); the source page has no code.
- Source inconsistency: the GPU summary table gives G4 "200 Gbps" maximum network bandwidth and "Up to 3,000 GiB" Local SSD, while the G4 section of the same source page (accelerator-optimized-a2-g4-g2-series.md) says "G4 instances have up to 384 vCPUs, 1,440 GB of memory, and 12 TiB of Titanium SSD disks attached. G4 instances also provide up to 400 Gbps of standard network performance." and lists `g4-standard-384` with 12,000 GiB Titanium SSD and 400 Gbps.
- Source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [accelerator-optimized-a5x-a4-series.md](./accelerator-optimized-a5x-a4-series.md)
- [accelerator-optimized-a3-series.md](./accelerator-optimized-a3-series.md)
- [accelerator-optimized-a2-g4-g2-series.md](./accelerator-optimized-a2-g4-g2-series.md)
