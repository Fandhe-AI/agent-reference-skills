---
source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines
---

# Accelerator-optimized machine family: A3 series (Ultra, Mega, High, Edge)

The A3 series has up to 224 vCPUs and 2,944 GB of memory, optimized for compute and memory intensive, network-bound ML training and HPC. Machine types are A3 Ultra (NVIDIA H200), and A3 Mega, High and Edge (NVIDIA H100).

## Signature / Usage

Machine types named in the source: `a3-ultragpu-8g`, `a3-megagpu-8g`, `a3-highgpu-1g`, `a3-highgpu-2g`, `a3-highgpu-4g`, `a3-highgpu-8g`, `a3-edgegpu-8g`. `a3-highgpu-1g`, `-2g` and `-4g` must use Spot VMs (`SPOT`) or Flex-start VMs (`FLEX_START`); the GPU type for A3 Ultra is `nvidia-h200-141gb`. To list accelerator types and the zones that offer them:

```bash
gcloud compute accelerator-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

| Machine type | vCPUs | Memory (GB) | Attached Local SSD (GiB) | Physical NICs | Max network (Gbps) | H100 / H200 GPUs | GPU memory (GB) |
|---|---|---|---|---|---|---|---|
| `a3-ultragpu-8g` | 224 | 2,952 | 12,000 | 10 | 3,600 | 8 (H200) | 1,128 HBM3e |
| `a3-megagpu-8g` | 208 | 1,872 | 6,000 | 9 | 1,800 | 8 | 640 HBM3 |
| `a3-highgpu-1g` | 26 | 234 | 750 | 1 | 25 | 1 | 80 |
| `a3-highgpu-2g` | 52 | 468 | 1,500 | 1 | 50 | 2 | 160 |
| `a3-highgpu-4g` | 104 | 936 | 3,000 | 1 | 100 | 4 | 320 |
| `a3-highgpu-8g` | 208 | 1,872 | 6,000 | 5 | 1,000 | 8 | 640 |
| `a3-edgegpu-8g` | 208 | 1,872 | 6,000 | 5 | 600 (`asia-south1`, `northamerica-northeast2`) or 400 (all other A3 Edge regions) | 8 | 640 |

### Features

- A3 Ultra: H200 SXM, 141 GB per GPU; 5th gen Intel Xeon (Emerald Rapids) up to 4.0 GHz sustained single-core max turbo; RoCE with ConnectX-7 NICs and four-way rail-aligned network; up to 4x network speed vs A2. Workloads can't be moved between A3 Ultra and A3 Mega / High / Edge.
- A3 Mega / High / Edge: H100 SXM, 80 GB per GPU; 4th gen Intel Xeon (Sapphire Rapids) up to 3.3 GHz; up to 2.5x network speed vs A2. A3 Mega uses GPUDirect-TCPXO (doubles bandwidth vs High and Edge); A3 Edge and High use GPUDirect-TCPX. A3 Mega: use clusters with GKE or Slurm. A3 Edge: designed for serving, limited regions.
- All A3: NVLink 450 GBps unidirectional per GPU (up to 7.2 TBps aggregate for 8 GPUs); FLR and atomic operations; Local SSD attached automatically (12,000 GiB A3 Ultra, 6,000 GiB Mega/High/Edge); up to 512 TiB Persistent Disk and Hyperdisk (257 TiB for some types); compact placement policy support. By default you can't apply compact placement policies with a max distance value to A3 VMs; contact your TAM or the Sales team.
- A3 Ultra provisioning: reserve capacity, use Spot VMs, Flex-start VMs, or a MIG resize request.

### Consumption options

| Machine type | Options |
|---|---|
| A3 Ultra | Spot VMs, Flex-start, future reservations in calendar mode, future reservations for capacity blocks, resource-based CUDs |
| A3 Mega, A3 High (8 GPUs), A3 Edge | On-demand, Spot VMs, Flex-start, on-demand reservations, future reservations, calendar mode, capacity blocks, resource-based CUDs |
| A3 High (1, 2 or 4 GPUs) | Spot VMs, Flex-start |

### Limitations

- All A3: only supported consumption options; no SUDs or flexible CUDs; only certain regions/zones; no machine type changes (create a new instance); no Windows.
- A3 Ultra: no Persistent Disk (Hyperdisk only); Emerald Rapids only; no sole-tenancy; `_phy` counters don't update with `ethtool -S` (expected, MRDMA VF).
- A3 Mega / High / Edge: no regional Persistent Disk; Sapphire Rapids only. A3 Edge also no sole-tenancy.
- A3 High 1g / 2g / 4g must use Spot VMs or Flex-start VMs (`SPOT` / `FLEX_START`; Flex-start via a standalone VM or a MIG resize request). Confidential VM with `a3-highgpu-1g` only in limited regions and zones, with the Confidential VM A3 High limitations.

### Supported disk types and max disks

- A3 Ultra: `hyperdisk-balanced` (only boot disk type), `hyperdisk-balanced-high-availability`, `hyperdisk-extreme`, `hyperdisk-ml`, Local SSD (automatic).
- A3 Mega / High / Edge: `pd-balanced`, `pd-ssd`, `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, `hyperdisk-ml`, `hyperdisk-extreme`, `hyperdisk-throughput`, Local SSD (automatic).

