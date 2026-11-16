---
source: https://docs.cloud.google.com/compute/docs/general-purpose-machines
---

# General-purpose machine family: N2D, N2, E2, N1, Tau T2A and Tau T2D series

Older general-purpose series. E2, E2 shared-core, N2, N2D, Tau T2A and Tau T2D are second generation; N1 and its shared-core types are first generation. Unlike C4 / N4 series they use Persistent Disk, Local SSD is chosen at creation (N1 / N2 / N2D), and most support custom machine types.

## Signature / Usage

Largest predefined machine types named in the source tables: `n2d-standard-224`, `n2d-highmem-96`, `n2d-highcpu-224`; `n2-standard-128`, `n2-highmem-128`, `n2-highcpu-96`; `e2-standard-32`, `e2-highmem-16`, `e2-highcpu-32`, `e2-micro`, `e2-small`, `e2-medium`; `n1-standard-96`, `n1-highmem-96`, `n1-highcpu-96`, `f1-micro`, `g1-small`; `t2a-standard-48`, `t2d-standard-60`. Custom example: an `e2-standard-2` stopped and edited to 1 visible core with 1.25 GB becomes `e2-custom-2-1280`. To list machine types and the zones that offer them:

```bash
gcloud compute machine-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

Memory per vCPU: N2 / N2D / E2 `standard` 4 GB, `highmem` 8 GB, `highcpu` 1 GB. N1 `standard` 3.75 GB, `highmem` 6.5 GB, `highcpu` 0.9 GB. E2 shared-core: micro 0.5 GB, small 1 GB, medium 2 GB per vCPU. N1 shared-core: f1-micro 0.6 GB, g1-small 1.7 GB. Footnotes: vCPU is a hardware thread (two threads per core) except T2A / T2D (SMT off, a vCPU is an entire core). Local SSD counts are 375 GiB disks chosen at instance creation. Max egress bandwidth is a cap; actual depends on destination and other factors. For Windows images, max network bandwidth is limited to 50 Gbps (N2 / N2D).

### N2D (AMD EPYC Milan 3rd gen)

Up to 224 vCPUs and 896 GB; ratios 1:1, 1:4, 1:8; predefined and custom VMs; extended memory; 50 and 100 Gbps high-bandwidth configurations; CUDs (resource-based and flexible), SUDs, Spot, reservations; Confidential VM with AMD SEV and SEV-SNP. No GPUs, no nested virtualization. Only in specific regions and zones.

| vCPUs | Memory GB (standard / highmem / highcpu) | Local SSD disks | Default egress | Tier_1 egress |
|---|---|---|---|---|
| 2, 4 | 8/16/2, 16/32/4 | 1, 2, 4, 8, 16, or 24 | Up to 10 | N/A |
| 8 | 32 / 64 / 8 | 1, 2, 4, 8, 16, or 24 | Up to 16 | N/A |
| 16 | 64 / 128 / 16 | 1, 2, 4, 8, 16, or 24 | Up to 32 | N/A |
| 32 | 128 / 256 / 32 | 2, 4, 8, 16, or 24 | Up to 32 | N/A |
| 48 | 192 / 384 / 48 | 2, 4, 8, 16, or 24 | Up to 32 | Up to 50 |
| 64, 80 | 256/512/64, 320/640/80 | 4, 8, 16, or 24 | Up to 32 | Up to 50 |
| 96 | 384 / 768 / 96 | 8, 16, or 24 | Up to 32 | Up to 100 |
| 128 (standard, highcpu) | 512 / n.a. / 128 | 8, 16, or 24 | Up to 32 | Up to 100 |
| 224 (standard, highcpu) | 896 / n.a. / 224 | 8, 16, or 24 | Up to 32 | Up to 100 |

`highmem` goes to 96 vCPUs. Disk types: zonal and regional `pd-standard`, `pd-balanced`, `pd-ssd`; `hyperdisk-balanced` and `hyperdisk-balanced-high-availability` (require contacting your account team); `hyperdisk-throughput`; Local SSD. Limits (all N2D types): 128 disks per VM across all disks; Hyperdisk volumes 20 (2 vCPUs), 24 (4), 32 (8), 48 (16), 64 (32 and above); total disk 257 TiB (up to 16 vCPUs) or 512 TiB (32 or more). Max size per Persistent Disk 64 TiB; per Hyperdisk Throughput 32 TiB.

### N2 (Intel Ice Lake / Cascade Lake)

2 to 128 vCPUs, up to 864 GB, 0.5 to 8 GB per vCPU; 50, 75 and 100 Gbps high-bandwidth configurations; custom VMs and extended memory; CUDs, SUDs, Spot, reservations. Cascade Lake is the default up to 80 vCPUs (set Ice Lake as minimum CPU platform to get it); Ice Lake is the default for larger types and only in specific regions and zones.

| Family | vCPUs | vNUMA nodes |
|---|---|---|
| n2 (Cascade Lake) | < 32 | 1 |
| n2 (Cascade Lake) | >= 32 | 2 |
| n2 (Ice Lake) | <= 48 | 1 |
| n2 (Ice Lake) | > 48 | 2 |

| vCPUs | Memory GB (standard / highmem / highcpu) | Local SSD disks | Default egress | Tier_1 egress |
|---|---|---|---|---|
| 2, 4 | 8/16/2, 16/32/4 | 1, 2, 4, 8, 16, or 24 | Up to 10 | N/A |
| 8 | 32 / 64 / 8 | 1, 2, 4, 8, 16, or 24 | Up to 16 | N/A |
| 16 | 64 / 128 / 16 | 2, 4, 8, 16, or 24 | Up to 32 | N/A |
| 32 | 128 / 256 / 32 | 4, 8, 16, or 24 | Up to 32 | Up to 50 |
| 48 | 192 / 384 / 48 | 8, 16, or 24 | Up to 32 | Up to 50 |
| 64 | 256 / 512 / 64 | 8, 16, or 24 | Up to 32 | Up to 75 |
| 80 | 320 / 640 / 80 | 8, 16, or 24 | Up to 32 | Up to 100 |
| 96 | 384 / 768 / 96 | 16 or 24 | Up to 32 | Up to 100 |
| 128 (no highcpu) | 512 / 864 / n.a. | 16 or 24 | Up to 32 | Up to 100 |

Disk types: as N2D plus `pd-extreme` and `hyperdisk-extreme` (not supported with custom N2 machine types); `hyperdisk-balanced` / `hyperdisk-balanced-high-availability` require contacting your account team. Limits: 128 disks across all disks; Hyperdisk Extreme volumes 0 below 80 vCPUs, 8 for 80 vCPUs and above; Hyperdisk Throughput volumes 20 / 24 / 32 / 48 / 64 as for N2D; total disk 257 TiB (up to 16 vCPUs) or 512 TiB (32 and above); Persistent Disk total can't exceed 257 TiB; max per Hyperdisk Extreme 64 TiB.

### E2 (Intel and AMD EPYC Milan, cost-optimized)

2 to 32 vCPUs, up to 128 GB predefined (256 GB custom); processor is selected for you; all regions and zones; virtio memory balloon device. No SUDs; no GPUs, Local SSD, sole-tenant nodes or nested virtualization. CUDs (resource-based and flexible), Spot, reservations supported. Disk types: zonal and regional `pd-balanced`, `pd-ssd`, `pd-standard`; `hyperdisk-balanced` / `hyperdisk-balanced-high-availability` (contact your account team). All types: max 128 persistent disks, 257 TiB.

| Machine type | vCPUs | Memory GB | Max egress |
|---|---|---|---|
| e2-standard-2 / 4 / 8 / 16 / 32 | 2 / 4 / 8 / 16 / 32 | 8 / 16 / 32 / 64 / 128 | Up to 4 / 8 / 16 / 16 / 16 |
| e2-highmem-2 / 4 / 8 / 16 | 2 / 4 / 8 / 16 | 16 / 32 / 64 / 128 | Up to 4 / 8 / 16 / 16 |
| e2-highcpu-2 / 4 / 8 / 16 / 32 | 2 / 4 / 8 / 16 / 32 | 2 / 4 / 8 / 16 / 32 | Up to 4 / 8 / 16 / 16 / 16 |
| e2-micro | 2 (0.25 fractional) | 1 | Up to 1 |
| e2-small | 2 (0.5 fractional) | 2 | Up to 1 |
| e2-medium | 2 (1 fractional) | 4 | Up to 2 |

Shared-core types allow 16 persistent disks and 3 TiB. `e2-micro` sustains 2 vCPUs each at 12.5% CPU time (25% total); `e2-small` 25% each (50%); `e2-medium` 50% each (100%). Bursting at 100% CPU lasts about: e2-micro 30 s, e2-small 60 s, e2-medium 120 s (token bucket; no additional charge).

### N1 (first generation; Skylake, Broadwell, Haswell, Sandy Bridge, Ivy Bridge)

Up to 96 vCPUs and 624 GB; custom types 0.9 to 6.5 GB per vCPU (extended memory above); TPUs in select zones; up to ten virtual interfaces per instance; CUDs, SUDs (higher % than N2), Spot, reservations. Disk types: zonal and regional `pd-balanced`, `pd-ssd`, `pd-standard`, Hyperdisk Balanced / Balanced HA (contact your account team), Local SSD. All N1 predefined types: Local SSD 1 to 8, 16, or 24 disks, max 128 persistent disks, 257 TiB.

| Type | vCPUs | Memory GB | Default egress |
|---|---|---|---|
| n1-standard-1 / 2 / 4 / 8 | 1 / 2 / 4 / 8 | 3.75 / 7.50 / 15 / 30 | Up to 2 / 10 / 10 / 16 |
| n1-standard-16 / 32 / 64 / 96 | 16 / 32 / 64 / 96 | 60 / 120 / 240 / 360 | Up to 32 (32 for Skylake or later, 16 for other platforms) |
| n1-highmem-2 / 4 / 8 | 2 / 4 / 8 | 13 / 26 / 52 | Up to 10 / 10 / 16 |
| n1-highmem-16 / 32 / 64 / 96 | 16 / 32 / 64 / 96 | 104 / 208 / 416 / 624 | Up to 32 (same platform footnote) |
| n1-highcpu-2 / 4 / 8 | 2 / 4 / 8 | 1.80 / 3.60 / 7.20 | Up to 10 / 10 / 16 |
| n1-highcpu-16 / 32 / 64 / 96 | 16 / 32 / 64 / 96 | 14.4 / 28.8 / 57.6 / 86.4 | Up to 32 (same platform footnote) |
| f1-micro | 1 (0.2 fractional) | 0.60 | Up to 1 |
| g1-small | 1 (0.5 fractional) | 1.70 | Up to 1 |

`f1-micro` sustains a single vCPU for up to 20% CPU time; `g1-small` up to 50%. Shared-core: no Local SSD, 16 persistent disks, 3 TiB. Tier_1 is N/A for all N1.

### Tau T2A (Ampere Altra, Arm, 3.0 GHz base)

1 to 48 vCPUs, 4 GB per vCPU, max 32 Gbps; SMT not supported (a vCPU is an entire core); select regions and zones only; 128 persistent disks, 257 TiB; NVMe only; disks `pd-standard`, `pd-balanced`, `pd-ssd` (zonal). T2A supports Secure boot, but not all public OS images for T2A support it.

| Type | t2a-standard-1 / 2 / 4 / 8 / 16 / 32 / 48 |
|---|---|
| Memory GB | 4 / 8 / 16 / 32 / 64 / 128 / 192 |
| Default egress | Up to 10 / 10 / 10 / 16 / 32 / 32 / 32 |

Doesn't support: custom machine types, sole tenant nodes, nested virtualization, Extreme Persistent Disk, Local SSD, regional Persistent Disk, Virtio-SCSI Storage Controller and Virtio-Net Ethernet Adapter, Windows Server or Windows Client, 32-bit mode EL0, CUDs or SUDs (Spot VM discounts are offered), virtual display devices. Windows with NVMe: combined Hyperdisk and Persistent Disk volumes can't exceed 16 disks.

### Tau T2D (AMD EPYC Milan, 2.45 GHz base, 2.8 GHz effective, 3.5 GHz max boost)

Up to 60 vCPUs, 4 GB per vCPU, max 32 Gbps; SMT disabled; select regions and zones only; resource-based CUDs, Spot VMs, reservations. Disks: zonal `pd-standard`, `pd-balanced`, `pd-ssd`, `hyperdisk-throughput`.

| Type | t2d-standard-1 / 2 / 4 / 8 / 16 / 32 / 48 / 60 |
|---|---|
| Memory GB | 4 / 8 / 16 / 32 / 64 / 128 / 192 / 240 |
| Default egress | Up to 10 / 10 / 10 / 16 / 32 / 32 / 32 / 32 |
| Max Hyperdisk volumes | 20 / 20 / 24 / 32 / 48 / 64 / 64 / 64 |
| Max total disk size TiB | 257 / 257 / 257 / 257 / 257 / 512 / 512 / 512 |

Max disks per VM 128; max Persistent Disk size 64 TiB; max Hyperdisk Throughput 32 TiB; Persistent Disk total can't exceed 257 TiB. Doesn't support: Local SSD, regional Persistent Disk, custom VMs, sole-tenant nodes, Extreme Persistent Disk, GPUs, nested virtualization, flexible CUDs, SUDs, Confidential VMs.

## Notes

- Prices and SUD percentages are not copied.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/list (gcloud 593.0.0 help); the source page has no code.
- Custom machine type limits for N2D, N2, E2, N1 are in [general-purpose-machines.md](./general-purpose-machines.md).
- Source: https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-purpose-machines.md](./general-purpose-machines.md)
- [general-purpose-c3-series.md](./general-purpose-c3-series.md)
- [general-purpose-n4-series.md](./general-purpose-n4-series.md)
