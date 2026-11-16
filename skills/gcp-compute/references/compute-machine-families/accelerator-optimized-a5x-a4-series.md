---
source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines
---

# Accelerator-optimized machine family: A5X, A4X Max, A4X and A4 series

Compute Engine accelerator-optimized series with pre-attached NVIDIA GPUs for large-scale AI/ML training and inference and HPC: A5X (Vera Rubin, bare metal), A4X Max (GB300, bare metal), A4X (GB200) and A4 (B200). All use Hyperdisk only (no Persistent Disk), pre-attached Local SSD, and don't run Windows.

## Signature / Usage

Machine types named in the source: `a5x-highgpu-4g-metal`, `a4x-maxgpu-4g-metal`, `a4x-highgpu-4g`, `a4-highgpu-8g`. GPU types: `nvidia-gb300` (A4X Max), `nvidia-gb200` (A4X), `nvidia-b200` (A4). To list accelerator types and the zones that offer them:

```bash
gcloud compute accelerator-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### Machine types

| Machine type | Series / GPU | vCPUs | Instance memory (GB) | Attached Local SSD (GiB) | Physical NICs | Max network (Gbps) | GPUs | GPU memory (GB) |
|---|---|---|---|---|---|---|---|---|
| `a5x-highgpu-4g-metal` | A5X, NVIDIA Rubin (Vera Rubin) | 176 | 1,440 | 48,000 | 10 | 7,200 | 4 | 1,152 (HBM4) |
| `a4x-maxgpu-4g-metal` | A4X Max, NVIDIA GB300 (B300 GPUs) | 144 | 960 | 12,000 | 6 | 3,600 | 4 | 1,116 (HBM3e) |
| `a4x-highgpu-4g` | A4X, NVIDIA GB200 (B200 GPUs) | 140 | 884 | 12,000 | 6 | 2,000 | 4 | 744 (HBM3e) |
| `a4-highgpu-8g` | A4, NVIDIA B200 | 224 | 3,968 | 12,000 | 10 | 3,600 | 8 | 1,440 (HBM3e) |

Notes: A5X vCPU count 176 equals the 176 physical cores across two 88-core NVIDIA Vera sockets; for the others a vCPU is one hardware hyper-thread. Max network bandwidth is a cap on egress; actual depends on destination and other factors. GPU memory is separate from instance memory.

### A5X

- Runs on NVIDIA Vera Rubin NVL72 rack-scale architecture; available only as bare metal instances. Two 88-core Vera CPU sockets connect to four Rubin GPUs via NVLink-C2C. One NVL72 (NVLink) domain consists of up to 18 instances and 72 GPUs; up to 20.7 TB total GPU memory per domain.
- Networking: RoCE with eight NVIDIA ConnectX-9 SuperNICs (two per GPU) on Google's Virgo network (eight-way rail-alignment), up to 6,400 Gbps GPU-to-GPU; two 400 Gbps Titanium NICs (up to 800 Gbps combined) for storage and management using IDPF. Virgo scales to 80,000 Vera Rubin GPUs in a site and 960,000 across sites. NVLink 6: 3,600 GBps bidirectional per GPU.
- Disks: 48,000 GiB PCIe Gen6 NVMe Local SSD (four 12,000 GiB partitions) attached automatically; up to 512 TiB Hyperdisk. Dense allocation with blocks / subblocks and topology information at host, subblock, block and cluster levels.
- Consumption: future reservations for capacity blocks; resource-based CUDs. To get started, contact your account team to reserve capacity.
- Limitations: Compute Engine SLA doesn't apply to A5X. Only regions/zones in the GPU regions table; no Persistent Disk; Vera CPU platform only; no machine type changes (create a new instance); no Windows; can't update machine firmware (IDPF, ConnectX-9, Local SSD); no sole-tenancy, Spot VMs or Flex-start VMs; no SUDs or flexible CUDs; can't attach Hyperdisk ML disks created before February 4, 2026.
- Disk types: `hyperdisk-balanced` (the only boot disk type), `hyperdisk-balanced-high-availability`, `hyperdisk-throughput`, `hyperdisk-ml`, `hyperdisk-extreme`, Local SSD (4 pre-attached). Max disks: All Hyperdisk 32, Balanced 32, Balanced HA 32, Throughput 32, ML 32, Extreme 8, Local SSD 4. Total Hyperdisk capacity 512 TiB.
- Maintenance: minimum 90 days; terminates with Local SSD data persistence; advanced notification 90 days; on-demand maintenance Yes; simulate maintenance No.

### A4X Max and A4X

- Exascale platform based on NVIDIA rack-scale architecture (A4X Max: GB300 NVL72; A4X: GB200 NVL72); two Grace CPU sockets (Arm Neoverse V2) connect to four GPUs via NVLink-C2C; NVL72 domain = 18 instances / 72 GPUs; NVLink 1,800 GBps bidirectional per GPU. A4X Max is bare metal only; A4X is VM instances only. 12,000 GiB Local SSD added automatically; up to 512 TiB Hyperdisk.
- A4X Max: about 279 GB per GPU (up to 20 TB per NVL72 domain), RoCE with ConnectX-8 SuperNICs, eight-way rail alignment, up to 3,200 Gbps (plus up to 400 Gbps general networking), 15 PetaFLOPS dense FP4 (20-40% higher inference than GB200 expected); OS images must support IDPF.
- A4X: 186 GB per GPU, RoCE with ConnectX-7 NICs, four-way rail alignment, up to 1,600 Gbps (plus up to 400 Gbps), 10 PetaFLOPS dense FP4.
- Consumption: future reservations for capacity blocks; resource-based CUDs. Capacity must be reserved to create instances and clusters.
- Limitations (both): SLA doesn't apply (A4X Max and A4X series); only supported consumption options; no SUDs or flexible CUDs; certain regions/zones only; Hyperdisk only; NVIDIA Grace platform only; no machine type changes; no Windows; no sole-tenancy, Spot VMs, Flex-start VMs; no Hyperdisk ML disks created before February 4, 2026. A4X: with `ethtool -S` the `_phy` physical port counters don't update (expected, MRDMA VF architecture).
- Disks: A4X Max `hyperdisk-balanced` (only boot), `hyperdisk-throughput`, `hyperdisk-ml`, `hyperdisk-extreme`, Local SSD; max All Hyperdisk 32 / Balanced 32 / Throughput 32 / ML 32 / Extreme 8 / Local SSD 4. A4X: `hyperdisk-balanced` (only boot), `hyperdisk-extreme`, `hyperdisk-ml`, Local SSD; max All Hyperdisk 128 / Balanced 128 / Balanced HA 0 / Throughput 0 / ML 128 / Extreme 8 / Local SSD 4. Total Hyperdisk 512 TiB.
- Maintenance (A4X Max and A4X, 4 GPUs): minimum 90 days; stop and restart with Local SSD data persistence; advance notice 90 days; on-demand maintenance Yes; simulate maintenance No.

### A4

- Up to 224 vCPUs and 3,968 GB; single machine type; recommended for large-scale ML training (hundreds or thousands of GPUs). B200 GPUs with 180 GB each, 5th gen Intel Xeon (Emerald Rapids) up to 4.0 GHz sustained single-core max turbo, NVLink 1,800 GBps bidirectional per GPU (up to 14.4 TBps aggregate across 8 GPUs), RoCE with ConnectX-7 NICs and four-way rail-aligned network, up to 4x network speeds vs A2. FLR and atomic operations exposed. 12,000 GiB Local SSD automatic; up to 512 TiB Hyperdisk.
- Consumption: Spot VMs, Flex-start, future reservations in calendar mode, future reservations for capacity blocks, resource-based CUDs. Capacity must be reserved, or Spot / Flex-start / MIG resize request used.
- Workloads can only move between A4 and A3 Ultra (not previous-generation series) because of network topology.
- Limitations: only supported consumption options; no SUDs or flexible CUDs; certain regions/zones; no Persistent Disk; Emerald Rapids platform only; no machine type change; no sole-tenancy; no Windows; `_phy` counters don't update with `ethtool -S` (expected); no Hyperdisk ML created before February 4, 2026.
- Disks: `hyperdisk-balanced` (only boot), `hyperdisk-extreme`, `hyperdisk-ml`, Local SSD. Max: All Hyperdisk 128 / Balanced 128 / Throughput N/A / ML 128 / Extreme 8 / Local SSD 32. Total 512 TiB.
- Maintenance: minimum 90 days; stop and restart with Local SSD persistence; advance notice 90 days; on-demand Yes; simulate No.

## Notes

- Instance creation steps are on separate pages: "Create an A3 Ultra or A4 instance" (A4) and AI Hypercomputer docs (A5X, A4X Max, A4X).
- Compute Engine VMs with GPUs; GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Hyperdisk size and attachment limits are in the Hyperdisk page; prices are not copied.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/accelerator-types/list (gcloud 593.0.0 help); the source page has no code.
- Source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [accelerator-optimized-machines.md](./accelerator-optimized-machines.md)
- [accelerator-optimized-a3-series.md](./accelerator-optimized-a3-series.md)
- [accelerator-optimized-a2-g4-g2-series.md](./accelerator-optimized-a2-g4-g2-series.md)