| Machine type | All Hyperdisk | Balanced | Balanced HA | Throughput | ML | Extreme | Local SSD disks |
|---|---|---|---|---|---|---|---|
| `a3-ultragpu-8g` | 128 | 128 | 128 | N/A | 128 | 8 | 32 |
| `a3-megagpu-8g` | 128 | 32 | 32 | 64 | 64 | 8 | 16 |
| `a3-highgpu-1g` | 128 | 32 | 32 | 64 | 64 | N/A | 2 |
| `a3-highgpu-2g` | 128 | 32 | 32 | 64 | 64 | N/A | 4 |
| `a3-highgpu-4g` | 128 | 32 | 32 | 64 | 64 | 8 | 8 |
| `a3-highgpu-8g` | 128 | 32 | 32 | 64 | 64 | 8 | 16 |
| `a3-edgegpu-8g` | 128 | 32 | 32 | 64 | 64 | 8 | 16 |

Capacity: combined Hyperdisk plus Persistent Disk volumes can't exceed 128 per instance. Under 32 vCPUs: 257 TiB for all Hyperdisk, all Persistent Disk, or a mix. 32 or more vCPUs: 512 TiB for all Hyperdisk or a mix; 257 TiB for all Persistent Disk.

### Maintenance

| Machine type | GPUs | Frequency | Behavior | Advance notice | On-demand | Simulate |
|---|---|---|---|---|---|---|
| A3 Ultra | 8 | minimum 90 days | Stop and restart (with Local SSD data persistence) | 90 days | Yes | No |
| A3 Mega and A3 High | 8 | on-demand: min 30 days; capacity blocks: min 90 days | on-demand: stops and restarts; capacity blocks: stops and restarts with Local SSD persistence | on-demand 7 days; capacity blocks 90 days | Yes | Yes |
| A3 High | 1, 2, 4 | minimum 30 days | Stop and restart | 7 days | No | Yes |
| A3 Edge | 8 | minimum 30 days | Stop and restart | 7 days | Yes | Yes |

## Notes

- Compute Engine VMs with GPUs; GPUs on GKE nodes (including A3 Mega with GKE) are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Creating A3 VMs: "Create an A3 Ultra or A4 instance", "Create a GPU VM (accelerator-optimized)", "Create an A3 VM with GPUDirect-TCPX enabled", and "Create a MIG with GPU VMs" pages; GKE and Slurm cluster guides for A3 Mega are linked from the source.
- Source inconsistency: the page text says up to 2,944 GB of memory, while the machine type table lists 2,952 GB for `a3-ultragpu-8g`; both are kept as written.
- Prices are not copied.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/accelerator-types/list (gcloud 593.0.0 help); the source page has no code.
- Source inconsistency: this page says "When provisioning `a3-highgpu-1g`, `a3-highgpu-2g`, or `a3-highgpu-4g` machine types, you must create instances by using Spot VMs or Flex-start VMs", while provisioning-models.md (compute-overview) says the standard model supports "any machine series, except A5X, A4X Max, A4X, A4, and A3 Ultra". Follow this page for A3 High with 1, 2 or 4 GPUs.
- Source (provisioning models): https://docs.cloud.google.com/compute/docs/instances/provisioning-models (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [accelerator-optimized-machines.md](./accelerator-optimized-machines.md)
- [accelerator-optimized-a5x-a4-series.md](./accelerator-optimized-a5x-a4-series.md)
- [accelerator-optimized-a2-g4-g2-series.md](./accelerator-optimized-a2-g4-g2-series.md)
