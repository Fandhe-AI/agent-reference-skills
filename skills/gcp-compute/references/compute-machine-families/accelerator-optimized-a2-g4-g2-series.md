---
source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines
---

# Accelerator-optimized machine family: A2, G4 and G2 series

A2 (NVIDIA A100, 40 GB and 80 GB), G4 (NVIDIA RTX PRO 6000 Blackwell Server Edition, AMD EPYC Turin) and G2 (NVIDIA L4) series. A2 and G2 also use Persistent Disk; G4 uses Hyperdisk and Titanium SSD only.

## Signature / Usage

Configure NCCL to use GPU peer-to-peer (P2P) on G4 instances with two or more GPUs (`g4-standard-96` and `g4-standard-192`: `PHB`; `g4-standard-384`: `SYS`):

```bash
export NCCL_P2P_LEVEL=SYS
```

Or add the setting to the NCCL configuration file `/etc/nccl.conf`:

```text
NCCL_P2P_LEVEL=SYS
```

Full format of Local SSD on Windows A2 instances (a quick format isn't possible), using the diskpart utility:

```text
format fs=ntfs label=tmpfs
```

## Options / Props

### A2 (NVIDIA A100)

12 to 96 vCPUs, up to 1,360 GB memory; NVLink 600 GBps GPU to GPU (16 GPUs: up to 9.6 TBps aggregate); up to 10x compute vs V100; up to 100 Gbps network; compact placement policies supported; up to 257 TiB Persistent Disk and 512 TiB Hyperdisk. Cascade Lake platform only.

| Machine type | vCPUs | Memory (GB) | Local SSD | Max network (Gbps) | GPUs | GPU memory (GB) |
|---|---|---|---|---|---|---|
| `a2-ultragpu-1g` | 12 | 170 | 375 GiB attached | 24 | 1 (A100 80GB) | 80 HBM2e |
| `a2-ultragpu-2g` | 24 | 340 | 750 GiB attached | 32 | 2 | 160 |
| `a2-ultragpu-4g` | 48 | 680 | 1,500 GiB attached | 50 | 4 | 320 |
| `a2-ultragpu-8g` | 96 | 1,360 | 3,000 GiB attached | 100 | 8 | 640 |
| `a2-highgpu-1g` | 12 | 85 | Yes (up to 3,000 GiB, choose count) | 24 | 1 (A100 40GB) | 40 HBM2 |
| `a2-highgpu-2g` | 24 | 170 | Yes | 32 | 2 | 80 |
| `a2-highgpu-4g` | 48 | 340 | Yes | 50 | 4 | 160 |
| `a2-highgpu-8g` | 96 | 680 | Yes | 100 | 8 | 320 |
| `a2-megagpu-16g` | 96 | 1,360 | Yes | 100 | 16 | 640 |

- Consumption: on-demand, Spot VMs, Flex-start, on-demand reservations, future reservations, resource-based CUDs.
- Limitations: only supported consumption options; no SUDs or flexible CUDs; certain regions/zones only. A2 Ultra: can't change machine type to or from A2 Ultra (create a new instance). A2 Standard: can only switch between A2 Standard types; no Windows with `a2-megagpu-16g`. No quick format of attached Local SSD on Windows (A2 Ultra and Standard).
- Disk types: `hyperdisk-ml`, `pd-balanced`, `pd-ssd`, `pd-standard`, Local SSD (automatic for A2 Ultra).

| Machine type | All disks (PD + Hyperdisk, excludes Local SSD) | Hyperdisk ML | Local SSD |
|---|---|---|---|
| `a2-ultragpu-1g` | 128 | 32 | 1 |
| `a2-ultragpu-2g` | 128 | 48 | 2 |
| `a2-ultragpu-4g` / `-8g` | 128 | 64 | 4 / 8 |
| `a2-highgpu-1g` | 128 | 32 | 8 |
| `a2-highgpu-2g` | 128 | 48 | 8 |
| `a2-highgpu-4g`, `-8g`, `a2-megagpu-16g` | 128 | 64 | 8 |

- Maintenance: minimum 30 days; stop and restart; 7 days advance notice; on-demand maintenance Yes for A2 Ultra 8 GPUs only and A2 Standard 8 and 16 GPUs only; simulate maintenance Yes.

### G4 (NVIDIA RTX PRO 6000 Blackwell Server Edition, `nvidia-rtx-pro-6000`)

Up to 384 vCPUs, 1,440 GB memory, 12 TiB Titanium SSD, up to 400 Gbps standard network; AMD EPYC Turin (5th gen), up to 4.1 GHz; 96 GB per GPU; PCIe Gen 5; GPU P2P communication; compact placement policy support. Fractional GPUs (vGPU): `g4-standard-6` (1/8 GPU), `g4-standard-12` (1/4), `g4-standard-24` (1/2), with multi-tenant isolation; Multi-Instance GPU (MIG): up to four isolated instances on a single VM (no multi-tenant isolation). RTX Virtual Workstation supported.

| Machine type | vCPUs | Memory (GB) | Max Titanium SSD (GiB) | NICs | Max network (Gbps) | GPUs | GPU memory (GB GDDR7) |
|---|---|---|---|---|---|---|---|
| `g4-standard-6` | 6 | 22 | 0 | 1 | 20 | 1/8 | 12 |
| `g4-standard-12` | 12 | 45 | 375 | 1 | 20 | 1/4 | 24 |
| `g4-standard-24` | 24 | 90 | 750 | 1 | 20 | 1/2 | 48 |
| `g4-standard-48` | 48 | 180 | 1,500 | 1 | 50 | 1 | 96 |
| `g4-standard-96` | 96 | 360 | 3,000 | 1 | 100 | 2 | 192 |
| `g4-standard-192` | 192 | 720 | 6,000 | 1 | 200 | 4 | 384 |
| `g4-standard-384` | 384 | 1,440 | 12,000 | 2 | 400 | 8 | 768 |

- Consumption: on-demand, compute flexible CUDs, resource-based CUDs, Spot VMs, Flex-start, on-demand reservations, future reservations.
- Limitations: only supported consumption options; no SUDs or flexible CUDs per the source's limitation list; certain regions/zones; no Persistent Disk; AMD EPYC Turin only; Confidential VM only with `g4-standard-48` in limited regions and zones (with the Confidential VM G4 limitations); no Windows on `g4-standard-384`; can't attach Hyperdisk ML disks created before February 4, 2026. For fractional-GPU G4 instances don't use `--no-service-account` or `--no-scopes` (vGPU driver authentication requires verified VM identity, so service accounts must be enabled).
- Disk types: `hyperdisk-balanced` (only boot disk), `hyperdisk-balanced-high-availability`, `hyperdisk-extreme` (only with 2 or more GPUs), `hyperdisk-ml`, `hyperdisk-throughput`, Titanium SSD (added at creation). Total Hyperdisk capacity 512 TiB.

| Machine type | All Hyperdisk | Balanced | Balanced HA | Extreme | ML | Throughput | Titanium SSD |
|---|---|---|---|---|---|---|---|
| `g4-standard-6` | 8 | 8 | 8 | 0 | 8 | 8 | 0 |
| `g4-standard-12` | 16 | 16 | 16 | 0 | 16 | 16 | 1 |
| `g4-standard-24` | 32 | 32 | 32 | 0 | 32 | 32 | 2 |
| `g4-standard-48` | 32 | 32 | 32 | 0 | 32 | 32 | 4 |
| `g4-standard-96` | 32 | 32 | 32 | 8 | 32 | 32 | 8 |
| `g4-standard-192` | 64 | 64 | 64 | 8 | 64 | 64 | 16 |
| `g4-standard-384` | 128 | 128 | 128 | 8 | 128 | 128 | 32 |

- P2P: supported only on machine types with two or more GPUs; on four-GPU `g4-standard-192` all GPUs are on one NUMA node (up to 2.04x for `Allgather`, `Allreduce`, `ReduceScatter`); on eight-GPU `g4-standard-384` GPUs span two NUMA nodes (up to 2.19x).
- Maintenance: 1, 2 or 4 GPUs: minimum 30 days, stop and restart (with Local SSD data persistence if attached), 7 days notice, on-demand No, simulate Yes. 8 GPUs: minimum 90 days, same behavior, 30 days notice, on-demand Yes, simulate Yes.

### G2 (NVIDIA L4)

4 to 96 vCPUs, up to 432 GB; FP8 support; up to 100 Gbps; Local SSD up to 3,000 GiB (choose number of disks); Cascade Lake platform only; compact placement supported.

| Machine type | vCPUs | Default memory (GB) | Custom memory range (GB) | Max Local SSD (GiB) | Max network (Gbps) | GPUs | GPU memory (GB GDDR6) |
|---|---|---|---|---|---|---|---|
| `g2-standard-4` | 4 | 16 | 16 to 32 | 375 | 10 | 1 | 24 |
| `g2-standard-8` | 8 | 32 | 32 to 54 | 375 | 16 | 1 | 24 |
| `g2-standard-12` | 12 | 48 | 48 to 54 | 375 | 16 | 1 | 24 |
| `g2-standard-16` | 16 | 64 | 54 to 64 | 375 | 32 | 1 | 24 |
| `g2-standard-24` | 24 | 96 | 96 to 108 | 750 | 32 | 2 | 48 |
| `g2-standard-32` | 32 | 128 | 96 to 128 | 375 | 32 | 1 | 24 |
| `g2-standard-48` | 48 | 192 | 192 to 216 | 1,500 | 50 | 4 | 96 |
| `g2-standard-96` | 96 | 384 | 384 to 432 | 3,000 | 100 | 8 | 192 |

- Consumption: same list as G4.
- Limitations: only supported consumption options; no SUDs or flexible CUDs; certain regions/zones; `pd-standard` not supported; no Multi-Instance GPUs; no Deep Learning VM Images as boot disks; custom memory values or custom visible CPU cores require gcloud CLI or REST.
- Disk types: `pd-balanced`, `pd-ssd`, `hyperdisk-ml`, `hyperdisk-throughput`, Local SSD.

| Machine type | All disks | Hyperdisk ML | Hyperdisk Throughput | Local SSD |
|---|---|---|---|---|
| `g2-standard-4` | 128 | 24 | 24 | 1 |
| `g2-standard-8`, `-12` | 128 | 32 | 32 | 1 |
| `g2-standard-16` | 128 | 48 | 48 | 1 |
| `g2-standard-24` | 128 | 48 | 48 | 2 |
| `g2-standard-32` | 128 | 64 | 64 | 1 |
| `g2-standard-48` | 128 | 64 | 64 | 4 |
| `g2-standard-96` | 128 | 64 | 64 | 8 |

- Mixed disk limits (A2 / G2): combined Hyperdisk and Persistent Disk volumes can't exceed 128 per instance; under 32 vCPUs 257 TiB for all Hyperdisk, all Persistent Disk, or a mix; 32 or more vCPUs 512 TiB for all Hyperdisk or a mix and 257 TiB for all Persistent Disk.
- Maintenance: 1, 2, 4 or 8 GPUs; minimum 30 days; stop and restart; 7 days notice; on-demand Yes (8 GPUs only); simulate Yes.

## Notes

- Compute Engine VMs with GPUs; GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source's limitation list for G4 is the same text as for other series regarding SUDs and flexible CUDs; the consumption list for G4 and G2 includes compute flexible CUDs (see consumption options on the overview page).
- Hyperdisk ML (`hyperdisk-ml`) and Hyperdisk Throughput counts are the "maximum number of disks" columns; prices are not copied.
- The diskpart command applies to Windows VMs with attached Local SSD on A2. The NCCL snippets are written as in the source (command-line `export` or `/etc/nccl.conf`); `PHB` is for 2 or 4 GPUs, `SYS` for 8 GPUs.
- Source inconsistency: for G4 / G2 the source's limitation list says no flexible CUDs, while its consumption list includes compute flexible CUDs; both are recorded as written.
- Source inconsistency: the G4 section says "G4 instances have up to 384 vCPUs, 1,440 GB of memory, and 12 TiB of Titanium SSD disks attached. G4 instances also provide up to 400 Gbps of standard network performance.", while the GPU summary table of the same source page (accelerator-optimized-machines.md) gives G4 "200 Gbps" and "Up to 3,000 GiB" Local SSD.
- Source: https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [accelerator-optimized-machines.md](./accelerator-optimized-machines.md)
- [accelerator-optimized-a5x-a4-series.md](./accelerator-optimized-a5x-a4-series.md)
- [accelerator-optimized-a3-series.md](./accelerator-optimized-a3-series.md)
